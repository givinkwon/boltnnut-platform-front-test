import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import Router from "next/router";
import SelectComponent from "Select";

import FilterBox from "./FilterBox";
import FilterBox2 from "./FilterBox2";
import FileComponent from "./AddFile";
import Background from "components/Background";
import Container from "components/Containerv1";

import { toJS } from "mobx";

const checkImg = "static/images/producer/check_white.png";

@inject("Partner", "Auth")
@observer
class RequestDoneModal extends React.Component {
  state = {
    search: "",
    modal_open: false,
    list: false,
  };

  onClickHandler = () => {
    const { Partner } = this.props;
    console.log("onCLick!!");
    Partner.requestDoneModalActive = false;
    Partner.mobileRequestIndex = 0;
    Partner.filter_category = "";
    if (Auth.home_index === 4) {
      Router.push("/4");
    } else if (Auth.home_index === 3) {
      Router.push("/3");
    } else if (Auth.home_index === 2) {
      Router.push("/2");
    } else if (Auth.home_index === 1) {
      Router.push("/5");
    } else {
      Router.push("/");
    }
  };
  componentDidMount() {
    const { Partner } = this.props;
    console.log("didmount");
  }
  render() {
    const { open, close, header, children, width, Partner } = this.props;
    return (
      <>
        {this.props.width && this.props.width > 767.99 ? (
          <ModalBox
            modal={open ? "openModal modal" : "modal"}
            style={{ display: open ? "block" : "none" }}
          >
            {open ? (
              <>
                <section>
                  <header>고객님의 제조 의뢰가 접수 되었습니다.</header>
                  <main>
                    <content>
                      <p>
                        의뢰주신 프로젝트는 전물 컨설턴트의 검토가 필요한
                        사항입니다.
                      </p>
                      <p>
                        볼트앤너트 전문 컨설턴트가 정밀 검토 후 최대 1 영업일
                        내로 전화 상담 안내드립니다.
                      </p>
                    </content>
                  </main>
                  <footer>
                    <div onClick={() => this.onClickHandler()}>
                      <span>확인</span>
                    </div>
                    <div>
                      <p>※접속이 되지 않을 경우 아래로 문의해주세요</p>
                      <p>T.02-926-6637 C.홈페이지 우측 하단 실시간 톡</p>
                    </div>
                  </footer>
                </section>
              </>
            ) : null}
          </ModalBox>
        ) : (
          <>
            <MobileBox>
              <section>
                <image>
                  <div>
                    <img src={checkImg} />
                  </div>
                </image>
                <header>
                  고객님의 제조 의뢰가 접수 <span>되었습니다.</span>
                </header>
                <main>
                  <box>
                    <content>
                      <p>의뢰주신 프로젝트는</p>
                      <p>전물 컨설턴트의 검토가 필요한 사항입니다.</p>
                      <p>볼트앤너트 전문 컨설턴트가 정밀 검토 후</p>
                      <p>최대 1 영업일 내로 전화 상담 안내드립니다.</p>
                      <div>
                        <p>※접속이 되지 않을 경우 아래로 문의해주세요</p>
                        <p>T.02-926-6637 C.홈페이지 우측 하단 실시간 톡</p>
                      </div>
                    </content>
                  </box>
                </main>
                <footer>
                  <div onClick={() => this.onClickHandler()}>
                    <span>확인</span>
                  </div>
                </footer>
              </section>
            </MobileBox>
          </>
        )}
      </>
    );
  }
}

export default RequestDoneModal;

const MobileBox = styled.div`
  // display: none;
  //position: fixed;
  //top: 40%;
  //right: 14%;
  // bottom: 0;
  // left: 0;
  //z-index: 101;
  //background-color: white;
  //height: 496px;
  width: 100%;

  box-sizing: border-box;
  > section {
    max-width: 100%;
    width: 100%;
    height: 40%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 30px;

    > image {
      margin-bottom: 18px;
      > div {
        background-color: #0933b3;
        width: 39px;
        height: 39px;
        border-radius: 39px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    > header {
      font-weight: 500;

      margin-bottom: 24px;
      font-size: 18px;
      color: #0933b3;
      > span {
        color: #282c36;
      }
    }
    > main {
      width: 100%;
      background-color: #f6f6f6;
      display: flex;
      justify-content: center;
      padding: 20px 14px;
      box-sizing: border-box;
      > box {
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        width: 80%;
        height: 95%;
        // font-size: 16px;
        // font-weight: 500;
        height: 242px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        > content {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 34px;
          > p {
            font-size: 14px;
            line-height: 30px;
            letter-spacing: -0.35px;
            color: #282c36;
          }
          > div {
            margin-top: 24px;
            > p {
              font-size: 12px;
              line-height: 24px;
              letter-spacinig: -0.3px;
              color: #999999;
            }
          }
        }
      }
    }
    > footer {
      margin-top: 34px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      //   text-align: center;
      width: 100%;
      > div:nth-of-type(1) {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #0933b3;
        border-radius: 5px;
        background-color: #ffffff;
        color: #0933b3;
        width: 160px;
        height: 40px;
        margin-bottom: 25px;
        cursor: pointer;
        > span {
          font-size: 14px;
          line-height: 52px;
          letter-spacing: -0.45px;
          font-weight: bold;
        }
      }
    }
  }
  > button {
    font-size: 14px;
    margin: 10px 10px 0 0;
  }
`;

const ModalBox = styled.div`
  // display: none;
  position: fixed;
  //top: 40%;
  //right: 14%;
  // bottom: 0;
  // left: 0;
  z-index: 101;
  background-color: white;
  height: 496px;
  width: 92%;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 40%);
  border-radius: 10px;
  padding-top: 90px;
  box-sizing: border-box;

  > section {
    // max-width: 900px;
    width: 100%;
    // height: 70%;
    margin: 0 auto;
    border-radius: 0.3rem;
    //background-color: blanchedalmond;
    //border: 1px solid blue;
    display: flex;
    flex-direction: column;
    align-items: center;
    > header {
      position: relative;
      //padding: 16px;
      padding-bottom: 20px;
      //padding-top: 0;
      //background-color: #f1f1f1;
      font-weight: 700;
      // margin-bottom: 30px;
      text-align: center;
      //   border-bottom: 3px solid #f1f1f1;
      font-size: 26px;
      z-index: -1;
      color: #0933b3;
    }
    > main {
      background-color: white;
      //   font-color: white;
      text-align: center;
      display: flex;
      flex-direction: column;
      //   justify-content: center;
      align-items: center;
      //height: 90%;
      height: 183px;
      //   font-size: 20px;
      // font-weight: 600;
      border-top: 1px solid #c6c7cc;
      width: 95%;
      padding-top: 30px;
      box-sizing: border-box;
      > content {
        > p {
          font-size: 22px;
          line-height: 40px;
          letter-spacing: -0.55px;
          color: #414550;
          font-style: normal;
        }
        > p:nth-of-type(1) {
          //   margin-bottom: 15px;
        }
      }
    }
    > footer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      //   text-align: center;
      width: 100%;
      > div:nth-of-type(1) {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #0933b3;
        border-radius: 5px;
        background-color: #ffffff;
        color: #0933b3;
        width: 196px;
        height: 42px;
        margin-bottom: 25px;
        cursor: pointer;
        > span {
          font-size: 18px;
          line-height: 52px;
          letter-spacing: -0.45px;
          font-weight: bold;
        }
      }
      > div:nth-of-type(2) {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.4px;
        color: #999999;
        font-weight: normal;
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

    height: 180px;
    width: 90%;

    > section {
      max-width: 100%;
      width: 90%;
      height: 40%;

      > header {
        position: relative;
        padding: 8px;

        font-weight: 700;

        font-size: 22px;
      }
      > main {
        height: 95%;
        font-size: 16px;
        font-weight: 600;
      }
      > footer {
        height: 40px;
      }
    }
    > button {
      font-size: 14px;
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
