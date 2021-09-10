import React from "react";
import Head from "next/head";

import Nav from "components/Nav";
import Footer from "components/Footer";

import PartnerRegisterContainer from "containers/Account/PartnerRegister";
import { inject, observer } from "mobx-react";
import * as AccountAPI from "axios/Account/Account";

@inject("Notice")
@observer
class Index extends React.Component {
  componentDidMount() {
    const { history } = this.props;
    console.log(history, history.length)
    console.log(document.referrer)

    // document.referrer은 next.js 페이지 내부에서의 이동이 안잡힘
    // 페이지 내에 이동이 있는 경우 => 신규가 아님
    if(history.length > 1){
      formData.append("prevUrl", window.location.href + history[history.length-2])
    }
    else {
      document.referrer === ""
        ? formData.append("prevUrl", "direct")
        : formData.append("prevUrl", document.referrer);
    }

    formData.append("url", window.location.href);
    const req = {
      data: formData,
    };

        // 방문자 트래픽 기록
        AccountAPI.setUserIP(req)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
      
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
  render() {
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <PartnerRegisterContainer />
        <Footer />
      </div>
    );
  }
}

export default Index;
