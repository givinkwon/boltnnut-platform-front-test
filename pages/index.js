import React from "react";
import Head from "next/head";
import Router from "next/router";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import Footer from "components/Footer";
import Spinner from "components/Spinner";
// test
import HomeConatiner from "containers/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toJS } from "mobx";

const logo_ic = "/static/images/components/MobileNav/MobileLogo.svg";
const AD = "/static/images/Home/AD.svg";
const ADback = "/static/images/Home/ADback.png";
const ADbackground = "/static/images/Home/ADbackground.svg";

import * as AccountAPI from "axios/Account/Account";


@inject("Home", "Loading", "Auth", "Category")
@observer
class Home extends React.Component {

  state = {
    width: null,
    home_index: 1,
  };

  // 새로고침 방지
  _handleKeyDown = (event) => {
    switch( event.keyCode ) {
        case 116:
            event.preventDefault();
            break;
        default: 
            break;
    }
  };

  async componentDidMount() {

    this.props.Loading.setOpen(true);

    this.props.Auth.home_index = 0;
    console.log("home didmount");
    this.props.Auth.previous_url = "";

    // 새로고침 방지
    document.addEventListener("keydown", this._handleKeyDown);

    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
    setTimeout(() => {
      this.props.Loading.setOpen(false);
    }, 1000);

    await this.props.Auth.checkLogin();
    console.log("배포 테스트");

    
    // 페이지 저장
    const formData = new FormData();
    
    const { history } = this.props;
    console.log(history, history.length, history[history.length-2])
    console.log(document.referrer)

    // document.referrer은 next.js 페이지 내부에서의 이동이 안잡힘
    // 페이지 내에 이동이 있는 경우 => 신규가 아님
    if(history.length > 1){
      formData.append("prevUrl", window.location.href + history[history.length-2])
    }
    else {
      document.referrer === ""
        ? formData.append("prevUrl", "direct")
        : formData.append("prevUrl", document.referrer);
    }

    formData.append("url", window.location.href);
    const req = {
      data: formData,
    };

    // 방문자 트래픽 기록
    AccountAPI.setUserIP(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    
    // 전체 이동 기록
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
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  
  render() {
    const { Loading, Home } = this.props;
    const { width, home_index } = this.state;

    return (
      <>
        <Head>
          {/* SEO */}
          <meta
            name="description"
            content="제품군별 제조 전문가 큐레이션 플랫폼 볼트앤너트. 믿음직한 제품 개발업체를 만나는 가장 쉬운 방법! 시제품부터 생활용품까지 모두 OK!"
          />
          <meta
            name="keywords"
            content="제조, 제조업, 제조업체, 제조회사, 제품개발, 외주용역, 제조업체찾기, 제품제작, ODM, 제품제조, OEM, 개발구매, 부품구매, 구매부서, 시제품제작, 금형, 설계, 기구설계, 회로설계, 양산, 생산, 공장, MOQ, 발주, 의뢰, 납기, 품질, 견적, 공장찾기, 제조공장, 입찰, 금속가공, 실리콘, 사출, 플라스틱, 다이캐스팅, 절곡, 프레스, PCB, SMT, 연구개발, 산업장비 및 부품, 가공, 목업, Mock-up, 자동차용품, 가전/디지털, 기계설계, 설비, 전략구매, 도면, 캐드"
          />
          {/* SEO - open graph*/}
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/static/images/thumbnail.png" />
          <meta
            property="og:title"
            content="볼트앤너트|믿을 수 있는 제조 전문가"
          />
          <meta
            property="og:description"
            content="제품군별 제조 전문가 큐레이션 플랫폼 볼트앤너트. 믿음직한 제품 개발업체를 만나는 가장 쉬운 방법! 시제품부터 생활용품까지 모두 OK!"
          />
          <meta property="og:url" content="https://www.boltnnut.com/" />
          {/* Title */}
          <title>볼트앤너트</title>
        </Head>

        <div onContextMenu={(e) => e.preventDefault()}>
          {Loading.is_open}

          <>
            {width && width < 768 && <MobileNav src={logo_ic} width={width} />}
            {width && width > 767.98 && <Nav width={width} />}
          </>
          {width && width > 768 && (
            <Ad href="https://techfair.kaist.ac.kr/sub0906/view/id/75">
              <div>
                <img src={AD} />
              </div>
            </Ad>
          )}
          <>
            {width && (
              <HomeConatiner width={width} reqList={Home.request_list} /> // 볼트앤너트 메인 페이지
            )}
          </>
          <>{width && <Footer BackgroundColor="#fffw" />}</>
        </div>
      </>
    );
  }
}

export default Home;

const Ad = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #1d2b57;

  > div {
    height: 100%;
    background-image: url(${ADback});
  }
`;
