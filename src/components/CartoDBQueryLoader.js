/*
 * TODO: Move this into @panorama/toolkit.
 * Consider pulling cartodb-client into this and packaging the whole thing as a component,
 * leaving `query` as the only public method.
 */

import Queue from 'queue-async';

import config from '../../.env.json';
import CartoDBClient from 'cartodb-client';

let cartoDBClient = new CartoDBClient(config.cartodb.userId);

let CartoDBQueryLoader = {
	
	/** Use `queue-async` to defer() up an array of queries,
	 * and return a Promise that is resolved when all requests have completed.
	 * Accepts a list of objects formatted as { query, format }.
	 */
	query: function (queryConfigs) {

		return new Promise((resolve, reject) => {

			// Run up to 3 requests in parallel
			let queue = Queue(3);
			queryConfigs.forEach((queryConfig) => {
				queue.defer(this.cartoRequest, queryConfig);
			});

			queue.awaitAll((error, ...responses) => {
				if (error) {
					reject(error);
				} else {
					resolve(...responses);
				}
			});

		});

	},

	cartoRequest: function (queryConfig, callback) {

		cartoDBClient.sqlRequest(queryConfig.query, function(err, response) {
			if (!err) {
				callback(null, response.rows);
			} else {
				callback(err)
			}
		}, {
			'format': queryConfig.format,
			'dangerouslyExposedAPIKey': config.cartodb.apiKey
		});

	}
	
}

export default CartoDBQueryLoader;
