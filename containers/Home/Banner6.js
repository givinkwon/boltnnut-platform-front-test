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
    const { current } = this.state;
    const newPage = e.target.innerText*1;
    this.setState({...this.state, current: newPage-1});
    this.slider.slickGoTo(newPage-1)
  }
  sliderNext = () => {
    const {current, next} = this.state;
    const fullfage = 2;
    if (current != fullfage) {
      const newPage = current + 1
      this.setState({...this.state, current: newPage, show:'hidden'})
      setTimeout(() => {this.setState({...this.state, show:'visible'})}, 600)
      this.slider.slickNext();
    }

  }
  sliderPrev = () => {
    const {current, prev} = this.state;
    if (current != 0) {
      const newPage = current - 1
      this.setState({...this.state, current: newPage, show:'hidden'})
      setTimeout(() => {this.setState({...this.state, show:'visible'})}, 600)
      this.slider.slickPrev();
    }
  }
  // progressBar = () => {
  //   const { progress } = this.state;
  //
  // }
  render() {
    const left = 'static/images/Home/Banner6/prev.png';
    const right = 'static/images/Home/Banner6/next.png';
    const item1 = {
      headContent: "Step 1",
      mainContent: "파트너 신청",
      footContent: "회사소개서, 주요기술이력서 등 \n 전문성을 알 수 있는 자료와 프로젝트 \n 가견적 데이터를 통해 합리적 \n 견적 여부를 파악합니다."
    };
    const item2 = {
      headContent: "Step 2",
      mainContent: "ㅋㅋ",
      footContent: "xxxx"
    };
    const item3 = {
      headContent: "Step 3",
      mainContent: "ㅋㅋㅋㅋㅋㅋ",
      footContent: "zzz",
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
                    <Circle onClick= {this.buttonClick} value= {2}>
                      <span>
                        <CircleFont>2</CircleFont>
                      </span>
                    </Circle>
                  </TableCellContainer>
                </ContentBox>
                <ContentBox width={'0px'}>
                  <TableCellContainer>
                    <Circle onClick= {this.buttonClick} value= {3}>
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
                <Line/>
                <Line/>
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
  width: 1000px;
  height: 500px;
  
  .slick-dots li.slick-active button:before {
    color: #ffffff;
    width: 30px;
  }
  .ft-slick__dots--custom {
    height: 34px;
    width: 34px;
    background-color: #86888c;
    border-radius: 20px;
  }
  .slick-dots .slick-active .ft-slick__dots--custom {
    background-color: #ffffff;
  }
  .slick-next:before {
    color: #ffffff;
    
  }

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
   width: calc(100% / 2);
   background-color: ${(props) => (props.backgroundColor? props.backgroundColor : "gray")};
   z-index: 1;
   position: relative;
`

const CircleFont=styled(Title.FontSize18)`
   color:white;
   font-weight:500;
`
