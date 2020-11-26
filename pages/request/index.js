import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Nav from 'components/Nav'
import MobileNav from 'components/MobileNav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import RequestConatiner from 'containers/Request'

@inject('Request', 'Partner')
@observer
class Request extends React.Component {
  state = {
    width: 0,
  }
  static getInitialProps({query}) {
    return {query}
  }
  componentDidMount() {
    //this.props.Request.init(this.props.query)
    console.log(this.props.query)
    this.props.Partner.init();
     //창 크기
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render(){
    const { width } = this.state;
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <>
        { width > 450 ? (
          <Nav />
          ) : (
          <MobileNav/>
          )
        }
        </>
        <RequestConatiner/>
        <Footer/>
      </div>
    )
  }
}

export default Request
