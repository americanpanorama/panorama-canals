import AppDispatcher from './AppDispatcher';

export const AppActionTypes = {

	// Note: stores emit this type of event.
	// Though it is not actually an Action type;
	// it's enumerated here for ease of access.
	storeChanged: 'storeChanged',

	getInitialData: 'getInitialData'

};

export const AppActions = {

	/**
	 * Load data needed by the application on init.
	 */
	getInitialData: (state) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.getInitialData,
			state: state
		});
	}

}

export const MapActions = {

	/**
	 * 
	 */
	canalSelected: (canal) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.canalSelected,
			canal: canal
		});
	}

}

export const TimelineActions = {

	canalSelected: MapActions.canalSelected,

	/**
	 * 
	 */
	dateSelected: (date) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.dateSelected,
			date: date
		});
	},

	/**
	 * 
	 */
	commoditySelected: (commodity, canal, year) => {
		AppDispatcher.dispatch({
			type: AppActionTypes.commoditySelected,
			commodity: commodity,
			canal: canal,
			year: year
		});
	}

}

export const PunchcardActions = {

	commoditySelected: TimelineActions.commoditySelected

}

export const DetailViewActions = {

	commoditySelected: TimelineActions.commoditySelected

}
