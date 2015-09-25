import * as React from 'react';
import * as Leaflet from 'leaflet';

export class LeafletMap extends React.Component {

	constructor (props) {

		super(props);

		this.state = {};

	}

	componentDidMount () {

		L.Icon.Default.imagePath = "static";

		var map = L.map(React.findDOMNode(this).querySelector(".leaflet-container"), this.props.mapOptions || {})
			.setView(this.props.location, this.props.zoom);

		map._initPathRoot();

		this.map = map;

		React.Children.forEach(this.props.children, function(child, i) {

			if (!child.props.leafletLayer.isManager) {
				child.props.leafletLayer.setZIndex(i+10);
				child.props.leafletLayer.addTo(map);
			} else {
				child.props.leafletLayer.setMap(map);
			}

		});

		var me = this;
		if (this.props.mapEvents) {
			for (var evt in this.props.mapEvents) {
				map.on(evt, me.props.mapEvents[evt]);
			}
		}

	}

	componentWillUnmount () {
		this.map.clearAllEventListeners();
		this.map = null;
	}

	render () {
		return (
				<div className="component full-height">
					<div className="leaflet-container"></div>
					{this.props.children}
				</div>
		);
	}

}

//
// Leaflet tile layer
//
export class TileLayer extends React.Component {

	constructor (props) {

		super(props);

		this.state = {};

	}

	componentDidMount () {

		 this.props.leafletLayer = L.tileLayer(this.props.src, this.props);

	}

	render () {

		return false;

	}

}

//
// Leaflet geoJSON layer
//
export class GeoJSONLayer extends React.Component {

	constructor (props) {

		super(props);

		this.state = {};

	}

	addFeatures () {

		var that = this;
		if (!this.props.featuregroup || !this.props.featuregroup.features) return;

		var ct = 0;
		this.props.featuregroup.features.forEach(function(feature) {
			that.layer.addData(feature);
			ct += 1;
		});

		if (ct > 0) this.loaded = true;

		if (this.props.onClick) {
			this.layer.eachLayer(function(layer) {
				layer.on("click", function(e) {
					that.props.onClick(layer, e);
				});
			});
		}

		if (this.props.fitBounds) {
			// TODO: Hack to wait for map to be ready
			setTimeout(function(){
				if (that.layer._map) that.layer._map.fitBounds(that.layer.getBounds(),{padding:[5,5]})
			}, 100);

		}

	}

	componentDidMount () {

		this.layer = L.geoJson(null, this.props);
		this.props.leafletLayer = this.layer;
		this.addFeatures();

	}

	componentWillUnmount () {

		this.layer = null;
		if (this.props.onClick) {
			this.layer.off("click", this.props.onClick);
		}

	}

	componentDidUpdate () {

		var that = this;
		if (!this.props.featuresChange && this.loaded) return;

		this.layer.eachLayer(function(layer) {
			that.layer.removeLayer(layer);
		});

		this.addFeatures();

	}

	render () {

		return false;

	}

}
