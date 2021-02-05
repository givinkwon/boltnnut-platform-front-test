import React from "react";
import styled from 'styled-components';
import Router from 'next/router';

const Map = '/static/images/Info/InfoMap.svg';
const Line = '/static/images/Info/Line.svg';
const Line2 = '/static/images/Info/Line2.svg';
const Line3 = '/static/images/Info/Line3.svg';
const Banner1Img = '/static/images/Info/Banner1Img.png';
const Banner1Img2 = '/static/images/Info/Banner1Img2.png';
const Banner2Img = '/static/images/Info/Banner2Img.png';
const Banner3Img = '/static/images/Info/Banner3Img.png';

class InfoContainer extends React.Component {
  render() {
    return (
      <Background>
        <Header>온라인 맞춤 제조 플랫폼, <span>볼트앤너트</span></Header>
        <SubHeader>전세계 5000개 네트워크를 통해 가전/생활용품, 산업 기계 및 장비, 개발 부품 발주까지 <br/>빠르고 합리적 견적에 발주를 도와드립니다.
        </SubHeader>
        <img src={ Map }/>
        <img style={{marginLeft: 290}} src={ Line }/>
        <Banner1>
          <Textbox>
            <p style={{marginTop:76}}>AI 자동 견적 서비스</p>
            <span>
              5944개의 프로젝트 데이터를 학습한 볼트앤너트 알고리즘은<br/>
              요구되는 제품의 품질과 난이도에 따라 최적 견적을 도출하고<br/>
              그에 따라 전문가를 자동 매칭합니다. <br/>
              그를 통해 합리적인 견적으로 성공적 발주를 할 수 있도록 돕습니다.
            </span>
            <div onClick={() => Router.push("/request")} style={{marginBottom:24}}>
              지금 무료 가견적 받기
            </div>
          </Textbox>
          <ImgContainer>
            <img style={{position: 'absolute'}} src={Banner1Img}/>
            <img style={{position: 'absolute', top:204, left:235}} src={Banner1Img2}/>
          </ImgContainer>
        </Banner1>
        <img src={ Line2 }/>
        <Banner1>
          <img style={{width:3588, height:346}} src={ Banner2Img }/>
          <Textbox style={{marginLeft: 126}}>
            <p style={{marginTop:3, marginBottom:32, height:59}}>전문적인 프로젝트 관리</p>
            <span>
              최대 40년 경력의 볼트앤너트 컨설턴트들이 발주 도면의 <br/>
              생산성을 감리하고, 발주된 의뢰의 시작부터 납품까지 <br/>
              검수함으로써 개발/생산품의 품질을 보장합니다.
            </span>
            <div onClick={() => Router.push("/request")}>1:1 컨설팅 받기</div>
          </Textbox>
        </Banner1>
        <img src={ Line3 }/>
        <Banner1>
          <Textbox>
            <p style={{height:59}}>확실한 납기</p>
            <span>
              모든 개발/생산 프로젝트를 볼트앤너트 9/14 Management<br/>
              프로세스를 통해 관리 및 감독하여 Delay issue를 <br/>
              선제적으로 차단하고, Misleading Task를 최소화하여 <br/>
              확실한 납기를 보장합니다.
            </span>
          </Textbox>
          <ImgContainer style={{marginBottom:310}}>
            <img src={ Banner3Img }/>
          </ImgContainer>
        </Banner1>
      </Background>
    );
  }
}

export default InfoContainer;

const Background = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`
const Header = styled.div`
  width: 814px;
  height: 83px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 56px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.64;
  letter-spacing: -1.4px;
  text-align: center;
  color: #282c36;
  margin: 240px 0px 18px 0px;
  > span {
    font-weight: 700;
  }
`
const SubHeader = styled.div`
  width: 882px;
  height: 78px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 26px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.54;
  letter-spacing: -0.65px;
  text-align: center;
  color: #555963;
  margin-bottom: 50px;
`
const Banner1 = styled.div`
  display: flex;
  flex-direction: row;
  width: 1221px;
`
const Textbox = styled.div`
  display: flex;
  flex-direction: column;
  > p {
    object-fit: contain;
    font-family: NotoSansCJKkr;
    font-size: 40px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -1px;
    color: #282c36;
    margin-bottom: 32px;
  }
  > span {
    width: 630px;
    object-fit: contain;
    font-family: NotoSansCJKkr;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.6px;
    text-align: left;
    color: #555963;
    line-height: 1.67;
  }
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 304px;
    height: 64px;
    border-radius: 46px;
    box-shadow: 2px 3px 6px 0 rgba(0, 0, 0, 0.4);
    font-family: NotoSansCJKkr;
    font-size: 23px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.58px;
    text-align: left;
    color: white;
    background-color: #0933b3;
    margin-top: 72px;
  }
`
const ImgContainer = styled.div`
  position: relative;
`
