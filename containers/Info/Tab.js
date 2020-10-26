import React from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";

import Container from "components/Container";
import * as Text from "components/Text";
import { WHITE, PRIMARY, BLACK } from "static/style";
import RatioImage from 'components/RatioImage'

const right = "/static/images/main/main_right.png";
const left = "/static/images/main/main_left.png";

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
  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }
  afterChangeHandler = (current) => {
    const magazineCount = this.props.Magazine.magazine_list.length

    if(current === 0){
      this.setState({next: true, prev: false})
    }
    else {
      // slidesToShow : 2
      if(current === magazineCount - 2) {
        this.setState({next: false, prev: true})
      }
      else {
        this.setState({next: true, prev: true})
      }
    }

  }
  sliderNext = () => {
    const breakpoint = this.slider1.state.breakpoint
    this.slider1.slickNext()
  }
  sliderPrev = () => {
    if(this.state.current === 0) {
      this.setState({ prev: false,  next: true })
    }
    else {
      this.setState({ prev: true })
    }
    this.slider1.slickPrev()
  }
  slider = null
  state = {
    current: 1,
    next: true,
    prev: false,
  }
  render() {
    const { tab } = this.props;
    const { prev, next} = this.state

    return (
      <Container>
        <TabsContainer>
          <Tabs asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={3}
            focusOnSelect={true}>
            <Tab class="Header" active={tab === 1} onClick={() => this.setTab(1)} >
              <Text.FontSize40 fontWeight={500}>견적/수량 도출 서비스</Text.FontSize40>
            </Tab>
            <Tab class="Header" active={tab === 2} onClick={() => this.setTab(2)}>
              <Text.FontSize40 fontWeight={500}>양산/개발 서비스</Text.FontSize40>
            </Tab>
            <Tab class="Header" active={tab === 3} onClick={() => this.setTab(3)}>
              <Text.FontSize40 fontWeight={500}>제조사 찾기 서비스</Text.FontSize40>
            </Tab>
          </Tabs>
          <Icon prev style={{marginRight : '15px', opacity: prev ? 1 : 0.4}} src={left} onClick={this.sliderPrev}/>
          <Tabs asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}>
            <Tab>
              <Container>
                <SmallBanner>
                  <Text.FontSize32>견적/수량 도출 서비스</Text.FontSize32>
                </SmallBanner>
                <Content>
                  <Text.FontSize26>볼트앤너트가 국내 제조사와 해외유통사 네크워크를 통해 원하는 조건에 맞는<br/>제조견적, MOQ(최소발주수량) 등의 정보를 전달해드립니다.</Text.FontSize26>
                  <Text.FontSize20>원주인의 허락 없이 국내에 있는 제품 금형을 찾아 사출 발주를 넣는 요청은 수행하지 않습니다.</Text.FontSize20>
                </Content>
              </Container>
            </Tab>
            <Tab>
              <Container>
                <SmallBanner>
                  <Text.FontSize32>양산/개발 서비스</Text.FontSize32>
                </SmallBanner>
                <Content>
                  <Text.FontSize26>고객이 진행 상황에 대해  정확히 파악하고 소통할 수 있도록 지속적인<br/>커뮤니케이션과 혁신적인 제품 분석 시스템으로 제품 생산에 불필요한 과정을 방지하여<br/>양산 비용을 최대 40% 절감합니다.</Text.FontSize26>
                </Content>
              </Container>
            </Tab>
            <Tab>
             <Container>
                <SmallBanner>
                  <Text.FontSize32>제조사 찾기 서비스</Text.FontSize32>
                </SmallBanner>
                <Content>
                  <Text.FontSize26>제조 컨설턴트와 전문 제조사가 고객님의 아이디어를<br/>컨설팅해 드리고 현실화 시켜드립니다.</Text.FontSize26>
                </Content>
              </Container>
            </Tab>
          </Tabs>
          <Icon style={{marginLeft : '15px', opacity: next ? 1 : 0.4}} src={right} onClick={this.sliderNext}/>
         </TabsContainer>
       </Container>

    );
  }
}

export default TabConatiner;

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
  margin-top: 30px;
  display: flex;

  .slick-list {
   width : 100% ; 
  }
  .slick-current {
    border-bottom : 4px;
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
  width: 10x;
  height: 17px;
  
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
      letter-spacing: -0.5px;
      line-height: 1.73;
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
  padding: 15px 0px;
  ${(props) =>
    props.active &&
    css`
      /* background-color: ${PRIMARY}; */
      > p {
        /* color: ${WHITE}; */
      }
    `}
`;
const TabDetail = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  > p {
    color: #${BLACK};
  }
  padding: 15px 0px;
  ${(props) =>
    props.active &&
    css`
      /* background-color: ${PRIMARY}; */
      > p {
        color: ${WHITE};
      }
    `}
`;
