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

    const options = {
      onChange: handleIntersection,
    };

    if(item){
      return (
        <Card onClick={this.toDetail}>
          <CardBody>
            <div>
              <Image src={item.logo} />
              <ProfileInfoContainer partner={item} />
            </div>
            <AnswerWrapper>
              <CompanyInfo>
                {
                  observer
                    ? (
                      <Observer {...options}>
                        <Text.FontSize16
                          color={DARKGRAY}
                          dangerouslySetInnerHTML={{__html: item.info_company.replace(/(\n|\r\n)/g, '<br>')}}
                        />
                      </Observer>
                    )
                    : (
                      <Text.FontSize16
                        color={DARKGRAY}
                        dangerouslySetInnerHTML={{__html: item.info_company.replace(/(\n|\r\n)/g, '<br>')}}
                      />
                    )
                }

                <div style={{marginLeft: 'auto'}}>
                  {/*<CompanyInfoBox>
                    <Text.FontSize18 color="#404040" fontWeight={700}>계약한 프로젝트</Text.FontSize18>
                    <Text.FontSize18 color="#404040" fontWeight={500}>{item.meeting_count}건</Text.FontSize18>

                    <a onClick={async (e) => {
                      e.preventDefault();
                      await Router.reload();
                      Router.push(Router.router.asPath + `/${item.id}/review`);
                    }}>
                      <img src={'/static/images/button-go.png'}/>
                    </a>
                  </CompanyInfoBox>
                  <CompanyInfoBox>
                    <Text.FontSize18 color="#404040" fontWeight={700}>포트폴리오</Text.FontSize18>
                    <Text.FontSize18 color="#404040" fontWeight={500}>{item.portfolio_set.length}건</Text.FontSize18>

                    <a onClick={async (e) => {
                      e.preventDefault();
                      await Router.reload();
                      Router.push(Router.router.asPath + `/${item.id}#portfolio`);
                    }}>
                      <img src={'/static/images/button-go.png'}/>
                    </a>
                  </CompanyInfoBox>*/}
                </div>
              </CompanyInfo>
              <div style={{width: '100%'}}>

                <AnswerInfo>
                  <Text.FontSize14 color="#404040"  fontWeight={700}>
                    개발제품군
                  </Text.FontSize14>
                  <Text.FontSize14 color="#404040"  fontWeight={300}>
                    {
                      item.product_history.length > 0 && item.product_history.map((item, idx) => {
                        return <AnswerItem key={idx}>{item.subclass}</AnswerItem>
                      })
                    }
                  </Text.FontSize14>
                </AnswerInfo>

                <AnswerInfo>
                  <Text.FontSize14 color="#404040" fontWeight={700}>
                    제조분야
                  </Text.FontSize14>
                  <Text.FontSize14 color="#404040" fontWeight={300}>
                    {
                      item.category.length > 0 && item.category.map((item, idx) => {
                        return <AnswerItem key={idx}>{item.category}</AnswerItem>
                      })
                    }
                  </Text.FontSize14>
                </AnswerInfo>


              </div>
            </AnswerWrapper>
          </CardBody>
        </Card>
      )
    }
    return null
  }
}

export default withRouter(CardContainer);


const Card = styled.div`
  cursor: pointer;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  width: 100%;
  :hover {
    box-shadow: 0 0 6px 0 ${PRIMARY}55;
  }
`
const CardBody = styled.div`
  padding: 20px;
  > p {
    :last-of-type {
      line-height: 1.25em;
    }
  }

  > div:nth-of-type(1) > div:nth-of-type(2) {
    > div
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 10px;

    /* ProfileInfo */
    > div:nth-of-type(1) {
      display: flex;

    }
    > div:nth-of-type(1) > div:nth-of-type(2) {
      padding: 10px 0 !important;
      flex: 1;
    }
  }
`
const CardFooter = styled.div`
  cursor: pointer;
  border: 1px solid #cccccc;
  padding: 12px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Image = styled(RatioImage)`
  flex-shrink: 0;
  flex-grow: 0;
  display: inline-block;
  width: 62px;
  height: 62px;
  vertical-align: middle;
  margin-bottom: 10px;
  border-radius: 100px;
  border: 2px solid ${PRIMARY};
  @media (min-width: 0px) and (max-width: 991.98px) {
    width: 50px;
    height: 50px;
    vertical-align: top;
    margin-top: 2px;
  }
`

const AnswerInfo = styled.div`
  background-color: #f3f3f3;
  padding: 4px 8px;
  display: flex;
  /* margin-bottom: 10px; */
  @media (min-width: 1300px) {
  }
  > p {
    :nth-of-type(odd)
    {
      width: 86px;
      flex-shrink: 0;
      height: fit-content;
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
  @media (max-width: 1299px) {
    display: block;
  }

  > div:nth-of-type(2) > div {
    padding: 5px 10px;
  }
  > div:nth-of-type(2) > div:first-of-type {
    padding-top: 20px;
  }
  > div:nth-of-type(2) > div:last-of-type {
    padding-bottom: 20px;
  }
`
const CompanyInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  > p {
    line-height: 1.3em;
    max-height: 3.9em;
    overflow: hidden;
  }
  > div {
    margin-left: 20px !important;
    flex-shrink: 0;
  }


  @media (min-width: 0px) and (max-width: 991.98px) {
    margin-bottom: 0px;
    > p, > div {
      margin-bottom: 10px;
    }
    > div {
      margin-left: 0 !important;
    }

    flex-direction: column;
  }
`
const CompanyInfoBox = styled.div`
  display: flex;
  align-items: center;
  :nth-of-type(1){
    border-bottom: 1px solid ${PRIMARY}15;
    margin-bottom: 3px;
    padding-bottom: 3px;
  }
  > p {
    :nth-of-type(1) {
      margin-right: 20px;
    }
    :nth-of-type(2) {
      margin-left: auto;
    }
  }
  a {
    display: flex;
    padding: 0;
    margin: 0;
  }
  img {
    width: 21px;
    height: 21px;
    margin-left: 5px;
  }
  @media (min-width: 0px) and (max-width: 991.98px) {

  }
`
const AnswerItem = styled.span`
  display: inline-block;
  padding-right: 10px;
  margin-top: 2.5px;
  padding-bottom: 2.5px;
`
