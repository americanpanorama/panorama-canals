(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/basemaps/cartodb/basemaps.json":[function(require,module,exports){
module.exports={"name":"PanoramaBasemap","version":"0.0.1","layergroup":{"version":"1.3.0","layers":[{"type":"mapnik","options":{"sql":"SELECT * FROM unified_basemap_layers ORDER BY ord\n","cartocss":"@water: #dde9e9;\n@waterlines: #aacccc;\n@land: #f9f9f9;\n\nMap {\n  buffer-size: 128;\n  background-color: @water;\n}\n\n#unified_basemap_layers[layer='ne_10m_coastline_2163']{\n  line-color: @waterlines;\n  line-width: 0.75;\n  line-opacity: 1;\n  line-join: round;\n  line-cap: round;\n}\n\n#unified_basemap_layers[layer='ne_10m_lakes_2163'] {\n  line-color: @waterlines;\n  line-width: 2.5;\n  line-opacity: 1;\n  line-join: round;\n  line-cap: round;\n\n  /* Soften lines at lower zooms */\n  [zoom<=7] {\n    line-width: 2.5;\n    line-color: lighten(desaturate(#aacccc,2%),2%);\n  }\n  [zoom<=5] {\n    line-width: 1.5;\n    line-color: lighten(desaturate(#aacccc,5%),5%);\n  }\n\n  /* Separate attachment because seams */\n  ::fill {\n    polygon-fill: @water;\n    polygon-opacity: 1;\n  }\n\n  /* Remove small lakes at lower zooms */\n  [scalerank>3][zoom<=5] {\n    ::fill {\n      polygon-opacity: 0;\n    }\n    line-opacity: 0;\n  }\n  [scalerank>6][zoom<=7] {\n    ::fill {\n      polygon-opacity: 0;\n    }\n    line-opacity: 0;\n  }\n}\n\n#unified_basemap_layers[layer='ne_10m_rivers_lake_centerlines_2163'] {\n  line-color: @waterlines;\n  line-width: 1.5;\n  line-opacity: 1;\n  line-join: round;\n  line-cap: round;\n\n  [name='Mississippi'],\n  [name='St. Lawrence'],\n  [name='Columbia'],\n  [name='Ohio'],\n  [name='Hudson'],\n  [name='Missouri'],\n  [name='Rio Grande'] {\n    line-width: 4;\n  }\n  [zoom<=8][name='Mississippi'],\n  [zoom<=8][name='St. Lawrence'],\n  [zoom<=8][name='Columbia'],\n  [zoom<=8][name='Ohio'],\n  [zoom<=8][name='Hudson'],\n  [zoom<=8][name='Missouri'],\n  [zoom<=8][name='Rio Grande'] {\n    line-width: 2;\n  }\n  [zoom<=8][name!='Mississippi'][name!='St. Lawrence'][name!='Rio Grande'][name!='Ohio'][name!='Hudson'][name!='Columbia'][name!='Missouri'],\n  [zoom<=6][name='Mississippi'],\n  [zoom<=6][name='Columbia'],\n  [zoom<=6][name='Ohio'],\n  [zoom<=6][name='Hudson'],\n  [zoom<=6][name='Missouri'],\n  [zoom<=6][name='Rio Grande'] {\n    line-width: 1;\n    line-color: lighten(desaturate(@waterlines,2%),2%);\n\n  }\n  [zoom>=7][name!='Mississippi'][name!='St. Lawrence'][name!='Rio Grande'][name!='Ohio'][name!='Hudson'][name!='Columbia'][name!='Missouri']::labels,\n  [zoom>=5][name='Mississippi']::labels,\n  [zoom>=5][name='Columbia']::labels,\n  [zoom>=5][name='Ohio']::labels,\n  [zoom>=5][name='Hudson']::labels,\n  [zoom>=5][name='Missouri']::labels,\n  [zoom>=5][name='Rio Grande']::labels {\n    text-name: [name];\n    text-face-name: 'DejaVu Sans Oblique';\n    text-fill: @waterlines;\n    text-placement: line;\n    text-halo-fill: @land;\n    text-halo-radius: 1.5;\n    text-size: 10;\n    text-dy: -8;\n    text-character-spacing: 2;\n    text-spacing: 100;\n    text-min-distance: 100;\n  }\n\n  [zoom<=6][name!='Mississippi'][name!='St. Lawrence'][name!='Rio Grande'][name!='Ohio'][name!='Hudson'][name!='Columbia'][name!='Missouri'] {\n    line-width: 0.5;\n    line-color: lighten(desaturate(@waterlines,5%),5%);\n  }\n  [zoom<=5][name!='Mississippi'][name!='St. Lawrence'][name!='Rio Grande'][name!='Ohio'][name!='Hudson'][name!='Columbia'][name!='Missouri'] {\n    line-width: 0;\n  }\n  [zoom<=5][name='Mississippi'],\n  [zoom<=5][name='St. Lawrence'],\n  [zoom<=5][name='Columbia'],\n  [zoom<=5][name='Ohio'],\n  [zoom<=5][name='Hudson'],\n  [zoom<=5][name='Missouri'],\n  [zoom<=5][name='Rio Grande'] {\n    line-width: 0.5;\n    line-color: lighten(desaturate(@waterlines,2%),2%);\n  }\n}\n\n#unified_basemap_layers[layer='ne_10m_admin_0_countries_lakes_2163'] {\n\n  line-color: @land;\n  line-width: 1;\n  line-opacity: 1;\n  line-join: round;\n  line-cap: round;\n  polygon-fill: @land;\n  polygon-opacity: 1;\n\n}\n","cartocss_version":"2.1.1"}},{"type":"mapnik","options":{"sql":"SELECT cartodb_id, name, opened, ST_Transform(the_geom_webmercator,2163) as the_geom_webmercator FROM canals\n","cartocss":"#canals{\n  [zoom<=7] {\n    line-simplify: 5;\n  }\n  line-color: #4c395e;\n  line-width: 1.5;\n  line-cap: round;\n  line-join: round;\n  /*\n  [opened > 1840] {\n    line-color: #f09;\n  }\n  */\n\n/*\n  [name = 'Erie Canal']::highlight {\n    line-color: yellow;\n    line-width: 10;\n    opacity: 0.2;\n    line-cap: round;\n    line-join: round;\n  }\n*/\n\n  [name = 'Erie Canal'] {\n    line-width: 5;\n  }\n\n  [zoom<=7] { line-simplify: 5; }\n  [zoom<=6] { line-simplify: 10;}\n  [zoom<=5] { line-simplify: 15;}\n}\n","cartocss_version":"2.1.1"}},{"type":"mapnik","options":{"sql":"SELECT cartodb_id, lat::float, long::float, ST_Transform(the_geom,2163) as the_geom_webmercator, start, state, town, rank FROM canal_towns\n","cartocss":"@textcolor: #666;\n@halocolor: #f9f9f9;\n\nMap {\n  buffer-size: 128;\n}\n\n#canals_cities_basemap[rank=1][zoom>=5],\n#canals_cities_basemap[rank=2][zoom>=6],\n#canals_cities_basemap[rank>=3][zoom>=8]{\n  // Note: have to use markers not shields to change svg color\n  ::halo {\n    marker-placement: point;\n    marker-fill-opacity: 1;\n    marker-line-width: 0;\n    marker-type: ellipse;\n    marker-width: 9;\n    marker-fill: @halocolor;\n  }\n  marker-fill-opacity: 0.9;\n  marker-line-color: @halocolor;\n  marker-line-width: 1.5;\n  marker-line-opacity: 1;\n  marker-placement: point;\n  //marker-type: ellipse;\n  marker-file: url('https://raw.githubusercontent.com/mapbox/maki/mb-pages/src/circle-12.svg');\n  marker-width: 6;\n  marker-fill: @textcolor;\n\n  marker-allow-overlap: true;\n}\n\n@default_size: 9;\n@x_distance_positive: 3;\n@y_distance_positive: 3;\n@x_distance_negative: -3;\n@y_distance_negative: -3;\n\n#canals_cities_basemap[rank=1][zoom>=5]::labels,\n#canals_cities_basemap[rank=2][zoom>=6]::labels,\n#canals_cities_basemap[rank>=3][zoom>=8]::labels, {\n\n  text-name: [town];\n  text-face-name: 'DejaVu Sans Book';\n  text-size: @default_size;\n  [zoom>=6][rank=1] {\n    text-size: @default_size + 3;\n  }\n  text-label-position-tolerance: 0;\n  text-fill: @textcolor;\n  text-halo-fill: @halocolor;\n  text-halo-radius: 1.5;\n  // Default is upper right from dot\n  text-dy: @y_distance_negative;\n  text-dx: @x_distance_positive;\n\n  // Labels to float left instead\n  [state='Illinois'],\n  [state='Indiana'],\n  [state='Ohio'][town!='Cincinnati'],\n  [town='Bellefonte'],\n  [town='Pittsburgh'],\n  [town='Rochester'],\n  [town='Newark'],\n  [town='Oswego'],\n  [town='Buffalo'],\n  [town='Corning'],\n  [town='Bristol'],\n  [town='Reading'],\n  [town='Buchanan'] {\n    text-dx: @x_distance_negative;\n  }\n\n  // Labels to float below dot\n\n  [town='New Brunswick'],\n  [town='La Salle'],\n  [town='Lawrenceburg'],\n  [town='Akron'],\n  [town='Albany'],\n  [town='Athens'],\n  [town='Utica'],\n  [town='Reading'],\n  [town='Bordentown'],\n  [town='Philadelphia'],\n  [town='Lynchburg'],\n  [town='Toledo'],\n  [town='Pittsburgh'],\n  [town='Cincinnati'] {\n    text-dy: @y_distance_positive;\n  }\n\n  text-allow-overlap: true;\n  text-placement: point;\n  text-placement-type: dummy;\n\n}","cartocss_version":"2.1.1"}}],"minzoom":2,"maxzoom":9}}

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

},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/events/events.js":[function(require,module,exports){
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

},{}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/koto/dist/koto.js":[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("d3")):"function"==typeof define&&define.amd?define(["d3"],e):"object"==typeof exports?exports.Koto=e(require("d3")):t.Koto=e(t.d3)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";var r=n(1)["default"],o=n(2)["default"],i=n(17)["default"],s=n(28)["default"],c=n(65)["default"],u=n(75)["default"],a=n(78)["default"],f=n(82)["default"];e.__esModule=!0;var l=n(83),h=f(l),p=n(84),d=f(p),v=n(85),y=f(v);d["default"](h["default"],"d3 js is required.");var g=function(){function t(e){var n=this;r(this,t),this.base=e,this.hasDrawn=!1,this.merge={},this.merge.configs=function(){for(var t=arguments.length,e=Array(t),r=0;t>r;r++)e[r]=arguments[r];return n.configs=i.apply(Object,[{},n.configs].concat(e)),n.configs},this.merge.accessors=function(){for(var t=arguments.length,e=Array(t),r=0;t>r;r++)e[r]=arguments[r];return n.accessors=i.apply(Object,[{},n.accessors].concat(e)),n.accessors},this.configs={},this.accessors={},this.promise=null,this._layers=new s,this._attached=new s,this._events=new s,this.c=this.config,this.a=this.accessor}return t.prototype.transform=function(t){return t},t.prototype.demux=function(t,e){return e},t.prototype.preDraw=function(){},t.prototype.postDraw=function(){},t.prototype.postTransition=function(){},t.prototype.unlayer=function(t){var e=this.layer(t);return this._layers["delete"](t),delete e._chart,e},t.prototype.layer=function(t,e,n){var r,o=this;if(1===arguments.length)return this._layers.get(t);if(2===arguments.length){if(e instanceof y["default"])return e._chart=this,this._layers.set(t,e),this._layers.get(t);d["default"](!1,"When reattaching a layer, the second argument must be a koto layer")}return e._chart=this,r=new y["default"](e,n),r.remove=function(){return o._layers["delete"](t),this},this._layers.set(t,r),r},t.prototype.attach=function(t,e){return 1===arguments.length?this._attached.get(t):(this._attached.set(t,e),e)},t.prototype.draw=function(t){var e,n,r=this,o=[];return c.resolve(this.transform(t)).then(function(t){r.preDraw(t),r.trigger("preDraw",t);for(var i=r._layers.values(),s=Array.isArray(i),a=0,i=s?i:u(i);;){if(s){if(a>=i.length)break;e=i[a++]}else{if(a=i.next(),a.done)break;e=a.value}e.draw(t),o.push(e.promise)}for(var f=r._attached.entries(),l=Array.isArray(f),h=0,f=l?f:u(f);;){var p;if(l){if(h>=f.length)break;p=f[h++]}else{if(h=f.next(),h.done)break;p=h.value}var d=p[0],v=p[1];n=r.demux?r.demux(d,t):t,v.draw(n),o.push(v.promise)}return r.hasDrawn=!0,r.promise=c.all(o),r.postDraw(),r.trigger("postDraw",t),r.promise.then(function(){r.postTransition(t),r.trigger("postTransition",t)}),t})},t.prototype.on=function(t,e,n){var r;return r=this._events.has(t)?this._events.get(t):new a,r.add({callback:e,context:n||this,_chart:this}),this._events.set(t,r),this},t.prototype.once=function(t,e,n){var r=this,o=function i(){r.off(t,i),e.apply(this,arguments)};return this.on(t,o,n)},t.prototype.off=function(t,e,n){return 0===arguments.length?(this._events.clear(),this):1===arguments.length?(this._events.has(t)&&this._events.get(t).clear(),this):(this._events.get(t).forEach(function(t,r,o){(e&&e===r.callback||n&&n===r.context)&&o["delete"](t)}),this)},t.prototype.trigger=function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;e>r;r++)n[r-1]=arguments[r];return this._events.has(t)&&this._events.get(t).forEach(function(t){var e;(e=t.callback).call.apply(e,[t.context].concat(n))}),this},t.prototype.config=function(t,e){function n(){function t(t,e){var n=Math.min.call(null,t.map(function(t){return i.config(t)}));return e/n}o.constrain===!0?o.percentage=t(["width","height"],o.value):Array.isArray(o.constrain)?o.percentage=t(o.constrain,o.value):o.percentage=t([o.constrain],o.value)}var r,o,i=this;if(0===arguments.length)return this.configs;if(1===arguments.length){if("object"==typeof t){for(r in t)this.configs.hasOwnProperty(r)?(o=this.configs[r],o.hasOwnProperty("setter")?o.value=o.setter.call(o,t[r]):o.value=t[r],o.hasOwnProperty("constrain")&&n(),this.configs[r]=o):console.warn("config with name "+t+" is not defined.");return this}return d["default"](this.configs.hasOwnProperty(t),t+" is not a valid option."),o=this.configs[t],o.hasOwnProperty("getter")?o.getter.call(o):o.value}return 2===arguments.length?(this.configs.hasOwnProperty(t)?(o=this.configs[t],o.hasOwnProperty("setter")?o.value=o.setter.call(o,e):o.value=e,o.hasOwnProperty("constrain")&&n(),this.configs[t]=o):console.warn("config with name "+t+" is not defined."),this):void 0},t.prototype.accessor=function(t,e){var n;if(0===arguments.length)return this.accessors;if(1===arguments.length){if("string"==typeof t)return d["default"](this.accessors.hasOwnProperty(t),t+" is not a valid accessor."),this.accessors[t];for(n in t)this.accessors[n]=t[n]}else this.accessors[t]=e;return this},t.extend=function(t){var e=function(e){function n(o){r(this,n);var i;if(e.call(this,o),"function"==typeof t)t.call(this);else{for(i in t)this[i]=t[i];this.initialize.call(this)}}return o(n,e),n}(this);return e},t}();e["default"]=g,t.exports=e["default"]},function(t,e){"use strict";e["default"]=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},e.__esModule=!0},function(t,e,n){"use strict";var r=n(3)["default"],o=n(6)["default"];e["default"]=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=r(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(o?o(t,e):t.__proto__=e)},e.__esModule=!0},function(t,e,n){t.exports={"default":n(4),__esModule:!0}},function(t,e,n){var r=n(5);t.exports=function(t,e){return r.create(t,e)}},function(t,e){var n=Object;t.exports={create:n.create,getProto:n.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:n.getOwnPropertyDescriptor,setDesc:n.defineProperty,setDescs:n.defineProperties,getKeys:n.keys,getNames:n.getOwnPropertyNames,getSymbols:n.getOwnPropertySymbols,each:[].forEach}},function(t,e,n){t.exports={"default":n(7),__esModule:!0}},function(t,e,n){n(8),t.exports=n(11).Object.setPrototypeOf},function(t,e,n){var r=n(9);r(r.S,"Object",{setPrototypeOf:n(12).set})},function(t,e,n){var r=n(10),o=n(11),i="prototype",s=function(t,e){return function(){return t.apply(e,arguments)}},c=function(t,e,n){var u,a,f,l,h=t&c.G,p=t&c.P,d=h?r:t&c.S?r[e]:(r[e]||{})[i],v=h?o:o[e]||(o[e]={});h&&(n=e);for(u in n)a=!(t&c.F)&&d&&u in d,a&&u in v||(f=a?d[u]:n[u],h&&"function"!=typeof d[u]?l=n[u]:t&c.B&&a?l=s(f,r):t&c.W&&d[u]==f?!function(t){l=function(e){return this instanceof t?new t(e):t(e)},l[i]=t[i]}(f):l=p&&"function"==typeof f?s(Function.call,f):f,v[u]=l,p&&((v[i]||(v[i]={}))[u]=f))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,t.exports=c},function(t,e){var n="undefined",r=t.exports=typeof window!=n&&window.Math==Math?window:typeof self!=n&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,e){var n=t.exports={version:"1.2.0"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(5).getDesc,o=n(13),i=n(14),s=function(t,e){if(i(t),!o(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,o){try{o=n(15)(Function.call,r(Object.prototype,"__proto__").set,2),o(t,[]),e=!(t instanceof Array)}catch(i){e=!0}return function(t,n){return s(t,n),e?t.__proto__=n:o(t,n),t}}({},!1):void 0),check:s}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){var r=n(13);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(16);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){t.exports={"default":n(18),__esModule:!0}},function(t,e,n){n(19),t.exports=n(11).Object.assign},function(t,e,n){var r=n(9);r(r.S+r.F,"Object",{assign:n(20)})},function(t,e,n){var r=n(21),o=n(23),i=n(25),s=n(26);t.exports=n(27)(function(){var t=Object.assign,e={},n={},r=Symbol(),o="abcdefghijklmnopqrst";return e[r]=7,o.split("").forEach(function(t){n[t]=t}),7!=t({},e)[r]||Object.keys(t({},n)).join("")!=o})?function(t,e){for(var n=r(t),c=arguments.length,u=1;c>u;)for(var a,f=o(arguments[u++]),l=i(f),h=l.length,p=0;h>p;)s(f,a=l[p++])&&(n[a]=f[a]);return n}:Object.assign},function(t,e,n){var r=n(22);t.exports=function(t){return Object(r(t))}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(24);t.exports=0 in Object("z")?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(5);t.exports=function(t){var e=r.getKeys(t),n=r.getSymbols;if(n)for(var o,i=n(t),s=r.isEnum,c=0;i.length>c;)s.call(t,o=i[c++])&&e.push(o);return e}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e,n){t.exports={"default":n(29),__esModule:!0}},function(t,e,n){n(30),n(31),n(46),n(51),n(63),t.exports=n(11).Map},function(t,e){},function(t,e,n){"use strict";var r=n(32)(!0);n(34)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(33),o=n(22);t.exports=function(t){return function(e,n){var i,s,c=String(o(e)),u=r(n),a=c.length;return 0>u||u>=a?t?"":void 0:(i=c.charCodeAt(u),55296>i||i>56319||u+1===a||(s=c.charCodeAt(u+1))<56320||s>57343?t?c.charAt(u):i:t?c.slice(u,u+2):(i-55296<<10)+(s-56320)+65536)}}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){"use strict";var r=n(35),o=n(9),i=n(36),s=n(37),c=n(26),u=n(40)("iterator"),a=n(43),f=!([].keys&&"next"in[].keys()),l="@@iterator",h="keys",p="values",d=function(){return this};t.exports=function(t,e,v,y,g,_,m){n(44)(v,e,y);var x,w,b=function(t){switch(t){case h:return function(){return new v(this,t)};case p:return function(){return new v(this,t)}}return function(){return new v(this,t)}},O=e+" Iterator",j=t.prototype,k=j[u]||j[l]||g&&j[g],P=k||b(g);if(k){var M=n(5).getProto(P.call(new t));n(45)(M,O,!0),!r&&c(j,l)&&s(M,u,d)}if((!r||m)&&s(j,u,P),a[e]=P,a[O]=d,g)if(x={keys:_?P:b(h),values:g==p?P:b(p),entries:g!=p?P:b("entries")},m)for(w in x)w in j||i(j,w,x[w]);else o(o.P+o.F*f,e,x)}},function(t,e){t.exports=!0},function(t,e,n){t.exports=n(37)},function(t,e,n){var r=n(5),o=n(38);t.exports=n(39)?function(t,e,n){return r.setDesc(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){t.exports=!n(27)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(41)("wks"),o=n(10).Symbol;t.exports=function(t){return r[t]||(r[t]=o&&o[t]||(o||n(42))("Symbol."+t))}},function(t,e,n){var r=n(10),o="__core-js_shared__",i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports={}},function(t,e,n){"use strict";var r=n(5),o={};n(37)(o,n(40)("iterator"),function(){return this}),t.exports=function(t,e,i){t.prototype=r.create(o,{next:n(38)(1,i)}),n(45)(t,e+" Iterator")}},function(t,e,n){var r=n(26),o=n(37),i=n(40)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,i)&&o(t,i,e)}},function(t,e,n){n(47);var r=n(43);r.NodeList=r.HTMLCollection=r.Array},function(t,e,n){"use strict";var r=n(48),o=n(49),i=n(43),s=n(50);n(34)(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):"keys"==e?o(0,n):"values"==e?o(0,t[n]):o(0,[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r=n(23),o=n(22);t.exports=function(t){return r(o(t))}},function(t,e,n){"use strict";var r=n(52);n(62)("Map",function(t){return function(){return t(this,arguments[0])}},{get:function(t){var e=r.getEntry(this,t);return e&&e.v},set:function(t,e){return r.def(this,0===t?0:t,e)}},r,!0)},function(t,e,n){"use strict";var r=n(5),o=n(37),i=n(15),s=n(53),c=n(54),u=n(22),a=n(55),f=n(49),l=n(42)("id"),h=n(26),p=n(13),d=Object.isExtensible||p,v=n(39),y=v?"_s":"size",g=0,_=function(t,e){if(!p(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!h(t,l)){if(!d(t))return"F";if(!e)return"E";o(t,l,++g)}return"O"+t[l]},m=function(t,e){var n,r=_(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,o,s){var f=t(function(t,n){c(t,f,e),t._i=r.create(null),t._f=void 0,t._l=void 0,t[y]=0,void 0!=n&&a(n,o,t[s],t)});return n(61)(f.prototype,{clear:function(){for(var t=this,e=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete e[n.i];t._f=t._l=void 0,t[y]=0},"delete":function(t){var e=this,n=m(e,t);if(n){var r=n.n,o=n.p;delete e._i[n.i],n.r=!0,o&&(o.n=r),r&&(r.p=o),e._f==n&&(e._f=r),e._l==n&&(e._l=o),e[y]--}return!!n},forEach:function(t){for(var e,n=i(t,arguments[1],3);e=e?e.n:this._f;)for(n(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!m(this,t)}}),v&&r.setDesc(f.prototype,"size",{get:function(){return u(this[y])}}),f},def:function(t,e,n){var r,o,i=m(t,e);return i?i.v=n:(t._l=i={i:o=_(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=i),r&&(r.n=i),t[y]++,"F"!==o&&(t._i[o]=i)),t},getEntry:m,setStrong:function(t,e,r){n(34)(t,e,function(t,e){this._t=t,this._k=e,this._l=void 0},function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?"keys"==e?f(0,n.k):"values"==e?f(0,n.v):f(0,[n.k,n.v]):(t._t=void 0,f(1))},r?"entries":"values",!r,!0),s(t),s(n(11)[e])}}},function(t,e,n){"use strict";var r=n(5),o=n(40)("species");t.exports=function(t){!n(39)||o in t||r.setDesc(t,o,{configurable:!0,get:function(){return this}})}},function(t,e){t.exports=function(t,e,n){if(!(t instanceof e))throw TypeError(n+": use the 'new' operator!");return t}},function(t,e,n){var r=n(15),o=n(56),i=n(57),s=n(14),c=n(58),u=n(59);t.exports=function(t,e,n,a){var f,l,h,p=u(t),d=r(n,a,e?2:1),v=0;if("function"!=typeof p)throw TypeError(t+" is not iterable!");if(i(p))for(f=c(t.length);f>v;v++)e?d(s(l=t[v])[0],l[1]):d(t[v]);else for(h=p.call(t);!(l=h.next()).done;)o(h,d,l.value,e)}},function(t,e,n){var r=n(14);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(i){var s=t["return"];throw void 0!==s&&r(s.call(t)),i}}},function(t,e,n){var r=n(43),o=n(40)("iterator");t.exports=function(t){return(r.Array||Array.prototype[o])===t}},function(t,e,n){var r=n(33),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(60),o=n(40)("iterator"),i=n(43);t.exports=n(11).getIteratorMethod=function(t){return void 0!=t?t[o]||t["@@iterator"]||i[r(t)]:void 0}},function(t,e,n){var r=n(24),o=n(40)("toStringTag"),i="Arguments"==r(function(){return arguments}());t.exports=function(t){var e,n,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=(e=Object(t))[o])?n:i?r(e):"Object"==(s=r(e))&&"function"==typeof e.callee?"Arguments":s}},function(t,e,n){var r=n(36);t.exports=function(t,e){for(var n in e)r(t,n,e[n]);return t}},function(t,e,n){"use strict";var r=n(5),o=n(9),i=n(37),s=n(55),c=n(54);t.exports=function(t,e,u,a,f,l){var h=n(10)[t],p=h,d=f?"set":"add",v=p&&p.prototype,y={};return n(39)&&"function"==typeof p&&(l||v.forEach&&!n(27)(function(){(new p).entries().next()}))?(p=e(function(e,n){c(e,p,t),e._c=new h,void 0!=n&&s(n,f,e[d],e)}),r.each.call("add,clear,delete,forEach,get,has,set,keys,values,entries".split(","),function(t){var e="add"==t||"set"==t;t in v&&(!l||"clear"!=t)&&i(p.prototype,t,function(n,r){var o=this._c[t](0===n?0:n,r);return e?this:o})}),"size"in v&&r.setDesc(p.prototype,"size",{get:function(){return this._c.size}})):(p=a.getConstructor(e,t,f,d),n(61)(p.prototype,u)),n(45)(p,t),y[t]=p,o(o.G+o.W+o.F,y),l||a.setStrong(p,t,f),p}},function(t,e,n){var r=n(9);r(r.P,"Map",{toJSON:n(64)("Map")})},function(t,e,n){var r=n(55),o=n(60);t.exports=function(t){return function(){if(o(this)!=t)throw TypeError(t+"#toJSON isn't generic");var e=[];return r(this,!1,e.push,e),e}}},function(t,e,n){t.exports={"default":n(66),__esModule:!0}},function(t,e,n){n(30),n(31),n(46),n(67),t.exports=n(11).Promise},function(t,e,n){"use strict";var r,o=n(5),i=n(35),s=n(10),c=n(15),u=n(60),a=n(9),f=n(13),l=n(14),h=n(16),p=n(54),d=n(55),v=n(12).set,y=n(68),g=n(53),_=n(40)("species"),m=n(42)("record"),x=n(69),w="Promise",b=s.process,O="process"==u(b),j=s[w],k=function(t){var e=new j(function(){});return t&&(e.constructor=Object),j.resolve(e)===e},P=function(){function t(e){var n=new j(e);return v(n,t.prototype),n}var e=!1;try{if(e=j&&j.resolve&&k(),v(t,j),t.prototype=o.create(j.prototype,{constructor:{value:t}}),t.resolve(5).then(function(){})instanceof t||(e=!1),e&&n(39)){var r=!1;j.resolve(o.setDesc({},"then",{get:function(){r=!0}})),e=r}}catch(i){e=!1}return e}(),M=function(t){return f(t)&&(P?"Promise"==u(t):m in t)},S=function(t,e){return i&&t===j&&e===r?!0:y(t,e)},E=function(t){var e=l(t)[_];return void 0!=e?e:t},A=function(t){var e;return f(t)&&"function"==typeof(e=t.then)?e:!1},T=function(t,e){if(!t.n){t.n=!0;var n=t.c;x(function(){for(var r=t.v,o=1==t.s,i=0,c=function(e){var n,i,s=o?e.ok:e.fail;try{s?(o||(t.h=!0),n=s===!0?r:s(r),n===e.P?e.rej(TypeError("Promise-chain cycle")):(i=A(n))?i.call(n,e.res,e.rej):e.res(n)):e.rej(r)}catch(c){e.rej(c)}};n.length>i;)c(n[i++]);n.length=0,t.n=!1,e&&setTimeout(function(){var e,n,o=t.p;D(o)&&(O?b.emit("unhandledRejection",r,o):(e=s.onunhandledrejection)?e({promise:o,reason:r}):(n=s.console)&&n.error&&n.error("Unhandled promise rejection",r)),t.a=void 0},1)})}},D=function(t){var e,n=t[m],r=n.a||n.c,o=0;if(n.h)return!1;for(;r.length>o;)if(e=r[o++],e.fail||!D(e.P))return!1;return!0},F=function(t){var e=this;e.d||(e.d=!0,e=e.r||e,e.v=t,e.s=2,e.a=e.c.slice(),T(e,!0))},z=function(t){var e,n=this;if(!n.d){n.d=!0,n=n.r||n;try{(e=A(t))?x(function(){var r={r:n,d:!1};try{e.call(t,c(z,r,1),c(F,r,1))}catch(o){F.call(r,o)}}):(n.v=t,n.s=1,T(n,!1))}catch(r){F.call({r:n,d:!1},r)}}};P||(j=function(t){h(t);var e={p:p(this,j,w),c:[],a:void 0,s:0,d:!1,v:void 0,h:!1,n:!1};this[m]=e;try{t(c(z,e,1),c(F,e,1))}catch(n){F.call(e,n)}},n(61)(j.prototype,{then:function(t,e){var n=l(l(this).constructor)[_],r={ok:"function"==typeof t?t:!0,fail:"function"==typeof e?e:!1},o=r.P=new(void 0!=n?n:j)(function(t,e){r.res=t,r.rej=e});h(r.res),h(r.rej);var i=this[m];return i.c.push(r),i.a&&i.a.push(r),i.s&&T(i,!1),o},"catch":function(t){return this.then(void 0,t)}})),a(a.G+a.W+a.F*!P,{Promise:j}),n(45)(j,w),g(j),g(r=n(11)[w]),a(a.S+a.F*!P,w,{reject:function(t){return new this(function(e,n){n(t)})}}),a(a.S+a.F*(!P||k(!0)),w,{resolve:function(t){return M(t)&&S(t.constructor,this)?t:new this(function(e){e(t)})}}),a(a.S+a.F*!(P&&n(74)(function(t){j.all(t)["catch"](function(){})})),w,{all:function(t){var e=E(this),n=[];return new e(function(r,i){d(t,!1,n.push,n);var s=n.length,c=Array(s);s?o.each.call(n,function(t,n){e.resolve(t).then(function(t){c[n]=t,--s||r(c)},i)}):r(c)})},race:function(t){var e=E(this);return new e(function(n,r){d(t,!1,function(t){e.resolve(t).then(n,r)})})}})},function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},function(t,e,n){var r,o,i,s=n(10),c=n(70).set,u=s.MutationObserver||s.WebKitMutationObserver,a=s.process,f="process"==n(24)(a),l=function(){var t,e;for(f&&(t=a.domain)&&(a.domain=null,t.exit());r;)e=r.domain,e&&e.enter(),r.fn.call(),e&&e.exit(),r=r.next;o=void 0,t&&t.enter()};if(f)i=function(){a.nextTick(l)};else if(u){var h=1,p=document.createTextNode("");new u(l).observe(p,{characterData:!0}),i=function(){p.data=h=-h}}else i=function(){c.call(s,l)};t.exports=function(t){var e={fn:t,next:void 0,domain:f&&a.domain};o&&(o.next=e),r||(r=e,i()),o=e}},function(t,e,n){"use strict";var r,o,i,s=n(15),c=n(71),u=n(72),a=n(73),f=n(10),l=f.process,h=f.setImmediate,p=f.clearImmediate,d=f.MessageChannel,v=0,y={},g="onreadystatechange",_=function(){var t=+this;if(y.hasOwnProperty(t)){var e=y[t];delete y[t],e()}},m=function(t){_.call(t.data)};h&&p||(h=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return y[++v]=function(){c("function"==typeof t?t:Function(t),e)},r(v),v},p=function(t){delete y[t]},"process"==n(24)(l)?r=function(t){l.nextTick(s(_,t,1))}:d?(o=new d,i=o.port2,o.port1.onmessage=m,r=s(i.postMessage,i,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScript?(r=function(t){f.postMessage(t+"","*")},f.addEventListener("message",m,!1)):r=g in a("script")?function(t){u.appendChild(a("script"))[g]=function(){u.removeChild(this),_.call(t)}}:function(t){setTimeout(s(_,t,1),0)}),t.exports={set:h,clear:p}},function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){t.exports=n(10).document&&document.documentElement},function(t,e,n){var r=n(13),o=n(10).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(40)("iterator"),o=!1;try{var i=[7][r]();i["return"]=function(){o=!0},Array.from(i,function(){throw 2})}catch(s){}t.exports=function(t){if(!o)return!1;var e=!1;try{var n=[7],i=n[r]();i.next=function(){e=!0},n[r]=function(){return i},t(n)}catch(s){}return e}},function(t,e,n){t.exports={"default":n(76),__esModule:!0}},function(t,e,n){n(46),n(31),t.exports=n(77)},function(t,e,n){var r=n(14),o=n(59);t.exports=n(11).getIterator=function(t){var e=o(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return r(e.call(t))}},function(t,e,n){t.exports={"default":n(79),__esModule:!0}},function(t,e,n){n(30),n(31),n(46),n(80),n(81),t.exports=n(11).Set},function(t,e,n){"use strict";var r=n(52);n(62)("Set",function(t){return function(){return t(this,arguments[0])}},{add:function(t){return r.def(this,t=0===t?0:t,t)}},r)},function(t,e,n){var r=n(9);r(r.P,"Set",{toJSON:n(64)("Set")})},function(t,e){"use strict";e["default"]=function(t){return t&&t.__esModule?t:{"default":t}},e.__esModule=!0},function(e,n){e.exports=t},function(t,e){"use strict";function n(t,e){if(!t)throw new Error("[koto] "+e)}e.__esModule=!0,e["default"]=n,t.exports=e["default"]},function(t,e,n){"use strict";var r=n(1)["default"],o=n(65)["default"],i=n(82)["default"];e.__esModule=!0;var s=n(84),c=i(s),u=function(){function t(e,n){if(r(this,t),this._base=e,this._handlers={},this._lifecycleRe=/^(enter|update|merge|exit)(:transition)?$/,n&&(this.dataBind=n.dataBind,this.insert=n.insert,"events"in n))for(var o in n.events)this.on(o,n.events[o])}return t.prototype.dataBind=function(){c["default"](!1,"Layers must specify a dataBind method.")},t.prototype.insert=function(){c["default"](!1,"Layers must specify an `insert` method.")},t.prototype.on=function(t,e,n){return n=n||{},c["default"](this._lifecycleRe.test(t),"Unrecognized lifecycle event name specified to 'Layer#on': '"+t+"'."),t in this._handlers||(this._handlers[t]=[]),this._handlers[t].push({callback:e,chart:n.chart||null}),this},t.prototype.off=function(t,e){var n,r=this._handlers[t];if(c["default"](this._lifecycleRe.test(t),"Unrecognized lifecycle event name specified to 'Layer#on': '"+t+"'."),!r)return this;if(1===arguments.length)return r.length=0,this;for(n=r.length-1;n>-1;--n)r[n].callback===e&&r.splice(n,1);return this},t.prototype.draw=function(t){function e(t,e){var n=0;0===t.size()?e():t.each(function(){++n}).each("interrupt.promise",function(){e.apply(this,arguments)}).each("end.promise",function(){--n||e.apply(this,arguments)})}function n(t){u.call(e,function(){t(!0)})}var r,i,s,u,a,f,l,h,p,d,v,y=[];r=this.dataBind.call(this._base,t),c["default"](r instanceof d3.selection,"Invalid selection defined by `Layer#dataBind` method."),c["default"](r.enter,"Layer selection not properly bound."),i=r.enter(),i._chart=this._base._chart,s=[{name:"update",selection:r},{name:"enter",selection:i,method:this.insert},{name:"merge",selection:r},{name:"exit",selection:r,method:r.exit}];for(var g=0,_=s.length;_>g;++g)if(l=s[g].name,u=s[g].selection,a=s[g].method,"function"==typeof a&&(u=a.call(u,u)),!u.empty()){if(c["default"](u&&u instanceof d3.selection,"Invalid selection defined for "+l+" lifecycle event."),f=this._handlers[l])for(h=0,p=f.length;p>h;++h)u._chart=f[h].chart||this._base._chart,f[h].callback.call(u,u);if(f=this._handlers[l+":transition"],f&&f.length)for(u=u.transition(),v=f.length,d=0;v>d;++d)u._chart=f[d].chart||this._base._chart,f[d].callback.call(u,u),y.push(new o(n));this.promise=o.all(y)}},t}();e["default"]=u,t.exports=e["default"]}])});

},{"d3":"d3"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/App.jsx":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactLeaflet = require('react-leaflet');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

// Panorama Toolkit components,
// Panorama template modules,
// and related utils
// import { Punchcard } from '@panorama/toolkit';

var _utilsAppActionCreator = require('./utils/AppActionCreator');

/*
 * Data flow via Flux:
 * https://facebook.github.io/flux/docs/overview.html
 * 
 *                  ┌-----   actions  <-----┐
 *                  v                       |
 * actions --> dispatcher --> stores --> views
 */

// stores

var _storesCommodityStore = require('./stores/CommodityStore');

var _storesCommodityStore2 = _interopRequireDefault(_storesCommodityStore);

// components (TODO: move into @panorama/toolkit)

var _componentsPunchcardPunchcardJsx = require('./components/Punchcard/Punchcard.jsx');

var _componentsPunchcardPunchcardJsx2 = _interopRequireDefault(_componentsPunchcardPunchcardJsx);

var _componentsItemSelectorItemSelectorJsx = require('./components/ItemSelector/ItemSelector.jsx');

var _componentsItemSelectorItemSelectorJsx2 = _interopRequireDefault(_componentsItemSelectorItemSelectorJsx);

var _componentsOffsetAreaChartOffsetAreaChartJsx = require('./components/OffsetAreaChart/OffsetAreaChart.jsx');

var _componentsOffsetAreaChartOffsetAreaChartJsx2 = _interopRequireDefault(_componentsOffsetAreaChartOffsetAreaChartJsx);

var _componentsChartSliderChartSliderJsx = require('./components/ChartSlider/ChartSlider.jsx');

var _componentsChartSliderChartSliderJsx2 = _interopRequireDefault(_componentsChartSliderChartSliderJsx);

var _componentsCartoDBTileLayerJsx = require('./components/CartoDBTileLayer.jsx');

var _componentsCartoDBTileLayerJsx2 = _interopRequireDefault(_componentsCartoDBTileLayerJsx);

// TODO: submit as PR to react-leaflet

var _componentsCanalDetailPanelJsx = require('./components/CanalDetailPanel.jsx');

var _componentsCanalDetailPanelJsx2 = _interopRequireDefault(_componentsCanalDetailPanelJsx);

// actions

// utils

// config

var _basemapsTileLayersJson = require('../basemaps/tileLayers.json');

var _basemapsTileLayersJson2 = _interopRequireDefault(_basemapsTileLayersJson);

var _basemapsCartodbConfigJson = require('../basemaps/cartodb/config.json');

var _basemapsCartodbConfigJson2 = _interopRequireDefault(_basemapsCartodbConfigJson);

var _basemapsCartodbBasemapsJson = require('../basemaps/cartodb/basemaps.json');

var _basemapsCartodbBasemapsJson2 = _interopRequireDefault(_basemapsCartodbBasemapsJson);

// main app container

var App = (function (_React$Component) {
	_inherits(App, _React$Component);

	_createClass(App, null, [{
		key: 'propTypes',

		// property validation (ES7-style React)
		value: {},

		// property defaults (ES7-style React)
		// (instead of ES5-style getDefaultProps)
		enumerable: true
	}, {
		key: 'defaultProps',

		/*
  legendData: React.PropTypes.object,
  exampleTitle: React.PropTypes.string,
  */
		value: {},
		enumerable: true
	}]);

	/*
 legendData: {
 	items: [
 		'narratives',
 		'cotton',
 		'sugar'
 	],
 	initialSelection: 'narratives'
 },
 	exampleTitle: 'Example Component'
 */

	function App(props) {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);

		// set up initial state in constructor
		// (instead of ES5-style getInitialState)
		this.state = this.getDefaultState();

		// bind handlers to this component instance,
		// since React no longer does this automatically when using ES6
		this.onMapMove = this.onMapMove.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
		this.storeChanged = this.storeChanged.bind(this);
	}

	// ============================================================ //
	// Lifecycle
	// ============================================================ //

	_createClass(App, [{
		key: 'componentWillMount',
		value: function componentWillMount() {

			this.computeComponentDimensions();
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {

			window.addEventListener('resize', this.onWindowResize);
			_storesCommodityStore2['default'].addListener(_utilsAppActionCreator.AppActionTypes.storeChanged, this.storeChanged);

			_utilsAppActionCreator.AppActions.loadInitialData(this.state);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {

			_storesCommodityStore2['default'].removeListener(_utilsAppActionCreator.AppActionTypes.storeChanged, this.storeChanged);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {

			//

		}
	}, {
		key: 'getDefaultState',
		value: function getDefaultState() {

			return {
				dimensions: {
					upperLeft: {
						width: 0,
						height: 0
					},
					upperRight: {
						width: 0,
						height: 0
					}
				},
				selectedCanal: 22, // Erie Canal
				selectedYear: 1849,
				selectedCommodity: null,
				timeline: {},
				punchcard: {},
				canalDetail: {}
			};
		}

		// ============================================================ //
		// Handlers
		// ============================================================ //

	}, {
		key: 'onMapMove',
		value: function onMapMove(event) {

			// TODO: emit event that is picked up by hash manager component
			// this.updateURL({loc: hashUtils.formatCenterAndZoom(evt.target)}, true);
			console.log(">>>>> map moved");
		}
	}, {
		key: 'onWindowResize',
		value: function onWindowResize(event) {

			this.computeComponentDimensions();
		}
	}, {
		key: 'storeChanged',
		value: function storeChanged() {

			this.setState({
				timeline: this.deriveTimelineData(),
				punchcard: this.derivePunchcardData(),
				canalDetail: this.deriveCanalDetailData()
			});
		}

		// ============================================================ //
		// Helpers
		// ============================================================ //

	}, {
		key: 'computeComponentDimensions',
		value: function computeComponentDimensions() {

			// based off of sizes stored within _variables.scss --
			// if you change them there, change them here.
			var containerPadding = 20,
			    headerHeight = 80,
			    bottomRowHeight = 230,
			    dimensions = {};

			dimensions.upperRight = {
				height: window.innerHeight - bottomRowHeight - 3 * containerPadding
			};
			dimensions.upperLeft = {
				height: dimensions.upperRight.height - headerHeight
			};
			dimensions.lowerLeft = {
				height: bottomRowHeight - 2 * containerPadding
			};
			dimensions.lowerRight = {
				height: dimensions.lowerLeft.height
			};

			this.setState({ dimensions: dimensions });
		}
	}, {
		key: 'deriveTimelineData',
		value: function deriveTimelineData() {

			var data = {
				selectedCanal: _storesCommodityStore2['default'].getSelectedCanal(),
				canals: _storesCommodityStore2['default'].getAllCanals()
			};

			var comms = _storesCommodityStore2['default'].getAllCommodities();

			// sort by canal startYear, and merge in startYear and endYear
			var startYearSortedCanalIds = Object.keys(comms).sort(function (a, b) {
				return data.canals[a].startYear - data.canals[b].startYear;
			}),
			    startYearSortedComms = startYearSortedCanalIds.map(function (canalId) {
				return comms[canalId];
			}),
			    startEndYears = startYearSortedCanalIds.map(function (canalId) {
				return {
					startYear: data.canals[canalId].startYear,
					endYear: data.canals[canalId].endYear
				};
			});

			// TODO: these constants should exist elsewhere.
			var MIN_YEAR = 1820;
			var MAX_YEAR = 1860;
			var MIN_TONNAGE = 0;
			var MAX_TONNAGE = 4000000;

			data.offsetAreaChartConfig = {
				data: startEndYears,
				margin: { top: 0, right: 20, bottom: 40, left: 20 },
				xScale: _d32['default'].scale.linear().domain([MIN_YEAR, MAX_YEAR]),
				yScale: _d32['default'].scale.linear().domain([MIN_TONNAGE, MAX_TONNAGE]),
				axisProps: null,

				areaChartData: _lodash2['default'].values(startYearSortedComms).map(function (v) {
					return _lodash2['default'].values(v);
				}),
				areaChartConfig: {
					xAccessor: function xAccessor(d) {
						return d.year;
					},
					yAccessor: function yAccessor(d) {
						return d.totalNormalizedValue || 0;
					}
				}
			};

			data.chartSlider = {
				scale: data.offsetAreaChartConfig.xScale,
				margin: data.offsetAreaChartConfig.margin,
				selectedValue: _storesCommodityStore2['default'].getSelectedYear()
			};

			return data;
		}
	}, {
		key: 'derivePunchcardData',
		value: function derivePunchcardData() {

			var data = {},
			    canalMetadata = _storesCommodityStore2['default'].getSelectedCanal(),
			    commodities = _storesCommodityStore2['default'].getCommoditiesByCanalByYear();

			data.header = {
				title: canalMetadata ? canalMetadata.name : '',
				subtitle: _storesCommodityStore2['default'].getSelectedYear() || '',
				caption: commodities ? commodities.totalNormalizedValue : ''
			};

			// Punchcard needs arrays to work with d3 selections
			data.items = commodities ? _lodash2['default'].values(commodities.commodities) : [];
			data.categories = commodities ? _lodash2['default'].values(commodities.commodityCategories) : [];

			return data;
		}
	}, {
		key: 'deriveCanalDetailData',
		value: function deriveCanalDetailData() {

			var data = {
				canalMetadata: _storesCommodityStore2['default'].getSelectedCanal(),
				commodities: _storesCommodityStore2['default'].getCommoditiesByCanalByYear()
			};

			return data;
		}

		// ============================================================ //
		// Render
		// ============================================================ //

	}, {
		key: 'render',
		value: function render() {

			// TODO: these values need to go elsewhere, probably in a componentized hash parser/manager
			var loc = [-1.5, 15.0],
			    zoom = 6;

			// TODO: these values might want to be set as defaults on the LeafletMap component?
			var debounce = function debounce(fn, delay) {
				var timeout = undefined;
				return function () {
					clearTimeout(timeout);
					var that = this,
					    args = arguments;
					timeout = setTimeout(function () {
						fn.apply(that, args);
					}, delay);
				};
			},
			    mapEvents = {
				move: debounce(this.onMapMove, 250)
			},
			    mapOptions = {
				scrollWheelZoom: false,
				attributionControl: false,
				minZoom: 4,
				maxZoom: 10,
				maxBounds: [[-47.0401, -85.3417], [37.3701, 89.4726]]
			};

			var TIMELINE_INITIAL_WIDTH = 500;

			return React.createElement(
				'div',
				{ className: 'container full-height' },
				React.createElement(
					'div',
					{ className: 'row full-height' },
					React.createElement(
						'div',
						{ className: 'columns eight left-column full-height' },
						React.createElement(
							'header',
							{ className: 'row u-full-width' },
							React.createElement(
								'h1',
								null,
								React.createElement(
									'span',
									{ className: 'header-main' },
									'CANALS'
								),
								React.createElement(
									'span',
									{ className: 'header-sub' },
									'1820–1860'
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'row top-row template-tile', style: { height: this.state.dimensions.upperLeft.height + "px" } },
							React.createElement(
								_reactLeaflet.Map,
								{
									center: loc,
									zoom: zoom
								},
								_basemapsCartodbBasemapsJson2['default'].layergroup.layers.map(function (item, i) {
									return React.createElement(_componentsCartoDBTileLayerJsx2['default'], {
										key: i,
										userId: _basemapsCartodbConfigJson2['default'].userId,
										sql: item.options.sql,
										cartocss: item.options.cartocss
									});
								}),
								_basemapsTileLayersJson2['default'].layers.map(function (item, i) {
									return React.createElement(_reactLeaflet.TileLayer, {
										key: i,
										url: item.url
									});
								})
							)
						),
						React.createElement(
							'div',
							{ className: 'row bottom-row template-tile' },
							React.createElement(_componentsItemSelectorItemSelectorJsx2['default'], { items: this.state.timeline.canals, selectedItem: this.state.timeline.selectedCanal }),
							React.createElement(
								_componentsChartSliderChartSliderJsx2['default'],
								_extends({}, this.state.timeline.chartSlider, { width: TIMELINE_INITIAL_WIDTH, height: this.state.dimensions.lowerLeft.height }),
								React.createElement(_componentsOffsetAreaChartOffsetAreaChartJsx2['default'], this.state.timeline.offsetAreaChartConfig)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'columns four right-column full-height' },
						React.createElement(
							'div',
							{ className: ' row top-row template-tile', style: { height: this.state.dimensions.upperRight.height + "px" } },
							React.createElement(_componentsPunchcardPunchcardJsx2['default'], { header: this.state.punchcard.header, categories: this.state.punchcard.categories, items: this.state.punchcard.items })
						),
						React.createElement(
							'div',
							{ className: 'row bottom-row template-tile' },
							React.createElement(_componentsCanalDetailPanelJsx2['default'], this.state.canalDetail)
						)
					)
				)
			);
		}
	}]);

	return App;
})(React.Component);

exports['default'] = App;
module.exports = exports['default'];

},{"../basemaps/cartodb/basemaps.json":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/basemaps/cartodb/basemaps.json","../basemaps/cartodb/config.json":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/basemaps/cartodb/config.json","../basemaps/tileLayers.json":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/basemaps/tileLayers.json","./components/CanalDetailPanel.jsx":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/CanalDetailPanel.jsx","./components/CartoDBTileLayer.jsx":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/CartoDBTileLayer.jsx","./components/ChartSlider/ChartSlider.jsx":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/ChartSlider/ChartSlider.jsx","./components/ItemSelector/ItemSelector.jsx":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/ItemSelector/ItemSelector.jsx","./components/OffsetAreaChart/OffsetAreaChart.jsx":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/OffsetAreaChart/OffsetAreaChart.jsx","./components/Punchcard/Punchcard.jsx":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/Punchcard/Punchcard.jsx","./stores/CommodityStore":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/stores/CommodityStore.js","./utils/AppActionCreator":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/utils/AppActionCreator.js","d3":"d3","lodash":"lodash","react":"react","react-leaflet":"react-leaflet"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/AreaChart/AreaChart.jsx":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var _chartsChartBase = require('../charts/ChartBase');

var _chartsChartBase2 = _interopRequireDefault(_chartsChartBase);

var _chartsPanoramaChartJsx = require('../charts/PanoramaChart.jsx');

var _chartsPanoramaChartJsx2 = _interopRequireDefault(_chartsPanoramaChartJsx);

// import './style.scss';

var AreaChart = (function (_PanoramaChart) {
  _inherits(AreaChart, _PanoramaChart);

  function AreaChart(props) {
    _classCallCheck(this, AreaChart);

    _get(Object.getPrototypeOf(AreaChart.prototype), 'constructor', this).call(this, props);
    this.chartConstructor = AreaChartImpl;
  }

  _createClass(AreaChart, [{
    key: 'getClassSuffix',
    value: function getClassSuffix() {
      return 'area-chart';
    }
  }]);

  return AreaChart;
})(_chartsPanoramaChartJsx2['default']);

exports['default'] = AreaChart;

var AreaChartImpl = (function (_ChartBase) {
  _inherits(AreaChartImpl, _ChartBase);

  function AreaChartImpl(selection, props) {
    var _this = this;

    _classCallCheck(this, AreaChartImpl);

    _get(Object.getPrototypeOf(AreaChartImpl.prototype), 'constructor', this).call(this, selection, props);

    var areaGenerator = _d32['default'].svg.area().interpolate('basis').x(function (d) {
      return _this.config('xScale')(_this.accessor('x')(d));
    }).y0(function (d) {
      return _this.config('yScale')(0);
    }).y1(function (d) {
      return _this.config('yScale')(_this.accessor('y')(d));
    });

    // append group to chart
    var area = this.baseLayer = this.base.append('g').classed('area-layer', true);

    this.updateDimensions();

    // define layer
    var layer = this.layer('area-layer', area, {
      dataBind: function dataBind(data) {
        return this.selectAll('path.area').data(data);
      },

      insert: function insert() {
        return this.append('path').attr('class', 'area');
      }
    });

    // Setup life-cycle events on layers
    layer.on('update', function () {
      // this => base selection
      return this.attr('d', function (d) {
        return areaGenerator(d);
      });
    }).on('enter', function () {
      // this => enter selection
      return this.attr('d', function (d) {
        return areaGenerator(d);
      });
    }).on('merge', function () {
      // this => base selection
    }).on('exit', function () {
      // this => exit selection
    });
  }

  _createClass(AreaChartImpl, [{
    key: 'updateScales',
    value: function updateScales(data) {

      this.config('xScale').range([0, this._innerWidth]);
      this.config('yScale').range([this._innerHeight, 0]);
    }
  }]);

  return AreaChartImpl;
})(_chartsChartBase2['default']);

exports.AreaChartImpl = AreaChartImpl;

},{"../charts/ChartBase":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/charts/ChartBase.js","../charts/PanoramaChart.jsx":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/charts/PanoramaChart.jsx","d3":"d3"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/CanalDetailPanel.jsx":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTabs = require('react-tabs');

var _reactTabs2 = _interopRequireDefault(_reactTabs);

var CanalDetailPanel = (function (_React$Component) {
	_inherits(CanalDetailPanel, _React$Component);

	_createClass(CanalDetailPanel, null, [{
		key: 'propTypes',

		// property validation (ES7-style React)
		value: {
			canal: _react.PropTypes.object,
			commodities: _react.PropTypes.array
		},

		// property defaults (ES7-style React)
		// (instead of ES5-style getDefaultProps)
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {},
		enumerable: true
	}]);

	//

	function CanalDetailPanel(props) {
		_classCallCheck(this, CanalDetailPanel);

		_get(Object.getPrototypeOf(CanalDetailPanel.prototype), 'constructor', this).call(this, props);
	}

	// ============================================================ //
	// Lifecycle
	// ============================================================ //

	_createClass(CanalDetailPanel, [{
		key: 'componentWillMount',
		value: function componentWillMount() {}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}
	}, {
		key: 'onTabSelected',
		value: function onTabSelected(index, last) {

			console.log('>>>>> Selected tab: ' + index + ', Last tab: ' + last);
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2['default'].createElement(
				_reactTabs.Tabs,
				{
					onSelect: this.onTabSelecteded,
					selectedIndex: 0
				},
				_react2['default'].createElement(
					_reactTabs.TabList,
					null,
					_react2['default'].createElement(
						_reactTabs.Tab,
						null,
						'CANAL INFO'
					),
					_react2['default'].createElement(
						_reactTabs.Tab,
						null,
						'COMMODITIES'
					)
				),
				_react2['default'].createElement(
					_reactTabs.TabPanel,
					null,
					_react2['default'].createElement(
						'h2',
						null,
						'ABOUT THE CANAL'
					)
				),
				_react2['default'].createElement(
					_reactTabs.TabPanel,
					null,
					_react2['default'].createElement(
						'h2',
						null,
						'COMMODITIES'
					)
				)
			);
		}
	}]);

	return CanalDetailPanel;
})(_react2['default'].Component);

exports['default'] = CanalDetailPanel;
module.exports = exports['default'];

},{"react":"react","react-tabs":"react-tabs"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/CartoDBTileLayer.jsx":[function(require,module,exports){
/*
 * TODO: Submit this component as a PR to react-leaflet,
 * instead of adding to @panorama.
 * Might need to submit with tests, but other similar components are not currently tested.
 * Will need to pull in CartoDB dependency via an `npm install` and an `import`
 * rather than via a global <script> include.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _leaflet = require('leaflet');

var _reactLeaflet = require('react-leaflet');

// Not possible until CartoDB releases an npm package for the Core API.
// import { Tiles } from 'cartodb';

// Until then, consumer applications must include the cartodb.js script elsewhere,
// e.g. in index.html as <script src="http://libs.cartocdn.com/cartodb.js/v3/3.15/cartodb.core.js"></script>
var Tiles = cartodb.Tiles;

var CartoDBTileLayer = (function (_BaseTileLayer) {
	_inherits(CartoDBTileLayer, _BaseTileLayer);

	function CartoDBTileLayer() {
		_classCallCheck(this, CartoDBTileLayer);

		_get(Object.getPrototypeOf(CartoDBTileLayer.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(CartoDBTileLayer, [{
		key: 'componentWillMount',
		value: function componentWillMount() {

			_get(Object.getPrototypeOf(CartoDBTileLayer.prototype), 'componentWillMount', this).call(this);
			this.leafletElement = (0, _leaflet.tileLayer)('', this.props);

			this._getCartoDBTilesTemplates((function (error, response) {
				if (error) {
					// TODO: handle error
					console.error(error);
				} else {
					this.leafletElement.setUrl(response.tiles[0]);
				}
			}).bind(this));
		}
	}, {
		key: '_getCartoDBTilesTemplates',
		value: function _getCartoDBTilesTemplates(callback) {
			Tiles.getTiles({
				type: 'cartodb',
				user_name: this.props.userId,
				sublayers: [{
					"sql": this.props.sql,
					"cartocss": this.props.cartocss
				}]
			}, function (tiles, error) {
				if (!tiles || error) {
					if (!error) {
						error = "Empty response.";
					}
					callback(error, tiles);
				} else {
					callback(null, tiles);
				}
			});
		}
	}], [{
		key: 'propTypes',
		value: {
			userId: _react.PropTypes.string,
			sql: _react.PropTypes.string,
			cartocss: _react.PropTypes.string
		},
		enumerable: true
	}]);

	return CartoDBTileLayer;
})(_reactLeaflet.BaseTileLayer);

exports['default'] = CartoDBTileLayer;
module.exports = exports['default'];

},{"leaflet":"leaflet","react":"react","react-leaflet":"react-leaflet"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/ChartSlider/ChartSlider.jsx":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _d3 = require('d3');

var d3 = _interopRequireWildcard(_d3);

// TODO: either pass this into the component from the host application (add to panorama-template),
// or set up an AppDispatcher shared across all @panorama/toolkit components.

var _utilsAppActionCreator = require('../../utils/AppActionCreator');

// import './style.scss';

var ChartSlider = (function (_React$Component) {
  _inherits(ChartSlider, _React$Component);

  _createClass(ChartSlider, null, [{
    key: 'propTypes',

    // property validation
    value: {
      scale: _react.PropTypes.func,
      orient: _react.PropTypes.string,
      margin: _react.PropTypes.shape({
        top: _react.PropTypes.number,
        right: _react.PropTypes.number,
        bottom: _react.PropTypes.number,
        left: _react.PropTypes.number
      })
    },

    // property defaults (ES7-style React)
    // (instead of ES5-style getDefaultProps)
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      scale: d3.scale.linear().clamp(true),
      orient: 'bottom',
      margin: {
        top: 20,
        right: 30,
        bottom: 20,
        left: 30
      }
    },
    enumerable: true
  }]);

  function ChartSlider(props) {
    _classCallCheck(this, ChartSlider);

    _get(Object.getPrototypeOf(ChartSlider.prototype), 'constructor', this).call(this, props);

    // bind handlers to this component instance,
    // since React no longer does this automatically when using ES6
    // this.onThingClicked = this.onThingClicked.bind(this);
  }

  _createClass(ChartSlider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      d3ChartSlider.create(this.refs.axis, this.props.scale, this.props.orient, this.props.margin);

      // Rerender in order to pass measured width down to child component
      this.forceUpdate();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {

      d3ChartSlider.update(this.refs.axis, this.props.scale, this.props.orient, this.props.margin, this.props.selectedValue);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      d3ChartSlider.destroy(this.refs.axis);
    }
  }, {
    key: 'render',
    value: function render() {

      // Attempt to measure container width, to pass down to child component
      var node = undefined;
      try {
        node = _reactDom2['default'].findDOMNode(this);
      } catch (e) {}

      var numChildren = _react.Children.count(this.props.children);
      if (numChildren > 1) {
        console.warn('ChartSlider is designed to wrap only one child component, but it found ' + numChildren + ' children.');
      }

      return _react2['default'].createElement(
        'div',
        { className: 'panorama chart-slider' },

        // Set width/height on the single child component
        _react2['default'].cloneElement(this.props.children, {
          width: node ? node.offsetWidth : this.props.width,
          height: this.props.height
        }),
        _react2['default'].createElement('div', { className: 'top-rule', style: {
            marginLeft: this.props.margin.left + "px",
            marginRight: this.props.margin.right + "px",
            width: 'calc(100% - ' + (this.props.margin.left + this.props.margin.right) + 'px)'
          } }),
        _react2['default'].createElement('div', { className: 'd3-chart-slider', ref: 'axis' })
      );
    }
  }]);

  return ChartSlider;
})(_react2['default'].Component);

exports['default'] = ChartSlider;

var d3ChartSlider = {

  /**
   * Any necessary setup for d3 component goes here.
   *
   * @param  {Node}     HTMLElement to which d3 will attach
   * @param  {Function} d3 scale to use for the axis
   * @param  {String}   orientation of the axis (per d3.axis.orient)
   * @param  {Object}   Object specifying margins around the component
   */
  create: function create(node, scale, orient, margin) {

    this.onBrushMoved = this.onBrushMoved.bind(this);

    // TODO: would be nice to not have to maintain this state.
    // It's needed in onBrushMove() (and is updated in update());
    // if d3.event wasn't null in the event handler, could probably use event.target...
    this.node = node;

    this.axisPrimary = d3.svg.axis().orient(orient).ticks(5).tickFormat(String).tickSize(13);

    this.axisSecondary = d3.svg.axis().orient(orient).ticks(10).tickFormat(function (d) {
      return '';
    }).tickSize(10);

    this.axisTertiary = d3.svg.axis().orient(orient).ticks(40).tickFormat(function (d) {
      return '';
    }).tickSize(7);

    this.brush = d3.svg.brush().on('brush', this.onBrushMoved);

    var svg = d3.select(node).append('svg');
    svg.append('g').attr('class', 'axis tertiary');
    svg.append('g').attr('class', 'axis secondary');
    svg.append('g').attr('class', 'axis primary');

    var slider = svg.append('g').attr('class', 'slider');

    this.handle = slider.append('line').attr({
      'class': 'handle',
      'x1': 0,
      'x2': 0,
      'y1': 0,
      'y2': '100%'
    });

    this.update(node, scale, orient, margin);
  },

  /**
   * Logic for updating d3 component with new data.
   *
   * @param  {Node}     HTMLElement to which d3 will attach
   * @param  {Function} d3 scale to use for the axis
   * @param  {String}   orientation of the axis (per d3.axis.orient)
   * @param  {Object}   Object specifying margins around the component
   * @param  {Number}   Scaled location of the slider
   */
  update: function update(node, scale, orient, margin, selectedValue) {

    this.node = node;

    // update axis
    scale.range([0, node.offsetWidth - margin.left - margin.right]);
    this.axisPrimary.scale(scale);
    this.axisSecondary.scale(scale);
    this.axisTertiary.scale(scale);
    this.brush.x(scale);

    // apply size and position
    var axisTranform = 'translate(' + margin.left + ', ' + (node.offsetHeight - margin.bottom) + ')';
    var svg = d3.select(node).select('svg');
    svg.attr('width', '100%').attr('height', '100%');

    // draw axes
    svg.select('.axis.primary').call(this.axisPrimary).attr('transform', axisTranform)

    // position labels
    .selectAll('text').attr('y', Math.floor(2 / 3 * margin.bottom));

    // draw secondary and tertiary axes (just smaller ticks)
    svg.select('.axis.secondary').call(this.axisSecondary).attr('transform', axisTranform);

    svg.select('.axis.tertiary').call(this.axisTertiary).attr('transform', axisTranform);

    // draw brush
    var slider = svg.select('.slider');
    slider.call(this.brush).attr('transform', 'translate(' + margin.left + ', 0)').select('.background').on('mousedown.brush', this.onBrushMoved).on('touchstart.brush', this.onBrushMoved);
    slider.selectAll('.background').attr('height', '100%');

    if (typeof selectedValue !== 'undefined') {
      this.onSelectedValueChanged(selectedValue);
    }
  },

  /**
   * Any necessary cleanup for d3 component goes here.
   *
   * @param  {Node}    HTMLElement to which d3 was attached
   */
  destroy: function destroy(node) {

    d3.select(node).html('');

    this.node = null;
    this.axisPrimary = null;
    this.axisSecondary = null;
    this.axisTertiary = null;
    this.brush = null;
    this.handle = null;
  },

  onBrushMoved: function onBrushMoved() {

    var scale = this.brush.x(),
        domain = scale.domain(),
        mouseX = d3.mouse(d3.select(this.node).select('.axis')[0][0])[0],
        // there's probably a better, more-d3 way to do this...
    value = scale.invert(mouseX);

    // clamp and quantize
    value = Math.round(Math.max(domain[0], Math.min(domain[1], value)));

    // TODO: how to abstract this? AppActions for @panorama/toolkit? and set up CommodityStore to listen to it?
    _utilsAppActionCreator.AppActions.yearSelected(value);
  },

  onSelectedValueChanged: function onSelectedValueChanged(value) {

    d3.select(this.node).select('svg').select('.slider').call(this.brush.extent([value, value + 2]));

    var brushCenter = this.brush.x()(value);
    this.handle.attr({
      x1: brushCenter,
      x2: brushCenter
    });
  }

};
module.exports = exports['default'];

},{"../../utils/AppActionCreator":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/utils/AppActionCreator.js","d3":"d3","react":"react","react-dom":"react-dom"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/ItemSelector/ItemSelector.jsx":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// TODO: either pass this into the component from the host application (add to panorama-template),
// or set up an AppDispatcher shared across all @panorama/toolkit components.

var _utilsAppActionCreator = require('../../utils/AppActionCreator');

// import './style.scss';

var ItemSelector = (function (_React$Component) {
	_inherits(ItemSelector, _React$Component);

	_createClass(ItemSelector, null, [{
		key: 'propTypes',
		value: {
			initialSelection: _react.PropTypes.string,
			items: _react.PropTypes.object.isRequired
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			initialSelection: '',
			items: {}
		},
		enumerable: true
	}]);

	function ItemSelector(props) {
		_classCallCheck(this, ItemSelector);

		_get(Object.getPrototypeOf(ItemSelector.prototype), 'constructor', this).call(this, props);

		// manually bind event handlers,
		// since React ES6 doesn't do this automatically
		this.onItemClick = this.onItemClick.bind(this);
	}

	_createClass(ItemSelector, [{
		key: 'componentWillMount',
		value: function componentWillMount() {

			//

		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {

			//

		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {

			//

		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {

			//

		}
	}, {
		key: 'onItemClick',
		value: function onItemClick(event) {

			// Defense.
			if (!event.currentTarget || !event.currentTarget.dataset) {
				return;
			}

			// TODO: how to abstract this? AppActions for @panorama/toolkit? and set up CommodityStore to listen to it?
			_utilsAppActionCreator.AppActions.canalSelected(event.currentTarget.dataset.item);
		}
	}, {
		key: 'getDefaultState',
		value: function getDefaultState() {

			return {};
		}
	}, {
		key: 'render',
		value: function render() {
			var _this = this;

			return _react2['default'].createElement(
				'div',
				{ className: 'panorama item-selector' },
				_react2['default'].createElement(
					'ul',
					null,
					Object.keys(this.props.items).map(function (itemKey, i) {
						var item = _this.props.items[itemKey];
						return _react2['default'].createElement(
							'li',
							{
								className: 'item' + (_this.props.selectedItem.id === item.id ? ' selected' : ''),
								'data-item': itemKey,
								key: i,
								onClick: _this.onItemClick
							},
							_react2['default'].createElement(
								'span',
								null,
								item.name.toUpperCase()
							)
						);
					})
				)
			);
		}
	}]);

	return ItemSelector;
})(_react2['default'].Component);

exports['default'] = ItemSelector;
module.exports = exports['default'];

},{"../../utils/AppActionCreator":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/utils/AppActionCreator.js","react":"react"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/OffsetAreaChart/OffsetAreaChart.jsx":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var _chartsChartBase = require('../charts/ChartBase');

var _chartsChartBase2 = _interopRequireDefault(_chartsChartBase);

var _chartsPanoramaChartJsx = require('../charts/PanoramaChart.jsx');

var _chartsPanoramaChartJsx2 = _interopRequireDefault(_chartsPanoramaChartJsx);

var _AreaChartAreaChartJsx = require('../AreaChart/AreaChart.jsx');

var _AreaChartAreaChartJsx2 = _interopRequireDefault(_AreaChartAreaChartJsx);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// import './style.scss';

var OffsetAreaChart = (function (_PanoramaChart) {
  _inherits(OffsetAreaChart, _PanoramaChart);

  _createClass(OffsetAreaChart, null, [{
    key: 'propTypes',

    // extend superclass `props` validators
    value: Object.assign({}, _AreaChartAreaChartJsx2['default'].propTypes, {
      areaChartData: _react.PropTypes.array,
      chartSpacing: _react.PropTypes.number
    }),

    // extend superclass `props` defaults
    enumerable: true
  }, {
    key: 'defaultProps',
    value: Object.assign({}, _AreaChartAreaChartJsx2['default'].defaultProps, {
      areaChartData: [],
      chartSpacing: 4
    }),
    enumerable: true
  }]);

  function OffsetAreaChart(props) {
    _classCallCheck(this, OffsetAreaChart);

    _get(Object.getPrototypeOf(OffsetAreaChart.prototype), 'constructor', this).call(this, props);
    this.chartConstructor = OffsetAreaChartImpl;
  }

  _createClass(OffsetAreaChart, [{
    key: 'getClassSuffix',
    value: function getClassSuffix() {
      return 'offset-area-chart';
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this = this;

      // TODO: Timeline will apply horizontal axis and scrub/brush interaction to another component,
      // and emit events as it's interacted with.

      var baseYOffset = -this.props.areaChartData.length * this.props.chartSpacing;

      return _react2['default'].createElement(
        'div',
        null,
        this.props.areaChartData.map(function (chartData, i) {

          // Merge areaChartConfig onto config from this.props
          // (values in this.props.areaChartConfig override those in this.props)
          var config = Object.assign({}, _this.props, _this.props.areaChartConfig, {
            // pass each dataset to each AreaChart instance
            data: [chartData],

            // set size to fit within margins
            width: _this.props.width - _this.props.margin.left - _this.props.margin.right,
            height: _this.props.height - _this.props.margin.top - _this.props.margin.bottom,

            // eliminate margin of each AreaChart
            margin: { top: 0, right: 0, bottom: 0, left: 0 },

            // suppress axes of each AreaChart
            axisProps: null
          });

          return _react2['default'].createElement(_AreaChartAreaChartJsx2['default'], _extends({ key: i }, config, { style: {
              'left': _this.props.margin.left + 'px',
              'top': baseYOffset + i * _this.props.chartSpacing + 'px'
            } }));
        })
      );
    }
  }]);

  return OffsetAreaChart;
})(_chartsPanoramaChartJsx2['default']);

exports['default'] = OffsetAreaChart;

var OffsetAreaChartImpl = (function (_ChartBase) {
  _inherits(OffsetAreaChartImpl, _ChartBase);

  function OffsetAreaChartImpl(selection, props) {
    _classCallCheck(this, OffsetAreaChartImpl);

    _get(Object.getPrototypeOf(OffsetAreaChartImpl.prototype), 'constructor', this).call(this, selection, props);

    // TODO: OffsetAreaChartImpl will:
    // - draw axes
    // - draw horizontal rules for areacharts
    // - draw dots for commodity data presence

    // append group to chart
    var offsetArea = this.baseLayer = this.base.append('g').classed('offset-area-layer', true);

    this.updateDimensions();

    // define layer
    var layer = this.layer('offset-area-layer', offsetArea, {
      dataBind: function dataBind(data) {
        return this.selectAll('line.lifespan').data(data);
      },

      insert: function insert() {
        return this.append('line').attr('class', 'lifespan');
      }
    });

    // Setup life-cycle events on layers
    layer.on('update', function () {
      // this => base selection
    }).on('enter', function () {
      // this => enter selection
    }).on('merge', function () {
      // this => base selection
      return this;
      // .attr('transform', function(d,i) { return 'translate(0,' + chartheight + ')'; })
      // .attr('x1', function(d) { return timescale(canalLookup[d[0].canal_id].opened); })
      // .attr('x2', function(d) { return timescale(canalLookup[d[0].canal_id].closed); })
      // .attr('y1', function(d,i) { return -((stackData.length-i)*offset); })
      // .attr('y2', function(d,i) { return -((stackData.length-i)*offset); })
      // .style('stroke', function(d) { return colorIfActive(d[0].canal_id); })
      // .attr('stroke-width', 1)
    }).on('exit', function () {
      // this => exit selection
    });
  }

  _createClass(OffsetAreaChartImpl, [{
    key: 'updateScales',
    value: function updateScales(data) {

      this.config('xScale').range([0, this._innerWidth]);
      this.config('yScale').range([this._innerHeight, 0]);
    }

    /*
    // Do something before `dataBind`
    preDraw (data) {
       this.updateDimensions();
      this.updateScales(data);
       let margin = this.config('margin');
       if (this.config('xAxis')) {
        this.config('xAxis').update(
          this.config('xScale'),
          [margin.left, this._innerHeight]
        );
      }
      if (this.config('yAxis')) {
        this.config('yAxis').update(
          this.config('yScale'),
          [margin.left, margin.top]
        );
      }
     }
    */

  }]);

  return OffsetAreaChartImpl;
})(_chartsChartBase2['default']);

exports.OffsetAreaChartImpl = OffsetAreaChartImpl;

},{"../AreaChart/AreaChart.jsx":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/AreaChart/AreaChart.jsx","../charts/ChartBase":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/charts/ChartBase.js","../charts/PanoramaChart.jsx":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/charts/PanoramaChart.jsx","d3":"d3","react":"react"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/Punchcard/Punchcard.jsx":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3 = require('d3');

var d3 = _interopRequireWildcard(_d3);

// import './style.scss';

var Punchcard = (function (_React$Component) {
  _inherits(Punchcard, _React$Component);

  _createClass(Punchcard, null, [{
    key: 'propTypes',

    // property validation
    value: {
      header: _react.PropTypes.object,
      categories: _react.PropTypes.array.isRequired,
      items: _react.PropTypes.array.isRequired
    },

    // property defaults (ES7-style React)
    // (instead of ES5-style getDefaultProps)
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      header: {
        title: '',
        subtitle: '',
        caption: ''
      },
      categories: [],
      items: []
    },
    enumerable: true
  }]);

  function Punchcard(props) {
    _classCallCheck(this, Punchcard);

    _get(Object.getPrototypeOf(Punchcard.prototype), 'constructor', this).call(this, props);

    // set up initial state (instead of ES5-style getInitialState)
    // this.state =

    // bind handlers to this component instance,
    // since React no longer does this automatically when using ES6
    // this.onThingClicked = this.onThingClicked.bind(this);
  }

  _createClass(Punchcard, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      if (!_.isEmpty(this.props.categories)) {
        d3Punchcard.create(this.refs.content, this.props.categories, this.props.items);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {

      // Blow away what's there. If we want pretty transitions,
      // remove this and handle transitions in d3Punchcard.
      d3Punchcard.destroy(this.refs.content);

      if (!_.isEmpty(this.props.categories)) {
        // cannot remove the node, because React complains
        this.refs.placeholder.style.display = 'none';
        d3Punchcard.update(this.refs.content, this.props.categories, this.props.items);
      } else {
        this.refs.placeholder.style.display = '';
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      d3Punchcard.destroy(this.refs.content);
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2['default'].createElement(
        'div',
        { className: 'panorama punchcard' },
        this.renderPlaceholder(),
        this.renderHeader(),
        _react2['default'].createElement('div', { className: 'content', ref: 'content' })
      );
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader() {

      return _react2['default'].createElement(
        'div',
        { className: 'header', ref: 'header' },
        _react2['default'].createElement(
          'h2',
          null,
          this.props.header.title ? this.props.header.title.toUpperCase() : ''
        ),
        _react2['default'].createElement(
          'h3',
          null,
          _react2['default'].createElement(
            'span',
            { className: 'subtitle' },
            this.props.header.subtitle
          ),
          _react2['default'].createElement(
            'span',
            { className: 'caption' },
            this.props.header.caption,
            ' total tonnage'
          )
        )
      );
    }
  }, {
    key: 'renderPlaceholder',
    value: function renderPlaceholder() {

      // TODO: provide links to years with data, if they exist for this canal.
      // TODO: make placeholder messages configurable via props
      if (_.isEmpty(this.props.categories)) {
        return _react2['default'].createElement(
          'div',
          { className: 'placeholder', ref: 'placeholder' },
          _react2['default'].createElement(
            'h4',
            null,
            'No commodities data available for this canal in the selected year.'
          )
        );
      } else {
        return _react2['default'].createElement(
          'div',
          { className: 'placeholder', ref: 'placeholder' },
          _react2['default'].createElement(
            'h4',
            null,
            'Loading...'
          )
        );
      }
    }
  }]);

  return Punchcard;
})(_react2['default'].Component);

exports['default'] = Punchcard;

var d3Punchcard = {

  // layout constants
  ROW_HEIGHT: 20,
  COMMODITY_TEXT_OFFSET_Y: 5,

  /**
   * Any necessary setup for d3 component goes here.
   *
   * @param  {Node}    HTMLElement to which d3 will attach
   * @param  {Object}  Categorized map of items (TODO: document expected format)
   * @param  {Object}  Flat map of items (TODO: document expected format)
   */
  create: function create(node, categories, items) {

    this.update(node, categories, items);
  },

  /**
   * Logic for updating d3 component with new data.
   *
   * @param  {Node}    HTMLElement to which d3 will attach
   * @param  {Object}  Categorized map of items (TODO: document expected format)
   * @param  {Object}  Flat map of items (TODO: document expected format)
   */
  update: function update(node, categories, items) {

    var scope = this,

    // scale by normalizedValue of all items
    rScale = d3.scale.sqrt().range([2, 8]).domain([1, d3.max(items, function (d) {
      return d.normalizedValue;
    })]),

    // color by aggregateNormalizedValue of all categories
    colorScale = d3.scale.ordinal().range(['rgb(188, 35, 64)', 'rgb(228, 104, 75)', 'rgb(187, 27, 105)', 'rgb(103, 116, 99)', 'rgb(26, 169, 143)', 'rgb(10, 103, 150)', 'rgb(67, 40, 93)', 'rgb(86, 96, 99)']).domain([1, d3.max(categories, function (d) {
      return d.aggregateNormalizedValue;
    })]);

    // <div> for each category
    var categoryNodes = d3.select(node).selectAll('div').data(categories).enter().append('div').attr('style', function (d) {
      return 'color: ' + colorScale(d.aggregateNormalizedValue) + ';';
    }).attr('class', 'category');

    // each with a heading...
    categoryNodes.append('h4').text(function (d) {
      return d.name;
    });

    // ...and an <svg>
    categoryNodes = categoryNodes.append('svg')
    // .attr('width', '50%')
    .attr('height', function (d) {
      return d.commodities.length * scope.ROW_HEIGHT;
    }).style('fill', function (d) {
      return colorScale(d.aggregateNormalizedValue);
    });

    // <g> for each commodity within each category
    var commodityNodes = categoryNodes.selectAll('g').data(function (d) {
      return d.commodities;
    }).enter().append('g').attr('transform', function (d, i) {
      return 'translate(' + 0.5 * scope.ROW_HEIGHT + ', ' + (i + 0.5) * scope.ROW_HEIGHT + ')';
    });

    // <circle> displaying scaled amount of each commodity
    commodityNodes.append('circle').attr('r', function (d) {
      return rScale(d.normalizedValue);
    });

    // <text> displaying name of each commodity
    commodityNodes.append('text').text(function (d) {
      return d.name;
    }).attr('x', 2 * scope.ROW_HEIGHT).attr('y', scope.COMMODITY_TEXT_OFFSET_Y);
  },

  /**
   * Any necessary cleanup for d3 component goes here.
   *
   * @param  {Node}    HTMLElement to which d3 was attached
   */
  destroy: function destroy(node) {

    d3.select(node).html('');
  }

};
module.exports = exports['default'];

},{"d3":"d3","react":"react"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/charts/Axis.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var _koto = require('koto');

var _koto2 = _interopRequireDefault(_koto);

var Axis = (function (_Koto) {
  _inherits(Axis, _Koto);

  function Axis(selection, axisType, props) {
    _classCallCheck(this, Axis);

    _get(Object.getPrototypeOf(Axis.prototype), 'constructor', this).call(this, selection);

    this.configs['scale'] = { value: props.scale };
    this.configs['ticks'] = { value: props.ticks };
    this.configs['orient'] = { value: props.orient };
    this.configs['offset'] = { value: props.offset };

    this.axis = _d32['default'].svg.axis();
    this.baseLayer = this.base.append('g').classed(axisType + ' axis', true);
  }

  _createClass(Axis, [{
    key: 'updateConfigs',
    value: function updateConfigs(props) {

      this.config('scale', props.scale);
      this.config('ticks', props.ticks);
      this.config('orient', props.orient);
      this.config('offset', props.offset);
    }
  }, {
    key: 'update',
    value: function update(scale, offset) {

      if (scale) {
        this.config('scale', scale);
      }
      if (offset) {
        this.config('offset', offset);
      } else {
        offset = this.config('offset');
      }

      this.axis.scale(this.config('scale')).ticks(this.config('ticks')).orient(this.config('orient'));

      this.baseLayer.attr('transform', 'translate(' + offset[0] + ',' + offset[1] + ')').call(this.axis);
    }
  }, {
    key: 'destroy',
    value: function destroy() {

      this.base.remove();
      this.base = null;
    }
  }]);

  return Axis;
})(_koto2['default']);

exports['default'] = Axis;
module.exports = exports['default'];

},{"d3":"d3","koto":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/koto/dist/koto.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/charts/ChartBase.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var _koto = require('koto');

var _koto2 = _interopRequireDefault(_koto);

var _Axis = require('./Axis');

var _Axis2 = _interopRequireDefault(_Axis);

var ChartBase = (function (_Koto) {
  _inherits(ChartBase, _Koto);

  function ChartBase(selection, props) {
    _classCallCheck(this, ChartBase);

    _get(Object.getPrototypeOf(ChartBase.prototype), 'constructor', this).call(this, selection);

    var xAxisProps = undefined,
        yAxisProps = undefined;

    if (props.axisProps) {
      xAxisProps = Object.assign({}, props.axisProps, {
        orient: props.axisProps.xOrient
      });
      yAxisProps = Object.assign({}, props.axisProps, {
        orient: props.axisProps.yOrient
      });
    }

    Object.assign(this.configs, {
      width: { value: props.width },
      height: { value: props.height },
      margin: { value: props.margin },
      xScale: { value: props.xScale },
      yScale: { value: props.yScale },
      xAxis: { value: props.axisProps ? new _Axis2['default'](this.base, 'x', xAxisProps) : null },
      yAxis: { value: props.axisProps ? new _Axis2['default'](this.base, 'y', yAxisProps) : null }
    });
  }

  _createClass(ChartBase, [{
    key: 'updateConfigs',
    value: function updateConfigs(props) {

      this.config('height', props.height).config('width', props.width).config('margin', props.margin).config('xScale', props.xScale).config('yScale', props.yScale).accessor('x', props.xAccessor).accessor('y', props.yAccessor);

      // update axes, or remove them if no longer configured
      if (this.config('xAxis')) {
        if (props.axisProps) {
          this.config('xAxis').updateConfigs(Object.assign({}, props.axisProps, {
            orient: props.axisProps.xOrient
          }));
        } else {
          this.config('xAxis').destroy();
          this.config('xAxis', null);
        }
      }

      if (this.config('yAxis')) {
        if (props.axisProps) {
          this.config('yAxis').updateConfigs(Object.assign({}, props.axisProps, {
            orient: props.axisProps.yOrient
          }));
        } else {
          this.config('yAxis').destroy();
          this.config('yAxis', null);
        }
      }
    }

    /**
     * Default implementation of d3-style 'conventional margins'
     * (sim. to: http://bl.ocks.org/mbostock/3019563)
     */
  }, {
    key: 'updateDimensions',
    value: function updateDimensions() {

      var margin = this.config('margin');

      this._innerWidth = this.config('width') - margin.left - margin.right;
      this._innerHeight = this.config('height') - margin.top - margin.bottom;

      this.base.attr('width', this.config('width'));
      this.base.attr('height', this.config('height'));

      this.baseLayer.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    }
  }, {
    key: 'updateScales',
    value: function updateScales(data) {
      var _this = this;

      this.config('xScale').range([0, this._innerWidth]);
      this.config('yScale').range([this._innerHeight, 0]);

      // default to set domain to all xAccesssor values along x-axis,
      // and 0 <> max yAccessor value along y-axis.
      this.config('xScale').domain(data.map(function (d) {
        return _this.accessor('x')(d);
      }));
      this.config('yScale').domain([0, _d32['default'].max(data, function (d) {
        return _this.accessor('y')(d);
      })]);
    }

    // Do something before `dataBind`
  }, {
    key: 'preDraw',
    value: function preDraw(data) {

      this.updateDimensions();
      this.updateScales(data);

      var margin = this.config('margin');

      if (this.config('xAxis')) {
        this.config('xAxis').update(this.config('xScale'), [margin.left, margin.top + this._innerHeight]);
      }
      if (this.config('yAxis')) {
        this.config('yAxis').update(this.config('yScale'), [margin.left, margin.top]);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {

      this.base.remove();
      this.base = null;
    }
  }]);

  return ChartBase;
})(_koto2['default']);

exports['default'] = ChartBase;
module.exports = exports['default'];

},{"./Axis":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/charts/Axis.js","d3":"d3","koto":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/koto/dist/koto.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/components/charts/PanoramaChart.jsx":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var BASE_CLASS_NAME = 'panorama chart ';

var PanoramaChart = (function (_React$Component) {
  _inherits(PanoramaChart, _React$Component);

  _createClass(PanoramaChart, null, [{
    key: 'propTypes',
    value: {
      data: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object]),
      width: _react.PropTypes.number,
      height: _react.PropTypes.number,
      margin: _react.PropTypes.shape({
        top: _react.PropTypes.number,
        right: _react.PropTypes.number,
        bottom: _react.PropTypes.number,
        left: _react.PropTypes.number
      }),
      style: _react.PropTypes.object,
      xScale: _react.PropTypes.func,
      yScale: _react.PropTypes.func,
      xAccessor: _react.PropTypes.func,
      yAccessor: _react.PropTypes.func,
      axisProps: _react.PropTypes.shape({
        scale: _react.PropTypes.func,
        ticks: _react.PropTypes.number,
        orient: _react.PropTypes.string,
        offset: _react.PropTypes.array
      })
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      data: [],
      width: 600,
      height: 400,
      margin: {
        top: 20,
        right: 30,
        bottom: 20,
        left: 30
      },
      style: {},
      xScale: d3.scale.linear(),
      yScale: d3.scale.linear(),
      xAccessor: function xAccessor(d) {
        return d.key;
      },
      yAccessor: function yAccessor(d) {
        return d.value;
      },
      axisProps: {
        scale: d3.scale.linear(),
        ticks: 5,
        xOrient: 'bottom',
        yOrient: 'left',
        offset: [0, 0]
      }
    },
    enumerable: true
  }]);

  function PanoramaChart(props) {
    _classCallCheck(this, PanoramaChart);

    _get(Object.getPrototypeOf(PanoramaChart.prototype), 'constructor', this).call(this, props);
  }

  _createClass(PanoramaChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {

      this.update();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {

      if (this.chart) this.chart.destroy(this.refs.chart);
      this.chart = null;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {

      this.update();
    }
  }, {
    key: 'update',
    value: function update() {

      if (!this.chart) {
        this.chart = new this.chartConstructor(d3.select(this.refs.chart), this.props);
      }

      if (this.chart.updateConfigs) {
        this.chart.updateConfigs(this.props);
      }

      this.chart.draw(this.props.data);
    }

    /**
     * Determine class name to be appended to container element.
     * Typically overridden by subclasses.
     */
  }, {
    key: 'getClassSuffix',
    value: function getClassSuffix() {

      return '';
    }

    /** 
     * Subclasses can override if they need to implement custom rendering.
     */
  }, {
    key: 'renderChildren',
    value: function renderChildren() {

      return '';
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2['default'].createElement(
        'div',
        { className: BASE_CLASS_NAME + this.getClassSuffix(), style: this.props.style },
        _react2['default'].createElement('svg', { ref: 'chart', className: 'wrapper' }),
        this.renderChildren()
      );
    }
  }]);

  return PanoramaChart;
})(_react2['default'].Component);

exports['default'] = PanoramaChart;
module.exports = exports['default'];

},{"react":"react"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/main.jsx":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _AppJsx = require('./App.jsx');

var _AppJsx2 = _interopRequireDefault(_AppJsx);

_reactDom2['default'].render(_react2['default'].createElement(_AppJsx2['default'], null), document.getElementById('app-container'));

},{"./App.jsx":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/App.jsx","react":"react","react-dom":"react-dom"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/stores/CommodityStore.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _events = require('events');

var _utilsAppDispatcher = require('../utils/AppDispatcher');

var _utilsAppDispatcher2 = _interopRequireDefault(_utilsAppDispatcher);

var _utilsAppActionCreator = require('../utils/AppActionCreator');

var _utilsCartoDBLoader = require('../utils/CartoDBLoader');

var _utilsCartoDBLoader2 = _interopRequireDefault(_utilsCartoDBLoader);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var PLACEHOLDER_VALUE = 'TODO';

var CommodityStore = {

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
	dataLoader: _utilsCartoDBLoader2['default'],

	loadInitialData: function loadInitialData(state) {
		var _this = this;

		this.dataLoader.query([{
			query: "SELECT * FROM commodities",
			format: "JSON"
		}, {
			query: "SELECT * FROM commodities_lookup",
			format: "JSON"
		}, {
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
		}, {
			query: "SELECT * FROM total_tonnage",
			format: "JSON"
		}]).then(function () {

			_this.setData(_lodash2['default'].merge(_this.parseData.apply(_this, arguments), {
				selectedCanal: state.selectedCanal,
				selectedYear: state.selectedYear,
				selectedCommodity: state.selectedCommodity
			}));
		}, function (error) {

			// TODO: handle this.
			console.error("Commodity received error:", error);
			throw error;
		});
	},

	/**
  * Set the selected canal for the whole application to display.
  */
	setSelectedCanal: function setSelectedCanal(canalId) {

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
	setSelectedYear: function setSelectedYear(year) {

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
	setSelectedCommodity: function setSelectedCommodity(commodityId) {

		this.setData({
			selectedCommodity: parseInt(commodityId)
		});
	},

	getSelectedCanal: function getSelectedCanal() {

		// return deep copy of stored data
		return _lodash2['default'].merge(this.data.canals[this.data.selectedCanal]);
	},

	getSelectedYear: function getSelectedYear() {

		return this.data.selectedYear;
	},

	getAllCanals: function getAllCanals() {

		// return deep copy of stored data
		return _lodash2['default'].merge(this.data.canals);
	},

	getCommoditiesByCanalByYear: function getCommoditiesByCanalByYear() {

		var commoditiesByCanal = this.data.commoditiesByDateByCanal[this.data.selectedCanal];
		if (commoditiesByCanal) {
			// return deep copy of stored data
			return _lodash2['default'].merge(commoditiesByCanal[this.data.selectedYear]);
		} else {
			return null;
		}
	},

	getAllCommodities: function getAllCommodities() {

		// TODO: this may not be performant.
		// Consider memoizing just the data needed for the timeline's OffsetAreaGraph.

		// return deep copy of stored data
		return _lodash2['default'].merge(this.data.commoditiesByDateByCanal);
	},

	setData: function setData(data) {

		if (!data) {
			return;
		}

		var dirty = false;

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

		if (typeof data.selectedCanal !== 'undefined' && data.selectedCanal !== this.data.selectedCanal) {
			this.data.selectedCanal = data.selectedCanal;
			dirty = true;
		}

		if (typeof data.selectedYear !== 'undefined' && data.selectedYear !== this.data.selectedYear) {
			this.data.selectedYear = data.selectedYear;
			dirty = true;
		}

		if (typeof data.selectedCommodity !== 'undefined' && data.selectedCommodity !== this.data.selectedCommodity) {
			this.data.selectedCommodity = data.selectedCommodity;
			dirty = true;
		}

		if (dirty) {
			this.emit(_utilsAppActionCreator.AppActionTypes.storeChanged);
		}
	},

	parseData: function parseData(data) {
		var _this2 = this;

		var commodities = {},
		    canals = {},
		    commoditiesByDateByCanal = {},
		    dataIndex = 0,
		    commoditiesData = data[dataIndex++],
		    commoditiesLookupData = data[dataIndex++],
		    categoryLookupData = data[dataIndex++],
		   
		// canalListData = data[dataIndex++],
		canalsData = data[dataIndex++],
		    totalTonnageData = data[dataIndex++];

		var canal = undefined;
		canalsData.forEach(function (canalData) {

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
				canals[canalData.canal_id] = _lodash2['default'].merge(canals[canalData.canal_id], canal, _this2.mergeTruthyAndZeroes);
			} else {
				canals[canalData.canal_id] = canal;
			}
		});

		var commodity = undefined;
		commoditiesLookupData.forEach(function (commodityLookupData) {

			commodity = {
				id: parseInt(commodityLookupData.comm_id),
				name: commodityLookupData.commodity,
				description: commodityLookupData.description,
				units: commodityLookupData.unit
			};

			if (commodities[commodityLookupData.comm_id]) {
				commodities[commodityLookupData.comm_id] = _lodash2['default'].merge(commodities[commodityLookupData.comm_id], commodity, _this2.mergeTruthyAndZeroes);
			} else {
				commodities[commodityLookupData.comm_id] = commodity;
			}
		});

		var canalMap = undefined,
		    yearMap = undefined,
		    commoditiesMap = undefined,
		    commodityCategories = undefined,
		    categoryMap = undefined,
		    commoditiesInCategory = undefined;
		commoditiesData.forEach(function (commodityData) {

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
				value: parseFloat(commodityData.value.replace(/,/g, '')),
				normalizedValue: parseFloat(commodityData.tons.replace(/,/g, ''))
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
				value: parseFloat(commodityData.value.replace(/,/g, '')),
				normalizedValue: parseFloat(commodityData.tons.replace(/,/g, ''))
			});
		});

		// map tonnage by canal by year.
		// this map is not returned as-is,
		// but is pulled into commoditiesByDateByCanal below.
		var totalTonnageMap = {},
		    tonnageCanalMap = undefined;
		totalTonnageData.forEach(function (tonnageByDateAndCanal) {

			if (!totalTonnageMap[tonnageByDateAndCanal.canal_id]) {
				totalTonnageMap[tonnageByDateAndCanal.canal_id] = {};
			}
			tonnageCanalMap = totalTonnageMap[tonnageByDateAndCanal.canal_id];

			tonnageCanalMap[tonnageByDateAndCanal.year] = parseFloat(tonnageByDateAndCanal.total.replace(/,/g, ''));
		});

		// map category names by id.
		// this map is not returned as-is,
		// but is pulled into commoditiesByDateByCanal below.
		var categoriesById = {};
		categoryLookupData.forEach(function (categoryData) {
			categoriesById[categoryData.cat_id] = categoryData.category;
		});

		// for each canal-year:
		// - fill in totalNormalizedValue
		// - fill in name and aggregateNormalizedValue for each commodityCategory and sort
		var categoryName = undefined,
		    commoditiesByYear = undefined;
		_lodash2['default'].forOwn(commoditiesByDateByCanal, function (canal, canalId) {
			_lodash2['default'].forOwn(canal, function (yearMap, year) {

				tonnageCanalMap = totalTonnageMap[canalId];
				if (tonnageCanalMap && tonnageCanalMap[year]) {
					yearMap.totalNormalizedValue = parseInt(tonnageCanalMap[year]);
				}

				commoditiesByYear = yearMap.commodities;
				_lodash2['default'].forOwn(yearMap.commodityCategories, function (categoryMap, categoryId) {

					categoryName = categoriesById[categoryId];
					if (!categoryName) {
						console.warn('Found commodity category id with no corresponding name:', categoryId);
					} else {
						categoryMap.name = categoryName;
					}

					// sum and store `normalizedValue` of each commodity type within category
					categoryMap.aggregateNormalizedValue = categoryMap.commodities.reduce(function (val, commodity) {
						return val + commodity.normalizedValue;
					}, 0);

					// sort commodity types by tonnage
					categoryMap.commodities = categoryMap.commodities.sort(function (a, b) {
						return a.normalizedValue < b.normalizedValue;
					});
				});

				// sort commodity categories by aggregateNormalizedValue of each
				yearMap.commodityCategories = Object.keys(yearMap.commodityCategories).sort(function (a, b) {
					return yearMap.commodityCategories[a].aggregateNormalizedValue < yearMap.commodityCategories[b].aggregateNormalizedValue;
				}).reduce(function (out, categoryKey) {
					out[categoryKey] = yearMap.commodityCategories[categoryKey];
					return out;
				}, {});
				// yearMap.commodityCategories = new Map(Array.from(yearMap.commodityCategories.entries()).sort((a, b) => {
				// 	return a[1].aggregateNormalizedValue < b[1].aggregateNormalizedValue;
				// })));
			});
		});

		var returnData = {
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
	validateData: function validateData(data) {

		data.canals.forEach(function (canal, canalId) {

			Object.keys(canal).forEach(function (key) {
				if (canal[key] === PLACEHOLDER_VALUE) {
					console.warn('No value for ' + key + ' in canal \'' + canal.name + '\'.');
				}
			});
		});
	},

	/**
  * Avoid overwriting with falsy values (but let zeroes through).
  * For use with e.g. _.merge().
  */
	mergeTruthyAndZeroes: function mergeTruthyAndZeroes(a, b) {

		if (b === 0 || b === '0' || b) {
			return b;
		} else {
			return a;
		}
	}

};

// Mixin EventEmitter functionality
Object.assign(CommodityStore, _events.EventEmitter.prototype);

// Register callback to handle all updates
_utilsAppDispatcher2['default'].register(function (action) {

	switch (action.type) {

		case _utilsAppActionCreator.AppActionTypes.loadInitialData:
			CommodityStore.loadInitialData(action.state);
			break;

		case _utilsAppActionCreator.AppActionTypes.canalSelected:
			CommodityStore.setSelectedCanal(action.value);
			break;

		case _utilsAppActionCreator.AppActionTypes.yearSelected:
			CommodityStore.setSelectedYear(action.value);
			break;

		case _utilsAppActionCreator.AppActionTypes.commoditySelected:
			CommodityStore.setSelectedCommodity(action.value);
			break;

	}

	return true;
});

exports['default'] = CommodityStore;
module.exports = exports['default'];

},{"../utils/AppActionCreator":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/utils/AppActionCreator.js","../utils/AppDispatcher":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/utils/AppDispatcher.js","../utils/CartoDBLoader":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/utils/CartoDBLoader.js","events":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/node_modules/events/events.js","lodash":"lodash"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/utils/AppActionCreator.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AppDispatcher = require('./AppDispatcher');

var _AppDispatcher2 = _interopRequireDefault(_AppDispatcher);

var AppActionTypes = {

	// Note: stores emit this type of event.
	// Though it is not actually an Action type,
	// it's enumerated here for ease of access.
	storeChanged: 'storeChanged',

	loadInitialData: 'loadInitialData',
	canalSelected: 'canalSelected',
	yearSelected: 'yearSelected',
	commoditySelected: 'commoditySelected'

};

exports.AppActionTypes = AppActionTypes;
var AppActions = {

	/**
  * Load data needed by the application on init.
  */
	loadInitialData: function loadInitialData(state) {
		_AppDispatcher2['default'].dispatch({
			type: AppActionTypes.loadInitialData,
			state: state
		});
	},

	canalSelected: function canalSelected(canal) {
		_AppDispatcher2['default'].dispatch({
			type: AppActionTypes.canalSelected,
			value: canal
		});
	},

	yearSelected: function yearSelected(year) {
		_AppDispatcher2['default'].dispatch({
			type: AppActionTypes.yearSelected,
			value: year
		});
	},

	commoditySelected: function commoditySelected(commodity, canal, year) {
		_AppDispatcher2['default'].dispatch({
			type: AppActionTypes.commoditySelected,
			value: commodity
		});
	}

};
exports.AppActions = AppActions;

},{"./AppDispatcher":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/utils/AppDispatcher.js"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/utils/AppDispatcher.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _flux = require('flux');

exports['default'] = new _flux.Dispatcher();
module.exports = exports['default'];

},{"flux":"flux"}],"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/utils/CartoDBLoader.js":[function(require,module,exports){
/*
 * TODO: Move this into @panorama/toolkit.
 * 
 * Consider pulling cartodb-client into this and packaging the whole thing as a component,
 * leaving `query` as the only public method.
 * 
 * Also, note this is pretty similar to https://www.npmjs.com/package/cartodb already >.<
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

var _basemapsCartodbConfigJson = require('../../basemaps/cartodb/config.json');

var _basemapsCartodbConfigJson2 = _interopRequireDefault(_basemapsCartodbConfigJson);

var _cartodbClient = require('cartodb-client');

var _cartodbClient2 = _interopRequireDefault(_cartodbClient);

var cartoDBClient = new _cartodbClient2['default'](_basemapsCartodbConfigJson2['default'].userId);

var CartoDBLoader = {

	/** Use `queue-async` to defer() up an array of queries,
  * and return a Promise that is resolved when all requests have completed.
  * Accepts a list of objects formatted as { query, format }.
  */
	query: function query(queryConfigs) {
		var _this = this;

		return new Promise(function (resolve, reject) {

			// Run up to 3 requests in parallel
			var queue = (0, _queueAsync2['default'])(3);
			queryConfigs.forEach(function (queryConfig) {
				queue.defer(_this.request, queryConfig);
			});

			queue.awaitAll(function (error) {
				for (var _len = arguments.length, responses = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					responses[_key - 1] = arguments[_key];
				}

				if (error) {
					reject(error);
				} else {
					resolve.apply(undefined, responses);
				}
			});
		});
	},

	request: function request(queryConfig, callback) {

		cartoDBClient.sqlRequest(queryConfig.query, function (err, response) {
			if (!err) {
				callback(null, response.rows);
			} else {
				callback(err);
			}
		}, {
			'format': queryConfig.format,
			'dangerouslyExposedAPIKey': _basemapsCartodbConfigJson2['default'].apiKey
		});
	}

};

exports['default'] = CartoDBLoader;
module.exports = exports['default'];

},{"../../basemaps/cartodb/config.json":"/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/basemaps/cartodb/config.json","cartodb-client":"cartodb-client","queue-async":"queue-async"}]},{},["/Users/ericsoco/Documents/clients/stamen/git/richmondatlas-canals/src/main.jsx"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJiYXNlbWFwcy9jYXJ0b2RiL2Jhc2VtYXBzLmpzb24iLCJiYXNlbWFwcy9jYXJ0b2RiL2NvbmZpZy5qc29uIiwiYmFzZW1hcHMvdGlsZUxheWVycy5qc29uIiwibm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJub2RlX21vZHVsZXMva290by9kaXN0L2tvdG8uanMiLCIvVXNlcnMvZXJpY3NvY28vRG9jdW1lbnRzL2NsaWVudHMvc3RhbWVuL2dpdC9yaWNobW9uZGF0bGFzLWNhbmFscy9zcmMvQXBwLmpzeCIsIi9Vc2Vycy9lcmljc29jby9Eb2N1bWVudHMvY2xpZW50cy9zdGFtZW4vZ2l0L3JpY2htb25kYXRsYXMtY2FuYWxzL3NyYy9jb21wb25lbnRzL0FyZWFDaGFydC9BcmVhQ2hhcnQuanN4IiwiL1VzZXJzL2VyaWNzb2NvL0RvY3VtZW50cy9jbGllbnRzL3N0YW1lbi9naXQvcmljaG1vbmRhdGxhcy1jYW5hbHMvc3JjL2NvbXBvbmVudHMvQ2FuYWxEZXRhaWxQYW5lbC5qc3giLCIvVXNlcnMvZXJpY3NvY28vRG9jdW1lbnRzL2NsaWVudHMvc3RhbWVuL2dpdC9yaWNobW9uZGF0bGFzLWNhbmFscy9zcmMvY29tcG9uZW50cy9DYXJ0b0RCVGlsZUxheWVyLmpzeCIsIi9Vc2Vycy9lcmljc29jby9Eb2N1bWVudHMvY2xpZW50cy9zdGFtZW4vZ2l0L3JpY2htb25kYXRsYXMtY2FuYWxzL3NyYy9jb21wb25lbnRzL0NoYXJ0U2xpZGVyL0NoYXJ0U2xpZGVyLmpzeCIsIi9Vc2Vycy9lcmljc29jby9Eb2N1bWVudHMvY2xpZW50cy9zdGFtZW4vZ2l0L3JpY2htb25kYXRsYXMtY2FuYWxzL3NyYy9jb21wb25lbnRzL0l0ZW1TZWxlY3Rvci9JdGVtU2VsZWN0b3IuanN4IiwiL1VzZXJzL2VyaWNzb2NvL0RvY3VtZW50cy9jbGllbnRzL3N0YW1lbi9naXQvcmljaG1vbmRhdGxhcy1jYW5hbHMvc3JjL2NvbXBvbmVudHMvT2Zmc2V0QXJlYUNoYXJ0L09mZnNldEFyZWFDaGFydC5qc3giLCIvVXNlcnMvZXJpY3NvY28vRG9jdW1lbnRzL2NsaWVudHMvc3RhbWVuL2dpdC9yaWNobW9uZGF0bGFzLWNhbmFscy9zcmMvY29tcG9uZW50cy9QdW5jaGNhcmQvUHVuY2hjYXJkLmpzeCIsIi9Vc2Vycy9lcmljc29jby9Eb2N1bWVudHMvY2xpZW50cy9zdGFtZW4vZ2l0L3JpY2htb25kYXRsYXMtY2FuYWxzL3NyYy9jb21wb25lbnRzL2NoYXJ0cy9BeGlzLmpzIiwiL1VzZXJzL2VyaWNzb2NvL0RvY3VtZW50cy9jbGllbnRzL3N0YW1lbi9naXQvcmljaG1vbmRhdGxhcy1jYW5hbHMvc3JjL2NvbXBvbmVudHMvY2hhcnRzL0NoYXJ0QmFzZS5qcyIsIi9Vc2Vycy9lcmljc29jby9Eb2N1bWVudHMvY2xpZW50cy9zdGFtZW4vZ2l0L3JpY2htb25kYXRsYXMtY2FuYWxzL3NyYy9jb21wb25lbnRzL2NoYXJ0cy9QYW5vcmFtYUNoYXJ0LmpzeCIsIi9Vc2Vycy9lcmljc29jby9Eb2N1bWVudHMvY2xpZW50cy9zdGFtZW4vZ2l0L3JpY2htb25kYXRsYXMtY2FuYWxzL3NyYy9tYWluLmpzeCIsIi9Vc2Vycy9lcmljc29jby9Eb2N1bWVudHMvY2xpZW50cy9zdGFtZW4vZ2l0L3JpY2htb25kYXRsYXMtY2FuYWxzL3NyYy9zdG9yZXMvQ29tbW9kaXR5U3RvcmUuanMiLCIvVXNlcnMvZXJpY3NvY28vRG9jdW1lbnRzL2NsaWVudHMvc3RhbWVuL2dpdC9yaWNobW9uZGF0bGFzLWNhbmFscy9zcmMvdXRpbHMvQXBwQWN0aW9uQ3JlYXRvci5qcyIsIi9Vc2Vycy9lcmljc29jby9Eb2N1bWVudHMvY2xpZW50cy9zdGFtZW4vZ2l0L3JpY2htb25kYXRsYXMtY2FuYWxzL3NyYy91dGlscy9BcHBEaXNwYXRjaGVyLmpzIiwiL1VzZXJzL2VyaWNzb2NvL0RvY3VtZW50cy9jbGllbnRzL3N0YW1lbi9naXQvcmljaG1vbmRhdGxhcy1jYW5hbHMvc3JjL3V0aWxzL0NhcnRvREJMb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFDckUsVUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7QUFFdkUsVUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM5QyxVQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztBQUVoRCxVQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FFdkY7OztXQUVZLHNCQUFDLElBQUksRUFBRTs7O0FBRWxCLFVBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ25ELFVBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7O0FBSXBELFVBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDO2VBQUksTUFBSyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQUEsQ0FBQyxDQUFDLENBQUM7QUFDbkUsVUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxN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cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHM9e1wibmFtZVwiOlwiUGFub3JhbWFCYXNlbWFwXCIsXCJ2ZXJzaW9uXCI6XCIwLjAuMVwiLFwibGF5ZXJncm91cFwiOntcInZlcnNpb25cIjpcIjEuMy4wXCIsXCJsYXllcnNcIjpbe1widHlwZVwiOlwibWFwbmlrXCIsXCJvcHRpb25zXCI6e1wic3FsXCI6XCJTRUxFQ1QgKiBGUk9NIHVuaWZpZWRfYmFzZW1hcF9sYXllcnMgT1JERVIgQlkgb3JkXFxuXCIsXCJjYXJ0b2Nzc1wiOlwiQHdhdGVyOiAjZGRlOWU5O1xcbkB3YXRlcmxpbmVzOiAjYWFjY2NjO1xcbkBsYW5kOiAjZjlmOWY5O1xcblxcbk1hcCB7XFxuICBidWZmZXItc2l6ZTogMTI4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogQHdhdGVyO1xcbn1cXG5cXG4jdW5pZmllZF9iYXNlbWFwX2xheWVyc1tsYXllcj0nbmVfMTBtX2NvYXN0bGluZV8yMTYzJ117XFxuICBsaW5lLWNvbG9yOiBAd2F0ZXJsaW5lcztcXG4gIGxpbmUtd2lkdGg6IDAuNzU7XFxuICBsaW5lLW9wYWNpdHk6IDE7XFxuICBsaW5lLWpvaW46IHJvdW5kO1xcbiAgbGluZS1jYXA6IHJvdW5kO1xcbn1cXG5cXG4jdW5pZmllZF9iYXNlbWFwX2xheWVyc1tsYXllcj0nbmVfMTBtX2xha2VzXzIxNjMnXSB7XFxuICBsaW5lLWNvbG9yOiBAd2F0ZXJsaW5lcztcXG4gIGxpbmUtd2lkdGg6IDIuNTtcXG4gIGxpbmUtb3BhY2l0eTogMTtcXG4gIGxpbmUtam9pbjogcm91bmQ7XFxuICBsaW5lLWNhcDogcm91bmQ7XFxuXFxuICAvKiBTb2Z0ZW4gbGluZXMgYXQgbG93ZXIgem9vbXMgKi9cXG4gIFt6b29tPD03XSB7XFxuICAgIGxpbmUtd2lkdGg6IDIuNTtcXG4gICAgbGluZS1jb2xvcjogbGlnaHRlbihkZXNhdHVyYXRlKCNhYWNjY2MsMiUpLDIlKTtcXG4gIH1cXG4gIFt6b29tPD01XSB7XFxuICAgIGxpbmUtd2lkdGg6IDEuNTtcXG4gICAgbGluZS1jb2xvcjogbGlnaHRlbihkZXNhdHVyYXRlKCNhYWNjY2MsNSUpLDUlKTtcXG4gIH1cXG5cXG4gIC8qIFNlcGFyYXRlIGF0dGFjaG1lbnQgYmVjYXVzZSBzZWFtcyAqL1xcbiAgOjpmaWxsIHtcXG4gICAgcG9seWdvbi1maWxsOiBAd2F0ZXI7XFxuICAgIHBvbHlnb24tb3BhY2l0eTogMTtcXG4gIH1cXG5cXG4gIC8qIFJlbW92ZSBzbWFsbCBsYWtlcyBhdCBsb3dlciB6b29tcyAqL1xcbiAgW3NjYWxlcmFuaz4zXVt6b29tPD01XSB7XFxuICAgIDo6ZmlsbCB7XFxuICAgICAgcG9seWdvbi1vcGFjaXR5OiAwO1xcbiAgICB9XFxuICAgIGxpbmUtb3BhY2l0eTogMDtcXG4gIH1cXG4gIFtzY2FsZXJhbms+Nl1bem9vbTw9N10ge1xcbiAgICA6OmZpbGwge1xcbiAgICAgIHBvbHlnb24tb3BhY2l0eTogMDtcXG4gICAgfVxcbiAgICBsaW5lLW9wYWNpdHk6IDA7XFxuICB9XFxufVxcblxcbiN1bmlmaWVkX2Jhc2VtYXBfbGF5ZXJzW2xheWVyPSduZV8xMG1fcml2ZXJzX2xha2VfY2VudGVybGluZXNfMjE2MyddIHtcXG4gIGxpbmUtY29sb3I6IEB3YXRlcmxpbmVzO1xcbiAgbGluZS13aWR0aDogMS41O1xcbiAgbGluZS1vcGFjaXR5OiAxO1xcbiAgbGluZS1qb2luOiByb3VuZDtcXG4gIGxpbmUtY2FwOiByb3VuZDtcXG5cXG4gIFtuYW1lPSdNaXNzaXNzaXBwaSddLFxcbiAgW25hbWU9J1N0LiBMYXdyZW5jZSddLFxcbiAgW25hbWU9J0NvbHVtYmlhJ10sXFxuICBbbmFtZT0nT2hpbyddLFxcbiAgW25hbWU9J0h1ZHNvbiddLFxcbiAgW25hbWU9J01pc3NvdXJpJ10sXFxuICBbbmFtZT0nUmlvIEdyYW5kZSddIHtcXG4gICAgbGluZS13aWR0aDogNDtcXG4gIH1cXG4gIFt6b29tPD04XVtuYW1lPSdNaXNzaXNzaXBwaSddLFxcbiAgW3pvb208PThdW25hbWU9J1N0LiBMYXdyZW5jZSddLFxcbiAgW3pvb208PThdW25hbWU9J0NvbHVtYmlhJ10sXFxuICBbem9vbTw9OF1bbmFtZT0nT2hpbyddLFxcbiAgW3pvb208PThdW25hbWU9J0h1ZHNvbiddLFxcbiAgW3pvb208PThdW25hbWU9J01pc3NvdXJpJ10sXFxuICBbem9vbTw9OF1bbmFtZT0nUmlvIEdyYW5kZSddIHtcXG4gICAgbGluZS13aWR0aDogMjtcXG4gIH1cXG4gIFt6b29tPD04XVtuYW1lIT0nTWlzc2lzc2lwcGknXVtuYW1lIT0nU3QuIExhd3JlbmNlJ11bbmFtZSE9J1JpbyBHcmFuZGUnXVtuYW1lIT0nT2hpbyddW25hbWUhPSdIdWRzb24nXVtuYW1lIT0nQ29sdW1iaWEnXVtuYW1lIT0nTWlzc291cmknXSxcXG4gIFt6b29tPD02XVtuYW1lPSdNaXNzaXNzaXBwaSddLFxcbiAgW3pvb208PTZdW25hbWU9J0NvbHVtYmlhJ10sXFxuICBbem9vbTw9Nl1bbmFtZT0nT2hpbyddLFxcbiAgW3pvb208PTZdW25hbWU9J0h1ZHNvbiddLFxcbiAgW3pvb208PTZdW25hbWU9J01pc3NvdXJpJ10sXFxuICBbem9vbTw9Nl1bbmFtZT0nUmlvIEdyYW5kZSddIHtcXG4gICAgbGluZS13aWR0aDogMTtcXG4gICAgbGluZS1jb2xvcjogbGlnaHRlbihkZXNhdHVyYXRlKEB3YXRlcmxpbmVzLDIlKSwyJSk7XFxuXFxuICB9XFxuICBbem9vbT49N11bbmFtZSE9J01pc3Npc3NpcHBpJ11bbmFtZSE9J1N0LiBMYXdyZW5jZSddW25hbWUhPSdSaW8gR3JhbmRlJ11bbmFtZSE9J09oaW8nXVtuYW1lIT0nSHVkc29uJ11bbmFtZSE9J0NvbHVtYmlhJ11bbmFtZSE9J01pc3NvdXJpJ106OmxhYmVscyxcXG4gIFt6b29tPj01XVtuYW1lPSdNaXNzaXNzaXBwaSddOjpsYWJlbHMsXFxuICBbem9vbT49NV1bbmFtZT0nQ29sdW1iaWEnXTo6bGFiZWxzLFxcbiAgW3pvb20+PTVdW25hbWU9J09oaW8nXTo6bGFiZWxzLFxcbiAgW3pvb20+PTVdW25hbWU9J0h1ZHNvbiddOjpsYWJlbHMsXFxuICBbem9vbT49NV1bbmFtZT0nTWlzc291cmknXTo6bGFiZWxzLFxcbiAgW3pvb20+PTVdW25hbWU9J1JpbyBHcmFuZGUnXTo6bGFiZWxzIHtcXG4gICAgdGV4dC1uYW1lOiBbbmFtZV07XFxuICAgIHRleHQtZmFjZS1uYW1lOiAnRGVqYVZ1IFNhbnMgT2JsaXF1ZSc7XFxuICAgIHRleHQtZmlsbDogQHdhdGVybGluZXM7XFxuICAgIHRleHQtcGxhY2VtZW50OiBsaW5lO1xcbiAgICB0ZXh0LWhhbG8tZmlsbDogQGxhbmQ7XFxuICAgIHRleHQtaGFsby1yYWRpdXM6IDEuNTtcXG4gICAgdGV4dC1zaXplOiAxMDtcXG4gICAgdGV4dC1keTogLTg7XFxuICAgIHRleHQtY2hhcmFjdGVyLXNwYWNpbmc6IDI7XFxuICAgIHRleHQtc3BhY2luZzogMTAwO1xcbiAgICB0ZXh0LW1pbi1kaXN0YW5jZTogMTAwO1xcbiAgfVxcblxcbiAgW3pvb208PTZdW25hbWUhPSdNaXNzaXNzaXBwaSddW25hbWUhPSdTdC4gTGF3cmVuY2UnXVtuYW1lIT0nUmlvIEdyYW5kZSddW25hbWUhPSdPaGlvJ11bbmFtZSE9J0h1ZHNvbiddW25hbWUhPSdDb2x1bWJpYSddW25hbWUhPSdNaXNzb3VyaSddIHtcXG4gICAgbGluZS13aWR0aDogMC41O1xcbiAgICBsaW5lLWNvbG9yOiBsaWdodGVuKGRlc2F0dXJhdGUoQHdhdGVybGluZXMsNSUpLDUlKTtcXG4gIH1cXG4gIFt6b29tPD01XVtuYW1lIT0nTWlzc2lzc2lwcGknXVtuYW1lIT0nU3QuIExhd3JlbmNlJ11bbmFtZSE9J1JpbyBHcmFuZGUnXVtuYW1lIT0nT2hpbyddW25hbWUhPSdIdWRzb24nXVtuYW1lIT0nQ29sdW1iaWEnXVtuYW1lIT0nTWlzc291cmknXSB7XFxuICAgIGxpbmUtd2lkdGg6IDA7XFxuICB9XFxuICBbem9vbTw9NV1bbmFtZT0nTWlzc2lzc2lwcGknXSxcXG4gIFt6b29tPD01XVtuYW1lPSdTdC4gTGF3cmVuY2UnXSxcXG4gIFt6b29tPD01XVtuYW1lPSdDb2x1bWJpYSddLFxcbiAgW3pvb208PTVdW25hbWU9J09oaW8nXSxcXG4gIFt6b29tPD01XVtuYW1lPSdIdWRzb24nXSxcXG4gIFt6b29tPD01XVtuYW1lPSdNaXNzb3VyaSddLFxcbiAgW3pvb208PTVdW25hbWU9J1JpbyBHcmFuZGUnXSB7XFxuICAgIGxpbmUtd2lkdGg6IDAuNTtcXG4gICAgbGluZS1jb2xvcjogbGlnaHRlbihkZXNhdHVyYXRlKEB3YXRlcmxpbmVzLDIlKSwyJSk7XFxuICB9XFxufVxcblxcbiN1bmlmaWVkX2Jhc2VtYXBfbGF5ZXJzW2xheWVyPSduZV8xMG1fYWRtaW5fMF9jb3VudHJpZXNfbGFrZXNfMjE2MyddIHtcXG5cXG4gIGxpbmUtY29sb3I6IEBsYW5kO1xcbiAgbGluZS13aWR0aDogMTtcXG4gIGxpbmUtb3BhY2l0eTogMTtcXG4gIGxpbmUtam9pbjogcm91bmQ7XFxuICBsaW5lLWNhcDogcm91bmQ7XFxuICBwb2x5Z29uLWZpbGw6IEBsYW5kO1xcbiAgcG9seWdvbi1vcGFjaXR5OiAxO1xcblxcbn1cXG5cIixcImNhcnRvY3NzX3ZlcnNpb25cIjpcIjIuMS4xXCJ9fSx7XCJ0eXBlXCI6XCJtYXBuaWtcIixcIm9wdGlvbnNcIjp7XCJzcWxcIjpcIlNFTEVDVCBjYXJ0b2RiX2lkLCBuYW1lLCBvcGVuZWQsIFNUX1RyYW5zZm9ybSh0aGVfZ2VvbV93ZWJtZXJjYXRvciwyMTYzKSBhcyB0aGVfZ2VvbV93ZWJtZXJjYXRvciBGUk9NIGNhbmFsc1xcblwiLFwiY2FydG9jc3NcIjpcIiNjYW5hbHN7XFxuICBbem9vbTw9N10ge1xcbiAgICBsaW5lLXNpbXBsaWZ5OiA1O1xcbiAgfVxcbiAgbGluZS1jb2xvcjogIzRjMzk1ZTtcXG4gIGxpbmUtd2lkdGg6IDEuNTtcXG4gIGxpbmUtY2FwOiByb3VuZDtcXG4gIGxpbmUtam9pbjogcm91bmQ7XFxuICAvKlxcbiAgW29wZW5lZCA+IDE4NDBdIHtcXG4gICAgbGluZS1jb2xvcjogI2YwOTtcXG4gIH1cXG4gICovXFxuXFxuLypcXG4gIFtuYW1lID0gJ0VyaWUgQ2FuYWwnXTo6aGlnaGxpZ2h0IHtcXG4gICAgbGluZS1jb2xvcjogeWVsbG93O1xcbiAgICBsaW5lLXdpZHRoOiAxMDtcXG4gICAgb3BhY2l0eTogMC4yO1xcbiAgICBsaW5lLWNhcDogcm91bmQ7XFxuICAgIGxpbmUtam9pbjogcm91bmQ7XFxuICB9XFxuKi9cXG5cXG4gIFtuYW1lID0gJ0VyaWUgQ2FuYWwnXSB7XFxuICAgIGxpbmUtd2lkdGg6IDU7XFxuICB9XFxuXFxuICBbem9vbTw9N10geyBsaW5lLXNpbXBsaWZ5OiA1OyB9XFxuICBbem9vbTw9Nl0geyBsaW5lLXNpbXBsaWZ5OiAxMDt9XFxuICBbem9vbTw9NV0geyBsaW5lLXNpbXBsaWZ5OiAxNTt9XFxufVxcblwiLFwiY2FydG9jc3NfdmVyc2lvblwiOlwiMi4xLjFcIn19LHtcInR5cGVcIjpcIm1hcG5pa1wiLFwib3B0aW9uc1wiOntcInNxbFwiOlwiU0VMRUNUIGNhcnRvZGJfaWQsIGxhdDo6ZmxvYXQsIGxvbmc6OmZsb2F0LCBTVF9UcmFuc2Zvcm0odGhlX2dlb20sMjE2MykgYXMgdGhlX2dlb21fd2VibWVyY2F0b3IsIHN0YXJ0LCBzdGF0ZSwgdG93biwgcmFuayBGUk9NIGNhbmFsX3Rvd25zXFxuXCIsXCJjYXJ0b2Nzc1wiOlwiQHRleHRjb2xvcjogIzY2NjtcXG5AaGFsb2NvbG9yOiAjZjlmOWY5O1xcblxcbk1hcCB7XFxuICBidWZmZXItc2l6ZTogMTI4O1xcbn1cXG5cXG4jY2FuYWxzX2NpdGllc19iYXNlbWFwW3Jhbms9MV1bem9vbT49NV0sXFxuI2NhbmFsc19jaXRpZXNfYmFzZW1hcFtyYW5rPTJdW3pvb20+PTZdLFxcbiNjYW5hbHNfY2l0aWVzX2Jhc2VtYXBbcmFuaz49M11bem9vbT49OF17XFxuICAvLyBOb3RlOiBoYXZlIHRvIHVzZSBtYXJrZXJzIG5vdCBzaGllbGRzIHRvIGNoYW5nZSBzdmcgY29sb3JcXG4gIDo6aGFsbyB7XFxuICAgIG1hcmtlci1wbGFjZW1lbnQ6IHBvaW50O1xcbiAgICBtYXJrZXItZmlsbC1vcGFjaXR5OiAxO1xcbiAgICBtYXJrZXItbGluZS13aWR0aDogMDtcXG4gICAgbWFya2VyLXR5cGU6IGVsbGlwc2U7XFxuICAgIG1hcmtlci13aWR0aDogOTtcXG4gICAgbWFya2VyLWZpbGw6IEBoYWxvY29sb3I7XFxuICB9XFxuICBtYXJrZXItZmlsbC1vcGFjaXR5OiAwLjk7XFxuICBtYXJrZXItbGluZS1jb2xvcjogQGhhbG9jb2xvcjtcXG4gIG1hcmtlci1saW5lLXdpZHRoOiAxLjU7XFxuICBtYXJrZXItbGluZS1vcGFjaXR5OiAxO1xcbiAgbWFya2VyLXBsYWNlbWVudDogcG9pbnQ7XFxuICAvL21hcmtlci10eXBlOiBlbGxpcHNlO1xcbiAgbWFya2VyLWZpbGU6IHVybCgnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL21hcGJveC9tYWtpL21iLXBhZ2VzL3NyYy9jaXJjbGUtMTIuc3ZnJyk7XFxuICBtYXJrZXItd2lkdGg6IDY7XFxuICBtYXJrZXItZmlsbDogQHRleHRjb2xvcjtcXG5cXG4gIG1hcmtlci1hbGxvdy1vdmVybGFwOiB0cnVlO1xcbn1cXG5cXG5AZGVmYXVsdF9zaXplOiA5O1xcbkB4X2Rpc3RhbmNlX3Bvc2l0aXZlOiAzO1xcbkB5X2Rpc3RhbmNlX3Bvc2l0aXZlOiAzO1xcbkB4X2Rpc3RhbmNlX25lZ2F0aXZlOiAtMztcXG5AeV9kaXN0YW5jZV9uZWdhdGl2ZTogLTM7XFxuXFxuI2NhbmFsc19jaXRpZXNfYmFzZW1hcFtyYW5rPTFdW3pvb20+PTVdOjpsYWJlbHMsXFxuI2NhbmFsc19jaXRpZXNfYmFzZW1hcFtyYW5rPTJdW3pvb20+PTZdOjpsYWJlbHMsXFxuI2NhbmFsc19jaXRpZXNfYmFzZW1hcFtyYW5rPj0zXVt6b29tPj04XTo6bGFiZWxzLCB7XFxuXFxuICB0ZXh0LW5hbWU6IFt0b3duXTtcXG4gIHRleHQtZmFjZS1uYW1lOiAnRGVqYVZ1IFNhbnMgQm9vayc7XFxuICB0ZXh0LXNpemU6IEBkZWZhdWx0X3NpemU7XFxuICBbem9vbT49Nl1bcmFuaz0xXSB7XFxuICAgIHRleHQtc2l6ZTogQGRlZmF1bHRfc2l6ZSArIDM7XFxuICB9XFxuICB0ZXh0LWxhYmVsLXBvc2l0aW9uLXRvbGVyYW5jZTogMDtcXG4gIHRleHQtZmlsbDogQHRleHRjb2xvcjtcXG4gIHRleHQtaGFsby1maWxsOiBAaGFsb2NvbG9yO1xcbiAgdGV4dC1oYWxvLXJhZGl1czogMS41O1xcbiAgLy8gRGVmYXVsdCBpcyB1cHBlciByaWdodCBmcm9tIGRvdFxcbiAgdGV4dC1keTogQHlfZGlzdGFuY2VfbmVnYXRpdmU7XFxuICB0ZXh0LWR4OiBAeF9kaXN0YW5jZV9wb3NpdGl2ZTtcXG5cXG4gIC8vIExhYmVscyB0byBmbG9hdCBsZWZ0IGluc3RlYWRcXG4gIFtzdGF0ZT0nSWxsaW5vaXMnXSxcXG4gIFtzdGF0ZT0nSW5kaWFuYSddLFxcbiAgW3N0YXRlPSdPaGlvJ11bdG93biE9J0NpbmNpbm5hdGknXSxcXG4gIFt0b3duPSdCZWxsZWZvbnRlJ10sXFxuICBbdG93bj0nUGl0dHNidXJnaCddLFxcbiAgW3Rvd249J1JvY2hlc3RlciddLFxcbiAgW3Rvd249J05ld2FyayddLFxcbiAgW3Rvd249J09zd2VnbyddLFxcbiAgW3Rvd249J0J1ZmZhbG8nXSxcXG4gIFt0b3duPSdDb3JuaW5nJ10sXFxuICBbdG93bj0nQnJpc3RvbCddLFxcbiAgW3Rvd249J1JlYWRpbmcnXSxcXG4gIFt0b3duPSdCdWNoYW5hbiddIHtcXG4gICAgdGV4dC1keDogQHhfZGlzdGFuY2VfbmVnYXRpdmU7XFxuICB9XFxuXFxuICAvLyBMYWJlbHMgdG8gZmxvYXQgYmVsb3cgZG90XFxuXFxuICBbdG93bj0nTmV3IEJydW5zd2ljayddLFxcbiAgW3Rvd249J0xhIFNhbGxlJ10sXFxuICBbdG93bj0nTGF3cmVuY2VidXJnJ10sXFxuICBbdG93bj0nQWtyb24nXSxcXG4gIFt0b3duPSdBbGJhbnknXSxcXG4gIFt0b3duPSdBdGhlbnMnXSxcXG4gIFt0b3duPSdVdGljYSddLFxcbiAgW3Rvd249J1JlYWRpbmcnXSxcXG4gIFt0b3duPSdCb3JkZW50b3duJ10sXFxuICBbdG93bj0nUGhpbGFkZWxwaGlhJ10sXFxuICBbdG93bj0nTHluY2hidXJnJ10sXFxuICBbdG93bj0nVG9sZWRvJ10sXFxuICBbdG93bj0nUGl0dHNidXJnaCddLFxcbiAgW3Rvd249J0NpbmNpbm5hdGknXSB7XFxuICAgIHRleHQtZHk6IEB5X2Rpc3RhbmNlX3Bvc2l0aXZlO1xcbiAgfVxcblxcbiAgdGV4dC1hbGxvdy1vdmVybGFwOiB0cnVlO1xcbiAgdGV4dC1wbGFjZW1lbnQ6IHBvaW50O1xcbiAgdGV4dC1wbGFjZW1lbnQtdHlwZTogZHVtbXk7XFxuXFxufVwiLFwiY2FydG9jc3NfdmVyc2lvblwiOlwiMi4xLjFcIn19XSxcIm1pbnpvb21cIjoyLFwibWF4em9vbVwiOjl9fVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuXHRcInVzZXJJZFwiOiBcImRpZ2l0YWxzY2hvbGFyc2hpcGxhYlwiLFxuXHRcImFwaUtleVwiOiBcImYzMDdjMjAyNzMyNzRiYTg5N2FlOGVjZTM2ZjNhNTQzYjU5OTJmMjNcIlxufVxuIiwibW9kdWxlLmV4cG9ydHM9e1xuXHRcImxheWVyc1wiOiBbXG5cdFx0e1xuXHRcdFx0XCJ1cmxcIjogXCJodHRwOi8vc20ubWFwc3RhY2suc3RhbWVuLmNvbS9vcGVudGVycmFpbl8yMTYzL3t6fS97eH0ve3l9LnBuZ1wiXG5cdFx0fVxuXHRdXG59XG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbkV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uKG4pIHtcbiAgaWYgKCFpc051bWJlcihuKSB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ24gbXVzdCBiZSBhIHBvc2l0aXZlIG51bWJlcicpO1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGVyLCBoYW5kbGVyLCBsZW4sIGFyZ3MsIGksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHMuZXJyb3IgfHxcbiAgICAgICAgKGlzT2JqZWN0KHRoaXMuX2V2ZW50cy5lcnJvcikgJiYgIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKSB7XG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgICAgfVxuICAgICAgdGhyb3cgVHlwZUVycm9yKCdVbmNhdWdodCwgdW5zcGVjaWZpZWQgXCJlcnJvclwiIGV2ZW50LicpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGhhbmRsZXIpKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNGdW5jdGlvbihoYW5kbGVyKSkge1xuICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgLy8gZmFzdCBjYXNlc1xuICAgICAgY2FzZSAxOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAyOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgICAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBhcmdzID0gbmV3IEFycmF5KGxlbiAtIDEpO1xuICAgIGZvciAoaSA9IDE7IGkgPCBsZW47IGkrKylcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuXG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgdmFyIG07XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCFlbWl0dGVyLl9ldmVudHMgfHwgIWVtaXR0ZXIuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSAwO1xuICBlbHNlIGlmIChpc0Z1bmN0aW9uKGVtaXR0ZXIuX2V2ZW50c1t0eXBlXSkpXG4gICAgcmV0ID0gMTtcbiAgZWxzZVxuICAgIHJldCA9IGVtaXR0ZXIuX2V2ZW50c1t0eXBlXS5sZW5ndGg7XG4gIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gYXJnID09PSB2b2lkIDA7XG59XG4iLCIhZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKHJlcXVpcmUoXCJkM1wiKSk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJkM1wiXSxlKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzLktvdG89ZShyZXF1aXJlKFwiZDNcIikpOnQuS290bz1lKHQuZDMpfSh0aGlzLGZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbih0KXtmdW5jdGlvbiBlKHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtleHBvcnRzOnt9LGlkOnIsbG9hZGVkOiExfTtyZXR1cm4gdFtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxlKSxvLmxvYWRlZD0hMCxvLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIGUubT10LGUuYz1uLGUucD1cIlwiLGUoMCl9KFtmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigxKVtcImRlZmF1bHRcIl0sbz1uKDIpW1wiZGVmYXVsdFwiXSxpPW4oMTcpW1wiZGVmYXVsdFwiXSxzPW4oMjgpW1wiZGVmYXVsdFwiXSxjPW4oNjUpW1wiZGVmYXVsdFwiXSx1PW4oNzUpW1wiZGVmYXVsdFwiXSxhPW4oNzgpW1wiZGVmYXVsdFwiXSxmPW4oODIpW1wiZGVmYXVsdFwiXTtlLl9fZXNNb2R1bGU9ITA7dmFyIGw9big4MyksaD1mKGwpLHA9big4NCksZD1mKHApLHY9big4NSkseT1mKHYpO2RbXCJkZWZhdWx0XCJdKGhbXCJkZWZhdWx0XCJdLFwiZDMganMgaXMgcmVxdWlyZWQuXCIpO3ZhciBnPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdChlKXt2YXIgbj10aGlzO3IodGhpcyx0KSx0aGlzLmJhc2U9ZSx0aGlzLmhhc0RyYXduPSExLHRoaXMubWVyZ2U9e30sdGhpcy5tZXJnZS5jb25maWdzPWZ1bmN0aW9uKCl7Zm9yKHZhciB0PWFyZ3VtZW50cy5sZW5ndGgsZT1BcnJheSh0KSxyPTA7dD5yO3IrKyllW3JdPWFyZ3VtZW50c1tyXTtyZXR1cm4gbi5jb25maWdzPWkuYXBwbHkoT2JqZWN0LFt7fSxuLmNvbmZpZ3NdLmNvbmNhdChlKSksbi5jb25maWdzfSx0aGlzLm1lcmdlLmFjY2Vzc29ycz1mdW5jdGlvbigpe2Zvcih2YXIgdD1hcmd1bWVudHMubGVuZ3RoLGU9QXJyYXkodCkscj0wO3Q+cjtyKyspZVtyXT1hcmd1bWVudHNbcl07cmV0dXJuIG4uYWNjZXNzb3JzPWkuYXBwbHkoT2JqZWN0LFt7fSxuLmFjY2Vzc29yc10uY29uY2F0KGUpKSxuLmFjY2Vzc29yc30sdGhpcy5jb25maWdzPXt9LHRoaXMuYWNjZXNzb3JzPXt9LHRoaXMucHJvbWlzZT1udWxsLHRoaXMuX2xheWVycz1uZXcgcyx0aGlzLl9hdHRhY2hlZD1uZXcgcyx0aGlzLl9ldmVudHM9bmV3IHMsdGhpcy5jPXRoaXMuY29uZmlnLHRoaXMuYT10aGlzLmFjY2Vzc29yfXJldHVybiB0LnByb3RvdHlwZS50cmFuc2Zvcm09ZnVuY3Rpb24odCl7cmV0dXJuIHR9LHQucHJvdG90eXBlLmRlbXV4PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGV9LHQucHJvdG90eXBlLnByZURyYXc9ZnVuY3Rpb24oKXt9LHQucHJvdG90eXBlLnBvc3REcmF3PWZ1bmN0aW9uKCl7fSx0LnByb3RvdHlwZS5wb3N0VHJhbnNpdGlvbj1mdW5jdGlvbigpe30sdC5wcm90b3R5cGUudW5sYXllcj1mdW5jdGlvbih0KXt2YXIgZT10aGlzLmxheWVyKHQpO3JldHVybiB0aGlzLl9sYXllcnNbXCJkZWxldGVcIl0odCksZGVsZXRlIGUuX2NoYXJ0LGV9LHQucHJvdG90eXBlLmxheWVyPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcixvPXRoaXM7aWYoMT09PWFyZ3VtZW50cy5sZW5ndGgpcmV0dXJuIHRoaXMuX2xheWVycy5nZXQodCk7aWYoMj09PWFyZ3VtZW50cy5sZW5ndGgpe2lmKGUgaW5zdGFuY2VvZiB5W1wiZGVmYXVsdFwiXSlyZXR1cm4gZS5fY2hhcnQ9dGhpcyx0aGlzLl9sYXllcnMuc2V0KHQsZSksdGhpcy5fbGF5ZXJzLmdldCh0KTtkW1wiZGVmYXVsdFwiXSghMSxcIldoZW4gcmVhdHRhY2hpbmcgYSBsYXllciwgdGhlIHNlY29uZCBhcmd1bWVudCBtdXN0IGJlIGEga290byBsYXllclwiKX1yZXR1cm4gZS5fY2hhcnQ9dGhpcyxyPW5ldyB5W1wiZGVmYXVsdFwiXShlLG4pLHIucmVtb3ZlPWZ1bmN0aW9uKCl7cmV0dXJuIG8uX2xheWVyc1tcImRlbGV0ZVwiXSh0KSx0aGlzfSx0aGlzLl9sYXllcnMuc2V0KHQscikscn0sdC5wcm90b3R5cGUuYXR0YWNoPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIDE9PT1hcmd1bWVudHMubGVuZ3RoP3RoaXMuX2F0dGFjaGVkLmdldCh0KToodGhpcy5fYXR0YWNoZWQuc2V0KHQsZSksZSl9LHQucHJvdG90eXBlLmRyYXc9ZnVuY3Rpb24odCl7dmFyIGUsbixyPXRoaXMsbz1bXTtyZXR1cm4gYy5yZXNvbHZlKHRoaXMudHJhbnNmb3JtKHQpKS50aGVuKGZ1bmN0aW9uKHQpe3IucHJlRHJhdyh0KSxyLnRyaWdnZXIoXCJwcmVEcmF3XCIsdCk7Zm9yKHZhciBpPXIuX2xheWVycy52YWx1ZXMoKSxzPUFycmF5LmlzQXJyYXkoaSksYT0wLGk9cz9pOnUoaSk7Oyl7aWYocyl7aWYoYT49aS5sZW5ndGgpYnJlYWs7ZT1pW2ErK119ZWxzZXtpZihhPWkubmV4dCgpLGEuZG9uZSlicmVhaztlPWEudmFsdWV9ZS5kcmF3KHQpLG8ucHVzaChlLnByb21pc2UpfWZvcih2YXIgZj1yLl9hdHRhY2hlZC5lbnRyaWVzKCksbD1BcnJheS5pc0FycmF5KGYpLGg9MCxmPWw/Zjp1KGYpOzspe3ZhciBwO2lmKGwpe2lmKGg+PWYubGVuZ3RoKWJyZWFrO3A9ZltoKytdfWVsc2V7aWYoaD1mLm5leHQoKSxoLmRvbmUpYnJlYWs7cD1oLnZhbHVlfXZhciBkPXBbMF0sdj1wWzFdO249ci5kZW11eD9yLmRlbXV4KGQsdCk6dCx2LmRyYXcobiksby5wdXNoKHYucHJvbWlzZSl9cmV0dXJuIHIuaGFzRHJhd249ITAsci5wcm9taXNlPWMuYWxsKG8pLHIucG9zdERyYXcoKSxyLnRyaWdnZXIoXCJwb3N0RHJhd1wiLHQpLHIucHJvbWlzZS50aGVuKGZ1bmN0aW9uKCl7ci5wb3N0VHJhbnNpdGlvbih0KSxyLnRyaWdnZXIoXCJwb3N0VHJhbnNpdGlvblwiLHQpfSksdH0pfSx0LnByb3RvdHlwZS5vbj1mdW5jdGlvbih0LGUsbil7dmFyIHI7cmV0dXJuIHI9dGhpcy5fZXZlbnRzLmhhcyh0KT90aGlzLl9ldmVudHMuZ2V0KHQpOm5ldyBhLHIuYWRkKHtjYWxsYmFjazplLGNvbnRleHQ6bnx8dGhpcyxfY2hhcnQ6dGhpc30pLHRoaXMuX2V2ZW50cy5zZXQodCxyKSx0aGlzfSx0LnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKHQsZSxuKXt2YXIgcj10aGlzLG89ZnVuY3Rpb24gaSgpe3Iub2ZmKHQsaSksZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9O3JldHVybiB0aGlzLm9uKHQsbyxuKX0sdC5wcm90b3R5cGUub2ZmPWZ1bmN0aW9uKHQsZSxuKXtyZXR1cm4gMD09PWFyZ3VtZW50cy5sZW5ndGg/KHRoaXMuX2V2ZW50cy5jbGVhcigpLHRoaXMpOjE9PT1hcmd1bWVudHMubGVuZ3RoPyh0aGlzLl9ldmVudHMuaGFzKHQpJiZ0aGlzLl9ldmVudHMuZ2V0KHQpLmNsZWFyKCksdGhpcyk6KHRoaXMuX2V2ZW50cy5nZXQodCkuZm9yRWFjaChmdW5jdGlvbih0LHIsbyl7KGUmJmU9PT1yLmNhbGxiYWNrfHxuJiZuPT09ci5jb250ZXh0KSYmb1tcImRlbGV0ZVwiXSh0KX0pLHRoaXMpfSx0LnByb3RvdHlwZS50cmlnZ2VyPWZ1bmN0aW9uKHQpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLG49QXJyYXkoZT4xP2UtMTowKSxyPTE7ZT5yO3IrKyluW3ItMV09YXJndW1lbnRzW3JdO3JldHVybiB0aGlzLl9ldmVudHMuaGFzKHQpJiZ0aGlzLl9ldmVudHMuZ2V0KHQpLmZvckVhY2goZnVuY3Rpb24odCl7dmFyIGU7KGU9dC5jYWxsYmFjaykuY2FsbC5hcHBseShlLFt0LmNvbnRleHRdLmNvbmNhdChuKSl9KSx0aGlzfSx0LnByb3RvdHlwZS5jb25maWc9ZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBuKCl7ZnVuY3Rpb24gdCh0LGUpe3ZhciBuPU1hdGgubWluLmNhbGwobnVsbCx0Lm1hcChmdW5jdGlvbih0KXtyZXR1cm4gaS5jb25maWcodCl9KSk7cmV0dXJuIGUvbn1vLmNvbnN0cmFpbj09PSEwP28ucGVyY2VudGFnZT10KFtcIndpZHRoXCIsXCJoZWlnaHRcIl0sby52YWx1ZSk6QXJyYXkuaXNBcnJheShvLmNvbnN0cmFpbik/by5wZXJjZW50YWdlPXQoby5jb25zdHJhaW4sby52YWx1ZSk6by5wZXJjZW50YWdlPXQoW28uY29uc3RyYWluXSxvLnZhbHVlKX12YXIgcixvLGk9dGhpcztpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gdGhpcy5jb25maWdzO2lmKDE9PT1hcmd1bWVudHMubGVuZ3RoKXtpZihcIm9iamVjdFwiPT10eXBlb2YgdCl7Zm9yKHIgaW4gdCl0aGlzLmNvbmZpZ3MuaGFzT3duUHJvcGVydHkocik/KG89dGhpcy5jb25maWdzW3JdLG8uaGFzT3duUHJvcGVydHkoXCJzZXR0ZXJcIik/by52YWx1ZT1vLnNldHRlci5jYWxsKG8sdFtyXSk6by52YWx1ZT10W3JdLG8uaGFzT3duUHJvcGVydHkoXCJjb25zdHJhaW5cIikmJm4oKSx0aGlzLmNvbmZpZ3Nbcl09byk6Y29uc29sZS53YXJuKFwiY29uZmlnIHdpdGggbmFtZSBcIit0K1wiIGlzIG5vdCBkZWZpbmVkLlwiKTtyZXR1cm4gdGhpc31yZXR1cm4gZFtcImRlZmF1bHRcIl0odGhpcy5jb25maWdzLmhhc093blByb3BlcnR5KHQpLHQrXCIgaXMgbm90IGEgdmFsaWQgb3B0aW9uLlwiKSxvPXRoaXMuY29uZmlnc1t0XSxvLmhhc093blByb3BlcnR5KFwiZ2V0dGVyXCIpP28uZ2V0dGVyLmNhbGwobyk6by52YWx1ZX1yZXR1cm4gMj09PWFyZ3VtZW50cy5sZW5ndGg/KHRoaXMuY29uZmlncy5oYXNPd25Qcm9wZXJ0eSh0KT8obz10aGlzLmNvbmZpZ3NbdF0sby5oYXNPd25Qcm9wZXJ0eShcInNldHRlclwiKT9vLnZhbHVlPW8uc2V0dGVyLmNhbGwobyxlKTpvLnZhbHVlPWUsby5oYXNPd25Qcm9wZXJ0eShcImNvbnN0cmFpblwiKSYmbigpLHRoaXMuY29uZmlnc1t0XT1vKTpjb25zb2xlLndhcm4oXCJjb25maWcgd2l0aCBuYW1lIFwiK3QrXCIgaXMgbm90IGRlZmluZWQuXCIpLHRoaXMpOnZvaWQgMH0sdC5wcm90b3R5cGUuYWNjZXNzb3I9ZnVuY3Rpb24odCxlKXt2YXIgbjtpZigwPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gdGhpcy5hY2Nlc3NvcnM7aWYoMT09PWFyZ3VtZW50cy5sZW5ndGgpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0KXJldHVybiBkW1wiZGVmYXVsdFwiXSh0aGlzLmFjY2Vzc29ycy5oYXNPd25Qcm9wZXJ0eSh0KSx0K1wiIGlzIG5vdCBhIHZhbGlkIGFjY2Vzc29yLlwiKSx0aGlzLmFjY2Vzc29yc1t0XTtmb3IobiBpbiB0KXRoaXMuYWNjZXNzb3JzW25dPXRbbl19ZWxzZSB0aGlzLmFjY2Vzc29yc1t0XT1lO3JldHVybiB0aGlzfSx0LmV4dGVuZD1mdW5jdGlvbih0KXt2YXIgZT1mdW5jdGlvbihlKXtmdW5jdGlvbiBuKG8pe3IodGhpcyxuKTt2YXIgaTtpZihlLmNhbGwodGhpcyxvKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXQuY2FsbCh0aGlzKTtlbHNle2ZvcihpIGluIHQpdGhpc1tpXT10W2ldO3RoaXMuaW5pdGlhbGl6ZS5jYWxsKHRoaXMpfX1yZXR1cm4gbyhuLGUpLG59KHRoaXMpO3JldHVybiBlfSx0fSgpO2VbXCJkZWZhdWx0XCJdPWcsdC5leHBvcnRzPWVbXCJkZWZhdWx0XCJdfSxmdW5jdGlvbih0LGUpe1widXNlIHN0cmljdFwiO2VbXCJkZWZhdWx0XCJdPWZ1bmN0aW9uKHQsZSl7aWYoISh0IGluc3RhbmNlb2YgZSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX0sZS5fX2VzTW9kdWxlPSEwfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9bigzKVtcImRlZmF1bHRcIl0sbz1uKDYpW1wiZGVmYXVsdFwiXTtlW1wiZGVmYXVsdFwiXT1mdW5jdGlvbih0LGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUmJm51bGwhPT1lKXRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiK3R5cGVvZiBlKTt0LnByb3RvdHlwZT1yKGUmJmUucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6dCxlbnVtZXJhYmxlOiExLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTohMH19KSxlJiYobz9vKHQsZSk6dC5fX3Byb3RvX189ZSl9LGUuX19lc01vZHVsZT0hMH0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17XCJkZWZhdWx0XCI6big0KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHIuY3JlYXRlKHQsZSl9fSxmdW5jdGlvbih0LGUpe3ZhciBuPU9iamVjdDt0LmV4cG9ydHM9e2NyZWF0ZTpuLmNyZWF0ZSxnZXRQcm90bzpuLmdldFByb3RvdHlwZU9mLGlzRW51bTp7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZSxnZXREZXNjOm4uZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLHNldERlc2M6bi5kZWZpbmVQcm9wZXJ0eSxzZXREZXNjczpuLmRlZmluZVByb3BlcnRpZXMsZ2V0S2V5czpuLmtleXMsZ2V0TmFtZXM6bi5nZXRPd25Qcm9wZXJ0eU5hbWVzLGdldFN5bWJvbHM6bi5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsZWFjaDpbXS5mb3JFYWNofX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17XCJkZWZhdWx0XCI6big3KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oOCksdC5leHBvcnRzPW4oMTEpLk9iamVjdC5zZXRQcm90b3R5cGVPZn0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oOSk7cihyLlMsXCJPYmplY3RcIix7c2V0UHJvdG90eXBlT2Y6bigxMikuc2V0fSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDEwKSxvPW4oMTEpLGk9XCJwcm90b3R5cGVcIixzPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkoZSxhcmd1bWVudHMpfX0sYz1mdW5jdGlvbih0LGUsbil7dmFyIHUsYSxmLGwsaD10JmMuRyxwPXQmYy5QLGQ9aD9yOnQmYy5TP3JbZV06KHJbZV18fHt9KVtpXSx2PWg/bzpvW2VdfHwob1tlXT17fSk7aCYmKG49ZSk7Zm9yKHUgaW4gbilhPSEodCZjLkYpJiZkJiZ1IGluIGQsYSYmdSBpbiB2fHwoZj1hP2RbdV06blt1XSxoJiZcImZ1bmN0aW9uXCIhPXR5cGVvZiBkW3VdP2w9blt1XTp0JmMuQiYmYT9sPXMoZixyKTp0JmMuVyYmZFt1XT09Zj8hZnVuY3Rpb24odCl7bD1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcyBpbnN0YW5jZW9mIHQ/bmV3IHQoZSk6dChlKX0sbFtpXT10W2ldfShmKTpsPXAmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGY/cyhGdW5jdGlvbi5jYWxsLGYpOmYsdlt1XT1sLHAmJigodltpXXx8KHZbaV09e30pKVt1XT1mKSl9O2MuRj0xLGMuRz0yLGMuUz00LGMuUD04LGMuQj0xNixjLlc9MzIsdC5leHBvcnRzPWN9LGZ1bmN0aW9uKHQsZSl7dmFyIG49XCJ1bmRlZmluZWRcIixyPXQuZXhwb3J0cz10eXBlb2Ygd2luZG93IT1uJiZ3aW5kb3cuTWF0aD09TWF0aD93aW5kb3c6dHlwZW9mIHNlbGYhPW4mJnNlbGYuTWF0aD09TWF0aD9zZWxmOkZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcIm51bWJlclwiPT10eXBlb2YgX19nJiYoX19nPXIpfSxmdW5jdGlvbih0LGUpe3ZhciBuPXQuZXhwb3J0cz17dmVyc2lvbjpcIjEuMi4wXCJ9O1wibnVtYmVyXCI9PXR5cGVvZiBfX2UmJihfX2U9bil9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDUpLmdldERlc2Msbz1uKDEzKSxpPW4oMTQpLHM9ZnVuY3Rpb24odCxlKXtpZihpKHQpLCFvKGUpJiZudWxsIT09ZSl0aHJvdyBUeXBlRXJyb3IoZStcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIil9O3QuZXhwb3J0cz17c2V0Ok9iamVjdC5zZXRQcm90b3R5cGVPZnx8KFwiX19wcm90b19fXCJpbnt9P2Z1bmN0aW9uKHQsZSxvKXt0cnl7bz1uKDE1KShGdW5jdGlvbi5jYWxsLHIoT2JqZWN0LnByb3RvdHlwZSxcIl9fcHJvdG9fX1wiKS5zZXQsMiksbyh0LFtdKSxlPSEodCBpbnN0YW5jZW9mIEFycmF5KX1jYXRjaChpKXtlPSEwfXJldHVybiBmdW5jdGlvbih0LG4pe3JldHVybiBzKHQsbiksZT90Ll9fcHJvdG9fXz1uOm8odCxuKSx0fX0oe30sITEpOnZvaWQgMCksY2hlY2s6c319LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiB0P251bGwhPT10OlwiZnVuY3Rpb25cIj09dHlwZW9mIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMyk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKCFyKHQpKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBhbiBvYmplY3QhXCIpO3JldHVybiB0fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTYpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbil7aWYocih0KSx2b2lkIDA9PT1lKXJldHVybiB0O3N3aXRjaChuKXtjYXNlIDE6cmV0dXJuIGZ1bmN0aW9uKG4pe3JldHVybiB0LmNhbGwoZSxuKX07Y2FzZSAyOnJldHVybiBmdW5jdGlvbihuLHIpe3JldHVybiB0LmNhbGwoZSxuLHIpfTtjYXNlIDM6cmV0dXJuIGZ1bmN0aW9uKG4scixvKXtyZXR1cm4gdC5jYWxsKGUsbixyLG8pfX1yZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdC5hcHBseShlLGFyZ3VtZW50cyl9fX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdCl0aHJvdyBUeXBlRXJyb3IodCtcIiBpcyBub3QgYSBmdW5jdGlvbiFcIik7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPXtcImRlZmF1bHRcIjpuKDE4KSxfX2VzTW9kdWxlOiEwfX0sZnVuY3Rpb24odCxlLG4pe24oMTkpLHQuZXhwb3J0cz1uKDExKS5PYmplY3QuYXNzaWdufSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big5KTtyKHIuUytyLkYsXCJPYmplY3RcIix7YXNzaWduOm4oMjApfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIxKSxvPW4oMjMpLGk9bigyNSkscz1uKDI2KTt0LmV4cG9ydHM9bigyNykoZnVuY3Rpb24oKXt2YXIgdD1PYmplY3QuYXNzaWduLGU9e30sbj17fSxyPVN5bWJvbCgpLG89XCJhYmNkZWZnaGlqa2xtbm9wcXJzdFwiO3JldHVybiBlW3JdPTcsby5zcGxpdChcIlwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe25bdF09dH0pLDchPXQoe30sZSlbcl18fE9iamVjdC5rZXlzKHQoe30sbikpLmpvaW4oXCJcIikhPW99KT9mdW5jdGlvbih0LGUpe2Zvcih2YXIgbj1yKHQpLGM9YXJndW1lbnRzLmxlbmd0aCx1PTE7Yz51Oylmb3IodmFyIGEsZj1vKGFyZ3VtZW50c1t1KytdKSxsPWkoZiksaD1sLmxlbmd0aCxwPTA7aD5wOylzKGYsYT1sW3ArK10pJiYoblthXT1mW2FdKTtyZXR1cm4gbn06T2JqZWN0LmFzc2lnbn0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMjIpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gT2JqZWN0KHIodCkpfX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7aWYodm9pZCAwPT10KXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIit0KTtyZXR1cm4gdH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI0KTt0LmV4cG9ydHM9MCBpbiBPYmplY3QoXCJ6XCIpP09iamVjdDpmdW5jdGlvbih0KXtyZXR1cm5cIlN0cmluZ1wiPT1yKHQpP3Quc3BsaXQoXCJcIik6T2JqZWN0KHQpfX0sZnVuY3Rpb24odCxlKXt2YXIgbj17fS50b1N0cmluZzt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIG4uY2FsbCh0KS5zbGljZSg4LC0xKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDUpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXt2YXIgZT1yLmdldEtleXModCksbj1yLmdldFN5bWJvbHM7aWYobilmb3IodmFyIG8saT1uKHQpLHM9ci5pc0VudW0sYz0wO2kubGVuZ3RoPmM7KXMuY2FsbCh0LG89aVtjKytdKSYmZS5wdXNoKG8pO3JldHVybiBlfX0sZnVuY3Rpb24odCxlKXt2YXIgbj17fS5oYXNPd25Qcm9wZXJ0eTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gbi5jYWxsKHQsZSl9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0KXt0cnl7cmV0dXJuISF0KCl9Y2F0Y2goZSl7cmV0dXJuITB9fX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17XCJkZWZhdWx0XCI6bigyOSksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDMwKSxuKDMxKSxuKDQ2KSxuKDUxKSxuKDYzKSx0LmV4cG9ydHM9bigxMSkuTWFwfSxmdW5jdGlvbih0LGUpe30sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oMzIpKCEwKTtuKDM0KShTdHJpbmcsXCJTdHJpbmdcIixmdW5jdGlvbih0KXt0aGlzLl90PVN0cmluZyh0KSx0aGlzLl9pPTB9LGZ1bmN0aW9uKCl7dmFyIHQsZT10aGlzLl90LG49dGhpcy5faTtyZXR1cm4gbj49ZS5sZW5ndGg/e3ZhbHVlOnZvaWQgMCxkb25lOiEwfToodD1yKGUsbiksdGhpcy5faSs9dC5sZW5ndGgse3ZhbHVlOnQsZG9uZTohMX0pfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDMzKSxvPW4oMjIpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSxuKXt2YXIgaSxzLGM9U3RyaW5nKG8oZSkpLHU9cihuKSxhPWMubGVuZ3RoO3JldHVybiAwPnV8fHU+PWE/dD9cIlwiOnZvaWQgMDooaT1jLmNoYXJDb2RlQXQodSksNTUyOTY+aXx8aT41NjMxOXx8dSsxPT09YXx8KHM9Yy5jaGFyQ29kZUF0KHUrMSkpPDU2MzIwfHxzPjU3MzQzP3Q/Yy5jaGFyQXQodSk6aTp0P2Muc2xpY2UodSx1KzIpOihpLTU1Mjk2PDwxMCkrKHMtNTYzMjApKzY1NTM2KX19fSxmdW5jdGlvbih0LGUpe3ZhciBuPU1hdGguY2VpbCxyPU1hdGguZmxvb3I7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybiBpc05hTih0PSt0KT8wOih0PjA/cjpuKSh0KX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDM1KSxvPW4oOSksaT1uKDM2KSxzPW4oMzcpLGM9bigyNiksdT1uKDQwKShcIml0ZXJhdG9yXCIpLGE9big0MyksZj0hKFtdLmtleXMmJlwibmV4dFwiaW5bXS5rZXlzKCkpLGw9XCJAQGl0ZXJhdG9yXCIsaD1cImtleXNcIixwPVwidmFsdWVzXCIsZD1mdW5jdGlvbigpe3JldHVybiB0aGlzfTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLHYseSxnLF8sbSl7big0NCkodixlLHkpO3ZhciB4LHcsYj1mdW5jdGlvbih0KXtzd2l0Y2godCl7Y2FzZSBoOnJldHVybiBmdW5jdGlvbigpe3JldHVybiBuZXcgdih0aGlzLHQpfTtjYXNlIHA6cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG5ldyB2KHRoaXMsdCl9fXJldHVybiBmdW5jdGlvbigpe3JldHVybiBuZXcgdih0aGlzLHQpfX0sTz1lK1wiIEl0ZXJhdG9yXCIsaj10LnByb3RvdHlwZSxrPWpbdV18fGpbbF18fGcmJmpbZ10sUD1rfHxiKGcpO2lmKGspe3ZhciBNPW4oNSkuZ2V0UHJvdG8oUC5jYWxsKG5ldyB0KSk7big0NSkoTSxPLCEwKSwhciYmYyhqLGwpJiZzKE0sdSxkKX1pZigoIXJ8fG0pJiZzKGosdSxQKSxhW2VdPVAsYVtPXT1kLGcpaWYoeD17a2V5czpfP1A6YihoKSx2YWx1ZXM6Zz09cD9QOmIocCksZW50cmllczpnIT1wP1A6YihcImVudHJpZXNcIil9LG0pZm9yKHcgaW4geCl3IGluIGp8fGkoaix3LHhbd10pO2Vsc2UgbyhvLlArby5GKmYsZSx4KX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPSEwfSxmdW5jdGlvbih0LGUsbil7dC5leHBvcnRzPW4oMzcpfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big1KSxvPW4oMzgpO3QuZXhwb3J0cz1uKDM5KT9mdW5jdGlvbih0LGUsbil7cmV0dXJuIHIuc2V0RGVzYyh0LGUsbygxLG4pKX06ZnVuY3Rpb24odCxlLG4pe3JldHVybiB0W2VdPW4sdH19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7cmV0dXJue2VudW1lcmFibGU6ISgxJnQpLGNvbmZpZ3VyYWJsZTohKDImdCksd3JpdGFibGU6ISg0JnQpLHZhbHVlOmV9fX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz0hbigyNykoZnVuY3Rpb24oKXtyZXR1cm4gNyE9T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LFwiYVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gN319KS5hfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQxKShcIndrc1wiKSxvPW4oMTApLlN5bWJvbDt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIHJbdF18fChyW3RdPW8mJm9bdF18fChvfHxuKDQyKSkoXCJTeW1ib2wuXCIrdCkpfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oMTApLG89XCJfX2NvcmUtanNfc2hhcmVkX19cIixpPXJbb118fChyW29dPXt9KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGlbdF18fChpW3RdPXt9KX19LGZ1bmN0aW9uKHQsZSl7dmFyIG49MCxyPU1hdGgucmFuZG9tKCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVyblwiU3ltYm9sKFwiLmNvbmNhdCh2b2lkIDA9PT10P1wiXCI6dCxcIilfXCIsKCsrbityKS50b1N0cmluZygzNikpfX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9e319LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDUpLG89e307bigzNykobyxuKDQwKShcIml0ZXJhdG9yXCIpLGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXN9KSx0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLGkpe3QucHJvdG90eXBlPXIuY3JlYXRlKG8se25leHQ6bigzOCkoMSxpKX0pLG4oNDUpKHQsZStcIiBJdGVyYXRvclwiKX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI2KSxvPW4oMzcpLGk9big0MCkoXCJ0b1N0cmluZ1RhZ1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe3QmJiFyKHQ9bj90OnQucHJvdG90eXBlLGkpJiZvKHQsaSxlKX19LGZ1bmN0aW9uKHQsZSxuKXtuKDQ3KTt2YXIgcj1uKDQzKTtyLk5vZGVMaXN0PXIuSFRNTENvbGxlY3Rpb249ci5BcnJheX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNDgpLG89big0OSksaT1uKDQzKSxzPW4oNTApO24oMzQpKEFycmF5LFwiQXJyYXlcIixmdW5jdGlvbih0LGUpe3RoaXMuX3Q9cyh0KSx0aGlzLl9pPTAsdGhpcy5faz1lfSxmdW5jdGlvbigpe3ZhciB0PXRoaXMuX3QsZT10aGlzLl9rLG49dGhpcy5faSsrO3JldHVybiF0fHxuPj10Lmxlbmd0aD8odGhpcy5fdD12b2lkIDAsbygxKSk6XCJrZXlzXCI9PWU/bygwLG4pOlwidmFsdWVzXCI9PWU/bygwLHRbbl0pOm8oMCxbbix0W25dXSl9LFwidmFsdWVzXCIpLGkuQXJndW1lbnRzPWkuQXJyYXkscihcImtleXNcIikscihcInZhbHVlc1wiKSxyKFwiZW50cmllc1wiKX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24oKXt9fSxmdW5jdGlvbih0LGUpe3QuZXhwb3J0cz1mdW5jdGlvbih0LGUpe3JldHVybnt2YWx1ZTplLGRvbmU6ISF0fX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDIzKSxvPW4oMjIpO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gcihvKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDUyKTtuKDYyKShcIk1hcFwiLGZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiB0KHRoaXMsYXJndW1lbnRzWzBdKX19LHtnZXQ6ZnVuY3Rpb24odCl7dmFyIGU9ci5nZXRFbnRyeSh0aGlzLHQpO3JldHVybiBlJiZlLnZ9LHNldDpmdW5jdGlvbih0LGUpe3JldHVybiByLmRlZih0aGlzLDA9PT10PzA6dCxlKX19LHIsITApfSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big1KSxvPW4oMzcpLGk9bigxNSkscz1uKDUzKSxjPW4oNTQpLHU9bigyMiksYT1uKDU1KSxmPW4oNDkpLGw9big0MikoXCJpZFwiKSxoPW4oMjYpLHA9bigxMyksZD1PYmplY3QuaXNFeHRlbnNpYmxlfHxwLHY9bigzOSkseT12P1wiX3NcIjpcInNpemVcIixnPTAsXz1mdW5jdGlvbih0LGUpe2lmKCFwKHQpKXJldHVyblwic3ltYm9sXCI9PXR5cGVvZiB0P3Q6KFwic3RyaW5nXCI9PXR5cGVvZiB0P1wiU1wiOlwiUFwiKSt0O2lmKCFoKHQsbCkpe2lmKCFkKHQpKXJldHVyblwiRlwiO2lmKCFlKXJldHVyblwiRVwiO28odCxsLCsrZyl9cmV0dXJuXCJPXCIrdFtsXX0sbT1mdW5jdGlvbih0LGUpe3ZhciBuLHI9XyhlKTtpZihcIkZcIiE9PXIpcmV0dXJuIHQuX2lbcl07Zm9yKG49dC5fZjtuO249bi5uKWlmKG4uaz09ZSlyZXR1cm4gbn07dC5leHBvcnRzPXtnZXRDb25zdHJ1Y3RvcjpmdW5jdGlvbih0LGUsbyxzKXt2YXIgZj10KGZ1bmN0aW9uKHQsbil7Yyh0LGYsZSksdC5faT1yLmNyZWF0ZShudWxsKSx0Ll9mPXZvaWQgMCx0Ll9sPXZvaWQgMCx0W3ldPTAsdm9pZCAwIT1uJiZhKG4sbyx0W3NdLHQpfSk7cmV0dXJuIG4oNjEpKGYucHJvdG90eXBlLHtjbGVhcjpmdW5jdGlvbigpe2Zvcih2YXIgdD10aGlzLGU9dC5faSxuPXQuX2Y7bjtuPW4ubiluLnI9ITAsbi5wJiYobi5wPW4ucC5uPXZvaWQgMCksZGVsZXRlIGVbbi5pXTt0Ll9mPXQuX2w9dm9pZCAwLHRbeV09MH0sXCJkZWxldGVcIjpmdW5jdGlvbih0KXt2YXIgZT10aGlzLG49bShlLHQpO2lmKG4pe3ZhciByPW4ubixvPW4ucDtkZWxldGUgZS5faVtuLmldLG4ucj0hMCxvJiYoby5uPXIpLHImJihyLnA9byksZS5fZj09biYmKGUuX2Y9ciksZS5fbD09biYmKGUuX2w9byksZVt5XS0tfXJldHVybiEhbn0sZm9yRWFjaDpmdW5jdGlvbih0KXtmb3IodmFyIGUsbj1pKHQsYXJndW1lbnRzWzFdLDMpO2U9ZT9lLm46dGhpcy5fZjspZm9yKG4oZS52LGUuayx0aGlzKTtlJiZlLnI7KWU9ZS5wfSxoYXM6ZnVuY3Rpb24odCl7cmV0dXJuISFtKHRoaXMsdCl9fSksdiYmci5zZXREZXNjKGYucHJvdG90eXBlLFwic2l6ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdSh0aGlzW3ldKX19KSxmfSxkZWY6ZnVuY3Rpb24odCxlLG4pe3ZhciByLG8saT1tKHQsZSk7cmV0dXJuIGk/aS52PW46KHQuX2w9aT17aTpvPV8oZSwhMCksazplLHY6bixwOnI9dC5fbCxuOnZvaWQgMCxyOiExfSx0Ll9mfHwodC5fZj1pKSxyJiYoci5uPWkpLHRbeV0rKyxcIkZcIiE9PW8mJih0Ll9pW29dPWkpKSx0fSxnZXRFbnRyeTptLHNldFN0cm9uZzpmdW5jdGlvbih0LGUscil7bigzNCkodCxlLGZ1bmN0aW9uKHQsZSl7dGhpcy5fdD10LHRoaXMuX2s9ZSx0aGlzLl9sPXZvaWQgMH0sZnVuY3Rpb24oKXtmb3IodmFyIHQ9dGhpcyxlPXQuX2ssbj10Ll9sO24mJm4ucjspbj1uLnA7cmV0dXJuIHQuX3QmJih0Ll9sPW49bj9uLm46dC5fdC5fZik/XCJrZXlzXCI9PWU/ZigwLG4uayk6XCJ2YWx1ZXNcIj09ZT9mKDAsbi52KTpmKDAsW24uayxuLnZdKToodC5fdD12b2lkIDAsZigxKSl9LHI/XCJlbnRyaWVzXCI6XCJ2YWx1ZXNcIiwhciwhMCkscyh0KSxzKG4oMTEpW2VdKX19fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big1KSxvPW4oNDApKFwic3BlY2llc1wiKTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7IW4oMzkpfHxvIGluIHR8fHIuc2V0RGVzYyh0LG8se2NvbmZpZ3VyYWJsZTohMCxnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc319KX19LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuKXtpZighKHQgaW5zdGFuY2VvZiBlKSl0aHJvdyBUeXBlRXJyb3IobitcIjogdXNlIHRoZSAnbmV3JyBvcGVyYXRvciFcIik7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNSksbz1uKDU2KSxpPW4oNTcpLHM9bigxNCksYz1uKDU4KSx1PW4oNTkpO3QuZXhwb3J0cz1mdW5jdGlvbih0LGUsbixhKXt2YXIgZixsLGgscD11KHQpLGQ9cihuLGEsZT8yOjEpLHY9MDtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBwKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBpdGVyYWJsZSFcIik7aWYoaShwKSlmb3IoZj1jKHQubGVuZ3RoKTtmPnY7disrKWU/ZChzKGw9dFt2XSlbMF0sbFsxXSk6ZCh0W3ZdKTtlbHNlIGZvcihoPXAuY2FsbCh0KTshKGw9aC5uZXh0KCkpLmRvbmU7KW8oaCxkLGwudmFsdWUsZSl9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSxuLG8pe3RyeXtyZXR1cm4gbz9lKHIobilbMF0sblsxXSk6ZShuKX1jYXRjaChpKXt2YXIgcz10W1wicmV0dXJuXCJdO3Rocm93IHZvaWQgMCE9PXMmJnIocy5jYWxsKHQpKSxpfX19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDQzKSxvPW4oNDApKFwiaXRlcmF0b3JcIik7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3JldHVybihyLkFycmF5fHxBcnJheS5wcm90b3R5cGVbb10pPT09dH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDMzKSxvPU1hdGgubWluO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gdD4wP28ocih0KSw5MDA3MTk5MjU0NzQwOTkxKTowfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNjApLG89big0MCkoXCJpdGVyYXRvclwiKSxpPW4oNDMpO3QuZXhwb3J0cz1uKDExKS5nZXRJdGVyYXRvck1ldGhvZD1mdW5jdGlvbih0KXtyZXR1cm4gdm9pZCAwIT10P3Rbb118fHRbXCJAQGl0ZXJhdG9yXCJdfHxpW3IodCldOnZvaWQgMH19LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDI0KSxvPW4oNDApKFwidG9TdHJpbmdUYWdcIiksaT1cIkFyZ3VtZW50c1wiPT1yKGZ1bmN0aW9uKCl7cmV0dXJuIGFyZ3VtZW50c30oKSk7dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlLG4scztyZXR1cm4gdm9pZCAwPT09dD9cIlVuZGVmaW5lZFwiOm51bGw9PT10P1wiTnVsbFwiOlwic3RyaW5nXCI9PXR5cGVvZihuPShlPU9iamVjdCh0KSlbb10pP246aT9yKGUpOlwiT2JqZWN0XCI9PShzPXIoZSkpJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBlLmNhbGxlZT9cIkFyZ3VtZW50c1wiOnN9fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigzNik7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBuIGluIGUpcih0LG4sZVtuXSk7cmV0dXJuIHR9fSxmdW5jdGlvbih0LGUsbil7XCJ1c2Ugc3RyaWN0XCI7dmFyIHI9big1KSxvPW4oOSksaT1uKDM3KSxzPW4oNTUpLGM9big1NCk7dC5leHBvcnRzPWZ1bmN0aW9uKHQsZSx1LGEsZixsKXt2YXIgaD1uKDEwKVt0XSxwPWgsZD1mP1wic2V0XCI6XCJhZGRcIix2PXAmJnAucHJvdG90eXBlLHk9e307cmV0dXJuIG4oMzkpJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBwJiYobHx8di5mb3JFYWNoJiYhbigyNykoZnVuY3Rpb24oKXsobmV3IHApLmVudHJpZXMoKS5uZXh0KCl9KSk/KHA9ZShmdW5jdGlvbihlLG4pe2MoZSxwLHQpLGUuX2M9bmV3IGgsdm9pZCAwIT1uJiZzKG4sZixlW2RdLGUpfSksci5lYWNoLmNhbGwoXCJhZGQsY2xlYXIsZGVsZXRlLGZvckVhY2gsZ2V0LGhhcyxzZXQsa2V5cyx2YWx1ZXMsZW50cmllc1wiLnNwbGl0KFwiLFwiKSxmdW5jdGlvbih0KXt2YXIgZT1cImFkZFwiPT10fHxcInNldFwiPT10O3QgaW4gdiYmKCFsfHxcImNsZWFyXCIhPXQpJiZpKHAucHJvdG90eXBlLHQsZnVuY3Rpb24obixyKXt2YXIgbz10aGlzLl9jW3RdKDA9PT1uPzA6bixyKTtyZXR1cm4gZT90aGlzOm99KX0pLFwic2l6ZVwiaW4gdiYmci5zZXREZXNjKHAucHJvdG90eXBlLFwic2l6ZVwiLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fYy5zaXplfX0pKToocD1hLmdldENvbnN0cnVjdG9yKGUsdCxmLGQpLG4oNjEpKHAucHJvdG90eXBlLHUpKSxuKDQ1KShwLHQpLHlbdF09cCxvKG8uRytvLlcrby5GLHkpLGx8fGEuc2V0U3Ryb25nKHAsdCxmKSxwfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oOSk7cihyLlAsXCJNYXBcIix7dG9KU09OOm4oNjQpKFwiTWFwXCIpfSl9LGZ1bmN0aW9uKHQsZSxuKXt2YXIgcj1uKDU1KSxvPW4oNjApO3QuZXhwb3J0cz1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oKXtpZihvKHRoaXMpIT10KXRocm93IFR5cGVFcnJvcih0K1wiI3RvSlNPTiBpc24ndCBnZW5lcmljXCIpO3ZhciBlPVtdO3JldHVybiByKHRoaXMsITEsZS5wdXNoLGUpLGV9fX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz17XCJkZWZhdWx0XCI6big2NiksX19lc01vZHVsZTohMH19LGZ1bmN0aW9uKHQsZSxuKXtuKDMwKSxuKDMxKSxuKDQ2KSxuKDY3KSx0LmV4cG9ydHM9bigxMSkuUHJvbWlzZX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByLG89big1KSxpPW4oMzUpLHM9bigxMCksYz1uKDE1KSx1PW4oNjApLGE9big5KSxmPW4oMTMpLGw9bigxNCksaD1uKDE2KSxwPW4oNTQpLGQ9big1NSksdj1uKDEyKS5zZXQseT1uKDY4KSxnPW4oNTMpLF89big0MCkoXCJzcGVjaWVzXCIpLG09big0MikoXCJyZWNvcmRcIikseD1uKDY5KSx3PVwiUHJvbWlzZVwiLGI9cy5wcm9jZXNzLE89XCJwcm9jZXNzXCI9PXUoYiksaj1zW3ddLGs9ZnVuY3Rpb24odCl7dmFyIGU9bmV3IGooZnVuY3Rpb24oKXt9KTtyZXR1cm4gdCYmKGUuY29uc3RydWN0b3I9T2JqZWN0KSxqLnJlc29sdmUoZSk9PT1lfSxQPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdChlKXt2YXIgbj1uZXcgaihlKTtyZXR1cm4gdihuLHQucHJvdG90eXBlKSxufXZhciBlPSExO3RyeXtpZihlPWomJmoucmVzb2x2ZSYmaygpLHYodCxqKSx0LnByb3RvdHlwZT1vLmNyZWF0ZShqLnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOnR9fSksdC5yZXNvbHZlKDUpLnRoZW4oZnVuY3Rpb24oKXt9KWluc3RhbmNlb2YgdHx8KGU9ITEpLGUmJm4oMzkpKXt2YXIgcj0hMTtqLnJlc29sdmUoby5zZXREZXNjKHt9LFwidGhlblwiLHtnZXQ6ZnVuY3Rpb24oKXtyPSEwfX0pKSxlPXJ9fWNhdGNoKGkpe2U9ITF9cmV0dXJuIGV9KCksTT1mdW5jdGlvbih0KXtyZXR1cm4gZih0KSYmKFA/XCJQcm9taXNlXCI9PXUodCk6bSBpbiB0KX0sUz1mdW5jdGlvbih0LGUpe3JldHVybiBpJiZ0PT09aiYmZT09PXI/ITA6eSh0LGUpfSxFPWZ1bmN0aW9uKHQpe3ZhciBlPWwodClbX107cmV0dXJuIHZvaWQgMCE9ZT9lOnR9LEE9ZnVuY3Rpb24odCl7dmFyIGU7cmV0dXJuIGYodCkmJlwiZnVuY3Rpb25cIj09dHlwZW9mKGU9dC50aGVuKT9lOiExfSxUPWZ1bmN0aW9uKHQsZSl7aWYoIXQubil7dC5uPSEwO3ZhciBuPXQuYzt4KGZ1bmN0aW9uKCl7Zm9yKHZhciByPXQudixvPTE9PXQucyxpPTAsYz1mdW5jdGlvbihlKXt2YXIgbixpLHM9bz9lLm9rOmUuZmFpbDt0cnl7cz8ob3x8KHQuaD0hMCksbj1zPT09ITA/cjpzKHIpLG49PT1lLlA/ZS5yZWooVHlwZUVycm9yKFwiUHJvbWlzZS1jaGFpbiBjeWNsZVwiKSk6KGk9QShuKSk/aS5jYWxsKG4sZS5yZXMsZS5yZWopOmUucmVzKG4pKTplLnJlaihyKX1jYXRjaChjKXtlLnJlaihjKX19O24ubGVuZ3RoPmk7KWMobltpKytdKTtuLmxlbmd0aD0wLHQubj0hMSxlJiZzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dmFyIGUsbixvPXQucDtEKG8pJiYoTz9iLmVtaXQoXCJ1bmhhbmRsZWRSZWplY3Rpb25cIixyLG8pOihlPXMub251bmhhbmRsZWRyZWplY3Rpb24pP2Uoe3Byb21pc2U6byxyZWFzb246cn0pOihuPXMuY29uc29sZSkmJm4uZXJyb3ImJm4uZXJyb3IoXCJVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb25cIixyKSksdC5hPXZvaWQgMH0sMSl9KX19LEQ9ZnVuY3Rpb24odCl7dmFyIGUsbj10W21dLHI9bi5hfHxuLmMsbz0wO2lmKG4uaClyZXR1cm4hMTtmb3IoO3IubGVuZ3RoPm87KWlmKGU9cltvKytdLGUuZmFpbHx8IUQoZS5QKSlyZXR1cm4hMTtyZXR1cm4hMH0sRj1mdW5jdGlvbih0KXt2YXIgZT10aGlzO2UuZHx8KGUuZD0hMCxlPWUucnx8ZSxlLnY9dCxlLnM9MixlLmE9ZS5jLnNsaWNlKCksVChlLCEwKSl9LHo9ZnVuY3Rpb24odCl7dmFyIGUsbj10aGlzO2lmKCFuLmQpe24uZD0hMCxuPW4ucnx8bjt0cnl7KGU9QSh0KSk/eChmdW5jdGlvbigpe3ZhciByPXtyOm4sZDohMX07dHJ5e2UuY2FsbCh0LGMoeixyLDEpLGMoRixyLDEpKX1jYXRjaChvKXtGLmNhbGwocixvKX19KToobi52PXQsbi5zPTEsVChuLCExKSl9Y2F0Y2gocil7Ri5jYWxsKHtyOm4sZDohMX0scil9fX07UHx8KGo9ZnVuY3Rpb24odCl7aCh0KTt2YXIgZT17cDpwKHRoaXMsaix3KSxjOltdLGE6dm9pZCAwLHM6MCxkOiExLHY6dm9pZCAwLGg6ITEsbjohMX07dGhpc1ttXT1lO3RyeXt0KGMoeixlLDEpLGMoRixlLDEpKX1jYXRjaChuKXtGLmNhbGwoZSxuKX19LG4oNjEpKGoucHJvdG90eXBlLHt0aGVuOmZ1bmN0aW9uKHQsZSl7dmFyIG49bChsKHRoaXMpLmNvbnN0cnVjdG9yKVtfXSxyPXtvazpcImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3Q6ITAsZmFpbDpcImZ1bmN0aW9uXCI9PXR5cGVvZiBlP2U6ITF9LG89ci5QPW5ldyh2b2lkIDAhPW4/bjpqKShmdW5jdGlvbih0LGUpe3IucmVzPXQsci5yZWo9ZX0pO2goci5yZXMpLGgoci5yZWopO3ZhciBpPXRoaXNbbV07cmV0dXJuIGkuYy5wdXNoKHIpLGkuYSYmaS5hLnB1c2gociksaS5zJiZUKGksITEpLG99LFwiY2F0Y2hcIjpmdW5jdGlvbih0KXtyZXR1cm4gdGhpcy50aGVuKHZvaWQgMCx0KX19KSksYShhLkcrYS5XK2EuRiohUCx7UHJvbWlzZTpqfSksbig0NSkoaix3KSxnKGopLGcocj1uKDExKVt3XSksYShhLlMrYS5GKiFQLHcse3JlamVjdDpmdW5jdGlvbih0KXtyZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24oZSxuKXtuKHQpfSl9fSksYShhLlMrYS5GKighUHx8ayghMCkpLHcse3Jlc29sdmU6ZnVuY3Rpb24odCl7cmV0dXJuIE0odCkmJlModC5jb25zdHJ1Y3Rvcix0aGlzKT90Om5ldyB0aGlzKGZ1bmN0aW9uKGUpe2UodCl9KX19KSxhKGEuUythLkYqIShQJiZuKDc0KShmdW5jdGlvbih0KXtqLmFsbCh0KVtcImNhdGNoXCJdKGZ1bmN0aW9uKCl7fSl9KSksdyx7YWxsOmZ1bmN0aW9uKHQpe3ZhciBlPUUodGhpcyksbj1bXTtyZXR1cm4gbmV3IGUoZnVuY3Rpb24ocixpKXtkKHQsITEsbi5wdXNoLG4pO3ZhciBzPW4ubGVuZ3RoLGM9QXJyYXkocyk7cz9vLmVhY2guY2FsbChuLGZ1bmN0aW9uKHQsbil7ZS5yZXNvbHZlKHQpLnRoZW4oZnVuY3Rpb24odCl7Y1tuXT10LC0tc3x8cihjKX0saSl9KTpyKGMpfSl9LHJhY2U6ZnVuY3Rpb24odCl7dmFyIGU9RSh0aGlzKTtyZXR1cm4gbmV3IGUoZnVuY3Rpb24obixyKXtkKHQsITEsZnVuY3Rpb24odCl7ZS5yZXNvbHZlKHQpLnRoZW4obixyKX0pfSl9fSl9LGZ1bmN0aW9uKHQsZSl7dC5leHBvcnRzPU9iamVjdC5pc3x8ZnVuY3Rpb24odCxlKXtyZXR1cm4gdD09PWU/MCE9PXR8fDEvdD09PTEvZTp0IT10JiZlIT1lfX0sZnVuY3Rpb24odCxlLG4pe3ZhciByLG8saSxzPW4oMTApLGM9big3MCkuc2V0LHU9cy5NdXRhdGlvbk9ic2VydmVyfHxzLldlYktpdE11dGF0aW9uT2JzZXJ2ZXIsYT1zLnByb2Nlc3MsZj1cInByb2Nlc3NcIj09bigyNCkoYSksbD1mdW5jdGlvbigpe3ZhciB0LGU7Zm9yKGYmJih0PWEuZG9tYWluKSYmKGEuZG9tYWluPW51bGwsdC5leGl0KCkpO3I7KWU9ci5kb21haW4sZSYmZS5lbnRlcigpLHIuZm4uY2FsbCgpLGUmJmUuZXhpdCgpLHI9ci5uZXh0O289dm9pZCAwLHQmJnQuZW50ZXIoKX07aWYoZilpPWZ1bmN0aW9uKCl7YS5uZXh0VGljayhsKX07ZWxzZSBpZih1KXt2YXIgaD0xLHA9ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoXCJcIik7bmV3IHUobCkub2JzZXJ2ZShwLHtjaGFyYWN0ZXJEYXRhOiEwfSksaT1mdW5jdGlvbigpe3AuZGF0YT1oPS1ofX1lbHNlIGk9ZnVuY3Rpb24oKXtjLmNhbGwocyxsKX07dC5leHBvcnRzPWZ1bmN0aW9uKHQpe3ZhciBlPXtmbjp0LG5leHQ6dm9pZCAwLGRvbWFpbjpmJiZhLmRvbWFpbn07byYmKG8ubmV4dD1lKSxyfHwocj1lLGkoKSksbz1lfX0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByLG8saSxzPW4oMTUpLGM9big3MSksdT1uKDcyKSxhPW4oNzMpLGY9bigxMCksbD1mLnByb2Nlc3MsaD1mLnNldEltbWVkaWF0ZSxwPWYuY2xlYXJJbW1lZGlhdGUsZD1mLk1lc3NhZ2VDaGFubmVsLHY9MCx5PXt9LGc9XCJvbnJlYWR5c3RhdGVjaGFuZ2VcIixfPWZ1bmN0aW9uKCl7dmFyIHQ9K3RoaXM7aWYoeS5oYXNPd25Qcm9wZXJ0eSh0KSl7dmFyIGU9eVt0XTtkZWxldGUgeVt0XSxlKCl9fSxtPWZ1bmN0aW9uKHQpe18uY2FsbCh0LmRhdGEpfTtoJiZwfHwoaD1mdW5jdGlvbih0KXtmb3IodmFyIGU9W10sbj0xO2FyZ3VtZW50cy5sZW5ndGg+bjspZS5wdXNoKGFyZ3VtZW50c1tuKytdKTtyZXR1cm4geVsrK3ZdPWZ1bmN0aW9uKCl7YyhcImZ1bmN0aW9uXCI9PXR5cGVvZiB0P3Q6RnVuY3Rpb24odCksZSl9LHIodiksdn0scD1mdW5jdGlvbih0KXtkZWxldGUgeVt0XX0sXCJwcm9jZXNzXCI9PW4oMjQpKGwpP3I9ZnVuY3Rpb24odCl7bC5uZXh0VGljayhzKF8sdCwxKSl9OmQ/KG89bmV3IGQsaT1vLnBvcnQyLG8ucG9ydDEub25tZXNzYWdlPW0scj1zKGkucG9zdE1lc3NhZ2UsaSwxKSk6Zi5hZGRFdmVudExpc3RlbmVyJiZcImZ1bmN0aW9uXCI9PXR5cGVvZiBwb3N0TWVzc2FnZSYmIWYuaW1wb3J0U2NyaXB0PyhyPWZ1bmN0aW9uKHQpe2YucG9zdE1lc3NhZ2UodCtcIlwiLFwiKlwiKX0sZi5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLG0sITEpKTpyPWcgaW4gYShcInNjcmlwdFwiKT9mdW5jdGlvbih0KXt1LmFwcGVuZENoaWxkKGEoXCJzY3JpcHRcIikpW2ddPWZ1bmN0aW9uKCl7dS5yZW1vdmVDaGlsZCh0aGlzKSxfLmNhbGwodCl9fTpmdW5jdGlvbih0KXtzZXRUaW1lb3V0KHMoXyx0LDEpLDApfSksdC5leHBvcnRzPXtzZXQ6aCxjbGVhcjpwfX0sZnVuY3Rpb24odCxlKXt0LmV4cG9ydHM9ZnVuY3Rpb24odCxlLG4pe3ZhciByPXZvaWQgMD09PW47c3dpdGNoKGUubGVuZ3RoKXtjYXNlIDA6cmV0dXJuIHI/dCgpOnQuY2FsbChuKTtjYXNlIDE6cmV0dXJuIHI/dChlWzBdKTp0LmNhbGwobixlWzBdKTtjYXNlIDI6cmV0dXJuIHI/dChlWzBdLGVbMV0pOnQuY2FsbChuLGVbMF0sZVsxXSk7Y2FzZSAzOnJldHVybiByP3QoZVswXSxlWzFdLGVbMl0pOnQuY2FsbChuLGVbMF0sZVsxXSxlWzJdKTtjYXNlIDQ6cmV0dXJuIHI/dChlWzBdLGVbMV0sZVsyXSxlWzNdKTp0LmNhbGwobixlWzBdLGVbMV0sZVsyXSxlWzNdKX1yZXR1cm4gdC5hcHBseShuLGUpfX0sZnVuY3Rpb24odCxlLG4pe3QuZXhwb3J0cz1uKDEwKS5kb2N1bWVudCYmZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50fSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxMyksbz1uKDEwKS5kb2N1bWVudCxpPXIobykmJnIoby5jcmVhdGVFbGVtZW50KTt0LmV4cG9ydHM9ZnVuY3Rpb24odCl7cmV0dXJuIGk/by5jcmVhdGVFbGVtZW50KHQpOnt9fX0sZnVuY3Rpb24odCxlLG4pe3ZhciByPW4oNDApKFwiaXRlcmF0b3JcIiksbz0hMTt0cnl7dmFyIGk9WzddW3JdKCk7aVtcInJldHVyblwiXT1mdW5jdGlvbigpe289ITB9LEFycmF5LmZyb20oaSxmdW5jdGlvbigpe3Rocm93IDJ9KX1jYXRjaChzKXt9dC5leHBvcnRzPWZ1bmN0aW9uKHQpe2lmKCFvKXJldHVybiExO3ZhciBlPSExO3RyeXt2YXIgbj1bN10saT1uW3JdKCk7aS5uZXh0PWZ1bmN0aW9uKCl7ZT0hMH0sbltyXT1mdW5jdGlvbigpe3JldHVybiBpfSx0KG4pfWNhdGNoKHMpe31yZXR1cm4gZX19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e1wiZGVmYXVsdFwiOm4oNzYpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7big0NiksbigzMSksdC5leHBvcnRzPW4oNzcpfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9bigxNCksbz1uKDU5KTt0LmV4cG9ydHM9bigxMSkuZ2V0SXRlcmF0b3I9ZnVuY3Rpb24odCl7dmFyIGU9byh0KTtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IFR5cGVFcnJvcih0K1wiIGlzIG5vdCBpdGVyYWJsZSFcIik7cmV0dXJuIHIoZS5jYWxsKHQpKX19LGZ1bmN0aW9uKHQsZSxuKXt0LmV4cG9ydHM9e1wiZGVmYXVsdFwiOm4oNzkpLF9fZXNNb2R1bGU6ITB9fSxmdW5jdGlvbih0LGUsbil7bigzMCksbigzMSksbig0Niksbig4MCksbig4MSksdC5leHBvcnRzPW4oMTEpLlNldH0sZnVuY3Rpb24odCxlLG4pe1widXNlIHN0cmljdFwiO3ZhciByPW4oNTIpO24oNjIpKFwiU2V0XCIsZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQodGhpcyxhcmd1bWVudHNbMF0pfX0se2FkZDpmdW5jdGlvbih0KXtyZXR1cm4gci5kZWYodGhpcyx0PTA9PT10PzA6dCx0KX19LHIpfSxmdW5jdGlvbih0LGUsbil7dmFyIHI9big5KTtyKHIuUCxcIlNldFwiLHt0b0pTT046big2NCkoXCJTZXRcIil9KX0sZnVuY3Rpb24odCxlKXtcInVzZSBzdHJpY3RcIjtlW1wiZGVmYXVsdFwiXT1mdW5jdGlvbih0KXtyZXR1cm4gdCYmdC5fX2VzTW9kdWxlP3Q6e1wiZGVmYXVsdFwiOnR9fSxlLl9fZXNNb2R1bGU9ITB9LGZ1bmN0aW9uKGUsbil7ZS5leHBvcnRzPXR9LGZ1bmN0aW9uKHQsZSl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gbih0LGUpe2lmKCF0KXRocm93IG5ldyBFcnJvcihcIltrb3RvXSBcIitlKX1lLl9fZXNNb2R1bGU9ITAsZVtcImRlZmF1bHRcIl09bix0LmV4cG9ydHM9ZVtcImRlZmF1bHRcIl19LGZ1bmN0aW9uKHQsZSxuKXtcInVzZSBzdHJpY3RcIjt2YXIgcj1uKDEpW1wiZGVmYXVsdFwiXSxvPW4oNjUpW1wiZGVmYXVsdFwiXSxpPW4oODIpW1wiZGVmYXVsdFwiXTtlLl9fZXNNb2R1bGU9ITA7dmFyIHM9big4NCksYz1pKHMpLHU9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KGUsbil7aWYocih0aGlzLHQpLHRoaXMuX2Jhc2U9ZSx0aGlzLl9oYW5kbGVycz17fSx0aGlzLl9saWZlY3ljbGVSZT0vXihlbnRlcnx1cGRhdGV8bWVyZ2V8ZXhpdCkoOnRyYW5zaXRpb24pPyQvLG4mJih0aGlzLmRhdGFCaW5kPW4uZGF0YUJpbmQsdGhpcy5pbnNlcnQ9bi5pbnNlcnQsXCJldmVudHNcImluIG4pKWZvcih2YXIgbyBpbiBuLmV2ZW50cyl0aGlzLm9uKG8sbi5ldmVudHNbb10pfXJldHVybiB0LnByb3RvdHlwZS5kYXRhQmluZD1mdW5jdGlvbigpe2NbXCJkZWZhdWx0XCJdKCExLFwiTGF5ZXJzIG11c3Qgc3BlY2lmeSBhIGRhdGFCaW5kIG1ldGhvZC5cIil9LHQucHJvdG90eXBlLmluc2VydD1mdW5jdGlvbigpe2NbXCJkZWZhdWx0XCJdKCExLFwiTGF5ZXJzIG11c3Qgc3BlY2lmeSBhbiBgaW5zZXJ0YCBtZXRob2QuXCIpfSx0LnByb3RvdHlwZS5vbj1mdW5jdGlvbih0LGUsbil7cmV0dXJuIG49bnx8e30sY1tcImRlZmF1bHRcIl0odGhpcy5fbGlmZWN5Y2xlUmUudGVzdCh0KSxcIlVucmVjb2duaXplZCBsaWZlY3ljbGUgZXZlbnQgbmFtZSBzcGVjaWZpZWQgdG8gJ0xheWVyI29uJzogJ1wiK3QrXCInLlwiKSx0IGluIHRoaXMuX2hhbmRsZXJzfHwodGhpcy5faGFuZGxlcnNbdF09W10pLHRoaXMuX2hhbmRsZXJzW3RdLnB1c2goe2NhbGxiYWNrOmUsY2hhcnQ6bi5jaGFydHx8bnVsbH0pLHRoaXN9LHQucHJvdG90eXBlLm9mZj1mdW5jdGlvbih0LGUpe3ZhciBuLHI9dGhpcy5faGFuZGxlcnNbdF07aWYoY1tcImRlZmF1bHRcIl0odGhpcy5fbGlmZWN5Y2xlUmUudGVzdCh0KSxcIlVucmVjb2duaXplZCBsaWZlY3ljbGUgZXZlbnQgbmFtZSBzcGVjaWZpZWQgdG8gJ0xheWVyI29uJzogJ1wiK3QrXCInLlwiKSwhcilyZXR1cm4gdGhpcztpZigxPT09YXJndW1lbnRzLmxlbmd0aClyZXR1cm4gci5sZW5ndGg9MCx0aGlzO2ZvcihuPXIubGVuZ3RoLTE7bj4tMTstLW4pcltuXS5jYWxsYmFjaz09PWUmJnIuc3BsaWNlKG4sMSk7cmV0dXJuIHRoaXN9LHQucHJvdG90eXBlLmRyYXc9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSh0LGUpe3ZhciBuPTA7MD09PXQuc2l6ZSgpP2UoKTp0LmVhY2goZnVuY3Rpb24oKXsrK259KS5lYWNoKFwiaW50ZXJydXB0LnByb21pc2VcIixmdW5jdGlvbigpe2UuYXBwbHkodGhpcyxhcmd1bWVudHMpfSkuZWFjaChcImVuZC5wcm9taXNlXCIsZnVuY3Rpb24oKXstLW58fGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfSl9ZnVuY3Rpb24gbih0KXt1LmNhbGwoZSxmdW5jdGlvbigpe3QoITApfSl9dmFyIHIsaSxzLHUsYSxmLGwsaCxwLGQsdix5PVtdO3I9dGhpcy5kYXRhQmluZC5jYWxsKHRoaXMuX2Jhc2UsdCksY1tcImRlZmF1bHRcIl0ociBpbnN0YW5jZW9mIGQzLnNlbGVjdGlvbixcIkludmFsaWQgc2VsZWN0aW9uIGRlZmluZWQgYnkgYExheWVyI2RhdGFCaW5kYCBtZXRob2QuXCIpLGNbXCJkZWZhdWx0XCJdKHIuZW50ZXIsXCJMYXllciBzZWxlY3Rpb24gbm90IHByb3Blcmx5IGJvdW5kLlwiKSxpPXIuZW50ZXIoKSxpLl9jaGFydD10aGlzLl9iYXNlLl9jaGFydCxzPVt7bmFtZTpcInVwZGF0ZVwiLHNlbGVjdGlvbjpyfSx7bmFtZTpcImVudGVyXCIsc2VsZWN0aW9uOmksbWV0aG9kOnRoaXMuaW5zZXJ0fSx7bmFtZTpcIm1lcmdlXCIsc2VsZWN0aW9uOnJ9LHtuYW1lOlwiZXhpdFwiLHNlbGVjdGlvbjpyLG1ldGhvZDpyLmV4aXR9XTtmb3IodmFyIGc9MCxfPXMubGVuZ3RoO18+ZzsrK2cpaWYobD1zW2ddLm5hbWUsdT1zW2ddLnNlbGVjdGlvbixhPXNbZ10ubWV0aG9kLFwiZnVuY3Rpb25cIj09dHlwZW9mIGEmJih1PWEuY2FsbCh1LHUpKSwhdS5lbXB0eSgpKXtpZihjW1wiZGVmYXVsdFwiXSh1JiZ1IGluc3RhbmNlb2YgZDMuc2VsZWN0aW9uLFwiSW52YWxpZCBzZWxlY3Rpb24gZGVmaW5lZCBmb3IgXCIrbCtcIiBsaWZlY3ljbGUgZXZlbnQuXCIpLGY9dGhpcy5faGFuZGxlcnNbbF0pZm9yKGg9MCxwPWYubGVuZ3RoO3A+aDsrK2gpdS5fY2hhcnQ9ZltoXS5jaGFydHx8dGhpcy5fYmFzZS5fY2hhcnQsZltoXS5jYWxsYmFjay5jYWxsKHUsdSk7aWYoZj10aGlzLl9oYW5kbGVyc1tsK1wiOnRyYW5zaXRpb25cIl0sZiYmZi5sZW5ndGgpZm9yKHU9dS50cmFuc2l0aW9uKCksdj1mLmxlbmd0aCxkPTA7dj5kOysrZCl1Ll9jaGFydD1mW2RdLmNoYXJ0fHx0aGlzLl9iYXNlLl9jaGFydCxmW2RdLmNhbGxiYWNrLmNhbGwodSx1KSx5LnB1c2gobmV3IG8obikpO3RoaXMucHJvbWlzZT1vLmFsbCh5KX19LHR9KCk7ZVtcImRlZmF1bHRcIl09dSx0LmV4cG9ydHM9ZVtcImRlZmF1bHRcIl19XSl9KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWtvdG8uanMubWFwIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWFwLCBUaWxlTGF5ZXIsIEdlb0pzb24gfSBmcm9tICdyZWFjdC1sZWFmbGV0JztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgZDMgZnJvbSAnZDMnO1xuXG4vLyBQYW5vcmFtYSBUb29sa2l0IGNvbXBvbmVudHMsXG4vLyBQYW5vcmFtYSB0ZW1wbGF0ZSBtb2R1bGVzLFxuLy8gYW5kIHJlbGF0ZWQgdXRpbHNcbi8vIGltcG9ydCB7IFB1bmNoY2FyZCB9IGZyb20gJ0BwYW5vcmFtYS90b29sa2l0JztcbmltcG9ydCB7IEFwcEFjdGlvbnMsIEFwcEFjdGlvblR5cGVzIH0gZnJvbSAnLi91dGlscy9BcHBBY3Rpb25DcmVhdG9yJztcblxuLypcbiAqIERhdGEgZmxvdyB2aWEgRmx1eDpcbiAqIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL2ZsdXgvZG9jcy9vdmVydmlldy5odG1sXG4gKiBcbiAqICAgICAgICAgICAgICAgICAg4pSMLS0tLS0gICBhY3Rpb25zICA8LS0tLS3ilJBcbiAqICAgICAgICAgICAgICAgICAgdiAgICAgICAgICAgICAgICAgICAgICAgfFxuICogYWN0aW9ucyAtLT4gZGlzcGF0Y2hlciAtLT4gc3RvcmVzIC0tPiB2aWV3c1xuICovXG5cbi8vIHN0b3Jlc1xuaW1wb3J0IENvbW1vZGl0eVN0b3JlIGZyb20gJy4vc3RvcmVzL0NvbW1vZGl0eVN0b3JlJztcblxuXG4vLyBjb21wb25lbnRzIChUT0RPOiBtb3ZlIGludG8gQHBhbm9yYW1hL3Rvb2xraXQpXG5pbXBvcnQgUHVuY2hjYXJkIGZyb20gJy4vY29tcG9uZW50cy9QdW5jaGNhcmQvUHVuY2hjYXJkLmpzeCc7XG5pbXBvcnQgSXRlbVNlbGVjdG9yIGZyb20gJy4vY29tcG9uZW50cy9JdGVtU2VsZWN0b3IvSXRlbVNlbGVjdG9yLmpzeCc7XG5pbXBvcnQgT2Zmc2V0QXJlYUNoYXJ0IGZyb20gJy4vY29tcG9uZW50cy9PZmZzZXRBcmVhQ2hhcnQvT2Zmc2V0QXJlYUNoYXJ0LmpzeCc7XG5pbXBvcnQgQ2hhcnRTbGlkZXIgZnJvbSAnLi9jb21wb25lbnRzL0NoYXJ0U2xpZGVyL0NoYXJ0U2xpZGVyLmpzeCc7XG5pbXBvcnQgQ2FydG9EQlRpbGVMYXllciBmcm9tICcuL2NvbXBvbmVudHMvQ2FydG9EQlRpbGVMYXllci5qc3gnO1x0Ly8gVE9ETzogc3VibWl0IGFzIFBSIHRvIHJlYWN0LWxlYWZsZXRcbmltcG9ydCBDYW5hbERldGFpbFBhbmVsIGZyb20gJy4vY29tcG9uZW50cy9DYW5hbERldGFpbFBhbmVsLmpzeCc7XG5cblxuLy8gYWN0aW9uc1xuXG5cbi8vIHV0aWxzXG5cblxuLy8gY29uZmlnXG5pbXBvcnQgdGlsZUxheWVycyBmcm9tICcuLi9iYXNlbWFwcy90aWxlTGF5ZXJzLmpzb24nO1xuaW1wb3J0IGNhcnRvZGJDb25maWcgZnJvbSAnLi4vYmFzZW1hcHMvY2FydG9kYi9jb25maWcuanNvbic7XG5pbXBvcnQgY2FydG9kYkxheWVycyBmcm9tICcuLi9iYXNlbWFwcy9jYXJ0b2RiL2Jhc2VtYXBzLmpzb24nO1xuXG5cbi8vIG1haW4gYXBwIGNvbnRhaW5lclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHQvLyBwcm9wZXJ0eSB2YWxpZGF0aW9uIChFUzctc3R5bGUgUmVhY3QpXG5cdHN0YXRpYyBwcm9wVHlwZXMgPSB7XG5cdFx0Lypcblx0XHRsZWdlbmREYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXHRcdGV4YW1wbGVUaXRsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHQqL1xuXHR9O1xuXG5cdC8vIHByb3BlcnR5IGRlZmF1bHRzIChFUzctc3R5bGUgUmVhY3QpXG5cdC8vIChpbnN0ZWFkIG9mIEVTNS1zdHlsZSBnZXREZWZhdWx0UHJvcHMpXG5cdHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG5cdFx0Lypcblx0XHRsZWdlbmREYXRhOiB7XG5cdFx0XHRpdGVtczogW1xuXHRcdFx0XHQnbmFycmF0aXZlcycsXG5cdFx0XHRcdCdjb3R0b24nLFxuXHRcdFx0XHQnc3VnYXInXG5cdFx0XHRdLFxuXHRcdFx0aW5pdGlhbFNlbGVjdGlvbjogJ25hcnJhdGl2ZXMnXG5cdFx0fSxcblxuXHRcdGV4YW1wbGVUaXRsZTogJ0V4YW1wbGUgQ29tcG9uZW50J1xuXHRcdCovXG5cdH07XG5cblx0Y29uc3RydWN0b3IgKHByb3BzKSB7XG5cblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHQvLyBzZXQgdXAgaW5pdGlhbCBzdGF0ZSBpbiBjb25zdHJ1Y3RvclxuXHRcdC8vIChpbnN0ZWFkIG9mIEVTNS1zdHlsZSBnZXRJbml0aWFsU3RhdGUpXG5cdFx0dGhpcy5zdGF0ZSA9IHRoaXMuZ2V0RGVmYXVsdFN0YXRlKCk7XG5cblx0XHQvLyBiaW5kIGhhbmRsZXJzIHRvIHRoaXMgY29tcG9uZW50IGluc3RhbmNlLFxuXHRcdC8vIHNpbmNlIFJlYWN0IG5vIGxvbmdlciBkb2VzIHRoaXMgYXV0b21hdGljYWxseSB3aGVuIHVzaW5nIEVTNlxuXHRcdHRoaXMub25NYXBNb3ZlID0gdGhpcy5vbk1hcE1vdmUuYmluZCh0aGlzKTtcblx0XHR0aGlzLm9uV2luZG93UmVzaXplID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuc3RvcmVDaGFuZ2VkID0gdGhpcy5zdG9yZUNoYW5nZWQuYmluZCh0aGlzKTtcblxuXHR9XG5cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAvL1xuXHQvLyBMaWZlY3ljbGVcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXG5cblx0Y29tcG9uZW50V2lsbE1vdW50ICgpIHtcblxuXHRcdHRoaXMuY29tcHV0ZUNvbXBvbmVudERpbWVuc2lvbnMoKTtcblxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMub25XaW5kb3dSZXNpemUpO1xuXHRcdENvbW1vZGl0eVN0b3JlLmFkZExpc3RlbmVyKEFwcEFjdGlvblR5cGVzLnN0b3JlQ2hhbmdlZCwgdGhpcy5zdG9yZUNoYW5nZWQpO1xuXG5cdFx0QXBwQWN0aW9ucy5sb2FkSW5pdGlhbERhdGEodGhpcy5zdGF0ZSk7XG5cblx0fVxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcblxuXHRcdENvbW1vZGl0eVN0b3JlLnJlbW92ZUxpc3RlbmVyKEFwcEFjdGlvblR5cGVzLnN0b3JlQ2hhbmdlZCwgdGhpcy5zdG9yZUNoYW5nZWQpO1xuXG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUgKCkge1xuXG5cdFx0Ly9cblxuXHR9XG5cblx0Z2V0RGVmYXVsdFN0YXRlICgpIHtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRkaW1lbnNpb25zOiB7XG5cdFx0XHRcdHVwcGVyTGVmdDoge1xuXHRcdFx0XHRcdHdpZHRoOiAwLFxuXHRcdFx0XHRcdGhlaWdodDogMFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR1cHBlclJpZ2h0OiB7XG5cdFx0XHRcdFx0d2lkdGg6IDAsXG5cdFx0XHRcdFx0aGVpZ2h0OiAwXG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHRzZWxlY3RlZENhbmFsOiAyMixcdFx0XHQvLyBFcmllIENhbmFsXG5cdFx0XHRzZWxlY3RlZFllYXI6IDE4NDksXG5cdFx0XHRzZWxlY3RlZENvbW1vZGl0eTogbnVsbCxcblx0XHRcdHRpbWVsaW5lOiB7fSxcblx0XHRcdHB1bmNoY2FyZDoge30sXG5cdFx0XHRjYW5hbERldGFpbDoge31cblx0XHR9O1xuXG5cdH1cblxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXG5cdC8vIEhhbmRsZXJzXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAvL1xuXG5cdG9uTWFwTW92ZSAoZXZlbnQpIHtcblxuXHRcdC8vIFRPRE86IGVtaXQgZXZlbnQgdGhhdCBpcyBwaWNrZWQgdXAgYnkgaGFzaCBtYW5hZ2VyIGNvbXBvbmVudFxuXHRcdC8vIHRoaXMudXBkYXRlVVJMKHtsb2M6IGhhc2hVdGlscy5mb3JtYXRDZW50ZXJBbmRab29tKGV2dC50YXJnZXQpfSwgdHJ1ZSk7XG5cdFx0Y29uc29sZS5sb2coXCI+Pj4+PiBtYXAgbW92ZWRcIik7XG5cblx0fVxuXG5cdG9uV2luZG93UmVzaXplIChldmVudCkge1xuXG5cdFx0dGhpcy5jb21wdXRlQ29tcG9uZW50RGltZW5zaW9ucygpO1xuXG5cdH1cblxuXHRzdG9yZUNoYW5nZWQgKCkge1xuXG5cdFx0dGhpcy5zZXRTdGF0ZSh7XG5cdFx0XHR0aW1lbGluZTogdGhpcy5kZXJpdmVUaW1lbGluZURhdGEoKSxcblx0XHRcdHB1bmNoY2FyZDogdGhpcy5kZXJpdmVQdW5jaGNhcmREYXRhKCksXG5cdFx0XHRjYW5hbERldGFpbDogdGhpcy5kZXJpdmVDYW5hbERldGFpbERhdGEoKVxuXHRcdH0pO1xuXG5cdH1cblxuXG5cblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXG5cdC8vIEhlbHBlcnNcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXG5cblx0Y29tcHV0ZUNvbXBvbmVudERpbWVuc2lvbnMgKCkge1xuXG5cdFx0Ly8gYmFzZWQgb2ZmIG9mIHNpemVzIHN0b3JlZCB3aXRoaW4gX3ZhcmlhYmxlcy5zY3NzIC0tXG5cdFx0Ly8gaWYgeW91IGNoYW5nZSB0aGVtIHRoZXJlLCBjaGFuZ2UgdGhlbSBoZXJlLlxuXHRcdGxldCBjb250YWluZXJQYWRkaW5nID0gMjAsXG5cdFx0ICAgIGhlYWRlckhlaWdodCA9IDgwLFxuXHRcdCAgICBib3R0b21Sb3dIZWlnaHQgPSAyMzAsXG5cdFx0ICAgIGRpbWVuc2lvbnMgPSB7fTtcblxuXHRcdGRpbWVuc2lvbnMudXBwZXJSaWdodCA9IHtcblx0XHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IC0gYm90dG9tUm93SGVpZ2h0IC0gMyAqIGNvbnRhaW5lclBhZGRpbmdcblx0XHR9O1xuXHRcdGRpbWVuc2lvbnMudXBwZXJMZWZ0ID0ge1xuXHRcdFx0aGVpZ2h0OiBkaW1lbnNpb25zLnVwcGVyUmlnaHQuaGVpZ2h0IC0gaGVhZGVySGVpZ2h0XG5cdFx0fTtcblx0XHRkaW1lbnNpb25zLmxvd2VyTGVmdCA9IHtcblx0XHRcdGhlaWdodDogYm90dG9tUm93SGVpZ2h0IC0gMiAqIGNvbnRhaW5lclBhZGRpbmdcblx0XHR9O1xuXHRcdGRpbWVuc2lvbnMubG93ZXJSaWdodCA9IHtcblx0XHRcdGhlaWdodDogZGltZW5zaW9ucy5sb3dlckxlZnQuaGVpZ2h0XG5cdFx0fTtcblxuXHRcdHRoaXMuc2V0U3RhdGUoeyBkaW1lbnNpb25zOiBkaW1lbnNpb25zIH0pO1xuXG5cdH1cblxuXHRkZXJpdmVUaW1lbGluZURhdGEgKCkge1xuXG5cdFx0bGV0IGRhdGEgPSB7XG5cdFx0XHRzZWxlY3RlZENhbmFsOiBDb21tb2RpdHlTdG9yZS5nZXRTZWxlY3RlZENhbmFsKCksXG5cdFx0XHRjYW5hbHM6IENvbW1vZGl0eVN0b3JlLmdldEFsbENhbmFscygpXG5cdFx0fTtcblxuXHRcdGxldCBjb21tcyA9IENvbW1vZGl0eVN0b3JlLmdldEFsbENvbW1vZGl0aWVzKCk7XG5cblx0XHQvLyBzb3J0IGJ5IGNhbmFsIHN0YXJ0WWVhciwgYW5kIG1lcmdlIGluIHN0YXJ0WWVhciBhbmQgZW5kWWVhclxuXHRcdGxldCBzdGFydFllYXJTb3J0ZWRDYW5hbElkcyA9IE9iamVjdC5rZXlzKGNvbW1zKS5zb3J0KChhLCBiKSA9PiB7XG5cdFx0XHRcdHJldHVybiBkYXRhLmNhbmFsc1thXS5zdGFydFllYXIgLSBkYXRhLmNhbmFsc1tiXS5zdGFydFllYXI7XG5cdFx0XHR9KSxcblx0XHRcdHN0YXJ0WWVhclNvcnRlZENvbW1zID0gc3RhcnRZZWFyU29ydGVkQ2FuYWxJZHMubWFwKGNhbmFsSWQgPT4gY29tbXNbY2FuYWxJZF0pLFxuXHRcdFx0c3RhcnRFbmRZZWFycyA9IHN0YXJ0WWVhclNvcnRlZENhbmFsSWRzLm1hcChjYW5hbElkID0+ICh7XG5cdFx0XHRcdHN0YXJ0WWVhcjogZGF0YS5jYW5hbHNbY2FuYWxJZF0uc3RhcnRZZWFyLFxuXHRcdFx0XHRlbmRZZWFyOiBkYXRhLmNhbmFsc1tjYW5hbElkXS5lbmRZZWFyXG5cdFx0XHR9KSk7XG5cblx0XHQvLyBUT0RPOiB0aGVzZSBjb25zdGFudHMgc2hvdWxkIGV4aXN0IGVsc2V3aGVyZS5cblx0XHRjb25zdCBNSU5fWUVBUiA9IDE4MjA7XG5cdFx0Y29uc3QgTUFYX1lFQVIgPSAxODYwO1xuXHRcdGNvbnN0IE1JTl9UT05OQUdFID0gMDtcblx0XHRjb25zdCBNQVhfVE9OTkFHRSA9IDQwMDAwMDA7XG5cblx0XHRkYXRhLm9mZnNldEFyZWFDaGFydENvbmZpZyA9IHtcblx0XHRcdGRhdGE6IHN0YXJ0RW5kWWVhcnMsXG5cdFx0XHRtYXJnaW46IHsgdG9wOiAwLCByaWdodDogMjAsIGJvdHRvbTogNDAsIGxlZnQ6IDIwIH0sXG5cdFx0XHR4U2NhbGU6IGQzLnNjYWxlLmxpbmVhcigpXG5cdFx0XHRcdC5kb21haW4oW01JTl9ZRUFSLCBNQVhfWUVBUl0pLFxuXHRcdFx0eVNjYWxlOiBkMy5zY2FsZS5saW5lYXIoKVxuXHRcdFx0XHQuZG9tYWluKFtNSU5fVE9OTkFHRSwgTUFYX1RPTk5BR0VdKSxcblx0XHRcdGF4aXNQcm9wczogbnVsbCxcblxuXHRcdFx0YXJlYUNoYXJ0RGF0YTogXy52YWx1ZXMoc3RhcnRZZWFyU29ydGVkQ29tbXMpLm1hcCh2ID0+IF8udmFsdWVzKHYpKSxcblx0XHRcdGFyZWFDaGFydENvbmZpZzoge1xuXHRcdFx0XHR4QWNjZXNzb3I6IGQgPT4gZC55ZWFyLFxuXHRcdFx0XHR5QWNjZXNzb3I6IGQgPT4gZC50b3RhbE5vcm1hbGl6ZWRWYWx1ZSB8fCAwXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGRhdGEuY2hhcnRTbGlkZXIgPSB7XG5cdFx0XHRzY2FsZTogZGF0YS5vZmZzZXRBcmVhQ2hhcnRDb25maWcueFNjYWxlLFxuXHRcdFx0bWFyZ2luOiBkYXRhLm9mZnNldEFyZWFDaGFydENvbmZpZy5tYXJnaW4sXG5cdFx0XHRzZWxlY3RlZFZhbHVlOiBDb21tb2RpdHlTdG9yZS5nZXRTZWxlY3RlZFllYXIoKVxuXHRcdH07XG5cblx0XHRyZXR1cm4gZGF0YTtcblxuXHR9XG5cblx0ZGVyaXZlUHVuY2hjYXJkRGF0YSAoKSB7XG5cblx0XHRsZXQgZGF0YSA9IHt9LFxuXHRcdCAgICBjYW5hbE1ldGFkYXRhID0gQ29tbW9kaXR5U3RvcmUuZ2V0U2VsZWN0ZWRDYW5hbCgpLFxuXHRcdCAgICBjb21tb2RpdGllcyA9IENvbW1vZGl0eVN0b3JlLmdldENvbW1vZGl0aWVzQnlDYW5hbEJ5WWVhcigpO1xuXG5cdFx0ZGF0YS5oZWFkZXIgPSB7XG5cdFx0XHR0aXRsZTogY2FuYWxNZXRhZGF0YSA/IGNhbmFsTWV0YWRhdGEubmFtZSA6ICcnLFxuXHRcdFx0c3VidGl0bGU6IENvbW1vZGl0eVN0b3JlLmdldFNlbGVjdGVkWWVhcigpIHx8ICcnLFxuXHRcdFx0Y2FwdGlvbjogY29tbW9kaXRpZXMgPyBjb21tb2RpdGllcy50b3RhbE5vcm1hbGl6ZWRWYWx1ZSA6ICcnXG5cdFx0fTtcblxuXHRcdC8vIFB1bmNoY2FyZCBuZWVkcyBhcnJheXMgdG8gd29yayB3aXRoIGQzIHNlbGVjdGlvbnNcblx0XHRkYXRhLml0ZW1zID0gY29tbW9kaXRpZXMgPyBfLnZhbHVlcyhjb21tb2RpdGllcy5jb21tb2RpdGllcykgOiBbXTtcblx0XHRkYXRhLmNhdGVnb3JpZXMgPSBjb21tb2RpdGllcyA/IF8udmFsdWVzKGNvbW1vZGl0aWVzLmNvbW1vZGl0eUNhdGVnb3JpZXMpIDogW107XG5cdFx0XG5cdFx0cmV0dXJuIGRhdGE7XG5cblx0fVxuXG5cdGRlcml2ZUNhbmFsRGV0YWlsRGF0YSAoKSB7XG5cblx0XHRsZXQgZGF0YSA9IHtcblx0XHRcdGNhbmFsTWV0YWRhdGE6IENvbW1vZGl0eVN0b3JlLmdldFNlbGVjdGVkQ2FuYWwoKSxcblx0XHRcdGNvbW1vZGl0aWVzOiBDb21tb2RpdHlTdG9yZS5nZXRDb21tb2RpdGllc0J5Q2FuYWxCeVllYXIoKVxuXHRcdH07XG5cblx0XHRyZXR1cm4gZGF0YTtcblxuXHR9XG5cblxuXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAvL1xuXHQvLyBSZW5kZXJcblx0Ly8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXG5cblx0cmVuZGVyICgpIHtcblxuXHRcdC8vIFRPRE86IHRoZXNlIHZhbHVlcyBuZWVkIHRvIGdvIGVsc2V3aGVyZSwgcHJvYmFibHkgaW4gYSBjb21wb25lbnRpemVkIGhhc2ggcGFyc2VyL21hbmFnZXJcblx0XHR2YXIgbG9jID0gWy0xLjUsIDE1LjBdLFxuXHRcdFx0em9vbSA9IDY7XG5cblx0XHQvLyBUT0RPOiB0aGVzZSB2YWx1ZXMgbWlnaHQgd2FudCB0byBiZSBzZXQgYXMgZGVmYXVsdHMgb24gdGhlIExlYWZsZXRNYXAgY29tcG9uZW50P1xuXHRcdGxldCBkZWJvdW5jZSA9IGZ1bmN0aW9uIChmbiwgZGVsYXkpIHtcblx0XHRcdFx0bGV0IHRpbWVvdXQ7XG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdFx0XHRcdGxldCB0aGF0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcblx0XHRcdFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdGZuLmFwcGx5KHRoYXQsIGFyZ3MpO1xuXHRcdFx0XHRcdH0sIGRlbGF5KTtcblx0XHRcdFx0fTtcblx0XHRcdH0sXG5cdFx0ICAgIG1hcEV2ZW50cyA9IHtcblx0XHRcdFx0bW92ZTogZGVib3VuY2UodGhpcy5vbk1hcE1vdmUsIDI1MClcblx0XHRcdH0sXG5cdFx0XHRtYXBPcHRpb25zID0ge1xuXHRcdFx0XHRzY3JvbGxXaGVlbFpvb206IGZhbHNlLFxuXHRcdFx0XHRhdHRyaWJ1dGlvbkNvbnRyb2w6IGZhbHNlLFxuXHRcdFx0XHRtaW5ab29tOiA0LFxuXHRcdFx0XHRtYXhab29tOiAxMCxcblx0XHRcdFx0bWF4Qm91bmRzOiBbWy00Ny4wNDAxLCAtODUuMzQxN10sIFszNy4zNzAxLDg5LjQ3MjZdXVxuXHRcdFx0fTtcblxuXHRcdGNvbnN0IFRJTUVMSU5FX0lOSVRJQUxfV0lEVEggPSA1MDA7XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0PGRpdiBjbGFzc05hbWU9J2NvbnRhaW5lciBmdWxsLWhlaWdodCc+XG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdyb3cgZnVsbC1oZWlnaHQnPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb2x1bW5zIGVpZ2h0IGxlZnQtY29sdW1uIGZ1bGwtaGVpZ2h0Jz5cblx0XHRcdFx0XHRcdDxoZWFkZXIgY2xhc3NOYW1lPSdyb3cgdS1mdWxsLXdpZHRoJz5cblx0XHRcdFx0XHRcdFx0PGgxPjxzcGFuIGNsYXNzTmFtZT0naGVhZGVyLW1haW4nPkNBTkFMUzwvc3Bhbj48c3BhbiBjbGFzc05hbWU9J2hlYWRlci1zdWInPjE4MjAmbmRhc2g7MTg2MDwvc3Bhbj48L2gxPlxuXHRcdFx0XHRcdFx0PC9oZWFkZXI+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ncm93IHRvcC1yb3cgdGVtcGxhdGUtdGlsZScgc3R5bGU9eyB7IGhlaWdodDogdGhpcy5zdGF0ZS5kaW1lbnNpb25zLnVwcGVyTGVmdC5oZWlnaHQgKyBcInB4XCIgfSB9PlxuXHRcdFx0XHRcdFx0XHQ8TWFwXG5cdFx0XHRcdFx0XHRcdFx0Y2VudGVyPXtsb2N9XG5cdFx0XHRcdFx0XHRcdFx0em9vbT17em9vbX1cblx0XHRcdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0XHR7IGNhcnRvZGJMYXllcnMubGF5ZXJncm91cC5sYXllcnMubWFwKChpdGVtLCBpKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdFx0XHRcdDxDYXJ0b0RCVGlsZUxheWVyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGtleT17IGkgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR1c2VySWQ9eyBjYXJ0b2RiQ29uZmlnLnVzZXJJZCB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHNxbD17IGl0ZW0ub3B0aW9ucy5zcWwgfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjYXJ0b2Nzcz17IGl0ZW0ub3B0aW9ucy5jYXJ0b2NzcyB9XG5cdFx0XHRcdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH0pIH1cblx0XHRcdFx0XHRcdFx0eyB0aWxlTGF5ZXJzLmxheWVycy5tYXAoKGl0ZW0sIGkpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHRcdFx0PFRpbGVMYXllclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRrZXk9eyBpIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0dXJsPXsgaXRlbS51cmwgfVxuXHRcdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9KSB9XG5cdFx0XHRcdFx0XHRcdDwvTWFwPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ncm93IGJvdHRvbS1yb3cgdGVtcGxhdGUtdGlsZSc+XG5cdFx0XHRcdFx0XHRcdDxJdGVtU2VsZWN0b3IgaXRlbXM9eyB0aGlzLnN0YXRlLnRpbWVsaW5lLmNhbmFscyB9IHNlbGVjdGVkSXRlbT17IHRoaXMuc3RhdGUudGltZWxpbmUuc2VsZWN0ZWRDYW5hbCB9IC8+XG5cdFx0XHRcdFx0XHRcdDxDaGFydFNsaWRlciB7IC4uLnRoaXMuc3RhdGUudGltZWxpbmUuY2hhcnRTbGlkZXIgfSB3aWR0aD17IFRJTUVMSU5FX0lOSVRJQUxfV0lEVEggfSBoZWlnaHQ9eyB0aGlzLnN0YXRlLmRpbWVuc2lvbnMubG93ZXJMZWZ0LmhlaWdodCB9ID5cblx0XHRcdFx0XHRcdFx0XHQ8T2Zmc2V0QXJlYUNoYXJ0IHsgLi4udGhpcy5zdGF0ZS50aW1lbGluZS5vZmZzZXRBcmVhQ2hhcnRDb25maWcgfSAvPlxuXHRcdFx0XHRcdFx0XHQ8L0NoYXJ0U2xpZGVyPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2NvbHVtbnMgZm91ciByaWdodC1jb2x1bW4gZnVsbC1oZWlnaHQnPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9JyByb3cgdG9wLXJvdyB0ZW1wbGF0ZS10aWxlJyBzdHlsZT17IHsgaGVpZ2h0OiB0aGlzLnN0YXRlLmRpbWVuc2lvbnMudXBwZXJSaWdodC5oZWlnaHQgKyBcInB4XCIgfSB9ID5cblx0XHRcdFx0XHRcdFx0PFB1bmNoY2FyZCBoZWFkZXI9eyB0aGlzLnN0YXRlLnB1bmNoY2FyZC5oZWFkZXIgfSBjYXRlZ29yaWVzPXsgdGhpcy5zdGF0ZS5wdW5jaGNhcmQuY2F0ZWdvcmllcyB9IGl0ZW1zPXsgdGhpcy5zdGF0ZS5wdW5jaGNhcmQuaXRlbXMgfS8+XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdyb3cgYm90dG9tLXJvdyB0ZW1wbGF0ZS10aWxlJz5cblx0XHRcdFx0XHRcdFx0PENhbmFsRGV0YWlsUGFuZWwgeyAuLi50aGlzLnN0YXRlLmNhbmFsRGV0YWlsIH0gLz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCA8L2Rpdj5cblx0XHQpO1xuXG5cdH1cblxufVxuIiwiaW1wb3J0IGQzIGZyb20gJ2QzJztcbmltcG9ydCBDaGFydEJhc2UgZnJvbSAnLi4vY2hhcnRzL0NoYXJ0QmFzZSc7XG5pbXBvcnQgUGFub3JhbWFDaGFydCBmcm9tICcuLi9jaGFydHMvUGFub3JhbWFDaGFydC5qc3gnO1xuLy8gaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcmVhQ2hhcnQgZXh0ZW5kcyBQYW5vcmFtYUNoYXJ0IHtcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuY2hhcnRDb25zdHJ1Y3RvciA9IEFyZWFDaGFydEltcGw7XG4gIH1cblxuICBnZXRDbGFzc1N1ZmZpeCAoKSB7XG4gICAgcmV0dXJuICdhcmVhLWNoYXJ0JztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQXJlYUNoYXJ0SW1wbCBleHRlbmRzIENoYXJ0QmFzZSB7XG5cbiAgY29uc3RydWN0b3IgKHNlbGVjdGlvbiwgcHJvcHMpIHtcblxuICAgIHN1cGVyKHNlbGVjdGlvbiwgcHJvcHMpO1xuXG4gICAgbGV0IGFyZWFHZW5lcmF0b3IgPSBkMy5zdmcuYXJlYSgpXG4gICAgICAuaW50ZXJwb2xhdGUoJ2Jhc2lzJylcbiAgICAgIC54KGQgPT4gdGhpcy5jb25maWcoJ3hTY2FsZScpKHRoaXMuYWNjZXNzb3IoJ3gnKShkKSkpXG4gICAgICAueTAoZCA9PiB0aGlzLmNvbmZpZygneVNjYWxlJykoMCkpXG4gICAgICAueTEoZCA9PiB0aGlzLmNvbmZpZygneVNjYWxlJykodGhpcy5hY2Nlc3NvcigneScpKGQpKSk7XG5cblxuICAgIC8vIGFwcGVuZCBncm91cCB0byBjaGFydFxuICAgIGxldCBhcmVhID0gdGhpcy5iYXNlTGF5ZXIgPSB0aGlzLmJhc2UuYXBwZW5kKCdnJykuY2xhc3NlZCgnYXJlYS1sYXllcicsIHRydWUpO1xuXG4gICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKCk7XG5cbiAgICAvLyBkZWZpbmUgbGF5ZXJcbiAgICBsZXQgbGF5ZXIgPSB0aGlzLmxheWVyKCdhcmVhLWxheWVyJywgYXJlYSwge1xuICAgICAgZGF0YUJpbmQ6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdEFsbCgncGF0aC5hcmVhJykuZGF0YShkYXRhKTtcbiAgICAgIH0sXG5cbiAgICAgIGluc2VydDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdhcmVhJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTZXR1cCBsaWZlLWN5Y2xlIGV2ZW50cyBvbiBsYXllcnNcbiAgICBsYXllci5vbigndXBkYXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gdGhpcyA9PiBiYXNlIHNlbGVjdGlvblxuICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgLmF0dHIoJ2QnLCBkID0+IGFyZWFHZW5lcmF0b3IoZCkpO1xuICAgIH0pXG4gICAgLm9uKCdlbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHRoaXMgPT4gZW50ZXIgc2VsZWN0aW9uXG4gICAgICByZXR1cm4gdGhpc1xuICAgICAgICAuYXR0cignZCcsIGQgPT4gYXJlYUdlbmVyYXRvcihkKSk7XG4gICAgfSlcbiAgICAub24oJ21lcmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gdGhpcyA9PiBiYXNlIHNlbGVjdGlvblxuICAgIH0pXG4gICAgLm9uKCdleGl0JywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gdGhpcyA9PiBleGl0IHNlbGVjdGlvblxuICAgIH0pO1xuICB9XG4gIFxuICB1cGRhdGVTY2FsZXMgKGRhdGEpIHtcblxuICAgIHRoaXMuY29uZmlnKCd4U2NhbGUnKS5yYW5nZShbMCwgdGhpcy5faW5uZXJXaWR0aF0pO1xuICAgIHRoaXMuY29uZmlnKCd5U2NhbGUnKS5yYW5nZShbdGhpcy5faW5uZXJIZWlnaHQsIDBdKTtcblxuICB9XG5cbn1cbiIsImltcG9ydCBSZWFjdCwgeyBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RUYWJzLCB7IFRhYiwgVGFicywgVGFiTGlzdCwgVGFiUGFuZWwgfSBmcm9tICdyZWFjdC10YWJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FuYWxEZXRhaWxQYW5lbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Ly8gcHJvcGVydHkgdmFsaWRhdGlvbiAoRVM3LXN0eWxlIFJlYWN0KVxuXHRzdGF0aWMgcHJvcFR5cGVzID0ge1xuXHRcdGNhbmFsOiBQcm9wVHlwZXMub2JqZWN0LFxuXHRcdGNvbW1vZGl0aWVzOiBQcm9wVHlwZXMuYXJyYXlcblx0fTtcblxuXHQvLyBwcm9wZXJ0eSBkZWZhdWx0cyAoRVM3LXN0eWxlIFJlYWN0KVxuXHQvLyAoaW5zdGVhZCBvZiBFUzUtc3R5bGUgZ2V0RGVmYXVsdFByb3BzKVxuXHRzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuXHRcdC8vXG5cdH07XG5cblx0Y29uc3RydWN0b3IgKHByb3BzKSB7XG5cblx0XHRzdXBlcihwcm9wcyk7XG5cblx0fVxuXG5cblxuXHQvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gLy9cblx0Ly8gTGlmZWN5Y2xlXG5cdC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAvL1xuXG5cdGNvbXBvbmVudFdpbGxNb3VudCAoKSB7XG5cblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcblxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuXG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUgKCkge1xuXG5cdH1cblxuXHRvblRhYlNlbGVjdGVkIChpbmRleCwgbGFzdCkge1xuXG5cdFx0Y29uc29sZS5sb2coJz4+Pj4+IFNlbGVjdGVkIHRhYjogJyArIGluZGV4ICsgJywgTGFzdCB0YWI6ICcgKyBsYXN0KTtcblxuXHR9XG5cblx0cmVuZGVyICgpIHtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8VGFic1xuXHRcdFx0XHRvblNlbGVjdD17IHRoaXMub25UYWJTZWxlY3RlZGVkIH1cblx0XHRcdFx0c2VsZWN0ZWRJbmRleD17IDAgfVxuXHRcdFx0PlxuXHRcdFx0XHQ8VGFiTGlzdD5cblx0XHRcdFx0XHQ8VGFiPkNBTkFMIElORk88L1RhYj5cblx0XHRcdFx0XHQ8VGFiPkNPTU1PRElUSUVTPC9UYWI+XG5cdFx0XHRcdDwvVGFiTGlzdD5cblx0XHRcdFx0PFRhYlBhbmVsPlxuXHRcdFx0XHRcdDxoMj5BQk9VVCBUSEUgQ0FOQUw8L2gyPlxuXHRcdFx0XHQ8L1RhYlBhbmVsPlxuXHRcdFx0XHQ8VGFiUGFuZWw+XG5cdFx0XHRcdFx0PGgyPkNPTU1PRElUSUVTPC9oMj5cblx0XHRcdFx0PC9UYWJQYW5lbD5cblx0XHRcdDwvVGFicz5cblx0XHQpO1xuXG5cdH1cblxufVxuIiwiLypcbiAqIFRPRE86IFN1Ym1pdCB0aGlzIGNvbXBvbmVudCBhcyBhIFBSIHRvIHJlYWN0LWxlYWZsZXQsXG4gKiBpbnN0ZWFkIG9mIGFkZGluZyB0byBAcGFub3JhbWEuXG4gKiBNaWdodCBuZWVkIHRvIHN1Ym1pdCB3aXRoIHRlc3RzLCBidXQgb3RoZXIgc2ltaWxhciBjb21wb25lbnRzIGFyZSBub3QgY3VycmVudGx5IHRlc3RlZC5cbiAqIFdpbGwgbmVlZCB0byBwdWxsIGluIENhcnRvREIgZGVwZW5kZW5jeSB2aWEgYW4gYG5wbSBpbnN0YWxsYCBhbmQgYW4gYGltcG9ydGBcbiAqIHJhdGhlciB0aGFuIHZpYSBhIGdsb2JhbCA8c2NyaXB0PiBpbmNsdWRlLlxuICovXG5cbmltcG9ydCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHRpbGVMYXllciB9IGZyb20gJ2xlYWZsZXQnO1xuaW1wb3J0IHsgQmFzZVRpbGVMYXllciB9IGZyb20gJ3JlYWN0LWxlYWZsZXQnO1xuXG4vLyBOb3QgcG9zc2libGUgdW50aWwgQ2FydG9EQiByZWxlYXNlcyBhbiBucG0gcGFja2FnZSBmb3IgdGhlIENvcmUgQVBJLlxuLy8gaW1wb3J0IHsgVGlsZXMgfSBmcm9tICdjYXJ0b2RiJztcblxuLy8gVW50aWwgdGhlbiwgY29uc3VtZXIgYXBwbGljYXRpb25zIG11c3QgaW5jbHVkZSB0aGUgY2FydG9kYi5qcyBzY3JpcHQgZWxzZXdoZXJlLFxuLy8gZS5nLiBpbiBpbmRleC5odG1sIGFzIDxzY3JpcHQgc3JjPVwiaHR0cDovL2xpYnMuY2FydG9jZG4uY29tL2NhcnRvZGIuanMvdjMvMy4xNS9jYXJ0b2RiLmNvcmUuanNcIj48L3NjcmlwdD5cbmNvbnN0IFRpbGVzID0gY2FydG9kYi5UaWxlcztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0b0RCVGlsZUxheWVyIGV4dGVuZHMgQmFzZVRpbGVMYXllciB7XG5cblx0c3RhdGljIHByb3BUeXBlcyA9IHtcblx0XHR1c2VySWQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0c3FsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXHRcdGNhcnRvY3NzOiBQcm9wVHlwZXMuc3RyaW5nXG5cdH07XG5cblx0Y29tcG9uZW50V2lsbE1vdW50ICgpIHtcblxuXHRcdHN1cGVyLmNvbXBvbmVudFdpbGxNb3VudCgpO1xuXHRcdHRoaXMubGVhZmxldEVsZW1lbnQgPSB0aWxlTGF5ZXIoJycsIHRoaXMucHJvcHMpO1xuXG5cdFx0dGhpcy5fZ2V0Q2FydG9EQlRpbGVzVGVtcGxhdGVzKGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uc2UpIHtcblx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHQvLyBUT0RPOiBoYW5kbGUgZXJyb3Jcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmxlYWZsZXRFbGVtZW50LnNldFVybChyZXNwb25zZS50aWxlc1swXSk7XG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdF9nZXRDYXJ0b0RCVGlsZXNUZW1wbGF0ZXMgKGNhbGxiYWNrKSB7XG5cdFx0VGlsZXMuZ2V0VGlsZXMoe1xuXHRcdFx0dHlwZTogJ2NhcnRvZGInLFxuXHRcdFx0dXNlcl9uYW1lOiB0aGlzLnByb3BzLnVzZXJJZCxcblx0XHRcdHN1YmxheWVyczogW3tcblx0XHRcdFx0XCJzcWxcIjogdGhpcy5wcm9wcy5zcWwsXG5cdFx0XHRcdFwiY2FydG9jc3NcIjogdGhpcy5wcm9wcy5jYXJ0b2Nzc1xuXHRcdFx0fV1cblx0XHR9LFxuXG5cdFx0ZnVuY3Rpb24gKHRpbGVzLCBlcnJvcikge1xuXHRcdFx0aWYgKCF0aWxlcyB8fCBlcnJvcikge1xuXHRcdFx0XHRpZiAoIWVycm9yKSB7XG5cdFx0XHRcdFx0ZXJyb3IgPSBcIkVtcHR5IHJlc3BvbnNlLlwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhbGxiYWNrKGVycm9yLCB0aWxlcyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjYWxsYmFjayhudWxsLCB0aWxlcyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxufVxuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcywgQ2hpbGRyZW4gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcblxuLy8gVE9ETzogZWl0aGVyIHBhc3MgdGhpcyBpbnRvIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgaG9zdCBhcHBsaWNhdGlvbiAoYWRkIHRvIHBhbm9yYW1hLXRlbXBsYXRlKSxcbi8vIG9yIHNldCB1cCBhbiBBcHBEaXNwYXRjaGVyIHNoYXJlZCBhY3Jvc3MgYWxsIEBwYW5vcmFtYS90b29sa2l0IGNvbXBvbmVudHMuXG5pbXBvcnQgeyBBcHBBY3Rpb25zIH0gZnJvbSAnLi4vLi4vdXRpbHMvQXBwQWN0aW9uQ3JlYXRvcic7XG5cbi8vIGltcG9ydCAnLi9zdHlsZS5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcnRTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIC8vIHByb3BlcnR5IHZhbGlkYXRpb25cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBzY2FsZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb3JpZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIG1hcmdpbjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHRvcDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIHJpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgYm90dG9tOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgbGVmdDogUHJvcFR5cGVzLm51bWJlclxuICAgIH0pLFxuICB9O1xuXG4gIC8vIHByb3BlcnR5IGRlZmF1bHRzIChFUzctc3R5bGUgUmVhY3QpXG4gIC8vIChpbnN0ZWFkIG9mIEVTNS1zdHlsZSBnZXREZWZhdWx0UHJvcHMpXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgc2NhbGU6IGQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAuY2xhbXAodHJ1ZSksXG4gICAgb3JpZW50OiAnYm90dG9tJyxcbiAgICBtYXJnaW46IHtcbiAgICAgIHRvcDogMjAsXG4gICAgICByaWdodDogMzAsXG4gICAgICBib3R0b206IDIwLFxuICAgICAgbGVmdDogMzBcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuXG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgLy8gYmluZCBoYW5kbGVycyB0byB0aGlzIGNvbXBvbmVudCBpbnN0YW5jZSxcbiAgICAvLyBzaW5jZSBSZWFjdCBubyBsb25nZXIgZG9lcyB0aGlzIGF1dG9tYXRpY2FsbHkgd2hlbiB1c2luZyBFUzZcbiAgICAvLyB0aGlzLm9uVGhpbmdDbGlja2VkID0gdGhpcy5vblRoaW5nQ2xpY2tlZC5iaW5kKHRoaXMpO1xuXG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQgKCkge1xuXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCAoKSB7XG5cbiAgICBkM0NoYXJ0U2xpZGVyLmNyZWF0ZSh0aGlzLnJlZnMuYXhpcywgdGhpcy5wcm9wcy5zY2FsZSwgdGhpcy5wcm9wcy5vcmllbnQsIHRoaXMucHJvcHMubWFyZ2luKTtcblxuICAgIC8vIFJlcmVuZGVyIGluIG9yZGVyIHRvIHBhc3MgbWVhc3VyZWQgd2lkdGggZG93biB0byBjaGlsZCBjb21wb25lbnRcbiAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XG5cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XG5cbiAgICBkM0NoYXJ0U2xpZGVyLnVwZGF0ZSh0aGlzLnJlZnMuYXhpcywgdGhpcy5wcm9wcy5zY2FsZSwgdGhpcy5wcm9wcy5vcmllbnQsIHRoaXMucHJvcHMubWFyZ2luLCB0aGlzLnByb3BzLnNlbGVjdGVkVmFsdWUpO1xuXG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCAoKSB7XG5cbiAgICBkM0NoYXJ0U2xpZGVyLmRlc3Ryb3kodGhpcy5yZWZzLmF4aXMpO1xuXG4gIH1cblxuICByZW5kZXIgKCkge1xuXG4gICAgLy8gQXR0ZW1wdCB0byBtZWFzdXJlIGNvbnRhaW5lciB3aWR0aCwgdG8gcGFzcyBkb3duIHRvIGNoaWxkIGNvbXBvbmVudFxuICAgIGxldCBub2RlO1xuICAgIHRyeSB7XG4gICAgICBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIGxldCBudW1DaGlsZHJlbiA9IENoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuICAgIGlmIChudW1DaGlsZHJlbiA+IDEpIHtcbiAgICAgIGNvbnNvbGUud2FybihgQ2hhcnRTbGlkZXIgaXMgZGVzaWduZWQgdG8gd3JhcCBvbmx5IG9uZSBjaGlsZCBjb21wb25lbnQsIGJ1dCBpdCBmb3VuZCAkeyBudW1DaGlsZHJlbiB9IGNoaWxkcmVuLmApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0ncGFub3JhbWEgY2hhcnQtc2xpZGVyJz5cbiAgICAgICAgeyBcbiAgICAgICAgICAvLyBTZXQgd2lkdGgvaGVpZ2h0IG9uIHRoZSBzaW5nbGUgY2hpbGQgY29tcG9uZW50XG4gICAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KHRoaXMucHJvcHMuY2hpbGRyZW4sIHtcbiAgICAgICAgICAgIHdpZHRoOiBub2RlID8gbm9kZS5vZmZzZXRXaWR0aCA6IHRoaXMucHJvcHMud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndG9wLXJ1bGUnIHN0eWxlPXsge1xuICAgICAgICAgIG1hcmdpbkxlZnQ6IHRoaXMucHJvcHMubWFyZ2luLmxlZnQgKyBcInB4XCIsXG4gICAgICAgICAgbWFyZ2luUmlnaHQ6IHRoaXMucHJvcHMubWFyZ2luLnJpZ2h0ICsgXCJweFwiLFxuICAgICAgICAgIHdpZHRoOiBgY2FsYygxMDAlIC0gJHsgdGhpcy5wcm9wcy5tYXJnaW4ubGVmdCArIHRoaXMucHJvcHMubWFyZ2luLnJpZ2h0IH1weClgXG4gICAgICAgIH0gfSAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZDMtY2hhcnQtc2xpZGVyJyByZWY9J2F4aXMnLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgKTtcblxuICB9XG5cbn1cblxuXG5jb25zdCBkM0NoYXJ0U2xpZGVyID0ge1xuXG4gIC8qKlxuICAgKiBBbnkgbmVjZXNzYXJ5IHNldHVwIGZvciBkMyBjb21wb25lbnQgZ29lcyBoZXJlLlxuICAgKlxuICAgKiBAcGFyYW0gIHtOb2RlfSAgICAgSFRNTEVsZW1lbnQgdG8gd2hpY2ggZDMgd2lsbCBhdHRhY2hcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGQzIHNjYWxlIHRvIHVzZSBmb3IgdGhlIGF4aXNcbiAgICogQHBhcmFtICB7U3RyaW5nfSAgIG9yaWVudGF0aW9uIG9mIHRoZSBheGlzIChwZXIgZDMuYXhpcy5vcmllbnQpXG4gICAqIEBwYXJhbSAge09iamVjdH0gICBPYmplY3Qgc3BlY2lmeWluZyBtYXJnaW5zIGFyb3VuZCB0aGUgY29tcG9uZW50XG4gICAqL1xuICBjcmVhdGU6IGZ1bmN0aW9uIChub2RlLCBzY2FsZSwgb3JpZW50LCBtYXJnaW4pIHtcblxuICAgIHRoaXMub25CcnVzaE1vdmVkID0gdGhpcy5vbkJydXNoTW92ZWQuYmluZCh0aGlzKTtcblxuICAgIC8vIFRPRE86IHdvdWxkIGJlIG5pY2UgdG8gbm90IGhhdmUgdG8gbWFpbnRhaW4gdGhpcyBzdGF0ZS5cbiAgICAvLyBJdCdzIG5lZWRlZCBpbiBvbkJydXNoTW92ZSgpIChhbmQgaXMgdXBkYXRlZCBpbiB1cGRhdGUoKSk7XG4gICAgLy8gaWYgZDMuZXZlbnQgd2Fzbid0IG51bGwgaW4gdGhlIGV2ZW50IGhhbmRsZXIsIGNvdWxkIHByb2JhYmx5IHVzZSBldmVudC50YXJnZXQuLi5cbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuXG4gICAgdGhpcy5heGlzUHJpbWFyeSA9IGQzLnN2Zy5heGlzKClcbiAgICAgIC5vcmllbnQob3JpZW50KVxuICAgICAgLnRpY2tzKDUpXG4gICAgICAudGlja0Zvcm1hdChTdHJpbmcpXG4gICAgICAudGlja1NpemUoMTMpO1xuXG4gICAgdGhpcy5heGlzU2Vjb25kYXJ5ID0gZDMuc3ZnLmF4aXMoKVxuICAgICAgLm9yaWVudChvcmllbnQpXG4gICAgICAudGlja3MoMTApXG4gICAgICAudGlja0Zvcm1hdChkID0+ICcnKVxuICAgICAgLnRpY2tTaXplKDEwKTtcblxuICAgIHRoaXMuYXhpc1RlcnRpYXJ5ID0gZDMuc3ZnLmF4aXMoKVxuICAgICAgLm9yaWVudChvcmllbnQpXG4gICAgICAudGlja3MoNDApXG4gICAgICAudGlja0Zvcm1hdChkID0+ICcnKVxuICAgICAgLnRpY2tTaXplKDcpO1xuXG4gICAgdGhpcy5icnVzaCA9IGQzLnN2Zy5icnVzaCgpXG4gICAgICAub24oJ2JydXNoJywgdGhpcy5vbkJydXNoTW92ZWQpO1xuXG4gICAgbGV0IHN2ZyA9IGQzLnNlbGVjdChub2RlKS5hcHBlbmQoJ3N2ZycpO1xuICAgIHN2Zy5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMgdGVydGlhcnknKTtcbiAgICBzdmcuYXBwZW5kKCdnJylcbiAgICAgIC5hdHRyKCdjbGFzcycsICdheGlzIHNlY29uZGFyeScpO1xuICAgIHN2Zy5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2F4aXMgcHJpbWFyeScpO1xuXG4gICAgbGV0IHNsaWRlciA9IHN2Zy5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3NsaWRlcicpO1xuICAgIFxuICAgIHRoaXMuaGFuZGxlID0gc2xpZGVyLmFwcGVuZCgnbGluZScpXG4gICAgICAuYXR0cih7XG4gICAgICAgIGNsYXNzOiAnaGFuZGxlJyxcbiAgICAgICAgJ3gxJzogMCxcbiAgICAgICAgJ3gyJzogMCxcbiAgICAgICAgJ3kxJzogMCxcbiAgICAgICAgJ3kyJzogJzEwMCUnXG4gICAgICB9KTtcblxuICAgIHRoaXMudXBkYXRlKG5vZGUsIHNjYWxlLCBvcmllbnQsIG1hcmdpbik7XG5cbiAgfSxcblxuICAvKipcbiAgICogTG9naWMgZm9yIHVwZGF0aW5nIGQzIGNvbXBvbmVudCB3aXRoIG5ldyBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0gIHtOb2RlfSAgICAgSFRNTEVsZW1lbnQgdG8gd2hpY2ggZDMgd2lsbCBhdHRhY2hcbiAgICogQHBhcmFtICB7RnVuY3Rpb259IGQzIHNjYWxlIHRvIHVzZSBmb3IgdGhlIGF4aXNcbiAgICogQHBhcmFtICB7U3RyaW5nfSAgIG9yaWVudGF0aW9uIG9mIHRoZSBheGlzIChwZXIgZDMuYXhpcy5vcmllbnQpXG4gICAqIEBwYXJhbSAge09iamVjdH0gICBPYmplY3Qgc3BlY2lmeWluZyBtYXJnaW5zIGFyb3VuZCB0aGUgY29tcG9uZW50XG4gICAqIEBwYXJhbSAge051bWJlcn0gICBTY2FsZWQgbG9jYXRpb24gb2YgdGhlIHNsaWRlclxuICAgKi9cbiAgdXBkYXRlOiBmdW5jdGlvbiAobm9kZSwgc2NhbGUsIG9yaWVudCwgbWFyZ2luLCBzZWxlY3RlZFZhbHVlKSB7XG5cbiAgICB0aGlzLm5vZGUgPSBub2RlO1xuXG4gICAgLy8gdXBkYXRlIGF4aXNcbiAgICBzY2FsZS5yYW5nZShbMCwgbm9kZS5vZmZzZXRXaWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0XSk7XG4gICAgdGhpcy5heGlzUHJpbWFyeS5zY2FsZShzY2FsZSk7XG4gICAgdGhpcy5heGlzU2Vjb25kYXJ5LnNjYWxlKHNjYWxlKTtcbiAgICB0aGlzLmF4aXNUZXJ0aWFyeS5zY2FsZShzY2FsZSk7XG4gICAgdGhpcy5icnVzaC54KHNjYWxlKTtcblxuICAgIC8vIGFwcGx5IHNpemUgYW5kIHBvc2l0aW9uXG4gICAgbGV0IGF4aXNUcmFuZm9ybSA9IGB0cmFuc2xhdGUoJHsgbWFyZ2luLmxlZnQgfSwgJHsgbm9kZS5vZmZzZXRIZWlnaHQgLSBtYXJnaW4uYm90dG9tIH0pYDtcbiAgICBsZXQgc3ZnID0gZDMuc2VsZWN0KG5vZGUpLnNlbGVjdCgnc3ZnJyk7XG4gICAgc3ZnXG4gICAgICAuYXR0cignd2lkdGgnLCAnMTAwJScpXG4gICAgICAuYXR0cignaGVpZ2h0JywgJzEwMCUnKTtcblxuICAgIC8vIGRyYXcgYXhlc1xuICAgIHN2Zy5zZWxlY3QoJy5heGlzLnByaW1hcnknKVxuICAgICAgLmNhbGwodGhpcy5heGlzUHJpbWFyeSlcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBheGlzVHJhbmZvcm0pXG4gICAgXG4gICAgLy8gcG9zaXRpb24gbGFiZWxzXG4gICAgLnNlbGVjdEFsbCgndGV4dCcpXG4gICAgICAuYXR0cigneScsIE1hdGguZmxvb3IoMi8zICogbWFyZ2luLmJvdHRvbSkpO1xuXG4gICAgLy8gZHJhdyBzZWNvbmRhcnkgYW5kIHRlcnRpYXJ5IGF4ZXMgKGp1c3Qgc21hbGxlciB0aWNrcylcbiAgICBzdmcuc2VsZWN0KCcuYXhpcy5zZWNvbmRhcnknKVxuICAgICAgLmNhbGwodGhpcy5heGlzU2Vjb25kYXJ5KVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGF4aXNUcmFuZm9ybSk7XG5cbiAgICBzdmcuc2VsZWN0KCcuYXhpcy50ZXJ0aWFyeScpXG4gICAgICAuY2FsbCh0aGlzLmF4aXNUZXJ0aWFyeSlcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBheGlzVHJhbmZvcm0pO1xuXG4gICAgLy8gZHJhdyBicnVzaFxuICAgIGxldCBzbGlkZXIgPSBzdmcuc2VsZWN0KCcuc2xpZGVyJyk7XG4gICAgc2xpZGVyXG4gICAgICAuY2FsbCh0aGlzLmJydXNoKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHsgbWFyZ2luLmxlZnQgfSwgMClgKVxuICAgIC5zZWxlY3QoJy5iYWNrZ3JvdW5kJylcbiAgICAgIC5vbignbW91c2Vkb3duLmJydXNoJywgdGhpcy5vbkJydXNoTW92ZWQpXG4gICAgICAub24oJ3RvdWNoc3RhcnQuYnJ1c2gnLCB0aGlzLm9uQnJ1c2hNb3ZlZClcbiAgICBzbGlkZXIuc2VsZWN0QWxsKCcuYmFja2dyb3VuZCcpXG4gICAgICAuYXR0cignaGVpZ2h0JywgJzEwMCUnKTtcblxuICAgIGlmICh0eXBlb2Ygc2VsZWN0ZWRWYWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMub25TZWxlY3RlZFZhbHVlQ2hhbmdlZChzZWxlY3RlZFZhbHVlKTtcbiAgICB9XG5cbiAgfSxcblxuICAvKipcbiAgICogQW55IG5lY2Vzc2FyeSBjbGVhbnVwIGZvciBkMyBjb21wb25lbnQgZ29lcyBoZXJlLlxuICAgKlxuICAgKiBAcGFyYW0gIHtOb2RlfSAgICBIVE1MRWxlbWVudCB0byB3aGljaCBkMyB3YXMgYXR0YWNoZWRcbiAgICovXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIChub2RlKSB7XG5cbiAgICBkMy5zZWxlY3Qobm9kZSkuaHRtbCgnJyk7XG5cbiAgICB0aGlzLm5vZGUgPSBudWxsO1xuICAgIHRoaXMuYXhpc1ByaW1hcnkgPSBudWxsO1xuICAgIHRoaXMuYXhpc1NlY29uZGFyeSA9IG51bGw7XG4gICAgdGhpcy5heGlzVGVydGlhcnkgPSBudWxsO1xuICAgIHRoaXMuYnJ1c2ggPSBudWxsO1xuICAgIHRoaXMuaGFuZGxlID0gbnVsbDtcblxuICB9LFxuXG4gIG9uQnJ1c2hNb3ZlZDogZnVuY3Rpb24gKCkge1xuXG4gICAgbGV0IHNjYWxlID0gdGhpcy5icnVzaC54KCksXG4gICAgICBkb21haW4gPSBzY2FsZS5kb21haW4oKSxcbiAgICAgIG1vdXNlWCA9IGQzLm1vdXNlKGQzLnNlbGVjdCh0aGlzLm5vZGUpLnNlbGVjdCgnLmF4aXMnKVswXVswXSlbMF0sICAgLy8gdGhlcmUncyBwcm9iYWJseSBhIGJldHRlciwgbW9yZS1kMyB3YXkgdG8gZG8gdGhpcy4uLlxuICAgICAgdmFsdWUgPSBzY2FsZS5pbnZlcnQobW91c2VYKTtcblxuICAgIC8vIGNsYW1wIGFuZCBxdWFudGl6ZVxuICAgIHZhbHVlID0gTWF0aC5yb3VuZChNYXRoLm1heChkb21haW5bMF0sIE1hdGgubWluKGRvbWFpblsxXSwgdmFsdWUpKSk7XG5cbiAgICAvLyBUT0RPOiBob3cgdG8gYWJzdHJhY3QgdGhpcz8gQXBwQWN0aW9ucyBmb3IgQHBhbm9yYW1hL3Rvb2xraXQ/IGFuZCBzZXQgdXAgQ29tbW9kaXR5U3RvcmUgdG8gbGlzdGVuIHRvIGl0P1xuICAgIEFwcEFjdGlvbnMueWVhclNlbGVjdGVkKHZhbHVlKTtcblxuICB9LFxuXG4gIG9uU2VsZWN0ZWRWYWx1ZUNoYW5nZWQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXG4gICAgZDMuc2VsZWN0KHRoaXMubm9kZSkuc2VsZWN0KCdzdmcnKS5zZWxlY3QoJy5zbGlkZXInKVxuICAgICAgLmNhbGwodGhpcy5icnVzaC5leHRlbnQoW3ZhbHVlLCB2YWx1ZSArIDJdKSk7XG4gICAgXG4gICAgbGV0IGJydXNoQ2VudGVyID0gdGhpcy5icnVzaC54KCkodmFsdWUpO1xuICAgIHRoaXMuaGFuZGxlLmF0dHIoe1xuICAgICAgeDE6IGJydXNoQ2VudGVyLFxuICAgICAgeDI6IGJydXNoQ2VudGVyXG4gICAgfSk7XG5cbiAgfVxuXG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0JztcblxuLy8gVE9ETzogZWl0aGVyIHBhc3MgdGhpcyBpbnRvIHRoZSBjb21wb25lbnQgZnJvbSB0aGUgaG9zdCBhcHBsaWNhdGlvbiAoYWRkIHRvIHBhbm9yYW1hLXRlbXBsYXRlKSxcbi8vIG9yIHNldCB1cCBhbiBBcHBEaXNwYXRjaGVyIHNoYXJlZCBhY3Jvc3MgYWxsIEBwYW5vcmFtYS90b29sa2l0IGNvbXBvbmVudHMuXG5pbXBvcnQgeyBBcHBBY3Rpb25zIH0gZnJvbSAnLi4vLi4vdXRpbHMvQXBwQWN0aW9uQ3JlYXRvcic7XG5cbi8vIGltcG9ydCAnLi9zdHlsZS5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbVNlbGVjdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuXHRzdGF0aWMgcHJvcFR5cGVzID0ge1xuXHRcdGluaXRpYWxTZWxlY3Rpb246IFByb3BUeXBlcy5zdHJpbmcsXG5cdFx0aXRlbXM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxuXHR9XG5cblx0c3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcblx0XHRpbml0aWFsU2VsZWN0aW9uOiAnJyxcblx0XHRpdGVtczoge31cblx0fVxuXG5cdGNvbnN0cnVjdG9yIChwcm9wcykge1xuXG5cdFx0c3VwZXIocHJvcHMpO1xuXG5cdFx0Ly8gbWFudWFsbHkgYmluZCBldmVudCBoYW5kbGVycyxcblx0XHQvLyBzaW5jZSBSZWFjdCBFUzYgZG9lc24ndCBkbyB0aGlzIGF1dG9tYXRpY2FsbHlcblx0XHR0aGlzLm9uSXRlbUNsaWNrID0gdGhpcy5vbkl0ZW1DbGljay5iaW5kKHRoaXMpO1xuXG5cdH1cblxuXHRjb21wb25lbnRXaWxsTW91bnQgKCkge1xuXG5cdFx0Ly9cblxuXHR9XG5cblx0Y29tcG9uZW50RGlkTW91bnQgKCkge1xuXG5cdFx0Ly9cblxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuXG5cdFx0Ly9cblxuXHR9XG5cblx0Y29tcG9uZW50RGlkVXBkYXRlICgpIHtcblxuXHRcdC8vXG5cblx0fVxuXG5cdG9uSXRlbUNsaWNrIChldmVudCkge1xuXG5cdFx0Ly8gRGVmZW5zZS5cblx0XHRpZiAoIWV2ZW50LmN1cnJlbnRUYXJnZXQgfHwgIWV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldCkgeyByZXR1cm47IH1cblxuXHRcdC8vIFRPRE86IGhvdyB0byBhYnN0cmFjdCB0aGlzPyBBcHBBY3Rpb25zIGZvciBAcGFub3JhbWEvdG9vbGtpdD8gYW5kIHNldCB1cCBDb21tb2RpdHlTdG9yZSB0byBsaXN0ZW4gdG8gaXQ/XG5cdFx0QXBwQWN0aW9ucy5jYW5hbFNlbGVjdGVkKGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtKTtcblxuXHR9XG5cblx0Z2V0RGVmYXVsdFN0YXRlICgpIHtcblxuXHRcdHJldHVybiB7fTtcblxuXHR9XG5cblx0cmVuZGVyICgpIHtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ncGFub3JhbWEgaXRlbS1zZWxlY3Rvcic+XG5cdFx0XHRcdDx1bD5cblx0XHRcdFx0eyBPYmplY3Qua2V5cyh0aGlzLnByb3BzLml0ZW1zKS5tYXAoKGl0ZW1LZXksIGkpID0+IHtcblx0XHRcdFx0XHRsZXQgaXRlbSA9IHRoaXMucHJvcHMuaXRlbXNbaXRlbUtleV07XG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdDxsaVxuXHRcdFx0XHRcdFx0XHRjbGFzc05hbWUgPSB7ICdpdGVtJyArICh0aGlzLnByb3BzLnNlbGVjdGVkSXRlbS5pZCA9PT0gaXRlbS5pZCA/ICcgc2VsZWN0ZWQnIDogJycpIH1cblx0XHRcdFx0XHRcdFx0ZGF0YS1pdGVtID0geyBpdGVtS2V5IH1cblx0XHRcdFx0XHRcdFx0a2V5ID0geyBpIH1cblx0XHRcdFx0XHRcdFx0b25DbGljayA9IHsgdGhpcy5vbkl0ZW1DbGljayB9XG5cdFx0XHRcdFx0XHQ+XG5cdFx0XHRcdFx0XHRcdDxzcGFuPnsgaXRlbS5uYW1lLnRvVXBwZXJDYXNlKCkgfTwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fSkgfVxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCBkMyBmcm9tICdkMyc7XG5pbXBvcnQgQ2hhcnRCYXNlIGZyb20gJy4uL2NoYXJ0cy9DaGFydEJhc2UnO1xuaW1wb3J0IFBhbm9yYW1hQ2hhcnQgZnJvbSAnLi4vY2hhcnRzL1Bhbm9yYW1hQ2hhcnQuanN4JztcbmltcG9ydCBBcmVhQ2hhcnQgZnJvbSAnLi4vQXJlYUNoYXJ0L0FyZWFDaGFydC5qc3gnO1xuaW1wb3J0IFJlYWN0LCB7IFByb3BUeXBlcyB9IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCAnLi9zdHlsZS5zY3NzJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPZmZzZXRBcmVhQ2hhcnQgZXh0ZW5kcyBQYW5vcmFtYUNoYXJ0IHtcblxuICAvLyBleHRlbmQgc3VwZXJjbGFzcyBgcHJvcHNgIHZhbGlkYXRvcnNcbiAgc3RhdGljIHByb3BUeXBlcyA9IE9iamVjdC5hc3NpZ24oe30sIEFyZWFDaGFydC5wcm9wVHlwZXMsIHtcbiAgICBhcmVhQ2hhcnREYXRhOiBQcm9wVHlwZXMuYXJyYXksXG4gICAgY2hhcnRTcGFjaW5nOiBQcm9wVHlwZXMubnVtYmVyLFxuICB9KTtcblxuICAvLyBleHRlbmQgc3VwZXJjbGFzcyBgcHJvcHNgIGRlZmF1bHRzXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCBBcmVhQ2hhcnQuZGVmYXVsdFByb3BzLCB7XG4gICAgYXJlYUNoYXJ0RGF0YTogW10sXG4gICAgY2hhcnRTcGFjaW5nOiA0XG4gIH0pO1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmNoYXJ0Q29uc3RydWN0b3IgPSBPZmZzZXRBcmVhQ2hhcnRJbXBsO1xuICB9XG5cbiAgZ2V0Q2xhc3NTdWZmaXggKCkge1xuICAgIHJldHVybiAnb2Zmc2V0LWFyZWEtY2hhcnQnO1xuICB9XG5cbiAgcmVuZGVyQ2hpbGRyZW4gKCkge1xuXG4gICAgLy8gVE9ETzogVGltZWxpbmUgd2lsbCBhcHBseSBob3Jpem9udGFsIGF4aXMgYW5kIHNjcnViL2JydXNoIGludGVyYWN0aW9uIHRvIGFub3RoZXIgY29tcG9uZW50LFxuICAgIC8vIGFuZCBlbWl0IGV2ZW50cyBhcyBpdCdzIGludGVyYWN0ZWQgd2l0aC5cblxuICAgIHZhciBiYXNlWU9mZnNldCA9IC10aGlzLnByb3BzLmFyZWFDaGFydERhdGEubGVuZ3RoICogdGhpcy5wcm9wcy5jaGFydFNwYWNpbmc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgeyB0aGlzLnByb3BzLmFyZWFDaGFydERhdGEubWFwKChjaGFydERhdGEsIGkpID0+IHtcblxuICAgICAgICAgIC8vIE1lcmdlIGFyZWFDaGFydENvbmZpZyBvbnRvIGNvbmZpZyBmcm9tIHRoaXMucHJvcHNcbiAgICAgICAgICAvLyAodmFsdWVzIGluIHRoaXMucHJvcHMuYXJlYUNoYXJ0Q29uZmlnIG92ZXJyaWRlIHRob3NlIGluIHRoaXMucHJvcHMpXG4gICAgICAgICAgbGV0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMsIHRoaXMucHJvcHMuYXJlYUNoYXJ0Q29uZmlnLCB7XG4gICAgICAgICAgICAvLyBwYXNzIGVhY2ggZGF0YXNldCB0byBlYWNoIEFyZWFDaGFydCBpbnN0YW5jZVxuICAgICAgICAgICAgZGF0YTogW2NoYXJ0RGF0YV0sXG5cbiAgICAgICAgICAgIC8vIHNldCBzaXplIHRvIGZpdCB3aXRoaW4gbWFyZ2luc1xuICAgICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMud2lkdGggLSB0aGlzLnByb3BzLm1hcmdpbi5sZWZ0IC0gdGhpcy5wcm9wcy5tYXJnaW4ucmlnaHQsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0IC0gdGhpcy5wcm9wcy5tYXJnaW4udG9wIC0gdGhpcy5wcm9wcy5tYXJnaW4uYm90dG9tLFxuXG4gICAgICAgICAgICAvLyBlbGltaW5hdGUgbWFyZ2luIG9mIGVhY2ggQXJlYUNoYXJ0XG4gICAgICAgICAgICBtYXJnaW46IHsgdG9wOiAwLCByaWdodDogMCwgYm90dG9tOiAwLCBsZWZ0OiAwIH0sXG5cbiAgICAgICAgICAgIC8vIHN1cHByZXNzIGF4ZXMgb2YgZWFjaCBBcmVhQ2hhcnRcbiAgICAgICAgICAgIGF4aXNQcm9wczogbnVsbFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxBcmVhQ2hhcnQga2V5PXtpfSB7IC4uLmNvbmZpZyB9IHN0eWxlPXsge1xuICAgICAgICAgICAgICAnbGVmdCc6IHRoaXMucHJvcHMubWFyZ2luLmxlZnQgKyAncHgnLFxuICAgICAgICAgICAgICAndG9wJzogYmFzZVlPZmZzZXQgKyBpICogdGhpcy5wcm9wcy5jaGFydFNwYWNpbmcgKyAncHgnXG4gICAgICAgICAgICB9IH0gLz5cbiAgICAgICAgICApO1xuXG4gICAgICAgIH0pIH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgfVxuXG59XG5cbmV4cG9ydCBjbGFzcyBPZmZzZXRBcmVhQ2hhcnRJbXBsIGV4dGVuZHMgQ2hhcnRCYXNlIHtcblxuICBjb25zdHJ1Y3RvciAoc2VsZWN0aW9uLCBwcm9wcykge1xuXG4gICAgc3VwZXIoc2VsZWN0aW9uLCBwcm9wcyk7XG5cbiAgICAvLyBUT0RPOiBPZmZzZXRBcmVhQ2hhcnRJbXBsIHdpbGw6XG4gICAgLy8gLSBkcmF3IGF4ZXNcbiAgICAvLyAtIGRyYXcgaG9yaXpvbnRhbCBydWxlcyBmb3IgYXJlYWNoYXJ0c1xuICAgIC8vIC0gZHJhdyBkb3RzIGZvciBjb21tb2RpdHkgZGF0YSBwcmVzZW5jZVxuXG4gICAgLy8gYXBwZW5kIGdyb3VwIHRvIGNoYXJ0XG4gICAgbGV0IG9mZnNldEFyZWEgPSB0aGlzLmJhc2VMYXllciA9IHRoaXMuYmFzZS5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdvZmZzZXQtYXJlYS1sYXllcicsIHRydWUpO1xuXG4gICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKCk7XG5cbiAgICAvLyBkZWZpbmUgbGF5ZXJcbiAgICBsZXQgbGF5ZXIgPSB0aGlzLmxheWVyKCdvZmZzZXQtYXJlYS1sYXllcicsIG9mZnNldEFyZWEsIHtcbiAgICAgIGRhdGFCaW5kOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RBbGwoJ2xpbmUubGlmZXNwYW4nKS5kYXRhKGRhdGEpO1xuICAgICAgfSxcblxuICAgICAgaW5zZXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFwcGVuZCgnbGluZScpXG4gICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZmVzcGFuJyk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vIFNldHVwIGxpZmUtY3ljbGUgZXZlbnRzIG9uIGxheWVyc1xuICAgIGxheWVyLm9uKCd1cGRhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyB0aGlzID0+IGJhc2Ugc2VsZWN0aW9uXG4gICAgfSlcbiAgICAub24oJ2VudGVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gdGhpcyA9PiBlbnRlciBzZWxlY3Rpb25cbiAgICB9KVxuICAgIC5vbignbWVyZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyB0aGlzID0+IGJhc2Ugc2VsZWN0aW9uXG4gICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgLy8gLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQsaSkgeyByZXR1cm4gJ3RyYW5zbGF0ZSgwLCcgKyBjaGFydGhlaWdodCArICcpJzsgfSlcbiAgICAgICAgLy8gLmF0dHIoJ3gxJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gdGltZXNjYWxlKGNhbmFsTG9va3VwW2RbMF0uY2FuYWxfaWRdLm9wZW5lZCk7IH0pXG4gICAgICAgIC8vIC5hdHRyKCd4MicsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHRpbWVzY2FsZShjYW5hbExvb2t1cFtkWzBdLmNhbmFsX2lkXS5jbG9zZWQpOyB9KVxuICAgICAgICAvLyAuYXR0cigneTEnLCBmdW5jdGlvbihkLGkpIHsgcmV0dXJuIC0oKHN0YWNrRGF0YS5sZW5ndGgtaSkqb2Zmc2V0KTsgfSlcbiAgICAgICAgLy8gLmF0dHIoJ3kyJywgZnVuY3Rpb24oZCxpKSB7IHJldHVybiAtKChzdGFja0RhdGEubGVuZ3RoLWkpKm9mZnNldCk7IH0pXG4gICAgICAgIC8vIC5zdHlsZSgnc3Ryb2tlJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gY29sb3JJZkFjdGl2ZShkWzBdLmNhbmFsX2lkKTsgfSlcbiAgICAgICAgLy8gLmF0dHIoJ3N0cm9rZS13aWR0aCcsIDEpXG5cbiAgICB9KVxuICAgIC5vbignZXhpdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHRoaXMgPT4gZXhpdCBzZWxlY3Rpb25cbiAgICB9KTtcblxuICB9XG5cbiAgdXBkYXRlU2NhbGVzIChkYXRhKSB7XG5cbiAgICB0aGlzLmNvbmZpZygneFNjYWxlJykucmFuZ2UoWzAsIHRoaXMuX2lubmVyV2lkdGhdKTtcbiAgICB0aGlzLmNvbmZpZygneVNjYWxlJykucmFuZ2UoW3RoaXMuX2lubmVySGVpZ2h0LCAwXSk7XG5cbiAgfVxuICAvKlxuICAvLyBEbyBzb21ldGhpbmcgYmVmb3JlIGBkYXRhQmluZGBcbiAgcHJlRHJhdyAoZGF0YSkge1xuXG4gICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKCk7XG4gICAgdGhpcy51cGRhdGVTY2FsZXMoZGF0YSk7XG5cbiAgICBsZXQgbWFyZ2luID0gdGhpcy5jb25maWcoJ21hcmdpbicpO1xuXG4gICAgaWYgKHRoaXMuY29uZmlnKCd4QXhpcycpKSB7XG4gICAgICB0aGlzLmNvbmZpZygneEF4aXMnKS51cGRhdGUoXG4gICAgICAgIHRoaXMuY29uZmlnKCd4U2NhbGUnKSxcbiAgICAgICAgW21hcmdpbi5sZWZ0LCB0aGlzLl9pbm5lckhlaWdodF1cbiAgICAgICk7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZygneUF4aXMnKSkge1xuICAgICAgdGhpcy5jb25maWcoJ3lBeGlzJykudXBkYXRlKFxuICAgICAgICB0aGlzLmNvbmZpZygneVNjYWxlJyksXG4gICAgICAgIFttYXJnaW4ubGVmdCwgbWFyZ2luLnRvcF1cbiAgICAgICk7XG4gICAgfVxuXG4gIH1cbiAgKi9cblxuXG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgZDMgZnJvbSAnZDMnO1xuLy8gaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdW5jaGNhcmQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIC8vIHByb3BlcnR5IHZhbGlkYXRpb25cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBoZWFkZXI6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgY2F0ZWdvcmllczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgaXRlbXM6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkXG4gIH07XG5cbiAgLy8gcHJvcGVydHkgZGVmYXVsdHMgKEVTNy1zdHlsZSBSZWFjdClcbiAgLy8gKGluc3RlYWQgb2YgRVM1LXN0eWxlIGdldERlZmF1bHRQcm9wcylcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBoZWFkZXI6IHtcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIHN1YnRpdGxlOiAnJyxcbiAgICAgIGNhcHRpb246ICcnXG4gICAgfSxcbiAgICBjYXRlZ29yaWVzOiBbXSxcbiAgICBpdGVtczogW11cbiAgfTtcblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcblxuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIC8vIHNldCB1cCBpbml0aWFsIHN0YXRlIChpbnN0ZWFkIG9mIEVTNS1zdHlsZSBnZXRJbml0aWFsU3RhdGUpXG4gICAgLy8gdGhpcy5zdGF0ZSA9XG5cbiAgICAvLyBiaW5kIGhhbmRsZXJzIHRvIHRoaXMgY29tcG9uZW50IGluc3RhbmNlLFxuICAgIC8vIHNpbmNlIFJlYWN0IG5vIGxvbmdlciBkb2VzIHRoaXMgYXV0b21hdGljYWxseSB3aGVuIHVzaW5nIEVTNlxuICAgIC8vIHRoaXMub25UaGluZ0NsaWNrZWQgPSB0aGlzLm9uVGhpbmdDbGlja2VkLmJpbmQodGhpcyk7XG5cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxNb3VudCAoKSB7fVxuXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcblxuICAgIGlmICghXy5pc0VtcHR5KHRoaXMucHJvcHMuY2F0ZWdvcmllcykpIHtcbiAgICAgIGQzUHVuY2hjYXJkLmNyZWF0ZSh0aGlzLnJlZnMuY29udGVudCwgdGhpcy5wcm9wcy5jYXRlZ29yaWVzLCB0aGlzLnByb3BzLml0ZW1zKTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSAoKSB7XG5cbiAgICAvLyBCbG93IGF3YXkgd2hhdCdzIHRoZXJlLiBJZiB3ZSB3YW50IHByZXR0eSB0cmFuc2l0aW9ucyxcbiAgICAvLyByZW1vdmUgdGhpcyBhbmQgaGFuZGxlIHRyYW5zaXRpb25zIGluIGQzUHVuY2hjYXJkLlxuICAgIGQzUHVuY2hjYXJkLmRlc3Ryb3kodGhpcy5yZWZzLmNvbnRlbnQpO1xuXG4gICAgaWYgKCFfLmlzRW1wdHkodGhpcy5wcm9wcy5jYXRlZ29yaWVzKSkge1xuICAgICAgLy8gY2Fubm90IHJlbW92ZSB0aGUgbm9kZSwgYmVjYXVzZSBSZWFjdCBjb21wbGFpbnNcbiAgICAgIHRoaXMucmVmcy5wbGFjZWhvbGRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgZDNQdW5jaGNhcmQudXBkYXRlKHRoaXMucmVmcy5jb250ZW50LCB0aGlzLnByb3BzLmNhdGVnb3JpZXMsIHRoaXMucHJvcHMuaXRlbXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlZnMucGxhY2Vob2xkZXIuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cblxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuXG4gICAgZDNQdW5jaGNhcmQuZGVzdHJveSh0aGlzLnJlZnMuY29udGVudCk7XG5cbiAgfVxuXG4gIHJlbmRlciAoKSB7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J3Bhbm9yYW1hIHB1bmNoY2FyZCc+XG4gICAgICAgIHsgdGhpcy5yZW5kZXJQbGFjZWhvbGRlcigpIH1cbiAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbnRlbnQnIHJlZj0nY29udGVudCc+PC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICk7XG5cbiAgfVxuXG4gIHJlbmRlckhlYWRlciAoKSB7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J2hlYWRlcicgcmVmPSdoZWFkZXInPlxuICAgICAgICA8aDI+eyB0aGlzLnByb3BzLmhlYWRlci50aXRsZSA/IHRoaXMucHJvcHMuaGVhZGVyLnRpdGxlLnRvVXBwZXJDYXNlKCkgOiAnJyB9PC9oMj5cbiAgICAgICAgPGgzPjxzcGFuIGNsYXNzTmFtZT0nc3VidGl0bGUnPnsgdGhpcy5wcm9wcy5oZWFkZXIuc3VidGl0bGUgfTwvc3Bhbj48c3BhbiBjbGFzc05hbWU9J2NhcHRpb24nPnsgdGhpcy5wcm9wcy5oZWFkZXIuY2FwdGlvbiB9IHRvdGFsIHRvbm5hZ2U8L3NwYW4+PC9oMz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgfVxuXG4gIHJlbmRlclBsYWNlaG9sZGVyICgpIHtcblxuICAgIC8vIFRPRE86IHByb3ZpZGUgbGlua3MgdG8geWVhcnMgd2l0aCBkYXRhLCBpZiB0aGV5IGV4aXN0IGZvciB0aGlzIGNhbmFsLlxuICAgIC8vIFRPRE86IG1ha2UgcGxhY2Vob2xkZXIgbWVzc2FnZXMgY29uZmlndXJhYmxlIHZpYSBwcm9wc1xuICAgIGlmIChfLmlzRW1wdHkodGhpcy5wcm9wcy5jYXRlZ29yaWVzKSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3BsYWNlaG9sZGVyJyByZWY9J3BsYWNlaG9sZGVyJz5cbiAgICAgICAgICA8aDQ+Tm8gY29tbW9kaXRpZXMgZGF0YSBhdmFpbGFibGUgZm9yIHRoaXMgY2FuYWwgaW4gdGhlIHNlbGVjdGVkIHllYXIuPC9oND5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ncGxhY2Vob2xkZXInIHJlZj0ncGxhY2Vob2xkZXInPlxuICAgICAgICAgIDxoND5Mb2FkaW5nLi4uPC9oND5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICB9XG5cbn1cblxuXG5jb25zdCBkM1B1bmNoY2FyZCA9IHtcblxuICAvLyBsYXlvdXQgY29uc3RhbnRzXG4gIFJPV19IRUlHSFQ6IDIwLFxuICBDT01NT0RJVFlfVEVYVF9PRkZTRVRfWTogNSxcblxuICAvKipcbiAgICogQW55IG5lY2Vzc2FyeSBzZXR1cCBmb3IgZDMgY29tcG9uZW50IGdvZXMgaGVyZS5cbiAgICpcbiAgICogQHBhcmFtICB7Tm9kZX0gICAgSFRNTEVsZW1lbnQgdG8gd2hpY2ggZDMgd2lsbCBhdHRhY2hcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgQ2F0ZWdvcml6ZWQgbWFwIG9mIGl0ZW1zIChUT0RPOiBkb2N1bWVudCBleHBlY3RlZCBmb3JtYXQpXG4gICAqIEBwYXJhbSAge09iamVjdH0gIEZsYXQgbWFwIG9mIGl0ZW1zIChUT0RPOiBkb2N1bWVudCBleHBlY3RlZCBmb3JtYXQpXG4gICAqL1xuICBjcmVhdGU6IGZ1bmN0aW9uIChub2RlLCBjYXRlZ29yaWVzLCBpdGVtcykge1xuXG4gICAgdGhpcy51cGRhdGUobm9kZSwgY2F0ZWdvcmllcywgaXRlbXMpO1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIExvZ2ljIGZvciB1cGRhdGluZyBkMyBjb21wb25lbnQgd2l0aCBuZXcgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtICB7Tm9kZX0gICAgSFRNTEVsZW1lbnQgdG8gd2hpY2ggZDMgd2lsbCBhdHRhY2hcbiAgICogQHBhcmFtICB7T2JqZWN0fSAgQ2F0ZWdvcml6ZWQgbWFwIG9mIGl0ZW1zIChUT0RPOiBkb2N1bWVudCBleHBlY3RlZCBmb3JtYXQpXG4gICAqIEBwYXJhbSAge09iamVjdH0gIEZsYXQgbWFwIG9mIGl0ZW1zIChUT0RPOiBkb2N1bWVudCBleHBlY3RlZCBmb3JtYXQpXG4gICAqL1xuICB1cGRhdGU6IGZ1bmN0aW9uIChub2RlLCBjYXRlZ29yaWVzLCBpdGVtcykge1xuXG4gICAgbGV0IHNjb3BlID0gdGhpcyxcblxuICAgICAgLy8gc2NhbGUgYnkgbm9ybWFsaXplZFZhbHVlIG9mIGFsbCBpdGVtc1xuICAgICAgclNjYWxlID0gZDMuc2NhbGUuc3FydCgpXG4gICAgICAucmFuZ2UoWzIsIDhdKVxuICAgICAgLmRvbWFpbihbMSwgZDMubWF4KGl0ZW1zLCAoZCkgPT4gZC5ub3JtYWxpemVkVmFsdWUpXSksXG5cbiAgICAgIC8vIGNvbG9yIGJ5IGFnZ3JlZ2F0ZU5vcm1hbGl6ZWRWYWx1ZSBvZiBhbGwgY2F0ZWdvcmllc1xuICAgICAgY29sb3JTY2FsZSA9IGQzLnNjYWxlLm9yZGluYWwoKVxuICAgICAgLnJhbmdlKFsncmdiKDE4OCwgMzUsIDY0KScsICdyZ2IoMjI4LCAxMDQsIDc1KScsICdyZ2IoMTg3LCAyNywgMTA1KScsICdyZ2IoMTAzLCAxMTYsIDk5KScsICdyZ2IoMjYsIDE2OSwgMTQzKScsICdyZ2IoMTAsIDEwMywgMTUwKScsICdyZ2IoNjcsIDQwLCA5MyknLCAncmdiKDg2LCA5NiwgOTkpJ10pXG4gICAgICAuZG9tYWluKFsxLCBkMy5tYXgoY2F0ZWdvcmllcywgKGQpID0+IGQuYWdncmVnYXRlTm9ybWFsaXplZFZhbHVlKV0pO1xuXG4gICAgLy8gPGRpdj4gZm9yIGVhY2ggY2F0ZWdvcnlcbiAgICBsZXQgY2F0ZWdvcnlOb2RlcyA9IGQzLnNlbGVjdChub2RlKVxuICAgICAgLnNlbGVjdEFsbCgnZGl2JylcbiAgICAgIC5kYXRhKGNhdGVnb3JpZXMpXG4gICAgICAuZW50ZXIoKS5hcHBlbmQoJ2RpdicpXG4gICAgICAuYXR0cignc3R5bGUnLCAoZCkgPT4gYGNvbG9yOiAkeyBjb2xvclNjYWxlKGQuYWdncmVnYXRlTm9ybWFsaXplZFZhbHVlKSB9O2ApXG4gICAgICAuYXR0cignY2xhc3MnLCAnY2F0ZWdvcnknKTtcblxuICAgIC8vIGVhY2ggd2l0aCBhIGhlYWRpbmcuLi5cbiAgICBjYXRlZ29yeU5vZGVzXG4gICAgICAuYXBwZW5kKCdoNCcpXG4gICAgICAudGV4dCgoZCkgPT4gZC5uYW1lKTtcblxuICAgIC8vIC4uLmFuZCBhbiA8c3ZnPlxuICAgIGNhdGVnb3J5Tm9kZXMgPSBjYXRlZ29yeU5vZGVzXG4gICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgLy8gLmF0dHIoJ3dpZHRoJywgJzUwJScpXG4gICAgICAuYXR0cignaGVpZ2h0JywgKGQpID0+IGQuY29tbW9kaXRpZXMubGVuZ3RoICogc2NvcGUuUk9XX0hFSUdIVClcbiAgICAgIC5zdHlsZSgnZmlsbCcsIChkKSA9PiBjb2xvclNjYWxlKGQuYWdncmVnYXRlTm9ybWFsaXplZFZhbHVlKSk7XG5cbiAgICAvLyA8Zz4gZm9yIGVhY2ggY29tbW9kaXR5IHdpdGhpbiBlYWNoIGNhdGVnb3J5XG4gICAgbGV0IGNvbW1vZGl0eU5vZGVzID0gY2F0ZWdvcnlOb2Rlcy5zZWxlY3RBbGwoJ2cnKVxuICAgICAgLmRhdGEoKGQpID0+IGQuY29tbW9kaXRpZXMpXG4gICAgICAuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIChkLCBpKSA9PiBgdHJhbnNsYXRlKCR7IDAuNSAqIHNjb3BlLlJPV19IRUlHSFQgfSwgJHsgKGkrMC41KSAqIHNjb3BlLlJPV19IRUlHSFQgfSlgKTtcblxuICAgIC8vIDxjaXJjbGU+IGRpc3BsYXlpbmcgc2NhbGVkIGFtb3VudCBvZiBlYWNoIGNvbW1vZGl0eVxuICAgIGNvbW1vZGl0eU5vZGVzLmFwcGVuZCgnY2lyY2xlJylcbiAgICAgIC5hdHRyKCdyJywgKGQpID0+IHJTY2FsZShkLm5vcm1hbGl6ZWRWYWx1ZSkpO1xuXG4gICAgLy8gPHRleHQ+IGRpc3BsYXlpbmcgbmFtZSBvZiBlYWNoIGNvbW1vZGl0eVxuICAgIGNvbW1vZGl0eU5vZGVzLmFwcGVuZCgndGV4dCcpXG4gICAgICAudGV4dCgoZCkgPT4gZC5uYW1lKVxuICAgICAgLmF0dHIoJ3gnLCAyICogc2NvcGUuUk9XX0hFSUdIVClcbiAgICAgIC5hdHRyKCd5Jywgc2NvcGUuQ09NTU9ESVRZX1RFWFRfT0ZGU0VUX1kpO1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIEFueSBuZWNlc3NhcnkgY2xlYW51cCBmb3IgZDMgY29tcG9uZW50IGdvZXMgaGVyZS5cbiAgICpcbiAgICogQHBhcmFtICB7Tm9kZX0gICAgSFRNTEVsZW1lbnQgdG8gd2hpY2ggZDMgd2FzIGF0dGFjaGVkXG4gICAqL1xuICBkZXN0cm95OiBmdW5jdGlvbiAobm9kZSkge1xuXG4gICAgZDMuc2VsZWN0KG5vZGUpLmh0bWwoJycpO1xuXG4gIH1cblxufTtcbiIsImltcG9ydCBkMyBmcm9tICdkMyc7XG5pbXBvcnQgS290byBmcm9tICdrb3RvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXhpcyBleHRlbmRzIEtvdG8ge1xuXG4gIGNvbnN0cnVjdG9yIChzZWxlY3Rpb24sIGF4aXNUeXBlLCBwcm9wcykge1xuXG4gICAgc3VwZXIoc2VsZWN0aW9uKTtcblxuICAgIHRoaXMuY29uZmlnc1snc2NhbGUnXSA9IHsgdmFsdWU6IHByb3BzLnNjYWxlIH07XG4gICAgdGhpcy5jb25maWdzWyd0aWNrcyddID0geyB2YWx1ZTogcHJvcHMudGlja3MgfTtcbiAgICB0aGlzLmNvbmZpZ3NbJ29yaWVudCddID0geyB2YWx1ZTogcHJvcHMub3JpZW50IH07XG4gICAgdGhpcy5jb25maWdzWydvZmZzZXQnXSA9IHsgdmFsdWU6IHByb3BzLm9mZnNldCB9O1xuXG4gICAgdGhpcy5heGlzID0gZDMuc3ZnLmF4aXMoKTtcbiAgICB0aGlzLmJhc2VMYXllciA9IHRoaXMuYmFzZS5hcHBlbmQoJ2cnKS5jbGFzc2VkKGF4aXNUeXBlICsgJyBheGlzJywgdHJ1ZSk7XG5cbiAgfVxuXG4gIHVwZGF0ZUNvbmZpZ3MgKHByb3BzKSB7XG5cbiAgICB0aGlzLmNvbmZpZygnc2NhbGUnLCBwcm9wcy5zY2FsZSk7XG4gICAgdGhpcy5jb25maWcoJ3RpY2tzJywgcHJvcHMudGlja3MpO1xuICAgIHRoaXMuY29uZmlnKCdvcmllbnQnLCBwcm9wcy5vcmllbnQpO1xuICAgIHRoaXMuY29uZmlnKCdvZmZzZXQnLCBwcm9wcy5vZmZzZXQpO1xuXG4gIH1cblxuICB1cGRhdGUgKHNjYWxlLCBvZmZzZXQpIHtcblxuICAgIGlmIChzY2FsZSkge1xuICAgICAgdGhpcy5jb25maWcoJ3NjYWxlJywgc2NhbGUpO1xuICAgIH1cbiAgICBpZiAob2Zmc2V0KSB7XG4gICAgICB0aGlzLmNvbmZpZygnb2Zmc2V0Jywgb2Zmc2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2Zmc2V0ID0gdGhpcy5jb25maWcoJ29mZnNldCcpO1xuICAgIH1cblxuICAgIHRoaXMuYXhpc1xuICAgICAgLnNjYWxlKHRoaXMuY29uZmlnKCdzY2FsZScpKVxuICAgICAgLnRpY2tzKHRoaXMuY29uZmlnKCd0aWNrcycpKVxuICAgICAgLm9yaWVudCh0aGlzLmNvbmZpZygnb3JpZW50JykpO1xuXG4gICAgdGhpcy5iYXNlTGF5ZXJcbiAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBvZmZzZXRbMF0gKyAnLCcgKyBvZmZzZXRbMV0gKyAnKScpXG4gICAgICAuY2FsbCh0aGlzLmF4aXMpO1xuXG4gIH1cblxuICBkZXN0cm95ICgpIHtcblxuICAgIHRoaXMuYmFzZS5yZW1vdmUoKTtcbiAgICB0aGlzLmJhc2UgPSBudWxsO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IGQzIGZyb20gJ2QzJztcbmltcG9ydCBLb3RvIGZyb20gJ2tvdG8nO1xuaW1wb3J0IEF4aXMgZnJvbSAnLi9BeGlzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcnRCYXNlIGV4dGVuZHMgS290byB7XG5cbiAgY29uc3RydWN0b3IgKHNlbGVjdGlvbiwgcHJvcHMpIHtcblxuICAgIHN1cGVyKHNlbGVjdGlvbik7XG5cbiAgICBsZXQgeEF4aXNQcm9wcyxcbiAgICAgIHlBeGlzUHJvcHM7XG5cbiAgICBpZiAocHJvcHMuYXhpc1Byb3BzKSB7XG4gICAgICB4QXhpc1Byb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMuYXhpc1Byb3BzLCB7XG4gICAgICAgIG9yaWVudDogcHJvcHMuYXhpc1Byb3BzLnhPcmllbnRcbiAgICAgIH0pO1xuICAgICAgeUF4aXNQcm9wcyA9IE9iamVjdC5hc3NpZ24oe30sIHByb3BzLmF4aXNQcm9wcywge1xuICAgICAgICBvcmllbnQ6IHByb3BzLmF4aXNQcm9wcy55T3JpZW50XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY29uZmlncywge1xuICAgICAgd2lkdGg6IHsgdmFsdWU6IHByb3BzLndpZHRoIH0sXG4gICAgICBoZWlnaHQ6IHsgdmFsdWU6IHByb3BzLmhlaWdodCB9LFxuICAgICAgbWFyZ2luOiB7IHZhbHVlOiBwcm9wcy5tYXJnaW4gfSxcbiAgICAgIHhTY2FsZTogeyB2YWx1ZTogcHJvcHMueFNjYWxlIH0sXG4gICAgICB5U2NhbGU6IHsgdmFsdWU6IHByb3BzLnlTY2FsZSB9LFxuICAgICAgeEF4aXM6IHsgdmFsdWU6IHByb3BzLmF4aXNQcm9wcyA/IG5ldyBBeGlzKHRoaXMuYmFzZSwgJ3gnLCB4QXhpc1Byb3BzKSA6IG51bGwgfSxcbiAgICAgIHlBeGlzOiB7IHZhbHVlOiBwcm9wcy5heGlzUHJvcHMgPyBuZXcgQXhpcyh0aGlzLmJhc2UsICd5JywgeUF4aXNQcm9wcykgOiBudWxsIH1cbiAgICB9KTtcblxuICB9XG5cbiAgdXBkYXRlQ29uZmlncyAocHJvcHMpIHtcblxuICAgIHRoaXNcbiAgICAgIC5jb25maWcoJ2hlaWdodCcsIHByb3BzLmhlaWdodClcbiAgICAgIC5jb25maWcoJ3dpZHRoJywgcHJvcHMud2lkdGgpXG4gICAgICAuY29uZmlnKCdtYXJnaW4nLCBwcm9wcy5tYXJnaW4pXG4gICAgICAuY29uZmlnKCd4U2NhbGUnLCBwcm9wcy54U2NhbGUpXG4gICAgICAuY29uZmlnKCd5U2NhbGUnLCBwcm9wcy55U2NhbGUpXG4gICAgICAuYWNjZXNzb3IoJ3gnLCBwcm9wcy54QWNjZXNzb3IpXG4gICAgICAuYWNjZXNzb3IoJ3knLCBwcm9wcy55QWNjZXNzb3IpO1xuXG4gICAgLy8gdXBkYXRlIGF4ZXMsIG9yIHJlbW92ZSB0aGVtIGlmIG5vIGxvbmdlciBjb25maWd1cmVkXG4gICAgaWYgKHRoaXMuY29uZmlnKCd4QXhpcycpKSB7XG4gICAgICBpZiAocHJvcHMuYXhpc1Byb3BzKSB7XG4gICAgICAgIHRoaXMuY29uZmlnKCd4QXhpcycpLnVwZGF0ZUNvbmZpZ3MoT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMuYXhpc1Byb3BzLCB7XG4gICAgICAgICAgb3JpZW50OiBwcm9wcy5heGlzUHJvcHMueE9yaWVudFxuICAgICAgICB9KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbmZpZygneEF4aXMnKS5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuY29uZmlnKCd4QXhpcycsIG51bGwpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZygneUF4aXMnKSkge1xuICAgICAgaWYgKHByb3BzLmF4aXNQcm9wcykge1xuICAgICAgICB0aGlzLmNvbmZpZygneUF4aXMnKS51cGRhdGVDb25maWdzKE9iamVjdC5hc3NpZ24oe30sIHByb3BzLmF4aXNQcm9wcywge1xuICAgICAgICAgIG9yaWVudDogcHJvcHMuYXhpc1Byb3BzLnlPcmllbnRcbiAgICAgICAgfSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb25maWcoJ3lBeGlzJykuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmNvbmZpZygneUF4aXMnLCBudWxsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGQzLXN0eWxlICdjb252ZW50aW9uYWwgbWFyZ2lucydcbiAgICogKHNpbS4gdG86IGh0dHA6Ly9ibC5vY2tzLm9yZy9tYm9zdG9jay8zMDE5NTYzKVxuICAgKi9cbiAgdXBkYXRlRGltZW5zaW9ucyAoKSB7XG5cbiAgICBsZXQgbWFyZ2luID0gdGhpcy5jb25maWcoJ21hcmdpbicpO1xuXG4gICAgdGhpcy5faW5uZXJXaWR0aCA9IHRoaXMuY29uZmlnKCd3aWR0aCcpIC0gbWFyZ2luLmxlZnQgLSBtYXJnaW4ucmlnaHQ7XG4gICAgdGhpcy5faW5uZXJIZWlnaHQgPSB0aGlzLmNvbmZpZygnaGVpZ2h0JykgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbTtcblxuICAgIHRoaXMuYmFzZS5hdHRyKCd3aWR0aCcsIHRoaXMuY29uZmlnKCd3aWR0aCcpKTtcbiAgICB0aGlzLmJhc2UuYXR0cignaGVpZ2h0JywgdGhpcy5jb25maWcoJ2hlaWdodCcpKTtcblxuICAgIHRoaXMuYmFzZUxheWVyLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywnICsgbWFyZ2luLnRvcCArICcpJyk7XG5cbiAgfVxuXG4gIHVwZGF0ZVNjYWxlcyAoZGF0YSkge1xuXG4gICAgdGhpcy5jb25maWcoJ3hTY2FsZScpLnJhbmdlKFswLCB0aGlzLl9pbm5lcldpZHRoXSk7XG4gICAgdGhpcy5jb25maWcoJ3lTY2FsZScpLnJhbmdlKFt0aGlzLl9pbm5lckhlaWdodCwgMF0pO1xuXG4gICAgLy8gZGVmYXVsdCB0byBzZXQgZG9tYWluIHRvIGFsbCB4QWNjZXNzc29yIHZhbHVlcyBhbG9uZyB4LWF4aXMsXG4gICAgLy8gYW5kIDAgPD4gbWF4IHlBY2Nlc3NvciB2YWx1ZSBhbG9uZyB5LWF4aXMuXG4gICAgdGhpcy5jb25maWcoJ3hTY2FsZScpLmRvbWFpbihkYXRhLm1hcChkID0+IHRoaXMuYWNjZXNzb3IoJ3gnKShkKSkpO1xuICAgIHRoaXMuY29uZmlnKCd5U2NhbGUnKS5kb21haW4oWzAsIGQzLm1heChkYXRhLCBkID0+IHRoaXMuYWNjZXNzb3IoJ3knKShkKSldKTtcblxuICB9XG5cbiAgLy8gRG8gc29tZXRoaW5nIGJlZm9yZSBgZGF0YUJpbmRgXG4gIHByZURyYXcgKGRhdGEpIHtcblxuICAgIHRoaXMudXBkYXRlRGltZW5zaW9ucygpO1xuICAgIHRoaXMudXBkYXRlU2NhbGVzKGRhdGEpO1xuXG4gICAgbGV0IG1hcmdpbiA9IHRoaXMuY29uZmlnKCdtYXJnaW4nKTtcblxuICAgIGlmICh0aGlzLmNvbmZpZygneEF4aXMnKSkge1xuICAgICAgdGhpcy5jb25maWcoJ3hBeGlzJykudXBkYXRlKFxuICAgICAgICB0aGlzLmNvbmZpZygneFNjYWxlJyksXG4gICAgICAgIFttYXJnaW4ubGVmdCwgbWFyZ2luLnRvcCArIHRoaXMuX2lubmVySGVpZ2h0XVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnKCd5QXhpcycpKSB7XG4gICAgICB0aGlzLmNvbmZpZygneUF4aXMnKS51cGRhdGUoXG4gICAgICAgIHRoaXMuY29uZmlnKCd5U2NhbGUnKSxcbiAgICAgICAgW21hcmdpbi5sZWZ0LCBtYXJnaW4udG9wXVxuICAgICAgKTtcbiAgICB9XG5cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuXG4gICAgdGhpcy5iYXNlLnJlbW92ZSgpO1xuICAgIHRoaXMuYmFzZSA9IG51bGw7XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgUmVhY3QsIHsgUHJvcFR5cGVzIH0gZnJvbSAncmVhY3QnO1xuXG5jb25zdCBCQVNFX0NMQVNTX05BTUUgPSAncGFub3JhbWEgY2hhcnQgJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFub3JhbWFDaGFydCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBkYXRhOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuYXJyYXksUHJvcFR5cGVzLm9iamVjdF0pLFxuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLm51bWJlcixcbiAgICBtYXJnaW46IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB0b3A6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICByaWdodDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIGJvdHRvbTogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgIGxlZnQ6IFByb3BUeXBlcy5udW1iZXJcbiAgICB9KSxcbiAgICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB4U2NhbGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIHlTY2FsZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgeEFjY2Vzc29yOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB5QWNjZXNzb3I6IFByb3BUeXBlcy5mdW5jLFxuICAgIGF4aXNQcm9wczogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHNjYWxlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIHRpY2tzOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgb3JpZW50OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgb2Zmc2V0OiBQcm9wVHlwZXMuYXJyYXlcbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBkYXRhOiBbXSxcbiAgICB3aWR0aDogNjAwLFxuICAgIGhlaWdodDogNDAwLFxuICAgIG1hcmdpbjoge1xuICAgICAgdG9wOiAyMCxcbiAgICAgIHJpZ2h0OiAzMCxcbiAgICAgIGJvdHRvbTogMjAsXG4gICAgICBsZWZ0OiAzMFxuICAgIH0sXG4gICAgc3R5bGU6IHt9LFxuICAgIHhTY2FsZTogZDMuc2NhbGUubGluZWFyKCksXG4gICAgeVNjYWxlOiBkMy5zY2FsZS5saW5lYXIoKSxcbiAgICB4QWNjZXNzb3I6IGQgPT4gZC5rZXksXG4gICAgeUFjY2Vzc29yOiBkID0+IGQudmFsdWUsXG4gICAgYXhpc1Byb3BzOiB7XG4gICAgICBzY2FsZTogZDMuc2NhbGUubGluZWFyKCksXG4gICAgICB0aWNrczogNSxcbiAgICAgIHhPcmllbnQ6ICdib3R0b20nLFxuICAgICAgeU9yaWVudDogJ2xlZnQnLFxuICAgICAgb2Zmc2V0OiBbMCwgMF1cbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvciAocHJvcHMpIHtcblxuICAgIHN1cGVyKHByb3BzKTtcblxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuXG4gICAgdGhpcy51cGRhdGUoKTtcblxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuXG4gICAgaWYgKHRoaXMuY2hhcnQpIHRoaXMuY2hhcnQuZGVzdHJveSh0aGlzLnJlZnMuY2hhcnQpO1xuICAgIHRoaXMuY2hhcnQgPSBudWxsO1xuXG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUgKCkge1xuXG4gICAgdGhpcy51cGRhdGUoKTtcblxuICB9XG5cbiAgdXBkYXRlICgpIHtcblxuICAgIGlmICghdGhpcy5jaGFydCkge1xuICAgICAgdGhpcy5jaGFydCA9IG5ldyB0aGlzLmNoYXJ0Q29uc3RydWN0b3IoZDMuc2VsZWN0KHRoaXMucmVmcy5jaGFydCksIHRoaXMucHJvcHMpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNoYXJ0LnVwZGF0ZUNvbmZpZ3MpIHtcbiAgICAgIHRoaXMuY2hhcnQudXBkYXRlQ29uZmlncyh0aGlzLnByb3BzKTtcbiAgICB9XG5cbiAgICB0aGlzLmNoYXJ0LmRyYXcodGhpcy5wcm9wcy5kYXRhKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSBjbGFzcyBuYW1lIHRvIGJlIGFwcGVuZGVkIHRvIGNvbnRhaW5lciBlbGVtZW50LlxuICAgKiBUeXBpY2FsbHkgb3ZlcnJpZGRlbiBieSBzdWJjbGFzc2VzLlxuICAgKi9cbiAgZ2V0Q2xhc3NTdWZmaXggKCkge1xuXG4gICAgcmV0dXJuICcnO1xuICAgIFxuICB9XG5cbiAgLyoqIFxuICAgKiBTdWJjbGFzc2VzIGNhbiBvdmVycmlkZSBpZiB0aGV5IG5lZWQgdG8gaW1wbGVtZW50IGN1c3RvbSByZW5kZXJpbmcuXG4gICAqL1xuICByZW5kZXJDaGlsZHJlbiAoKSB7XG5cbiAgICByZXR1cm4gJyc7XG5cbiAgfVxuXG4gIHJlbmRlciAoKSB7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9eyBCQVNFX0NMQVNTX05BTUUgKyB0aGlzLmdldENsYXNzU3VmZml4KCkgfSBzdHlsZT17IHRoaXMucHJvcHMuc3R5bGUgfT5cbiAgICAgICAgPHN2ZyByZWY9J2NoYXJ0JyBjbGFzc05hbWU9J3dyYXBwZXInPjwvc3ZnPlxuICAgICAgICB7IHRoaXMucmVuZGVyQ2hpbGRyZW4oKSB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gIH1cblxufVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC5qc3gnO1xuXG5SZWFjdERPTS5yZW5kZXIoPEFwcC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwLWNvbnRhaW5lcicpKTtcbiIsImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgQXBwRGlzcGF0Y2hlciBmcm9tICcuLi91dGlscy9BcHBEaXNwYXRjaGVyJztcbmltcG9ydCB7IEFwcEFjdGlvblR5cGVzIH0gZnJvbSAnLi4vdXRpbHMvQXBwQWN0aW9uQ3JlYXRvcic7XG5pbXBvcnQgQ2FydG9EQkxvYWRlciBmcm9tICcuLi91dGlscy9DYXJ0b0RCTG9hZGVyJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IFBMQUNFSE9MREVSX1ZBTFVFID0gJ1RPRE8nO1xuXG5jb25zdCBDb21tb2RpdHlTdG9yZSA9IHtcblxuXHQvKipcblx0ICogQWxsIGNhY2hlZCBkYXRhIGFyZSBzdG9yZWQgaGVyZS5cblx0ICogTm90ZTogS2V5cyB3aXRoaW4gZWFjaCBjYWNoZSBhcmUgaW50ZW50aW9uYWxseSBhYnN0cmFjdCxcblx0ICogZm9yIGNvbnN1bXB0aW9uIGJ5IFBhbm9yYW1hIGNvbXBvbmVudHMuXG5cdCAqIEUuZy4gaW5zdGVhZCBvZiAndG9ucycsIHdlIHVzZSB0aGUga2V5ICdub3JtYWxpemVkVmFsdWUnLlxuXHQgKi9cblx0ZGF0YToge1xuXG5cdFx0LyoqXG5cdFx0ICogQ29tbW9kaXR5IHR5cGVzIGFuZCBtZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggZWFjaCBjb21tb2RpdHkgdHlwZS5cblx0XHQgKiB7XG5cdFx0ICogICB0eXBlWDoge1xuXHRcdCAqICAgICBpZDogJ3N0cicsXG5cdFx0ICogICAgIG5hbWU6ICdzdHInLFxuXHRcdCAqICAgICBkZXNjcmlwdGlvbjogJ3N0cicsXG5cdFx0ICogICAgIHVuaXRzOiAnc3RyJ1xuXHRcdCAqICAgfSxcblx0XHQgKiAgIHR5cGVZOiB7IC4uLiB9LFxuXHRcdCAqICAgLi4uXG5cdFx0ICogfVxuXHRcdCAqL1xuXHRcdGNvbW1vZGl0aWVzOiB7fSxcblxuXHRcdC8qKlxuXHRcdCAqIENhbmFscyBhbmQgYXNzb2NpYXRlZCBtZXRhZGF0YS5cblx0XHQgKiB7XG5cdFx0ICogICBjYW5hbFg6IHtcblx0XHQgKiAgICAgaWQ6ICdzdHInLFxuXHRcdCAqICAgICBuYW1lOiAnc3RyJyxcblx0XHQgKiAgICAgc3RhcnRZZWFyOiAxODIwLFxuXHRcdCAqICAgICBlbmRZZWFyOiAxOTUyLFxuXHRcdCAqICAgICBleHRlbnNpb25zOiBbXG5cdFx0ICogICAgICAgMTgzNCwgMTg1MSwgMTg1NlxuXHRcdCAqICAgICBdLFxuXHRcdCAqICAgICBsZW5ndGg6IDg4LFxuXHRcdCAqICAgICBkZXNjcmlwdGlvbjogJ3N0cicsXG5cdFx0ICogICAgIGdlb21ldHJ5OiB7fVxuXHRcdCAqICAgfSxcblx0XHQgKiAgIGNhbmFsWTogeyAuLi4gfSxcblx0XHQgKiAgIC4uLlxuXHRcdCAqIH1cblx0XHQgKi9cblx0XHRjYW5hbHM6IHt9LFxuXG5cdFx0LyoqXG5cdFx0ICogQ29tbW9kaXR5IGFuZCBjb21tb2RpdHkgY2F0ZWdvcnkgcXVhbnRpdGllcyxcblx0XHQgKiBieSBkYXRlIChzZWNvbmQtb3JkZXIpIGJ5IGNhbmFscyAoZmlyc3Qtb3JkZXIpLlxuXHRcdCAqIFxuXHRcdCAqIHtcblx0XHQgKiAgIGNhbmFsWDoge1xuXHRcdCAqICAgICAnMTg1MCc6IHtcblx0XHQgKiAgICAgICB5ZWFyOiBudW0sXG5cdFx0ICogICAgICAgdG90YWxOb3JtYWxpemVkVmFsdWU6IG51bSxcblx0XHQgKiAgICAgICBjb21tb2RpdGllczogeyAgICAgICAgICAgICBcdFx0Ly8gdW5zb3J0ZWQsIGZsYXQgdmlldyBvZiBhbGwgY29tbW9kaXRpZXMgdGhpcyB5ZWFyICsgdGhpcyBjYW5hbFxuXHRcdCAqICAgICAgICAgdHlwZVg6IHtcblx0XHQgKiAgICAgICAgICAgaWQ6ICdzdHInLFxuXHRcdCAqICAgICAgICAgICBuYW1lOiAnc3RyJyxcblx0XHQgKiAgICAgICAgICAgdmFsdWU6IG51bSxcblx0XHQgKiAgICAgICAgICAgbm9ybWFsaXplZFZhbHVlOiBudW1cblx0XHQgKiAgICAgICAgIH1cblx0XHQgKiAgICAgICB9LFxuXHRcdCAqICAgICAgIGNvbW1vZGl0eUNhdGVnb3JpZXM6IHsgICAgIFx0XHQvLyBzb3J0ZWQgYnkgYWdncmVnYXRlIHRvdGFsIHRvbm5hZ2UgKCdhZ2dyZWdhdGVOb3JtYWxpemVkVmFsdWUnKVxuXHRcdCAqICAgICAgIFx0XHRcdFx0XHRcdFx0XHRcdC8vIG9mIGVhY2ggY29tbW9kaXR5IHdpdGhpbiB0aGUgY2F0ZWdvcnlcblx0XHQgKiAgICAgICAgIGNhdGVnb3J5WDoge1xuXHRcdCAqICAgICAgICAgICBpZDogJ3N0cicsXG5cdFx0ICogICAgICAgICAgIG5hbWU6ICdzdHInLFxuXHRcdCAqICAgICAgICAgICBhZ2dyZWdhdGVOb3JtYWxpemVkVmFsdWU6IG51bSxcblx0XHQgKiAgICAgICAgICAgY29tbW9kaXRpZXM6IFsgICAgICAgICBcdFx0Ly8gc29ydGVkIGJ5IHRvdGFsIHRvbm5hZ2UgKCdub3JtYWxpemVkVmFsdWUnKSBvZiBlYWNoIGNvbW1vZGl0eVxuXHRcdCAqICAgICAgICAgICAgIHtcblx0XHQgKiAgICAgICAgICAgICAgIGlkOiAnc3RyJyxcblx0XHQgKiAgICAgICAgICAgICAgIG5hbWU6ICdzdHInLFxuXHRcdCAqICAgICAgICAgICAgICAgdmFsdWU6IG51bSxcblx0XHQgKiAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRWYWx1ZTogbnVtXG5cdFx0ICogICAgICAgICAgICAgfSxcblx0XHQgKiAgICAgICAgICAgICAuLi5cblx0XHQgKiAgICAgICAgICAgXVxuXHRcdCAqICAgICAgICAgfSxcblx0XHQgKiAgICAgICB9XG5cdFx0ICogICAgIH0sXG5cdFx0ICogICAgICcxODUxJzogeyAuLi4gfSxcblx0XHQgKiAgICAgLi4uXG5cdFx0ICogICB9LFxuXHRcdCAqICAgY2FuYWxZOiB7XG5cdFx0ICogICAgICcxODUxJzogeyAuLi4gfSxcblx0XHQgKiAgICAgJzE4NTInOiB7IC4uLiB9LFxuXHRcdCAqICAgICAuLi5cblx0XHQgKiAgIH0sXG5cdFx0ICogICAuLi5cblx0XHQgKiB9XG5cdFx0ICovXG5cdFx0Y29tbW9kaXRpZXNCeURhdGVCeUNhbmFsOiB7fSxcblxuXHRcdC8qKlxuXHRcdCAqIFNlbGVjdGlvbiBzdGF0ZXMuXG5cdFx0ICogTm90ZTogdGhlc2Ugc3RhdGVzIGNvdWxkIGJlIHN0b3JlZCBpbiB0aGUgdmlldyBsYXllcixcblx0XHQgKiBidXQgc2luY2UgY2hhbmdpbmcgdGhlc2Ugc3RhdGVzIGRvZXMgbm90IGFjdHVhbGx5IGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmVcblx0XHQgKiAoaXQganVzdCBmaWx0ZXJzIHRoZSByZXR1cm5lZCBkYXRhKSwgdGhleSBhcmUgbWFpbnRhaW5lZCBieSB0aGUgc3RvcmUuXG5cdFx0ICovXG5cdFx0c2VsZWN0ZWRDYW5hbDogbnVsbCxcblx0XHRzZWxlY3RlZFllYXI6IG51bGwsXG5cdFx0c2VsZWN0ZWRDb21tb2RpdHk6IG51bGxcblxuXHR9LFxuXG5cdC8vIFRPRE86IE1ha2UgYSBnZW5lcmljIERhdGFMb2FkZXIgY2xhc3MgdG8gZGVmaW5lIGFuIGludGVyZmFjZSxcblx0Ly8gYW5kIGxldCBDYXJ0b0RCTG9hZGVyIGV4dGVuZCBhbmQgaW1wbGVtZW50IHRoYXQ/XG5cdC8vIEJhc2ljIGlkZWEgaXMgdGhhdCBhbnl0aGluZyB3aXRoIGEgcXVlcnkgbWV0aG9kIHRoYXQgcmV0dXJucyBhIFByb21pc2Vcblx0Ly8gdGhhdCByZXNvbHZlcyB3aXRoIGFuIGFycmF5IG9mIHJlc3BvbnNlIGRhdGEgb3IgcmVqZWN0cyB3aXRoIGFuIGVycm9yXG5cdC8vIGNhbiBiZSB1c2VkIGhlcmUuXG5cdGRhdGFMb2FkZXI6IENhcnRvREJMb2FkZXIsXG5cblx0bG9hZEluaXRpYWxEYXRhOiBmdW5jdGlvbiAoc3RhdGUpIHtcblxuXHRcdHRoaXMuZGF0YUxvYWRlci5xdWVyeShbXG5cdFx0XHR7XG5cdFx0XHRcdHF1ZXJ5OiBcIlNFTEVDVCAqIEZST00gY29tbW9kaXRpZXNcIixcblx0XHRcdFx0Zm9ybWF0OiBcIkpTT05cIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cXVlcnk6IFwiU0VMRUNUICogRlJPTSBjb21tb2RpdGllc19sb29rdXBcIixcblx0XHRcdFx0Zm9ybWF0OiBcIkpTT05cIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cXVlcnk6IFwiU0VMRUNUICogRlJPTSBjYXRlZ29yeV9sb29rdXBcIixcblx0XHRcdFx0Zm9ybWF0OiBcIkpTT05cIlxuXHRcdFx0fSxcblx0XHRcdC8qXG5cdFx0XHR7XG5cdFx0XHRcdHF1ZXJ5OiBcIlNFTEVDVCAqIEZST00gY2FuYWxfbGlzdFwiLFxuXHRcdFx0XHRmb3JtYXQ6IFwiSlNPTlwiXG5cdFx0XHR9LFxuXHRcdFx0Ki9cblx0XHRcdHtcblx0XHRcdFx0cXVlcnk6IFwiU0VMRUNUICogRlJPTSBjYW5hbHNcIixcblx0XHRcdFx0Zm9ybWF0OiBcIkpTT05cIlxuXHRcdFx0fSxcblx0XHRcdHtcblx0XHRcdFx0cXVlcnk6IFwiU0VMRUNUICogRlJPTSB0b3RhbF90b25uYWdlXCIsXG5cdFx0XHRcdGZvcm1hdDogXCJKU09OXCJcblx0XHRcdH1cblx0XHRdKS50aGVuKCguLi5yZXNwb25zZXMpID0+IHtcblxuXHRcdFx0dGhpcy5zZXREYXRhKFxuXHRcdFx0XHRfLm1lcmdlKHRoaXMucGFyc2VEYXRhKC4uLnJlc3BvbnNlcyksIHtcblx0XHRcdFx0XHRzZWxlY3RlZENhbmFsOiBzdGF0ZS5zZWxlY3RlZENhbmFsLFxuXHRcdFx0XHRcdHNlbGVjdGVkWWVhcjogc3RhdGUuc2VsZWN0ZWRZZWFyLFxuXHRcdFx0XHRcdHNlbGVjdGVkQ29tbW9kaXR5OiBzdGF0ZS5zZWxlY3RlZENvbW1vZGl0eVxuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblxuXHRcdH0sXG5cdFx0KGVycm9yKSA9PiB7XG5cblx0XHRcdC8vIFRPRE86IGhhbmRsZSB0aGlzLlxuXHRcdFx0Y29uc29sZS5lcnJvcihcIkNvbW1vZGl0eSByZWNlaXZlZCBlcnJvcjpcIiwgZXJyb3IpO1xuXHRcdFx0dGhyb3cgZXJyb3I7XG5cblx0XHR9KTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHNlbGVjdGVkIGNhbmFsIGZvciB0aGUgd2hvbGUgYXBwbGljYXRpb24gdG8gZGlzcGxheS5cblx0ICovXG5cdHNldFNlbGVjdGVkQ2FuYWw6IGZ1bmN0aW9uIChjYW5hbElkKSB7XG5cblx0XHR0aGlzLnNldERhdGEoe1xuXHRcdFx0c2VsZWN0ZWRDYW5hbDogcGFyc2VJbnQoY2FuYWxJZClcblx0XHR9KTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBTZXQgdGhlIHNlbGVjdGVkIHllYXIgZm9yIHRoZSB3aG9sZSBhcHBsaWNhdGlvbiB0byBkaXNwbGF5LlxuXHQgKiBUaGlzIHN0YXRlIGNvdWxkIGJlIHN0b3JlZCBpbiB0aGUgdmlldyBsYXllcixcblx0ICogYnV0IHNpbmNlIGNoYW5naW5nIHRoaXMgc3RhdGUgZG9lcyBub3QgYWN0dWFsbHkgY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZVxuXHQgKiAoaXQganVzdCBmaWx0ZXJzIHRoZSByZXR1cm5lZCBkYXRhKSwgdGhpcyBzdGF0ZSBpcyBtYWludGFpbmVkIGJ5IHRoZSBzdG9yZS5cblx0ICovXG5cdHNldFNlbGVjdGVkWWVhcjogZnVuY3Rpb24gKHllYXIpIHtcblxuXHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRzZWxlY3RlZFllYXI6IHBhcnNlSW50KHllYXIpXG5cdFx0fSk7XG5cblx0fSxcblxuXHQvKipcblx0ICogU2V0IHRoZSBzZWxlY3RlZCBjb21tb2RpdHkgZm9yIHRoZSB3aG9sZSBhcHBsaWNhdGlvbiB0byBkaXNwbGF5LlxuXHQgKiBUaGlzIHN0YXRlIGNvdWxkIGJlIHN0b3JlZCBpbiB0aGUgdmlldyBsYXllcixcblx0ICogYnV0IHNpbmNlIGNoYW5naW5nIHRoaXMgc3RhdGUgZG9lcyBub3QgYWN0dWFsbHkgY2hhbmdlIHRoZSBkYXRhIGluIHRoZSBzdG9yZVxuXHQgKiAoaXQganVzdCBmaWx0ZXJzIHRoZSByZXR1cm5lZCBkYXRhKSwgdGhpcyBzdGF0ZSBpcyBtYWludGFpbmVkIGJ5IHRoZSBzdG9yZS5cblx0ICovXG5cdHNldFNlbGVjdGVkQ29tbW9kaXR5OiBmdW5jdGlvbiAoY29tbW9kaXR5SWQpIHtcblxuXHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRzZWxlY3RlZENvbW1vZGl0eTogcGFyc2VJbnQoY29tbW9kaXR5SWQpXG5cdFx0fSk7XG5cblx0fSxcblxuXHRnZXRTZWxlY3RlZENhbmFsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyByZXR1cm4gZGVlcCBjb3B5IG9mIHN0b3JlZCBkYXRhXG5cdFx0cmV0dXJuIF8ubWVyZ2UodGhpcy5kYXRhLmNhbmFsc1t0aGlzLmRhdGEuc2VsZWN0ZWRDYW5hbF0pO1xuXG5cdH0sXG5cblx0Z2V0U2VsZWN0ZWRZZWFyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5kYXRhLnNlbGVjdGVkWWVhcjtcblxuXHR9LFxuXG5cdGdldEFsbENhbmFsczogZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gcmV0dXJuIGRlZXAgY29weSBvZiBzdG9yZWQgZGF0YVxuXHRcdHJldHVybiBfLm1lcmdlKHRoaXMuZGF0YS5jYW5hbHMpO1xuXG5cdH0sXG5cblx0Z2V0Q29tbW9kaXRpZXNCeUNhbmFsQnlZZWFyOiBmdW5jdGlvbiAoKSB7XG5cblx0XHRsZXQgY29tbW9kaXRpZXNCeUNhbmFsID0gdGhpcy5kYXRhLmNvbW1vZGl0aWVzQnlEYXRlQnlDYW5hbFt0aGlzLmRhdGEuc2VsZWN0ZWRDYW5hbF07XG5cdFx0aWYgKGNvbW1vZGl0aWVzQnlDYW5hbCkge1xuXHRcdFx0Ly8gcmV0dXJuIGRlZXAgY29weSBvZiBzdG9yZWQgZGF0YVxuXHRcdFx0cmV0dXJuIF8ubWVyZ2UoY29tbW9kaXRpZXNCeUNhbmFsW3RoaXMuZGF0YS5zZWxlY3RlZFllYXJdKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0QWxsQ29tbW9kaXRpZXM6IGZ1bmN0aW9uICgpIHtcblxuXHRcdC8vIFRPRE86IHRoaXMgbWF5IG5vdCBiZSBwZXJmb3JtYW50LlxuXHRcdC8vIENvbnNpZGVyIG1lbW9pemluZyBqdXN0IHRoZSBkYXRhIG5lZWRlZCBmb3IgdGhlIHRpbWVsaW5lJ3MgT2Zmc2V0QXJlYUdyYXBoLlxuXG5cdFx0Ly8gcmV0dXJuIGRlZXAgY29weSBvZiBzdG9yZWQgZGF0YVxuXHRcdHJldHVybiBfLm1lcmdlKHRoaXMuZGF0YS5jb21tb2RpdGllc0J5RGF0ZUJ5Q2FuYWwpO1xuXG5cdH0sXG5cblx0c2V0RGF0YTogZnVuY3Rpb24gKGRhdGEpIHtcblxuXHRcdGlmICghZGF0YSkgeyByZXR1cm47IH1cblxuXHRcdGxldCBkaXJ0eSA9IGZhbHNlO1xuXG5cdFx0aWYgKGRhdGEuY29tbW9kaXRpZXMpIHtcblx0XHRcdHRoaXMuZGF0YS5jb21tb2RpdGllcyA9IGRhdGEuY29tbW9kaXRpZXM7XG5cdFx0XHRkaXJ0eSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGRhdGEuY2FuYWxzKSB7XG5cdFx0XHR0aGlzLmRhdGEuY2FuYWxzID0gZGF0YS5jYW5hbHM7XG5cdFx0XHRkaXJ0eSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGRhdGEuY29tbW9kaXRpZXNCeURhdGVCeUNhbmFsKSB7XG5cdFx0XHR0aGlzLmRhdGEuY29tbW9kaXRpZXNCeURhdGVCeUNhbmFsID0gZGF0YS5jb21tb2RpdGllc0J5RGF0ZUJ5Q2FuYWw7XG5cdFx0XHRkaXJ0eSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZihkYXRhLnNlbGVjdGVkQ2FuYWwpICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhLnNlbGVjdGVkQ2FuYWwgIT09IHRoaXMuZGF0YS5zZWxlY3RlZENhbmFsKSB7XG5cdFx0XHR0aGlzLmRhdGEuc2VsZWN0ZWRDYW5hbCA9IGRhdGEuc2VsZWN0ZWRDYW5hbDtcblx0XHRcdGRpcnR5ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mKGRhdGEuc2VsZWN0ZWRZZWFyKSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YS5zZWxlY3RlZFllYXIgIT09IHRoaXMuZGF0YS5zZWxlY3RlZFllYXIpIHtcblx0XHRcdHRoaXMuZGF0YS5zZWxlY3RlZFllYXIgPSBkYXRhLnNlbGVjdGVkWWVhcjtcblx0XHRcdGRpcnR5ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mKGRhdGEuc2VsZWN0ZWRDb21tb2RpdHkpICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhLnNlbGVjdGVkQ29tbW9kaXR5ICE9PSB0aGlzLmRhdGEuc2VsZWN0ZWRDb21tb2RpdHkpIHtcblx0XHRcdHRoaXMuZGF0YS5zZWxlY3RlZENvbW1vZGl0eSA9IGRhdGEuc2VsZWN0ZWRDb21tb2RpdHk7XG5cdFx0XHRkaXJ0eSA9IHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGRpcnR5KSB7XG5cdFx0XHR0aGlzLmVtaXQoQXBwQWN0aW9uVHlwZXMuc3RvcmVDaGFuZ2VkKTtcblx0XHR9XG5cblx0fSxcblxuXHRwYXJzZURhdGE6IGZ1bmN0aW9uIChkYXRhKSB7XG5cblx0XHRsZXQgY29tbW9kaXRpZXMgPSB7fSxcblx0XHQgICAgY2FuYWxzID0ge30sXG5cdFx0ICAgIGNvbW1vZGl0aWVzQnlEYXRlQnlDYW5hbCA9IHt9LFxuXG5cdFx0ICAgIGRhdGFJbmRleCA9IDAsXG5cdFx0ICAgIGNvbW1vZGl0aWVzRGF0YSA9IGRhdGFbZGF0YUluZGV4KytdLFxuXHRcdCAgICBjb21tb2RpdGllc0xvb2t1cERhdGEgPSBkYXRhW2RhdGFJbmRleCsrXSxcblx0XHQgICAgY2F0ZWdvcnlMb29rdXBEYXRhID0gZGF0YVtkYXRhSW5kZXgrK10sXG5cdFx0ICAgIC8vIGNhbmFsTGlzdERhdGEgPSBkYXRhW2RhdGFJbmRleCsrXSxcblx0XHQgICAgY2FuYWxzRGF0YSA9IGRhdGFbZGF0YUluZGV4KytdLFxuXHRcdCAgICB0b3RhbFRvbm5hZ2VEYXRhID0gZGF0YVtkYXRhSW5kZXgrK107XG5cblx0XHRsZXQgY2FuYWw7XG5cdFx0Y2FuYWxzRGF0YS5mb3JFYWNoKChjYW5hbERhdGEpID0+IHtcblxuXHRcdFx0Y2FuYWwgPSB7XG5cdFx0XHRcdGlkOiBwYXJzZUludChjYW5hbERhdGEuY2FuYWxfaWQpLFxuXHRcdFx0XHRuYW1lOiBjYW5hbERhdGEubmFtZSxcblx0XHRcdFx0c3RhcnRZZWFyOiBjYW5hbERhdGEub3BlbmVkLFxuXHRcdFx0XHRlbmRZZWFyOiBjYW5hbERhdGEuY2xvc2VkLFxuXHRcdFx0XHRleHRlbnNpb25zOiBQTEFDRUhPTERFUl9WQUxVRSxcblx0XHRcdFx0bGVuZ3RoOiBjYW5hbERhdGEubGVuZ3RoLFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogUExBQ0VIT0xERVJfVkFMVUUsXG5cdFx0XHRcdGdlb21ldHJ5OiBjYW5hbERhdGEudGhlX2dlb21fd2VibWVyY2F0b3Jcblx0XHRcdH07XG5cblx0XHRcdC8vIElmIGFscmVhZHkgaW4gY2FjaGUsIG1lcmdlIGFsbCB2YWxpZCB2YWx1ZXMuXG5cdFx0XHQvLyBFbHNlLCB3cml0ZSBuZXcgdmFsdWUgdG8gY2FjaGUuXG5cdFx0XHRpZiAoY2FuYWxzW2NhbmFsRGF0YS5jYW5hbF9pZF0pIHtcblx0XHRcdFx0Y2FuYWxzW2NhbmFsRGF0YS5jYW5hbF9pZF0gPSBfLm1lcmdlKGNhbmFsc1tjYW5hbERhdGEuY2FuYWxfaWRdLCBjYW5hbCwgdGhpcy5tZXJnZVRydXRoeUFuZFplcm9lcyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjYW5hbHNbY2FuYWxEYXRhLmNhbmFsX2lkXSA9IGNhbmFsO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0XHRsZXQgY29tbW9kaXR5O1xuXHRcdGNvbW1vZGl0aWVzTG9va3VwRGF0YS5mb3JFYWNoKChjb21tb2RpdHlMb29rdXBEYXRhKSA9PiB7XG5cblx0XHRcdGNvbW1vZGl0eSA9IHtcblx0XHRcdFx0aWQ6IHBhcnNlSW50KGNvbW1vZGl0eUxvb2t1cERhdGEuY29tbV9pZCksXG5cdFx0XHRcdG5hbWU6IGNvbW1vZGl0eUxvb2t1cERhdGEuY29tbW9kaXR5LFxuXHRcdFx0XHRkZXNjcmlwdGlvbjogY29tbW9kaXR5TG9va3VwRGF0YS5kZXNjcmlwdGlvbixcblx0XHRcdFx0dW5pdHM6IGNvbW1vZGl0eUxvb2t1cERhdGEudW5pdFxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKGNvbW1vZGl0aWVzW2NvbW1vZGl0eUxvb2t1cERhdGEuY29tbV9pZF0pIHtcblx0XHRcdFx0Y29tbW9kaXRpZXNbY29tbW9kaXR5TG9va3VwRGF0YS5jb21tX2lkXSA9IF8ubWVyZ2UoY29tbW9kaXRpZXNbY29tbW9kaXR5TG9va3VwRGF0YS5jb21tX2lkXSwgY29tbW9kaXR5LCB0aGlzLm1lcmdlVHJ1dGh5QW5kWmVyb2VzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbW1vZGl0aWVzW2NvbW1vZGl0eUxvb2t1cERhdGEuY29tbV9pZF0gPSBjb21tb2RpdHk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHRcdGxldCBjYW5hbE1hcCxcblx0XHQgICAgeWVhck1hcCxcblx0XHQgICAgY29tbW9kaXRpZXNNYXAsXG5cdFx0ICAgIGNvbW1vZGl0eUNhdGVnb3JpZXMsXG5cdFx0ICAgIGNhdGVnb3J5TWFwLFxuXHRcdCAgICBjb21tb2RpdGllc0luQ2F0ZWdvcnk7XG5cdFx0Y29tbW9kaXRpZXNEYXRhLmZvckVhY2goKGNvbW1vZGl0eURhdGEpID0+IHtcblxuXHRcdFx0aWYgKCFjb21tb2RpdGllc0J5RGF0ZUJ5Q2FuYWxbY29tbW9kaXR5RGF0YS5jYW5hbF9pZF0pIHtcblx0XHRcdFx0Y29tbW9kaXRpZXNCeURhdGVCeUNhbmFsW2NvbW1vZGl0eURhdGEuY2FuYWxfaWRdID0ge307XG5cdFx0XHR9XG5cdFx0XHRjYW5hbE1hcCA9IGNvbW1vZGl0aWVzQnlEYXRlQnlDYW5hbFtjb21tb2RpdHlEYXRhLmNhbmFsX2lkXTtcblxuXHRcdFx0aWYgKCFjYW5hbE1hcFtjb21tb2RpdHlEYXRhLnllYXJdKSB7XG5cdFx0XHRcdGNhbmFsTWFwW2NvbW1vZGl0eURhdGEueWVhcl0gPSB7XG5cdFx0XHRcdFx0eWVhcjogY29tbW9kaXR5RGF0YS55ZWFyXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHR5ZWFyTWFwID0gY2FuYWxNYXBbY29tbW9kaXR5RGF0YS55ZWFyXTtcblxuXHRcdFx0aWYgKCF5ZWFyTWFwLmNvbW1vZGl0aWVzKSB7XG5cdFx0XHRcdHllYXJNYXAuY29tbW9kaXRpZXMgPSB7fTtcblx0XHRcdH1cblx0XHRcdGNvbW1vZGl0aWVzTWFwID0geWVhck1hcC5jb21tb2RpdGllcztcblxuXHRcdFx0Y29tbW9kaXRpZXNNYXBbY29tbW9kaXR5RGF0YS5jb21tX2lkXSA9IHtcblx0XHRcdFx0aWQ6IHBhcnNlSW50KGNvbW1vZGl0eURhdGEuY29tbV9pZCksXG5cdFx0XHRcdG5hbWU6IGNvbW1vZGl0aWVzW2NvbW1vZGl0eURhdGEuY29tbV9pZF0ubmFtZSxcblx0XHRcdFx0dmFsdWU6IHBhcnNlRmxvYXQoY29tbW9kaXR5RGF0YS52YWx1ZS5yZXBsYWNlKC8sL2csJycpKSxcblx0XHRcdFx0bm9ybWFsaXplZFZhbHVlOiBwYXJzZUZsb2F0KGNvbW1vZGl0eURhdGEudG9ucy5yZXBsYWNlKC8sL2csJycpKVxuXHRcdFx0fTtcblxuXHRcdFx0aWYgKCF5ZWFyTWFwLmNvbW1vZGl0eUNhdGVnb3JpZXMpIHtcblx0XHRcdFx0eWVhck1hcC5jb21tb2RpdHlDYXRlZ29yaWVzID0ge307XG5cdFx0XHR9XG5cdFx0XHRjb21tb2RpdHlDYXRlZ29yaWVzID0geWVhck1hcC5jb21tb2RpdHlDYXRlZ29yaWVzO1xuXG5cdFx0XHRpZiAoIWNvbW1vZGl0eUNhdGVnb3JpZXNbY29tbW9kaXR5RGF0YS5jYXRfaWRdKSB7XG5cdFx0XHRcdGNvbW1vZGl0eUNhdGVnb3JpZXNbY29tbW9kaXR5RGF0YS5jYXRfaWRdID0ge307XG5cdFx0XHR9XG5cdFx0XHRjYXRlZ29yeU1hcCA9IGNvbW1vZGl0eUNhdGVnb3JpZXNbY29tbW9kaXR5RGF0YS5jYXRfaWRdO1xuXG5cdFx0XHRpZiAoIWNhdGVnb3J5TWFwLmNvbW1vZGl0aWVzKSB7XG5cdFx0XHRcdGNhdGVnb3J5TWFwLmNvbW1vZGl0aWVzID0gW107XG5cdFx0XHR9XG5cdFx0XHRjb21tb2RpdGllc0luQ2F0ZWdvcnkgPSBjYXRlZ29yeU1hcC5jb21tb2RpdGllcztcblxuXHRcdFx0Y29tbW9kaXRpZXNJbkNhdGVnb3J5LnB1c2goe1xuXHRcdFx0XHRpZDogcGFyc2VJbnQoY29tbW9kaXR5RGF0YS5jb21tX2lkKSxcblx0XHRcdFx0bmFtZTogY29tbW9kaXRpZXNbY29tbW9kaXR5RGF0YS5jb21tX2lkXS5uYW1lLFxuXHRcdFx0XHR2YWx1ZTogcGFyc2VGbG9hdChjb21tb2RpdHlEYXRhLnZhbHVlLnJlcGxhY2UoLywvZywnJykpLFxuXHRcdFx0XHRub3JtYWxpemVkVmFsdWU6IHBhcnNlRmxvYXQoY29tbW9kaXR5RGF0YS50b25zLnJlcGxhY2UoLywvZywnJykpXG5cdFx0XHR9KTtcblxuXHRcdH0pO1xuXHRcdFxuXHRcdC8vIG1hcCB0b25uYWdlIGJ5IGNhbmFsIGJ5IHllYXIuXG5cdFx0Ly8gdGhpcyBtYXAgaXMgbm90IHJldHVybmVkIGFzLWlzLFxuXHRcdC8vIGJ1dCBpcyBwdWxsZWQgaW50byBjb21tb2RpdGllc0J5RGF0ZUJ5Q2FuYWwgYmVsb3cuXG5cdFx0bGV0IHRvdGFsVG9ubmFnZU1hcCA9IHt9LFxuXHRcdCAgICB0b25uYWdlQ2FuYWxNYXA7XG5cdFx0dG90YWxUb25uYWdlRGF0YS5mb3JFYWNoKCh0b25uYWdlQnlEYXRlQW5kQ2FuYWwpID0+IHtcblxuXHRcdFx0aWYgKCF0b3RhbFRvbm5hZ2VNYXBbdG9ubmFnZUJ5RGF0ZUFuZENhbmFsLmNhbmFsX2lkXSkge1xuXHRcdFx0XHR0b3RhbFRvbm5hZ2VNYXBbdG9ubmFnZUJ5RGF0ZUFuZENhbmFsLmNhbmFsX2lkXSA9IHt9O1xuXHRcdFx0fVxuXHRcdFx0dG9ubmFnZUNhbmFsTWFwID0gdG90YWxUb25uYWdlTWFwW3Rvbm5hZ2VCeURhdGVBbmRDYW5hbC5jYW5hbF9pZF07XG5cblx0XHRcdHRvbm5hZ2VDYW5hbE1hcFt0b25uYWdlQnlEYXRlQW5kQ2FuYWwueWVhcl0gPSBwYXJzZUZsb2F0KHRvbm5hZ2VCeURhdGVBbmRDYW5hbC50b3RhbC5yZXBsYWNlKC8sL2csJycpKTtcblxuXHRcdH0pO1xuXG5cdFx0Ly8gbWFwIGNhdGVnb3J5IG5hbWVzIGJ5IGlkLlxuXHRcdC8vIHRoaXMgbWFwIGlzIG5vdCByZXR1cm5lZCBhcy1pcyxcblx0XHQvLyBidXQgaXMgcHVsbGVkIGludG8gY29tbW9kaXRpZXNCeURhdGVCeUNhbmFsIGJlbG93LlxuXHRcdGxldCBjYXRlZ29yaWVzQnlJZCA9IHt9O1xuXHRcdGNhdGVnb3J5TG9va3VwRGF0YS5mb3JFYWNoKChjYXRlZ29yeURhdGEpID0+IHtcblx0XHRcdGNhdGVnb3JpZXNCeUlkW2NhdGVnb3J5RGF0YS5jYXRfaWRdID0gY2F0ZWdvcnlEYXRhLmNhdGVnb3J5O1xuXHRcdH0pO1xuXG5cdFx0Ly8gZm9yIGVhY2ggY2FuYWwteWVhcjpcblx0XHQvLyAtIGZpbGwgaW4gdG90YWxOb3JtYWxpemVkVmFsdWVcblx0XHQvLyAtIGZpbGwgaW4gbmFtZSBhbmQgYWdncmVnYXRlTm9ybWFsaXplZFZhbHVlIGZvciBlYWNoIGNvbW1vZGl0eUNhdGVnb3J5IGFuZCBzb3J0XG5cdFx0bGV0IGNhdGVnb3J5TmFtZSxcblx0XHQgICAgY29tbW9kaXRpZXNCeVllYXI7XG5cdFx0Xy5mb3JPd24oY29tbW9kaXRpZXNCeURhdGVCeUNhbmFsLCAoY2FuYWwsIGNhbmFsSWQpID0+IHtcblx0XHRcdF8uZm9yT3duKGNhbmFsLCAoeWVhck1hcCwgeWVhcikgPT4ge1xuXG5cdFx0XHRcdHRvbm5hZ2VDYW5hbE1hcCA9IHRvdGFsVG9ubmFnZU1hcFtjYW5hbElkXTtcblx0XHRcdFx0aWYgKHRvbm5hZ2VDYW5hbE1hcCAmJiB0b25uYWdlQ2FuYWxNYXBbeWVhcl0pIHtcblx0XHRcdFx0XHR5ZWFyTWFwLnRvdGFsTm9ybWFsaXplZFZhbHVlID0gcGFyc2VJbnQodG9ubmFnZUNhbmFsTWFwW3llYXJdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbW1vZGl0aWVzQnlZZWFyID0geWVhck1hcC5jb21tb2RpdGllcztcblx0XHRcdFx0Xy5mb3JPd24oeWVhck1hcC5jb21tb2RpdHlDYXRlZ29yaWVzLCAoY2F0ZWdvcnlNYXAsIGNhdGVnb3J5SWQpID0+IHtcblxuXHRcdFx0XHRcdGNhdGVnb3J5TmFtZSA9IGNhdGVnb3JpZXNCeUlkW2NhdGVnb3J5SWRdO1xuXHRcdFx0XHRcdGlmICghY2F0ZWdvcnlOYW1lKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0ZvdW5kIGNvbW1vZGl0eSBjYXRlZ29yeSBpZCB3aXRoIG5vIGNvcnJlc3BvbmRpbmcgbmFtZTonLCBjYXRlZ29yeUlkKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2F0ZWdvcnlNYXAubmFtZSA9IGNhdGVnb3J5TmFtZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvLyBzdW0gYW5kIHN0b3JlIGBub3JtYWxpemVkVmFsdWVgIG9mIGVhY2ggY29tbW9kaXR5IHR5cGUgd2l0aGluIGNhdGVnb3J5XG5cdFx0XHRcdFx0Y2F0ZWdvcnlNYXAuYWdncmVnYXRlTm9ybWFsaXplZFZhbHVlID0gY2F0ZWdvcnlNYXAuY29tbW9kaXRpZXMucmVkdWNlKCh2YWwsIGNvbW1vZGl0eSkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHZhbCArIGNvbW1vZGl0eS5ub3JtYWxpemVkVmFsdWU7XG5cdFx0XHRcdFx0fSwgMCk7XG5cblx0XHRcdFx0XHQvLyBzb3J0IGNvbW1vZGl0eSB0eXBlcyBieSB0b25uYWdlXG5cdFx0XHRcdFx0Y2F0ZWdvcnlNYXAuY29tbW9kaXRpZXMgPSBjYXRlZ29yeU1hcC5jb21tb2RpdGllcy5zb3J0KChhLCBiKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYS5ub3JtYWxpemVkVmFsdWUgPCBiLm5vcm1hbGl6ZWRWYWx1ZTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBzb3J0IGNvbW1vZGl0eSBjYXRlZ29yaWVzIGJ5IGFnZ3JlZ2F0ZU5vcm1hbGl6ZWRWYWx1ZSBvZiBlYWNoXG5cdFx0XHRcdHllYXJNYXAuY29tbW9kaXR5Q2F0ZWdvcmllcyA9IE9iamVjdC5rZXlzKHllYXJNYXAuY29tbW9kaXR5Q2F0ZWdvcmllcykuc29ydCgoYSwgYikgPT4ge1xuXHRcdFx0XHRcdHJldHVybiB5ZWFyTWFwLmNvbW1vZGl0eUNhdGVnb3JpZXNbYV0uYWdncmVnYXRlTm9ybWFsaXplZFZhbHVlIDwgeWVhck1hcC5jb21tb2RpdHlDYXRlZ29yaWVzW2JdLmFnZ3JlZ2F0ZU5vcm1hbGl6ZWRWYWx1ZTtcblx0XHRcdFx0fSkucmVkdWNlKChvdXQsIGNhdGVnb3J5S2V5KSA9PiB7XG5cdFx0XHRcdFx0b3V0W2NhdGVnb3J5S2V5XSA9IHllYXJNYXAuY29tbW9kaXR5Q2F0ZWdvcmllc1tjYXRlZ29yeUtleV07XG5cdFx0XHRcdFx0cmV0dXJuIG91dDtcblx0XHRcdFx0fSwge30pO1xuXHRcdFx0XHQvLyB5ZWFyTWFwLmNvbW1vZGl0eUNhdGVnb3JpZXMgPSBuZXcgTWFwKEFycmF5LmZyb20oeWVhck1hcC5jb21tb2RpdHlDYXRlZ29yaWVzLmVudHJpZXMoKSkuc29ydCgoYSwgYikgPT4ge1xuXHRcdFx0XHQvLyBcdHJldHVybiBhWzFdLmFnZ3JlZ2F0ZU5vcm1hbGl6ZWRWYWx1ZSA8IGJbMV0uYWdncmVnYXRlTm9ybWFsaXplZFZhbHVlO1xuXHRcdFx0XHQvLyB9KSkpO1xuXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdGNvbnN0IHJldHVybkRhdGEgPSB7XG5cdFx0XHRjb21tb2RpdGllczogY29tbW9kaXRpZXMsXG5cdFx0XHRjYW5hbHM6IGNhbmFscyxcblx0XHRcdGNvbW1vZGl0aWVzQnlEYXRlQnlDYW5hbDogY29tbW9kaXRpZXNCeURhdGVCeUNhbmFsXG5cdFx0fTtcblxuXHRcdC8vIHRoaXMudmFsaWRhdGVEYXRhKHJldHVybkRhdGEpO1xuXG5cdFx0cmV0dXJuIHJldHVybkRhdGE7XG5cblx0fSxcblxuXHQvKipcblx0ICogVmFsaWRhdGUgcGFyc2VkIGRhdGEuXG5cdCAqL1xuXHR2YWxpZGF0ZURhdGE6IGZ1bmN0aW9uIChkYXRhKSB7XG5cblx0XHRkYXRhLmNhbmFscy5mb3JFYWNoKChjYW5hbCwgY2FuYWxJZCkgPT4ge1xuXG5cdFx0XHRPYmplY3Qua2V5cyhjYW5hbCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdGlmIChjYW5hbFtrZXldID09PSBQTEFDRUhPTERFUl9WQUxVRSkge1xuXHRcdFx0XHRcdGNvbnNvbGUud2FybihgTm8gdmFsdWUgZm9yICR7IGtleSB9IGluIGNhbmFsICckeyBjYW5hbC5uYW1lIH0nLmApO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdH0pO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEF2b2lkIG92ZXJ3cml0aW5nIHdpdGggZmFsc3kgdmFsdWVzIChidXQgbGV0IHplcm9lcyB0aHJvdWdoKS5cblx0ICogRm9yIHVzZSB3aXRoIGUuZy4gXy5tZXJnZSgpLlxuXHQgKi9cblx0bWVyZ2VUcnV0aHlBbmRaZXJvZXM6IGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0XG5cdFx0aWYgKGIgPT09IDAgfHwgYiA9PT0gJzAnIHx8IGIpIHtcblx0XHRcdHJldHVybiBiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gYTtcblx0XHR9XG5cblx0fVxuXG59O1xuXG4vLyBNaXhpbiBFdmVudEVtaXR0ZXIgZnVuY3Rpb25hbGl0eVxuT2JqZWN0LmFzc2lnbihDb21tb2RpdHlTdG9yZSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSk7XG5cbi8vIFJlZ2lzdGVyIGNhbGxiYWNrIHRvIGhhbmRsZSBhbGwgdXBkYXRlc1xuQXBwRGlzcGF0Y2hlci5yZWdpc3RlcigoYWN0aW9uKSA9PiB7XG5cblx0c3dpdGNoIChhY3Rpb24udHlwZSkge1xuXG5cdFx0Y2FzZSBBcHBBY3Rpb25UeXBlcy5sb2FkSW5pdGlhbERhdGE6XG5cdFx0XHRDb21tb2RpdHlTdG9yZS5sb2FkSW5pdGlhbERhdGEoYWN0aW9uLnN0YXRlKTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSBBcHBBY3Rpb25UeXBlcy5jYW5hbFNlbGVjdGVkOlxuXHRcdFx0Q29tbW9kaXR5U3RvcmUuc2V0U2VsZWN0ZWRDYW5hbChhY3Rpb24udmFsdWUpO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIEFwcEFjdGlvblR5cGVzLnllYXJTZWxlY3RlZDpcblx0XHRcdENvbW1vZGl0eVN0b3JlLnNldFNlbGVjdGVkWWVhcihhY3Rpb24udmFsdWUpO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIEFwcEFjdGlvblR5cGVzLmNvbW1vZGl0eVNlbGVjdGVkOlxuXHRcdFx0Q29tbW9kaXR5U3RvcmUuc2V0U2VsZWN0ZWRDb21tb2RpdHkoYWN0aW9uLnZhbHVlKTtcblx0XHRcdGJyZWFrO1xuXG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vZGl0eVN0b3JlO1xuIiwiaW1wb3J0IEFwcERpc3BhdGNoZXIgZnJvbSAnLi9BcHBEaXNwYXRjaGVyJztcblxuZXhwb3J0IGNvbnN0IEFwcEFjdGlvblR5cGVzID0ge1xuXG5cdC8vIE5vdGU6IHN0b3JlcyBlbWl0IHRoaXMgdHlwZSBvZiBldmVudC5cblx0Ly8gVGhvdWdoIGl0IGlzIG5vdCBhY3R1YWxseSBhbiBBY3Rpb24gdHlwZSxcblx0Ly8gaXQncyBlbnVtZXJhdGVkIGhlcmUgZm9yIGVhc2Ugb2YgYWNjZXNzLlxuXHRzdG9yZUNoYW5nZWQ6ICdzdG9yZUNoYW5nZWQnLFxuXG5cdGxvYWRJbml0aWFsRGF0YTogJ2xvYWRJbml0aWFsRGF0YScsXG5cdGNhbmFsU2VsZWN0ZWQ6ICdjYW5hbFNlbGVjdGVkJyxcblx0eWVhclNlbGVjdGVkOiAneWVhclNlbGVjdGVkJyxcblx0Y29tbW9kaXR5U2VsZWN0ZWQ6ICdjb21tb2RpdHlTZWxlY3RlZCdcblxufTtcblxuZXhwb3J0IGNvbnN0IEFwcEFjdGlvbnMgPSB7XG5cblx0LyoqXG5cdCAqIExvYWQgZGF0YSBuZWVkZWQgYnkgdGhlIGFwcGxpY2F0aW9uIG9uIGluaXQuXG5cdCAqL1xuXHRsb2FkSW5pdGlhbERhdGE6IChzdGF0ZSkgPT4ge1xuXHRcdEFwcERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQXBwQWN0aW9uVHlwZXMubG9hZEluaXRpYWxEYXRhLFxuXHRcdFx0c3RhdGU6IHN0YXRlXG5cdFx0fSk7XG5cdH0sXG5cblx0Y2FuYWxTZWxlY3RlZDogKGNhbmFsKSA9PiB7XG5cdFx0QXBwRGlzcGF0Y2hlci5kaXNwYXRjaCh7XG5cdFx0XHR0eXBlOiBBcHBBY3Rpb25UeXBlcy5jYW5hbFNlbGVjdGVkLFxuXHRcdFx0dmFsdWU6IGNhbmFsXG5cdFx0fSk7XG5cdH0sXG5cblx0eWVhclNlbGVjdGVkOiAoeWVhcikgPT4ge1xuXHRcdEFwcERpc3BhdGNoZXIuZGlzcGF0Y2goe1xuXHRcdFx0dHlwZTogQXBwQWN0aW9uVHlwZXMueWVhclNlbGVjdGVkLFxuXHRcdFx0dmFsdWU6IHllYXJcblx0XHR9KTtcblx0fSxcblxuXHRjb21tb2RpdHlTZWxlY3RlZDogKGNvbW1vZGl0eSwgY2FuYWwsIHllYXIpID0+IHtcblx0XHRBcHBEaXNwYXRjaGVyLmRpc3BhdGNoKHtcblx0XHRcdHR5cGU6IEFwcEFjdGlvblR5cGVzLmNvbW1vZGl0eVNlbGVjdGVkLFxuXHRcdFx0dmFsdWU6IGNvbW1vZGl0eVxuXHRcdH0pO1xuXHR9XG5cbn1cbiIsImltcG9ydCB7IERpc3BhdGNoZXIgfSBmcm9tICdmbHV4JztcblxuZXhwb3J0IGRlZmF1bHQgbmV3IERpc3BhdGNoZXIoKTtcbiIsIi8qXG4gKiBUT0RPOiBNb3ZlIHRoaXMgaW50byBAcGFub3JhbWEvdG9vbGtpdC5cbiAqIFxuICogQ29uc2lkZXIgcHVsbGluZyBjYXJ0b2RiLWNsaWVudCBpbnRvIHRoaXMgYW5kIHBhY2thZ2luZyB0aGUgd2hvbGUgdGhpbmcgYXMgYSBjb21wb25lbnQsXG4gKiBsZWF2aW5nIGBxdWVyeWAgYXMgdGhlIG9ubHkgcHVibGljIG1ldGhvZC5cbiAqIFxuICogQWxzbywgbm90ZSB0aGlzIGlzIHByZXR0eSBzaW1pbGFyIHRvIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2NhcnRvZGIgYWxyZWFkeSA+LjxcbiAqL1xuXG5pbXBvcnQgUXVldWUgZnJvbSAncXVldWUtYXN5bmMnO1xuXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL2Jhc2VtYXBzL2NhcnRvZGIvY29uZmlnLmpzb24nO1xuaW1wb3J0IENhcnRvREJDbGllbnQgZnJvbSAnY2FydG9kYi1jbGllbnQnO1xuXG5jb25zdCBjYXJ0b0RCQ2xpZW50ID0gbmV3IENhcnRvREJDbGllbnQoY29uZmlnLnVzZXJJZCk7XG5cbmNvbnN0IENhcnRvREJMb2FkZXIgPSB7XG5cdFxuXHQvKiogVXNlIGBxdWV1ZS1hc3luY2AgdG8gZGVmZXIoKSB1cCBhbiBhcnJheSBvZiBxdWVyaWVzLFxuXHQgKiBhbmQgcmV0dXJuIGEgUHJvbWlzZSB0aGF0IGlzIHJlc29sdmVkIHdoZW4gYWxsIHJlcXVlc3RzIGhhdmUgY29tcGxldGVkLlxuXHQgKiBBY2NlcHRzIGEgbGlzdCBvZiBvYmplY3RzIGZvcm1hdHRlZCBhcyB7IHF1ZXJ5LCBmb3JtYXQgfS5cblx0ICovXG5cdHF1ZXJ5OiBmdW5jdGlvbiAocXVlcnlDb25maWdzKSB7XG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG5cdFx0XHQvLyBSdW4gdXAgdG8gMyByZXF1ZXN0cyBpbiBwYXJhbGxlbFxuXHRcdFx0bGV0IHF1ZXVlID0gUXVldWUoMyk7XG5cdFx0XHRxdWVyeUNvbmZpZ3MuZm9yRWFjaCgocXVlcnlDb25maWcpID0+IHtcblx0XHRcdFx0cXVldWUuZGVmZXIodGhpcy5yZXF1ZXN0LCBxdWVyeUNvbmZpZyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cXVldWUuYXdhaXRBbGwoKGVycm9yLCAuLi5yZXNwb25zZXMpID0+IHtcblx0XHRcdFx0aWYgKGVycm9yKSB7XG5cdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXNvbHZlKC4uLnJlc3BvbnNlcyk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXG5cdFx0fSk7XG5cblx0fSxcblxuXHRyZXF1ZXN0OiBmdW5jdGlvbiAocXVlcnlDb25maWcsIGNhbGxiYWNrKSB7XG5cblx0XHRjYXJ0b0RCQ2xpZW50LnNxbFJlcXVlc3QocXVlcnlDb25maWcucXVlcnksIGZ1bmN0aW9uKGVyciwgcmVzcG9uc2UpIHtcblx0XHRcdGlmICghZXJyKSB7XG5cdFx0XHRcdGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlLnJvd3MpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y2FsbGJhY2soZXJyKVxuXHRcdFx0fVxuXHRcdH0sIHtcblx0XHRcdCdmb3JtYXQnOiBxdWVyeUNvbmZpZy5mb3JtYXQsXG5cdFx0XHQnZGFuZ2Vyb3VzbHlFeHBvc2VkQVBJS2V5JzogY29uZmlnLmFwaUtleVxuXHRcdH0pO1xuXG5cdH1cblx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IENhcnRvREJMb2FkZXI7XG4iXX0=
