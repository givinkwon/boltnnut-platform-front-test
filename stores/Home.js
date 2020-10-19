import { observable, action } from 'mobx'

import * as CategoryAPI from 'axios/Category'
import * as RequestAPI from 'axios/Request'

class Home {
  @observable category_list = []
  @observable develop_list = []
  @observable magazine_list = []
  @observable magazine_next = null
  @observable is_ie = false
  @observable request_list = []

  @action init = () => {
    CategoryAPI.getMainCategory()
      .then(res => {
        this.category_list = res.data.results
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })
    CategoryAPI.getDevelop()
      .then(res => {
        this.develop_list = res.data.results
      })
      .catch(e => {
        console.log(e)
        console.log(e.response)
      })

    this.loadAllMagazine()

    //0930 added
    this.setLatestRequests()
  }

  @action setLatestRequests = async () => {
    await RequestAPI.getRequests()
      .then(res => {
        this.request_list = res.data.results
      }
      )
  }

  @action loadAllMagazine = () => {
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
}

export default new Home()