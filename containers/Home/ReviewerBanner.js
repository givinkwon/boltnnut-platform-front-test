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

class TestBanner extends React.Component {
  render() {
    return (
        <CustomContainer>
            <Container>
              <Header>소비자의 니즈에 맞춰서 진행한 제품 후기</Header>
                <Item1>
                  <Image src={image2}/>
                    <TextBox>
                      <div class="Header">
                        제품을 디자인이 가장 어려우신분<br/>스타일링으로 제품 퀄리티를 바꿔보세요.
                      </div>
                      <div class="Middle">
                        IoT 헬스케어 캣타워
                      </div>
                      <div class="Body">
                        내부 설계와 소프트웨어가 탄탄하게 설계되어 있어도 제품의 겉 표면
                        스타일링이 되어 있지 않으면 제품 퀄리티가 떨어져 보입니다. 디자인 시안
                        부터 고객님과 함께 정하고 원하시는 타겟에 맞춰 디자인을 도와드립니다. <br/>
                        <span class="HyperLink"> 더 보기 </span>
                      </div>
                    </TextBox>
                </Item1>
                <Item1>
                  <Image src={image1}/>
                    <TextBox>
                      <div class="Header">
                        제품을 처음만드시는 분들이  모르거나 <br/> 어려운 부분을 채워 드립니다.
                      </div>
                      <div class="Middle">
                        실리콘 반려동물 샤워기
                      </div>
                      <div class="Body">
                        질병 문제 해결을 위한 반려동물 샤워기 클라이언트의 의견 맞춰서 실리콘  금형양산을 진행하였습니다.
                         R&D 요소를 같이 진행하여 실리콘 분량률을 최소화 하여 예산에 맞춰 양산하였습니다. <br/><br/>
                        <span class="HyperLink"> 더 보기 </span>
                      </div>
                    </TextBox>
                </Item1>
            </Container>
        </CustomContainer>
    );
  }
}

export default TestBanner;

const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  height: 1239px;
  background-color: rgba(158, 159, 161, 0.12);
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

const Container = styled.div`
  width: 1200px;
  height: 1239px;
  margin-right: auto;
  margin-left: auto;
  text-align : center;
  align-items: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
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
  }
`
const Header = styled.div`
  width: 600px;
  height: 47px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.13;
  letter-spacing: -0.8px;
  text-align: left;
  color: #505050;
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
const TextBox = styled.div`
  margin-left: 45px;
  width: 550px;
  .Header {
  padding-top: 45px;
  height: 89px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.75px;
  text-align: left;
  color: #191919;
  }
  .Middle {
  padding-top: 40px;
  height: 29px;
  object-fit: contain;
  font-family: Roboto;
  font-size: 22px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: 0.5px;
  text-align: left;
  color: #505050;
  }
  .Body{
  height: 81px;
  margin-top: 20px;
  width: 540px;
  height: 100px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.45px;
  text-align: left;
  color: #767676;
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
`
const Item_Container = styled.div`
  padding-left: 25px;
  padding-top: 150px;
  text-align: left;
`
const Item2 = styled.div`
  display: flex;
  padding-top: 100px;
  padding-bottom: 107px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  > p {
    text-align: left;
  }
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
    width: calc(100% - 10px);
    > p {
      margin-top: 20px;
    }
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
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 232px;
    height: 276px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 232px;
    height: 276px;
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