import React from "react";
import { inject, observer } from "mobx-react";

import BannerContainer from "../Banner";
import InfoContainer from "./Info";
import Step0Container from "./Step0";
import Step1Container from "./Step1";
import Step2Container from "./Step2";
import Step3Container from "./Step3";
import Step4Container from "./Step4";
import CompleteContainer from "./Complete";
import CompleteBannerConatiner from "./CompleteBanner";

@inject("Request")
@observer
class AnswerConatiner extends React.Component {
  componentDidMount() {
    const {Request} = this.props
  }

  render() {
    const { Request, project_id } = this.props;

    return (
      <div style={{ backgroundColor: "#f2f2f2", paddingBottom: 80 }}>

        {
          Request.tab === 4
            ? <CompleteBannerConatiner />
            : <BannerContainer />
        }
        {Request.tab === 0 && <Step0Container />}
        {Request.tab === 1 && <Step1Container />}
        {Request.tab === 2 && <Step2Container project_id={project_id} />}
        {Request.tab === 3 && <Step3Container project_id={project_id} />}
        {Request.tab === 4 && <Step4Container project_id={project_id} />}
        {/*Request.tab === 4 && <CompleteContainer />*/}

        {
          Request.tab !== 4
            && <InfoContainer />
        }
      </div>
    );
  }
}

export default AnswerConatiner;
