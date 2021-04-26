import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";

const image1 = "/static/images/Home/Banner2/image1.png";

class Banner4Container extends React.Component {
  render() {
    return (
      <Background backgroundColor={"#f6f6f6"}>
        <Containerv1
          style={{
            paddingBottom: 358,
            paddingTop: 257,
            justifyContent: "space-between",
          }}
        >
          <Fade bottom>
            <div style={{ marginRight: "126px" }}>
              <img src={image1} />
            </div>
            <div>
              <Header>컨설턴트 중 해당 제품</Header>
              <Middle>
                <span>내가 설계한 부품장비</span>
                <span>생산에 문제가 없을까?</span>
              </Middle>
              <Body>
                생산에 대한 모든 문의사항을 4000개
                <br />
                전문 제조사들이 바로 상담해드립니다.
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
  margin-bottom: 16px;
`;
const Middle = styled(Title.FontSize56)`
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 128px;
  width: 105%;

  > span {
    display: inline;
    font-weight: bold;
  }
`;
const Body = styled(Title.FontSize24)`
  white-space: nowrap;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #555963;
`;
