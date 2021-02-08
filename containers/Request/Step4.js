import styled from 'styled-components';
import * as Content from '../../components/Content';
import { Component } from 'react';
import Calendar from './Calender';
import InputComponent from 'components/Input2';
import CheckBoxComponent from 'components/CheckBox';
import Buttonv1 from 'components/Buttonv1';
import moment from "moment";
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill

// Marketing Modal
import MarketingModal from './MarketingModal';

const dropdown = '/static/images/request/Step4/dropdown.png';

@inject('Schedule', 'Request')
@observer
class Step4Container extends Component {
  state = {
    display: 'none', // display 는 FoldedComponent 기준
    display2: true, // display2 는 TimeBox 기준.
    display3: true, // display3은 컨설팅 유형 기준
    current: null, // FoldedComponent에 넣을 현재 상태(오전 11:00 등)
    inactive_array: [],
    userEmail: null,
    isOnline: 0, // 대면이면 0, 화상이면 1
    open_marketing_modal: false,
    policy_agree: true,
    marketing_agree: true
  }
  checkboxChange_policy = (e) => {
    this.setState({...this.state, policy_agree: e});
    console.log(this.state)
  }
  checkboxChange_marketing = (e) => {
    this.setState({...this.state, marketing_agree: e});
  }
  emailChange = (obj) => {
    this.setState({...this.state, userEmail: obj})
  }
  getTime = (hour) => {
    const { Schedule, Request } = this.props;
    return (Schedule.today) + (`${hour}:00`);
  }
  setTime = (e, date) => {
    const { Schedule } = this.props;
    let time = e.currentTarget.innerHTML;
    if (time == "10:00" || time == "11:00") {
      this.setState({...this.state, current: "오전 " + time, display: true, display2: 'none'}); // display 는 FoldedComponent 기준
      Schedule.setCurrent(time+":00");
      Schedule.getOccupiedDate();
    } else {
      this.setState({...this.state, current: "오후 " + time, display: true, display2: 'none'});
      Schedule.setCurrent(time+":00");
      Schedule.getOccupiedDate();
    }
  }
  handleDropDown = (idx) => {
    // idx == 2 면 스케쥴 시간, idx == 3 이면 컨설팅 유형 handle
    if (idx == 2) {
      this.setState({...this.state, display: 'none', display2: true})
    } else {
      this.setState({...this.state, display3: true})
    }
  }
  timeActiveToggle = (time) => {
    const { Schedule } = this.props;
    let nowTime = new moment();
    // console.log(time.split(' ')[1]);  ==> 10:00 과 같음.
    if (time) {
      if (Schedule.inactive_today.includes(time.split(' ')[1]) || (nowTime.format("HH") >= time.split(' ')[1].split(":")[0] && nowTime.format("DD") == time.split(' ')[0].split('-')[2])) {
        return true
      } else {
        return false
      }
    }
  }
  // 스케쥴 생성
  createSchedule = () => {
    const { Schedule, Request } = this.props;
    const { policy_agree } = this.state;

    if (!policy_agree) {
      alert("이용약관 동의에 체크해주세요.")
      break;
    }
    let req = {
      request: Request.created_request,
      email: this.state.userEmail,
      isOnline: this.state.isOnline,
      marketing: this.state.marketing_agree
    }
    Schedule.submitSchedule(req);
    Request.step_index = 5;
  }
  // 대면, 비대면 선택
  isOnlineHandler = (e) => {
    const { Schedule } = this.props;
    let targetWord = e.target.innerHTML;
    // 대면이면 0, 화상이면 1
    if (targetWord == "화상 미팅") {
      this.setState({...this.state, isOnline: 1, display3: false})
      Schedule.setOnline(1);
    } else {
      this.setState({...this.state, isOnline: 0, display3: false})
      Schedule.setOnline(0);
    }
  }
  handleClose =()=> {
    this.setState({...this.state, open_marketing_modal: false})
  }
  openMarketingModal = () => {
    this.setState({...this.state, open_marketing_modal: true})
  }
  render() {
    const { current, display, display2 } = this.state;
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
    return (
    <>
      <Card>
        <Header>1:1 컨설팅 신청</Header>
        <ContentBox>
          <Title>날짜</Title>
          <Calendar/>
        </ContentBox>
        <ScheduleBox>
          <Title style={{marginTop: 30, marginBottom: 6}}>
            시간
          </Title>
          <FoldedComponent onClick={()=>this.handleDropDown(2)} style={{display: display}}>
            {current}
            <img src={dropdown} />
          </FoldedComponent>
          <div style={{display: display2}}>
            <SubContent fontWeight = {'bold'}>
              오전
            </SubContent>
            <TimeBox style={{marginBottom: 30}}>
              {timeArr && timeArr.slice(0,2).map((data) => {
                  return (
                    <TimeComponent 
                      deactive={this.timeActiveToggle(data.start_at)} 
                      onClick={(event) => this.setTime(event, data.start_at)}
                    >
                      {data.start_at.split(' ')[1]}
                    </TimeComponent>
                  )
                })}
            </TimeBox>
            <SubContent fontWeight = {'bold'}>
              오후
            </SubContent>
            <TimeBox style={{marginBottom: 60}}>
                {timeArr && timeArr.slice(2,).map((data) => {
                  return (
                    <TimeComponent 
                      deactive={this.timeActiveToggle(data.start_at)} 
                      onClick = {(event) => this.setTime(event, data.start_at)}
                    >
                      {data.start_at.split(' ')[1]}
                    </TimeComponent>
                  )
                })}
            </TimeBox>
          </div>
          <Title style={{marginBottom: 9}}>
            컨설팅 유형
          </Title>
          {this.state.display3 ? (
            <div style={{display: 'inline-flex'}}>
              <TimeComponent onClick = {this.isOnlineHandler}>
                방문 미팅
              </TimeComponent>
              <TimeComponent onClick = {this.isOnlineHandler}>
                화상 미팅
              </TimeComponent>
            </div>
          ) : (
            <FoldedComponent onClick={() => this.handleDropDown(3)}>
              {this.state.isOnline == 1 ? "화상 미팅 " : "대면 미팅"}
              <img src={dropdown} />
            </FoldedComponent>
          )}
          <Tail>
            * 서울특별시 성북구 고려대로 27길 4, 3층 볼트앤너트
          </Tail>
          { !Request.has_email && (
          <>
            <Title style={{marginTop: 30}}>
              이메일
            </Title>
            <InputComponent
              width={"88.3%"}
              placeholder="이메일을 입력해주세요."
              onChange={this.emailChange}
            />
          </>
          ) }
          <Tail>
            *컨설팅을 위한 사전 준비 사항을 E-mail로 보내드립니다.
          </Tail>
        </ScheduleBox>
        <CardFooter>
          <CheckBoxWrapper>
            <CheckBoxComponent
              onChange={this.checkboxChange_policy}>
                <span>
                  <Link target="_blank" href="/term/policy">이용약관 및 개인정보 처리방침</Link>
                  에 동의합니다.
                </span>
            </CheckBoxComponent>
            <CheckBoxComponent
              onChange={this.checkboxChange_marketing}>
                <span>
                  <span class="bold" onClick={this.openMarketingModal}>마케팅 정보 수신</span>에 동의합니다.
                </span>
            </CheckBoxComponent>
          </CheckBoxWrapper>
          <CustomButton onClick={this.createSchedule}>
            무료 컨설팅 받기
          </CustomButton>
        </CardFooter>
      </Card>
      <div>
        <MarketingModal
          open={this.state.open_marketing_modal}
          handleClose={this.handleClose}
        />
      </div>
    </>
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
  width: 100%;
  display: inline-flex;
`
const TimeComponent = styled.div`
  width: 88px;
  height: 40px;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: ${(props) => props.deactive ? "gray" : "white"};
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
  color: #282c36;
  margin-right: 19px;
  :hover {
    border: ${(props) => props.deactive ? 'none' : "solid 3px #0933b3"};
  }
  :focus {
    border: ${(props) => props.deactive ? 'none' : "solid 3px #0933b3"};
  }
`
const Tail = styled(Content.FontSize14)`
  font-weight: 500;
  height: 24px;
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
const FoldedComponent = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  text-align: left;
  color: #282c36;
  width: fit-content;  
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  padding: 8px 16px;
  background-color: var(--white);
  margin-bottom: 30px;
  line-height: 1.3;
  > img {
    width: 14px;
    height: 8px;
    margin-left: 22px;
  }
`
const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  span {
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
  color: #191919;
  display: inline-block;
  font-weight: bold;
  text-decoration: none;
`;
