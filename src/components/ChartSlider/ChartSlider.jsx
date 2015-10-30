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
    scale: d3.scale.linear()
      .clamp(true),
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
    console.log(">>>>> ctor scale.domain:", props.scale.domain());

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

    // TODO: would be nice to not have to maintain this state.
    // It's needed in onBrushMove(), and is updated in update()...
    this.node = node;
    this.margin = margin;

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

    this.brush = d3.svg.brush()
      .on('brush', this.onBrushMoved.bind(this));

    let svg = d3.select(node).append('svg');
    svg.append('g')
      .attr('class', 'axis tertiary');
    svg.append('g')
      .attr('class', 'axis secondary');
    svg.append('g')
      .attr('class', 'axis primary');

    let slider = svg.append('g')
      .attr('class', 'slider');
    
    this.handle = slider.append('line')
      .attr({
        class: 'handle',
        'x1': 0,
        'x2': 0,
        'y1': 0,
        'y2': '100%'
      });

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

    this.node = node;

    // update axis
    scale.range([0, node.offsetWidth - margin.left - margin.right]);
    this.axisPrimary.scale(scale);
    this.axisSecondary.scale(scale);
    this.axisTertiary.scale(scale);
    this.brush.x(scale);

    // apply size and position
    let axisTranform = `translate(${ margin.left }, ${ node.offsetHeight - margin.bottom })`;
    let svg = d3.select(node).select('svg');
    svg
      .attr('width', '100%')
      .attr('height', '100%');

    // draw axes
    svg.select('.axis.primary')
      .call(this.axisPrimary)
      .attr('transform', axisTranform)
    
    // position labels
    .selectAll('text')
      .attr('y', Math.floor(2/3 * margin.bottom));

    // draw secondary and tertiary axes (just smaller ticks)
    svg.select('.axis.secondary')
      .call(this.axisSecondary)
      .attr('transform', axisTranform);

    svg.select('.axis.tertiary')
      .call(this.axisTertiary)
      .attr('transform', axisTranform);

    // draw brush
    svg.select('.slider')
      .call(this.brush)
      .attr('transform', `translate(${ margin.left }, 0)`)
    .select('.extent')
      // TODO: how to widen hit area? maybe .background?
      // width of .extent is reset on 'brush' event 
      // .attr('width', 20)
      .attr('height', '100%');

    let extent = this.brush.extent();
    console.log(">>>>> extent before:", extent);
    this.brush.extent([scale.invert(extent[0]), scale.invert(extent[0]) + 2]);
    console.log(">>>>> extent after:", this.brush.extent());

  },

  /**
   * Any necessary cleanup for d3 component goes here.
   *
   * @param  {Node}    HTMLElement to which d3 was attached
   */
  destroy: function (node) {

    d3.select(node).html('');

    this.node = null;
    this.margin = null;
    this.axisPrimary = null;
    this.axisSecondary = null;
    this.axisTertiary = null;
    this.brush = null;
    this.handle = null;

  },

  onBrushMoved: function () {

    // domain: 1820 <> 1860
    // range: 0 <> width (minus margins)
    let scale = this.brush.x(),
      domain = scale.domain(),
      mouseX = d3.mouse(this.node)[0] - this.margin.left,
      year = scale.invert(mouseX);

    // clamp and quantize
    year = Math.round(Math.max(domain[0], Math.min(domain[1], year)));

    console.log(">>>>> year:", year, "mouseX:", mouseX);

    // this.brush.extent([year - 1, year + 1]);
    d3.select(this.node).select('svg').select('.slider')
      .call(this.brush.extent([year, year + 2]));
    
    let brushCenter = scale(year + 1);
    this.handle.attr({
      x1: brushCenter,
      x2: brushCenter
    });
    

    /*
    let rawVal = this.brush.x().invert(d3.mouse(this.node)[0]),
    brush = this.brush;

    let year = this.brush.extent()[0],
      val = this.brush.x().invert(d3.mouse(node)[0]),
      pos = this.brush.x()(val);
    console.log(">>>>> brush moved; year:", year, "val:", val, "pos:", pos);

    this.brush.extent([year - 1, year + 1]);

    console.log(">>>>> event:", d3.event);

    this.handle.attr({
      x1: pos,
      x2: pos
    });
    */

  }

};
