import { EventEmitter } from 'events';

const HashManager = (function () {

  const EVENT_HASH_CHANGED = 'hashChanged';
  const MAP_KEY = 'loc';
  
  let hashManager = {},
    state = {};

  // Mixin EventEmitter functionality
  Object.assign(hashManager, EventEmitter.prototype);

  // Handle hashchange events
  window.addEventListener('hashchange', onHashChange);

  function updateHash (newState) {

    if (newState[MAP_KEY]) {
      newState[MAP_KEY] = formatMapCenterAndZoom(newState[MAP_KEY]);
    }

    let mergedState = Object.assign({}, state, newState);

    // remove null/undefined values
    for (let key in mergedState) {
      if (mergedState[key] == null) {
        delete mergedState[key];
      }
    }

    let hash = '#' + Object.keys(mergedState).map((key) => key + '=' + mergedState[key]).join('&');
    if (document.location.hash !== hash) {
      document.location.replace(hash);
    }

  }

  /**
   * Get the current state of the application, as reflected in the URL hash.
   * Retrieves all state in the hash, unless a specific key is passed.
   * @param  {String} key       If specified, will retrieve only the value stored at this key.
   * @return {String|Object}    If `key` is passed, returns the value stored at that key; otherwise, returns all state in the hash.
   */
  function getState (key=null) {

    if (key) {
      return state[key];
    } else {
      return Object.assign({}, state);
    }

  }

  function setState (val, silent) {

    state = val;
    if (!silent) {
      hashManager.emit(EVENT_HASH_CHANGED, Object.assign({}, state));
    }

  }

  function onHashChange () {

    setState(parseHash(window.location.hash));

  }

  function parseHash (hash) {

    // Split into `&`-delimited parts and store as key-value pairs
    let hashState = hash.replace(/^#\/?|\/$/g, '').split('&').reduce((obj, pair) => {
      pair = pair.split('=');
      if (pair[0] === MAP_KEY) {
        pair[1] = parseMapCenterAndZoom(pair[1]);
      }
      obj[pair[0]] = pair[1];
      return obj;
    }, {});

    return hashState;

  }

  function parseMapCenterAndZoom (args) {

    args = args.split('/');
    if (args.length == 3) {

      let zoom = parseInt(args[0], 10),
        lat = parseFloat(args[1]),
        lon = parseFloat(args[2]);

      if (isNaN(zoom) || isNaN(lat) || isNaN(lon)) {
        return false;
      } else {

        return {
          center: [lat, lon],
          zoom: zoom
        };

      }
    } else {
      return false;
    }

  }

  function formatMapCenterAndZoom (mapState) {

    let center = mapState.center,
      zoom = mapState.zoom,
      precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));

    return [
      zoom,
      center.lat.toFixed(precision),
      center.lng.toFixed(precision)
    ].join('/');

  }

  // Establish initial state
  setState(parseHash(window.location.hash), true);

  // Public interface
  hashManager.EVENT_HASH_CHANGED = EVENT_HASH_CHANGED;
  hashManager.MAP_KEY = MAP_KEY;
  hashManager.updateHash = updateHash;
  hashManager.getState = getState;
  return hashManager;

})();

export default HashManager;
