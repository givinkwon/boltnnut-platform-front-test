import React from "react";
import styled from 'styled-components';
import Router from 'next/router';

const Map = '/static/images/Info/Mobile/MobileMap.svg';
const Banner2Img = '/static/images/Info/Mobile/MobileBanner2Img.png';
const Banner3Img = '/static/images/Info/Mobile/MobileBanner3Img.png';
const Banner1Img = '/static/images/Info/Mobile/MobileBanner1Img.png';
const Banner1Img2 = '/static/images/Info/Mobile/MobileBanner1Img2.png';

class MobileInfoContainer extends React.Component {
  render() {
    return(
        <Background>
          <Header>
            온라인 맞춤 제조 플랫폼,<br/>
            <span>볼트앤너트</span>
          </Header>
          <img src={ Map }/>
          <SubHeader>
            전세계 5000개 네트워크를 통해 가전/생활용품, <br/>
            산업 기계 및 장비, 개발 부품 발주까지 <br/>
            빠르고 합리적 견적에 발주를 도와드립니다.
          </SubHeader>
          <ContentBox>
            <p>AI 자동 견적 서비스</p>
            <ImgContainer style={{marginBottom:50}}>
              <img src={Banner1Img}/>
              <img style={{position:'absolute', marginLeft: 112, marginTop:94}} src={Banner1Img2}/>
            </ImgContainer>
            <span>
            5944개의 프로젝트 데이터를 학습한 볼트앤너트 <br/>
            알고리즘은 요구되는 제품의 품질과 난이도에 <br/>
            따라 최적 견적을 도출하고 그에 따라 전문가를 <br/>
            자동 매칭합니다. 그를 통해 합리적인 견적으로 <br/>
            성공적 발주를 할 수 있도록 돕습니다.
          </span>
            <div onClick={() => Router.push("/request")}>
              지금 무료로 가견적 받기
            </div>
          </ContentBox>
          <ContentBox>
            <p>전문적인 프로젝트 관리</p>
            <img src={Banner2Img}/>
            <span>
            최대 40년 경력의 볼트앤너트 컨설턴트들이 발주 도면의 <br/>
            생산성을 감리하고, 발주된 의뢰의 시작부터 납품까지 <br/>
            검수함으로써 개발/생산품의 품질을 보장합니다.
          </span>
            <div onClick={() => Router.push("/request")}>
              1:1 컨설팅 받기
            </div>
          </ContentBox>
          <ContentBox>
            <p>확실한 납기</p>
            <img src={Banner3Img}/>
            <span style={{marginBottom:80}}>
            모든 개발/생산 프로젝트를 볼트앤너트 Management<br/>
            프로세스를 통해 관리 및 감독하여 Delay issue를<br/>
            선제적으로 차단하고, Misleading Task를 최소화하여 <br/>
            확실한 납기를 보장합니다.
          </span>
          </ContentBox>
        </Background>
    );
  }
}

export default MobileInfoContainer;

const Background = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`
const Header = styled.div`
  width: 216px;
  height: 65px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 22px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0;.55px;
  text-align: center;
  color: #282c36;
  margin: 108px 0px 30px 0px;
  > span {
    font-weight: 700;
  }
`
const SubHeader = styled.div`
  width: 286px;
  height: 70px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.38px;
  text-align: center;
  color: #414550;
  margin-top: 20px;
  margin-bottom: 140px;
`
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    height: 33px;
    font-family: NotoSansCJKkr;
    font-size: 22px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.45;
    letter-spacing: -0.55px;
    text-align: center;
    color: #000000;
    margin-bottom: 30px;
  }
  > span {
    font-family: NotoSansCJKkr;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.38px;
    text-align: center;
    color: #414550;
    margin: 24px 0px 26px 0px;
  }
  > div {
    background-color: #0933b3;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 202px;
    height: 50px;
    border-radius: 46px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    font-family: NotoSansCJKkr;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.27;
    letter-spacing: -0.38px;
    text-align: left;
    color: #ffffff;
    margin-bottom: 140px;
  }
`
const ImgContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 318px;
`
