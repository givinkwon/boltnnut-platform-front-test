import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'

import Container from 'components/Container'
import RatioImage from 'components/RatioImage'
import * as Text from 'components/Text'

import Card from './Card'

import { BLACK1, DARKGRAY } from 'static/style'
import RequestListCard from "../../components/RequestCard";

@inject('Partner', 'Home')
@observer
class ContentConatiner extends React.Component {
  handleIntersection = (event) => {
    if(event.isIntersecting) {
      console.log('추가 로딩을 시도합니다')
      const {Partner} = this.props
      Partner.getNextPartner()
    }
  }
  // IE 오류 해결
  componentDidMount() {
    const { Home } = this.props
    const userAgent = window.navigator.userAgent;
    console.log(userAgent)
    if(userAgent.indexOf("MSIE ") !== -1 || userAgent.indexOf(".NET") !== -1
      || userAgent.indexOf("Edge") !== -1)
        {
          this.props.Home.is_ie = true;
        }
    }

  render() {
    const { Partner, Home } = this.props
    return (
      <CustomContainer>
        <List>
          <Card />
          {
            Partner.partner_list.length > 0 && Partner.partner_list.map((item, idx) => {
              return (
                <Card
                  key={item.id}
                  item={item}
                  handleIntersection={this.handleIntersection}
                  observer={!this.props.Home.is_ie && idx === Partner.partner_list.length - 2}
                />
              )
            })
          }
        </List>
      </CustomContainer>
    )
  }
}

export default ContentConatiner

const CustomContainer = styled(Container)`
  padding: 15px 0;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 0 !important;
    width: 100% !important;
  }
`
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc((100%/2) - 7.5px);
    :nth-of-type(2n){
      margin-left: 15px;
    }
    > p {
      margin-top: 10px;
    }
  }
  @media (min-width: 768px) {
    width: calc((100%/3) - 10px);
    :nth-of-type(3n-1){
      margin-left: 15px;
      margin-right: 15px;
    }
    > p {
      margin-top: 20px;
    }
  }
`
const Image = styled(RatioImage)`
  cursor: pointer;
  border-radius: 12px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 400px;
  }
  > div {
    transition: 0.4s;
  }
  :hover {
    > div {
      transform: scale(1.2);
    }
  }
`