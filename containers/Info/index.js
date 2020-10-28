import React from "react";
import Head from "next/head";

import BannerContainer from "./Banner";
import TabContainer from "./Tab";

import ManufacturerContainer from "./Manufacturer";
import MassproductContainer from "./Massproduct";
import EstimateContainer from "./Estimate";

import PartnerContainer from "./Partner";
import ExpertContainer from "./Expert";
class AnswerConatiner extends React.Component {
  state = {
    tab: 1,
  };
  // tab값 전달받아야돼
  setTab = (val) => {
    this.setState({ tab: val });
    console.log(val)
  };
  componentDidUpdate(prevProps, prevState) {
    const { query } = this.props;
    if (prevProps.query != query) {
      this.setState({ tab: parseInt(query.tab) });
    }
  }
  componentDidMount() {
    const { query } = this.props;
    if (query.tab) {
      this.setState({ tab: parseInt(query.tab) });
    }
  }
  render() {
    const { tab } = this.state;

    return (
      <>
        <BannerContainer tab={tab} />
        <TabContainer tab={tab} setTab={this.setTab} />
        {tab === 1 && <ManufacturerContainer/>}
        {tab === 2 && <MassproductContainer/>}        
        {tab === 3 && <EstimateContainer/>}

      </>
    );
  }
}

export default AnswerConatiner;
