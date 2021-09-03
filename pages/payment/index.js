import React from "react";
import Head from "next/head";
import styled from "styled-components";
import Router from "next/router";
import * as AccountAPI from "axios/Account/Account";
import { inject, observer } from "mobx-react";

import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import Footer from "components/Footer";
// import PaymentContainer from "../../containers/Common/Payment/Payment";
import PaymentPageContainer from "../../containers/Common/Payment/PaymentPage";

const back_ic = "/static/images/components/MobileNav/back_ic.svg";

@inject("Project", "Auth", "Home", "Answer", "Loading")
@observer
class Payment extends React.Component {
  state = {
    width: null,
  };

  async componentDidMount() {
    const { Project, Auth, Loading } = this.props;
    Auth.previous_url = "payment";

    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    Auth.bgColor = "#ffffff";
    Loading.setOpen(true);
    setTimeout(() => Loading.setOpen(false), 500);

    // page ip 기록
    const formData = new FormData();

    formData.append("url", window.location.href);
    console.log(window.location.href);
    const req = {
      data: formData,
    };

    AccountAPI.setUserPageIP(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    await Project.getProject();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  render() {
    const { Loading } = this.props;
    const { width } = this.state;
    const gray = "#f6f6f6";
    return (
      <div>
        {Loading.is_open}
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <>
          {width > 767.98 ? (
            <Nav />
          ) : (
            <div>
              <MobileNav
                src={back_ic}
                headText={"프로젝트 관리"}
                width={width}
              />
              <div style={{ height: "54px" }}></div>
            </div>
          )}
        </>
        <PaymentPageContainer />
        <Footer color={gray} />
      </div>
    );
  }
}

export default Payment;
