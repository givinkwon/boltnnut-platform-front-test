import React from "react";
import { inject, observer } from "mobx-react";
import SignupContainer from "./Signup";

@inject("Auth")
@observer
class SignupConatiner extends React.Component {
  // componentDidMount = () => {
  //   const { Auth } = this.props;
  //   if (Auth.type !== "expert") {
  //     Auth.setType("client");
  //   }
  // };
  render() {
    // const { Auth } = this.props;
    return (
      <>
        <SignupContainer />
      </>
    );
  }
}

export default SignupConatiner;
