import React from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";

import Container from "components/Container";
import * as Text from "components/Text";
import { WHITE, PRIMARY, BLACK } from "static/style";
import RatioImage from 'components/RatioImage'
import { inject, observer } from 'mobx-react'

const right = "/static/images/main/main_right.png";
const left = "/static/images/main/main_left.png";
@inject('Request')

class TabConatiner extends React.Component {
  setTab = (val) => {
    this.props.setTab(val);
    // window.history.pushState("", "", `/info?tab=${val}`);
  };
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }
  async componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }
  // afterChangeHandler = (current) => {
  //   const magazineCount = this.props.Magazine.magazine_list.length

  //   if(current === 0){
  //     this.setState({next: true, prev: false})
  //   }
  //   else {
  //     // slidesToShow : 2
  //     if(current === magazineCount - 2) {
  //       this.setState({next: false, prev: true})
  //     }
  //     else {
  //       this.setState({next: true, prev: true})
  //     }
  //   }

  // }
  // sampleNextArrow = () => {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block", background: "red" }}
  //       onClick={onClick}
  //     ><img src="right">zzz</img></div>
  //   );
  // }
  // samplePrevArrow = () => {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block", background: "green" }}
  //       onClick={onClick}
  //     />
  //   );
  // }
  // sliderNext = () => {
  //   const breakpoint = this.slider1.state.breakpoint
  //   this.slider1.slickNext()
  // }
  // sliderPrev = () => {
  //   if(this.state.current === 0) {
  //     this.setState({ prev: false,  next: true })
  //   }
  //   else {
  //     this.setState({ prev: true })
  //   }
  //   this.slider1.slickPrev()
  // }
  slider = null
  state = {
    current: 1,
    next: true,
    prev: false,
  }
  render() {
    const { tab } = this.props;
    const { prev, next} = this.state
    const { Request } = this.props;

    const settings = {
      infinite: true,
      nextArrow: <Icon style={{marginLeft : '15px', opacity: next ? 1 : 0.4}} src={right}/>,
      prevArrow: <Icon style={{marginLeft : '15px', opacity: next ? 1 : 0.4}} src={left}/>
    };
    return (
      <Container>
        <TabsContainer>
          <Tabs asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={3}
            focusOnSelect={true}>
            <Tab class="Header" active={tab === 1} onClick={async() => await this.setTab(1)} >
              <Text.FontSize40 fontWeight={500}>제조사 찾기 서비스</Text.FontSize40>
            </Tab>
            <Tab class="Header" active={tab === 2} onClick={async() => await this.setTab(2)}>
              <Text.FontSize40 fontWeight={500}>양산/개발 서비스</Text.FontSize40>
            </Tab>
            <Tab class="Header" active={tab === 3} onClick={async() => await this.setTab(3)}>
              <Text.FontSize40 fontWeight={500}>견적/수량 도출 서비스</Text.FontSize40>
            </Tab>
          </Tabs>
          {/* <Icon prev style={{marginRight : '15px', opacity: prev ? 1 : 0.4}} src={left} onClick={this.sliderPrev}/> */}
          
          
          <Tabs asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
            infinite ={false}
            {...settings}>
            <Tab>
              <Container>
                <SmallBanner>
                  <Text.FontSize32>제조사 찾기 서비스</Text.FontSize32>
                </SmallBanner>
                <Content>
                  <Text.FontSize26>고객님의 아이디어가 현실화 될 수 있도록<br/>가격과 기간, 제품기능 등 유선상담을 도와드리고<br/>이에 맞는 <span>제조 컨설턴트와 전문 제조사를 매칭해 드리는 서비스</span> 입니다.</Text.FontSize26>
                  <Text.FontSize20 style={{color : "#707070"}}>* 제조사찾기 의뢰시 무료로 가견적을 드립니다.</Text.FontSize20>
                </Content>
              </Container>
            </Tab>
            <Tab>
              <Container>
                <SmallBanner>
                  <Text.FontSize32>양산/개발 서비스</Text.FontSize32>
                </SmallBanner>
                <Content>
                  <Text.FontSize26>빅데이터를 기반한 제품분석시스템으로 제품 생산에<br/><span>불필요한 과정을 방지하여 양산 비용을 최대 40% 절감</span>합니다.</Text.FontSize26>
                </Content>
              </Container>
            </Tab>
            <Tab>
              <Container>
                <SmallBanner>
                  <Text.FontSize32>견적/수량 도출 서비스</Text.FontSize32>
                </SmallBanner>
                <Content>
                  <Text.FontSize26>볼트앤너트가 국내 제조사와 해외유통사 네크워크를 통해<br/><span>원하는 조건에 맞는 제조견적, MOQ(최소발주수량) 등의 정보를 전달</span>해드립니다.</Text.FontSize26>
                  <Text.FontSize18>*원주인의 허락 없이 국내에 있는 제품 금형을 찾아 사출 발주를 넣는 요청은 수행하지 않습니다.</Text.FontSize18>
                </Content>
              </Container>
            </Tab>
            
          </Tabs>
          {/* <Icon style={{marginLeft : '15px', opacity: next ? 1 : 0.4}} src={right} onClick={this.sliderNext}/> */}
         </TabsContainer>
       </Container>

    );
  }
}

export default TabConatiner;

const SliderContainer = styled.div`
    display : inline-flex;
    width : 100% ;

`;
const TabsContainer = styled.div`
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width : auto;
    > p {
      font-stretch: normal;
      font-style: normal;
      line-height: 1.47;
      letter-spacing: -0.75px;
      margin : auto; 
    }
  }
  height : 650px ;
  outline : none ;
  *:focus {outline:none;}
  /* @media (min-width: 0px) and (max-width: 767.98px) {
    height: 200px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 250px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    height: 300px;
  }
  @media (min-width: 1300px) { 
    height: 335px;
  } */
`;
const Tabs = styled(Slider)`
  display: flex;
  width : 100%;
  .Header { 
    border-bottom : 1px solid #707070;
    /* ${(props) =>
      props.active ?
      (
      css`
        border-bottom : 1px solid #707070;
      `) :
      (
      css`
        border-bottom: 4px solid #0a2165;

      `
      )
    } */
  }
  .slick-list {
   width : 100% ; 
  }
  .slick-current {
    border-bottom : 4px;
  }
  .slick-prev { 
    padding-left: 40px ;
  }
  .slick-next { 
    padding-right: 40px ;
  }
  .slick-arrow {
    padding-top : 220px
  }
  p {
    text-align : center;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    /* height: 180px; */
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    /* height: 200px; */
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    /* height: 230px; */
  }
  @media (min-width: 1300px) {
    /* height: 250px; */
  }
`;
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
const SmallBanner = styled.div`
    margin-top: 150px;
    p {
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.38;
      letter-spacing: -0.8px;
      color : #505050;
    }

`;
const Content = styled.div`
    margin-top: 45px;
    > p {
      > span {
      font-weight: 600;
      color: #0933b3;
    }
    }
    p:nth-of-type(1) { 
      color : #000000;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.73;
      letter-spacing: -0.65px;
    }
    p:nth-of-type(2) { 
      color : #565454;
      font-weight: normal;
      line-height: 1.5;
      letter-spacing: -0.45px;
    }

`;


const Tab = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  
  > p {
    color: #${BLACK};
  }
  ${(props) =>
    props.active}
`;
