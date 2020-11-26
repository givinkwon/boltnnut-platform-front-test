import React from "react";
import styled from 'styled-components';

import Container from "components/Container";
 
const BackgroundContainer = ({children}) => {
  return (
    <Background>
      <Container>
        {children}
      </Container>
    </Background>
  );
}

export default BackgroundContainer;

const Background = styled.div`
  background-image: url('/static/images/banner.jpg');
  background-position: center;
  background-size: cover;
  min-height: calc(100vh - 70px - 140px);
  
  ${Container} {
    min-height: calc(100vh - 70px - 140px);
  }
`;
