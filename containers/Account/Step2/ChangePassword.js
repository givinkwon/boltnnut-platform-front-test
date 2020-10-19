import React, {Component} from "react";
import styled from 'styled-components';

import Container from "components/Container";
import * as Text from 'components/Text';
import {PRIMARY, WHITE} from "../../../static/style";
import {inject, observer} from "mobx-react";

@inject('Auth')
@observer
class ChangePassword extends Component {
  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      const {Auth} = this.props
      Auth.changePassword();
    }
  }

  render() {
    const {Auth} = this.props

    return (
      <Background>
        <Container>
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
        </Container>
      </Background>
    );
  }
}

export default ChangePassword;

const Background = styled.div`
  background-color: #f5f5f5;
`;

const Form = styled.div`
  padding-top: 50px;
  padding-bottom: 150px;
`;

const FormTitle = styled.div`
  background-color: ${PRIMARY};
  box-sizing: border-box;
  padding: 15px 20px;
`
const FormBody = styled.div`
  background-color: white;
  box-sizing: border-box;
  border: 2px solid #dedede;
  padding: 30px;
`

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
`
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
`

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
`
