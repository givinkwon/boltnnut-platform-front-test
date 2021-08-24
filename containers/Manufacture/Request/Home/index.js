import React from "react";
import styled from "styled-components";

import Container from "components/Containerv1";
import Background from "components/Background";

import Banner0 from "./Banner0";
import Banner1 from "./Banner1";
import Banner2 from "./Banner2";
import Banner3 from "./Banner3";
import Banner4 from "./Banner4";
import Banner5 from "./Banner5";

class RequestMain extends React.Component {
  render() {
    return (
      <>
        <Background>
          <Container style={{ width: 4980 }}>
            <Body>
              <Banner0 />
              <Banner1 />
              <Banner2 />
              <Banner3 />
              <Banner4 />
              <Banner5 />
            </Body>
          </Container>
        </Background>
      </>
    );
  }
}

export default RequestMain;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
