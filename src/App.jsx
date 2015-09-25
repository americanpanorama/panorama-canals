import * as React from 'react';

// example module from @panorama
// import Legend from '@panorama/legend';

import { render } from 'react-dom';
import { Map, TileLayer, GeoJson } from 'react-leaflet';

/*
 * Data flow via Flux:
 * https://facebook.github.io/flux/docs/overview.html
 * 
 *									┌-----	 actions	<-----┐
 *									v											 |		
 * actions --> dispatcher --> stores --> views
 */

// stores
// import ExampleStore from './stores/ExampleStore.jsx';


// components
// import { LeafletMap, TileLayer, GeoJSONLayer } from './components/LeafletMap.jsx';


// actions


// utils


// main app container
export default class App extends React.Component {

	constructor (props) {

		super(props);

		// set up initial state (instead of ES5-style getInitialState)
		// this.state = 

		// bind handlers to this component instance,
		// since React no longer does this automatically when using ES6
		this.onMapMove = this.onMapMove.bind(this);

	}

	componentWillMount () {

		//

	}

	componentDidMount () {

		// ExampleStore.addChangeListener(this.onChange);

	}

	componentWillUnmount () {

		// ExampleStore.removeChangeListener(this.onChange);

	}

	componentDidUpdate () {

		//

	}

	onMapMove () {

		// TODO: emit event that is picked up by hash manager component
		// this.updateURL({loc: hashUtils.formatCenterAndZoom(evt.target)}, true);
		console.log(">>>>> map moved");

	}

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
						<div className='row top-row template-tile'>
							<Map center={loc} zoom={zoom}>
								<TileLayer
									url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
									attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								/>
							</Map>
							{/*
							<LeafletMap ref="map" location={loc} zoom={zoom} mapEvents={mapEvents} mapOptions={mapOptions}>
								<CartoTileLayer/>
								<TileLayer src="http://ec2-52-3-95-39.compute-1.amazonaws.com/richmond-terrain/{z}/{x}/{y}.png" attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors | Designed by <a href='http://stamen.com?from=richmondatlas'>Stamen Design</a>" />
								<GeoJSONLayer featuregroup={this.state.dairylinesData} className='diary-lines' filter={DiaryLinesStore.onFilter} onEachFeature={DiaryLinesStore.onEachFeature} featuresChange={false}/>
							</LeafletMap>
							*/}
						</div>
						<div className='row bottom-row template-tile'>
						</div>
					</div>
					<div className='columns four full-height'>
						<div className='row top-row template-tile'>
						</div>
						<div className='row bottom-row template-tile'>
						</div>
					</div>
				</div>
			</div>
		);

	}

}

// property validation
App.propTypes = {

	/*
	legendData: React.PropTypes.object,
	exampleTitle: React.PropTypes.string,
	*/

};

// property defaults
// (instead of ES5-style getDefaultProps)
App.defaultProps = {

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
