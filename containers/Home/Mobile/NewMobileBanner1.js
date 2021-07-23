import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";
import Router from "next/router";
import Slider from "react-slick";

const logo_img1 = "/static/images/logo/logo_1.png";
const logo_img2 = "/static/images/logo/logo_2.png";
const logo_img3 = "/static/images/logo/logo_3.png";
const logo_img4 = "/static/images/logo/logo_4.png";
const logo_img5 = "/static/images/logo/logo_5.png";
const logo_img6 = "/static/images/logo/logo_6.png";
const logo_img7 = "/static/images/logo/logo_7.png";
const logo_img8 = "/static/images/logo/logo_8.png";
const logo_img9 = "/static/images/logo/logo_9.png";
const logo_img10 = "/static/images/logo/logo_10.png";
const logo_img11 = "/static/images/logo/logo_11.png";
const logo_img12 = "/static/images/logo/logo_12.png";
const logo_img13 = "/static/images/logo/logo_13.png";
const logo_img14 = "/static/images/logo/logo_14.png";
const logo_img15 = "/static/images/logo/logo_15.jpg";
const logo_img16 = "/static/images/logo/logo_16.png";

const passImg = "/static/images/pass7.png";
const backgroundImg = "/static/images/Home/Banner5/Banner5_Bg.png";

class MobileBanner14Container extends React.Component {
  render() {
    const SlideSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      draggable: true,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    return (
      <>
        <Container>
          <Box>
            <Title14>볼트앤너트는 제조분야를 선도하는</Title14>
            <Title14>많은 기업들과 함께합니다.</Title14>
          </Box>

          <Item style={{ display: "flex" }}>
            <img src={logo_img1} />
            <img src={logo_img2} />
            <img src={logo_img3} />
            <img src={logo_img4} />
          </Item>
          <Item style={{ display: "flex" }}>
            <img src={logo_img5} />
            <img src={logo_img6} />
            <img src={logo_img7} />
            <img src={logo_img8} />
          </Item>
          {/* <Item style={{ display: "flex" }}>
          <img src={logo_img9} />
          <img src={logo_img10} />
          <img src={logo_img11} />
          <img src={logo_img12} />
        </Item>
        <Item style={{ display: "flex" }}>
          <img src={logo_img13} />
          <img src={logo_img14} />
          <img src={logo_img15} />
          <img src={logo_img16} />
        </Item> */}
        </Container>
      </>
    );
  }
}

export default MobileBanner14Container;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  // width: 375px;
  // height: 273px;
  backdrop-filter: blur(14px);
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  width: 100%;
  height: 55px;
`;

const Title14 = styled(Title.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: -0.35px;
  color: #999999;
`;

const SliderContainer = styled(Slider)`
  .slick-list {
    .slick-track {
      .slick-slide {
        display: flex;
        justify-content: center;
        img {
          width: 121px;
          height: 121px;
        }
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
  flex-wrap: wrap;

  > img {
    width: 76px;
    height: 76px;
  }
`;

const Item = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // width: calc(14% - 40px);
  padding: 20px 0;
  margin: 0 20px;

  justify-content: center;

  > img {
    // width: 100%;
    // display: inline-block;
    // position: relative;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    // width: 88px;
    // height: 88px;
    width: 121px;
  }
`;
