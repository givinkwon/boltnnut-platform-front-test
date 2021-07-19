import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const Logo1 = 'static/images/request/LogoImageSlider/logo1.png';
class MobileLogoSlider extends React.Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      draggable: false,
      swipe: false,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
    };
    return (
      <SliderWraper>
        <Slider {...settings}>
          <ImgContainer><img src={ Logo1 }/></ImgContainer>
          <ImgContainer><img src={ Logo1 }/></ImgContainer>
          <ImgContainer><img src={ Logo1 }/></ImgContainer>
          <ImgContainer><img src={ Logo1 }/></ImgContainer>
          <ImgContainer><img src={ Logo1 }/></ImgContainer>
          <ImgContainer><img src={ Logo1 }/></ImgContainer>
          <ImgContainer><img src={ Logo1 }/></ImgContainer>
          <ImgContainer><img src={ Logo1 }/></ImgContainer>
          <ImgContainer><img src={ Logo1 }/></ImgContainer>
          <ImgContainer><img src={ Logo1 }/></ImgContainer>
          <ImgContainer><img src={ Logo1 }/></ImgContainer>
        </Slider>
      </SliderWraper>
    )
  }
}
const SliderWraper = styled.div`
  width: 730px;
  height: 112px;
  margin: 10px 83px 30px 83px;
`
const ImgContainer = styled.div`
  width: 112px;
  height: 112px;
  > img {
    margin: 0px 17px;
  }
`
export default MobileLogoSlider;

