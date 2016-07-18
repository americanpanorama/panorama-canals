import React, { PropTypes } from 'react';

/**
 * The new (Summer 2016) intro modal.
 * This is distinct from the IntroManager "intro",
 * which acts more like a series of walkthrough overlays.
 */
export default class IntroModal extends React.Component {

	static coverImgPath = './static/img/introModalCover.png';
	static propTypes = {
		onDismiss: PropTypes.func
	};

	constructor (props) {

		super(props);

		this.dismissIntro = this.dismissIntro.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.state = this.getDefaultState();

	}

	componentWillMount () {

		let img = new Image(),
			onload = (event) => {
				img.removeEventListener('load', onload);
				this.setState({
					coverImgLoaded: true
				});
			};

		img.addEventListener('load', onload);
		img.src = IntroModal.coverImgPath;

	}

	getDefaultState () {

		return {
			pageIndex: 0
		};

	}

	setPage (pageIndex) {

		pageIndex = Math.max(0, Math.min(pageIndex, 1));
		this.setState({
			pageIndex
		});

	}

	dismissIntro () {

		if (this.props.onDismiss) this.props.onDismiss(this.refs.muteIntroInput.checked);

	}

	handleInputChange () {

		this.refs.muteIntroLabel.classList.toggle('checked', this.refs.muteIntroInput.checked);

	}



	// ============================================================ //
	// Lifecycle
	// ============================================================ //

	render () {

		if (this.state.pageIndex === 0) {

			return (
				<div className='intro-modal'>
					<div className='page p0'>
						<div className='title-block'>
							<h1>CANALS</h1>
							<h3>1820 – 1890</h3>
						</div>
						<img src={ IntroModal.coverImgPath } className={ this.state.coverImgLoaded ? '' : 'loading' } />
						<p>Lorem dim sum Lo mai gai baked barbecue pork bao Egg custard tarts. Popular shumai cha siu bao A creamy mango pudding Chiu-chao fan guo Siu mai Haam sui gau Jiu cai bau Zhaliang Pei guen Lo baak gou. Taro cake Deep fried pumpkin and egg-yolk ball vegetarian crisp spring rolls dried scallop and leek puff deep fried seaweed roll BBQ pork puff. Pan friend pork dumpling Pot sticker water chestnut cake bitter melon beef dumplings turnip cake.</p>
						<div className='intro-modal-button' onClick={ () => this.setPage(1) }>Next</div>
					</div>
				</div>
			);

		} else {

			return (
				<div className='intro-modal'>
					<div className='page p1'>
						<div className='title-block'>
							<h3>how to use</h3>
							<h2>this map</h2>
						</div>
						<div className='content'>
							<ol>
								<li>
									<div className='ordinal'>1</div>
									<div className='item'>
										<p>Select a canal on the timeline to see how trade volume changed over time.</p>
										<img src='./static/img/introModalStep01.png' />
									</div>
								</li>
								<li className='wider'>
									<div className='ordinal'>2</div>
									<div className='item'>
										<p>Roll over individual commodities to see how much of each was traded.</p>
										<img src='./static/img/introModalStep02.png' />
									</div>
								</li>
								<li>
									<div className='ordinal descender'>3</div>
									<div className='item'>
										<p>Select a commodity for a description of lesser-known items.</p>
										<img src='./static/img/introModalStep03.png' />
									</div>
								</li>
								<li className='wider'>
									<div className='ordinal descender'>4</div>
									<div className='item'>
										<p>Choose a canal from the map to learn more about its trading history.</p>
										<img src='./static/img/introModalStep04.png' />
									</div>
								</li>
							</ol>
						</div>
						<p className='map-desc'>Lorem dim sum turnip cake leek dumplings deep fried taro turnover. Cha siu sou Cheong fan pan fried bitter melon beef dumpling mango pudding coconut milk pudding.</p>
						<div className='intro-modal-button' onClick={ this.dismissIntro }>Enter</div>
						<div className='footer'>
							<div onClick={ () => this.setPage(0) }>&lt; back</div>
							<label onChange={ this.handleInputChange } ref='muteIntroLabel'><input type='checkbox' ref='muteIntroInput' />do not show again</label>
						</div>
					</div>
				</div>
			);

		}

	}

}
