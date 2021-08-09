import React from "react";
import Head from "next/head";

import Nav from "components/Nav";
import Footer from "components/Footer";

import RegisterDetailContainer from "containers/Account/PartnerRegister/RegisterDetail";
import { inject, observer } from "mobx-react";
import * as AccountAPI from "axios/Account/Account";

@inject("Notice")
@observer
class Index extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <RegisterDetailContainer />
        <Footer />
      </div>
    );
  }
}

export default Index;
