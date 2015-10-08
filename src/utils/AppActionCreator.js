import AppDispatcher from './AppDispatcher';

export const AppActionTypes = {

	// Note: stores emit this type of event.
	// Though it is not actually an Action type;
	// it's enumerated here for ease of access.
	storeChanged: 'storeChanged',

	getInitialData: 'getInitialData'

};

export const PunchcardActions = {

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
