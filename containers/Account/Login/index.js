import React from "react";
import Head from "next/head";
import Form from "./Form";
import DefaultLoginContainer from "./DefaultLogin";

class LoginConatiner extends React.Component {
  render() {
    return (
      <>
        <DefaultLoginContainer />
        {/* <Form /> */}
      </>
    );
  }
}

export default LoginConatiner;
