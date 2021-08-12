import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import * as Title from "components/Title";
import { toJS } from "mobx";

import SearchProjectModal from "./Modal/SearchProjectModal";
import SearchPartnerModal from "./Modal/SearchPartnerModal";
import QuestionContainer from "./Modal/QuestionBox";

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
    const { Partner } = this.props;
    if (Partner.reviewActiveIndex != 2) {
      Partner.reviewActiveIndex = 0;
    }
  };

  componentDidMount = () => {
    console.log("11111111111111111111111111");
    const { Partner } = this.props;
    Partner.ratingPoint = 0;
    window.scrollTo(0, 0);
  };

  starCheckHandler = async (star_id, bool) => {
    // console.log(`${star_id}번째 클릭 : ${bool}`);
    this.state.star_ary.map((data) => {
      //   console.log(data.id - 1);
      if (star_id === data.id - 1) {
        // console.log("TTTTTTTTTTT");
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
    //console.log(this.state.star_ary);
  };
  starRatingHandler = async (star_id) => {
    const { Partner } = this.props;
    //console.log(star_id);
    if (this.state.star_ary[star_id - 1].checked) {
      //this.state.star_ary[star_id - 1].checked = false;
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
    // console.log(toJS(Partner.ratingPoint));
  };

  openModal = () => {
    const { Partner } = this.props;

    // console.log("requestmodal open click");
    // this.setState({ modalOpen: true });

    Partner.searchProjectModalActive = true;
  };
  closeModal = () => {
    const { Partner } = this.props;
    // console.log("requestmodal close click");

    Partner.searchProjectModalActive = false;
  };
  checkIndex = (id, idx) => {
    const { Partner } = this.props;
    // console.log(typeof id);
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
    if (this.props.width > 768) {
      textareaLineHeight = 34;
      this.setState({ maxRows: 15 });
    } else {
      textareaLineHeight = 20;
      this.setState({ maxRows: 10 });
    }
    //const textareaLineHeight = 34;
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
  onSubmitReview = async () => {
    var formData = new FormData();

    const { Auth, Partner } = this.props;

    // console.log(toJS(Auth.logged_in_client.id));
    // console.log(toJS(Partner.reviewPartnerId));
    // console.log(toJS(Partner.projectName));

    // console.log(toJS(Partner.ratingPoint));
    // console.log(toJS(Partner.reviewKindnessIndex));
    // console.log(toJS(Partner.reviewCommunicationIndex));
    // console.log(toJS(Partner.reviewProfessionIndex));

    // console.log(toJS(Partner.reviewContent));

    // console.log(toJS(Partner.newPartner));
    // console.log(toJS(Partner.reviewPartnerName));
    if (!Partner.projectName) {
      alert("프로젝트 이름을 입력해주세요");
      return;
    }

    if (!Partner.reviewPartnerName) {
      alert("파트너가 입력되지 않았습니다. 다시 검색해주세요");
      return;
    }

    if (!Partner.ratingPoint) {
      alert("점수를 입력해주세요");
      return;
    }

    if (!Partner.reviewContent) {
      alert("리뷰 내용을 입력해주세요");
      return;
    }
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

    if (Partner.reviewLoading) {
      alert("요청 중입니다");
    }

    if (!Partner.reviewLoading) {
      Partner.reviewLoading = true;
      await Partner.setPartnerReview(formData);

      setTimeout(() => (Partner.reviewLoading = false), 2000);
    }
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
                  {this.props.width &&
                    (this.props.width > 767.99 ? (
                      <span>입력하기</span>
                    ) : (
                      <span>입력</span>
                    ))}
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
                    //this.openModal();
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
              //<span>만족도 5점을 주셨네요, 어떤점이 좋았나요?</span>
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
                //className={"textarea"}
                placeholderStyle={{ fontWeight: "400" }}
                onChange={this.reviewHandler}
              />
            </div>
          </Section>
          {this.props.width &&
            (this.props.width > 767.99 ? (
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
            ) : (
              <Footer>
                <div
                  onClick={() => {
                    this.onSubmitReview();
                  }}
                  style={{ marginRight: "0px", backgroundColor: "#0933b3" }}
                >
                  <span>작성하기</span>
                </div>
              </Footer>
            ))}

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

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 45px;
    padding-top: 70px;
    padding-bottom: 58px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 50px;
    padding-top: 80px;
    padding-bottom: 60px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    box-shadow: none;
    padding-top: 40px;
    margin-top: 20px;
  }
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      > img {
        width: 21px;
        height: 14px;
      }
    }
    > span {
      display: none;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div {
      width: 34px;
      height: 34px;
    }
    > span {
      font-size: 20px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div {
      width: 40px;
      height: 40px;
    }
    > span {
      font-size: 23px;
    }
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 86px;
    width: 90%;
    padding: 10px;
    margin-top: 50px;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (min-width: 0px) and (max-width: 767.98px) {
      align-items: center;
      height: 34px;
    }

    > span {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #282c36;
      font-weight: bold;
      @media (min-width: 0px) and (max-width: 767.98px) {
        font-size: 15px;
        line-height: 2.67;
        letter-spacing: -0.38px;
        text-align: left;
      }
    }
    > edit {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
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
      @media (min-width: 0px) and (max-width: 767.98px) {
        width: 73px;
        height: 26px;
      }
      > span {
        font-size: 18px;
        line-height: 34px;
        letter-spacing: -0.45px;
        color: #0933b3;
        font-weight: 500;
        @media (min-width: 0px) and (max-width: 767.98px) {
          font-size: 15px;
        }
      }
    }
  }
  > div:nth-of-type(1) {
    margin-bottom: 17px;
    @media (min-width: 0px) and (max-width: 767.98px) {
      margin-bottom: 0px;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      > edit {
        > span {
          font-size: 15px;
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 40px;

    height: 134px;

    padding: 20px 21px 10px 21px;

    > div {
      > span {
        font-size: 14px;
      }
      > edit {
        > span {
          font-size: 14px;
          margin-right: 7px;
        }
      }
      > div {
        width: 124px;
        height: 28px;
        > span {
          font-size: 14px;
        }
      }
    }
    > div:nth-of-type(1) {
      margin-bottom: 11px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 80%;
    height: 144px;

    margin-top: 40px;

    padding: 24px 30px 16px 30px;

    > div {
      > span {
        font-size: 16px;
      }
      > edit {
        > span {
          font-size: 16px;
          margin-right: 8px;
        }
      }
      > div {
        width: 130px;
        height: 32px;

        > span {
          font-size: 16px;
        }
      }
    }
    > div:nth-of-type(1) {
      margin-bottom: 15px;
    }
  }
`;
const StarBox = styled.div`
  margin-top: 45px;
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
    @media (min-width: 0px) and (max-width: 767.98px) {
      font-size: 16px;
      margin-bottom: 0px;
    }
  }
  > starcontainer {
    display: flex;
    justify-content: center;
    margin-bottom: 37px;
    @media (min-width: 0px) and (max-width: 767.98px) {
      margin-bottom: 0px;
    }
    > div {
      @media (min-width: 0px) and (max-width: 767.98px) {
        margin-bottom: 10px;
      }
      > img {
        width: 45px;
        height: 42px;
        @media (min-width: 0px) and (max-width: 767.98px) {
          width: 36px;
          height: 36px;
        }
      }
    }
  }
  > span:last-child {
    font-size: 16px;
    line-height: 40px;
    letter-spacing: -0.4px;
    color: #c6c7cc;
    font-weight: normal;
    @media (min-width: 0px) and (max-width: 767.98px) {
      display: none;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 36px;
    padding: 32px 0;

    > content {
      font-size: 18px;

      margin-bottom: 33px;
    }
    > starcontainer {
      > div {
        > img {
          width: 29px;
          height: 42px;
        }
      }
    }
    > span:last-child {
      font-size: 12px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 40px;
    padding: 36px 0;

    > content {
      font-size: 21px;

      margin-bottom: 36px;
    }
    > starcontainer {
      > div {
        > img {
          width: 36px;
          height: 42px;
        }
      }
    }
    > span:last-child {
      font-size: 14px;
    }
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 35px 0 35px 0;
  }
  > span {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: bold;
    margin-bottom: 22px;
    @media (min-width: 0px) and (max-width: 767.98px) {
      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.5;
      text-align: left;
      color: #282c36;
    }
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
      @media (min-width: 0px) and (max-width: 767.98px) {
        font-size: 14px;
      }
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;

    > span {
      font-size: 16px;

      margin-bottom: 12px;
    }

    > div {
      padding: 10px;
      > textarea {
        line-height: 20px;
        font-size: 12px;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 19px 0 98px 0;

    > span {
      font-size: 18px;

      margin-bottom: 18px;
    }

    > div {
      padding: 17px 18px 22px 19px;
      > textarea {
        // line-height: 20px;
        font-size: 14px;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 23px 0 128px 0;

    > span {
      font-size: 21px;

      margin-bottom: 20px;
    }

    > div {
      padding: 19px 20px 24px 21px;
      > textarea {
        font-size: 16px;
      }
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
    @media (min-width: 0px) and (max-width: 767.98px) {
      width: 164px;
      height: 44px;
    }
    span {
      font-size: 20px;
      line-height: 52px;
      letter-spacing: -0.5px;
      color: #ffffff;
      font-weight: bold;
      @media (min-width: 0px) and (max-width: 767.98px) {
        font-size: 16px;
      }
    }
  }
  > div:nth-of-type(1) {
    background-color: #c6c7cc;
    margin-right: 35px;
  }
  > div:nth-of-type(2) {
    background-color: #0933b3;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    div {
      width: 190px;
      height: 38px;

      span {
        font-size: 16px;
      }
    }
    > div:nth-of-type(1) {
      margin-right: 23px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    div {
      width: 224px;
      height: 51px;

      span {
        font-size: 18px;
      }
    }
    > div:nth-of-type(1) {
      margin-right: 28px;
    }
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
