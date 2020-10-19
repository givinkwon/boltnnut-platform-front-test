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
            ✔  의뢰서에 딱 맞는 제조전문가의 제안서를 무료로 받아보세요.
          </Text.FontSize24>
        </Header>
        <Content>
          <ul>
            <li>
              <Text.FontSize20>
                더 이상 제조 전문가 찾느라 시간 낭비하지 마세요.
                <br/><br/>
                의뢰서를 제출한 후 1영업일 내에 볼트앤너트 매니저가 검토한 후 유선상으로 통화드려 의뢰서를 보완합니다.
                그 후 24시간 이내에 여러분의 조건에 딱 맞는 제조 전문가 5명의 제안서가 도착합니다.
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
