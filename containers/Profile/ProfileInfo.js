import React, {Component} from "react"
import styled from "styled-components"

import * as Text from "components/Text"
import Rating from "components/Rating"

import {BLACK1} from "static/style"
import {inject, observer} from "mobx-react";

@inject('Profile')
@observer
class ProfileInfoContainer extends Component {
  render() {
    const {Profile, partner} = this.props;
    const city = Profile.getCityById(partner.city)
    const region = Profile.getRegionById(partner.region)

    return (
      <ProfileInfo>
        <ProfileName>
          <Text.FontSize32 color="#404040" fontWeight={700}>
            {partner.name}
          </Text.FontSize32>

          <Text.FontSize20 color="#404040" fontWeight={400}>
            {city && city.city} {region && region.region}
          </Text.FontSize20>
        </ProfileName>
        <ProfileRating>
          <Rating rating={partner.avg_score} />
          <Text.FontSize20 color="#4d4f5c" fontWeight={500} style={{fontFamily: 'Montserrat, sans-serif'}}>
            {partner.avg_score.toFixed(1)}
          </Text.FontSize20>
          <Text.FontSize24 color="#4d4f5c" fontWeight={500}>
            {`평가 ${partner.review_set.length}개`}
          </Text.FontSize24>
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
  border-bottom: 1px solid #ccc;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;  
    align-items: flex-start;
    margin-left: 0;
    padding: 0 10px 5px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    
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

  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    align-items: flex-start;
    
    > p {
      :nth-of-type(1) {
        margin: 0 0 5px;
      }
    }  
    > p {
      :nth-of-type(2) {
        margin: 0 0 8px;
      }
    }  
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > p {
      :nth-of-type(1) {
      }
    }  
  }
`
const ProfileRating = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  > p {
    :nth-of-type(1) {
      margin: 0 5px;
    }
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    > p {
      :nth-of-type(2) {
        font-size: 14px;
      }
    }  
  }
  
  @media (min-width: 768px) and (max-width: 991.98px) {
    > p {
      :nth-of-type(2) {
        margin-bottom: 3px;
      }
    }  
  }
`
