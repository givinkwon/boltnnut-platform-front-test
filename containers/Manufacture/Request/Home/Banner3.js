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
              타 유사 서비스와 차별화된 <br />
              볼트앤너트만의 장점도 있습니다.
            </Header>
            <ImageBox>
              <ImageSubBox>
                <img src={requestimg1} />
                <Title>모든 제조사를 한눈에!</Title>
                <Content>
                  <span style={{ fontWeight: "bold", color: "#0933b3" }}>
                    원하는 제조사
                  </span>
                  에게 직접
                  <br />
                  의뢰를 요청할 수 있어요.
                </Content>
              </ImageSubBox>
              <ImageSubBox>
                <img src={requestimg2} />
                <Title>보안 걱정은 NO!</Title>
                <Content>
                  <span style={{ fontWeight: "bold", color: "#0933b3" }}>
                    공개/비공개 여부
                  </span>
                  에 따라 선별된 <br />
                  파트너에게만 정보 공개가 가능해요.
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
