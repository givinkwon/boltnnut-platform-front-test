import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import * as Text from "components/Text";
import { GRAY, DARKGRAY, PRIMARY, WHITE } from "static/style";

const inicis_icon = "/static/images/inicis.png";
const kakaypay_icon = "/static/images/kakao_pay.png";

@inject("Auth", "Payment")
@observer
class PaymentContainer extends React.Component {
  render() {
    const { Auth, Payment } = this.props;
    return (
      <div style={{ width: "100%", marginTop: 15, marginBottom: 30 }}>
        <Header>
          <Text.FontSize24 color={WHITE} fontWeight={700}>
            결제수단
          </Text.FontSize24>
        </Header>
        <Content>
          <Inicis onClick={() => {
            Payment.clientOrder('html5_inicis')
          }}>
            <img src={inicis_icon} />
            <p>KG 이니시스</p>
          </Inicis>
        </Content>
      </div>
    );
  }
}

export default PaymentContainer;

const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;
  padding: 0 20px;
`;
const Content = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px #0005;

  display: flex;
  flex-wrap: wrap;
  align-items: center;

  padding: 30px 20px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const KakaoPay = styled.div`
  width: 215px;
  height: 110px;
  border: 1px solid #ffac00;
  background-color: #ffffff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    filter: brightness(0.95);
  }
  img {
    width: auto;
    height: 56px;
  }
  p {
    font-size: 14px;
    color: #8e8e8e;
    margin-top: -5px;
  }
`;

