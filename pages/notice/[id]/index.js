import React from "react";
import Head from "next/head";
import Router from "next/router";

import Nav from "components/Nav";
import Footer from "components/Footer";

import NoticeDetailConatiner from "containers/Common/Notice/Detail";
import { inject, observer } from "mobx-react";

@inject("Notice")
@observer
class Index extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  componentDidMount() {
    const { Notice, query } = this.props;
    Notice.getNoticeDetail(query.id);
  }

  render() {
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <NoticeDetailConatiner />
        <Footer />
      </div>
    );
  }
}

export default Index;
