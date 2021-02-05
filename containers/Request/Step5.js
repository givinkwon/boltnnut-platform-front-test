import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
//Slider
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Buttonv1 from "components/Buttonv1";

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";

const CallingCard1 = "/static/images/request/Step4/Step4_CallingCard1.png";
const CallingCard2 = "/static/images/request/Step4/Step4_CallingCard2.png";

class Step5Container extends Component {
  state = {
    modal: false
  };
  
  static defaultProps = { title: '컨설팅 신청이 완료 되었습니다.' };

  modalHandler() {

  }
  render() {
      return(
          <Card>
            <Header>
              {this.props.title}
            </Header>
            <ContentBox>
              <ConsultantBox>
                <Font24>담당 컨설턴트</Font24>
                <ImageBox>
                  <img src={CallingCard1}/>
                  <img src={CallingCard2}/>
                </ImageBox>
              </ConsultantBox>

              <PlaceBox>
                <Font24>장소</Font24>
                <Font18>서울특별시 성북구 고려대로 27길 3, 2층 볼트앤너트</Font18>
              </PlaceBox>

              <DateBox>
                <Font24>날짜</Font24>
                <Font18>2020년 12월 25일 15:00</Font18>
              </DateBox>

              <Font18 style={{textAlign:'center',paddingTop:144}}>방문하시는 담당자님 정보를 입력해주시면 원활한 상담을 도와드릴 수 있습니다.</Font18>

              <Buttonv1 fontSize={20} style={{margin:'0 auto', marginTop: 30,marginBottom:60,width:255,height:49}}>
                미팅사전 사항 입력하기
              </Buttonv1>
            </ContentBox>
          </Card>
        )
    }
}

export default withRouter(Step5Container);

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
  line-height: 1.63;
  letter-spacing: -0.8px;
  text-align: center;
  color: #0a2165;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-top: 40px;
  padding-bottom:20px;
  border-bottom: solid 1px #707070;
  object-fit: contain;
`

const ContentBox = styled.div`
  // height: calc(46.3%);
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 4.4%;
  display: flex;
  flex-direction: column;
`

const Font18 = styled(Title.FontSize18)`
  // width:100%;
  text-align:left;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.18px;
  color: #282c36;
`

const Font24 = styled(Title.FontSize24)`
  // width:100%;
  text-align:left;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  color: #282c36;
`
