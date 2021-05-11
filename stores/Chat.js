import { observable, action, makeObservable } from "mobx";

class Chat {
  constructor() {
    makeObservable(this);
  }

  @observable current_time = null;
}

export default new Chat();
