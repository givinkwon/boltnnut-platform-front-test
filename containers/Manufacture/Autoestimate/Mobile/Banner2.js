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
            <Header>3단계 의뢰 프로세스로 진행됩니다.</Header>
            <ContentBox>
              <TitleBox>
              <StepBox>
                STEP 1
              </StepBox>
              <Title>
                발주 요청
              </Title>

              </TitleBox>

              <Content>
                발주 요청 시 볼트앤너트의 전문가가 상담을 통해 당일 발주를 진행합니다.
              </Content>

            </ContentBox>
            
            <ContentBox>
              <TitleBox>
              <StepBox>
                STEP 2
              </StepBox>
              <Title>
                제조 발주 모니터링
              </Title>

              </TitleBox>

              <Content>
                발주 요청, 1차 제작, 제품 검수 등 모든 제조 진행사항을 보고드립니다.
              </Content>
              
            </ContentBox>
            <ContentBox>
              <TitleBox>
              <StepBox>
                STEP 3
              </StepBox>
              <Title>
                제품 납품
              </Title>

              </TitleBox>

              <Content>
                볼트앤너트 납품 프로세스를 통해 납기일을 준수하여 납품합니다.
              </Content>
              
            </ContentBox>

          </Body>
        </Container>
      </Background>
    );
  }
}

export default RequestMain;

const Body = styled.div`
  width: 100%;
  height: 529px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
`;

const Header = styled.span`
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  margin-top: 50px;
  margin-bottom : 50px;
  color: #1e2222;
`;

const ContentBox = styled.div`
  height : 77px;
  width: 80%;
  margin-left:auto;
  margin-right:auto;
  margin-bottom : 42px;
`;

const TitleBox = styled.div`
  height : 21px;
  width: 80%
  margin-left:auto;
  margin-right:auto;
  display: flex;
`;

const StepBox = styled.div`
  width : 50px;
  height : 12px;
  font-size : 10px;
  padding-top : 5px;
  border : solid 2px #0933b3;
  border-radius : 30px;
  text-align : center;
  color : #0933b3;
  font-family: NotoSansCJKkr !important;
  font-size: 10px;
  font-weight: 700;
  color: #0933b3;
  margin-right : 12px;
`

const Title = styled.div`
  width : 100%;
  height : 24px;
  object-fit: contain;
  font-family: NotoSansCJKkr !important;
  font-size: 16px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  text-align: left;
  color: #1e2222;
`

const Content = styled.div`
  width : 100%;
  height : 100%;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.79;
  letter-spacing: -0.35px;
  text-align: left;
  color: #767676;
`