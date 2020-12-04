import React from "react";
import Head from "next/head";
import { withRouter } from "next/router";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Router from 'next/router'

// components
import Nav from "components/Nav";
import Footer from "components/Footer";

import RequestDetailConatiner from "containers/Request/Detail";
import CompleteBannerContainer from "containers/Request/Detail/NewComplete";

@inject("Answer", "Auth")
class RequestDetail extends React.Component {
  async componentDidMount() {
    const {Answer, Auth} = this.props;

    await Auth.checkLogin();
    //if(!Auth.logged_in_user) {
    //  alert('로그인이 필요합니다');
    //  Router.push('/login');
    //  return;
    //}

    Answer.loadCategories();
  }

  render() {
    const { id } = this.props.router.query;
    return (
      <div>
        <Head>
          {/* <title>Tirrilee :: {item[0].title}</title>
          <meta property="og:url" content={`https://www.tirrilee.io/news/${item[0].id}`}/>
          <meta property="og:image" content={item[0].thumbnail}/>
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`[${item[0].type}] ${item[0].title}`} />
          <meta property="og:description" content={item[0].content} />
          <meta name="description" content={item[0].content} />
          <link rel="canonical" href={`https://www.tirrilee.io/portfolio/${item[0].id}`} /> */}
        </Head>
        <Nav />
        {/*<RequestDetailConatiner project_id={id} />*/}
        <CompleteBannerContainer/>
        <Footer />
      </div>
    );
  }
}

export default withRouter(RequestDetail);