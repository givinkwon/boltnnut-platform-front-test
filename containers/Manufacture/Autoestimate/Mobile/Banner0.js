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


@inject("Request", "Project")
@observer
class RequestMain extends React.Component {
  render() {
    const { Request, Project } = this.props;
    Project.getProject()

    return (
      <Background style={{marginBottom : 100}} >
        <Container>
          <Body>
            <Header>
              AI 견적 알고리즘으로
              <br />
              1초만에 견적내고, 바로 납품받기
            </Header>
            <RequestCount>
            <CountFunc index={0} projCount={5832}/>
              <span style={{ fontSize: 25, letterSpacing: -0.63 }}> 건</span>
            </RequestCount>
            <Text>볼트앤너트에 등록된 견적문의 수</Text>
            <BackImg>
              <img src={background} style = {{marginTop: 410, height : 230}} />
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
  height: 436px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
`;

const Header = styled.span`
  width: 100%;
  height: 74px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.58;
  letter-spacing: -0.6px;
  text-align: center;
  color: #000;
  margin-top : 132px;
  margin-bottom : 48px;
  @media (min-width: 0px) and (max-width: 449.98px) {
    font-size : 18px;
  }
`;

const RequestCount = styled.div`
  width: 100%;
  font-size: 50px;
  height: 33px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 22px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.55px;
  text-align: center;
  color: #000;
  margin-bottom: 8px !important;
  > p {
    height : 100%;
  }
`;

const Text = styled.span`
  height: 20px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  text-align: center;
  color: #767676;
`;

const Button = styled(Buttonv1)`
  width: 66.4% !important;
  height: 48px !important;
  font-size: 15px !important;
  font-family: NotoSansCJKkr !important;
  letter-spacing: -0.5px;
  margin-top: 50px;
  font-weight : 600 !important;
  z-index: 2;
  :hover {
    background-color: #174aee;
  }
  @media (min-width: 0px) and (max-width: 449.98px) {
    font-size : 12px !important; 
  }
`;

const BackImg = styled.div`
  position: absolute;
  z-index: 1;
`;
