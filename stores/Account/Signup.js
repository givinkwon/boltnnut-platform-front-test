import { observable, action } from "mobx";

class Signup {
  // observable
  @observable passwordInvalid = false;
  @observable realNameInvalid = false;
  @observable phoneInvalid = false;
  @observable company_nameInvalid = false;
  @observable titleInvalid = false;

  // action
  @action setEmail = (val) => {
    this.email = val;
  };
}

export default new Signup();
