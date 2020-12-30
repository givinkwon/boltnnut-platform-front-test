import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Slider from 'react-slick';
// import SliderWrapper from "./SliderStyle";
import SliderMain from './SliderContent';

class Banner6Container extends React.Component {
  state = {
    current: 0,
    next: true,
    prev: false,
    show: 'visible',
    progress: 0,
  }
  buttonClick = (e) => {
    const newPage = e.target.innerText*1;
    this.setState({...this.state, current: newPage-1, progress: newPage*100-100});
    this.slider.slickGoTo(newPage-1);
  }
  sliderNext = () => {
    const {current, progress} = this.state;
    const fullfage = 2;
    if (current != fullfage) {
      const newPage = current + 1;
      if (progress < 200) {
        this.setState({...this.state, current: newPage, progress: progress + 100, show:'hidden'});
      }
      setTimeout(() => {this.setState({...this.state, show:'visible'})}, 600)
      this.slider.slickNext();
    }
  }
  sliderPrev = () => {
    const {current, progress} = this.state;
    if (current != 0) {
      const newPage = current - 1;
      if (progress > 0) {
        this.setState({...this.state, progress: progress - 100, current: newPage, show:'hidden'});
      }
      setTimeout(() => {this.setState({...this.state, show:'visible'})}, 600)
      this.slider.slickPrev();
    }
  }
  render() {
    const left = 'static/images/Home/Banner6/prev.png';
    const right = 'static/images/Home/Banner6/next.png';
    console.log(this.state.progress);
    let progress = String(this.state.progress) + "%";
    let progress2 = "0%";
    if (this.state.progress > 100) {
      for (let i = 1; i < 101; i++) {
        progress2 = String(i) + "%";
      }
    }
    var circleColor = "gray";
    var circleColor2 = "gray";
    if (this.state.progress >= 100) {
      circleColor = "#0933b3";
    };
    if (this.state.progress >= 200) {
      circleColor2 = "#0933b3";
    }
    const item1 = {
      headContent: "Step 1",
      mainContent: "파트너 신청",
      footContent: "회사소개서, 주요기술이력서 등 \n 전문성을 알 수 있는 자료와 프로젝트 \n 가견적 데이터를 통해 합리적 \n 견적 여부를 파악합니다."
    };
    const item2 = {
      headContent: "Step 2",
      mainContent: "파트너 신청",
      footContent: "회사소개서, 주요기술이력서 등 \n 전문성을 알 수 있는 자료와 프로젝트 \n 가견적 데이터를 통해 합리적 \n 견적 여부를 파악합니다."
    };
    const item3 = {
      headContent: "Step 3",
      mainContent: "파트너 신청",
      footContent: "회사소개서, 주요기술이력서 등 \n 전문성을 알 수 있는 자료와 프로젝트 \n 가견적 데이터를 통해 합리적 \n 견적 여부를 파악합니다."
    };
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      arrows: false,
      slidesToShow: 1,
      draggable: false,
      slidesToScroll: 1,
    };
    return (
      <Background backgroundColor= {"#a4aab4"}>
        <CustomContainer>
          <Header>
            볼트 앤 너트 검증 서비스를 통해, <br/>검증된 제품 전문가를 만나보세요.
          </Header>
          <ContainerBanner6>
            <div><img src={left} onClick= {this.sliderPrev}/></div>
            <SliderWraper>
              <Slider {...settings} ref={slider => (this.slider = slider)}>
                <SliderMain item={ item1 } imgSrc={left}/>
                <SliderMain item={ item2 } imgSrc={left}/>
                <SliderMain item={ item3 } imgSrc={left}/>
              </Slider>
            </SliderWraper>
            <div><img src={right} onClick= {this.sliderNext}/></div>
          </ContainerBanner6>
          <ItemBox>
            <SubContainer>
              <TableCellContainer>
                <ContentBox>
                  <TableCellContainer>
                    <Circle onClick= {this.buttonClick} value= {1} backgroundColor={"#0933b3"}>
                      <span>
                        <CircleFont>1</CircleFont>
                      </span>
                    </Circle>
                  </TableCellContainer>
                </ContentBox>
                <ContentBox>
                  <TableCellContainer>
                    <Circle onClick= {this.buttonClick} value= {2} backgroundColor={ circleColor }>
                      <span>
                        <CircleFont>2</CircleFont>
                      </span>
                    </Circle>
                  </TableCellContainer>
                </ContentBox>
                <ContentBox width={'0px'}>
                  <TableCellContainer>
                    <Circle onClick= {this.buttonClick} value= {3} backgroundColor={ circleColor2 }>
                      <span>
                        <CircleFont>3</CircleFont>
                      </span>
                    </Circle>
                  </TableCellContainer>
                </ContentBox>
              </TableCellContainer>
            </SubContainer>
            <SubContainer>
              <TableCellContainer>
                <Line>
                  <LineProgress progressWidth={ progress }/>
                </Line>
                <Line>
                  <LineProgress progressWidth={ progress2 }/>
                </Line>
              </TableCellContainer>
            </SubContainer>
          </ItemBox>
        </CustomContainer>
      </Background>
    );
  }
}

export default Banner6Container;

const SliderWraper = styled.div`
  width: 1090px;
  height: 669px;
`
const CustomContainer = styled(Containerv1)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled(Title.FontSize56)`
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: normal;
  letter-spacing: -1.4px;
  margin-top: 100px;
`
const ContainerBanner6 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const ItemBox=styled.div`
  position: relative;
  width: 804px;
  // border: 1px solid black;
  height: 80px;
  margin-bottom: 90px;
`

const SubContainer=styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: table;
  font-size: 0; /* div 사이의 간격을 없애기 위해서 씀*/
`

const TableCellContainer=styled.div`
  display: table-cell;
  vertical-align: middle;
`

const ContentBox=styled.div`
  display:inline-flex;
  aligh-items:center;
  width: calc(100% /2);
  width: ${(props) => (props.width? props.width : "calc(100%/2)")};
  position: relative;
`

const Circle=styled.div`
  font-size: 18px;
  width: 34px;
  height: 34px;
  background-color: ${(props) => (props.backgroundColor? props.backgroundColor : "gray")};
  color: white;
  border-radius: 20px;
  line-height: 20px;
  text-align: center;
  display: block;
  z-index: 100;
  position: relative; /* z-index는 relative 등의 특정 포지션에서만 작동함 */
  // float: right;
  transform: translateX(-10px); /* 반지름만큼 */

  >span{
     position:absolute;
     transform: translate(-5px,5px); /* 반지름만큼 */
  }
`

const Line = styled(ContentBox)`
  height:4px;
  background-color: gray;
  width: calc(100% / 2);
  z-index: 1;
  position: relative;
`
const LineProgress = styled(ContentBox)`
  background-color: #0933b3;
  width: ${(props) => (props.progressWidth)};
  z-index: 0;
  position: relative;
`
const CircleFont=styled(Title.FontSize18)`
   color:white;
   font-weight:500;
`
