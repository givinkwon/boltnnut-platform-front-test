import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from 'react-reveal/Fade';

const image1 = "/static/images/Home/Banner2/image1.png"

class Banner4Container extends React.Component {
    render() {
        return (
          <Background backgroundColor={'#f6f6f6'}>
              <Containerv1 style={{paddingBottom: 358, paddingTop: 257, justifyContent: 'space-between'}}>
                  <Fade bottom>
                      <div>
                          <Header>
                              무료 도면 수정 서비스
                          </Header>
                          <Middle>
                              전문 엔지니어의<br/>
                              <span>무료 도면 수정</span><br/>
                              서비스 제공
                          </Middle>
                          <Body>
                              볼트앤너트 기술팀이 제작하신 금속가공, 금형/사출<br/>
                              도면의 생산성을 검토하고 수정해드립니다.
                          </Body>
                      </div>
                      <div>
                          <img src={image1}/>
                      </div>
                  </Fade>
              </Containerv1>
          </Background>
        );
    }
}

export default Banner4Container;

const Header = styled(Title.FontSize20)`
    color: #0933b3;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.45;
    letter-spacing: normal;
    margin-bottom:16px;
`
const Middle = styled(Title.FontSize56)`
    color: #282c36;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: -1.4px;
    margin-bottom: 38px;

    > span {
        display: inline;
        font-weight:bold;
    }
`
const Body = styled(Title.FontSize24)`
    white-space:nowrap;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.6px;
    text-align: left;
    color: #555963;
`
