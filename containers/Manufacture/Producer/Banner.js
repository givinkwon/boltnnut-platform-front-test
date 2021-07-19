import React from "react";
import styled from "styled-components";

import Background from "components/Background";
import Container from "components/Container";
import * as Text from "components/Text";
import * as Content from "components/Content";
const BackImg = "static/images/answer/MaskGroup/MaskGroup77.png";
import { BLACK } from "static/style";

class BannerConatiner extends React.Component {
  render() {
    return (
      <Background
        // src={BackImg}
        backgroundColor={"#fff"}
        style={{ height: 200 }}
      >
        <Container>
          <Item>
            <Text.FontSize36 color={BLACK} center={true}>
              제조사 찾기
            </Text.FontSize36>
            <Content.FontSize22 color={"#0933B3"} center={true}>
              {" "}
              나에게 맞는 제작업체를 찾아보세요.
            </Content.FontSize22>
          </Item>
        </Container>
      </Background>
    );
  }
}

export default BannerConatiner;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;

  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 180px;
    > p:nth-of-type(2) {
      margin-top: 16px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 208px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 208px;
  }
  @media (min-width: 1300px) {
    height: 208px;
  }
  
  > p:nth-of-type(1) {
    font-weight: bold;
  }

  > p:nth-of-type(2) {
    margin-top: 30px; // 16 + (59-32)
    font-weight: bold;
  }
`;

const Banner = styled.div`
  background-image: url("/static/images/banner.jpg");
  background-position: center;
  background-size: cover;
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-top: 40px;
    > p {
      text-align: center;
    }
    > p:nth-of-type(1) {
      margin-top: 8px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.29;
      letter-spacing: -1.55px;
    }
    > p:nth-of-type(2) {
      margin-top: 8px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.06;
      letter-spacing: -0.8px;
    }
    > p:nth-of-type(3) {
      line-height: 1.3;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 120px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 300px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 350px;
  }
  @media (min-width: 1300px) {
    height: 426px;
  }
`;
// 값들 임의로 정함
