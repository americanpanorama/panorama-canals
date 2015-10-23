import d3 from 'd3';
import Koto from 'koto';
import Axis from './Axis';

export default class ChartBase extends Koto {

  constructor (selection) {

    super(selection);

    this.configs['width'] = { value: 600 };
    this.configs['height'] = { value: 400 };
    this.configs['margin'] = { value: { top: 20, right: 30, bottom: 20, left: 30 } };

    this.xAxis = new Axis(this.base, 'x');
    this.yAxis = new Axis(this.base, 'y');

  }

  /**
   * Default implementation of d3-style 'conventional margins'
   * (sim. to: http://bl.ocks.org/mbostock/3019563)
   */
  updateDimensions () {

    var margin = this.configs['margin'].value;
    this._width = this.configs['width'].value - margin.left - margin.right;
    this._height = this.configs['height'].value - margin.top - margin.bottom;

    this.base.attr('height', this.configs['height'].value);
    this.base.attr('width', this.configs['width'].value);

    this.baseLayer.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    if (this.xAxis) this.xAxis.config('offset', [margin.left, this._height + margin.bottom]);
    if (this.yAxis) this.yAxis.config('offset', [margin.left, margin.top]);

  }

  updateScales (data) {

    this.xScale.range([0, this._width]);
    this.yScale.range([this._height, 0])

    // default to set domain to all xAccesssor values along x-axis,
    // and 0 <> max yAccessor value along y-axis.
    this.xScale.domain(data.map(d => this.accessor('x')(d)));
    this.yScale.domain([0, d3.max(data, d => this.accessor('y')(d))]);

  }

  updateAxes () {

    if (this.xAxis) this.xAxis.config('scale', this.xScale);
    if (this.yAxis) this.yAxis.config('scale', this.yScale);

  }

  destroy () {

    this.base.remove();
    this.base = null;

  }

}
