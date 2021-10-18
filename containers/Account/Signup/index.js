import React from "react";
import { inject, observer } from "mobx-react";
import SignupSelectContainer from "./SignupSelect";
import SignupContentContainer from "./SignupContent";
import MobileSignupSelectContainer from "Mobile/SignupSelect";
import MobileSignupContentContainer from "Mobile/SignupContent";

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
    const { Auth, width } = this.props;
    console.log(width)
    return (
      <div style={{ paddingTop: 90 }}>
        {width > 768 &&
          <>
            {Auth.step === 0 && <SignupSelectContainer />}
            {Auth.step === 1 && <SignupContentContainer />}
          </>
        }

        {width < 768 && 
          <>
            {Auth.step === 0 && <MobileSignupSelectContainer />}
            {Auth.step === 1 && <MobileSignupContentContainer />}
          </>
        }

      </div>
    );
  }
}

export default SignupConatiner;
