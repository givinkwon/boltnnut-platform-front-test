import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";
import StarRatingComponent from "react-star-rating-component";
import { componentByNodeRegistery } from "mobx-react";
import { inject, observer } from "mobx-react";
import * as PartnerAPI from "axios/Partner";

const star = "/static/icon/star.svg";

@inject("Partner", "Auth")
@observer
class SearchProjectModal extends React.Component {
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

  moveReviewPage = () => {
    const { Partner } = this.props;

    if (Partner.reviewSearchStep == 2) {
      Partner.searchProjectModalActive = false;
    } else {
      Partner.searchProjectModalActive = false;
      Partner.searchPartnerModalActive = true;
    }
  };

  closeModal = () => {
    const { Partner } = this.props;
    Partner.searchProjectModalActive = false;
  };

  render() {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, children, width, data, Partner } = this.props;
    return (
      <ModalBox
        modal={open ? "openModal modal" : "modal"}
        style={{ display: open ? "block" : "none" }}
      >
        {open ? (
          <>
            <section>
              <header>프로젝트명</header>
              <main>
                <div>
                  <input
                    placeholder="진행했던 프로젝트를 입력해주세요."
                    defaultValue={
                      Partner.projectName ? Partner.projectName : ""
                    }
                    onBlur={(e) => {
                      Partner.projectName = e.target.value;
                      if (Partner.reviewSearchStep == 2) {
                        e.target.value = Partner.projectName;
                      } else {
                        e.target.placeholder =
                          "진행했던 프로젝트를 입력해주세요.";
                      }
                    }}
                    onFocus={(e) => {
                      e.target.placeholder = "";
                    }}
                  />
                </div>
              </main>
              <footer>
                <div onClick={this.closeModal}>
                  <span>닫기</span>
                </div>
                <div onClick={this.moveReviewPage}>
                  <span>다음</span>
                </div>
              </footer>
            </section>
          </>
        ) : null}
      </ModalBox>
    );
  }
}

export default SearchProjectModal;

const star_ary = [
  { id: 1, checked: false },
  { id: 2, checked: false },
  { id: 3, checked: false },
  { id: 4, checked: false },
  { id: 5, checked: false },
];

const ModalBox = styled.div`
  // display: none;
  position: absolute;

  top: 22%;

  z-index: 101;
  background-color: white;
  height: 446px;
  width: 83%;
  right: 8%;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 40%);
  border-radius: 10px;
  padding: 52px 0 60px 98px;
  box-sizing: border-box;

  > section {
    max-width: 900px;
    width: 90%;
    height: 87%;
    // margin: 0 auto;
    border-radius: 0.3rem;
    > header {
      position: relative;
      font-weight: bold;
      font-size: 20px;
      line-height: 34px;
      letter-spacing: -0.5px;
      color: #191919;
      margin-bottom: 10px;
    }
    > main {
      background-color: white;

      height: 90%;

      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        // margin-bottom: 20px;

        input {
          border: none;
          border-bottom: 1px solid #e1e2e4;
          //   padding-bottom: 10px;
          padding: 0;

          height: 45px;
          box-sizing: border-box;
          outline: none;
          font-size: 24px;
          letter-spacing: -0.6px;

          ::placeholder {
            font-size: 24px;
            line-height: 34px;
            letter-spacing: -0.6px;
            color: #c1bfbf;
            font-weight: normal;
          }
        }
      }
    }
    > footer {
      display: flex;
      justify-content: center;
      align-items: center;

      > div {
        color: white;
        text-align: center;
        width: 242px;
        height: 61px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        cursor: pointer;

        > span {
          font-size: 20px;
          line-height: 52px;
          letter-spacing: -0.5px;
          font-weight: bold;
        }
      }
      > div:nth-of-type(1) {
        background-color: #a4aab4;
        margin-right: 16px;
      }
      > div:nth-of-type(2) {
        background-color: #0933b3;
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
          cursor: pointer;
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
