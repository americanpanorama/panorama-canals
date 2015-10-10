import { EventEmitter } from 'events';
import AppDispatcher from '../utils/AppDispatcher';
import { AppActionTypes } from '../utils/AppActionCreator';
import CartoDBLoader from '../utils/CartoDBLoader';
import _ from 'lodash';

const CommodityStore = {

	/**
	 * Commodity types and metadata associated with each commodity type.
	 * {
	 *   typeX: {
	 *     name: 'str',
	 *     description: 'str',
	 *     units: 'str'
	 *   },
	 *   typeY: { ... },
	 *   ...
	 * }
	 */
	commodities: {},

	/**
	 * Canals and associated metadata.
	 * {
	 *   canalX: {
	 *     name: 'str',
	 *     startYear: 1820,
	 *     endYear: 1952,
	 *     extensions: [
	 *       1834, 1851, 1856
	 *     ],
	 *     length: 88,
	 *     description: 'str',
	 *     geometry: {}
	 *   },
	 *   canalY: { ... },
	 *   ...
	 * }
	 */
	canals: {},

	/**
	 * Commodity and commodity category quantities,
	 * by date (second-order) by canals (first-order).
	 * 
	 * {
	 *   canalX: {
	 *     '1850': {
	 *       totalTonnage: num,
	 *       commodities: {             // unsorted, flat view of all commodities this year + this canal
	 *         typeX: {
	 *           amount: num
	 *         }
	 *       },
	 *       commodityCategories: [     // sorted by aggregate total tonnage of each commodity within the category
	 *         categoryX: {
	 *           name: 'str',
	 *           aggregateTonnage: num,
	 *           commodities: [         // sorted by total tonnage of each commodity
	 *             typeX,
	 *             typeY,
	 *             ...
	 *           ]
	 *         },
	 *       ]
	 *     },
	 *     '1851': { ... },
	 *     ...
	 *   },
	 *   'canalY': {
	 *     '1851': { ... },
	 *     '1852': { ... },
	 *     ...
	 *   },
	 *   ...
	 * }
	 */
	commoditiesByDateByCanal: {},

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
				query: "SELECT * FROM category_lookup",
				format: "JSON"
			},
			/*
			{
				query: "SELECT * FROM canal_list",
				format: "JSON"
			},
			*/
			{
				query: "SELECT * FROM canals",
				format: "JSON"
			},
			{
				query: "SELECT * FROM total_tonnage",
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

		//

	},

	setData: function (data) {

		if (!data) { return; }

		let dirty = false;

		if (data.commoditiesByDateByCanal) {
			this.commoditiesByDateByCanal = data.commoditiesByDateByCanal;
			dirty = true;
		}

		if (data.commodities) {
			this.commodities = data.commodities;
			dirty = true;
		}

		if (data.canals) {
			this.canals = data.canals;
			dirty = true;
		}

		if (dirty) {
			this.emit(AppActionTypes.storeChanged);
		}

	},

	parseData: function (data) {

		let commodities = {},
		    canals = {},
		    commoditiesByDateByCanal = {},

		    dataIndex = 0,
		    commoditiesData = data[dataIndex++],
		    commoditiesLookupData = data[dataIndex++],
		    categoryLookupData = data[dataIndex++],
		    // canalListData = data[dataIndex++],
		    canalsData = data[dataIndex++],
		    totalTonnageData = data[dataIndex++];


		// ====================================================================
		// TODO NEXT: cache data according to schema above.
		// ====================================================================
		console.log(">>>>> parseData:", data);

/*
[commodities]
	canal_id: 29
	cat_id: 4
	comm_id: 142
	field_9: ""
	note: ""
	source_id: 31
	tons: "1.248"
	value: "80.0"
	year: 1847		

[commodities_lookup]
	cat_id: 2
	comm_id: 75
	commodity: "Lime and Cement"
	conversion: 1
	description: ""
	notes: ""
	notes2: ""
	source_id: "0"
	sources: ""
	sources_cont: ""
	sources_cont_2: ""
	student: ""
	unit: "tons"

[category_lookup]
	cat_id: 2
	category: "Building Materials"

[canal_list]
	canal: "Albemarle & Cheasapeake"
	canal_id: 1

[canals]
	canal_id: 26
	closed: 0
	created_at: "2015-07-06T14:30:15Z"
	id: 0
	length: 2.22
	name: "Grand Reservoir Feeder"
	objectid: 84
	opened: 1843
	reference: "http://www.geocities.com/Heartland/Prairie/6687/amapof.htm"
	shape_leng: 0.03462365065
	the_geom: "0105000020E6100000010000000102000000050000005469B8EC432355C0205B6D9D36434440A4046E24832355C0E820ED8E6B444440BC5A734F302455C040111EE9A3454440F42CC3107D2455C060A0713CBA464440C4F2A7C07B2455C040072786CA464440"
	the_geom_webmercator: "0105000020110F000001000000010200000005000000D83C9612CAF361C1ADFF683FB4DA5241AF956AC3FFF361C14EE910760DDC5241162BC4D592F461C15BF882886ADD52412DD7EE05D4F461C17300C59EA1DE5241F04C7AE8D2F461C1C0909AD3B3DE5241"
	updated_at: "2015-07-06T14:30:15Z"

[total_tonnage]
	canal_id: 2
	source_id: 1
	total: "13,825"
	year: 1849
*/
		
		let canalData;
		canalsData.forEach((canal) => {

			canalData = {
				name: canal.canal,
				startYear: canal.opened,
				endYear: canal.closed,
				extensions: 'TODO',
				length: canal.length,
				description: 'TODO',
				geometry: canal.the_geom_webmercator
			};

			// If already in cache, merge all non-undefined values.
			// Else, write new value to cache.
			// TODO MONDAY: this probably won't work, need to merge all non-empty strings...
			// maybe use _.merge's `customizer`? or maybe Object.assign or _.assign or _.extend
			if (canals[canal.canal_id]) {
				canals[canal.canal_id] = _.merge(canals[canal.canal_id], canalData);
			} else {
				canals[canal.canal_id] = canalData;
			}

		});

		return {
			commodities: commodities,
			canals: canals,
			commoditiesByDateByCanal: commoditiesByDateByCanal
		};

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
