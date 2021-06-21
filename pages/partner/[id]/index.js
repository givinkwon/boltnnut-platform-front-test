import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import * as PartnerAPI from 'axios/Partner'

// components
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import * as AccountAPI from "axios/Account";

import PartnerDetailConatiner from 'containers/Partner/Detail'


@inject('Partner')
class PartnerDetail extends React.Component {
  state = {
    data : null
  }
  static getInitialProps({query}) {
    return {query}
  }
  componentDidMount() {
    const { id } = this.props.router.query
    PartnerAPI.detail(id)
    .then(res => {
      console.log(res)
      this.props.Partner.detail = res.data
    })
    .catch(e => {
      console.log(e)
      console.log(e.reponse)
    })
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
  render() {
    const { id } = this.props.router.query
    return (
      <div>
        <Head>
          {/* 대표 URL */}
          <link rel="canonical" href="https://www.boltnnut.com/partner"/>
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

          {/* <title>Tirrilee :: {item[0].title}</title>
          <meta property="og:url" content={`https://www.tirrilee.io/news/${item[0].id}`}/>
          <meta property="og:image" content={item[0].thumbnail}/>
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`[${item[0].type}] ${item[0].title}`} />
          <meta property="og:description" content={item[0].content} />
          <meta name="description" content={item[0].content} />
          <link rel="canonical" href={`https://www.tirrilee.io/portfolio/${item[0].id}`} /> */}
        </Head>
        <Nav />
        <PartnerDetailConatiner id={id} />
        <Footer/>
      </div>
    )
  }
}

export default withRouter(PartnerDetail)

