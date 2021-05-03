import React from "react";
import Head from "next/head";
import Router from "next/router";

import Nav from "components/Nav";
import Footer from "components/Footer";

import { inject, observer } from "mobx-react";

import ProjectDetailContainer from "../../../containers/Project/Client/ProjectDetail/ProjectDetail";

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
