import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Container";
import ButtonComponent from "components/Button";
import InputComponent from "components/Input4";
import ButtonSpinnerComponent from "components/ButtonSpinner";

import Router from "next/router";

import * as Text from "components/Text";
import { BLACK, WHITE, PRIMARY } from "static/style";

const search_ic = "static/icon/search.png";

@inject("Auth")
@observer
class CompleteContainer extends React.Component {
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.toLogIn();
    }
  };
  toLogIn = () => {
    this.props.Auth.setStep(0);
    Router.push("/login");
  };
  render() {
    const { Auth } = this.props;
    console.log(this.props.Auth.restore_email);
    return (
      <Form>
        <Container>
          <Text.FontSize56 color={"#0a2165"} fontWeight={700}>
            아이디 찾기
          </Text.FontSize56>
          <ForgetIDContainer>
            <Text.FontSize20 color={"#0a2165"} fontWeight={500}>
              입력하신 휴대전화번호로 가입된 아이디의 목록입니다.
            </Text.FontSize20>
            <Text.FontSize20>
              <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                {this.props.Auth.restore_email &&
                  this.props.Auth.restore_email.map((item, idx) => {
                    return (
                      <Text.FontSize20 color={"#0a2165"}>
                        {" "}
                        {item}{" "}
                      </Text.FontSize20>
                    );
                  })}
              </div>
            </Text.FontSize20>
            <ButtonBox>
              <ButtonComponent
                backgroundColor={"#0a2165"}
                borderColor={WHITE}
                borderRadius={3}
                borderWidth={1}
                onClick={this.toLogIn}
              >
                {Auth.loading ? (
                  <ButtonSpinnerComponent scale="50%" primary />
                ) : (
                  <Text.FontSize24 color={WHITE} fontWeight={500}>
                    로그인
                  </Text.FontSize24>
                )}
              </ButtonComponent>
            </ButtonBox>
          </ForgetIDContainer>
        </Container>
      </Form>
    );
  }
}

export default CompleteContainer;

const ForgetIDContainer = styled.div`
  border-radius: 10px;
  border: solid 1px #c7c7c7;
  padding: 40px;
  margin-top: 50px;
  > p {
    font-stretch: normal;
    font-style: normal;
    line-height: 1.7;
    letter-spacing: -0.5px;
  }
`;
const ButtonBox = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  > div {
    width: 100%;
    :hover {
      background-color: #0933b3;
    }
    > p {
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.42;
      letter-spacing: -0.6px;
    }
  }
`;
const Form = styled.div`
  background-position: center;
  background-size: cover;
  ${Container} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

    > p:nth-of-type(2) {
      margin-top: 15px;
      margin-bottom: 30px;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    ${Container} {
      padding: 40px 0;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: calc(100vh - 214px);
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: calc(100vh - 214px);
  }
  @media (min-width: 1300px) {
    height: calc(100vh - 218px);
  }
`;
