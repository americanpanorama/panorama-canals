import d3 from 'd3';
import ChartBase from '../charts/ChartBase';
import PanoramaChart from '../charts/PanoramaChart.jsx';
// import './style.scss';

export default class AreaChart extends PanoramaChart {
	constructor (props) {
		super(props);
		this.chartConstructor = AreaChartImpl;
	}

	getClassSuffix () {
		return 'area-chart';
	}
}

export class AreaChartImpl extends ChartBase {

	constructor (selection) {

		super(selection);

		let _Chart = this;

		// TODO: these consts and functions should live elsewhere,
		// and have generalized names...
		let areaGenerator = d3.svg.area()
			.interpolate("basis")
			// .x(function(d) { return xScale(d.year); })
			// .y0(function(d) { return yScale(0); })
			// .y1(function(d) { return yScale(d.y); });

			// .x(function(d) { return xScale(_Chart.accessor('x')(d)); })
			// .y0(function(d) { return yScale(0); })
			// .y1(function(d) { return yScale(_Chart.accessor('y')(d)); });

			.x(d => this.xScale(this.accessor('x')(d)))
			.y0(d => this.yScale(0))
			.y1(d => this.yScale(this.accessor('y')(d)));


		// append group to chart
		var area = this.baseLayer = this.base.append('g').classed('area-layer', true);

		this.updateDimensions();

		// define layer
		let layer = this.layer('area-layer', area, {

			dataBind: function (data) {
				return this.selectAll('path.area').data(data);
			},

			insert: function () {

				return this.append('path')
					.attr('class', 'area')
					.style('fill', 'steelblue');

			}

		});

		// Setup life-cycle events on layers
		layer.on('update', function () {
			// this => base selection
			return this
				.attr('d', d => areaGenerator(d));
		})
		.on('enter', function () {
			// this => enter selection
			return this
				.attr('d', d => areaGenerator(d));
		})
		.on('merge', function () {
			// this => base selection
		})
		.on('exit', function () {
			// this => exit selection
		});
	}

	updateScales (data) {

		/*
		var _Chart = this;
		this.xScale.rangeRoundBands([0, this._width], this.configs['barSpacing'].value);
		this.yScale.range([this._height, 0]);
		this.xScale.domain(data.map(function(d) { return _Chart.accessor('x')(d); }));
		this.yScale.domain([0, d3.max(data, function(d) { return _Chart.accessor('y')(d); })]);

		if (this.xAxis) this.xAxis.config('scale', this.xScale);
		if (this.yAxis) this.yAxis.config('scale', this.yScale);
		*/

		// TODO: these consts and functions should be passed in and set on Koto instance;
		// currently, ChartBase hardcodes the scales.
		const MIN_X = 1820;
		const MAX_X = 1860;
		const MIN_Y = 0;
		const MAX_Y = 4000000;
		this.xScale = d3.scale.linear()
			.range([0, this._width])
			.domain([MIN_X, MAX_X]);

		this.yScale = d3.scale.linear()
			.range([this._height, 0])
			.domain([MIN_Y, MAX_Y]);

	}

	updateDimensions () {

		// TODO: this 'conventional margins' logic should exist
		// higher up the inheritance chain, perhaps in ChartBase.
		var margin = this.configs['margin'].value;
		this._width = this.configs['width'].value - margin.left - margin.right;
		this._height = this.configs['height'].value - margin.top - margin.bottom;

		this.base.attr('height', this.configs['height'].value);
		this.base.attr('width', this.configs['width'].value);

		this.baseLayer.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		if (this.xAxis) this.xAxis.config('offset', [margin.left, this._height + margin.bottom]);
		if (this.yAxis) this.yAxis.config('offset', [margin.left, margin.top]);

	}

	// Do something before `dataBind`
	preDraw (data) {

		this.updateDimensions();
		this.updateScales(data);

		if (this.xAxis) this.xAxis.update();
		if (this.yAxis) {
			this.yAxis.config('orient', 'left');
			this.yAxis.update();
		}

	}
}
