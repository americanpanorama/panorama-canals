import * as React from 'react';
import Modal from 'react-modal';
import { Map, TileLayer, GeoJson } from 'react-leaflet';
import _ from 'lodash';
import d3 from 'd3';

// Panorama Toolkit components and utils
import {
	CartoDBTileLayer,
	// ChartSlider,		// TODO: just realized this was not componentizing nicely because of AppActions within...
	HashManager,
	IntroManager,
	ItemSelector,
	OffsetAreaChart,
	Punchcard,
	TimeBasedMarkers
} from '@panorama/toolkit';
import ChartSlider from './components/ChartSlider/ChartSlider.jsx';		// TODO: move into @panorama/toolkit

/*
 * Data flow via Flux:
 * https://facebook.github.io/flux/docs/overview.html
 * 
 *                 ┌-----  actions  <-----┐
 *                 v                      |
 * actions --> dispatcher --> stores --> views
 */

// stores
import CommodityStore from './stores/CommodityStore';


// local components
import CanalDetailPanel from './components/CanalDetailPanel.jsx';


// utils
import { AppActions, AppActionTypes } from './utils/AppActionCreator';
import AppDispatcher from './utils/AppDispatcher';


// config
import appConfig from '../data/appConfig.json';
import tileLayers from '../basemaps/tileLayers.json';
import cartodbConfig from '../basemaps/cartodb/config.json';
import cartodbLayers from '../basemaps/cartodb/basemaps.json';
import timeBasedMarkerData from '../basemaps/timeBasedMarkers.json';


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

	static STATE_KEYS = {
		'CANAL': 'canal',
		'YEAR': 'year',
		'COMMODITY': 'commodity',
	};

	constructor (props) {

		super(props);

		this.handleAppStateChanges();

		// set up initial state in constructor
		// (instead of ES5-style getInitialState)
		this.state = this.getDefaultState();

		// bind handlers to this component instance,
		// since React no longer does this automatically when using ES6
		this.onWindowResize = this.onWindowResize.bind(this);
		this.hashChanged = this.hashChanged.bind(this);
		this.toggleAbout = this.toggleAbout.bind(this);
		this.triggerIntro = this.triggerIntro.bind(this);
		this.onIntroExit = this.onIntroExit.bind(this);
		this.onCanalSelected = this.onCanalSelected.bind(this);
		this.onCommoditySelected = this.onCommoditySelected.bind(this);

		this.geoJsonLayers = [];

	}

	handleAppStateChanges () {

		// Register callback to handle all updates
		AppDispatcher.register((action) => {

			let key;

			switch (action.type) {

				case AppActionTypes.canalSelected:
					key = App.STATE_KEYS.CANAL;
					break;

				case AppActionTypes.yearSelected:
					key = App.STATE_KEYS.YEAR;
					break;

				case AppActionTypes.commoditySelected:
					key = App.STATE_KEYS.COMMODITY;
					break;

			}

			if (key) {
				let hash = {};
				hash[key] = action.value;
				HashManager.updateHash(hash);
			}

			return true;

		});

	}



	// ============================================================ //
	// Lifecycle
	// ============================================================ //

	componentWillMount () {

		this.computeComponentDimensions();

		CommodityStore.loadInitialData()
		.then(() => {

			// Initial data loaded; manually trigger hashChanged in order to `render()` application for the first time.
			this.hashChanged();

		}, (error) => {

			// fail loudly, do not swallow the error
			throw error;

		});

		// Prepare object to deliver default application state to HashManager,
		// with initial values paired with keys to use in the hash.
		let initialState = {};
		initialState[App.STATE_KEYS.CANAL] = this.state.defaultSelectedCanal;
		initialState[App.STATE_KEYS.YEAR] = this.state.defaultSelectedYear;
		initialState[App.STATE_KEYS.COMMODITY] = this.state.defaultSelectedCommodity;

		// Overwrite default states with any states present in the hash
		initialState = Object.assign({}, initialState, HashManager.getState());

		// Update hash with merged result.
		// Do this before setting up the `hashChanged` event handler,
		// so that `render()` is not called until initial data are loaded.
		HashManager.updateHash(initialState);

		// Prepare initial application state, and set flag to skip initial `render()`.
		// this.hashChanged(null, true);

		// Handle all hash changes subsequent to the above initialization.
		HashManager.addListener(HashManager.EVENT_HASH_CHANGED, this.hashChanged);

	}

	componentDidMount () {

		window.addEventListener('resize', this.onWindowResize);

	}

	componentWillUnmount () {

		HashManager.removeListener(HashManager.EVENT_HASH_CHANGED, this.hashChanged);
		window.removeEventListener('resize', this.onWindowResize);

	}

	shouldComponentUpdate (nextProps, nextState) {
		
		return !nextState.suppressRender;

	}

	componentDidUpdate () {

		this.updateCanalsOnMap();
		this.fineTuneViews();

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
			mapConfig: appConfig.map,
			defaultSelectedCanal: 22,		// Erie Canal
			defaultSelectedYear: 1849,
			defaultSelectedCommodity: null
		};

	}



	// ============================================================ //
	// Handlers
	// ============================================================ //

	onCanalClick (event) {

		let canalId = event.target.options.canalId;
		if (canalId) {
			AppActions.canalSelected(canalId);
		}

	}

	onCanalSelected (value, index) {

		if (value && value.id) {
			AppActions.canalSelected(value.id);
		}

	}

	onCommoditySelected (value, index) {

		if (value && value.id) {
			AppActions.commoditySelected(value.id);
		}

	}

	onWindowResize (event) {

		this.computeComponentDimensions();

	}

	hashChanged (event, suppressRender) {

		let selectedCanalId = HashManager.getState(App.STATE_KEYS.CANAL),
			selectedYear = HashManager.getState(App.STATE_KEYS.YEAR),
			selectedCommodityId = HashManager.getState(App.STATE_KEYS.COMMODITY);

		this.setState({
			map: this.deriveMapData(selectedCanalId, selectedYear),
			timeline: this.deriveTimelineData(selectedCanalId, selectedYear),
			punchcard: this.derivePunchcardData(selectedCanalId, selectedYear),
			canalDetail: this.deriveCanalDetailData(selectedCanalId, selectedYear, selectedCommodityId),
			timeBasedMarkers: this.deriveTimeBasedMarkersData(selectedYear),
			suppressRender: suppressRender === true
		});

	}

	toggleAbout () {

		this.setState({
			aboutModalOpen: !this.state.aboutModalOpen
		});

	}

	triggerIntro (event) {

		if (this.state.aboutModalOpen) {
			this.toggleAbout();
		}

		this.setState({
			intro: {
				open: true,
				step: (event && event.currentTarget) ? parseInt(event.currentTarget.dataset.step) : null,
				config: {
					showStepNumbers: false,
					skipLabel: '×',
					nextLabel: '⟩',
					prevLabel: '⟨',
					doneLabel: '×'
				},

				steps: appConfig.introSteps,
				onExit: this.onIntroExit
			}
		});

	}

	onIntroExit () {

		this.setState({
			intro: {
				open: false
			}
		});

	}

	// ============================================================ //
	// Helpers
	// ============================================================ //

	computeComponentDimensions () {

		// based off of sizes stored within _variables.scss --
		// if you change them there, change them here.
		let containerPadding = 20,
			headerHeight = 90,
			breakpointWidthWide = 1280,
			breakpointHeightSmall = 780,
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
			bottomRowHeight = window.innerHeight < breakpointHeightSmall ? bottomRowHeightShort : bottomRowHeightTall;
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

	deriveMapData (selectedCanalId, selectedYear) {

		let selectedCanal = CommodityStore.getCanal(selectedCanalId);

		return {
			canalsGeometry: CommodityStore.getAllCanalGeometryByYear(selectedYear),
			selectedCanalId: selectedCanalId
		};

	}

	deriveTimelineData (selectedCanalId, selectedYear) {

		let data = {
			selectedCanal: CommodityStore.getCanal(selectedCanalId),
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
				closedYear: data.canals[canalId].closedYear,
				canalId: canalId,
				commodityDataYears: _.keys(comms[canalId])
			}));

		
		// Map to format needed by ItemSelector.
		data.itemSelector = {
			items: Object.keys(data.canals).map((key) => ({
				id: key,
				name: data.canals[key].name
			})).sort((a, b) => {
				if (a.name < b.name) { return -1; }
				else if (b.name < a.name) { return 1; }
				return 0;
			}),
			selectedItem: data.selectedCanal,
			title: 'SELECT A CANAL:',
			onItemSelected: this.onCanalSelected
		};

		data.offsetAreaChartConfig = {
			data: startEndYears,
			margin: { top: 0, right: 20, bottom: 40, left: 20 },
			xScale: d3.scale.linear()
				.domain([appConfig.timelineData.minYear, appConfig.timelineData.maxYear]),
			yScale: d3.scale.linear()
				.domain([appConfig.timelineData.minTonnage, appConfig.timelineData.maxTonnage]),
			xAccessor: (d, i) => i ? d.closedYear : d.openedYear,
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
			],
			selectedChartId: data.selectedCanal && data.selectedCanal.id,
			chartIdAccessor: d => d.length ? d[0].canalId : d.canalId,		// works for both OffsetAreaChart and AreaChart data formats
			metadataAccessor: d => d.commodityDataYears
		};

		data.chartSlider = {
			scale: data.offsetAreaChartConfig.xScale,
			margin: data.offsetAreaChartConfig.margin,
			selectedValue: selectedYear
		};

		return data;

	}

	derivePunchcardData (selectedCanalId, selectedYear) {

		let data = {},
			canalMetadata = CommodityStore.getCanal(selectedCanalId),
			commodities = CommodityStore.getCommoditiesByCanalByYear(selectedCanalId, selectedYear);

		data.header = {
			title: canalMetadata ? canalMetadata.name : '',
			subtitle: selectedYear || '',
			caption: (commodities && commodities.totalNormalizedValue) ?
				(d3.format(',')(commodities.totalNormalizedValue) + ' total tonnage') : 'total tonnage not available'
		};

		// Punchcard needs arrays to work with d3 selections
		data.items = commodities ? _.values(commodities.commodities) : [];
		data.categories = commodities ? _.values(commodities.commodityCategories) : [];

		data.onItemClick = this.onCommoditySelected;

		return data;

	}

	deriveCanalDetailData (selectedCanalId, selectedYear, selectedCommodityId) {

		let data = {
			commodityMetadata: CommodityStore.getAllCommodityMetadata(),
			selectedCanal: CommodityStore.getCanal(selectedCanalId),
			commodities: CommodityStore.getCommoditiesByCanalByYear(selectedCanalId, selectedYear),
			selectedCommodity: CommodityStore.getCommodity(selectedCommodityId),
		};

		// Discard the categorized data.
		data.commodities = data.commodities ? data.commodities.commodities : {};

		return data;

	}

	deriveTimeBasedMarkersData (selectedYear) {

		let data = {
			features: timeBasedMarkerData,
			currentDate: new Date(selectedYear, 0)
		};

		return data;

	}



	// ============================================================ //
	// Render
	// ============================================================ //

	render () {

		let modalStyle = {
			overlay : {
				backgroundColor: null
			},
			content : {
				top: null,
				left: null,
				right: null,
				bottom: null,
				border: null,
				background: null,
				borderRadius: null,
				padding: null,
				position: null
			}
		};

		const TIMELINE_INITIAL_WIDTH = 500;

		return (
			<div className='container full-height'>

				<div className='row full-height'>
					<div className='columns eight left-column full-height'>
						<header className='row u-full-width'>
							<h1><span className='header-main'>CANALS</span><span className='header-sub'>1820&ndash;1860</span></h1>
							<h4 onClick={ this.toggleAbout }>ABOUT THIS MAP</h4>
							<button className="intro-button" data-step="0" onClick={ this.triggerIntro }><span className='icon info'/></button>
						</header>
						<div className='row top-row template-tile' style={ { height: this.state.dimensions.upperLeft.height + "px" } }>
							<Map { ...this.state.mapConfig }>
								{ this.renderTileLayers() }
								{ this.renderGeoJsonLayers() }
								<TimeBasedMarkers { ...this.state.timeBasedMarkers } />
							</Map>
						</div>
						<div className='row bottom-row template-tile'>
							{ this.state.timeline ? <ItemSelector { ...this.state.timeline.itemSelector }/> : null }
							{ this.state.timeline ? <ChartSlider { ...this.state.timeline.chartSlider } width={ TIMELINE_INITIAL_WIDTH } height={ this.state.dimensions.lowerLeft.height } >
								<OffsetAreaChart { ...this.state.timeline.offsetAreaChartConfig } />
							</ChartSlider> : null }
							<button className="intro-button" data-step="1" onClick={ this.triggerIntro }><span className='icon info'/></button>
						</div>
					</div>
					<div className='columns four right-column full-height'>
						<div className='row top-row template-tile' style={ { height: this.state.dimensions.upperRight.height + "px" } } >
							{ this.state.punchcard ? <Punchcard { ...this.state.punchcard } /> : null }
							<button className="intro-button" data-step="2" onClick={ this.triggerIntro }><span className='icon info'/></button>
						</div>
						<div className='row bottom-row template-tile'>
							<CanalDetailPanel { ...this.state.canalDetail } />
							{ this.state.canalDetail ? <CanalDetailPanel { ...this.state.canalDetail } /> : null }
						</div>
					</div>
				</div>

				<Modal isOpen={ this.state.aboutModalOpen } onRequestClose={ this.toggleAbout } style={ modalStyle }>
					<button className="close" onClick={ this.toggleAbout }><span>×</span></button>
					<div dangerouslySetInnerHTML={ this.parseAboutModalCopy() }></div>
				</Modal>

				<IntroManager { ...this.state.intro } />

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

		if (this.state.map && this.state.map.canalsGeometry) {
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

	parseAboutModalCopy () {

		let modalCopy = '';

		try {
			modalCopy = appConfig.aboutModalContent.join('\n');
		} catch (error) {
			console.warn('Error parsing modal copy: ', error);
			modalCopy = 'Error parsing modal copy.';
		}

		// React requires this format to render a string as HTML,
		// via dangerouslySetInnerHTML.
		return {
			__html: modalCopy
		};

	}

	updateCanalsOnMap () {

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

	/**
	 * Perform any manual adjustments after rendering needed to keep things looking spiffy.
	 */
	fineTuneViews () {

		//
		// Account for scrollbars in Punchcard
		// 
		let punchcard = document.querySelector('.panorama.punchcard'),
			punchcardContent = document.querySelector('.panorama.punchcard .content');

		if (punchcard && punchcardContent) {
			let introButton = document.querySelector('.panorama.punchcard ~ .intro-button');

			if (punchcardContent.offsetHeight > punchcard.offsetHeight) {
				// scrollbars
				introButton.classList.add('has-scrollbar');
				punchcard.classList.add('has-scrollbar');
			} else {
				// no scrollbars
				introButton.classList.remove('has-scrollbar');
				punchcard.classList.remove('has-scrollbar');
			}
		}

	}

}
