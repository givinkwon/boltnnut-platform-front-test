import React from "react";
import { inject, observer } from "mobx-react";
import SignupSelectContainer from "./SignupSelect";
import SignupContentContainer from "./SignupContent";

@inject("Auth")
@observer
class SignupConatiner extends React.Component {
  componentDidMount = () => {
    const { Auth } = this.props;
    if (Auth.type !== "partner") {
      Auth.setType("client");
    }
  };
  render() {
    const { Auth } = this.props;
    return (
      <div style={{ paddingTop: 90 }}>
        {Auth.step === 0 && <SignupSelectContainer />}
        {Auth.step === 1 && <SignupContentContainer />}
      </div>
    );
  }
}

export default SignupConatiner;
