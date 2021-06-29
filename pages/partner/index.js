import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Nav from 'components/Nav'
import MobileNav from 'components/MobileNav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import PartnerConatiner from 'containers/Partner'
import * as AccountAPI from "axios/Account";

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
    // page ip 기록
    const formData = new FormData();

    formData.append("url", window.location.href);
    console.log(window.location.href)
    const req = {
      data: formData,
    };
  
    AccountAPI.setUserPageIP(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    
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
        <Head>

          {/* SEO */}
          <meta name="description" content="원하시는 분야의 전문가를 검색해보세요. 개인맞춤 희망예산과 개발기간까지 총 3,924개의 제조사가 당신을 기다리고 있습니다!" />
          <meta name="keywords" content="제조, 제조업, 제조업체, 제조회사, 제품개발, 외주용역, 제조업체찾기, 제품제작, ODM, 제품제조"/>
          {/* SEO - open graph*/}
          <meta property="og:type" content="website"/>
          <meta property="og:image" content="/static/images/thumbnail.png"/>
          <meta property="og:title" content="파트너|믿을 수 있는 제조 전문가" />
          <meta property="og:description" content="원하시는 분야의 전문가를 검색해보세요. 개인맞춤 희망예산과 개발기간까지 총 3,924개의 제조사가 당신을 기다리고 있습니다!"/>
          <meta property="og:url" content="https://www.boltnnut.com/partner"/>           
          {/* Title */}
          <title>볼트앤너트|파트너</title>
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
