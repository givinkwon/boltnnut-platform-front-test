import { observable, action } from "mobx";
import Router from "next/router";

import * as PaymentAPI from "axios/Common/Payment";
import AutoEstimate from "../Manufacture/AutoEstimate";

class Payment {

  // 주문자 이름 정하기
  @observable Name = ""

  @action setName = (e) => {
    this.Name = e;

  }

  // 휴대폰 번호 정하기
  @observable PhoneNumber = ["","",""]

  @action setPhoneNumber = (e, idx) => {
    this.PhoneNumber[idx] = e; 

  }

  // 배송 주소 정하기
  @observable Location = ""

  @action setLocation = (e) => {
    this.Location = e;
  }

  // 결제 방식 정하기
  @observable PaymentMethod = 0 // 0이면 미선택, 1이면 신용카드, 2이면 실시간 계좌이체, 3이면 후불 결제

  @action setPaymentMethod = (e) => {
    this.PaymentMethod = e;
  }

  // 최종 결제 가격
  @observable Payment_Price = 0

  @action setPaymentPrice = (val) => {
    this.Payment_Price = val;
  }

  // 결제창 호출하기 => 결제창 열릴 때 order 값을 DB에 저장한 후에 결제 시 그 값과 비교하여 신뢰성 체크
  @action clientOrder = (pg, payment_price) => {
    
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp58620816");
    
    /* 2. 결제 데이터 정의하기 */
    const token = localStorage.getItem("token");
    console.log(token);
    
    // 결제 가격 정하기
    this.setPaymentPrice(payment_price)

    const req = {
      data: {
        product_name: "볼트앤너트 가공/금형 발주",
        product_price: 10,
        count: 1,
        phone: this.PhoneNumber[0] + this.PhoneNumber[1] + this.PhoneNumber[2],
      },
    };

    console.log(req)
    PaymentAPI.order(req)
      .then((res) => {

        console.log(res);
        const data = {
          pg: pg, // PG사
          pay_method: "card", // 결제수단
          merchant_uid: res.data.data.paylist.merchant_uid, // 주문번호
          m_redirect_url: window.location.origin + "/payment", // 모바일 리다이렉트
          amount: res.data.data.paylist.product_price, // 가격
          name: `${this.product_name}`, // 주문명
          buyer_name: res.data.data.paylist.user.username.split("@")[0], // 구매자 이름
          buyer_tel: res.data.data.paylist.user.phone, // 구매자 전화번호
          buyer_email: res.data.data.paylist.user.username, // 구매자 이메일
          count: res.data.data.paylist.count,
          phone: res.data.data.paylist.phone,
        };

        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, this.clientPayment);
      })
      .catch((e) => {
        console.log(token);
        console.log(e);
        console.log(e.response);
      });
  };

  // 결제 완료
  @action clientPayment = async (res) => {
    console.log("clientPayment");
    const token = await localStorage.getItem("token");
    const req = {
      data: {
        phone: this.phone_number,
        merchant_uid: res.merchant_uid,
        date: formatDate(
          new Date(
            new Date().getTime() +
              AutoEstimate.totalPeriod * 24 * 60 * 60 * 1000
          )
        ), // 납기일
      },

    };
    console.log("req : ", req);
    PaymentAPI.pay(req)
      .then(async (res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
}

export default new Payment();

const formatDate = (d) => {
  const date = d;
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const min = date.getUTCMinutes();
  const second = date.getUTCSeconds();
  return `${year}-${`0${monthIndex}`.slice(-2)}-${`0${day}`.slice(
    -2
  )} ${`0${hours}`.slice(-2)}:${`0${min}`.slice(-2)}:${`0${second}`.slice(-2)}`;
};