import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

@inject("Partner", "Auth")
@observer
class BlackBox extends React.Component {
  render() {
    const { src, content } = this.props;
    return (
      <>
        <Layer></Layer>
      </>
    );
  }
}

export default BlackBox;

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.5);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 100vh;
  }
`;
