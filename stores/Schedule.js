import { observable, action } from 'mobx';
import * as ScheduleAPI from "../axios/Schedule";
import moment from "moment";
import STLViewer from 'stl-viewer';

class Schedule {
    @observable today = null; // 오늘 날짜
    @observable current = "10:00:00"; // 현재시간
    @observable inactive_today = []; // 선택된 날짜 + current ~ 선택된 날짜 19:00:00.00 까지 안 되는 시간들
    @observable book_time = null; // today + current (2021-11-11 10:00:00)
    @observable nowMoment = moment();
    @observable calendarOnOff = true;
    @observable clickDay = 0;
    @observable date_occupied = [];
    @observable alldayOfMonth = [];

    @action init = () => {
        let today_date = new moment();
        this.today = today_date.format('YYYY-MM-DD ');
        this.book_time = this.today + this.current;

        this.getOccupiedDate();
        this.getDays();
    }
    @action setTodayDate = (obj) => {
        this.today = obj;
        this.current = "10:00:00"
        this.book_time = this.today + this.current
        this.getDays();
        this.getOccupiedDate();
    }
    @action setCurrent = (obj) => {
        this.current = obj;
        this.book_time = this.today + this.current;
    }
    @action getOccupiedDate = () => {
        this.inactive_today = [];
        let req = {
            today: this.today
        }
        ScheduleAPI.getOccupiedToday(req).then((res)=>{
            for (let i in res.data.data) {
                this.inactive_today.push(res.data.data[i].split("T")[1].split(":")[0] + ":" + res.data.data[i].split("T")[1].split(":")[1]);
            }
        }).catch(
            (error) => console.log(error)
        )
    }
    @action submitSchedule = (req) => {
        let formData = new FormData();
        formData.append("request", req.req_num);
        formData.append("client", req.client);
        formData.append("startAt", this.book_time);
        formData.append("endAt", ); // 미완
    }
    @action fullDateCheck = (obj) => {
        let fullday = [];
        console.log(obj);

        for (let i in obj) {
            let req = {
                today: obj[i],
            }
            ScheduleAPI.getOccupiedToday(req).then((res) => {
                if (res.data.data.length == 8) {
                    this.date_occupied.push(req.today)
                }
            }).catch(
                (error) => console.log(error)
            )
        }
    }
    @action getDays = (month) => {
        console.log(this.today);
        console.log(new moment());
    }
}

export default new Schedule()
