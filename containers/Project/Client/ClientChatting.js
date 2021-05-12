import React from "react";
import styled, { css } from "styled-components";
import * as Content from "components/Content";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Partner from "../../../stores/Partner";
import Container from "components/Containerv1";
import Background from "components/Background";
import ChatItemContainer from "components/ChatItem";
import ChatTestContainer from "containers/Info2/ChatTest";

@inject("Project", "Auth",)
@observer
class ClientChatting extends React.Component{

state = {
  selectedRoom: null,
}

async componentDidMount() {
  const { Auth, Project, Partner } = this.props;
  const partnerdetail = this.state.PartnerDetail;
  await Auth.checkLogin();
  if (Auth.logged_in_partner) {
    // Partner.answer_set = Auth.logged_in_partner.answer_set;
    Partner.getPartnerDetail(Auth.logged_in_partner.id)
    Partner.answer_set = Partner.detail.answer_set
    console.log(toJS(Partner.detail))

    Partner.answer_set.map((data) => {
      this.getProject(data);
    });
  }


}


  render(){
    return(
<Background>
  <Container>
    {Project.chatModalActive && (
      // <Layer onClick={this.modalHandler}>
      <Layer>
        {/* <Postcode /> */}
        <ChatTestContainer
          roomName={this.state.selectedRoom}
        ></ChatTestContainer>
      </Layer>
    )}
    {this.state.partnerDetailList[idx] && (
      <ChatItemContainer
        logo={this.state.partnerDetailList[idx].logo}
        name={this.state.partnerDetailList[idx].name}
        id={data.id}
        content={"test"}
        modalHandler={this.modalHandler}
        user = {Auth}
      />
    )}




  </Container>
</Background>
    );
  }


}

export default ClientChatting;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #00000080;
`;
