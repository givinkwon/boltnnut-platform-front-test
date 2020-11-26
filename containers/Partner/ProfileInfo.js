import React, {Component} from "react"
import styled from "styled-components"
import Router from 'next/router';

import * as Text from "components/Text"
import Rating from "components/Rating"

import {BLACK1} from "static/style"
import {inject, observer} from "mobx-react";

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
            {Partner.getCityNameById(partner.city)}
          </Text.FontSize20>
        </ProfileName>
        {/*<ProfileRating onClick={this.pushToReview}>
          <Rating rating={partner.avg_score} />
          <Text.FontSize24 color="#4d4f5c" fontWeight={500} style={{fontFamily: 'Montserrat, sans-serif'}}>
            {partner.avg_score.toFixed(1)}
          </Text.FontSize24>
          <Text.FontSize12 color="#4d4f5c" fontWeight={500}>
            {`평가 ${partner.review_set.length}개`}
          </Text.FontSize12>
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
  @media (min-width: 0px) and (max-width: 991.98px) {
    flex-direction: column;  
    align-items: flex-start;
  }
`
const ProfileName = styled.div`
  display: flex;
  align-items: flex-end;

  > p {
    :nth-of-type(1) {
      margin-right: 10px;
    }
  }

  @media (min-width: 0px) and (max-width: 991.98px) {
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
  display: flex;
  align-items: center;
  margin-left: auto;
  > p {
     padding-top: 2px;
    :nth-of-type(1) {
      margin: 0 5px 2px;
    }
  }
  
  cursor: pointer;
`
