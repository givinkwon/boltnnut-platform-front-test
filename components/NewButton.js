import React from 'react';
import styled from 'styled-components';

const CustomButton = styled.div`
  color: ${(props) => (props.color ? props.color : '#ffffff')};
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.31);
  background-color: ${(props) => (props.active ? props.active : '#c6c7cc')};
  width: ${(props) => (props.width ? props.acitve : '120px')};
  height: ${(props) => (props.height ? props.active : '44px')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.active ? "pointer" : "not-allowed")};
  font-size: ${(props)=> (props.fontSize ? props.fontSize : 16)}px;
`;
export default CustomButton;
