import React from "react";
import styled from "styled-components";

const Button = styled.div`
  color: ${(props) => (props.color ? props.color : "#006cb3")};
  border: ${(props) => (props.borderWidth ? props.borderWidth + "px" : "2px")}
    solid ${(props) => (props.borderColor ? props.borderColor : "#006cb3")};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "#ffffff"};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 0)}px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    width: 140px;
    height: 48px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 12px;
    width: 160px;
    height: 52px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 14px;
    width: 180px;
    height: 54px;
  }
  @media (min-width: 1300px) {
    font-size: 16px;
    width: 200px;
    height: 56px;
  }
`;
export default Button;
