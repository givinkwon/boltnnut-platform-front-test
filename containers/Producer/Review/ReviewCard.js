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
    const { Partner, data, totalCount, idx } = this.props;
    if (data) {
      await Partner.getClientNameById(data.client, idx);
    }
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

    return (
      <>
        <Card active={!Partner.reviewWritingModalActive}>
          {Partner.review_client_obj[idx] &&
            Partner.review_client_obj[idx].toString().length && (
              <>
                <name>
                  {`${Partner.review_client_obj[idx]
                    .toString()
                    .substr(0, 2)
                    .replace(/ /gi, "")}
                  ${"*".repeat(
                    Partner.review_client_obj[idx].toString().length - 2
                  )}님`}
                </name>
              </>
            )}

          {/* {Partner.review_client_obj[idx] ? (
            <name>{Partner.review_client_obj[idx]}</name>
          ) : (
            <name>***</name>
          )} */}

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
          </score>

          <history>{data.projectname}</history>
          <content>{data.content}</content>
        </Card>
      </>
    );
  }
}

export default ReviewCard;

const Card = styled.div`
  filter: ${(props) => (props.active ? "blur(9px)" : "")};
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
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

  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 30px 17px 21px 17px;

    > score {
      margin-bottom: 3px;

      > span:nth-of-type(1) {
        margin-right: 5px;
      }
      > date {
        font-size: 14px;
        line-height: 24px;
      }
    }
    > name {
      font-size: 14px;
    }
    > history {
      font-size: 14px;
      line-height: 16px;

      margin-bottom: 14px;
    }
    > content {
      font-size: 14px;
      line-height: 16px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 38px 20px 26px 22px;

    > score {
      margin-bottom: 4px;

      > span:nth-of-type(1) {
        margin-right: 6px;
      }
      > date {
        font-size: 16px;
        line-height: 32px;
      }
    }
    > name {
      font-size: 16px;
    }
    > history {
      font-size: 16px;
      line-height: 22px;

      margin-bottom: 18px;
    }
    > content {
      font-size: 16px;
      line-height: 22px;
    }
  }
`;
