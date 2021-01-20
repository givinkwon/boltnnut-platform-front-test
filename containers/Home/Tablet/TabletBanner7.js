import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import * as Title from "components/Title";
import Slider from "react-slick"
import UseScrollCount from "containers/Home/UseScrollCount";
import Fade from "react-reveal/Fade"

const image1 = "/static/images/logo/logo_1.png";
const image2 = "/static/images/logo/logo_2.png";
const image3 = "/static/images/logo/logo_3.png";
const image4 = "/static/images/logo/logo_4.png";
const image5 = "/static/images/logo/logo_5.png";
const image6 = "/static/images/logo/logo_6_3.png";
const image7 = "/static/images/logo/logo_7.jpg";
const image8 = "/static/images/logo/logo_8.jpg";
const image9 = "/static/images/logo/logo_9.png";
const image10 = "/static/images/logo/logo_10.png";
const image11 = "/static/images/logo/logo_11.png";
const image12 = "/static/images/logo/logo_12.png";
const image13 = "/static/images/logo/logo_13.png";
const image14 = "/static/images/logo/logo_14.png";
const image15 = "/static/images/logo/logo_15.png";
const image16 = "/static/images/logo/logo_16.jpg";
const image17 = "/static/images/logo/logo_17.png";
const image18 = "/static/images/logo/logo_18.png";
const image19 = "/static/images/logo/logo_19.png";
const image20 = "/static/images/logo/logo_20.png";
const image21 = "/static/images/logo/logo_21.png";
const image22 = "/static/images/logo/logo_22.png";
const image23 = "/static/images/logo/logo_23.png";
const image24 = "/static/images/logo/logo_24.png";
const image25 = "/static/images/logo/logo_25.png";
const image26 = "/static/images/logo/logo_26.png";
const image27 = "/static/images/logo/logo_27.png";
const image28 = "/static/images/logo/logo_28.png";
const image29 = "/static/images/logo/logo_29.png";

const item1="/static/images/Home/Banner7/Banner7_img1.png";

const CountFunc = ({index}) => 
{
    const countItem = {
      0: UseScrollCount(878*3,0,0,0,3)
    };
  
    return (
        <p {...countItem[index]}/>
    );
};

class TabletBanner7Container extends React.Component {
    render() {
      const SlideSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        draggable:true,
        rows:4
      };
      return (
        <Background style={{ paddingBottom: 100, paddingTop:100, justifyContent: 'center' }}>
          <Fade bottom>
            <div>
              <Header>
                이미 <CountFunc index={0}/><p>명</p>이 넘는 클라이언트분들이<br/>
                볼트앤너트를 이용하셨습니다.
              </Header>

              <ItemBox>
                <Slider {...SlideSettings}>
                    <Item>
                        <img src={image1}/>
                    </Item>
                    <Item>
                        <img src={image2}/>
                    </Item>
                    <Item>
                        <img src={image3}/>
                    </Item>
                    <Item>
                        <img src={image4}/>
                    </Item>
                    <Item>
                        <img src={image5}/>
                    </Item>
                    <Item>
                        <img src={image10}/>
                    </Item>
                    <Item>
                        <img src={image7}/>
                    </Item>
                    <Item>
                        <img src={image8}/>
                    </Item>
                    <Item>
                        <img src={image9}/>
                    </Item>
                    <Item>
                        <img src={image6}/>
                    </Item>
                    <Item>
                        <img src={image11}/>
                    </Item>
                    <Item>
                        <img src={image12}/>
                    </Item>
                    <Item>
                        <img src={image13}/>
                    </Item>
                    <Item>
                        <img src={image14}/>
                    </Item>
                    <Item>
                        <img src={image16}/>
                    </Item>
                    <Item>
                        <img src={image17}/>
                    </Item>
                    <Item>
                        <img src={image18}/>
                    </Item>
                    <Item>
                        <img src={image19}/>
                    </Item>
                    <Item>
                        <img src={image20}/>
                    </Item>
                    <Item>
                        <img src={image21}/>
                    </Item>
                    <Item>
                        <img src={image22}/>
                    </Item>
                    <Item>
                        <img src={image23}/>
                    </Item>
                    <Item>
                        <img src={image24}/>
                    </Item>
                    <Item>
                        <img src={image25}/>
                    </Item>
                    <Item>
                        <img src={image26}/>
                    </Item>
                    <Item>
                        <img src={image27}/>
                    </Item>
                    <Item>
                        <img src={image28}/>
                    </Item>
                    <Item>
                        <img src={image29}/>
                    </Item>

                    <Item>
                        <img src={image1}/>
                    </Item>
                    <Item>
                        <img src={image2}/>
                    </Item>
                    <Item>
                        <img src={image3}/>
                    </Item>
                    <Item>
                        <img src={image4}/>
                    </Item>
                    <Item>
                        <img src={image5}/>
                    </Item>
                    <Item>
                        <img src={image10}/>
                    </Item>
                    <Item>
                        <img src={image7}/>
                    </Item>
                    <Item>
                        <img src={image8}/>
                    </Item>
                    <Item>
                        <img src={image9}/>
                    </Item>
                    <Item>
                        <img src={image6}/>
                    </Item>
                    <Item>
                        <img src={image11}/>
                    </Item>
                    <Item>
                        <img src={image12}/>
                    </Item>
                    <Item>
                        <img src={image13}/>
                    </Item>
                    <Item>
                        <img src={image14}/>
                    </Item>
                    <Item>
                        <img src={image16}/>
                    </Item>
                    <Item>
                        <img src={image17}/>
                    </Item>
                    <Item>
                        <img src={image18}/>
                    </Item>
                    <Item>
                        <img src={image19}/>
                    </Item>
                    <Item>
                        <img src={image20}/>
                    </Item>
                    <Item>
                        <img src={image21}/>
                    </Item>
                    <Item>
                        <img src={image22}/>
                    </Item>
                    <Item>
                        <img src={image23}/>
                    </Item>
                    <Item>
                        <img src={image24}/>
                    </Item>
                    <Item>
                        <img src={image25}/>
                    </Item>
                    <Item>
                        <img src={image26}/>
                    </Item>
                    <Item>
                        <img src={image27}/>
                    </Item>
                    <Item>
                        <img src={image28}/>
                    </Item>
                    <Item>
                        <img src={image29}/>
                    </Item>

                    <Item>
                        <img src={image1}/>
                    </Item>
                    <Item>
                        <img src={image2}/>
                    </Item>
                    <Item>
                        <img src={image3}/>
                    </Item>
                    <Item>
                        <img src={image4}/>
                    </Item>
                    <Item>
                        <img src={image5}/>
                    </Item>
                    <Item>
                        <img src={image10}/>
                    </Item>
                    <Item>
                        <img src={image7}/>
                    </Item>
                    <Item>
                        <img src={image8}/>
                    </Item>
                    <Item>
                        <img src={image9}/>
                    </Item>
                    <Item>
                        <img src={image6}/>
                    </Item>
                    <Item>
                        <img src={image11}/>
                    </Item>
                    <Item>
                        <img src={image12}/>
                    </Item>
                    <Item>
                        <img src={image13}/>
                    </Item>
                    <Item>
                        <img src={image14}/>
                    </Item>
                    <Item>
                        <img src={image16}/>
                    </Item>
                    <Item>
                        <img src={image17}/>
                    </Item>
                    <Item>
                        <img src={image18}/>
                    </Item>
                    <Item>
                        <img src={image19}/>
                    </Item>
                    <Item>
                        <img src={image20}/>
                    </Item>
                    <Item>
                        <img src={image21}/>
                    </Item>
                    <Item>
                        <img src={image22}/>
                    </Item>
                    <Item>
                        <img src={image23}/>
                    </Item>
                    <Item>
                        <img src={image24}/>
                    </Item>
                    <Item>
                        <img src={image25}/>
                    </Item>
                    <Item>
                        <img src={image26}/>
                    </Item>
                    <Item>
                        <img src={image27}/>
                    </Item>
                    <Item>
                        <img src={image28}/>
                    </Item>
                    <Item>
                        <img src={image29}/>
                    </Item>
                </Slider>
              </ItemBox>
            </div>
            </Fade>
        </Background>
      );
    }
  }
  
  export default TabletBanner7Container;
  
  const Header = styled(Title.FontSize26)`
    color: #191919;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.45;
    letter-spacing: -0.55px;
    text-align:center;
    
    >p {
      display:inline;
      font-weight:bold;
    }
  `
  
  const ItemBox = styled.div`
    padding-top:36px;
    max-width: 100vw;
    width: 100%;
  `
  
  const Item = styled.div`
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // width: calc(14% - 40px);
    // padding: 0px 0px 0px 0px;
    // margin: 0 20px;
    padding-bottom:38px;
    
    :focus {
      outline: none;
    }

    >img{
        //   width:90px;
        //   height:90px;
          margin:0 auto;
          width:65%;
          height:65%;
          overflow: hidden;
          cursor: pointer;
    }
  `
  
  const ImgBox=styled.div`
      :focus {
          outline: none;
      }
  `
  
  const Col=styled.div`
    :focus {
      outline: none;
    }
  `