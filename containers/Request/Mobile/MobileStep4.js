import styled from 'styled-components';
import * as Content from 'components/Content';
import React, { Component } from 'react';
import MobileCalendar from './MobileCalendar';
import InputComponent from 'components/Input2';
import CheckBoxComponent from 'components/CheckBox';
import Buttonv1 from 'components/Buttonv1';
import moment from "moment";
import { inject, observer } from 'mobx-react';
import Slider from 'react-slick';
import 'intersection-observer';
import MobileStepContainer from '../../../components/MobileStep'; // polyfill

// Marketing Modal
import MarketingModal from '../MarketingModal';
const dropdown = '/static/images/request/Step4/dropdown.png';

@inject('Schedule', 'Request')
@observer
class MobileStep4Container extends Component {
  state = {
    display: 0,
    inactive_array: [],
    userEmail: null,
    isOnline: 0,
    active1_target: null,
    active2_target: null,
    open_marketing_modal: false,
    policy_agree: true,
    marketing_agree: true
  }
  checkboxChange_policy = (e) => {
    this.setState({...this.state, policy_agree: e});
  }
  checkboxChange_marketing = (e) => {
    this.setState({...this.state, marketing_agree: e});
  }
  handleClose =()=> {
    this.setState({...this.state, open_marketing_modal: false})
  }
  openMarketingModal = () => {
    this.setState({...this.state, open_marketing_modal: true})
  }
  // 이메일 입력
  emailChange = (obj) => {
    this.setState({...this.state, userEmail: obj})
  }
  // 대면, 비대면 선택
  isOnlineHandler = (e) => {
    let targetWord = e.target.innerHTML;
    console.log(targetWord);
    // 대면이면 0, 화상이면 1
    if (targetWord == "화상 미팅") {
      this.setState({...this.state, isOnline: 1, active2_target: targetWord});
    } else {
      this.setState({...this.state, isOnline: 0, active2_target: targetWord});
    }
  }
  getTime = (hour) => {
    const { Schedule, Request } = this.props;
    return (Schedule.today) + (`${hour}:00`);
  }
  setTime = (e, date) => {
    const { Schedule } = this.props;
    let time = e.currentTarget.innerHTML;
    this.setState({...this.state, active1_target: Schedule.today + time});
    Schedule.setCurrent(time+":00");
    Schedule.getOccupiedDate();
  }
  timeActiveToggle = (time) => {
    const { Schedule } = this.props;
    let nowTime = new moment();
    // console.log(time.split(' ')[1]);  ==> 10:00 과 같음.
    if (Schedule.inactive_today.includes(time.split(' ')[1]) || (nowTime.format("HH") >= time.split(' ')[1].split(":")[0] && nowTime.format("DD") == time.split(' ')[0].split('-')[2])) {
      return true
    } else {
      return false
    }
  }
  createSchedule = () => {
    const { Schedule, Request } = this.props;
    const { policy_agree } = this.state;

    if (!policy_agree) {
      return alert("이용약관 동의에 체크해주세요.")
    }
    var emailval =/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!emailval.test(this.state.userEmail) && !Request.has_email) {
      return alert("올바른 이메일 주소를 입력해주세요")
    }

    let req = {
      request: Request.created_request,
      email: this.state.userEmail,
      isOnline: this.state.isOnline,
      marketing: this.state.marketing_agree
    }
    Schedule.submitSchedule(req);
    dataLayer.push({'event':'Step4Complete'});
    Request.step_index = 5;
  }
  timeComponentActiveToggle = (e) => {
    const target = this.state.active1_target
    if (e == target) {
      return true
    }
  }
  timeComponentActiveToggle2 = (word) => {
    const target = this.state.active2_target
    if (word == target) {
      return true
    } else {
      return false
    }
  }
  render() {
    const { display } = this.state;
    const { Request, Schedule } = this.props;
    const timeArr = [
      {
        start_at: this.getTime(10),
        end_at: this.getTime(11)
      },
      {
        start_at: this.getTime(11),
        end_at: this.getTime(12)
      },
      {
        start_at: this.getTime(13),
        end_at: this.getTime(14)
      },
      {
        start_at: this.getTime(14),
        end_at: this.getTime(15)
      },
      {
        start_at: this.getTime(15),
        end_at: this.getTime(16)
      },
      {
        start_at: this.getTime(16),
        end_at: this.getTime(17)
      },
      {
        start_at: this.getTime(17),
        end_at: this.getTime(18)
      },
      {
        start_at: this.getTime(18),
        end_at: this.getTime(19)
      }
    ]
    var settings = {
      dots: false,
      infinite: false,
      arrows: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      initialSlide: 0,
      draggable: true,
      beforeChange: (current) => {
        this.setState({current: current})
      }
    };
    return (
      <Card>
        <div style={{display: 'flex', justifyContent: 'center',}}>
          <Header>
            <span>1:1 컨설팅 신청</span>
            <MobileStepContainer/>
          </Header>
        </div>
        <Title style={{marginTop: 19, marginBottom: 6, width: '100%'}}>
          날짜
        </Title>
        <ContentBox>
           <MobileCalendar/>
        </ContentBox>
        <ScheduleBox>
          <Title style={{marginTop: 42, marginBottom: 12}}>
            시간
          </Title>
          <TimeBox>
            <div>
              {Schedule.today && timeArr.map((data) => {
                return (
                  <TimeComponent
                    deactive={this.timeActiveToggle(data.start_at)}
                    onClick = {(event) => this.setTime(event, data.start_at)}
                    focused={this.timeComponentActiveToggle(data.start_at)}
                  >
                    {data.start_at.split(' ')[1]}
                  </TimeComponent>
                )
              })}
            </div>
          </TimeBox>
          <div style={{marginTop: 109}}>
            <Title style={{marginBottom: 12}}>
              컨설팅 유형
            </Title>
            <div style={{display: 'inline-flex'}}>
              <TimeComponent onClick = {this.isOnlineHandler} focused={this.timeComponentActiveToggle2("방문 미팅")}>
                방문 미팅
              </TimeComponent>
              <TimeComponent onClick = {this.isOnlineHandler} focused={this.timeComponentActiveToggle2("화상 미팅")}>
                화상 미팅
              </TimeComponent>
            </div>
          </div>
          <Tail style={{marginTop: 14}}>
          {this.state.isOnline == 0 ? "* 서울특별시 성북구 고려대로 27길 4, 3층 볼트앤너트" : "* 입력하신 전화번호로 화상 ZooM 미팅을 안내드립니다"}
          </Tail>
          { !Request.has_email && (
          <>
            <Title style={{marginTop: 52, marginBottom: 12}}>
              이메일
            </Title>
            <MobileInput>
              <InputComponent
                width={"100%"}
                placeholder="이메일을 입력해주세요."
                onChange={this.emailChange}
              />
            </MobileInput>
          </>
          ) }
          <Tail style={{marginTop: 12}}>
            * 컨설팅을 위한 사전 준비 사항을 E-mail로 보내드립니다.
          </Tail>
        </ScheduleBox>
        <CardFooter>
          <CheckBoxWrapper>
            <CheckBoxComponent
              onChange={this.checkboxChange_policy}
              checked={this.state.policy_agree}>
              <span style={{fontSize: 13}}>
                  <Link target="_blank" href="/term/policy">이용약관 및 개인정보 처리방침</Link>
                  에 동의합니다.
              </span>
            </CheckBoxComponent>
          </CheckBoxWrapper>
          <CheckBoxWrapper>
            <CheckBoxComponent
              checked={this.state.marketing_agree}
              onChange={this.checkboxChange_marketing}>
              <span style={{fontSize: 13}}>
                <span class="bold" onClick={this.openMarketingModal}>마케팅 정보 수신</span>에 동의합니다.
              </span>
            </CheckBoxComponent>
          </CheckBoxWrapper>
          <CustomButton onClick = {this.createSchedule}>
            1:1 컨설팅 신청
          </CustomButton>
        </CardFooter>
        <div>
        <MarketingModal
          open={this.state.open_marketing_modal}
          handleClose={this.handleClose}
        />
      </div>
      </Card>
    )
  }
}

export default MobileStep4Container;

const MobileInput = styled.div`
  .InputBox {
    width: 100%;
    object-fit: contain;
    border-radius: 3px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    background-color: #ffffff;
  }
`
const Card = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  object-fit: contain;
  background-color: white;
`
const Header = styled.div`
  font-family: Roboto;
  color: #0a2165;
  position: relative;
  font-size: 16px;
  width: 122px;
  height: 46px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.13;
  letter-spacing: -0.4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
const ContentBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const ScheduleBox = styled.div`
`
const Title = styled(Content.FontSize17)`
  font-size: 17px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.88;
  letter-spacing: -0.43px;
  text-align: left !important;
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
const TimeComponent = styled.div`
  width: 99px;
  height: 43px;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.deactive ? "#e1e2e4" : "white"};
  pointer-events:${(props) => props.deactive && "none"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.22;
  letter-spacing: -0.45px;
  text-align: left;
  color: ${(props) => props.deactive ? "#c6c7cc" : (props.focused ? '#0933b3' : "#282c36")};
  margin-right: 19px;
  border: ${(props) => (props.focused ? "solid 1px #0933b3" : "none")};
  :focus {
    outline: none;
  }
`
const Tail = styled(Content.FontSize13)`
  display: flex;
  align-items: center;
  height: 19px;
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.62;
  letter-spacing: -0.33px;
  text-align: left;
  color: #414550;
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
  width: 202px !important;
  height: 50px !important;
  margin-top: 18px;
  margin-bottom: 120px;
  font-family: NotoSansCJKkr;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.27;
  letter-spacing: -0.38px;
  text-align: center;
  color: #ffffff;
`
const TimeBox = styled.div`
  width: 100%;
  height: 65px;
  position: absolute;
  overflow: scroll;
  > div {
    display: inline-flex;
  }
`
const CheckBoxWrapper = styled.div`
  font-size: 13px !important;
  font-weight: bold !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 1.54 !important;
  letter-spacing: -0.33px !important;
  text-align: center !important;
  color: #282c36 !important;
  > label {
    margin: 0px;
  }
  .MuiSvgIcon-root {
    width: 14px !important;
    height: 14px !important;
  }
  > span {
    font-size: 16px;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: -0.16px;
    text-align: left;
    color: #282c36;
    .MuiIconButton-label {
      color: #c7c7c7;
    }
  }
  .bold {
    font-weight: bold;
  }
`
const Link = styled.a`
  font-size: 13px;
  color: #191919;
  display: inline-block;
  font-weight: bold;
  text-decoration: none;
`;

