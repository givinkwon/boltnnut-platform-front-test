import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import Router from "next/router";
import Buttonv1 from "components/Buttonv1";
import { inject, observer } from "mobx-react";

const SearchPartner = "/static/images/bookmark/searchpartner.png"
const SearchProject = "/static/images/bookmark/searchproject.png"
@inject("Project", "Auth")
@observer
class NoContainer extends React.Component {
  render() {
    const { Project, Auth } = this.props;
    return (
      <>
      {/* 클라이언트일 때 */}
      {Auth.logged_in_client &&
      <Background style={{width:"894px", height:"362px"}}>
        <Containerv1 style={{display:"contents"}} >
          
          <NoneTitleBox>
            <img src={SearchPartner} style={{width : '220px', height : '220px'}}/>
          </NoneTitleBox>

          <Button onClick={() => {
            Router.push('/search')
            }
            }>
              관심 제조사 등록
          </Button>
          
          
        </Containerv1>
      </Background>
      }
      {/* 파트너일 때 */}
      {Auth.logged_in_partner &&
      <Background style={{width:"894px", height:"362px"}}>
        <Containerv1 style={{display:"contents"}} >
          
          <NoneTitleBox>
            <img src={SearchProject} style={{width : '220px', height : '220px'}}/>
          </NoneTitleBox>

          <Button onClick={() => {
            Router.push('/project')
            }
            }>
              프로젝트 살펴보기
          </Button>
          
          
        </Containerv1>
      </Background>
      }
      </>
    );
  }
}

export default NoContainer;

const Button = styled(Buttonv1)`
  width: 168px !important;
  height: 44px !important;
  font-size: 16px;
  font-family: NotoSansCJKkr !important;
  line-height: 1.5;
  letter-spacing: -0.4px;
  
  z-index: 2;
  :hover {
    background-color: #174aee;
  }
`;
const NoneTitleBox = styled.div`
  margin-top: 34px;
  margin-left: auto;
  margin-right: auto;
  // width: 346px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.4px !important;
  text-align: center;
  color: #282c36;
`
