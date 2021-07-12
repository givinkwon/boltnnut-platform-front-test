import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Container";
import InputComponent from "components/Input2";
import ButtonComponent from "components/Button";
import ButtonSpinnerComponent from "components/ButtonSpinner";
import CheckBoxComponent from "components/CheckBox";

import * as Text from "components/Text";
import { GRAY, DARKGRAY, PRIMARY, WHITE } from "static/style";

const search_ic = "static/icon/search.png";

@inject("Auth")
@observer
class MyCoinConatiner extends React.Component {
  render() {
    const { Auth } = this.props;
    return (
      <div style={{ width: "100%", marginBottom: 50 }}>
        <Header>
          <Text.FontSize24
            style={{ marginRight: 5 }}
            color={WHITE}
            fontWeight={700}
          >
            ✔  본인의 제조 분야에 맞는 제조의뢰서를 빠르고, 쉽게 받아보세요.
          </Text.FontSize24>
        </Header>
        <Content>
          <ul>
            <li>
              <Text.FontSize20>
                회원가입 시 등록한 ‘가능한 제품분야’ 와 ‘진행한 제품들’을 바탕으로 선별된 고객의 제조의뢰서를 실시간으로 받아보세요.
                <br/><br/>다른 업무로 바쁘시다구요? 걱정마세요.
                <br/><br/>의뢰서가 도착하자마자 카카오톡으로 알림메시지를 전송해드립니다.
              </Text.FontSize20>
            </li>
            <br/>
              <PrimaryColorLink target="_blank" href="/signup">
                 ->  볼트앤너트 파트너 신청하러가기
              </PrimaryColorLink>
          </ul>

        </Content>
      </div>
    );
  }
}

export default MyCoinConatiner;

const Image = styled.img`
  margin-top: 20px;
  padding: 0 20px;
`;
const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
`;
const Content = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px #0005;

  display: flex;
  flex-direction: column;

  padding: 30px 10px;
  > ul {
    list-style: circle;
    padding-left: 30px;
  }
  li {
    margin-bottom: 6px;
  }
  > p {
    line-height: 1.3;
  }
`;

const PrimaryColorLink = styled.a`
  display: inline-block;
  color: ${PRIMARY};
  font-weight: 700;
  text-decoration: none;
`;