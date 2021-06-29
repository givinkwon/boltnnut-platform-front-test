import React from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";
import { inject, observer } from 'mobx-react'

import Container from "components/Container";
import * as Text from "components/Text";
import { WHITE, PRIMARY, BLACK } from "static/style";
import RatioImage from 'components/RatioImage'

const right = "/static/images/main/main_right.png";
const left = "/static/images/main/main_left.png";

@inject('Request')
@observer
class TabConatiner extends React.Component {

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
  slider = null
  state = {
    current: 0,
    next: true,
    prev: false,
  }
  render() {
    const { Request } = this.props;
    const { prev, next} = this.state

    const settings = {
      infinite: true,
      
      responsive: [
        {
          breakpoint: 3000,
          settings: {
            nextArrow: <Icon style={{marginLeft : '15px', opacity: next ? 1 : 0.4}} src={right}/>,
            prevArrow: <Icon style={{marginLeft : '15px', opacity: next ? 1 : 0.4}} src={left}/>,
          },
        },
        {
          breakpoint: 768,
          settings: {
          },
        },
      ]
    }
    return (
      <Container>
        <TabsContainer>
          <Tabs asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={3}
            focusOnSelect={true}>
            <Tab class="Header" active={Request.tab == 0} onClick={async() => await Request.setTab(0)}>
              <Text.FontSize32 fontWeight={500}>견적 서비스</Text.FontSize32>
              {Request.tab === 0 ? (<UnderLineBox/>) : (<UnderLine/>)}
            </Tab>
            <Tab class="Header" active={Request.tab == 1} onClick={async() => await Request.setTab(1)}>
              <Text.FontSize32 fontWeight={500}>개발&생산 제조 패키지</Text.FontSize32>
              {Request.tab === 1 ? (<UnderLineBox/>) : (<UnderLine/>)}
            </Tab>
            <Tab class="Header" active={Request.tab == 3} onClick={async() => await Request.setTab(3)}>
              <Text.FontSize32 fontWeight={500}>제품 수배 패키지</Text.FontSize32>
              {Request.tab === 3 ? (<UnderLineBox/>) : (<UnderLine/>)}
            </Tab>
          </Tabs>
          
          
          <Tabs asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
            infinite ={false}
            {...settings}>
            <Tab>
              <Container>
                <SmallBanner>
                  <Text.FontSize32>견적 서비스</Text.FontSize32>
                </SmallBanner>
                <Content>
                  <Text.FontSize26>원하시는 개발 조건에 적합한<br/><span>전문 제조사의 견적을 바로 받아보세요</span><br/>견적을 바탕으로 상담을 통해 최적의 제조사를 매칭해드립니다.</Text.FontSize26>
                  <Text.FontSize20 style={{color : "#707070"}}>* 제조사찾기 의뢰시 무료로 견적을 드립니다.</Text.FontSize20>
                </Content>
              </Container>
            </Tab>
            <Tab>
              <Container>
                <SmallBanner>
                  <Text.FontSize32>제조 패키지</Text.FontSize32>
                </SmallBanner>
                <Content>
                  <Text.FontSize26>빅데이터를 기반한 제품분석시스템으로 제품 생산에<br/><span>불필요한 과정을 방지하여 양산 비용을 최대 40% 절감</span>합니다.</Text.FontSize26>
                </Content>
              </Container>
            </Tab>
            <Tab>
              <Container>
                <SmallBanner>
                  <Text.FontSize32>제품 수배 패키지</Text.FontSize32>
                </SmallBanner>
                <Content>
                  <Text.FontSize26>볼트앤너트가 국내 제조사와 해외유통사 네크워크를 통해<br/><span>원하는 조건에 맞는 제조견적, MOQ(최소발주수량) 등의 정보를 전달</span>해드립니다.</Text.FontSize26>
                  <Text.FontSize18>*원주인의 허락 없이 국내에 있는 제품 금형을 찾아 사출 발주를 넣는 요청은 수행하지 않습니다.</Text.FontSize18>
                </Content>
              </Container>
            </Tab>
            
          </Tabs>
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
  outline : none ;
  *:focus {outline:none;}
  @media (min-width: 0px) and (max-width: 767.98px) {

  }
  @media (min-width: 768px) and (max-width: 991.98px) {

  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 

  }
  @media (min-width: 1300px) { 

  }
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

const UnderLine = styled.div`
  background-color: #707070;
  width: 500px;
  height: 1px;
  margin-top: 23px;
`;

const UnderLineBox = styled.div`
  background-color: #0933b3;
  width: 100%;
  height: 12px;
  margin-top: 12px;
  justify-content: center;
  align-items: center;
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
