import React from "react";

import LoginContainer from "./Login";
import MobileLoginContainer from "./Mobile/MobileLogin";

class LoginConatiner extends React.Component {
  render() {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>{this.props.width > 767.98 ? <LoginContainer /> : <MobileLoginContainer />}</div>
      </>
    );
  }
}

export default LoginConatiner;
