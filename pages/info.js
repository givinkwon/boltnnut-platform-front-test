import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import Footer from "components/Footer";
import Spinner from "components/Spinner";

import InfoConatiner from "containers/Info2/index";
import MobileInfoContainer from "containers/Info2/MobileIndex";
const back_ic = "/static/images/components/MobileNav/back_ic.svg";

@inject("Counter", "Post", "Loading") // *_app.js <Provider>에 넘겨준 store명과 일치해야함. *inject: 컴포넌트에서 store에 접근 가능하게 함. 해당 store에 있는 값을 컴포넌트의 props로 주입시켜줌.
@observer
class Info extends React.Component {
  state = {
    width: null,
  }
  static getInitialProps({ query }) {
    return { query };
  }
  componentDidMount() {
    this.props.Post.getData();
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
  render() {
    const { Post, Counter, Loading } = this.props;
    const { width } = this.state;
    return (
      <>
      {width &&
      <div>
        {Loading.is_open}
        <Head>

          {/* SEO */}
          <meta name="description" content="전문 제조사의 견적을 바로 받아보는 서비스. 양산 비용 최대 40%를 절감하는 제조 패키지. 맞춤 제조견적, MOQ 등 제품 수배 패키지." />
          <meta name="keywords" content="제조, 제조업, 제조업체, 제조회사, 제품개발, 외주용역, 제조업체찾기, 제품제작, ODM, 제품제조"/>
          {/* SEO - open graph*/}
          <meta property="og:type" content="website"/>
          <meta property="og:image" content="/static/images/thumbnail.png"/>
          <meta property="og:title" content="서비스소개|믿을 수 있는 제조 전문가" />
          <meta property="og:description" content="전문 제조사의 견적을 바로 받아보는 서비스. 양산 비용 최대 40%를 절감하는 제조 패키지. 맞춤 제조견적, MOQ 등 제품 수배 패키지."/>
          <meta property="og:url" content="https://www.boltnnut.com/info"/>
          {/* Title */}
          <title>볼트앤너트|서비스소개</title>
        </Head>
        {/* <>
        { width > 767.98 ? (
          <Nav />
          ) : (
          <MobileNav src={ back_ic } headText={ "회사 소개" }/>
          )
        }
        </> */}
        <Nav />
        <InfoConatiner/>
        {/* { width > 767.98 ? (
          <InfoConatiner/>
        ) : (
          <MobileInfoContainer/>
        )
        } */}
        {/* <Footer /> */}
      </div>
      }
      </>
    );
  }
}

export default Info;
