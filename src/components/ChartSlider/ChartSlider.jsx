import React, { PropTypes, Children } from 'react';
import * as d3 from 'd3';
// import './style.scss';

export default class ChartSlider extends React.Component {

  // property validation
  static propTypes = {
    scale: PropTypes.func,
    direction: PropTypes.string
  };

  // property defaults (ES7-style React)
  // (instead of ES5-style getDefaultProps)
  static defaultProps = {
    scale: d3.scale.linear(),
    direction: 'horizontal'
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

    let childNode = React.findDOMNode(this.refs.childNode);

    d3ChartSlider.create(this.refs.content, this.props.scale);

    // Rerender in order to pass measured width down to children
    this.forceUpdate();

  }

  componentDidUpdate () {

    d3ChartSlider.update(this.refs.content, this.props.scale);

  }

  componentWillUnmount () {

    d3ChartSlider.destroy(this.refs.content);

  }

  render () {

    // Attempt to measure container width, to pass down to children.
    let node;
    try {
      node = React.findDOMNode(this);
    } catch (e) {}

    return (
      <div className='panorama chart-slider'>
        { 
          // Make the DOM Node of the single child available as a ref
          React.cloneElement(this.props.children, {
            ref: 'childNode',
            width: node ? node.offsetWidth : this.props.width,
            height: this.props.height
          })
        }
        <div className='content' ref='content'></div>
      </div>

    );

  }

}


const d3ChartSlider = {

  /**
   * Any necessary setup for d3 component goes here.
   *
   * @param  {Node}    HTMLElement to which d3 will attach
   * @param  {Object}  Categorized map of items (TODO: document expected format)
   * @param  {Object}  Flat map of items (TODO: document expected format)
   */
  create: function (node, categories, items) {

    this.update(node, categories, items);

  },

  /**
   * Logic for updating d3 component with new data.
   *
   * @param  {Node}    HTMLElement to which d3 will attach
   * @param  {Object}  Categorized map of items (TODO: document expected format)
   * @param  {Object}  Flat map of items (TODO: document expected format)
   */
  update: function (node, categories, items) {

    /*
    let scope = this,

      // scale by normalizedValue of all items
      rScale = d3.scale.sqrt()
      .range([2, 8])
      .domain([1, d3.max(items, (d) => d.normalizedValue)]),

      // color by aggregateNormalizedValue of all categories
      colorScale = d3.scale.ordinal()
      .range(['rgb(188, 35, 64)', 'rgb(228, 104, 75)', 'rgb(187, 27, 105)', 'rgb(103, 116, 99)', 'rgb(26, 169, 143)', 'rgb(10, 103, 150)', 'rgb(67, 40, 93)', 'rgb(86, 96, 99)'])
      .domain([1, d3.max(categories, (d) => d.aggregateNormalizedValue)]);

    // <div> for each category
    let categoryNodes = d3.select(node)
      .selectAll('div')
      .data(categories)
      .enter().append('div')
      .attr('style', (d) => `color: ${ colorScale(d.aggregateNormalizedValue) };`)
      .attr('class', 'category');

    // each with a heading...
    categoryNodes
      .append('h4')
      .text((d) => d.name);

    // ...and an <svg>
    categoryNodes = categoryNodes
      .append('svg')
      // .attr('width', '50%')
      .attr('height', (d) => d.commodities.length * scope.ROW_HEIGHT)
      .style('fill', (d) => colorScale(d.aggregateNormalizedValue));

    // <g> for each commodity within each category
    let commodityNodes = categoryNodes.selectAll('g')
      .data((d) => d.commodities)
      .enter().append('g')
      .attr('transform', (d, i) => `translate(${ 0.5 * scope.ROW_HEIGHT }, ${ (i+0.5) * scope.ROW_HEIGHT })`);

    // <circle> displaying scaled amount of each commodity
    commodityNodes.append('circle')
      .attr('r', (d) => rScale(d.normalizedValue));

    // <text> displaying name of each commodity
    commodityNodes.append('text')
      .text((d) => d.name)
      .attr('x', 2 * scope.ROW_HEIGHT)
      .attr('y', scope.COMMODITY_TEXT_OFFSET_Y);

      */

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
