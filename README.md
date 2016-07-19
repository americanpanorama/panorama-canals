# panorama-canals
Canals 1820-1860

Latest build can be viewed at [http://dsl.richmond.edu/panorama/canals](http://dsl.richmond.edu/panorama/canals)


##Data Sets
A list of all base datasets for this project in CartoDB can be found in [data/README.md](data/README.md)


##Dependencies
* [npm](https://www.npmjs.com/)
* [CartoDB](https://cartodb.com/) account


##Setup

Clone the project and `cd` into the project folder.

`nvm use` to fire up the right Node version.

Make sure you have [npm](https://www.npmjs.com/) installed. Note: **version > 2.7.0 is required** to install scoped packages, such as `@panorama/toolkit`. Instructions for updating npm are [here](https://docs.npmjs.com/getting-started/installing-node#updating-npm).

Load required **npm** modules.

```bash
npm install
```

Create a `config.json` file from `config.json.sample` in `./basemaps/cartodb` and add your CartoDB account name to the file. Will look like this...

```json
{
	"userId": "[CartoDB user id / account name]"
}
```

Note: Canals uses public materialized tables (see [data/README.md](data/README.md)) and therefore does not need an authenticated session. However, for development (if changing CartoDB queries to point at non-public tables) you might want to use authentication; if so, you must also include an `apiKey` parameter in your `config.json`. `apiKey` will append the specified API key as a query param on all requests to CartoDB. This is insecure and is not intended for production!

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
