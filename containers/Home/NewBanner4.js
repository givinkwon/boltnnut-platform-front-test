import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";

import Button from "components/Button";
import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'
import * as AnswerAPI  from 'axios/Answer'

const search_ic = "static/icon/search.png";
const image1 = "/static/images/logo/TAJO.png";
const image2 = "/static/images/logo/logo_29.png";
const image3 = "/static/images/logo/logo_11.png";
const image4 = "/static/images/logo/logo_17.png";

const star_yellow_img = "/static/images/main/star_yellow.png";
const star_gray_img = "/static/images/main/star_gray.png";
const arrow = "/static/images/main/[M]chevron_down_gray.png"

class NewBanner4Container extends React.Component {
  state = {
    current: 0,
    next: true,
    prev: false,
    show: true
  };

  afterChangeHandler = (current) => {
    if(current === 0){
      this.setState({next: true, prev: false})
    }
    else {
      // slidesToShow : 2
      if(current === 1) {
        this.setState({next: false, prev: true})
      }
      else {
        this.setState({next: true, prev: true})
      }

    console.log(this.state.current)
    }
  }

  sliderNext = () => {
    const breakpoint = this.slider.state.breakpoint
    const newPage = this.state.current + 1

    this.setState({current: newPage})

    if (window.innerWidth > 992) {
      this.setState({show: "hidden"})
      setTimeout(() => {this.setState({show: 'visible'})}, 500)
      //this.setState({show: 'visible'})
    }

    this.slider.slickNext()
  }

  sliderPrev = () => {
    if(this.state.current === 0) {
      this.setState({ prev: false,  next: true })
    }
    else {
      this.setState({ prev: true })
    }
    this.slider.slickPrev()
  }

  opacitySelector = (idx) => {
    if ( typeof window !== "undefined" && window.innerWidth > 992) {
    if ( (this.state.current+2) % 4 == idx) {
        return 0.6
    }
    else {
        return 1
    }
  }
  }

  render() {
    const {prev, next, current} = this.state;

    var settings = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      vertical: true,
      arrows: false,
      speed: 400,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            vertical: false
          },
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true,
            vertical: false
          }
        },
      ]
    }
    return (
    <CustomContainer>
      <Container>

        <HeaderBox>
          <Header2>볼트앤너트 클라이언트분들의 <Bold> <span class="line">실제 후기</span></Bold>를 들어보세요.</Header2>
        </HeaderBox>

        <BodyBox>
                <List>
                  <Slider {...settings} ref={slider => (this.slider = slider)} afterChange={this.afterChangeHandler}>
                      <div class="Item">
                      <Item style = {{opacity: this.opacitySelector(0)}}>
                        <CommentBox>
                          <Image src={image3} />
                          <TextBox>
                          <HeaderWrapper>
                            <div class="CommentHeader">
                              <p> HClab </p>
                            </div>
                            <div class="CommentStar">
                              <Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/>
                            </div>
                          </HeaderWrapper>
                          <HeaderWrapper>
                            <div class="CommentBody">
                              <p> 제품 제조에 처음 도전한 저희는 제품을 개발해줄 개발업체를 찾느라 한 달 이상 애를 먹고 있었어요. <br/> 볼트앤너트 덕에 더 이상 시간을 낭비하지 않아도 되었답니다. </p>
                            </div>
                          </HeaderWrapper>
                         </TextBox>
                        </CommentBox>
                      </Item>
                      </div>

                      <div class="Item">
                      <Item style = {{opacity: this.opacitySelector(1)}}>
                        <CommentBox>
                          <Image src={image2} />
                            <TextBox>
                              <HeaderWrapper>
                                <div class="CommentHeader">
                                  <p> 아이오펫 </p>
                                </div>
                                <div class="CommentStar">
                                  <Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/>
                                </div>
                              </HeaderWrapper>
                              <HeaderWrapper>
                                <div class="CommentBody">
                                  <p> 기존거래처에서 받은 조건이 찜찜해도 다른 방법이 없었는데 볼트앤너트를 통해 업체들을 추천 받아 비교해볼 수 있었고
                                       더 나은 조건의 업체와 계약하게 되었습니다.  </p>
                                </div>
                              </HeaderWrapper>
                            </TextBox>
                          </CommentBox>
                        </Item>
                        </div>

                        <div class="Item">
                        <Item style = {{opacity: this.opacitySelector(2)}}>
                          <CommentBox>
                            <Image src={image4} />
                              <TextBox>
                                <HeaderWrapper>
                                  <div class="CommentHeader">
                                    <p> MANU </p>
                                  </div>
                                  <div class="CommentStar">
                                    <Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/>
                                  </div>
                                </HeaderWrapper>
                                <HeaderWrapper>
                                  <div class="CommentBody">
                                    <p> 업체를 고를 때 개발을 진행하는 마인드와 포트폴리오를 가장 중요하게 생각하는데 볼트앤너트가 모두 제공해줘서
                                        편리했습니다.</p>
                                  </div>
                                </HeaderWrapper>
                              </TextBox>
                          </CommentBox>
                      </Item>
                      </div>

                      <div class="Item">
                      <Item style = {{opacity: this.opacitySelector(3)}}>
                          <CommentBox>
                            <Image src={image1} />
                              <TextBox>
                                <HeaderWrapper>
                                  <div class="CommentHeader">
                                    <p> TAJO </p>
                                  </div>
                                  <div class="CommentStar">
                                    <Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/><Star src={star_yellow_img}/>
                                  </div>
                                </HeaderWrapper>
                                <HeaderWrapper>
                                  <div class="CommentBody">
                                    <p> 제조 양산 프로세스를 모르다 보니 시행착오가 많았는데 볼트앤너트 측에서 PM 업무를 수행하여
                                         제품을 성공적으로 양산할 수 있었습니다. </p>
                                  </div>
                                </HeaderWrapper>
                              </TextBox>
                          </CommentBox>
                      </Item>
                    </div>
                  </Slider>
                </List>
        </BodyBox>
        <FooterBox>
          <div class="Image" style={{visibility: this.state.show}}>
                <Arrow src={arrow} onClick = {this.sliderNext}/>
          </div>
        </FooterBox>
    </Container>
  </CustomContainer>
    );
  }
}

export default NewBanner4Container;

const W100 = styled.div`
  width: 100%;
`
const W50 = styled.div`
  align-items: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    text-align: center !important;
  }
  @media (min-width: 768px) {
    width: 50%;
  }
`

const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  height: 100%;
  margin-right: 0;
  margin-left: 0;
  align-items: center;
  background-color: #061953; !important;;
  flex-direction: column;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
    height: 600px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
    height: 600px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  align-items: center;
  width: 100%;
  background-color: #061953;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 720px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 930px;
  }

  @media (min-width: 1300px) {
    width: 1400px;
  }
`
const List = styled.div`
  width : 100%;
  height : 100%;
  padding-top : 0px;
  .Item {
    outline: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 0px;
    .slick-list {
    text-align : center;
    height:320px;
    }
    .slick-arrow slick-next{
     /* TODO */
    }
    ul.slick-dots {
      li button:before {
        content: '●';
        font-size: 16px;
        color: #ffffff;
        opacity: 0.2;
      }
      li.slick-active button:before {
        content: '●';
        font-size: 16px;
        color: #ffffff;
        opacity: 1;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 0px;
    .slick-list {
    text-align : center;
    height: 320px;
    }
    .slick-arrow slick-next{
     /* TODO */
    }
    ul.slick-dots {
      li button:before {
        content: '●';
        font-size: 16px;
        color: #ffffff;
        opacity: 0.2;
      }
      li.slick-active button:before {
        content: '●';
        font-size: 16px;
        color: #ffffff;
        opacity: 1;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    .slick-list {
    padding: 0px 0px 0px 0px;
    }
    margin-top : 0px;
  }
  @media (min-width: 1300px) {
    div.slick-list {
    !important height: 475px;
    }
    margin-top: 0px;
  }
`
const HeaderBox = styled.div`
  width: 100%;
  height: 100%;
  background-color:#061953;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 0px;
  :focus {
    outline: none;
  }
`
const BodyBox = styled.div`
  width: 100%;
  background-color: #061953;
  align-items: center;
  :focus {
    outline: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: row;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`
const FooterBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: #061953;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  :focus {
    outline: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 0px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 0px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`
const Item = styled.div`
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  display: inline-flex;
  justify-content: center;
  margin-bottom: 30px;
  > p {
    text-align: left;
  }
  > div{
    display: inline-flex
    }
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    height: 288px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 67px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    flex-direction: column;
    height: 288px;
    width: 552px;
    text-align: center;
    align-items: center;
    margin-bottom: 67px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`
const Image = styled(RatioImage)`
  width: 100%;
  height: 100%;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 180px;
    height: 100%;
    margin-left: 15px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 180px;
    height: 100%;
    margin-left: 15px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
    height: 100%;
    margin-left: 15px;
  }

  @media (min-width: 1300px) {
    width: 100%;
    height: 100%;
    margin-left: 20px;
  }
`
const Header2 = styled.span`
  width: 1000px;
  height: 59px;
  margin-bottom: 60px;
  font-family: NotoSansCJKkr;
  font-size: 40px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  margin-top: 100px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    height: 72px;
    font-family: NotoSansCJKkr;
    font-size: 21px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    margin-bottom: 45px;
    margin-top: 80px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 430px;
    height: 72px;
    font-family: NotoSansCJKkr;
    font-size: 32px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.25;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    margin-bottom: 45px;
    margin-top: 80px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`

 const Bold = styled.span`
  font-Weight : bold;
  font-family : NotoSansCJKkr;
  .line {
    border-bottom: 0.85px solid rgba(255, 192, 0, 0.6);
    box-shadow: inset 0 -16px 0 rgba(255, 192, 0, 0.6);

    @media (min-width: 0px) and (max-width: 767.98px) {
      border-bottom: 0.1px solid rgba(255, 192, 0, 0.6);
      box-shadow: inset 0 -16px 0 rgba(255, 192, 0, 0.6);
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      border-bottom: 0.1px solid rgba(255, 192, 0, 0.6);
      box-shadow: inset 0 -16px 0 rgba(255, 192, 0, 0.6);
    }
  }
`

const CommentBox = styled.div`
  max-width: 900px;
  width: 100%;
  height: 125px;
  border-radius: 22px;
  display: inline-flex;
  flex-direction: row;
  border: solid 1px #707070;
  background-color: #ffffff;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 100%;
    width: 80%;
    border-radius: 22px;
    border: solid 1px #707070;
    background-color: #ffffff;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  height: 158px;
  width: 100%;
  border-radius: 22px;
  border: solid 1px #707070;
  background-color: #ffffff;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
.CommentHeader {
  width: 70px;
  height: 24px;
  flex-direction: row;
  display: inline-flex;
  margin-top: 16px;
  margin-left: 25px;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #061953;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 24px;
    margin-top: 24px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 24px;
    margin-top: 24px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
}
.CommentStar {
  width: 90px;
  height: 24px;
  flex-direction: row;
  display: inline-flex;
  margin-top: 16px;
  margin-left: 25px;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #061953;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 24px;
    margin-left: 24px;
    visibility: hidden;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 24px;
    margin-left: 24px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
}
.CommentBody {
  width: 750px;
  height: 40px;
  margin-left: 25px;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: left;
  color: #707070;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 24px;
    margin-right: 30px;
    width: 100%;
    font-size : 13px !important;
    padding-right: 18px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 24px;
    margin-right: 30px;
    width: 100%;
    font-size: 12px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-right: 10px;
  }

  @media (min-width: 1300px) {
    margin-right: 10px;
  }
}
`
const TextBox = styled.div`
  max-width: 900px;
  width: 100%;
  height: 100%;
  display: inline-flex;
  border-radius: 22px;
  display: inline-flex;
  flex-direction: column;
  background-color: #ffffff;
`
const Arrow = styled(RatioImage)`
  cursor: pointer;
  width: 60px;
  height: 60px;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: none;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    display: none;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  margin-top: 30px;
  margin-bottom: 24px;
  }

  @media (min-width: 1300px) {
  margin-top: 30px;
  margin-bottom: 24px;
  }
}
`
const HeaderWrapper = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 70px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 70px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`

const Star = styled(RatioImage)`
  width: 100%;
  height: 22px;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 400px;
  }
`
