import React, { Component } from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Buttonv1 from "components/Buttonv1";

//material-ui
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

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

class Step3Container extends Component {

  static defaultProps = { title: '견 적 서' };

  state = {
    percentage: 100,
    showEstimateDrop:true,
    showEstimateDetail:'none',
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>번호</TableCell>
                  <TableCell>번호</TableCell>
                  <TableCell>번호</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </DetailContainer>
          <HeaderTextBox>
            <Content.FontSize24 fontWeight={'normal'} style={{ textAlign: 'left' }} color={'#ffffff'}>
              견적가
            </Content.FontSize24>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Content.FontSize24 fontWeight={'normal'} style={{ textAlign: 'left' }} color={'#ffffff'}>
                25,000,000 원
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

            <DetailContainer style={{display: showConsultantDetail}}>
              <History>
                - 이력1<br/>
                - 이력2<br/>
                - 이력3<br/>
              </History>
            </DetailContainer>
          </ConsultantBox>
          
          <Font16>
            1:1 프로젝트 매니저를 배정받아 보다 정확하고 안전한 견적을 받아보세요(워딩필요)
          </Font16>
          <Buttonv1 fontSize={20} style={{ margin: '0 auto', marginTop: 20, marginBottom: 60, width: 260, height: 50 }}>
            무료 컨설팅 받기
          </Buttonv1>
        </ContentBox>
      </Card>
    )
  }
}

export default withRouter(Step3Container);

const Font16 = styled(Content.FontSize16)`
  margin-top:100px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
  text-align: center;
  color: #282c36;
`
const EstimateDetailContainer = styled.div`
  margin-left:63px;
  padding-bottom:20px;
`
const DetailContainer = styled.div`
  // margin-left:63px;
  margin-top:-1px;
  padding-bottom:20px;
  background-color:white;
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

const History = styled(Title.FontSize18)`
  text-align:left;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.18px;
  color: #282c36;
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
    width: '92%',
    marginLeft: '4%',
    marginRight: '4%',
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