import React from "react";
import Head from "next/head";
import Router from "next/router";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import Footer from "components/Footer";
import Spinner from "components/Spinner";

import HomeConatiner from "containers/Home";


@inject("Home", "Loading", "Auth")
@observer
class Home extends React.Component {
  state = {
    width: null,
  }
  async componentDidMount() {
    this.props.Loading.setOpen(true);
    this.props.Home.init();
    //창 크기
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
    setTimeout(() => {
      this.props.Loading.setOpen(false);
    }, 1000);

    await this.props.Auth.checkLogin();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const { Loading,Home } = this.props;
    const { width } = this.state;
    return (
      <>
      <Head>
        <title>볼트앤너트</title>
      </Head>
      {width &&
      <div>
        {Loading.is_open}
        {/* {Loading.is_open && <Spinner/>} */}

        <>
        { width > 767.98 ? (
          <Nav />
          ) : (
          <MobileNav width={width}/>
          )
        }
        </>
        <HomeConatiner width={width} reqList={Home.request_list}/>
        <Footer />
      </div>
      }
      </>
    );
  }
}

export default Home;
