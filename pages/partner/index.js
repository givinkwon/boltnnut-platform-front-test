import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import PartnerConatiner from 'containers/Partner'

@inject('Counter', 'Post', 'Loading')
@observer
class Partner extends React.Component {
  static getInitialProps({query}) {
    return {query}
  }
  componentDidMount() {
    this.props.Post.getData()
  }
  render(){
    const { Post, Counter, Loading } = this.props
    return (
      <div>
        {Loading.is_open}
        {/* {Loading.is_open && <Spinner/>} */}
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <PartnerConatiner query={this.props.query}/>
        <Footer/>
      </div>
    )
  }
}

export default Partner
