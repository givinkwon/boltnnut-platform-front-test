import React, {Component} from 'react'

import BannerContainer from 'Banner'
import TabContainer from './Tab'
import Tab1Container from 'containers/Answer/List/Tab1'
import PartnerDetailContainer from "./PartnerDetail";
import RequestContentContainer from './RequestContent';

class AnswerDetailContainer extends Component {
	state = {
    tab: 2,
  }
  setTab = (val) => {
    this.setState({tab: val})
  }
	render() {
		const {tab} = this.state;

		return (
			<>
				<BannerContainer/>
				<TabContainer tab={tab} setTab={this.setTab}/>

				{
					tab === 1 && <Tab1Container setTab={this.setTab} />
				}
				{
					tab === 2 && <PartnerDetailContainer />
				}
				{/*
					tab === 3 && <RequestContentContainer setTab={this.setTab} />
				*/}
			</>
		)
	}
}

export default AnswerDetailContainer
