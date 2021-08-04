import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import SubBoxContainer from "containers/Manufacture/Producer/ProducerDetail/SubBox";

@inject("Auth", "Partner", "Producer")
@observer
class BookmarkContainer extends React.Component {
  // bookmark 데이터 가져오기
  async componentDidMount() {
    const { Partner, Auth, Producer } = this.props;
    await Auth.checkLogin();
    const clientId =
      this.props.Auth.logged_in_client && this.props.Auth.logged_in_client.id;
    const userEmail =
      Auth.logged_in_client && Auth.logged_in_client.user.username;
    console.log(clientId);
    Partner.BookmarkPartner(clientId);
  }

  render() {
    const { Partner, Producer, Auth } = this.props;

    return (
      <>
        <SubBoxContainer />
      </>
    );
  }
}

export default BookmarkContainer;
