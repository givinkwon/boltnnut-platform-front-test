import React from "react";
import Head from "next/head";

import LoginContainer from "./Login";
import FormConatiner from "./Form";

class LoginConatiner extends React.Component {
  render() {
    return (
      <>
        <LoginContainer />
        {/* <FormConatiner /> */}
      </>
    );
  }
}

export default LoginConatiner;
