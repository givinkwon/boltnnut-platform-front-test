import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";
import Router from "next/router";
import Slider from "react-slick";

const image1 = "/static/images/logo/logo_1.png";
const image2 = "/static/images/logo/logo_2.png";
const image3 = "/static/images/logo/logo_3.png";
const image4 = "/static/images/logo/logo_4.png";
const image5 = "/static/images/logo/logo_5.png";
const image6 = "/static/images/logo/logo_6.png";
const image7 = "/static/images/logo/logo_7.png";
const image8 = "/static/images/logo/logo_8.png";
const image9 = "/static/images/logo/logo_9.png";
const image10 = "/static/images/logo/logo_10.png";
const image11 = "/static/images/logo/logo_11.png";
const image12 = "/static/images/logo/logo_12.png";
const image13 = "/static/images/logo/logo_13.png";
const image14 = "/static/images/logo/logo_14.png";
const image15 = "/static/images/logo/logo_15.jpg";
const image16 = "/static/images/logo/logo_16.png";

const passImg = "/static/images/pass7.png";
const backgroundImg = "/static/images/Home/Banner5/Banner5_Bg.png";

class Banner14Container extends React.Component {
  render() {
    const SlideSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      draggable: true,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    return (
      <>
        <Box>
          <Layer />
          <span>이용 클라이언트</span>
        </Box>
        <SliderContainer {...SlideSettings}>
          <Item style={{ width: 141 }}>
            <img src={image1} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image2} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image3} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image4} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image5} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image6} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image7} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image8} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image9} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image10} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image11} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image12} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image13} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image14} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image15} />
          </Item>
          <Item style={{ width: 141 }}>
            <img src={image16} />
          </Item>
        </SliderContainer>
      </>
    );
  }
}

export default Banner14Container;

const Box = styled.div`
  background-image: url("/static/images/Home2/Banner14_img1.png");
  background-position: center;
  background-size: cover;
  display: flex;
  width: 100%;

  height: 73px;
  position: relative;
  justify-content: center;

  > span {
    font-size: 26px;
    line-height: 76px;
    letter-spacing: -0.65px;
    color: #ffffff;
    z-index: 98;
  }
`;

const Item = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // width: calc(14% - 40px);
  padding: 20px 0;
  margin: 0 20px;

  > img {
    // width: 100%;
    // display: inline-block;
    // position: relative;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    width: 141px;
    height: 141px;
  }
`;

const Col = styled.div`
  :focus {
    outline: none;
  }
`;

const SliderContainer = styled(Slider)`
  .slick-list {
    .slick-track {
      .slick-slide {
        display: flex;
        justify-content: center;
      }
    }
  }
`;

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 97;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.7);
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
