import React, { Component } from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Buttonv1 from "components/Buttonv1";
import TaskBarContainer from "./TaskBar"

//material-ui
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import STLViewer from 'stl-viewer'

//Slider
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import EstimateLogoSlider from './EstimateSheetLogoSlider'

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";

//images
const ThumbImage = "/static/images/request/RequestCard/Thumb.png";
const HeaderImg = "/static/images/request/Step3/Step3_Header.png";
const DropdownArrow1 = "/static/images/request/Step3/Step3_Dropdown1.png";
const DropUpArrow1 = "static/images/request/Step3/Step3_DropUp1.png";
const DropdownArrow2 = "/static/images/request/Step3/Step3_Dropdown2.png";
const DropUpArrow2 = "/static/images/request/Step3/Step3_DropUp2.png";
const Consultant1 = "/static/images/request/Step3/Step3_Consultant1.png";

const styles = {
  table: {
    minWidth: 650
  },
  row:{
    height:'auto',
  },
  cell:{
    border:'1px solid #c6c7cc'
  }
};


function createData(title, content, note) {
  return { title, content, note };
}


@inject('Request','Proposal','DetailQuestion','ManufactureProcess')
@observer
class Step3Container extends Component {

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
    showConsultantDetail: 'none'
  }

  handleChange = (event, newValue) => {
    console.log(newValue)
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
    console.log(DetailQuestion.proposal_type)
  }

  render() {
    const { percentage, showEstimateDrop, showEstimateDetail,showConsultantDrop,showConsultantDetail } = this.state;
    const { Proposal, DetailQuestion,ManufactureProcess} = this.props;
    const estimateData = Proposal.estimateData;

    const rows1 = [
      createData('작성일자', Proposal.estimate_year + '.' + Proposal.estimate_month + '.' + Proposal.estimate_day, ''),
      createData('문서번호', 'C8-' + Proposal.estimate_year + Proposal.estimate_month + Proposal.estimate_day + '-' + estimateData.id, ''),
      //createData('수신인', estimateData.client, ''),
      createData('발신인', '윤기열 대표 / (주)볼트앤너트', 'TEL : 02 - 926 - 9967'),
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

    console.log(ManufactureProcess.EstimateDataForDrawing);
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
        rows2[3]= createData('금형 가견적', Math.round(ManufactureProcess.totalMinPrice/10000)*10000 +'원' +' ~ ' + Math.round(ManufactureProcess.totalMaxPrice/10000)*10000 + '원', 'VAT 미포함');
        rows2[4]= createData('사출 가견적', Math.round(ManufactureProcess.MinPrice/10)*10 +'원' +' ~ ' + Math.round(ManufactureProcess.MaxPrice/10)*10 + '원', 'VAT 미포함');
      }  

    }
    return (
      <Card>
        <HeaderBackground>
          <Logo>
            <img src={HeaderImg} />
          </Logo>
          <Header>
            {this.props.title}
          </Header>
          <HeaderTextBox>
            <Content.FontSize24 fontWeight={'normal'} style={{ textAlign: 'left' }} color={'#282c36'}>
              견적가
            </Content.FontSize24>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Content.FontSize24 fontWeight={'normal'} style={{ textAlign: 'left' }} color={'#282c36'}>
                {Proposal.estimate_price} 원
              </Content.FontSize24>
              <div style={{ marginLeft: 20 }}>

              </div>
            </div>
          </HeaderTextBox>
          <DetailButtonBox>

            {showEstimateDrop == true ? (
                  <>
                    <Title.FontSize20 fontWeight={'bold'} style={{ textAlign: 'center'}} color={'#0933b3'}>
                        견적서 상세보기
                    </Title.FontSize20>
                    <img src={DropdownArrow1} onClick={()=>{this.detailDown(1);}} style={{marginLeft:12}}/>
                  </>
                ) : (
                    <>
                      <Title.FontSize20 fontWeight={'bold'} style={{ textAlign: 'center'}} color={'#0933b3'}>
                          견적서 접기
                      </Title.FontSize20>
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
                  <TableCell className ={classes.cell} component="th" scope="row" width='154'>
                    <Font16 style={{marginRight:48,textAlign:'right'}}>{row.title}</Font16>
                  </TableCell>
                  <TableCell className ={classes.cell} width='472'>
                    <Font16 style={{marginLeft:20,textAlign:'left'}}>{row.content}</Font16>
                  </TableCell>
                  <TableCell className ={classes.cell} width='268'>
                    <Font16 style={{marginRight:52,textAlign:'right'}}>{row.note}</Font16>
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>

            </Table>

            <Font16 style={{margin:'30px 0 30px 0',textAlign:'center',fontWeight:'bold'}}>
                  * 귀하의 일이 번창하심을 기원합니다. 아래와 같은 조건으로 견적을 제출하오니 참조 바랍니다.
            </Font16>
            <Table className={classes.table} size="small">
              <TableBody>
                  {rows2.map((row) => (
                <TableRow className ={classes.row} key={row.title}>
                  <TableCell className ={classes.cell} component="th" scope="row" width='154'>
                    <Font16 style={{marginRight:48,textAlign:'right'}}>{row.title}</Font16>
                  </TableCell>
                  <TableCell className ={classes.cell} width='472'>
                  <Font16 style={{marginLeft:20,textAlign:'left'}}>{row.content}</Font16>
                    </TableCell>
                    <TableCell className ={classes.cell} width='268'>
                    <Font16 style={{marginRight:52,textAlign:'right'}}>{row.note}</Font16>
                  </TableCell>
                </TableRow>
              ))}


              </TableBody>

            </Table>

            <Font16 style={{marginTop:40,textAlign:'center',fontWeight:'bold',color:'#0a2165',marginBottom:40}}>
              *해당 견적서는 제품 세부사항에 따라 달리질 수 있습니다.<br/>
              보다 정확한 견적을 받아보시려면 1:1컨설팅을 신청해주세요.
            </Font16>

            {/* 여기 들어간다 */}

            
            {DetailQuestion.message.includes(message) ? 
            <StyledStlViewer
            model={ManufactureProcess.EstimateDataForDrawing.stl_file} // stl파일 주소
            width={500}                                  // 가로
            height={500}                                 // 세로
            modelColor='gray'                             // 색
            backgroundColor='white'                    // 배경색
            rotate={true}                                // 자동회전 유무
            orbitControls={true}                         // 마우스 제어 유무
          />
           : (<TaskBarContainer/>)}
          </DetailContainer>


        </HeaderBackground>

        <ContentBox>
          <ContentHeader>
            볼트앤너트에는 요청하신 {estimateData.projectTitle}에 최적화된<br/>
            {rand2} 곳의 제조 파트너사가 있습니다.
          </ContentHeader>

          <CustomSlider value={percentage}/>
          <ThumbText> {percentage}% </ThumbText>


          <EstimateLogoSlider />

          

          <ConsultantHeader>
            매칭 컨설턴트 : 안철옹 기술 고문  외 2명
          </ConsultantHeader>
            <ConsultantBox>
              <ConsultantImgBox>
                <img src={Consultant1}/>
                <Font18>안철옹</Font18>
                <Font14 style={{color:'#0933b3',fontWeight:500}}>기술고문</Font14>
              </ConsultantImgBox>
              <div style={{height:120,width:2,backgroundColor:'#c6c7cc',marginTop:53}}/>
              <ConsultantTextBox>
                <Font16>삼성전자 기구/메카트로닉스 설계 25년, 다영한 제품 설계 경험</Font16>
                <Font14>(음향기기, 광기기, 의료기기, 진단기 ,BA SPEAKER, 웨어러블로봇 등)</Font14>
                <Font15>6-시그마 Black belt(삼성전자공인 2003)</Font15>
                <Font15>과학기술부 신기술 인증상(2007)</Font15>
                <Font15>CE-Show innovation Award(2016)</Font15>
              </ConsultantTextBox>  
            </ConsultantBox>

            {/* 나중에 디비에 연결할거라 그때 map으로 바꾸기 */}
            <DetailContainer style={{display: showConsultantDetail,paddingBottom:20}}>
                <ConsultantBox>
                  <ConsultantImgBox>
                    <img src={Consultant1}/>
                    <Font18>안철옹</Font18>
                    <Font14 style={{color:'#0933b3',fontWeight:500}}>기술고문</Font14>
                  </ConsultantImgBox>
                  <div style={{height:120,width:2,backgroundColor:'#c6c7cc',marginTop:53}}/>
                  <ConsultantTextBox>
                    <Font16>삼성전자 기구/메카트로닉스 설계 25년, 다영한 제품 설계 경험</Font16>
                    <Font14>(음향기기, 광기기, 의료기기, 진단기 ,BA SPEAKER, 웨어러블로봇 등)</Font14>
                    <Font15>6-시그마 Black belt(삼성전자공인 2003)</Font15>
                    <Font15>과학기술부 신기술 인증상(2007)</Font15>
                    <Font15>CE-Show innovation Award(2016)</Font15>
                  </ConsultantTextBox>  
                </ConsultantBox>

                <ConsultantBox>
                  <ConsultantImgBox>
                    <img src={Consultant1}/>
                    <Font18>안철옹</Font18>
                    <Font14 style={{color:'#0933b3',fontWeight:500}}>기술고문</Font14>
                  </ConsultantImgBox>
                  <div style={{height:120,width:2,backgroundColor:'#c6c7cc',marginTop:53}}/>
                  <ConsultantTextBox>
                    <Font16>삼성전자 기구/메카트로닉스 설계 25년, 다영한 제품 설계 경험</Font16>
                    <Font14>(음향기기, 광기기, 의료기기, 진단기 ,BA SPEAKER, 웨어러블로봇 등)</Font14>
                    <Font15>6-시그마 Black belt(삼성전자공인 2003)</Font15>
                    <Font15>과학기술부 신기술 인증상(2007)</Font15>
                    <Font15>CE-Show innovation Award(2016)</Font15>
                  </ConsultantTextBox>  
                </ConsultantBox>


              </DetailContainer>

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
          
          <Font16 style={{marginTop:100,textAlign:'center'}}>
            1:1 프로젝트 매니저를 배정받아 보다 정확하고 안전한 견적을 받아보세요(워딩필요)
          </Font16>
          <Buttonv1 onClick={ this.buttonClick } fontSize={20} style={{ margin: '0 auto', marginTop: 20, marginBottom: 60, width: 260, height: 50 }}>
            무료 컨설팅 받기
          </Buttonv1>
        </ContentBox>
      </Card>
    )
  }
}

export default withStyles(styles)(Step3Container);

const StyledStlViewer=styled(STLViewer)`
  margin:0 auto;
`
const Font14 = styled(Content.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.14;
  letter-spacing: -0.14px;
  color: #999999;
`

const Font15 = styled(Content.FontSize15)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.15px;
  color: #414550;
`

const Font16 = styled(Content.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
  color: #282c36;
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

const ConsultantTextBox = styled.div`
  width:100%;
  display: flex;
  flex-direction:column;
  margin-left:36px;
  // margin-top:31px;
  justify-content:center;
`

const ConsultantBox = styled.div`
  width:727px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  margin:0 auto;
  margin-top:20px;
  display:flex;
`

const ConsultantImgBox = styled.div`
  display:inline-flex;
  flex-direction:column;
  align-items:center;
  padding:34px 36px 13px 40px;
`
const Card = styled.div`
  width: 894px;
  // height: 1170px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 60px 0px 200px 280px;
  display: inline;
  float: right;
`
const HeaderBackground = styled.div`
  // background-color: #0a2165;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`
const HeaderTextBox = styled.div`
  display:flex;
  justify-content:space-between;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-bottom:18px;
  padding-top:12px;
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
const Header = styled(Content.FontSize32)`
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
  padding-top: 27px;
  padding-bottom:41px;
  border-bottom: solid 1px #999999;
  object-fit: contain;
`

const ContentHeader = styled(Title.FontSize20)`
  width: auto;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.9;
  letter-spacing: -0.5px;
  text-align: center;
  color: #282c36;
  object-fit: contain;
`

const ContentBox = styled.div`
  // height: calc(46.3%);
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 100px;
`

const CustomSlider = withStyles({
  root: {
    color: '#0933b3',
    height: 7,
    width: '76%',
    marginLeft: '12%',
    marginRight: '12%',
    marginTop:'2%',
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


const ConsultantHeader = styled(Title.FontSize20)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
  object-fit: contain;
  // margin-left:63px;
  // margin-right:26px;
`

const ConsultantHashtag = styled(Content.FontSize16)`
  width: auto;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
  object-fit: contain;
`
const ThumbText = styled(Content.FontSize18)`
  position: relative;
  text-align:center;
  color: #0933b3;
  font-weight: bold;
`
const MatchingText = styled(Title.FontSize20)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  color: #282c36;
  margin: 0px 176px;
`
const ButtonContainer = styled.div`
  width: 260px;
  height: 44px;
  margin: 90px 317px 50px 317px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
