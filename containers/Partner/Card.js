import React, {Component} from "react"
import styled from "styled-components"
import Router, { withRouter } from 'next/router'
import { inject, observer } from 'mobx-react'
import 'intersection-observer'; // polyfill
import Observer from "@researchgate/react-intersection-observer";

import * as Text from "components/Text"
import RatioImage from "components/RatioImage"

import ProfileInfoContainer from "ProfileInfo"

import {DARKGRAY, GRAY, PRIMARY} from "static/style"
const image1 = 'static/images/mask.png';
const dropdown = 'static/images/main/dropdown.png';

const jot1 = 'static/images/partner/jot1.png';
const jot2 = 'static/images/partner/jot2.png';
const jot3 = 'static/images/partner/jot3.png';
const jot4 = 'static/images/partner/jot4.png';
const jot5 = 'static/images/partner/jot5.png';
const sival = 'static/images/partner/arrow_up.png';

@inject('Partner')
@observer
class CardContainer extends Component {
  state = {
    showDrop: true,
    showDetail: 'none',
    width: 0,
  }

  static defaultProps = {
    observer: false,
    handleIntersection: function () {
      console.log('handleIntersection 함수를 전달해주세요')
    }
  }

  toDetail = () => {
    const { item } = this.props;
    this.props.Partner.detail = item
    Router.push(`/partner/${item.id}`)
  }

  detailDown = () => {
    const { showDrop, showDetail } = this.state;
    this.setState({showDrop: 'none', showDetail: true})
  }

  detailUp = () => {
    const { showDrop, showDetail } = this.state;
    this.setState({showDrop: true, showDetail: 'none'})
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  render() {
    const { item, observer, handleIntersection } = this.props;
    const { showDrop, showDetail, width } = this.state;
    console.log(item)

    const options = {
      onChange: handleIntersection,
    };

    if(item){
      console.log(item)
      return (
      <Card>
        <SummaryContainer>
          <Image src={item.logo}/>
          <TextBox>
            <div class="Header">
              {item.name}
            </div>
            <div class="Body">
              {item.info_company.substring(0,50)} ...
            </div>
            <div class="devbox">
            { width > 768 ? (
            <>
              {
                item.category.length > 0 && item.category.slice(0,4).map((item1,idx) => {
                  return (
                    <div class="develop">
                      {item1.category}
                    </div>
                  )
                })
              }
            </>
              ) : (
            <>
              {
                item.category.length > 0 && item.category.slice(0,3).map((item1,idx) => {
                  return (
                    <div class="develop">
                      {item1.category}
                    </div>
                  )
                })
              }
            </>
              )}
              {
                item.category.length > 5 && "..."
              }
            </div>
          </TextBox>
        </SummaryContainer>
        <div class="dropdown" style={{display: showDrop}}>
            <img src={dropdown} onClick = {this.detailDown}/>
        </div>
        <>
        { width > 768 ? (
      <>
        <DetailContainer style={{display: showDetail}}>
          <Detail1>
            <div class="detailInner">
              <div class="fuck">
                <img src={jot5} />
                <div class="text"> 전문분야 <br/> {item.category[0].category} <br/> ...</div>
              </div>
            </div>
            <div class="detailInner">
              <div class="fuck">
                <img src={jot3} />
                <div class="text"> 경력 <br/>15년 <br/> <br/> </div>
              </div>
            </div>
            <div class="detailInner">
              <div class="fuck">
                <img src={jot1} />
                <div class="text"> 보유기기 <br/> {item.id} <br/> <br/> </div>
              </div>
            </div>
            <div class="detailInner">
              <div class="fuck">
                <img src={jot4} />
                <div class="text"> 주재료 <br/> {item.id} <br/> <br/> </div>
              </div>
            </div>
            <div class="detailInner">
              <div class="fuck">
                <img src={jot2} />
                <div class="text"> 진행한 제품군 <br/> {item.product_history[0] && item.product_history[0].subclass} <br/> ... </div>
              </div>
            </div>
          </Detail1>
          <PortfolioContainer>
              <img src={jot1} />
              <img src={jot2} />
              <img src={jot3} />
          </PortfolioContainer>
          <div class="dropup">
            <img src={sival} onClick = {this.detailUp}/>
          </div>
        </DetailContainer>
      </>
      ) : (
        <DetailContainer style={{display: showDetail}}>
          <Detail1 style={{borderRadius: 0}}>
          </Detail1>
          <Detail1>
            <MobileDetail1 >
              <div class="title">
                전문분야
              </div>
              <div class="info" style={{borderLeft: "0.5px solid #d5d5d5", borderRight: "0.5px solid #d5d5d5"}}>
                경력
              </div>
              <div class="info" style={{borderRight: "0.5px solid #d5d5d5"}}>
                지역
              </div>
            </MobileDetail1>
            <MobileDetail1>
              <div class="title">
                주요실적
              </div>
              <div class="info" style={{textAlign: 'left'}}>
                삼선 전자 에어컨 프로젝트 개발 용역 수행
              </div>
            </MobileDetail1>
            <MobileDetail1>
              <div class="title">
                진행한 제품군
              </div>
              <div class="info" style={{textAlign: 'left'}}>
                삼선 전자 에어컨 프로젝트 개발 용역 수행
              </div>
            </MobileDetail1>
            <div class="dropup">
              <img src={sival} onClick = {this.detailUp}/>
            </div>
          </Detail1>
        </DetailContainer>
        )
      }
    </>
      </Card>
      )
    }
    return null
  }
}

export default withRouter(CardContainer);

const SummaryContainer = styled.div`
  display: inline-flex;
  width: 100%;
  padding-top: 33px;
  @media (min-width: 0px) and (max-width: 768.1px) {
      padding: 0;
      padding-top: 16px;
  }
`
const DetailContainer = styled.div`
  /* transition: ; */
  @media (min-width: 0px) and (max-width: 768.1px) {
      width: 100%;
      padding-top: 17px;
      > div {
      :nth-of-type(1) {
        border-radius: 0px;
      }
      }
  }
  .dropup {
    width: 100%;
    height: 12px;
    padding-top: 19px;
    padding-bottom: 19px;
    > img {
      cursor: pointer;
      float: right;
      padding-right: 33px;
    }
    @media (min-width: 0px) and (max-width: 768.1px) {
      padding: 0 0;
      > img {
        cursor: pointer;
        float: right;
        padding-right: 0px;
        width: 7px;
        height: 4px;
        padding-right: 0px;
      }
    }
  }
`
const Detail1 = styled.div`
  width: 894px;
  height: 175px;
  object-fit: contain;
  background-color: #f1f3f4;
  display: table;
  margin-top: 25px;
  .detailInner {
    display: table-cell;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    padding-bottom: 24px;
    .fuck {
      flex-direction: column;
      display: inline-block;
      > img {
        padding-top: 20px;
      }
      .text {
        width: 150px;
        height: 27px;
        object-fit: contain;
        font-size: 18px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: -0.45px;
        text-align: center;
        color: var(--black);
      }
    }
  }
  @media (min-width: 0px) and (max-width: 768.1px) {
    margin-top: 0px;
    width: 90.5%;
    padding-left: calc(5%);
    padding-right: calc(5%);
    border-radius: 6px;
    height: 144px;
    > div {
      :nth-of-type(1) {
        height: 30px;
      }
      :nth-of-type(2) {
        height: 52px;
      }
      :nth-of-type(3) {
        height: 52px;
      }
    }
  }
`
const PortfolioContainer = styled.div`
  width: 894px;
  height: 283px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  > img {
    :nth-of-type(1) {
        width: 256px;
        height: 238px;
        border-radius: 3px;
        background-color: #dcdcdc;
      }
    :nth-of-type(2) {
        width: 295px;
        height: 238px;
        border-radius: 3px;
        background-color: #dcdcdc;
        margin-left: 15px;
        margin-right: 15px;
    }
    :nth-of-type(3) {
        width: 256px;
        height: 238px;
        border-radius: 3px;
        background-color: #dcdcdc;
      }
  }
`
const Card = styled.div`
  width: 894px;
  height: 100%;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  border-radius : 10px;
  margin-bottom: 15px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 0px) and (max-width: 768.1px) {
    width: 90%;
    height: 100%;
    border-radius: 6px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    background-color: #ffffff;
    padding: 0;
    > img {
     width: 72px;
     height: 81px;
     border-radius: 3px;
     background-color: #c9c9c9;
    }
    }
  }
  :hover {
    box-shadow: 0 0 6px 0 ${PRIMARY}55;
  }
  .dropdown {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    > img {
      cursor: pointer;
      float: right;
      padding-right: 33px;
    }
    @media (min-width: 0px) and (max-width: 768.1px) {
      padding: 0;
      padding-bottom: 10px;
      > img {
        cursor: pointer;
        float: right;
        width: 7px;
        height: 4px;
        padding-right: 10px;
      }
    }
  }
`
const TextBox = styled.div`
  height: 186px;
  margin-left: 30px;
  .Header {
    width: 200px;
    height: 36px;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-family: 'Noto Sans KR', sans-serif;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
    text-align: left;
    color: #191919;
    @media (min-width: 0px) and (max-width: 768.1px) {
      width: 64px;
      height: 16px;
      font-size: 10px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 0.9;
      letter-spacing: -0.25px;
      text-align: left;
      color: #191919;
    }
  }
  .Body {
    width: 470px;
    font-size: 18px;
    font-weight: normal;
    font-family: 'Noto Sans KR', sans-serif;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.45px;
    text-align: left;
    color: #191919;
    margin-top: 20px;
    @media (min-width: 0px) and (max-width: 768.1px) {
      width: 210px;
      font-size: 10px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: -0.25px;
      text-align: left;
      color: #191919;
      margin-top: 0px;
    }
  }
  .devbox {
    width: 470px;
    height: 30px;
    display: inline-flex;
    margin-top: 20px;
    .develop {
      width: 120px;
      height: 30px;
      border-radius: 4px;
      background-color: #f1f1f1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      @media (min-width: 0px) and (max-width: 768.1px) {
        width: auto;
        height: 16px;
        font-size: 10px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: -0.25px;
        text-align: left;
        color: #191919;
        }
      }
  @media (min-width: 0px) and (max-width: 768.1px) {
       margin: 0;
       margin-top: 14px;
       width: 100%;
    }
  }
  @media (min-width: 0px) and (max-width: 768.1px) {
    width: 210px;
    height: 81px;
  }
`
const Image = styled(RatioImage)`
  width: 196px;
  height: 186px;
  border-radius: 3px;
  background-color: #c9c9c9;
  display: inline-block;
  vertical-align: middle;
  margin-left: 30px;
  @media (min-width: 0px) and (max-width: 991.98px) {
    width: 72px;
    height: 81px;
    vertical-align: top;
    margin-top: 2px;
    margin-left: 10px;
  }
`
const MobileDetail1 = styled.div`
  width: 100%;
  height: 30px;
  padding-top: 10px;
  display: inline-flex;
  .title {
    width: 72px;
    height: 15px;
    object-fit: contain;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.25px;
    text-align: left;
    color: #191919;
    display: inline-table;
  }
  .info {
    width: 100%;
    font-size: 10px;
    text-align: center;
    border-left: solid #d5d5d5 {props => props.active && 0.5px};
    border-right: solid #d5d5d5 {props => props.active && 0.5px};
  }
`

