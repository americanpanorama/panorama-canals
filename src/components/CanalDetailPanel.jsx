import React, { PropTypes } from 'react';
import ReactTabs, { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import _ from 'lodash';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { AppActions } from '../utils/AppActionCreator';

export default class CanalDetailPanel extends React.Component {

	// property validation (ES7-style React)
	static propTypes = {
		commodityMetadata: PropTypes.object.isRequired,
		selectedCanal: PropTypes.object,
		commodities: PropTypes.object.isRequired,
		selectedCommodity: PropTypes.object
	};

	// property defaults (ES7-style React)
	// (instead of ES5-style getDefaultProps)
	static defaultProps = {
		selectedCanal: null,
		selectedCommodity: null
	};

	static COMMODITY_DESCRIPTION_PLACEHOLDER = 'No description available for the selected commodity. Choose a different commodity from the menu above.';
	static CANAL_DESCRIPTION_PLACEHOLDER = 'No description available for the selected canal.';

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
					{ this.renderCanalDescription() }
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

	renderCanalDescription () {

		if (this.props.selectedCanal) {
			let extensions,
				extensionsEl,
				closedEl;

			extensions = this.props.selectedCanal.geoJsonFeatures.slice(1).reduce((acc, featureObj, i) => acc + (i ? ', ' : '') + featureObj.year, '');
			if (extensions) {
				extensionsEl = <h4>Extensions: { extensions }</h4>;
			}
			if (this.props.selectedCanal.closedYear === 2100) {
				closedEl = <span className='not-closed'>; still in operation</span>;
			} else if (this.props.selectedCanal.closedYear) {
				closedEl = <span className='closed-date'>Closed: { this.props.selectedCanal.closedYear }</span>;
			}

			return (
				<div>
					<h4><span className='opened-date'>Opened: { this.props.selectedCanal.openedYear }</span>{ closedEl }</h4>
					{ extensionsEl }
					<h4>Length: { this.props.selectedCanal.length }km</h4>
					<p className='description'>{ this.props.selectedCanal.description || CanalDetailPanel.CANAL_DESCRIPTION_PLACEHOLDER }</p>
				</div>
			);
		} else {
			return '';
		}

	}

	renderDropdownButton () {

		let sortedCommodities = _.values(this.props.commodities).sort((a, b) => {
				// alphabetize
				if (a.name < b.name) { return -1; }
				else if (a.name > b.name) { return 1; }
				else { return 0; }
			}),

			// Dropdown displays currently selected commodity if there is one and if it exists in this canal and year.
			dropdownTitle = (this.props.selectedCommodity && this.props.commodities[this.props.selectedCommodity.id]) ? this.props.selectedCommodity.name.toUpperCase() : 'SELECT A COMMODITY';

		if (sortedCommodities.length) {
			return (
				<DropdownButton dropup bsStyle='default' title={ dropdownTitle } id='commodity-dropdown' onToggle={ this.onDropdownToggle } onSelect={ this.onDropdownSelect }>
					{ sortedCommodities.map((commodity, i) => {
						return (
							<MenuItem eventKey={ commodity.id } key={ commodity.id }>{ (commodity.name || '').toUpperCase() }</MenuItem>
						);
					}) }
				</DropdownButton>
			);
		} else {
			return (
				<h4 className='commodities-placeholder'>No commodities data available for this canal in the selected year.</h4>
			);
		}

	}

	renderCommodityQuantity () {

		if (this.props.selectedCommodity && this.props.commodities[this.props.selectedCommodity.id]) {
			return (
				<p className='quantity'>{ this.props.commodities[this.props.selectedCommodity.id].value + ' ' + this.props.selectedCommodity.units.toLowerCase() }</p>
			);
		} else {
			return '';
		}

	}

	renderCommodityDescription ()  {

		if (this.props.selectedCommodity && this.props.commodities[this.props.selectedCommodity.id]) {
			return (
				<p className='description'>{ this.props.selectedCommodity.description || CanalDetailPanel.COMMODITY_DESCRIPTION_PLACEHOLDER }</p>
			);
		} else {
			return '';
		}

	}

	onTabSelected (index, last) {

		//

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
