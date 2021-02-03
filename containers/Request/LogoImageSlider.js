import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const Logo1 = 'static/images/request/LogoImageSlider/logo_1.png';
const Logo2 = 'static/images/request/LogoImageSlider/logo_2.png';
const Logo3 = 'static/images/request/LogoImageSlider/logo_3.png';
const Logo4 = 'static/images/request/LogoImageSlider/logo_4.png';
const Logo5 = 'static/images/request/LogoImageSlider/logo_5.png';
const Logo6 = 'static/images/request/LogoImageSlider/logo_6.png';
const Logo7 = 'static/images/request/LogoImageSlider/logo_7.png';
const Logo8 = 'static/images/request/LogoImageSlider/logo_8.png';
const Logo9 = 'static/images/request/LogoImageSlider/logo_9.png';
const Logo10 = 'static/images/request/LogoImageSlider/logo_10.png';
const Logo11 = 'static/images/request/LogoImageSlider/logo_11.png';
const Logo12 = 'static/images/request/LogoImageSlider/logo_12.png';
const Logo13 = 'static/images/request/LogoImageSlider/logo_13.png';
const Logo14 = 'static/images/request/LogoImageSlider/logo_14.png';
const Logo15 = 'static/images/request/LogoImageSlider/logo_15.png';
import { inject, observer } from "mobx-react";

@inject("Request")
@observer
class LogoSlider extends React.Component {
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
    const { Request } = this.props;
    console.log(Request.random_partner_list)
    return (
        <SliderWraper>
        <Slider {...settings}>
          
        <>
          {Request.random_partner_list.length == 0 &&
          <>
          <ImgContainer><img src={ Logo1 }/></ImgContainer>
          <ImgContainer><img src={ Logo2 }/></ImgContainer>
          <ImgContainer><img src={ Logo3 }/></ImgContainer>
          <ImgContainer><img src={ Logo4 }/></ImgContainer>
          <ImgContainer><img src={ Logo5 }/></ImgContainer>
          <ImgContainer><img src={ Logo6 }/></ImgContainer>
          <ImgContainer><img src={ Logo7 }/></ImgContainer>
          <ImgContainer><img src={ Logo8 }/></ImgContainer>
          <ImgContainer><img src={ Logo9 }/></ImgContainer>
          <ImgContainer><img src={ Logo10 }/></ImgContainer>
          <ImgContainer><img src={ Logo11 }/></ImgContainer>
          <ImgContainer><img src={ Logo12 }/></ImgContainer>
          <ImgContainer><img src={ Logo13 }/></ImgContainer>
          <ImgContainer><img src={ Logo14 }/></ImgContainer>
          <ImgContainer><img src={ Logo15 }/></ImgContainer>
          </>
          }

          {Request.random_partner_list && Request.random_partner_list.map((item, idx) => {
              console.log(item)
              return (
                
                <ImgContainer><img src={item.partnerLogo}/></ImgContainer>
                
              )
              }
            )
          }
          
          
          
        </>
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
    width: 112px;
    height: 112px;
  }
`
export default LogoSlider;

