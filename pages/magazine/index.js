import React from 'react'
import Head from 'next/head'

import Nav from 'components/Nav'
import Footer from 'components/Footer'

import MagazineConatiner from 'containers/Magazine'
import {inject, observer} from "mobx-react";

@inject('Magazine')
@observer
class Index extends React.Component {
  componentDidMount() {
    this.props.Magazine.init()
  }

  render(){
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <MagazineConatiner/>
        <Footer/>
      </div>
    )
  }
}

export default Index
