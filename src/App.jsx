import * as React from 'react';

import { render } from 'react-dom';
import { Map, TileLayer, GeoJson } from 'react-leaflet';

// Panorama Toolkit components
// and related utils
// import { Legend } from '@panorama/toolkit';
import Punchcard from './components/Punchcard.jsx';
import AppDispatcher from './utils/AppDispatcher';
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


// components
import CartoDBTileLayer from './components/CartoDBTileLayer.jsx';	// TODO: submit as PR to react-leaflet


// actions


// utils
import config from '../.env.json';


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
			selectedYear: 1850,
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
		    headerHeight = 60,
		    bottomRowHeight = 230,
		    dimensions = {};

		dimensions.upperRight = {
			height: window.innerHeight - bottomRowHeight - 3 * containerPadding
		};

		dimensions.upperLeft = {
			height: dimensions.upperRight.height - headerHeight
		};

		this.setState({ dimensions: dimensions });

	}

	deriveTimelineData () {

		return {};

	}

	derivePunchcardData () {

		let data = {},
		    canalMetadata = CommodityStore.getSelectedCanal(),
		    commodities = CommodityStore.getCommoditiesByCanalByYear();

		data.header = {
			title: canalMetadata.name,
			subtitle: CommodityStore.getSelectedYear(),
			caption: commodities.get('totalTonnage')
		};

		data.categories = commodities.get('commodityCategories');
		
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
		var loc = [-5.200, 0.330],
			zoom = 5;

		// TODO: these values might want to be set as defaults on the LeafletMap component?
		var debounce = function (fn, delay) {
				var timeout;
				return function () {
					clearTimeout(timeout);
					var that = this, args = arguments;
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

		return (
			<div className='container full-height'>
				<div className='row full-height'>
					<div className='columns eight full-height'>
						<header className='row u-full-width'>
							<h1><span className='header-main'>CANALS</span><span className='header-sub'>1820&ndash;1890</span></h1>
						</header>
						<div className='row top-row template-tile' style={ { height: this.state.dimensions.upperLeft.height + "px" } }>
							<Map
								center={ loc }
								zoom={ zoom }
							>
								<CartoDBTileLayer
									url={ config.cartodb.layers[0].url }
									userId={ config.cartodb.userId }
									sql={ config.cartodb.layers[0].sql }
									cartocss={ config.cartodb.layers[0].cartocss }
								/>
							</Map>
						</div>
						<div className='row bottom-row template-tile'>
						</div>
					</div>
					<div className='columns four full-height'>
						<div className='row top-row template-tile' style={ { height: this.state.dimensions.upperRight.height + "px" } }>
							<Punchcard header={ this.state.punchcard.header } categories={ this.state.punchcard.categories }/>
						</div>
						<div className='row bottom-row template-tile'>
						</div>
					</div>
				</div>
			</div>
		);

	}

}
