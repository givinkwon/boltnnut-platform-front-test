import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import * as Text from "components/Text";
import Slider from "react-slick";

const image1 = "/static/images/product/product1.jpg";
const image2 = "/static/images/product/product2.jpg";
const image3 = "/static/images/product/product3.jpg";
const image4 = "/static/images/product/product4.jpg";
const image5 = "/static/images/product/product5.jpg";
const image6 = "/static/images/product/product6.jpg";
const image7 = "/static/images/product/product7.jpg";
const image8 = "/static/images/product/product8.jpg";
const image9 = "/static/images/product/product9.jpg";
const image10 = "/static/images/product/product10.jpg";
const image11 = "/static/images/product/product11.jpg";
const image12 = "/static/images/product/product12.jpg";


class Banner5Container extends React.Component {
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
      <CustomBackground>
        <Container>
          <TitleContainer>
            <Title32>단품부터 양산품 조립까지 바로 발주하세요.</Title32>
          </TitleContainer>
          <SliderContainer {...SlideSettings}>

            <Item style={{ width: 600 }}>
              <img src={image1} />
            </Item>
            <Item style={{ width: 600 }}>
              <img src={image2} />
            </Item>
            <Item style={{ width: 600 }}>
              <img src={image3} />
            </Item>
            <Item style={{ width: 600 }}>
              <img src={image4} />
            </Item>
            <Item style={{ width: 600 }}>
              <img src={image5} />
            </Item>
            <Item style={{ width: 600 }}>
              <img src={image6} />
            </Item>
            <Item style={{ width: 600 }}>
              <img src={image7} />
            </Item>
            <Item style={{ width: 600 }}>
              <img src={image8} />
            </Item>
            <Item style={{ width: 600 }}>
              <img src={image9} />
            </Item>
            <Item style={{ width: 600 }}>
              <img src={image10} />
            </Item>
            <Item style={{ width: 600 }}>
              <img src={image11} />
            </Item>
            <Item style={{ width: 600 }}>
              <img src={image12} />
            </Item>
            
          </SliderContainer>
        </Container>
      </CustomBackground>
    );
  }
}

export default Banner5Container;


const CustomBackground = styled(Background)`
  background-color: #f6f6f6;
  height: 100%;
  padding-bottom: 90px;
  padding-top: 90px;
  -webkit-backdrop-filter: blur(14px);
  backdrop-filter: blur(14px);
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.06);
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 140px;
`;

const SliderContainer = styled(Slider)`
  .slick-list {
    .slick-track {
      .slick-slide {
        display: flex;
        justify-content: center;
        border-radius: 10px;
      }
    }
  }
`;

const Item = styled.div`
  margin: 0 0;
  > img {
    border-radius: 50px;
    overflow: hidden;
    cursor: pointer;
    width: 560px;
    height: 560px;
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

const Title32 = styled(Title.FontSize32)`
  font-size: 32px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: -0.8px;
  color: #555963;
  margin-bottom: 80px;
`;
