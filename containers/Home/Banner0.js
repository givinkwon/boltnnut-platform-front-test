import React from "react";
import styled from "styled-components";
import Router from "next/router";

//Components
import Button from "components/Button";
import * as Text from "components/Text";
import { WHITE } from "static/style";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Content from "components/Content";
import * as Title from "components/Title";
import Buttonv1 from "components/Buttonv1";
import Fade from 'react-reveal/Fade';
import UseScrollCount from "./UseScrollCount"

import { inject, observer } from "mobx-react";

//Image
const background = "static/images/Home/main.jpg";

const CountFunc = ({index,projCount=0,partnerCount=0}) => 
{
    const countItem = {
      0: UseScrollCount(5667400000,5000000000,0,0,900000),
      1: UseScrollCount(projCount,0,0,0,5),
      2: UseScrollCount(4933,0,0,0,10)
    };
   
    return (
        <p {...countItem[index]} style={{display:'inline'}}/>
    );
};


@inject('Proposal','Partner','Auth')
@observer
class Banner0Container extends React.Component {

  componentDidMount() {
    const {Proposal,Partner} = this.props;
    Proposal.loadProjects();
    Partner.loadPartnerCount();
  }

  render () {
    const ProjectCount = this.props.Proposal.projects_count;
    const PartnerCount = this.props.Partner.partner_count;
    const { Auth } = this.props;
    return (
      <Background src={background}>
        <Layer />
        <Containerv1
          style={{
            paddingBottom: 132,
            paddingTop: 224,
            justifyContent: "space-between",
          }}
        >
          <Fade bottom>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Title.FontSize56
                color={WHITE}
                shadow={"0 3px 6px rgba(0,0,0,0.61);"}
                fontWeight={"bold"}
                style={{ lineHeight: 1.49, fontSize: "52px" }}
              >
                제조업체를 온라인에서 바로 만나다
              </Title.FontSize56>
              <Explanation>
                <Font24>"저희 사무실 근처에 이런 제품 만드는 공장은 없나요?"</Font24>
                <Font24>국내 5000개 이상의 제조업체 네트워크를 통해</Font24>
                <Font24 style={{ marginBottom: 0 }}>제조 업체수배를 온라인에서 쉽고 편하게 진행하세요.</Font24>
              </Explanation>

              {Auth.logged_in_user && Auth.logged_in_user.type === 1 ? (
               <>
               </>
              ) : (
                <>
                <Buttonv1 onClick={() => Router.push("/request")}>
                  전문 업체 바로 찾기
                </Buttonv1>
  
                <div
                  style={{
                    color: "#ffffff",
                    lineHeight: 1.5,
                    fontSize: 18,
                    opacity: 0.8,
                    marginTop: 6,
                  }}
                >
                  {/* <img src={lock} style={{ marginRight: 8 }}></img>
                  모든 업로드는 안전하고 기밀입니다. */}
                </div>
                </>
              )
            }
            </div>
            {/* <Info>
              <InfoCell>
                <Content.FontSize24
                  fontWeight={"normal"}
                  style={{ textAlign: "center", marginBottom: 10 }}
                  color={"#ffffff"}
                >
                  총 프로젝트 금액
                </Content.FontSize24>
                <Content.FontSize32
                  eng={true}
                  fontWeight={"bold"}
                  color={"#ffffff"}
                > */}
            {/* 2,000,000,000 */}
            {/* <CountFunc index={0} />원
                </Content.FontSize32>
              </InfoCell>
              <InfoCell style={{ margin: "0px 41px" }}>
                <Content.FontSize24
                  fontWeight={"normal"}
                  style={{ textAlign: "center", marginBottom: 10 }}
                  color={"#ffffff"}
                >
                  의뢰 프로젝트
                </Content.FontSize24>
                <Content.FontSize32
                  eng={true}
                  style={{ textAlign: "center", marginLeft: 30 }}
                  fontWeight={"bold"}
                  color={"#ffffff"}
                > */}
            {/* 300+ */}
            {/* <CountFunc index={1} projCount={ProjectCount}/><span style={{fontWeight:500}}>개</span> */}
            {/* <CountFunc index={1} projCount={this.state.projectCount} />
                  <span style={{ fontWeight: 500 }}>개</span>
                </Content.FontSize32>
              </InfoCell>
              <InfoCell>
                <Content.FontSize24
                  fontWeight={"normal"}
                  style={{ textAlign: "center", marginBottom: 10 }}
                  color={"#ffffff"}
                >
                  파트너사
                </Content.FontSize24>
                <Content.FontSize32
                  eng={true}
                  style={{ textAlign: "center", marginLeft: 30 }}
                  fontWeight={"bold"}
                  color={"#ffffff"}
                >
                  <CountFunc index={2} partnerCount={PartnerCount} />
                  <span style={{ fontWeight: 500 }}>개</span>
                </Content.FontSize32>
              </InfoCell>
            </Info> */}
          </Fade>
        </Containerv1>
      </Background>
    );
  }
  }

export default Banner0Container;

const Info = styled.div`
 display: table;
 padding-top: 116px;
 div:nth-of-type(1) {
  padding-right: 23.5px;
 }
 div:nth-of-type(2) {
   width: 204px;
   border : 2px;
   border-left: solid white 1px;
   border-right: solid white 1px;
 }
 div:nth-of-type(3) {
  padding-left: 37.5px;
 }
`
const Layer=styled.div`
    background-color: rgba(0, 0, 0, 0.67);
    width: 100%;
    height: 100%;
    display: inline-flex;
    justify-content: center;
`
const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 29px 0 50px 0;
`;
const Font24 = styled(Content.FontSize24)`
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67 !important;
  letter-spacing: -0.6px !important;
  text-align: center;
  margin: 35px auto 55px auto;
`;

const InfoCell = styled.div`
 display: table-cell;
 text-align: center;
 height: 91px;
 font-size: 24px;
 font-weight: normal;
 font-stretch: normal;
 font-style: normal;
 line-height: 1.67;
 letter-spacing: -0.6px;
 `