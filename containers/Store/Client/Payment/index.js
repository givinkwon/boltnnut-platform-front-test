import React from "react";
import styled from "styled-components";

import Container from "components/Container";

import MyCoinConatiner from "./MyCoin";
import CoinConatiner from "./Coin";
import PaymentConatiner from "./Payment";
import TabContainer from "./Tab";
import NormalContainer from "./Normal";
import PrimeContainer from "./Prime";
import BusinessContainer from "./Business";

class PartnerPaymentConatiner extends React.Component {
  state = {
    tab: 2,
  }
  setTab = (val) => {
    this.setState({tab: val})
  }
  render() {
    const { tab } = this.state
    return (
      <CustomContainer>
        <MyCoinConatiner />
        <TabContainer tab={tab} setTab={this.setTab} />
            {tab == 1 && <NormalContainer/>}
            {tab == 2 && <PrimeContainer/>}
            {tab == 3 && <BusinessContainer/>}
        {/*<CoinConatiner />*/}
        {/*<PaymentConatiner />*/}
      </CustomContainer>
    );
  }
}

export default PartnerPaymentConatiner;

const CustomContainer = styled(Container)`
  padding: 40px 0px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 15px 20px !important;
  }
`;
