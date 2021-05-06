import React, { Component } from "react";

import Modal from "./Modal";

class DrawingDetailContainer extends React.Component {
  state = {
    modalOpen: false,
  };

  openModal = () => {
    this.setState({ modalOpen: true });
  };
  closeModal = () => {
    this.setState({ modalOpen: false });
  };
  render() {
    return (
      <React.Fragment>
        <button onClick={this.openModal}> 모달팝업</button>
        <Modal open={this.state.modalOpen} close={this.closeModal} title="dd">
          리액트 클래스형 모달 팝업창입니다. 쉽게 만들 수 있어요. 같이
          만들어봐요!
        </Modal>
      </React.Fragment>
    );
  }
}
export default DrawingDetailContainer;
