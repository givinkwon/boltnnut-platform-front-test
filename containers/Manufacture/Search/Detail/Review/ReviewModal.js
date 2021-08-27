import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";
import StarRatingComponent from "react-star-rating-component";
import { componentByNodeRegistery } from "mobx-react";
import { inject, observer } from "mobx-react";
import * as PartnerAPI from "axios/Manufacture/Partner";
const star = "/static/icon/star.svg";

@inject("Partner", "Auth")
@observer
class ReviewModal extends React.Component {
  state = {
    width: null,
    search: null,
    rows: 1,
    value: "",
    minRows: 1,
    maxRows: 5,
    star_ary: [
      { id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: false },
      { id: 4, checked: false },
      { id: 5, checked: false },
    ],
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
  };

  reviewHandler = (event) => {
    let textareaLineHeight = 0;
    if (this.props.width > 797.98) {
      textareaLineHeight = 34;
      this.setState({ maxRows: 5 });
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

  onSubmit = async () => {
    const { Partner, Auth } = this.props;

    let score = 0;
    await this.state.star_ary.map((item, idx) => {
      if (item.checked) {
        score += 1;
      }
    });

    var formData = new FormData();

    formData.append("partnername", Partner.reviewPartnerName);
    formData.append("client", Auth.logged_in_client.id);
    formData.append("score", score);
    formData.append("content", Partner.reviewContent);

    const req = {
      data: formData,
    };

    ReviewAPI.setReview(req)
      .then((res) => {
        console.log("create: ", res);
        alert("리뷰 작성이 정상적으로 완료되었습니다");
        Partner.reviewModalActive = false;
        history.go(0);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  searchText = (e) => {
    const { Partner } = this.props;
    Partner.reviewPartnerName = e.target.value;

  };

  render() {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, children, width, data } = this.props;

    return (
      <ModalBox
        modal={open ? "openModal modal" : "modal"}
        style={{ display: open ? "block" : "none" }}
      >
        {open ? (
          <>
            <button
              className="close"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              {" "}
              &times;{" "}
            </button>
            <section>
              <header>{`${header}`}</header>
              <main>
                <div>
                  <span>제조사 이름</span>

                  <SearchBar>
                    <input
                      placeholder="이름을 입력하세요"
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) =>
                        (e.target.placeholder = "이름을 입력하세요")
                      }
                      onChange={this.searchText}
                      class="Input"
                      onKeyDown={this.handleKeyDown}
                    />
                  </SearchBar>
                </div>

                <div>
                  <span>별점</span>
                  <div>
                    <StarContainer>
                      <StarRating>
                        <div style={{ display: "flex" }}>
                          {this.state.star_ary.map((item, idx) => {
                            return (
                              <StarImg starActive={item.checked}>
                                <img
                                  src={star}
                                  onClick={() =>
                                    this.starRatingHandler(idx + 1)
                                  }
                                />
                              </StarImg>
                            );
                          })}
                        </div>
                      </StarRating>
                    </StarContainer>
                  </div>
                </div>
                <div>
                  <span style={{ alignSelf: "self-start", marginTop: "10px" }}>
                    리뷰
                  </span>
                  <div>
                    <textarea
                      placeholder="리뷰를 작성해주세요"
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) => {
                        e.target.placeholder = "리뷰를 작성해주세요";
                      }}
                      rows={this.state.rows}
                      value={this.state.value}
                      placeholderStyle={{ fontWeight: "400" }}
                      onChange={this.reviewHandler}
                    />
                  </div>
                </div>
              </main>
              <footer onClick={() => this.onSubmit()}>
                <div>작성하기</div>
              </footer>
            </section>
          </>
        ) : null}
      </ModalBox>
    );
  }
}

export default ReviewModal;

const star_ary = [
  { id: 1, checked: false },
  { id: 2, checked: false },
  { id: 3, checked: false },
  { id: 4, checked: false },
  { id: 5, checked: false },
];

const ModalBox = styled.div`
  // display: none;
  position: fixed;
  //top: 40%;
  //right: 14%;
  // bottom: 0;
  // left: 0;
  z-index: 101;
  background-color: white;
  height: 500px;
  width: 60%;
  right: 20%;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 40%);
  border-radius: 10px;

  > section {
    max-width: 900px;
    width: 90%;
    height: 87%;
    margin: 0 auto;
    border-radius: 0.3rem;
    //background-color: blanchedalmond;
    //border: 1px solid blue;
    > header {
      position: relative;
      padding: 16px;
      //padding-top: 0;
      //background-color: #f1f1f1;
      font-weight: 700;
      // margin-bottom: 30px;
      text-align: center;
      border-bottom: 3px solid #f1f1f1;
      font-size: 30px;
    }
    > main {
      background-color: white;
      //font-color: white;
      text-align: center;
      //   display: flex;
      //   flex-direction: column;
      //   justify-content: center;
      //   align-items: center;
      height: 85%;
      font-size: 20px;
      font-weight: 600;
      padding-top: 30px;
      box-sizing: border-box;

      > div {
        display: flex;
        margin-bottom: 20px;
        > span {
          width: 18%;
          align-self: center;
          text-align: right;
          margin-right: 15px;
        }

        > div {
          width: 100%;

          > textarea {
            resize: none;
            //border: 1px solid #ffffff;
            width: 100%;
            padding: 14px 16px;
            box-sizing: border-box;
            font-size: 15px;
            line-height: 34px;
            letter-spzcing: -0.45px;
            color: #282c36;
            border-radius: 5px;
            overflow: auto;
            height: auto;
            font-family: inherit;
            :focus {
              outline: none;
            }
            :placeholder {
              font-weight: normal;
            }
            white-space: pre-line;
          }
        }
      }
    }
    > footer {
      background-color: #0933b3;
      color: white;
      text-align: center;
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      > div {
        font-size: 22px;
      }
    }
  }
  > button {
    outline: none;
    cursor: pointer;
    border: 0;

    font-size: 21px;
    font-weight: 700;
    //margin-left: 10px;
    margin: 10px 10px 0 0;
    float: right;
    color: #000000;
    border-radius: 50%;
    background-color: #f1f1f1;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    position: fixed;

    z-index: 101;

    height: 500px;
    width: 90%;
    right: 5%;

    > section {
      max-width: 100%;
      width: 90%;
      height: 77%;

      > header {
        position: relative;
        padding: 8px;

        font-weight: 600;

        font-size: 16px;
      }
      > main {
        height: 95%;
        font-size: 13px;
        font-weight: 600;
        > div {
          > div {
            > textarea {
              padding: 10px 12px;
              box-sizing: border-box;
              font-size: 11px;
              line-height: 20px;
              letter-spzcing: -0.45px;
              color: #282c36;
              border-radius: 5px;
              overflow: auto;
              height: auto;
              font-family: inherit;
            }
          }
        }
      }
      > footer {
        border-radius: 5px;
        cursor: pointer;
        height: 40px;
        > div {
          font-size: 13px;
        }
      }
    }
    > button {
      font-size: 12px;
      margin: 10px 10px 0 0;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;

const SearchBar = styled.div`
  display: flex;
  //width: 690px;
  height: 44px;
  box-sizing: border-box;
  //margin 0 24px;

  input {
    width: 100%;
    padding: 0 14px;

    border: 1px solid #c6c7cc;
    border-radius: 3px;
    :focus {
      outline: none;
    }
    ::placeholder {
      color: #c1bfbf;
    }

    @media (min-width: 0px) and (max-width: 767.98px) {
      height: 40px;
      input {
        width: 90%;
      }
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    // margin-top: 30px;
    flex-direction: column;
    input {
      font-size: 12px;
      width: 87%;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    // margin-top: 30px;
    input {
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    // margin-top: 40px;
    input {
      font-size: 17px;
    }
  }
  @media (min-width: 1300px) {
    input {
      font-size: 18px;
    }
  }
`;

const MyStarRatingComponent = styled(StarRatingComponent)`
  @media (min-width: 0px) and (max-width: 767.98px) {
    > label {
      > i {
        font-size: 8px;
      }
    }
  }
`;

const StarContainer = styled.div``;
const StarRating = styled.div`
  //   width: 304px;
  //   display: inline-block;
  //   height: 55px;
  //   overflow: hidden;
  //   background: url("/static/icon/info/star.png") no-repeat;
  //   > span {
  //     line-height: 0;
  //     vertical-align: top;
  //     width: 100%;
  //     display: inline-block;
  //     height: 55px;
  //     overflow: hidden;
  //     background: url("/static/icon/info/star.png") no-repeat;
  //     background-position: left-bottom;
  //   }
  > div {
    > img {
    }
  }
`;

const StarImg = styled.div`
  margin-right: 5px;
  > img {
    filter: ${(props) => (props.starActive ? "sepia(63%) saturate(10)" : "")};
    cursor: pointer;
  }
`;
