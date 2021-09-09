import React from "react";
import Head from "next/head";
import Router from "next/router";

import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import Footer from "components/Footer";

import { inject, observer } from "mobx-react";

import SearchContainer from "containers/Shop/index";
import * as AccountAPI from "axios/Account/Account";

const back_ic = "/static/images/components/MobileNav/back_ic.svg";

@inject("Project", "Auth", "Category", "Partner")
@observer
class Index extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  state = {
    width: null,
  };

  async componentDidMount() {
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    const { Auth } = this.props;
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    
    return (
      <div onContextMenu={(e) => e.preventDefault()}>
        <Head>
          <title>볼트앤너트|공장 직거래</title>
        </Head>

        <>
          {width &&
            (width > 767.98 ? (
              <Nav />
            ) : (
              <div>
                <MobileNav
                  src={back_ic}
                  headText={"공장직거래"}
                  width={width}
                />
                <div style={{ height: "65px" }}></div>
              </div>
            ))}
        </>

        <SearchContainer width={width} />
        <Footer />
      </div>
    );
  }
}

export default Index;
