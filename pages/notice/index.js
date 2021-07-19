import React from "react";
import Head from "next/head";

import Nav from "components/Nav";
import Footer from "components/Footer";

import NoticeConatiner from "containers/Common/Notice";
import { inject, observer } from "mobx-react";
import * as AccountAPI from "axios/Account";

@inject("Notice")
@observer
class Index extends React.Component {
  componentDidMount() {
    // this.props.Notice.init()
    // // page ip 기록
    // const formData = new FormData();
    // formData.append("url", window.location.href);
    // console.log(window.location.href)
    // const req = {
    //   data: formData,
    // };
    // AccountAPI.setUserPageIP(req)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     console.log(e.response);
    //   });
  }
  render() {
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <NoticeConatiner />
        <Footer />
      </div>
    );
  }
}

export default Index;
