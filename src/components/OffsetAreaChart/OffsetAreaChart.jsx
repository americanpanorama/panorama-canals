import d3 from 'd3';
import ChartBase from '../charts/ChartBase';
import PanoramaChart from '../charts/PanoramaChart.jsx';
import AreaChart from '../AreaChart/AreaChart.jsx';
import React, { PropTypes } from 'react';
// import './style.scss';


export default class OffsetAreaChart extends PanoramaChart {

  // extend superclass `props` validators
  static propTypes = Object.assign({}, AreaChart.propTypes, {
    chartSpacing: PropTypes.number,
  });

  // extend superclass `props` defaults
  static defaultProps = Object.assign({}, AreaChart.defaultProps, {
    chartSpacing: 4
  });

  constructor (props) {
    super(props);
    this.chartConstructor = OffsetAreaChartImpl;
  }

  getClassSuffix () {
    return 'offset-area-chart';
  }

  render () {

    // TODO: Timeline will apply horizontal axis and scrub/brush interaction to another component,
    // and emit events as it's interacted with.

    return (
      <div className='panorama offset-area-chart'>
        {this.props.data.map((chartData, i) => {

          let config = Object.assign({}, this.props, {
            data: [chartData],
            axisProps: null
          });

          return (
            <AreaChart key={i} { ...config } style={ { 'top': i * this.props.chartSpacing + 'px' } } />
          );

        })}
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
    this.baseLayer = this.base.append('g').classed('offset-area-layer', true);

    this.updateDimensions();

  }

}
