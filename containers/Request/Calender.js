import styled from 'styled-components';
import React, { Component, useRef } from 'react';
import moment from "moment";
import { inject, observer } from 'mobx-react';
import Step3Container from './Step3';
import Step4Container from './Step4';
import Containerv1 from '../../components/Containerv1';
const prevMonth = "/static/images/request/Calendar/prevMonth.png";
const nextMonth = "/static/images/request/Calendar/nextMonth.png";
const dropdown = '/static/images/request/Step4/dropdown.png';

@inject('Request', 'Schedule')
@observer
class Week extends Component {
  state = {
    now: moment()
  }
  Days = (firstDayFormat) => {
    const { Schedule } = this.props;
    const days = [];

    for (let i = 0; i < 7; i++) {
      const Day = moment(firstDayFormat).add('d', i);
      days.push({
        yearMonthDayFormat: Day.format("YYYY-MM-DD"),
        holyDayCompare: Day.format("MM-DD"),
        getDay: Day.format('D'),
        isHolyDay: false
      });
    }
    return days;
  }
  calendarOnOff = (e) => {
    const { Request, Schedule } = this.props;
      if (Schedule.calendarOnOff == true) {
        Schedule.calendarOnOff = false;
      }
      else {
        Schedule.calendarOnOff = true;
      }
      let day = e.currentTarget.innerHTML.replace(/[^0-9]/g,'');
      const dayValue = Schedule.nowMoment;

      Schedule.clickDay = dayValue.date(day).format("YYYY년 M월 D일");
      Schedule.setTodayDate(dayValue.date(day).format("YYYY-MM-DD "));
  }
  
  mapDaysToComponents = (Days, fn = () => { }) => {
    const { Schedule } = this.props;
    const { now } = this.state;

    return Days.map((dayInfo, i) => {
      let className = "date-weekday-label";
      if (!Schedule.nowMoment.isSame(dayInfo.yearMonthDayFormat,'month')) {
        className = "not-month";
      }
      else if (i === 0) {
        className = "date-sun";
      }
      else if (i === 6) {
        className = "date-sat"
      }
      if (dayInfo.yearMonthDayFormat === moment().format("YYYY-MM-DD")) {
        return (
          <div className={className} onClick={ this.calendarOnOff }>
            {dayInfo.getDay}
            <div>오늘</div>
          </div>
        )
      }
      else {
        return (
          <div className={className} onClick={ this.calendarOnOff }>
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
class Calendar extends Component {
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
      return ["일 SUN", "월 MON", "화 TUE", "수 WED", "목 THU", "금 FRI", "토 SAT"]
    }
  }
  mapArrayToDate = (dateArray) => {
    if (dateArray.length !== 7){
      dateArray = ["일 SUN", "월 MON", "화 TUE", "수 WED", "목 THU", "금 FRI", "토 SAT"];
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
  calendarOnOff = () => {
    const { Schedule } = this.props;
    if (Schedule.calendarOnOff == true) {
      Schedule.calendarOnOff = false;
    }
    else {
      Schedule.calendarOnOff = true;
    }
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
    const { Schedule } = this.props;
    return (
      <>
        { Schedule.calendarOnOff == true &&
          <MainContainer display1={ this.state.hid }>
            <Header>
              <div onClick={() => this.moveMonth(-1)}><img src={ prevMonth }/></div>
              <HeaderText>{now.format("YYYY")}</HeaderText>
              <Month>{now.format("M")}</Month>
              <HeaderText>{now.format("MMM")}</HeaderText>
              <div onClick={() => this.moveMonth(1)}><img src={ nextMonth }/></div>
            </Header>
            <DateContainer>
              {this.mapArrayToDate(this.dateToArray(this.props.dates))}
            </DateContainer>
            <CalendarContainer>
              {this.Weeks(now)}
            </CalendarContainer>
          </MainContainer>
        }
        { Schedule.calendarOnOff == false &&
        <FoldedComponent onClick={ this.calendarOnOff }>
          { Schedule.clickDay }
          <img src={dropdown} />
        </FoldedComponent>
        }
      </>
    )
  }
}

export default Calendar;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  width: 740px;
  height: 600px;
  margin-top: 6px;
`
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 254px;
  align-items: flex-end;
  margin-bottom: 20px;
`
const Month = styled.div`
  font-family: Roboto;
  font-size: 46px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -1.15px;
  color: #282c36;
  height: 36px;
`
const HeaderText = styled.div`
  font-family: Roboto;
  font-size: 24px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.6px;
  color: #282c36;
  height: 20px;
`
const DateContainer = styled.div`
  width: 714px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  > div {
    text-align: center;
    width: 102px;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.83;
    letter-spacing: -0.12px;
    font-family: NotoSansCJKkr;
  }
  .date-sun {
    color: #f52100;
  }
  .date-sat {
    color: #0933b3;
  }
`
const CalendarContainer = styled.div`
  width: 714px;
  display: grid;
  height: 480px;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  border-top: solid 2px #282c36;
  border-bottom: solid 2px #282c36;
  border-left: solid 2px #c6c7cc;
  border-right: solid 2px #c6c7cc;
  > div {
    padding: 8px;
    border: solid 0.5px rgba(198,199,204,0.5);
    border-collapse: collapse;
    font-family: Roboto;
    line-height: 1.4;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.12px;
    color: #282c36;
    > div {
      font-family: Roboto;
      line-height: 1.4;
      font-size: 12px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.12px;
      color: #282c36;
    }
    :hover {
      border: solid 2px #0933b3;
    }
    :focus { 
      border : solid 2px #0933b3;
    }
  }
  .date-sun {
    > div {
      color: #f52100;
    }
  }
  .date-sat {
    > div {
      color: #0933b3;
    }
  }
  .not-month {
    pointer-events: none;
    > div {
      color: rgba(198,199,204,0.5);
    }
  }
`
const FoldedComponent = styled.div`
  width: fit-content;
  font-family: NotoSansCJKkr;
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 8px 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: var(--white);
  margin-top : 6px;
  line-height: 1.3;
  > img {
    width: 14px;
    height: 8px;
    margin-left: 22px;
  }
`
