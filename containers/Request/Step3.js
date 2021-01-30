import React, { Component } from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Buttonv1 from "components/Buttonv1";

//material-ui
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';

//Slider
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import EstimateLogoSlider from './EstimateSheetLogoSlider'

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";

const ThumbImage = "/static/images/request/RequestCard/Thumb.png";
const HeaderImg = "/static/images/request/Step3/Step3_Header.png";
const DropdownArrow1 = "/static/images/request/Step3/Step3_Dropdown1.png";
const DropUpArrow1 = "static/images/partner/arrow_up.png";
const DropdownArrow2 = "/static/images/request/Step3/Step3_Dropdown2.png";
const DropUpArrow2 = "static/images/partner/arrow_up.png";

const styles = {
  table: {
    minWidth: 650
  },
  row:{
    height:'auto',
  },
  cell:{
    border:'1px solid gray'
  }
};

function createData(title, content, note) {
  return { title, content, note };
}


@inject('Request','Proposal')
@observer
class Step3Container extends Component {

  static defaultProps = { title: '견 적 서' };

  componentDidMount()
  {
    this.props.Proposal.loadEstimateInfo(1);
  }
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


  render() {
    const { percentage, showEstimateDrop, showEstimateDetail,showConsultantDrop,showConsultantDetail } = this.state;
    const { Proposal } = this.props;

    const estimateData = Proposal.estimateData;

    const createDate = {
      // year: estimateData.createAt.split('-')[0],
      // month: estimateData.createAt.split('-')[1],
      // day: estimateData.createAt.split('-')[2].substring(0, 2),
    };


    const rows1 = [
      // createData('작성일자', createDate.year + '.' + createDate.month + '.' + createDate.day, ''),
      // createData('문서번호', 'C8-' + createDate.year + createDate.month + createDate.day + '-' + estimateData.id, ''),
      // createData('수신인', estimateData.client, ''),
      createData('발신인', '윤기열 대표 / (주)볼트앤너트', 'TEL : 02 - 926 - 9967'),
      createData('제조사', '윤기열 대표 / (주) 볼트앤너트', 'TEL : 02 - 926 - 9967')
    ];

    const rows2 = [
      // createData('프로젝트', estimateData.projectTitle, ''),
      // createData('개발기간', estimateData.period + '일', ''),
      // createData('지급조건', '일시불', ''),
      // createData('견적가', '₩ '+estimateData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 'VAT 포함'),
    ];

    const {classes} = this.props

    return (
      <Card>
        <HeaderBackground>
          <Logo>
            <img src={HeaderImg} />
          </Logo>
          <Header>
            {this.props.title}
          </Header>
          <DetailContainer style={{display: showEstimateDetail}}>
            <Table className={classes.table} size="small">
              <TableBody>
                  {rows1 && rows1.map((row) => (
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

            <Font16 style={{marginTop:40,textAlign:'center',fontWeight:'bold'}}>
            *해당 견적서는 제품 세부사항에 따라 달리질 수 있습니다.<br/>
            보다 정확한 견적을 받아보시려면 1:1컨설팅을 신청해주세요.
            </Font16>

            {/* 여기 들어간다 */}
            
            <AccountBox>
              <div>
                <Font16 style={{marginBottom:20}}>* 입금계좌(하나은행)</Font16>
                <Font16 style={{marginBottom:20}}>예금주: 윤기열(볼트앤너트)</Font16>
                <Font16 style={{marginBottom:20}}>계좌번호: 391-910021-******</Font16>
                <Font16>계좌명: 주식회사볼트앤너트</Font16>
              </div>
              <div>
                <Font16 style={{marginBottom:20}}>(주)볼트앤너트</Font16>
                <Font16 style={{marginBottom:20}}>서울시 성북구 고려대로 30길 4 2층</Font16>
                <Font16 style={{marginBottom:20}}>Tel : 02 - 926 - 6637</Font16>
                <Font16>대표이사 윤 기열</Font16>
              </div>
            </AccountBox>

          </DetailContainer>
          <HeaderTextBox>
            <Content.FontSize24 fontWeight={'normal'} style={{ textAlign: 'left' }} color={'#ffffff'}>
              견적가
            </Content.FontSize24>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Content.FontSize24 fontWeight={'normal'} style={{ textAlign: 'left' }} color={'#ffffff'}>
                {/* 25,000,000 원 */}
                {/*{estimateData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원*/}
              </Content.FontSize24>
              <div style={{ marginLeft: 20 }}>
                {showEstimateDrop == true ? (
                  <img src={DropdownArrow1} onClick={()=>{this.detailDown(1);}} />
                ) : (
                    <img src={DropUpArrow1} onClick={()=>{this.detailUp(1);}}/>
                  )
                }
              </div>
            </div>
          </HeaderTextBox>

        </HeaderBackground>

        <ContentBox>
          <ContentHeader>
            요청하신 반려동물 샤워기 손잡이 끝부분 나사 모양 제품 개발에 최적화된<br/>
            484곳의 제조 파트너사가 매칭되었습니다.
          </ContentHeader>

          <CustomSlider value={percentage}/>
          <ThumbText> {percentage}% </ThumbText>


          <EstimateLogoSlider />

          {/* <STLViewer
            url='https://boltnnutplatform-test.s3.amazonaws.com/media/stl/2021/1/27/17a3d0cb839b40abb79c86608763607d_stl.stl' // stl파일 주소
            width={400}                                  // 가로
            height={400}                                 // 세로
            modelColor='#B92C2C'                         // 색
            backgroundColor='#EAEAEA'                    // 배경색
            rotate={true}                                // 자동회전 유무
            orbitControls={true}                         // 마우스 제어 유무
          /> */}

          <ConsultantBox>
            <ConsultantTextBox>
              <ConsultantHeader>
                매칭 컨설턴트 : 최진영 기술 고문
              </ConsultantHeader>
              <ConsultantHashtag>#의료기기 #생활가전 #기구설계</ConsultantHashtag>
              <div style={{ marginRight: 50.4 }}>
                {showConsultantDrop == true ? (
                  <img src={DropdownArrow2} onClick={()=>{this.detailDown(2);}} />
                ) : (
                    <img src={DropUpArrow2} onClick={()=>{this.detailUp(2);}}/>
                  )
                }
              </div>
            </ConsultantTextBox>

            <DetailContainer style={{display: showConsultantDetail,paddingBottom:20}}>
              <History>
                제품개발/업체관리<br/>
                경희대 건축&기계공학前제조 스타트업 대표<br/>
                믹서기, 펫 웨어러플, 펫 샤워기 등 10개 이상 제품<br/>
              </History>
            </DetailContainer>
          </ConsultantBox>

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

const Font16 = styled(Content.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
  color: #282c36;
`

const AccountBox = styled.div`
  display:flex;
  justify-content:space-between;
  // background:blue;
  padding:50px 80px 0 128px;
`
const EstimateDetailContainer = styled.div`
  margin-left:63px;
  padding-bottom:20px;
`
const DetailContainer = styled.div`
  // margin-left:63px;
  margin-top:-1px;
  padding-bottom:100px;
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
const ConsultantTextBox = styled.div`
  width:100%;
  display: flex;
  justify-content:space-between;
  align-items:center;
  padding-top:20px;
  padding-bottom:20px;
`

const ConsultantBox = styled.div`
  margin-top:90px;
  
  // height:76px;
  border-top:solid 1px #707070;
  border-bottom:solid 1px #707070;
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
  background-color: #0a2165;
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
  color: #ffffff;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-top: 27px;
  padding-bottom:41px;
  border-bottom: solid 1px #ffffff;
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
  margin-top: 60px;
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


const ConsultantHeader = styled(Content.FontSize24)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
  object-fit: contain;
  margin-left:63px;
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
