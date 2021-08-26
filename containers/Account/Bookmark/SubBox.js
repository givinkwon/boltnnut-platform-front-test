import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import Background from "components/Background";


import ProjectCard from "containers/Manufacture/Project/AllProject/ProjectCard";
import NoContainer from "./NoContainer";

const userImg = "/static/images/search/user.svg";

@inject("Partner", "Auth", "Project", "Common", "Request", "Search")
@observer
class SubBoxContainer extends React.Component {
  componentDidMount = async () => {
    const { Partner, Auth, partnerId, Project } = this.props;

    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    await Partner.existBookmarkPartner(clientId, partnerId);
    
    // 클라이언트 로그인일 때
    if(Auth.logged_in_client) {
      await Partner.getBookmarkByClient(clientId);
    }

    // 파트너 로그인일 때
    if(Auth.logged_in_partner){
      await Project.getProject("myproject", "", partnerId)
    }
  };
  render() {
    const { Auth, partnerId, Project, Partner, Search } = this.props;
    console.log(Project.projectDataList)

    return (
      <>
        {/* 클라이언트일 때 */}
        {Auth.logged_in_client &&
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
                        await Project.getProject(
                          "myproject",
                          Auth.logged_in_client.id
                        );
                      }
                      Partner.pushToDetail(item.bookmark_partner, idx);
                    }}
                    style={{ width: "100%" }}
                  >
                    <PartnerCard
                      data={item.bookmark_partner}
                      width={this.props.width}
                      idx={idx}
                      categoryData={toJS(Partner.category_dic[idx])}
                      handleIntersection={Search.handleIntersection}
                      customer="partner"
                    />{" "}
                  </div>
                </Background>
              );
            })}

            {/* 파트너 리스트 없을 때 */}
            {Partner.partner_list.length == 0 && <NoPartner/>}
        </Main>
        }

        {/* 파트너일 때 */}
        {Auth.logged_in_partner &&
        <Main>
          <MainHeader>
            <div>관심 프로젝트</div>
          </MainHeader>
          {Project.projectDataList &&
            Project.projectDataList.map((item, idx) => {
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
                      Project.pushToDetail(item.id);
                    }}
                    style={{ width: "100%" }}
                  >
                    <ProjectCard
                      data={item}
                      handleIntersection={this.handleIntersection}
                      customer="partner"
                    />
                  </div>
                </Background>
              );
            })}

            {/* 파트너 리스트 없을 때 */}
            {Project.projectDataList.length == 0 && <NoContainer/>}
        </Main>
        }
      </>
    );
  }
}

export default SubBoxContainer;

const Main = styled.div`
  width: 100%;
`;

const MainHeader = styled.div`
width: 894px;
padding-top: 45px;
padding-bottom: 16px;
margin-bottom: 21px;
border-bottom: solid 1px #e1e2e4;
font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.5px;
  text-align: left;
  color: #1e2222;
}
`;
