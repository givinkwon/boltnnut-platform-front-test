import React from 'react';
import styled from 'styled-components';
import { WHITE, PRIMARY } from "static/style";

const Background = styled.div`
  width: 100%;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : WHITE)};
  background-image: url(${props => props.src});
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: 100% 100%;
`

export default Background