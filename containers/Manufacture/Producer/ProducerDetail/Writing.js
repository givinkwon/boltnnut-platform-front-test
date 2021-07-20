import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

@inject("Partner", "Auth")
@observer
class WritingContainer extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Content>
            <textarea
              placeholder="rhk***님에게 답글달기"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => {
                e.target.placeholder = "rhk***님에게 답글달기";
              }}
              placeholderStyle={{ fontWeight: "400" }}
            />
          </Content>
          <Footer>
            <SecretBox>
              <div>
                <div>
                  <div></div>
                </div>
              </div>
              <span>비밀글</span>
            </SecretBox>
            <ButtonBox>
              {/* <Button type="cancel">
                <div>
                  <span>작성취소</span>
                </div>
              </Button> */}
              <Button type="submit">
                <div>
                  <span>작성하기</span>
                </div>
              </Button>
            </ButtonBox>
          </Footer>
        </Container>
      </>
    );
  }
}

export default WritingContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 770px;
  height: 254px;
  border: 1px solid #c6c7cc;
  border-radius: 5px;
  margin-top: 30px;
`;

const Content = styled.div`
  height: 196px;
  padding: 20px;
  box-sizing: border-box;
  > textarea {
    resize: none;
    width: 100%;
    min-height: 150px;
    font-size: 18px;
    line-height: 34px;
    letter-spzcing: -0.45px;
    color: #414550;
    font-weight: normal;
    overflow: auto;
    height: auto;
    font-family: inherit;
    // background-color: #f6f6f6;
    border: none;
    :focus {
      outline: none;
    }
    :placeholder {
      font-weight: normal;
    }
    white-space: pre-line;
    @media (min-width: 0px) and (max-width: 767.98px) {
      font-size: 14px;
    }
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #c6c7cc;
  padding: 0 20px;
  box-sizing: border-box;
  height: 100%;
`;
const SecretBox = styled.div`
  display: flex;
  > div:nth-of-type(1) {
    margin-right: 14px;
    > div {
      width: 18px;
      height: 18px;
      border: 1px solid #c6c7cc;
      > div {
      }
    }
  }
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${(props) => props.type === "cancel" && "14px"};
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) =>
      props.type === "cancel" ? "#b3b3b3" : "#0933b3"};
    border-radius: 5px;
    width: 98px;
    height: 38px;
    > span {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.4px;
      font-weight: 500;
      color: #ffffff;
    }
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;
