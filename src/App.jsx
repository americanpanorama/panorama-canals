import * as React from 'react';
import { Map, TileLayer, GeoJson } from 'react-leaflet';
import _ from 'lodash';

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
import AreaChart from './components/AreaChart/AreaChart.jsx';
import CartoDBTileLayer from './components/CartoDBTileLayer.jsx';	// TODO: submit as PR to react-leaflet


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
		/*
		legendData: React.PropTypes.object,
		exampleTitle: React.PropTypes.string,
		*/
	};

	// property defaults (ES7-style React)
	// (instead of ES5-style getDefaultProps)
	static defaultProps = {
		/*
		legendData: {
			items: [
				'narratives',
				'cotton',
				'sugar'
			],
			initialSelection: 'narratives'
		},

		exampleTitle: 'Example Component'
		*/
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

	}



	// ============================================================ //
	// Lifecycle
	// ============================================================ //

	componentWillMount () {

		this.computeComponentDimensions();

	}

	componentDidMount () {

		window.addEventListener('resize', this.onWindowResize);
		CommodityStore.addListener(AppActionTypes.storeChanged, this.storeChanged);

		AppActions.loadInitialData(this.state);

	}

	componentWillUnmount () {

		CommodityStore.removeListener(AppActionTypes.storeChanged, this.storeChanged);

	}

	componentDidUpdate () {

		//

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
			tabbedView: {}
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

	onWindowResize (event) {

		this.computeComponentDimensions();

	}

	storeChanged () {

		this.setState({
			timeline: this.deriveTimelineData(),
			punchcard: this.derivePunchcardData(),
			tabbedView: this.deriveTabbedViewData()
		});

	}



	// ============================================================ //
	// Helpers
	// ============================================================ //

	computeComponentDimensions () {

		// based off of sizes stored within _variables.scss --
		// if you change them there, change them here.
		var containerPadding = 20,
		    headerHeight = 80,
		    bottomRowHeight = 230,
		    dimensions = {};

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

	deriveTimelineData () {

		let data = {
			selectedCanal: CommodityStore.getSelectedCanal(),
			canals: CommodityStore.getAllCanals()
		};

		data.areaChartConfig = {
			// data: _.values(CommodityStore.getAllCommodities()).map(v => _.values(v)),	// TODO: we will want commodities for all canals...
			data: [_.values(CommodityStore.getAllCommodities()[data.selectedCanal.id])],	// ...but for now let's just grab the selected canal.
			margin: {top: 0, right: 0, bottom: 20, left: 30},
			xAccessor: d => d.year,
			yAccessor: d => d.totalNormalizedValue || 0
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

	deriveTabbedViewData () {

		return {};

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

		// TODO: this should be computed and updated on resize.
		const AREA_CHART_WIDTH = 480;

		return (
			<div className='container full-height'>
				<div className='row full-height'>
					<div className='columns eight full-height'>
						<header className='row u-full-width'>
							<h1><span className='header-main'>CANALS</span><span className='header-sub'>1820&ndash;1890</span></h1>
						</header>
						<div className='row top-row template-tile' style={ { height: this.state.dimensions.upperLeft.height + "px" } }>
							<Map
								center={loc}
								zoom={zoom}
							>
							{ cartodbLayers.layergroup.layers.map((item, i) => {
								return (
									<CartoDBTileLayer
										key={ i }
										userId={ cartodbConfig.userId }
										sql={ item.options.sql }
										cartocss={ item.options.cartocss }
									/>
								);
							}) }
							{ tileLayers.layers.map((item, i) => {
								return (
									<TileLayer
										key={ i }
										url={ item.url }
									/>
								);
							}) }
							</Map>
						</div>
						<div className='row bottom-row template-tile'>
							<ItemSelector items={ this.state.timeline.canals } selectedItem={ this.state.timeline.selectedCanal } />
							<AreaChart { ...this.state.timeline.areaChartConfig } width={ AREA_CHART_WIDTH } height={ this.state.dimensions.lowerLeft.height }/>
						</div>
					</div>
					<div className='columns four full-height'>
						<div className='row top-row template-tile' style={ { height: this.state.dimensions.upperRight.height + "px" } }>
							<Punchcard header={ this.state.punchcard.header } categories={ this.state.punchcard.categories } items={ this.state.punchcard.items }/>
						</div>
						<div className='row bottom-row template-tile'>
						</div>
					</div>
				</div>
			</div>
		);

	}

}
