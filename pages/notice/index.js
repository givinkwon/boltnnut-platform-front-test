import React from 'react'
import Head from 'next/head'

import Nav from 'components/Nav'
import Footer from 'components/Footer'

import NoticeConatiner from 'containers/Notice'
import {inject, observer} from "mobx-react";

@inject('Notice')
@observer
class Index extends React.Component {
  componentDidMount() {
    this.props.Notice.init()
  }

  render(){
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <NoticeConatiner/>
        <Footer/>
      </div>
    )
  }
}

export default Index
