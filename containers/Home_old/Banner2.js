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
          <Fade bottom>
            <div style={{ marginRight: "126px" }}>
              <img src={image1} style={{ height: "100%" }} />
            </div>
            <div style={{ width: "100%" }}>
              <Header>제조사 정보 제공 서비스</Header>
              <Middle>
                <span>포트폴리오부터 계약 후기까지!</span>
                <span>5000개의 전국 제조사 정보 제공</span>
              </Middle>
              <Body>
                <span>남동공단부터 창원까지</span>

                <span>선별된 5000여 개 제조사 정보를</span>
                <span> 지금 바로 확인하세요.</span>
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
  font-size: 17px !important;
`;
const Middle = styled(Title.FontSize56)`
  font-size: 32px !important;
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 128px;
  width: 105%;

  > span {
    display: block;
    font-weight: bold;
  }
`;
const Body = styled(Title.FontSize24)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  //color: #cedafe;
  color: #282c36;
  > span {
    display: block;
  }
`;
