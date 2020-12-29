import React from 'react';
import styled from 'styled-components';
import { WHITE, PRIMARY } from "static/style";

const Background = styled.div`
  width: 100%;
  background-color: ${(props) => (props.backgroundColor ? props.backgroundColor : WHITE)};
  background-image: url(${props => props.src});
  display: inline-flex;
  justify-content: center;
  background-size: cover;
`

export default Background