import { EventEmitter } from 'events';

// TODO: refactor as closure, and expose only the "right" methods (e.g. updateHash, not setState)
const HashManager = {

  EVENT_HASH_CHANGED: 'hashChanged',

  state: {},

  init: function () {
    
    this.onHashChange = this.onHashChange.bind(this);
    window.addEventListener('hashchange', this.onHashChange);

  },

  updateHash: function (newState) {

    let mergedState = Object.assign({}, this.state, newState);

    let hash = "#" + Object.keys(mergedState).map((key) => key + '=' + mergedState[key]).join('&');
    if (document.location.hash !== hash) {
      document.location.replace(hash);
    }

  },

  getState: function () {
    return Object.assign({}, this.state);
  },

  setState: function (val) {
    this.state = val;
    this.emit(this.EVENT_HASH_CHANGED, Object.assign({}, this.state));
  },

  onHashChange: function () {
    this.setState(this.parseHash(window.location.hash));
  },

  parseHash: function (hash) {

    // Split into `&`-delimited parts and store as key-value pairs
    let hashState = hash.replace(/^#\/?|\/$/g, '').split('&').reduce((obj, pair) => {
      pair = pair.split('=');
      obj[pair[0]] = pair[1];
      return obj;
    }, {});

    return hashState;

  }

}

HashManager.init();

// Mixin EventEmitter functionality
Object.assign(HashManager, EventEmitter.prototype);

export default HashManager;
