import d3 from 'd3';
import ChartBase from '../charts/ChartBase';
import PanoramaChart from '../charts/PanoramaChart.jsx';
import AreaChart from '../AreaChart/AreaChart.jsx';
import React, { PropTypes } from 'react';
// import './style.scss';


export default class OffsetAreaChart extends PanoramaChart {

  // extend superclass `props` validators
  static propTypes = Object.assign({}, AreaChart.propTypes, {
    areaChartData: PropTypes.array,
    chartSpacing: PropTypes.number,
  });

  // extend superclass `props` defaults
  static defaultProps = Object.assign({}, AreaChart.defaultProps, {
    areaChartData: [],
    chartSpacing: 4
  });

  constructor (props) {
    super(props);
    this.chartConstructor = OffsetAreaChartImpl;
  }

  getClassSuffix () {
    return 'offset-area-chart';
  }

  renderChildren () {

    // TODO: Timeline will apply horizontal axis and scrub/brush interaction to another component,
    // and emit events as it's interacted with.

    var baseYOffset = -this.props.areaChartData.length * this.props.chartSpacing;

    return (
      <div>
        { this.props.areaChartData.map((chartData, i) => {

          // Merge areaChartConfig onto config from this.props
          // (values in this.props.areaChartConfig override those in this.props)
          let config = Object.assign({}, this.props, this.props.areaChartConfig, {
            // pass each dataset to each AreaChart instance
            data: [chartData],

            // set size to fit within margins
            width: this.props.width - this.props.margin.left - this.props.margin.right,
            height: this.props.height - this.props.margin.top - this.props.margin.bottom,

            // eliminate margin of each AreaChart
            margin: { top: 0, right: 0, bottom: 0, left: 0 },

            // suppress axes of each AreaChart
            axisProps: null
          });

          return (
            <AreaChart key={i} { ...config } style={ {
              'left': this.props.margin.left + 'px',
              'top': baseYOffset + i * this.props.chartSpacing + 'px'
            } } />
          );

        }) }
      </div>
    );

  }

}

export class OffsetAreaChartImpl extends ChartBase {

  constructor (selection, props) {

    super(selection, props);

    // TODO: OffsetAreaChartImpl will:
    // - draw axes
    // - draw horizontal rules for areacharts
    // - draw dots for commodity data presence

    // append group to chart
    let offsetArea = this.baseLayer = this.base.append('g').classed('offset-area-layer', true);

    this.updateDimensions();

    // define layer
    let layer = this.layer('offset-area-layer', offsetArea, {
      dataBind: function (data) {
        return this.selectAll('line.lifespan').data(data);
      },

      insert: function () {
        return this.append('line')
          .attr('class', 'lifespan');
      }
    });


    // Setup life-cycle events on layers
    layer.on('update', function () {
      // this => base selection
    })
    .on('enter', function () {
      // this => enter selection
    })
    .on('merge', function () {
      // this => base selection
      return this;
        // .attr('transform', function(d,i) { return 'translate(0,' + chartheight + ')'; })
        // .attr('x1', function(d) { return timescale(canalLookup[d[0].canal_id].opened); })
        // .attr('x2', function(d) { return timescale(canalLookup[d[0].canal_id].closed); })
        // .attr('y1', function(d,i) { return -((stackData.length-i)*offset); })
        // .attr('y2', function(d,i) { return -((stackData.length-i)*offset); })
        // .style('stroke', function(d) { return colorIfActive(d[0].canal_id); })
        // .attr('stroke-width', 1)

    })
    .on('exit', function () {
      // this => exit selection
    });

  }

  updateScales (data) {

    this.config('xScale').range([0, this._innerWidth]);
    this.config('yScale').range([this._innerHeight, 0]);

  }
  /*
  // Do something before `dataBind`
  preDraw (data) {

    this.updateDimensions();
    this.updateScales(data);

    let margin = this.config('margin');

    if (this.config('xAxis')) {
      this.config('xAxis').update(
        this.config('xScale'),
        [margin.left, this._innerHeight]
      );
    }
    if (this.config('yAxis')) {
      this.config('yAxis').update(
        this.config('yScale'),
        [margin.left, margin.top]
      );
    }

  }
  */


}
