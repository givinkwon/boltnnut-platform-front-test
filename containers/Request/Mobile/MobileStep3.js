import React, { Component } from "react";
import styled from "styled-components";
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Buttonv1 from "components/Buttonv1";
import TaskBarContainer from "./MobileTaskBar"

//material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import STLViewer from 'stl-viewer'

//Slider
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
// import EstimateLogoSlider from './EstimateSheetLogoSlider'
import EstimateLogoSlider from './MobileEstimateLogoSlider'

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";
// import ConsultantBoxContainer from './ConsultantBox'
import MobileStepContainer from '../../../components/MobileStep';

//images
const ThumbImage = "/static/images/request/RequestCard/Thumb.png";
const HeaderImg = "/static/images/request/Step3/Step3_Header.png";
const DropdownArrow1 = "/static/images/request/Step3/Step3_Dropdown1.png";
const DropUpArrow1 = "static/images/request/Step3/Step3_DropUp1.png";
const DropdownArrow2 = "/static/images/request/Step3/Step3_Dropdown2.png";
const DropUpArrow2 = "/static/images/request/Step3/Step3_DropUp2.png";
const Consultant1 = "/static/images/request/Step3/Step3_Consultant1.png";
const Consultant2 = "/static/images/request/Step3/Step3_Consultant2.png";
const Consultant3 = "/static/images/request/Step3/Step3_Consultant3.png";
const styles = {
  table: {
    // minWidth: 650
  },
  row:{
    // height:'49px',
  },
  cell:{
    border:'1px solid #c6c7cc',
    height:'49px'
  }
};


function createData(title, content, note) {
  return { title, content, note };
}


@inject('Request','Proposal','DetailQuestion','ManufactureProcess')
@observer
class MobileStep3Container extends Component {

  static defaultProps = { title: '견 적 서' };

  buttonClick = () => {
    const { Request } = this.props;
    Request.step_index = 4;
  }

  state = {
    percentage: 100,
    showEstimateDrop:true,
    // showEstimateDetail:'none',
    showEstimateDetail:true,
    showConsultantDrop: true,
    showConsultantDetail: 'none',
    arrowChecked:null
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
  ];

  handleChange = (event, newValue) => {
    this.setState({ percentage: newValue })
  }
  CustomSliderThumbComponent = (props) => {
    const {percentage} = this.state;
    return (
      <div {...props}>
        <img src={ThumbImage} />
        <ThumbText> {percentage}% </ThumbText>
      </div>
    );
  }

  detailDown = (type) => {
    const { showEstimateDrop, showEstimateDetail,showConsultantDrop,showConsultantDetail } = this.state;
    if(type==1)
    {
      this.setState({ showEstimateDrop:'none', showEstimateDetail: true })
    }
    else
    {
      this.setState({ showConsultantDrop:'none', showConsultantDetail: true })
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

  detailUp = (type) => {
    const { showEstimateDrop, showEstimateDetail,showConsultantDrop,showConsultantDetail } = this.state;
    if(type==1)
    {
      this.setState({ showEstimateDrop:true, showEstimateDetail: 'none' })
    }
    else
    {
      this.setState({ showConsultantDrop:true, showConsultantDetail: 'none' })
    }
  }

  componentDidMount() {
    const { Proposal, DetailQuestion } = this.props;
    // Proposal.loadEstimateInfo(315);
  }

  render() {
    const { percentage, showEstimateDrop, showEstimateDetail,showConsultantDrop,showConsultantDetail } = this.state;
    const { Proposal, DetailQuestion,ManufactureProcess} = this.props;
    const estimateData = Proposal.estimateData;

    const rows1 = [
      createData('작성일자', Proposal.estimate_year + '.' + Proposal.estimate_month + '.' + Proposal.estimate_day, ''),
      createData('문서번호', 'C8-' + Proposal.estimate_year + Proposal.estimate_month + Proposal.estimate_day + '-' + estimateData.id, ''),
      //createData('수신인', estimateData.client, ''),
      createData('발신인', '윤기열 대표 / \n (주)볼트앤너트', '02 - 926 - 9967'),
      // createData('제조사', '윤기열 대표 / (주) 볼트앤너트', 'TEL : 02 - 926 - 9967')
    ];

    const rows2 = [
      createData('프로젝트명', estimateData.projectTitle, ''),
      createData('개발기간', estimateData.period + '주', ''),
      createData('지급조건', '선금 50%, 잔금 50%', ''),
      createData('견적가', '₩ '+Proposal.estimate_price, 'VAT 미포함'),
    ];

    const {classes} = this.props
    var message = '도면입력';
    var rand2 = 28 + Math.floor(Math.random() * 38);

    if(DetailQuestion.message.includes(message))
    {
      rows2.splice(1,1);
      rows2.pop();
      rows2.pop();
      rows2[3]= createData('금형 가견적', '견적 알고리즘이 견적을 도출하고 있습니다.', 'VAT 미포함');
      rows2[4]= createData('사출 가견적', '견적 알고리즘이 견적을 도출하고 있습니다.', 'VAT 미포함');
      console.log(ManufactureProcess.totalMinPrice, 1)
      if(ManufactureProcess.totalMinPrice > 0 && ManufactureProcess.MinPrice > 0){
        console.log(ManufactureProcess.totalMinPrice, 2)
        rows2.splice(1,1);
        rows2.pop();
        rows2.pop();
        rows2[3]= createData('금형 가견적', Math.round(ManufactureProcess.totalMinPrice/10000) +'만원' +' ~ ' + Math.round(ManufactureProcess.totalMaxPrice/10000) + '만원', 'VAT 미포함');
        rows2[4]= createData('사출 가견적', Math.round(ManufactureProcess.MinPrice/10)*10 +'원' +' ~ ' + Math.round(ManufactureProcess.MaxPrice/10)*10 + '원/개(MOQ 1000개)', 'VAT 미포함');
      }  

    }
    return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
    <TopHeader>
        <span>무료 견적서 받기</span>
        <MobileStepContainer/>
    </TopHeader>
    
      <Card>
        <HeaderBackground>
          <Header>
            {this.props.title}
          </Header>
          <HeaderTextBox>
            <Content.FontSize15 fontWeight={'normal'} style={{ textAlign: 'left' }} color={'#282c36'}>
              견적가
            </Content.FontSize15>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Content.FontSize15 fontWeight={'normal'} style={{ textAlign: 'left' }} color={'#282c36'}>
                {Proposal.estimate_price} 원
              </Content.FontSize15>
            </div>
          </HeaderTextBox>
          <DetailButtonBox>

            {showEstimateDrop == true ? (
                  <>
                    <Content.FontSize15 fontWeight={'bold'} style={{ textAlign: 'center'}} color={'#0933b3'}>
                        견적서 상세보기
                    </Content.FontSize15>
                    <img src={DropdownArrow1} onClick={()=>{this.detailDown(1);}} style={{marginLeft:12}}/>
                  </>
                ) : (
                    <>
                      <Content.FontSize15 fontWeight={'bold'} style={{ textAlign: 'center'}} color={'#0933b3'}>
                          견적서 접기
                      </Content.FontSize15>
                      <img src={DropUpArrow1} onClick={()=>{this.detailUp(1);}} style={{marginLeft:20}}/>
                    </>
                  )
                }
          </DetailButtonBox>
          <DetailContainer style={{display: showEstimateDetail}}>
            <Table className={classes.table} size="small">
              <TableBody>
                  { rows1.map((row) => (
                <TableRow className ={classes.row} key={row.title}>
                  <TableCell className ={classes.cell} component="th" scope="row" width='83'>
                    <Font13 style={{textAlign:'center',color:'#86888c'}}>{row.title}</Font13>
                  </TableCell>
                  <TableCell className ={classes.cell} width='144'>
                    <Font13 style={{marginLeft:20,textAlign:'left'}}>{row.content}</Font13>
                    {/* <Font13 style={{textAlign:'right',marginRight:14}}>{row.note}</Font13> */}
                  </TableCell>
                  <TableCell className ={classes.cell} width='120'>
                    <Font13 style={{marginRight:14,textAlign:'right',color:'#86888c'}}>{row.note}</Font13>
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>

            </Table>

            <Font13 style={{margin:'30px 0 30px 0',textAlign:'center',fontWeight:'bold'}}>
                  * 귀하의 일이 번창하심을 기원합니다.<br/>
                  아래와 같은 조건으로 견적을 제출하오니 참조 바랍니다.
            </Font13>
            <Table className={classes.table} size="small">
              <TableBody>
                  {rows2.map((row) => (
                <TableRow className ={classes.row} key={row.title}>
                  <TableCell className ={classes.cell} component="th" scope="row" width='83'>
                    <Font13 style={{textAlign:'center',color:'#86888c'}}>{row.title}</Font13>
                  </TableCell>
                  <TableCell className ={classes.cell} width='144'>
                  <Font13 style={{marginLeft:20,textAlign:'left'}}>{row.content}</Font13>
                    </TableCell>
                    <TableCell className ={classes.cell} width='120'>
                    <Font13 style={{marginRight:14,textAlign:'right',color:'#86888c'}}>{row.note}</Font13>
                  </TableCell>
                </TableRow>
              ))}

              </TableBody>

            </Table>

            <Font13 style={{marginTop:35,textAlign:'center',fontWeight:'bold',color:'#0a2165',marginBottom:35}}>
              *해당 견적서는 제품 세부사항에 <br/>
              따라 달라질 수 있습니다.<br/>
              보다 정확한 견적을 받아보시려면<br/>
              1:1컨설팅을 신청해주세요.
            </Font13>

            {/* 여기 들어간다 */}

            
            {DetailQuestion.message.includes(message) ? 
            <StyledStlViewer
              model={ManufactureProcess.EstimateDataForDrawing.stl_file} // stl파일 주소
              width={300}                                  // 가로
              height={300}                                 // 세로
              modelColor='red'                             // 색
              backgroundColor='white'                    // 배경색
              rotate={true}                                // 자동회전 유무
              orbitControls={true}                         // 마우스 제어 유무
            />
           : (
            <TaskBarContainer/>
            )}
          </DetailContainer>


        </HeaderBackground>

        <ContentBox>
          <ContentHeader>
            요청하신 {estimateData.projectTitle} 제품 개발에<br/> 
            최적화된 <span style={{fontSize:16,color:'#0933b3'}}>{rand2}</span> 곳의 제조 파트너사가 매칭되었습니다.
          </ContentHeader>

          <EstimateLogoSlider />
          
          {/* <ThumbText> {percentage}% </ThumbText>
          <CustomSlider value={percentage}/> */}

          
          
          {/* <ConsultantBoxContainer Info={this.ConsultantInfo[0]}/> */}
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
            
            <ConsultantDetailButtonBox>
              {showConsultantDrop == true ? (
                    <>
                      <Font18 fontWeight={'bold'} style={{ textAlign: 'center'}} color={'#0933b3'}>
                          더 보기
                      </Font18>
                      <img src={DropdownArrow2} onClick={()=>{this.detailDown(2);}} />
                    </>
                  ) : (
                      <>
                        <Font18 fontWeight={'bold'} style={{ textAlign: 'center'}} color={'#0933b3'}>
                          접기
                        </Font18>
                        <img src={DropUpArrow2} onClick={()=>{this.detailUp(2);}}/>
                      </>
                    )
                  }
          </ConsultantDetailButtonBox>
          
          <Font13 style={{marginTop:40,textAlign:'center',color:'#0a2165',fontWeight:'bold'}}>
          전문 컨설턴트의 무료 상담을 통해 의뢰의 정확한 견적을 받아보세요
          </Font13>
          <Buttonv1 onClick={ this.buttonClick } fontSize={20} style={{ margin: '0 auto', marginTop: 20, marginBottom: 60, width: 260, height: 50 }}>
            무료 컨설팅 받기
          </Buttonv1>
        </ContentBox>
      </Card>
    </div>
    )
  }
}

export default withStyles(styles)(MobileStep3Container);

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
  line-height: 2.14;
  letter-spacing: -0.14px;
  color: #999999;
  text-align:center;
`

const Font16 = styled(Content.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
  color: #282c36;
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

const ConsultantImgBox = styled.div`
  display:flex;
//   align-items:center;
  justify-content:space-between;
//   padding:34px 36px 13px 40px;
  padding:38px 0 8px 0;
  >div >img:nth-of-type(1)
  {
      // width:94px;
      // height:109px;
      // opacity: ${(props) => (props.active ? '0.2' : '1')};
  }
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

const StyledStlViewer=styled(STLViewer)`
  margin:0 auto;
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
  width: 347px;
  object-fit: contain;
//   border-radius: 10px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
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
  letter-spacing: -0.8px;
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
  // height: calc(46.3%);
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 80px;
`

const CustomSlider = withStyles({
  root: {
    color: '#0933b3',
    height: 7,
    width: '76%',
    margin:'0.5% 12% 6.6% 12%',
    borderRadius: 10,
    cursor:'default'
  },
  thumb: {
    // top: -10,
    // paddingRight: 20,
    // content: "apapap"
    display:'none'
  },
  track: {
    height: 7,
    borderRadius: 10,
  },
  rail: {
    color: '#c6c7cc',
    opacity: 1,
    height: 7,
    borderRadius: 10,
  },
})(Slider);


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