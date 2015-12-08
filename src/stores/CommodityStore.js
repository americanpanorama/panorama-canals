import AppDispatcher from '../utils/AppDispatcher';
import { AppActionTypes } from '../utils/AppActionCreator';
import CartoDBLoader from '../utils/CartoDBLoader';
import _ from 'lodash';

const PLACEHOLDER_CLOSED_YEAR = 2100;

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
		 *     openedYear: 1820,
		 *     closedYear: 1952,
		 *     length: 88,
		 *     description: 'str',
		 *     geoJsonFeatures: [
		 *       {
		 *         year: 1834,
		 *         feature: {
		 *           type: 'str',
		 *           geometry: { geoJson geometry object },
		 *           properties: { geoJson properties object }
		 *         }
		 *       },
		 *       ...
		 *     ]
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
		 *       canalId: 'str' (canalX)			// ugly, but useful for passing data into abstracted components that know little about the data structure
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

	},

	// TODO: Make a generic DataLoader class to define an interface,
	// and let CartoDBLoader extend and implement that?
	// Basic idea is that anything with a query method that returns a Promise
	// that resolves with an array of response data or rejects with an error
	// can be used here.
	dataLoader: CartoDBLoader,

	loadInitialData: function () {

		return this.dataLoader.query([
			{
				query: "SELECT * FROM site_commodities_materialized",
				format: "JSON"
			},
			{
				query: "SELECT * FROM site_commodities_lookup_materialized",
				format: "JSON"
			},
			{
				query: "SELECT * FROM site_category_lookup_materialized",
				format: "JSON"
			},
			{
				query: "SELECT * FROM site_canal_list_materialized",
				format: "JSON"
			},
			{
				query: "SELECT * FROM site_canals_materialized",
				format: "geojson"
			},
			{
				query: "SELECT * FROM site_total_tonnage_materialized",
				format: "JSON"
			}
		]).then((...responses) => {

			this.setData(this.parseData(...responses));

		}, (error) => {

			console.error("Error loading initial data:", error);
			throw error;

		});

	},

	getCanal: function (canalId) {

		// NOTE: returns actual stored data, not a copy (for performance)
		return this.data.canals[canalId];

	},

	getCommodity: function (commodityId) {

		// NOTE: returns actual stored data, not a copy (for performance)
		return this.data.commodities[commodityId];

	},

	getAllCommodityMetadata: function () {

		// NOTE: returns actual stored data, not a copy (for performance)
		return this.data.commodities;

	},

	getAllCanals: function () {

		// NOTE: returns actual stored data, not a copy (for performance)
		return this.data.canals;

	},

	getCommoditiesByCanalByYear: function (canalId, year) {

		let commoditiesByCanal = this.data.commoditiesByDateByCanal[canalId];
		if (commoditiesByCanal) {
			// NOTE: returns actual stored data, not a copy (for performance)
			return commoditiesByCanal[year];
		} else {
			return null;
		}

	},

	getAllCommodities: function () {

		// TODO: this may not be performant.
		// Consider memoizing just the data needed for the timeline's OffsetAreaGraph.

		// NOTE: returns actual stored data, not a copy (for performance)
		return this.data.commoditiesByDateByCanal;

	},

	/**
	 * Get canal geometry concatenated up to the specified year.
	 */
	getAllCanalGeometryByYear: function (year) {

		return _.values(this.data.canals).map(canal => {
			let aggregateFeature = _.merge({}, canal.geoJsonFeatures[0].feature);

			if (canal.openedYear > year) {
				// If canal was not opened before the specified year,
				// return a GeoJson object with empty geometry.
				aggregateFeature.geometry.coordinates = [];
				return aggregateFeature;
			}

			canal.geoJsonFeatures.slice(1).every(canalFeature => {
				if (canalFeature.year < year) {
					// aggregateFeature.geometry.coordinates[0] = aggregateFeature.geometry.coordinates[0].concat(canalFeature.feature.geometry.coordinates[0]);
					aggregateFeature.geometry.coordinates.push(canalFeature.feature.geometry.coordinates[0]);
					return true;
				} else {
					return false;
				}
			});

			return aggregateFeature;
		});

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

	},

	parseData: function (data) {

		let commodities = {},
		    canals = {},
		    commoditiesByDateByCanal = {},

		    dataIndex = 0,
		    commoditiesData = data[dataIndex++],
		    commoditiesLookupData = data[dataIndex++],
		    categoryLookupData = data[dataIndex++],
		    canalListData = data[dataIndex++],
		    canalsData = data[dataIndex++],
		    totalTonnageData = data[dataIndex++];

		let canal,
			feature;
		canalsData.forEach(canalData => {

			// If not already in cache, write the values to cache.
			if (!canals[canalData.properties.canal_id]) {
				canals[canalData.properties.canal_id] = this.parseCanalProperties(canalData.properties);
				canals[canalData.properties.canal_id].geoJsonFeatures = [];
			}
			canal = canals[canalData.properties.canal_id];

			// Store GeoJSON feature alongside year --
			// `opened` indicates first appearance of canal, and also indicates subsequent extensions.
			// In the case of the latter, the geometry includes only the newly-added portion.
			canal.geoJsonFeatures.push({
				year: canalData.properties.opened,
				feature: {
					type: canalData.type,
					geometry: canalData.geometry,
					properties: this.parseCanalProperties(canalData.properties)
				}
			});

			// if (canal.id === 4) {
			// 	console.log('added year ' + canal.geoJsonFeatures[canal.geoJsonFeatures.length - 1].year + '; geometry:', canal.geoJsonFeatures[canal.geoJsonFeatures.length - 1].feature.geometry.coordinates[0].reduce((acc, pair) => acc + '['+pair[0]+','+pair[1]+']', ''));
			// }

		});

		// Sort geoJsonFeatures by year
		_.values(canals).forEach(canal => {
			canal.geoJsonFeatures.sort((a, b) => {
				if (a.year < b.year) { return -1; }
				else if (b.year < a.year) { return 1; }
				return 0;
			});
		});

		// Join descriptions from canal_list
		canalListData.forEach(canalListData => {

			if (canals[canalListData.canal_id]) {
				canals[canalListData.canal_id].description = canalListData.description;
			}

		});

		let commodity;
		commoditiesLookupData.forEach(commodityLookupData => {

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
		commoditiesData.forEach(commodityData => {

			if (!commoditiesByDateByCanal[commodityData.canal_id]) {
				commoditiesByDateByCanal[commodityData.canal_id] = {};
			}
			canalMap = commoditiesByDateByCanal[commodityData.canal_id];

			if (!canalMap[commodityData.year]) {
				canalMap[commodityData.year] = {
					canalId: commodityData.canal_id,
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
		totalTonnageData.forEach(tonnageByDateAndCanal => {

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
		categoryLookupData.forEach(categoryData => {
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
	 * Avoid overwriting with falsy values (but let zeroes through).
	 * For use with e.g. _.merge().
	 */
	mergeTruthyAndZeroes: function (a, b) {
		
		if (b === 0 || b === '0' || b) {
			return b;
		} else {
			return a;
		}

	},

	parseCanalProperties: function (canalProps) {

		return {
			id: parseInt(canalProps.canal_id),
			name: canalProps.name,
			openedYear: canalProps.opened,
			closedYear: canalProps.closed || PLACEHOLDER_CLOSED_YEAR,
			length: canalProps.length
		};

	}

};

export default CommodityStore;
