import * as React from 'react';
import { Map, TileLayer, GeoJson } from 'react-leaflet';
import _ from 'lodash';
import d3 from 'd3';

// Panorama Toolkit components,
// Panorama template modules,
// and related utils
// import { Punchcard } from '@panorama/toolkit';
import { AppActions, AppActionTypes } from './utils/AppActionCreator';

/*
 * Data flow via Flux:
 * https://facebook.github.io/flux/docs/overview.html
 * 
 *                  ┌-----   actions  <-----┐
 *                  v                       |
 * actions --> dispatcher --> stores --> views
 */

// stores
import CommodityStore from './stores/CommodityStore';


// components (TODO: move into @panorama/toolkit)
import Punchcard from './components/Punchcard/Punchcard.jsx';
import ItemSelector from './components/ItemSelector/ItemSelector.jsx';
import OffsetAreaChart from './components/OffsetAreaChart/OffsetAreaChart.jsx';
import ChartSlider from './components/ChartSlider/ChartSlider.jsx';
import CartoDBTileLayer from './components/CartoDBTileLayer.jsx';	// TODO: submit as PR to react-leaflet
import CanalDetailPanel from './components/CanalDetailPanel.jsx';


// actions


// utils


// config
import tileLayers from '../basemaps/tileLayers.json';
import cartodbConfig from '../basemaps/cartodb/config.json';
import cartodbLayers from '../basemaps/cartodb/basemaps.json';


// main app container
export default class App extends React.Component {

	// property validation (ES7-style React)
	static propTypes = {
		//
	};

	// property defaults (ES7-style React)
	// (instead of ES5-style getDefaultProps)
	static defaultProps = {
		//
	};

	constructor (props) {

		super(props);

		// set up initial state in constructor
		// (instead of ES5-style getInitialState)
		this.state = this.getDefaultState();

		// bind handlers to this component instance,
		// since React no longer does this automatically when using ES6
		this.onMapMove = this.onMapMove.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
		this.storeChanged = this.storeChanged.bind(this);

		this.geoJsonLayers = [];

	}



	// ============================================================ //
	// Lifecycle
	// ============================================================ //

	componentWillMount () {

		this.computeComponentDimensions();
		this.storeChanged(true);

	}

	componentDidMount () {

		window.addEventListener('resize', this.onWindowResize);
		CommodityStore.addListener(AppActionTypes.storeChanged, this.storeChanged);

		AppActions.loadInitialData(this.state);

	}

	componentWillUnmount () {

		CommodityStore.removeListener(AppActionTypes.storeChanged, this.storeChanged);

	}

	shouldComponentUpdate (nextProps, nextState) {
		
		return !nextState.suppressRender;

	}

	componentDidUpdate () {

		// Update data in GeoJson layers, as described here:
		// https://github.com/Leaflet/Leaflet/issues/1416
		let layerComponent
		if (this.state.map.canalsGeometry) {
			this.state.map.canalsGeometry.forEach(canal => {

				layerComponent = this.refs['canal-' + canal.properties.id];
				if (layerComponent) {
					layerComponent.getLeafletElement().clearLayers();
					layerComponent.getLeafletElement().addData(canal);
				}

				layerComponent = this.refs['canal-hit-' + canal.properties.id];
				if (layerComponent) {
					layerComponent.getLeafletElement().clearLayers();
					layerComponent.getLeafletElement().addData(canal);
				}

			});
		}

		// Add/remove 'selected-canal' class accordingly
		let layers = [],
			i,
			className,
			selectedCanals = document.querySelectorAll('.selected-canal');

		// remove 'selected-canal' class from previously-selected canals
		if (selectedCanals) {
			for (i=0; i<selectedCanals.length; i++) {
				selectedCanals[i].classList.remove('selected-canal');
			}
		}

		// add 'selected-canal' class to newly-selected canals
		if (this.state.map.selectedCanalId) {
			selectedCanals = document.querySelectorAll('.canal-' + this.state.map.selectedCanalId);
			if (selectedCanals) {
				for (i=0; i<selectedCanals.length; i++) {
					selectedCanals[i].classList.add('selected-canal');
				}
			}
		}

	}

	getDefaultState () {

		return {
			dimensions: {
				upperLeft: {
					width: 0,
					height: 0
				},
				upperRight: {
					width: 0,
					height: 0
				}
			},
			selectedCanal: 22,			// Erie Canal
			selectedYear: 1849,
			selectedCommodity: null,
			timeline: {},
			punchcard: {},
			canalDetail: {}
		};

	}



	// ============================================================ //
	// Handlers
	// ============================================================ //

	onMapMove (event) {

		// TODO: emit event that is picked up by hash manager component
		// this.updateURL({loc: hashUtils.formatCenterAndZoom(evt.target)}, true);
		console.log(">>>>> map moved");

	}

	onCanalClick (event) {

		let canalId = event.target.options.canalId;
		if (canalId) {
			AppActions.canalSelected(canalId);
		}

	}

	onWindowResize (event) {

		this.computeComponentDimensions();

	}

	storeChanged (suppressRender) {

		this.setState({
			map: this.deriveMapData(),
			timeline: this.deriveTimelineData(),
			punchcard: this.derivePunchcardData(),
			canalDetail: this.deriveCanalDetailData(),
			suppressRender: suppressRender === true
		});

	}



	// ============================================================ //
	// Helpers
	// ============================================================ //

	computeComponentDimensions () {

		// based off of sizes stored within _variables.scss --
		// if you change them there, change them here.
		let containerPadding = 20,
			headerHeight = 80,
			breakpointWidthWide = 1280,
			bottomRowHeightShort = 230,
			bottomRowHeightTall = 310,
			bottomRowHeight,
			dimensions = {};

		// Calculate bottom row height as set by media breakpoints
		let bottomRowEl = document.querySelector('.bottom-row'),
			bottomRowHeightStyle;

		if (bottomRowEl) {
			bottomRowHeightStyle = window.getComputedStyle(bottomRowEl);
			bottomRowHeight = bottomRowEl.offsetHeight + parseFloat(bottomRowHeightStyle.marginTop.replace('px', '')) + parseFloat(bottomRowHeightStyle.marginBottom.replace('px', ''));
		} else {
			bottomRowHeight = window.innerWidth < breakpointWidthWide ? bottomRowHeightShort : bottomRowHeightTall;
		}

		dimensions.upperRight = {
			height: window.innerHeight - bottomRowHeight - 3 * containerPadding
		};
		dimensions.upperLeft = {
			height: dimensions.upperRight.height - headerHeight
		};
		dimensions.lowerLeft = {
			height: bottomRowHeight - 2 * containerPadding
		};
		dimensions.lowerRight = {
			height: dimensions.lowerLeft.height
		};

		this.setState({ dimensions: dimensions });

	}

	deriveMapData () {

		let selectedCanal = CommodityStore.getSelectedCanal(),
			selectedCanalId = selectedCanal ? selectedCanal.id : null;

		return {
			canalsGeometry: CommodityStore.getAllCanalGeometryByYear(),
			selectedCanalId: selectedCanalId
		};

	}

	deriveTimelineData () {

		let data = {
			selectedCanal: CommodityStore.getSelectedCanal(),
			canals: CommodityStore.getAllCanals()
		};

		let comms = CommodityStore.getAllCommodities();

		// sort by canal openedYear, and merge in openedYear and closedYear
		let openedYearSortedCanalIds = Object.keys(comms).sort((a, b) => {
				return data.canals[a].openedYear - data.canals[b].openedYear;
			}),
			openedYearSortedComms = openedYearSortedCanalIds.map(canalId => comms[canalId]),
			startEndYears = openedYearSortedCanalIds.map(canalId => ({
				openedYear: data.canals[canalId].openedYear,
				closedYear: data.canals[canalId].closedYear
			}));

		// TODO: these constants should exist elsewhere.
		const MIN_YEAR = 1820;
		const MAX_YEAR = 1860;
		const MIN_TONNAGE = 0;
		const MAX_TONNAGE = 4000000;

		data.offsetAreaChartConfig = {
			data: startEndYears,
			margin: { top: 0, right: 20, bottom: 40, left: 20 },
			xScale: d3.scale.linear()
				.domain([MIN_YEAR, MAX_YEAR]),
			yScale: d3.scale.linear()
				.domain([MIN_TONNAGE, MAX_TONNAGE]),
			axisProps: null,

			areaChartData: _.values(openedYearSortedComms).map(v => _.values(v)),
			areaChartConfig: {
				xAccessor: d => d.year,
				yAccessor: d => d.totalNormalizedValue || 0
			},
			colorPalette: [
				"#466834",
				"#C163D5",
				"#D34E2B",
				"#69AFC8",
				"#793755",
				"#69CA45",
				"#D3983F",
				"#62C390",
				"#C594C5",
				"#7C4625",
				"#CA4794",
				"#D05864",
				"#6B76CC",
				"#ADB644",
				"#484F73"
			]
		};

		data.chartSlider = {
			scale: data.offsetAreaChartConfig.xScale,
			margin: data.offsetAreaChartConfig.margin,
			selectedValue: CommodityStore.getSelectedYear()
		};

		return data;

	}

	derivePunchcardData () {

		let data = {},
		    canalMetadata = CommodityStore.getSelectedCanal(),
		    commodities = CommodityStore.getCommoditiesByCanalByYear();

		data.header = {
			title: canalMetadata ? canalMetadata.name : '',
			subtitle: CommodityStore.getSelectedYear() || '',
			caption: commodities ? commodities.totalNormalizedValue : ''
		};

		// Punchcard needs arrays to work with d3 selections
		data.items = commodities ? _.values(commodities.commodities) : [];
		data.categories = commodities ? _.values(commodities.commodityCategories) : [];
		
		return data;

	}

	deriveCanalDetailData () {

		let data = {
			commodityMetadata: CommodityStore.getAllCommodityMetadata(),
			selectedCanal: CommodityStore.getSelectedCanal(),
			commodities: CommodityStore.getCommoditiesByCanalByYear(),
			selectedCommodity: CommodityStore.getSelectedCommodity(),
		};

		// Discard the categorized data.
		data.commodities = data.commodities ? data.commodities.commodities : {};

		return data;

	}



	// ============================================================ //
	// Render
	// ============================================================ //

	render () {

		// TODO: these values need to go elsewhere, probably in a componentized hash parser/manager
		var loc = [-1.5, 15.0],
			zoom = 6;

		// TODO: these values might want to be set as defaults on the LeafletMap component?
		let debounce = function (fn, delay) {
				let timeout;
				return function () {
					clearTimeout(timeout);
					let that = this, args = arguments;
					timeout = setTimeout(function() {
						fn.apply(that, args);
					}, delay);
				};
			},
		    mapEvents = {
				move: debounce(this.onMapMove, 250)
			},
			mapOptions = {
				scrollWheelZoom: false,
				attributionControl: false,
				minZoom: 4,
				maxZoom: 10,
				maxBounds: [[-47.0401, -85.3417], [37.3701,89.4726]]
			};

		const TIMELINE_INITIAL_WIDTH = 500;

		return (
			<div className='container full-height'>
				<div className='row full-height'>
					<div className='columns eight left-column full-height'>
						<header className='row u-full-width'>
							<h1><span className='header-main'>CANALS</span><span className='header-sub'>1820&ndash;1860</span></h1>
						</header>
						<div className='row top-row template-tile' style={ { height: this.state.dimensions.upperLeft.height + "px" } }>
							<Map center={ loc } zoom={ zoom }>
								{ this.renderTileLayers() }
								{ this.renderGeoJsonLayers() }
							</Map>
						</div>
						<div className='row bottom-row template-tile'>
							<ItemSelector items={ this.state.timeline.canals } selectedItem={ this.state.timeline.selectedCanal } />
							<ChartSlider { ...this.state.timeline.chartSlider } width={ TIMELINE_INITIAL_WIDTH } height={ this.state.dimensions.lowerLeft.height } >
								<OffsetAreaChart { ...this.state.timeline.offsetAreaChartConfig } />
							</ChartSlider>
						</div>
					</div>
					<div className='columns four right-column full-height'>
						<div className=' row top-row template-tile' style={ { height: this.state.dimensions.upperRight.height + "px" } } >
							<Punchcard header={ this.state.punchcard.header } categories={ this.state.punchcard.categories } items={ this.state.punchcard.items }/>
						</div>
						<div className='row bottom-row template-tile'>
							<CanalDetailPanel { ...this.state.canalDetail } />
						</div>
					</div>
				</div>
			 </div>
		);

	}

	renderTileLayers () {

		let layers = [];

		if (cartodbLayers.layergroup && cartodbLayers.layergroup.layers) {
			layers = layers.concat(cartodbLayers.layergroup.layers.map((item, i) => {
				return (
					<CartoDBTileLayer
						key={ 'cartodb-tile-layer-' + i }
						userId={ cartodbConfig.userId }
						sql={ item.options.sql }
						cartocss={ item.options.cartocss }
					/>
				);
			}));
		}

		if (tileLayers.layers) {
			layers = layers.concat(tileLayers.layers.map((item, i) => {
				return (
					<TileLayer
						key={ 'tile-layer-' + i }
						url={ item.url }
					/>
				);
			}));
		}

		return layers;
	}

	renderGeoJsonLayers () {

		let layers = [],
			className;

		if (this.state.map.canalsGeometry) {
			this.state.map.canalsGeometry.forEach(canal => {

				className = 'canal';
				if (canal.properties.id === this.state.map.selectedCanalId) {
					className += ' selected-canal';
				}

				// hack to allow manipulating class on selection;
				// React does not update the className of the selected element below,
				// most likely because GeoJson passes className through to its <path>
				// element instead of the dummy <div> it creates (which React probably
				// uses for DOM diffing).
				className += ' canal-' + canal.properties.id;

				// visible layer
				layers.push(<GeoJson className={ className } key={ 'canal-' + canal.properties.id } ref={ 'canal-' + canal.properties.id } data={ canal } />);

				className += ' hit-area';

				// interaction layer (styled to be wider than visible layer)
				layers.push(<GeoJson className={ className } key={ 'canal-hit-' + canal.properties.id } ref={ 'canal-hit-' + canal.properties.id } data={ canal } onClick={ this.onCanalClick } canalId={ canal.properties.id } />);

			});
		}

		return layers;

	}

}
