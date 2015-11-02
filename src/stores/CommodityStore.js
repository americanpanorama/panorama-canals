import { EventEmitter } from 'events';
import AppDispatcher from '../utils/AppDispatcher';
import { AppActionTypes } from '../utils/AppActionCreator';
import CartoDBLoader from '../utils/CartoDBLoader';
import _ from 'lodash';

const PLACEHOLDER_VALUE = 'TODO';

const CommodityStore = {

	/**
	 * All cached data are stored here.
	 * Note: Keys within each cache are intentionally abstract,
	 * for consumption by Panorama components.
	 * E.g. instead of 'tons', we use the key 'normalizedValue'.
	 */
	data: {

		/**
		 * Commodity types and metadata associated with each commodity type.
		 * {
		 *   typeX: {
		 *     id: 'str',
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
		 *     id: 'str',
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
		 *       year: num,
		 *       totalNormalizedValue: num,
		 *       commodities: {             		// unsorted, flat view of all commodities this year + this canal
		 *         typeX: {
		 *           id: 'str',
		 *           name: 'str',
		 *           value: num,
		 *           normalizedValue: num
		 *         }
		 *       },
		 *       commodityCategories: {     		// sorted by aggregate total tonnage ('aggregateNormalizedValue')
		 *       									// of each commodity within the category
		 *         categoryX: {
		 *           id: 'str',
		 *           name: 'str',
		 *           aggregateNormalizedValue: num,
		 *           commodities: [         		// sorted by total tonnage ('normalizedValue') of each commodity
		 *             {
		 *               id: 'str',
		 *               name: 'str',
		 *               value: num,
		 *               normalizedValue: num
		 *             },
		 *             ...
		 *           ]
		 *         },
		 *       }
		 *     },
		 *     '1851': { ... },
		 *     ...
		 *   },
		 *   canalY: {
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
			selectedCanal: parseInt(canalId)
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
			selectedYear: parseInt(year)
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
			selectedCommodity: parseInt(commodityId)
		});

	},

	getSelectedCanal: function () {

		// return deep copy of stored data
		return _.merge(this.data.canals[this.data.selectedCanal]);

	},

	getSelectedYear: function () {

		return this.data.selectedYear;

	},

	getAllCommodityMetadata: function () {

		// return deep copy of stored data
		return _.merge(this.data.commodities);

	},

	getAllCanals: function () {

		// return deep copy of stored data
		return _.merge(this.data.canals);

	},

	getCommoditiesByCanalByYear: function () {

		let commoditiesByCanal = this.data.commoditiesByDateByCanal[this.data.selectedCanal];
		if (commoditiesByCanal) {
			// return deep copy of stored data
			return _.merge(commoditiesByCanal[this.data.selectedYear]);
		} else {
			return null;
		}

	},

	getAllCommodities: function () {

		// TODO: this may not be performant.
		// Consider memoizing just the data needed for the timeline's OffsetAreaGraph.

		// return deep copy of stored data
		return _.merge(this.data.commoditiesByDateByCanal);

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

		if (typeof(data.selectedCanal) !== 'undefined' && data.selectedCanal !== this.data.selectedCanal) {
			this.data.selectedCanal = data.selectedCanal;
			dirty = true;
		}

		if (typeof(data.selectedYear) !== 'undefined' && data.selectedYear !== this.data.selectedYear) {
			this.data.selectedYear = data.selectedYear;
			dirty = true;
		}

		if (typeof(data.selectedCommodity) !== 'undefined' && data.selectedCommodity !== this.data.selectedCommodity) {
			this.data.selectedCommodity = data.selectedCommodity;
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

		let canal;
		canalsData.forEach((canalData) => {

			canal = {
				id: parseInt(canalData.canal_id),
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
			if (canals[canalData.canal_id]) {
				canals[canalData.canal_id] = _.merge(canals[canalData.canal_id], canal, this.mergeTruthyAndZeroes);
			} else {
				canals[canalData.canal_id] = canal;
			}

		});

		let commodity;
		commoditiesLookupData.forEach((commodityLookupData) => {

			commodity = {
				id: parseInt(commodityLookupData.comm_id),
				name: commodityLookupData.commodity,
				description: commodityLookupData.description,
				units: commodityLookupData.unit
			};

			if (commodities[commodityLookupData.comm_id]) {
				commodities[commodityLookupData.comm_id] = _.merge(commodities[commodityLookupData.comm_id], commodity, this.mergeTruthyAndZeroes);
			} else {
				commodities[commodityLookupData.comm_id] = commodity;
			}

		});

		let canalMap,
		    yearMap,
		    commoditiesMap,
		    commodityCategories,
		    categoryMap,
		    commoditiesInCategory;
		commoditiesData.forEach((commodityData) => {

			if (!commoditiesByDateByCanal[commodityData.canal_id]) {
				commoditiesByDateByCanal[commodityData.canal_id] = {};
			}
			canalMap = commoditiesByDateByCanal[commodityData.canal_id];

			if (!canalMap[commodityData.year]) {
				canalMap[commodityData.year] = {
					year: commodityData.year
				};
			}
			yearMap = canalMap[commodityData.year];

			if (!yearMap.commodities) {
				yearMap.commodities = {};
			}
			commoditiesMap = yearMap.commodities;

			commoditiesMap[commodityData.comm_id] = {
				id: parseInt(commodityData.comm_id),
				name: commodities[commodityData.comm_id].name,
				value: parseFloat(commodityData.value.replace(/,/g,'')),
				normalizedValue: parseFloat(commodityData.tons.replace(/,/g,''))
			};

			if (!yearMap.commodityCategories) {
				yearMap.commodityCategories = {};
			}
			commodityCategories = yearMap.commodityCategories;

			if (!commodityCategories[commodityData.cat_id]) {
				commodityCategories[commodityData.cat_id] = {};
			}
			categoryMap = commodityCategories[commodityData.cat_id];

			if (!categoryMap.commodities) {
				categoryMap.commodities = [];
			}
			commoditiesInCategory = categoryMap.commodities;

			commoditiesInCategory.push({
				id: parseInt(commodityData.comm_id),
				name: commodities[commodityData.comm_id].name,
				value: parseFloat(commodityData.value.replace(/,/g,'')),
				normalizedValue: parseFloat(commodityData.tons.replace(/,/g,''))
			});

		});
		
		// map tonnage by canal by year.
		// this map is not returned as-is,
		// but is pulled into commoditiesByDateByCanal below.
		let totalTonnageMap = {},
		    tonnageCanalMap;
		totalTonnageData.forEach((tonnageByDateAndCanal) => {

			if (!totalTonnageMap[tonnageByDateAndCanal.canal_id]) {
				totalTonnageMap[tonnageByDateAndCanal.canal_id] = {};
			}
			tonnageCanalMap = totalTonnageMap[tonnageByDateAndCanal.canal_id];

			tonnageCanalMap[tonnageByDateAndCanal.year] = parseFloat(tonnageByDateAndCanal.total.replace(/,/g,''));

		});

		// map category names by id.
		// this map is not returned as-is,
		// but is pulled into commoditiesByDateByCanal below.
		let categoriesById = {};
		categoryLookupData.forEach((categoryData) => {
			categoriesById[categoryData.cat_id] = categoryData.category;
		});

		// for each canal-year:
		// - fill in totalNormalizedValue
		// - fill in name and aggregateNormalizedValue for each commodityCategory and sort
		let categoryName,
		    commoditiesByYear;
		_.forOwn(commoditiesByDateByCanal, (canal, canalId) => {
			_.forOwn(canal, (yearMap, year) => {

				tonnageCanalMap = totalTonnageMap[canalId];
				if (tonnageCanalMap && tonnageCanalMap[year]) {
					yearMap.totalNormalizedValue = parseInt(tonnageCanalMap[year]);
				}

				commoditiesByYear = yearMap.commodities;
				_.forOwn(yearMap.commodityCategories, (categoryMap, categoryId) => {

					categoryName = categoriesById[categoryId];
					if (!categoryName) {
						console.warn('Found commodity category id with no corresponding name:', categoryId);
					} else {
						categoryMap.name = categoryName;
					}

					// sum and store `normalizedValue` of each commodity type within category
					categoryMap.aggregateNormalizedValue = categoryMap.commodities.reduce((val, commodity) => {
						return val + commodity.normalizedValue;
					}, 0);

					// sort commodity types by tonnage
					categoryMap.commodities = categoryMap.commodities.sort((a, b) => {
						return a.normalizedValue < b.normalizedValue;
					});

				});

				// sort commodity categories by aggregateNormalizedValue of each
				yearMap.commodityCategories = Object.keys(yearMap.commodityCategories).sort((a, b) => {
					return yearMap.commodityCategories[a].aggregateNormalizedValue < yearMap.commodityCategories[b].aggregateNormalizedValue;
				}).reduce((out, categoryKey) => {
					out[categoryKey] = yearMap.commodityCategories[categoryKey];
					return out;
				}, {});
				// yearMap.commodityCategories = new Map(Array.from(yearMap.commodityCategories.entries()).sort((a, b) => {
				// 	return a[1].aggregateNormalizedValue < b[1].aggregateNormalizedValue;
				// })));

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
