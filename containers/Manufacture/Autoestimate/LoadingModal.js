import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

@inject("Auth")
@observer
class LoadingModal extends React.Component {
  state = {};

  render() {
    const {
      open,
      close,
      header,
      children,
      width,
      data,
    } = this.props;

    return (
      <ModalBox
        modal={open ? "openModal modal" : "modal"}
        style={{ display: open ? "block" : "none" }}
      >
        {open ? (
          <>
            <section>
              <header>Loading...</header>
              <main>견적을 산출하는데까지 최대 1분 정도 걸립니다.</main>
              <footer>
                <div className="close" onClick={close}>
                  <span>닫기</span>
                </div>
              </footer>
            </section>
          </>
        ) : null}
      </ModalBox>
    );
  }
}

export default LoadingModal;

const ModalBox = styled.div`
  // display: none;
  position: fixed;
  top: 40%;
  left: 20%;
  /* transform: "translate(-20%,-50%)", */
  /* right: 0;
  bottom: 0; */
  //top: 40%;
  //right: 14%;
  // bottom: 0;
  // left: 0;
  z-index: 101;
  background-color: white;
  height: 235px;
  width: 60%;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 40%);
  border-radius: 10px;
  > section {
    max-width: 900px;
    width: 90%;
    height: 90%;
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
      /* font-color: white; */
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 55%;
      font-size: 20px;
      font-weight: 500;
    }
    > footer {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      > div {
        background-color: #0933b3;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 32px;
        width: 100%;
        cursor: pointer;
        > span {
          color: white;
        }
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
    left: 5%;
    z-index: 101;

    height: 145px;
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
        font-size: 14px;
        font-weight: 500;
      }
      > footer {
        height: 62px;
        > div {
          height: 24px;
          > span {
            font-size: 13px;
          }
        }
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
