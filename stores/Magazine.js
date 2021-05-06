import { observable, action, makeObservable } from "mobx";

import * as MagazineAPI from "axios/Magazine";
import * as CategoryAPI from "axios/Category";
import Router from "next/router";

class Magazine {
  constructor() {
    makeObservable(this);
  }
  @observable current = null;
  @observable magazine_list = [];
  @observable magazine_next = null;
  @observable magazine_length = null;
  @observable categoryAry = [
    { id: 1, name: "제조 공정", checked: false },
    { id: 2, name: "기술 사전", checked: false },
  ];
  @observable mobileUpperCategoryAry = [
    { id: 1, name: "전체", item: [], checked: true },
    {
      id: 2,
      name: "가공",
      item: [
        { name: "재료", checked: true },
        { name: "소공", checked: false },
        { name: "목공", checked: false },
      ],
      checked: false,
    },
    {
      id: 3,
      name: "연구원",
      item: [
        { name: "김김김", checked: true },
        { name: "이이이", checked: false },
        { name: "박박박", checked: false },
        { name: "정정정", checked: false },
      ],
      checked: false,
    },
    {
      id: 4,
      name: "공정",
      item: [
        { name: "AAA", checked: true },
        { name: "BBB", checked: false },
        { name: "CCC", checked: false },
        { name: "DDD", checked: false },
        { name: "EEE", checked: false },
      ],
      checked: false,
    },
    {
      id: 5,
      name: "비교견적",
      item: [
        { name: "111", checked: true },
        { name: "222", checked: false },
      ],
      checked: false,
    },
  ];

  @observable mobileLowerCategoryAry = [
    { item: [] },
    {
      item: [
        { name: "재료", checked: true },
        { name: "소공", checked: false },
        { name: "목공", checked: false },
      ],
    },
    {
      item: [
        { name: "김김김", checked: true },
        { name: "이이이", checked: false },
        { name: "박박박", checked: false },
        { name: "정정정", checked: false },
      ],
    },
    {
      item: [
        { name: "AAA", checked: true },
        { name: "BBB", checked: false },
        { name: "CCC", checked: false },
        { name: "DDD", checked: false },
        { name: "EEE", checked: false },
      ],
    },
    {
      item: [
        { name: "111", checked: true },
        { name: "222", checked: false },
      ],
    },
  ];

  @observable category_checked_idx = 0;
  @observable category_detail_checked_idx = 0;

  @observable mobile_category_checked_idx = 0;
  @observable mobile_category_detail_checked_idx = 0;

  @observable checked = false;

  @observable current_page = 1;
  @observable full_page = 1;
  @observable mobile_full_page = 1;
  @observable next_page = 0;

  @observable search_text = "";

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

  @action setCurrent = (data) => {
    this.current = data;
    Router.push(`/magazine/${data.id}`);
  };
}
export default new Magazine();
