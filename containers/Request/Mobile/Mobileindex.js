import React from 'react'
import styled from "styled-components";
import Containerv1 from "components/Containerv1";

// RequestCard
import Background from 'components/Background';

//counter
import 'react-count-animation/dist/count.min.css';
import { inject, observer } from "mobx-react";

import MobileStep1Container from "./MobileStep1";
import MobileStep2Container from "./MobileStep2";
import MobileStep4Container from "./MobileStep4";

import MobileRequestCardContainer from "./MobileRequestCard";

@inject("DetailQuestion", "Request")
@observer
class MobileRequestContainer extends React.Component {
  render() {
    const { Request } = this.props;
    return (
      <div>
        <Background>
          <Containerv1>
            {/* { Request.step_index == 1 && <MobileStep1Container page={Request.step1_index} />}
            { Request.step_index == 2 && <MobileStep2Container />}
            { Request.step_index == 3 && <MobileStep3Container />}
            { Request.step_index == 4 && <MobileStep4Container />} */}
            {/* <MobileStep4Container/> */}
          </Containerv1>
        </Background>
      </div>
    );
  }
};
export default MobileRequestContainer;
