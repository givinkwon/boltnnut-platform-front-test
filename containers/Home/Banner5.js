import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from 'react-reveal/Fade';

const image1 = "/static/images/Home/Banner5/Banner5_img1.png"

class Banner5Container extends React.Component {
  render() {
    return (
      <Background backgroundColor = {"#d4d7e2"}>
        <Containerv1 style={{paddingBottom: 306, paddingTop: 308, justifyContent: 'space-between'}}>
          <Fade bottom>
            <div>
              <img src={image1}/>
            </div>
            <div>
              <Header>
                계약 이행 보증 서비스
              </Header>
              <Middle>
                7가지 계약 관리<br/>
                서비스로 계약 이행<br/>
                <p>100% 보증</p>
              </Middle>
              <Body>
                개발부터 납품까지 전담 프로젝트 매니저가<br/>
                배정되어 계약 이행을 100% 보증합니다.
              </Body>
            </div>
          </Fade>
        </Containerv1>
      </Background>
    );
  }
}

export default Banner5Container;

const Header = styled(Title.FontSize20)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
`
const Middle = styled(Title.FontSize56)`
  color: #282c36;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 47px;
  
  >p {
    font-weight:bold;
  }
`
const Body = styled(Title.FontSize24)`
  // white-space:nowrap;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #555963;
`

