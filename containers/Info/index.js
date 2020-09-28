import React from "react";
import Head from "next/head";

import BannerContainer from "./Banner";
import TabContainer from "./Tab";

import PartnerContainer from "./Partner";
import ExpertContainer from "./Expert";
class AnswerConatiner extends React.Component {
  state = {
    tab: 0,
  };
  setTab = (val) => {
    this.setState({ tab: val });
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
        {tab === 1 && <PartnerContainer />}
        {tab === 2 && <ExpertContainer />}
      </>
    );
  }
}

export default AnswerConatiner;
