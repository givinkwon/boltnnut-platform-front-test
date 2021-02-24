import React from 'react';
import styled from 'styled-components';

const CustomButton = styled.div`
  // color: ${(props) => (props.color ? props.color : '#ffffff')};
  color: ${(props) => (props.active ? (props.type==1 ? "#111111" : '#ffffff') : (props.type==1 ? "#c6c7cc" : '#ffffff'))};
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.31);
  background-color: ${(props) => (props.active ? (props.type==2 && "#0933b3") : (props.type==1 ? "#ffffff" : '#c6c7cc'))};
  width: ${(props) => (props.width ? props.acitve : '120px')};
  height: ${(props) => (props.height ? props.active : '44px')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};
  font-size: ${(props)=> (props.fontSize ? props.fontSize : 14)}px;
  pointer-events: ${(props) => (!props.active && 'none')};
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 88px;
    height: 38px;
  }
`;
export default CustomButton;
