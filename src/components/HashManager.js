import { EventEmitter } from 'events';

const HashManager = (function () {

  const EVENT_HASH_CHANGED = 'hashChanged';
  
  let hashManager = {},
    state = {};

  // Mixin EventEmitter functionality
  Object.assign(hashManager, EventEmitter.prototype);

  // Handle hashchange events
  window.addEventListener('hashchange', onHashChange);

  function updateHash (newState) {
    let mergedState = Object.assign({}, state, newState);

    let hash = "#" + Object.keys(mergedState).map((key) => key + '=' + mergedState[key]).join('&');
    if (document.location.hash !== hash) {
      document.location.replace(hash);
    }
  }

  function getState () {
    return Object.assign({}, state);
  }

  function setState (val) {
    state = val;
    hashManager.emit(EVENT_HASH_CHANGED, Object.assign({}, state));
  }

  function onHashChange () {
    setState(parseHash(window.location.hash));
  }

  function parseHash (hash) {
    // Split into `&`-delimited parts and store as key-value pairs
    let hashState = hash.replace(/^#\/?|\/$/g, '').split('&').reduce((obj, pair) => {
      pair = pair.split('=');
      obj[pair[0]] = pair[1];
      return obj;
    }, {});

    return hashState;
  }

  // Public interface
  hashManager.updateHash = updateHash;
  hashManager.getState = getState;
  return hashManager;

})();

export default HashManager;
