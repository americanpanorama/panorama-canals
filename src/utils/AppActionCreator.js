import AppDispatcher from './AppDispatcher';

export const AppActionTypes = {

	// Note: stores emit this type of event.
	// Though it is not actually an Action type,
	// it's enumerated here for ease of access.
	storeChanged: 'storeChanged',

	getInitialData: 'getInitialData'

};

export const AppActions = {

	/**
	 * Load data needed by the application on init.
	 */
	loadInitialData: (state) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.loadInitialData,
			state: state
		});
	},

	canalSelected: (canal) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.canalSelected,
			value: canal
		});
	},

	yearSelected: (year) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.yearSelected,
			value: year
		});
	},

	commoditySelected: (commodity, canal, year) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.commoditySelected,
			value: commodity
		});
	}

}
