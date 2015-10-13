import { EventEmitter } from 'events';
import AppDispatcher from '../utils/AppDispatcher';
import { AppActionTypes } from '../utils/AppActionCreator';
import CartoDBLoader from '../utils/CartoDBLoader';
import _ from 'lodash';

const PLACEHOLDER_VALUE = 'TODO';

const CommodityStore = {

	// All cached data are stored here.
	data: {
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
		 *           quantity: num,
		 *           tons: num
		 *         }
		 *       },
		 *       commodityCategories: {     // sorted by aggregate total tonnage of each commodity within the category
		 *         categoryX: {
		 *           name: 'str',
		 *           aggregateTonnage: num,
		 *           commodities: [         // sorted by total tonnage of each commodity
		 *             {
		 *               type: typeX,
		 *               quantity: num,
		 *               tons: num
		 *             },
		 *             ...
		 *           ]
		 *         },
		 *       }
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

		/**
		 * Selection states.
		 * Note: these states could be stored in the view layer,
		 * but since changing these states does not actually change the data in the store
		 * (it just filters the returned data), they are maintained by the store.
		 */
		selectedCanal: null,
		selectedYear: null,
		selectedCommodity: null

	},

	// TODO: Make a generic DataLoader class to define an interface,
	// and let CartoDBLoader extend and implement that?
	// Basic idea is that anything with a query method that returns a Promise
	// that resolves with an array of response data or rejects with an error
	// can be used here.
	dataLoader: CartoDBLoader,

	loadInitialData: function (state) {

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

			this.setData(
				_.merge(this.parseData(...responses), {
					selectedCanal: state.selectedCanal,
					selectedYear: state.selectedYear,
					selectedCommodity: state.selectedCommodity
				})
			);

		},
		(error) => {

			// TODO: handle this.
			console.error("Commodity received error:", error);
			throw error;

		});

	},

	/**
	 * Set the selected canal for the whole application to display.
	 */
	setSelectedCanal: function (canalId) {

		this.setData({
			selectedCanal: canalId
		});

	},

	/**
	 * Set the selected year for the whole application to display.
	 * This state could be stored in the view layer,
	 * but since changing this state does not actually change the data in the store
	 * (it just filters the returned data), this state is maintained by the store.
	 */
	setSelectedYear: function (year) {

		this.setData({
			selectedYear: year
		});

	},

	/**
	 * Set the selected commodity for the whole application to display.
	 * This state could be stored in the view layer,
	 * but since changing this state does not actually change the data in the store
	 * (it just filters the returned data), this state is maintained by the store.
	 */
	setSelectedCommodity: function (commodityId) {

		this.setData({
			selectedCommodity: commodityId
		});

	},

	getSelectedCanal: function () {

		// return deep copy of stored data
		return _.merge(this.data.canals.get(this.data.selectedCanal));

	},

	getSelectedYear: function () {

		return this.data.selectedYear;

	},

	getCommoditiesByCanalByYear: function () {

		// return deep copy of stored data
		return _.merge(this.data.commoditiesByDateByCanal.get(this.data.selectedCanal).get(this.data.selectedYear));

	},

	setData: function (data) {

		if (!data) { return; }

		let dirty = false;

		if (data.commodities) {
			this.data.commodities = data.commodities;
			dirty = true;
		}

		if (data.canals) {
			this.data.canals = data.canals;
			dirty = true;
		}

		if (data.commoditiesByDateByCanal) {
			this.data.commoditiesByDateByCanal = data.commoditiesByDateByCanal;
			dirty = true;
		}

		if (data.selectedCanal !== this.data.selectedCanal) {
			this.data.selectedCanal = data.selectedCanal;
			dirty = true;
		}

		if (data.selectedYear !== this.data.selectedYear) {
			this.data.selectedYear = data.selectedYear;
			dirty = true;
		}

		if (data.selectedCommodity !== this.data.selectedCommodity) {
			this.data.selectedCommodity = data.selectedCommodity;
			dirty = true;
		}

		if (dirty) {
			this.emit(AppActionTypes.storeChanged);
		}

	},

	parseData: function (data) {

		let commodities = new Map(),
		    canals = new Map(),
		    commoditiesByDateByCanal = new Map(),

		    dataIndex = 0,
		    commoditiesData = data[dataIndex++],
		    commoditiesLookupData = data[dataIndex++],
		    categoryLookupData = data[dataIndex++],
		    // canalListData = data[dataIndex++],
		    canalsData = data[dataIndex++],
		    totalTonnageData = data[dataIndex++];

		let canal;
		canalsData.forEach((canalData) => {

			canal = {
				name: canalData.name,
				startYear: canalData.opened,
				endYear: canalData.closed,
				extensions: PLACEHOLDER_VALUE,
				length: canalData.length,
				description: PLACEHOLDER_VALUE,
				geometry: canalData.the_geom_webmercator
			};

			// If already in cache, merge all valid values.
			// Else, write new value to cache.
			if (canals.get(canalData.canal_id)) {
				canals.set(canalData.canal_id, _.merge(canals.get(canalData.canal_id), canal, this.mergeTruthyAndZeroes));
			} else {
				canals.set(canalData.canal_id, canal);
			}

		});

		let commodity;
		commoditiesLookupData.forEach((commodityLookupData) => {

			commodity = {
				name: commodityLookupData.commodity,
				description: commodityLookupData.description,
				units: commodityLookupData.unit
			};

			if (commodities.get(commodityLookupData.comm_id)) {
				commodities.set(commodityLookupData.comm_id, _.merge(commodities.get(commodityLookupData.comm_id), commodity, this.mergeTruthyAndZeroes));
			} else {
				commodities.set(commodityLookupData.comm_id, commodity);
			}

		});

		let canalMap,
		    yearMap,
		    commoditiesMap,
		    commodityCategories,
		    categoryMap,
		    commoditiesInCategory;
		commoditiesData.forEach((commodityData) => {

			if (!commoditiesByDateByCanal.get(commodityData.canal_id)) {
				commoditiesByDateByCanal.set(commodityData.canal_id, new Map());
			}
			canalMap = commoditiesByDateByCanal.get(commodityData.canal_id);

			if (!canalMap.get(commodityData.year)) {
				canalMap.set(commodityData.year, new Map());
			}
			yearMap = canalMap.get(commodityData.year);

			if (!yearMap.get('commodities')) {
				yearMap.set('commodities', new Map());
			}
			commoditiesMap = yearMap.get('commodities');

			commoditiesMap.set(commodityData.comm_id, {
				quantity: parseFloat(commodityData.value),
				tons: parseFloat(commodityData.tons)
			});

			if (!yearMap.get('commodityCategories')) {
				yearMap.set('commodityCategories', new Map());
			}
			commodityCategories = yearMap.get('commodityCategories');

			if (!commodityCategories.get(commodityData.cat_id)) {
				commodityCategories.set(commodityData.cat_id, new Map());
			}
			categoryMap = commodityCategories.get(commodityData.cat_id);

			if (!categoryMap.get('commodities')) {
				categoryMap.set('commodities', new Set());
			}
			commoditiesInCategory = categoryMap.get('commodities');

			commoditiesInCategory.add(new Map([
				['type', commodityData.comm_id],
				['quantity', parseFloat(commodityData.value)],
				['tons', parseFloat(commodityData.tons)]
			]));

		});
		
		// map tonnage by canal by year.
		// this map is not returned as-is,
		// but is pulled into commoditiesByDateByCanal below.
		let totalTonnageMap = new Map(),
		    tonnageCanalMap;
		totalTonnageData.forEach((tonnageByDateAndCanal) => {

			if (!totalTonnageMap.get(tonnageByDateAndCanal.canal_id)) {
				totalTonnageMap.set(tonnageByDateAndCanal.canal_id, new Map());
			}
			tonnageCanalMap = totalTonnageMap.get(tonnageByDateAndCanal.canal_id);

			tonnageCanalMap.set(tonnageByDateAndCanal.year, tonnageByDateAndCanal.total);

		});

		// map category names by id.
		// this map is not returned as-is,
		// but is pulled into commoditiesByDateByCanal below.
		let categoriesById = new Map();
		categoryLookupData.forEach((categoryData) => {
			categoriesById.set(categoryData.cat_id, categoryData.category);
		});

		// for each canal-year:
		// - fill in totalTonnage
		// - fill in name and aggregateTonnage for each commodityCategory and sort
		let categoryName,
		    commoditiesByYear;
		commoditiesByDateByCanal.forEach((canal, canalId) => {
			canal.forEach((yearMap, year) => {

				tonnageCanalMap = totalTonnageMap.get(canalId);
				if (tonnageCanalMap) {
					yearMap.set('totalTonnage', parseFloat(tonnageCanalMap.get(year)));
				}

				commoditiesByYear = yearMap.get('commodities');
				yearMap.get('commodityCategories').forEach((categoryMap, categoryId) => {

					categoryName = categoriesById.get(categoryId);
					if (!categoryName) {
						console.warn('Found commodity category id with no corresponding name:', categoryId);
					} else {
						categoryMap.set('name', categoryName);
					}

					// sum and store `tons` value of each commodity type within category
					categoryMap.set('aggregateTonnage', Array.from(categoryMap.get('commodities')).reduce((val, commodity) => {
						return val + commodity.get('tons');
					}, 0));

					// sort commodity types by tonnage
					categoryMap.set('commodities', new Set(Array.from(categoryMap.get('commodities')).sort((a, b) => {
						return a.get('tons') < b.get('tons');
					})));

				});

				// sort commodity categories by aggregateTonnage of each
				yearMap.set('commodityCategories', new Map(Array.from(yearMap.get('commodityCategories').entries()).sort((a, b) => {
					return a[1].get('aggregateTonnage') < b[1].get('aggregateTonnage');
				})));

			});
		});

		const returnData = {
			commodities: commodities,
			canals: canals,
			commoditiesByDateByCanal: commoditiesByDateByCanal
		};

		// this.validateData(returnData);

		return returnData;

	},

	/**
	 * Validate parsed data.
	 */
	validateData: function (data) {

		data.canals.forEach((canal, canalId) => {

			Object.keys(canal).forEach(function (key) {
				if (canal[key] === PLACEHOLDER_VALUE) {
					console.warn(`No value for ${ key } in canal '${ canal.name }'.`);
				}
			});

		});

	},

	/**
	 * Avoid overwriting with falsy values (but let zeroes through).
	 * For use with e.g. _.merge().
	 */
	mergeTruthyAndZeroes: function (a, b) {
		
		if (b === 0 || b === '0' || b) {
			return b;
		} else {
			return a;
		}

	}

};

// Mixin EventEmitter functionality
Object.assign(CommodityStore, EventEmitter.prototype);

// Register callback to handle all updates
AppDispatcher.register((action) => {

	switch (action.type) {

		case AppActionTypes.loadInitialData:
			CommodityStore.loadInitialData(action.state);
			break;

		case AppActionTypes.canalSelected:
			CommodityStore.setSelectedCanal(action.value);
			break;

		case AppActionTypes.yearSelected:
			CommodityStore.setSelectedYear(action.value);
			break;

		case AppActionTypes.commoditySelected:
			CommodityStore.setSelectedCommodity(action.value);
			break;

	}

	return true;

});

export default CommodityStore;
