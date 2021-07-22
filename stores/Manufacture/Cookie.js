import { observable, action, toJS, makeObservable } from "mobx";

import * as CategoryAPI from "axios/Account/Category";
import * as PartnerAPI from "axios/Manufacture/Partner";
import { isConstructorDeclaration } from "typescript";
import NoneDrawingConsultingContainer from "containers/Manufacture/Request/NoneDrawingConsulting";

class Cookie {
  constructor() {
    //makeObservable(this);
  }

  // 최근 본 파트너
  @observable partner_view_list = [];

  @action add_partner_view = async (id) => {
    // console.log(id);
    this.partner_view_list.push(id);

    // console.log(toJS(this.partner_view_list))
  };
}

export default new Cookie();
