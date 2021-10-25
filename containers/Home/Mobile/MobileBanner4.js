import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";
import Router from "next/router";
import Slider from "react-slick";

const image1 = "/static/images/product/product1.jpg";
const image2 = "/static/images/product/product2.jpg";
const image3 = "/static/images/product/product3.jpg";
const image4 = "/static/images/product/product4.jpg";
const image5 = "/static/images/product/product5.jpg";
const image6 = "/static/images/product/product6.jpg";
const image7 = "/static/images/product/product7.jpg";
const image8 = "/static/images/product/product8.jpg";

const passImg = "/static/images/pass7.png";
const backgroundImg = "/static/images/Home/Banner5/Banner5_Bg.png";

class MobileBanner4Container extends React.Component {
  render() {
    const SlideSettings = {
      dots: false,
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
            <Title20>단품부터 양산품 조립까지 바로 발주하세요.</Title20>
          </Box>

          <SliderContainer {...SlideSettings}>
            <item>
              <img src={image1} />
            </item>
            <item>
              <img src={image2} />
            </item>
            <item>
              <img src={image3} />
            </item>
            <item>
              <img src={image4} />
            </item>
            <item>
              <img src={image5} />
            </item>
            <item>
              <img src={image6} />
            </item>
            <item>
              <img src={image7} />
            </item>
            <item>
              <img src={image8} />
            </item>
        </SliderContainer>
        </Container>
      </>
    );
  }
}

export default MobileBanner4Container;

const StartLine = styled.div`
  width: 18px;
  border: solid 1px #999999;
  margin-bottom: 24px;
`;

const Container = styled.div`
  padding-top: 90px;
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

const Title20 = styled(Title.FontSize20)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: -0.35px;
  margin-bottom: 50px;
`;

const SliderContainer = styled(Slider)`
  .slick-list {
    .slick-track {
      .slick-slide {
        display: flex;
        justify-content: center;
        img {
          border-radius: 30px;
          width: 200px;
          height: 200px;
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
    width: 600px;
    height: 600px;
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
