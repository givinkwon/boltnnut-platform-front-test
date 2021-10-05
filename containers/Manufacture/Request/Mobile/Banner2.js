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
            <ContentBox>
              <TitleBox>
              <StepBox>
                STEP 1
              </StepBox>
              <Title>
                의뢰 요청
              </Title>

              </TitleBox>

              <Content>
                의뢰를 요청하면 볼트앤너트의 전문가가 상담을 통해 내용 보완 후 제조사와 연결해드립니다.
              </Content>

            </ContentBox>
            
            <ContentBox>
              <TitleBox>
              <StepBox>
                STEP 2
              </StepBox>
              <Title>
                제조사와 직접 채팅
              </Title>

              </TitleBox>

              <Content>
                연결된 제조사와 채팅을 통해 의뢰에 대한 소통을 진행합니다.
              </Content>
              
            </ContentBox>
            <ContentBox>
              <TitleBox>
              <StepBox>
                STEP 3
              </StepBox>
              <Title>
                업체 확정
              </Title>

              </TitleBox>

              <Content>
                채팅 페이지 상단의 '업체 확정' 버튼을 클릭해 계약을 완료하세요.
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