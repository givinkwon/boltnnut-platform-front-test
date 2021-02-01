import { observable, action, toJS } from "mobx";

import * as CategoryAPI from "axios/Category";
import * as PartnerAPI from "axios/Partner";

class Partner {
  @observable detail = null;
  @observable requests = [];
  @observable clients = [];

  // "/"에서 제조사 찾기 섹션의 그림 누르고 들어옴
  @observable developBig = null;

  // "/mainCategory"
  @observable category_list = [];
  @observable category_middle_list = [];
  @observable request_middle_list = [];
  @observable develop_list = [];
  @observable city_list = [];

  @observable partner_list = [];
  @observable random_partner_list = [];
  @observable partner_count = 0;
  @observable partner_next = null;

  @observable page = 1;

  @observable search_text = "";
  @observable search_category = [];
  @observable search_develop = [];
  @observable search_region = [];

  @observable select_big = null;
  @observable select_mid = null;
  @observable loading = 0;
  
  @action setLoading = () => {
    this.loading = 1;
  }

  @action init = () => {
    CategoryAPI.getMainCategory()
      .then((res) => {
        this.big_category_all = res.data.results;
        this.category_list = res.data.results;
        this.category_list.forEach((mainCategory) => {
          this.category_middle_list = this.category_middle_list.concat(
            mainCategory.category_set
          );
        });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    CategoryAPI.getDevelop()
      .then((res) => {
        this.develop_list = res.data.results;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    CategoryAPI.getCity()
      .then((res) => {
        this.city_list = res.data.results;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
  @action reset = () => {
    this.detail = null
    this.category_list = []
    this.category_middle_list = []
    this.develop_list = []
    this.city_list = []

    this.partner_list = []
    this.partner_count = 0
    this.partner_next = null
    this.page = 1

    this.search_text = ""
    this.search_category = []
    this.search_develop = []
    this.search_region = []
  }
  @action setBigCategory = (obj) => {
    this.select_mid = null;
    this.select_big = obj;
    this.request_middle_list = this.select_big.category_set;
  }
  @action setMidCategory = (obj) => {
    this.select_mid = obj;
  }

  @action setParentList = (state, data, type) => {
    if (type === "category") {
      const list = [];
      if (state) {
        for (var d of data.category_set) {
          const index = this.search_category.indexOf(d.id);
          if(index !== -1) { continue; }

          list.push(d.id);
        }
        this.search_category = [...list, ...this.search_category];
      } else {
        for (var d of data.category_set) {
          const index = this.search_category.indexOf(d.id);
          this.search_category.splice(index, 1);
        }
      }
    } else if (type === "develop") {
      console.log(data);
      const list = [];
      if (state) {
        for (var d of data.develop_set) {
          const index = this.search_develop.indexOf(d.id);
          if(index !== -1) { continue; }

          list.push(d.id);
        }
        this.search_develop = [...list, ...this.search_develop];
        console.log(this.search_develop)
      } else {
        for (var d of data.develop_set) {
          const index = this.search_develop.indexOf(d.id);
          this.search_develop.splice(index, 1);
        }
      }
    } else if (type === "city") {
      const list = [];
      if (state) {
        for (var d of data.region_set) {
          const index = this.search_region.indexOf(d.id);
          if(index !== -1) { continue; }

          list.push(d.id);
        }
        this.search_region = [...list, ...this.search_region];
      } else {
        for (var d of data.region_set) {
          const index = this.search_region.indexOf(d.id);
          this.search_region.splice(index, 1);
        }
      }
    }
    this.searchjust();
  };
  @action setList = (id, type) => {
    if (type === "category") {
      const index = this.search_category.indexOf(id);
      if (index > -1) {
        this.search_category.splice(index, 1);
      } else {
        this.search_category = [id, ...this.search_category];
      }
    } else if (type === "develop") {
      const index = this.search_develop.indexOf(id);
      if (index > -1) {
        this.search_develop.splice(index, 1);
      } else {
        this.search_develop = [id, ...this.search_develop];
      }
    } else if (type === "city") {
      const index = this.search_region.indexOf(id);
      if (index > -1) {
        this.search_region.splice(index, 1);
      } else {
        this.search_region = [id, ...this.search_region];
      }
    }
    this.search();
  };
  @action search = () => {
    const name = this.search_text;
    const develop = this.search_develop;
    const region = this.search_region;

    let subclasses = [];
    if (this.search_category) {
      for (let i = 0; i < this.search_category.length; i++) {
        const category_middle = this.getCategoryById(this.search_category[i]);

        if (category_middle) {
          category_middle.subclass_set.forEach((subclass) => {
            subclasses.push(subclass.id);
          });
        }
      }
    }
    console.log(subclasses);

    const req = {
      data: {
        search: name,
        // 제품 분야 = 가능 제품 분야
        history_set__id: subclasses.toString() ? subclasses.toString() : null,
        // history_set__id: toJS(develop).toString(),
        region: region.toString() ? region.toString() : null,
        // 카테고리 = 의뢰 분야
        category_middle__id: toJS(develop).toString()
          ? toJS(develop).toString()
          : null,
        page: this.page,
      },
    };
    console.log(req);
    PartnerAPI.search(req)
      .then((res) => {
        console.log(res);
        this.partner_list = res.data.results;
        this.partner_count = res.data.count;
        this.partner_next = res.data.next;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // 파트너 정보 제한 검색
  @action searchjust = () => {
    const name = this.search_text;
    const develop = this.search_develop;
    const region = this.search_region;

    let subclasses = [];
    if (this.search_category) {
      for (let i = 0; i < this.search_category.length; i++) {
        const category_middle = this.getCategoryById(this.search_category[i]);

        if (category_middle) {
          category_middle.subclass_set.forEach((subclass) => {
            subclasses.push(subclass.id);
          });
        }
      }
    }
    console.log(subclasses);

    const req = {
      data: {
        search: name,
        // 제품 분야 = 가능 제품 분야
        history_set__id: subclasses.toString() ? subclasses.toString() : null,
        // history_set__id: toJS(develop).toString(),
        region: region.toString() ? region.toString() : null,
        // 카테고리 = 의뢰 분야
        category_middle__id: toJS(develop).toString()
          ? toJS(develop).toString()
          : null,
        page: this.page,
      },
    };
    console.log(req);
    PartnerAPI.searchjust(req)
      .then((res) => {
        console.log(res);
        this.partner_list = res.data.results;
        this.partner_count = res.data.count;
        this.partner_next = res.data.next;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // 파트너 정보 제한 랜덤 검색
  @action searchrandom = () => {
    const name = this.search_text;
    const develop = this.search_develop;
    const region = this.search_region;

    let subclasses = [];
    if (this.search_category) {
      for (let i = 0; i < this.search_category.length; i++) {
        const category_middle = this.getCategoryById(this.search_category[i]);

        if (category_middle) {
          category_middle.subclass_set.forEach((subclass) => {
            subclasses.push(subclass.id);
          });
        }
      }
    }
    console.log(subclasses);

    const req = {
      data: {
        search: name,
        // 제품 분야 = 가능 제품 분야
        history_set__id: subclasses.toString() ? subclasses.toString() : null,
        // history_set__id: toJS(develop).toString(),
        region: region.toString() ? region.toString() : null,
        // 카테고리 = 의뢰 분야
        category_middle__id: toJS(develop).toString()
          ? toJS(develop).toString()
          : null,
        page: this.page,
      },
    };
    console.log(req);
    PartnerAPI.searchrandom(req)
      .then((res) => {
        console.log(res);
        this.partner_list = res.data.results;
        this.partner_count = res.data.count;
        this.partner_next = res.data.next;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getNextPartner = () => {
    if (!this.partner_next) {
      return;
    }

    const token = localStorage.getItem("token");
    const req = {
      nextUrl: this.partner_next,
      // headers
      headers: {
       //  Authorization: `Token ${token}`,
      },
    };

    PartnerAPI.getNextPage(req)
      .then((res) => {
        console.log("파트너 다음 페이지 읽기 성공");
        console.log(res.data);

        this.partner_list = this.partner_list.concat(res.data.results);
        this.partner_next = res.data.next;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getNextJustPartner = () => {
    if (!this.partner_next) {
      return;
    }

    const token = localStorage.getItem("token");
    const req = {
      nextUrl: this.partner_next,
      // headers
      headers: {
       //  Authorization: `Token ${token}`,
      },
    };

    PartnerAPI.getNextJustPage(req)
      .then((res) => {
        console.log("파트너 다음 페이지 읽기 성공");
        console.log(res.data);

        this.partner_list = this.partner_list.concat(res.data.results);
        this.partner_next = res.data.next;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getNextRandomPartner = () => {
    if (!this.partner_next) {
      return;
    }

    const token = localStorage.getItem("token");
    const req = {
      nextUrl: this.partner_next,
      // headers
      headers: {
       //  Authorization: `Token ${token}`,
      },
    };

    PartnerAPI.getNextJustPage(req)
      .then((res) => {
        console.log("파트너 다음 페이지 읽기 성공");
        console.log(res.data);

        this.partner_list = this.partner_list.concat(res.data.results);
        this.partner_next = res.data.next;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  //파트너 숫자만 로드
	@action loadPartnerCount = () =>{
		PartnerAPI.getMyPartner()
			.then((res) => {
				this.partner_count = res.data.count;
			})
			.catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  }

  @action getRequestsByAnswers = () => {
    if(!this.detail) { return; }

    this.detail.answer_set.forEach((answer, idx) => {
      const projectId = answer.project;
      const token = localStorage.getItem("token");
      const req = {
        // headers
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      PartnerAPI.getProject(projectId, req)
        .then(res => {
          this.requests.push(res.data.request_set[0]);
          console.log(res.data);

          if(idx === this.detail.answer_set.length - 1) {
            this.getClientsByRequests();
          }
        })
        .catch(e => {
          console.log(e);
          console.log(e.response);
        })
    });
  };

  @action getCountRequest = () => {
    PartnerAPI.getProject(projectId, req)
        .then(res => {
          this.requests.push(res.data.request_set[0]);
          console.log(res.data);

          if(idx === this.detail.answer_set.length - 1) {
            this.getClientsByRequests();
          }
        })
        .catch(e => {
          console.log(e);
          console.log(e.response);
        })
  }
  
  @action getClientsByRequests = () => {
    if(!this.detail) { return; }

    this.requests.forEach((request, idx) => {
      const token = localStorage.getItem("token");
      const req = {
        // headers
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      PartnerAPI.getClient(request.client, req)
        .then(res => {
          this.clients.push(res.data);
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
          console.log(e.response);
        })
    });
  };

  getRequestByProjectId = (projectId) => {
    if (projectId == -1) {
      return;
    }

    const idx = this.requests.findIndex(
      (request) => request.project == projectId
    );

    return this.requests[idx];
  }
  getCategoryById = (id) => {
    if (id == -1) {
      return;
    }

    const idx = this.category_middle_list.findIndex(
      (category) => category.id == id
    );

    return this.category_middle_list[idx];
  };
  getCityNameById = (id) => {
    if (id == -1) {
      return;
    }

    const idx = this.city_list.findIndex((city) => city.id == id);

    // 못 찾았을 경우
    if (idx === -1) {
      return "";
    }

    return this.city_list[idx].city;
  };
  getRegionNameById = (id) => {
    if (id == -1) {
      return;
    }

    let cityName = "";

    for (let i = 0; i < this.city_list.length; i++) {
      const city = this.city_list[i];

      for (let j = 0; j < city.region_set.length; j++) {
        const region = city.region_set[j];

        if (region.id == id) {
          cityName = region.region;
          return cityName;
        }
      }
    }

    return cityName;
  };
  getClientById = (id) => {
    if (id == -1) {
      return;
    }

    const idx = this.clients.findIndex(
      (client) => client.id == id
    );

    return this.clients[idx];
  }
}

export default new Partner();
