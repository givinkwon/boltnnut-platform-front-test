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
    active1: null,
    targetDay: null
  }
  Days = (firstDayFormat) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
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
    let day = e;
    if (day == this.state.active1) {
      return true;
    } else {
      return null
    }
  }
  calendarOnOff = (e) => {
    const { Schedule } = this.props;
    let targetDay = e.target.innerHTML;
    let day = e.currentTarget.innerHTML.replace(/[^0-9]/g,'');
    this.setState({ ...this.state, active1: targetDay});
    const dayValue = Schedule.nowMoment;
    Schedule.setTodayDate(dayValue.date(day).format("YYYY-MM-DD "));
  }
  mapDaysToComponents = (Days, fn = () => { }) => {
    const { Schedule } = this.props;
    const occupied = Schedule.date_occupied;

    return Days.map((dayInfo, i) => {
      let className = "date-weekday-label";
      let thisMoment = moment();
      if (!Schedule.nowMoment.isSame(dayInfo.yearMonthDayFormat,'month')) {
        className = "not-month";
      }
      else if (i === 0) {
        className = "date-sun";
      }
      else if (i === 6) {
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
      else if (this.state.active1 == dayInfo.getDay) {
        className = "clicked-day";
      }
      if (dayInfo.yearMonthDayFormat === moment().format("YYYY-MM-DD") && Schedule.nowMoment.format('M') === dayInfo.getMonth) {
        className += "today";
        return (
          <div className={className} onClick={this.calendarOnOff}>
            {dayInfo.getDay}
            <div>오늘</div>
          </div>
        )
      }
      else {
        return (
          <div className={className} onClick={this.calendarOnOff}>
            {dayInfo.getDay}
          </div>
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
    for (let i = 0; i < 6; i++) {
      Weeks.push((
        <Week firstDayOfThisWeekformat={firstDayOfWeek.clone().add('d', i * 7).format("YYYY-MM-DD")} />
      ))
    }
    return Weeks;
  }
  render() {
    const { now } = this.state;
    return (
      <>
        <MainContainer>
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
  width: 347px;
  height: 451px;
  margin-top: 6px;
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
  height: 14px;
  font-family: Roboto;
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
    font-family: NotoSansCJKkr;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.55px;
    color: #282c36;
  }
  .date-sun {
    color: #c6c7cc;
  }
  .date-sat {
    color: #c6c7cc;
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
  > div {
    background-color: ${(props) => props.focused ? `#0933b3` : `white`};
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
    font-family: Roboto;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.18px;
    > div {
      display: ${(props) => props.focused ? "none" : "block"};
      font-family: Roboto;
      line-height: 1.4;
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.12px;
      color: #282c36;
    }
  }
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
  .date-weekday-labeltoday {
    > div {
      margin-top: 25px;
      position: absolute;
      color: #0933b3;
      font-family: NotoSansCJKkr;
      font-size: 10px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: -0.25px;
    }
  }
  .not-book {
    pointer-events: none;
    color: #c6c7cc;
  }
  .not-booktoday {
    pointer-events: none;
    color: #0933b3;
    > div {
      position: absolute;
      margin-top: 38px;
      color: #0933b3;
    }
    //pointer-events: none;
    //background-color: #e1e2e4;
    //> div {
    //  position: absolute;
    //  margin-top: 38px;
    //  color: #e1e2e4;
    //}
  }
  .clicked-day {
    background-color: blue;
  }
`
const Test = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.focused ? "#0933b3" : "white")};
  color: ${(props) => props.focused ? "white" : "#282c36"};
`
