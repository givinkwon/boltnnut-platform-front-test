import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import * as Text from "components/Text";

@inject("Auth", "Answer")
@observer
class SubContainer extends React.Component {
  render() {
    return (
      <Container>
        <h1>SubContainer</h1>
      </Container>
    );
  }
}

export default SubContainer;

const Container = styled.div`
  border: 3px solid green;
  // flex-grow: 1;
  width: 25%;
`;
