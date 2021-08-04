import React, { Component } from "react";
import styled from "styled-components";
import * as Text from "components/Text";
import { PRIMARY, WHITE } from "../../../static/style";
import { inject, observer } from "mobx-react";

import Background from "components/Background";
import Container from "components/Containerv1";

@inject("Auth")
@observer
class ChangePassword extends Component {
  onKeyPress = (e) => {
    if (e.key === "Enter") {
      const { Auth } = this.props;
      Auth.changePassword();
    }
  };

  render() {
    const { Auth } = this.props;

    return (
      <Background style={{ backgroundColor: "#f6f6f6" }}>
        <Header>
          <HeaderTitle>
            <div style={{ marginBottom: 12 }}> 계정 설정 > 기본 정보 수정</div>
          </HeaderTitle>
        </Header>
        <Container>
          <Body>
            <Aside>
              {/* <AsideHeader>{Auth.logged_in_user.username}</AsideHeader> */}
              <AsideHeader>ddddd</AsideHeader>
              <AsideBody>
                <div>
                  프로젝트를 진행하면 최소 3개월 이상 시간이 소요됩니다. 다른
                  프로젝트를 진행하기전에 제조사에게 프로젝트를 의뢰해보세요.{" "}
                </div>
              </AsideBody>
            </Aside>
            <Main>
              <MainHeader>
                <div>관심 제조사</div>
              </MainHeader>
            </Main>
          </Body>
        </Container>
        {/* <Container>
          <Form>
            <FormTitle>
              <Text.FontSize20 color={WHITE} fontWeight={700}>
                비밀번호 변경
              </Text.FontSize20>
            </FormTitle>

            <FormBody>
              <InputBox>
                <Label>
                  <Text.FontSize20 color="#404040" fontWeight={700}>
                    새 비밀번호
                  </Text.FontSize20>
                </Label>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  onChange={(e) => Auth.setNewPassword(e.target.value)}
                />
              </InputBox>
              <InputBox>
                <Label>
                  <Text.FontSize20 color="#404040" fontWeight={700}>
                    새 비밀번호 확인
                  </Text.FontSize20>
                </Label>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  onChange={(e) => Auth.setPassword2(e.target.value)}
                  onKeyPress={this.onKeyPress}
                />
              </InputBox>

              <Button onClick={Auth.changePassword}>
                <Text.FontSize20 color="white" fontWeight={700}>
                  비밀번호 변경하기
                </Text.FontSize20>
              </Button>
            </FormBody>
          </Form>
        </Container> */}
      </Background>
    );
  }
}

export default ChangePassword;

const Form = styled.div`
  padding-top: 50px;
  padding-bottom: 150px;
`;

const FormTitle = styled.div`
  background-color: ${PRIMARY};
  box-sizing: border-box;
  padding: 15px 20px;
`;
const FormBody = styled.div`
  background-color: white;
  box-sizing: border-box;
  border: 2px solid #dedede;
  padding: 30px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 24px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;
const Label = styled.div`
  width: 160px;
  flex-shrink: 0;

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 8px;
  }
`;
const Input = styled.input`
  box-sizing: border-box;
  width: 500px;
  max-width: calc(100vw - 40px - 60px - 4px);
  padding: 10px;
  background-color: white;
  border: 1px solid #c6c6c6;
  border-radius: 6px;
  opacity: 0.8;

  color: #001a56;
  font-size: 18px;
`;

const Button = styled.div`
  cursor: pointer;

  width: fit-content;
  margin-left: auto;
  background-color: ${PRIMARY};
  box-sizing: border-box;
  border-radius: 24px;
  padding: 8px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 116px;
`;

const HeaderTitle = styled.div`
  height: 100%;
  padding-left: 118px;
  display: flex;
  align-items: flex-end;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.4px;
  text-align: left;
  color: #555963;
}
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: NotoSansCJKkr;
`;

const Aside = styled.div`
  width: 230px;
`;

const AsideHeader = styled.div`
  padding-top: 50px;
  padding-bottom: 16px;
  border-bottom: solid 1px #e1e2e4;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #0933b3;
`;

const AsideBody = styled.div`
  padding-top: 16px;
  font-size: 14px;
  line-height: 1.73;
  letter-spacing: -0.38px;
  text-align: left;
  color: #767676;
`;

const Main = styled.div`
  width: 100%;
  padding-left: 72px;
`;

const MainHeader = styled.div`
padding-top: 45px;
padding-bottom: 16px;
border-bottom: solid 1px #e1e2e4;
font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
  text-align: left;
  color: #1e2222;
}
`;
