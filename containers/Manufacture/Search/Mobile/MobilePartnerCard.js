import React from "react";
import styled from "styled-components";
import Router from "next/router";
import { inject, observer } from "mobx-react";

import * as PartnerAPI from "axios/Manufacture/Partner";
import ReviewContainer from "containers/Manufacture/Search/Detail/Review/ReviewContainer";
import * as Title from "components/Title";

const star = "static/icon/star_lightblue.svg";
const viewcount = "static/icon/viewcount.svg";
const bookmarkcount = "static/icon/bookmarkcount.svg";
const bookmarkImg = "/static/icon/bookmark_empty.svg";
const bookmarkBlueImg = "/static/icon/bookmark_blue.svg";
const location = "static/icon/location.svg";

var availableFileType = ["png", "jpeg", "gif", "bmp", "pdf", "csv", "xslx", "docx", "mp4", "webm", "mp3", "pptx", "doc", "html"];
@inject("Partner", "Auth", "Common", "Search")
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
    city: "준비중 입니다.",
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

  async componentDidMount() {
    const { Search, data, Partner, idx, Auth } = this.props;
    // console.log("asdasd", data.city.id);

    const clientId = Auth.logged_in_client && Auth.logged_in_client.id;
    const partnerId = data.id;
    await Partner.existCheckedBookmark(clientId, partnerId, idx);
    await Partner.getTotalBookmarkByPartner(partnerId);

    const existLogo = data.logo.split("/")[4];
    console.log(existLogo);

    window.addEventListener("resize", Search.updateDimensions);
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
      .then((res) => {
        this.setState({ city: res.data.maincategory });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    await PartnerAPI.getTotalBookmarkByPartner(BookmarkReq)
      .then((res) => {
        this.setState({ totalPartnerBookmark: res.data.count });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

    // const temp = [];
    // PartnerAPI.getBusinessCategory(partnerReq)
    //   .then((res) => {
    //     console.log("qweqwe", res);
    //     if (res.data.business.length > 0) {
    //       res.data.business.forEach((element) => {
    //         PartnerAPI.getBusinessName(element).then((res) => {
    //           console.log("asdasd", res);
    //           temp.push(res.data.category);
    //         });
    //       });
    //       this.setState({ business: temp });
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     console.log(e.response);
    //   });
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
      const url = data.file;
      const link = document.createElement("a");
      link.href = url;
      link.click();
    } else {
      alert("로그인이 필요합니다.");
      Router.push("/login");
    }
  };

  cardClick = async (e) => {
    e.stopPropagation();
    const { data, Partner, idx } = this.props;
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

        Partner.getReviewByPartner(Partner.partner_detail_list[0]);
        await Partner.getReviewByPartner(Partner.partner_detail_list[0].item.id, 1, 1);
        await Partner.getReviewByPartner(Partner.partner_detail_list[0].item.id);

        await Partner.getCityName(Partner.partner_detail_list[0].item.city);
        Router.push("/search/detail");
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
          <Main>
            {/* image */}
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

            {/* name */}
            <NameSection>
              <div style={{ display: "flex", gap: 10 }}>
                <Font18>{data.name}</Font18>
                <img src="static/images/search/mobile/check.svg" style={{ width: 14, height: 14 }} />
              </div>

              <img src="static/images/search/mobile/bookmarkon.svg" />
            </NameSection>

            {/* location */}
            <LocationSection>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <img src="static/images/search/mobile/star.svg" style={{ width: 16, height: 16 }} />
                <Font13 style={{ color: "#1e2222" }}>
                  <span style={{ fontWeight: "bold" }}>4.98</span> / 5.0
                </Font13>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <img src={location} />
                <Font13>{data.region === null || data.region === "nan" ? this.state.city : data.region.substring(0, 8)}</Font13>
              </div>
            </LocationSection>

            {/* info */}
            <InfoOne>{data.history.length > 20 ? data.history.slice(0, 20) + "..." : data.history}</InfoOne>
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

const Font18 = styled(Title.FontSize18)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
  color: #1e2222;
`;

const Font13 = styled(Title.FontSize13)`
  font-family: NotoSansCJKkr;
  font-weight: normal;
  color: #767676;
`;

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.active ? "#f6f6f6;" : "#ffffff")};
  width: 100%;
  height: 405px;
  cursor: pointer;
  border-radius: 3px;
  margin-top: 10px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
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

const InfoOne = styled.p`
  color: #767676;
  margin-top: 13px;
  font-size: 13px;
`;

const Item = styled.div`
  display: flex;

  > img {
    width: 335px;
    height: 198px;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const NameSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const LocationSection = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 14px;
  margin-top: 13px;
`;
