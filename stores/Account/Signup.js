import { observable, action } from "mobx";
import * as AccountAPI from "axios/Account/Account";
import Router from "next/router";
import Auth from "./Auth";

class Signup {
  @observable type = "";
  // state 리셋 함수
  @action reset = () => {
    this.email = "";
    this.password = "";
    this.password2 = "";
    this.new_password = "";
    this.realName = "";
    this.title = "";
    this.phone = "";
    this.company_name = "";
    this.allCheckState = true;
    this.checkboxState = true;
    this.marketingcheckboxState = true;
    this.passwordInvalid = false;
    this.realNameInvalid = false;
    this.phoneInvalid = false;
    this.company_nameInvalid = false;
    this.titleInvalid = false;
  };

  // email
  @observable email = "";

  @action setEmail = (val) => {
    this.email = val;
  };

  // password
  @observable password = "";

  @action setPassword = (val) => {
    this.password = val;
  };

  // password confirm
  @observable password2 = "";

  @action setPassword2 = (val) => {
    this.password2 = val;
  };

  // new password
  @observable new_password = "";

  @action setNewPassword = (val) => {
    this.new_password = val;
  };

  // phone
  @observable phone = "";

  @action setPhone = (val) => {
    this.phone = val;
  };

  // company name
  @observable company_name = "";

  @action setCompanyName = (val) => {
    this.company_name = val;
  };

  // real name
  @observable realName = "";

  @action setRealName = (val) => {
    this.realName = val;
    console.log(this.realName);
  };

  // 직급
  @observable title = "";
  @action setTitle = (val) => {
    this.title = val;
  };

  @observable marketing = true;
  @action setMarketing = (val) => {
    this.marketing = val;
    console.log(this.marketing);
  };

  // 회원가입 함수 시작
  @action signup = async (container = "signup") => {
    // google ads script
    function gtag_report_conversion(url) {
      var callback = function () {
        if (typeof url != "undefined") {
          window.location = url;
        }
      };
      gtag("event", "conversion", {
        send_to: "AW-711089872/k5kNCKKVk_ECENC9idMC",
        value: 1.0,
        currency: "KRW",
        event_callback: callback,
      });
      return false;
    }

    if (!this.email) {
      await alert("이메일을 입력해주세요.");
      return;
    }
    var emailValid = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (!emailValid.test(this.email)) {
      await alert("이메일 형식을 확인해주세요.");
      return;
    }
    if (!this.password) {
      await alert("비밀번호를 입력해주세요.");
      return;
    }
    if (this.password != this.password2) {
      await alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!this.phone) {
      await alert("휴대전화를 입력해주세요.");
      return;
    }

    if (!this.realName) {
      await alert("이름을 입력해주세요.");
      return;
    }

    console.log("email : ", this.email);
    console.log("password : ", this.password);
    console.log("password2 : ", this.password2);
    console.log("company : ", this.company_name);
    console.log("job title : ", this.title);
    console.log("phone : ", this.phone);
    console.log("marketing : ", this.marketing);

    // alert(this.type);
    if (this.type !== "partner") {
      if (!this.company_name) {
        await alert("회사명을 입력해주세요.");
        return;
      }

      // if (this.business.business == "기타") {
      //   //console.log(this.business.business)
      //   this.business.business = this.business2;
      // }

      this.loading = true;
      const req = {
        data: {
          username: this.email,
          password: this.password,
          phone: this.phone,
          name: this.company_name,
          realName: this.realName,
          title: this.title,
          // path: this.path.path,
          // business: this.business.business,
          // type: 0,
          marketing: this.marketing,
        },
      };
      AccountAPI.clientSignup(req)
        .then((res) => {
          gtag_report_conversion();
          setTimeout(() => {
            this.loading = false;
            console.log(res);
            MyDataLayerPush({ event: "SignUpComplete_Client" });
            this.reset();

            // 의뢰서에서 회원가입하지 않았을 때 => 그냥 회원가입일 때 Router Push
            if (container === "signup") {
              Router.push("/login");
              alert("회원가입 성공");
            }
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
      formData.append("password", this.password);
      formData.append("phone", this.phone);
      // formData.append("type", 1);
      formData.append("marketing", this.marketing);
      formData.append("name", this.company_name);
      formData.append("realName", this.realName);
      this.loading = true;
      const req = {
        data: formData,
      };
      AccountAPI.partnerSignup(req)
        .then((res) => {
          gtag_report_conversion();
          setTimeout(() => {
            this.loading = false;
            alert("회원가입 성공");
            MyDataLayerPush({ event: "SignUpComplete_Partner" });
            // 자동 로그인
            Auth.email = this.email;
            Auth.password = this.password;
            //signup에서 왔을
            Auth.login("partnersignup");

            // 의뢰서에서 회원가입하지 않았을 때 => 그냥 회원가입일 때 Router Push
            if (container == "signup") {
              Router.push("/partnerregister");
            }
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

  // 전체동의 핸들러 함수
  @observable allCheckState = true;
  @observable checkboxState = true;
  @observable marketingcheckboxState = true;

  @action fullConsent = () => {
    if (this.allCheckState === false) {
      this.allCheckState = true;
      this.checkboxState = true;
      this.marketingcheckboxState = true;
    } else {
      this.allCheckState = false;
      this.checkboxState = false;
      this.marketingcheckboxState = false;
    }
  };

  // 가입하기 submit 약관동의 체크 함수
  @action signupSubmit = () => {
    const checkboxArr = this.checkboxState;

    if (this.checkboxState) {
      this.signup();
    } else {
      alert("필수 이용약관에 동의해 주세요");
    }
  };

  // 비밀번호 확인 일치 함수
  @observable emailinputstate = true; // 이메일 입력 상태
  @observable passwordInvalid = false; // 비밀번호 유효성 여부 상태
  @observable passwordinputstate = true; // 비밀번호 인풋 테두리 유효성 여부 상태
  @observable password2inputstate = true; // 비밀번호 확인 유효성 여부 상태

  @action passwordInvalidhandler = () => {
    if (this.password === this.password2) {
      this.passwordInvalid = true; // 비밀번호 확인 유효성 상태 변경
      this.password2inputstate = true; // 비밀번호 확인 인풋 테두리 상태 변경
    } else {
      this.passwordInvalid = false;
      this.password2inputstate = false;
    }
  };

  // 특수문자 여부 유효성 검사(특수문자 포함X)
  @observable realNameInvalid = false; // 이름 유효성 여부 상태
  @observable realNameInputState = true; // 이름 인풋 테두리 유효성 여부 상태
  @observable company_nameInvalid = false; // 회사이름 유효성 여부 상태
  @observable company_nameInputState = true; // 회사이름 인풋 테두리 유효성 여부 상태
  @observable titleInvalid = false; // 직급 유효성 여부 상태
  @observable titleInputState = true; // 직급 인풋 테두리 유효성 여부 상태

  @action textInvalid = (type, word) => {
    // 첫 번째 인자로 받는 type에 따라 실행 함수가 달라짐
    // word의 유효성 상태와 인풋 유효성 상태를 조건에 따라 같이 변경
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    const companyNameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|~!@#$%^&*()+=-_]+$/;

    switch (type) {
      case "name":
        if (regex.test(word)) {
          this.realNameInvalid = true; // 이름 유효성 여부 상태 변경
          this.realNameInputState = true; // 이름 인풋 테두리 유효성 상태 변경
        } else {
          this.realNameInvalid = false;
          this.realNameInputState = false;
        }
        break;

      case "companyName":
        if (companyNameRegex.test(word)) {
          this.company_nameInvalid = true;
          this.company_nameInputState = true;
        } else {
          this.company_nameInvalid = false;
          this.company_nameInputState = false;
        }
        break;

      case "title":
        if (regex.test(word)) {
          this.titleInvalid = true;
          this.titleInputState = true;
        } else {
          this.titleInvalid = false;
          this.titleInputState = false;
        }
        break;
    }
  };

  // 전화번호 유효성 검사
  @observable phoneInvalid = false; // 휴대전화 유효성 여부 상태
  @observable phoneInputState = true; // 휴대전화 인풋 테두리 유효성 상태
  @action phoneInvalidhandler = () => {
    const regex = /^[0-9]{9,11}$/;

    if (regex.test(this.phone)) {
      this.phoneInvalid = true;
      this.phoneInputState = true;
    } else {
      this.phoneInvalid = false;
      this.phoneInputState = false;
    }
  };

  // 개인체크 박스 true일 경우 "개인" 텍스트 자동입력 함수
  @observable individual = "";
  @observable individualState = false;
  @action individualhandler = (state) => {
    if (state) {
      this.individualState = false;
      this.individual = "";
    } else {
      this.individualState = true;
      this.individual = "개인";
    }
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

    console.log("realName : ", this.realName);

    console.log("company_name : ", this.company_name);

    console.log("phone : ", this.phone);

    console.log("marketing : ", this.marketing);

    // if (true)
    if (this.type === "client") {
      if (!this.realName) {
        await alert("이름을 입력해주세요.");
        return;
      }

      this.loading = true;
      const req = {
        data: {
          username: this.email,
          phone: this.phone,
          realName: this.realName,
          name: this.company_name,
          title: this.title,
          //business: this.business,
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
            // 자동 로그인
            Auth.email = this.email;
            Auth.password = this.password;
            //signup에서 왔을
            Auth.login("partnersignup");
            Router.push("/partnerregister");
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
}

export default new Signup();
