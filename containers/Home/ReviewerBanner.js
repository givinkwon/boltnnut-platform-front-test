import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";

import Button from "components/Button";
import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'
import * as AnswerAPI  from 'axios/Answer'

const search_ic = "static/icon/search.png";
const image1 = "/static/images/main/review.png"
// const image1 = "/static/images/main/section4_step1_img.png";
const image2 = "/static/images/main/review2.png";
const image3 = "/static/images/main/section4_step3_img.png";
const image4 = "/static/images/banner2_4.png";

class ReviewBanner extends React.Component {
  state = {
    idx: 0,
    current: 1,
    next: true,
    prev: false,
    width: 0,
    tab: 0,
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
    const { prev, next, idx, width } = this.state
     var settings = {
      dots: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 285/width,
      initialSlide: 0,
      draggable: false,
      arrows: false,
      beforeChange: (current) => {
        this.setState({current: current})
      },
    }
    return (
        <CustomContainer>
            <Container>
              <HeaderBox>
                <Header>볼트앤너트 제품 개선 사례</Header>
              </HeaderBox>
              <>
              { width > 767.98 ? (
              <>
                <Item1>
                  <Image src={image2}/>
                    <TextBox>
                      <div class="Header">
                        경쟁사 제품과의 차별화된 디자인<br/> 볼트앤너트가 도와 드립니다.
                      </div>
                      <div class="Middle">
                        IoT 헬스케어 캣타워
                      </div>
                      <div class="Body">
                        내부 설계와 소프트웨어가 탄탄하게 설계되어 있어도 제품의 겉 표면
                        스타일링이 되어 있지 않으면 제품 퀄리티가 떨어져 보입니다. 디자인 시안
                        부터 고객님과 함께 정하고 원하시는 타겟에 맞춰 디자인을 도와드립니다. <br/><br/>
                        {width > 992 && <span class="HyperLink"> 더 보기 </span>}
                      </div>
                    </TextBox>
                </Item1>
                <Item1>
                  <Image src={image1}/>
                    <TextBox>
                      <div class="Header">
                        어려운 생산 관리 걱정하지 마세요. <br/> 볼트앤너트가 도와 드립니다.
                      </div>
                      <div class="Middle">
                        실리콘 반려동물 샤워기
                      </div>
                      <div class="Body">
                        질병 문제 해결을 위한 반려동물 샤워기 클라이언트의 의견 맞춰서 실리콘  금형양산을 진행하였습니다.
                         R&D 요소를 같이 진행하여 실리콘 분량률을 최소화 하여 예산에 맞춰 양산하였습니다. <br/><br/>
                        {width > 992 && <span class="HyperLink"> 더 보기 </span>}
                      </div>
                    </TextBox>
                </Item1>
              </>  ) : (
              <>
              <List>
              <Slider {...settings}>
                <Item1>
                    <Image src={image2}/>
                    <TextBox>
                      <div class="Header">
                        스타일링으로<br/> 제품 퀄리티를 바꿔보세요.
                      </div>
                      <div class="Middle">
                        IoT 헬스케어 캣타워
                      </div>
                      <div class="Body">
                        내부 설계와 소프트웨어가 탄탄하게 설계되어 있어도 제품의 겉 표면
                        스타일링이 되어 있지 않으면 제품 퀄리티가 떨어져 보입니다. 디자인 시안
                        부터 고객님과 함께 정하고 원하시는 타겟에 맞춰 디자인을 도와드립니다. <br/><br/>
                      </div>
                    </TextBox>
                </Item1>
                <Item1>
                  <Image src={image1}/>
                    <TextBox>
                      <div class="Header">
                        제품을 처음만드시는 분들의 어려운 부분을 채워 드립니다.
                      </div>
                      <div class="Middle">
                        실리콘 반려동물 샤워기
                      </div>
                      <div class="Body">
                        질병 문제 해결을 위한 반려동물 샤워기 클라이언트의 의견 맞춰서 실리콘  금형양산을 진행하였습니다.
                         R&D 요소를 같이 진행하여 실리콘 분량률을 최소화 하여 예산에 맞춰 양산하였습니다. <br/><br/>
                      </div>
                    </TextBox>
                </Item1>
              </Slider>
              </List>
            </>
              )}
            </>
            </Container>
        </CustomContainer>
    );
  }
}

export default ReviewBanner;

const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  height: 1239px;
  background-color: rgba(158, 159, 161, 0.12);
  @media (min-width: 0px) and (max-width: 359.98px) {
    width: calc(100%);
    height: 100%;
    padding: 0;
    background-color: #ffffff;
    margin-bottom: 8px;
  }
  @media (min-width: 360px) and (max-width: 767.98px) {
    height: 100%;
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


const Container = styled.div`
  width: 1200px;
  height: 1239px;
  margin-right: auto;
  margin-left: auto;
  text-align : center;
  align-items: center;
  @media (min-width: 0px) and (max-width: 359.98px) {
    width: calc(100%);
    height: calc(100%);
    padding: 0;
    padding-left: calc(5%);
    margin: 0;
  }
  @media (min-width: 360px) and (max-width: 767.98px) {

    padding-left: calc(5%);
    padding-right: calc(5%);
    margin: 0;
    width: 100%;
    height: 100%;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 720px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 930px;
  }

  @media (min-width: 1300px) {
    width: 1200px;
  }
`

const HeaderBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 0px;
  align-items: baseline;
  :focus {
    outline: none;
  }
  @media (min-width: 0px) and (max-width: 359.98px) {
  padding-left: calc(5%);
  }
  @media (min-width: 360px) and (max-width: 767.98px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`

const Header = styled.div`
  height: 59px;
  margin-bottom: 60px;
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.13;
  letter-spacing: -0.8px;
  color: #505050;
  @media (min-width: 0px) and (max-width: 359.98px) {
    margin-top: 0px;
    width: 290px;
    height: 100%;
    margin-bottom: 0px;
    font-size: 16px;
    font-weight: bold;
    padding-top: 22px;
  }
  @media (min-width: 360px) and (max-width: 767.98px) {
    margin-top: 30px;
    font-size: 16px;
    margin-bottom: 30px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 60px;

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
const TextBox = styled.div`
  margin-left: 45px;
  width: 550px;
  @media (min-width: 0px) and (max-width: 767.98px) {
      width: 100%;
      margin: 0;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 30px;
    margin-right: 30px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
  .Header {
  padding-top: 45px;
  height: 89px;
  object-fit: contain;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.75px;
  text-align: left;
  color: #191919;
  @media (min-width: 0px) and (max-width: 767.97px) {
    width: auto;
    height: 58px;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    padding-top : calc(5%);
    padding-left: calc(6%);
  }
  @media (min-width: 767.98px) and (max-width: 991.98px) {
    font-size : 28px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
  }
  .Middle {
  padding-top: 40px;
  height: 29px;
  object-fit: contain;
  font-size: 22px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: 0.5px;
  text-align: left;
  color: #505050;
  @media (min-width: 0px) and (max-width: 767.97px) {
    height: 24px;
    object-fit: contain;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: -0.4px;
    text-align: left;
    color: #505050;
    padding-top: 0px;
    padding-top : calc(3%);
    padding-left: calc(6%);
  }
  @media (min-width: 768.98px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
  }
  .Body{
  height: 81px;
  margin-top: 20px;
  width: 540px;
  height: 100px;
  object-fit: contain;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.45px;
  text-align: left;
  color: #767676;
  @media (min-width: 0px) and (max-width: 767.97px) {
    width: 217px;
    height: 66px;
    object-fit: contain;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -0.3px;
    text-align: left;
    color: #767676;
    padding-top : calc(1%);
    padding-left: calc(6%);
    margin: 0;
  }
  @media (min-width: 767.98px) and (max-width: 991.98px) {
    width: 100%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
  .HyperLink {
  width: 52px;
  height: 27px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.38px;
  text-align: left;
  color: #0933b3;
  }
  }
`
const Item1 = styled.div`
  width: 1200px;
  height: 391px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  display: inline-flex;
  margin-bottom: 50px;
  > p {
    text-align: left;
  }
  @media (min-width: 0px) and (max-width: 359.98px) {
      width: 272px;
      height: 372px;
      border-radius: 4px;
      box-shadow: 2px 3px 6px 0 rgba(0, 0, 0, 0.16);
      background-color: #ffffff;
      display: block;
      margin: 0;
      margin-bottom: 26px;
  }
  @media (min-width: 360px) and (max-width: 767.98px) {
    width: 100%;
    height: 372px;
  }
  @media (min-width: 767.98px) and (max-width: 991.98px) {
    width: 720px;
    display: inline-flex !important;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 930px;
  }
  @media (min-width: 1300px) {
  }
`
const Image = styled(RatioImage)`
  width: 587px;
  height: 391px;
  object-fit: contain;
  justify-content: left;
  align-items: left;
  border-radius: 10px;
  > div {
    background-repeat: no-repeat;
    height: 100%;
  }
  @media (min-width: 0px) and (max-width: 767.97px) {
     width: calc(100%);
     height: calc(42.6%);
     object-fit: contain;
     border-radius: 4px;
  }
  @media (min-width: 767.98px) and (max-width: 991.98px) {
    height: 100%;
    width: 50%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const ButtonBox = styled.div`
  width: 200px;
  height: 56px;
  opacity: 0.98;
  border-radius: 28px;
  align-items: center;
  background-color: #061953;
  margin-bottom: 67px;
  div:nth-of-type(1) {
    margin-right: 10px;
    width: 100% !important;
    height: fit-content;
    background-color: #061953 !important;;
    border: none;
    border-radius: 30px;
    > p {
        width: 120px;
        height: 100%;
        font-family: NotoSansCJKkr;
        padding-top: 5px;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 3;
        letter-spacing: normal;
        text-align: center;
        color: #ffffff;
      }
    :hover {
      background-color: ${WHITE};
      > p {

      }
    }
    @media (min-width: 0px) and (max-width: 767.98px) {
        width : 50%
        margin-bottom: 44px;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
  	    width : 30%
        margin-bottom: 44px;
    }
  }
`
const List = styled.div`
  width: 100%;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 16px;
    .slick-list {
      width: 100%;
      > div > div {
        width: 270px !important;
        margin-right: 16px;
      }
      > div > div > div > div  {
        align-items: center;
        width: 270px !important;
      }
    }
  }
  @media (min-width: 360px) and (max-width: 767.98px) {
    margin-top: 16px;
    .slick-list {
      width: 100%;
      > div > div {
        width: 270px !important;
        margin-right: 16px;
      }
      > div > div > div > div  {
        align-items: center;
        width: 270px !important;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
