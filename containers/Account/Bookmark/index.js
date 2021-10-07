import React from "react";
import styled from "styled-components";

import Background from "components/Background";
import Container from "components/Containerv1";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import SubBoxContainer from "containers/Account/Bookmark/SubBox";

@inject("Auth", "Partner", "Project")
@observer
class BookmarkContainer extends React.Component {
  // bookmark 데이터 가져오기
  async componentDidMount() {
    const { Partner, Auth, Project } = this.props;

    await Auth.checkLogin();
    const clientId =
      this.props.Auth.logged_in_client && this.props.Auth.logged_in_client.id;
    const userEmail =
      Auth.logged_in_client && Auth.logged_in_client.user && Auth.logged_in_client.user.username;
    console.log(clientId);
    Partner.BookmarkPartner(clientId);
  }

  render() {
    const { Project, Auth } = this.props;
    
    return (
      <>
        {/* 클라이언트일 때 */}
        {Auth.logged_in_client && <Background
          style={{ backgroundColor: "#f6f6f6", paddingBottom: 277 }}
          id="MyBackground"
        >
          <Header>
            <HeaderTitle>
              <div style={{ marginBottom: 12 }}>계정 설정 > 관심 제조사</div>
            </HeaderTitle>
          </Header>
          <Container>
            <Body>
              <Aside>
                <AsideHeader>{Auth.logged_in_user.username}</AsideHeader>
                
                <AsideBody>
                  <div>
                    프로젝트를 진행하면 최소 3개월 이상 시간이 소요됩니다. 다른
                    프로젝트를 진행하기전에 제조사에게 프로젝트를 의뢰해보세요.{" "}
                  </div>
                </AsideBody>
              </Aside>
              <SubBoxContainer width={this.props.width} />
            </Body>
          </Container>
        </Background>
        }

        {/* 파트너일 때 */}
        {Auth.logged_in_partner && <Background
          style={{ backgroundColor: "#f6f6f6", paddingBottom: 277 }}
          id="MyBackground"
        >
          <Header>
            <HeaderTitle>
              <div style={{ marginBottom: 12 }}>계정 설정 > 관심 프로젝트</div>
            </HeaderTitle>
          </Header>
          <Container>
            <Body>
              <Aside>
                <AsideHeader>{Auth.logged_in_user.username}</AsideHeader>
                
                <AsideBody>
                  <div>
                    관심 프로젝트를 설정하고, 내가 제안할 수 있는 의뢰들을 살펴보세요.
                  </div>
                </AsideBody>
              </Aside>
              <SubBoxContainer width={this.props.width} />
            </Body>
          </Container>
        </Background>
        }
      </>
    );
  }
}

export default BookmarkContainer;

const Header = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 116px;
`;

const HeaderTitle = styled.div`
  margin : 0px auto 0px auto;
  width: 1200px;
  height: 100%;
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
  margin-right: 72px;
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
