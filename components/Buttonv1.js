import React from 'react';
import styled from 'styled-components';

const Buttonv1 = styled.div`
  color: ${(props) => (props.color ? props.color : '#ffffff')};
  border: solid ${(props) => (props.borderWidth ? props.borderWidth : '0px')} ${(props) => (props.borderColor ? props.borderColor : '#0933b3')};
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : '#0933b3')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : 46)}px;
  font-size: ${(props)=> (props.fontSize ? props.fontSize : 32)}px;
  @media (min-width: 320px) and (max-width: 767.98px) {
    font-size: ${(props)=> (props.fontSize ? props.fontSize : 15)}px;
    width: 202px;
    height: 50px;
    object-fit: contain;  
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
  }
  @media (min-width: 768px) and (max-width: 1279.98px) { 
    font-size: 14px;
    width: 180px;
    height: 54px;
  }
  @media (min-width: 1280px) { 
    width: 380px;
    height: 77px;
    box-shadow: 2px 3px 6px 0 rgba(0, 0, 0, 0.4);
  }
}
`;
export default Buttonv1;
