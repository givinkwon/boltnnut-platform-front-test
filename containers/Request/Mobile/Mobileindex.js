import React from 'react'
import styled from "styled-components";
import Containerv1 from "components/Containerv1";

// RequestCard
import Background from 'components/Background';

//counter
import 'react-count-animation/dist/count.min.css';
import { inject, observer } from "mobx-react";

import MobileStep1Container from "./MobileStep1";
import MobileRequestCardContainer from "./MobileRequestCard";

@inject("DetailQuestion", "Request")
@observer
class MobileRequestContainer extends React.Component {
  render() {
    const { Request } = this.props;
    return (
      <div style={{ overflow: 'hidden' }}>
        <Background>
          <Containerv1>
            <MobileStep1Container page={Request.step1_index} />
            {/* { Request.step_index == 1 && <MobileStep1Container page={Request.step1_index} />} */}
            {/* { Request.step_index == 2 && <Step2Container />}
            { Request.step_index == 3 && <Step3Container />}
            { Request.step_index == 4 && <Step4Container />} */}
          </Containerv1>
        </Background>
      </div>
    );
  }
};
export default MobileRequestContainer;
