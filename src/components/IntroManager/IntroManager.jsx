import { introJs } from 'intro.js';
import React, { PropTypes } from 'react';

// TODO: either pass this into the component from the host application (add to panorama-template),
// or set up an AppDispatcher shared across all @panorama/toolkit components.
// import { AppActions } from '../../utils/AppActionCreator';

// import './style.scss';

export default class IntroManager extends React.Component {

  static propTypes = {
    open: PropTypes.bool,
    step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    steps: PropTypes.arrayOf(PropTypes.shape({
        'element': PropTypes.string,
        'intro': PropTypes.string,
        'position': (props, propName, componentName) => {
          console.log(">>>>> props:", props, "propName:", propName);
          if (!/top|right|bottom|left/.test(props[propName])) {
            return new Error('`position` must be one of \'top\', \'right\', \'bottom\', or \'left\'.');
          }
        }
      })).isRequired,
    config: PropTypes.object
  }

  static defaultProps = {
    open: false,
    step: 0,
    steps: [],
    config: {
      'showStepNumbers': false,
      'skipLabel': '×',
      'nextLabel': '⟩',
      'prevLabel': '⟨',
      'doneLabel': '×'
    }
  }

  constructor (props) {

    super(props);

    // manually bind event handlers,
    // since React ES6 doesn't do this automatically
    // this.onItemClick = this.onItemClick.bind(this);
    
    this.intro = introJs(document.querySelector("body"));


    // // events
    // var that = this;
    // this.intro.onchange(function(e) {
    //   var step = that.intro._currentStep;
    //   console.log("INTRO: CHANGE - STEP: ", step);
    // });

    // this.intro.onexit(function(){
    //   that.state = false;
    // });


  }

  componentWillMount () {

    //

  }

  componentDidMount () {

    //

  }

  componentWillUnmount () {

    //

  }

  componentDidUpdate (prevProps, prevState) {

    if (this.props.open) {

      let options = {
        steps: this.props.steps
      };
      options = Object.assign(options, this.props.config);

      this.intro.setOptions(options);
      this.intro.refresh();

      if (this.props.step) {
        if (!prevProps.open) {
          this.intro.goToStep(this.props.step).start().nextStep();
        } else {
          this.intro.goToStep(this.props.step).start();
        }
      } else {
        this.intro.start();
      }

    } else {

      this.intro.exit();

    }

  }

  getDefaultState () {

    return {};

  }

  render () {

    return (
      <div className='panorama intro-manager'></div>
    );

  }

}
