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
            ✔   매칭수수료 안내
          </Text.FontSize24>
        </Header>
        <Content>
          <ul>
            <li>
              <Text.FontSize20>
                볼트앤너트는 서비스 이용요금으로 매칭수수료(VAT포함)를 받고 있습니다.<br/><br/>
                매칭수수료는 전체 계약금의 5%로, 고객이 계약 선금을 납입하는 날 아래 계좌로 입금해주시면 됩니다.<br/><br/>
              </Text.FontSize20>
              <Text.FontSize20 fontWeight={500}>
                IBK기업은행 201-082648-01-018, ㈜볼트앤너트<br/><br/>
              </Text.FontSize20>
            </li>
            <li>
              <Text.FontSize20>
                수수료 미납 및 지연 시 불이익이 발생할 수 있으며, 상황에 따라 회원 자격이 상실될 수 있습니다.<br/><br/>
              </Text.FontSize20>
            </li>
            <li>
              <Text.FontSize20>
                볼트앤너트는 고객과 제조전문가의 거래를 지원하는 기능을 수행할 뿐, 양측의 계약과 관련한 어떤 책임도 지지 않습니다.<br/><br/>
              </Text.FontSize20>
            </li>
            <li>
              <Text.FontSize20>
                매칭수수료에 대해 더 궁금한 점이 있으시다면 아래 플랫폼 이용약관을 참고하시거나 홈페이지 내 실시간톡으로 문의바랍니다.<br/><br/>
              </Text.FontSize20>
            </li>
            <br/>
              <PrimaryColorLink target="_blank" href="term/policy">
                 ->  이용약관 확인하러가기
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
