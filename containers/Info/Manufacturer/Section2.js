import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";

import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'
import Container from 'components/Container'


const image1 = "/static/icon/info/logo_1.png";
const image2 = "/static/icon/info/logo_2.png";
const image3 = "/static/icon/info/logo_3.png";
const image4 = "/static/icon/info/logo_4.png";
const image5 = "/static/icon/info/logo_5.png";
const image6 = "/static/icon/info/logo_6_3.png";
const image7 = "/static/icon/info/logo_7.jpg";
const image8 = "/static/icon/info/logo_8.jpg";
const image9 = "/static/icon/info/logo_9.png";
const image10 = "/static/icon/info/logo_10.png";
const image11 = "/static/icon/info/logo_11.png";
const image12 = "/static/icon/info/logo_12.png";
const image13 = "/static/icon/info/logo_13.png";
const image14 = "/static/icon/info/logo_14.png";
const image15 = "/static/icon/info/logo_15.png";
const right = "/static/images/main/main_right.png";
const left = "/static/images/main/main_left.png";

class Section2Container extends React.Component {
  state = {
    width: 0,
    next: true,

  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const { width } = this.state
    const { next} = this.state

     var settings = {
      dots: false,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      initialSlide: 0,
      draggable: false,
      arrows: true,
      centerPadding: "38px",
      nextArrow: <Icon style={{marginLeft : '15px', opacity: next ? 1 : 0.4}} src={right}/>,
      prevArrow: <Icon style={{marginLeft : '15px', opacity: next ? 1 : 0.4}} src={left}/>,
      beforeChange: (current) => {
        this.setState({current: current})
      },
    }
    return (
        <CustomContainer>
          { width > 767.98 ? (
            <>
            <Container>
              <Header>볼트앤너트 제조 파트너</Header>
              <Category>
                <Item>
                  <Image src={image1} active={true}/>
                </Item>
                <Item>
                  <Image src={image2} active={true}/>
                </Item>
                <Item>
                  <Image src={image3} active={true}/>
                </Item>
                <Item>
                  <Image src={image4} active={true}/>
                </Item>
                <Item>
                  <Image src={image5} active={true}/>
                </Item>
                <Item>
                  <Image src={image10} active={true}/>
                </Item>
                <Item>
                  <Image src={image7} active={true}/>
                </Item>
                <Item>
                  <Image src={image8} active={true}/>
                </Item>
                <Item>
                  <Image src={image9} active={true}/>
                </Item>
                <Item>
                  <Image src={image6} active={true}/>
                </Item>
                <Item>
                  <Image src={image11} active={true}/>
                </Item>
                <Item>
                  <Image src={image12} active={true}/>
                </Item>
                <Item>
                  <Image src={image13} active={true}/>
                </Item>
                <Item>
                  <Image src={image14} active={true}/>
                </Item>
                <Item>
                  <Image src={image15} active={true}/>
                </Item>
              </Category>
            </Container>
            </>
          ) : (
            <>
            <Container>
              <Header>볼트앤너트 제조 파트너</Header>
                <List>
                  <Slider {...settings}>
                    <Item>
                      <Image src={image1} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image2} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image3} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image4} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image5} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image10} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image7} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image8} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image9} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image6} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image11} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image12} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image13} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image14} active={true}/>
                    </Item>
                    <Item>
                      <Image src={image15} active={true}/>
                    </Item>
                  </Slider>
                </List>
              </Container>
            </>
          )}
            
        </CustomContainer>
    );
  }
}

export default Section2Container;

const Category = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  /* margin-right: auto;
  margin-left: auto;
  text-align : center;
  align-items: center; */
  /* @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 0px;
    margin-bottom: 20px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 40px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 60px 0px;
  }
  @media (min-width: 1300px) {
    padding: 80px 0px;
  } */
`
const Image = styled(RatioImage)`
  cursor: pointer;
  margin-bottom: 20px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width : 127px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {

  }
  @media (min-width: 992px) and (max-width: 1299.98px) {

  }
  @media (min-width: 1300px) {

  }

  /* border: 2px solid #ddd;
  border-radius: 200px !important;  
  ${props => props.active && css`
    border: 2px solid ${PRIMARY};
  `} */

`
const Icon = styled.img`
  cursor: pointer;
  width: 13x;
  height: 24px;
  z-index : 100;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 30px;
    height: 30px;
  }
`
const Header = styled.div`
  object-fit: contain;
  font-size: 32px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.41;
  letter-spacing: normal;
  color: #505050;
  margin : auto ;
  text-align : center; 
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 50px;
    width: 290px;
    margin-bottom: 20px;
    font-size: 24px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 50px;
    width: 290px;
    margin-bottom: 40px;
    font-size: 24px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 70px;
    margin-bottom: 73px;
  }
  @media (min-width: 1300px) {
    padding-top: 150px;
    padding-bottom: 60px;
  }
`

const Item = styled.div`


  width: calc(20% - 40px);
  padding: 20px 0;
  margin: 0 20px;

  @media (min-width: 0px) and (max-width: 499.98px) {
    width: calc(50% - 30px);
    margin: 0;
    padding: 15px;
  }
  @media (min-width: 500px) and (max-width: 991.98px) {
    margin: 0;
    width: calc(33.33% - 30px);
    padding: 15px;
  }
  @media (min-width: 992px) and (max-width: 1199.98px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    width: calc(25% - 30px);
    padding: 15px;
  }
`


const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  p {
      text-align : center ;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`
const List = styled.div`
  @media (min-width: 0px) and (max-width: 359.98px) {
    padding-top: 16px;
    padding-bottom : 40px;
    .slick-list {
      /* width: 100%; */
    }
    .slick-track {
      width : max-content !important;
    }
  }
  @media (min-width: 360px) and (max-width: 767.98px) {
    padding-top: 16px;
    padding-bottom : 40px;
    .slick-list {
      /* width: 100%; */
    }
    .slick-track {
      width : max-content !important;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`