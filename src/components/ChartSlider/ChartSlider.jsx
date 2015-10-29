import React, { PropTypes, Children } from 'react';
import * as d3 from 'd3';
// import './style.scss';

export default class ChartSlider extends React.Component {

  // property validation
  static propTypes = {
    scale: PropTypes.func,
    orient: PropTypes.string,
    margin: PropTypes.shape({
      top: PropTypes.number,
      right: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number
    }),
  };

  // property defaults (ES7-style React)
  // (instead of ES5-style getDefaultProps)
  static defaultProps = {
    scale: d3.scale.linear(),
    orient: 'bottom',
    margin: {
      top: 20,
      right: 30,
      bottom: 20,
      left: 30
    },
  };

  constructor (props) {

    super(props);

    // bind handlers to this component instance,
    // since React no longer does this automatically when using ES6
    // this.onThingClicked = this.onThingClicked.bind(this);

  }

  componentWillMount () {

  }

  componentDidMount () {

    d3ChartSlider.create(this.refs.axis, this.props.scale, this.props.orient, this.props.margin);

    // Rerender in order to pass measured width down to child component
    this.forceUpdate();

  }

  componentDidUpdate () {

    d3ChartSlider.update(this.refs.axis, this.props.scale, this.props.orient, this.props.margin);

  }

  componentWillUnmount () {

    d3ChartSlider.destroy(this.refs.axis);

  }

  render () {

    // Attempt to measure container width, to pass down to child component
    let node;
    try {
      node = React.findDOMNode(this);
    } catch (e) {}

    let numChildren = Children.count(this.props.children);
    if (numChildren > 1) {
      console.warn(`ChartSlider is designed to wrap only one child component, but it found ${ numChildren } children.`);
    }

    return (
      <div className='panorama chart-slider'>
        { 
          // Set width/height on the single child component
          React.cloneElement(this.props.children, {
            width: node ? node.offsetWidth : this.props.width,
            height: this.props.height
          })
        }
        <div className='top-rule' style={ {
          marginLeft: this.props.margin.left + "px",
          marginRight: this.props.margin.right + "px",
          width: `calc(100% - ${ this.props.margin.left + this.props.margin.right }px)`
        } } />
        <div className='slider' />
        <div className='d3-chart-slider' ref='axis'/>
      </div>

    );

  }

}


const d3ChartSlider = {

  /**
   * Any necessary setup for d3 component goes here.
   *
   * @param  {Node}     HTMLElement to which d3 will attach
   * @param  {Function} d3 scale to use for the axis
   * @param  {String}   orientation of the axis (per d3.axis.orient)
   * @param  {Object}   Object specifying margins around the component
   */
  create: function (node, scale, orient, margin) {

    this.axisPrimary = d3.svg.axis()
      .orient(orient)
      .ticks(5)
      .tickFormat(String)
      .tickSize(13);

    this.axisSecondary = d3.svg.axis()
      .orient(orient)
      .ticks(10)
      .tickFormat(d => '')
      .tickSize(10);

    this.axisTertiary = d3.svg.axis()
      .orient(orient)
      .ticks(40)
      .tickFormat(d => '')
      .tickSize(7);

    let svg = d3.select(node).append('svg');
    svg.append('g')
      .attr("class", "axis tertiary");
    svg.append('g')
      .attr("class", "axis secondary");
    svg.append('g')
      .attr("class", "axis primary");

    this.update(node, scale, orient, margin);

  },

  /**
   * Logic for updating d3 component with new data.
   *
   * @param  {Node}     HTMLElement to which d3 will attach
   * @param  {Function} d3 scale to use for the axis
   * @param  {String}   orientation of the axis (per d3.axis.orient)
   * @param  {Object}   Object specifying margins around the component
   */
  update: function (node, scale, orient, margin) {

    // update axis
    scale.range([0, node.offsetWidth - margin.left - margin.right]);
    this.axisPrimary.scale(scale);
    this.axisSecondary.scale(scale);
    this.axisTertiary.scale(scale);

    // apply size and position
    let axisTranform = `translate(${ margin.left }, ${ node.offsetHeight - margin.bottom })`;
    let svg = d3.select(node).select('svg');
    svg
      .attr('width', '100%')
      .attr('height', '100%')

    // draw axes
    .select('.axis.primary')
      .call(this.axisPrimary)
      .attr('transform', axisTranform)
    
    // position labels
    .selectAll("text")
      .attr("y", Math.floor(2/3 * margin.bottom));

    // draw secondary and tertiary axes (just smaller ticks)
    svg.select('.axis.secondary')
      .call(this.axisSecondary)
      .attr('transform', axisTranform)

    svg.select('.axis.tertiary')
      .call(this.axisTertiary)
      .attr('transform', axisTranform)

  },

  /**
   * Any necessary cleanup for d3 component goes here.
   *
   * @param  {Node}    HTMLElement to which d3 was attached
   */
  destroy: function (node) {

    d3.select(node).html('');

  }

};
