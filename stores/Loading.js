import { observable, action } from 'mobx'
import * as PostAPI  from 'axios/post'

class Loading {
    @observable is_open = false;
    
    @action setOpen = (val) => {
        this.is_open = val
    }
}

export default new Loading()