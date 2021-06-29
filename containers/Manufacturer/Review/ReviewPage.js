import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import * as Title from "components/Title";
import { toJS } from "mobx";

import SearchProjectModal from "../Modal/SearchProjectModal";
import SearchPartnerModal from "../Modal/SearchPartnerModal";
import QuestionContainer from "../Modal/QuestionBox";

const checkImg = "/static/images/pass8.png";
const star = "/static/icon/star_blue3.svg";
const editImg = "/static/icon/edit.svg";

@inject("Auth", "Partner")
@observer
class ReviewPage extends React.Component {
  state = {
    search: null,
    rows: 1,
    value: "",
    minRows: 1,
    maxRows: 45,
    star_ary: [
      {
        id: 1,
        checked: false,
        content: "매우 나빠요",
        content2: "만족도 1점을 주셨네요, 어떤점이 안 좋았나요?",
      },
      {
        id: 2,
        checked: false,
        content: "나빠요",
        content2: "만족도 2점을 주셨네요, 어떤점이 안 좋았나요?",
      },
      {
        id: 3,
        checked: false,
        content: "보통이에요",
        content2: "만족도 3점을 주셨네요, 어떤점이 좋았나요?",
      },
      {
        id: 4,
        checked: false,
        content: "좋아요",
        content2: "만족도 4점을 주셨네요, 어떤점이 좋았나요?",
      },
      {
        id: 5,
        checked: false,
        content: "매우 좋아요",
        content2: "만족도 5점을 주셨네요, 어떤점이 좋았나요?",
      },
    ],
  };

  componentWillUnmount = () => {
    console.log("22222222222222222222222222");
  };

  componentDidMount = () => {
    console.log("11111111111111111111111111");
    const { Partner } = this.props;
    Partner.ratingPoint = 0;
    window.scrollTo(0, 0);
  };

  starCheckHandler = async (star_id, bool) => {
    this.state.star_ary.map((data) => {
      if (star_id === data.id - 1) {
      }
    });
    await this.setState({
      star_ary: this.state.star_ary.map((data) =>
        star_id + 1 == data.id
          ? {
              ...data,
              checked: bool,
            }
          : data
      ),
    });
  };
  starRatingHandler = async (star_id) => {
    const { Partner } = this.props;
    if (this.state.star_ary[star_id - 1].checked) {
      const bool = false;

      for (let i = 0; i < star_id - 1; i++) {}
      for (let i = star_id; i < 5; i++) {
        await this.starCheckHandler(i, bool);
      }
    } else {
      const bool = true;
      for (let i = 0; i < star_id; i++) {
        await this.starCheckHandler(i, bool);
      }
    }
    Partner.ratingPoint = star_id;
  };

  openModal = () => {
    const { Partner } = this.props;


    Partner.searchProjectModalActive = true;
  };
  closeModal = () => {
    const { Partner } = this.props;

    Partner.searchProjectModalActive = false;
  };
  checkIndex = (id, idx) => {
    const { Partner } = this.props;

    switch (id) {
      case "1":
        Partner.reviewKindnessIndex = idx;
        break;
      case "2":
        Partner.reviewCommunicationIndex = idx;
        break;
      case "3":
        Partner.reviewProfessionIndex = idx;
        break;
    }
  };

  reviewHandler = (event) => {
    let textareaLineHeight = 0;
    if (this.props.width > 797.98) {
      textareaLineHeight = 34;
      this.setState({ maxRows: 15 });
    } else {
      textareaLineHeight = 20;
      this.setState({ maxRows: 10 });
    }

    const { minRows, maxRows } = this.state;
    const { Partner } = this.props;
    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });

    Partner.reviewContent = event.target.value;
  };

  onCancelReview = () => {
    const { Auth, Partner } = this.props;
    Partner.resetReviewData();
    Partner.reviewActiveIndex = 0;
  };
  onSubmitReview = () => {
    var formData = new FormData();

    const { Auth, Partner } = this.props;

    const now = new Date();
    console.log(now.toLocaleDateString().replace(/(\s*)/g, ""));

    formData.append("client", Auth.logged_in_client.id);
    formData.append("partner", Partner.reviewPartnerId);
    formData.append("projectname", Partner.projectName);
    formData.append("date", now.toLocaleDateString().replace(/(\s*)/g, ""));

    formData.append("consult_score", Partner.ratingPoint);

    switch (Partner.ratingPoint) {
      case 5:
        formData.append("kindness_score", Partner.reviewKindnessIndex + 2);
        formData.append(
          "communication_score",
          Partner.reviewCommunicationIndex + 2
        );
        formData.append("profession_score", Partner.reviewProfessionIndex + 2);
        break;
      case 4:
        formData.append("kindness_score", Partner.reviewKindnessIndex + 1);
        formData.append(
          "communication_score",
          Partner.reviewCommunicationIndex + 1
        );
        formData.append("profession_score", Partner.reviewProfessionIndex + 1);
        break;
      default:
        formData.append("kindness_score", Partner.reviewKindnessIndex);
        formData.append(
          "communication_score",
          Partner.reviewCommunicationIndex
        );
        formData.append("profession_score", Partner.reviewProfessionIndex);
    }

    formData.append("content", Partner.reviewContent);

    formData.append("new_partner", Partner.newPartner);
    formData.append("partner_name", Partner.reviewPartnerName);

    Partner.setPartnerReview(formData);
  };
  render() {
    const { Partner, width } = this.props;
    return (
      <>
        <Card>
          <Header>
            <div>
              <img src={checkImg} />
            </div>
            <span>평가 작성</span>
          </Header>
          <Search>
            <div>
              <span>프로젝트명</span>
              {Partner.reviewSearchStep == 1 ? (
                <div
                  onClick={() => {
                    console.log("onClick!");
                    this.openModal();
                  }}
                >
                  <span>입력하기</span>
                </div>
              ) : (
                <edit
                  onClick={() => {
                    this.openModal();
                  }}
                >
                  <span>{Partner.projectName}</span>
                  <img src={editImg} />
                </edit>
              )}
            </div>

            <div>
              <span>파트너</span>
              {Partner.reviewSearchStep == 1 ? (
                <div
                  onClick={() => {
                    this.openModal();
                  }}
                >
                  <span>검색</span>
                </div>
              ) : (
                <edit
                  onClick={() => {
                    Partner.searchPartnerModalActive = true;
                  }}
                >
                  <span>{Partner.reviewPartnerName}</span>
                  <img src={editImg} />
                </edit>
              )}
            </div>
          </Search>
          <StarBox>
            <content>이 파트너와 상담은 어떠셨나요?</content>
            <starcontainer>
              {this.state.star_ary.map((item, idx) => {
                return (
                  <StarImg starActive={item.checked}>
                    <img
                      src={star}
                      onClick={() => this.starRatingHandler(idx + 1)}
                    />
                  </StarImg>
                );
              })}
            </starcontainer>

            {Partner.ratingPoint == 0 ? (
              <span>선택해주세요.</span>
            ) : (
              <span
                style={{
                  fontSize: "16px",
                  color: "#0933b3",
                  fontWeight: "500",
                }}
              >
                {this.state.star_ary[Partner.ratingPoint - 1].content}
              </span>
            )}
          </StarBox>
          <QuestionBox>
            <QuestionContainer
              id="1"
              Array={Partner.reviewKindnessAry}
              header="파트너는 친절했나요?"
              checkIndex={Partner.reviewKindnessIndex}
              checkIndexFunc={this.checkIndex}
            />
            <QuestionContainer
              id="2"
              Array={Partner.reviewCommunicationAry}
              header="소통이 원활했나요?"
              checkIndex={Partner.reviewCommunicationIndex}
              checkIndexFunc={this.checkIndex}
            />
            <QuestionContainer
              id="3"
              Array={Partner.reviewProfessionAry}
              header="전문성이 도움이 되었나요?"
              checkIndex={Partner.reviewProfessionIndex}
              checkIndexFunc={this.checkIndex}
            />
          </QuestionBox>
          <Section>
            {Partner.ratingPoint ? (
              <span>
                {console.log(toJS(Partner.ratingPoint))}
                {this.state.star_ary[Partner.ratingPoint - 1].content2}
              </span>
            ) : (
              ""
            )}
            <div>
              <textarea
                placeholder="리뷰를 작성해주세요"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => {
                  e.target.placeholder = "리뷰를 작성해주세요";
                }}
                rows={this.state.rows}
                value={Partner.reviewContent}
                defaultValue={Partner.reviewContent}
                placeholderStyle={{ fontWeight: "400" }}
                onChange={this.reviewHandler}
              />
            </div>
          </Section>
          <Footer>
            <div
              onClick={() => {
                this.onCancelReview();
              }}
            >
              <span>취소</span>
            </div>

            <div
              onClick={() => {
                this.onSubmitReview();
              }}
            >
              <span>작성하기</span>
            </div>
          </Footer>

          {Partner.searchProjectModalActive && (
            <Layer>
              <span>
                <SearchProjectModal
                  width={width}
                  open={Partner.searchProjectModalActive}
                  close={this.closeModal}
                />
              </span>
            </Layer>
          )}

          {Partner.searchPartnerModalActive && (
            <Layer>
              <span>
                <SearchPartnerModal
                  width={width}
                  open={Partner.searchPartnerModalActive}
                  close={this.closeModal}
                />
              </span>
            </Layer>
          )}
        </Card>
      </>
    );
  }
}

export default ReviewPage;

const Card = styled.div`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  width: 100%;
  // height: 2100px;
  margin-top: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 132px;
  padding-bottom: 116px;
  box-sizing: border-box;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    width: 48px;
    height: 48px;
    border: 2px solid #0933b3;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > span {
    font-size: 26px;
    line-height: 40px;
    letter-spacing: -0.65px;
    color: #0933b3;
    font-weight: bold;
    margin-top: 14px;
  }
`;
const Search = styled.div`
  width: 80%;
  height: 144px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  margin-top: 49px;

  display: flex;
  flex-direction: column;

  padding: 28px 54px 19px 43px;
  box-sizing: border-box;
  > div {
    display: flex;
    justify-content: space-between;
    > span {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #282c36;
      font-weight: bold;
    }
    > edit {
      cursor: pointer;
      > span {
        font-size: 18px;
        line-height: 34px;
        letter-spacing: 0.45px;
        color: #414550;
        font-weight: normal;
        margin-right: 10px;
      }
    }
    > div {
      border: 1px solid #c6c7cc;
      border-radius: 3px;
      width: 149px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      > span {
        font-size: 18px;
        line-height: 34px;
        letter-spacing: -0.45px;
        color: #0933b3;
        font-weight: 500;
      }
    }
  }
  > div:nth-of-type(1) {
    margin-bottom: 17px;
  }
`;
const StarBox = styled.div`
  margin-top: 45px;
  padding: 41px 0;
  box-sizing: border-box;
  border-top: 1px solid #e1e2e4;
  border-bottom: 1px solid #e1e2e4;
  // height: 263px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 41px 0;
  box-sizing: border-box;
  > content {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: normal;
    margin-bottom: 41px;
  }
  > starcontainer {
    display: flex;
    justify-content: center;
    margin-bottom: 37px;
    > div {
      > img {
        width: 45px;
        height: 42px;
      }
    }
  }
  > span:last-child {
    font-size: 16px;
    line-height: 40px;
    letter-spacing: -0.4px;
    color: #c6c7cc;
    font-weight: normal;
  }
`;
const QuestionBox = styled.div`
  width: 80%;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding: 29px 0 168px 0;
  box-sizing: border-box;

  > span {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: bold;
    margin-bottom: 22px;
  }

  > div {
    width: 100%;
    border: 1px solid #c6c7cc;
    border-radius: 5px;
    background-color: #f6f6f6;
    padding: 22px 23px 27px 24px;
    box-sizing: border-box;
    > textarea {
      resize: none;
      width: 100%;
      font-size: 18px;
      line-height: 34px;
      letter-spzcing: -0.45px;
      color: #414550;
      font-weight: normal;
      overflow: auto;
      height: auto;
      font-family: inherit;
      background-color: #f6f6f6;
      border: none;
      :focus {
        outline: none;
      }
      :placeholder {
        font-weight: normal;
      }
      white-space: pre-line;
    }
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;

  div {
    border-radius: 3px;
    width: 242px;
    height: 61px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
      font-size: 20px;
      line-height: 52px;
      letter-spacing: -0.5px;
      color: #ffffff;
      font-weight: bold;
    }
  }
  > div:nth-of-type(1) {
    background-color: #c6c7cc;
    margin-right: 35px;
  }
  > div:nth-of-type(2) {
    background-color: #0933b3;
  }
`;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.5);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;
const StarImg = styled.div`
  margin-right: 5px;
  > img {
    filter: ${(props) =>
      props.starActive
        ? "sepia(80%) saturate(10)"
        : "invert(0.5) opacity(0.5)"};
    cursor: pointer;
  }
`;
