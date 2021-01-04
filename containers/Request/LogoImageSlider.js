import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const Logo1 = 'static/images/request/LogoImageSlider/logo1.png';
class LogoSlider extends React.Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 2
    };
    return (
      <Slider {...settings}>
        <div style={{width:112, height:112}}><img src={ Logo1 }/></div>
        <div style={{width:112, height:112}}><img src={ Logo1 }/></div>
        <div style={{width:112, height:112}}><img src={ Logo1 }/></div>
        <div style={{width:112, height:112}}><img src={ Logo1 }/></div>
        <div style={{width:112, height:112}}><img src={ Logo1 }/></div>
        <div style={{width:112, height:112}}><img src={ Logo1 }/></div>
        <div style={{width:112, height:112}}><img src={ Logo1 }/></div>
        <div style={{width:112, height:112}}><img src={ Logo1 }/></div>
        <div style={{width:112, height:112}}><img src={ Logo1 }/></div>
        <div style={{width:112, height:112}}><img src={ Logo1 }/></div>
      </Slider>
    )
  }
}

export default LogoSlider;
