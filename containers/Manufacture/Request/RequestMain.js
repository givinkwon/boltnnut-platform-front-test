import React from "react";
import styled from "styled-components";

import Container from "components/Containerv1";
import Background from "components/Background";

import RequestMainBanner0 from "./RequestMainBanner0";
import RequestMainBanner1 from "./RequestMainBanner1";
import RequestMainBanner2 from "./RequestMainBanner2";
import RequestMainBanner3 from "./RequestMainBanner3";
import RequestMainBanner4 from "./RequestMainBanner4";
import RequestMainBanner5 from "./RequestMainBanner5";

class RequestMain extends React.Component {
  render() {
    return (
      <>
        <Background>
          <Container style={{ width: 1920 }}>
            <Body>
              <RequestMainBanner0 />
              <RequestMainBanner1 />
              <RequestMainBanner2 />
              <RequestMainBanner3 />
              <RequestMainBanner4 />
              <RequestMainBanner5 />
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
