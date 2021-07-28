import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Nav from "../components/Nav";
import Footer from "components/Footer";
import Spinner from "components/Spinner";

import FAQConatiner from "containers/Common/FAQ";
import MobileNav from "../components/MobileNav";

const back_ic = "/static/images/components/MobileNav/back.png";

@inject("Post", "Loading") // *_app.js <Provider>에 넘겨준 store명과 일치해야함. *inject: 컴포넌트에서 store에 접근 가능하게 함. 해당 store에 있는 값을 컴포넌트의 props로 주입시켜줌.
@observer
class FAQ extends React.Component {
  state = {
    width: null,
  };
  static getInitialProps({ query }) {
    return { query };
  }
  componentDidMount() {
    this.props.Post.getData();
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const { width } = this.state;
    const { query } = this.props;
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        {width > 767.98 ? (
          <Nav />
        ) : (
          <MobileNav src={back_ic} headText={"자주 찾는 질문"} />
        )}
        <FAQConatiner query={query} />
        <Footer />
      </div>
    );
  }
}

export default FAQ;
