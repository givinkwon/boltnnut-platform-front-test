import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { withRouter } from "next/router";
import Router from "next/router";
import Background from "components/Background";
import Container from "components/Containerv1";

import ProposalCard from "containers/Manufacture/Producer/ProposalCard";

const userImg = "/static/images/producer/user.svg";

@inject("Partner", "Auth", "Project", "Common", "Request", "Producer")
@observer
class SubBoxContainer extends React.Component {
  componentDidMount = async () => {
    const { Partner, Auth, partnerId, Project } = this.props;

    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    await Partner.existBookmarkPartner(clientId, partnerId);
    await Partner.getBookmarkByClient(clientId);
  };
  render() {
    const { Auth, partnerId, Project, Partner, Producer } = this.props;
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
        <Background
          style={{ backgroundColor: "#f6f6f6", paddingBottom: 277 }}
          id="MyBackground"
        >
          <Header>
            <HeaderTitle>
              <div style={{ marginBottom: 12 }}>> 관심 제조사</div>
            </HeaderTitle>
          </Header>
          <Container>
            <Body>
              <Aside>
                {/* <AsideHeader>{Auth.logged_in_user.username}</AsideHeader> */}
                <AsideBody>
                  <div>
                    프로젝트를 진행하면 최소 3개월 이상 시간이 소요됩니다. 다른
                    프로젝트를 진행하기전에 제조사에게 프로젝트를 의뢰해보세요.{" "}
                  </div>
                </AsideBody>
              </Aside>
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
                              await Project.getPage(Auth.logged_in_client.id);
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
                            handleIntersection={Producer.handleIntersection}
                            customer="partner"
                          />
                        </div>
                      </Background>
                    );
                  })}
              </Main>
            </Body>
          </Container>
        </Background>
      </>
    );
  }
}

export default SubBoxContainer;

const Header = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 116px;
`;

const HeaderTitle = styled.div`
  height: 100%;
  padding-left: 118px;
  display: flex;
  align-items: flex-end;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.4px;
  text-align: left;
  color: #555963;
}
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: NotoSansCJKkr;
`;

const Aside = styled.div`
  width: 230px;
`;

const AsideHeader = styled.div`
  padding-top: 50px;
  padding-bottom: 16px;
  border-bottom: solid 1px #e1e2e4;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: #0933b3;
`;

const AsideBody = styled.div`
  padding-top: 16px;
  font-size: 14px;
  line-height: 1.73;
  letter-spacing: -0.38px;
  text-align: left;
  color: #767676;
`;

const Main = styled.div`
  width: 100%;
  padding-left: 72px;
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
