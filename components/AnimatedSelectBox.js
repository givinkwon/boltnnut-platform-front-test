import React from 'react';
import styled, {css} from 'styled-components';
import SelectComponent from 'components/Select';


const AnimatedSelectBox = styled.div`
  cursor: pointer;
  width: 380px;

  @keyframes fadeIn {  
    0% {
      opacity:0;
      transform: translateY(-10px);
    }
    100% {
      opacity:1;
      transform: translateY(0);
    }
  }

  >div>div:nth-of-type(2){
    -webkit-font-smoothing: antialiased;
    animation: fadeIn 0.2s ease-out;
    
  }
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

`}

${props => !props.active && css`
  svg{
    @keyframes selectOut{
      0% {
        transform: rotate(-180deg);
      }
    }
    animation: selectOut 0.4s ;
  }
`}
`;

export default AnimatedSelectBox ;