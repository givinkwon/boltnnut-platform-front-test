import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import Buttonv1 from "components/Buttonv1";
import { inject, observer } from 'mobx-react';

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";
// import ConsultantBoxContainer from './ConsultantBox'
import MobileStepContainer from '../../../components/MobileStep';

const Consultant1 = "/static/images/request/Step3/Step3_Consultant1.png";
const Consultant2 = "/static/images/request/Step3/Step3_Consultant2.png";
const Consultant3 = "/static/images/request/Step3/Step3_Consultant3.png";
const DropdownArrow2 = "/static/images/request/Step3/Step3_Dropdown2.png";
const DropUpArrow2 = "/static/images/request/Step3/Step3_DropUp2.png";
@inject('Request')
@observer
class MobileStep6Container extends Component {

  static defaultProps = { title: '고객님의 제조 의뢰가 접수 되었습니다.' };

  state = {
    arrowChecked:null,
    showConsultantDetail: 'none',
  }
  buttonClick = () => {
    const { Request } = this.props;
    Request.step_index = 4;
  }

  arrowHandler=(idx)=>
  {
    const {arrowChecked} = this.state;
    if(idx==arrowChecked)
    {
      return DropUpArrow2;
    }
    else{
      return DropdownArrow2;
    }
  }

  activeHandler=(idx)=>
  {
    const {arrowChecked} = this.state;
    if(idx==arrowChecked)
    {
      return false;
    }
    else{
      return true;
    }
  }

  consultantDetailDown=(idx)=>
  {
    if(idx==this.state.arrowChecked)
    {
      this.setState({ arrowChecked:null ,showConsultantDetail: 'none'})
    }
    else{
      this.setState({ arrowChecked:idx,showConsultantDetail: true})
    }
    
  }

  arrowHandler=(idx)=>
  {
    const {arrowChecked} = this.state;
    if(idx==arrowChecked)
    {
      return DropUpArrow2;
    }
    else{
      return DropdownArrow2;
    }
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
        const { showConsultantDetail } = this.state;
      return(
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
            <TopHeader>
                <span>무료 견적서 받기</span>
                <MobileStepContainer/>
            </TopHeader>
            {/* <Card> */}
                <Header>
                {this.props.title}
                </Header>
                <ContentBox>
                    <Font14 style={{marginBottom:78,color:'#282c36'}}>
                    의뢰주신 프로젝트는 <br/>전문 컨설턴트의 검토가 필요한 사항입니다. <br/><br/>
                    볼트앤너트 전문 컨설턴트가 정밀 검토 후 최대 1 영업일 내로 상담 안내드립니다.
                    </Font14>
                    <ConsultantBox>
                        <ConsultantHeader>
                            해당 프로젝트의<br/>
                            볼트앤너트 전문 컨설턴트 이력서 확인하기
                        </ConsultantHeader>
                        <ConsultantImgBox>
                            {this.ConsultantInfo.map((Info,idx) => (
                                <div style={{display:'flex',flexDirection:'column'}}>
                                    <ConsultantImg active={this.activeHandler(idx)} onClick={()=>{this.consultantDetailDown(idx)}} src={Info.Img}/>
                                    <Font15 active={this.activeHandler(idx)}>{Info.Name}</Font15>
                                    <Font13 active={this.activeHandler(idx)} style={{textAlign:'center'}}>{Info.Job}</Font13>
                                    <img src={this.arrowHandler(idx)} onClick={()=>{this.consultantDetailDown(idx)}} style={{margin:'0 auto',marginTop:15}}/>
                                </div>
                        ))}
                        </ConsultantImgBox>
                        <DetailContainer style={{display: showConsultantDetail,paddingTop:38}}>
                            {this.state.arrowChecked!=null &&
                                <ConsultantTextBox>
                                    <Font16>{this.ConsultantInfo[this.state.arrowChecked].Text1}</Font16>
                                    <Font14>{this.ConsultantInfo[this.state.arrowChecked].Text2}</Font14>
                                    <Font15>{this.ConsultantInfo[this.state.arrowChecked].Text3}</Font15>
                                </ConsultantTextBox>
                            }
                        </DetailContainer>
                    </ConsultantBox>

                <Buttonv1 onClick={ this.buttonClick } fontSize={20} style={{margin:'0 auto', marginTop: 30,marginBottom:60,width:255,height:49}}>
                    무료 컨설팅 받기
                </Buttonv1>
                </ContentBox>
            {/* </Card> */}
          </div>
        )
    }
}

export default withRouter(MobileStep6Container);

const TopHeader = styled.div`
    font-family: Roboto;
    color: #0a2165;
    position: relative;
    width: auto;
    height: 46px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.13;
    letter-spacing: -0.4px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`
const DetailContainer = styled.div`
  // margin-left:63px;
  margin-top:-1px;
  // padding-bottom:100px;
  background-color:white;
  
`
const ConsultantImgBox = styled.div`
display:flex;
//   align-items:center;
justify-content:space-between;
//   padding:34px 36px 13px 40px;
padding:38px 0 8px 0;
`

const ConsultantBox=styled.div`
    //   width:727px;
    //   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    margin:0 auto;
    //   margin-top:20px;
    //   display:flex;
    padding-top: 30px;
    padding-bottom:38px;
    border-bottom: solid 1px #c6c7cc;
    border-top: solid 1px #c6c7cc;
`
const ConsultantTextBox = styled.div`
  width:100%;
  display: flex;
  flex-direction:column;
  justify-content:center;
  
`

const ConsultantImg = styled.img`
  width:94px;
  height:109px;
  // opacity:0.5;
  opacity: ${(props) => (props.active ? '0.2' : '1')};
`

const Header = styled(Content.FontSize18)`
  width: 335px;
  height: 41px;
  border-radius: 60px;
  background-color: #0a2165;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.83;
  letter-spacing: -0.45px;
  text-align: center;
  color: #ffffff;
  margin-top: 33px;
  margin-bottom:31px;
  object-fit: contain;
`

const ConsultantHeader = styled(Content.FontSize15)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.53;
  letter-spacing: -0.38px;
  text-align: center;
  color: #282c36;
  object-fit: contain;
`
const ContentBox = styled.div`
  // height: calc(46.3%);
  margin-right: 3.7%;
  margin-left: 3.7%;
  margin-top: 2.2%;
//   display: flex;
//   flex-direction: column;
`

const Font14 = styled(Title.FontSize14)`
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 2.14;
letter-spacing: -0.14px;
color: #999999;
text-align:center;
`

const Font15 = styled(Content.FontSize15)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.38px;
  // color: #282c36;
  color: ${(props) => (props.active ? '#c6c7cc' : '#282c36')};
  white-space: pre-line;
  text-align:center;
`
const Font13 = styled(Content.FontSize13)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: -0.13px;
  // color: #282c36;
  white-space: pre-line;
  color: ${(props) => (props.active ? '#c6c7cc' : '#282c36')};
`
const Font16 = styled(Title.FontSize16)`
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: 1.88;
letter-spacing: -0.16px;
color: #282c36;
text-align:center;
`
