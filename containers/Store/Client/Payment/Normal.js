import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Container";
import InputComponent from "components/Input2";
import ButtonComponent from "components/Button";
import ButtonSpinnerComponent from "components/ButtonSpinner";
import CheckBoxComponent from "components/CheckBox";
import { intcomma } from "utils/format";
import {withRouter} from "next/router";
import * as Text from "components/Text";
import { GRAY, DARKGRAY, PRIMARY, WHITE } from "static/style";

const search_ic = "static/icon/search.png";

@inject("Auth", "Payment")
@observer
class NormalConatiner extends React.Component {
   pay = () => {
    const { Auth, Payment, router } = this.props;
    router.push(`/request?big=4&mid=`)
  };
  render() {
    const { Auth, Payment } = this.props;
    return (
      <div style={{ width: "100%" }}>

        <Content>
           {Payment.client_products.map((item) => {
            return (
              <>
              {item && item.date==7 &&
              <Item
                key={item.id}
                active={Payment.client_product.id === item.id}
              >
               <Text.FontSize48 fontWeight={500}>
                0원
               </Text.FontSize48>

              </Item>
            }
            </>
            );
          })}
          <Text.FontSize24 color="#404040" fontWeight={500}>
            ✔   제품 개발 의뢰서 무료 작성<br/><br/>
            ✔   전문컨설턴트와 1:1 상담<br/><br/>
            ✔   5개 업체 리스트 추천 받기<br/><br/>
            ✔   추천받은 업체와 1:1 맞춤형 전화 상담<br/><br/>

          </Text.FontSize24>
        </Content>
        <Header>
            <Text.FontSize24 onClick={this.pay} color={WHITE} fontWeight={500}>
                  시작하기
            </Text.FontSize24>
        </Header>
      </div>
    );
  }
}

export default withRouter(NormalConatiner);

const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px #0005;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  padding: 0px 0px;
  > p {
    //text-align: center;
    line-height: 1.3;
  }
`;

const Item = styled.div`
  cursor: pointer;
  background-color: #f5f5f5;
  width: calc(100% - 40px);
  height: 200px;
  padding: 12px 20px;
  margin: 2px 0;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;

`;
