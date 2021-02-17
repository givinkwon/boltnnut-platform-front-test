import React from "react";
import Head from "next/head";

import BannerContainer from "./Banner";
import TabContainer from "./Tab";

import GeneralContainer from './General';
import ClientContainer from "./Client";
import ExpertContainer from "./Expert";

class FAQConatiner extends React.Component {
  state = {
    tab: 1,
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
      <div>
        <TabContainer tab={tab} setTab={this.setTab} />
        {tab === 1 && <GeneralContainer />}
        {tab === 2 && <ClientContainer />}
      </div>
    );
  }
}

export default FAQConatiner;
