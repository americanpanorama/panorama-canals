# richmondatlas-canals
Visualizing types and quantities of commodities traveling through canals in 19th-century America

[//]: # (Latest build can be viewed at [http://studio.stamen.com/richmond/show/latest/](http://studio.stamen.com/richmond/show/latest/))


##Data Sets
A list of all base datasets for this project in CartoDB.  Each one these should have a public `materialized` view as well.

Dataset Name | Description
------------ | -----------
NTD | NTD
NTD | NTD


##Dependencies
* [npm](https://www.npmjs.com/)
* [CartoDB](https://cartodb.com/) account


##Setup
Make sure you have [npm](https://www.npmjs.com/) installed. Note: **version > 2.7.0 is required** to install scoped packages, such as `@panorama/toolkit`. Instructions for updating npm are [here](https://docs.npmjs.com/getting-started/installing-node#updating-npm).

Load required **npm** modules.

```bash
npm install
```

Create a `config.json` file from `config.json.sample` in `./basemaps/cartodb` and add your CartoDB account name to the file. Will look like this...

```json
{
	"userId": "[CartoDB user id / account name]",
	"apiKey": "[CartoDB API key]"
}
```

####TODO: Either use materialized tables or an authenticated session, and remove `apiKey`
**Note:** using `apiKey` will append the specified API key as a query param on all requests to CartoDB. This is insecure and is not intended for production! We need to decide on a technique that either uses materialized tables or an authenticated session before going live.


Specify queries needed for basemap layers in `./basemaps`:
1. Write terrain URLs to `./basemaps/tileLayers.json`
2. Set up CartoDB basemaps:
	A. Specify layers in `./basemaps/cartodb/basemaps.yml`
	B. Specify SQL queries per layer in `./basemaps/cartodb/layers.yml`
	C. Define layer styles ass `.mss` files within `./basemaps/cartodb/styles`

####TODO: Alan may want to add more here, about CartoDB map JSON format, cartodb-yaml, or other things...


## Develop
To run locally:

```bash
npm start
```
Open browser to [http://localhost:8888/](http://localhost:8888/)


##Deploy
**To use development code**: Copy the [build directory](./build) to your server, but for **production** you will want to run:

```npm run dist```

This will create a `dist` directory. Move this directory to your server.

Both directories are all **static files**, so no special server requirements needed.


##Deploy(Stamen Only)
```bash
scp -prq ./dist/. studio.stamen.com:www/richmond/show/canals/
scp -prq ./dist/. studio.stamen.com:www/richmond/show/yyyy-mm-dd/
```
