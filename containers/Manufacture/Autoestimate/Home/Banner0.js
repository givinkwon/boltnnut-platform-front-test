import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Containerv1";
import Background from "components/Background";

import Buttonv1 from "components/Buttonv1";
import UseScrollCount from "components/AnimationCount"

const arrow = "static/images/request/arrow.svg";
const background = "static/images/request/background.png";

// 카운트 애니메이션
const CountFunc = ({index,projCount=0,partnerCount=0}) =>
{
    const countItem = {
      0: UseScrollCount(projCount,0,0,0,15),
    };

    return (
        <p {...countItem[index]} style={{display:'inline'}}/>
    );
};


@inject("Request")
@observer
class RequestMain extends React.Component {
  render() {


    return (
      <Background>
        <Container>
          <Body>
            <Header>
              AI 견적 알고리즘으로
              <br />
              1초만에 견적내고, 바로 납품받기 
            </Header>
            <RequestCount>
            <CountFunc index={0} projCount={5285}/>
              <span style={{ fontSize: 25, letterSpacing: -0.63 }}> 건</span>
            </RequestCount>
            <Text>볼트앤너트에 등록된 견적 문의 건 수</Text>
            <Button>
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
  background-color: transparent !important;
  background-image: none !important;
  border-color: transparent;
  border: none;

  color: #FFFFFF;
  width: 263px !important;
  height: 58px !important;
  font-size: 20px;
  font-family: NotoSansCJKkr !important;
  line-height: 2.1;
  letter-spacing: -0.5px;
  margin-top: 100px;
  z-index: 2;
  :hover {
    background-color: #174aee;
  }
`;

const BackImg = styled.div`
  position: absolute;
  z-index: 1;
`;
