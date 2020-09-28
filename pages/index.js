import React from "react";
import Head from "next/head";
import Router from "next/router";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Nav from "components/Nav";
import Footer from "components/Footer";
import Spinner from "components/Spinner";

import HomeConatiner from "containers/Home";


@inject("Home", "Loading", "Auth")
@observer
class Home extends React.Component {
  async componentDidMount() {
    this.props.Loading.setOpen(true);
    this.props.Home.init();
    setTimeout(() => {
      this.props.Loading.setOpen(false);
    }, 1000);

    await this.props.Auth.checkLogin();
  }
  render() {
    const { Loading } = this.props;
    return (
      <div>
        {Loading.is_open && <Spinner />}
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <HomeConatiner />
        <Footer />
      </div>
    );
  }
}

export default Home;
