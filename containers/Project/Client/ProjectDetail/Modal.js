import React, { useState } from "react";
//import Modal from '../../../commons/components/Modals/Modal';
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
              {/* <footer>
                <button className="close" onClick={close}>
                  {" "}
                  close{" "}
                </button>
              </footer> */}
            </section>
          </>
        ) : null}
      </ModalBox>
    );
  }
}

export default Modal;

// const modalShow = keyframes`
// from {
//     opacity: 0;
//     margin-top: -50px;
// }
// to {
//     opacity: 1;
//     margin-top: 0;
// }
// `;

// const modalBgShow = keyframes`
//     from {
//         opacity: 0;
//     }
//     to {
//         opacity: 1;
//     }
// `;

// const ModalBox = styled.div`
//   display: ${(props) => (props.openModal ? "flex" : "none")};
//   align-items: ${(props) => (props.openModal ? "center" : "")};
//   //animation: ${(props) => (props.openModal ? `${modalBgShow}` : "")};
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 99;
//   background-color: rgba(0, 0, 0, 0.6);
//   > section {
//     width: 90%;
//     max-width: 450px;
//     margin: 0 auto;
//     border-radius: 0.3rem;
//     background-color: #fff;
//     /* 팝업이 열릴때 스르륵 열리는 효과 */
//     // animation: ${modalShow} 0.3s;
//     overflow: hidden;
//     > header {
//       position: relative;
//       padding: 16px 64px 16px 16px;
//       background-color: #f1f1f1;
//       font-weight: 700;
//       > button {
//         position: absolute;
//         top: 15px;
//         right: 15px;
//         width: 30px;
//         font-size: 21px;
//         font-weight: 700;
//         text-align: center;
//         color: #999;
//         background-color: transparent;
//       }
//     }
//     > main {
//       padding: 16px;
//       border-bottom: 1px solid #dee2e6;
//       border-top: 1px solid #dee2e6;
//     }
//     > footer {
//       padding: 12px 16px;
//       text-align: right;
//       > button {
//         padding: 6px 12px;
//         color: #fff;
//         background-color: #6c757d;
//         border-radius: 5px;
//         font-size: 13px;
//       }
//     }
//   }
// `;
// // .modal button {
// //     outline: none;
// //     cursor: pointer;
// //     border: 0;
// // }

// // .modal.openModal {
// //     display: flex;
// //     align-items: center;
// //     /* 팝업이 열릴때 스르륵 열리는 효과 */
// //     animation: modal-bg-show .3s;
// // }

// // @keyframes modal-show {
// //     from {
// //         opacity: 0;
// //         margin-top: -50px;
// //     }
// //     to {
// //         opacity: 1;
// //         margin-top: 0;
// //     }
// // }
// // @keyframes modal-bg-show {
// //     from {
// //         opacity: 0;
// //     }
// //     to {
// //         opacity: 1;
// //     }
// // }

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
