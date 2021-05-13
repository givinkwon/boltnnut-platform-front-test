import { observable, action } from "mobx";

import * as NoticeAPI from "axios/Notice";

class Notice {
  constructor() {
    //makeObservable(this);
  }
  @observable current = null;

  @observable notice_list = [];
  @observable notice_next = null;

  @action init = () => {
    const req = {
      params: {
        ordering: "-is_top, -id",
      },
    };

    NoticeAPI.getNotice(req)
      .then(async (res) => {
        this.notice_list = res.data.results;
        this.notice_next = res.data.next;

        while (this.notice_next) {
          const req = {
            nexturl: this.notice_next,
          };

          NoticeAPI.getNextPage(req)
            .then((res) => {
              this.notice_list = this.notice_list.concat(res.data.results);
              this.notice_next = res.data.next;
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        }
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
  @action getNoticeDetail = (id) => {
    //  const token = localStorage.getItem('token')
    const req = {
      id: id,
      //    headers: {
      //      Authorization: `Token ${token}`,
      //    },
    };

    NoticeAPI.getNoticeDetail(req)
      .then((res) => {
        this.current = res.data;
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action setCurrent = (id) => {
    const idx = this.notice_list.findIndex((notice) => notice.id == id);

    if (idx !== -1) {
      this.current = this.notice_list[idx];
    }

    console.log(this.current);
  };
}

export default new Notice();
