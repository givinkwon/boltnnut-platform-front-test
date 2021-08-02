import React from "react";
import styled from "styled-components";
import * as Text from "components/Text";
import Slider from "react-slick";
import Background from "components/Background";

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

class NewBanner1Container extends React.Component {
  render() {
    const SlideSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      draggable: true,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    return (
      <CustomBackground>
        <Container>
          <Box>
            <Header>볼트앤너트는 제조분야를 선도하는 많은 기업들과 함께 하고있습니다.</Header>
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
        </Container>
      </CustomBackground>
    );
  }
}

export default NewBanner1Container;

const CustomBackground = styled(Background)`
  height: 282px;
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.06);
  background-color: #ffffff;
`;

const Box = styled.div`
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

const Item = styled.div`
  margin: 0 20px;

  > img {
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    width: 141px;
    height: 141px;
  }
`;

const Header = styled(Text.FontSize18)`
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 4.22;
  letter-spacing: -0.45px;
  text-align: center;
  color: #999999;
`;
