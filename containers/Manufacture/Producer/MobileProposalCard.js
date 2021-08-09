import React from "react";
import styled from "styled-components";
import { toJS } from "mobx";
import Router from "next/router";
import { inject, observer } from "mobx-react";
import ReviewContainer from "./Review/ReviewContainer";
import * as AccountAPI from "axios/Account/Account";
import * as PartnerAPI from "axios/Manufacture/Partner";

const star = "static/icon/star_lightblue.svg";
const viewcount = "static/icon/viewcount.svg";
const bookmarkcount = "static/icon/bookmarkcount.svg";
const bookmarkImg = "/static/icon/bookmark_empty.svg";
const bookmarkBlueImg = "/static/icon/bookmark_blue.svg";
const location = "static/icon/location.svg";

var availableFileType = ["png", "jpeg", "gif", "bmp", "pdf", "csv", "xslx", "docx", "mp4", "webm", "mp3", "pptx", "doc", "html"];
@inject("Partner", "Auth", "Common", "Producer")
@observer
class MobileProposalCard extends React.Component {
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

    formData.append("url", window.location.protocol + "//" + window.location.host + "/" + "phoneClick");
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

  async componentDidMount() {
    const { width, Producer, data, Partner, idx, Auth } = this.props;
    console.log("sdfsdfsdf!!!!!!!!!!!!!!!!!!!!!!", data);

    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    const partnerId = data.id;
    await Partner.existCheckedBookmark(clientId, partnerId, idx);
    await Partner.getTotalBookmarkByPartner(partnerId);

    const existLogo = data.logo.split("/")[4];
    console.log(existLogo);

    window.addEventListener("resize", Producer.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    const req = {
      id: data.city,
    };

    const partnerReq = {
      id: data.id,
    };

    const reviewReq = {
      params: {
        partner_id: data.id,
      },
    };

    const BookmarkReq = {
      params: {
        partnerID: data.id,
      },
    };

    PartnerAPI.getCityName(req)
      .then(async (res) => {
        console.log(res);
        this.setState({ city: res.data.maincategory });
        console.log(this.state.maincategory);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    await PartnerAPI.getTotalReview(reviewReq)
      .then((res) => {
        console.log(res);
        this.setState({ total_review: res.data.score });
        console.log(this.state.total_review);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    await PartnerAPI.getTotalBookmarkByPartner(BookmarkReq)
      .then(async (res) => {
        console.log(res);
        console.log(res.data.count);
        this.setState({ totalPartnerBookmark: res.data.count });
        console.log(this.state.totalPartnerBookmark);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    const temp = [];
    PartnerAPI.getBusinessCategory(partnerReq)
      .then(async (res) => {
        console.log(res);
        // this.setState({ business: res.data.business });
        res.data.business.forEach((element) => {
          console.log(element);
          PartnerAPI.getBusinessName(element).then((res) => {
            console.log(res);
            temp.push(res.data.category);
          });
        });
        this.setState({ business: temp });
        console.log(toJS(this.state.business));
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  }

  componentWillUnmount() {
    const { Producer } = this.props;
    window.removeEventListener("resize", Producer.updateDimensions);
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
    const { data, Partner, idx } = this.props;
    console.log(idx);
    Partner.detailLoadingFlag = true;

    if (this.props.Auth && this.props.Auth.logged_in_user) {
      if (!this.props.data.file) {
        Partner.detailLoadingFlag = false;
        alert("해당 회사의 소개서가 존재하지 않습니다!");
        return;
      }
      this.props.Partner.selectedIntroductionFile = this.props.data.file;

      const fileType = this.props.data.file.split(".")[this.props.data.file.split(".").length - 1].toLowerCase();
      this.props.Partner.selectedIntroductionFileType = fileType;

      if (availableFileType.indexOf(fileType) > -1) {
        console.log("뷰어 페이지 router push");
        Partner.partner_detail_list = [];
        await Partner.partner_detail_list.push({ item: data });

        // Partner.getReviewByPartner(Partner.partner_detail_list[0]);
        console.log(toJS(Partner.partner_detail_list));
        await Partner.getReviewByPartner(Partner.partner_detail_list[0].item.id, 1, 1);
        await Partner.getReviewByPartner(Partner.partner_detail_list[0].item.id);

        await Partner.getCityName(Partner.partner_detail_list[0].item.city);
        Router.push("/producer/detail");
        this.setState({ g: 3 });
      } else {
        console.log("file download");
        this.filedownload(this.props.data.file);
      }
    } else {
      alert("로그인이 필요합니다.");
      Partner.detailLoadingFlag = false;
      location.href = this.props.Common.makeUrl("login");
    }
  };

  render() {
    const { data, width, Partner, categoryData, idx, Auth } = this.props;
    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    const partnerId = data.id;
    const loggedInPartnerId = Auth.logged_in_partner && Auth.logged_in_partner.id;
    console.log(Partner.interestedIdx);
    const existLogo = data.logo.split("/")[4];

    return (
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
                <img src={data.portfolio_set[0].img_portfolio}></img>
              </Item>
            ) : existLogo === "null" ? (
              <Item>{this.state.active ? <img src="static/images/noportfolio_img_over.svg" /> : <img src="static/images/noportfolio_img.svg" />}</Item>
            ) : (
              <Item>
                <img src={data.logo} />
              </Item>
            )}
          </Header>
          <Main>
            <Name>{data.name}</Name>
            <InfoOne>{data.history.length > 40 ? data.history.slice(0, 40) + "..." : data.history}</InfoOne>
            <Location>
              <img src={location} />
              <div>{data.region === null || data.region === "nan" ? this.state.city : data.region.substring(0, 8)}</div>
            </Location>
          </Main>
        </Card>
        {this.props.Partner.ReviewActive && this.props.Partner.ReviewActiveIndex === idx && (
          <>
            <ReviewContainer data={data} width={width} Partner={Partner} categoryData={categoryData} idx={idx} />
          </>
        )}
      </>
    );
  }
}

export default MobileProposalCard;

const Card = styled.div`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-bottom: solid 2px #e1e2e4;
  background-color: ${(props) => (props.active ? "#f6f6f6;" : "#ffffff")};
  display: flex;
  cursor: pointer;
  border-radius: 3px;

  // @media (min-width: 0px) and (max-width: 767.98px) {
  //   padding-left: 14px;
  //   padding-right: 14px;
  //   padding-top: 14px;

  //   margin-top: 14px;
  //   box-sizing: border-box;
  // }
  // @media (min-width: 768px) and (max-width: 991.98px) {
  //   height: 100%;
  //   padding: 33px 0px 30px 34px;
  //   box-sizing: border-box;
  // }
  // @media (min-width: 992px) and (max-width: 1299.98px) {
  //   height: 100%;
  //   padding: 33px 0px 30px 34px;
  //   box-sizing: border-box;
  // }
  // @media (min-width: 1300px) {
  //   height: 100%;
  //   padding: 33px 0px 30px 34px;
  //   box-sizing: border-box;
  // }
`;

const Header = styled.div`
  border-radius: 3px;
  // margin-right: 34px;
`;

const Main = styled.div`
  margin-top: 14px;

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
  color: #282c36;
  font-weight: bold;
  margin-bottom: 8px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    color: #282c36;
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
  justify-content: flex-start;
  align-items: center;
  margin-top: 13px;
  gap: 10px;

  div {
    font-size: 14px;
    color: #767676;
    line-height: 2.86;
    letter-spacing: -0.35px;
  }
  img {
    width: 9px;
    height: 13px;
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
  margin-top: 13px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    color: #767676;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.33px;
    height: 19px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-bottom: 35px;
  }
  @media (min-width: 1300px) {
    width: 90%;
  }
`;

const Item = styled.div`
  margin-right: 18px;
  > img {
    width: 100px;
    height: 120px;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
  }
`;
