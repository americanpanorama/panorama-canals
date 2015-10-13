/*
 * TODO: Move this into @panorama/toolkit.
 */
import * as React from 'react';

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

		// TODO: pass in selected date and canal via props
		// this.props.date = 
		// this.props.canal = 

	}

	componentWillUnmount () {

		//

	}

	componentDidUpdate () {

		//

	}

	render () {

		console.log(">>>>> Punchcard.render with header:", this.props.header, " categories:", this.props.categories);

		// TODO: add more data to commodities witghin categories, in store??

		return (
			<div className='panorama punchcard'>
				<div className='container'>
				</div>
			</div>

		);

	}

}
