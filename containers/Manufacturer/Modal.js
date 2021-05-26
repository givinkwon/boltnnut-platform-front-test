import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";

//import Modal from '../../../commons/components/Modals/Modal';

class Modal extends React.Component {
  render() {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, children, width } = this.props;
    // console.log(open);
    // console.log(children);
    return (
      <ModalBox
        modal={open ? "openModal modal" : "modal"}
        style={{ display: open ? "block" : "none" }}
      >
        {open ? (
          <>
            <button className="close" onClick={close}>
              {" "}
              &times;{" "}
            </button>
            <section>
              <header>전화번호</header>
              <main>{children}</main>
              <footer>
                <div className="close" onClick={close}>
                  닫기
                </div>
              </footer>
            </section>
          </>
        ) : null}
      </ModalBox>
    );
  }
}

export default Modal;

const ModalBox = styled.div`
  // display: none;
  position: fixed;
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
      font-color: white;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50%;
      font-size: 20px;
      font-weight: 600;
    }
    > footer {
      background-color: #0933b3;
      color: white;
      text-align: center;
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
