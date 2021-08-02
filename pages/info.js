import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import Footer from "components/Footer";
import Spinner from "components/Spinner";

import InfoConatiner from "containers/Manufacture/Chatting/Info2/index";
const back_ic = "/static/images/components/MobileNav/back_ic.svg";

@inject("Loading") // *_app.js <Provider>에 넘겨준 store명과 일치해야함. *inject: 컴포넌트에서 store에 접근 가능하게 함. 해당 store에 있는 값을 컴포넌트의 props로 주입시켜줌.
@observer
class Info extends React.Component {
  state = {
    width: null,
  };
  static getInitialProps({ query }) {
    return { query };
  }
  componentDidMount() {
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const { Post, Counter, Loading } = this.props;
    const { width } = this.state;
    return (
      <>
        {width && (
          <div>
            {Loading.is_open}
            <Head>
              {/* SEO */}
              <meta
                name="description"
                content="제조, 생산, 제작, 가공, 업체, 자동차, 부품, 플라스틱, 금형, 설비, 의료기기, 실리콘, oem, 기계, 시제품, 공장, CNC, led 조명, 드론, pcb, 주물, 포장, 주문 제작, 알루미늄, 로봇, 사출, 리스트, 자동화, 앵글, 다이캐스팅, 용기, 유압 펌프, frp 가격, 고무 오링, 금속, 국내 리스트, 박스, 제품, 압출, 성형, 철물, 밀링, 장비, 레이저, 스테인레스, 철판, 화장품 용기, 진공 펌프, 배관 자재, 방열판, 농막, 센서, 스텐, 압출기, 선반, 발전기, 산업용 드론, 차광막, 지그, 케이스, 디자인, 부품, 밸브, 알미늄, 자판기, 철문, 대문, 유리, 임가공, 대형 사출, 프레스, 함체, 개발, pvc, 유리컵, 아크릴 수지, 도어락, 휀스, 파이프, 용접기, 철공소, 모형, 목업, 판재, 프레임, 컨테이너 농막, 자동, 외함, 맨홀, 철망, 피팅 밸브, 소형 방열판, 창고, 컵홀더, 중장비, 스피커, 고무 매트, 조형물, 팻말, 진공성형, 정밀 가공, 인서트 사출, 황동 가공, QDM, 상자, 3D프린터, 의뢰, 음향 기기, 브로셔, 케이스, 필터, 굿즈, 재단기, 진열대, 임베디드 하드웨어, 타공판, 절곡, 설계, 견적, 보틀, 프로파일, 판넬, 아노다이징, 키오스크, 철 구조물, 스마트 조명, 아크릴 판, 탱크, 지퍼백, 거울, 회로, 스프링, 조립식, 배전반, 산업기계, 공기청정기, 에어컨, 세탁기, 용접기, 전자제품, 캠핑용품, 절삭 가공, 침대, 책상, 가구, 주방용품"
              />
              <meta
                name="keywords"
                content="제조, 생산, 제작, 가공, 업체, 자동차, 부품, 플라스틱, 금형, 설비, 의료기기, 실리콘, oem, 기계, 시제품, 공장, CNC, led 조명, 드론, pcb, 주물, 포장, 주문 제작, 알루미늄, 로봇, 사출, 리스트, 자동화, 앵글, 다이캐스팅, 용기, 유압 펌프, frp 가격, 고무 오링, 금속, 국내 리스트, 박스, 제품, 압출, 성형, 철물, 밀링, 장비, 레이저, 스테인레스, 철판, 화장품 용기, 진공 펌프, 배관 자재, 방열판, 농막, 센서, 스텐, 압출기, 선반, 발전기, 산업용 드론, 차광막, 지그, 케이스, 디자인, 부품, 밸브, 알미늄, 자판기, 철문, 대문, 유리, 임가공, 대형 사출, 프레스, 함체, 개발, pvc, 유리컵, 아크릴 수지, 도어락, 휀스, 파이프, 용접기, 철공소, 모형, 목업, 판재, 프레임, 컨테이너 농막, 자동, 외함, 맨홀, 철망, 피팅 밸브, 소형 방열판, 창고, 컵홀더, 중장비, 스피커, 고무 매트, 조형물, 팻말, 진공성형, 정밀 가공, 인서트 사출, 황동 가공, QDM, 상자, 3D프린터, 의뢰, 음향 기기, 브로셔, 케이스, 필터, 굿즈, 재단기, 진열대, 임베디드 하드웨어, 타공판, 절곡, 설계, 견적, 보틀, 프로파일, 판넬, 아노다이징, 키오스크, 철 구조물, 스마트 조명, 아크릴 판, 탱크, 지퍼백, 거울, 회로, 스프링, 조립식, 배전반, 산업기계, 공기청정기, 에어컨, 세탁기, 용접기, 전자제품, 캠핑용품, 절삭 가공, 침대, 책상, 가구, 주방용품"
              />
              {/* SEO - open graph*/}
              <meta property="og:type" content="website" />
              <meta
                property="og:image"
                content="/static/images/thumbnail.png"
              />
              <meta
                property="og:title"
                content="서비스소개|믿을 수 있는 제조 전문가"
              />
              <meta
                property="og:description"
                content="전문 제조사의 견적을 바로 받아보는 서비스. 양산 비용 최대 40%를 절감하는 제조 패키지. 맞춤 제조견적, MOQ 등 제품 수배 패키지."
              />
              <meta property="og:url" content="https://www.boltnnut.com/info" />
              {/* Title */}
              <title>볼트앤너트|서비스소개</title>
            </Head>
            <Nav />
            <InfoConatiner />
          </div>
        )}
      </>
    );
  }
}

export default Info;
