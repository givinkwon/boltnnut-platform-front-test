import React from "react";
import styled, { css } from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import InputComponent from "components/Input2";
import { inject, observer } from "mobx-react";
import AutoEstimate from "../../../stores/Manufacture/AutoEstimate";
import Router from "next/router";
import * as PaymentAPI from "axios/Common/Payment";
import Payment from "../../../stores/Common/Payment";

const img = "/static/images/request/PaymentPage/star.png";
const passimg = "/static/images/request/PaymentPage/pass.png";
const pass3 = "static/images/pass3.png";

@inject("Payment", "AutoEstimate")
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
        } else if (!this.state.checkbox) {
            return alert("구매진행 동의에 체크를 하셔야 결제가 진행됩니다.");
        }
        Payment.setPhoneNumber(cellphone.replace("-", "").replace("-", ""));
        Payment.payment_price = 10;
        Payment.setProjectName("MASDASCNASKLCNASKLCNL");
        Payment.setCountNumber(3);
        Payment.clientOrder("html5_inicis");
    };

    modalHandler = () => {
        console.log("modalHandler");
        // const { Payment } = this.props;
        // Payment.modalActive = !Payment.modalActive;
    };

    checkboxHandler = () => {
        if (this.state.checkbox === false) {
            this.setState({ checkbox: true });
            Payment.agree = true;
        } else {
            this.setState({ checkbox: false });
            Payment.agree = false;
        }
    };

    render() {
        const { Payment, AutoEstimate } = this.props;

        let activeHandler = (idx) => {
            if (Payment.PaymentMethod === idx) {
                return true;
            } else {
                return false;
            }
        };

        return (
            <Background>
                <PaymentPageDiv>
                    {/* {Payment.modalActive && (
            <Layer onClick={this.modalHandler}>{<Postcode />}</Layer>
          )} */}

                    <PaymentPageLeft>
                        <LeftHeader>발주 정보 입력</LeftHeader>
                        <OrderInfoBox>
                            <OrderInfoTitle>주문자 정보</OrderInfoTitle>
                        </OrderInfoBox>
                        <InlineFlexDiv>
                            <FontSize20>담당자명</FontSize20>
                            <FontSize16></FontSize16>
                            <img src={img} />
                        </InlineFlexDiv>
                        <div
                            style={{ marginTop: "10px", marginBottom: "26px" }}
                        >
                            <InputComponent
                                class="Input"
                                placeholder="옵션을 선택해주세요."
                                onChange={(e) => Payment.setName(e)}
                                value={Payment.Name}
                            />
                        </div>

                        <InlineFlexDiv>
                            <FontSize20>담당자 연락처</FontSize20>
                            <img src={img} />
                        </InlineFlexDiv>
                        <InlineFlexDiv
                            style={{ marginTop: "10px", marginBottom: "26px" }}
                        >
                            <InputComponent
                                placeholder={"010"}
                                value={Payment.PhoneNumber[0]}
                                width="90px"
                                onChange={(e) => Payment.setPhoneNumber(e, 0)}
                            />
                            <PhoneNumDash />
                            <InputComponent
                                value={Payment.PhoneNumber[1]}
                                placeholder={"1234"}
                                width="90px"
                                onChange={(e) => Payment.setPhoneNumber(e, 1)}
                            />
                            <PhoneNumDash />
                            <InputComponent
                                value={Payment.PhoneNumber[2]}
                                placeholder={"5678"}
                                width="90px"
                                onChange={(e) => Payment.setPhoneNumber(e, 2)}
                            />
                        </InlineFlexDiv>

                        <InlineFlexDiv>
                            <FontSize20>배송받을주소</FontSize20>
                            <img src={img} />
                        </InlineFlexDiv>
                        <div style={{ height: "10px;" }}></div>
                        <InputComponent
                            value={Payment.location}
                            placeholder={"정확한 주소를 입력해주세요."}
                            onChange={(e) => Payment.setLocation(e)}
                        />
                        <div style={{ height: "10px;" }}></div>

                        {/* <InlineFlexDiv>
              <FontSize20>결제방법</FontSize20>
              <img src={img} />
            </InlineFlexDiv>
            <PaymentWayBox>
              <PaymentWay
                onClick={() => Payment.setPaymentMethod(1)}
                active={activeHandler(1)}
              >
                <PaymentCheckImg src={passimg} active={activeHandler(1)} />
                <PaymentWayTitle>신용카드</PaymentWayTitle>
              </PaymentWay>
              <PaymentWay
                onClick={() => Payment.setPaymentMethod(2)}
                active={activeHandler(2)}
              >
                <PaymentCheckImg src={passimg} active={activeHandler(2)} />
                <PaymentWayTitle>실시간 계좌이체</PaymentWayTitle>
              </PaymentWay>
              <PaymentWay
                onClick={() => Payment.setPaymentMethod(3)}
                active={activeHandler(3)}
              >
                <PaymentCheckImg src={passimg} active={activeHandler(3)} />
                <PaymentWayTitle>후불결제</PaymentWayTitle>
              </PaymentWay>
            </PaymentWayBox> */}

                        <br />
                        <InlineFlexDiv>
                            <FontSize20>결제방법</FontSize20>
                            <img src={img} />
                        </InlineFlexDiv>
                        <PaymentWayBox>
                            <PaymentWay
                                onClick={() => AutoEstimate.save_Paylist()}
                            >
                                <PaymentCheckImg />
                                <PaymentWayTitle>후불결제</PaymentWayTitle>
                            </PaymentWay>
                        </PaymentWayBox>
                    </PaymentPageLeft>

                    <PaymentPageRight>
                        <PaymentInfoWrap>
                            <div style={{ marginTop: "35px" }}>
                                <PaymentInfoTitle>발주정보</PaymentInfoTitle>
                            </div>

                            <PaymentInfo1>
                                <InlineFlexDiv
                                    style={{
                                        justifyContent: "space-between",
                                        marginTop: "30px",
                                        marginTop: "20px",
                                    }}
                                >
                                    <FontSize18
                                        style={{ marginBottom: "20px" }}
                                    >
                                        생산 소요 시간
                                    </FontSize18>
                                    <FontSize18
                                        style={{
                                            color: "#414550",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {AutoEstimate.totalPeriod} 영업일
                                        {/* 9 영업일 */}
                                    </FontSize18>
                                </InlineFlexDiv>

                                <InlineFlexDiv
                                    style={{
                                        justifyContent: "space-between",
                                        marginBottom: "30px",
                                    }}
                                >
                                    <FontSize18>도착 예정일</FontSize18>
                                    <FontSize18
                                        style={{
                                            color: "#414550",
                                            fontWeight: "500",
                                        }}
                                    >
                                        <span style={{ color: "#0933B3" }}>
                                            검수 완료 후
                                        </span>{" "}
                                        2 영업일 이내
                                    </FontSize18>
                                </InlineFlexDiv>
                            </PaymentInfo1>

                            <PaymentInfo2>
                                <InlineFlexDiv
                                    style={{
                                        justifyContent: "space-between",
                                        marginTop: "30px",
                                    }}
                                >
                                    <FontSize18
                                        style={{
                                            color: "#767676",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        부품 개수
                                    </FontSize18>
                                    <FontSize18
                                        style={{
                                            color: "#414550",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {AutoEstimate.total_quantity} 개
                                    </FontSize18>
                                </InlineFlexDiv>
                                <InlineFlexDiv
                                    style={{ justifyContent: "space-between" }}
                                >
                                    <FontSize18
                                        style={{
                                            color: "#767676",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        부품 가격
                                    </FontSize18>
                                    <FontSize18
                                        style={{
                                            color: "#414550",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {(
                                            Math.round(
                                                AutoEstimate.totalPrice / 1000
                                            ) * 1000
                                        ).toLocaleString("ko-KR")}{" "}
                                        원
                                    </FontSize18>
                                </InlineFlexDiv>
                                <InlineFlexDiv
                                    style={{
                                        justifyContent: "space-between",
                                        marginBottom: "30px",
                                    }}
                                >
                                    <FontSize18 style={{ color: "#767676" }}>
                                        배송비
                                    </FontSize18>
                                    <FontSize18
                                        style={{
                                            color: "#414550",
                                            fontWeight: "500",
                                            display: "flex",
                                        }}
                                    >
                                        <EventBox>EVENT</EventBox>
                                        <div
                                            style={{
                                                textDecoration: "line-through",
                                                marginRight: "10px",
                                                color: "#C2C2C2",
                                            }}
                                        >
                                            5000 원
                                        </div>
                                        <div>0 원</div>
                                    </FontSize18>
                                </InlineFlexDiv>
                                <InlineFlexDiv
                                    style={{
                                        justifyContent: "space-between",
                                        marginBottom: "30px",
                                    }}
                                >
                                    <FontSize18 style={{ color: "#767676" }}>
                                        * 일반 택배로 배달되지 않는 일부
                                        가공품은 용달 비용이 추가됩니다.
                                    </FontSize18>
                                </InlineFlexDiv>
                            </PaymentInfo2>

                            <InlineFlexDiv
                                style={{
                                    justifyContent: "space-between",
                                    marginBottom: "26px",
                                }}
                            >
                                <PaymentInfoText24>
                                    최종 결제가격 (VAT 포함)
                                </PaymentInfoText24>
                                <PaymentInfoText24 style={{ color: "#282c36" }}>
                                    {Math.round(
                                        AutoEstimate.totalPrice * 1.1
                                    ).toLocaleString("ko-KR")}{" "}
                                    원
                                </PaymentInfoText24>
                            </InlineFlexDiv>
                        </PaymentInfoWrap>

                        <PaymentInfo3>
                            <PaymentInfoWrap style={{ marginTop: "26px" }}>
                                <FontSize18
                                    style={{
                                        fontWeight: "500",
                                        color: "#282c36",
                                    }}
                                >
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
                                    주문할 상품의 상품, 상품가격, 배송정보를
                                    확인하였으며, 구매에 동의 하시겠습니까?
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
                                    주문제작상품의 경우, 교환/환불이 불가능
                                    하다는 내용을 확인하였으며 이에 동의합니다.
                                </FontSize18>
                                <InlineFlexDiv
                                    style={{
                                        justifyContent: "center",
                                        marginTop: "28px",
                                    }}
                                >
                                    <CheckBox
                                        active={this.state.checkbox}
                                        onClick={() => {
                                            this.checkboxHandler();
                                        }}
                                    >
                                        <div active={this.state.checkbox}>
                                            <img
                                                src={pass3}
                                                active={this.state.checkbox}
                                            />
                                        </div>
                                    </CheckBox>
                                    <PaymentInfoText16>
                                        동의합니다
                                    </PaymentInfoText16>
                                </InlineFlexDiv>
                            </PaymentInfoWrap>
                        </PaymentInfo3>

                        {/* <PaymentBtn onClick={() => Payment.clientOrder("html5_inicis", 10)}> */}
                        <PaymentBtn onClick={() => AutoEstimate.save_Paylist()}>
                            <PaymenBtnText24>발주 요청하기</PaymenBtnText24>
                        </PaymentBtn>
                    </PaymentPageRight>
                </PaymentPageDiv>
                <div style={{ marginBottom: 90 }} />
                {/* <TestC></TestC> */}
            </Background>
        );
    }
}

export default PaymentPageContainer;

const EventBox = styled.div`
    position: relative;
    top: 6px;
    margin-right: 14px;
    background: #0933b3;
    border-radius: 5px;
    display: center;
    align-items: center;
    font-size: 14px;
    text-align: center;
    width: 56px;
    height: 22px;
    padding-bottom: 4px;
    color: white;
`;

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
    @media (min-width: 0px) and (max-width: 767.98px) {
        display: block;
        width: 90%;
    }
`;

const InlineFlexDiv = styled.div`
    display: inline-flex;
    > P {
        @media (min-width: 0px) and (max-width: 767.98px) {
            font-size: 13px !important;
        }
    }
`;

const PaymentPageLeft = styled.div`
    display: flex;
    flex-direction: column;
    width: 588px;
    @media (min-width: 0px) and (max-width: 767.98px) {
        width: 100%;
    }
`;

const PaymentPageRight = styled.div`
    display: flex;
    flex-direction: column;
    width: 588px;
    background-color: white;
    // height: 934px;
    margin-top: 202px;
    border-radius: 5px;
    filter: drop-shadow(3px 3px 20px rgba(9, 51, 179, 0.1));
    align-items: center;
    @media (min-width: 0px) and (max-width: 767.98px) {
        width: 100%;
    }
`;

// left
const LeftHeader = styled(Title.FontSize26)`
    margin-top: 154px;
    margin-left: 4px;
    font-weight: 600;
    line-height: 2.4;
    letter-spacing: -0.65px;
    color: #414550;
`;

const OrderInfoBox = styled.div`
    display: flex;
    width: 100%;
    height: 95px;
    margin-top: 10px;
    margin-bottom: 24px;
    border-top: 2px solid black;
    border-bottom: 2px solid #c6c7cc;
    /* background-color: #f6f6f6; */
`;

const OrderInfoTitle = styled(Title.FontSize24)`
    font-weight: 500;
    margin: auto auto auto 4px;
    font-weight: normal;
    line-height: 1.67;
    letter-spacing: -0.6px;
    color: #282c36;
`;

const FontSize20 = styled(Title.FontSize20)`
    font-weight: 500;
    line-height: 1.7;
    letter-spacing: -0.5px;
    margin-bottom: 10px;
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
    display: flex;
    align-items: center;
    width: 463px;
    height: 44px;
    margin-top: 10px;
    padding-left: 16px;
    border: none;
    background-color: #f6f6f6;
    font-size: 18px;
    box-sizing: border-box;
`;

const DeliveryAddressBox2 = styled.div`
    display: flex;
    align-items: center;
    width: 588px;
    height: 44px;
    margin-top: 14px;
    margin-bottom: 14px;
    padding-left: 16px;
    border: none;
    background-color: #f6f6f6;
    font-size: 18px;
    box-sizing: border-box;
    @media (min-width: 0px) and (max-width: 767.98px) {
        width: 100%;
    }
    > P {
        @media (min-width: 0px) and (max-width: 767.98px) {
            width: 100%;
            font-size: 14px !important;
        }
    }
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
    border: solid 2px #0933b3;
    /* border: ${(props) =>
        props.active ? "solid 2px #0933b3" : "solid 2px #e1e2e4"}; */
`;

const PaymentWayTitle = styled(Title.FontSize18)`
    object-fit: contain;
    font-family: NotoSansCJKkr;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    color: #0933b3;
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
    @media (min-width: 0px) and (max-width: 767.98px) {
        width: 100%;
    }
    > p {
        @media (min-width: 0px) and (max-width: 767.98px) {
            margin-left: 5%;
            margin-right: 5%;
            width: 90%;
            font-size: 14px !important;
        }
    }
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
    margin-top: 26px;
    border-top: solid 1px #c6c7cc;
    border-bottom: solid 1px #c6c7cc;
    @media (min-width: 0px) and (max-width: 767.98px) {
        width: 100%;
    }
`;

const FontSize18 = styled(Title.FontSize18)`
    font-weight: 400;
    line-height: 1.89;
    letter-spacing: -0.45px;
    color: #282c36;
`;

const PaymentInfo2 = styled.div`
    display: flex;
    flex-direction: column;
    width: 512px;
    margin-bottom: 26px;
    border-bottom: solid 1px #c6c7cc;
    @media (min-width: 0px) and (max-width: 767.98px) {
        width: 100%;
    }
`;

const PaymentInfoText24 = styled(Title.FontSize24)`
    font-weight: 600;
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
    @media (min-width: 0px) and (max-width: 767.98px) {
        width: 100% !important;
    }
    > P {
        @media (min-width: 0px) and (max-width: 767.98px) {
            width: 100%;
            font-size: 14px !important;
        }
    }
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
    @media (min-width: 0px) and (max-width: 767.98px) {
        width: 100%;
    }
    > P {
        @media (min-width: 0px) and (max-width: 767.98px) {
            width: 100%;
            font-size: 18px !important;
        }
    }
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
    > div {
        width: 19px;
        height: 19px;
        background-color: ${(props) => (props.active ? "#0933b3" : "#ffffff")};
        margin-right: 10px;
        position: relative;
        cursor: pointer;
        border: 1px solid #c6c7cc;
        border-radius: 2px;
        box-sizing: border-box;
        > img {
            display: ${(props) => (props.active ? "static" : "none")};
            position: absolute;
            top: 17%;
            left: 15%;
        }
    }
`;
