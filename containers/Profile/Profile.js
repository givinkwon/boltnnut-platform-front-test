import React, {Component} from "react"
import styled, {css} from "styled-components"
import { inject, observer } from 'mobx-react'
import Router, { withRouter } from 'next/router'

import * as Text from "components/Text"
import RatioImage from "components/RatioImage"
import Rating from "components/Rating"

import ProfileInfoContainer from "ProfileInfo"

import {DARKGRAY, GRAY, PRIMARY} from "static/style"
import {BLACK1} from "../../static/style";

const profile = "/static/images/profile.png"


@inject('Profile', 'Auth')
@observer
class ProfileContainer extends Component {

  handleClick = (isActive, answerId) => {
    if (!isActive) {
      return;
    }
    const {router} = this.props;
    router.push(router.asPath + '/detail/' + answerId);
  }

  handleFileChange = (e) => {
    const { Profile, Auth } = this.props;

    if(e.target.files.length <= 0) { return }

    const fileName = e.target.files[0].name;
    const idxDot = fileName.lastIndexOf(".") + 1;
    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile=="gif"){
      //TO DO
    }else{
      alert("이미지 파일만 사용 가능합니다 (jpg, jpeg, png, gif)");
      return
    }

    Profile.updateLogo(Auth.logged_in_partner.id, this.file.files[0])
  }

  render() {
    const { Profile } = this.props;
    console.log("Profile.data : ", Profile.data)
    return (
      <Card>
        <CardHead>
          <>
            <Image src={Profile.data.logo} />
            <ProfileInfoContainer partner={Profile.data} />
          </>
        </CardHead>
        <CardBody>
          <AnswerWrapper>
            <CompanyInfo>
              <div>
                <CompanyInfoBox>
                  <Text.FontSize20 color={BLACK1} fontWeight={700}>계약한 프로젝트</Text.FontSize20>
                  <Text.FontSize20 color={BLACK1} fontWeight={500}>{Profile.data.meeting_count}건</Text.FontSize20>
                  <a onClick={() => Router.push(`/partner/${Profile.data.id}/review`)}>
                    <img className="imageButton" src={'/static/images/button-go.png'}  />
                  </a>
                </CompanyInfoBox>
                <CompanyInfoBox>
                  <Text.FontSize20 color={BLACK1} fontWeight={700}>포트폴리오</Text.FontSize20>
                  <Text.FontSize20 color={BLACK1} fontWeight={500}>{Profile.data.portfolio_set.length}건</Text.FontSize20>
                  <img src={'/static/images/button-go.png'}/>
                </CompanyInfoBox>
                <CompanyInfoBox>
                  <Text.FontSize20 color={BLACK1} fontWeight={700}>로고 변경</Text.FontSize20>
                  <img
                    src={'/static/images/button-go.png'}
                    onClick={() => {
                      this.file && this.file.click();
                    }}
                  />

                  <input type="file" ref={file => this.file = file} style={{display: 'none'}} onChange={this.handleFileChange} />
                </CompanyInfoBox>
              </div>
            </CompanyInfo>
            <AnswerInfoBox>
              <AnswerInfo>
                <Text.FontSize14 color={BLACK1} fontWeight={700}>
                  의뢰분야
                </Text.FontSize14>
                <Text.FontSize14 color={BLACK1} fontWeight={300}>
                  {
                    Profile.data.category.length > 0 && Profile.data.category.map((item, idx) => {
                      return <AnswerItem key={idx}>{item.category}</AnswerItem>
                    })
                  }
                </Text.FontSize14>
              </AnswerInfo>
              <AnswerInfo>
                <Text.FontSize14 color={BLACK1} fontWeight={700}>
                  만든제품분야
                </Text.FontSize14>
                <Text.FontSize14 color={BLACK1} fontWeight={300}>
                  {
                    Profile.data.product_history.length > 0 && Profile.data.product_history.map((item, idx) => {
                      return <AnswerItem key={idx}>{item.subclass}</AnswerItem>
                    })
                  }
                </Text.FontSize14>
              </AnswerInfo>
            </AnswerInfoBox>
          </AnswerWrapper>
          {/*<RateBox>
            <div>
              <div>
                <ScoreBox>
                  <Text.FontSize20 color={BLACK1} fontWeight={500}>가격 만족도</Text.FontSize20>
                  <Rating rating={Profile.data.avg_price_score === 0 ? 0 : Profile.data.avg_price_score.price_score__avg}/>
                  <Text.FontSize20 color={BLACK1} fontWeight={500}>
                    {Profile.data.avg_price_score === 0 ? '0.0' : Profile.data.avg_price_score.price_score__avg.toFixed(1)}
                  </Text.FontSize20>
                </ScoreBox>
                <ScoreBox>
                  <Text.FontSize20 color={BLACK1} fontWeight={500}>의사소통</Text.FontSize20>
                  <Rating rating={Profile.data.avg_talk_score === 0 ? 0 : Profile.data.avg_talk_score.talk_score__avg}/>
                  <Text.FontSize20 color={BLACK1} fontWeight={500}>
                    {Profile.data.avg_talk_score === 0 ? '0.0' : Profile.data.avg_talk_score.talk_score__avg.toFixed(1)}
                  </Text.FontSize20>
                </ScoreBox>
                <ScoreBox last onlyPC>
                  <Text.FontSize20 color={BLACK1} fontWeight={500}>전문성</Text.FontSize20>
                  <Rating rating={Profile.data.avg_expert_score === 0 ? 0 : Profile.data.avg_expert_score.expert_score__avg}/>
                  <Text.FontSize20 color={BLACK1} fontWeight={500}>
                    {Profile.data.avg_expert_score === 0 ? '0.0' : Profile.data.avg_expert_score.expert_score__avg.toFixed(1)}
                  </Text.FontSize20>
                </ScoreBox>
              </div>
              <div>
                <ScoreBox>
                  <Text.FontSize20 color={BLACK1} fontWeight={500}>일정 만족도</Text.FontSize20>
                  <Rating rating={Profile.data.avg_time_score === 0 ? 0 : Profile.data.avg_time_score.time_score__avg}/>
                  <Text.FontSize20 color={BLACK1} fontWeight={500}>
                    {Profile.data.avg_time_score === 0 ? '0.0' : Profile.data.avg_time_score.time_score__avg.toFixed(1)}
                  </Text.FontSize20>
                </ScoreBox>
                <ScoreBox>
                  <Text.FontSize20 color={BLACK1} fontWeight={500}>신뢰성</Text.FontSize20>
                  <Rating rating={Profile.data.avg_result_score === 0 ? 0 : Profile.data.avg_result_score.result_score__avg}/>
                  <Text.FontSize20 color={BLACK1} fontWeight={500}>
                    {Profile.data.avg_result_score === 0 ? '0.0' : Profile.data.avg_result_score.result_score__avg.toFixed(1)}
                  </Text.FontSize20>
                </ScoreBox>
              </div>
            </div>
          </RateBox>*/}
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
  align-items: center;
  > div {
    display: flex;
    flex: 1;
    > div {
      flex: 1;
      :nth-of-type(1) {
        margin-right: 15px;
      }
    }
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 10px 10px;
    width: calc(100% - 20px) !important;
    > div {
      flex-direction: column;
    }
    > div > div:nth-of-type(1) {
      margin-right: 0 !important; 
    }
    
    > div > div:nth-of-type(1) > div:last-of-type {
      border-bottom: 2px solid #e6e6e6 !important;
    }
    > div > div:nth-of-type(2) > div:last-of-type {
      border-bottom: none !important;
    }
  }
  @media (min-width: 0px) and (max-width: 991.98px) {
    width: calc(100% - 40px);
    padding-top: 0;
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
    padding-bottom: 2px;
    :nth-of-type(1) {
      margin-right: auto;
    }
    :nth-of-type(2) {
      min-width: 40px;
      text-align: right;
    }
  }
  
  
  @media (min-width: 0px) and (max-width: 991.98px) {
    ${props => props.onlyPC && css`
      /* border-bottom: 2px solid #e6e6e6; */
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
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding-top: 0 !important;
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding-top: 0;
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 20px;
    width: 50px;
    vertical-align: middle;
    margin-bottom: 0;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 50px;
    vertical-align: middle;
    margin-bottom: 0;
  }
`
const AnswerInfoBox = styled.div`
  width: 100%;
`
const AnswerInfo = styled.div`
  background-color: #f3f3f3;
  padding: 4px 8px;
  display: flex;
  width: calc(100% - 16px);

  > p {
    :nth-of-type(odd)
    {
      flex-shrink: 0;
      height: fit-content;
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
  
  @media (min-width: 768px) and (max-width: 1299.98px) {
    padding: 4px 20px;
    width: calc(100% - 40px);
    :last-of-type {
      padding-bottom: 0 !important;
    }
  }
  
  :first-of-type {
    padding-top: 16px !important;
  }
  :last-of-type {
    padding-bottom: 16px !important;
  }
`

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;

  @media (min-width: 992px) and (max-width: 1299.98px) {
    min-width: 300px;
  }

  @media (min-width: 1300px) {
    min-width: 340px;
  }
`
const CompanyInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  > div {
    flex: 1;
  }

  .imageButton {

    cursor: pointer;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      margin-bottom: 20px !important;
    }
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
  margin: 0 10px;
  border-bottom: 1px solid ${PRIMARY}22;
  margin-bottom: 10px;
  padding-bottom: 10px;

  :last-of-type {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
    > img {
      margin-left: auto;
    }
  }
  > p {
    padding-bottom: 2px;
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

    cursor: pointer;
  }
  
  
`
const AnswerItem = styled.span`
  display: inline-block;
  padding-right: 10px;
  margin-top: 2.5px;
  padding-bottom: 2.5px;
`
