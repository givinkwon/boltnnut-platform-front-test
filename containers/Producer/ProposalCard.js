import React from "react";
import styled from "styled-components";
import { toJS } from "mobx";
import Router from "next/router";
import { inject, observer } from "mobx-react";
import Modal from "./Modal";
import RequestModal from "./RequestModal";
import RequestDoneModal from "./RequestDoneModal";
import { PRIMARY, WHITE, DARKGRAY } from "static/style";
import ReviewContainer from "./Review/ReviewContainer";
import Portfolio from "./Portfolio";

import CheckBrowserModal from "containers/Home/CheckBrowserModal";
//import CheckBrowserModal from "../containers/Home/CheckBrowserModal";


const message_img = "static/images/manufacturer/message.png";
const call_img = "static/images/manufacturer/call.png";
const file_img = "static/images/file.png";
const file_img2 = "static/images/manufacturer/file.png";
var availableFileType = [
  "png",
  "jpeg",
  "gif",
  "bmp",
  "pdf",
  "csv",
  "xslx",
  "docx",
  "mp4",
  "webm",
  "mp3",
];
@inject("Partner", "Auth")
@observer
class ProposalCard extends React.Component {
  state = {
    width: null,
    introduction: false,
    call: false,
    message: false,
    active: false,
    modalOpen: false,
    activeReview: false,
  };

  openRequestModal = () => {
    const { Partner } = this.props;
    console.log("requestmodal open click");
    // this.setState({ modalOpen: true });
    Partner.requestModalActive = true;
  };
  closeRequestModal = () => {
    const { Partner } = this.props;
    console.log("requestmodal close click");

    Partner.requestModalActive = false;
  };

  openModal = (user_phone) => {
    console.log("open click");
    // this.setState({ modalOpen: true });
    this.props.Partner.modalActive = true;
    if (!user_phone) {
      this.props.Partner.modalUserPhone = "전화번호 없음";
    } else {
      this.props.Partner.modalUserPhone = user_phone;
      //this.props.Partner.modalUserPhone.splice(7, 0, "-")
    }
  };
  closeModal = () => {
    console.log("close click");
    this.setState({ modalOpen: false });
    this.props.Partner.modalActive = false;
  };

  componentDidMount() {
    const { width } = this.props;
    // console.log(width);
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  activeHandler = (type) => {
    switch (type) {
      case "file":
        if (this.state.introduction) {
          this.setState({ introduction: false });
        } else {
          this.setState({ introduction: true });
        }

        break;
      case "call":
        if (this.state.call) {
          this.setState({ call: false });
        } else {
          this.setState({ call: true });
        }
        break;
      case "message":
        if (this.state.message) {
          this.setState({ message: false });
        } else {
          this.setState({ message: true });
        }
        break;
      case "active":
        if (this.state.active) {
          this.setState({ active: false });
        } else {
          this.setState({ active: true });
        }
    }
  };

  filedownload = (urls) => {
    const { data } = this.props;

    if (this.props.Auth && this.props.Auth.logged_in_user) {
      if (!data.file) {
        alert("준비중입니다.");
      }
      const url = data.file;
      const link = document.createElement("a");
      link.href = url;
      link.click();

      // const blob = new Blob([this.content], { type: "text/plain" });
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = `${urls}`;
      // a.download = `${urls}`;
      // a.click();
      // a.remove();
      // window.URL.revokeObjectURL(url);

      // const link = document.createElement("a");
      // link.href = `${urls}`;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    } else {
      alert("로그인이 필요합니다.");
      Router.push("/login");
    }
  };
  cardClick = (e) => {
    e.stopPropagation();
    console.log(this.props.data);
    if (!this.props.data.file) {
      alert("해당 회사의 소개서가 존재하지 않습니다!");
      return;
    }
    this.props.Partner.selectedIntroductionFile = this.props.data.file;

    // Router.push("/manufacturer/detail");
    const fileType = this.props.data.file
      .split(".")
      [this.props.data.file.split(".").length - 1].toLowerCase();
    this.props.Partner.selectedIntroductionFileType = fileType;
    console.log(this.props.data);
    console.log(fileType);
    console.log(availableFileType);
    console.log(availableFileType.indexOf(fileType));
    if (availableFileType.indexOf(fileType) > -1) {
      console.log("뷰어 페이지 router push");
      Router.push("/producer/detail");
    } else {
      console.log("file download");
      this.filedownload(this.props.data.file);
    }
    // } else {
    // alert("로그인이 필요합니다.");
    // Router.push("/login");
    // }
  };

  onClickReviewHandler = (idx, name) => {
    const { Partner } = this.props;

    if (Partner.ReviewActiveIndex === idx) {
      console.log(`review false : ${idx}`);
      this.setState({ activeReview: false });
      Partner.ReviewActive = false;
      Partner.ReviewActiveIndex = -1;
      Partner.partnerName = "";
    } else {
      console.log(`review true : ${idx}`);
      this.setState({ activeReview: true });
      Partner.ReviewActive = true;
      Partner.ReviewActiveIndex = idx;
      Partner.partnerName = name;
    }
    // if (Partner.ReviewActive) {
    //   console.log(`review false : ${idx}`);
    //   this.setState({ activeReview: false });
    //   Partner.ReviewActive = false;
    //   Partner.ReviewActiveIndex = -1;
    //   Partner.partnerName = "";
    // } else {
    //   console.log(`review true : ${idx}`);
    //   this.setState({ activeReview: true });
    //   Partner.ReviewActive = true;
    //   Partner.ReviewActiveIndex = idx;
    //   Partner.partnerName = name;
    // }
  };
  render() {
    const { data, width, Partner, categoryData, idx, dropDown } = this.props;
    // console.log(data);
    // console.log(categoryData);

    return (
      <>
        {width > 767.98 ? (
          <>
            <Card
              active={this.state.active}
              onMouseOver={() => {
                this.activeHandler("active");
              }}
              onMouseOut={() => {
                this.activeHandler("active");
              }}
            >
              <StepTag>
                <span> 활동가능 </span>
                <div style={{ borderTop: "9.1px solid #414550" }}></div>
              </StepTag>
              <BasicInfo>
                <Header>
                  <Logo>
                    <img src={data.logo} />
                  </Logo>
                </Header>
                <Main>
                  {/* <Review
                  onClick={() => this.onClickReviewHandler(idx, data.name)}
                >
                  리뷰 보기
                </Review> */}
                  <Name>{data.name}</Name>
                  <Phone>
                    <div style={{ cursor: "pointer" }}>
                      {/* <img
                        src={call_img}
                        onClick={(e) => {
                          console.log(data.name);
                          console.log(data.user.phone);

                          this.openModal(data.user.phone);
                          e.stopPropagation();
                        }}
                      /> */}

                      {Partner.modalActive && (
                        <Layer>
                          <span>
                            <Modal
                              width={width}
                              open={this.props.Partner.modalActive}
                              close={this.closeModal}
                              header="전화번호"
                              children={this.props.Partner.modalUserPhone}
                            ></Modal>
                          </span>
                        </Layer>
                      )}
                    </div>
                  </Phone>
                  <InfoOne>{data.info_company}</InfoOne>
                  <InfoTwo>
                    {/* {Partner.category_ary.map((item, idx) => {
                  console.log(item);
                })} */}
                    {/* {console.log(category_data)} */}
                    {/* {category_data &&
                  category_data.map((item, idx) => {
                    return <span>{item}</span>;
                  })} */}
                    {/* {console.log(toJS(Partner.check_loading_develop))} */}
                    {categoryData &&
                      categoryData.map((item, idx) => {
                        // console.log(item);
                        return <span>{item}</span>;
                      })}
                    {/* <span>디자인</span>
                <span>기구설계</span>
                <span>금형제작</span>
                <span>양산</span> */}
                  </InfoTwo>
                </Main>
                <AdditionBox>
                  {/* <div>
                <img
                  src={file_img}
                  active={this.state.introduction}
                  onMouseOver={() => {
                    this.activeHandler("file");
                  }}
                  onMouseOut={() => {
                    this.activeHandler("file");
                  }}
                />
                <img
                  src={call_img}
                  active={this.state.call}
                  onMouseOver={() => {
                    this.activeHandler("call");
                  }}
                  onMouseOut={() => {
                    this.activeHandler("call");
                  }}
                />
                <img
                  src={message_img}
                  active={this.state.message}
                  onMouseOver={() => {
                    this.activeHandler("message");
                  }}
                  onMouseOut={() => {
                    this.activeHandler("message");
                  }}
                />
                <div>
                  <span
                    style={{
                      display: `${this.state.introduction ? "block" : "none"}`,
                    }}
                  >
                    <span>회사 소개서 보기</span>
                  </span>
                  <span
                    style={{
                      display: `${this.state.call ? "block" : "none"}`,
                    }}
                  >
                    {data.real_phone ? (
                      <span>{data.real_phone}</span>
                    ) : (
                      <span>전화번호 없음</span>
                    )}
                  </span>
                  <span
                    style={{
                      display: `${this.state.message ? "block" : "none"}`,
                    }}
                  >
                    <span>톡톡톡</span>
                  </span>
                </div>
              </div>
              <div></div> */}
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      console.log(data.name);
                      console.log(data.user.phone);
                      e.stopPropagation();
                      this.openModal(data.user.phone);
                    }}
                  >
                    <span>전화번호</span>
                  </div>
                  <div
                    onClick={(e) => {
                      console.log("click");
                      e.stopPropagation();
                      this.openRequestModal();
                    }}
                  >
                    <span>견적 & 발주 문의</span>
                  </div>
                  {/* <div>
                    <img src={file_img2} />
                    <Link
                      target="_blank"
                      onClick={() => this.filedownload()}
                      download
                    >
                      <span>회사 소개서 보기</span>
                    </Link>
                  </div> */}
                </AdditionBox>
              </BasicInfo>
              {this.props.dropDown &&
                this.props.dropDownIdx === this.props.idx && (
                  <DetailInfo onClick={(e) => e.stopPropagation()}>
                    {/* <h1>DetailInfo 입니다</h1> */}
                    <NoPortfolio>
                  <div onClick={(e) => {
                      this.cardClick(e);
                    }}>
                    <span>회사소개서 보기</span>
                  </div>
                </NoPortfolio>
                    {/* <Portfolio
                      width={width}
                      style={{ paddingRight: "34px", boxSizing: "border-box" }}
                    /> */}
                    <DetailInfoContent>
                      <div>
                        <label>
                          <span>지역</span>
                        </label>
                        <content>{Partner.city_name}</content>
                      </div>
                      <div>
                        <label>
                          <span>주요실적</span>
                        </label>
                        <content>
                          {Partner.partner_detail_list[0].item.deal}
                        </content>
                      </div>
                      <div>
                        <label>
                          <span>진행한 제품군</span>
                        </label>
                        <content>
                          {Partner.partner_detail_list[0].item.history}
                        </content>
                      </div>
                    </DetailInfoContent>
                  </DetailInfo>
                )}
            </Card>

            {Partner.requestModalActive && (
              // <Layer onClick={this.modalHandler}>
              <Layer>
                {/* <Postcode /> */}
                <span>
                  <RequestModal
                    width={width}
                    open={Partner.requestModalActive}
                    close={this.closeRequestModal}
                  />
                </span>
              </Layer>
            )}

            {Partner.requestDoneModalActive && (
              // <Layer onClick={this.modalHandler}>
              <Layer>
                {/* <Postcode /> */}
                <span>
                  <RequestDoneModal
                    width={width}
                    open={Partner.requestDoneModalActive}
                    close={this.closeRequestModal}
                  />
                </span>
              </Layer>
            )}

            {/* {this.props.Partner.ReviewActive &&
              this.props.Partner.ReviewActiveIndex === idx && (
                <>
                  <ReviewContainer
                    data={data}
                    width={width}
                    Partner={Partner}
                    categoryData={categoryData}
                    idx={idx}
                  />
                </>
              )} */}
          </>
        ) : (
          <>
            <Card
              active={this.state.active}
              onMouseOver={() => {
                this.activeHandler("active");
              }}
              onMouseOut={() => {
                this.activeHandler("active");
              }}
            >
              <Main>
                <Name>{data.name}</Name>
                <InfoOne>{data.info_company}</InfoOne>
                <InfoTwo>
                  {categoryData &&
                    categoryData.map((item, idx) => {
                      // console.log(item);
                      return <span>{item}</span>;
                    })}
                </InfoTwo>

                <Phone>
                  <div style={{ cursor: "pointer" }}>
                    {Partner.modalActive && (
                      // <Layer onClick={this.modalHandler}>
                      <Layer>
                        {/* <Postcode /> */}
                        <span>
                          <Modal
                            width={width}
                            open={this.props.Partner.modalActive}
                            close={this.closeModal}
                            header="전화번호"
                            // title={data.real_phone}
                            children={this.props.Partner.modalUserPhone}
                            //children={data.name}
                          ></Modal>
                        </span>
                      </Layer>
                    )}

                    {/* )} */}
                  </div>
                </Phone>
              </Main>
              {this.props.dropDown &&
                this.props.dropDownIdx === this.props.idx && (
                  <DetailInfo onClick={(e) => e.stopPropagation()}>
                    {/* <h1>DetailInfo 입니다</h1> */}
                    <Portfolio
                      width={width}
                      style={{ paddingRight: "34px", boxSizing: "border-box" }}
                      file={Partner.partner_detail_list[0].item.file}
                    />
                    <DetailInfoContent>
                      <div>
                        <label>
                          <span>지역</span>
                        </label>
                        <content>{Partner.city_name}</content>
                      </div>
                      <div>
                        <label>
                          <span>주요실적</span>
                        </label>
                        <content>
                          {Partner.partner_detail_list[0].item.deal}
                        </content>
                      </div>
                      <div>
                        <label>
                          <span>진행한 제품군</span>
                        </label>
                        <content>
                          {Partner.partner_detail_list[0].item.history}
                        </content>
                      </div>
                    </DetailInfoContent>
                    <ButtonBox>
                      <button
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          console.log(data.name);
                          console.log(data.user.phone);
                          e.stopPropagation();
                          this.openModal(data.user.phone);
                        }}
                      >
                        <div>
                          <span>전화번호</span>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          Partner.mobileRequestIndex = 1;
                        }}
                      >
                        <div>
                          <span>견적 & 발주 문의</span>
                        </div>
                      </button>
                    </ButtonBox>
                  </DetailInfo>
                )}
            </Card>
            {this.props.Partner.ReviewActive &&
              this.props.Partner.ReviewActiveIndex === idx && (
                <>
                  <ReviewContainer
                    data={data}
                    width={width}
                    Partner={Partner}
                    categoryData={categoryData}
                    idx={idx}
                  />
                </>
              )}
          </>
        )}
      </>
    );
  }
}

export default ProposalCard;

const Card = styled.div`
  cursor: pointer;
  width: 100%;
  position: relative;
  object-fit: contain;
  border-radius: 10px;
  border: ${(props) =>
    props.active ? "2px solid #0933b3" : "1px solid #c6c7cc"};
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;
  // overflow: hidden;

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 14px;
    box-sizing: border-box;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 100%;
    margin-bottom: 34px;
    box-sizing: border-box;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 100%;
    margin-bottom: 34px;
    box-sizing: border-box;
  }
  @media (min-width: 1300px) {
    margin-bottom: 34px;
  }
`;

const BasicInfo = styled.div`
  width: 100%;
  display: flex;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 14px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 33px 0px 30px 34px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 33px 0px 30px 34px;
  }

  @media (min-width: 1300px) {
    padding: 33px 0px 30px 34px;
    box-sizing: border-box;
  }
`;

const DetailInfo = styled.div`
  width: 100%;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 0px;
  }
`;

const DetailInfoContent = styled.div`
  background-color: #f6f6f6;
  padding: 41px 69px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    margin-bottom: 40px;
    width: 100%;
    label {
      width: 25%;
      span {
        font-size: 18px;
        line-height: 27px;
        letter-spacing: -0.45px;
        color: #191919;
        font-weight: bold;
      }
    }
    content {
      width: 90%;
      font-size: 18px;
      line-height: 27px;
      letter-spacing: -0.45px;
      word-break: keep-all;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 14px 14px;
    margin-top: 40px;

    div {
      margin-bottom: 25px;
      width: 100%;
      label {
        width: 25%;
        span {
          font-size: 10px;
          line-height: 27px;
          letter-spacing: -0.45px;
          color: #191919;
          font-weight: bold;
          word-break: keep-all;
        }
      }
      content {
        width: 90%;
        font-size: 10px;
        line-height: 27px;
        letter-spacing: -0.45px;
        word-break: keep-all;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 100%;
    box-sizing: border-box;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 100%;
    box-sizing: border-box;
  }
  @media (min-width: 1300px) {
  }
`;
const Header = styled.div`
  margin-right: 34px;
`;
const Logo = styled.div`
  > img {
    width: 123px;
    height: 123px;
  }
`;
const Main = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    padding: 14px;
    box-sizing: border-box;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 50%;
    padding-right: 10px;
    box-sizing: border-box;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 55%;
    padding-right: 10px;
    box-sizing: border-box;
  }
  @media (min-width: 1300px) {
    width: 100%;
  }
`;
const Name = styled.div`
  font-size: 20px;
  line-height: 40px;
  letter-spacing: -0.5px;
  color: #282c36;
  font-weight: bold;
  margin-bottom: 8px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    color: #0933b3;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.4px;
  }
`;
const Review = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  background-color: #0933b3;
  color: #ffffff;
  span {
    font-size: 16px;
    font-weight: 500;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 80px;
    height: 20px;
    > span {
      font-size: 11px;
    }
  }
`;
const Phone = styled.div`
  font-size: 16px;
  line-height: 40px;
  letter-spacing: -0.4px;
  color: #282c36;
  font-weight: 500;
  // margin-bottom: 16px;
  > div {
  }
`;
const InfoOne = styled.div`
  word-break: break-all;
  white-space: break-spaces;
  line-height: 1.2;
  letter-spacing: 0.56px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    color: #282c36;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.33px;
  }
  @media (min-width: 1300px) {
    width: 98%;
  }
`;
const InfoTwo = styled.div`
margin-top: 16px;
  > span {
    background-color: #e1e2e4;
    border: 1px solid #ffffff;
    border-radius: 5px;
    padding 5px 12px;
    box-sizing: border-box;
    margin-right: 21px;
    display: inline-block;
  }
  @media (min-width: 1300px) {
    width: 98%
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    >span{
      height: 20px;
      font-size: 10px;
      margin-bottom: 5px;
      margin-right: 5px;
    }
  }
`;

const AdditionBox = styled.div`
  > div:nth-of-type(3) {
    display: flex;
    align-items: center;
    width: 100%;
    > span {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #555963;
    }
    > div {
      position: absolute;
      width: 130%;

      span {
        height: 34px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        background-color: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 5px;
        position: absolute;
        top: 0;
        width: 100%;
        color: #0933b3;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      > span:nth-of-type(1) {
        left: -30%;
      }
      > span:nth-of-type(2) {
        left: 0%;
      }
      > span:nth-of-type(3) {
        left: 30%;
      }
    }
  }
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-right: 24px;
    > div {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      width: 153px;
      height: 38px;
      > span {
        font-size: 16px;
        line-height: 30px;
        letter-spacing: -0.16px;
        color: #282c36;
        font-weight: 500;
      }
    }

    > div:nth-of-type(2) {
      > span {
        color: #0933b3;
      }
    }

    > div:nth-of-type(3) {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      width: 153px;
      span {
        font-size: 16px;
        line-height: 30px;
        letter-spacing: -0.16px;
        color: #282c36;
        font-weight: 500;
      }
    }
  }
`;

const Information = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  > div:nth-of-type(1) {
    > img {
      margin-right: 4px;
      width: 11px;
      height: 10px;
    }
    > span {
      font-size: 12px;
      line-height: 34px;
      letter-spacing: -0.3px;
    }
  }
  > div:nth-of-type(2) {
    > span {
      font-size: 14px;
      color: #282c36;
      font-weight: bold;
    }
  }
`;

const Link = styled.a`
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  color: ${PRIMARY};
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

const ButtonBox = styled.div`
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  > button {
    outline: none;
    cursor: pointer;
    border: 0;

    margin: 0 5px;
    background-color: #ffffff;

    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    width: 155px;
    height: 28px;

    > div {
      > span {
        width: 12px;
        line-height: 5px;
        color: #282c36;
      }
    }
  }
`;

const StepTag = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    > span {
      width: 61px;
      height: 19px;
      color: #0933b3;
      font-size: 13px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 34px;
      letter-spacing: -0.33px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100px;
    height: 36px;
    position: absolute;
    background-color: #0933b3;
    top: 0;
    left: -9px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border-radius: 3px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      position: absolute;
      width: 0px;
      height: 0px;
      left: 1px;
      bottom: -8px;
      border-left: 9px solid transparent;
      border-top: 9px solid #0a2165;
    }
    > span {
      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.88;
      letter-spacing: -0.16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100px;
    height: 36px;
    position: absolute;
    background-color: #0933b3;
    top: 0;
    left: -9px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border-radius: 3px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      position: absolute;
      width: 0px;
      height: 0px;
      left: 1px;
      bottom: -8px;
      border-left: 9px solid transparent;
      border-top: 9px solid #0a2165;
    }
    > span {
      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.88;
      letter-spacing: -0.16px;
    }
  }
  @media (min-width: 1300px) {
    width: 100px;
    height: 36px;
    position: absolute;
    background-color: #0933b3;
    top: 0;
    left: -9px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    border-radius: 3px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      position: absolute;
      width: 0px;
      height: 0px;
      left: 1px;
      bottom: -8px;
      border-left: 9px solid transparent;
      border-top: 9px solid #0a2165;
    }
    > span {
      font-size: 16px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.88;
      letter-spacing: -0.16px;
    }
  }
`;

const NoPortfolio = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    // border: 2px solid #0933b3;
    // border-radius: 3px;
    height: 50px;
    width: 50%;
    box-shadow: 0 1px 3px 0px rgba(0, 0, 0, 0.5);
    > span {
      font-size: 28px;
      line-height: 24px;
      color: #0933b3;
      font-weight: bold;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      height: 30px;
      width: 60%;
      > span {
        font-size: 10px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div {
      > span {
        font-size: 18px;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div {
      > span {
        font-size: 18px;
      }
    }
  }
`;