import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import BannerContainer from 'containers/Project/Banner';
import Router from "next/router";

import Nav from 'components/Nav'
import MobileNav from 'components/MobileNav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import Test from 'containers/Project/test'

const back_ic = "/static/images/components/MobileNav/back_ic.svg";

@inject('Project', 'Loading')
@observer
class Test2 extends React.Component{
  state={
    width:null,
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render(){
    const { Project, Loading } = this.props
    const { width } = this.state;
    const gray = "#f6f6f6"
    return (
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
          <div>
            <MobileNav src={ back_ic } headText={ "프로젝트 관리" } width={width}/>
            <div style={{ height: '65px'}}></div>
          </div> 
          )
        }
        </>
        <div style={{ overflow: 'visible'}}>
        <BannerContainer/>        
        </div>            
        <Test width={width} length = { Project.project_length }/>
        
        <Footer color={gray}/>
      </div>
    )
  }
}

export default Test2;
