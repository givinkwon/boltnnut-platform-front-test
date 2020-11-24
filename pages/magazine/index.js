import React from 'react'
import Head from 'next/head'

import Nav from 'components/Nav'
import MobileNav from 'components/MobileNav'
import Footer from 'components/Footer'

import MagazineConatiner from 'containers/Magazine'
import {inject, observer} from "mobx-react";

@inject('Magazine')
@observer
class Index extends React.Component {
  state = {
    width: 0,
  }
  componentDidMount() {
    this.props.Magazine.init()
    //창 크기
    // conflict..?
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
        <MagazineConatiner width = {width} length = { this.props.Magazine.magazine_length }/>
        <Footer/>
      </div>
    )
  }
}

export default Index
