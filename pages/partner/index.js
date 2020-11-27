import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Nav from 'components/Nav'
import MobileNav from 'components/MobileNav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import PartnerConatiner from 'containers/Partner'

@inject('Counter', 'Post', 'Loading')
@observer
class Partner extends React.Component {
  state = {
    width: null,
  }
  static getInitialProps({query}) {
    return {query}
  }
  componentDidMount() {
    this.props.Post.getData()
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
    const { Post, Counter, Loading } = this.props;
    const { width } = this.state;

    return (
      <>
      {width &&
      <div>
        {Loading.is_open}
        {/* {Loading.is_open && <Spinner/>} */}
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <>
        { width > 767.98 ? (
          <Nav />
          ) : (
          <MobileNav width={width}/>
          )
        }
        </>
        <PartnerConatiner query={this.props.query}/>
        <Footer/>
      </div>
      }
      </>
    )
  }
}

export default Partner
