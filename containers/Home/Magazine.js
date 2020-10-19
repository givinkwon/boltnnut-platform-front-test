import React from 'react'
import styled, {css} from 'styled-components'
import Slider from "react-slick";
import Router from 'next/router';
import Container from 'components/Container'
import RatioImage from 'components/RatioImage'
import * as Text from 'components/Text'
import { BLACK1, DARKGRAY } from 'static/style'
import {inject, observer} from "mobx-react";
import DOMPurify from 'dompurify';

const search_ic = 'static/icon/search.png'
const right = "/static/images/main/main_right.png";
const left = "/static/images/main/main_left.png";
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

@inject('Home')
@observer
class MagazineContainer extends React.Component {
  pushToDetail = async (id) => {
    const {Magazine} = this.props;
    await Router.push(`/magazine/${id}`);
    Magazine.setCurrent(id);
  }

  state = {
    idx: 0,
    current: 1,
    next: true,
    prev: false,
  }
  slider = null
  afterChangeHandler = (current) => {
    const magazineCount = this.props.Home.magazine_list.length
    if(current === 1){
      this.setState({next: true, prev: false})
    }
    else {
      // slidesToShow : 2
      if(current+2 === magazineCount/2) {
        this.setState({next: false, prev: true})
      }
      else {
        this.setState({next: true, prev: true})
      }
    }

  }
  sliderNext = () => {
    const magazineCount = this.props.Home.magazine_list.length
    if(this.state.idx+1 !== magazineCount/2) {
      this.state.idx++;
      this.slider.slickNext()
    }
  }
  sliderPrev = () => {
    if(this.state.current === 0) {
      this.setState({ prev: false,  next: true })
    }
    else {
      this.setState({ prev: true })
    }
    this.state.idx--;
    if(this.state.idx<0){
      this.state.idx = 0;
    }
    this.slider.slickPrev()
  }

  render() {
    const data = this.props.Home.magazine_list
    const request_data = this.props.Home.request_list
    const magazineCount = this.props.Home.magazine_list.length
    const { prev, next } = this.state
    const {idx} = this.state

    var settings = {
      dots: false,
      infinite: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      draggable: false,
      swipe: false,
      beforeChange: (current) => {
        this.setState({current: current})
      },
    };
    var settings2 = {
      dots: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      draggable: false,
      swipe: false,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      beforeChange: (current) => {
        this.setState({current: current})
      },
    };
    var settings3 = {
      dots: false,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      draggable: false,
      swipe: false,
      autoplay: true,
      autoplaySpeed: 2000,
      vertical: true,
      arrows: false,
      beforeChange: (current) => {
        this.setState({current: current})
      },
    };
    return (
    <CustomContainer>
      <ArrowContainer>
        <LeftArrow src={left} onClick = {this.sliderPrev}/>
      </ArrowContainer>
      <FindExperct>
        <MagazineBox>
          <Header>
            <Text.FontSize30 color={"#0a2165"} fontWeight={700}>매거진</Text.FontSize30>
          </Header>
          <List>
            <Slider {...settings} ref={slider => (this.slider = slider)} afterChange={this.afterChangeHandler}>
                    {
                      data.map(() => {
                        return(
                          <ItemBox>
                            <Item>
                              <Image ratio='45%' src={data[idx*2].image} onClick={() => this.pushToDetail(data[idx*2].id)}/>
                              <TextBox>
                                <div class="Header">
                                  {data[idx*2].title}
                                </div>
                                <div class="Body" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data[idx*2].content.substring(0,350), {ALLOWED_TAGS:['p']})}}>
                                  {/*{item.content.replace(/(<([^>]+)>)/ig,"").split('&nbsp;')[4]}*/}
                                </div>
                                <p> ... </p>
                              </TextBox>
                            </Item>
                            <Item>
                              <Image ratio='45%' src={data[idx*2+1].image} onClick={() => this.pushToDetail(data[idx*2].id)}/>
                              <TextBox>
                                <div class="Header">
                                  {data[idx*2+1].title}
                                </div>
                                <div class="Body" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data[idx*2+1].content.substring(0,350), {ALLOWED_TAGS:['p']})}}>
                                </div>
                                <p> ... </p>
                              </TextBox>
                            </Item>
                          </ItemBox>
                        )
                      })
                    }

            </Slider>
          </List>
        </MagazineBox>
        <RightArrowContainer>
        {/*edit */}
        {(this.state.idx*2 + 4) < magazineCount ? <RightArrow src={right} onClick = {this.sliderNext}/> : <RightArrow/>}
        </RightArrowContainer>
        <RequestBox>
          <Header>
            <Text.FontSize30 color={"#0a2165"} fontWeight={700}>실시간 의뢰 건 리스트</Text.FontSize30>
          </Header>
          <Middle>
            제조 파트너사 등록 수 <span class="Bold">3900</span>  프로젝트 수 <span class="Bold">1300</span>
          </Middle>
          <RequestItemBox>
            <RequestList>
            <Slider {...settings3} ref={slider => (this.slider = slider)} afterChange={this.afterChangeHandler}>
              {
                request_data.slice(0,20).map((item, idx) => {
                  return (
                    <RequestItem styled={{justifyContent: "center", alignItems: "center"}}>
                      {item.name.split(':')[0]} 의뢰가 접수되었습니다.
                    </RequestItem>
                  )
                })
              }
            </Slider>
            </RequestList>
            <ImageList>
                <Slider {...settings2} ref={slider => (this.slider = slider)} afterChange={this.afterChangeHandler}>
                      <RequestImage src={image1}/>
                      <RequestImage src={image2}/>
                      <RequestImage src={image3}/>
                      <RequestImage src={image4}/>
                      <RequestImage src={image5}/>
                      <RequestImage src={image6}/>
                      <RequestImage src={image7}/>
                      <RequestImage src={image8}/>
                      <RequestImage src={image9}/>
                      <RequestImage src={image10}/>
                      <RequestImage src={image11}/>
                      <RequestImage src={image12}/>
                      <RequestImage src={image13}/>
                      <RequestImage src={image14}/>
                      <RequestImage src={image15}/>
                      <RequestImage src={image16}/>
                      <RequestImage src={image17}/>
                      <RequestImage src={image18}/>
                      <RequestImage src={image19}/>
                      <RequestImage src={image20}/>
                      <RequestImage src={image21}/>
                      <RequestImage src={image22}/>
                      <RequestImage src={image23}/>
                      <RequestImage src={image24}/>
                      <RequestImage src={image25}/>
                      <RequestImage src={image26}/>
                      <RequestImage src={image27}/>
                      <RequestImage src={image28}/>
                      <RequestImage src={image29}/>






                </Slider>
            </ImageList>
          </RequestItemBox>
        </RequestBox>
      </FindExperct>
  </CustomContainer>
    )
  }
}

export default MagazineContainer;

const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  height: 100%;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: inline-flex;
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
const ArrowContainer = styled.div`
  position : relative;
  width: 19px;
  padding-right: 30px;
  height: 100%;
`

const RightArrowContainer = styled.div`
  position : relative;
  width: 19px;
  padding-left: 30px;
  margin-right: 50px;
  height: 100%;
`
const FindExperct = styled(Container)`
  @media (min-width: 0px) and (max-width: 767.98px) {
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
    width: 1200px;
    height: 662px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0px;
    margin: 0;
  }
`
const List = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 30px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 30px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    margin-top: 11px;
  }
  @media (min-width: 1300px) {
    margin-top: 11px;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
`
const Middle = styled.div`
  width: 420px;
  height: 29px;
  object-fit: contain;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.5px;
  text-align: left;
  color: #191919;
  margin-top: 13px;
  .Bold {
    font-weight: 500;
    color: #0933b3;
  }
`
const Icon = styled.img`
  cursor: pointer;
  width: 40px;
  height: 40px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 30px;
    height: 30px;
  }
  ${props => props.prev && css`
    transform: rotate(180deg);
  `}
`

const ItemBox = styled.a`
  display: block;
  flex-direction: column;
  width: 727px;
  :focus {
    outline: none;
  }
  text-decoration: none;
`
const Item = styled.div`
  width: calc(100% + 10)px;
  display: flex;
  > p {
    text-align: center;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    > p {
      margin-top: 20px;
    }
  }
  @media (min-width: 768px) {
    > div {
      display: flex;
      }
    padding-bottom: 45px;
    height: 240px;
  }
`
const Image = styled(RatioImage)`
  cursor: pointer;
  border-radius: 25px;
  width: calc(100% - 15px);
  @media (min-width: 0px) and (max-width: 767.98px) {
    border-radius: 15px;
    max-width: 400px;
    :hover {
      border-radius: 15px;
      opacity: 0.4;
      > div {
        border-radius: 15px;
        transform: scale(1.2);
      }
    }
  }
  > div {
    transition: 0.4s;
  }
  
  :hover {
    border-radius: 25px;
      opacity: 0.4;
    > div {
      border-radius: 25px;
      transform: scale(1.2);
    }
  }
`
const MagazineBox = styled.div`
  width: 730px;
  height: 100%;
  flex-direction: column;
`
const TextBox = styled.div`
  flex-direction: column;
  .Header {
  width: 385px;
  height: 70px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 26px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 700;
  line-height: 1.31;
  letter-spacing: -0.65px;
  text-align: left;
  color: #191919;
  margin-left: 10px;
  }
  .Body {
  margin-left: 10px;
      width: 377px;
      overflow: hidden;
  height: 150px;
  object-fit: contain;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.38px;
  text-align: left;
  color: #767676;
  }
`
const LeftArrow = styled(RatioImage)`
  position : absolute;
  bottom : 50%;
  right : 20%;
  cursor: pointer;
  margin-right: 40px;
  width: 19px;
  height: 32px;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
    background-position = right;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-right: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-right: 10px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`
const RightArrow = styled(RatioImage)`
  position : absolute;
  bottom : 50%;
  left : 20%;
  cursor: pointer;
  width: 19px;
  height: 32px;
  object-fit: contain;
  > div {
    background-size: contain;
    background-repeat: no-repeat;
    background-position = right;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 10px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
    margin-right: 50px;
    margin-left: 20px;
  }
`
const RequestBox = styled.div`
  width: 384px;
  height: 100%;
  flex-direction: column;
`
const RequestItemBox = styled.div`
  width: 384px;
  height: 510px;
`
const RequestList = styled.div`
  width: 384px;
  height: 400px;
  overflow: hidden;
  pointer-events: none;
  .slick-list{
    > div {
      > div {
        > div > div {
          display: flex !important;
        }
      }
    }
  }
`
const RequestItem = styled.div`
  width: 384px;
  height: 63px;
  background-color: #f3f4f8;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
  text-align: center;
  align-items: center;
  justify-content: center;
  color: #767676;
  margin-top: 22px;
`
const RequestImageContainer = styled.div`
  width: 104px;
  height: 104px;
  text-align: center;
  align-items: center;
  justify-content: space-evenly;
`
const ImageList = styled.div`
  text-align: center;
  align-items: center;
  justify-content: space-evenly;
  display: inline;
  .slick-list {
    height: 104px;
    margin-top: 10px;
  }
`
const RequestImage = styled(Image)`
  width: 104px;
  height: 104px;
`
