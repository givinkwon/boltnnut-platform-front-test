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
      // <div style={{ paddingTop: 90 }}>
      //   {Auth.type !== "detailexpert" && <BannerConatiner />}

      //   {/* {Auth.step === 0 && <Step1Conatiner/>} */}
      //   {/* {Auth.step === 1 && <Step2Conatiner/>} */}

      //   <Step2Conatiner />
      // </div>
    );
  }
}

export default SignupConatiner;
