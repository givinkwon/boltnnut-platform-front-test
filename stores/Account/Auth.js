import { observable, action, makeObservable, toJS } from "mobx";
import Router from "next/router";
import * as AccountAPI from "axios/Account/Account";
import * as CategoryAPI from "axios/Account/Category";
import Account from "pages/account";

class Auth {
  constructor() {
    //makeObservable(this);
  }
  @observable bgColor = "#ffffff";
  @observable logged_in_user = null; // user 로그인 데이터
  @observable logged_in_client = null; // client면 로그인 했을 때 데이터
  @observable logged_in_partner = null; // partner면 로그인 했을 때 데이터

  @observable always_login = false;

  // "/account" 계정설정 페이지에서 필요
  @observable password_checked = false;

  @observable email = "";
  @observable password = "";
  @observable new_password = "";
  @observable password2 = "";
  @observable phone = "";

  @observable type = "";
  @observable marketing = true;
  @observable step = 0;
  @observable loading = false;

  @observable realName = "";
  @observable company_name = "";
  @observable revenue = "";
  @observable employee = "";
  @observable career = "";
  @observable info_biz = "";
  @observable deal = "";
  @observable histories = "";

  @observable path = null;
  @observable business = null;
  @observable business2 = null;
  @observable city = null;
  @observable region = null;
  @observable info_company = "";
  //*@observable possible_set = [];
  @observable history_set = [];

  @observable category_middle_set = [];

  @observable file = null;
  @observable logo = null;
  @observable city_data = [];
  @observable region_data = [];
  @observable path_data = [];
  @observable business_data = [];
  @observable restore_email = [];

  @observable home_index = 0;

  @observable previous_url;

  @observable isSnsSignup = false;

  @observable signupBoxActive = true;

  @observable registerType = "";
  @observable registerPageIdx = 0;
  @action reset = () => {
    this.email = "";
    this.password = "";
    this.password2 = "";
    this.type = "";
    this.step = 0;
    this.phone = "";
    this.marketing = true;

    this.company_name = "";
    this.revenue = "";
    this.employee = "";
    this.career = "";
    this.info_biz = "";
    this.deal = "";
    this.histories = "";

    this.info_company = "";
    //this.possible_set = [];
    this.history_set = [];

    this.category_middle_set = [];

    this.file = null;
    this.logo = null;
    this.resume = null;
  };
  @action setEmail = (val) => {
    this.email = val;
  };
  @action setPassword = (val) => {
    this.password = val;
  };
  @action setNewPassword = (val) => {
    this.new_password = val;
  };
  @action setPassword2 = (val) => {
    this.password2 = val;
  };
  //회사명
  @action setName = (val) => {
    this.name = val;
  };
  //실명
  @action setRealName = (val) => {
    this.realName = val;
  };
  @action setTitle = (val) => {
    this.title = val;
  };
  @action setPhone = (val) => {
    this.phone = val;
  };
  @action setType = (val) => {
    this.type = val;
  };
  @action setMarketing = (val) => {
    this.marketing = val;
  };
  @action setStep = (val) => {
    this.step = val;
  };
  @action setRevenue = (val) => {
    this.revenue = val;
  };
  @action setEmployee = (val) => {
    this.employee = val;
  };
  @action setCareer = (val) => {
    this.career = val;
  };
  @action setInfoBiz = (val) => {
    this.info_biz = val.currentTarget.value;
  };
  @action setDeal = (val) => {
    this.deal = val.currentTarget.value;
  };
  @action setHistories = (val) => {
    this.histories = val.currentTarget.value;
  }; // 0923 추가
  /*@action addPossibleSet = (val) => {
    this.possible_set.push(val);
  };*/
  @action addHistorySet = (val) => {
    this.history_set.push(val);
  };
  /*@action removePossibleSet = (idx) => {
    this.possible_set.splice(idx, 1);
  };*/
  @action removeHistorySet = (idx) => {
    this.history_set.splice(idx, 1);
  };
  @action setInfoCompany = (val) => {
    this.info_company = val.currentTarget.value;
  };
  @action setCompanyName = (val) => {
    this.company_name = val;
  };
  @action setFile = (val) => {
    this.file = val;
  };
  @action setResume = (val) => {
    this.resume = val; // 0923 Resume
  };
  @action setLogo = (file) => {
    this.logo = file;
  };

  @action makeUrl = (url) => {
    if (typeof window !== "undefined") {
      return window.location.protocol + "//" + window.location.host + "/" + url;
    }
  };

  @action setCity = (obj) => {
    this.region_data = [];
    this.city = obj;
    this.region = null;
    const city_data = this.city_data;
    this.region_data = city_data.filter(
      (item) => item.id === obj.id
    )[0].region_set;
  };
  @action setRegion = (obj) => {
    this.region = obj;
  };
  @action setPath = (obj) => {
    this.path = obj;
  };
  @action setBusiness = (obj) => {
    this.business = obj;
  };
  @action setBusiness2 = (obj) => {
    this.business2 = obj;
  };

  @action getCityData = () => {
    CategoryAPI.getCity()
      .then((res) => {
        this.city_data = res.data.results;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
  @action getPathData = () => {
    CategoryAPI.getPath()
      .then((res) => {
        this.path_data = res.data.results;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action getBusinessData = () => {
    CategoryAPI.getBusiness()
      .then((res) => {
        this.business_data = res.data.results;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  @action setCategoryMiddleSet = (id) => {
    const index = this.category_middle_set.indexOf(id);
    if (index > -1) {
      this.category_middle_set.splice(index, 1);
      this.category_middle_set = [...this.category_middle_set];
    } else {
      this.category_middle_set = [id, ...this.category_middle_set];
    }
  };

  @action checkLogin = async () => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("expiry");

    if (expiry) {
      const now = new Date();
      if (now.getTime() > parseFloat(expiry)) {
        localStorage.removeItem("token");
        localStorage.removeItem("expiry");

        Router.reload();

        return false;
      }
    }

    // console.log(toJS(this.logged_in_user));
    if (!token) {
      return false;
    }
    if (token && !this.logged_in_user) {
      console.log("userInfo 다시 불러오기");

      await this.reloadUserInfo(token);
      // console.log(this.logged_in_user.id);
    }
    //console.log(this.logged_in_user)
    return true;
  };
  @action reloadUserInfo = async (token) => {
    const req = {
      data: {
        username: this.email,
        password: this.password,
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    await AccountAPI.reloadUserInfo(req)
      .then((res) => {
        //console.log(res);
        this.logged_in_user = res.data.data.User;
        // console.log(toJS(this.logged_in_user));
        if (this.logged_in_user.type == 0) {
          console.log("클라이언트 정보 리로딩");
          // console.log(this.logged_in_user.type);
          this.logged_in_client = res.data.data.Client[0];
          console.log(this.logged_in_client);
        } else if (this.logged_in_user.type == 1) {
          console.log("파트너 정보 리로딩");
          this.logged_in_partner = res.data.data.Partner[0];
        }
      })
      .catch((e) => {
        try {
          console.log(e);
          console.log(e.response);
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
        localStorage.removeItem("token");

        Router.push("/");
      });
  };

  @action checkPassword = () => {
    if (!this.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    this.loading = true;
    const req = {
      data: {
        username: this.logged_in_user.username,
        password: this.password,
      },
    };
    console.log(req);
    AccountAPI.login(req)
      .then((res) => {
        this.loading = false;
        this.password_checked = true;

        Router.push("/account?tab=1");
      })
      .catch((e) => {
        alert("비밀번호가 일치하지 않습니다.");

        console.log(e);
        console.log(e.response);
      });
  };

  @action deactivateUser = (home_index) => {
    if (!this.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const token = localStorage.getItem("token");
    const req = {
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        password: this.password,
      },
    };

    AccountAPI.deactivateUser(req)
      .then((res) => {
        alert("계정탈퇴 되었습니다.");

        console.log("회원탈퇴 성공");
        console.log(res.data);

        localStorage.removeItem("token");
        if (localStorage.getItem("expiry")) {
          localStorage.removeItem("expiry");
        }

        this.logged_in_user = null;
        this.logged_in_client = null;
        this.logged_in_partner = null;

        Router.push("/");
      })
      .catch((e) => {
        alert("비밀번호가 맞지 않습니다");

        console.log(e);
        console.log(e.response);
      });
  };

  @action changePassword = () => {
    if (this.new_password !== this.password2) {
      alert("두 개의 입력이 동일하지 않습니다");
      return;
    }
    if (!this.password) {
      alert("기존 비밀번호를 다시 입력해주세요");
      this.password_checked = false;
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    const req = {
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        password: this.password,
        new_password: this.password2,
      },
    };

    console.log(req);

    AccountAPI.changePassword(req)
      .then((res) => {
        alert("비밀번호 변경에 성공했습니다.");
        this.password_checked = false;
      })
      .catch((e) => {
        alert("비밀번호 변경에 실패했습니다. 관리자에게 연락바랍니다");

        console.log(e);
        console.log(e.response);
      });
  };

  @action login = async () => {
    if (!this.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    // var emailValid = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    // if (!emailValid.test(this.email)) {
    //   await alert("이메일 형식을 확인해주세요.");
    //   return;
    // }
    if (!this.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    this.loading = true;
    const req = {
      data: {
        username: this.email,
        password: this.password,
      },
    };
    console.log(req);
    AccountAPI.login(req)
      .then((res) => {
        this.logged_in_user = res.data.data.User;

        if (this.logged_in_user.type === 0) {
          this.logged_in_client = res.data.data.Client[0];
          console.log(this.logged_in_client);
        } else if (this.logged_in_user.type === 1) {
          this.logged_in_partner = res.data.data.Partner[0];
          console.log(this.logged_in_partner);
        }

        const token = res.data.data.token;
        if (!this.always_login) {
          const now = new Date();
          let tomorrow = new Date();
          tomorrow.setDate(now.getDate() + 1);

          localStorage.setItem("expiry", tomorrow.getTime().toString());
        }
        localStorage.setItem("token", token);

        setTimeout(() => {
          this.loading = false;

          if (this.previous_url == "" || this.previous_url == null) {
            Router.push("/");
          } else {
            // this.makeUrl(this.previous_url);
            Router.push("/" + this.previous_url);
            this.previous_url = "";
          }
        }, 800);
      })
      .catch((e) => {
        try {
          console.log(e);
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
        this.loading = false;
      });
  };

  @action kakaoLogin = () => {
    const { Kakao } = window;
    console.log(Kakao.isInitialized());
    console.log(Kakao);
    console.log(this);
    const scopes = "profile";
    const myStore = this;
    Kakao.Auth.login({
      // scopes,
      success: function (authObj) {
        console.log(authObj);
        // Kakao.Auth.setAccessToken(authObj.access_token);

        Kakao.API.request({
          url: "/v2/user/me",
          success: function ({ kakao_account }) {
            // const { profile } = kakao_account;
            // console.log(profile);

            const req = {
              data: {
                token: authObj.access_token,
                // username: "qwerqwsdsdsdsder@naver.com",
                username: kakao_account.email,
                sns: 1,
              },
            };
            console.log(req);
            //POST to "${ROOT_URL}/snsuser/login/"
            AccountAPI.SNSlogin(req)
              //아이디가 DB에 이미 존재할 때
              .then((res) => {
                console.log(res);

                myStore.logged_in_user = res.data.data.User;

                if (myStore.logged_in_user.type === 0) {
                  myStore.logged_in_client = res.data.data.Client[0];
                  // if (!myStore.logged_in_client) {
                  //   alert(
                  //     "로그인에 문제가 발생하였습니다. 새로고침 후 다시 시도해 주세요."
                  //   );
                  //   return false;
                  // }
                  console.log(myStore.logged_in_client);
                } else if (myStore.logged_in_user.type === 1) {
                  myStore.logged_in_partner = res.data.data.Partner[0];
                  console.log(res.data.data.Partner[0]);
                  console.log(myStore.logged_in_partner);
                  // if (!myStore.logged_in_partner) {
                  //   alert(
                  //     "로그인에 문제가 발생하였습니다. 새로고침 후 다시 시도해 주세요."
                  //   );
                  //   return false;
                  // }
                }

                const token = res.data.data.token;
                console.log(token);
                if (!myStore.always_login) {
                  const now = new Date();
                  let tomorrow = new Date();
                  tomorrow.setDate(now.getDate() + 1);

                  localStorage.setItem("expiry", tomorrow.getTime().toString());
                }
                localStorage.setItem("token", token);

                setTimeout(() => {
                  myStore.loading = false;

                  if (
                    myStore.previous_url == "" ||
                    myStore.previous_url == null
                  ) {
                    Router.push("/");
                  } else {
                    console.log(myStore.previous_url);
                    Router.push("/" + myStore.previous_url);

                    myStore.previous_url = "";
                  }
                }, 800);
              })
              //아이디가 DB에 없을 때
              .catch((res) => {
                console.log(res);
                myStore.isSnsSignup = true;
                // myStore.email = "qwerqwsdsdsdsder@naver.com";
                myStore.email = kakao_account.email;
                myStore.phone = "01014242323"; //임시, 비즈니스 채널 연결되면 폰번호 받아올 수 있음
                Router.push("/signup");
              });
            console.log(kakao_account);
          },
          fail: function (error) {
            console.log(error);
          },
        });
      },
    });
  };

  @action snsSignup = async () => {
    if (!this.email) {
      await alert("이메일을 입력해주세요.");
      return;
    }
    var emailValid = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!emailValid.test(this.email)) {
      await alert("이메일 형식을 확인해주세요.");
      return;
    }

    console.log("email : ", this.email);

    console.log("company : ", this.name);

    console.log("business : ", this.business);
    // if (true)
    if (this.type === "client") {
      if (!this.realName) {
        await alert("이름을 입력해주세요.");
        return;
      }
      // if (!this.title) {
      //   await alert("직위를 입력해주세요");
      //   return;
      // }
      // if (!this.path) {
      //   await alert("방문경로를 입력해주세요");
      //   return;
      // }
      // if (!this.business) {
      //   await alert("업종을 입력해주세요");
      //   return;
      // }

      this.loading = true;
      const req = {
        data: {
          username: this.email,
          phone: this.phone,
          realName: this.realName,
          business: this.business,
          type: 0,
        },
      };
      AccountAPI.snsClientSignup(req)
        .then((res) => {
          setTimeout(() => {
            this.loading = false;
            alert("회원가입 성공");
            // MyDataLayerPush({ event: "SignUpComplete_Client" });
            this.reset();
            Router.push("/login");
          }, 800);
        })
        .catch((e) => {
          try {
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
          this.loading = false;
        });
    } else {
      //파트너
      if (!this.company_name) {
        await alert("상호명을 입력해주세요.");
        return;
      }

      if (this.marketing == true) {
        this.marketing = 1;
      } else {
        this.marketing = 0;
      }
      var formData = new FormData();

      formData.append("username", this.email);
      // formData.append("password", this.password);
      formData.append("phone", this.phone);
      formData.append("type", 1);
      formData.append("marketing", this.marketing);
      formData.append("name", this.company_name);
      formData.append("realName", this.realName);

      this.loading = true;
      const req = {
        data: formData,
      };
      AccountAPI.partnerSignup(req)
        .then((res) => {
          setTimeout(() => {
            this.loading = false;
            alert("회원가입 성공");
            // MyDataLayerPush({ event: "SignUpComplete_Partner" });
            this.reset();
            Router.push("/login");
          }, 800);
        })
        .catch((e) => {
          try {
            console.log(e);
            console.log(e.response);
            console.log(e.response.data);
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
          setTimeout(() => {
            this.loading = false;
          }, 1500);
        });
    }
  };

  @action forget = async () => {
    setTimeout(() => {
      this.loading = false;
    }, 1500);
    if (!this.email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (!this.phone) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }

    this.loading = true;
    const req = {
      data: {
        username: this.email,
        password: this.password,
        phone: this.phone,
      },
    };
    AccountAPI.sendPassword(req)
      .then((res) => {
        setTimeout(() => {
          this.loading = false;
          alert("임시 비밀번호가 회원님의 카카오톡으로 발송되었습니다.");
          Router.push("/login");
        }, 800);
      })
      .catch((e) => {
        try {
          alert(e.response.data.message);
          console.log(e.response);
        } catch {
          console.log(e);
          console.log(e.response);
        }
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      });
  };

  // 아이디 찾기
  @action forgetId = async () => {
    setTimeout(() => {
      this.loading = false;
    }, 1500);

    // 예외처리
    if (!this.phone) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }

    this.loading = true;
    console.log(this.phone);

    // 데이터 만들기
    const req = {
      data: {
        phone: this.phone,
      },
    };

    // API 호출
    AccountAPI.findId(req)
      .then((res) => {
        setTimeout(() => {
          this.loading = false;
        }, 800);
        // 아이디 데이터
        this.restore_email = [];
        this.setStep(1);
        this.restore_email = this.restore_email.concat(res.data.data);
      })
      .catch((e) => {
        try {
          alert(e.response.data.message);
        } catch {
          console.log(e);
          console.log(e.response);
        }
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      });
  };
}

export default new Auth();
