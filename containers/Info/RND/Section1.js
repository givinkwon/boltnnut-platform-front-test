import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";

import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'

const right = "/static/icon/rightInround.png";
const step1 = "/static/icon/info/Massproduct_step1.png";
const step2 = "/static/icon/info/Massproduct_step2.png";
const step3 = "/static/icon/info/Massproduct_step3.png";
const step4 = "/static/icon/info/Massproduct_step4.png";


class Section1Container extends React.Component {
  render() {
    return (
        <CustomContainer>
            <Container>
              <Header>서비스 이용단계</Header>
              <ItemBox>
                  <Item>
                    <Itemheader>
                        <Text.FontSize30>STEP 1</Text.FontSize30>
                    </Itemheader>
                    <Step1 src={step1}></Step1>
                    <Text.FontSize26>가견적 의뢰</Text.FontSize26>
                    <Text.FontSize20>희망 예산, 기간 등 문의하실 제품의 정보를 입력해주세요</Text.FontSize20>
                  </Item>
                  <Image src={right}></Image>
                  <Item>
                    <Itemheader>
                        <Text.FontSize30>STEP 2</Text.FontSize30>
                    </Itemheader>
                    <Step2 src={step2}></Step2>
                    <Text.FontSize26>컨설턴트 상담</Text.FontSize26>
                    <Text.FontSize20>제조 전문 컨설턴트가 상담을 통해 제품 기획을 고도화하고 적합한 서비스를 안내드립니다</Text.FontSize20>
                  </Item>
                  <Image src={right}></Image>
                  <Item>
                    <Itemheader>
                        <Text.FontSize30>STEP 3</Text.FontSize30>
                    </Itemheader>
                    <Step3 src={step3}></Step3>
                    <Text.FontSize26>견적 및 개발 프로세스 제안</Text.FontSize26>
                    <Text.FontSize20>만들고자 하는 제품의 개발 프로세스가 포함된 견적서를 제안드립니다</Text.FontSize20>
                  </Item>
                  <Image src={right}></Image>
                  <Item>
                    <Itemheader>
                        <Text.FontSize30>STEP 4</Text.FontSize30>
                    </Itemheader>
                    <Step4 src={step4}></Step4>
                    <Text.FontSize26>생산 관리</Text.FontSize26>
                    <Text.FontSize20>만들고자 하는 제품의 개발 프로세스가 포함된 견적서를 제안드립니다.</Text.FontSize20>
                  </Item>
              </ItemBox>
            </Container>
        </CustomContainer>
    );
  }
}

export default Section1Container;
const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  margin-bottom : 150px;
  p {
      text-align : center ;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`
const Itemheader = styled.div`
    background-color : #0933b3 ;
    padding-top : 20px;
    padding-bottom : 20px;
    > p {
      color : #ffffff;
      text-align :center;
      object-fit: contain;
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.23;
      letter-spacing: 0.75px;
    }

`
const Image = styled.img`
  width: 42px;
  margin : 0px 42px;
`;
const Step1 = styled.img`
  width: 131px;
  margin-top : 80px;
`;
const Step2 = styled.img`
  width: 161px;
  margin-top : 70px;
`;
const Step3 = styled.img`
  width: 130px;
  margin-top : 70px;
`;
const Step4 = styled.img`
  width: 135px;
  margin-top : 66px;
`;

const Header = styled.div`
  object-fit: contain;
  font-size: 32px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.41;
  letter-spacing: normal;
  color: #505050;
  margin : auto ;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 50px;
    width: 290px;
    margin-bottom: 20px;
    font-size: 24px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 50px;
    width: 290px;
    margin-bottom: 40px;
    font-size: 24px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 70px;
    margin-bottom: 73px;
  }
  @media (min-width: 1300px) {
    padding-top: 150px;
    padding-bottom: 60px;
  }
`
const ItemBox = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  display: inline-flex;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100%);
    display: flex;
    flex-direction: row;
    align-items: left;
    > p {
      margin-top: 20px;
    }
  }
  @media (min-width: 768px) {
    width: 1770px;
    > p {
      margin-top: 20px;
    }
  }
`
const Item = styled.div`
  width: 100%;
  height : 525px;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 10px;
  /* border: ; */
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  overflow: hidden;
  > p:nth-of-type(1) {
    margin-top : 70px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: -0.65px;
  }
  > p:nth-of-type(2) {
    margin-top : 10px;
    margin-bottom : 80px ;
    margin-left: 15.6%;
    margin-right: 15.6%;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.65;
    letter-spacing: -0.5px;
  }
`




const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  text-align : center;
  align-items: center;
  /* @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 720px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 930px;
  }

  @media (min-width: 1300px) {
    width: 1200px;
  } */
`

