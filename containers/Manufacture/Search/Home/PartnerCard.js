import React from "react";
import styled from "styled-components";
import { toJS } from "mobx";
import Router from "next/router";
import { inject, observer } from "mobx-react";
import { PRIMARY, WHITE, DARKGRAY } from "static/style";
import ReviewContainer from "../Review/ReviewContainer";
import * as AccountAPI from "axios/Account/Account";
import * as PartnerAPI from "axios/Manufacture/Partner";


const star = "static/icon/star_lightblue.svg";
const viewcount = "static/images/viewcount.svg";
const bookmarkcount = "static/icon/bookmarkcount.svg";
const bookmarkImg = "/static/icon/bookmark_empty.svg";
const bookmarkBlueImg = "/static/icon/bookmark_blue.svg";
const location = "static/icon/location.svg";
import Slider from "react-slick";

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
@inject("Partner", "Auth", "Common", "Search")
@observer
class PartnerCard extends React.Component {
  state = {
    width: null,
    introduction: false,
    call: false,
    message: false,
    active: false,
    modalOpen: false,
    activeReview: false,
    city: "",
    business: "",
    totalPartnerBookmark: "",
    total_review: -1,
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
        //console.log(res);
      })
      .catch((e) => {
        //console.log(e);
        //console.log(e.response);
      });
  };

  async componentDidMount() {
    // //console.log(data.id);
    const { width, Search, data, Partner, idx, Auth } = this.props;

    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    const partnerId = data && data.id;
    await Partner.existCheckedBookmark(clientId, partnerId, idx);
    await Partner.getTotalBookmarkByPartner(partnerId);

    const existLogo = data && data.logo && data.logo.split("/")[4];
    //console.log(existLogo);

    window.addEventListener("resize", Search.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    const req = {
      id: data && data.city,
    };

    const partnerReq = {
      id: data && data.id,
    };

    const reviewReq = {
      params: {
        partner_id: data && data.id,
      },
    };

    const BookmarkReq = {
      params: {
        partnerID: data && data.id,
      },
    };

    PartnerAPI.getCityName(req)
      .then(async (res) => {
        //console.log(res);
        this.setState({ city: res.data.maincategory });
        //console.log(this.state.maincategory);
      })
      .catch((e) => {
        //console.log(e);
        //console.log(e.response);
      });

    await PartnerAPI.getTotalReview(reviewReq)
      .then((res) => {
        //console.log(res);
        this.setState({ total_review: res.data.score });
        //console.log(this.state.total_review);
      })
      .catch((e) => {
        //console.log(e);
        //console.log(e.response);
      });

    await PartnerAPI.getTotalBookmarkByPartner(BookmarkReq)
      .then(async (res) => {
        //console.log(res);
        //console.log(res.data.count);
        this.setState({ totalPartnerBookmark: res.data.count });
        //console.log(this.state.totalPartnerBookmark);
      })
      .catch((e) => {
        //console.log(e);
        //console.log(e.response);
      });

    const temp = [];
    PartnerAPI.getBusinessCategory(partnerReq)
      .then(async (res) => {
        //console.log(res);
        // this.setState({ business: res.data.business });
        res.data.business.forEach((element) => {
          //console.log(element);
          PartnerAPI.getBusinessName(element).then((res) => {
            //console.log(res);
            temp.push(res.data.category);
          });
        });
        this.setState({ business: temp });
        //console.log(toJS(this.state.business));
      })
      .catch((e) => {
        //console.log(e);
        //console.log(e.response);
      });
  }

  componentWillUnmount() {
    const { Search } = this.props;
    window.removeEventListener("resize", Search.updateDimensions);
  }

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
      const url = data && data.file;
      const link = document.createElement("a");
      link.href = url;
      link.click();
    } else {
      alert("로그인이 필요합니다.");
      // this.props.Auth.previous_url = "search";
      Router.push("/login");
    }
  };
  cardClick = async (e) => {
    e.stopPropagation();
    const { data, Partner, idx } = this.props;
    //console.log(idx);
    Partner.detailLoadingFlag = true;

    if (this.props.Auth && this.props.Auth.logged_in_user) {
      // if (!data.file) {
      //   Partner.detailLoadingFlag = false;
      //   alert("해당 회사의 소개서가 존재하지 않습니다!");
      //   return;
      // }
      this.props.Partner.selectedIntroductionFile = data && data.file;

      const fileType =
        data &&
        data.file.split(".")[data.file.split(".").length - 1].toLowerCase();
      this.props.Partner.selectedIntroductionFileType = fileType;

      if (availableFileType.indexOf(fileType) > -1) {
        //console.log("뷰어 페이지 router push");
        Partner.partner_detail_list = [];
        await Partner.partner_detail_list.push({ item: data });

        // Partner.getReviewByPartner(Partner.partner_detail_list[0]);
        //console.log(toJS(Partner.partner_detail_list));
        await Partner.getReviewByPartner(
          Partner.partner_detail_list[0].item.id,
          1,
          1
        );
        await Partner.getReviewByPartner(
          Partner.partner_detail_list[0].item.id
        );

        await Partner.getCityName(Partner.partner_detail_list[0].item.city);
        Router.push("/search/detail");
        this.setState({ g: 3 });
      } else {
        //console.log("file download");
        this.filedownload(data.file);
      }
    } else {
      alert("로그인이 필요합니다.");
      Partner.detailLoadingFlag = false;
      // Router.back();
      // this.props.Auth.previous_url = "search";
      // Router.push("/login");
      // Router.push("/login");
      location.href = this.props.Common.makeUrl("login");
    }
  };

  render() {
    const { data, width, Partner, categoryData, idx, Auth } = this.props;
    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    const partnerId = data && data.id;
    const loggedInPartnerId =
      Auth.logged_in_partner && Auth.logged_in_partner.id;
    //console.log(Partner.interestedIdx);
    const existLogo = data && data.logo && data.logo.split("/")[4];

    const SlideSettingsMobile = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 0,
      draggable: true,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    let category_data;
    //console.log(data.logo);
    console.log(data);
    return (
      <>
        {width > 767.98 && data ? (
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
              <Header>
                {data && data.portfolio_set.length > 0 ? (
                  <Item>
                    <img
                      src={data && data.portfolio_set[0].img_portfolio}
                    ></img>
                  </Item>
                ) : existLogo === "null" ? (
                  <Item>
                    {this.state.active ? (
                      <img src="static/images/noportfolio_img_over.svg" />
                    ) : (
                      <img src="static/images/noportfolio_img.svg" />
                    )}
                  </Item>
                ) : (
                  <Item>
                    <img src={data && data.logo} />
                  </Item>
                )}
              </Header>
              <Main>
                <Title>
                  <div>
                    <Name>{data && data.name}</Name>
                    {data && data.identification_state === true ? (
                      <Certification>
                        <img src="/static/icon/certification_img.svg"></img>
                        <div>신원 인증</div>
                      </Certification>
                    ) : (
                      <></>
                    )}
                  </div>
                  {Auth.logged_in_user && (
                    <BookMark>
                      <img
                        src={
                          Partner.check_bookmark[idx] === idx
                            ? bookmarkBlueImg
                            : bookmarkImg
                        }
                        onClick={async (e) => {
                          if (!loggedInPartnerId && clientId) {
                            e.stopPropagation();
                            Partner.BookmarkHandler(idx);
                            Partner.checkedBookmark(clientId, partnerId, idx);
                          }
                        }}
                      ></img>
                    </BookMark>
                  )}
                </Title>
                <Introduce
                  style={{
                    width: 630,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {data && data.history}
                </Introduce>
                {this.state.business.length !== 0 ? (
                  this.state.active ? (
                    <div style={{ display: "flex" }}>
                      {this.state.business &&
                        this.state.business.map((item, idx) => {
                          //console.log(item);
                          return (
                            <Hashtag style={{ background: " #ffffff" }}>
                              #{item}
                            </Hashtag>
                          );
                        })}
                    </div>
                  ) : (
                    <div style={{ display: "flex" }}>
                      {this.state.business &&
                        this.state.business.map((item, idx) => {
                          //console.log(item);
                          return (
                            <Hashtag style={{ background: " #f6f6f6" }}>
                              #{item}
                            </Hashtag>
                          );
                        })}
                    </div>
                  )
                ) : (
                  <></>
                )}
                <Bottom>
                  <BottomBox>
                    {this.state.total_review === -1 ? (
                      <></>
                    ) : (
                      <Review>
                        <img src={star} style={{ marginRight: 5 }}></img>
                        <Score
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ fontWeight: "bold" }}>
                            {this.state.total_review}
                          </div>
                          /5.0
                        </Score>
                      </Review>
                    )}
                    <Location>
                      <img
                        src={location}
                        style={{ marginLeft: 15, marginRight: 5 }}
                      ></img>
                      <div>
                        {(data && data.region === null) || data.region === "nan"
                          ? this.state.city
                          : data.region}
                      </div>
                    </Location>
                  </BottomBox>
                  <BottomBox>
                    <ViewCount>
                      <img src={viewcount} style={{ marginRight: 5 }}></img>
                      <div>높음</div>
                    </ViewCount>
                    <BookmarkCount>
                      <img src={bookmarkcount} style={{ marginRight: 5 }}></img>
                      <div>{this.state.totalPartnerBookmark}</div>
                    </BookmarkCount>
                  </BottomBox>
                </Bottom>
              </Main>
            </Card>
          </>
        ) : (
          <>
            <Card
              active={this.state.active}
              onClick={(e) => {
                // this.cardClick(e);
              }}
              onMouseOver={() => {
                this.activeHandler("active");
              }}
              onMouseOut={() => {
                this.activeHandler("active");
              }}
            >
              <Header>
                {data && data.portfolio_set.length > 0 ? (
                  <Item>
                    <img
                      src={data && data.portfolio_set[0].img_portfolio}
                    ></img>
                  </Item>
                ) : existLogo === "null" ? (
                  <Item>
                    {this.state.active ? (
                      <img src="static/images/noportfolio_img_over.svg" />
                    ) : (
                      <img src="static/images/noportfolio_img.svg" />
                    )}
                  </Item>
                ) : (
                  <Item>
                    <img src={data && data.logo} />
                  </Item>
                )}
              </Header>
              <Main>
                <Name>{data && data.name}</Name>
                <InfoOne>
                  {data &&
                    (data.info_company.length > 70
                      ? data.info_company.slice(0, 70) + "..."
                      : data.info_company)}
                </InfoOne>
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

export default PartnerCard;

const Card = styled.div`
  width: 100%;
  // position: relative;
  object-fit: contain;
  border-bottom: solid 2px #e1e2e4;
  background-color: ${(props) => (props.active ? "#f6f6f6;" : "#ffffff")};
  display: flex;
  cursor: pointer;
  height: 100%;
  padding: 14px 0px 14px 10px;
  box-sizing: border-box;
  border-radius: 8px;
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div:nth-of-type(1) {
    display: flex;
  }
`;

const Name = styled.div`
  font-size: 20px;
  line-height: 40px;
  letter-spacing: -0.5px;
  color: #1e2222;
  font-weight: bold;
  @media (min-width: 0px) and (max-width: 767.98px) {
    color: #0933b3;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.4px;
  }
`;

const Certification = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  img {
    widht: 16px;
    height: 16px;
    margin-top: 13px;
  }
  div {
    margin-left: 5px;
    font-size: 16px;
    line-height: 2.5;
    letter-spacing: -0.4px;
    text-align: left;
    color: #999999;
  }
`;

const BookMark = styled.div`
  margin-right: 20px;
`;

const Introduce = styled.div`
  margin-top: 10px;
  font-size: 16px;
  line-height: 2.5;
  letter-spacing: -0.4px;
  color: #1e2222;
`;
const Hashtag = styled.div`
  display: flex;
  font-size: 15px;
  color: #555963;
  justify-content: center;
  align-items: center;
  height: 34px;
  border-radius: 5px;
  margin-right: 20px;
  padding-right: 10px;
  padding-left: 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 120px;
  width: 95%;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Review = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 22px;
    height: 21px;
  }
`;

const Score = styled.div`
  font-size: 14px;
`;

const Location = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    width: 100%;
    font-size: 14px;
    color: #767676;
    line-height: 2.86;
    letter-spacing: -0.35px;
  }
  img {
    width: 10.6px;
    height: 15.3px;
  }
`;

const ViewCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    margin-left: 5px;
    width: 50px;
    font-size: 12px;
    color: #999999;
  }
  img {
    width: 16px;
    height: 16px;
  }
`;

const BookmarkCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    font-size: 12px;
    color: #999999;
  }
  img {
    width: 16px;
    height: 16px;
  }
`;

// const Review = styled.div`
//   position: absolute;
//   top: 15px;
//   right: 15px;
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100px;
//   height: 30px;
//   border-radius: 5px;
//   background-color: #0933b3;
//   color: #ffffff;
//   span {
//     font-size: 16px;
//     font-weight: 500;
//   }

//   @media (min-width: 0px) and (max-width: 767.98px) {
//     width: 80px;
//     height: 20px;
//     > span {
//       font-size: 11px;
//     }
//   }
// `;

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
    padding: 5px 12px;
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
    width: 88%;
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
    width: 262px;
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
    width: 241px;
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
    border: solid 1px #eeeeee;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    width: 262px;
    height: 200px;
  }
`;
