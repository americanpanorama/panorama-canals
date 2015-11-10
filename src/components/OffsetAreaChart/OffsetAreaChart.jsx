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
    colorPalette: PropTypes.array,
    selectedChartId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    chartIdAccessor: PropTypes.func
  });

  // extend superclass `props` defaults
  static defaultProps = Object.assign({}, AreaChart.defaultProps, {
    areaChartData: [],
    chartSpacing: 4,
    colorPalette: null,
    selectedChartId: null,
    chartIdAccessor: null
  });

  constructor (props) {
    super(props);
    this.chartConstructor = OffsetAreaChartImpl;

    // This accessor is implemented by the React component rather than the Koto chart,
    // but the Koto-style pattern of passing an accessor rather than giving the component
    // knowledge of the data structure remains the same.
    this.chartIdAccessor = props.chartIdAccessor;
  }

  getClassSuffix () {
    return 'offset-area-chart';
  }

  renderChildren () {

    let baseYOffset = -this.props.areaChartData.length * this.props.chartSpacing;

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

          if (this.props.colorPalette) {
            config.fillColor = this.props.colorPalette[i % this.props.colorPalette.length];
          }

          if (this.props.selectedChartId && this.props.chartIdAccessor) {
            let chartId = this.props.chartIdAccessor(chartData);
            config.fillOpacity = this.props.selectedChartId === chartId ? 0.9 : 0.5;
          }

          return (
            <AreaChart key={ i } { ...config } style={ {
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

    // append group to chart
    let offsetArea = this.baseLayer = this.base.append('g').classed('offset-area-layer', true);

    let chart = this;

    this.updateDimensions();

    // define layer
    let layer = this.layer('offset-area-layer', offsetArea, {
      dataBind: function (data) {
        return this.selectAll('line.lifespan').data(data);
      },

      insert: function () {
        let baseYOffset = chart.config('height') - chart.config('margin').bottom - this.size() * props.chartSpacing,
          domain = chart.config('xScale').domain();
        return this.append('line')
          .attr('class', 'lifespan')
          .attr('x1', d => chart.config('xScale')(
            Math.max(chart.accessor('x')(d, 0), domain[0])
          ))
          .attr('x2', d => chart.config('xScale')(
            Math.min(chart.accessor('x')(d, 1), domain[1])
          ))
          .attr('y1', 0)
          .attr('y2', 0)
          .attr('transform', (d, i) => 'translate(0,' + (baseYOffset + i * props.chartSpacing) + ')')
          .style('stroke', (d, i) => props.colorPalette[i % props.colorPalette.length]);
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
    })
    .on('exit', function () {
      // this => exit selection
    });

  }

  updateScales (data) {

    this.config('xScale').range([0, this._innerWidth]);
    this.config('yScale').range([this._innerHeight, 0]);

  }

}
