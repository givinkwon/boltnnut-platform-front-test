import React, {Component} from "react"
import styled from "styled-components"

import * as Text from "components/Text"
import Rating from "components/Rating"
import Button from "components/Button";

import {WHITE, BLACK1, PRIMARY} from "static/style"
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
            {partner && partner.name}
          </Text.FontSize32>
          <Text.FontSize24 color={PRIMARY} fontWeight={500}>
            {partner && partner.user.phone}
          </Text.FontSize24>
          {/*<Text.FontSize24 color={PRIMARY} fontWeight={500}>
            &nbsp;{partner && partner.user.username}
          </Text.FontSize24>*/}
          {/*<Text.FontSize20 color={BLACK1} fontWeight={300}>
            {partner && Answer.getCityNameById(partner.city)}
          </Text.FontSize20>*/}


        </ProfileName>
        <ProfileRating>
          <Rating rating={partner && partner.avg_score} />
          <Text.FontSize20 color="#4d4f5c" fontWeight={500}>
            {partner && partner.avg_score.toFixed(1)}
          </Text.FontSize20>
          <Text.FontSize12 color="#4d4f5c" fontWeight={500}>
            {`평가 ${partner && partner.review_set.length}개`}
          </Text.FontSize12>
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
      margin: 0 5px;
    }
  }
  @media (min-width: 0px) and (max-width: 991.98px) {
    > p:nth-of-type(2) {
      padding-top: 0;
    }
  }
`

const ButtonBox = styled.div`
  display: flex;
  div:nth-of-type(1) {
    margin-top: 30px;
    margin-right: 10px;
    height: fit-content;
    padding: 15px 0 !important;
    background-color: #00D25F;
    border: none;
    border-radius: 30px;

    :hover {
      background-color: ${WHITE};
      > p {
        color: #001a56 !important;
      }
    }
  }
`;