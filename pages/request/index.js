import React from 'react'
import Head from 'next/head'
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';

import Nav from 'components/Nav';
import MobileNav from 'components/MobileNav';
import Footer from 'components/Footer';
import Spinner from 'components/Spinner';

import RequestConatiner from 'containers/Request'

@inject('Request', 'Partner','DetailQuestion','ManufactureProcess', 'Schedule')
@observer
class Request extends React.Component {
  state = {
    width: 0,
  }

  componentDidMount() {
    this.props.Partner.init();
    this.props.Request.init();
    this.props.DetailQuestion.init();
    this.props.DetailQuestion.loadSelectFromTitle(1);
    this.props.ManufactureProcess.init();
    
    //창 크기
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth});
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
          {/* SEO */}
          <meta name="description" content="볼트앤너트의 큐레이션 시스템이 최대 1영업일 이내로 제작하고자하는 제품의 가견적을 안내드립니다. 나에게 맞는 업체를 찾고, 적합한 업체로부터 가견적을 받아보세요!" />
          <meta name="keywords" content="제조, 제조업, 제조업체, 제조회사, 제품개발, 외주용역, 제조업체찾기, 제품제작, ODM, 제품제조"/>
          {/* SEO - open graph*/}
          <meta property="og:type" content="website"/>
          <meta property="og:image" content="/static/images/thumbnail.png"/>
          <meta property="og:title" content="의뢰하기|믿을 수 있는 제조 전문가" />
          <meta property="og:description" content="볼트앤너트의 큐레이션 시스템이 최대 1영업일 이내로 제작하고자하는 제품의 가견적을 안내드립니다. 나에게 맞는 업체를 찾고, 적합한 업체로부터 가견적을 받아보세요!"/>
          <meta property="og:url" content="https://www.boltnnut.com/request"/>
          {/* Title */}
          <title>볼트앤너트|의뢰하기</title>
        </Head>
        <>
          { width > 767.98 ? (
            <Nav />
          ) : (
            <MobileNav width={width}/>
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
