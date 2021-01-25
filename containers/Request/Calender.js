import styled from 'styled-components';
import { Component, useRef } from 'react';
import moment from "moment";
const prevMonth = "/static/images/request/Calendar/prevMonth.png";
const nextMonth = "/static/images/request/Calendar/nextMonth.png";

class Week extends Component {
  Days = (firstDayFormat) => {
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
        <div className={className} onClick={() => fn(dayInfo.yearMonthDayFormat)}>
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
        }else {
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
    return (
      <MainContainer>
        <Header>
          <div onClick={() => this.moveMonth(-1)}><img src={ prevMonth }/></div>
          <HeaderText>{this.state.today.format("YYYY")}</HeaderText>
          <Month>{this.state.today.format("M")}</Month>
          <HeaderText>{this.state.today.format("MMM")}</HeaderText>
          <div onClick={() => this.moveMonth(1)}><img src={ nextMonth }/></div>
        </Header>
        <DateContainer>
          {this.mapArrayToDate(this.dateToArray(this.props.dates))}
        </DateContainer>
        <CalendarContainer onClick={(e) => console.log(e.target)}>
          {this.Weeks(this.state.today)}
        </CalendarContainer>
      </MainContainer>
    )
  }
}

export default Calendar;
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
    border: solid 0.5px #c6c7cc;
    border-collapse: collapse;
  }
  .date-sun {
    color: #f52100;
  }
  .date-sat {
    color: #0933b3;
  }
`
