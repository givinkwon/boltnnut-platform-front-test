import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import * as Text from "components/Text";

const plusImg = "/static/images/signup/plus.svg";
@inject("Auth", "Answer")
@observer
class Introduction extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Name>회사 소개서</Name>

          <Button>파일 업로드하기</Button>
        </Header>
        <Main>
          <img src={plusImg} />
        </Main>
      </Container>
    );
  }
}

export default Introduction;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  margin-top: 100px;
  margin-bottom: 120px;
`;

const Name = styled.div`
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.6px;
  color: #414550;
  font-weight: bold;
  margin-right: 12px;
`;

const Button = styled.button`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.45px;
  color: #0933b3;
  font-weight: 600;
  background-color: #ffffff;
  border: none;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e2e4;
  margin-bottom: 20px;
`;
const Main = styled.div`
  width: 100%;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.16);
  height: 406px;
  position: relative;
  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
