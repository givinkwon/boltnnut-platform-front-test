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


@inject('Partner')
@observer
class CardContainer extends Component {
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
  render() {
    const { item, observer, handleIntersection } = this.props;
    console.log(item)

    const options = {
      onChange: handleIntersection,
    };

    if(item){
      return (
        <Card onClick={this.toDetail}>
          <Image src={item.logo}/>
          <TextBox>
            <div class="Header">
              {item.name}
            </div>
            <div class="Body">
              {item.info_company.substring(0,50)} ...
            </div>
            <div class="devbox">
              {
                item.category.length > 0 && item.category.slice(0,5).map((item1,idx) => {
                  return (
                    <div class="develop">
                      {item1.category}
                    </div>
                  )
                })
              }
              {
                item.category.length > 5 && "..."
              }
            </div>
          </TextBox>
        </Card>
      )
    }
    return null
  }
}

export default withRouter(CardContainer);


const Card = styled.div`
  width: 894px;
  height: 252px;
  box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  border-radius : 10px;
  cursor: pointer;
  margin-bottom: 15px;
  width: 100%;
  align-items: center;
  display: flex;
  :hover {
    box-shadow: 0 0 6px 0 ${PRIMARY}55;
  }
`
const TextBox = styled.div`
  width: 678px;
  height: 186px;
  margin-left: 30px;
  font-family: 'Noto Sans KR', sans-serif;
  .Header {
    width: 151px;
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
  }
  .devbox {
    width: 100%;
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
    }
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
    width: 50px;
    height: 50px;
    vertical-align: top;
    margin-top: 2px;
  }
`

