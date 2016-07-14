import React, { PropTypes } from 'react';

/**
 * The new (Summer 2016) intro modal.
 * This is distinct from the IntroManager "intro",
 * which acts more like a series of walkthrough overlays.
 */
export default class IntroModal extends React.Component {

	static propTypes = {
		onDismiss: PropTypes.func
	};

	constructor (props) {

		super(props);
		this.dismissIntro = this.dismissIntro.bind(this);
		this.state = this.getDefaultState();

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

		console.log(">>>>> dismissIntro");
		// if (this.props.onDismiss) this.props.onDismiss();

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
						<img src='./static/img/introModalCover.png' />
						<p>The decades between the banning of the international slave trade in 1808 and the abolition of slavery during the Civil War saw the massive and harrowing relocation of approximately 850,000 enslaved men, women, and children. While some enslaved people were moved when their owners relocated to the western frontier, about two-thirds were bought and sold in America's slave market. they were forcibly uprooted from their homes, and separated from their loved ones.</p>
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
								<li><span className='ordinal'>1</span><span className='item'>Select a canal on the timeline to see how trade volume changed over time.<img src='./static/img/introModalStep01.png' /></span></li>
								<li><span className='ordinal'>2</span><span className='item'>Roll over individual commodities to see how much of each was traded.<img src='./static/img/introModalStep02.png' /></span></li>
								<li><span className='ordinal'>3</span><span className='item'>Select a commodity for a description of lesser-known items.<img src='./static/img/introModalStep03.png' /></span></li>
								<li><span className='ordinal'>4</span><span className='item'>Choose a canal from the map to learn more about its trading history.<img src='./static/img/introModalStep04.png' /></span></li>
							</ol>
						</div>
						<p className='map-desc'>This map shows where nearly a million enslaved people were moved from and where they were moved to through the American slave trade.</p>
						<div className='intro-modal-button' onClick={ this.dismissIntro }>Enter</div>
					</div>
				</div>
			);

		}

	}

}
