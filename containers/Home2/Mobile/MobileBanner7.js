import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Slider from 'react-slick';
// import SliderWrapper from "./SliderStyle";
import SliderMain from '.././MobileSliderContent';
import Fade from 'react-reveal/Fade';
const pic1 = 'static/images/Home/Mobile/MobileBanner7/pic1.png';
const pic2 = 'static/images/Home/Mobile/MobileBanner7/pic2.png';
const pic3 = 'static/images/Home/Mobile/MobileBanner7/pic3.png';


class MobileBanner7Container extends React.Component {
    state = {
        current: 0,
        next: true,
        prev: false,
        show: 'visible',
        progress: 0,
        display: 0
    }

    content(idx) {
        if (idx == 0) {
            return (
              <>
                  <TextContainer>
                      <Head>Step 1</Head>
                      <Main>파트너 신청</Main>
                      <Foot>회사소개서, 주요기술이력서 등을 통해
                          파트너의 전문성을 검토하고, 파트너 검증
                          키트를 통해 가격경쟁력을 파악합니다.</Foot>
                  </TextContainer>

              </>
            )
        }
        if (idx == 1) {
            return (
              <>
                  <TextContainer>
                      <Head>Step 2</Head>
                      <Main>파트너 실사</Main>
                      <Foot>볼트앤너트 시니어 컨설턴트가 제출받은
                          검토 자료를 기반으로 6종의 정량 평가를
                          실시하여 협업 및 소통능력을 검증합니다.</Foot>
                  </TextContainer>
              </>
            )
        }
        if (idx == 2) {
            return (
              <>
                  <TextContainer>
                      <Head>Step 3</Head>
                      <Main>프로젝트 상세 검증</Main>
                      <Foot>볼트앤너트 측에서 테스트 프로젝트 발주를
                          통해 제조사의 품질과 납기를 검증하고
                          볼트앤너트 프로세스를 교육합니다.</Foot>
                  </TextContainer>
              </>
            )
        }
    }

    sliderNext = () => {
        const {current, progress} = this.state;
        const fullfage = 2;
        if (current != fullfage) {
            const newPage = current + 1;
            if (progress < 200) {
                this.setState({...this.state, current: newPage, progress: progress + 100, show:'hidden', display: newPage});
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
                this.setState({...this.state, progress: progress - 100, current: newPage, show:'hidden', display: newPage});
            }
            setTimeout(() => {this.setState({...this.state, show:'visible'})}, 600)
            this.slider.slickPrev();
        }
    }

    render() {
        const { current, show, display1, display2, display3} = this.state;
        const left = 'static/images/Home/Mobile/MobileBanner7/prev.png';
        const right = 'static/images/Home/Mobile/MobileBanner7/next.png';

        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            arrows: false,
            slidesToShow: 1,
            draggable: false,
            swipe: false,
            slidesToScroll: 1,
            appendDots : dots => <ul> {dots}</ul>,
        };
        return (
          <Background backgroundColor= {"#a4aab4"}>
              <CustomContainer>
                  <Fade bottom>
                      <Header>
                          볼트앤너트 3단계 검증 프로세스로 <br/>검증된 제품 전문가를 만나보세요.
                      </Header>
                      <ContainerBanner6>
                          <div>
                              {
                                  current == 0 ? (
                                    <img src={left} onClick = {this.sliderPrev} style={{opacity: 0.3, visibility: this.state.show}}/>
                                  ) : (
                                    <img src={left} onClick = {this.sliderPrev} style={{visibility: this.state.show}}/>
                                  )
                              }
                          </div>
                          <SliderWraper>
                              <Slider {...settings} ref={slider => (this.slider = slider)}>
                                  <SliderMain src={ pic1 }/>
                                  <SliderMain src={ pic2 }/>
                                  <SliderMain src={ pic3 }/>
                              </Slider>
                          </SliderWraper>
                          <div>
                              {
                                  current == 2 ? (
                                    <img src={right} onClick = {this.sliderNext} style={{opacity: 0.3, visibility: this.state.show}}/>
                                  ) : (
                                    <img src={right} onClick = {this.sliderNext} style={{visibility: this.state.show}}/>
                                  )
                              }
                          </div>
                      </ContainerBanner6>
                      {this.content(this.state.display)}
                  </Fade>
              </CustomContainer>
          </Background>
        );
    }
}

export default MobileBanner7Container;

const SliderWraper = styled.div`
  width: 243px;
  height: 128px;
  .slick-dots li button:before {
    color: #0933b3;
    -webkit-transform: scale(0.5);
  }
  .slick-dots li {
    width:10px;
  }
`
const CustomContainer = styled(Containerv1)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled(Title.FontSize56)`
    height: 62px;
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  letter-spacing: -0.55px;
  margin-top: 100px;
  text-align: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 23px;
  }
`
const ContainerBanner6 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 46px;
`
const Head = styled(Title.FontSize24)`
    height: 20px;
  color: #0933b3;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  white-space: pre-line;
  text-align: left;
  margin-top: 20px;
  margin-bottom: 4px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
  }
;
`
const Main = styled(Title.FontSize32)`
    height: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.35px;
  text-align: left;
  color: #333742;
  white-space: pre-line;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
  }
`
const Foot = styled(Title.FontSize24)`
  margin: 6px 0px 100px 0px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.38px;
  text-align: left;
  white-space: pre-line;
  color: #f6f6f6;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
  }
`
const TextContainer = styled.div`
  margin-top: 36px;
  width: 284px;
  text-align: left;
`
