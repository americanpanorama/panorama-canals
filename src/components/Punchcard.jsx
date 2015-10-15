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

		d3Punchcard.init();

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

	ROW_HEIGHT: 20,

	timescale: null,
	radius: null,
	color: null,

	/*
	timescale: d3.scale.linear()
		.range([0,chartwidth])
		.domain([1800,1920]),

	radius: d3.scale.sqrt()
		.range([2,8]),

	color: d3.scale.ordinal()
		.range(["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"])
		.domain(d3.range(1,9)),

	*/

	init: function () {

		//

	},

	create: function (node, categories, items) {

		/*
		let svg = d3.select(node).append('svg')
		if (width) {
			svg.attr('width', width);
		}
		if (height) {
			svg.attr('height', height);
		}
		*/
		if (categories && items) {
			this.update(node, categories, items);
		}
	
	},

	update: function (node, categories, items) {

		let rScale = d3.scale.sqrt()
			.range([2, 8])
			.domain([1, d3.max(items, (d) => d.get('normalizedValue'))]);

		let colorScale = d3.scale.ordinal()
			.range(['rgb(188, 35, 64)', 'rgb(228, 104, 75)', 'rgb(187, 27, 105)', 'rgb(103, 116, 99)', 'rgb(26, 169, 143)', 'rgb(10, 103, 150)', 'rgb(67, 40, 93)', 'rgb(86, 96, 99)'])
			.domain([1, d3.max(items, (d) => d.get('normalizedValue'))]);

		let scope = this;

		// <div> for each category
		let categoryNodes = d3.select(node)
			.selectAll('div')
			.data(categories)
			.enter().append('div')
			.attr('class', 'category')

			// each containing an <svg>
			.append('svg')
			.attr('width', '100%')
			.attr('height', (d) => d.get('commodities').size * scope.ROW_HEIGHT);

		// <g> for each commodity within each category
		let commodityNodes = categoryNodes.selectAll('g')
			.data((d) => Array.from(d.get('commodities')))
			.enter().append('g')
			.attr('transform', (d, i) => `translate(${ 0.5 * scope.ROW_HEIGHT }, ${ (i+0.5) * scope.ROW_HEIGHT })`);

		// <circle> displaying scaled amount of each commodity
		commodityNodes.append('circle')
			.attr('r', (d) => rScale(d.get('normalizedValue')))
			.style('fill', (d) => colorScale(d.get('normalizedValue')));

		// <text> displaying name of each commodity
		commodityNodes.append('text')
			.text((d) => d.get('name'))
			.attr('x', 2 * scope.ROW_HEIGHT)
			.attr('y', 0.3 * scope.ROW_HEIGHT);

	},

	destroy: function (node) {

		//

	}

};
