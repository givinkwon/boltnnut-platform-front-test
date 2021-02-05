import React, {Component} from "react";
import styled from "styled-components";
import { withRouter } from 'next/router';

const BusinessCard = "/static/images/request/Step5/명함.png";
class MobileStep5Container extends Component {
  render() {
    return(
      <Card>
        <Header>
          컨설팅 신청이 완료 되었습니다.
        </Header>
        <ContentBox>
          <ContentContainer>
            <div>날짜 및 시간</div>
            <span>2020년 12월 25일 / 오후 3:00</span>
          </ContentContainer>
          <ContentContainer style={{marginTop: 24}}>
            <div>장소</div>
            <span>서울특별시 성북구 고려대로 30길 4, 2층 볼트앤너트</span>
          </ContentContainer>
        </ContentBox>
        <Text>
          방문하시는 고객님 정보를 입력해주시면 <br/> 원할한 상담을 도와드릴 수 있습니다.
        </Text>
        <InputBox>
          <span>이름</span>
          <input placeholder={"이름을 입력해주세요."}/>
        </InputBox>
        <InputBox>
          <span>회사명</span>
          <input placeholder={"회사명을 입력해주세요."}/>
        </InputBox>
        <InputBox>
          <span>직책</span>
          <input placeholder={"직책을 입력해주세요."}/>
        </InputBox>
        <InputBox>
          <span>부서명</span>
          <input placeholder={"부서명을 입력해주세요."}/>
        </InputBox>
        <HomeButton>제출 하기</HomeButton>
      </Card>
    )
  }
}

export default withRouter(MobileStep5Container);


const Card = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled.div`
  background-color: #0a2165;
  width: 311px;
  height: 41px;
  object-fit: contain;
  border-radius: 60px;
  font-family: NotoSansCJKkr;
  font-size: 17px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.88;
  letter-spacing: -0.43px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 29px;
`
const ContentBox = styled.div`
  width: 346px;
  border-bottom: solid 1px #c6c7cc;
  padding: 30px 0px;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 347px;
  margin-left: 4px;
  > div {
    font-family: NotoSansCJKkr;
    font-size: 17px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.43px;
    color: #282c36;
    margin-bottom: 12px;
    height: 25px;
  }
  > span {
    font-family: NotoSansCJKkr;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.35px;
    color: #282c36;
    height: 20px;
  }
`
const HomeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 202px;
  height: 50px;
  border-radius: 46px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: #0933b3;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.38px;
  color: #ffffff;
  margin-top: 45px;
  margin-bottom: 120px;
`
const Text = styled.div`
  height: 44px;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.38px;
  text-align: center;
  color: #282c36;
  margin: 30px 0px 25px 0px;
`
const InputBox = styled.div`
  width: 319px;
  margin-bottom: 15px;
  > span {
    font-family: NotoSansCJKkr;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.22;
    letter-spacing: -0.45px;
    text-align: left;
    color: #282c36;
  }
  > input {
    width: 303px;
    height: 18px;
    border-radius: 3px;
    border: solid 1px #c6c7cc;
    padding: 8px;
  }
  > input::placeholder {
    font-family: NotoSansCJKkr;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.35px;
    color: #999999;
  }
`
