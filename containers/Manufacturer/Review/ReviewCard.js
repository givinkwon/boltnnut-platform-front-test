import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import ReviewStarRating from "../Review/ReviewStarRating";

const star = "/static/icon/star_blue3.svg";

@inject("Partner", "Auth")
@observer
class ReviewCard extends React.Component {
  state = {
    width: null,
  };

  componentDidMount = async () => {
    console.log("componentDidMount");

    const { Partner, data, totalCount, idx } = this.props;
    console.log(data);
    console.log(totalCount);
    if (data) {
      console.log(`client id : ${data.client_id}, idx : ${idx}`);
      await Partner.getClientNameById(data.client_id, idx);

      console.log(Partner.clientInfoList);
    }

  };
  componentWillUnmount = () => {
    const { Partner } = this.props;
    Partner.clientInfo = [];
    Partner.clientInfoList = [];

  };

  render() {
    const { data, width, Partner, categoryData, idx, totalCount } = this.props;
    console.log(toJS(Partner.clientInfoList));
    return (
      <>
        <Card>

          {Partner.clientInfoList[idx] ? (
            <name>{Partner.clientInfoList[idx].user.username}</name>
          ) : (
            <name>***</name>
          )}
          <score>
            <span>
              <ReviewStarRating
                width={15}
                margin={1}
                score={data.consult_score}
              />
            </span>
            <date>{data.date}</date>
          </score>
          <history>{data.projectname}</history>
          <content>{data.content}</content>
        </Card>
      </>
    );
  }
}

export default ReviewCard;

const stars = [1, 2, 3, 4, 5];
const Card = styled.div`
  //border: 3px solid green;
  width: 100%;
  //height: 30px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);

  //margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  //align-items: center;
  padding: 46px 23px 32px 26px;
  box-sizing: border-box;
  > score {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    > span:nth-of-type(1) {
      margin-right: 7px;
    }
    > date {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #a4aab4;
      font-weight: 500;
    }
  }
  > name {
    font-size: 18px;
    color: #191919;
    line-height: 27px;
    letter-spacing: -0.45px;
    font-weight: bold;
  }
  > history {
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.45px;
    color: #a4aab4;
    font-weight: normal;
    margin-bottom: 22px;
  }
  > content {
    white-space: break-spaces;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.45px;
    color: #282c36;
    font-weight: normal;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > score {
      > img {
        width: 16px;
      }
    }
    > name {
      font-size: 10px;
    }
    > content {
      font-size: 14px;
    }
  }
`;

const StarRating = styled.div``;

const StarImg = styled.div`
  margin-right: 5px;
  > img {
    filter: ${(props) => (props.starActive ? "sepia(63%) saturate(10)" : "")};
    cursor: pointer;
  }
`;
const NoCard = styled.div`
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  //top: 72%;
  //bottom: 50px;
  z-index: 20;
  display: ${(props) => (props.reviewDone ? "flex" : "none")};

  width: 30%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #0933b3;
  border-radius: 5px;
  > span {
    color: #ffffff;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 40%;
    height: 25px;
    > span {
      font-size: 12px;
    }
  }
`;
