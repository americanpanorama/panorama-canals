(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/ericsocolofsky/Documents/stamen/git/richmond-canals/src/App.jsx":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var React = _interopRequireWildcard(_react);

// example module from @panorama
// import Legend from '@panorama/legend';

/*
 * Data flow via Flux:
 * https://facebook.github.io/flux/docs/overview.html
 * 
 *                  ┌-----   actions  <-----┐
 *                  v                       |    
 * actions --> dispatcher --> stores --> views
 */

// stores
// import ExampleStore from './stores/ExampleStore.jsx';

// components
// import ExampleComponent from './components/ExampleComponent.jsx';
// TODO: can component require css instead of having that happen elsewhere? more modular.
// (if i get this to work, make it happen for legend component too?)

// actions

// utils

// main app container

var App = (function (_React$Component) {
	_inherits(App, _React$Component);

	function App(props) {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);

		// set up initial state (instead of ES5-style getInitialState)
		// this.state =

		// bind handlers to this component instance,
		// since React no longer does this automatically when using ES6
		// this.onThingClicked = this.onThingClicked.bind(this);
	}

	// property validation

	_createClass(App, [{
		key: 'componentWillMount',
		value: function componentWillMount() {

			//

		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {

			// ExampleStore.addChangeListener(this.onChange);

		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {

			// ExampleStore.removeChangeListener(this.onChange);

		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {

			//

		}
	}, {
		key: 'render',
		value: function render() {

			return React.createElement(
				'div',
				{ className: 'container full-height' },
				React.createElement(
					'div',
					{ className: 'row full-height' },
					React.createElement(
						'div',
						{ className: 'columns eight full-height' },
						React.createElement('div', { className: 'row top-row template-tile' }),
						React.createElement('div', { className: 'row bottom-row template-tile' })
					),
					React.createElement(
						'div',
						{ className: 'columns four full-height' },
						React.createElement('div', { className: 'row top-row template-tile' }),
						React.createElement('div', { className: 'row bottom-row template-tile' })
					)
				)
			);
		}
	}]);

	return App;
})(React.Component);

exports['default'] = App;
App.propTypes = {

	/*
 legendData: React.PropTypes.object,
 exampleTitle: React.PropTypes.string,
 */

};

// property defaults
// (instead of ES5-style getDefaultProps)
App.defaultProps = {

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

};
module.exports = exports['default'];
/*
<h2>Application component:</h2>
<ExampleComponent title={this.props.exampleTitle}/>
*/ /*
   <h2>Imported component:</h2>
   <Legend data={this.props.legendData}/>
   */

},{"react":"react"}],"/Users/ericsocolofsky/Documents/stamen/git/richmond-canals/src/main.jsx":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _AppJsx = require('./App.jsx');

var _AppJsx2 = _interopRequireDefault(_AppJsx);

React.render(React.createElement(_AppJsx2['default'], null), document.body);

},{"./App.jsx":"/Users/ericsocolofsky/Documents/stamen/git/richmond-canals/src/App.jsx","react":"react"}]},{},["/Users/ericsocolofsky/Documents/stamen/git/richmond-canals/src/main.jsx"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZXJpY3NvY29sb2Zza3kvRG9jdW1lbnRzL3N0YW1lbi9naXQvcmljaG1vbmQtY2FuYWxzL3NyYy9BcHAuanN4IiwiL1VzZXJzL2VyaWNzb2NvbG9mc2t5L0RvY3VtZW50cy9zdGFtZW4vZ2l0L3JpY2htb25kLWNhbmFscy9zcmMvbWFpbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ0F1QixPQUFPOztJQUFsQixLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaUNJLEdBQUc7V0FBSCxHQUFHOztBQUVYLFVBRlEsR0FBRyxDQUVWLEtBQUssRUFBRTt3QkFGQSxHQUFHOztBQUl0Qiw2QkFKbUIsR0FBRyw2Q0FJaEIsS0FBSyxFQUFFOzs7Ozs7OztFQVNiOzs7O2NBYm1CLEdBQUc7O1NBZUosOEJBQUc7Ozs7R0FJckI7OztTQUVpQiw2QkFBRzs7OztHQUlwQjs7O1NBRW9CLGdDQUFHOzs7O0dBSXZCOzs7U0FFa0IsOEJBQUc7Ozs7R0FJckI7OztTQUVNLGtCQUFHOztBQUVULFVBQ0M7O01BQUssU0FBUyxFQUFDLHVCQUF1QjtJQUNyQzs7T0FBSyxTQUFTLEVBQUMsaUJBQWlCO0tBQy9COztRQUFLLFNBQVMsRUFBQywyQkFBMkI7TUFDekMsNkJBQUssU0FBUyxFQUFDLDJCQUEyQixHQUtwQztNQUNOLDZCQUFLLFNBQVMsRUFBQyw4QkFBOEIsR0FDdkM7TUFDRDtLQUNOOztRQUFLLFNBQVMsRUFBQywwQkFBMEI7TUFDeEMsNkJBQUssU0FBUyxFQUFDLDJCQUEyQixHQUNwQztNQUNOLDZCQUFLLFNBQVMsRUFBQyw4QkFBOEIsR0FLdkM7TUFDRDtLQUNEO0lBQ0QsQ0FDTDtHQUVGOzs7UUFwRW1CLEdBQUc7R0FBUyxLQUFLLENBQUMsU0FBUzs7cUJBQTNCLEdBQUc7QUF5RXhCLEdBQUcsQ0FBQyxTQUFTLEdBQUc7Ozs7Ozs7Q0FPZixDQUFDOzs7O0FBSUYsR0FBRyxDQUFDLFlBQVksR0FBRzs7Ozs7Ozs7Ozs7Ozs7Q0FlbEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7cUJDcElxQixPQUFPOztJQUFsQixLQUFLOztzQkFDRCxXQUFXOzs7O0FBRTNCLEtBQUssQ0FBQyxNQUFNLENBQUMsOENBQU0sRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG4vLyBleGFtcGxlIG1vZHVsZSBmcm9tIEBwYW5vcmFtYVxuLy8gaW1wb3J0IExlZ2VuZCBmcm9tICdAcGFub3JhbWEvbGVnZW5kJztcblxuLypcbiAqIERhdGEgZmxvdyB2aWEgRmx1eDpcbiAqIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL2ZsdXgvZG9jcy9vdmVydmlldy5odG1sXG4gKiBcbiAqICAgICAgICAgICAgICAgICAg4pSMLS0tLS0gICBhY3Rpb25zICA8LS0tLS3ilJBcbiAqICAgICAgICAgICAgICAgICAgdiAgICAgICAgICAgICAgICAgICAgICAgfCAgICBcbiAqIGFjdGlvbnMgLS0+IGRpc3BhdGNoZXIgLS0+IHN0b3JlcyAtLT4gdmlld3NcbiAqL1xuXG4vLyBzdG9yZXNcbi8vIGltcG9ydCBFeGFtcGxlU3RvcmUgZnJvbSAnLi9zdG9yZXMvRXhhbXBsZVN0b3JlLmpzeCc7XG5cblxuLy8gY29tcG9uZW50c1xuLy8gaW1wb3J0IEV4YW1wbGVDb21wb25lbnQgZnJvbSAnLi9jb21wb25lbnRzL0V4YW1wbGVDb21wb25lbnQuanN4Jztcbi8vIFRPRE86IGNhbiBjb21wb25lbnQgcmVxdWlyZSBjc3MgaW5zdGVhZCBvZiBoYXZpbmcgdGhhdCBoYXBwZW4gZWxzZXdoZXJlPyBtb3JlIG1vZHVsYXIuXG4vLyAoaWYgaSBnZXQgdGhpcyB0byB3b3JrLCBtYWtlIGl0IGhhcHBlbiBmb3IgbGVnZW5kIGNvbXBvbmVudCB0b28/KVxuXG5cblxuXG4vLyBhY3Rpb25zXG5cblxuLy8gdXRpbHNcblxuXG4vLyBtYWluIGFwcCBjb250YWluZXJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cblx0Y29uc3RydWN0b3IgKHByb3BzKSB7XG5cblx0XHRzdXBlcihwcm9wcyk7XG5cblx0XHQvLyBzZXQgdXAgaW5pdGlhbCBzdGF0ZSAoaW5zdGVhZCBvZiBFUzUtc3R5bGUgZ2V0SW5pdGlhbFN0YXRlKVxuXHRcdC8vIHRoaXMuc3RhdGUgPSBcblxuXHRcdC8vIGJpbmQgaGFuZGxlcnMgdG8gdGhpcyBjb21wb25lbnQgaW5zdGFuY2UsXG5cdFx0Ly8gc2luY2UgUmVhY3Qgbm8gbG9uZ2VyIGRvZXMgdGhpcyBhdXRvbWF0aWNhbGx5IHdoZW4gdXNpbmcgRVM2XG5cdFx0Ly8gdGhpcy5vblRoaW5nQ2xpY2tlZCA9IHRoaXMub25UaGluZ0NsaWNrZWQuYmluZCh0aGlzKTtcblxuXHR9XG5cblx0Y29tcG9uZW50V2lsbE1vdW50ICgpIHtcblxuXHRcdC8vXG5cblx0fVxuXG5cdGNvbXBvbmVudERpZE1vdW50ICgpIHtcblxuXHRcdC8vIEV4YW1wbGVTdG9yZS5hZGRDaGFuZ2VMaXN0ZW5lcih0aGlzLm9uQ2hhbmdlKTtcblxuXHR9XG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQgKCkge1xuXG5cdFx0Ly8gRXhhbXBsZVN0b3JlLnJlbW92ZUNoYW5nZUxpc3RlbmVyKHRoaXMub25DaGFuZ2UpO1xuXG5cdH1cblxuXHRjb21wb25lbnREaWRVcGRhdGUgKCkge1xuXG5cdFx0Ly9cblxuXHR9XG5cblx0cmVuZGVyICgpIHtcblxuXHRcdHJldHVybiAoXG5cdFx0XHQ8ZGl2IGNsYXNzTmFtZT0nY29udGFpbmVyIGZ1bGwtaGVpZ2h0Jz5cblx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3JvdyBmdWxsLWhlaWdodCc+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J2NvbHVtbnMgZWlnaHQgZnVsbC1oZWlnaHQnPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3JvdyB0b3Atcm93IHRlbXBsYXRlLXRpbGUnPlxuXHRcdFx0XHRcdFx0XHR7Lypcblx0XHRcdFx0XHRcdFx0PGgyPkFwcGxpY2F0aW9uIGNvbXBvbmVudDo8L2gyPlxuXHRcdFx0XHRcdFx0XHQ8RXhhbXBsZUNvbXBvbmVudCB0aXRsZT17dGhpcy5wcm9wcy5leGFtcGxlVGl0bGV9Lz5cblx0XHRcdFx0XHRcdFx0Ki99XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdyb3cgYm90dG9tLXJvdyB0ZW1wbGF0ZS10aWxlJz5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPSdjb2x1bW5zIGZvdXIgZnVsbC1oZWlnaHQnPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9J3JvdyB0b3Atcm93IHRlbXBsYXRlLXRpbGUnPlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT0ncm93IGJvdHRvbS1yb3cgdGVtcGxhdGUtdGlsZSc+XG5cdFx0XHRcdFx0XHRcdHsvKlxuXHRcdFx0XHRcdFx0XHQ8aDI+SW1wb3J0ZWQgY29tcG9uZW50OjwvaDI+XG5cdFx0XHRcdFx0XHRcdDxMZWdlbmQgZGF0YT17dGhpcy5wcm9wcy5sZWdlbmREYXRhfS8+XG5cdFx0XHRcdFx0XHRcdCovfVxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblxuXHR9XG5cbn1cblxuLy8gcHJvcGVydHkgdmFsaWRhdGlvblxuQXBwLnByb3BUeXBlcyA9IHtcblxuXHQvKlxuXHRsZWdlbmREYXRhOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LFxuXHRleGFtcGxlVGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cdCovXG5cbn07XG5cbi8vIHByb3BlcnR5IGRlZmF1bHRzXG4vLyAoaW5zdGVhZCBvZiBFUzUtc3R5bGUgZ2V0RGVmYXVsdFByb3BzKVxuQXBwLmRlZmF1bHRQcm9wcyA9IHtcblxuXHQvKlxuXHRsZWdlbmREYXRhOiB7XG5cdFx0aXRlbXM6IFtcblx0XHRcdCduYXJyYXRpdmVzJyxcblx0XHRcdCdjb3R0b24nLFxuXHRcdFx0J3N1Z2FyJ1xuXHRcdF0sXG5cdFx0aW5pdGlhbFNlbGVjdGlvbjogJ25hcnJhdGl2ZXMnXG5cdH0sXG5cblx0ZXhhbXBsZVRpdGxlOiAnRXhhbXBsZSBDb21wb25lbnQnXG5cdCovXG5cbn07XG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwLmpzeCc7XG5cblJlYWN0LnJlbmRlcig8QXBwLz4sIGRvY3VtZW50LmJvZHkpO1xuIl19
