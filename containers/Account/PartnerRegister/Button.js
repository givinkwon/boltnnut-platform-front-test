import React from "react";
import styled from "styled-components";

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 181px;
  object-fit: contain;
  border-radius: 24px;
  background-color: ${(props) =>
    props.buttonType === "prev" ? "#ffffff" : "#0933b3"};
  border: ${(props) =>
    props.buttonType === "prev" ? "1px solid #0933b3" : "none"};
  /* 버튼 폰트 */
  color: ${(props) => (props.buttonType === "prev" ? "#0933b3" : "#ffffff")};
  object-fit: contain;
  font-family: NotoSansCJKkr;
  padding-top: 11px;
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  text-align: center;
`;
export default Button;
