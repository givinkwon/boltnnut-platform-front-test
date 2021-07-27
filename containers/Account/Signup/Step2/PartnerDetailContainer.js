import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import MainContainer from "./MainContainer";
import SubContainer from "./SubContainer";

import * as Text from "components/Text";

@inject("Auth", "Answer")
@observer
class PartnerDetailContainer extends React.Component {
  render() {
    return (
      <>
        <Container>
          <SubContainer style={{ border: "5px solid green" }} />
          <MainContainer />
        </Container>
      </>
    );
  }
}

export default PartnerDetailContainer;

const Container = styled.div`
  display: flex;
  width: 100%;
`;
