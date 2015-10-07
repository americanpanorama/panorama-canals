import { EventEmitter } from 'events';
import Dispatcher from '../utils/dispatcher';
import CartoDBLoader from '../utils/CartoDBLoader';

// TODO: enumerate action types somewhere.
// either dispatcher.js, or an "Action Creator"
// (see Flux for Stupid People and forcedmigration::population.js)
const ACTION_GET_INITIAL_DATA = 'getInitialData';
// const ACTION_SELECT_DECADE = 'selectDecade';

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

			console.log(">>>>> PunchcardStore received responses:", responses);
			this.setData(this.parseData(...responses));

		},
		(error) => {

			console.error(">>>>> Punchcard received error:", error);

		});

	},

	setData: function (...data) {

		// TODO: implement
		// TODO: enumerate 'change' somewhere? how does this work for other Stores?
		// TODO: need to pass a callback/listener as second param?
		this.emit('change');
		// this.emit(CHANGE_EVENT, _caller);	// from Forced Migration

	},

	parseData: function (...data) {

		console.log(">>>>> parsing data:", data);

	}


};

// Mixin EventEmitter functionality
Object.assign(PunchcardStore, EventEmitter.prototype);

// Register callback to handle all updates
Dispatcher.register((action) => {

	switch (action.actionType) {

		case ACTION_GET_INITIAL_DATA:

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
