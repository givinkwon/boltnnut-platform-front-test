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
import { toJS } from "mobx";
import { inject, observer } from "mobx-react";

//Image
const background = "static/images/Home/Mobile/MobileBanner0/background.png";
const layer = "static/images/Home/Mobile/MobileBanner9/MobileBanner9_bg2.png";
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
class MobileBanner0Container extends React.Component {
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
        class="Image"
        src={background}
        style={{
          paddingBottom: 74,
          paddingTop: 54,
          marginTop: 54,
          justifyContent: "center",
        }}
      >
        <BackgroundImage>
          <img src={layer} />
        </BackgroundImage>
        <Fade bottom>
          <Header color={WHITE} fontWeight={"bold"}>
            <span>대한민국 제조사 정보 여기 다 있다.</span>
            <span>전문 업체 수배 플랫폼 볼트앤너트</span>
          </Header>
          <div>
            <Explanation>
              <Font16>남동공단부터 창원까지</Font16>
              <Font16>선별된 5000여 개 제조사 정보를</Font16>
              <Font16>지금 바로 확인하세요.</Font16>
              <Font16>생산 분야 | 포트폴리오 | 계약 후기</Font16>
            </Explanation>
          </div>
          {Auth.logged_in_user && Auth.logged_in_user.type === 1 ? (
            <></>
          ) : (
            <>
              <Buttonv1
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  fontWeight: 700,
                  width: "202px",
                  height: "49px",
                }}
                onClick={() => Router.push("/manufacturer")}
              >
                <p style={{ paddingBottom: 0.2, fontSize: "16px" }}>
                  민감 정보는 비공개로 작성 후 선택 공개하세요
                </p>
              </Buttonv1>
              <div
                style={{
                  color: "#767676",
                  lineHeight: 1.5,
                  fontWeight: 500,
                  fontSize: 14,
                  opacity: 0.8,
                  marginTop: 6,
                }}
              >
                <img
                  src={lock}
                  style={{
                    marginRight: 8,
                    width: 10,
                    height: 11,
                    opacity: 0.5,
                  }}
                ></img>
                모든 업로드는 안전하고 기밀입니다.
              </div>
            </>
          )}
        </Fade>
      </Background>
    );
  }
}

export default MobileBanner0Container;

const Header = styled(Title.FontSize23)`
  text-align: center;
  margin-bottom: 24px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 24px;
`;
const Title1 = styled(Content.FontSize16)`
  text-align: center;
  letter-spacing: -0.4px;
  object-fit: contain;
  font-weight: normal;
  height: 20px;
  font-size: 17px !important;
`;
const Content1 = styled(Content.FontSize17)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: center;
  margin-top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 25px;
  }
  > span {
    font-weight: 400;
  }
`;
const BackgroundImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
  > img {
    width: 100%;
    height: 100%;
    opacity: 0.65;
  }
`;
const Explanation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 29px 0 50px 0;
`;

const Font16 = styled(Content.FontSize16)`
  font-weight: normal;
  text-align: center;
  margin-bottom: 10px;
  color: #ffffff;
`;
