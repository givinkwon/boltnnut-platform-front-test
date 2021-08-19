import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "../../components/Background";
import Button from "../../components/Button";
import * as Title from "../../components/Title";
import * as Text from "../../components/Text";
import Router from "next/router";

// images
const Banner6BackgroundImg = "/static/images/Banner6BackgroundImg.png";

class Banner6Container extends React.Component {
  render() {
    return (
      <CustomBackground>
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Title26>신제품을 개발하고 싶으신가요?</Title26>
            <Title26>
              1분만에 프로젝트를 등록하고 맞춤형 업체 정보를 받아보세요.
            </Title26>
          </div>

          <a href={"request"}>
            <RequestButton>맞춤형 문의하기</RequestButton>
          </a>
          {/* <RequestButton onClick={() => Router.push("/request")}> */}
        </Container>
      </CustomBackground>
    );
  }
}

export default Banner6Container;

const CustomBackground = styled(Background)`
  display: flex;
  justify-content: center;
  height: 352px;
  background-image: url("/static/images/Banner6BackgroundImg.png");
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Title26 = styled(Title.FontSize26)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.92;
  letter-spacing: -0.65px;
  color: #000000;
`;

const Text20 = styled(Text.FontSize20)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.6;
  letter-spacing: -0.5px;
  color: #0933b3;
`;

const RequestButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 282px;
  height: 58px;
  margin-top: 46px;
  border-radius: 29px;
  border: solid 2px #0933b3;
  background: none;
  cursor: pointer;

  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  color: #0933b3;

  :hover {
    background-color: #174aee;
    color: #ffffff;
  }
`;
