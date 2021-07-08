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
    // console.log(data);
    // console.log(totalCount);
    if (data) {
      // console.log(`client id : ${data.client}, idx : ${idx}`);
      // await Partner.getClientInfo(data.client);
      await Partner.getClientNameById(data.client, idx);

      // console.log(Partner.clientInfo);
      // console.log(Partner.clientInfoList);
      // Partner.clientInfo.name
      // Partner.clientInfo.user.username
    }

    // const { Partner, Auth } = this.props;
    // await Partner.getReview();

    // console.log(toJS(Partner.review_ary));
    // await Partner.getClientEmail();
    // if (Partner.review_user_ary) {
    //   this.setState({ g: 3 });
    // }
  };
  componentWillUnmount = () => {
    const { Partner } = this.props;
    Partner.clientInfo = [];
    Partner.clientInfoList = [];
    // Partner.review_ary = [];
    // Partner.loadReviewData = 0;
    // Partner.review_user_ary = [];
  };

  render() {
    const { data, width, Partner, categoryData, idx, totalCount } = this.props;
    // console.log(data);
    // console.log(toJS(Partner.partnerReviewList));
    // console.log(toJS(Partner.clientInfoList));
    return (
      <>
        <Card>
          {/* {Partner.clientInfo.user ? (
            <name>{Partner.clientInfo.user.username}</name>
          ) : (
            <name>***</name>
          )} */}
          {/* {Partner.clientInfoList[idx] ? (
            <name>{Partner.clientInfoList[idx].user.username}</name>
          ) : (
            <name>***</name>
          )} */}
          {Partner.review_client_obj[idx] ? (
            <name>{Partner.review_client_obj[idx] + " 님"}</name>
          ) : (
            <name>*** 님</name>
          )}
          {/* {Partner.clientInfoList[data.client] ? (
            <name>{Partner.clientInfoList[data.client].user.username}</name>
          ) : (
            <name>***</name>
          )} */}
          <score>
            <span>
              <ReviewStarRating
                width={15}
                margin={1}
                score={data.consult_score}
              />
            </span>
            <date>{data.date}</date>
            {/* <span>{`   ${item.score}`}</span> */}
          </score>
          <history>{data.projectname}</history>
          {/* <history>
            {Partner.review_client_obj &&
              console.log(`${idx} ++++++ ${Partner.review_client_obj[idx]}`)}

            {Partner.review_client_obj && Partner.review_client_obj[idx]}
          </history> */}
          <content>{data.content}</content>
          {/* {Partner.review_user_ary && (
                <name>{Partner.review_user_ary[idx]}</name>
              )} */}
          {/* <content>{item.content}</content> */}
        </Card>

        {/* {Partner.loadReviewData === -1 && (
          <NoCard reviewDone={Partner.review_done}>
            <span>등록된 리뷰가 없습니다</span>
          </NoCard>
          // <h1></h1>
        )} */}
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 12px;
  }
  > score {
    // margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    @media (min-width: 0px) and (max-width: 767.98px) {
      height: 30px;
    }
    > span:nth-of-type(1) {
      margin-right: 7px;
    }
    > date {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #a4aab4;
      font-weight: 500;
      @media (min-width: 0px) and (max-width: 767.98px) {
        font-size: 12px;
        color: #a4aab4;
        width: 175px;
      }
    }
  }
  > name {
    font-size: 18px;
    color: #191919;
    // line-height: 27px;
    letter-spacing: -0.45px;
    font-weight: bold;
    @media (min-width: 0px) and (max-width: 767.98px) {
      font-size: 12px;
    }
  }
  > history {
    font-size: 18px;
    // line-height: 27px;
    letter-spacing: -0.45px;
    color: #a4aab4;
    font-weight: normal;
    margin-bottom: 22px;
    @media (min-width: 0px) and (max-width: 767.98px) {
      font-size: 12px;
      color: #a4aab4;
    }
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
