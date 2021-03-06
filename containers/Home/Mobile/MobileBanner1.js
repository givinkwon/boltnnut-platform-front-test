import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";
import Router from "next/router";
import Slider from "react-slick";

const image1 = "/static/images/logo/logo_1.png";
const image2 = "/static/images/logo/logo_2.png";
// const image3 = "/static/images/logo/logo_3.png";
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
const image17 = "/static/images/logo/logo_17.png";

const passImg = "/static/images/pass7.png";
const backgroundImg = "/static/images/Home/Banner5/Banner5_Bg.png";

class MobileBanner1Container extends React.Component {
  render() {
    const SlideSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      draggable: true,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    return (
      <>
        <Container>

          <Box>
            <Title14>바로공장은 제조분야를 선도하는</Title14>
            <Title14>많은 기업들과 함께합니다.</Title14>
          </Box>

          <SliderContainer {...SlideSettings}>
              <img src={image1} />
              <img src={image2} />
              <img src={image17} />
              <img src={image4} />
              <img src={image5} />
              <img src={image6} />
              <img src={image7} />
              <img src={image8} />
          <img src={image9} />
          <img src={image10} />
          <img src={image11} />
          <img src={image12} />
          <img src={image13} />
          <img src={image14} />
          <img src={image15} />
          <img src={image16} />
        </SliderContainer>
        </Container>
      </>
    );
  }
}

export default MobileBanner1Container;

const StartLine = styled.div`
  width: 18px;
  border: solid 1px #999999;
  margin-bottom: 24px;
`;

const Container = styled.div`
  padding-top: 30px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 28px);
  }

  @media (min-width: 768px) and (max-width: 1279.98px) {
    width: 720px;
  }
  @media (min-width: 1280px) {
    width: 1200px;
  }
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
          width: 100px;
          height: 100px;
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
