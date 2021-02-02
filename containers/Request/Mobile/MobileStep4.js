import styled from 'styled-components';
import * as Content from 'components/Content';
import { Component } from 'react';
import MobileCalendar from './MobileCalendar';
import InputComponent from 'components/Input2';
import CheckBoxComponent from 'components/CheckBox';
import Buttonv1 from 'components/Buttonv1';
import moment from "moment";
import { inject, observer } from 'mobx-react';
import Slider from 'react-slick';
import 'intersection-observer'; // polyfill

const dropdown = '/static/images/request/Step4/dropdown.png';

@inject('Schedule', 'Request')
@observer
class MobileStep4Container extends Component {
  state = {
    display: 'none', // display 는 FoldedComponent 기준
    display2: true, // display2 는 TimeBox 기준.
    current: null, // FoldedComponent에 넣을 현재 상태(오전 11:00 등)
    inactive_array: [],
  }
  checkboxChange = (e) => {
    console.log(e) // 에러피하기용 임시
  }
  emailChange = (obj) => {
    console.log(obj) // 에러피하기용 임시
  }
  getTime = (hour) => {
    const date = new moment();
    return (date.format('YYYY-MM-DD ') + date.format(`${hour}:00`));
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
  handleDropDown = () => {
    this.setState({...this.state, display: 'none', display2: true})
  }
  timeActiveToggle = (time) => {
    const { Schedule } = this.props;
    if (Schedule.inactive_today.includes(time)) {
      return true
    } else {
      return false
    }
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
    var settings = {
      dots: false,
      infinite: false,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      draggable: true,
      beforeChange: (current) => {
        this.setState({current: current})
      }
    };
    return (
      <Card>
        <ContentBox>
           <MobileCalendar/>
        </ContentBox>
        <ScheduleBox>
          <Title style={{marginTop: 30, marginBottom: 6}}>
            시간
          </Title>
          {/* <FoldedComponent onClick={()=>this.handleDropDown()} style={{display: display}}>
            {current}
            <img src={dropdown} />
          </FoldedComponent> */}
          <TimeBox style={{marginBottom: 56}}>
            <Slider {...settings}>
              {timeArr.map((data) => {
                return (
                  <TimeComponent deactive={this.timeActiveToggle(data.start_at.split(' ')[1])} onClick = {(event) => this.setTime(event, data.start_at)}>
                    {data.start_at.split(' ')[1]}
                  </TimeComponent>
                )
              })}
            </Slider>
          </TimeBox>
          <Title style={{marginBottom: 20}}>
            컨설팅 유형
          </Title>
          <div style={{display: 'inline-flex'}}>
            <TimeComponent>
              방문 미팅
            </TimeComponent>
            <TimeComponent>
              화상 미팅
            </TimeComponent>
          </div>
          <Tail>
            * 서울특별시 성북구 고려대로 30길 4, 2층 볼트앤너트
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

export default MobileStep4Container;


const Card = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: white;
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
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const ScheduleBox = styled.div`
  padding-left: 5.4%;
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
  width: 220px !important;
  height: 52px !important;
  margin-top: 30px;
  font-size: 20px !important;
  margin-bottom: 60px;
`
const TimeBox = styled.div`
  width: 100%;
  height: 64px;
  .slick-list {
    margin : 0;
    width: 100%;
    > div > div {
    }
    > div > div > div > div  {
      display: flex !important;
      align-items: center;
    }
`
