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
            <Header>확실한 의뢰 프로세스로 진행됩니다.</Header>
            <StepBox>
              <img src={step1} />
              <img src={blueline} />
              <img src={step2} />
              <img src={blueline} />
              <img src={step3} />
            </StepBox>
            <TextBox>
              <TextSubBox>
                <Title>제조 문의</Title>
                <Content>
                  제조문의 시 볼트앤너트의 전문가가
                  <br />
                  상담을 통해 내용 보완 후 제조사와 연결해드립니다.
                </Content>
              </TextSubBox>
              <TextSubBox>
                <Title>제조사와 직접 채팅</Title>
                <Content>
                  연결된 제조사와 채팅을 통해
                  <br />
                  의뢰에 대한 소통을 진행합니다.
                </Content>
              </TextSubBox>
              <TextSubBox>
                <Title>업체 확정</Title>
                <Content>
                  채팅 페이지 상단의 '업체 확정' <br />
                  버튼을 클릭해 계약을 완료하세요.
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    width : 400px !important;
    max-width : 400px !important;
    > img {
      width : 100px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`;

const TextBox = styled.div`
  display: flex;
  width: 870px;
  justify-content: space-around;
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 600px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`;
