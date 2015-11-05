import React, { PropTypes } from 'react';
import ReactTabs, { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import _ from 'lodash';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { AppActions } from '../utils/AppActionCreator';

export default class CanalDetailPanel extends React.Component {

	// property validation (ES7-style React)
	static propTypes = {
		commodityMetadata: PropTypes.object.isRequired,
		canalMetadata: PropTypes.object,
		commodities: PropTypes.object.isRequired,
		selectedCommodity: PropTypes.object
	};

	// property defaults (ES7-style React)
	// (instead of ES5-style getDefaultProps)
	static defaultProps = {
		canalMetadata: null,
		selectedCommodity: null
	};

	constructor (props) {

		super(props);

		// manually bind event handlers,
		// since React ES6 doesn't do this automatically
		this.onTabSelected = this.onTabSelected.bind(this);
		this.onDropdownToggle = this.onDropdownToggle.bind(this);
		this.onDropdownSelect = this.onDropdownSelect.bind(this);

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

	render () {

		console.log(">>>>> selected:", this.props.selectedCommodity);

		return (
			<Tabs
				onSelect={ this.onTabSelected }
				selectedIndex={ this.props.selectedCommodity ? 1 : 0 }
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
					{ this.renderCommodityQuantity() }
					{ this.renderCommodityDescription() }
				</TabPanel>
			</Tabs>
		);

	}

	renderDropdownButton () {

		let sortedCommodities = _.values(this.props.commodities).sort((a, b) => {
				// alphabetize
				if (a.name < b.name) { return -1; }
				else if (a.name > b.name) { return 1; }
				else { return 0; }
			}),
			dropdownTitle = this.props.selectedCommodity ? this.props.selectedCommodity.name.toUpperCase() : 'SELECT A COMMODITY';

		return (
			<DropdownButton dropup bsStyle='default' title={ dropdownTitle } id='commodity-dropdown' onToggle={ this.onDropdownToggle } onSelect={ this.onDropdownSelect }>
				{ sortedCommodities.map((commodity, i) => {
					return (
						<MenuItem eventKey={ commodity.id } key={ commodity.id }>{ (commodity.name || '').toUpperCase() }</MenuItem>
					);
				}) }
			</DropdownButton>
		);

	}

	renderCommodityQuantity () {

		if (this.props.selectedCommodity) {
			return (
				<p className='quantity'>{ this.props.commodities[this.props.selectedCommodity.id].value + ' ' + this.props.selectedCommodity.units }</p>
			);
		} else {
			return '';
		}

	}

	renderCommodityDescription ()  {

		if (this.props.selectedCommodity) {
			return (
				<p className='description'>{ this.props.selectedCommodity.description }</p>
			);
		} else {
			return '';
		}

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

	onDropdownSelect (event, commodityId) {

		// Defense.
		if (!commodityId) { return; }

		AppActions.commoditySelected(commodityId);

	}

}
