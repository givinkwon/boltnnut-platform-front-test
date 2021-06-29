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
      <Background backgroundColor={"#ffffff"}>
        <Containerv1
          style={{
            paddingBottom: 300,
            paddingTop: 300,
            justifyContent: "space-between",
          }}
        >
          <FadeDiv bottom>
            <div style={{ width: "100%", marginRight: "150px" }}>
              <img src={image1} style={{ height: "100%" }} />
            </div>

            <div>
              <Header>제조사 정보 제공 서비스</Header>
              <Middle>
                <span>포트폴리오부터 계약 후기까지!<br />
                5000개의 전국 제조사 정보 제공</span>
              </Middle>
              <Body>
                남동공단부터 창원까지
                <br />
                선별된 5000여 개 제조사 정보를
                <br />
                지금 바로 확인하세요.
              </Body>
            </div>
          </FadeDiv>
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
const Middle = styled(Title.FontSize32)`
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 128px;
  width: 100%;

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
  color: #282c36;
  witdth: 100%;
`;

const FadeDiv = styled(Fade)`
  // display: inline-flex;
  // justify-content: space-between;
  // align-items: center;
`;