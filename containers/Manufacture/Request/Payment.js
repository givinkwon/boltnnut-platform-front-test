import * as Title from "../../../components/Title";
import Select from "../../../components/Select";
import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
// import PaymentContainer from '../Store/Client/Payment/Payment';

const boxquestion = "/static/images/request/Step1/boxquestion.svg";
const square = "/static/images/request/Step1/square.svg";
const customStyles = {
  dropdownIndicator: () => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menuList: (provided, state) => ({
    ...provided,
    maxHeight: "100%",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: "10px 14px",
    fontSize: 18,
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: "-0.45px",
  }),
  control: () => ({
    fontSize: 18,
    fontWeight: 500,
    fontStretch: "normal",
    fontStyle: "normal",
    letterSpacing: "-0.45px",
    color: "#282c36",
    width: 108,
    height: 29,
    border: "solid 1px #c6c7cc",
    display: "flex",
    borderRadius: 3,
    padding: 4,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};
const getNumber = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
  { label: "6", value: 6 },
  { label: "7", value: 7 },
  { label: "8", value: 8 },
  { label: "9", value: 9 },
  { label: "직접 입력", value: 0 },
];
@inject("Request", "Proposal", "Payment", "ManufactureProcess")
@observer
class PaymentBox extends Component {
  state = {
    display: false,
  };
  ModalOnOff = () => {
    if (this.state.display == true) {
      this.setState({ ...this.state, display: false });
      console.log(this.state.display);
    } else {
      this.setState({ ...this.state, display: true });
    }
  };
  PayFunction() {
    const { Payment, Request, ManufactureProcess, Proposal } = this.props;
    const estimateData = Proposal.estimateData;
    Payment.setProductPrice(
      Math.round(ManufactureProcess.MinPrice / 100) *
        100 *
        Request.numCount.value
    );
    Payment.setProjectName(estimateData.projectTitle);
    Payment.setCountNumber(Request.numCount);
    Payment.setPhoneNumber(
      Request.input_phone.replace("-", "").replace("-", "")
    );
    Payment.clientOrder("html5_inicis");
  }
  inputHandler = () => {
    const { Request } = this.props;
    if (Request.numCount) {
      if ((Request.numCount.label = "직접 입력")) {
        console.log(true);
        return true;
      } else {
        console.log(false);
        return false;
      }
    }
    return false;
  };
  render() {
    const { Proposal, Request, ManufactureProcess, Payment } = this.props;
    const estimateData = Proposal.estimateData;
    console.log(Payment);
    console.log(estimateData);

    return (
      <div style={{ margin: "100px 0px 0px 48px" }}>
        <ProjectName>{estimateData.projectTitle}</ProjectName>
        <div
          style={{
            borderBottom: "1px solid #282c36",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: 798,
            height: 70,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <CalText style={{ marginRight: 15 }}>수량</CalText>
            <input
              style={{ display: "none" }}
              value={Request.numCount ? Request.numCount.value : ""}
              className="Input"
            />
            {Request.numCount && Request.numCount.label == "직접 입력" && (
              <DirectInputBox>
                <input
                  onChange={(event) =>
                    Request.setNumCount(event.currentTarget.value)
                  }
                />
              </DirectInputBox>
            )}
            {(Request.numCount == null ||
              Request.numCount.label != "직접 입력") && (
              <Select
                styles={customStyles}
                options={getNumber}
                value={Request.numCount}
                getOptionLabel={(option) => option.label}
                placeholder="수량"
                onChange={Request.setNumCount}
              />
            )}
          </div>
          <CalText>
            {Request.numCount
              ? (
                  Math.round(ManufactureProcess.MinPrice / 100) *
                  100 *
                  Request.numCount.value
                ).toLocaleString("ko-KR")
              : 0}
            원
          </CalText>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            width: 798,
            height: 60,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <MoneyText style={{ marginRight: 10 }}>총 상품 금액</MoneyText>
            <div style={{ position: "relative" }} onClick={this.ModalOnOff}>
              <img
                style={{ position: "absolute", left: 7, top: 2 }}
                src={boxquestion}
              />
              <img src={square} />
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MoneyText style={{ marginRight: 20 }}>
              총 수량 {Request.numCount ? Request.numCount.value : 0}개
            </MoneyText>
            <Allmoney>
              {Request.numCount
                ? (
                    Math.round(ManufactureProcess.MinPrice / 100) *
                    100 *
                    Request.numCount.value
                  ).toLocaleString("ko-KR")
                : 0}
              원
            </Allmoney>
          </div>
          <ModalQuestion OnOff={this.state.display}>
            총 상품금액에 <span>배송비는 포함되어 있지 않습니다.</span>
            <br />
            결제시 배송비가 추가될 수 있습니다.
          </ModalQuestion>
        </div>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <PayButton
            onClick={() => {
              this.PayFunction();
            }}
          >
            결제하기
          </PayButton>
        </div>
      </div>
    );
  }
}
export default PaymentBox;

const ProjectName = styled.p`
  font-family: NotoSansCJKkr;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
  margin-bottom: 40px;
`;
const CalText = styled.span`
  font-family: NotoSansCJKkr;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  color: #282c36;
  margin-top: 5px;
`;
const MoneyText = styled.span`
  font-family: NotoSansCJKkr;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.18px;
  color: #999999;
`;
const Allmoney = styled.span`
  color: #0933b3;
  font-family: Roboto;
  font-size: 25px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
`;
const PayButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 50px;
  border-radius: 30px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: #0933b3;
  margin-top: 66px;
  margin-bottom: 60px;
  font-family: NotoSansCJKkr;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  color: white;
  cursor: pointer;
`;
const ModalQuestion = styled.div`
  display: ${(props) => (props.OnOff ? "block" : "none")};
  position: absolute;
  top: 50px;
  left: 100px;
  width: 274px;
  height: 40px;
  padding: 12px;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
  font-family: NotoSansCJKkr;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.14px;
  line-height: 1.43;
  color: #999999;
  > span {
    color: #111111;
  }
`;
const DirectInputBox = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  color: #282c36;
  width: 108px;
  height: 29px;
  border: solid 1px #c6c7cc;
  border-radius: 3px;
  padding: 4px;
  display: flex;
  > input {
    width: 100%;
    padding: 4px;
    outline: none;
    border: none;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
  }
`;
