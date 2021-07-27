import React from "react";
import Head from "next/head";
import { inject, observer } from "mobx-react";

import BannerConatiner from "./Banner";
import Step1Conatiner from "./Step1";
import Step2Conatiner from "./Step2";

@inject("Auth")
@observer
class SignupConatiner extends React.Component {
  componentDidMount = () => {
    const { Auth } = this.props;
    if (Auth.type !== "expert") {
      Auth.setType("client");
    }
  };
  render() {
    const { Auth } = this.props;
    return (
      <div style={{ paddingTop: 90 }}>
        {Auth.type !== "detailexpert" && <BannerConatiner />}

        {/* {Auth.step === 0 && <Step1Conatiner/>} */}
        {/* {Auth.step === 1 && <Step2Conatiner/>} */}

        <Step2Conatiner />
      </div>
    );
  }
}

export default SignupConatiner;
