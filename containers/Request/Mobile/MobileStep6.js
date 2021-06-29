import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import Buttonv1 from "components/Buttonv1";
import { inject, observer } from 'mobx-react';

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";
import MobileStepContainer from '../../../components/MobileStep';

const DropdownArrow1 = "/static/images/request/Step3/Step3_Dropdown1.png";
const DropUpArrow1 = "static/images/request/Step3/Step3_DropUp1.png";
const DropdownArrow2 = "/static/images/request/Mobile/MobileStep3/step3_dropdown2.png";
const DropUpArrow2 = "/static/images/request/Mobile/MobileStep3/step3_dropup2.png";
const Consultant1 = "/static/images/request/Step3/Step3_Consultant1.png";
const Consultant2 = "/static/images/request/Step3/Step3_Consultant2.png";
const Consultant3 = "/static/images/request/Step3/Step3_Consultant3.png";

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
    window.scrollTo(0, 0)

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
    if (arrowChecked==null) {
      return false
    }
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
      Text1:"삼성전자 기구/메카트로닉스 설계 25년,\n 다양한 제품 설계 경험",
      Text2:"(음향기기, 광기기, 의료기기,\n 진단기 ,BA SPEAKER, 웨어러블로봇 등)",
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
                <ContentBox>
                    <Font14 style={{marginBottom:60,color:'#282c36', lineHeight: 2.14, fontWeight: 'bold'}}>
                      의뢰주신 프로젝트는 <br/>전문 컨설턴트의 검토가 필요한 사항입니다. <br/>
                      <span class="blue"> 컨설팅을 신청</span>하시면 보다 <br/>
                      정확하고 상세한 견적을 받을 수 있습니다.
                    </Font14>
                    <Buttonv1 onClick={ this.buttonClick } style={{margin: 'auto', marginTop: 18, marginBottom: 42}}>
                        1:1 컨설팅 신청
                    </Buttonv1>
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
                                    <Font14 style={{lineHeight: 2.14, fontWeight: 500}}>{this.ConsultantInfo[this.state.arrowChecked].Text2}</Font14>
                                    <Font15 fontWeight={500} style={{lineHeight: 1.87, marginTop: 34}}>{this.ConsultantInfo[this.state.arrowChecked].Text3}</Font15>
                                </ConsultantTextBox>
                            }
                        </DetailContainer>
                    </ConsultantBox>
                    <Tail>
                      1:1 프로젝트 매니저를 배정받아 보다 정확하고  <br/>
                      안전한 견적을 받아보세요.
                    </Tail>
                    <Buttonv1 onClick={ this.buttonClick } style={{margin: 'auto', marginTop: 18, marginBottom: 42}}>
                      1:1 컨설팅 신청
                    </Buttonv1>
                </ContentBox>
            {/* </Card> */}
          </div>
        )
    }
}

export default withRouter(MobileStep6Container);

const ConsultantTextBox = styled.div`
  width:100%;
  display: flex;
  flex-direction:column;
  // margin-left:36px;
  // margin-top:72px;
  justify-content:center;
  
`

const ConsultantImg = styled.img`
  width:94px;
  height:109px;
  // opacity:0.5;
  opacity: ${(props) => (props.active ? '0.2' : '1')};
`
const Font14 = styled(Content.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.33px !important;
  color: #999999;
  text-align:center;
  white-space: pre-wrap;
  margin-top: 10px;
  .blue {
    color: #0933b3;
  }
`

const Font16 = styled(Content.FontSize16)`
  word-break: keep-all;
  white-space: pre-wrap;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.53 !important;
  letter-spacing: -0.38px;
  color: #282c36;
  text-align:center;
`

const Font15 = styled(Content.FontSize15)`
  font-weight: ${props=>props.fontWeight};
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.38px;
  // color: #282c36;
  color: ${(props) => (props.active ? '#c6c7cc' : '#282c36')};
  white-space: pre-line;
  text-align:center;
`

const ConsultantImgBox = styled.div`
  display:flex;
  width: 100%;
  justify-content:space-evenly;
  padding:38px 0 8px 0;
  > div >img:nth-of-type(1)
  {
      // width:94px;
      // height:109px;
      // opacity: ${(props) => (props.active ? '0.2' : '1')};
  }
`

const ConsultantBox=styled.div`
  margin:0 auto;
  padding-top: 30px;
  padding-bottom:38px;
  border-bottom: solid 1px #c6c7cc;
  border-top: solid 1px #c6c7cc;
`

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

const Font18 = styled(Content.FontSize18)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.18px;
  color: #282c36;
`

const DetailButtonBox = styled.div`
  background-color:#f6f6f6;
  height:59px;
  display:flex;
  align-items:center;
  justify-content:center;
`
const EstimateDetailContainer = styled.div`
  margin-left:63px;
  padding-bottom:20px;
`
const DetailContainer = styled.div`
  // margin-left:63px;
  margin-top:-1px;
  // padding-bottom:100px;
  background-color:white;

  .MuiTableCell-sizeSmall
  {
    padding:4px 0 4px 0;
  }

  .MuiTableCell-sizeSmall:last-child
  {
    padding-right:0;
  }

  .MuiTableCell-root:nth-of-type(1)
  {
      border-right:none;
  }

  .MuiTableCell-root:last-child
  {
      border-left:none;
      border-right:none;
  }

  .MuiTableCell-root:first-child
  {
      border-left:none;
      border-right:none;
  }
  
`

const ConsultantDetailButtonBox = styled.div`
  display:flex;
  width:727px;
  margin:0 auto;
  margin-top:20px;
  justify-content:flex-end;
  align-items:center;
  >img
  {
    width:13px;
    height:7px;
    margin-left:12px;
    margin-top:3px;
  }
`

const Card = styled.div`
  width: 100%;
  object-fit: contain;
//   border-radius: 10px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 25px 0px 120px 0px;
  display: inline;
  float: right;
`
const HeaderBackground = styled.div`
//   background-color: #0a2165;
`
const HeaderTextBox = styled.div`
  display:flex;
  justify-content:space-between;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-bottom:24px;
  padding-top:18px;
`

const Logo = styled.div`
    margin-left: 5.4%;
    padding-top:40px;
`

const History = styled(Title.FontSize16)`
  text-align:left;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
  color: #282c36;
  margin-left:63px;
`
const Header = styled(Content.FontSize18)`
  width: auto;
  height: calc(6.7%);
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -2px;
  text-align: center;
  color: #282c36;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-top: 15px;
  padding-bottom:15px;
  border-bottom: solid 1px #c6c7cc;
  object-fit: contain;
`

const ContentHeader = styled(Title.FontSize14)`
  width: auto;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.64;
  letter-spacing: -0.35px;
  text-align: center;
  color: #282c36;
  object-fit: contain;
`

const ContentBox = styled.div`
  width: 100%;
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 80px;
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
  // margin-left:63px;
  // margin-right:26px;
`

const ThumbText = styled(Content.FontSize18)`
  position: relative;
  text-align:center;
  color: #0933b3;
  font-weight: bold;
  margin-top:25px;
`
const Tail = styled.div`
  object-fit: contain;
  font-size: 13px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.54;
  letter-spacing: -0.33px;
  text-align: center;
  color: #0a2165;
  margin-top: 48px;
`

