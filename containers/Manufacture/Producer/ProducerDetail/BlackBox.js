import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

@inject("Partner", "Auth", "Common")
@observer
class BlackBox extends React.Component {
  render() {
    const { src, content, Common, top, width } = this.props;
    return (
      <>
        <Layer top={top}>
          <Content>{content}</Content>
          <Button onClick={() => (location.href = Common.makeUrl("login"))}>
            로그인하기
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
  top: ${(props) => (props.top ? props.top : "50")}%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    right: 0;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 450px;
    right: 0;
  }

  @media (min-width: 992px) and (max-width: 1279.98px) {
    right: 0;
  }
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
  }
`;

const Content = styled.div`
  font-size: 18px;
  line-height: 77px;
  letter-spacing: -0.45px;
  color: #000000;
  font-weight: normal;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 15px;
  }
`;
