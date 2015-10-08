import { EventEmitter } from 'events';
import AppDispatcher from '../utils/AppDispatcher';
import { AppActionTypes } from '../utils/AppActionCreator';
import CartoDBLoader from '../utils/CartoDBLoader';

const PunchcardStore = {

	data: [],

	// TODO: Make a generic DataLoader class to define an interface,
	// and let CartoDBLoader extend and implement that?
	// Basic idea is that anything with a query method that returns a Promise
	// that resolves with an array of response data or rejects with an error
	// can be used here.
	dataLoader: CartoDBLoader,

	getInitialData: function () {

		this.dataLoader.query([
			{
				query: "SELECT * FROM commodities",
				format: "JSON"
			},
			{
				query: "SELECT * FROM commodities_lookup",
				format: "JSON"
			},
			{
				query: "SELECT * FROM canal_list",
				format: "JSON"
			}
		]).then((...responses) => {

			this.setData(this.parseData(...responses));

		},
		(error) => {

			// TODO: handle this.
			console.error("Punchcard received error:", error);
			throw error;

		});

	},

	setData: function (...data) {

		// TODO: implement (update cached data)

		this.emit(AppActionTypes.storeChanged);

	},

	parseData: function (...data) {

		console.log(">>>>> parsing data:", data);

	}


};

// Mixin EventEmitter functionality
Object.assign(PunchcardStore, EventEmitter.prototype);

// Register callback to handle all updates
AppDispatcher.register((action) => {

	switch (action.type) {

		case AppActionTypes.getInitialData:

			PunchcardStore.getInitialData(action.state);

			break;
		/*
		case ACTION_SELECT_DECADE:

			PunchcardStore.selectNarrative(action.id);

			break;
		*/
	}

	return true;

});

export default PunchcardStore;
