import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { withRouter } from "next/router";
import Router from "next/router";
import Background from "components/Background";
import Container from "components/Containerv1";

import ProposalCard from "containers/Manufacture/Search/ProposalCard";

const userImg = "/static/images/search/user.svg";

@inject("Partner", "Auth", "Project", "Common", "Request", "Search")
@observer
class SubBoxContainer extends React.Component {
  componentDidMount = async () => {
    const { Partner, Auth, partnerId, Project } = this.props;

    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    await Partner.existBookmarkPartner(clientId, partnerId);
    await Partner.getBookmarkByClient(clientId);
  };
  render() {
    const { Auth, partnerId, Project, Partner, Search } = this.props;
    // console.log(this.props.Auth.logged_in_client.id);
    // console.log(toJS(`clientId: ${this.props.Auth.logged_in_client.id}`));
    console.log(toJS(Auth));

    let notLoginUser = false;
    if (!Auth.logged_in_client && !Auth.logged_in_partner) {
      notLoginUser = true;
    }

    const userEmail =
      Auth.logged_in_client && Auth.logged_in_client.user.username;
    const clientId =
      this.props.Auth.logged_in_client && this.props.Auth.logged_in_client.id;
    console.log(toJS(`partnerId: ${partnerId}`));
    console.log(Project.project_count);
    return (
      <>
        <Main>
          <MainHeader>
            <div>관심 제조사</div>
          </MainHeader>
          {Partner.partner_list &&
            Partner.partner_list.map((item, idx) => {
              console.log(item);
              return (
                <Background
                  style={{
                    marginTop: 24,
                    backgroundColor: "#f6f6f6",
                  }}
                >
                  <div
                    onClick={async () => {
                      console.log(Auth);
                      if (Auth.logged_in_client) {
                        await Project.getProject("myproject", Auth.logged_in_client.id);
                      }
                      Partner.pushToDetail(item, idx);
                    }}
                    style={{ width: "100%" }}
                  >
                    <ProposalCard
                      data={item.bookmark_partner}
                      width={this.props.width}
                      idx={idx}
                      categoryData={toJS(Partner.category_dic[idx])}
                      handleIntersection={Search.handleIntersection}
                      customer="partner"
                    />
                  </div>
                </Background>
              );
            })}
        </Main>
      </>
    );
  }
}

export default SubBoxContainer;

const Main = styled.div`
  width: 100%;
`;

const MainHeader = styled.div`
padding-top: 45px;
padding-bottom: 16px;
border-bottom: solid 1px #e1e2e4;
font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
  text-align: left;
  color: #1e2222;
}
`;
