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
const image1 = "/static/images/main/section1_step1_illust.png";
const image2 = "/static/images/main/section1_step2_illust.png";
const image3 = "/static/images/main/section1_step3_illust.png";
const image4 = "/static/images/banner2_4.png";

class NewBanner2Container extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: false
          }
        },
      ]
    }
    return (
    <CustomContainer>
    <Banner>
      <List>
        <Slider {...settings}>
        <div class="ItemBox">
            <ItemBox>
              <W50 left>
                <TextBox>
                    <Header> STEP.1 </Header>
                    <Middle>
                      <span class="line">
                        의뢰서 작성
                      </span>
                    </Middle>
                    <Bottom>개발하고자 하는 제품에 관한 의뢰서를 작성해주세요.<br/> 의뢰서 작성 시간은 최대 3분입니다.</Bottom>
                </TextBox>
            </W50>
            <W50 right>
                    <Image ratio='100%' src={image1} />
            </W50>
            </ItemBox>
        </div>
        <div class="ItemBox">
            <ItemBox>
              <W50 left>
                  <TextBox>
                    <Header> STEP.2 </Header>
                    <Middle>
                      <span class="line">
                        의뢰 가견적 확인
                      </span>
                    </Middle>
                    <Bottom>볼트앤너트 제조 컨설턴트가 작성하신 의뢰서를<br/>
                    바탕으로 상담해드립니다. 상담 후 <Bold>최대 3영업일</Bold> 이내에<br/>
                    해당 프로젝트를 수행할 전문 업체의 정보와 가견적을 발송드립니다<br/>
                    </Bottom>
                  </TextBox>
            </W50>
            <W50 right>
                    <Image ratio='100%' src={image2} />

            </W50>
            </ItemBox>
        </div>
        <div class="ItemBox">
            <ItemBox>
              <W50 left>
                  <TextBox>
                    <Header> STEP.3 </Header>
                    <Middle>
                      <span class="line">
                        업체 미팅
                      </span>
                    </Middle>
                    <Bottom>발송드린 제품 개발업체의 정보와 가견적을 확인한 후<br/>
                    볼트앤너트 제조 컨설턴트에게 미팅 요청을 해보세요!<br/>
                    추천된 전문 업체가 직접 맞춤 상담을 해드립니다.</Bottom>
                  </TextBox>
            </W50>
            <W50 right>
              <div class="Image">
                    <Image ratio='100%' src={image3} />
              </div>
            </W50>
            </ItemBox>
         </div>
         </Slider>
        </List>
      </Banner>
      </CustomContainer>
    );
  }
}

export default NewBanner2Container;

const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  height: 650px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  background-color: #f5f5f5 !important;;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
    height: 350px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  height: 100%;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 720px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 930px;
  }

  @media (min-width: 1300px) {
    width: 1400px;
  }
`

const Banner = styled(Container)`
  width: 1400px;
  height: 600px;
  align-items: center;
  background-color: #f5f5f5;
  :focus {
    outline: none;
    border: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width:100%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const List = styled.div`
  width : 100%;
  height : 100%;
  padding-top : 0px;
  :focus {
    outline: none; !important
    border: none;
  }
  .ItemBox {
    outline: none; !important
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 0px;
    ul.slick-dots {
      li button:before {
        font-size: 16px;
        color: #061953;
        opacity: 0.1;
      }
      li.slick-active button:before {
        font-size: 16px;
        color: #061953;
        opacity: 1;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 0px;
    ul.slick-dots {
      li button:before {
        font-size: 16px;
        color: #061953;
        opacity: 0.1;
      }
      li.slick-active button:before {
        font-size: 16px;
        color: #061953;
        opacity: 1;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 0px;
    ul.slick-dots {
      li button:before {
        font-size: 16px;
        color: #061953;
        opacity: 0.1;
      }
      li.slick-active button:before {
        font-size: 16px;
        color: #061953;
        opacity: 1;
      }
    }
  }
  @media (min-width: 1300px) {
    margin-top: 0px;
    ul.slick-dots {
      li button:before {
        font-size: 16px;
        color: #061953;
        opacity: 0.1;
      }
      li.slick-active button:before {
        font-size: 16px;
        color: #061953;
        opacity: 1;
      }
    }
  }
`
const ItemBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: inline-flex;
  flex-direction: row;
  :focus {
    outline: none; !important
    border: none; !important
  }
  >div {
   :focus {
     outline: none; !important
   }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width:70%;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    margin: auto;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width:70%;
    display: flex;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  box-sizing: border-box;
  width: 530px;
  height: 277px;
  margin-left:100px;
  margin-top:153px;
  > p {
    text-align: left;
  }
  :focus {
    outline: none;
    border: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width:70%;
    height: calc(70%);
    flex-direction: column;
    margin-top:40px;
    margin-left: auto;
    margin-right: auto;
    align-items:center;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width:70%;
    height: calc(70%);
    flex-direction: column;
    margin-top:70px;
    margin-left: 50px;
    align-items:center;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const Image = styled(RatioImage)`
  width: 540px;
  height: 540px;
  object-fit: contain;
  align-items: center;
  margin-top: 30px;
  margin-right: 100px;
  border-radius: 0 !important;
  width: calc(100% - 20px);
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  :focus {
    outline: none;
    border: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 310px;
    height: 280px;
    margin: auto;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 310px;
    height: 280px;
    margin-left:20px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }

`
const Header = styled.span`
  width: 79px;
  height: 36px;
  font-family: NotoSansCJKkr;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.33;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    text-align:center;

  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
    text-align:center;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 18px;
    text-align:center;
  }
  @media (min-width: 1300px) {
    font-size: 20px;
  }
`
const Middle = styled.span`
  width: 270px;
  height: 59px;
  font-family: NotoSansCJKkr;
  font-size: 40px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #061953;
  margin-top: 10px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 20px;
    text-align:center;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 22px;
    text-align:center;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 28px;
  }
  @media (min-width: 1300px) {
    font-size: 32px;
  }
  .line {
  background: linear-gradient(to top, rgba(255, 192, 0, 0.6), rgba(255, 192, 0, 0.6), transparent 40%);
  }
`
const Bottom = styled.span`
  width: 530px;
  height: 132px;
  font-family: NotoSansCJKkr;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  margin-top: 40px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    width: 350px;
    height: 64px;
    text-align:center;
    margin-top: 30px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 12px;
    width: 350px;
    height: 64px;
    text-align:center;
    margin-top: 30px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 14px;

  }
  @media (min-width: 1300px) {
    font-size: 16px;
  }
`
 const Bold = styled.span`
  font-Weight : 700;
  font-family : NotoSansCJKkr;
`;

const W100 = styled.div`
  width: 100%;
`
const W50 = styled.div`
  align-items: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    height: 70%;
    align-items: center !important;
    justify-content: center;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
    height: 70%;
    align-items: center !important;
    justify-content: center;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 50%;
  }
  @media (min-width: 1300px) {
    width: 50%;
  }
`
