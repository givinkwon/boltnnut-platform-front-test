import React from "react";
import styled from "styled-components";
import Router from "next/router";
import Container from "components/Containerv1";
import Background from "components/Background";
import Buttonv1 from "components/Buttonv1";

const boltnnut = "static/images/request/boltnnut.svg";
const factory = "static/images/request/factory.svg";
const bluearrow = "static/images/request/bluearrow.svg";

class RequestMain extends React.Component {
  render() {
    return (
      <Background>
        <Container>
          <Body>
            <Header>How?</Header>
            <HeaderText>볼트앤너트 의뢰 방법은 2가지가 있습니다.</HeaderText>
            <TypeBox>
              <TypeSubBox>
                <img src={boltnnut} style={{ marginRight: 16 }} />
                <Title>Type 1. 볼트앤너트에 의뢰</Title>
                <Text>
                  볼트앤너트 플랫폼에 직접 프로젝트를 등록해
                  <br />
                  제조사 파트너로부터 의뢰 받는 형식입니다.
                </Text>
                <Button>
                  지금 무료로 의뢰하기
                  <img src={bluearrow} style={{ marginLeft: 8 }} />
                </Button>
              </TypeSubBox>
              <TypeSubBox>
                <img src={factory} />
                <Title>Type 2. 특정 제조사에 직접 의뢰</Title>
                <Text>
                  '제조사 찾기'에서 원하는 제조사를 찾고
                  <br />
                  직접 의뢰하는 형식입니다.
                </Text>
                <Button onClick={() => (Router.push('/search'))}>
                  제조사 찾기 바로가기
                  <img src={bluearrow} style={{ marginLeft: 8 }} />
                </Button>
              </TypeSubBox>
            </TypeBox>
          </Body>
        </Container>
      </Background>
    );
  }
}

export default RequestMain;

const Body = styled.div`
  width: 100%;
  height: 813px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
`;

const Header = styled.span`
  width: 100%;
  font-size: 46px;
  font-weight: bold;
  line-height: 1.52;
  letter-spacing: -1.15px;
  text-align: center;
  color: #000;
`;

const HeaderText = styled.span`
  font-size: 18px;
  line-height: 4.44;
  letter-spacing: -0.45px;
  text-align: center;
  color: #1e2222;
`;

const TypeBox = styled.div`
  width: 100%;
  display: flex;
  margin-top: 50px;
`;

const TypeSubBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  line-height: 3.18;
  letter-spacing: -0.88px;
  text-align: center;
`;

const Text = styled.div`
  font-size: 17px;
  line-height: 1.47;
  letter-spacing: -0.43px;
  text-align: center;
  color: #555963;
`;

const Button = styled.div`
  width: 235px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 27px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.45px;
  color: #0933b3;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
    border-radius: 3px;
  }
`;
