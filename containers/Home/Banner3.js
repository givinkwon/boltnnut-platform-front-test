import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "../../components/Background";
import * as Title from "../../components/Title";
import * as Text from "../../components/Text";
import Button from "../../components/Button";

class Banner3Container extends React.Component {
  render() {
    return (
      <CustomBackground>
        <CustomContainer style={{ width: "830px" }}>
          <Title26>더 다양한 카테고리의 업체 전문가들을 찾고 있으신가요?</Title26>

          <SignupButton>
            <a href={"signup"}>
              <Text20>회원가입하기</Text20>
            </a>
          </SignupButton>
        </CustomContainer>
      </CustomBackground>
    );
  }
}

export default Banner3Container;

const CustomBackground = styled(Background)`
  display: flex;
  justify-content: center;
  height: 200px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #f6f6f6;
  margin-top: 80px;
`;

const CustomContainer = styled(Containerv1)`
  justify-content: space-between;
  align-items: center;
`;

const SignupButton = styled(Button)`
  display: flex;
  justify-content: center;
  width: 175px;
  height: 58px;
  border-radius: 29px;
  border: solid 1.5px #0933b3;
  cursor: pointer;
  background: none;
`;

const Title26 = styled(Title.FontSize26)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.92;
  letter-spacing: -0.65px;
  color: #555963;
`;

const Text20 = styled(Text.FontSize20)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.6;
  letter-spacing: -0.5px;
  color: #0933b3;
`;
