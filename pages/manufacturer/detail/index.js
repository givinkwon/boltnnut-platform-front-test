import React from "react";
import Head from "next/head";
import Router from "next/router";

import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import Footer from "components/Footer";

import { inject, observer } from "mobx-react";

import ManufacturerDetailContainer from "containers/Manufacturer/ManufacturerDetail/index";

const back_ic = "/static/images/components/MobileNav/back_ic.svg";

@inject("Project")
@observer
class Index extends React.Component {
  static getInitialProps({ query }) {
    return { query };
  }

  state = {
    width: null,
  };

  async componentDidMount() {
    const { Auth, Home, Answer, Loading } = this.props;

    console.log(Auth);
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    // Home.init();
    // Auth.bgColor = "#ffffff";
    // Loading.setOpen(true);
    // setTimeout(() => Loading.setOpen(false), 500);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    return (
      <div>
        <Head>
          <title>볼트앤너트|제조사 상세</title>
        </Head>

        <>
          {width &&
            (width > 767.98 ? (
              <Nav />
            ) : (
              <div>
                <MobileNav
                  src={back_ic}
                  headText={"제조사 상세보기"}
                  width={width}
                />
                <div style={{ height: "65px" }}></div>
              </div>
            ))}
        </>
        <ManufacturerDetailContainer width={width} />
        {/* <ManufacturerContainer width={width} /> */}
        <Footer />
      </div>
    );
  }
}

export default Index;
