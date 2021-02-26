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
import UseScrollCount from "containers/Home/UseScrollCount";

import { inject, observer } from "mobx-react";

//Image
const background = "static/images/Home/Mobile/MobileBanner0/background.png";
const layer = "static/images/Home/Mobile/MobileBanner9/MobileBanner9_bg2.png";

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


@inject('Proposal','Partner')
@observer
class MobileBanner0Container extends React.Component {

  componentDidMount() {
    const {Proposal,Partner} = this.props;
    Proposal.loadProjects();
    Partner.loadPartnerCount();
  }

  render () {
    const ProjectCount = this.props.Proposal.projects_count;
    const PartnerCount = this.props.Partner.partner_count;

    return (
    <Background class="Image" src={background} style={{paddingBottom: 74, paddingTop: 54, marginTop: 54, justifyContent: 'center'}}>
        <BackgroundImage>
          <img src={layer}/>
        </BackgroundImage>
        <Fade bottom>
            <Header color={WHITE} fontWeight={"bold"}>
              내 제조 의뢰 견적과<br/>
              전문 제조사를 바로 만나보세요.
            </Header>
            <div>
              <Title1 fontWeight={300} color={'#ffffff'}>
                  총 프로젝트 금액
              </Title1>
              <Content1 color={'#ffffff'}>
                <CountFunc index={0}/> <span>원</span>
              </Content1>

              <div style={{marginTop: 25}} />
              <Title1 fontWeight={300} color={'#ffffff'}>
                  의뢰 프로젝트
              </Title1>
              <Content1 color={'#ffffff'}>
                <CountFunc index={1} projCount={ProjectCount}/> <span>건</span>
              </Content1>

              <div style={{marginTop: 25}} />
              <Title1 fontWeight={300} color={'#ffffff'}>
                  개발 전문업체
              </Title1>
              <Content1 color={'#ffffff'}>
                <CountFunc index={2}/> <span>개</span>
              </Content1>
            </div>
            <Buttonv1 style={{marginTop: 59, marginLeft:'auto', marginRight:'auto', fontWeight: 700}} onClick={() => Router.push("/request")}>
              <p style={{paddingBottom:0.2}}>지금 무료 가견적 받기</p>
            </Buttonv1>
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
`
const Title1 = styled(Content.FontSize16)`
  text-align: center;
  letter-spacing: -0.4px;
  object-fit: contain;
  font-weight:normal;
  height: 20px;
  font-size: 17px !important;
`
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
  >span {
    font-weight: 400;
  }
`
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
`
