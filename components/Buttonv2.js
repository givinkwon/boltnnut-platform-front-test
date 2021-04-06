import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  color: ${(props) => (props.color ? props.color : '#006cb3')};
  border: solid ${(props) => (props.borderWidth ? props.borderWidth : '2px')} ${(props) => (props.borderColor ? props.borderColor : '#006cb3')};
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : '#ffffff')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 0)}px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    width: 60px;
    height: 44px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 12px;
    width: 66px;
    height: 42px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 14px;
    width: 72px;
    height: 44px;
  }
  @media (min-width: 1300px) { 
    font-size: 16px;
    width: 78px;
    height: 44px;
    box-sizing: border-box;
  }
`;
export default Button;
