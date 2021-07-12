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
      <div style={{ width: "100%", marginBottom: 20 }}>
        <Header>
          <Text.FontSize24
            style={{ marginRight: 5 }}
            color={WHITE}
            fontWeight={700}
          >
            ✔  고객과의 미팅을 통해 계약을 성사시키세요!
          </Text.FontSize24>
        </Header>
        <Content>
          <ul>
            <li>
              <Text.FontSize20>
                고객과 주고 받은 의뢰서 및 제안서를 바탕으로 효율적으로 미팅을 진행하세요.
                <br/><br/>볼트앤너트의 고객-제조전문가 매칭 알고리즘은 계약 성사까지 걸리는 시간을 단축시켜드립니다
                <br/><br/>※ 계약 성사 시 전체 계약대금의 5%가 수수료로 부과됩니다. 수수료는 추후 변경될 수 있습니다

              </Text.FontSize20>
            </li>
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
