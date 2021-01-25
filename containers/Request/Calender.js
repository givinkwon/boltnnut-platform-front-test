import styled from 'styled-components';
import { Component, useRef } from 'react';
import moment from "moment";

class Week extends Component {
  Days = (firstDayFormat) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const Day = moment(firstDayFormat).add('d', i);
      days.push({
        yearMonthDayFormat: Day.format("YYYY-MM-DD"),
        getDay: Day.format('D'),
        isHolyDay: false
      });
    }
    return days;
  }
  mapDaysToComponents = (Days, fn = () => { }) => {
    return Days.map((dayInfo, i) => {
      let className = "date-weekday-label";
      if (i === 0) {
        className = "date-sun";
      }
      else if (i === 6) {
        className = "date-sat"
      }

      return (
        <div className={"RCA-calendar-day " + className} onClick={() => fn(dayInfo.yearMonthDayFormat)}>
            {dayInfo.getDay}
        </div>
      )
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
class Calendar extends Component {
  state = {
    calendarYM : moment(),
    today : moment()
  }
  moveMonth = (month) => {
    this.setState({
      calendarYM : this.state.calendarYM.add(month,'M'),
      today : this.state.today.add(month,'M' )
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
        let className = "RCA-calendar-date-component";
        if (index === 0){
          return className + " date-sun"
        }
        else if(index === 6) {
          return className + " date-sat"
        }else {
          return className + " date-weekday"
        }
      }
      return (
        <div className={className()} key={"RCA-header-"+date}>
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
    return (
      <>
        <Header>
          <button onClick={() => this.moveMonth(-1)}>이전</button>
          <div>{this.state.today.format("YYYY")}</div>
          <div>{this.state.today.format("MM")}</div>
          <div>{this.state.today.format("MMM")}</div>
          <button onClick={() => this.moveMonth(1)}>다음</button>
        </Header>
        <DateContainer>
          {this.mapArrayToDate(this.dateToArray(this.props.dates))}
        </DateContainer>
        <CalendarContainer onClick={(e) => console.log(e.target)}>
          {this.Weeks(this.state.today)}
        </CalendarContainer>
      </>
    )
  }
}

export default Calendar;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 182px;
`
const DateContainer = styled.div`
  width: 714px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
    border: solid 0.5px #c6c7cc;
    border-collapse: collapse;
  }
`
