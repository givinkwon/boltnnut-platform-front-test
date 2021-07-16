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
      </>
    );
  }
}

export default StoreConatiner;
