import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import RequestConatiner from 'containers/Request'

@inject('Request')
@observer
class Request extends React.Component {
  static getInitialProps({query}) {
    return {query}
  }
  componentDidMount() {
    this.props.Request.init(this.props.query)
  }
  render(){
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <RequestConatiner/>
        <Footer/>
      </div>
    )
  }
}

export default Request
