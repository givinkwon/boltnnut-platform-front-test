import React from "react";
import styled from "styled-components";

import Containerv1 from "components/Containerv1";

class MobileLoginContainer extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 150 }}>
        <Container>
          <img src="/static/images/login/mobile/logo.svg" style={{ width: 140, height: 28 }} />

          <EmailInputBox />
        </Container>
      </div>
    );
  }
}

export default MobileLoginContainer;

const Container = styled(Containerv1)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerBox = styled.div`
  display: flex;
`;

const EmailInputBox = styled.input`
  width: 319px;
  height: 44px;
  border-radius: 23px;
  border: solid 1.3px #e1e2e4;
  background-color: #fff;
`;
