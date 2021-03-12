import { observable, action } from "mobx";

import * as ProjectAPI from "axios/Project";
import * as AccountAPI from "axios/Account";

class Project {
@observable projectData = [];
@observable projectDataList = [];
@observable project_next = null;
@observable project_count = null;
@observable current_user_id = null;
@observable project_length = null;
@observable project_page = null;
@observable currentPage = 1;
@observable user = null;
@observable moveRenderingFlag = true;

  @action init = (clientId) => {    
    this.projectData = []
    this.project_next = null
    this.current_user_id = null
    this.project_count = null
    this.project_length = null
    this.project_page = null
    this.currentPage = -1
    this.moveRenderingFlag = true
    this.projectDataList = [];
        
    const token = localStorage.getItem('token')
  
    const req = {            
      params: {
        client: clientId,      
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    }
       
    ProjectAPI.getProjects(req)
        .then((res) => {
          // this.projectDataList = res.data;
          this.projectData = res.data.results          
          this.project_next = res.data.next        
          this.project_count = res.data.count;        
          this.project_page = parseInt((this.project_count-1)/5) + 1
        });            
  }

  @action getNextPage = (clientId, callback = null) => {
    if (!this.project_next) {
      console.log("000000")
      return;
    }
    console.log("getNextPage() in Test.js");
    const token = localStorage.getItem("token");
    const req = {
      nextUrl: this.project_next,
      params: {
        client: clientId,
        // page: page
      },
      headers: {
       //  Authorization: `Token ${token}`,
      },
    };

    ProjectAPI.getNextPage(req)
      .then((res) => {        
        console.log(res.data.results);
                
        this.projectData = this.projectData.concat(res.data.results);
        this.project_next = res.data.next;
        // console.log(this.projectData)
        //this.project_page = parseInt(this.project_count/5) + 1
        if(callback) {
          callback()
        }


      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };


  @action getPage = (clientId, page=1) => {  
    this.projectData = [];
    this.projectDataList = [];
    this.project_next = null;
    this.project_count = null;
    this.current_user_id = null;
    this.project_length = null;
    this.project_page = null;
    this.currentPage = 1;
    this.moveRenderingFlag = true;

    console.log(clientId)
    if (!clientId) {  
      return;
    }
    const token = localStorage.getItem("token");
    const req = {
      // nextUrl: this.project_next,
      params: {
        client: clientId,
        page: page,        
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    ProjectAPI.getProjects(req)
      .then((res) => {                
        // console.log(res.data.results);                
        this.projectDataList = res.data.results;
        this.project_next = res.data.next;        
        this.project_count = res.data.count;                  
        this.project_page = parseInt((this.project_count-1)/5) + 1
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getToken = () => {    
    const token = localStorage.getItem('token')
    // console.log(localStorage)
    const req = {
      headers: {
        'Authorization': `Token ${token}`,
      }
    }

    AccountAPI.reloadUserInfo(req)
    .then(res => {
      this.current_user_id = null        
      // 가입자 아이디
      this.current_user_id = res.data.data.User.id 
      console.log(this.current_user_id)
      //this.current_user_id = 917
      //this.current_user_id = 23
      //this.current_user_id = res.data.data.Client[0].id
    })
  } 
}



export default new Project()
