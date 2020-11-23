import React from 'react';
import App from 'next/app';
// import { Head } from 'next/document'
import { Provider } from 'mobx-react';
import { createGlobalStyle } from 'styled-components';
import stores from 'stores';

import ScrollToTop from '../components/ScrollToTop';
import CheckBrowserModal from '../containers/Home/CheckBrowserModal';

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
`;

class MyApp extends App {
  state = {
    ie_user: false,
    modal_shown: false,
    prepare: true,
  }

  closeModal = () => {
    this.setState({
      ...this.state,
      ie_user: false,
      modal_shown: true,
      prepare: false,
    });
  }

  componentDidMount() {
    const { Home } = this.props;
    const userAgent = window.navigator.userAgent;
    console.log(userAgent);

    if(userAgent.indexOf('MSIE ') !== -1 || userAgent.indexOf('.NET') !== -1
      || userAgent.indexOf('Edge') !== -1)
        {
            this.setState({
                ...this.state,
                ie_user: true
            })

        }

    if(window.location.pathname !== '/')
        {
            this.setState({
                ...this.state,
                prepare: false
            })
        }

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
  render() {
    const { Component, pageProps, Home } = this.props;
    return (
      <ScrollToTop>
        <GlobalStyle />
        {/*임시 오픈용 모달*/}
        {/*
            {!this.state.ie_user && <PrepareModal
                                    open= {this.state.prepare}
                                    handleClose={this.closeModal}/>}

        */}
        {/*브라우저 체크 모달*/}
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
