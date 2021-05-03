import React from "react";
import Head from "next/head";
import Router from "next/router";

import Nav from "components/Nav";
import Footer from "components/Footer";

import { inject, observer } from "mobx-react";

import ManufacturerContainer from "../../containers/Manufacturer/index";

@inject("Project")
@observer
class Index extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    return (
      <div>
        <Head>
          <title>볼트앤너트|제조사 찾기</title>
        </Head>
        <Nav />
        <ManufacturerContainer />
        <Footer />
      </div>
    );
  }
}

export default Index;
