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
//
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
class Banner0Container extends React.Component {

  componentDidMount() {
    const {Proposal,Partner} = this.props;
    Proposal.loadProjects();
    Partner.loadPartnerCount();
  }

  render () {
    const ProjectCount = this.props.Proposal.projects_count;
    const PartnerCount = this.props.Partner.partner_count;

    return (
    <Background src={background}>
        <Layer />
        <Containerv1 style={{paddingBottom: 336, paddingTop: 279, justifyContent: 'space-between'}}>
          <Fade bottom>
            <div>
              <Title.FontSize56 color={WHITE} shadow={"0 3px 6px rgba(0,0,0,0.61);"} fontWeight={"bold"} style={{lineHeight: 1.49}}>
                내 제조 의뢰 견적과<br/>
                전문 제조사를<br/>
                바로 만나보세요.
              </Title.FontSize56>
              <Buttonv1 style={{marginTop: 71}} onClick={() => Router.push("/request")}>
                지금 무료 가견적 받기
              </Buttonv1>
            </div>
            <Info>
              <InfoCell>
                <Content.FontSize24 fontWeight={'normal'} style={{textAlign: 'center', marginBottom:10}} color={'#ffffff'}>
                  총 프로젝트 금액
                </Content.FontSize24>
                <Content.FontSize32 eng={true} fontWeight={"bold"} color={'#ffffff'}>
                  {/* 2,000,000,000 */}
                  <CountFunc index={0}/>원
                </Content.FontSize32>
              </InfoCell>
              <InfoCell style={{margin:'0px 41px'}}>
                <Content.FontSize24 fontWeight={'normal'} style={{textAlign: 'center', marginBottom:10}} color={'#ffffff'}>
                  의뢰 프로젝트
                </Content.FontSize24>
                <Content.FontSize32 eng={true} style={{textAlign: 'center', marginLeft:30}} fontWeight={"bold"} color={'#ffffff'}>
                  {/* 300+ */}
                  <CountFunc index={1} projCount={ProjectCount}/><span style={{fontWeight:500}}>개 +</span>
                </Content.FontSize32>
              </InfoCell>
              <InfoCell>
                <Content.FontSize24 fontWeight={'normal'} style={{textAlign: 'center', marginBottom:10}} color={'#ffffff'}>
                  파트너사
                </Content.FontSize24>
                <Content.FontSize32 eng={true} style={{textAlign: 'center', marginLeft:30}} fontWeight={"bold"} color={'#ffffff'}>
                  <CountFunc index={2} partnerCount={PartnerCount}/><span style={{fontWeight:500}}>개 +</span>
                </Content.FontSize32>
              </InfoCell>
            </Info>
          </Fade>
        </Containerv1>
    </Background>
    );
  }
  }

export default Banner0Container;

const Info = styled.div`
 display: table;
 padding-top: 140px;
  margin-left: 30pxa;
 div:nth-of-type(1) {
  padding-right: 23.5px;
 }
 div:nth-of-type(2) {
   width: 216px;
   border : 2px;
   border-left: solid white 1px;
   border-right: solid white 1px;
 }
 div:nth-of-type(3) {
   width: 204px;
  //padding-left: 37.5px;
 }
`

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
 const Layer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0,0,0,0.45);
 `
