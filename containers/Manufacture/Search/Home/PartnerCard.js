import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import ReviewContainer from "containers/Manufacture/Search/Detail/Review/ReviewContainer";
import * as AccountAPI from "axios/Account/Account";
import * as PartnerAPI from "axios/Manufacture/Partner";

const star = "static/icon/star_lightblue.svg";
const viewcount = "static/images/viewcount.svg";
const bookmarkcount = "static/icon/bookmarkcount.svg";
const bookmarkImg = "/static/icon/bookmark_empty.svg";
const bookmarkBlueImg = "/static/icon/bookmark_blue.svg";
const location = "static/icon/location.svg";

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
    business: [],
    totalPartnerBookmark: "",
    total_review: -1,
  };

  componentDidMount() {
    const { width, Search, data, Partner, idx, Auth } = this.props;
    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    const partnerId = data && data.id;
    Partner.existCheckedBookmark(clientId, partnerId, idx);
    Partner.getTotalBookmarkByPartner(partnerId);

    const existLogo = data && data.logo && data.logo.split("/")[4];

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
      .then((res) => {
        this.setState({ city: res.data.maincategory });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    PartnerAPI.getTotalReview(reviewReq)
      .then((res) => {
        this.setState({ total_review: res.data.score });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    PartnerAPI.getTotalBookmarkByPartner(BookmarkReq)
      .then((res) => {
        this.setState({ totalPartnerBookmark: res.data.count });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    const temp = [];
    PartnerAPI.getBusinessCategory(partnerReq)
      .then((res) => {
        res.data.business.forEach((element) => {
          PartnerAPI.getBusinessName(element).then((res) => {
            temp.push(res.data.category);
            this.setState({ business: temp });
          });
        });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  }

  componentWillUnmount() {
    const { Search } = this.props;
    window.removeEventListener("resize", Search.updateDimensions);
  }

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

  render() {
    const { data, width, Partner, categoryData, idx, Auth } = this.props;
    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    const partnerId = data && data.id;
    const loggedInPartnerId =
      Auth.logged_in_partner && Auth.logged_in_partner.id;
    const existLogo = data && data.logo && data.logo.split("/")[4];

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
                    {/* 이미지 검색이면 매칭된 이미지를 띄우고, 아닌 경우에는 포토폴리오 이미지를 띄우기 */}
                    {Partner.matching_image.length > 0 ? (
                      <img src={Partner.matching_image[idx]}></img>
                    ) : (
                      <img
                        src={data && data.portfolio_set[0].img_portfolio}
                      ></img>
                    )}
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

                <Introduce>
                  {data && data.history.length > 35
                    ? data.history.slice(0, 35) + "..."
                    : data.history}
                </Introduce>

                {this.state.business.length > 0 ? (
                  <div style={{ display: "flex", marginTop: 11 }}>
                    {this.state.business.map((item, idx) => (
                      <Hashtag active={this.state.active}>#{item}</Hashtag>
                    ))}
                  </div>
                ) : (
                  <BlankHashtag active={this.state.active} />
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
                      <img src={location} />
                      <div style={{ marginLeft: 10 }}>
                        {(data && data.region === null) || data.region === "nan"
                          ? this.state.city
                          : data.region}
                      </div>
                    </Location>
                  </BottomBox>
                  <BottomBox>
                    <ViewCount>
                      <img src={viewcount} style={{ marginRight: 5 }} />
                      {data && data.view <= 1 ? (
                        <div>낮음</div>
                      ) : 1 <= data.view && data.view <= 4 ? (
                        <div>보통</div>
                      ) : data.view >= 5 ? (
                        <div>높음</div>
                      ) : null}
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
  display: flex;
  gap: 20px;
  width: 100%;
  height: 248px;
  border-bottom: solid 2px #e1e2e4;
  cursor: pointer;
  padding: 14px 0px 14px 10px;
  background-color: ${(props) => (props.active ? "#f6f6f6" : "#ffffff")};
`;

const Header = styled.div`
  /* margin-right: 34px; */
`;

const Main = styled.div`
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
  margin-top: 20px;

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
    width: 16px;
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
  width: 630px;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  color: #1e2222;
  margin-bottom: 12px;
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
  background-color: ${(props) => (props.active ? "#ffffff" : "#f6f6f6")};
`;

const BlankHashtag = styled.div`
  width: 1px;
  height: 34px;
  background-color: ${(props) => (props.active ? "#f6f6f6" : "#ffffff")};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
`;

const BottomBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 57px;
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
    height: 50%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-bottom: 35px;
  }
  @media (min-width: 1300px) {
    width: 90%;
  }
`;

const Item = styled.div`
  padding: 20px 0;
  margin: 0 20px;

  > img {
    border: solid 1px #eeeeee;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    width: 262px;
    height: 200px;
    object-fit: scale-down;
  }
`;
