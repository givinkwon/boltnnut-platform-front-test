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
    console.log(id);
    if (!this.partner_view_list.includes(parseInt(id))) {
      this.partner_view_list.push(parseInt(id));
    }

    console.log(toJS(this.partner_view_list));
  };

  @action delete_partner_view = async (id) => {
    deleteIdx = this.city_selected.indexOf(id);
    this.city_selected.splice(deleteIdx, 1);
  };
}

export default new Cookie();
