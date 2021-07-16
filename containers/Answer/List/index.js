import React from 'react'
import Head from 'next/head'

import BannerContainer from 'containers/Answer/List/Banner'
import TabContainer from 'Tab'
import Tab1Container from 'Tab1'
import Tab2Container from "Tab2";

class AnswerListConatiner extends React.Component {
  state = {
    tab: 1,
  }
  setTab = (val) => {
    this.setState({tab: val})
  }
  render() {
    const { tab } = this.state

    return (
      <>
        <BannerContainer/>
        <TabContainer tab={tab} setTab={this.setTab}/>

        {
          /* tab이 2일 경우 banner와 footer가 붙어 있는걸 띄움 */
          tab === 1
            ? <Tab1Container/>
            : <div style={{marginBottom: '100px'}} />
        }
        <Tab2Container open={tab === 2} handleClose={() => this.setTab(1)} />
      </>
    )
  }
}

export default AnswerListConatiner
