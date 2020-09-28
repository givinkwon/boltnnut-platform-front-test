import React from 'react'
import Head from 'next/head'
import Router from 'next/router'

import Nav from 'components/Nav'
import Footer from 'components/Footer'

import MagazineDetailConatiner from 'containers/Magazine/Detail'
import {inject, observer} from "mobx-react";

@inject('Magazine')
@observer
class Index extends React.Component {
  static getInitialProps({query}) {
    return {query}
  }

  componentDidMount() {
    const {Magazine, query} = this.props;
    Magazine.getMagazineDetail(query.id);
  }

  render(){
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <MagazineDetailConatiner/>
        <Footer/>
      </div>
    )
  }
}

export default Index
