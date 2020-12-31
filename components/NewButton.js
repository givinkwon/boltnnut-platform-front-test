import React from 'react';
import styled from 'styled-components';

const CustomButton = styled.div`
  color: ${(props) => (props.color ? props.color : '#ffffff')};
  border: solid ${(props) => (props.borderWidth ? props.borderWidth : '0px')} ${(props) => (props.borderColor ? props.borderColor : '#0933b3')};
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : '#0933b3')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 46)}px;
  font-size: ${(props)=> (props.fontSize ? props.fontSize : 32)}px;
`;
export default CustomButton;
