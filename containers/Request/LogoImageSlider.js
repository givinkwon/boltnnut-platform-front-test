import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const Logo1 = 'static/images/request/LogoImageSlider/logo1.png';
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
    console.log(this.random_partner_list)
    return (
        <SliderWraper>
        <Slider {...settings}>
          
          
          {this.props.Request.random_partner_list && this.props.Request.random_partner_list.map((item, idx) => {
              return (
                <>
                {item.logo.indexOf("noImage") == -1 && <ImgContainer><img src={item.logo}/></ImgContainer>}
                </>
              )
              }
            )
          }
          
          
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
    width: 112px;
    height: 112px;
  }
`
export default LogoSlider;

