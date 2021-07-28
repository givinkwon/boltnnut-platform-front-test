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
            ✔  제조전문가와의 미팅 후 생생한 미팅후기를 남겨주세요!
          </Text.FontSize24>
        </Header>
        <Content>
          <ul>
            <li>
              <Text.FontSize20>
                미팅이 끝난 후에는 미팅한 전문가의 의사소통 능력, 전문성, 제시한 가격의 만족도 등에 대해 솔직하게 후기를 작성해주세요.
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
