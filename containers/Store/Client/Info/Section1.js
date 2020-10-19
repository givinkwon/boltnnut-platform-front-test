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
            📣 일반 회원
          </Text.FontSize24>
        </Header>
        <Content>
              <Text.FontSize20 fontWeight={500}>
                볼트앤너트의 일반 회원은 아래 서비스를 무료로 이용하실 수 있습니다.
              </Text.FontSize20>
              <br/><br/>
              <Text.FontSize20 fontWeight={500}>
                ✔   의뢰서 작성하기<br/><br/>
                ✔   제조 의뢰당 2개의 큐레이션된 제조사 정보 확인하기<br/><br/>
                ✔   제조전문가와의 전화 상담<br/><br/>

              </Text.FontSize20>

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
