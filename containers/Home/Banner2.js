import React from "react";
import styled from "styled-components";

import Container from "components/Containerv1";
import Background from "components/Background";

import Buttonv1 from "components/Buttonv1";

const requestimg1 = "static/images/request/requestimg1.svg";
const requestimg2 = "static/images/request/requestimg2.svg";
const requestimg3 = "static/images/request/requestimg3.svg";

class RequestMain extends React.Component {
  render() {
    return (
      <Background>
        <Container>
          <Body>
            <Header>
              볼트앤너트 "바로발주"의 3 가지 차별점
            </Header>
            <ImageBox>
              <ImageSubBox>
                <img src={requestimg1} />
                <Title>1초 AI 견적!</Title>
                <Content>
                  <span style={{ fontWeight: "bold", color: "#0933b3" }}>
                    견적 요청 없이
                  </span>
                  <br />
                  부품 견적/납기 바로 받기
                </Content>
              </ImageSubBox>
              <ImageSubBox>
                <img src={requestimg2} />
                <Title>보안 걱정은 NO!</Title>
                <Content>
                  <span style={{ fontWeight: "bold", color: "#0933b3" }}>
                    NDA를 체결한
                  </span>
                  <br/>
                  파트너에게만 발주를 진행합니다.
                </Content>
              </ImageSubBox>
              <ImageSubBox style={{ marginRight: 0 }}>
                <img src={requestimg3} />
                <Title>전문가 상담이 무료!</Title>
                <Content>
                  볼트앤너트{" "}
                  <span style={{ fontWeight: "bold", color: "#0933b3" }}>
                    전문 의뢰 상담가가
                  </span>
                  <br />
                  상시 도움을 드려요.
                </Content>
              </ImageSubBox>
            </ImageBox>
          </Body>
        </Container>
      </Background>
    );
  }
}

export default RequestMain;

const Body = styled.div`
  width: 100%;
  height: 892px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
`;

const Header = styled.span`
  font-size: 32px;
  line-height: 1.56;
  letter-spacing: -0.8px;
  text-align: center;
  color: #000;
`;

const ImageBox = styled.div`
  display: flex;
  width: 100%:
  align-items: center;
  margin-top: 80px;
`;

const ImageSubBox = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.08);
  padding-top: 80px;
  padding-bottom: 58px;
  margin-right: 48px;
`;

const Title = styled.span`
  font-size: 22px;
  font-weight: bold;
  line-height: 2.91;
  letter-spacing: -0.55px;
  color: #1e2222;
  margin-top: 40px;
  margin-bottom: 24px;
`;

const Content = styled.span`
  font-size: 17px;
  line-height: 1.47;
  letter-spacing: -0.43px;
  text-align: center;
  color: #555963;
`;
