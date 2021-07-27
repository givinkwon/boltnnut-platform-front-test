import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import * as Text from "components/Text";

const plusImg = "/static/images/signup/plus.svg";
@inject("Auth", "Answer")
@observer
class Authentication extends React.Component {
  render() {
    return (
      <Container>
      <Header>
        <Info>
          <Name>포트폴리오</Name>
          <Description>인증을 할 경우 업체에 대한 신뢰도와 의뢰율이 2배이상 높아집니다.</Description>
        </Info>

        <Button>파일 업로드하기</Button>
      </Header>

      <Main>사업자등록증 업로드</Main>
    </Container>
  );
}
}


export default Authentication;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  margin-top: 100px;
  margin-bottom: 120px;
`;

const Info = styled.div`
  display: flex;
`;

const Name = styled.div`
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.6px;
  color: #414550;
  font-weight: bold;
  margin-right: 12px;
`;

const Description = styled.div`
  font-size: 16px;
  line-height: 34px;
  letter-spacing: -0.4px;
  color: #555963;
  font-weight: normal;
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
