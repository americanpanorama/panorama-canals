import React, { PropTypes } from 'react';
import ReactTabs, { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class CanalDetailPanel extends React.Component {

	// property validation (ES7-style React)
	static propTypes = {
		commodityMetadata: PropTypes.object.isRequired,
		canalMetadata: PropTypes.object,
		commodities: PropTypes.array.isRequired
	};

	// property defaults (ES7-style React)
	// (instead of ES5-style getDefaultProps)
	static defaultProps = {
		canalMetadata: null
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

	onDropdownToggle (isOpen) {

		// hack to get react-bootstrap dropdown to not be
		// constrained by hidden overflow on ancestor element
		let containingTile = document.querySelector('.right-column .bottom-row');
		if (isOpen) {
			containingTile.style.overflow = 'visible';
		} else {
			containingTile.removeAttribute('style');
		}

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
					{ this.renderDropdownButton() }
				</TabPanel>
			</Tabs>
		);

	}

	renderDropdownButton () {

		return (
			<DropdownButton dropup bsStyle='default' title='SELECT A COMMODITY' id='commodity-dropdown' onToggle={ this.onDropdownToggle } >
				{ this.props.commodities.map((commodity, i) => {
					return (
						<MenuItem eventKey={ i } key={ i }>{ (commodity.name || '').toUpperCase() }</MenuItem>
					);
				}) }
			</DropdownButton>
		);

	}

}
