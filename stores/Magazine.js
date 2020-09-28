import { observable, action } from 'mobx'

import * as MagazineAPI from 'axios/Magazine'
import * as CategoryAPI from 'axios/Category'
class Magazine {
  @observable current = null

  @observable magazine_list = []
  @observable magazine_next = null

  @action init = () => {
    const req = {
      params: {
        ordering: '-is_top, -id',
      },
    }

    CategoryAPI.getMagazine()
      .then(async (res) => {
        this.magazine_list = res.data.results
        this.magazine_next = res.data.next

        while(this.magazine_next) {
          const req = {
            nextUrl: this.magazine_next,
          }

          await CategoryAPI.getNextPage(req)
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

  @action setCurrent = (id) => {
    const idx = this.magazine_list.findIndex(magazine => magazine.id == id);

    if(idx !== -1) {
      this.current = this.magazine_list[idx];
    }

    console.log(this.current);
  };
}

export default new Magazine()