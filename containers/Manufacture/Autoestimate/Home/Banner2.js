import React from "react";
import styled from "styled-components";

import Container from "components/Containerv1";
import Background from "components/Background";
import Buttonv1 from "components/Buttonv1";

const step1 = "static/images/request/step1.svg";
const step2 = "static/images/request/step2.svg";
const step3 = "static/images/request/step3.svg";
const blueline = "static/images/request/blueline.svg";

class RequestMain extends React.Component {
  render() {
    return (
      <Background style={{ backgroundColor: "#f6f6f6" }}>
        <Container>
          <Body>
            <Header>3단계 제조 프로세스로 진행됩니다.</Header>
            <StepBox>
              <img src={step1} />
              <img src={blueline} />
              <img src={step2} />
              <img src={blueline} />
              <img src={step3} />
            </StepBox>
            <TextBox>
              <TextSubBox>
                <Title>발주 요청</Title>
                <Content>
                  발주요청 시 볼트앤너트의 전문가가
                  <br />
                  상담을 통해 당일 발주를 진행합니다.
                </Content>
              </TextSubBox>
              <TextSubBox>
                <Title>제조 발주 모니터링</Title>
                <Content>
                  발주 요청, 1차 제작, 제품 검수 등
                  <br />
                  모든 제조 진행사항을 보고드립니다.
                </Content>
              </TextSubBox>
              <TextSubBox>
                <Title>가공품 납품</Title>
                <Content>
                  볼트앤너트 납품 프로세스를 통해 <br />
                  납기일을 준수하여 납품합니다.
                </Content>
              </TextSubBox>
            </TextBox>
          </Body>
        </Container>
      </Background>
    );
  }
}

export default RequestMain;

const Body = styled.div`
  width: 100%;
  height: 629px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
`;

const Header = styled.span`
  font-size: 32px;
  line-height: 2.5;
  letter-spacing: -0.8px;
  color: #555963;
`;

const StepBox = styled.div`
  margin-top: 80px;
  width: 700px;
  display: flex;
  justify-content: space-around;
`;

const TextBox = styled.div`
  display: flex;
  width: 870px;
  justify-content: space-around;
`;

const TextSubBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.span`
  font-size: 21px;
  font-weight: 500;
  line-height: 3.05;
  letter-spacing: -0.53px;
  color: #1e2222;
  text-align: center;
`;

const Content = styled.span`
  font-size: 17px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.43px;
  text-align: center;
  color: #767676;
`;
