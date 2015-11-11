(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/basemaps/cartodb/basemaps.json":[function(require,module,exports){
module.exports={"name":"PanoramaBasemap","version":"0.0.1","layergroup":{"version":"1.3.0","layers":[{"type":"mapnik","options":{"sql":"SELECT * FROM unified_basemap_layers ORDER BY ord\n","cartocss":"@water: #dde9e9;\n@waterlines: #aacccc;\n@land: #f9f9f9;\n\nMap {\n  buffer-size: 128;\n  background-color: @water;\n}\n\n#unified_basemap_layers[layer='ne_10m_coastline_2163']{\n  line-color: @waterlines;\n  line-width: 0.75;\n  line-opacity: 1;\n  line-join: round;\n  line-cap: round;\n}\n\n#unified_basemap_layers[layer='ne_10m_lakes_2163'] {\n  line-color: @waterlines;\n  line-width: 2.5;\n  line-opacity: 1;\n  line-join: round;\n  line-cap: round;\n\n  /* Soften lines at lower zooms */\n  [zoom<=7] {\n    line-width: 2.5;\n    line-color: lighten(desaturate(#aacccc,2%),2%);\n  }\n  [zoom<=5] {\n    line-width: 1.5;\n    line-color: lighten(desaturate(#aacccc,5%),5%);\n  }\n\n  /* Separate attachment because seams */\n  ::fill {\n    polygon-fill: @water;\n    polygon-opacity: 1;\n  }\n\n  /* Remove small lakes at lower zooms */\n  [scalerank>3][zoom<=5] {\n    ::fill {\n      polygon-opacity: 0;\n    }\n    line-opacity: 0;\n  }\n  [scalerank>6][zoom<=7] {\n    ::fill {\n      polygon-opacity: 0;\n    }\n    line-opacity: 0;\n  }\n}\n\n#unified_basemap_layers[layer='ne_10m_rivers_lake_centerlines_2163'] {\n  line-color: @waterlines;\n  line-width: 1.5;\n  line-opacity: 1;\n  line-join: round;\n  line-cap: round;\n\n  [name='Mississippi'],\n  [name='St. Lawrence'],\n  [name='Columbia'],\n  [name='Ohio'],\n  [name='Hudson'],\n  [name='Missouri'],\n  [name='Rio Grande'] {\n    line-width: 4;\n  }\n  [zoom<=8][name='Mississippi'],\n  [zoom<=8][name='St. Lawrence'],\n  [zoom<=8][name='Columbia'],\n  [zoom<=8][name='Ohio'],\n  [zoom<=8][name='Hudson'],\n  [zoom<=8][name='Missouri'],\n  [zoom<=8][name='Rio Grande'] {\n    line-width: 2;\n  }\n  [zoom<=8][name!='Mississippi'][name!='St. Lawrence'][name!='Rio Grande'][name!='Ohio'][name!='Hudson'][name!='Columbia'][name!='Missouri'],\n  [zoom<=6][name='Mississippi'],\n  [zoom<=6][name='Columbia'],\n  [zoom<=6][name='Ohio'],\n  [zoom<=6][name='Hudson'],\n  [zoom<=6][name='Missouri'],\n  [zoom<=6][name='Rio Grande'] {\n    line-width: 1;\n    line-color: lighten(desaturate(@waterlines,2%),2%);\n\n  }\n  [zoom>=7][name!='Mississippi'][name!='St. Lawrence'][name!='Rio Grande'][name!='Ohio'][name!='Hudson'][name!='Columbia'][name!='Missouri']::labels,\n  [zoom>=5][name='Mississippi']::labels,\n  [zoom>=5][name='Columbia']::labels,\n  [zoom>=5][name='Ohio']::labels,\n  [zoom>=5][name='Hudson']::labels,\n  [zoom>=5][name='Missouri']::labels,\n  [zoom>=5][name='Rio Grande']::labels {\n    text-name: [name];\n    text-face-name: 'DejaVu Sans Oblique';\n    text-fill: @waterlines;\n    text-placement: line;\n    text-halo-fill: @land;\n    text-halo-radius: 1.5;\n    text-size: 10;\n    text-dy: -8;\n    text-character-spacing: 2;\n    text-spacing: 100;\n    text-min-distance: 100;\n  }\n\n  [zoom<=6][name!='Mississippi'][name!='St. Lawrence'][name!='Rio Grande'][name!='Ohio'][name!='Hudson'][name!='Columbia'][name!='Missouri'] {\n    line-width: 0.5;\n    line-color: lighten(desaturate(@waterlines,5%),5%);\n  }\n  [zoom<=5][name!='Mississippi'][name!='St. Lawrence'][name!='Rio Grande'][name!='Ohio'][name!='Hudson'][name!='Columbia'][name!='Missouri'] {\n    line-width: 0;\n  }\n  [zoom<=5][name='Mississippi'],\n  [zoom<=5][name='St. Lawrence'],\n  [zoom<=5][name='Columbia'],\n  [zoom<=5][name='Ohio'],\n  [zoom<=5][name='Hudson'],\n  [zoom<=5][name='Missouri'],\n  [zoom<=5][name='Rio Grande'] {\n    line-width: 0.5;\n    line-color: lighten(desaturate(@waterlines,2%),2%);\n  }\n}\n\n#unified_basemap_layers[layer='ne_10m_admin_0_countries_lakes_2163'] {\n\n  line-color: @land;\n  line-width: 1;\n  line-opacity: 1;\n  line-join: round;\n  line-cap: round;\n  polygon-fill: @land;\n  polygon-opacity: 1;\n\n}\n","cartocss_version":"2.1.1"}},{"type":"mapnik","options":{"sql":"SELECT cartodb_id, name, opened, ST_Transform(the_geom_webmercator,2163) as the_geom_webmercator FROM canals\n","cartocss":"#canals{\n  [zoom<=7] {\n    line-simplify: 5;\n  }\n  line-color: #AF83D9;\n  line-width: 1;\n  line-cap: round;\n  line-join: round;\n  /*\n  [opened > 1840] {\n    line-color: #f09;\n  }\n  */\n\n/*\n  [name = 'Erie Canal']::highlight {\n    line-color: yellow;\n    line-width: 10;\n    opacity: 0.2;\n    line-cap: round;\n    line-join: round;\n  }\n*/\n\n  [zoom<=7] { line-simplify: 5; }\n  [zoom<=6] { line-simplify: 10;}\n  [zoom<=5] { line-simplify: 15;}\n}\n","cartocss_version":"2.1.1"}},{"type":"mapnik","options":{"sql":"SELECT cartodb_id, lat::float, long::float, ST_Transform(the_geom,2163) as the_geom_webmercator, start, state, town, rank FROM canal_towns\n","cartocss":"@textcolor: #666;\n@halocolor: #f9f9f9;\n\nMap {\n  buffer-size: 128;\n}\n\n#canals_cities_basemap[rank=1][zoom>=5],\n#canals_cities_basemap[rank=2][zoom>=6],\n#canals_cities_basemap[rank>=3][zoom>=8]{\n  // Note: have to use markers not shields to change svg color\n  ::halo {\n    marker-placement: point;\n    marker-fill-opacity: 1;\n    marker-line-width: 0;\n    marker-type: ellipse;\n    marker-width: 9;\n    marker-fill: @halocolor;\n  }\n  marker-fill-opacity: 0.9;\n  marker-line-color: @halocolor;\n  marker-line-width: 1.5;\n  marker-line-opacity: 1;\n  marker-placement: point;\n  //marker-type: ellipse;\n  marker-file: url('https://raw.githubusercontent.com/mapbox/maki/mb-pages/src/circle-12.svg');\n  marker-width: 6;\n  marker-fill: @textcolor;\n\n  marker-allow-overlap: true;\n}\n\n@default_size: 9;\n@x_distance_positive: 3;\n@y_distance_positive: 3;\n@x_distance_negative: -3;\n@y_distance_negative: -3;\n\n#canals_cities_basemap[rank=1][zoom>=5]::labels,\n#canals_cities_basemap[rank=2][zoom>=6]::labels,\n#canals_cities_basemap[rank>=3][zoom>=8]::labels, {\n\n  text-name: [town];\n  text-face-name: 'DejaVu Sans Book';\n  text-size: @default_size;\n  [zoom>=6][rank=1] {\n    text-size: @default_size + 3;\n  }\n  text-label-position-tolerance: 0;\n  text-fill: @textcolor;\n  text-halo-fill: @halocolor;\n  text-halo-radius: 1.5;\n  // Default is upper right from dot\n  text-dy: @y_distance_negative;\n  text-dx: @x_distance_positive;\n\n  // Labels to float left instead\n  [state='Illinois'],\n  [state='Indiana'],\n  [state='Ohio'][town!='Cincinnati'],\n  [town='Bellefonte'],\n  [town='Pittsburgh'],\n  [town='Rochester'],\n  [town='Newark'],\n  [town='Oswego'],\n  [town='Buffalo'],\n  [town='Corning'],\n  [town='Bristol'],\n  [town='Reading'],\n  [town='Buchanan'] {\n    text-dx: @x_distance_negative;\n  }\n\n  // Labels to float below dot\n\n  [town='New Brunswick'],\n  [town='La Salle'],\n  [town='Lawrenceburg'],\n  [town='Akron'],\n  [town='Albany'],\n  [town='Athens'],\n  [town='Utica'],\n  [town='Reading'],\n  [town='Bordentown'],\n  [town='Philadelphia'],\n  [town='Lynchburg'],\n  [town='Toledo'],\n  [town='Pittsburgh'],\n  [town='Cincinnati'] {\n    text-dy: @y_distance_positive;\n  }\n\n  text-allow-overlap: true;\n  text-placement: point;\n  text-placement-type: dummy;\n\n}","cartocss_version":"2.1.1"}}],"minzoom":2,"maxzoom":9}}

},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/basemaps/cartodb/config.json":[function(require,module,exports){
module.exports={
	"userId": "digitalscholarshiplab",
	"apiKey": "f307c20273274ba897ae8ece36f3a543b5992f23"
}

},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/basemaps/tileLayers.json":[function(require,module,exports){
module.exports={
	"layers": [
		{
			"url": "http://sm.mapstack.stamen.com/openterrain_2163/{z}/{x}/{y}.png"
		}
	]
}

},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/core-js/object/assign.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/fn/object/assign.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/core-js/object/create.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/fn/object/create.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/core-js/object/is-frozen.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/is-frozen"), __esModule: true };
},{"core-js/library/fn/object/is-frozen":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/fn/object/is-frozen.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/core-js/object/keys.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/fn/object/keys.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/core-js/object/set-prototype-of.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/fn/object/set-prototype-of.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/helpers/class-call-check.js":[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/helpers/extends.js":[function(require,module,exports){
"use strict";

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

exports["default"] = _Object$assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/assign":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/core-js/object/assign.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/helpers/inherits.js":[function(require,module,exports){
"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of")["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/create":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/core-js/object/create.js","babel-runtime/core-js/object/set-prototype-of":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/core-js/object/set-prototype-of.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/helpers/interop-require-default.js":[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/helpers/interop-require-wildcard.js":[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
};

exports.__esModule = true;
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/babel-runtime/helpers/object-without-properties.js":[function(require,module,exports){
"use strict";

exports["default"] = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

exports.__esModule = true;
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/classnames/index.js":[function(require,module,exports){
/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes += ' ' + arg;
			} else if (Array.isArray(arg)) {
				classes += ' ' + classNames.apply(null, arg);
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes += ' ' + key;
					}
				}
			}
		}

		return classes.substr(1);
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/fn/object/assign.js":[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.core.js","../../modules/es6.object.assign":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/es6.object.assign.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/fn/object/create.js":[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/fn/object/is-frozen.js":[function(require,module,exports){
require('../../modules/es6.object.is-frozen');
module.exports = require('../../modules/$.core').Object.isFrozen;
},{"../../modules/$.core":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.core.js","../../modules/es6.object.is-frozen":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/es6.object.is-frozen.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/fn/object/keys.js":[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.core.js","../../modules/es6.object.keys":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/es6.object.keys.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/fn/object/set-prototype-of.js":[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/$.core').Object.setPrototypeOf;
},{"../../modules/$.core":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.core.js","../../modules/es6.object.set-prototype-of":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/es6.object.set-prototype-of.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.a-function.js":[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.an-object.js":[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.is-object.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.assign.js":[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.js","./$.fails":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.fails.js","./$.iobject":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.iobject.js","./$.to-object":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.to-object.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.cof.js":[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.core.js":[function(require,module,exports){
var core = module.exports = {version: '1.2.2'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.ctx.js":[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.a-function.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.def.js":[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , PROTOTYPE = 'prototype';
var ctx = function(fn, that){
  return function(){
    return fn.apply(that, arguments);
  };
};
var $def = function(type, name, source){
  var key, own, out, exp
    , isGlobal = type & $def.G
    , isProto  = type & $def.P
    , target   = isGlobal ? global : type & $def.S
        ? global[name] : (global[name] || {})[PROTOTYPE]
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // contains in native
    own = !(type & $def.F) && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    if(isGlobal && typeof target[key] != 'function')exp = source[key];
    // bind timers to global for call from export context
    else if(type & $def.B && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & $def.W && target[key] == out)!function(C){
      exp = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      exp[PROTOTYPE] = C[PROTOTYPE];
    }(out);
    else exp = isProto && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export
    exports[key] = exp;
    if(isProto)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$def.F = 1;  // forced
$def.G = 2;  // global
$def.S = 4;  // static
$def.P = 8;  // proto
$def.B = 16; // bind
$def.W = 32; // wrap
module.exports = $def;
},{"./$.core":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.core.js","./$.global":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.global.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.defined.js":[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.fails.js":[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.global.js":[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.iobject.js":[function(require,module,exports){
// indexed object, fallback for non-array-like ES3 strings
var cof = require('./$.cof');
module.exports = 0 in Object('z') ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.cof.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.is-object.js":[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.js":[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.object-sap.js":[function(require,module,exports){
// most Object methods by ES6 should accept primitives
module.exports = function(KEY, exec){
  var $def = require('./$.def')
    , fn   = (require('./$.core').Object || {})[KEY] || Object[KEY]
    , exp  = {};
  exp[KEY] = exec(fn);
  $def($def.S + $def.F * require('./$.fails')(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.core.js","./$.def":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.def.js","./$.fails":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.fails.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.set-proto.js":[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.js","./$.an-object":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.an-object.js","./$.ctx":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.ctx.js","./$.is-object":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.is-object.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.to-object.js":[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.defined.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/es6.object.assign.js":[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $def = require('./$.def');

$def($def.S + $def.F, 'Object', {assign: require('./$.assign')});
},{"./$.assign":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.assign.js","./$.def":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.def.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/es6.object.is-frozen.js":[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"./$.is-object":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.is-object.js","./$.object-sap":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.object-sap.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/es6.object.keys.js":[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.object-sap.js","./$.to-object":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.to-object.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/es6.object.set-prototype-of.js":[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $def = require('./$.def');
$def($def.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.def":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.def.js","./$.set-proto":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/core-js/library/modules/$.set-proto.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/activeElement.js":[function(require,module,exports){
'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

/**
 * document.activeElement
 */
exports['default'] = activeElement;

var _ownerDocument = require('./ownerDocument');

var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);

function activeElement() {
  var doc = arguments[0] === undefined ? document : arguments[0];

  try {
    return doc.activeElement;
  } catch (e) {}
}

module.exports = exports['default'];
},{"./ownerDocument":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/ownerDocument.js","./util/babelHelpers.js":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/babelHelpers.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/events/off.js":[function(require,module,exports){
'use strict';
var canUseDOM = require('../util/inDOM');
var off = function off() {};

if (canUseDOM) {

  off = (function () {

    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.removeEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.detachEvent('on' + eventName, handler);
    };
  })();
}

module.exports = off;
},{"../util/inDOM":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/inDOM.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/events/on.js":[function(require,module,exports){
'use strict';
var canUseDOM = require('../util/inDOM');
var on = function on() {};

if (canUseDOM) {
  on = (function () {

    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.addEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.attachEvent('on' + eventName, handler);
    };
  })();
}

module.exports = on;
},{"../util/inDOM":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/inDOM.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/ownerDocument.js":[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = ownerDocument;

function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

module.exports = exports["default"];
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/ownerWindow.js":[function(require,module,exports){
'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;
exports['default'] = ownerWindow;

var _ownerDocument = require('./ownerDocument');

var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);

function ownerWindow(node) {
  var doc = (0, _ownerDocument2['default'])(node);
  return doc && doc.defaultView || doc.parentWindow;
}

module.exports = exports['default'];
},{"./ownerDocument":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/ownerDocument.js","./util/babelHelpers.js":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/babelHelpers.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/contains.js":[function(require,module,exports){
'use strict';
var canUseDOM = require('../util/inDOM');

var contains = (function () {
  var root = canUseDOM && document.documentElement;

  return root && root.contains ? function (context, node) {
    return context.contains(node);
  } : root && root.compareDocumentPosition ? function (context, node) {
    return context === node || !!(context.compareDocumentPosition(node) & 16);
  } : function (context, node) {
    if (node) do {
      if (node === context) return true;
    } while (node = node.parentNode);

    return false;
  };
})();

module.exports = contains;
},{"../util/inDOM":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/inDOM.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/isWindow.js":[function(require,module,exports){
'use strict';

module.exports = function getWindow(node) {
  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
};
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/offset.js":[function(require,module,exports){
'use strict';
var contains = require('./contains'),
    getWindow = require('./isWindow'),
    ownerDocument = require('../ownerDocument');

module.exports = function offset(node) {
  var doc = ownerDocument(node),
      win = getWindow(doc),
      docElem = doc && doc.documentElement,
      box = { top: 0, left: 0, height: 0, width: 0 };

  if (!doc) return;

  // Make sure it's not a disconnected DOM node
  if (!contains(docElem, node)) return box;

  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();

  if (box.width || box.height) {

    box = {
      top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
      left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
      width: (box.width == null ? node.offsetWidth : box.width) || 0,
      height: (box.height == null ? node.offsetHeight : box.height) || 0
    };
  }

  return box;
};
},{"../ownerDocument":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/ownerDocument.js","./contains":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/contains.js","./isWindow":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/isWindow.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/offsetParent.js":[function(require,module,exports){
'use strict';

var babelHelpers = require('../util/babelHelpers.js');

exports.__esModule = true;
exports['default'] = offsetParent;

var _ownerDocument = require('../ownerDocument');

var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);

var _style = require('../style');

var _style2 = babelHelpers.interopRequireDefault(_style);

function nodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase();
}

function offsetParent(node) {
  var doc = (0, _ownerDocument2['default'])(node),
      offsetParent = node && node.offsetParent;

  while (offsetParent && nodeName(node) !== 'html' && (0, _style2['default'])(offsetParent, 'position') === 'static') {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
}

module.exports = exports['default'];
},{"../ownerDocument":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/ownerDocument.js","../style":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/style/index.js","../util/babelHelpers.js":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/babelHelpers.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/position.js":[function(require,module,exports){
'use strict';

var babelHelpers = require('../util/babelHelpers.js');

exports.__esModule = true;
exports['default'] = position;

var _offset = require('./offset');

var _offset2 = babelHelpers.interopRequireDefault(_offset);

var _offsetParent = require('./offsetParent');

var _offsetParent2 = babelHelpers.interopRequireDefault(_offsetParent);

var _scrollTop = require('./scrollTop');

var _scrollTop2 = babelHelpers.interopRequireDefault(_scrollTop);

var _scrollLeft = require('./scrollLeft');

var _scrollLeft2 = babelHelpers.interopRequireDefault(_scrollLeft);

var _style = require('../style');

var _style2 = babelHelpers.interopRequireDefault(_style);

function nodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase();
}

function position(node, offsetParent) {
  var parentOffset = { top: 0, left: 0 },
      offset;

  // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
  // because it is its only offset parent
  if ((0, _style2['default'])(node, 'position') === 'fixed') {
    offset = node.getBoundingClientRect();
  } else {
    offsetParent = offsetParent || (0, _offsetParent2['default'])(node);
    offset = (0, _offset2['default'])(node);

    if (nodeName(offsetParent) !== 'html') parentOffset = (0, _offset2['default'])(offsetParent);

    parentOffset.top += parseInt((0, _style2['default'])(offsetParent, 'borderTopWidth'), 10) - (0, _scrollTop2['default'])(offsetParent) || 0;
    parentOffset.left += parseInt((0, _style2['default'])(offsetParent, 'borderLeftWidth'), 10) - (0, _scrollLeft2['default'])(offsetParent) || 0;
  }

  // Subtract parent offsets and node margins
  return babelHelpers._extends({}, offset, {
    top: offset.top - parentOffset.top - (parseInt((0, _style2['default'])(node, 'marginTop'), 10) || 0),
    left: offset.left - parentOffset.left - (parseInt((0, _style2['default'])(node, 'marginLeft'), 10) || 0)
  });
}

module.exports = exports['default'];
},{"../style":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/style/index.js","../util/babelHelpers.js":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/babelHelpers.js","./offset":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/offset.js","./offsetParent":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/offsetParent.js","./scrollLeft":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/scrollLeft.js","./scrollTop":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/scrollTop.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/scrollLeft.js":[function(require,module,exports){
'use strict';
var getWindow = require('./isWindow');

module.exports = function scrollTop(node, val) {
  var win = getWindow(node);

  if (val === undefined) return win ? 'pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft : node.scrollLeft;

  if (win) win.scrollTo(val, 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop);else node.scrollLeft = val;
};
},{"./isWindow":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/isWindow.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/scrollTop.js":[function(require,module,exports){
'use strict';
var getWindow = require('./isWindow');

module.exports = function scrollTop(node, val) {
  var win = getWindow(node);

  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;

  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
};
},{"./isWindow":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/query/isWindow.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/style/getComputedStyle.js":[function(require,module,exports){
'use strict';

var babelHelpers = require('../util/babelHelpers.js');

var _utilCamelizeStyle = require('../util/camelizeStyle');

var _utilCamelizeStyle2 = babelHelpers.interopRequireDefault(_utilCamelizeStyle);

var rposition = /^(top|right|bottom|left)$/;
var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

module.exports = function _getComputedStyle(node) {
  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
  var doc = node.ownerDocument;

  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : { //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
    getPropertyValue: function getPropertyValue(prop) {
      var style = node.style;

      prop = (0, _utilCamelizeStyle2['default'])(prop);

      if (prop == 'float') prop = 'styleFloat';

      var current = node.currentStyle[prop] || null;

      if (current == null && style && style[prop]) current = style[prop];

      if (rnumnonpx.test(current) && !rposition.test(prop)) {
        // Remember the original values
        var left = style.left;
        var runStyle = node.runtimeStyle;
        var rsLeft = runStyle && runStyle.left;

        // Put in the new values to get a computed value out
        if (rsLeft) runStyle.left = node.currentStyle.left;

        style.left = prop === 'fontSize' ? '1em' : current;
        current = style.pixelLeft + 'px';

        // Revert the changed values
        style.left = left;
        if (rsLeft) runStyle.left = rsLeft;
      }

      return current;
    }
  };
};
},{"../util/babelHelpers.js":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/babelHelpers.js","../util/camelizeStyle":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/camelizeStyle.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/style/index.js":[function(require,module,exports){
'use strict';

var camelize = require('../util/camelizeStyle'),
    hyphenate = require('../util/hyphenateStyle'),
    _getComputedStyle = require('./getComputedStyle'),
    removeStyle = require('./removeStyle');

var has = Object.prototype.hasOwnProperty;

module.exports = function style(node, property, value) {
  var css = '',
      props = property;

  if (typeof property === 'string') {

    if (value === undefined) return node.style[camelize(property)] || _getComputedStyle(node).getPropertyValue(hyphenate(property));else (props = {})[property] = value;
  }

  for (var key in props) if (has.call(props, key)) {
    !props[key] && props[key] !== 0 ? removeStyle(node, hyphenate(key)) : css += hyphenate(key) + ':' + props[key] + ';';
  }

  node.style.cssText += ';' + css;
};
},{"../util/camelizeStyle":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/camelizeStyle.js","../util/hyphenateStyle":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/hyphenateStyle.js","./getComputedStyle":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/style/getComputedStyle.js","./removeStyle":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/style/removeStyle.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/style/removeStyle.js":[function(require,module,exports){
'use strict';

module.exports = function removeStyle(node, key) {
  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
};
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/transition/properties.js":[function(require,module,exports){
'use strict';
var canUseDOM = require('../util/inDOM');

var has = Object.prototype.hasOwnProperty,
    transform = 'transform',
    transition = {},
    transitionTiming,
    transitionDuration,
    transitionProperty,
    transitionDelay;

if (canUseDOM) {
  transition = getTransitionProperties();

  transform = transition.prefix + transform;

  transitionProperty = transition.prefix + 'transition-property';
  transitionDuration = transition.prefix + 'transition-duration';
  transitionDelay = transition.prefix + 'transition-delay';
  transitionTiming = transition.prefix + 'transition-timing-function';
}

module.exports = {
  transform: transform,
  end: transition.end,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};

function getTransitionProperties() {
  var endEvent,
      prefix = '',
      transitions = {
    O: 'otransitionend',
    Moz: 'transitionend',
    Webkit: 'webkitTransitionEnd',
    ms: 'MSTransitionEnd'
  };

  var element = document.createElement('div');

  for (var vendor in transitions) if (has.call(transitions, vendor)) {
    if (element.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + vendor.toLowerCase() + '-';
      endEvent = transitions[vendor];
      break;
    }
  }

  if (!endEvent && element.style.transitionProperty !== undefined) endEvent = 'transitionend';

  return { end: endEvent, prefix: prefix };
}
},{"../util/inDOM":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/inDOM.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/babelHelpers.js":[function(require,module,exports){
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports === "object") {
    factory(exports);
  } else {
    factory(root.babelHelpers = {});
  }
})(this, function (global) {
  var babelHelpers = global;

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  };

  babelHelpers._extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
})
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/camelize.js":[function(require,module,exports){
"use strict";

var rHyphen = /-(.)/g;

module.exports = function camelize(string) {
  return string.replace(rHyphen, function (_, chr) {
    return chr.toUpperCase();
  });
};
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/camelizeStyle.js":[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
 */

'use strict';
var camelize = require('./camelize');
var msPattern = /^-ms-/;

module.exports = function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
};
},{"./camelize":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/camelize.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/hyphenate.js":[function(require,module,exports){
'use strict';

var rUpper = /([A-Z])/g;

module.exports = function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
};
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/hyphenateStyle.js":[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
 */

"use strict";

var hyphenate = require("./hyphenate");
var msPattern = /^ms-/;

module.exports = function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, "-ms-");
};
},{"./hyphenate":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/hyphenate.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/inDOM.js":[function(require,module,exports){
'use strict';
module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/scrollbarSize.js":[function(require,module,exports){
'use strict';

var canUseDOM = require('./inDOM');

var size;

module.exports = function (recalc) {
  if (!size || recalc) {
    if (canUseDOM) {
      var scrollDiv = document.createElement('div');

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
};
},{"./inDOM":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/dom-helpers/util/inDOM.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/events/events.js":[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        len = arguments.length;
        args = new Array(len - 1);
        for (i = 1; i < len; i++)
          args[i - 1] = arguments[i];
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    len = arguments.length;
    args = new Array(len - 1);
    for (i = 1; i < len; i++)
      args[i - 1] = arguments[i];

    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    var m;
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  var ret;
  if (!emitter._events || !emitter._events[type])
    ret = 0;
  else if (isFunction(emitter._events[type]))
    ret = 1;
  else
    ret = emitter._events[type].length;
  return ret;
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/invariant/browser.js":[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/process/browser.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/keycode/index.js":[function(require,module,exports){
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes



/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'right click': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222,
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 33,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}

},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/koto/dist/koto.js":[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("d3")):"function"==typeof define&&define.amd?define(["d3"],e):"object"==typeof exports?exports.Koto=e(require("d3")):t.Koto=e(t.d3)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var r=n(1)["default"],o=n(2)["default"],i=n(17)["default"],s=n(28)["default"],c=n(65)["default"],u=n(75)["default"],a=n(78)["default"],f=n(82)["default"];e.__esModule=!0;var l=n(83),h=f(l),p=n(84),d=f(p),v=n(85),y=f(v);d["default"](h["default"],"d3 js is required.");var g=function(){function t(e){var n=this;r(this,t),this.base=e,this.hasDrawn=!1,this.merge={},this.merge.configs=function(){for(var t=arguments.length,e=Array(t),r=0;t>r;r++)e[r]=arguments[r];return n.configs=i.apply(Object,[{},n.configs].concat(e)),n.configs},this.merge.accessors=function(){for(var t=arguments.length,e=Array(t),r=0;t>r;r++)e[r]=arguments[r];return n.accessors=i.apply(Object,[{},n.accessors].concat(e)),n.accessors},this.configs={},this.accessors={},this.promise=null,this._layers=new s,this._attached=new s,this._events=new s,this.c=this.config,this.a=this.accessor}return t.prototype.transform=function(t){return t},t.prototype.demux=function(t,e){return e},t.prototype.preDraw=function(){},t.prototype.postDraw=function(){},t.prototype.postTransition=function(){},t.prototype.unlayer=function(t){var e=this.layer(t);return this._layers["delete"](t),delete e._chart,e},t.prototype.layer=function(t,e,n){var r,o=this;if(1===arguments.length)return this._layers.get(t);if(2===arguments.length){if(e instanceof y["default"])return e._chart=this,this._layers.set(t,e),this._layers.get(t);d["default"](!1,"When reattaching a layer, the second argument must be a koto layer")}return e._chart=this,r=new y["default"](e,n),r.remove=function(){return o._layers["delete"](t),this},this._layers.set(t,r),r},t.prototype.attach=function(t,e){return 1===arguments.length?this._attached.get(t):(this._attached.set(t,e),e)},t.prototype.draw=function(t){var e,n,r=this,o=[];return c.resolve(this.transform(t)).then(function(t){r.preDraw(t),r.trigger("preDraw",t);for(var i=r._layers.values(),s=Array.isArray(i),a=0,i=s?i:u(i);;){if(s){if(a>=i.length)break;e=i[a++]}else{if(a=i.next(),a.done)break;e=a.value}e.draw(t),o.push(e.promise)}for(var f=r._attached.entries(),l=Array.isArray(f),h=0,f=l?f:u(f);;){var p;if(l){if(h>=f.length)break;p=f[h++]}else{if(h=f.next(),h.done)break;p=h.value}var d=p[0],v=p[1];n=r.demux?r.demux(d,t):t,v.draw(n),o.push(v.promise)}return r.hasDrawn=!0,r.promise=c.all(o),r.postDraw(),r.trigger("postDraw",t),r.promise.then(function(){r.postTransition(t),r.trigger("postTransition",t)}),t})},t.prototype.on=function(t,e,n){var r;return r=this._events.has(t)?this._events.get(t):new a,r.add({callback:e,context:n||this,_chart:this}),this._events.set(t,r),this},t.prototype.once=function(t,e,n){var r=this,o=function i(){r.off(t,i),e.apply(this,arguments)};return this.on(t,o,n)},t.prototype.off=function(t,e,n){return 0===arguments.length?(this._events.clear(),this):1===arguments.length?(this._events.has(t)&&this._events.get(t).clear(),this):(this._events.get(t).forEach(function(t,r,o){(e&&e===r.callback||n&&n===r.context)&&o["delete"](t)}),this)},t.prototype.trigger=function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;e>r;r++)n[r-1]=arguments[r];return this._events.has(t)&&this._events.get(t).forEach(function(t){var e;(e=t.callback).call.apply(e,[t.context].concat(n))}),this},t.prototype.config=function(t,e){function n(){function t(t,e){var n=Math.min.call(null,t.map(function(t){return i.config(t)}));return e/n}o.constrain===!0?o.percentage=t(["width","height"],o.value):Array.isArray(o.constrain)?o.percentage=t(o.constrain,o.value):o.percentage=t([o.constrain],o.value)}var r,o,i=this;if(0===arguments.length)return this.configs;if(1===arguments.length){if("object"==typeof t){for(r in t)this.configs.hasOwnProperty(r)?(o=this.configs[r],o.hasOwnProperty("setter")?o.value=o.setter.call(o,t[r]):o.value=t[r],o.hasOwnProperty("constrain")&&n(),this.configs[r]=o):console.warn("config with name "+t+" is not defined.");return this}return d["default"](this.configs.hasOwnProperty(t),t+" is not a valid option."),o=this.configs[t],o.hasOwnProperty("getter")?o.getter.call(o):o.value}return 2===arguments.length?(this.configs.hasOwnProperty(t)?(o=this.configs[t],o.hasOwnProperty("setter")?o.value=o.setter.call(o,e):o.value=e,o.hasOwnProperty("constrain")&&n(),this.configs[t]=o):console.warn("config with name "+t+" is not defined."),this):void 0},t.prototype.accessor=function(t,e){var n;if(0===arguments.length)return this.accessors;if(1===arguments.length){if("string"==typeof t)return d["default"](this.accessors.hasOwnProperty(t),t+" is not a valid accessor."),this.accessors[t];for(n in t)this.accessors[n]=t[n]}else this.accessors[t]=e;return this},t.extend=function(t){var e=function(e){function n(o){r(this,n);var i;if(e.call(this,o),"function"==typeof t)t.call(this);else{for(i in t)this[i]=t[i];this.initialize.call(this)}}return o(n,e),n}(this);return e},t}();e["default"]=g,t.exports=e["default"]},function(t,e){"use strict";e["default"]=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},e.__esModule=!0},function(t,e,n){"use strict";var r=n(3)["default"],o=n(6)["default"];e["default"]=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=r(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(o?o(t,e):t.__proto__=e)},e.__esModule=!0},function(t,e,n){t.exports={"default":n(4),__esModule:!0}},function(t,e,n){var r=n(5);t.exports=function(t,e){return r.create(t,e)}},function(t,e){var n=Object;t.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(t,e,n){t.exports={"default":n(7),__esModule:!0}},function(t,e,n){n(8),t.exports=n(11).Object.setPrototypeOf},function(t,e,n){var r=n(9);r(r.S,"Object",{setPrototypeOf:n(12).set})},function(t,e,n){var r=n(10),o=n(11),i="prototype",s=function(t,e){return function(){return t.apply(e,arguments)}},c=function(t,e,n){var u,a,f,l,h=t&c.G,p=t&c.P,d=h?r:t&c.S?r[e]:(r[e]||{})[i],v=h?o:o[e]||(o[e]={});h&&(n=e);for(u in n)a=!(t&c.F)&&d&&u in d,a&&u in v||(f=a?d[u]:n[u],h&&"function"!=typeof d[u]?l=n[u]:t&c.B&&a?l=s(f,r):t&c.W&&d[u]==f?!function(t){l=function(e){return this instanceof t?new t(e):t(e)},l[i]=t[i]}(f):l=p&&"function"==typeof f?s(Function.call,f):f,v[u]=l,p&&((v[i]||(v[i]={}))[u]=f))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,t.exports=c},function(t,e){var n="undefined",r=t.exports=typeof window!=n&&window.Math==Math?window:typeof self!=n&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,e){var n=t.exports={version:"1.2.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(5).getDesc,o=n(13),i=n(14),s=function(t,e){if(i(t),!o(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,o){try{o=n(15)(Function.call,r(Object.prototype,"__proto__").set,2),o(t,[]),e=!(t instanceof Array)}catch(i){e=!0}return function(t,n){return s(t,n),e?t.__proto__=n:o(t,n),t}}({},!1):void 0),check:s}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(13);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(16);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){t.exports={"default":n(18),__esModule:!0}},function(t,e,n){n(19),t.exports=n(11).Object.assign},function(t,e,n){var r=n(9);r(r.S+r.F,"Object",{assign:n(20)})},function(t,e,n){var r=n(21),o=n(23),i=n(25),s=n(26);t.exports=n(27)(function(){var t=Object.assign,e={},n={},r=Symbol(),o="abcdefghijklmnopqrst";return e[r]=7,o.split("").forEach(function(t){n[t]=t}),7!=t({},e)[r]||Object.keys(t({},n)).join("")!=o})?function(t,e){for(var n=r(t),c=arguments.length,u=1;c>u;)for(var a,f=o(arguments[u++]),l=i(f),h=l.length,p=0;h>p;)s(f,a=l[p++])&&(n[a]=f[a]);return n}:Object.assign},function(t,e,n){var r=n(22);t.exports=function(t){return Object(r(t))}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(24);t.exports=0 in Object("z")?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(5);t.exports=function(t){var e=r.getKeys(t),n=r.getSymbols;if(n)for(var o,i=n(t),s=r.isEnum,c=0;i.length>c;)s.call(t,o=i[c++])&&e.push(o);return e}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e,n){t.exports={"default":n(29),__esModule:!0}},function(t,e,n){n(30),n(31),n(46),n(51),n(63),t.exports=n(11).Map},function(t,e){},function(t,e,n){"use strict";var r=n(32)(!0);n(34)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(33),o=n(22);t.exports=function(t){return function(e,n){var i,s,c=String(o(e)),u=r(n),a=c.length;return 0>u||u>=a?t?"":void 0:(i=c.charCodeAt(u),55296>i||i>56319||u+1===a||(s=c.charCodeAt(u+1))<56320||s>57343?t?c.charAt(u):i:t?c.slice(u,u+2):(i-55296<<10)+(s-56320)+65536)}}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){"use strict";var r=n(35),o=n(9),i=n(36),s=n(37),c=n(26),u=n(40)("iterator"),a=n(43),f=!([].keys&&"next"in[].keys()),l="@@iterator",h="keys",p="values",d=function(){return this};t.exports=function(t,e,v,y,g,_,m){n(44)(v,e,y);var x,w,b=function(t){switch(t){case h:return function(){return new v(this,t)};case p:return function(){return new v(this,t)}}return function(){return new v(this,t)}},O=e+" Iterator",j=t.prototype,k=j[u]||j[l]||g&&j[g],P=k||b(g);if(k){var M=n(5).getProto(P.call(new t));n(45)(M,O,!0),!r&&c(j,l)&&s(M,u,d)}if((!r||m)&&s(j,u,P),a[e]=P,a[O]=d,g)if(x={keys:_?P:b(h),values:g==p?P:b(p),entries:g!=p?P:b("entries")},m)for(w in x)w in j||i(j,w,x[w]);else o(o.P+o.F*f,e,x)}},function(t,e){t.exports=!0},function(t,e,n){t.exports=n(37)},function(t,e,n){var r=n(5),o=n(38);t.exports=n(39)?function(t,e,n){return r.setDesc(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){t.exports=!n(27)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(41)("wks"),o=n(10).Symbol;t.exports=function(t){return r[t]||(r[t]=o&&o[t]||(o||n(42))("Symbol."+t))}},function(t,e,n){var r=n(10),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports={}},function(t,e,n){"use strict";var r=n(5),o={};n(37)(o,n(40)("iterator"),function(){return this}),t.exports=function(t,e,i){t.prototype=r.create(o,{next:n(38)(1,i)}),n(45)(t,e+" Iterator")}},function(t,e,n){var r=n(26),o=n(37),i=n(40)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,i)&&o(t,i,e)}},function(t,e,n){n(47);var r=n(43);r.NodeList=r.HTMLCollection=r.Array},function(t,e,n){"use strict";var r=n(48),o=n(49),i=n(43),s=n(50);n(34)(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r=n(23),o=n(22);t.exports=function(t){return r(o(t))}},function(t,e,n){"use strict";var r=n(52);n(62)("Map",function(t){return function(){return t(this,arguments[0])}},{get:function(t){var e=r.getEntry(this,t);return e&&e.v},set:function(t,e){return r.def(this,0===t?0:t,e)}},r,!0)},function(t,e,n){"use strict";var r=n(5),o=n(37),i=n(15),s=n(53),c=n(54),u=n(22),a=n(55),f=n(49),l=n(42)("id"),h=n(26),p=n(13),d=Object.isExtensible||p,v=n(39),y=v?"_s":"size",g=0,_=function(t,e){if(!p(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!h(t,l)){if(!d(t))return"F";if(!e)return"E";o(t,l,++g)}return"O"+t[l]},m=function(t,e){var n,r=_(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,o,s){var f=t(function(t,n){c(t,f,e),t._i=r.create(null),t._f=void 0,t._l=void 0,t[y]=0,void 0!=n&&a(n,o,t[s],t)});return n(61)(f.prototype,{clear:function(){for(var t=this,e=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete e[n.i];t._f=t._l=void 0,t[y]=0},"delete":function(t){var e=this,n=m(e,t);if(n){var r=n.n,o=n.p;delete e._i[n.i],n.r=!0,o&&(o.n=r),r&&(r.p=o),e._f==n&&(e._f=r),e._l==n&&(e._l=o),e[y]--}return!!n},forEach:function(t){for(var e,n=i(t,arguments[1],3);e=e?e.n:this._f;)for(n(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!m(this,t)}}),v&&r.setDesc(f.prototype,"size",{get:function(){return u(this[y])}}),f},def:function(t,e,n){var r,o,i=m(t,e);return i?i.v=n:(t._l=i={i:o=_(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=i),r&&(r.n=i),t[y]++,"F"!==o&&(t._i[o]=i)),t},getEntry:m,setStrong:function(t,e,r){n(34)(t,e,function(t,e){this._t=t,this._k=e,this._l=void 0},function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?"keys"==e?f(0,n.k):"values"==e?f(0,n.v):f(0,[n.k,n.v]):(t._t=void 0,f(1))},r?"entries":"values",!r,!0),s(t),s(n(11)[e])}}},function(t,e,n){"use strict";var r=n(5),o=n(40)("species");t.exports=function(t){!n(39)||o in t||r.setDesc(t,o,{configurable:!0,get:function(){return this}})}},function(t,e){t.exports=function(t,e,n){if(!(t instanceof e))throw TypeError(n+": use the 'new' operator!");return t}},function(t,e,n){var r=n(15),o=n(56),i=n(57),s=n(14),c=n(58),u=n(59);t.exports=function(t,e,n,a){var f,l,h,p=u(t),d=r(n,a,e?2:1),v=0;if("function"!=typeof p)throw TypeError(t+" is not iterable!");if(i(p))for(f=c(t.length);f>v;v++)e?d(s(l=t[v])[0],l[1]):d(t[v]);else for(h=p.call(t);!(l=h.next()).done;)o(h,d,l.value,e)}},function(t,e,n){var r=n(14);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(i){var s=t["return"];throw void 0!==s&&r(s.call(t)),i}}},function(t,e,n){var r=n(43),o=n(40)("iterator");t.exports=function(t){return(r.Array||Array.prototype[o])===t}},function(t,e,n){var r=n(33),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(60),o=n(40)("iterator"),i=n(43);t.exports=n(11).getIteratorMethod=function(t){return void 0!=t?t[o]||t["@@iterator"]||i[r(t)]:void 0}},function(t,e,n){var r=n(24),o=n(40)("toStringTag"),i="Arguments"==r(function(){return arguments}());t.exports=function(t){var e,n,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=(e=Object(t))[o])?n:i?r(e):"Object"==(s=r(e))&&"function"==typeof e.callee?"Arguments":s}},function(t,e,n){var r=n(36);t.exports=function(t,e){for(var n in e)r(t,n,e[n]);return t}},function(t,e,n){"use strict";var r=n(5),o=n(9),i=n(37),s=n(55),c=n(54);t.exports=function(t,e,u,a,f,l){var h=n(10)[t],p=h,d=f?"set":"add",v=p&&p.prototype,y={};return n(39)&&"function"==typeof p&&(l||v.forEach&&!n(27)(function(){(new p).entries().next()}))?(p=e(function(e,n){c(e,p,t),e._c=new h,void 0!=n&&s(n,f,e[d],e)}),r.each.call("add,clear,delete,forEach,get,has,set,keys,values,entries".split(","),function(t){var e="add"==t||"set"==t;t in v&&(!l||"clear"!=t)&&i(p.prototype,t,function(n,r){var o=this._c[t](0===n?0:n,r);return e?this:o})}),"size"in v&&r.setDesc(p.prototype,"size",{get:function(){return this._c.size}})):(p=a.getConstructor(e,t,f,d),n(61)(p.prototype,u)),n(45)(p,t),y[t]=p,o(o.G+o.W+o.F,y),l||a.setStrong(p,t,f),p}},function(t,e,n){var r=n(9);r(r.P,"Map",{toJSON:n(64)("Map")})},function(t,e,n){var r=n(55),o=n(60);t.exports=function(t){return function(){if(o(this)!=t)throw TypeError(t+"#toJSON isn't generic");var e=[];return r(this,!1,e.push,e),e}}},function(t,e,n){t.exports={"default":n(66),__esModule:!0}},function(t,e,n){n(30),n(31),n(46),n(67),t.exports=n(11).Promise},function(t,e,n){"use strict";var r,o=n(5),i=n(35),s=n(10),c=n(15),u=n(60),a=n(9),f=n(13),l=n(14),h=n(16),p=n(54),d=n(55),v=n(12).set,y=n(68),g=n(53),_=n(40)("species"),m=n(42)("record"),x=n(69),w="Promise",b=s.process,O="process"==u(b),j=s[w],k=function(t){var e=new j(function(){});return t&&(e.constructor=Object),j.resolve(e)===e},P=function(){function t(e){var n=new j(e);return v(n,t.prototype),n}var e=!1;try{if(e=j&&j.resolve&&k(),v(t,j),t.prototype=o.create(j.prototype,{constructor:{value:t}}),t.resolve(5).then(function(){})instanceof t||(e=!1),e&&n(39)){var r=!1;j.resolve(o.setDesc({},"then",{get:function(){r=!0}})),e=r}}catch(i){e=!1}return e}(),M=function(t){return f(t)&&(P?"Promise"==u(t):m in t)},S=function(t,e){return i&&t===j&&e===r?!0:y(t,e)},E=function(t){var e=l(t)[_];return void 0!=e?e:t},A=function(t){var e;return f(t)&&"function"==typeof(e=t.then)?e:!1},T=function(t,e){if(!t.n){t.n=!0;var n=t.c;x(function(){for(var r=t.v,o=1==t.s,i=0,c=function(e){var n,i,s=o?e.ok:e.fail;try{s?(o||(t.h=!0),n=s===!0?r:s(r),n===e.P?e.rej(TypeError("Promise-chain cycle")):(i=A(n))?i.call(n,e.res,e.rej):e.res(n)):e.rej(r)}catch(c){e.rej(c)}};n.length>i;)c(n[i++]);n.length=0,t.n=!1,e&&setTimeout(function(){var e,n,o=t.p;D(o)&&(O?b.emit("unhandledRejection",r,o):(e=s.onunhandledrejection)?e({promise:o,reason:r}):(n=s.console)&&n.error&&n.error("Unhandled promise rejection",r)),t.a=void 0},1)})}},D=function(t){var e,n=t[m],r=n.a||n.c,o=0;if(n.h)return!1;for(;r.length>o;)if(e=r[o++],e.fail||!D(e.P))return!1;return!0},F=function(t){var e=this;e.d||(e.d=!0,e=e.r||e,e.v=t,e.s=2,e.a=e.c.slice(),T(e,!0))},z=function(t){var e,n=this;if(!n.d){n.d=!0,n=n.r||n;try{(e=A(t))?x(function(){var r={r:n,d:!1};try{e.call(t,c(z,r,1),c(F,r,1))}catch(o){F.call(r,o)}}):(n.v=t,n.s=1,T(n,!1))}catch(r){F.call({r:n,d:!1},r)}}};P||(j=function(t){h(t);var e={p:p(this,j,w),c:[],a:void 0,s:0,d:!1,v:void 0,h:!1,n:!1};this[m]=e;try{t(c(z,e,1),c(F,e,1))}catch(n){F.call(e,n)}},n(61)(j.prototype,{then:function(t,e){var n=l(l(this).constructor)[_],r={ok:"function"==typeof t?t:!0,fail:"function"==typeof e?e:!1},o=r.P=new(void 0!=n?n:j)(function(t,e){r.res=t,r.rej=e});h(r.res),h(r.rej);var i=this[m];return i.c.push(r),i.a&&i.a.push(r),i.s&&T(i,!1),o},"catch":function(t){return this.then(void 0,t)}})),a(a.G+a.W+a.F*!P,{Promise:j}),n(45)(j,w),g(j),g(r=n(11)[w]),a(a.S+a.F*!P,w,{reject:function(t){return new this(function(e,n){n(t)})}}),a(a.S+a.F*(!P||k(!0)),w,{resolve:function(t){return M(t)&&S(t.constructor,this)?t:new this(function(e){e(t)})}}),a(a.S+a.F*!(P&&n(74)(function(t){j.all(t)["catch"](function(){})})),w,{all:function(t){var e=E(this),n=[];return new e(function(r,i){d(t,!1,n.push,n);var s=n.length,c=Array(s);s?o.each.call(n,function(t,n){e.resolve(t).then(function(t){c[n]=t,--s||r(c)},i)}):r(c)})},race:function(t){var e=E(this);return new e(function(n,r){d(t,!1,function(t){e.resolve(t).then(n,r)})})}})},function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},function(t,e,n){var r,o,i,s=n(10),c=n(70).set,u=s.MutationObserver||s.WebKitMutationObserver,a=s.process,f="process"==n(24)(a),l=function(){var t,e;for(f&&(t=a.domain)&&(a.domain=null,t.exit());r;)e=r.domain,e&&e.enter(),r.fn.call(),e&&e.exit(),r=r.next;o=void 0,t&&t.enter()};if(f)i=function(){a.nextTick(l)};else if(u){var h=1,p=document.createTextNode("");new u(l).observe(p,{characterData:!0}),i=function(){p.data=h=-h}}else i=function(){c.call(s,l)};t.exports=function(t){var e={fn:t,next:void 0,domain:f&&a.domain};o&&(o.next=e),r||(r=e,i()),o=e}},function(t,e,n){"use strict";var r,o,i,s=n(15),c=n(71),u=n(72),a=n(73),f=n(10),l=f.process,h=f.setImmediate,p=f.clearImmediate,d=f.MessageChannel,v=0,y={},g="onreadystatechange",_=function(){var t=+this;if(y.hasOwnProperty(t)){var e=y[t];delete y[t],e()}},m=function(t){_.call(t.data)};h&&p||(h=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return y[++v]=function(){c("function"==typeof t?t:Function(t),e)},r(v),v},p=function(t){delete y[t]},"process"==n(24)(l)?r=function(t){l.nextTick(s(_,t,1))}:d?(o=new d,i=o.port2,o.port1.onmessage=m,r=s(i.postMessage,i,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScript?(r=function(t){f.postMessage(t+"","*")},f.addEventListener("message",m,!1)):r=g in a("script")?function(t){u.appendChild(a("script"))[g]=function(){u.removeChild(this),_.call(t)}}:function(t){setTimeout(s(_,t,1),0)}),t.exports={set:h,clear:p}},function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){t.exports=n(10).document&&document.documentElement},function(t,e,n){var r=n(13),o=n(10).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(40)("iterator"),o=!1;try{var i=[7][r]();i["return"]=function(){o=!0},Array.from(i,function(){throw 2})}catch(s){}t.exports=function(t){if(!o)return!1;var e=!1;try{var n=[7],i=n[r]();i.next=function(){e=!0},n[r]=function(){return i},t(n)}catch(s){}return e}},function(t,e,n){t.exports={"default":n(76),__esModule:!0}},function(t,e,n){n(46),n(31),t.exports=n(77)},function(t,e,n){var r=n(14),o=n(59);t.exports=n(11).getIterator=function(t){var e=o(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return r(e.call(t))}},function(t,e,n){t.exports={"default":n(79),__esModule:!0}},function(t,e,n){n(30),n(31),n(46),n(80),n(81),t.exports=n(11).Set},function(t,e,n){"use strict";var r=n(52);n(62)("Set",function(t){return function(){return t(this,arguments[0])}},{add:function(t){return r.def(this,t=0===t?0:t,t)}},r)},function(t,e,n){var r=n(9);r(r.P,"Set",{toJSON:n(64)("Set")})},function(t,e){"use strict";e["default"]=function(t){return t&&t.__esModule?t:{"default":t}},e.__esModule=!0},function(e,n){e.exports=t},function(t,e){"use strict";function n(t,e){if(!t)throw new Error("[koto] "+e)}e.__esModule=!0,e["default"]=n,t.exports=e["default"]},function(t,e,n){"use strict";var r=n(1)["default"],o=n(65)["default"],i=n(82)["default"];e.__esModule=!0;var s=n(84),c=i(s),u=function(){function t(e,n){if(r(this,t),this._base=e,this._handlers={},this._lifecycleRe=/^(enter|update|merge|exit)(:transition)?$/,n&&(this.dataBind=n.dataBind,this.insert=n.insert,"events"in n))for(var o in n.events)this.on(o,n.events[o])}return t.prototype.dataBind=function(){c["default"](!1,"Layers must specify a dataBind method.")},t.prototype.insert=function(){c["default"](!1,"Layers must specify an `insert` method.")},t.prototype.on=function(t,e,n){return n=n||{},c["default"](this._lifecycleRe.test(t),"Unrecognized lifecycle event name specified to 'Layer#on': '"+t+"'."),t in this._handlers||(this._handlers[t]=[]),this._handlers[t].push({callback:e,chart:n.chart||null}),this},t.prototype.off=function(t,e){var n,r=this._handlers[t];if(c["default"](this._lifecycleRe.test(t),"Unrecognized lifecycle event name specified to 'Layer#on': '"+t+"'."),!r)return this;if(1===arguments.length)return r.length=0,this;for(n=r.length-1;n>-1;--n)r[n].callback===e&&r.splice(n,1);return this},t.prototype.draw=function(t){function e(t,e){var n=0;0===t.size()?e():t.each(function(){++n}).each("interrupt.promise",function(){e.apply(this,arguments)}).each("end.promise",function(){--n||e.apply(this,arguments)})}function n(t){u.call(e,function(){t(!0)})}var r,i,s,u,a,f,l,h,p,d,v,y=[];r=this.dataBind.call(this._base,t),c["default"](r instanceof d3.selection,"Invalid selection defined by `Layer#dataBind` method."),c["default"](r.enter,"Layer selection not properly bound."),i=r.enter(),i._chart=this._base._chart,s=[{name:"update",selection:r},{name:"enter",selection:i,method:this.insert},{name:"merge",selection:r},{name:"exit",selection:r,method:r.exit}];for(var g=0,_=s.length;_>g;++g)if(l=s[g].name,u=s[g].selection,a=s[g].method,"function"==typeof a&&(u=a.call(u,u)),!u.empty()){if(c["default"](u&&u instanceof d3.selection,"Invalid selection defined for "+l+" lifecycle event."),f=this._handlers[l])for(h=0,p=f.length;p>h;++h)u._chart=f[h].chart||this._base._chart,f[h].callback.call(u,u);if(f=this._handlers[l+":transition"],f&&f.length)for(u=u.transition(),v=f.length,d=0;v>d;++d)u._chart=f[d].chart||this._base._chart,f[d].callback.call(u,u),y.push(new o(n));this.promise=o.all(y)}},t}();e["default"]=u,t.exports=e["default"]}])});

},{"d3":"d3"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/lodash-compat/array/last.js":[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/lodash-compat/collection/find.js":[function(require,module,exports){
var baseEach = require('../internal/baseEach'),
    createFind = require('../internal/createFind');

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments: (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias detect
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.result(_.find(users, function(chr) {
 *   return chr.age < 40;
 * }), 'user');
 * // => 'barney'
 *
 * // using the `_.matches` callback shorthand
 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
 * // => 'pebbles'
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.result(_.find(users, 'active', false), 'user');
 * // => 'fred'
 *
 * // using the `_.property` callback shorthand
 * _.result(_.find(users, 'active'), 'user');
 * // => 'barney'
 */
var find = createFind(baseEach);

module.exports = find;

},{"../internal/baseEach":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/lodash-compat/internal/baseEach.js","../internal/createFind":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/lodash-compat/internal/createFind.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/lodash-compat/function/restParam.js":[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/lodash-compat/internal/SetCache.js":[function(require,module,exports){
(function (global){
var cachePush = require('./cachePush'),
    getNative = require('./getNative');

/** Native method references. */
var Set = getNative(global, 'Set');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = getNative(Object, 'create');

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./cachePush":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/lodash-compat/internal/cachePush.js","./getNative":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/lodash-compat/internal/getNative.js"}]