import React from "react";
import styled from "styled-components";
import { toJS } from "mobx";
import Router from "next/router";
import { inject, observer } from "mobx-react";
import Modal from "./Modal";
import { PRIMARY, WHITE, DARKGRAY } from "static/style";
import ReviewContainer from "./Review/ReviewContainer";
import CheckBrowserModal from "containers/Home/CheckBrowserModal";
import * as AccountAPI from "axios/Account";
const message_img = "static/images/manufacturer/message.png";
const call_img = "static/images/manufacturer/call.png";
const file_img = "static/images/file.png";
const file_img2 = "static/images/manufacturer/file.png";
import Slider from "react-slick";
import { EqualStencilFunc } from "three";

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
  "pptx",
  "doc",
  "html",
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

  openModal = (user_phone) => {
    this.props.Partner.modalActive = true;
    if (!user_phone) {
      this.props.Partner.modalUserPhone = "전화번호 없음";
    } else {
      this.props.Partner.modalUserPhone = user_phone;
    }
  };

  closeModal = (e) => {
    if (e) {
      e.stopPropagation();
    }

    this.setState({ modalOpen: false });

    this.props.Partner.modalActive = false;
  };

  checkLogin = async () => {
    const { Auth } = this.props;
    await Auth.checkLogin();

    if (Auth && Auth.logged_in_user) {
      return true;
    } else {
      return false;
    }
  };
  clickLog = (partner) => {
    const { Auth, Partner } = this.props;

    let formData = new FormData();
    formData.append("client", Auth.logged_in_client.id);
    formData.append("search", Partner.search_text);
    formData.append("partner", partner.id);

    Partner.setclickLog(formData);

    formData = new FormData();

    formData.append(
      "url",
      window.location.protocol +
        "//" +
        window.location.host +
        "/" +
        "phoneClick"
    );
    const req = {
      data: formData,
    };

    AccountAPI.setUserPageIP(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  };
  componentDidMount() {
    const { width } = this.props;
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
    } else {
      alert("로그인이 필요합니다.");
      // this.props.Auth.previous_url = "producer";
      Router.push("/login");
    }
  };
  cardClick = async (e) => {
    e.stopPropagation();
    const { data, Partner } = this.props;

    Partner.detailLoadingFlag = true;
    // setTimeout(() => {
    //   Partner.detailLoadingFlag = false;
    // }, 3000);

    if (this.props.Auth && this.props.Auth.logged_in_user) {
      if (!this.props.data.file) {
        Partner.detailLoadingFlag = false;
        alert("해당 회사의 소개서가 존재하지 않습니다!");
        return;
      }
      this.props.Partner.selectedIntroductionFile = this.props.data.file;

      const fileType = this.props.data.file
        .split(".")
        [this.props.data.file.split(".").length - 1].toLowerCase();
      this.props.Partner.selectedIntroductionFileType = fileType;
      // console.log(this.props.Partner.selectedIntroductionFileType);
      // console.log(this.props.data);
      // console.log(fileType);
      // console.log(availableFileType);
      // console.log(availableFileType.indexOf(fileType));
      if (availableFileType.indexOf(fileType) > -1) {
        console.log("뷰어 페이지 router push");
        Partner.partner_detail_list = [];
        await Partner.partner_detail_list.push({ item: data });

        // Partner.getReviewByPartner(Partner.partner_detail_list[0]);
        await Partner.getReviewByPartner(
          Partner.partner_detail_list[0].item.id,
          1,
          1
        );
        await Partner.getReviewByPartner(
          Partner.partner_detail_list[0].item.id
        );

        await Partner.getCityName(Partner.partner_detail_list[0].item.city);
        Router.push("/producer/detail");
        // location.href = this.makeUrl("producer/detail");
      } else {
        console.log("file download");
        this.filedownload(this.props.data.file);
      }
    } else {
      alert("로그인이 필요합니다.");
      Partner.detailLoadingFlag = false;
      // Router.back();
      // this.props.Auth.previous_url = "producer";
      // Router.push("/login");
      // Router.push("/login");
      location.href = this.makeUrl("login");
    }
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
  };
  makeUrl = (url) => {
    if (typeof window !== "undefined") {
      return window.location.protocol + "//" + window.location.host + "/" + url;
    }
  };
  render() {

    const { data, width, Partner, categoryData, idx } = this.props;

    const SlideSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      draggable: true,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    const SlideSettingsMobile = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggable: true,
      autoplay: true,
      autoplaySpeed: 2000,
    };


    let category_data;
    // console.log(data.logo);

    return (
      <>
        {width > 767.98 ? (
          <>
            <Card
              active={this.state.active}
              onClick={(e) => {
                if (!this.props.Partner.modalActive) {
                  this.cardClick(e);
                }
              }}
              onMouseOver={() => {
                this.activeHandler("active");
              }}
              onMouseOut={() => {
                this.activeHandler("active");
              }}
            >
              <Header>
                <SliderContainer {...SlideSettings}>
                {data &&
                  data.portfolio_set.map((item, idx) => {
                    return (
                      <Item >
                        <img src={item.img_portfolio} />
                      </Item>    
                    );
                  })}
                <Item>
                  <img src={data.logo} />
                </Item>
                <Item>
                  <img src={data.logo} />
                </Item>

                
                  
                </SliderContainer>
              </Header>
              <Main>
                <Name>{data.name}</Name>
                <Phone>
                  <div style={{ cursor: "pointer" }}>
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
                <InfoOne>{data.info_company.length > 150 ? (data.info_company.slice(0,150) + "...") : (data.info_company)}</InfoOne>
                <InfoTwo>
                  {categoryData &&
                    categoryData.map((item, idx) => {
                      return <span>{item}</span>;
                    })}
                </InfoTwo>
                <AdditionBox>
                  <div>
                    {/* <div
                    style={{ cursor: "pointer", zIndex: 10 }}
                    onClick={async (event) => {
                      event.stopPropagation();

                      if (await this.checkLogin()) {
                        this.clickLog(data);
                        this.openModal(data.user.phone);
                      } else {
                        alert("로그인이 필요합니다");
                        // Router.push("/login");
                        location.href = this.makeUrl("login");
                      }
                    }}
                  > */}
                    <Button
                      style={{ cursor: "pointer", zIndex: 10 }}
                      onClick={async (event) => {
                        event.stopPropagation();

                        if (await this.checkLogin()) {
                          this.clickLog(data);
                          this.openModal(data.user.phone);
                        } else {
                          alert("로그인이 필요합니다");
                          // Router.push("/login");
                          location.href = this.makeUrl("login");
                        }
                      }}
                    >
                      <span>전화번호</span>
                    </Button>
                  </div>
                  <div></div>
                  <div>
                    <img src={file_img2} />
                    <Button>
                      <Link
                        target="_blank"
                        onClick={(e) => this.cardClick(e)}
                        download
                      >
                        <span>회사 소개서 보기</span>
                      </Link>
                    </Button>
                  </div>
                </AdditionBox>
              </Main>
            </Card>
          </>
        ) : (
          <>
            <Card
              active={this.state.active}
              onClick={(e) => {
                this.cardClick(e);
              }}
              onMouseOver={() => {
                this.activeHandler("active");
              }}
              onMouseOut={() => {
                this.activeHandler("active");
              }}
            >
              <Header>
                <SliderMobileContainer {...SlideSettingsMobile}>
                {data &&
                  data.portfolio_set.map((item, idx) => {
                    return (
                      <Item>
                        <img src={item.img_portfolio} />
                      </Item>    
                    );
                  })}
                <Item>
                  <img src={data.logo} />
                </Item>
                  
                </SliderMobileContainer>
              </Header>
              <Main>
                <Name>{data.name}</Name>
                <InfoOne>{data.info_company.length > 100 ? (data.info_company.slice(0,100) + "...") : (data.info_company)}</InfoOne>
                <Information>
                  <div>
                    <Phone>
                      <div
                        style={{ cursor: "pointer", zIndex: 10 }}
                        onClick={async (e) => {
                          e.stopPropagation();
                          if (await this.checkLogin()) {
                            this.clickLog(data);
                            this.openModal(data.user.phone);
                          } else {
                            alert("로그인이 필요합니다");
                            Router.push("/login");
                          }
                        }}
                      >
                        <img src={call_img} />

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
                  </div>
                  <div>
                    <Link
                      target="_blank"
                      onClick={(e) => this.cardClick(e)}
                      download
                    >
                      <span>회사 소개서 보기</span>
                    </Link>
                  </div>
                </Information>
              </Main>
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
  width: 100%;
  //width: 987px;
  position: relative;
  object-fit: contain;
  border-radius: 10px;
  border: ${(props) =>
    props.active ? "2px solid #0933b3" : "2px solid transparent"}; // #c6c7cc"
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);

  display: flex;

  @media (min-width: 0px) and (max-width: 767.98px) {
    // height: 108px;

    padding-left: 14px;
    padding-right: 14px;
    padding-top: 14px;

    margin-top: 14px;
    box-sizing: border-box;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 100%;
    margin-bottom: 34px;
    padding: 33px 0px 30px 34px;
    box-sizing: border-box;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    height: 100%;
    margin-bottom: 34px;
    padding: 33px 0px 30px 34px;
    box-sizing: border-box;
    // align-self: self-start;
    // width: 68%;
  }
  @media (min-width: 1300px) {
    //height: 195px;
    margin-bottom: 34px;
    padding: 33px 0px 30px 34px;
    box-sizing: border-box;
  }
`;

const Header = styled.div`
  //border: 2px solid red;
  //width: 14%;
  //flex-grow: 1;
  margin-right: 34px;
`;
const Logo = styled.div`
  > img {
    width: 123px;
    height: 123px;
  }
`;
const Main = styled.div`
  //border: 2px solid blue;
  //flex-grow: 5;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 60%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 60%;
  }
  @media (min-width: 1300px) {
    width: 80%;
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
  //height: 100%;
  //height: 50px;
  line-height: 1.2;
  letter-spacing: 0.56px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    color: #282c36;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.33px;
    height: 50%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-bottom: 35px;
  }
  @media (min-width: 1300px) {
    width: 90%;
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
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 85%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 95%;
  }
  @media (min-width: 1300px) {
    width: 88%
  }
`;
const Button = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  letter-spacing: -0.45px;
  color: #000000;
`;

const AdditionBox = styled.div`
  //border: 2px solid green;

  > div:nth-of-type(3) {
    display: flex;
    align-items: center;
    width: 100%;
    // position: absolute;
    // top: 80%;
    // left: 82%;
    // > span {
    //   font-size: 18px;
    //   line-height: 40px;
    //   letter-spacing: -0.45px;
    //   color: #555963;
    // }

    > img {
      //margin-left: 14px;
    }
    > div {
      position: absolute;
      width: 130%;

      span {
        // border: 2px solid orange;

        height: 34px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
        background-color: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 5px;
        position: absolute;

        top: 0;
        // left: 40%;
        width: 100%;
        color: #0933b3;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
          // position: absolute;
          // top: 50%;
          // left: 50%;
          // transform: translate(-50%, -50%);
        }
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

  @media (min-width: 768px) and (max-width: 991.98px) {
    position: absolute;
    bottom: 1%;
    right: 1%;
    display: flex;
    flex-direction: column;
    > div:nth-of-type(1) {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      // padding: 0 22px;
      // box-sizing: border-box;
      width: 153px;
      > span {
        font-size: 16px;
        line-height: 30px;
        letter-spacing: -0.16px;
        color: #282c36;
        font-weight: 500;
      }
    }

    > div:nth-of-type(3) {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      // padding: 0 22px;
      // box-sizing: border-box;
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

  @media (min-width: 992px) and (max-width: 1299.98px) {
    position: absolute;
    bottom: 1%;
    right: 1%;
    display: flex;
    flex-direction: column;
    > div:nth-of-type(1) {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      // padding: 0 22px;
      // box-sizing: border-box;
      width: 153px;
      > span {
        font-size: 16px;
        line-height: 30px;
        letter-spacing: -0.16px;
        color: #282c36;
        font-weight: 500;
      }
    }

    > div:nth-of-type(3) {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      // padding: 0 22px;
      // box-sizing: border-box;
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

  @media (min-width: 1300px) {
    position: absolute;
    bottom: 1%;
    right: 1%;
    display: flex;
    flex-direction: column;
    > div:nth-of-type(1) {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      // padding: 0 22px;
      // box-sizing: border-box;
      width: 153px;
      > span {
        font-size: 16px;
        line-height: 30px;
        letter-spacing: -0.16px;
        color: #282c36;
        font-weight: 500;
      }
    }

    > div:nth-of-type(3) {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      // padding: 0 22px;
      // box-sizing: border-box;
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

const SliderContainer = styled(Slider)`
  .slick-list {
    width: 400px;
    .slick-track {
      .slick-slide {
        display: flex;
        justify-content: center;
      }
    }
  }
`;

const SliderMobileContainer = styled(Slider)`
  .slick-list {
    width: 144px;
    .slick-track {
      .slick-slide {
        display: flex;
        justify-content: center;
      }
    }
  }
`;

const Item = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // width: calc(14% - 40px);
  padding: 20px 0;
  margin: 0 20px;

  > img {
    // width: 100%;
    // display: inline-block;
    // position: relative;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    width: 141px;
    height: 141px;
  }
`;