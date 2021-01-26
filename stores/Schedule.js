import { observable, action } from 'mobx';
import * as ScheduleAPI from "../axios/Schedule";
import moment from "moment";

class Schedule {
    @observable data = [];
    @observable today = null;
    @observable inactive_today = [];

    @action init = () => {
        today_date = new moment();
        this.today = today_date.format('YYYY-MM-DD 10:00:00');
    }
    @action setTodayDate = (obj) => {
        this.today = obj;
        this.inactive_today = [];
    }
    @action getOccupiedDate = () => {
        let req = {
            today: this.today.split(' ')[0]
        }
        ScheduleAPI.getOccupiedToday(req).then((res)=>{
            for (let i in res.data) {
                this.inactive_today.push(res.data[i].time.split("T")[1].split(":")[0] + ":" + res.data[i].time.split("T")[1].split(":")[1]);
            }
        }).catch(
            (error) => console.log(error)
        )
    }
}

export default new Schedule()