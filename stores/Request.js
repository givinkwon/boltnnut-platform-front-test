import { observable, action } from "mobx";

import * as CategoryAPI from "axios/Category";
import * as PartnerAPI from 'axios/Partner';
import * as RequestAPI from "axios/Request";
import Router from "next/router";

class Request {
  @observable client_id = -1;
  @observable select_reqs = [];

  @observable id = null;
  @observable tab = 0;
  @observable type = "";
  @observable step = 0;

  @observable created_request = null;
  @observable check_list = [];

  // maincategory
  @observable big_category_list = [];
  @observable mid_category_list = [];
  @observable small_category_list = [];

  @observable q_big = "";
  @observable q_mid = "";

  @observable selected = [];

  @observable select_big = null;
  @observable select_mid = null;
  @observable select_small = null;

  @observable initial_contents = [];
  @observable contents = [];

  @observable category_id = 0;
  @observable category_middle_set = [];

  @observable common_email = "";
  @observable common_content = "";
  @observable common_period = "";
  @observable common_price = "";

  @observable search_mode = '';
  @observable partners = [];
  @observable partners_next = null;

   // save_writed_request
  @observable input_name = "";
  @observable input_phone = "";
  @observable input_content = "";

  @observable input_day = null; // 개발기간
  @observable input_price = null; // 가격
  @observable common_file = null; // 첨부 파일

  //new
  @observable current_index = 1;
  @observable prev_index = 1;
  @observable page_index = 1;
  @action addIndex = () => {
    this.page_index += 1;
  }
  @action setCurrentIndex = () => {
    this.prev_index = this.current_index;
    this.current_index = this.page_index;
    console.log(this.page_index)
  }
  @action goPrevIndex = () => {
    this.page_index = this.prev_index;
    this.current_index = this.prev_index;
  }
  @action setInputName = (val) => {
    this.input_name = val;
    console.log(val);
  };
  @action setType = (val) => {
    this.type = val;
  };
  @action setTab = (val) => {
    this.tab = val;
  };
  @action setStep = (val) => {
    this.step = val;
  };
  @action setInputPhone = (val) => {
    this.input_phone = val;
  };
  @action setPrice = (val) => {
    this.input_price = val;
  }
  @action setDue = (val) => {
    this.input_day = val;
  }
  @action setCommonFile = (obj) => {
    console.log(typeof obj)
    if (typeof obj == 'object') {
      this.common_file = obj;
      console.log("file uploaded")
    } else {
      this.common_file = null;
      console.log(this.common_file)
    }
  }


  @action init = (q) => {
    CategoryAPI.getMainCategory()
      .then((res) => {
        this.big_category_list = res.data.results;

        for(let i = 0; i < this.big_category_list.length; i++) {
          for(let j = 0; j < this.big_category_list[i].category_set; j++) {
            this.initial_contents.push(this.big_category_list[i].category_set[j].subclass_set)
          }
        }
        //this.setQuery(q);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  console.log(this.big_category_list)
  };
  @action setBigCategory = (obj) => {
    this.select_big = obj;
    this.select_mid = null;
    this.select_small = null;

    if(obj.category_set[0] && obj.category_set[0].category !== '전체보기') {
      console.log(obj.category_set[0])
      console.log('전체보기 추가')
      obj.category_set.push(
        {
          id: obj.id,
          maincategory: obj.maincategory,
          category: '전체보기',
          category_set: obj.category_set,
          subclass_set: [],
        }
      )
      const tmp = obj.category_set[0];
      obj.category_set[0] = obj.category_set[obj.category_set.length - 1]
      obj.category_set[obj.category_set.length - 1] = tmp
    }

    this.mid_category_list = obj.category_set;
    this.small_category_list = [];
    var contents = [];
    for (const item of obj.category_set) {
      contents = [...contents, ...item.subclass_set];
    }
    this.contents = contents;
    window.history.pushState("", "", `/request`);
  };
  @action setMidCategory = (obj) => {
    if(obj.category === '전체보기') {
      this.setBigCategory(obj)
      return
    }

    this.select_mid = obj;
    this.select_small = null;
    this.small_category_list = obj.subclass_set;

    this.contents = obj.subclass_set;
    window.history.pushState(
      "",
      "",
      `/request`
      //`/request?big=${obj.maincategory}&mid=${obj.id}`
    );
  };
  @action setSmallCategory = (obj) => {
    this.select_small = obj;
    this.contents = [obj];

    // 자동으로 넘기기
    Router.push(`/request/${obj.id}`)
  };
  @action setCategoryMiddleSet = (id, category) => {
    const index = this.category_middle_set.indexOf(id);
    if (this.category_id === category) {
      if (index > -1) {
        this.category_middle_set.splice(index, 1);
        this.category_middle_set = [...this.category_middle_set];
        if (this.category_middle_set.length === 0) {
          this.category_id = 0;
        }
      } else {
        this.category_middle_set = [id, ...this.category_middle_set];
      }
    } else {
      this.category_id = category;
      this.category_middle_set = [id];
    }
  };
  @action setFindCategory = (check_list) => {
    console.log("check_list : ", check_list);

    if (this.category_middle_set.length < 1) {
      alert("개발분야를 선택해주세요.");
    } else {
      for (var cate of check_list) {
        for (var dev of cate.develop_set) {
          console.log(this.category_middle_set)

          if (this.category_middle_set.indexOf(dev.id) > -1) {
            this.selected = [...dev.select_set, ...this.selected];
          }
        }
      }
      this.tab = 2;
    }
  };

  @action loadAppropriatePartners = () => {
    if(!this.created_request) { return; }
    const subclass = this.created_request.product.toString()

    const token = localStorage.getItem('token')
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      // params
      params: {
        subclass: subclass,
      }
    }

    PartnerAPI.matchPartner(req)
      .then(async (res) => {
        const req = {
          // headers
          headers: {
            Authorization: `Token ${token}`,
          },
          // params
          data: {
            ordering: '-avg_score',
            page: 1,
          }
        }

        if(res.data.data.length <= 3) {
          console.log('search로 가져올')
          this.search_mode = 'search'

          PartnerAPI.search(req)
            .then(res => {
              this.partners = res.data.results.slice(0, 5);
              console.log(res.data)
            })
            .catch(e => {
              console.log(e);
              console.log(e.response);
            })
        }
        else {
          this.search_mode = 'match'

          console.log('partner로 가져올게')
          this.partners = res.data.data
        }
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
  }
  @action loadNextPartners = () => {
    if(!this.partners_next) { return }

    const token = localStorage.getItem('token')
    const req = {
      // headers
      headers: {
        Authorization: `Token ${token}`,
      },
      nextUrl: this.partners_next,
    }

    PartnerAPI.getNextPage(req)
      .then(res => {
        this.partners = this.partners.concat(res.data.results)
        this.partners_next = res.data.next
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
  }

  @action setQuery = async (q) => {
    this.q_big = q.big ? q.big : "";
    this.q_mid = q.mid ? q.mid : "";
    if (q.mid) {
      const big_cate = this.big_category_list.filter(
        (obj) => obj.id === parseInt(q.big)
      );
      this.select_big = big_cate[0];

      console.log(big_cate[0])
      big_cate[0].category_set.push(
        {
          id: big_cate[0].id,
          maincategory: big_cate[0].maincategory,
          category: '전체보기',
          category_set: big_cate[0].category_set,
          subclass_set: [],
        }
      )
      const tmp = big_cate[0].category_set[0];
      big_cate[0].category_set[0] = big_cate[0].category_set[big_cate[0].category_set.length - 1]
      big_cate[0].category_set[big_cate[0].category_set.length - 1] = tmp

      this.mid_category_list = big_cate[0].category_set;
      const mid_cate = this.mid_category_list.filter(
        (obj) => obj.id === parseInt(q.mid)
      );
      this.select_mid = mid_cate[0];
      this.small_category_list = mid_cate[0].subclass_set;
      this.contents = mid_cate[0].subclass_set;
      return;
    } else {
      if (q.big) {
        const big_cate = this.big_category_list.filter(
          (obj) => obj.id === parseInt(q.big)
        );
        this.select_big = big_cate[0];

        big_cate[0].category_set.push(
          {
            id: big_cate[0].id,
            maincategory: big_cate[0].maincategory,
            category: '전체보기',
            category_set: big_cate[0].category_set,
            subclass_set: [],
          }
        )
        const tmp = big_cate[0].category_set[0];
        big_cate[0].category_set[0] = big_cate[0].category_set[big_cate[0].category_set.length - 1]
        big_cate[0].category_set[big_cate[0].category_set.length - 1] = tmp

        this.mid_category_list = big_cate[0].category_set;
        var contents = [];
        for (const item of big_cate[0].category_set) {
          contents = [...contents, ...item.subclass_set];
        }
        this.contents = contents;
      } else {
        window.history.pushState("", "", `/request`);
        //window.history.pushState("", "", `/request?big=&mid=`);
      }
    }
  };
}

export default new Request();
