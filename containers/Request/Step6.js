import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import Buttonv1 from "components/Buttonv1";
import { inject, observer } from 'mobx-react';

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";
import ConsultantBoxContainer from './ConsultantBox'

const Consultant1 = "/static/images/request/Step3/Step3_Consultant1.png";
const Consultant2 = "/static/images/request/Step3/Step3_Consultant2.png";
const Consultant3 = "/static/images/request/Step3/Step3_Consultant3.png";

@inject('Request')
@observer
class Step6Container extends Component {

  static defaultProps = { title: '고객님의 제조 의뢰가 접수 되었습니다.' };

  buttonClick = () => {
    const { Request } = this.props;
    Request.step_index = 4;
  }

  ConsultantInfo=[
    {
      Img:Consultant1,
      Name:"최낙의",
      Job:"기술고문",
      Text1:"前 삼성그룹 사업기획팀장/상무",
      Text2:"(바이오/의료기기, 신재생에너지, ESCO/BOT 등)",
      Text3:"삼성전자 대표이사 업적공로상(2002), 사업전략/신사업기획 15년 경력"
    },
    {
      Img:Consultant2,
      Name:"안철옹",
      Job:"기술고문",
      Text1:"삼성전자 기구/메카트로닉스 설계 25년, 다영한 제품 설계 경험",
      Text2:"(음향기기, 광기기, 의료기기, 진단기 ,BA SPEAKER, 웨어러블로봇 등)",
      Text3:"6-시그마 Black belt(삼성전자공인 2003)\n과학기술부 신기술 인증상(2007)\nCE-Show innovation Award(2016)"
    },
    {
      Img:Consultant3,
      Name:"허성진",
      Job:"기술고문",
      Text1:"기구/금형 설계 경력 29년, 前 한솔 정밀 대표 ",
      Text2:"인도네시아 (주)K.O.T.I 사출 금형부 차장(2008)",
      Text3:"중국 (주) 아성정밀 금형 금형 개발부(2011)"
    },
  ]

    render() {
      return(
          <Card>
            <Header>
              {this.props.title}
            </Header>
            <ContentBox>
                <Font20>
                  의뢰주신 프로젝트는 전문 컨설턴트의 검토가 필요한 사항입니다. <br/>
                  볼트앤너트 전문 컨설턴트가 정밀 검토 후 최대 1 영업일 내로 상담 안내드립니다.
                </Font20>
                <ConsultantHeader>
                  해당 프로젝트의 볼트앤너트 전문 컨설턴트 이력서 확인하기
                </ConsultantHeader>
                
                {this.ConsultantInfo.map((Info) => (
                <ConsultantBoxContainer Info={Info}/> 
              ))}
              <Font16 style={{textAlign:'center',paddingTop:70}}>1:1 프로젝트 매니저를 배정받아 보다 정확하고 안전한 견적을 받아보세요.</Font16>

              <Buttonv1 onClick={ this.buttonClick } fontSize={20} style={{margin:'0 auto', marginTop: 30,marginBottom:60,width:255,height:49}}>
                무료 컨설팅 받기
              </Buttonv1>
            </ContentBox>
          </Card>
        )
    }
}

export default withRouter(Step6Container);

const PlaceBox=styled.div`
  padding-top:31px;
`

const DateBox=styled.div`
  padding-top:30px;
`

const ConsultantBox=styled.div`
`

const ImageBox=styled.div` 
  padding-top:10px;
  display:flex;
  justify-content:space-between;
  >img
  {
    height:216px;
    width:380px;
  }
`

const Card = styled.div`
  width: 894px;
  // height: 976px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 60px 0px 200px 280px;
  display: inline;
  float: right;
`
const Header = styled(Content.FontSize32)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.06;
  letter-spacing: -0.8px;
  text-align: left;
  color: #0a2165;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-top: 38px;
  padding-bottom:20px;
  border-bottom: solid 1px #c6c7cc;
  object-fit: contain;
`

const ConsultantHeader = styled(Content.FontSize24)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #414550;
  padding-top: 130px;
  padding-bottom:20px;
  border-bottom: solid 1px #c6c7cc;
  object-fit: contain;
`
const ContentBox = styled.div`
  // height: calc(46.3%);
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 2.2%;
  display: flex;
  flex-direction: column;
`

const Font20 = styled(Title.FontSize20)`
  // width:100%;
  text-align:left;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.5px;
  color: #282c36;
`

const Font16 = styled(Title.FontSize16)`
  // width:100%;
  text-align:left;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  color: #282c36;
`
