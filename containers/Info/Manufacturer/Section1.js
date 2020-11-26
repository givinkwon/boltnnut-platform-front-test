
import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";

import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'

const right = "/static/icon/rightInround.png";
const step1 = "/static/icon/info/Manufacturer_step1.png";
const step2 = "/static/icon/info/Manufacturer_step2.png";
const step3 = "/static/icon/info/Manufacturer_step3.png";
const step4 = "/static/icon/info/Manufacturer_step4.png";


class Section1Container extends React.Component {
  state = {
    width: 0,
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const {width } = this.state
     var settings = {
      dots: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode : true,
      initialSlide: 0,
      draggable: true,
      arrows: false,
      centerPadding: "38px",
      variableWidth: true,

      beforeChange: (current) => {
        this.setState({current: current})
      },
    };
    return (
        <CustomContainer>
            <Container>
              <Header>서비스 이용단계</Header>
              { width > 767.98 ? (
                <>
                <ItemBox>
                  <Item>
                    <Itemheader>
                        <Text.FontSize30>STEP 1</Text.FontSize30>
                    </Itemheader>
                    <Step src={step1}></Step>
                    <Text.FontSize26>가견적 의뢰</Text.FontSize26>
                    <Text.FontSize20>희망 예산, 기간 등 문의하실 제품의 정보를 입력해주세요</Text.FontSize20>
                  </Item>
                  <Image src={right}></Image>
                  <Item>
                    <Itemheader>
                        <Text.FontSize30>STEP 2</Text.FontSize30>
                    </Itemheader>
                    <Step src={step2}></Step>
                    <Text.FontSize26>컨설턴트 상담</Text.FontSize26>
                    <Text.FontSize20>1000 건 이상의 프로젝트 데이터를 바탕으로 전문 개발사를 매칭해드립니다</Text.FontSize20>
                  </Item>
                  <Image src={right}></Image>
                  <Item>
                    <Itemheader>
                        <Text.FontSize30>STEP 3</Text.FontSize30>
                    </Itemheader>
                    <Step src={step3}></Step>
                    <Text.FontSize26>개발사 정보/가견적 전달</Text.FontSize26>
                    <Text.FontSize20>매칭된 전문 개발사의 정보와 가견적을 전달해드립니다</Text.FontSize20>
                  </Item>
                  <Image src={right}></Image>
                  <Item>
                    <Itemheader>
                        <Text.FontSize30>STEP 4</Text.FontSize30>
                    </Itemheader>
                    <Step src={step4}></Step>
                    <Text.FontSize26>미팅 주선</Text.FontSize26>
                    <Text.FontSize20>원하시는 조건의 전문개발사와 3자미팅을 주선해드립니다</Text.FontSize20>
                  </Item>
                </ItemBox>
                </>
              ) : (
                <>
                <List>
                  <Slider {...settings}>
                      <Item>
                        <Itemheader>
                            <Text.FontSize30>STEP 1</Text.FontSize30>
                        </Itemheader>
                        <Step src={step1}></Step>
                        <Text.FontSize26>가견적 의뢰</Text.FontSize26>
                        <TextContainer>
                          <Text.FontSize20>희망 예산, 기간 등 문의하실 제품의 정보를 입력해주세요</Text.FontSize20>
                        </TextContainer>
                      </Item>
                      <Image src={right}></Image>
                      <Item>
                        <Itemheader>
                            <Text.FontSize30>STEP 2</Text.FontSize30>
                        </Itemheader>
                        <Step src={step2}></Step>
                        <Text.FontSize26>컨설턴트 상담</Text.FontSize26>
                        <TextContainer>
                          <Text.FontSize20>1000 건 이상의 프로젝트 데이터를 바탕으로 전문 개발사를 매칭해드립니다</Text.FontSize20>
                        </TextContainer>
                      </Item>
                      <Image src={right}></Image>
                      <Item>
                        <Itemheader>
                            <Text.FontSize30>STEP 3</Text.FontSize30>
                        </Itemheader>
                        <Step src={step3}></Step>
                        <Text.FontSize26>개발사 정보/가견적 전달</Text.FontSize26>
                        <TextContainer>
                          <Text.FontSize20>매칭된 전문 개발사의 정보와 가견적을 전달해드립니다</Text.FontSize20>
                        </TextContainer>

                      </Item>
                      <Image src={right}></Image>
                      <Item>
                        <Itemheader>
                            <Text.FontSize30>STEP 4</Text.FontSize30>
                        </Itemheader>
                        <Step src={step4}></Step>
                        <Text.FontSize26>미팅 주선</Text.FontSize26>
                        <TextContainer>
                          <Text.FontSize20>원하시는 조건의 전문개발사와 3자미팅을 주선해드립니다</Text.FontSize20>
                        </TextContainer>
                      </Item>
                  </Slider>
                </List>
                </>
              )}

            </Container>
        </CustomContainer>
    );
  }
}

export default Section1Container;
const TextContainer = styled.div`
  > p {
    text-align :center;
  }
  @media (min-width: 0px) and (max-width: 359.98px) {
    max-width : 136px;
    padding: 0px 22px;
    > p {
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.6;
      letter-spacing: -0.25px;
      text-align: center;
      color: #191919;
    }
  }
  @media (min-width: 360px) and (max-width: 767.98px) {
    max-width : 200px;
    padding: 0px 22px;
    padding-bottom : 15px;
    > p {
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.6;
      letter-spacing: -0.25px;
      text-align: center;
      color: #191919;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`


const List = styled.div`
  @media (min-width: 0px) and (max-width: 359.98px) {
    padding-top: 16px;
    padding-bottom : 40px;
    .slick-list {
      /* width: 100%; */
    }
    .slick-track {
      width : max-content !important;
    }
  }
  @media (min-width: 360px) and (max-width: 767.98px) {
    padding-top: 16px;
    padding-bottom : 40px;
    .slick-list {
      /* width: 100%; */
    }
    .slick-track {
      width : max-content !important;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  padding-bottom : 150px;
  background-color: #f5f7f7;
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

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 20px !important;
    margin: 200px 30px 0px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 30px;
    margin: 200px 30px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 30px;
    margin : 0px 1.27%;
  }
  @media (min-width: 1300px) {
    width: 42px;
    margin : 0px 1.27%;
  }
`;
const Step = styled.img`

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin : 58px auto 46px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 131px;
    margin-top : 80px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 131px;
    margin-top : 80px;
  }
  @media (min-width: 1300px) {
    margin-top : 54px;
  }
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
    margin-top:110px;
    padding-top: 80px;
    padding-bottom: 60px;
    font-size: 24px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top:110px;
    padding-top: 80px;
    padding-bottom: 60px;
    font-size: 24px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top:110px;
    padding-top: 80px;
    padding-bottom: 60px;
  }
  @media (min-width: 1300px) {
    margin-top:110px;
    padding-top: 80px;
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
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
    >div:nth-of-type(1) {
      margin-left : 3%
    }
    >div:nth-of-type(4) {
      margin-right : 3%
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
    >div:nth-of-type(1) {
      margin-left : 5.7%
    }
    >div:nth-of-type(4) {
      margin-right : 5.7%
    }
  }
  @media (min-width: 1300px) {
    width: 100%;
    > p {
      margin-top: 20px;
    }
    >div:nth-of-type(1) {
      margin-left : 5.7%
    }
    >div:nth-of-type(4) {
      margin-right : 5.7%
    }
  }
`
const Item = styled.div`

  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 10px;
  /* border: ; */
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  overflow: hidden;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    height : 100%;
    flex-direction: column;
    > p {
      font-size: 16px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 0.81;
      letter-spacing: -0.4px;
      color: #191919;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
    > p:nth-of-type(1) {
      margin-top : 46px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.31;
      letter-spacing: -0.65px;
    }
    > p:nth-of-type(2) {
      margin-top : 10px;
      margin-bottom : 9% ;
      margin-left: 15.6%;
      margin-right: 15.6%;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.65;
      letter-spacing: -0.5px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
    height : 525px;
    > p:nth-of-type(1) {
      margin-top : 46px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.31;
      letter-spacing: -0.65px;
    }
    > p:nth-of-type(2) {
      margin-top : 10px;
      margin-bottom : 9% ;
      margin-left: 15.6%;
      margin-right: 15.6%;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.65;
      letter-spacing: -0.5px;
    }
  }

  @media (min-width: 1300px) {
    width: 100%;
    height : 525px;
    > p:nth-of-type(1) {
    margin-top : 46px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: -0.65px;
  }
  > p:nth-of-type(2) {
    margin-top : 10px;
    margin-bottom : 9% ;
    margin-left: 15.6%;
    margin-right: 15.6%;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.65;
    letter-spacing: -0.5px;
  }
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
