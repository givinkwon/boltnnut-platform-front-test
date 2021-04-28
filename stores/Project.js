import { observable, action } from "mobx";

import * as ProjectAPI from "axios/Project";
import * as AccountAPI from "axios/Account";
import * as CategoryAPI from "axios/Category";


class Project {
@observable projectDataList = [];
@observable project_next = null;
@observable project_count = null;
@observable current_user_id = null;
@observable project_length = null;
@observable project_page = null;
@observable currentPage = 1;

@observable projectCategoryData = [];
@observable category = null;
@observable maincategory = null;
@observable categoryname = [];
@observable projectBigCategoryData = [];
@observable maincategoryname = [];


  @action init = (clientId) => {    
        
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
      return;
    }
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
    this.projectDataList = [];

    this.category=null;

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
        this.projectDataList = res.data.results;
        this.project_next = res.data.next;        
        this.project_count = res.data.count;                  
        this.project_page = parseInt((this.project_count-1)/5) + 1;
        this.category = res.data.results[0].request_set[0].product;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    CategoryAPI.getCategoryMiddle(req)
    .then((res) => {
      this.projectCategoryData = res.data.results;
      this.project_next = res.data.next;        
      this.project_count = res.data.count;  
      this.maincategory = res.data.results[10].maincategory;
      this.categoryname = this.projectCategoryData.category;
    })
    CategoryAPI.getMainCategory(req)
    .then((res) =>{
      this.projectBigCategoryData = res.data.results;
      this. maincategoryname = this.projectBigCategoryData.maincategory;
        
    })
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
