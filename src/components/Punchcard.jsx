/*
 * TODO: Move this into @panorama/toolkit.
 */
import * as React from 'react';
import * as d3 from 'd3';

export default class Punchcard extends React.Component {

	// property validation
	static propTypes = {

		// title: React.PropTypes.string

	};

	// property defaults (ES7-style React)
	// (instead of ES5-style getDefaultProps)
	static defaultProps = {

		//
		
	};

	constructor (props) {

		super(props);

		// set up initial state (instead of ES5-style getInitialState)
		// this.state = 

		// bind handlers to this component instance,
		// since React no longer does this automatically when using ES6
		// this.onThingClicked = this.onThingClicked.bind(this);

	}

	componentWillMount () {

		//

	}

	componentDidMount () {

		// Decompose ES6 Maps for d3 to consume
		var categories = this.props.categories ? Array.from(this.props.categories.values()) : null;
		var items = this.props.items ? Array.from(this.props.items.values()) : null;

		d3Punchcard.create(this.refs.content.getDOMNode(), categories, items);

	}

	componentWillUnmount () {

		d3Punchcard.destroy(this.refs.content.getDOMNode());

	}

	componentDidUpdate () {

		// Decompose ES6 Maps for d3 to consume
		var categories = this.props.categories ? Array.from(this.props.categories.values()) : null;
		var items = this.props.items ? Array.from(this.props.items.values()) : null;

		d3Punchcard.update(this.refs.content.getDOMNode(), categories, items);

	}

	render () {

		return (
			<div className='panorama punchcard'>
				<div className='header' ref='header'></div>
				<div className='content' ref='content'></div>
			</div>

		);

	}

}

const d3Punchcard = {

	// layout constants
	ROW_HEIGHT: 20,
	COMMODITY_TEXT_OFFSET_Y: 5,

	/**
	 * Any necessary setup for d3 component goes here.
	 */
	create: function (node, categories, items) {

		if (categories && items) {
			this.update(node, categories, items);
		}
	
	},

	/**
	 * Logic for updating d3 component with new data.
	 */
	update: function (node, categories, items) {

		let scope = this,

			// scale by normalizedValue of all items
		    rScale = d3.scale.sqrt()
				.range([2, 8])
				.domain([1, d3.max(items, (d) => d.get('normalizedValue'))]),

			// color by aggregateNormalizedValue of all categories
		    colorScale = d3.scale.ordinal()
				.range(['rgb(188, 35, 64)', 'rgb(228, 104, 75)', 'rgb(187, 27, 105)', 'rgb(103, 116, 99)', 'rgb(26, 169, 143)', 'rgb(10, 103, 150)', 'rgb(67, 40, 93)', 'rgb(86, 96, 99)'])
				.domain([1, d3.max(categories, (d) => d.get('aggregateNormalizedValue'))]);

		// <div> for each category
		let categoryNodes = d3.select(node)
			.selectAll('div')
			.data(categories)
			.enter().append('div')
			.attr('style', (d) => `color: ${ colorScale(d.get('aggregateNormalizedValue')) };`)
			.attr('class', 'category');

		// each with a heading...
		categoryNodes
			.append('h4')
			.text((d) => d.get('name'));

		// ...and an <svg>
		categoryNodes = categoryNodes
			.append('svg')
			// .attr('width', '50%')
			.attr('height', (d) => d.get('commodities').size * scope.ROW_HEIGHT)
			.style('fill', (d) => colorScale(d.get('aggregateNormalizedValue')));

		// <g> for each commodity within each category
		let commodityNodes = categoryNodes.selectAll('g')
			.data((d) => Array.from(d.get('commodities')))
			.enter().append('g')
			.attr('transform', (d, i) => `translate(${ 0.5 * scope.ROW_HEIGHT }, ${ (i+0.5) * scope.ROW_HEIGHT })`);

		// <circle> displaying scaled amount of each commodity
		commodityNodes.append('circle')
			.attr('r', (d) => rScale(d.get('normalizedValue')));

		// <text> displaying name of each commodity
		commodityNodes.append('text')
			.text((d) => d.get('name'))
			.attr('x', 2 * scope.ROW_HEIGHT)
			.attr('y', scope.COMMODITY_TEXT_OFFSET_Y);

	},

	/**
	 * Any necessary cleanup for d3 component goes here.
	 */
	destroy: function (node) {

		//

	}

};
