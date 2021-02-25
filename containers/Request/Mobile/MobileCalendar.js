import styled from 'styled-components';
import React, { Component } from 'react';
import moment from "moment";
import { inject, observer } from 'mobx-react';
const prevMonth = "/static/images/request/Calendar/MobilePrevMonth.svg";
const nextMonth = "/static/images/request/Calendar/MobileNextMonth.svg";
// const dropdown = '/static/images/request/Step4/dropdown.png';


@inject('Request', 'Schedule')
@observer
class Week extends Component {
  state = {
    now: moment(),
  }
  Days = (firstDayFormat) => {
    const days = [];
    for (let i = 0; i < 42; i++) {
      const Day = moment(firstDayFormat).add('d', i);
      days.push({
        yearMonthDayFormat: Day.format("YYYY-MM-DD"),
        holyDayCompare: Day.format("MM-DD"),
        getDay: Day.format('D'),
        getMonth: Day.format('M'),
        getYear: Day.format('YYYY'),
        isHolyDay: false,
      });
    }
    return days;
  }
  focusFunction = (e) => {
    const { Schedule } = this.props;
    let day = e;
    if (day == Schedule.active1) {
      return true;
    } else {
      return false;
    }
  }
  calendarOnOff = (e) => {
    const { Schedule } = this.props;
    let targetDay = e.target.innerHTML.replace(/[^0-9]/g,'');
    let day = e.currentTarget.innerHTML.replace(/[^0-9]/g,'');
    Schedule.setActive1(targetDay);
    const dayValue = Schedule.nowMoment;
    Schedule.setTodayDate(dayValue.date(day).format("YYYY-MM-DD "));
  }
  mapDaysToComponents = (Days, fn = () => { }) => {
    const { Schedule } = this.props;
    console.log(Schedule.today);
    const occupied = Schedule.date_occupied;

    return Days.map((dayInfo, i) => {
      let className = "date-weekday-label";
      let thisMoment = moment();
      if (!Schedule.nowMoment.isSame(dayInfo.yearMonthDayFormat,'month')) {
        className = "not-month";
      }
      else if (i % 7 == 0) {
        className = "date-sun";
      }
      else if (i % 7 == 6) {
        className = "date-sat";
      }
      else if (parseInt(thisMoment.format('D')) > parseInt(dayInfo.getDay) && parseInt(thisMoment.format("M")) == parseInt(dayInfo.getMonth) && parseInt(thisMoment.format("Y")) == parseInt(dayInfo.getYear)) {
        className = "not-day";
      }
      else if (parseInt(thisMoment.format('M')) > parseInt(dayInfo.getMonth)) {
        className = "not-day";
      }
      else if (parseInt(thisMoment.format('YYYY')) > parseInt(dayInfo.getYear)) {
        className = "not-day";
      }
      else if (occupied.includes(dayInfo.yearMonthDayFormat)) {
        className = "not-book";
      }
      if (dayInfo.yearMonthDayFormat === moment().format("YYYY-MM-DD") && Schedule.nowMoment.format('M') === dayInfo.getMonth) {
        className += "today";
        return (
          <Day className={className} onClick={ this.calendarOnOff } focused={ this.focusFunction(dayInfo.getDay) }>
            {dayInfo.getDay}
            <div>오늘</div>
          </Day>
        )
      }
      else {
        return (
          <Day className={className} onClick={ this.calendarOnOff } focused={ this.focusFunction(dayInfo.getDay) }>
            {dayInfo.getDay}
          </Day>
        )
      }
    })
  }
  render() {
    return (
      <>
        {this.mapDaysToComponents(this.Days(this.props.firstDayOfThisWeekformat))}
      </>
    )
  }
}

@inject('Schedule')
@observer
class MobileCalendar extends Component {
  state= {
    now: moment(),
  }
  componentDidMount() {
    const { Schedule } = this.props;
    this.setState({
      now : Schedule.nowMoment,
    })
  }
  moveMonth = (month) => {
    const { Schedule } = this.props;
    Schedule.nowMoment.add(month, 'M');
    Schedule.setTodayDate(this.state.now.format("YYYY-MM-01 "));
    Schedule.setActive1(null);
    this.setState({
      now : Schedule.nowMoment,
    })
  }
  //요일
  dateToArray = (dates) => {
    if (Array.isArray(dates)) {
      return dates;
    }
    else if (typeof dates === "string") {
      return dates.split(',')
    }
    else{
      return ["일", "월", "화", "수", "목", "금", "토"]
    }
  }
  mapArrayToDate = (dateArray) => {
    if (dateArray.length !== 7){
      dateArray = ["일", "월", "화", "수", "목", "금", "토"];
    }
    return dateArray.map((date, index) => {
      const className = () => {
        if (index === 0){
          return "date-sun";
        }
        else if(index === 6) {
          return "date-sat";
        }
        else {
          return "date-weekday";
        }
      }
      return (
        <div className={className()}>
          {date}
        </div>
      )
    })
  }

  // 날짜 입력
  Weeks = (monthYear) => {
    const firstDayOfMonth = moment(monthYear).startOf('month');
    const firstDateOfMonth = firstDayOfMonth.get('d');
    const firstDayOfWeek = firstDayOfMonth.clone().add('d', -firstDateOfMonth);
    const Weeks = [];
    Weeks.push((
      <Week firstDayOfThisWeekformat={firstDayOfWeek.format("YYYY-MM-DD")} />
    ));
    return Weeks;
  }
  render() {
    const { now } = this.state;
    return (
      <>
        <MainContainer>
          <div>
            <Header>
              <div onClick={() => this.moveMonth(-1)}><img src={ prevMonth }/></div>
              <HeaderText>{now.format("YYYY.MM")}</HeaderText>
              <div onClick={() => this.moveMonth(1)}><img src={ nextMonth }/></div>
            </Header>
            <DateContainer>
              {this.mapArrayToDate(this.dateToArray(this.props.dates))}
            </DateContainer>
            <CalendarContainer>
              {this.Weeks(now)}
            </CalendarContainer>
          </div>
        </MainContainer>
      </>
    )
  }
}

export default MobileCalendar;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 451px;
  margin-top: 6px;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 347px;
    height: 451px;
  }
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 127px;
  margin-bottom: 38px;
  margin-top: 20px;
  height: 27px;
`
const HeaderText = styled.span`
  height: auto;
  font-family: Roboto-iOS;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.7px;
  color: #282c36;
`
const DateContainer = styled.div`
  width: 347px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 16px;
  > div {
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.55px;
    color: #282c36;
  }
  .date-sun {
    color: #c6c7cc;
    pointer-events: none;
  }
  .date-sat {
    color: #c6c7cc;
    pointer-events: none;
  }
`
const Day = styled.div`
  background-color: ${(props) => props.focused ? "#0933b3" : "white"};
  color: ${(props) => props.focused ? "white" : "#282c36"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  margin-left: 7px;
  margin-top: 10px;
  font-family: Roboto-iOS;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.18px;
  > div {
    pointer-events: none;
    margin-top: 25px;
    position: absolute;
    color: #0933b3;
    font-size: 10px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.25px;
  }
`
const CalendarContainer = styled.div`
  width: 347px;
  display: grid;
  height: 315px;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  .date-sun {
    color: #c6c7cc;
    pointer-events: none;
  }
  .date-sat {
    color: #c6c7cc;
    pointer-events: none;
  }
  .not-month {
    visibility: hidden;
    pointer-events: none;
    color: #c6c7cc;
    }
  .not-day {
    pointer-events: none;
    color: #c6c7cc;
  }
  .not-book {
    pointer-events: none;
    color: #c6c7cc;
  }
  .not-booktoday {
    pointer-events: none;
    color: #c6c7cc;    
    > div {
      position: absolute;
      margin-top: 38px;
      color: #0933b3;
    }
  }
  .date-weekday-labeltoday {
    pointer-events: none;
    color: #c6c7cc;
    > div {
      position: absolute;
      margin-top: 38px;
      color: #0933b3;
    }
  }
`
