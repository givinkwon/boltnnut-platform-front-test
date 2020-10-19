import React, {Component} from "react"
import styled from "styled-components"

import * as Text from "components/Text"
import Rating from "components/Rating"

import {BLACK1} from "static/style"
import {inject, observer} from "mobx-react";

@inject('Answer')
@observer
class ProfileInfoContainer extends Component {
  render() {
    const {Answer, partner} = this.props;

    return (
      <ProfileInfo>
        <ProfileName>
          <Text.FontSize32 color={BLACK1} fontWeight={700}>
            {partner.name}
          </Text.FontSize32>

          <Text.FontSize20 color={BLACK1} fontWeight={300}>
            {partner && partner.city && Answer.city_list && Answer.getCityById(partner.city).city}
          </Text.FontSize20>
        </ProfileName>

        <ProfileRating>
          <Rating rating={partner.avg_score} />

          <RatingText color="#4d4f5c" fontWeight={500} style={{fontFamily: 'Montserrat sans-serif', marginBottom: -3}}>
            {partner.avg_score.toFixed(1)}
          </RatingText>

          <RatingCount color="#4d4f5c" fontWeight={400} style={{marginBottom: 2}}>
            {`평가 ${partner.review_set.length}개`}
          </RatingCount>
        </ProfileRating>
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
  border-bottom: 1px solid #001a5620;
  @media (min-width: 0px) and (max-width: 991.98px) {
    box-sizing: border-box;
    width: calc(100% - 60px);
    padding: 10px 0;
    border-bottom: 0;
    margin-bottom: 0;
    flex-direction: column;  
    align-items: flex-start;
  }
`
const ProfileName = styled.div`
  display: flex;
  align-items: center;

  > p {
    :nth-of-type(1) {
      margin-right: 10px;
    }
  }

  @media (min-width: 0px) and (max-width: 991.98px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 4px;
    margin-bottom: 15px;

    > p {
      :nth-of-type(1) {
      }
    }  
  }
`
const ProfileRating = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: auto;
  > p {
    :nth-of-type(1) {
      margin: 0 5px;
    }
  }
  
  @media (min-width: 0px) and (max-width: 991.98px) {
    margin-left: auto;
    margin-right: 0;
  }
`

const RatingText = styled(Text.FontSize28)` 
  @media (min-width: 0px) and (max-width: 991.98px) {
    margin-bottom: -2px !important;
  }
  @media (max-width: 767.98px) and (min-width: 0px) {
    font-size: 20px !important
  }
`
const RatingCount = styled(Text.FontSize18)`
  @media (min-width: 0px) and (max-width: 991.98px) {
    margin-bottom: 3px !important;
  }
`