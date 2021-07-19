import { observable, action } from "mobx";

import * as MagazineAPI from "axios/Common/Magazine";
import * as CategoryAPI from "axios/Account/Category";
import Router from "next/router";

class Magazine {
  constructor() {
    //makeObservable(this);
  }
  @observable current = null;
  @observable magazine_list = [];
  @observable magazine_next = null;
  @observable magazine_length = null;
  @observable categoryAry = [];
  @observable mobileUpperCategoryAry = [];

  @observable mobileLowerCategoryAry = [];

  @observable category_checked_idx = 2;
  @observable category_detail_checked_idx = 0;

  @observable mobile_category_checked_idx = -1;
  @observable mobile_category_detail_checked_idx = 0;

  @observable checked = false;

  @observable current_page = 1;
  @observable full_page = 1;
  @observable mobile_full_page = 1;
  @observable next_page = 0;

  @observable search_text = "";

  //GA 트리거 한번만 작동하게 해주는 변수
  @observable dictClick = false;
  @observable manufactureClick = false;

  @action init = (search_text) => {
    this.magazine_list = [];
    const req = {
      params: {
        ordering: "-is_top, -id",
        search: search_text,
      },
    };
    MagazineAPI.getMagazine(req)
      .then(async (res) => {
        this.magazine_list = res.data.results;
        this.magazine_next = res.data.next;

        while (this.magazine_next) {
          const req = {
            nextUrl: this.magazine_next,
          };

          await MagazineAPI.getNextPage(req)
            .then((res) => {
              this.magazine_list = this.magazine_list.concat(res.data.results);
              this.magazine_next = res.data.next;
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        }
        console.log(`magazine length: ${this.magazine_list.length}`);
        this.magazine_length = this.magazine_list.length;
        this.full_page = parseInt(this.magazine_list.length / 12) + 1;
        this.mobile_full_page = parseInt(this.magazine_list.length / 6) + 1;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getMagazine = (category) => {
    const req = {
      params: {
        category: category,
      },
    };

    MagazineAPI.getMagazine(req)
      .then(async (res) => {
        this.magazine_list = res.data.results;
        this.magazine_next = res.data.next;

        while (this.magazine_next) {
          const req = {
            nextUrl: this.magazine_next,
          };

          await MagazineAPI.getNextPage(req)
            .then((res) => {
              this.magazine_list = this.magazine_list.concat(res.data.results);
              this.magazine_next = res.data.next;
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        }
        console.log(`magazine length: ${this.magazine_list.length}`);
        this.magazine_length = this.magazine_list.length;
        this.full_page = parseInt(this.magazine_list.length / 12) + 1;
        this.mobile_full_page = parseInt(this.magazine_list.length / 6) + 1;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getMagazineDetail = (id) => {
    //  const token = localStorage.getItem('token')
    const req = {
      id: id,
      //    headers: {
      //      Authorization: `Token ${token}`,
      //    },
    };

    MagazineAPI.getMagazineDetail(req)
      .then((res) => {
        this.current = res.data;
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getMagazineCategory = () => {
    MagazineAPI.getMagazineCategory()
      .then((res) => {
        this.categoryAry = res.data.results;
        console.log(res.data.results);
        // console.log(this.categoryAry[0]);
        // this.categoryAry[0].checked = true;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action setCurrent = (data) => {
    this.current = data;
    Router.push(`/magazine/${data.id}`);
  };
}
export default new Magazine();
