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
            ✔  만들고자 하는 제품의 제조의뢰서를 작성해주세요.
          </Text.FontSize24>
        </Header>
        <Content>
          <ul>
            <li>
              <Text.FontSize20>
                고객님께서 작성하신 의뢰서를 바탕으로 해당 제품을 만들어 본 경험이 있는 제조전문가 제안서를 전송합니다.
                <br/><br/>
                의뢰서를 자세히 작성할수록 더 적합한 전문가와 매칭됩니다.
              </Text.FontSize20>
            </li>
            <br/>
              <PrimaryColorLink target="_blank" href="/request?big=4&mid=">
                 ->  의뢰서 작성하러가기
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
