import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React from "react";
import App from "next/app";
// import { Head } from 'next/document'

import { Provider } from "mobx-react";
import { createGlobalStyle } from "styled-components";
import IE from "components/IE";
import ScrollToTop from "components/ScrollToTop";
import stores from "stores";
import CheckBrowserModal from "../containers/Home/CheckBrowserModal";
import PrepareModal from "../containers/Home/PrepareModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import { configure } from "mobx";
// configure({
//   useProxies: "never",
// });

// CSS Reset Code
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    font-family: 'Noto Sans KR', sans-serif;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
    overflow-x: hidden;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  .slick-disabled {
    display: none;
  }
  @font-face {
    font-family: "Roboto-iOS";
    src: url("/public/fonts/Roboto-Black.ttf") format('truetype');
    font-weight: 500;
  }
`;

class MyApp extends App {
  // constructor(props) {
  //   super(props);
  //   console.log("A");
  // }

  state = {
    ie_user: false,
    modal_shown: false,
    prepare: true,
    location: "",
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      ie_user: false,
      modal_shown: true,
      prepare: false,
    });
  };
  componentDidMount() {
    console.log("RR");
    const { Home } = this.props;
    const userAgent = window.navigator.userAgent;

    // 네이버 애널리틱스
    this.setState({
      location: window.location,
    });
    if (!window.wcs_add) window.wcs_add = {};
    window.wcs_add["wa"] = "a888b15a2864e";
    if (window.wcs) {
      window.wcs_do();
    }
    console.log(userAgent.toLowerCase());

    if (
      userAgent.indexOf("MSIE ") !== -1 ||
      userAgent.indexOf(".NET") !== -1 ||
      userAgent.indexOf("Edge") !== -1
    ) {
      this.setState({
        ...this.state,
        ie_user: true,
      });
    }

    if (window.location.pathname !== "/") {
      this.setState({
        ...this.state,
        prepare: false,
      });
    }

    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
  // 네이버애널리틱스
  componentDidUpdate() {
    if (!window.wcs_add) window.wcs_add = {};
    window.wcs_add["wa"] = "a888b15a2864e";
    if (window.wcs) {
      window.wcs_do();
    }
  }
  render() {
    const { Component, pageProps, Home } = this.props;
    return (
      <ScrollToTop>
        {console.log(this.state.modal_shown)}
        <GlobalStyle />
        <CheckBrowserModal
          open={!this.state.modal_shown && this.state.ie_user}
          handleClose={this.closeModal}
        />
        <Provider {...stores}>
          <Component {...pageProps} />
        </Provider>
      </ScrollToTop>
    );
  }
}

export default MyApp;
