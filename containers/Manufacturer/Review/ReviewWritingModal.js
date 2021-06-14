import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";
import StarRatingComponent from "react-star-rating-component";
import { componentByNodeRegistery } from "mobx-react";
import { inject, observer } from "mobx-react";
import * as PartnerAPI from "axios/Partner";

//import Modal from '../../../commons/components/Modals/Modal';
const star = "/static/icon/star.svg";
//const star = "/static/icon/info/star.png";

@inject("Partner", "Auth")
@observer
class ReviewWritingModal extends React.Component {
  state = {
    width: null,
    search: null,
    rows: 1,
    value: "",
    minRows: 1,
    maxRows: 5,
    star_ary: [
      { id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: false },
      { id: 4, checked: false },
      { id: 5, checked: false },
    ],
  };

  moveReviewPage = () => {
    const { Partner } = this.props;
    Partner.reviewActiveIndex = 1;
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

  //   searchText = (e) => {
  //     const { Partner } = this.props;
  //     //console.log("click");
  //     // this.props.Partner.search_text = e.target.value;
  //     //this.setState({ search: e.target.value });
  //     // console.log(e.target.value);
  //     Partner.reviewPartnerName = e.target.value;

  //     //Partner.getPartner();
  //   };

  render() {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, children, width, data } = this.props;
    // console.log(open);
    // console.log(children);
    return (
      <ModalBox
        modal={open ? "openModal modal" : "modal"}
        style={{ display: open ? "block" : "none" }}
      >
        {open ? (
          <>
            <button
              className="close"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              {" "}
              &times;{" "}
            </button>
            <section>
              {/* <header>{`${data.name} ${header}`}</header> */}
              {/* <header>{`${header}`}</header> */}
              <header>리뷰를 보고 싶으시다면!</header>
              <main>
                <div>
                  <p>볼트앤너트와 함께한 업체가 아니더라도</p>
                  <p>리뷰 작성이 가능합니다.</p>
                </div>
              </main>
              <footer>
                <div onClick={this.moveReviewPage}>
                  <span>첫 리뷰 작성하기</span>
                </div>
              </footer>
            </section>
          </>
        ) : null}
      </ModalBox>
    );
  }
}

export default ReviewWritingModal;

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

  top: 30%;
  //right: 14%;
  // bottom: 0;
  // left: 0;
  z-index: 101;
  background-color: white;
  height: 230px;
  width: 60%;
  right: 20%;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 40%);
  border-radius: 10px;
  padding-top: 15px;
  box-sizing: border-box;

  > section {
    max-width: 900px;
    width: 90%;
    height: 87%;
    margin: 0 auto;
    border-radius: 0.3rem;
    //background-color: blanchedalmond;
    //border: 1px solid blue;
    > header {
      position: relative;
      //   padding: 16px;
      font-weight: bold;
      text-align: center;

      font-size: 20px;
      line-height: 77px;
      letter-spacing: -0.5px;
      color: #282c36;
    }
    > main {
      background-color: white;
      text-align: center;
      height: 38%;

      > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        // margin-bottom: 20px;

        p {
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.4px;
          color: #999999;
          font-weight: normal;
        }
      }
    }
    > footer {
      display: flex;
      justify-content: center;
      align-items: center;

      > div {
        background-color: #0933b3;
        color: white;
        text-align: center;
        width: 210px;
        height: 43px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;

        > span {
          font-size: 18px;
          line-height: 77px;
          letter-spacing: -0.45px;
          font-weight: 500;
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
