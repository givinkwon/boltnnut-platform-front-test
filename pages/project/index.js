import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Router from "next/router";

import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import Footer from "components/Footer";
import Spinner from "components/Spinner";

import { toJS } from "mobx";
import * as AccountAPI from "axios/Account/Account";

import ProjectContainer from "containers/Manufacture/Project/index";

const back_ic = "/static/images/components/MobileNav/back_ic.svg";

@inject("Project", "Auth", "Home", "Answer", "Loading") // *_app.js <Provider>에 넘겨준 store명과 일치해야함. *inject: 컴포넌트에서 store에 접근 가능하게 함. 해당 store에 있는 값을 컴포넌트의 props로 주입시켜줌.
@observer
class Project extends React.Component {
  state = {
    width: null,
  };

  async componentDidMount() {
    const { Project, Auth, Home, Answer, Loading } = this.props;
    Auth.previous_url = "project";
    console.log(Auth);
    console.log(toJS(Auth.logged_in_user));
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    Home.init();
    Auth.bgColor = "#ffffff";
    Loading.setOpen(true);
    setTimeout(() => Loading.setOpen(false), 500);

    // 중복
    await Auth.checkLogin();
    // page ip 기록
    const formData = new FormData();

    formData.append("url", window.location.href);
    console.log(window.location.href);
    const req = {
      data: formData,
    };

    AccountAPI.setUserPageIP(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    console.log(toJS(Auth));
    if (Auth.logged_in_user) {
      if (Auth.logged_in_partner) {
        await Project.getProjectByPrice();
        console.log("프로젝트 목록 로딩 끝");
      }
      if (Auth.logged_in_client) {
        console.log("프로젝트 목록 로딩 시작");
        console.log(Auth.logged_in_client);
        Project.getPage(Auth.logged_in_client.id, () => {
          console.log("프로젝트 목록 로딩 끝");
        });
      }
    } else {
      alert("로그인이 필요합니다");
      Router.push("/login");
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const { Project, Loading, Auth } = this.props;
    const { width } = this.state;
    const gray = "#f6f6f6";
    return (
      <div>
        {Loading.is_open}
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <>
          {width > 767.98 ? (
            <Nav />
          ) : (
            <div>
              <MobileNav
                src={back_ic}
                headText={"프로젝트 관리"}
                width={width}
              />
              <div style={{ height: "54px" }}></div>
            </div>
          )}
        </>
        <ProjectContainer width={width} length={Project.project_length} />
        <Footer color={gray} />
      </div>
    );
  }
}

export default Project;
