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
            ✔  볼트앤너트가 큐레이션 한 제조전문가들과 통화를 통해 미팅 여부를 결정하세요.
          </Text.FontSize24>
        </Header>
        <Content>
          <ul>
            <li>
              <Text.FontSize20>
                제조전문가의 제안서는 볼트앤너트 자체 큐레이션 알고리즘에 따라 2차 선별과정을 거친 후 고객님께 발송됩니다.
                <br/>
                <br/>
                제조전문가의 포트폴리오와 다른 고객들이 남긴 생생한 미팅 및 계약 후기를 확인한 후 마음에 드는 제조전문가와 미팅을 확정하세요.
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
