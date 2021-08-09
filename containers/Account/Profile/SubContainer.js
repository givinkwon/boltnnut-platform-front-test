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
        <h1>프로필 수정</h1>
        <h1>계정 설정</h1>

        <h1>관심 제조사</h1>

        <h1>채팅</h1>
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
