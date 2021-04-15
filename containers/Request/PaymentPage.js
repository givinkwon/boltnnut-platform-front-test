import React from "react";
import styled, { css } from "styled-components";
import Background from "../../components/Background";
import Containerv1 from "../../components/Containerv1";
import * as Title from "../../components/Title";
import InputComponent from "components/Input2";
import { inject, observer } from "mobx-react";
import Postcode from "./PostCode";
import { XRHitTestTrackableType } from "three";

const img = "/static/images/request/PaymentPage/star.png";
const passimg = "/static/images/request/PaymentPage/pass.png";
const pass3 = "static/images/pass3.png";

@inject("Payment", "ManufactureProcess")
@observer
class PaymentPageContainer extends React.Component {
  state = {
    selectedIdx: 0,
    checkbox: false,
    defaultNum: "010",
    middleNum: "0",
    lastNum: "0",
  };

  payButtonClick = () => {
    const { Payment } = this.props;
    var cellphoneValid = /^\d{3}-\d{3,4}-\d{4}$/;
    let cellphone = `${this.state.defaultNum}-${this.state.middleNum}-${this.state.lastNum}`;
    console.log(cellphone);

    if (!cellphoneValid.test(cellphone)) {
      return alert("전화번호가 잘못 입력되었습니다. 다시 확인해 주세요");
    }
    // Payment.phone_number = cellphone;
    // console.log(cellphone.replace("-", "").replace("-", ""));
    console.log(this.props.ManufactureProcess.quantity);
    Payment.setPhoneNumber(cellphone.replace("-", "").replace("-", ""));
    Payment.product_price = 10;
    Payment.setProjectName("MASDASCNASKLCNASKLCNL");
    // Payment.count_number = 3;
    Payment.setCountNumber(3);
    Payment.clientOrder("html5_inicis");
  };

  modalHandler = () => {
    const { Payment } = this.props;
    Payment.modalActive = !Payment.modalActive;
  };
  paymentWayClick = (idx) => {
    this.setState({ selectedIdx: idx });
  };

  checkboxHandler = () => {
    if (this.state.checkbox === false) {
      this.setState({ checkbox: true });
    } else {
      this.setState({ checkbox: false });
    }
  };

  render() {
    let activeHandler = (idx) => {
      if (this.state.selectedIdx === idx) {
        return true;
      } else {
        return false;
      }
    };

    const { Payment } = this.props;
    return (
      <Background>
        <PaymentPageDiv>
          {Payment.modalActive && (
            <Layer onClick={this.modalHandler}>
              <Postcode />
            </Layer>
          )}

          <PaymentPageLeft>
            {this.state.lastNum}
            <LeftHeader>결제 정보 입력</LeftHeader>
            <OrderInfoBox>
              <OrderInfoTitle>주문자 정보</OrderInfoTitle>
            </OrderInfoBox>
            <InlineFlexDiv>
              <FontSize20>이름</FontSize20>
              <FontSize16>(한글)</FontSize16>
              <img src={img} />
            </InlineFlexDiv>
            <div style={{ marginTop: "10px", marginBottom: "26px" }}>
              <InputComponent
                class="Input"
                placeholder="옵션을 선택해주세요."
                // value={Request.input_name}
                onChange={() => {
                  console.log("r");
                }}
              />
            </div>

            <InlineFlexDiv>
              <FontSize20>전화번호</FontSize20>
              <img src={img} />
            </InlineFlexDiv>
            <InlineFlexDiv style={{ marginTop: "10px", marginBottom: "26px" }}>
              <InputComponent
                value={this.state.defaultNum}
                width="90px"
                onChange={(e) => {
                  console.log(e);
                  this.setState({ defaultNum: e });
                }}
              />
              <PhoneNumDash />
              <InputComponent
                placeholder={"1234"}
                width="90px"
                onChange={(e) => {
                  this.setState({ middleNum: e });
                }}
              />
              <PhoneNumDash />
              <InputComponent
                placeholder={"5678"}
                width="90px"
                onChange={(e) => {
                  this.setState({ lastNum: e });
                }}
              />
            </InlineFlexDiv>

            <InlineFlexDiv>
              <FontSize20>배송주소</FontSize20>
              <img src={img} />
            </InlineFlexDiv>
            <InlineFlexDiv style={{ justifyContent: "space-between" }}>
              <DeliveryAddressBox1>
                {this.props.Payment.zipCode}
              </DeliveryAddressBox1>
              <SearchBtn onClick={this.modalHandler}>주소검색</SearchBtn>
            </InlineFlexDiv>
            <DeliveryAddressBox2>
              {this.props.Payment.address}
            </DeliveryAddressBox2>
            {this.props.Payment.address != "" && (
              <div style={{ marginBottom: "26px" }}>
                <InputComponent
                  class="Input"
                  placeholder="상세주소를 입력해 주세요"
                  // value={Request.input_name}
                  onChange={() => {
                    console.log("r");
                  }}
                />
              </div>
            )}

            <InlineFlexDiv>
              <FontSize20>결제방법</FontSize20>
              <img src={img} />
            </InlineFlexDiv>
            <PaymentWayBox>
              <PaymentWay
                onClick={() => this.paymentWayClick(1)}
                active={activeHandler(1)}
              >
                <PaymentCheckImg src={passimg} active={activeHandler(1)} />
                <PaymentWayTitle>신용카드</PaymentWayTitle>
              </PaymentWay>
              <PaymentWay
                onClick={() => this.paymentWayClick(2)}
                active={activeHandler(2)}
              >
                <PaymentCheckImg src={passimg} active={activeHandler(2)} />
                <PaymentWayTitle>실시간 계좌이체</PaymentWayTitle>
              </PaymentWay>
              <PaymentWay
                onClick={() => this.paymentWayClick(3)}
                active={activeHandler(3)}
              >
                <PaymentCheckImg src={passimg} active={activeHandler(3)} />
                <PaymentWayTitle>후불결제</PaymentWayTitle>
              </PaymentWay>
            </PaymentWayBox>
          </PaymentPageLeft>

          <PaymentPageRight>
            <PaymentInfoWrap>
              <div style={{ marginTop: "35px" }}>
                <PaymentInfoTitle>결제정보</PaymentInfoTitle>
              </div>

              <PaymentInfo1>
                <InlineFlexDiv
                  style={{
                    justifyContent: "space-between",
                    marginTop: "30px",
                    marginTop: "20px",
                  }}
                >
                  <FontSize18 style={{ marginBottom: "20px" }}>
                    생산 소요 시간
                  </FontSize18>
                  <FontSize18 style={{ color: "#414550", fontWeight: "500" }}>
                    7일
                  </FontSize18>
                </InlineFlexDiv>

                <InlineFlexDiv
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "30px",
                  }}
                >
                  <FontSize18>도착 예정일</FontSize18>
                  <FontSize18 style={{ color: "#414550", fontWeight: "500" }}>
                    4.1(목)~4.3(토)
                  </FontSize18>
                </InlineFlexDiv>
              </PaymentInfo1>

              <PaymentInfo2>
                <InlineFlexDiv
                  style={{ justifyContent: "space-between", marginTop: "30px" }}
                >
                  <FontSize18
                    style={{ color: "#767676", marginBottom: "20px" }}
                  >
                    부품 갯수
                  </FontSize18>
                  <FontSize18 style={{ color: "#414550", fontWeight: "500" }}>
                    3개
                  </FontSize18>
                </InlineFlexDiv>
                <InlineFlexDiv style={{ justifyContent: "space-between" }}>
                  <FontSize18
                    style={{ color: "#767676", marginBottom: "20px" }}
                  >
                    부품 가격
                  </FontSize18>
                  <FontSize18 style={{ color: "#414550", fontWeight: "500" }}>
                    3,513,000원
                  </FontSize18>
                </InlineFlexDiv>
                <InlineFlexDiv
                  style={{
                    justifyContent: "space-between",
                    marginBottom: "30px",
                  }}
                >
                  <FontSize18 style={{ color: "#767676" }}>배송비</FontSize18>
                  <FontSize18 style={{ color: "#414550", fontWeight: "500" }}>
                    5,000원
                  </FontSize18>
                </InlineFlexDiv>
              </PaymentInfo2>

              <InlineFlexDiv
                style={{
                  justifyContent: "space-between",
                  width: "512px",
                  marginBottom: "26px",
                }}
              >
                <PaymentInfoText24>최종 결제가격</PaymentInfoText24>
                <PaymentInfoText24 style={{ color: "#282c36" }}>
                  3,518,000원
                </PaymentInfoText24>
              </InlineFlexDiv>
            </PaymentInfoWrap>

            <PaymentInfo3>
              <PaymentInfoWrap style={{ marginTop: "26px" }}>
                <FontSize18 style={{ fontWeight: "500", color: "#282c36" }}>
                  주문동의
                </FontSize18>
                <FontSize18
                  style={{
                    fontWeight: "normal",
                    color: "#767676",
                    marginTop: "14px",
                    lineHeight: "1.56",
                  }}
                >
                  주문할 상품의 상품, 상품가격, 배송정보를 확인하였으며, 구매에
                  동의 하시겠습니까?
                  <br /> (전자상거래법 제8조 제2항)
                </FontSize18>

                <FontSize18
                  style={{
                    fontWeight: "normal",
                    color: "#767676",
                    marginTop: "18px",
                    lineHeight: "1.56",
                  }}
                >
                  주문제작상품의 경우, 교환/환불이 불가능 하다는 내용을
                  확인하였으며 이에 동의합니다.
                </FontSize18>
                <InlineFlexDiv
                  style={{ justifyContent: "center", marginTop: "28px" }}
                >
                  <CheckBox
                    active={this.state.checkbox}
                    onClick={() => {
                      this.checkboxHandler();
                    }}
                  >
                    <div active={this.state.checkbox}>
                      <img src={pass3} active={this.state.checkbox} />
                    </div>
                  </CheckBox>
                  <PaymentInfoText16>동의합니다</PaymentInfoText16>
                </InlineFlexDiv>
              </PaymentInfoWrap>
            </PaymentInfo3>

            <PaymentBtn onClick={this.payButtonClick}>
              <PaymenBtnText24>결제하기</PaymenBtnText24>
            </PaymentBtn>
          </PaymentPageRight>
        </PaymentPageDiv>
        {/* <TestC></TestC> */}
      </Background>
    );
  }
}

export default PaymentPageContainer;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #00000080;
`;
const PaymentPageDiv = styled(Containerv1)`
  justify-content: space-between;
`;

const InlineFlexDiv = styled.div`
  display: inline-flex;
`;

const PaymentPageLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 588px;
`;

const PaymentPageRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 588px;
  // height: 934px;
  margin-top: 202px;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  align-items: center;
`;

// left
const LeftHeader = styled(Title.FontSize26)`
  margin-top: 154px;
  margin-left: 4px;
  font-weight: bold;
  line-height: 1.54;
  letter-spacing: -0.65px;
  color: #414550;
`;

const OrderInfoBox = styled.div`
  display: flex;
  width: 100%;
  height: 95px;
  margin-top: 10px;
  margin-bottom: 24px;
  border-top: 3px solid black;
  border-bottom: 3px solid #c6c7cc;
  background-color: #f6f6f6;
`;

const OrderInfoTitle = styled(Title.FontSize24)`
  margin-left: 4px;
  margin-top: 49px;
  font-weight: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  color: #282c36;
`;

const FontSize20 = styled(Title.FontSize20)`
  font-weight: 500;
  line-height: 1.7;
  letter-spacing: -0.5px;
  color: #282c36;
`;

const FontSize16 = styled(Title.FontSize16)`
  margin-left: 6px;
  font-weight: 300;
  line-height: 2.13;
  letter-spacing: -0.4px;
  color: #999999;
`;

const PhoneNumDash = styled.div`
  width: 10px;
  height: 0;
  margin: 26px 18px 0 16px;
  border: solid 1px #282c36;
`;

const DeliveryAddressBox1 = styled.div`
  width: 463px;
  height: 44px;
  margin-top: 10px;
  border: none;
  background-color: #f6f6f6;
  font-size: 18px;
`;

const DeliveryAddressBox2 = styled.div`
  width: 588px;
  height: 44px;
  margin-top: 14px;
  margin-bottom: 14px;
  border: none;
  background-color: #f6f6f6;
  font-size: 18px;
`;

const SearchBtn = styled.button`
  width: 113px;
  margin-top: 10px;
  height: 44px;
  border-radius: 3px;
  border: solid 1px #c6c7cc;
  font-size: 18px;
  background-color: white;
`;

const PaymentWayBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  margin-top: 14px;
`;

const PaymentWay = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 188px;
  height: 118px;
  border-radius: 3px;
  // border: solid 2px #e1e2e4;
  border: ${(props) =>
    props.active ? "solid 2px #0933b3" : "solid 2px #e1e2e4"};
`;

const PaymentWayTitle = styled(Title.FontSize18)`
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  color: #414550;
`;

const PaymentCheckImg = styled.img`
  padding-bottom: 5px;
  display: ${(props) => (props.active ? "block" : "none")};
`;

// right
const PaymentInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  // margin-left: 38px;
  width: 512px;
`;

const PaymentInfoTitle = styled(Title.FontSize24)`
  font-weight: 500;
  line-height: 1.67;
  letter-spacing: -0.6px;
  color: #282c36;
`;

const PaymentInfo1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 512px;
  heigth: 134px;
  margin-top: 26px;
  border-top: solid 1px #c6c7cc;
  border-bottom: solid 1px #c6c7cc;
`;

const FontSize18 = styled(Title.FontSize18)`
  font-weight: bold;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: #282c36;
`;

const PaymentInfo2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 512px;
  heigth: 181px;
  margin-bottom: 26px;
  border-bottom: solid 1px #c6c7cc;
`;

const PaymentInfoText24 = styled(Title.FontSize24)`
  font-weight: 500;
  line-height: 1.42;
  letter-spacing: -0.6px;
  color: #0933b3;
`;

const PaymentInfo3 = styled.div`
  display: flex;
  width: 588px !important;
  align-items: center !important;
  flex-direction: column;
  height: 297px;
  background-color: #f6f6f6;
`;

const PaymentInfoText16 = styled(Title.FontSize16)`
  font-weight: 500;
  line-height: 2.13;
  letter-spacing: -0.4px;
  color: #282c36;
`;

const PaymentBtn = styled.button`
  width: 512px;
  height: 61px;
  margin: 38px;
  border-radius: 5px;
  background-color: #0933b3;
`;

const PaymenBtnText24 = styled(Title.FontSize24)`
  width: 100%;
  font-weight: bold;
  line-height: 2.17;
  letter-spacing: -0.6px;
  color: #ffffff;
  text-align: center;
`;

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  > div{
    width: 19px;
    height: 19px;
    background-color: ${(props) => (props.active ? "#0933b3" : "#ffffff")};
    margin-right: 10px;    
    position: relative;
    cursor: pointer;
    border: 1px solid #c6c7cc;
    border-radius: 2px;
    box-sizing: border-box;
    > img{
      display: ${(props) => (props.active ? "static" : "none")};
      position: absolute;
      top: 17%;
      left: 15%;        
    }
  }
}
`;
