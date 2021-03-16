import React from 'react';
import styled, {css} from 'styled-components';
import SelectComponent from 'components/Select';


const AnimatedSelectBox = styled.div`
  cursor: pointer;
  width: ${(props) => (props.width? props.width: 380)}px;
  // width: 380px;
  ${ props => props.active && css`
  svg{
    @keyframes select{
      0% {
        transform: skewY(-180deg);
        }
      } 
    animation: select 0.4s ease-out;
    transform: rotate(-180deg);
  }
`};

  ${props => !props.active && css`
  svg{
    @keyframes selectOut{
      0% {
        transform: rotate(-180deg);
      }
    }
    animation: selectOut 0.4s ;
  }
`};




  ${SelectComponent}{
    width: ${(props) => (props.width? props.width: 380)}px;
    @keyframes fadeIn {  
      0% {
        opacity:0.5;
        transform: translateY(-10px);
      }
      100% {
        opacity:1;
        transform: translateY(0);
      }
    }

    >div: nth-of-type(2){
      -webkit-font-smoothing: antialiased;
      animation: fadeIn 0.2s ease-out;
    }
  };

 
`;

export default AnimatedSelectBox;