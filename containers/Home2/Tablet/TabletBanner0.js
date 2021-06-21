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
import Fade from "react-reveal/Fade";
import UseScrollCount from "containers/Home/UseScrollCount";

import { inject, observer } from "mobx-react";

//Image
const background = "static/images/Home/main.jpg";
const lock = "static/images/Home/lock.svg";

const CountFunc = ({ index, projCount = 0, partnerCount = 0 }) => {
  const countItem = {
    0: UseScrollCount(10787400000, 5000000000, 0, 0, 900000),
    1: UseScrollCount(projCount, 0, 0, 0, 5),
    2: UseScrollCount(4933, 0, 0, 0, 10),
  };

  return <p {...countItem[index]} style={{ display: "inline" }} />;
};

@inject("Proposal", "Partner", "Auth")
@observer
class TabletBanner0Container extends React.Component {
  componentDidMount() {
    const { Proposal, Partner } = this.props;
    Proposal.loadProjects();
    Partner.loadPartnerCount();
  }

  render() {
    const ProjectCount = this.props.Proposal.projects_count;
    const PartnerCount = this.props.Partner.partner_count;
    const { Auth } = this.props;

    return (
      <Background
        src={background}
        style={{ paddingBottom: 58, paddingTop: 48, justifyContent: "center" }}
      >
        <Fade bottom>
          <Header color={WHITE} fontWeight={"500"}>
            <span>대한민국 제조사 정보 여기 다 있다.</span>
            <span>전문 업체 수배 플랫폼 볼트앤너트</span>
          </Header>
          {/* <div>
            <Title1 fontWeight={300} color={"#ffffff"}>
              총 프로젝트 금액
            </Title1>
            <Content1 color={"#ffffff"}>
              <CountFunc index={0} />
            </Content1>

            <div style={{ marginTop: 22 }} />
            <Title1 fontWeight={300} color={"#ffffff"}>
              의뢰 프로젝트
            </Title1>
            <Content1 color={"#ffffff"}>
              <CountFunc index={1} projCount={ProjectCount} />
            </Content1>

            <div style={{ marginTop: 22 }} />
            <Title1 fontWeight={300} color={"#ffffff"}>
              개발 전문업체
            </Title1>
            <Content1 color={"#ffffff"}>
              <CountFunc index={2} />
            </Content1>
          </div> */}

          <Explanation>
            <Font20>남동공단부터 창원까지</Font20>
            <Font20>선별된 5000여 개 제조사 정보를</Font20>
            <Font20>지금 바로 확인하세요.</Font20>
            <Font20>생산 분야 | 포트폴리오 | 계약 후기</Font20>
          </Explanation>
          {Auth.logged_in_user && Auth.logged_in_user.type === 1 ? (
            <></>
          ) : (
            <>
              <Buttonv1
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontWeight: 700,
                }}
                onClick={() => Router.push("/manufacturer")}
              >
                전문 업체 찾아보기
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
                <img
                  src={lock}
                  style={{ marginRight: 8, width: "12px", height: "12px" }}
                ></img>
                <span style={{ fontSize: "13px", opacity: "0.8" }}>
                민감 정보는 비공개로 작성 후 선택 공개하세요
                </span>
              </div>
            </>
          )}
        </Fade>
      </Background>
    );
  }
}

export default TabletBanner0Container;

const Header = styled(Title.FontSize32)`
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 44px;
`;
const Title1 = styled(Title.FontSize24)`
  text-align: center;
  line-height: 0.94;
  letter-spacing: -0.4px;
  object-fit: contain;
`;
const Content1 = styled(Content.FontSize18)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
  padding-top: 5px;
`;

const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 41px 0;
`;
const Font20 = styled(Title.FontSize20)`
  font-weight: normal;
  text-align: center;
  margin-bottom: 14px;
  color: #ffffff;
`;
