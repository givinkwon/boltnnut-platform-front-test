import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import Background from "../../../components/Background";
import Button from "../../../components/Button";

const background = "static/images/mobilebanner6backgroundimg.png";

class MobileBanner5Container extends React.Component {
  render() {
    return (
      <BackgroundContainer>
        <Container>
          <Title16> 마음에 드는 공장을 찾기 힘드시나요? </Title16>
          <Title16>지금 '의뢰하기'를 눌러서</Title16>
          <Title16>여러 업체의 회사소개서와 제안서를 받아보세요.</Title16>

          <RequestButton>
            <Title15>무료로 의뢰하기</Title15>
          </RequestButton>
        </Container>
      </BackgroundContainer>
    );
  }
}

export default MobileBanner5Container;

const BackgroundContainer = styled(Background)`
  display: flex;
  justify-content: center;
  height: 217px;
  background-image: url(${background});
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 250px;
`;

const Title16 = styled(Title.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.75;
  letter-spacing: -0.4px;
  color: #282c36;
`;

const Title15 = styled(Title.FontSize15)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.38px;
  color: #0933b3;
`;

const RequestButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 189px;
  height: 42px;
  object-fit: contain;
  border-radius: 21px;
  border: solid 1px #0933b3;
  margin-top: 28px;
  background: none;
  cursor: pointer;
`;
