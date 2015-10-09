import { EventEmitter } from 'events';
import AppDispatcher from '../utils/AppDispatcher';
import { AppActionTypes } from '../utils/AppActionCreator';
import CartoDBLoader from '../utils/CartoDBLoader';

const CommodityStore = {

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
			console.error("Commodity received error:", error);
			throw error;

		});

	},

	getCommodities: function (filter) {



	},

	setData: function (...data) {

		// ====================================================================
		// TODO FRIDAY: cache data in a way that all the actions in AppActionCreator can be efficiently executed.
		// ====================================================================

		this.emit(AppActionTypes.storeChanged);

	},

	parseData: function (...data) {

		console.log(">>>>> parsing data:", data);

	}


};

// Mixin EventEmitter functionality
Object.assign(CommodityStore, EventEmitter.prototype);

// Register callback to handle all updates
AppDispatcher.register((action) => {

	switch (action.type) {

		case AppActionTypes.getInitialData:

			CommodityStore.getInitialData(action.state);

			break;
		/*
		case ACTION_SELECT_DECADE:

			CommodityStore.selectNarrative(action.id);

			break;
		*/
	}

	return true;

});

export default CommodityStore;
