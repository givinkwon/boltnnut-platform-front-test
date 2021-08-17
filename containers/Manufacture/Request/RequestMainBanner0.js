import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Containerv1";
import Background from "components/Background";

import Buttonv1 from "components/Buttonv1";

const arrow = "static/images/request/arrow.svg";
const background = "static/images/request/background.png";

@inject("Request")
@observer
class RequestMain extends React.Component {
  render() {
    const { Request } = this.props;
    return (
      <Background>
        <Container>
          <Body>
            <Header>
              제조업체가 필요한 모든 순간,
              <br />
              볼트앤너트가 함께 합니다.
            </Header>
            <RequestCount>
              1,835
              <span style={{ fontSize: 25, letterSpacing: -0.63 }}> 건</span>
            </RequestCount>
            <Text>볼트앤너트에 등록된 의뢰 건수</Text>
            <Button onClick={() => (Request.requestTabIdx = 1)}>
              지금 무료로 의뢰하기
              <img src={arrow} style={{ marginLeft: 10 }} />
            </Button>
            <BackImg>
              <img src={background} />
            </BackImg>
          </Body>
        </Container>
      </Background>
    );
  }
}

export default RequestMain;

const Body = styled.div`
  width: 100%;
  height: 683px;
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

const RequestCount = styled.div`
  width: 100%;
  font-size: 50px;
  font-weight: bold;
  line-height: 1.6;
  letter-spacing: -1.25px;
  text-align: center;
  color: #000;
`;

const Text = styled.span`
  font-size: 14px;
  line-height: 3.57;
  letter-spacing: -0.35px;
  text-align: center;
  color: #999;
`;

const Button = styled(Buttonv1)`
  width: 263px !important;
  height: 58px !important;
  font-size: 20px;
  line-height: 2.1;
  letter-spacing: -0.5px;
  margin-top: 100px;
  z-index: 2;
`;

const BackImg = styled.div`
  position: absolute;
  z-index: 1;
`;
