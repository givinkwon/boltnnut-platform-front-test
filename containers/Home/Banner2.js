import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from 'react-reveal/Fade';

const image1 = "/static/images/Home/Banner2/image1.png"

class Banner4Container extends React.Component {
  render() {
    return (
      <Background backgroundColor={"#ffffff"}>
        <Containerv1
          style={{
            paddingBottom: 300,
            paddingTop: 300,
            justifyContent: "space-between",
          }}
        >
          <Fade bottom>
            <div style={{ marginRight: "126px" }}>
              <img src={image1} style={{ height: "100%" }} />
            </div>
            <div>
              <Header>실시간 제조 무료 상담</Header>
              <Middle>
                <span>어떠한 질문이든 </span><br/>
                <span> 가능합니다.</span>

              </Middle>
              <Body>
              500개의 전문업체와 경력 30년 이상의 <br />
                제조 엔지니어가 실시간으로 응답합니다.
              </Body>
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
    font-weight: normal;
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
