import { observable, action } from "mobx";

class Loading {
  constructor() {
    //makeObservable(this);
  }
  @observable is_open = false;

  @action setOpen = (val) => {
    this.is_open = val;
  };
}

export default new Loading();
