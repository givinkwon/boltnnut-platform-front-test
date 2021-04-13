import { observable, action } from 'mobx'

import * as MagazineAPI from 'axios/Magazine'
import * as CategoryAPI from 'axios/Category'
import Router from "next/router";

class Magazine {
  @observable current = null
  @observable magazine_list = []
  @observable magazine_next = null
  @observable magazine_length = null
  @observable categoryAry = [
    { id : 1, name : '실시간 클릭', item: [{name : 'A', checked: true}, {name : 'B', checked: false}, {name : 'C', checked: false}, {name : 'D', checked: false}, {name : 'E', checked: false}], checked: false},
    { id : 2, name : '베스트 브랜드', item: [{name : '가', checked: true}, {name : '나', checked: false}], checked: false},
    { id : 3, name : '베스트 상품', item: [{name : 'CNC', checked: true}, {name : '3D 프린터', checked: false}, {name : '금형사출', checked: false}], checked: false},
    { id : 4, name : '베스트 베스트', item: [{name : '1', checked: true}, {name : '2', checked: false}, {name : '3', checked: false}, {name : '4', checked: false}], checked: false},
  ]
  @observable category_checked_idx = 0;
  @observable category_detail_checked_idx = 0;
  @observable current_page = 1;
  @observable next_page = 0;

  @action init = () => {
    this.magazine_list = [];
    const req = {
      params: {
        ordering: '-is_top, -id',
      },
    }
    MagazineAPI.getMagazine(req)
      .then(async (res) => {
        this.magazine_list = res.data.results
        this.magazine_next = res.data.next

        while(this.magazine_next) {
          const req = {
            nextUrl: this.magazine_next,
          }

          await MagazineAPI.getNextPage(req)
            .then(res => {
              this.magazine_list = this.magazine_list.concat(res.data.results)
              this.magazine_next = res.data.next
            })
            .catch(e => {
              console.log(e)
              console.log(e.response)
            })
        }
        console.log(`magazine length: ${this.magazine_list.length}`)
        this.magazine_length = this.magazine_list.length
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
  }
  @action getMagazineDetail = (id) => {
  //  const token = localStorage.getItem('token')
    const req = {
      id: id,
  //    headers: {
  //      Authorization: `Token ${token}`,
  //    },
    }

    MagazineAPI.getMagazineDetail(req)
      .then(res => {
        this.current = res.data;
        console.log(res.data)
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
  };

  @action setCurrent = (data) => {
    this.current = data;
    Router.push(`/magazine/${data.id}`)
  };
}
export default new Magazine()