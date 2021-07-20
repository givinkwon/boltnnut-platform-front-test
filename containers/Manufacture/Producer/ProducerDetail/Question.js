import React from "react";
import WritingContainer from "./Writing";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

@inject("Partner", "Auth")
@observer
class QuestionContainer extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Card>
            <Category>Q.</Category>
            <Content>
              <content>
                해당 제조사가 들어오면 비밀댓글이 보입니다. 서울 오늘의 날씨
                32도 습도 80% 여기는 동남아인가
              </content>
              <answer>답글달기</answer>
            </Content>
            <Info>
              <Name>rhk***님</Name>
              <Date>2021.5.28</Date>
            </Info>
          </Card>
          <WritingContainer />
        </Container>
      </>
    );
  }
}

export default QuestionContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;  

  input {
    width: 97%;
    // padding: 4px;
    outline: none;
    border: 1px solid #0933b3;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    line-height: 34px;
    ::placeholder {
      font-size: 14px;

      color: #c1bfbf;
    }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e1e2e4;
  min-height: 134px;
`;
const Category = styled.div`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.45px;
  color: #282c36;
  margin-right: 12px;
`;
const Content = styled.div`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.45px;
  color: #282c36;
  padding-right: 34px;
  display: flex;
  flex-direction: column;
`;
const Info = styled.div``;
const Name = styled.div`
  line-height: 40px;
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #555963;
  font-weight: normal;
`;
const Date = styled.div`
  line-height: 27px;
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #767676;
  font-weight: normal;
`;

// const WritingBox = styled(WritingContainer)`
//   margin-top: 30px;
//   border: 3px solid red;
// `;
