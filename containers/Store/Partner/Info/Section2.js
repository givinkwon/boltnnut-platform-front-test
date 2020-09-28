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
      <div style={{ width: "100%" }}>
        <Header>
          <Text.FontSize24
            style={{ marginRight: 5 }}
            color={WHITE}
            fontWeight={700}
          >
            2. 볼트앤너트 서비스는 가상화폐인 코인을 이용하고 있습니다.
          </Text.FontSize24>
        </Header>
        <Content>
          <ul>
            <li>
              <Text.FontSize20>
                1코인은 1,000원의 의미를 가집니다.
              </Text.FontSize20>
            </li>
            <li>
              <Text.FontSize20>
                제안서를 작성하기 전 스토어에서 선충전할 수 있습니다.
              </Text.FontSize20>
            </li>
          </ul>
          <Image src="/static/images/banner.png" style={{ height: 200 }} />
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
