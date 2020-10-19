import React, {Component} from "react"
import styled, {css} from 'styled-components'

import * as Text from "components/Text"
import Rating from "components/Rating"
import Button from "components/Button"

import {BLACK1, PRIMARY, WHITE} from "static/style"
import {inject, observer} from "mobx-react";
import Router from "next/router";

@inject('Partner')
@observer
class ProfileInfoContainer extends Component {
  pushToReview = (e) => {
    e.stopPropagation();

    const {partner} = this.props;

    Router.push(`/partner/${partner.id}/review`)
  }

  render() {
    const {Partner, partner} = this.props;

    return (
      <ProfileInfo>
        <ProfileName>
          <Text.FontSize32 color={BLACK1} fontWeight={700}>
            {partner.name}
          </Text.FontSize32>

          <Text.FontSize20 color={BLACK1} fontWeight={300}>
            {Partner.getCityNameById(partner.city)} &nbsp;&nbsp;&nbsp;
          </Text.FontSize20>

          <Text.FontSize20 color={PRIMARY} fontWeight={300}>
            {Partner.is_partner ? "미등록파트너" : "등록파트너"}

          </Text.FontSize20>


        </ProfileName>
          <ButtonBox>
                <Button
                id={'request'}
                backgroundColor={WHITE + "00"}
                borderColor={WHITE}
                onClick={() => Router.push("/request")}
                >
                    <Text.FontSize24 id={'request_text'} color={WHITE} fontWeight={500} borderRadius={0}>
                        제조사에게 문의하기
                    </Text.FontSize24>
                </Button>
            </ButtonBox>
        {/*<ProfileRating onClick={this.pushToReview}>
          <Rating rating={partner.avg_score} />
          <Text.FontSize20 color="#4d4f5c" fontWeight={500}>
            {partner.avg_score.toFixed(1)}
          </Text.FontSize20>
          <Text.FontSize20 color="#4d4f5c" fontWeight={500}>
            {`평가 ${partner.review_set.length}개`}
          </Text.FontSize20>
        </ProfileRating>*/}
      </ProfileInfo>
    )
  }
}

export default ProfileInfoContainer

const ProfileInfo = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 96px);
  padding: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  @media (min-width: 0px) and (max-width: 767.8px) {
    flex-direction: column;  
    align-items: flex-start;
    
  }
  @media (min-width: 768px) and (max-width: 991.98px) { 
    padding-right: 0 !important;
    width: calc(100% - 74px);
  }
`
const ProfileName = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;

  > p {
    :nth-of-type(1) {
      margin-right: 10px;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;

    > p {
      :nth-of-type(1) {
        margin-bottom: 5px;
      }
    }  
  }
`
const ProfileRating = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  margin-left: auto;
  > p {
    :nth-of-type(1) {
      margin: 0 5px;
      font-family: 'Montserrat', sans-serif;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > p:nth-of-type(2) {
      padding-top: 0;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > p:nth-of-type(2) {
      padding-bottom: 3px;
    }
  }
`



const ButtonBox = styled.div`
  height : 64px;
  width : 227px;
  display : inline-block;
  div:nth-of-type(1) {
    margin-right: 10px;
    width: 100% !important;
    height: fit-content;
    padding: 15px 0 !important;
    background-color: #ffc000 !important;;
    border: none;
    border-radius: 30px;
     @media (min-width: 0px) and (max-width: 767.98px) {
        margin-top: 30px;
    }

    > p {
        margin-top: 5px;
        color: #061953 !important;
        width: 161px !important;
        height: 27px !important;
        font-size: 17px !important;
        font-weight: bold;
        text-align: center;
        @media (min-width: 0px) and (max-width: 767.98px) {
            padding-top: 5px;
        }
      }
    :hover {
      background-color: ${WHITE};
      > p {

      }
    }
    @media (min-width: 0px) and (max-width: 767.98px) {
        width : 50%
        padding-top: 5px;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
  	    width : 30%
    }
  }
`;
