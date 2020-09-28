import { observable, action, toJS } from 'mobx'
import Router from 'next/router'
import * as AccountAPI  from 'axios/Account'
import * as CategoryAPI  from 'axios/Category'
import * as PartnerAPI from 'axios/Partner'

class Profile {
  @observable data = null

  @observable email = ''
  @observable password = ''
  @observable password2 = ''
  @observable phone = ''
  @observable type = ''
  @observable step = 0
  @observable loading = false

  @observable company_name = ''
  @observable revenue = ''
  @observable employee = ''
  @observable career = ''
  @observable info_biz = ''
  @observable deal = ''
  @observable histories = '';

  @observable city = null
  @observable region = null
  @observable info_company = ''
  @observable possible_set = []
  @observable history_set = []

  @observable category_middle_set = []

  @observable city_data = []
  @observable region_data = []

  @observable portfolio_set = []
  @observable portfolio_checked = []

  @observable structure_set = []
  @observable structure_checked = []

  @observable machine_set = []
  @observable machine_checked = []

  @observable certification_set = []
  @observable certification_checked = []

  @observable process_set = []
  @observable process_checked = []

  @action reset = () => {
    this.email = ''
    this.password = ''
    this.password2 = ''
    this.type = ''
    this.step = 0
    this.phone = ''

    this.company_name = ''
    this.revenue = ''
    this.employee = ''
    this.career = ''
    this.info_biz = ''
    this.deal = ''
    this.histories = ''

    this.info_company = ''
    this.possible_set = []
    this.history_set = []

    this.category_middle_set = []
  }
  @action setEmail = (val) => {
    this.email = val
  }
  @action setPassword = (val) => {
    this.password = val
  }
  @action setPassword2 = (val) => {
    this.password2 = val
  }
  @action setPhone = (val) => {
    this.phone = val
  }
  @action setType = (val) => {
    this.type = val
  }
  @action setStep = (val) => {
    this.step = val
  }
  @action setRevenue = (val) => {
    this.revenue = val
  }
  @action setEmployee = (val) => {
    this.employee = val
  }
  @action setCareer = (val) => {
    this.career = val
  }
  @action setInfoBiz = (val) => {
    this.info_biz = val.currentTarget.value
  }
  @action setDeal = (val) => {
    this.deal = val.currentTarget.value
  }
  @action setHistories = (val) => {
    this.histories = val.currentTarget.value;
  }; // 0923 추가
  @action addPossibleSet = (val) => {
    this.possible_set.push(val)
  }
  @action addHistorySet = (val) => {
    this.history_set.push(val)
  }
  @action removePossibleSet = (idx) => {
    this.possible_set.splice(idx, 1)
  }
  @action removeHistorySet = (idx) => {
    this.history_set.splice(idx, 1)
  }
  @action setInfoCompany = (val) => {
    this.info_company = val.currentTarget.value
  }
  @action setCompanyName = (val) => {
    this.company_name = val
  }
  @action setFile = (val) => {
    this.file = val
  }
  @action setLogo = (val) => {
    this.logo = val
  }
  @action setPortfolioSet = (array) => {
    this.portfolio_set = array
    this.resetPortfolioChecked()
    this.portfolio_set.forEach(portfolio => {
      this.portfolio_checked.push(false)
    })
    this.sortPortfolioSet()
  }
  @action sortPortfolioSet = () => {
    this.portfolio_set = this.portfolio_set.sort((a, b) => {
      if(a.is_main === b.is_main) {
        return a.id - b.id
      }
      else {
        return b.is_main - a.is_main
      }
    })

    console.log(this.portfolio_set)
  }
  @action setStructureSet = (array) => {
    this.structure_set = array
    this.resetStructureChecked()
    this.structure_set.forEach(structure => {
      this.structure_checked.push(false)
    })

    this.sortStructureSet()
  }
  @action sortStructureSet = () => {
    this.structure_set = this.structure_set.sort((a, b) => {
      if(a.is_main === b.is_main) {
        return a.id - b.id
      }
      else {
        return b.is_main - a.is_main
      }
    })
  }
  @action setMachineSet = (array) => {
    this.machine_set = array
    this.resetMachineChecked()
    this.machine_set.forEach(machine => {
      this.machine_checked.push(false)
    })
    this.sortMachineSet()
  }
  @action sortMachineSet = () => {
    this.machine_set = this.machine_set.sort((a, b) => {
      if(a.is_main === b.is_main) {
        return a.id - b.id
      }
      else {
        return b.is_main - a.is_main
      }
    })
  }
  @action setCertificationSet = (array) => {
    this.certification_set = array
    this.resetCertificationChecked()
    this.certification_set.forEach(certification => {
      this.certification_checked.push(false)
    })
    this.sortCertificationSet()
  }
  @action sortCertificationSet = () => {
    this.certification_set = this.certification_set.sort((a, b) => {
      if(a.is_main === b.is_main) {
        return a.id - b.id
      }
      else {
        return b.is_main - a.is_main
      }
    })
  }
  @action setProcessSet = (array) => {
    this.process_set = array
    this.resetProcessChecked()
    this.process_set.forEach(process => {
      this.process_checked.push(false)
    })
    this.sortProcessSet()
  }
  @action sortProcessSet = () => {
    this.process_set = this.process_set.sort((a, b) => {
      if(a.is_main === b.is_main) {
        return a.id - b.id
      }
      else {
        return b.is_main - a.is_main
      }
    })
  }

  @action togglePortfolioChecked = (idx) => {
    this.portfolio_checked[idx] = !this.portfolio_checked[idx]
  }
  @action toggleStructureChecked = (idx) => {
    this.structure_checked[idx] = !this.structure_checked[idx]
  }
  @action toggleMachineChecked = (idx) => {
    this.machine_checked[idx] = !this.machine_checked[idx]
  }
  @action toggleCertificationChecked = (idx) => {
    this.certification_checked[idx] = !this.certification_checked[idx]
  }
  @action toggleProcessChecked = (idx) => {
    this.process_checked[idx] = !this.process_checked[idx]
  }
  @action resetPortfolioChecked = () => {
    this.portfolio_checked = []
  }
  @action resetStructureChecked = () => {
    this.structure_checked = []
  }
  @action resetMachineChecked = () => {
    this.machine_checked = []
  }
  @action resetCertificationChecked = () => {
    this.certification_checked = []
  }
  @action resetProcessChecked = () => {
    this.process_checked = []
  }
  @action setCity = (obj) => {
    this.region_data = []
    this.city = obj
    const city_data = this.city_data

    if(city_data.filter(item => item.id === obj.id).length) {
      this.region_data = city_data.filter(item => item.id === obj.id)[0].region_set
    }

    let region_valid = false
    this.region_data.forEach(region => {
      if(this.region == region) {
        region_valid = true
      }
    })

    if(!region_valid) {
      this.region = null
    }
  }
  @action setRegion = (obj) => {
    console.log(obj)
    this.region = obj
  }

  @action getCityData = () => {
    CategoryAPI.getCity()
    .then(res => {
      this.city_data = res.data.results
    })
    .catch(e => {
      console.log(e)
      console.log(e.response)
    })
  }
  @action getRegionData = () => {
    let next = null

    CategoryAPI.getRegion()
      .then(async (res) => {
        this.region_data = res.data.results
        next = res.data.next

        while(next) {
          const req = {
            nextUrl: next,
          }
          await CategoryAPI.getNextRegion(req)
            .then(res => {
              this.region_data = this.region_data.concat(res.data.results)
              next = res.data.next
            })
            .catch(e => {
              console.log(e.response)
            })
        }
      })
      .catch(e => {
        console.log(e.response)
      })
  }

  @action setCategoryMiddleSet = (id) => {
    const index = this.category_middle_set.indexOf(id);

    if (index > -1) {
      this.category_middle_set.splice(index, 1);
      this.category_middle_set = [...this.category_middle_set]
    }
    else {
      this.category_middle_set = [id, ...this.category_middle_set]
    }
  }
  @action checkLogin = () => {
    const token = localStorage.getItem('token')
    const req = {
      data: {
        username: this.email,
        password: this.password,
      },
      headers: {
        'Authorization': `Token ${token}`,
      }
    }

    AccountAPI.reloadUserInfo(req)
      .then(res => {
        if(res.data.data.User.type == 0) {
          alert('잘못된 접근입니다.')
          Router.push('/')
        }
        else if(res.data.data.User.type == 1) {
          console.log('파트너 정보 리로딩')
          console.log(res.data.data.Partner[0])
          this.data = res.data.data.Partner[0]
          this.company_name = res.data.data.Partner[0].name
          this.setCity(
            this.getCityById(res.data.data.Partner[0].city)
          )
          this.setRegion(
            this.getRegionById(res.data.data.Partner[0].region)
          )
          this.career = res.data.data.Partner[0].career
          this.employee = res.data.data.Partner[0].employee
          this.revenue = res.data.data.Partner[0].revenue
          this.info_biz = res.data.data.Partner[0].info_biz
          this.info_company = res.data.data.Partner[0].info_company
          this.deal = res.data.data.Partner[0].deal
          this.histories = res.data.data.Partner[0].history
          // 카테고리 초기화
          this.category_middle_set = []
          this.possible_set = []
          this.history_set = []

          res.data.data.Partner[0].category.forEach(category => {
            this.category_middle_set = this.category_middle_set.concat(category.id)
          })

    //      res.data.data.Partner[0].product_possible.forEach(subclass => {
    //        this.possible_set.push(subclass)
    //      })

          res.data.data.Partner[0].product_history.forEach(subclass => {
            this.history_set.push(subclass)
          })

          this.setPortfolioSet(res.data.data.Partner[0].portfolio_set)
          this.setStructureSet(res.data.data.Partner[0].structure_set)
          this.setMachineSet(res.data.data.Partner[0].machine_set)
          this.setCertificationSet(res.data.data.Partner[0].certification_set)
          this.setProcessSet(res.data.data.Partner[0].process_set)
        }
      })
      .catch(e => {
        try {
          console.log(e)
          console.log(e.response)
          alert(e.response.data.message)
        }
        catch {
          console.log(e)
          console.log(e.response)
        }
        localStorage.removeItem('token')
        Router.push('/')
      })
  }

  @action signup = async () => {
    if (!this.email) { await alert("이메일을 입력해주세요."); return }
    var emailValid = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/
    if (!emailValid.test(this.email)) { await alert("이메일 형식을 확인해주세요."); return }
    if (!this.password) { await alert("비밀번호를 입력해주세요."); return }
    if (this.password != this.password2) { await alert("비밀번호가 일치하지 않습니다."); return }
    if (!this.phone) { await alert("휴대전화를 입력해주세요."); return }

    console.log("email : ", this.email)
    console.log("password : ", this.password)
    console.log("password2 : ", this.password2)
    console.log("phone : ", this.phone)
    if(this.type === 'client') {
      this.loading = true
      const req = {
        data: {
          username: this.email,
          password: this.password,
          phone: this.phone,
          type: 0
        }
      }
      AccountAPI.clientSignup(req)
      .then(res => {
        setTimeout(() => {
          this.loading = false
          Router.push('/login')
        }, 800);
      })
      .catch(e => {
        try {
          alert(e.response.data.message)
        }
        catch {
          console.log(e)
          console.log(e.response)
        }
        this.loading = false
      })
    }
    else {
      if (!this.company_name) { await alert("상호명을 입력해주세요."); return }
      if (!this.employee) { await alert("종업원 수를 입력해주세요."); return }
      if (!this.career) { await alert("설립연도를 입력해주세요."); return }
      if (!this.revenue) { await alert("매출액을 입력해주세요."); return }
      if (!this.city) { await alert("시/도를 입력해주세요."); return }
      if (!this.region) { await alert("지역을 입력해주세요."); return }

      if (!this.info_biz) { await alert("주요사업을 입력해주세요."); return }
      if (!this.deal) { await alert("주요거래처를 입력해주세요."); return }
      if (!this.info_company) { await alert("회사소개를 입력해주세요."); return }

  //    if (toJS(this.possible_set).length === 0) { await alert("가능한 제품을 입력해주세요."); return }
      if (toJS(this.history_set).length === 0) { await alert("진행한 제품을 입력해주세요."); return }

      if (this.category_middle_set.length === 0) { await alert("개발분야를 선택 해주세요."); return }

      if (!this.file) { await alert("포트폴리오를 입력해주세요."); return }
      if (!this.logo) { await alert("로고를 입력해주세요."); return }

      var formData = new FormData()

  //    var possible_set = []
  //    for (var i of this.possible_set) {
  //      await possible_set.push(i.id)
  //    }

      var history_set = []
      for (var i of this.history_set) {
        await history_set.push(i.id)
      }

      formData.append('username', this.email);
      formData.append('password', this.password);
      formData.append('phone', this.phone);
      formData.append('type', 1);

      formData.append('name', this.company_name);
      formData.append('employee', this.employee);
      formData.append('career', this.career);
      formData.append('revenue', this.revenue);
      formData.append('city', this.city.id);
      formData.append('region', this.region.id);

      formData.append('info_biz', this.info_biz);
      formData.append('deal', this.deal);
      formData.append('info_company', this.info_company);
  //    formData.append('possible_set', possible_set);
      formData.append('history_set', history_set);

      formData.append('category_middle', this.category_middle_set);
      formData.append('logo', this.logo);
      formData.append('file', this.file);

      this.loading = true
      const req = {
        data: formData
      }
      AccountAPI.partnerSignup(req)
      .then(res => {
        setTimeout(() => {
          this.loading = false
          Router.push('/login')
        }, 800);
      })
      .catch(e => {
        try {
          console.log(e)
          console.log(e.response)
          console.log(e.response.data)
          alert(e.response.data.message)
        }
        catch {
          console.log(e)
          console.log(e.response)
        }
        setTimeout(() => { this.loading = false }, 1500);
      })
    }
  }

  @action updateLogo = (partnerId, file) => {
    let formData = new FormData()
    formData.append('logo', file)

    const token = localStorage.getItem('token')
    const req = {
      id: partnerId,
      data: formData,
      headers: {
        'Authorization': `Token ${token}`,
      }
    }

    PartnerAPI.patch(req)
      .then(async (res) => {
        console.log('파트너사 로고 업데이트 성공')
        console.log(res.data)

        alert('로고가 변경되었습니다');
        this.data.logo = res.data.logo
      })
      .catch(e => {
        console.log(e);
        console.log(e.response);
      })
  }
  @action updatePartner = (partnerId) => {
    const token = localStorage.getItem('token')
    const req = {
      id: partnerId,
      data: this.getData(),
      headers: {
        'Authorization': `Token ${token}`,
      }
    }

    PartnerAPI.patch(req)
      .then(async (res) => {
        console.log('파트너사 정보 업데이트 성공')
        console.log(res.data)

        alert('수정이 완료되었습니다');
        Router.push('/profile').then(() => window.scrollTo(0, 0));
      })
      .catch(e => {
        console.log(e.response)
        const errors = e.response.data

        for(const field in errors) {
          let field_name = ''
          if(field === 'category_middle') {
            field_name = '개발분야'
          }
    //      else if(field === 'possible_set') {
    //        field_name = '가능한 제품 분야'
    //      }
          else if(field === 'history_set') {
            field_name = '진행한 제품들'
          }

          alert(`${field_name}: ${errors[field]}`)
        }
      })
  }

  @action togglePortfolioIsMain = (idx) => {
    const token = localStorage.getItem('token')
    const req = {
      id: this.portfolio_set[idx].id,
      headers: {
        'Authorization': `Token ${token}`,
      },
      data: {
        is_main: !this.portfolio_set[idx].is_main
      },
    }

    PartnerAPI.patchPortfolio(req)
      .then(res => {
        console.log('포트폴리오 중요 표시 토글')
        console.log(res.data)

        this.portfolio_set[idx].is_main = !this.portfolio_set[idx].is_main
        this.sortPortfolioSet()
      })
      .catch(e => {
        console.log(e.response)
        try {
          alert(e.response.data.message)
        }
        catch {
          console.log(e)
          console.log(e.response)
        }
      })
  }
  @action updateCheckedPortfolioIsMain = () => {
    // check된 포르폴리오 isMain
    this.portfolio_checked.forEach((checked, idx) => {
      if(!checked) { return }

      const token = localStorage.getItem('token')
      const req = {
        id: this.portfolio_set[idx].id,
        headers: {
          'Authorization': `Token ${token}`,
        },
        data: {
          is_main: true,
        },
      }

      PartnerAPI.patchPortfolio(req)
        .then(res => {
          console.log('체크된 포트폴리오 중요 표시 성공')
          console.log(res.data)

          this.portfolio_set[idx].is_main = true
          this.sortPortfolioSet()
        })
        .catch(e => {
          console.log(e.response)
        })
    })
  }
  @action deletePortfolioSet = (deletedIdx) => {
    deletedIdx.sort()
    deletedIdx.forEach((idx, deleted_count) => {
      this.portfolio_set.splice(idx - deleted_count, 1)
      this.portfolio_checked.splice(idx - deleted_count, 1)

      console.log(this.portfolio_set)
    })
  }
  deletePortfolio = () => {
    let deletedCount = 0
    let deletedIdx = []
    let portfolioChecked = []

    this.portfolio_checked.forEach((checked, idx) => {
      if(checked) {
        portfolioChecked.push(idx)
      }
    })

    portfolioChecked.forEach(async (checkedIdx, idx) => {
      const token = localStorage.getItem('token')
      const req = {
        id: this.portfolio_set[checkedIdx].id,
        headers: {
          'Authorization': `Token ${token}`,
        }
      }

      console.log('요청: ' + checkedIdx)
      await PartnerAPI.deletePortfolio(req)
        .then(res => {
          console.log('체크된 포트폴리오 삭제 성공: ' + idx)

          deletedCount += 1
          deletedIdx.push(checkedIdx)

          // 요청에 대한 모든 응답이 도착했다면
          // mobx 스토어의 내용에도 반영
          if(deletedCount === portfolioChecked.length) {
            this.deletePortfolioSet(deletedIdx)
          }
        })
        .catch(e => {
          try {
            alert(e.response.data.message)
          }
          catch {
            console.log(e)
            console.log(e.response)
          }
        })
    })
  }
  @action postPortfolio = (partnerId, files) => {
    for (let i = 0; i < files.length; i++) {
      const token = localStorage.getItem('token')
      const req = {
        headers: {
          'Authorization': `Token ${token}`,
        },
      }
      let formData = new FormData()
      formData.append('img_portfolio', files[i])
      formData.append('is_main', 'false')
      formData.append('partner', partnerId)

      PartnerAPI.postPortfolio(req, formData)
        .then(res => {
          console.log('포트폴리오 업로드 성공!')
          console.log(res.data)

          this.portfolio_set.push({
            ...res.data
          })
          this.portfolio_checked.push(false)
        })
        .catch(e => {
          console.log(e.response)
          try {
            alert(e.response.data.message)
          }
          catch {
            console.log(e)
            console.log(e.response)
          }
        })
    }
  }

  @action toggleStructureIsMain = (idx) => {
    const token = localStorage.getItem('token')
    const req = {
      id: this.structure_set[idx].id,
      headers: {
        'Authorization': `Token ${token}`,
      },
      data: {
        is_main: !this.structure_set[idx].is_main
      },
    }

    PartnerAPI.patchStructure(req)
      .then(res => {
        console.log('조직도 중요 표시 토글')
        console.log(res.data)

        this.structure_set[idx].is_main = !this.structure_set[idx].is_main
        this.sortStructureSet()
      })
      .catch(e => {
        console.log(e.response)
        try {
          alert(e.response.data.message)
        }
        catch {
          console.log(e)
          console.log(e.response)
        }
      })
  }
  @action updateCheckedStructureIsMain = () => {
    // check된 포르폴리오 isMain
    this.structure_checked.forEach((checked, idx) => {
      if(!checked) { return }

      const token = localStorage.getItem('token')
      const req = {
        id: this.structure_set[idx].id,
        headers: {
          'Authorization': `Token ${token}`,
        },
        data: {
          is_main: true,
        },
      }

      PartnerAPI.patchStructure(req)
        .then(res => {
          console.log('체크된 조직도 중요 표시 성공')
          console.log(res.data)

          this.structure_set[idx].is_main = true
          this.sortStructureSet()
        })
        .catch(e => {
          console.log(e.response)
        })
    })
  }
  @action postStructure = (partnerId, files) => {
    for (let i = 0; i < files.length; i++) {
      const token = localStorage.getItem('token')
      const req = {
        headers: {
          'Authorization': `Token ${token}`,
        },
      }
      let formData = new FormData()
      formData.append('img_structure', files[i])
      formData.append('is_main', 'false')
      formData.append('partner', partnerId)

      PartnerAPI.postStructure(req, formData)
        .then(res => {
          console.log('조직 업로드 성공!')
          console.log(res.data)

          this.structure_set.push({
            ...res.data
          })
          this.structure_checked.push(false)
        })
        .catch(e => {
          console.log(e.response)
          try {
            alert(e.response.data.message)
          }
          catch {
            console.log(e)
            console.log(e.response)
          }
        })
    }
  }
  @action deleteStructureSet = (deletedIdx) => {
    deletedIdx.sort()
    deletedIdx.forEach((idx, deleted_count) => {
      this.structure_set.splice(idx - deleted_count, 1)
      this.structure_checked.splice(idx - deleted_count, 1)

      console.log(this.structure_set)
    })
  }
  deleteStructure = () => {
    let deletedCount = 0
    let deletedIdx = []
    let structureChecked = []

    this.structure_checked.forEach((checked, idx) => {
      if(checked) {
        structureChecked.push(idx)
      }
    })

    structureChecked.forEach(async (checkedIdx, idx) => {
      const token = localStorage.getItem('token')
      const req = {
        id: this.structure_set[checkedIdx].id,
        headers: {
          'Authorization': `Token ${token}`,
        }
      }

      console.log('요청: ' + checkedIdx)
      await PartnerAPI.deleteStructure(req)
        .then(res => {
          console.log('체크된 조직도 삭제 성공: ' + idx)

          deletedCount += 1
          deletedIdx.push(checkedIdx)

          // 요청에 대한 모든 응답이 도착했다면
          // mobx 스토어의 내용에도 반영
          if(deletedCount === structureChecked.length) {
            this.deleteStructureSet(deletedIdx)
          }
        })
        .catch(e => {
          try {
            alert(e.response.data.message)
          }
          catch {
            console.log(e)
            console.log(e.response)
          }
        })
    })
  }

  @action toggleMachineIsMain = (idx) => {
    const token = localStorage.getItem('token')
    const req = {
      id: this.machine_set[idx].id,
      headers: {
        'Authorization': `Token ${token}`,
      },
      data: {
        is_main: !this.machine_set[idx].is_main
      },
    }

    PartnerAPI.patchMachine(req)
      .then(res => {
        console.log('보유장비 중요 표시 토글')
        console.log(res.data)

        this.machine_set[idx].is_main = !this.machine_set[idx].is_main
        this.sortMachineSet()
      })
      .catch(e => {
        console.log(e.response)
        try {
          alert(e.response.data.message)
        }
        catch {
          console.log(e)
          console.log(e.response)
        }
      })
  }
  @action updateCheckedMachineIsMain = () => {
    // check된 포르폴리오 isMain
    this.machine_checked.forEach((checked, idx) => {
      if(!checked) { return }

      const token = localStorage.getItem('token')
      const req = {
        id: this.machine_set[idx].id,
        headers: {
          'Authorization': `Token ${token}`,
        },
        data: {
          is_main: true,
        },
      }

      PartnerAPI.patchMachine(req)
        .then(res => {
          console.log('체크된 보유장비 중요 표시 성공')
          console.log(res.data)

          this.machine_set[idx].is_main = true
          this.sortMachineSet()
        })
        .catch(e => {
          console.log(e.response)
        })
    })
  }
  @action postMachine = (partnerId, files) => {
    for (let i = 0; i < files.length; i++) {
      const token = localStorage.getItem('token')
      const req = {
        headers: {
          'Authorization': `Token ${token}`,
        },
      }
      let formData = new FormData()
      formData.append('img_machine', files[i])
      formData.append('is_main', 'false')
      formData.append('partner', partnerId)

      PartnerAPI.postMachine(req, formData)
        .then(res => {
          console.log('보유 장비 업로드 성공!')
          console.log(res.data)

          this.machine_set.push({
            ...res.data
          })
          this.machine_checked.push(false)
        })
        .catch(e => {
          console.log(e.response)
          try {
            alert(e.response.data.message)
          }
          catch {
            console.log(e)
            console.log(e.response)
          }
        })
    }
  }
  @action deleteMachineSet = (deletedIdx) => {
    deletedIdx.sort()
    deletedIdx.forEach((idx, deleted_count) => {
      this.machine_set.splice(idx - deleted_count, 1)
      this.machine_checked.splice(idx - deleted_count, 1)

      console.log(this.machine_set)
    })
  }
  deleteMachine = () => {
    let deletedCount = 0
    let deletedIdx = []
    let machineChecked = []

    this.machine_checked.forEach((checked, idx) => {
      if(checked) {
        machineChecked.push(idx)
      }
    })

    machineChecked.forEach(async (checkedIdx, idx) => {
      const token = localStorage.getItem('token')
      const req = {
        id: this.machine_set[checkedIdx].id,
        headers: {
          'Authorization': `Token ${token}`,
        }
      }

      console.log('요청: ' + checkedIdx)
      await PartnerAPI.deleteMachine(req)
        .then(res => {
          console.log('체크된 보유 장비 삭제 성공: ' + idx)

          deletedCount += 1
          deletedIdx.push(checkedIdx)

          // 요청에 대한 모든 응답이 도착했다면
          // mobx 스토어의 내용에도 반영
          if(deletedCount === machineChecked.length) {
            this.deleteMachineSet(deletedIdx)
          }
        })
        .catch(e => {
          try {
            alert(e.response.data.message)
          }
          catch {
            console.log(e)
            console.log(e.response)
          }
        })
    })
  }

  @action toggleCertificationIsMain = (idx) => {
    const token = localStorage.getItem('token')
    const req = {
      id: this.certification_set[idx].id,
      headers: {
        'Authorization': `Token ${token}`,
      },
      data: {
        is_main: !this.certification_set[idx].is_main
      },
    }

    PartnerAPI.patchCertification(req)
      .then(res => {
        console.log('인증서 중요 표시 토글')
        console.log(res.data)

        this.certification_set[idx].is_main = !this.certification_set[idx].is_main
        this.sortCertificationSet()
      })
      .catch(e => {
        console.log(e.response)
        try {
          alert(e.response.data.message)
        }
        catch {
          console.log(e)
          console.log(e.response)
        }
      })
  }
  @action updateCheckedCertificationIsMain = () => {
    // check된 포르폴리오 isMain
    this.machine_checked.forEach((checked, idx) => {
      if(!checked) { return }

      const token = localStorage.getItem('token')
      const req = {
        id: this.certification_set[idx].id,
        headers: {
          'Authorization': `Token ${token}`,
        },
        data: {
          is_main: true,
        },
      }

      PartnerAPI.patchCertification(req)
        .then(res => {
          console.log('체크된 인증서 중요 표시 성공')
          console.log(res.data)

          this.certification_set[idx].is_main = true
          this.sortCertificationSet()
        })
        .catch(e => {
          console.log(e.response)
        })
    })
  }
  @action postCertification = (partnerId, files) => {
    for (let i = 0; i < files.length; i++) {
      const token = localStorage.getItem('token')
      const req = {
        headers: {
          'Authorization': `Token ${token}`,
        },
      }
      let formData = new FormData()
      formData.append('img_certification', files[i])
      formData.append('is_main', 'false')
      formData.append('partner', partnerId)

      PartnerAPI.postCertification(req, formData)
        .then(res => {
          console.log('인증서 업로드 성공!')
          console.log(res.data)

          this.certification_set.push({
            ...res.data
          })
          this.certification_checked.push(false)
        })
        .catch(e => {
          console.log(e.response)
          try {
            alert(e.response.data.message)
          }
          catch {
            console.log(e)
            console.log(e.response)
          }
        })
    }
  }
  @action deleteCertificationSet = (deletedIdx) => {
    deletedIdx.sort()
    deletedIdx.forEach((idx, deleted_count) => {
      this.certification_set.splice(idx - deleted_count, 1)
      this.certification_checked.splice(idx - deleted_count, 1)

      console.log(this.certification_set)
    })
  }
  deleteCertification = () => {
    let deletedCount = 0
    let deletedIdx = []
    let certificationChecked = []

    this.certification_checked.forEach((checked, idx) => {
      if(checked) {
        certificationChecked.push(idx)
      }
    })

    certificationChecked.forEach(async (checkedIdx, idx) => {
      const token = localStorage.getItem('token')
      const req = {
        id: this.certification_set[checkedIdx].id,
        headers: {
          'Authorization': `Token ${token}`,
        }
      }

      console.log('요청: ' + checkedIdx)
      await PartnerAPI.deleteCertification(req)
        .then(res => {
          console.log('체크된 보유 장비 삭제 성공: ' + idx)

          deletedCount += 1
          deletedIdx.push(checkedIdx)

          // 요청에 대한 모든 응답이 도착했다면
          // mobx 스토어의 내용에도 반영
          if(deletedCount === certificationChecked.length) {
            this.deleteCertificationSet(deletedIdx)
          }
        })
        .catch(e => {
          try {
            alert(e.response.data.message)
          }
          catch {
            console.log(e)
            console.log(e.response)
          }
        })
    })
  }

  @action toggleProcessIsMain = (idx) => {
    const token = localStorage.getItem('token')
    const req = {
      id: this.process_set[idx].id,
      headers: {
        'Authorization': `Token ${token}`,
      },
      data: {
        is_main: !this.process_set[idx].is_main
      },
    }

    PartnerAPI.patchProcess(req)
      .then(res => {
        console.log('공정 중요 표시 토글')
        console.log(res.data)

        this.process_set[idx].is_main = !this.process_set[idx].is_main
        this.sortProcessSet()
      })
      .catch(e => {
        console.log(e.response)
        try {
          alert(e.response.data.message)
        }
        catch {
          console.log(e)
          console.log(e.response)
        }
      })
  }
  @action updateCheckedProcessIsMain = () => {
    // check된 포르폴리오 isMain
    this.process_checked.forEach((checked, idx) => {
      if(!checked) { return }

      const token = localStorage.getItem('token')
      const req = {
        id: this.process_set[idx].id,
        headers: {
          'Authorization': `Token ${token}`,
        },
        data: {
          is_main: true,
        },
      }

      PartnerAPI.patchProcess(req)
        .then(res => {
          console.log('체크된 공정 중요 표시 성공')
          console.log(res.data)

          this.process_set[idx].is_main = true
          this.sortProcessSet()
        })
        .catch(e => {
          console.log(e.response)
        })
    })
  }
  @action postProcess = (partnerId, files) => {
    for (let i = 0; i < files.length; i++) {
      const token = localStorage.getItem('token')
      const req = {
        headers: {
          'Authorization': `Token ${token}`,
        },
      }
      let formData = new FormData()
      formData.append('img_process', files[i])
      formData.append('is_main', 'false')
      formData.append('partner', partnerId)

      PartnerAPI.postProcess(req, formData)
        .then(res => {
          console.log('공정 업로드 성공!')
          console.log(res.data)

          this.process_set.push({
            ...res.data
          })
          this.process_checked.push(false)
        })
        .catch(e => {
          console.log(e.response)
          try {
            alert(e.response.data.message)
          }
          catch {
            console.log(e)
            console.log(e.response)
          }
        })
    }
  }
  @action deleteProcessSet = (deletedIdx) => {
    deletedIdx.sort()
    deletedIdx.forEach((idx, deleted_count) => {
      this.process_set.splice(idx - deleted_count, 1)
      this.process_checked.splice(idx - deleted_count, 1)

      console.log(this.process_set)
    })
  }
  deleteProcess = () => {
    let deletedCount = 0
    let deletedIdx = []
    let processChecked = []

    this.process_checked.forEach((checked, idx) => {
      if(checked) {
        processChecked.push(idx)
      }
    })

    processChecked.forEach(async (checkedIdx, idx) => {
      const token = localStorage.getItem('token')
      const req = {
        id: this.process_set[checkedIdx].id,
        headers: {
          'Authorization': `Token ${token}`,
        }
      }

      console.log('요청: ' + checkedIdx)
      await PartnerAPI.deleteProcess(req)
        .then(res => {
          console.log('체크된 공 삭제 성공: ' + idx)

          deletedCount += 1
          deletedIdx.push(checkedIdx)

          // 요청에 대한 모든 응답이 도착했다면
          // mobx 스토어의 내용에도 반영
          if(deletedCount === processChecked.length) {
            this.deleteProcessSet(deletedIdx)
          }
        })
        .catch(e => {
          try {
            alert(e.response.data.message)
          }
          catch {
            console.log(e)
            console.log(e.response)
          }
        })
    })
  }

  getData = () => {
    let possible_set = []
    let history_set = []

  //  this.possible_set.forEach(subclass => {
  //    possible_set.push(subclass.id)
  //  })
    this.history_set.forEach(subclass => {
      history_set.push(subclass.id)
    })

    return {
      name: this.company_name,
      //employee: this.employee,
      //career: this.career,
      //revenue: this.revenue,
      city: this.city.id,
      //region: this.region.id,
      //info_biz: this.info_biz,
      info_company: this.info_company,
      deal: this.deal,
      history: this.histories, // 0923 수정
      category_middle: this.category_middle_set,
  //    possible_set: possible_set,
      //history_set: history_set,
    }
  }
  getCityById = (id) => {
    if(id === -1) { return }

    console.log(`getCityById(${id})`)
    const idx = this.city_data.findIndex(city => city.id == id)

    return this.city_data[idx]
  }
  getRegionById = (id) => {
    if(id === -1) { return }

    console.log(`getRegionById(${id})`)
    const idx = this.region_data.findIndex(city => city.id == id)

    console.log(idx)

    return this.region_data[idx]
  }
}

export default new Profile()
