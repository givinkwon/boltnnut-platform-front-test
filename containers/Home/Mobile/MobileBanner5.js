import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import * as Title from "components/Title";
import StarRatingComponent from 'react-star-rating-component';
import ReviewCard from 'components/Review';
import ReviewCard2 from 'components/Review';
import * as Content from 'components/Content';
import Fade from 'react-reveal/Fade';

const image1 = "/static/images/Home/Mobile/MobileBanner5/Banner5_img1.png";

class MobileBanner5Container extends React.Component {


  render() {
    return (
      <Background backgroundColor = {"#f6f6f6"}>
        <Fade bottom>
          <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: 100}}>
            <Header>
              계약 이행 보증 서비스
            </Header>
            <Middle>
              7가지 계약 관리 서비스로 <br/> 계약 이행<span class="bold"> 100% 보증</span>
            </Middle>
            <img src={image1} style={{marginTop: 32, marginBottom: 18}}/>
            <Body>
              개발부터 납품까지 전달 프로젝트 매니저가 <br/> 배정되어 계약 이행을 100% 보증합니다.
            </Body>
          </div>
        </Fade>
      </Background>
    );
  }
}

export default MobileBanner5Container;

const Header = styled(Title.FontSize13)`
    font-weight: bold;
    color: #0933b3;
    height: 19px;
  margin-bottom: 3px;
  
`
const Middle = styled(Title.FontSize22)`
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.45;
    letter-spacing: -0.55px;
    text-align: center;
    color: #111111;
    .bold {
        font-weight: bold;
    }
`
const Body = styled(Content.FontSize15)`
    height: 44px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.38px;
    text-align: center;
    color: #555963;
    margin-bottom: 100px;
    font-size: 16px;
`
