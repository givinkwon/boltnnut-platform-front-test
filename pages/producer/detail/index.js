import React from "react";
import Head from "next/head";
import Router from "next/router";

import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import Footer from "components/Footer";

import { inject, observer } from "mobx-react";

import ManufacturerDetailContainer from "containers/Producer/ProducerDetail/index";
import * as AccountAPI from "axios/Account";

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

    /* 카카오 지도 API 불러오는 부분 */
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=1469e9509222cfd066d35737d4359063&autoload=false&​libraries=services";
    document.head.appendChild(script);

    console.log(Auth);
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    // page ip 기록
    const formData = new FormData();

    formData.append("url", window.location.href);
    console.log(window.location.href);
    const req = {
      data: formData,
    };

    await AccountAPI.setUserPageIP(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

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
      <div onContextMenu={(e) => e.preventDefault()}>
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
        <Footer />
      </div>
    );
  }
}

export default Index;
