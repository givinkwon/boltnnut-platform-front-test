import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import moment from 'moment';


@inject("Schedule")
@observer
class Step5Container extends Component {
  render() {
    moment.locale('ko');
    const { Schedule } = this.props;
    let bookDate = moment(Schedule.book_time).format('LL / LT');
      return(
          <Card>
            <Header>
              컨설팅 신청이 완료 되었습니다.
            </Header>
            <ContentBox>
              <ContentContainer>
                <div>날짜 및 시간</div>
                <span>{ bookDate }</span>
              </ContentContainer>
              { Schedule.isOnline ==  0 ? (
              <ContentContainer style={{marginTop: 30}}>
                <div>대면미팅장소</div>
                <span>서울특별시 성북구 고려대로 30길 4, 2층 볼트앤너트</span>
              </ContentContainer>
              ) : (
              <ContentContainer style={{marginTop: 30}}>
                <div>화상미팅 장소</div>
                <span>해당 시간에 카카오톡으로 ZOOM URL링크를 보내드립니다.</span>
              </ContentContainer>
              )}
            </ContentBox>
            <Text>방문하시는 고객님의 정보를 입력해주시면 원활한 상담을 도와드릴 수 있습니다.</Text>
            <MainBox>
              <div style={{display: "flex", marginBottom: 34}}>
                <InputBox style={{marginRight: 30}}>
                  <span>회사명</span>
                  <input placeholder={"회사명을 입력해주세요."}/>
                </InputBox>
                <InputBox>
                  <span>이름</span>
                  <input placeholder={"이름을 입력해주세요."}/>
                </InputBox>
              </div>
              <div style={{display: "flex"}}>
                <InputBox style={{marginRight: 30}}>
                  <span>직책</span>
                  <input placeholder={"직책을 입력해주세요."}/>
                </InputBox>
                <InputBox>
                  <span>부서명</span>
                  <input placeholder={"부서명을 입력해주세요."}/>
                </InputBox>
              </div>
            </MainBox>
            <HomeButton>제출 하기</HomeButton>
          </Card>
        )
    }
}

export default withRouter(Step5Container);

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 894px;
  object-fit: contain;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 60px 0px 200px 280px;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.3);
`
const Header = styled.div`
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.8px;
  color: #0a2165;
  margin-left: 48px;
  margin-right: 48px;
  padding-top: 40px;
  padding-bottom:20px;
  border-bottom: solid 1px #c6c7cc;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    font-family: NotoSansCJKkr;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.43px;
    color: #282c36;
    margin-bottom: 12px;
    height: 36px;
  }
  > span {
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.35px;
    color: #282c36;
    height: 27px;
  }
`
const ContentBox = styled.div`
  margin-left: 48px;
  margin-right: 48px;
  padding-top: 40px;
  padding-bottom: 40px;
  border-bottom: solid 1px #c6c7cc;
`
const MainBox = styled.div`
  padding: 40px 48px 0px 48px;
  display: flex;
  flex-direction: column;
`
const InputBox = styled.div`
  width: 380px;
  > span {
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.22;
    letter-spacing: -0.45px;
    text-align: left;
    color: #282c36;
  }
  > input {
    width: 360px;
    height: 20px;
    border-radius: 3px;
    border: solid 1px #c6c7cc;
    padding: 12px;
  }
  > input::placeholder {
    font-family: NotoSansCJKkr;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #c6c7cc;
  }
`
const HomeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 255px;
  height: 52px;
  border-radius: 30px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: #0933b3;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.38px;
  color: #ffffff;
  margin-top: 80px;
  margin-left: 305px;
  margin-bottom: 60px;
`
const Text = styled.p`
  margin-top: 60px;
  margin-left: 48px;
  height: 29px;
  font-family: NotoSansCJKkr;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.5px;
  color: #282c36; 
`
