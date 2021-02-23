import { observable, action } from 'mobx'

import * as MagazineAPI from 'axios/Magazine'
import * as CategoryAPI from 'axios/Category'
import Router from "next/router";

class Magazine {
  @observable current = null
  @observable magazine_list = []
  @observable magazine_next = null
  @observable magazine_length = null

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