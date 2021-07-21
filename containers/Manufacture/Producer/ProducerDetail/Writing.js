import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import Partner from "../../../../stores/Manufacture/Partner";

const checkImg = "/static/images/producer/check.svg";

@inject("Partner", "Auth")
@observer
class WritingContainer extends React.Component {
  activeHandler = (e) => {
    const { Partner } = this.props;
    console.log(e);
    console.log(e.target.value);
    Partner.questionSearchText = e.target.value;
  };
  render() {
    const { Partner, type, clientId, partnerId } = this.props;
    let placeholder = "";
    if (type === "comment") {
      placeholder = "문의를 작성해주세요.";
    } else {
      placeholder = "rhk***님에게 답글달기";
    }
    if (type === "recomment") {
      console.log(this.props.data);
    }
    console.log(clientId);
    console.log(partnerId);
    console.log(type);
    console.log(placeholder);
    return (
      <>
        <Container>
          <Content>
            <textarea
              placeholder={placeholder}
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => {
                e.target.placeholder =
                  type == "comment" ? "문의를 작성해주세요." : "답글달기";
              }}
              placeholderStyle={{ fontWeight: "400" }}
              onChange={this.activeHandler}
            />
          </Content>
          <Footer>
            <SecretBox
              active={Partner.activeHandler("secret")}
              onClick={() => {
                Partner.clickHandler("secret");
                console.log(this.props.Partner.secretIdx);
                this.setState({ h: 3 });
              }}
            >
              <div>
                <div>
                  <img src={checkImg} />
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
                <div
                  onClick={async () => {
                    if (type == "comment") {
                      await Partner.setQuestion(
                        clientId,
                        partnerId,
                        Partner.secretIdx,
                        Partner.questionSearchText
                      );
                      await Partner.getQuestion(partnerId);
                      console.log("comment");
                      // this.props.setQA();
                    } else {
                      await Partner.setAnswerByQuestion(
                        this.props.data.id,
                        0,
                        Partner.secretIdx,
                        Partner.questionSearchText
                      );
                      await Partner.getQuestion(partnerId);
                      console.log("recomment");
                      // Partner.changeQuestion();
                      // console.log(this.props.setQA);
                    }
                    // this.setState({ h: 3 });
                    console.log("eeeeeeeee");

                    // this.props.setQA();
                    // this.props.setQA2();
                  }}
                >
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
  cursor: pointer;
  > div:nth-of-type(1) {
    margin-right: 14px;
    > div {
      width: 18px;
      height: 18px;
      border: 1px solid #c6c7cc;
      background-color: ${(props) => (props.active ? "#0933b3" : "#ffffff")};
      > img {
        display: ${(props) => (props.active ? "block" : "none")};
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
    cursor: pointer;
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
