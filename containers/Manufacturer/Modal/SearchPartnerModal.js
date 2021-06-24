import React from "react";
import Select from "react-select";
import styled, { css } from "styled-components";
import StarRatingComponent from "react-star-rating-component";
import { componentByNodeRegistery } from "mobx-react";
import { inject, observer } from "mobx-react";
import PartnerCard from "./PartnerCard";
import { toJS } from "mobx";
import * as PartnerAPI from "axios/Partner";

//import Modal from '../../../commons/components/Modals/Modal';
const star = "/static/icon/star.svg";
const searchImg = "/static/images/search_cobalt-blue.png";

const pass1 = "/static/images/pass1.png";
const pass2 = "/static/images/pass2.png";

//const star = "/static/icon/info/star.png";

@inject("Partner", "Auth")
@observer
class SearchPartnerModal extends React.Component {
  state = {
    width: null,
    search: null,
    rows: 1,
    value: "",
    minRows: 1,
    maxRows: 5,
    star_ary: [
      { id: 1, checked: false, content: "매우 나빠요" },
      { id: 2, checked: false, content: "나빠요" },
      { id: 3, checked: false, content: "보통이에요" },
      { id: 4, checked: false, content: "좋아요" },
      { id: 5, checked: false, content: "매우 좋아요" },
    ],
  };

  closeModal = () => {
    const { Partner } = this.props;
    Partner.searchPartnerModalActive = false;
  };

  componentDidMount = () => {
    const { Partner } = this.props;
    Partner.partnerExist = true;
  };

  //   onSubmit = async () => {
  //     const { Partner, Auth } = this.props;

  //     let score = 0;
  //     await this.state.star_ary.map((item, idx) => {
  //       if (item.checked) {
  //         score += 1;
  //       }
  //     });

  //     // console.log(Auth.logged_in_client.id);
  //     // console.log("제출 클릭!");
  //     // console.log(Partner.reviewPartnerName);
  //     // console.log(Partner.reviewContent);

  //     // console.log(score);
  //     var formData = new FormData();

  //     formData.append("partnername", Partner.reviewPartnerName);
  //     formData.append("client", Auth.logged_in_client.id);
  //     formData.append("score", score);
  //     formData.append("content", Partner.reviewContent);

  //     // const Token = localStorage.getItem("token");

  //     const req = {
  //       data: formData,
  //     };

  //     // console.log(req);

  //     PartnerAPI.setReview(req)
  //       .then((res) => {
  //         console.log("create: ", res);
  //         alert("리뷰 작성이 정상적으로 완료되었습니다");
  //         Partner.reviewModalActive = false;
  //         // window.location.reload(true);
  //         history.go(0);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         console.log(e.response);
  //       });
  //   };

  searchText = async (e) => {
    const { Partner } = this.props;
    // Partner.reviewPartnerName = e.target.value;
    // console.log(toJS(Partner.partnersName));
    if (Partner.partnersName != "") {
      await Partner.getPartnerName(Partner.partnersName);
      Partner.reviewCurrentPage = 1;
    }
    // console.log(toJS(Partner.partnersList));
  };

  handleKeyDown = async (e) => {
    const { Partner } = this.props;
    if (e.key === "Enter") {
      // console.log("Enter");
      // console.log(e);
      // console.log(toJS(Partner.partnersName));
      //     if (Partner.partnersName != null) {
      //       ManufactureProcess.saveSearchText(Partner.search_text);
      //     }

      Partner.reviewCurrentPage = 1;
      Partner.getPartnerName(Partner.partnersName);
    }
  };

  movePage = (e) => {
    const { Partner, Auth } = this.props;
    const newPage = e.target.innerText * 1;

    Partner.reviewCurrentPage = newPage;
    Partner.getPartnerName(Partner.partnersName, newPage);
  };

  pageNext = () => {
    const { Partner, Auth } = this.props;

    if (Partner.reviewCurrentPage < Partner.partnerPage) {
      const nextPage = Partner.reviewCurrentPage + 1;
      Partner.reviewCurrentPage = nextPage;
      console.log(toJS(Partner.reviewCurrentPage));
      Partner.getPartnerName(Partner.partnersName, Partner.reviewCurrentPage);
    }
  };

  pagePrev = () => {
    const { Partner, Auth } = this.props;

    if (Partner.reviewCurrentPage > 1) {
      const newPage = Partner.reviewCurrentPage - 1;
      Partner.reviewCurrentPage = newPage;
      Partner.getPartnerName(Partner.partnersName, Partner.reviewCurrentPage);
    }
  };

  test = (e) => {
    console.log(e);
  };

  render() {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, children, width, data, Partner } = this.props;
    // console.log(open);
    // console.log(children);
    const current_set = parseInt((Partner.reviewCurrentPage - 1) / 5) + 1;
    // const current_set = 5;
    return (
      <ModalBox
        modal={open ? "openModal modal" : "modal"}
        style={{ display: open ? "block" : "none" }}
      >
        {open ? (
          <>
            {/* <button
              className="close"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              {" "}
              &times;{" "}
            </button> */}
            <section>
              {/* <header>{`${data.name} ${header}`}</header> */}
              {/* <header>{`${header}`}</header> */}
              <header>파트너 찾기</header>
              <main>
                <div>
                  <input
                    placeholder="원하는 분야의 제조업체를 검색하세요"
                    onBlur={(e) => {
                      console.log(e.target.value);
                      console.log("onBlur");
                      Partner.partnersName = e.target.value;
                      // if (e.target.value === "") {
                      //   Partner.maxDirectInput = false;
                      // }
                      e.target.placeholder =
                        "원하는 분야의 제조업체를 검색하세요";
                    }}
                    onFocus={(e) => {
                      e.target.placeholder = "";
                      this.test(e);
                      console.log(e.target.value);
                      console.log("onFocus");
                    }}
                    onKeyDown={this.handleKeyDown}
                    onChange={async (e) => {
                      Partner.partnersName = e.target.value;
                      console.log(toJS(Partner.partnersName));

                      console.log(Partner.partnersName == "");
                      if (Partner.partnersName != "") {
                        console.log("111");
                        Partner.partnersList = [];
                        console.log("222");
                        await Partner.getPartnerName(Partner.partnersName);
                        Partner.reviewCurrentPage = 1;
                      } else {
                        console.log("아뉨");
                        Partner.partnerExist = true;
                        Partner.partnersList = [];
                        this.setState({ g: 3 });
                      }
                    }}
                  />
                  <img
                    src={searchImg}
                    onClick={() => {
                      this.searchText();
                    }}
                  />
                </div>
              </main>
              <content>
                <div>
                  {Partner.partnersList &&
                    Partner.partnerExist &&
                    Partner.partnersList.map((item, idx) => {
                      return (
                        <div
                          onClick={() => {
                            console.log("onClick111111");
                            Partner.reviewPartnerName = item.name;
                            Partner.reviewPartnerId = item.id;
                            Partner.reviewSearchStep = 2;
                            Partner.searchPartnerModalActive = false;
                            Partner.partnersList = [];
                            Partner.newPartner = 0;
                          }}
                        >
                          <PartnerCard
                            width={width}
                            id={idx}
                            name={item.name}
                            logo={item.logo}
                            history={item.history}
                          />
                        </div>
                      );
                    })}
                  {console.log(toJS(Partner.partnersList))}
                  {Partner.partnersList.length != 0 && (
                    <PageBar>
                      <img
                        src={pass1}
                        style={{
                          opacity:
                            current_set == 1 && Partner.reviewCurrentPage <= 1
                              ? 0.4
                              : 1,
                          cursor: "pointer",
                        }}
                        onClick={this.pagePrev}
                      />
                      <PageCount
                        onClick={this.movePage}
                        value={5 * (current_set - 1)}
                        active={Partner.reviewCurrentPage % 5 == 1}
                        style={{
                          display:
                            Partner.partnerPage < 5 * (current_set - 1) + 1
                              ? "none"
                              : "block",
                        }}
                      >
                        {" "}
                        {5 * (current_set - 1) + 1}{" "}
                      </PageCount>
                      <PageCount
                        value={5 * (current_set - 1) + 1}
                        active={Partner.reviewCurrentPage % 5 == 2}
                        style={{
                          display:
                            Partner.partnerPage < 5 * (current_set - 1) + 2
                              ? "none"
                              : "block",
                        }}
                        onClick={this.movePage}
                      >
                        {" "}
                        {5 * (current_set - 1) + 2}{" "}
                      </PageCount>
                      <PageCount
                        value={5 * (current_set - 1) + 2}
                        active={Partner.reviewCurrentPage % 5 == 3}
                        style={{
                          display:
                            Partner.partnerPage < 5 * (current_set - 1) + 3
                              ? "none"
                              : "block",
                        }}
                        onClick={this.movePage}
                      >
                        {" "}
                        {5 * (current_set - 1) + 3}{" "}
                      </PageCount>
                      <PageCount
                        value={5 * (current_set - 1) + 3}
                        active={Partner.reviewCurrentPage % 5 == 4}
                        style={{
                          display:
                            Partner.partnerPage < 5 * (current_set - 1) + 4
                              ? "none"
                              : "block",
                        }}
                        onClick={this.movePage}
                      >
                        {" "}
                        {5 * (current_set - 1) + 4}{" "}
                      </PageCount>
                      <PageCount
                        value={5 * (current_set - 1) + 4}
                        active={Partner.reviewCurrentPage % 5 == 0}
                        style={{
                          display:
                            Partner.partnerPage < 5 * (current_set - 1) + 5
                              ? "none"
                              : "block",
                        }}
                        onClick={this.movePage}
                      >
                        {" "}
                        {5 * (current_set - 1) + 5}{" "}
                      </PageCount>
                      {/* <PageCount> ... </PageCount> */}
                      <img
                        src={pass2}
                        style={{
                          opacity:
                            Partner.partnerPage == Partner.reviewCurrentPage
                              ? 0.4
                              : 1,
                          cursor: "pointer",
                        }}
                        onClick={this.pageNext}
                      />
                    </PageBar>
                  )}

                  {!Partner.partnerExist && (
                    <NoPartner>
                      <span>검색하신 결과가 없습니다.</span>
                      <div
                        onClick={() => {
                          Partner.reviewPartnerName = Partner.partnersName;

                          Partner.reviewPartnerId = 7949;
                          Partner.reviewSearchStep = 2;
                          Partner.searchPartnerModalActive = false;
                          Partner.partnersList = [];
                          Partner.newPartner = 1;
                        }}
                      >
                        <span>직접 입력하기</span>
                      </div>
                    </NoPartner>
                  )}
                </div>
              </content>

              <footer>
                <div
                  onClick={() => {
                    this.closeModal();
                  }}
                >
                  <span>닫기</span>
                </div>
              </footer>
            </section>
          </>
        ) : null}
      </ModalBox>
    );
  }
}

export default SearchPartnerModal;

const star_ary = [
  { id: 1, checked: false },
  { id: 2, checked: false },
  { id: 3, checked: false },
  { id: 4, checked: false },
  { id: 5, checked: false },
];

const ModalBox = styled.div`
  // display: none;
  position: absolute;

  top: 6%;

  z-index: 101;
  background-color: white;
  // height: 511px;
  width: 83%;
  right: 8%;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 40%);
  border-radius: 10px;
  padding: 52px 0 60px 98px;
  box-sizing: border-box;
  height: 90vh;

  > section {
    max-width: 900px;
    width: 90%;
    height: 87%;
    // margin: 0 auto;
    border-radius: 0.3rem;
    > header {
      position: relative;
      font-weight: bold;
      font-size: 20px;
      line-height: 34px;
      letter-spacing: -0.5px;
      color: #191919;
      margin-bottom: 10px;
    }
    > main {
      background-color: white;
      padding-bottom: 21px;
      border-bottom: 1px solid #e1e2e4;
      box-sizing: border-box;

      //height: 90%;

      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        // margin-bottom: 20px;
        position: relative;
        border: 1px solid #e1e2e4;
        input {
          border: none;

          //   padding-bottom: 10px;
          padding: 0;
          padding-left: 10px;
          height: 45px;
          box-sizing: border-box;
          outline: none;
          font-size: 24px;
          letter-spacing: -0.6px;
          width: 90%;

          ::placeholder {
            font-size: 24px;
            line-height: 34px;
            letter-spacing: -0.6px;
            color: #c1bfbf;
            font-weight: normal;
          }
        }
        > img {
          width: 26px;
          height: 26px;
          position: absolute;
          right: 40px;
          cursor: pointer;
        }
      }
    }
    > content {
      //   margin-top: 21px;
      //   border-top: 1px solid #e1e2e4;
      width: 100%;
      height: 100px;
      > div {
        overflow-y: auto;
        height: 50vh;
      }
    }
    > footer {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100px;

      > div {
        background-color: #a4aab4;
        color: white;
        text-align: center;
        width: 242px;
        height: 61px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        cursor: pointer;

        > span {
          font-size: 20px;
          line-height: 52px;
          letter-spacing: -0.5px;
          font-weight: bold;
        }
      }
    }
  }
  > button {
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

    z-index: 101;

    height: 500px;
    width: 90%;
    right: 5%;

    > section {
      max-width: 100%;
      width: 90%;
      height: 77%;

      > header {
        position: relative;
        padding: 8px;

        font-weight: 600;

        font-size: 16px;
      }
      > main {
        height: 95%;
        font-size: 13px;
        font-weight: 600;
        > div {
          > div {
            > textarea {
              padding: 10px 12px;
              box-sizing: border-box;
              font-size: 11px;
              line-height: 20px;
              letter-spzcing: -0.45px;
              color: #282c36;
              border-radius: 5px;
              overflow: auto;
              height: auto;
              font-family: inherit;
            }
          }
        }
      }
      > footer {
        border-radius: 5px;
        cursor: pointer;
        height: 40px;
        > div {
          font-size: 13px;
          cursor: pointer;
        }
      }
    }
    > button {
      font-size: 12px;
      margin: 10px 10px 0 0;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;

const NoPartner = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  height: 63%;
  > span {
    font-size: 20px;
    line-height: 34px;
    letter-spacing: -0.5px;
    color: #191919;
    font-weight: 500;
  }
  > div {
    width: 163px;
    height: 41px;
    background-color: #0933b3;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    > span {
      font-size: 16px;
      line-height: 11px;
      letter-spacing: -0.4px;
      color: #ffffff;
      font-weight: bold;
    }
  }
`;

const PageBar = styled.div`
  width: 351px;
  margin-top: 109px;
  // margin-bottom: 157px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
`;

const PageCount = styled.span`
  width: 14px;
  height: 30px;
  font-size: 25px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: 0.63px;
  text-align: left;
  color: #999999;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      font-weight: 700;
      color: #0933b3;
    `}
`;