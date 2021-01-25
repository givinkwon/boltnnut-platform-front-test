import styled from 'styled-components';
import * as Content from '../../components/Content';
import { Component } from 'react';
import Calendar from './Calender';
import InputComponent from 'components/Input2';
import CheckBoxComponent from 'components/CheckBox';
import Buttonv1 from 'components/Buttonv1';

class Step4Container extends Component {
  checkboxChange = (e) => {
    console.log(e) // 에러피하기용 임시
  }
  emailChange = (obj) => {
    console.log(obj) // 에러피하기용 임시
  }
  render() {
    const timeArr = ["10 : 30", "11 : 00", "11 : 30", "01 : 30", "02 : 00", "02 : 30",
    "03 : 00","03 : 30","04 : 00","04 : 30","05 : 00","05 : 30","06 : 00"]
    return (
      <Card>
        <Header>1:1 컨설팅 신청</Header>
        <ContentBox>
          <Calendar/>
        </ContentBox>
        <ScheduleBox>
          <Title style={{marginTop: 60}}>
            시간
          </Title>
          <SubContent fontWeight = {'bold'}>
            오전
          </SubContent>
          <TimeBox>
            {timeArr.slice(0,2).map((data) => {
                return (
                  <TimeComponent>
                    {data}
                  </TimeComponent>
                )
              })}
          </TimeBox>
          <SubContent fontWeight = {'bold'}>
            오후
          </SubContent>
          <TimeBox>
              {timeArr.slice(3,8).map((data) => {
                return (
                  <TimeComponent>
                    {data}
                  </TimeComponent>
                )
              })}
          </TimeBox>
          <TimeBox>
              {timeArr.slice(8,13).map((data) => {
                return (
                  <TimeComponent>
                    {data}
                  </TimeComponent>
                )
              })}
          </TimeBox>
          <Title style={{marginTop: 60}}>
            장소
          </Title>
          <SubContent>
            서울특별시 성북구 고려대로 30길 4, 2층 볼트앤너트
          </SubContent>
          <Title style={{marginTop: 30}}>
            이메일
          </Title>
          <InputComponent
            width={"88.3%"}
            placeholder="이메일을 입력해주세요."
            onChange={this.emailChange}
          />
          <Tail>
            *컨설팅을 위한 사전 준비 사항을 E-mail로 보내드립니다.
          </Tail>
        </ScheduleBox>
        <CardFooter>
          <CheckBoxComponent
            onChange={this.checkboxChange}>
            이용약관 및 개인정보 처리방침에 동의합니다.
          </CheckBoxComponent>
          <CustomButton>
            무료 컨설팅 받기
          </CustomButton>
        </CardFooter>
      </Card>
    )
  }
}

export default Step4Container;


const Card = styled.div`
  width: 894px;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 60px 0px 200px 280px;
  display: inline;
  float: right;
`
const Header = styled(Content.FontSize32)`
  width: auto;
  height: calc(6.7%);
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.8px;
  text-align: left;
  color: #0a2165;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-top: 4%;
  border-bottom: solid 1px #707070;
  object-fit: contain;
  padding-bottom: 20px;
`
const ContentBox = styled.div`
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 4%;
  display: flex;
  flex-direction: column;
`
const ScheduleBox = styled.div`
  padding-left: 5.4%;
`
const Title = styled(Content.FontSize24)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
`
const SubContent = styled(Content.FontSize18)`
  font-weight: ${(props) => props.fontWeight ? props.fontWeight : 500};
  font-stretch: normal;
  font-style: normal;
  line-height: 2.22;
  letter-spacing: -0.45px;
  text-align: left;
  color: #282c36;
  margin-bottom: 6px;
`
const TimeBox = styled.div`
  width: 520px;
  display: inline-flex;
`
const TimeComponent = styled.div`
  width: 88px;
  height: 40px;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.22;
  letter-spacing: -0.45px;
  text-align: left;
  color: #282c36;
  margin-right: 19px;
  margin-bottom: 20px;
`
const Tail = styled(Content.FontSize14)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.86;
  letter-spacing: -0.14px;
  text-align: left;
  color: #282c36;
  object-fit: contain;
  margin-top: 6px;
`
const CardFooter = styled.div`
  width: 100%;
  margin-top: 70px;
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  > span {
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: -0.16px;
    text-align: left;
    color: #282c36;
  }
`
const CustomButton = styled(Buttonv1)`
  width: 220px !important;
  height: 52px !important;
  margin-top: 30px;
  font-size: 20px !important;
  margin-bottom: 60px;
`

