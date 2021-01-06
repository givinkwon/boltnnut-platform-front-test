import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import * as Content from "components/Content";

const Logo1 = 'static/images/request/LogoImageSlider/logo1.png';
class EstimateLogoSlider extends React.Component {
  render() {
    const SlideSettings = {
        dots: false,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        draggable: true
      };
    
    return (
      <ItemBox>
        <StyledSlider {...SlideSettings}>
            <div>
                <Item>
                    <ImgBox>
                        <img src={Logo1}/>
                    </ImgBox>
                    <TextBox>
                        <HashTag>
                            #27년차
                        </HashTag>
                        <HashTag>
                            #의료기기
                        </HashTag>
                    </TextBox>
                </Item>
            </div>            
            <div>
                <Item>
                    <ImgBox>
                        <img src={Logo1}/>
                    </ImgBox>
                    <TextBox>
                        <HashTag>
                            #27년차
                        </HashTag>
                        <HashTag>
                            #의료기기
                        </HashTag>
                    </TextBox>
                </Item>
            </div>
            <div>
                <Item>
                    <ImgBox>
                        <img src={Logo1}/>
                    </ImgBox>
                    <TextBox>
                        <HashTag>
                            #27년차
                        </HashTag>
                        <HashTag>
                            #의료기기
                        </HashTag>
                    </TextBox>
                </Item>
            </div>
            <div>
                <Item>
                    <ImgBox>
                        <img src={Logo1}/>
                    </ImgBox>
                    <TextBox>
                        <HashTag>
                            #27년차
                        </HashTag>
                        <HashTag>
                            #의료기기
                        </HashTag>
                    </TextBox>
                </Item>
            </div>
            <div>
                <Item>
                    <ImgBox>
                        <img src={Logo1}/>
                    </ImgBox>
                    <TextBox>
                        <HashTag>
                            #27년차
                        </HashTag>
                        <HashTag>
                            #의료기기
                        </HashTag>
                    </TextBox>
                </Item>
            </div>
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
  padding-top:60px;
  width:100%;
  .slick-list >div {
      margin-left:2px;
      padding-top:10px;
      padding-bottom:10px;
  }
`

const Item=styled.div`
  width: 188px;
  height: 274px;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 gray;
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
   padding-top:20px;
   width:150px;
   height:150px;
   margin:0 auto;
   >img
   {
       width:100%;
       height:100%;
   }
`
export default EstimateLogoSlider;

