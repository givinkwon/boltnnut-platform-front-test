import React, {Component} from "react"
import styled from "styled-components"
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import 'intersection-observer'; // polyfill
import Observer from '@researchgate/react-intersection-observer';

import * as Text from "components/Text"
import RatioImage from "components/RatioImage"

import ProfileInfoContainer from "ProfileInfo"

import * as FormatUtils from 'utils/format'

import {DARKGRAY, GRAY} from "static/style"
import {PRIMARY} from "../../../../static/style";

import CheckClassModal from "./CheckClassModal";

@observer
@inject('Auth', 'Answer')
class CardContainer extends Component {
  state = {
    requestId: -1,
    classModal_open: false,

  }
  closeClassModal = () => {
    this.setState({
      ...this.state,
      classModal_open: false,
    });
  };

  componentDidMount() {
    const splitedUrl = window.location.pathname.split('/')
    let pathname = splitedUrl[splitedUrl.length-2]
    const requestId = pathname === 'detail' ? splitedUrl[splitedUrl.length-3] : splitedUrl[splitedUrl.length-1]

    this.setState({
      ...this.state,
      requestId: requestId,
    })
  }

  handleClick = (isActive, answerId) => {
    if (!isActive && !this.props.Auth.logged_in_client.client_class) {
       this.setState({ ...this.state, classModal_open: true });
       return
    }
    const {router, Answer} = this.props;
    router.push(router.asPath + '/detail/' + answerId);
    Answer.seeAnswer(answerId, 1);
  }

  render() {
    const {Auth, Answer, item, partner, observer, handleIntersection} = this.props;

    const {requestId, classModal_open} = this.state
    const request = Answer.getRequestById(requestId)

    const options = {
      onChange: handleIntersection,
    };
    Auth.reloadUserInfo
    return (
      <>
      <CheckClassModal
          open={classModal_open}
          handleClose={this.closeClassModal}
        />
      {/*<Card active={true}>*/}
      <Card active={item.active || this.props.Auth.logged_in_client.client_class}>
        <CardBody>
          {
            partner ?
              <>
                <Image src={partner.logo} />
                <ProfileInfoContainer partner={partner} Answer={Answer} />
              </>
              :
              <></>
          }

          <AnswerWrapper>
            <AnswerRight>
              <AnswerInfo>
                <Text.FontSize14 color="#404040"  fontWeight={700}>
                  개발 제품군
                </Text.FontSize14>

                <Text.FontSize14>
                  {
                    partner ?
                      partner.product_history.map((item, idx) => {
                        return <AnswerItem key={idx}>{item.subclass}</AnswerItem>
                      })
                      :
                      <></>
                  }
                </Text.FontSize14>
              </AnswerInfo>

              <AnswerInfo>
                <Text.FontSize14 color="#404040"  fontWeight={700}>
                  제조분야
                </Text.FontSize14>

                <Text.FontSize14>
                  {
                    partner ?
                      partner.category.map((item, idx) => {
                        return <AnswerItem key={idx}>{item.category}</AnswerItem>
                      })
                      :
                      <></>
                  }
                </Text.FontSize14>
              </AnswerInfo>

              {/*<AnswerInfo>
                <Text.FontSize14 color="#404040"  fontWeight={700}>
                  미팅전환율
                </Text.FontSize14>

                <Text.FontSize14>
                  <AnswerItem>
                    {partner && Number(partner.meeting * 100).toFixed(1)} %
                  </AnswerItem>
                </Text.FontSize14>
              </AnswerInfo>*/}
            </AnswerRight>

            {/*<AnswerLeft>
              <div>
                <AnswerInfo>
                  <Text.FontSize16 color="#404040" fontWeight={700}>
                    견적
                  </Text.FontSize16>
                  <Text.FontSize16 color="#4b4b4b">
                    {item.all_price +  "만원"}
                  </Text.FontSize16>
                </AnswerInfo>

                <AnswerInfo>
                  <Text.FontSize16 color="#404040"  fontWeight={700}>
                    기간
                  </Text.FontSize16>
                  <Text.FontSize16 color="#4b4b4b">
                    {item.day}일
                  </Text.FontSize16>
                </AnswerInfo>
              </div>

              <Text.FontSize16 color={DARKGRAY}>
                {item.strategy}
              </Text.FontSize16>
            </AnswerLeft>*/}
          </AnswerWrapper>
        </CardBody>

        {/*<CardFooter disabled={false} onClick={() => {this.handleClick(true, item.id)}}>*/}
        <CardFooter disabled={!item.active && !this.props.Auth.logged_in_client.client_class} onClick={() => {this.handleClick(item.active, item.id)}}>
          <Text.FontSize24 color="#767676" fontWeight={500}>
            개발업체 정보 확인하기
          </Text.FontSize24>
        </CardFooter>
      </Card>
      </>
    )
  }
}

export default withRouter(CardContainer);

const Card = styled.div`
  p {
    line-height: 1.3em;
  }
  
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  @media (min-width: 0px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) {
  }

  opacity: ${props => props.active ? 1.0 : 0.5};
`
const CardBody = styled.div`
  padding: 20px;
  > p {
    :last-of-type {
      line-height: 1.25em;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 10px;
  }
`
const CardFooter = styled.div`
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  border: 1px solid #cccccc;
  padding: 12px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Image = styled(RatioImage)`
  display: inline-block;
  width: 66px;
  vertical-align: middle;
  margin-bottom: 10px;
  border-radius: 50%;
  box-sizing: border-box;
  border: 2px solid ${PRIMARY};
  @media (min-width: 0px) and (max-width: 991.98px) {
    width: 50px;
    margin-top: 10px;
    vertical-align: top;
  }
`

const AnswerInfo = styled.div`
  background-color: #f3f3f3;
  padding: 8px;
  display: flex;
  /* margin-bottom: 10px; */
  @media (min-width: 1300px) { 
    width: fit-content;
  }
  > p {
    :nth-of-type(odd)
    {
      height: fit-content;
      width: 86px;
      flex-shrink: 0;
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
  flex-direction: row-reverse;
  @media (max-width: 1299px) { 
    display: block;
  }
`
const AnswerLeft = styled.div`
  width: 100%;
  flex: 5;
  display: flex;
  flex-direction: column;
  
  padding-right: 15px;
  > p {
    flex: 1;
    overflow: hidden;
  }
  
  > div {
    display: flex;
    margin-bottom: 15px;

    > div {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      width: 100%;
      :nth-of-type(1) {
        margin-right: 18px;
      }
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    
    > div {
      flex-direction: column;
      > div {
        display: flex;
      }
    }
  }
  @media (min-width: 0px) and (max-width: 1299px) {
    > p {
      max-height: 6.4em;
      overflow: hidden;
    }
  }
  @media (min-width: 1299px) {
     > p {
      max-height: 6.5em;
      overflow: hidden;
     }
  }
  @media (max-width: 1299px) { 
    padding-right: 0;
    > div {
      > div {
        :nth-of-type(1) {
          margin-right: 0;
        }
      }
    }
  }
`
const AnswerRight = styled.div`
  flex: 4;
  > div {
    display: flex;
    width: 100%;
    box-sizing: border-box;
  }
`
const AnswerItem = styled(Text.FontSize14)`
  display: inline-block;
  padding-right: 10px;
  margin-top: 2.5px;
  padding-bottom: 2.5px;
  
  font-size: 14px;
  color: #4b4b4b;
`
