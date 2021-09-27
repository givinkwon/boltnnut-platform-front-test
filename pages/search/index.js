import React from "react";
import Head from "next/head";
import Router from "next/router";

import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import Footer from "components/Footer";

import { inject, observer } from "mobx-react";

import SearchContainer from "containers/Manufacture/Search/index";
import * as AccountAPI from "axios/Account/Account";

const back_ic = "/static/images/components/MobileNav/back_ic.svg";

@inject("Project", "Auth", "Category", "Partner")
@observer
class Index extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  state = {
    width: null,
  };

  async componentDidMount() {
    const { Auth, Partner } = this.props;
    // category 리셋하여 메인페이지 연동되지 않게 + 파트너 가져오기
    Partner.init();
    await Partner.getPartner(1, "Home");
    // console.log("search didmount2");

    Auth.previous_url = "search";

    // console.log(Auth);
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    // page ip 기록
    const formData = new FormData();

    const { history } = this.props;
    console.log(history, history.length);
    console.log(document.referrer);

    // document.referrer은 next.js 페이지 내부에서의 이동이 안잡힘
    // 페이지 내에 이동이 있는 경우 => 신규가 아님
    if (history.length > 1) {
      formData.append("prevUrl", window.location.href + history[history.length - 2]);
    } else {
      document.referrer === "" ? formData.append("prevUrl", "direct") : formData.append("prevUrl", document.referrer);
    }

    formData.append("url", window.location.href);
    const req = {
      data: formData,
    };

    // 전체 이동 기록
    AccountAPI.setUserPageIP(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  }
  componentWillUnmount() {
    const { Auth } = this.props;
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const { Category, Partner } = this.props;

    return (
      <div onContextMenu={(e) => e.preventDefault()}>
        <Head>
          <title>볼트앤너트|제조사 찾기</title>
        </Head>

        <>
          {width &&
            (width > 767.98 ? (
              <Nav />
            ) : (
              <div>
                <MobileNav
                  src={back_ic}
                  // headText={"제조사 관리"}
                  width={width}
                />
                <div style={{ height: "65px" }}></div>
              </div>
            ))}
        </>

        <SearchContainer width={width} />
        <Footer />
      </div>
    );
  }
}

export default Index;
