import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import SelectComponent from "Select";
import Router from "next/router";
import MobileSelectComponent from "MobileSelect";

import FilterBox from "./FilterBox";
import FilterBox2 from "./FilterBox2";
import FileComponent from "./AddFile";

import * as PartnerAPI from "axios/Partner";
import * as RequestAPI from "axios/Request";
import { toJS } from "mobx";

const pass3 = "static/images/pass3.png";
const request_modal_img = "static/images/producer/request_modal_img.png";

const customStyles = {
  container: (base, state) => {
    return {
      ...base,
      zIndex: state.isFocused ? "98" : "auto", //Only when current state focused
      width: 185,
    };
  },
  dropdownIndicator: () => ({
    color: "#555555",
    width: 32,
    height: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 16,
    fontSize: 16,
  }),
  control: () => ({
    fontSize: 16,
    border: "1px solid #e6e6e6",
    backgroundColor: "#fff",
    display: "flex",
    borderRadius: 6,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

const mobileCustomStyles = {
  container: (base, state) => {
    return {
      ...base,
      zIndex: state.isFocused ? "98" : "auto", //Only when current state focused
      width: 130,
    };
  },
  dropdownIndicator: () => ({
    color: "#555555",
    width: 28,
    height: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 12,
    fontSize: 12,
  }),
  control: () => ({
    fontSize: 12,
    border: "1px solid #e6e6e6",
    backgroundColor: "#fff",
    display: "flex",
    borderRadius: 6,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

@inject("Partner", "Auth")
@observer
class RequestModal extends React.Component {
  state = {
    search: "",
    modal_open: false,
    list: false,
  };

  componentDidMount = () => {
    const { Partner } = this.props;

    window.onload = function () {
      window.document.body.scroll = "auto";
    };
    console.log(toJS(Partner.input_big_category));
    console.log(toJS(Partner.input_detail_big_category));

    Partner.filterList = [];
    Partner.filter_category = 0;
  };
  componentWillUnmount = async () => {
    console.log("Modal unmount");
    const { Partner } = this.props;

    Partner.input_detail_big_category = null;
    Partner.input_detail_small_category = null;
    Partner.detail_select_city = null;
    Partner.filterList = [];
    Partner.filter_category = 0;
    Partner.requestModalActive = false;

    Partner.detailMinDirectInput = false;
    Partner.detailMaxDirectInput = false;

    console.log(toJS(Partner.filterArray));
    console.log(Partner.partner_count);
    console.log(toJS(Partner.category_dic));
  };

  openDoneModal = async () => {
    const { Partner } = this.props;
    console.log("requestdonemodal open click");
    Partner.requestDoneModalActive = true;
    console.log(Partner.requestDoneModalActive);
    this.setState({ g: 3 });
  };
  closeDoneModal = () => {
    const { Partner } = this.props;
    console.log("requestdonemodal close click");

    Partner.requestDoneModalActive = false;
  };

  onRequestSubmit = async () => {
    const { Partner } = this.props;

    Partner.requestModalActive = false;
    await this.openDoneModal();
  };

  countPrice = () => {
    const { Partner, Auth } = this.props;
    let price = 0;

    if (Partner.detailMinDirectInput) {
      price += Partner.input_detail_direct_min_budget;
    } else {
      price +=
        Partner.input_detail_min_budget &&
        Partner.input_detail_min_budget.value;
    }

    price += "원 ~ ";
    if (Partner.detailMaxDirectInput) {
      price += Partner.input_detail_direct_max_budget;
    } else {
      price +=
        Partner.input_detail_max_budget &&
        Partner.input_detail_max_budget.value;
    }
    price += "원";

    return price;
  };
  onRequestHandler = async () => {
    const { Partner, Auth, width } = this.props;

    console.log(width);
    await Auth.checkLogin();
    // if (!Auth.logged_in_user) {
    //   alert("로그인이 필요한 서비스입니다.");
    //   Router.push("/login");
    //   return;
    // }

    let requestFilter = "";
    let partFilterAry = [];
    let checkFilter = true;
    let requestFilterEtc = "";
    let minValue = 0;
    let maxValue = 0;

    let emailval =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    // if (
    //   Partner.input_detail_big_category == null ||
    //   Partner.input_detail_small_category == null
    // ) {
    //   alert("카테고리를 다시 선택해주세요.");
    //   // Router.push("/login");
    //   return;
    // }

    if (Partner.detailMinDirectInput) {
      minValue = Partner.input_detail_direct_min_budget;
    } else {
      minValue =
        Partner.input_detail_min_budget &&
        Partner.input_detail_min_budget.value;
    }
    if (Partner.detailMaxDirectInput) {
      maxValue = Partner.input_detail_direct_max_budget;
    } else {
      maxValue =
        Partner.input_detail_max_budget &&
        Partner.input_detail_max_budget.value;
    }

    console.log(minValue);
    console.log(maxValue);
    console.log(toJS(Partner.detail_select_city));
    // if (!Partner.detail_select_city) {
    //   alert("위치 다시 선택해주세요.");
    //   return;
    // }

    if (!Partner.filterbox_view_checked_idx) {
      alert("예산 공개 여부를 다시 선택해주세요.");
      return;
    }

    if (minValue > maxValue) {
      alert("예산을 다시 선택해주세요.");
      return;
    }

    // console.log(toJS(Partner.detail_select_city.city));

    if (!Partner.detailRequestTitle) {
      alert("제목을 다시 입력해주세요.");
      return;
    }
    if (!Partner.detailRequestEmail) {
      alert("이메일을 다시 입력해주세요.");
      return;
    }

    if (!emailval.test(Partner.detailRequestEmail)) {
      return alert("올바른 이메일 주소를 입력해주세요");
    }

    if (!Partner.detailRequestPhone) {
      alert("전화번호를 다시 입력해주세요.");
      return;
    }
    if (!Partner.detailCompanyName) {
      alert("회사명을 다시 입력해주세요.");
      return;
    }
    if (!Partner.detailPassword) {
      alert("확인용 비밀번호를 다시 입력해주세요.");
      return;
    }
    if (!Partner.detailRank) {
      alert("직급을 다시 입력해주세요.");
      return;
    }

    await Partner.filterArray.map((piece, id) => {
      console.log(piece.name);
      partFilterAry.push(piece.name);
    });

    await Partner.filterArray.map((item, idx) => {
      if (item.checked) {
        if (item.name === "기타") {
          checkFilter = false;
          requestFilter = Partner.filter_category_ary.filter(
            (data) =>
              partFilterAry.includes(data.category) === false &&
              data.category !== "전체"
          );
          console.log(
            Partner.filter_category_ary.filter(
              (data) => partFilterAry.includes(data.category) === false
            )
          );
        } else {
          console.log(item.name);
          console.log(toJS(Partner.filter_category_ary));
          console.log(
            Partner.filter_category_ary.filter(
              (data) => data.category === item.name
            )
          );
          requestFilter =
            requestFilter +
            Partner.filter_category_ary.filter(
              (data) => data.category === item.name
            )[0].id +
            ", ";
        }
      }
    });
    console.log(requestFilter);
    console.log(requestFilter.length);
    console.log(toJS(Partner.detailRequestInfo));
    console.log(toJS(Partner.filterList));
    console.log(toJS(Partner.detailRequestTitle));
    console.log(toJS(Partner.detailRequestEmail));
    console.log(toJS(Partner.detailRequestPhone));
    console.log(toJS(Partner.fileArray[0]));

    var formData = new FormData();
    if (Auth.logged_in_user) {
      formData.append("client", Auth.logged_in_client.id);
    }

    // console.log(toJS(Auth.logged_in_client.id));
    formData.append("category_big", "");
    formData.append("category_small", "");
    await formData.append("city", "");

    let price = "";
    price = await this.countPrice();

    console.log(price);
    formData.append("content", Partner.detailRequestInfo);
    formData.append("price", price);
    formData.append("category_middle", "");
    formData.append("title", Partner.detailRequestTitle);
    formData.append("email", Partner.detailRequestEmail);
    formData.append("phone", Partner.detailRequestPhone);
    formData.append("companyName", Partner.detailCompanyName);
    formData.append("password", Partner.detailPassword);
    formData.append("rank", Partner.detailRank);
    Auth.logged_in_user
      ? formData.append("isLogin", "true")
      : formData.append("isLogin", "false");

    // formData.append("isLogin", false);

    for (let i = 0; i < Partner.fileArray.length; i++) {
      console.log(Partner.fileArray[i]);
      formData.append(`file`, Partner.fileArray[i]);
    }

    let open_view = 0;

    if (Partner.filterbox_view_checked_idx === 1) {
      open_view = 1;
    }
    if (Partner.filterbox_view_checked_idx === 2) {
      open_view = 0;
    }
    console.log(open_view);

    formData.append("classified", open_view);

    const req = {
      data: formData,
    };

    await PartnerAPI.setReqProducerInfo(req)
      .then(async (res) => {
        console.log("create: ", res);

        //request부분
        formData = new FormData();
        formData.append("request_state", "업체수배");
        formData.append("name", Partner.detailRequestTitle);
        // 선택한 날짜가 없으면, 기본 날짜 추가하기
        // if (Schedule.clickDay) {
        //   formData.append("deadline", Schedule.clickDay + " 09:00");
        // } else {
        //   formData.append("deadline", "2020-11-11 11:11");
        // }

        formData.append("deadline", "2020-11-11 11:11");
        formData.append("deadline_state", "납기일미정");
        //ManufactureProcess.date_undefined
        formData.append("order_request_open", Partner.detailRequestInfo);
        // formData.append("order_request_close", ManufactureProcess.requestComment2);
        //formData.append("file_open", ManufactureProcess.openFileArray[0]);

        for (let i = 0; i < Partner.fileArray.length; i++) {
          console.log(Partner.fileArray[i]);
          formData.append(`file_open`, Partner.fileArray[i]);
        }

        // for (var i = 0; i < ManufactureProcess.privateFileArray.length; i++) {
        //   formData.append(`file_close`, ManufactureProcess.privateFileArray[i]);
        // }
        if (maxValue > 0) {
          formData.append("price", maxValue);
        }

        formData.append("blueprint_exist", 0);
        formData.append("process", 1);
        formData.append("detailprocess", 1);
        formData.append("number", 1);

        let RequestReq;

        if (Auth.logged_in_user) {
          const Token = localStorage.getItem("token");
          RequestReq = {
            headers: {
              Authorization: `Token ${Token}`,
            },
            data: formData,
          };
        } else {
          RequestReq = {
            headers: {
              Authorization: `Token ${res.data.data.token}`,
            },
            data: formData,
          };
        }

        console.log(RequestReq);

        RequestAPI.create(RequestReq)
          .then((res) => {
            console.log("create: ", res);
            // ManufactureProcess.nonDrawingProjectSubmitLoading = true;
            // this.props.Request.newIndex = 1;
            // MyDataLayerPush({ event: "request_noneDrawing" });
          })
          .catch((e) => {
            // ManufactureProcess.projectSubmitLoading = true;
            console.log(e);
            console.log(e.response);
          });
        //request부분

        if (width < 797.98) {
          Partner.mobileRequestIndex = 2;
        }

        Partner.input_detail_big_category = null;
        Partner.input_detail_small_category = null;
        Partner.detail_select_city = null;
        Partner.requestModalActive = false;

        Partner.detailMinDirectInput = false;
        Partner.detailMaxDirectInput = false;

        Partner.filterArray.map((item, idx) => {
          item.checked = false;
        });

        await this.openDoneModal();
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };

  // activeFileFilter = () => {
  //   const { Partner } = this.props;
  //   if (Partner.filterFile) {
  //     Partner.filterFile = false;
  //   } else {
  //     Partner.filterFile = true;
  //   }
  // };
  render() {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, children, width, Partner } = this.props;
    return (
      <>
        {width && width > 767.99 ? (
          <ModalBox
            modal={open ? "openModal modal" : "modal"}
            style={{ display: open ? "block" : "none" }}
          >
            {open ? (
              <>
                <button className="close" onClick={close}>
                  {" "}
                  &times;{" "}
                </button>
                <aside>
                  <img src={request_modal_img} />
                </aside>
                <section>
                  <header>
                    <span>원하는 업체를 찾기 어려우신가요?</span>
                    <span>
                      볼트앤너트 업체 수배 전문가가 숨어있는 공장까지 대신
                      찾아드립니다.
                    </span>
                  </header>
                  <main>
                    <ContainerV2>
                      <Email>
                        <span>이메일</span>
                        <div>
                          <input
                            placeholder="이메일을 입력해주세요."
                            onBlur={(e) => {
                              Partner.detailRequestEmail = e.target.value;
                              console.log(toJS(Partner.detailRequestEmail));
                            }}
                            onFocus={(e) => {
                              e.target.placeholder = "";
                            }}
                          />
                        </div>
                      </Email>
                      <Phone>
                        <span>전화번호</span>
                        <div>
                          <input
                            placeholder="전화번호를 입력해주세요."
                            onBlur={(e) => {
                              Partner.detailRequestPhone = e.target.value;
                              console.log(toJS(Partner.detailRequestPhone));
                            }}
                            onFocus={(e) => {
                              e.target.placeholder = "";
                            }}
                          />
                        </div>
                      </Phone>
                      <Title>
                        <span>회사명</span>
                        <div>
                          <input
                            placeholder="회사명을 입력해주세요."
                            onBlur={(e) => {
                              Partner.detailCompanyName = e.target.value;
                            }}
                            onFocus={(e) => {
                              e.target.placeholder = "";
                            }}
                          />
                        </div>
                      </Title>
                      <Title>
                        <span>비밀번호</span>
                        <div>
                          <input
                            placeholder="확인용 비밀번호를 입력해주세요."
                            onBlur={(e) => {
                              Partner.detailPassword = e.target.value;
                            }}
                            onFocus={(e) => {
                              e.target.placeholder = "";
                            }}
                          />
                        </div>
                      </Title>
                      <Title>
                        <span>직급</span>
                        <div>
                          <input
                            placeholder="직급을 입력해주세요."
                            onBlur={(e) => {
                              Partner.detailRank = e.target.value;
                            }}
                            onFocus={(e) => {
                              e.target.placeholder = "";
                            }}
                          />
                        </div>
                      </Title>
                      <Title>
                        <span>제목</span>
                        <div>
                          <input
                            placeholder="프로젝트 제목을 입력해 주세요. ex) 반도체 장비 부품 가공 업체 수배"
                            onBlur={(e) => {
                              Partner.detailRequestTitle = e.target.value;
                              console.log(toJS(Partner.detailRequestTitle));
                            }}
                            onFocus={(e) => {
                              e.target.placeholder = "";
                            }}
                          />
                        </div>
                      </Title>
                      <Title>
                        <span>내용</span>
                        <div>
                          <input
                            placeholder="프로젝트 내용을 입력해 주세요."
                            onBlur={(e) => {
                              Partner.detailRequestInfo = e.target.value;
                              // console.log(toJS(Partner.detailRequestTitle));
                            }}
                            onFocus={(e) => {
                              e.target.placeholder = "";
                            }}
                          />
                        </div>
                      </Title>
                      <Budget>
                        <span>예산</span>
                        <FilterBox2 data={viewArray} width={this.props.width} />
                        <InputContainer>
                          {!Partner.detailMinDirectInput && (
                            <Select
                              styles={customStyles}
                              placeholder="0"
                              style={{ overflow: "visible" }}
                              options={budgetArray}
                              getOptionLabel={(option) => option.label}
                              onChange={Partner.setDetailMinBudget}
                            />
                          )}

                          {Partner.detailMinDirectInput && (
                            <DirectInputBox>
                              <input
                                placeholder="직접 입력하세요"
                                onBlur={(e) => {
                                  console.log(e.target.value);
                                  if (e.target.value === "") {
                                    Partner.detailMinDirectInput = false;
                                  } else {
                                    Partner.input_detail_direct_min_budget =
                                      e.target.value;
                                  }
                                }}
                                onFocus={(e) => {
                                  e.target.placeholder = "";
                                }}
                              />
                            </DirectInputBox>
                          )}

                          <span>원 ~ </span>
                          {!Partner.detailMaxDirectInput && (
                            <Select
                              styles={customStyles}
                              placeholder="0"
                              style={{ overflow: "visible" }}
                              options={budgetArray}
                              getOptionLabel={(option) => option.label}
                              onChange={Partner.setDetailMaxBudget}
                            />
                          )}

                          {Partner.detailMaxDirectInput && (
                            <DirectInputBox>
                              <input
                                placeholder="직접 입력하세요"
                                onBlur={(e) => {
                                  console.log(e.target.value);
                                  if (e.target.value === "") {
                                    Partner.detailMaxDirectInput = false;
                                  } else {
                                    Partner.input_detail_direct_max_budget =
                                      e.target.value;
                                  }
                                }}
                                onFocus={(e) => {
                                  e.target.placeholder = "";
                                }}
                              />
                            </DirectInputBox>
                          )}
                          <span>원</span>
                        </InputContainer>
                      </Budget>
                      <File active={Partner.filterFile}>
                        <span>참고파일</span>
                        <FileComponent file={true} />
                        <nofile
                          onClick={() => {
                            Partner.activeFileFilter();
                          }}
                        >
                          <div>
                            <div>
                              <img src={pass3} />
                            </div>
                          </div>
                          <div>없음</div>
                        </nofile>
                      </File>
                    </ContainerV2>
                  </main>
                  <footer>
                    <div
                      onClick={(e) => {
                        this.onRequestHandler();
                      }}
                    >
                      <span>업체 수배 & 견적 의뢰</span>
                    </div>
                  </footer>
                </section>
              </>
            ) : null}
          </ModalBox>
        ) : (
          <MobileContainer>
            <>
              <section>
                <main>
                  <ContainerV2>
                    {console.log(toJS(this.props.Partner.filter_city_ary))}

                    <Budget>
                      <span>예산</span>
                      <FilterBox2 data={viewArray} width={this.props.width} />
                      <InputContainer>
                        {!Partner.detailMinDirectInput && (
                          <MobileSelect
                            styles={mobileCustomStyles}
                            placeholder="0"
                            style={{ overflow: "visible" }}
                            options={budgetArray}
                            getOptionLabel={(option) => option.label}
                            onChange={Partner.setDetailMinBudget}
                          />
                        )}

                        {Partner.detailMinDirectInput && (
                          <DirectInputBox>
                            <input
                              placeholder="직접 입력하세요"
                              onBlur={(e) => {
                                console.log(e.target.value);
                                if (e.target.value === "") {
                                  Partner.detailMinDirectInput = false;
                                } else {
                                  Partner.input_detail_direct_min_budget =
                                    e.target.value;
                                }
                              }}
                              onFocus={(e) => {
                                e.target.placeholder = "";
                              }}
                            />
                          </DirectInputBox>
                        )}

                        <span>원 ~ </span>
                        {!Partner.detailMaxDirectInput && (
                          <MobileSelect
                            styles={mobileCustomStyles}
                            placeholder="0"
                            style={{ overflow: "visible" }}
                            options={budgetArray}
                            getOptionLabel={(option) => option.label}
                            onChange={Partner.setDetailMaxBudget}
                          />
                        )}

                        {Partner.detailMaxDirectInput && (
                          <DirectInputBox>
                            <input
                              placeholder="직접 입력하세요"
                              onBlur={(e) => {
                                console.log(e.target.value);
                                if (e.target.value === "") {
                                  Partner.detailMaxDirectInput = false;
                                } else {
                                  Partner.input_detail_direct_max_budget =
                                    e.target.value;
                                }
                              }}
                              onFocus={(e) => {
                                e.target.placeholder = "";
                              }}
                            />
                          </DirectInputBox>
                        )}
                        <span>원</span>
                      </InputContainer>
                    </Budget>
                    <Title>
                      <span>제목</span>
                      <div>
                        <input
                          placeholder="프로젝트 제목을 입력해 주세요. ex) 반도체 장비 부품 가공 업체 수배"
                          onBlur={(e) => {
                            Partner.detailRequestTitle = e.target.value;
                            console.log(toJS(Partner.detailRequestTitle));
                          }}
                          onFocus={(e) => {
                            e.target.placeholder = "";
                          }}
                        />
                      </div>
                    </Title>
                    <Title>
                      <span>내용</span>
                      <div>
                        <input
                          placeholder="프로젝트 내용을 입력해 주세요."
                          onBlur={(e) => {
                            Partner.detailRequestTitle = e.target.value;
                            console.log(toJS(Partner.detailRequestTitle));
                          }}
                          onFocus={(e) => {
                            e.target.placeholder = "";
                          }}
                        />
                      </div>
                    </Title>
                    <Title>
                      <span>회사명</span>
                      <div>
                        <input
                          placeholder="회사명을 입력해주세요."
                          onBlur={(e) => {
                            Partner.detailCompanyName = e.target.value;
                          }}
                          onFocus={(e) => {
                            e.target.placeholder = "";
                          }}
                        />
                      </div>
                    </Title>
                    <Title>
                      <span>비밀번호</span>
                      <div>
                        <input
                          placeholder="확인용 비밀번호를 입력해주세요."
                          onBlur={(e) => {
                            Partner.detailPassword = e.target.value;
                          }}
                          onFocus={(e) => {
                            e.target.placeholder = "";
                          }}
                        />
                      </div>
                    </Title>
                    <Title>
                      <span>직급</span>
                      <div>
                        <input
                          placeholder="직급을 입력해주세요."
                          onBlur={(e) => {
                            Partner.detailRank = e.target.value;
                          }}
                          onFocus={(e) => {
                            e.target.placeholder = "";
                          }}
                        />
                      </div>
                    </Title>
                    <Email>
                      <span>이메일</span>
                      <div>
                        <input
                          placeholder="이메일을 입력해주세요."
                          onBlur={(e) => {
                            Partner.detailRequestEmail = e.target.value;
                            console.log(toJS(Partner.detailRequestEmail));
                          }}
                          onFocus={(e) => {
                            e.target.placeholder = "";
                          }}
                        />
                      </div>
                    </Email>
                    <Phone>
                      <span>전화번호</span>
                      <div>
                        <input
                          placeholder="전화번호를 입력해주세요."
                          onBlur={(e) => {
                            Partner.detailRequestPhone = e.target.value;
                            console.log(toJS(Partner.detailRequestPhone));
                          }}
                          onFocus={(e) => {
                            e.target.placeholder = "";
                          }}
                        />
                      </div>
                    </Phone>
                    <File active={Partner.filterFile}>
                      <span>참고파일</span>
                      <FileComponent file={true} />
                    </File>
                  </ContainerV2>
                </main>
                <footer>
                  <div
                    onClick={() => {
                      Partner.filter_category = 0;
                      Partner.mobileRequestIndex = 0;
                      Partner.resetDevCategory();
                    }}
                  >
                    <span>취소</span>
                  </div>

                  <div
                    onClick={(e) => {
                      this.onRequestHandler();
                    }}
                  >
                    <span>업체 수배 & 견적 의뢰</span>
                  </div>
                </footer>
              </section>
            </>
          </MobileContainer>
        )}
      </>
    );
  }
}

export default RequestModal;

const bigCategoryArray = [
  { label: "대 카테고리1", value: "대 카테고리1" },
  { label: "대 카테고리2", value: "대 카테고리2" },
];

const smallCategoryArray = [
  { label: "소 카테고리1", value: "소 카테고리1" },
  { label: "소 카테고리2", value: "소 카테고리2" },
];

const budgetArray = [
  { id: 1, label: "0", value: 0 },
  { id: 2, label: "1,000,000", value: 1000000 },
  { id: 3, label: "5,000,000", value: 5000000 },
  { id: 4, label: "10,000,000", value: 10000000 },
  { id: 5, label: "30,000,000", value: 30000000 },
  { id: 6, label: "직접 입력", value: "" },
];

const viewArray = [
  { id: 1, name: "공개", checked: false },
  { id: 2, name: "비공개", checked: false },
];
const ContainerV2 = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;

  // height: 400px;
  width: 95%;

  padding-left: 48px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 16px;
    width: 100%;
    padding-left: 0px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    justify-content: center;
    width: 95%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    justify-content: center;
    width: 95%;
  }
  @media (min-width: 1300px) {
    justify-content: center;
    // width: 1200px;
  }
`;

const Category = styled.div`
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 100px;
    text-align: left;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 32px;
    > div {
      > div {
        display: inline-block;
      }
      > div:nth-of-type(1) {
        margin-right: 16px;
      }
    }

    > span {
      display: block;
      font-size: 12px;
      width: 40px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    display: flex;
    align-items: center;
    > span {
      width: 80px;
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    display: flex;
    align-items: center;
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`;
const Location = styled.div`
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 100px;
    text-align: left;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 32px;
    > div:nth-of-type(1) {
      margin-right: 6px;
    }
    > span {
      font-size: 12px;
      width: 40px;
      display: block;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    display: flex;
    align-items: center;
    > span {
      width: 80px;
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    display: flex;
    align-items: center;
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`;

const Filter = styled.div`
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 100px;
    text-align: left;
    align-self: self-start;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 32px;
    > div:nth-of-type(1) {
      margin-right: 6px;
    }
    > span {
      font-size: 12px;
      width: 40px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    display: flex;
    align-items: center;
    > span {
      width: 80px;
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    display: flex;
    align-items: center;
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`;
const Budget = styled.div`
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 100px;
    text-align: left;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 32px;
    text-align: initial;
    > div:nth-of-type(1) {
      margin-right: 6px;
    }
    > span {
      font-size: 12px;
      width: 40px;
      display: block;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    display: flex;
    align-items: center;
    > span {
      width: 80px;
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    display: flex;
    align-items: center;
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`;

const Select = styled(SelectComponent)`
  width: 220px;
  height: 32px;
  box-sizing: border-box;

  option {
    color: #c1bfbf;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 0;
    padding: 0;
    margin-right: 8px;
    width: 100%;
    height: 32px;
    object-fit: contain;
    border-radius: 2px;
    border: solid 0.5px #c7c7c7;
    background-color: #ffffff;
    position: relative;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 150px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;

const MobileSelect = styled(MobileSelectComponent)`
  width: 220px;
  // height: 32px;
  box-sizing: border-box;

  option {
    color: #c1bfbf;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    // margin: 0;
    // padding: 0;
    // margin-right: 8px;
    // width: 100%;
    // height: 32px;
    // object-fit: contain;
    // border-radius: 2px;
    // border: solid 0.5px #c7c7c7;
    // background-color: #ffffff;
    // position: relative;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 120px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 140px;
  }
  @media (min-width: 1300px) {
  }
`;

const InputContainer = styled.div`
  //width: 25%;
  display: flex;
  > span {
    width: 38px;
    align-self: center;
    margin-left: 8px;
    margin-right: 16px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    // margin-left: 40px;
    margin-top: 16px;
    > span {
      font-size: 12px;
      width: 28px;
    }
    > span:nth-of-type(1) {
      margin-left: 4px;
      margin-right: 8px;
    }
    > span:nth-of-type(2) {
      margin-right: 0;
    }
  }
`;

const InputBox = styled.div`
  display: flex;
  width: 104px;
  height: 32px;
  box-sizing: border-box;
  margin 0 7px;
  
  input {
    width: 100%;
    //padding: 0 14px;
  
    border: 1px solid #c6c7cc;
    border-radius: 3px;
    text-align: right;
    font-size: 16px;
    :focus {
      outline: none;
    }
    ::placeholder{
      color: #c1bfbf;
      text-align: right;
    }
  }
  `;

const DirectInputBox = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  color: #282c36;
  width: 185px;
  height: 32px;
  border: solid 1px #c6c7cc;
  border-radius: 3px;
  padding: 4px;
  box-sizing: border-box;
  > input {
    width: 90%;
    // padding: 4px;
    outline: none;
    border: none;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    ::placeholder {
      font-size: 14px;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    width: 127px;
    line-height: 20px;
    > input {
      font-size: 12px;
      ::placeholder {
        font-size: 12px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 155px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.05);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const MobileContainer = styled.div`
  margin-bottom: 64px;
  > aside {
    position: absolute;
    top: 90px;
    right: 60px;
  }
  > section {
    padding: 0 10px;
    max-width: 100%;
    // width: 90%;
    // height: 40%;

    > header {
      position: relative;
      padding: 8px;

      // font-weight: 500;

      font-size: 16px;
      margin-bottom: 0;
    }
    > main {
      height: 95%;
      font-size: 16px;
      // font-weight: 500;
    }
    > footer {
      height: 40px;
      margin-top: 0px;

      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;

      //   text-align: center;
      width: 100%;

      > div:nth-of-type(1) {
        background-color: #a4aab4;
        margin-right: 11px;
      }
      > div:nth-of-type(2) {
        background-color: #0933b3;
      }

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        // border: 2px solid #0933b3;
        border-radius: 5px;
        // background-color: #ffffff;
        color: #ffffff;
        width: 160px;
        height: 44px;
        cursor: pointer;
        > span {
          font-size: 16px;
          line-height: 52px;
          letter-spacing: -0.4px;
        }
      }
    }
  }
  > button {
    font-size: 14px;
    margin: 10px 10px 0 0;
  }
`;

const ModalBox = styled.div`
  // display: none;
  overflow: auto;
  position: fixed;
  //top: 40%;
  //right: 14%;
  // bottom: 0;
  // left: 0;
  z-index: 101;
  height: 90vh;
  background-color: white;
  // height: 823px;
  width: 1200px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 40%);
  border-radius: 10px;
  padding-bottom: 48px;
  box-sizing: border-box;
  > aside {
    position: absolute;
    top: 190px;
    right: 160px;
  }
  > section {
    // max-width: 900px;
    width: 100%;
    // height: 90%;
    margin: 0 auto;
    border-radius: 0.3rem;
    //background-color: blanchedalmond;
    //border: 1px solid blue;
    > header {
      position: relative;
      // padding: 16px;
      // padding: 72px 16px 16px 16px;
      padding-top: 72px;
      //padding-top: 0;
      //background-color: #f1f1f1;
      // font-weight: 700;
      // margin-bottom: 30px;
      text-align: center;
      //   border-bottom: 3px solid #f1f1f1;
      // font-size: 30px;
      z-index: -1;
      margin-bottom: 60px;
      > span {
        color: #282c36;
        display: block;
      }
      > span:nth-of-type(1) {
        font-size: 24px;
        line-height: 40px;
        letter-spacing: -0.6px;

        font-weight: bold;
      }
      > span:nth-of-type(2) {
        font-size: 18px;
        line-height: 34px;
        letter-spacing: -0.45px;
        font-weight: normal;
      }
    }
    > main {
      background-color: white;
      font-color: white;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      // height: 85%;
      font-size: 20px;
      // font-weight: 600;
    }
    > footer {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 30px;

      //   text-align: center;
      width: 100%;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #0933b3;
        border-radius: 5px;
        background-color: #ffffff;
        color: #0933b3;
        width: 200px;
        height: 50px;
        cursor: pointer;
        > span {
          font-size: 18px;
          line-height: 28px;
          letter-spacing: -0.45px;
        }
      }
    }
  }
  button {
    outline: none;
    cursor: pointer;
    border: 0;

    font-size: 21px;
    font-weight: 700;
    //margin-left: 10px;
    margin: 10px 10px 0 0;
    float: right;
    color: #000000;
    border-radius: 50%;
    background-color: #f1f1f1;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    position: fixed;
    padding-bottom: 12px;
    z-index: 101;

    // height: 180px;
    width: 90%;

    > section {
      padding: 0 10px;
      max-width: 100%;
      width: 90%;
      height: 40%;

      > header {
        position: relative;
        padding: 8px;

        font-weight: 500;

        font-size: 16px;
        margin-bottom: 0;
      }
      > main {
        height: 95%;
        font-size: 16px;
        font-weight: 500;
      }
      > footer {
        height: 40px;
        margin-top: 0px;

        > div {
          width: 180px;
          height: 30px;
          > span {
            font-size: 14px;
            line-height: 28px;
            letter-spacing: -0.45px;
            color: #ffffff;
          }
        }
      }
    }
    > button {
      font-size: 14px;
      margin: 10px 10px 0 0;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 95%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 95%;
  }
  @media (min-width: 1300px) {
  }
`;

const Title = styled.div`
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 100px;
    text-align: left;
  }
  > div {
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    width: 804px;
    height: 44px;
    border: solid 1px #c6c7cc;
    border-radius: 3px;
    padding: 4px;
    box-sizing: border-box;
    > input {
      width: 97%;
      // padding: 4px;
      outline: none;
      border: none;
      font-size: 18px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.45px;
      color: #282c36;
      line-height: 34px;
      ::placeholder {
        font-size: 14px;

        color: #c1bfbf;
      }
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 32px;
    > span {
      font-size: 12px;
      width: 50px;
    }
    > div {
      height: 35px;
      width: 80%;
      > input {
        font-size: 12px;
        line-height: 0px;
        ::placeholder {
          font-size: 11px;
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    display: flex;
    align-items: center;
    > span {
      font-size: 16px;
      width: 80px;
    }
    > div {
      width: 80%;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    display: flex;
    align-items: center;
    > div {
      width: 80%;
    }
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`;

const Email = styled.div`
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 100px;
    text-align: left;
  }
  > div {
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    width: 275px;
    height: 44px;
    border: solid 1px #c6c7cc;
    border-radius: 3px;
    padding: 4px;
    box-sizing: border-box;
    > input {
      width: 90%;
      // padding: 4px;
      outline: none;
      border: none;
      font-size: 18px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.45px;
      color: #282c36;
      line-height: 34px;
      ::placeholder {
        font-size: 14px;
        color: #c1bfbf;
      }
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 32px;
    > span {
      font-size: 12px;
      width: 50px;
    }
    > div {
      height: 35px;
      width: 80%;
      > input {
        font-size: 12px;
        line-height: 0px;
        width: 97%;
        ::placeholder {
          font-size: 11px;
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    display: flex;
    align-items: center;
    > span {
      width: 80px;
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    display: flex;
    align-items: center;
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`;

const Phone = styled.div`
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 100px;
    text-align: left;
  }
  > div {
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    width: 209px;
    height: 44px;
    border: solid 1px #c6c7cc;
    border-radius: 3px;
    padding: 4px;
    box-sizing: border-box;
    > input {
      width: 90%;
      // padding: 4px;
      outline: none;
      border: none;
      font-size: 18px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      letter-spacing: -0.45px;
      color: #282c36;
      line-height: 34px;
      ::placeholder {
        font-size: 14px;
        color: #c1bfbf;
      }
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 32px;
    > span {
      font-size: 12px;
      width: 50px;
    }
    > div {
      height: 35px;
      width: 80%;
      > input {
        font-size: 12px;
        line-height: 0px;
        width: 97%;
        ::placeholder {
          font-size: 11px;
        }
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    display: flex;
    align-items: center;
    > span {
      width: 80px;
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    display: flex;
    align-items: center;
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`;

const File = styled.div`
  margin-bottom: 24px;
  > span:nth-of-type(1) {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 100px;
    text-align: left;
  }
  > nofile {
    display: flex;
    > div:nth-of-type(1) {
      display: flex;
      align-items: center;
      margin-right: ${(props) => (props.filter === "filter" ? "70px" : "10px")};

      > div {
        width: 16px;
        height: 16px;
        background-color: ${(props) => (props.active ? "#0933b3" : "")};
        border: 1px solid #c7c7c7;
        // margin-right: 10px;
        position: relative;
        border-radius: 2px;
        cursor: pointer;
        > img {
          display: ${(props) => (props.active ? "static" : "none")};
          position: absolute;
          top: 17%;
          left: 15%;
        }
      }
    }
    > div:last-child {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.4px;
      color: #999999;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 40px;
    > span:nth-of-type(1) {
      width: 50px;
      font-size: 12px;
    }

    > nofile {
      > div:nth-of-type(1) {
        margin-right: ${(props) =>
          props.filter === "filter" ? "70px" : "10px"};

        > div {
          width: 12px;
          height: 12px;
          > img {
            top: 17%;
            left: 15%;
            width: 9px;
            height: 7px;
          }
        }
      }
      > div:last-child {
        font-size: 12px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    display: flex;
    align-items: center;
    > span:nth-of-type(1) {
      width: 80px;
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    display: flex;
    align-items: center;
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`;
