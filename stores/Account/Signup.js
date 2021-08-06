import { observable, action } from "mobx";
import * as AccountAPI from "axios/Account/Account";
import Router from "next/router";

class Signup {
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
    this.allCheckState = false;
    this.checkboxState = [false, false, false, false];
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
  };

  @observable title = "";
  @action setTitle = (val) => {
    this.title = val;
  };

  // 회원가입 함수 시작
  @action signup = async () => {
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
    if (this.type === "client") {
      if (!this.company_name) {
        await alert("회사명을 입력해주세요.");
        return;
      }
      if (!this.title) {
        await alert("직위를 입력해주세요");
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
          type: 0,
          marketing: this.marketing,
        },
      };
      AccountAPI.clientSignup(req)
        .then((res) => {
          setTimeout(() => {
            this.loading = false;
            alert("회원가입 성공");
            MyDataLayerPush({ event: "SignUpComplete_Client" });
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
            MyDataLayerPush({ event: "SignUpComplete_Partner" });
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

  // 전체동의 핸들러 함수
  @observable allCheckState = false;
  @observable checkboxState = [false, false, false, false];

  @action fullConsent = () => {
    if (this.allCheckState === false) {
      this.allCheckState = true;

      this.checkboxState.forEach((item, idx) => {
        const checkbox = this.checkboxState;
        checkbox[idx] = true;
        this.checkboxState = checkbox;
        console.log("item : ", this.checkboxState);
      });
    } else {
      this.allCheckState = false;

      this.checkboxState.forEach((item, idx) => {
        const checkbox = this.checkboxState;
        checkbox[idx] = false;
        this.checkboxState = checkbox;
        console.log("item : ", this.checkboxState);
      });
    }
  };

  // 가입하기 submit 약관동의 체크 함수
  @action signupSubmit = () => {
    const checkboxArr = this.checkboxState;

    if (checkboxArr[0] === true && checkboxArr[1] === true && checkboxArr[2] === true) {
      this.signup();
    } else {
      alert("필수 이용약관에 동의해 주세요");
    }
  };

  // 비밀번호 확인 일치 함수
  @observable emailinputstate = true;
  @observable passwordInvalid = false;
  @observable passwordinputstate = true;
  @observable password2inputstate = true;

  @action passwordInvalidhandler = () => {
    if (this.password === this.password2) {
      this.passwordInvalid = true;
      this.password2inputstate = true;
    } else {
      this.passwordInvalid = false;
      this.password2inputstate = false;
    }
  };

  // 특수문자 여부 유효성 검사(특수문자 포함X)
  @observable realNameInvalid = false;
  @observable realNameInputState = true;
  @observable company_nameInvalid = false;
  @observable company_nameInputState = true;
  @observable titleInvalid = false;
  @observable titleInputState = true;

  @action textInvalid = (type, word) => {
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    switch (type) {
      case "name":
        if (regex.test(word)) {
          this.realNameInvalid = true;
          this.realNameInputState = true;
        } else {
          this.realNameInvalid = false;
          this.realNameInputState = false;
        }
        break;

      case "companyName":
        if (regex.test(word)) {
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
  @observable phoneInvalid = false;
  @observable phoneInputState = true;
  @action phoneInvalidhandler = () => {
    const regex = /^[0-9]{9,12}$/;

    if (regex.test(this.phone)) {
      this.phoneInvalid = true;
      this.phoneInputState = true;
    } else {
      this.phoneInvalid = false;
      this.phoneInputState = false;
    }
  };
}

export default new Signup();
