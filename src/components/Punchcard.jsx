/*
 * TODO: Move this into @panorama/toolkit.
 */
import * as React from 'react';
import CommodityStore from '../stores/CommodityStore';
import { AppActionTypes } from '../utils/AppActionCreator';

export default class Punchcard extends React.Component {

	// property validation
	static propTypes = {

		// title: React.PropTypes.string

	};

	// property defaults (ES7-style React)
	// (instead of ES5-style getDefaultProps)
	static defaultProps = {

		//
		
	};

	constructor () {

		super();

		// set up initial state (instead of ES5-style getInitialState)
		// this.state = 

		// bind handlers to this component instance,
		// since React no longer does this automatically when using ES6
		// this.onThingClicked = this.onThingClicked.bind(this);
		this.storeChanged = this.storeChanged.bind(this);

	}

	componentWillMount () {

		//

	}

	componentDidMount () {

		CommodityStore.addListener(AppActionTypes.storeChanged, this.storeChanged);

		// TODO: pass in selected date and canal via props
		// this.props.date = 
		// this.props.canal = 

	}

	componentWillUnmount () {

		CommodityStore.removeListener(AppActionTypes.storeChanged, this.storeChanged);

	}

	componentDidUpdate () {

		//

	}

	render () {

		let dummyText1 = "<p>She'll be right mate with mad as a sickie. You little ripper bog standard when as dry as a mokkies. As cross as a mokkies trent from punchy no-hoper. Get a dog up ya shit house flamin built like a squizz. Mad as a bundy to it'll be mozzie. </p><p>She'll be right flanno where you little ripper bail up. Lets get some drongo also it'll be throw-down.  brumby when you little ripper ford. It'll be gone walkabout flamin trent from punchy fossicker. Stands out like a snag no dramas shazza got us some bloody oath!. Trent from punchy blowie no worries built like a roo bar.  lurk also grab us a bottle-o. </p><p>Built like a veg out also  khe sanh. Shazza got us some fremantle doctor when as busy as a yobbo. Trent from punchy dag my as busy as a tucker. Get a dog up ya bikkie mate we're going hottie. As cross as a icy pole  you little ripper dinky-di. She'll be right cobber where you little ripper bradman. </p><p>As busy as a two pot screamer how gutful of booze bus. Grab us a waggin' school also get a dog up ya roo. As busy as a fremantle doctor no worries she'll be right butcher. He hasn't got a holy dooley!  stands out like a galah. Flat out like a sanger  as cunning as a vb. Stands out like a trackies to she'll be right roo. </p>" +
			"<p>As stands out like dead horse no dramas stands out like a jackaroo. We're going cut lunch commando piece of piss as busy as a pav. Get a dog up ya tucker when as stands out like apples. Get a dog up ya ute piece of piss lets get some veg out. Lets get some good onya with as cunning as a stoked. Lets throw a stubby holder flamin he's got a massive sickie. </p><p>Lets get some kero how mad as a jumbuck. Flat out like a dog's balls with stands out like a boil-over. Mad as a kelpie how built like a smokes. As cross as a esky also as dry as a slacker. Lets throw a bush telly bloody  fair dinkum. Gutful of decent nik flamin built like a barbie. He hasn't got a bathers how he hasn't got a spewin'. </p><p>Built like a no-hoper no dramas as dry as a kero. Trent from punchy sunnies  he's got a massive jillaroo. Flat out like a shit house my as busy as a compo. As cunning as a flanno my  spewin'. Built like a offsider bloody she'll be right ya. You little ripper cut lunch commando where as cunning as a rotten. She'll be right dead dingo's donger piece of piss flat out like a cark it. Mad as a jillaroo no dramas she'll be right jug. He's got a massive spit the dummy with he's got a massive ripper. </p><p>We're going billabong flamin he's got a massive sickie. She'll be right flanno no worries she'll be right bodgy. Flat out like a bogged  you little ripper prezzy. Gutful of avos also you little ripper blowie. As cunning as a cracker when trent from punchy drongo. Grab us a bail up when trent from punchy struth. Get a dog up ya ironman heaps as busy as a lizard drinking. She'll be right trackie dacks how as cross as a cut lunch. Shazza got us some roo bar no worries come a vinnie's. </p>" +
			"<p>Grab us a pozzy bloody mad as a brass razoo. Lets throw a deadset mate she'll be right chewie. You little ripper milk bar as stands out like arvo. Lets throw a deadset with trent from punchy bikkie. You little ripper ute when as stands out like chunder. </p><p>She'll be right dag where grab us a bloke. As cross as a good onya how lets throw a perve. Come a big smoke piece of piss it'll be dipstick. As cross as a bail up also gutful of aussie salute. He hasn't got a bingle also mad as a vee dub. She'll be right bizzo where she'll be right stubby holder. As busy as a spag bol heaps flat out like a brick sh*t house. Grab us a mongrel mate as busy as a brumby. You little ripper rort flamin we're going grog. As cross as a rip snorter where mad as a dead dingo's donger. He's got a massive sheila where lets get some pav. </p><p>Built like a brick sh*t house how shazza got us some banana bender. Gutful of bradman also she'll be right coldie. Mad as a dinky-di my you little ripper ugg. Get a dog up ya chrissie to as stands out like dill. Gutful of battler when flat out like a sheila. Grab us a jumbuck heaps flat out like a crook. She'll be right relo also it'll be vinnie's. </p><p>It'll be ambo flamin she'll be right dinky-di. Shazza got us some dipstick flamin trent from punchy g'day.  divvy van no worries shazza got us some roo. As stands out like back of bourke my you little ripper big smoke. She'll be right bounce  she'll be right brekkie. Gutful of pint to as cross as a top end. </p>",

		    dummyText2 = "<p>Interpreter' referring to the public as provided herein, then Licensee hereby agrees to be updated versions of the original version of this Agreement; and b) in the Program: Copyright (C) 1996, 1999 International Business Machines Corporation ('IBM'), the Original Code; or 3) for infringements caused by: i) third party for commercial or non-commercial purposes and in strict compliance at all times with Apple's third party against the other Contributors related to Product X, those performance claims and warranties are such Commercial Contributor's responsibility alone. Under this section, the Commercial Contributor in writing to pay any damages as a component of the outstanding shares or beneficial ownership of fifty dollars ($50.00). Trademarks. This License provides that: 1. You may otherwise modify the LEGAL file described in Exhibit A, which is intellectual property claims, to do the following: a) cause the direction or management of such Contributor, if any, must include a prominent notice, in the future. Contributor for any version of the Work be passed to you, then this takes effect immediately upon announcement.</p>" +
			"<p>If the Work or out of any later version published by Sun. No one may use this license, place in each of the Original Code or another well known, available Covered Code is available under various free culture licenses, consistent with the program. You may also use this license for the Current Maintainer of the Agreement will bring a legal action under this Agreement and any Modifications created by such Contributor. Apple retains all rights, title and non-infringement, and implied warranties of merchantability and fitness for a fee. You may modify your copy of the Program is made available via Electronic Distribution Mechanism is maintained by a Recipient (as defined in FAR 2.101.</p>" +
			"<p>Government software and its documentation for the Covered Code is released as a model for your past or future use of the Modified Version complies with the 'Work' referring to freedom, not price. Our General Public License is held invalid or unenforceable under applicable law, it shall not affect the validity or enforceability of the item itself, though there may be used as a LaTeX work, this could be done, for example, indicating this in the License.) 4. By accepting the Licensed Patents.</p>",
		    selectedText;

		selectedText = this.props.data && this.props.data.test ? dummyText2 : dummyText1;

		return (
			<div className='panorama punchcard'>
				<div className='container'>
					<p>TODO: Punchcard</p>
					{ selectedText }
				</div>
			</div>

		);

	}

	storeChanged () {

		// TODO: setState() here, to trigger a render().
		console.log(">>>>> Punchcard.storeChanged!");
	}

}
