import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { isElementAccessExpression } from "typescript";

const star = "/static/icon/star.svg";

@inject("Partner", "Auth")
@observer
class PastReviewCard extends React.Component {
  // constructor (props) {
  //     super(props);
  //     this.hideLoader = this.hideLoader.bind(this);
  // }
  state = {
    width: null,
  };

  componentDidMount = async () => {
    console.log("componentDidMount");
    const { Partner, Auth } = this.props;
    await Partner.getReview();

    console.log(toJS(Partner.review_ary));
    await Partner.getClientEmail();
    if (Partner.review_user_ary) {
      this.setState({ g: 3 });
    }
  };
  componentWillUnmount = () => {
    const { Partner } = this.props;
    Partner.review_ary = [];
    Partner.loadReviewData = 0;
    Partner.review_user_ary = [];
  };

  render() {
    const { data, width, Partner, categoryData, idx } = this.props;

    return (
      <>
        {/* {console.log("renderrenderrenderrenderrenderrenderrenderrenderrender")} */}
        {/* {console.log(Partner.review_ary.length)}
        {!Partner.review_ary.length && (
          
        )} */}

        {Partner.loadReviewData === 1 &&
          Partner.review_ary.map((item, idx) => (
            <Card>
              <score>
                <span>
                  {item.score
                    ? stars.map((data, id) => {
                        if (id < item.score) {
                          return (
                            <img
                              src={star}
                              style={{ filter: "sepia(63%) saturate(10)" }}
                            />
                          );
                        } else {
                          return <img src={star} />;
                        }
                      })
                    : "None"}
                </span>
                <span>{`   ${item.score}`}</span>
              </score>
              {/* <name>{item.client}</name> */}
              {/* <name>{Partner.userEmail}</name> */}

              {/* console.log를 찍어야 값이 출력 (??) */}
              {/* {console.log(toJS(Partner.review_user_ary))} */}
              {Partner.review_user_ary && (
                <name>{Partner.review_user_ary[idx]}</name>
              )}

              <content>{item.content}</content>
            </Card>
          ))}
        {Partner.loadReviewData === -1 && (
          <NoCard reviewDone={Partner.review_done}>
            <span>등록된 리뷰가 없습니다</span>
          </NoCard>
          // <h1></h1>
        )}
      </>
    );
  }
}

export default PastReviewCard;

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
  padding: 15px 0 15px 10px;
  box-sizing: border-box;
  > score {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    font-weight: 600;
    > span:nth-of-type(1) {
      margin-right: 7px;
    }
  }
  > name {
    font-size: 14px;
    color: rgb(202, 202, 202);
    margin-bottom: 15px;
  }
  > content {
    white-space: break-spaces;
    font-size: 16px;
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
