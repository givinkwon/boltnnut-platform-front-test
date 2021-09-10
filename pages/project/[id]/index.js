import React from "react";
import Head from "next/head";
import Router from "next/router";

import Nav from "components/Nav";
import Footer from "components/Footer";

import { inject, observer } from "mobx-react";

import ProjectDetailContainer from "containers/Manufacture/Project/ProjectDetail/index";
import * as AccountAPI from "axios/Account/Account";

@inject("Project")
@observer
class Index extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  componentDidMount() {
    const { Project, query } = this.props;
    console.log(query);
    Project.getProjectDetail(query.id);
    // page ip 기록
    const formData = new FormData();

    formData.append("url", window.location.href);
    console.log(window.location.href)
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
          <title>볼트앤너트|프로젝트</title>
        </Head>
        <Nav />
        <ProjectDetailContainer />
        <Footer />
      </div>
    );
  }
}

export default Index;
