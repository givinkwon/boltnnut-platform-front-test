import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

@inject("Partner", "Auth", "Common")
@observer
class BlackBox extends React.Component {
  render() {
    const { src, content, Common } = this.props;
    return (
      <>
        <Layer>
          <Content>{content}</Content>
          <Button onClick={() => (location.href = Common.makeUrl("login"))}>
            볼트앤너트 회원가입
          </Button>
        </Layer>
      </>
    );
  }
}

export default BlackBox;

const Layer = styled.div`
  // position: absolute;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // z-index: 99;
  // opacity: 0.1;
  background-color: #ffffff;
  border: 1px solid #c6c7cc;
  border-radius: 10px;
  width: 486px;
  height: 164px;
  position: absolute;
  z-index: 99;
  top: 38%;
  right: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background-color: #ffffff;
  border: none;
  font-size: 16px;
  line-height: 77px;
  letter-spacing: -0.4px;
  color: #0933b3;
  text-decoration: underline;
  font-weight: bold;
  text-underline-position: under;
  cursor: pointer;
`;

const Content = styled.div`
  font-size: 18px;
  line-height: 77px;
  letter-spacing: -0.45px;
  color: #000000;
  font-weight: normal;
`;
