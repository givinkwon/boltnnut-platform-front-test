import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import * as Content from "components/Content";
import { inject, observer } from "mobx-react";

const Logo1 = 'static/images/request/LogoImageSlider/logo1.png';

@inject('Request')
@observer
class EstimateLogoSlider extends React.Component {
    
  render() {
    const SlideSettings = {
        dots: false,
        infinite: true,
        autoplay:true,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable: true,
        rows:2
      };
    const { Request } = this.props;  
    return (
      <ItemBox>
        <StyledSlider {...SlideSettings}>
        {Request.random_partner_list && Request.random_partner_list.map((item, idx) => {
              // console.log(item)
              return (                
                <>
                <div>
                    <Item>
                        <ImgBox>
                            <img src={item.partnerLogo}/>
                        </ImgBox>
                    </Item>
                </div>
                </>
                )
                }
                )
            }
            
        </StyledSlider>
      </ItemBox>
    )
  }
}

const StyledSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
`

const ItemBox=styled.div`
  padding-top:22px;
  padding-bottom:72px;
  width:100%;
  .slick-list >div {
      margin-left:4px;
      padding-top:10px;
      padding-bottom:10px;
  }
`

const Item=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width: 90px;
  height: 94px;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 gray;
  margin-top:11px;
`

const TextBox=styled.div`
    padding-top:29px;
`

const HashTag = styled(Content.FontSize15)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.87;
  letter-spacing: -0.15px;
  text-align: center;
  color: #0933b3;
  padding-bottom:5px;
  object-fit: contain;
`

const ImgBox=styled.div`  
//    padding-top:20px;
   width:73px;
   height:73px;
//    margin:0 auto;
   >img
   {
       width:100%;
       height:100%;
   }
`
export default EstimateLogoSlider;

