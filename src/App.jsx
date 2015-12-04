import * as React from 'react';
import Modal from 'react-modal';
import { Map, TileLayer, GeoJson } from 'react-leaflet';
import _ from 'lodash';
import d3 from 'd3';

// Panorama Toolkit components and utils
import {
	// ChartSlider,
	OffsetAreaChart,
	Punchcard,
	IntroManager,
	ItemSelector
} from '@panorama/toolkit';

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


// components (TODO: move into @panorama/toolkit)
// import Punchcard from './components/Punchcard/Punchcard.jsx';
// import ItemSelector from './components/ItemSelector/ItemSelector.jsx';
// import IntroManager from './components/IntroManager/IntroManager.jsx';
// import OffsetAreaChart from './components/OffsetAreaChart/OffsetAreaChart.jsx';
import ChartSlider from './components/ChartSlider/ChartSlider.jsx';
import CartoDBTileLayer from './components/CartoDBTileLayer.jsx';	// TODO: submit as PR to react-leaflet
import CanalDetailPanel from './components/CanalDetailPanel.jsx';
import TimeBasedMarkers from './components/TimeBasedMarkers/TimeBasedMarkers.jsx';
import HashManager from './components/HashManager.js';


// utils
import { AppActions, AppActionTypes } from './utils/AppActionCreator';
import AppDispatcher from './utils/AppDispatcher';


// config
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
		this.hashChanged(null, true);

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

	onCommoditySelected (value, index) {

		if (value && value.id) {
			AppActions.canalSelected(value.id);
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
			// TODO: will it be a problem / inefficient to setState here and then again immediately after?
			// or is React smart enough to cue setState calls and implement asynchronously?
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

				// TODO: move this, or at least intro copy, to another location
				steps: [
					{
						element: '.left-column .top-row.template-tile',
						intro: 'copy for step ONE goes here',
						position: 'right'
					},
					{
						element: '.left-column .bottom-row.template-tile',
						intro: 'copy for step TWO goes here',
						position: 'top'
					},
					{
						element: '.right-column .top-row.template-tile',
						intro: 'copy for step THREE goes here',
						position: 'left'
					},
					{
						element: '.right-column .bottom-row.template-tile',
						intro: 'copy for step FOUR goes here',
						position: 'top'
					}
				],
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
			})),
			selectedItem: data.selectedCanal,
			title: 'SELECT A CANAL:',
			onItemSelected: this.onCommoditySelected
		};

		// TODO: these constants should exist elsewhere.
		const MIN_YEAR = 1820;
		const MAX_YEAR = 1860;
		const MIN_TONNAGE = 0;
		const MAX_TONNAGE = 3000000;

		data.offsetAreaChartConfig = {
			data: startEndYears,
			margin: { top: 0, right: 20, bottom: 40, left: 20 },
			xScale: d3.scale.linear()
				.domain([MIN_YEAR, MAX_YEAR]),
			yScale: d3.scale.linear()
				.domain([MIN_TONNAGE, MAX_TONNAGE]),
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
			caption: commodities ? commodities.totalNormalizedValue : ''
		};

		// Punchcard needs arrays to work with d3 selections
		data.items = commodities ? _.values(commodities.commodities) : [];
		data.categories = commodities ? _.values(commodities.commodityCategories) : [];
		
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

		// TODO: these values need to go elsewhere, probably in a componentized hash parser/manager
		let loc = [-1.5, 15.0],
			zoom = 6;

		// TODO: these values are not being used...
		let mapOptions = {
			scrollWheelZoom: false,
			attributionControl: false,
			minZoom: 4,
			maxZoom: 10,
			maxBounds: [[-47.0401, -85.3417], [37.3701,89.4726]]
		};

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
							<Map center={ loc } zoom={ zoom }>
								{ this.renderTileLayers() }
								{ this.renderGeoJsonLayers() }
								<TimeBasedMarkers { ...this.state.timeBasedMarkers } />
							</Map>
						</div>
						<div className='row bottom-row template-tile'>
							<ItemSelector { ...this.state.timeline.itemSelector }/>
							<ChartSlider { ...this.state.timeline.chartSlider } width={ TIMELINE_INITIAL_WIDTH } height={ this.state.dimensions.lowerLeft.height } >
								<OffsetAreaChart { ...this.state.timeline.offsetAreaChartConfig } />
							</ChartSlider>
							<button className="intro-button" data-step="1" onClick={ this.triggerIntro }><span className='icon info'/></button>
						</div>
					</div>
					<div className='columns four right-column full-height'>
						<div className='row top-row template-tile' style={ { height: this.state.dimensions.upperRight.height + "px" } } >
							<Punchcard header={ this.state.punchcard.header } categories={ this.state.punchcard.categories } items={ this.state.punchcard.items } />
							<button className="intro-button" data-step="2" onClick={ this.triggerIntro }><span className='icon info'/></button>
						</div>
						<div className='row bottom-row template-tile'>
							<CanalDetailPanel { ...this.state.canalDetail } />
							<button className="intro-button" data-step="3" onClick={ this.triggerIntro }><span className='icon info'/></button>
						</div>
					</div>
				</div>

				<Modal isOpen={ this.state.aboutModalOpen } onRequestClose={ this.toggleAbout } style={ modalStyle }>
					<button className="close" onClick={ this.toggleAbout }><span>×</span></button>
					<h3>About this Map</h3>
					<p>The subtitle is borrowed from historian Robin D.G. Kelley, who begins one of his essays with the question "What is the United States, if not a nation of overlapping diasporas?" At all points in its history, a significant proportion of the population of the United States had been born in other countries and regions. This being the case, American history can never be understood by just looking within its borders. The culture and politics of the US have always been profoundly shaped by the material and emotional ties many of its residents have had to the places where they were born. This map will allow you to begin to explore those connections at the basic level of demographic statistics. </p>
					<h3>Sources</h3>
					<p>All of the data comes from <a href='https://www.nhgis.org/'>Minnesota Population Center, National Historical Geographic Information System: Version 2.0 (Minneapolis, MN: University of Minnesota, 2011)</a>. County boundaries are from the Newberry Library's <a href='http://publications.newberry.org/ahcbp/'>Atlas of Historical County Boundaries</a>.</p>
					<h3>Suggested Reading</h3>
					<p>Much of the best scholarship on the foreign born concentrates on particular groups at specific moments in time, works like George J. Sanchez's <cite>Becoming Mexican American: Ethnicity, Culture and Identity in Chicano Los Angeles, 1900-1945</cite>. Some thoughtful works that deal with the foreign-born population and issues of migration more generally are:</p>
					<ul>
						<li>Roger Daniels, <cite>Coming to America: A History of Immigration and Ethnicity in American Life</cite> (New York: Harper Collins, 1990).</li>
						<li>Thomas Bender, ed. <cite>Rethinking American History in a Global Age</cite> (Berkeley, CA: University of California Press, 2002). [Kelley's essay "How the West Was One: The African Diaspora and the Remapping of U.S. History" is in this collection.]</li>
						<li>Henry Yu, "Los Angeles and American Studies in a Pacific World of Migrations," <cite>American Quarterly</cite> 56 (September 2004) 531-543.</li>
						</ul>
					<h3>Acknowledgements</h3>
					<p>This map is authored by the staff of the Digital Scholarship Lab: Robert K. Nelson, Scott Nesbit, Edward L. Ayers, Justin Madron, and Nathaniel Ayers. Kim D'agostini and Erica Havens geolocated country locations.</p>
					<p>The developers, designers, and staff at Stamen Design Studio have been exceptional partners on this project. Our thanks to Kai Chang, Jon Christensen, Seth Fitzsimmons, Eric Gelinas, Sean Connelley, Nicolette Hayes, Alan McConchie, Michael Neuman, Dan Rademacher, and Eric Rodenbeck.</p>
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
