import { observable, action, toJS, makeObservable } from "mobx";
import * as CategoryAPI from "axios/Account/Category";
import * as PartnerAPI from "axios/Manufacture/Partner";
import Project from "./Project";

class Cookie {
  constructor() {
    //makeObservable(this);
  }

  // 최근 본 파트너
  @observable partner_view_list = [];
  @observable deleteIdx = -1;

  @action add_partner_view = async (id) => {
    console.log(id);
    if (!this.partner_view_list.includes(parseInt(id))) {
      this.partner_view_list.push(parseInt(id));
    }

    console.log(toJS(this.partner_view_list));
  };

  @action delete_partner_view = async (id) => {
    this.deleteIdx = this.partner_view_list.indexOf(id);
    console.log(toJS(this.partner_view_list));
    this.partner_view_list.splice(this.deleteIdx, 1);
    console.log(toJS(this.partner_view_list));
  };

    // 최근 본 프로젝트
    @observable project_view_list = [];
    @observable deleteIdx = -1;
  
    @action add_project_view = async (id) => {
      console.log(id);
      if (!this.project_view_list.includes(parseInt(id))) {
        this.project_view_list.push(parseInt(id));
      }
  
      console.log(toJS(this.project_view_list));
    };
  
    @action delete_project_view = async (id) => {
      this.deleteIdx = this.project_view_list.indexOf(id);
      console.log(toJS(this.project_view_list));
      this.project_view_list.splice(this.deleteIdx, 1);
      console.log(toJS(this.project_view_list));
    };
    
    @observable recnet_project_list = [];

    // 최근 본 프로젝트 불러오기
    @action get_recent_project = () => {
      this.partner_view_list.map((item, idx) => {
        Project.getProjectDetail(item)
        this.recnet_project_list.append(Project.projectDetailData) 
      }
      )
    }
}

export default new Cookie();
