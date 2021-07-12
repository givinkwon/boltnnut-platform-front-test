import React, {Component} from "react"
import styled, {css} from "styled-components"
import { inject, observer } from 'mobx-react'
import Router, {withRouter} from 'next/router'

import * as Text from "components/Text"
import RatioImage from "components/RatioImage"
import Rating from "components/Rating"

import ProfileInfoContainer from "ProfileInfo"

import {DARKGRAY, GRAY, PRIMARY} from "static/style"

@inject('Answer')
@observer
class ProfileContainer extends Component {
  handleClick = (isActive, answerId) => {
    if (!isActive) {
      return;
    }
    const {router} = this.props;
    router.push(router.asPath + '/detail/' + answerId);
  }

  render() {
    const { Answer, id } = this.props;
    const {current_partner} = Answer;

    return (
      <Card>
        <CardHead>
          <>
            <Image src={current_partner && current_partner.logo} />
            <ProfileInfoContainer partner={current_partner} />
          </>
        </CardHead>
        <CardBody>
          <AnswerWrapper>
            <AnswerInfoBox>
              <AnswerInfo>
                <Text.FontSize14 fontWeight={700}>
                  의뢰분야
                </Text.FontSize14>
                <Text.FontSize14 fontWeight={500}>
                  {
                    current_partner && current_partner.category.map((item, idx) => {
                      return <AnswerItem key={idx}>{item.category}</AnswerItem>
                    })
                  }
                </Text.FontSize14>
              </AnswerInfo>

              <AnswerInfo>
                <Text.FontSize14 fontWeight={700}>
                  만든제품분야
                </Text.FontSize14>
                <Text.FontSize14 fontWeight={500}>
                  {
                    current_partner && current_partner.product_history.map((item, idx) => {
                      return <AnswerItem key={idx}>{item.subclass}</AnswerItem>
                    })
                  }
                </Text.FontSize14>
              </AnswerInfo>

            </AnswerInfoBox>
          </AnswerWrapper>
        </CardBody>
      </Card>
    )
  }
}

export default withRouter(ProfileContainer);

const RateBox = styled.div`
  width: calc(100% - 50px);
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #f3f3f3;
  display: flex;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(50% - 10px);
    :nth-of-type(1){
      margin-right: 20px;
    }
  } 
  > div:nth-of-type(2) > div:last-child {
    justify-content: flex-end;
    > p {
      margin-right: 0 !important;
    }
  }
  @media (min-width: 0px) and (max-width: 991.98px) {
    width: calc(100% - 40px);
    margin-left: 0px;
    flex-direction: column;
    > div {
      width: 100%;
      :nth-of-type(1){
        margin-right: 0px;
      }
    }
  }
`
const ScoreBox = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 2px solid #e6e6e6;
  ${props => props.last && css`
    border-bottom: 0px;
  `}
  > p {
    :nth-of-type(1) {
      margin-right: auto;
    }
    :nth-of-type(2) {
      min-width: 40px;
      text-align: right;
      margin-top: 2px;
    }
  }
  img {
    cursor: pointer;
    width: 21px;
    height: 21px;
    margin-top: 2px;
    margin-left: 5px;
  }
  
  @media (min-width: 0px) and (max-width: 991.98px) {
    ${props => props.onlyPC && css`
      border-bottom: 2px solid #e6e6e6;
    `}
    > p {
      :nth-of-type(2) {
        min-width: 30px;
      }
    }
  }
`
const Card = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
`
const CardHead = styled.div`
  padding: 20px 0;
  padding-bottom: 0px;
  > p {
    :last-of-type {
      line-height: 1.25em;
    }
  }
`
const CardBody = styled.div`
  display: flex;
  padding: 20px 0;
  > p {
    :last-of-type {
      line-height: 1.25em;
    }
  }
  @media (min-width: 0px) and (max-width: 991.98px) {
    flex-direction: column;
  }
`
const Image = styled(RatioImage)`
  display: inline-block;
  width: 62px;
  vertical-align: middle;
  margin-bottom: 10px;
  border-radius: 100px;
  border: 2px solid ${PRIMARY};
  @media (min-width: 0px) and (max-width: 991.98px) {
    width: 50px;
    vertical-align: top;
    margin-top: 3px;
  }
`
const AnswerInfoBox = styled.div`
  width: 100%;
`
const AnswerInfo = styled.div`
  background-color: #f3f3f3;
  padding: 8px;
  display: flex;
  width: calc(100% - 16px);

  > p {
    :nth-of-type(odd)
    {
      width: 86px;
      padding: 3px 0;
      margin-right: 10px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      text-align: center;
      border-radius: 2px;
    }
  }
  > p {
    :nth-of-type(even)
    {
      display: inline-block;
    }
  }
`

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 992px) and (max-width: 1299.98px) { 
    min-width: 260px;
  }

  @media (min-width: 1300px) { 
    min-width: 300px;
  }
`
const CompanyInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  
  .imageButton {
    cursor: pointer;
  }
  
  > div {
    width: 100%;
  }
  
  @media (min-width: 0px) and (max-width: 991.98px) {
    margin-bottom: 0px;
    > p, > div {
      margin-bottom: 10px;
    }
    flex-direction: column;
  }
`
const CompanyInfoBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  :nth-of-type(1){
    border-bottom: 1px solid ${PRIMARY}22;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  a {
    display: flex;
    padding: 0;
    margin: 0;
  }
  > p {
    :nth-of-type(1) {
      margin-right: 20px;
    }
    :nth-of-type(2) {
      margin-left: auto;
    }
  }
  img {
    width: 29px;
    height: 29px;
    margin-left: 10px;
  }
`
const AnswerItem = styled.span`
  display: inline-block;
  padding-right: 10px;
  margin-top: 2.5px;
  padding-bottom: 2.5px;
`
