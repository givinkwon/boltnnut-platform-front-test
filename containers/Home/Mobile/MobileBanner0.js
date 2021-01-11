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
const background = "static/images/Home/main.jpg";

const CountFunc = ({index,projCount=0,partnerCount=0}) => 
{
    const countItem = {
      0: UseScrollCount(1667400000,1000000000,0,0,900000),
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
    <Background src={background} style={{paddingBottom: 58, paddingTop: 48, justifyContent: 'center'}}>
        <Fade bottom>
            <Header color={WHITE} fontWeight={"500"}>
              내 제품 제작 비용과<br/>
              전문 제조사를 바로 만나보세요.
            </Header>
            <div>
              <Title1 fontWeight={300} color={'#ffffff'}>
                  총 프로젝트 금액
              </Title1>
              <Content1 color={'#ffffff'}>
                <CountFunc index={0}/>
              </Content1>

              <div style={{marginTop: 22}} />
              <Title1 fontWeight={300} color={'#ffffff'}>
                  의뢰 프로젝트
              </Title1>
              <Content1 color={'#ffffff'}>
                <CountFunc index={1}/>
              </Content1>
              
              <div style={{marginTop: 22}} />
              <Title1 fontWeight={300} color={'#ffffff'}>
                  개발 전문업체
              </Title1>
              <Content1 color={'#ffffff'}>
                <CountFunc index={2}/>
              </Content1>
            </div>
            <Buttonv1 style={{marginTop: 54, marginLeft:'auto', marginRight:'auto', fontWeight: 700}} onClick={() => Router.push("/request")}>
              지금 무료 가견적 받기
            </Buttonv1>
        </Fade>
    </Background>
    );
  }
  }

export default MobileBanner0Container;

const Header = styled(Title.FontSize23)`
  text-align: center;
  margin-bottom: 26px;
`
const Title1 = styled(Content.FontSize16)`
  text-align: center;
  line-height: 0.94;
  letter-spacing: -0.4px;
  object-fit: contain;
`
const Content1 = styled(Content.FontSize17)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
`
