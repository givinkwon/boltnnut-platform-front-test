import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";
import Modal from "./ReviewModal";
import { inject, observer } from "mobx-react";

@inject("Partner", "Auth")
@observer
class ReviewContainer extends React.Component {
  state = {
    width: null,
    modalOpen: false,
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
        <MainContainer>
          {/* <h1>{data.name}</h1> */}
          <span
            onClick={() => {
              console.log("click");
              this.openModal();
            }}
          >
            리뷰 보기
          </span>
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
        </MainContainer>
      </>
    );
  }
}

export default ReviewContainer;

const MainContainer = styled.div`
  width: 100%;
  height: 300px;
  border: 3px solid red;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-image: url("/static/images/banner.jpg");
  // background-position: center;
  // background-size: cover;

  > span {
    border: 3px solid blue;
    font-size: 20px;
    font-weight: bold;
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
