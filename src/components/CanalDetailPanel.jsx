import React, { PropTypes } from 'react';
import ReactTabs, { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export default class CanalDetailPanel extends React.Component {

	// property validation (ES7-style React)
	static propTypes = {
		canal: PropTypes.object,
		commodities: PropTypes.array
	};

	// property defaults (ES7-style React)
	// (instead of ES5-style getDefaultProps)
	static defaultProps = {
		//
	};

	constructor (props) {

		super(props);

	}



	// ============================================================ //
	// Lifecycle
	// ============================================================ //

	componentWillMount () {

	}

	componentDidMount () {

	}

	componentWillUnmount () {

	}

	componentDidUpdate () {

	}

	onTabSelected (index, last) {

		console.log('>>>>> Selected tab: ' + index + ', Last tab: ' + last);

	}

	render () {

		return (
			<Tabs
				onSelect={ this.onTabSelecteded }
				selectedIndex={ 0 }
			>
				<TabList>
					<Tab>CANAL INFO</Tab>
					<Tab>COMMODITIES</Tab>
				</TabList>
				<TabPanel>
					<h2>ABOUT THE CANAL</h2>
				</TabPanel>
				<TabPanel>
					<h2>COMMODITIES</h2>
				</TabPanel>
			</Tabs>
		);

	}

}
