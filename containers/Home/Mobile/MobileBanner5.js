import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import Background from "../../../components/Background";
import Button from "../../../components/Button";
import Router from "next/router";

const background = "static/images/mobilebanner6backgroundimg.png";

class MobileBanner5Container extends React.Component {
  render() {
    return (
      <BackgroundContainer>
        <Container>
          <Title16 style={{ fontWeight: "bold" }}>발품 파는 오프라인 가공 발주 이제 그만!</Title16>
          <Title16>AI 견적으로 제조 부품 바로발주</Title16>

          <RequestButton onClick={() => Router.push('/autoestimate')}>
            <Title15>바로발주 시작하기</Title15>
          </RequestButton>
        </Container>
      </BackgroundContainer>
    );
  }
}

export default MobileBanner5Container;

const BackgroundContainer = styled(Background)`
  display: flex;
  justify-content: center;
  background-image: url(${background});
  height: 217px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const Title16 = styled(Title.FontSize16)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: -0.4px;
  color: #282c36;
`;

const Title15 = styled(Title.FontSize15)`
  font-family: NotoSansCJKkr;
  font-weight: 500;
  color: #0933b3;
`;

const RequestButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 189px;
  height: 42px;
  object-fit: contain;
  border-radius: 21px;
  border: solid 1px #0933b3;
  margin-top: 28px;
  background: none;
  cursor: pointer;
`;
