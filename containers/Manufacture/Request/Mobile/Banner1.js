import React from "react";
import styled from "styled-components";
import Router from "next/router";
import Container from "components/Containerv1";
import Background from "components/Background";
import Buttonv1 from "components/Buttonv1";
import { inject, observer } from "mobx-react";

const boltnnut = "static/images/request/boltnnut.svg";
const factory = "static/images/request/factory.svg";
const bluearrow = "static/images/request/bluearrow.svg";

@inject("Request")
class RequestMain extends React.Component {
  render() {
    const { Request } = this.props;
    return (
      <Background>
        <Container>
          <Body>
            <Header>How?</Header>
            <HeaderText>볼트앤너트 제조 문의 방법은 2가지가 있습니다.</HeaderText>
            <TypeBox>
              <TypeSubBox style={{backgroundColor : "#fff", marginBottom : 12}}>
                <img src={boltnnut} style={{ marginTop : 36, marginBottom : 12, height : 109 }} />
                <Title style={{marginBottom : 8}}>Type 1. 볼트앤너트에 의뢰</Title>
                <Text>
                  볼트앤너트 플랫폼에 직접 제조 문의를 등록해
                  <br />
                  제조사 파트너로부터 의뢰 받는 형식입니다.
                </Text>
                <Button
                  onClick={() => ((Request.requestTabIdx = 1), scrollTo(0, 0))}
                >
                  지금 무료로 제조 문의
                  <img src={bluearrow} style={{ marginLeft: 8 }} />
                </Button>
              </TypeSubBox>
              <TypeSubBox style={{backgroundColor : "#fff", marginBottom : 12}}>
                <img src={factory} style={{ marginTop : 36, marginBottom : 12, height : 109 }} />
                <Title style={{marginBottom : 8}}>Type 2. 특정 제조사에 직접 의뢰</Title>
                <Text>
                  '제조사 찾기'에서 원하는 제조사를 찾고
                  <br />
                  직접 의뢰하는 형식입니다.
                </Text>
                <Button onClick={() => Router.push("/search")}>
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
  height: 854px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
`;

const Header = styled.span`
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #000;
  margin-top: 50px;
  margin-bottom: 8px;
`;

const HeaderText = styled.span`
  height: 24px;
  font-size: 16px;
  text-align: center;
  color: #1e2222;
`;

const TypeBox = styled.div`
  width: 100%;
  display: display;
  margin-top: 50px;
`;

const TypeSubBox = styled.div`
  width: 100%;
  heigth: 325px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
    font-size: 22px;
  }
`;

const Text = styled.div`
  font-size: 17px;
  letter-spacing: -0.43px;
  text-align: center;
  line-height : 1.79;
  color: #555963;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
    font-size: 17px;
  }
`;

const Button = styled.div`
  width: 47.5%;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom : 42px;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: -0.45px;
  color: #0933b3;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
    border-radius: 3px;
  }
`;
