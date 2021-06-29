import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

class Modal extends React.Component {
  render() {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = this.props;

    return (
      <ModalBox modal={open ? "openModal modal" : "modal"}>
        {open ? (
          <>
            <button className="close" onClick={close}>
              {" "}
              &times;{" "}
            </button>
            <section>
              <header>{header}</header>
              <main>{this.props.children}</main>
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
  top: 20%;
  right: 30%;
  // bottom: 0;
  // left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  height: 70%;

  > section {
    max-width: 900px;
    width: 90%;
    height: 90%;
    margin: 0 auto;
    border-radius: 0.3rem;
    //background-color: blanchedalmond;
    border: 1px solid blue;
    > header {
      position: relative;
      padding: 16px 64px 16px 16px;
      background-color: #f1f1f1;
      font-weight: 700;
    }
  }
  > button {
    outline: none;
    cursor: pointer;
    border: 0;

    font-size: 21px;
    font-weight: 700;

    color: #999;
  }
`;
