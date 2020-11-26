import React from "react";
import Router from "next/router";
import { inject, observer } from "mobx-react";

import BannerContainer from "./Banner";
import TabContainer from "./Tab";

import PartnerInfoContainer from "./Partner/Info";
import PartnerPaymentContainer from "./Partner/Payment";
import ClientInfoContainer from "./Client/Info";
import ClientPaymentContainer from "./Client/Payment";

@inject("Auth")
@observer
class StoreConatiner extends React.Component {
  state = {
    tab: 2,
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
  async componentDidMount() {
    const { query } = this.props;
    // this.props.Auth.logged_in_user && this.props.Auth.logged_in_user.type
    await this.props.Auth.checkLogin();
    try {
      this.setState({
        type: this.props.Auth.logged_in_user.type,
      });
    } catch {
      this.setState({
        type: 0,
      });
    }
    if (query.tab) {
      this.setState({ tab: parseInt(query.tab) });
    }
  }
  render() {
    const { type, tab } = this.state;
    return (
      <>
        <ClientPaymentContainer />

        {/*<BannerContainer tab={tab} />
        <TabContainer tab={tab} setTab={this.setTab} />
        {type === 1 ? (
          <>
            {tab === 1 && <PartnerInfoContainer />}
            {tab === 2 && <PartnerPaymentContainer />}
          </>
        ) : (
          <>
            {tab === 1 && <ClientInfoContainer />}
            {tab === 2 && <ClientPaymentContainer />}
          </>
        )}
        */}
      </>
    );
  }
}

export default StoreConatiner;
