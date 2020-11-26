import { observable, action } from 'mobx'

class Counter {
    @observable num = 0

    @action increase = () => {
        this.num++
    }
    @action decrease = () => {
        this.num--
    }
}

export default new Counter()