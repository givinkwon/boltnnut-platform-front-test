import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";
import Modal from "./ReviewModal";
import { inject, observer } from "mobx-react";
import ReviewCard from "./ReviewCard";
import Router from "next/router";

@inject("Partner", "Auth")
@observer
class ReviewContainer extends React.Component {
  state = {
    // width: null,
    modalOpen: false,
  };

  componentDidMount = async () => {
    const { Partner, Auth } = this.props;

    await Auth.checkLogin();
    if (!Auth.logged_in_user) {
      alert("로그인이 필요한 서비스입니다.");
      Router.push("/login");
      return;
    }
    await Partner.checkReviewWriting(1, Auth.logged_in_client.id);

    console.log(Partner.review_done);
  };
  openModal = () => {
    console.log("open click");
    this.setState({ modalOpen: true });

    this.props.Partner.reviewModalActive = true;
    // if (!user_phone) {
    //   this.props.Partner.modalUserPhone = "전화번호 없음";
    // } else {
    //   this.props.Partner.modalUserPhone = user_phone;
    //   //this.props.Partner.modalUserPhone.splice(7, 0, "-")
    // }
  };
  closeModal = () => {
    console.log("close click");
    this.setState({ modalOpen: false });
    this.props.Partner.reviewModalActive = false;
  };

  render() {
    const { data, width, Partner, categoryData, idx } = this.props;
    console.log(data);

    return (
      <>
        {Partner.reviewModalActive && (
          // <Layer onClick={this.modalHandler}>
          <Layer>
            {/* <Postcode /> */}
            <span>
              <Modal
                width={width}
                open={this.props.Partner.reviewModalActive}
                close={this.closeModal}
                header="Review"
                // data={data}
                // title={data.real_phone}
                children={this.props.Partner.modalUserPhone}
                //children={data.name}
              >
                {/* <p>
                            {data.user.phone
                              ? data.user.phone
                              : "전화번호 없음"}
                          </p> */}
                {/* <p>{idx}</p> */}
                {/* <p>{data.name}</p> */}
              </Modal>
              {/* <CheckBrowserModal
                          open={this.props.Partner.modalActive}
                          handleClose={this.closeModal}
                        /> */}
            </span>
          </Layer>
        )}
        <div style={{ position: "relative" }}>
          <ReviewWriting
            reviewDone={Partner.review_done}
            onClick={() => {
              console.log("click");
              // console.log(data.name);
              // Partner.partnerName = data.name;
              // console.log(Partner.partnerName);
              this.openModal();
            }}
          >
            <span>리뷰 작성</span>
          </ReviewWriting>
          <MainContainer
            reviewDone={Partner.review_done}
            loadReview={Partner.loadReviewData}
          >
            {/* <h1>{data.name}</h1> */}
            {Partner.review_done && <ReviewCard />}
          </MainContainer>
        </div>
      </>
    );
  }
}

export default ReviewContainer;

const MainContainer = styled.div`
  width: 100%;
  //height: 300px;
  //border: 3px solid red;
  background-color: ${(props) => (props.reviewDone ? "#c9c9c9" : "#e6e6e6")};
  margin-bottom: 30px;
  // display: ${(props) => (props.reviewDone ? "flex" : "none")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //padding: 12px 0;
  // background-image: url("/static/images/banner.jpg");
  // background-position: center;
  // background-size: cover;
  filter: ${(props) => (props.reviewDone ? "" : "blur(20px)")};
  // position: relative;
  min-height: ${(props) => (props.loadReview === 1 ? "" : "200px")};

  > span {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    //border: 3px solid blue;
    font-size: 20px;
    font-weight: bold;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    min-height: ${(props) => (props.loadReview === 1 ? "" : "100px")};
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

const ReviewWriting = styled.div`
  cursor: pointer;
  // position: absolute;
  //     top: 0;
  //     left: 0;
  //     right: 0;
  //     bottom: 0;
  //border: 3px solid blue;
  font-size: 20px;
  font-weight: bold;
  position: absolute;
  //top: 72%;
  //bottom: 50px;
  //bottom: 0;
  top: 50%;
  right: 35%;
  z-index: 20;
  display: ${(props) => (props.reviewDone ? "none" : "flex")};
  width: 30%;
  height: 50px;
  justify-content: center;
  align-items: center;
  background-color: #0933b3;
  border-radius: 5px;
  > span {
    color: #ffffff;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 33%;
    height: 25px;
    > span {
      font-size: 12px;
    }
  }
`;
