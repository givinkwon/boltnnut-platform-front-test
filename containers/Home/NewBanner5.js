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
const image1 = "/static/images/main/Banner3_1.png";
const image2 = "/static/images/main/Banner3_2.png";

class NewBanner5Container extends React.Component {
  render() {
    var settings = {
      dots: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true
          }
        },
      ]
    }
    return (
    <CustomContainer>
          <Container>
                <Item>
                    <Image src={image1} />
                    <Image src={image2} />
                </Item>
          </Container>
    </CustomContainer>
    );
  }
}

export default NewBanner5Container;

const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto;
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
  text-align : center;
  align-items: center;
  height: 100%;
  margin: auto;
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
    width: 1300px;
  }
`

const Banner = styled(Container)`
  width: 1400px;
  height: 100%;
  align-items: center;
  background-color: #f5f5f5;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 0px 0px;
    margin-bottom: 20px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 0px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 0px 0px;
  }
  @media (min-width: 1300px) {
    padding: 0px 0px;
  }
`
const List = styled.div`
  width : 100%;
  height : 100%;
  padding-top : 0px;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  display: inline-flex;
  margin-bottom: 38px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 0px;
    .slick-list {
      width: 728px;
      text-align: center;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 0px;
    .slick-list {
      width: 728px;
      text-align: center;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 0px;
    .slick-list {
      width: 1080px;
      text-align: center;
    }

  }
  @media (min-width: 1300px) {
    margin-top: 0px;
    .slick-list {
      width: 1080px;
      text-align: center;
    }
  }
`
const ItemBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  flex-direction: column;
  :focus {
    outline: none;
  }
`
const Item = styled.div`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
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
    width: calc(100%);
    > p {
      margin-top: 20px;
    }
  }
`
const Image = styled(RatioImage)`
  width: 588px;
  height: 565px;
  justify-content: center;
  align-items: center;
  margin-top: 109px;
  margin-bottom: 140px;
  padding-right: 22px;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const Header = styled.span`
  width: 880px;
  height: 104px;
  font-family: NotoSansCJKkr;
  font-size: 40px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #061953;
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
    margin-top: 70px;
    margin-bottom: 73px;
  }
`
 const Bold = styled.span`
  font-Weight : bold;
  font-family: NotoSansCJKkr-Bold;
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

