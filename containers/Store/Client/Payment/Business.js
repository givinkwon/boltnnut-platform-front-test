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

@inject("Auth", "Payment")
@observer
class BusinessConatiner extends React.Component {

   pay = () => {
    const { Auth, Payment } = this.props;
    Payment.client_product =  { id: 2, date: 9, price: 198000 }
    try {
      if (this.props.Auth.logged_in_client.client_class) {
        alert("프라임 회원 기간이 끝난 뒤, 재구매 하실 수 있습니다.");
      } else {
        this.props.Payment.clientOrder("html5_inicis");
      }
    } catch {
      alert("로그인이 필요합니다.");
    }
  };
  render() {
    const { Auth, Payment } = this.props;
    return (
      <div style={{ width: "100%" }}>

        <Content>
         {Payment.client_products.map((item) => {
            return (
              <>
              {item && item.date==9 &&
              <Item
                key={item.id}
                active={Payment.client_product.id === item.id}
                onClick={() => (Payment.client_product = item)}
              >

               <Text.FontSize36 fontWeight={400}>
                398,000원
               </Text.FontSize36>
               <br/>
               <Text.FontSize48 fontWeight={500}>
                198,000원
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
            ✔   제조 컨설팅 - 견적, 예상 기간, 문의 사항 답변<br/><br/>
            ✔   추천받은 업체와 1:1 맞춤형 전화 상담<br/><br/>
            ✔   원하는 견적에 적합한 업체 수배 및 견적서 전달(3개, 미수배 시 100% 환불)<br/><br/>

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

export default BusinessConatiner;

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
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  > p:nth-of-type(1) {
    text-decoration : line-through
  }
`;
