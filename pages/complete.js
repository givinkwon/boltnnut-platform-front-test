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
class Complete extends React.Component {
  render() {
    return (
      <div>
        <Nav />
        <CompleteBannerContainer/>
        <Footer />
      </div>
    );
  }
};

export default withRouter(Complete);

