import AppDispatcher from './AppDispatcher';

export const AppActionTypes = {

	// loadInitialData: 'loadInitialData',
	canalSelected: 'canalSelected',
	yearSelected: 'yearSelected',
	commoditySelected: 'commoditySelected',
	mapMoved: 'mapMoved'

};

export const AppActions = {

	/**
	 * Dispatch action when initial data used by the application are to be loaded.
	 * @param {Object} state 		Initial state of the application.
	 */
	/*
	loadInitialData: (state) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.loadInitialData,
			state: state
		});
	},
	*/

	/**
	 * Dispatch action when a canal is selected (usually by user action).
	 * @param {String} canal 		ID of the selected canal.
	 */
	canalSelected: (canal) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.canalSelected,
			value: canal
		});
	},

	/**
	 * Dispatch action when a year is selected (usually by user action).
	 * @param {String} year			The selected year.
	 */
	yearSelected: (year) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.yearSelected,
			value: year
		});
	},

	/**
	 * Dispatch action when a commoodity is selected (usually by user action).
	 * @param {String} commoodity 	ID of the selected commoodity.
	 */
	commoditySelected: (commodity) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.commoditySelected,
			value: commodity
		});
	},

	/**
	 * Dispatch action when map is zoomed or panned.
	 * @param {Number} zoom 	Map zoom level
	 * @param {Object} center 	Map center
	 */
	mapMoved: (zoom, center) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.mapMoved,
			value: {
				zoom: zoom,
				center: center
			}
		});
	}

}
