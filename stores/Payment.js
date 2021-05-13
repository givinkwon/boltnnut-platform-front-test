import { observable, action } from "mobx";
import Router from "next/router";

import * as PaymentAPI from "axios/Payment";

class Payment {
  // constructor() {
  //   //makeObservable(this);
  // }
  @observable modalActive = false;
  @observable current_coin = 0;
  @observable project_name = "";
  @observable product_price = 0;
  @observable count_number = 0;
  @observable phone_number = "";
  @observable address = "";
  @observable zipCode = "";

  // @observable product = {id:1, coin: 50, price: 50000}
  @observable product = { id: 0, coin: 1, price: 1000 };
  @observable products = [
    { id: 0, coin: 1, price: 1000 },
    { id: 1, coin: 50, price: 50000 },
    { id: 2, coin: 100, price: 100000 },
    { id: 3, coin: 150, price: 150000 },
    { id: 4, coin: 500, price: 490000 },
    { id: 5, coin: 1000, price: 960000 },
    { id: 6, coin: 2000, price: 1790000 },
  ];
  @observable client_product = { id: 0, date: 7, price: 29880 };
  @observable client_products = [
    { id: 0, date: 7, price: 0 },
    { id: 1, date: 8, price: 19800 },
    { id: 2, date: 9, price: 198000 },
    {
      /* id: 3, date: 365, price: 598000 */
    },
  ];
  @observable is_payed = false;

  @action setProduct = (val) => {
    this.product = val;
  };
  @action setProductPrice = (val) => {
    this.product_price = val;
  };
  @action setProjectName = (val) => {
    this.project_name = val;
  };
  @action setCountNumber = (val) => {
    this.count_number = val;
  };
  @action setPhoneNumber = (val) => {
    this.phone_number = val;
  };

  @action order = (pg) => {
    this.is_payed = true;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp58620816");
    /* 2. 결제 데이터 정의하기 */
    const token = localStorage.getItem("token");
    console.log(token);
    const req = {
      data: {
        product_name: `볼트앤너트 ${this.product.coin} 코인`,
        product_price: this.product.price,
        coin: this.product.coin,
      },
      header: { Authorization: `Token ${token}` },
    };
    PaymentAPI.order(req)
      .then((res) => {
        console.log(res);
        const data = {
          pg: pg, // PG사
          pay_method: "card", // 결제수단
          merchant_uid: res.data.data.paylist.merchant_uid, // 주문번호
          m_redirect_url: window.location.origin + "/payment", // 모바일 리다이렉트
          amount: res.data.data.paylist.product_price, // 가격
          name: `볼트앤너트 ${res.data.data.paylist.coin} 코인`, // 주문명
          buyer_name: res.data.data.paylist.user.username.split("@")[0], // 구매자 이름
          buyer_tel: res.data.data.paylist.user.phone, // 구매자 전화번호
          buyer_email: res.data.data.paylist.user.username, // 구매자 이메일
        };
        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, this.payment);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action clientOrder = (pg) => {
    console.log("clientOrder");
    this.is_payed = true;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp58620816");
    /* 2. 결제 데이터 정의하기 */
    const token = localStorage.getItem("token");
    console.log(token);

    const req = {
      data: {
        product_name: `볼트앤너트 결제`,
        product_price: this.product_price,
        count: this.count_number.value,
        phone: this.phone_number,
      },
      header: { Authorization: `Token ${token}` },
    };
    console.log("req : ", req);

    PaymentAPI.order(req)
      .then((res) => {
        console.log(token);
        console.log(res);
        const data = {
          pg: pg, // PG사
          pay_method: "card", // 결제수단
          merchant_uid: res.data.data.paylist.merchant_uid, // 주문번호
          m_redirect_url: window.location.origin + "/payment", // 모바일 리다이렉트
          amount: res.data.data.paylist.product_price, // 가격
          name: `${this.project_name}`, // 주문명
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

  @action payment = async (res) => {
    const token = await localStorage.getItem("token");
    const req = {
      data: {
        merchant_uid: res.merchant_uid,
      },
      header: { Authorization: `Token ${token}` },
    };
    PaymentAPI.pay(req)
      .then(async (res) => {
        const token = await localStorage.getItem("token");
        const req = {
          header: { Authorization: `Token ${token}` },
          data: {
            coin: this.product.coin,
          },
        };
        console.log(req);
        await PaymentAPI.addCoin(req)
          .then((res) => {
            alert(
              `${this.product.coin}개의 코인이 충전되었습니다. 현재 코인은 ${
                this.current_coin + this.product.coin
              }개 입니다.`
            );
            Router.push("/");
          })
          .catch((e) => {
            console.log(e);
            console.log(e.response);
          });

        console.log(res.data.message);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

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
              this.client_product.date * 24 * 60 * 60 * 1000
          )
        ),
      },
      header: { Authorization: `Token ${token}` },
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
