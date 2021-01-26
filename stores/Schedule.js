import { observable, action } from 'mobx';
import * as ScheduleAPI from "../axios/Schedule";

class Schedule {
    @observable data = [];
    @observable today = null;

    @action setTodayDate = (obj) => {
        this.today = obj
        console.log(obj.split(' ')[0]);
    }
    @action getOccupiedDate = (today) => {

    }
}

export default new Schedule()