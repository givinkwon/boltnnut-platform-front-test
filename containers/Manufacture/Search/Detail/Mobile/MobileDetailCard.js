import React from "react";
import styled, { css } from "styled-components";
import dynamic from "next/dynamic";
import Router from "next/router";
import Modal from "../Review/ReviewWritingModal";
import ReviewCard from "../Review/ReviewCard";
import MapContainer from "../Map";

import { toJS } from "mobx";
//import DocViewer from "../DocViewer";
import SubBoxContainer from "containers/Account/Bookmark/SubBox";
import QuestionContainer from "../Question";
import HeaderItem from "../HeaderContainer";
import ReviewStarRating from "../Review/ReviewStarRating";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { inject, observer } from "mobx-react";
import * as Title from "components/Title";
import Background from "components/Background";
import ProposalCard from "../ProposalCard";
import TabBar from "../TabBar";
import InfoCard from "../InfoCard";
import WritingContainer from "../Writing";
import Slider from "react-slick";
import BlackBox from "../BlackBox";
import Containerv1 from "components/Containerv1";
import PortfolioConatiner from "../Portfolio";

// const customRenderer = DocViewerRenderers;
const star = "/static/icon/star_blue3.svg";
const medalImg = "/static/images/search/medal.svg";
const drawerImg = "/static/images/search/drawer.svg";
const markImg = "/static/images/search/mark.svg";
const waterMarkImg = "/static/images/logo_marine@2x.png";
const pass1 = "/static/images/pass1.png";
const pass2 = "/static/images/pass2.png";
const sort = "/static/icon/sort.svg";
const rightAngleImg = "/static/images/search/rightAngle.svg";
const upImg = "/static/images/search/up.svg";

const availableFileType1 = [
  "png",
  "jpeg",
  "gif",
  "bmp",
  "pdf",
  "csv",
  "xslx",
  "mp4",
  "webm",
  "mp3",
];

const availableFileType3 = ["doc", "docx", "txt", "html", "ppt", "pptx"];

// @ts-ignore
const FileViewer = dynamic(() => import("react-file-viewer"), {
  ssr: false,
});

let portfoliLocation;
const onError = (e) => {
  console.log(e, "error in file-viewer");
};

let loadingCounter = 0;
let index = 0;
let region;

@inject("Partner", "Auth", "Common")
@observer
class MobileDetailCardContainer extends React.Component {
  state = {
    avg_consult_score: 0,
    avg_kindness_score: 0,
    avg_communication_score: 0,
    avg_profession_score: 0,
    docViewerLoading: false,
    loading: 0,
    g: 0,
    portfoliLocation: 0,
    introductionLocation: 0,
    reviewLocation: 0,
    mapLocation: 0,
  };

  setQA = () => {
    console.log("setQA");
    this.setState((state) => {
      this.setState({ g: state.g + 1 });
    });
  };

  openModal = () => {
    const { Partner } = this.props;
    Partner.reviewWritingModalActive = false;
  };
  closeModal = () => {
    const { Partner } = this.props;
    Partner.reviewWritingModalActive = true;
  };

  shouldComponentUpdate = (prevProps, nextState) => {
    const { Partner } = this.props;
    console.log(this.state.g);
    console.log(nextState.g);

    return this.state.g !== nextState.g;
  };

  componentDidMount = async () => {
    const { Partner, Auth } = this.props;
    Partner.business_name = [];
    Partner.docViewerLoading = false;
    Partner.subViewerLoading = 0;
    // Partner.viewerLoading += 1;

    let portfolioObject = document.getElementById("portfolio");

    let portfolioPosY = portfolioObject.offsetTop;
    if (portfolioObject.offsetParent) {
      portfolioPosY += portfolioObject.offsetParent.offsetTop;
    }

    let introductionObject = document.getElementById("introduction");

    // let introductionPosY = introductionObject.offsetTop;
    // if (introductionObject.offsetParent) {
    //   introductionPosY += introductionObject.offsetParent.offsetTop;
    // }

    let reviewObject = document.getElementById("review");

    let reviewPosY = reviewObject.offsetTop;
    if (reviewObject.offsetParent) {
      reviewPosY += reviewObject.offsetParent.offsetTop;
    }

    let mapsObject = document.getElementById("maps");

    let mapsPosY = mapsObject.offsetTop;
    if (mapsObject.offsetParent) {
      mapsPosY += mapsObject.offsetParent.offsetTop;
    }

    this.setState((state) => {
      return {
        // portfoliLocation: document
        //   .getElementById("portfolio")
        //   .getBoundingClientRect().top,
        portfoliLocation: portfolioPosY,
        // introductionLocation: introductionPosY,
        reviewLocation: reviewPosY,
        mapLocation: mapsPosY,
      };
    });
    console.log(document.getElementById("portfolio"));
    console.log(document.getElementById("portfolio").offsetTop);

    if (Auth.logged_in_client) {
      // await Partner.checkReviewWriting(Auth.logged_in_client.id);
      this.setState({ g: 3 });
    }

    Partner.reviewCurrentPage = 1;
    Partner.detailLoadingFlag = false;

    console.log(Partner.reviewWritingModalActive);

    // console.log(this.props.Partner.selectedIntroductionFileType);

    // if (this.props.Partner.selectedIntroductionFileType === "pptx") {
    //   var frameHTML =
    //     '<iframe src="https://docs.google.com/gview?url=' +
    //     this.props.Partner.selectedIntroductionFile +
    //     '&embedded=true" class="viewer" frameborder="0"></iframe>';
    //   document.getElementById("viewer-wrap").innerHTML = frameHTML;
    // }

    // 지역 가지고 오기
    //console.log(toJS(Partner.partner_detail_list[0].item.city))
    Partner.getCityName(toJS(Partner.partner_detail_list[0].item.city));

    // 비즈니스 가지고 오기
    console.log(toJS(Partner.partner_detail_list[0].item.business));
    if (Partner.partner_detail_list[0].item.business != undefined) {
      toJS(Partner.partner_detail_list[0].item.business).map(
        async (item) => await Partner.getBusinessName(item)
      );
    }
    console.log(toJS(Partner.business_name));

    await this.countTotalPoint();
    this.setState((state) => {
      return { g: state.g + 1 };
    });
  };
  componentWillUnmount = () => {
    const { Partner, Auth } = this.props;
    Partner.recentPartnerList.push(Partner.partner_detail_list[0].item);
    Partner.review_partner_page = 0;
    // loadingCounter = 0;
    window.removeEventListener("scroll", this.loadScroll);
  };

  error = () => {
    console.log("error");
  };

  countTotalPoint = async () => {
    const { Partner } = this.props;
    /* 리뷰를 위한 변수 및 연산 */
    let total_consult_score = 0;
    let total_kindness_score = 0;
    let total_communication_score = 0;
    let total_profession_score = 0;
    console.log(Partner.partnerReviewList);
    console.log(Partner.partnerAllReviewList);

    (await Partner.partnerAllReviewList[0]) &&
      Partner.partnerAllReviewList[0].data.map((item, idx) => {
        total_consult_score += item.consult_score;
        total_kindness_score += item.kindness_score;
        total_communication_score += item.communication_score;
        total_profession_score += item.profession_score;
      });
    console.log(total_consult_score);
    console.log(total_kindness_score);
    console.log(total_communication_score);
    console.log(total_profession_score);

    Partner.partnerAllReviewList[0]
      ? this.setState({
          avg_consult_score:
            total_consult_score / Partner.partnerAllReviewList[0].data.length,
          avg_kindness_score:
            total_kindness_score / Partner.partnerAllReviewList[0].data.length,
          avg_communication_score:
            total_communication_score /
            Partner.partnerAllReviewList[0].data.length,
          avg_profession_score:
            total_profession_score /
            Partner.partnerAllReviewList[0].data.length,
        })
      : this.setState({
          avg_consult_score: 0,
          avg_kindness_score: 0,
          avg_communication_score: 0,
          avg_profession_score: 0,
        });
  };

  movePage = async (e) => {
    const { Partner, Auth } = this.props;

    console.log(e);
    console.log(Partner.pageType);

    if (Partner.pageType === "question") {
      const newPage = e.target.innerText * 1;

      if (newPage != Partner.questionCurrentPage) {
        Partner.questionCurrentPage = newPage;

        await Partner.getQuestion(
          Partner.partner_detail_list[0].item.id,

          newPage
        );
      }
    } else {
      const newPage = e.target.innerText * 1;

      if (newPage != Partner.reviewCurrentPage) {
        Partner.reviewCurrentPage = newPage;

        await Partner.getReviewByPartner(
          Partner.partner_detail_list[0].item.id,
          1,
          newPage
        );
      }
    }

    this.setState((state) => {
      this.setState({ g: state.g + 1 });
    });
  };

  pageNext = async () => {
    const { Partner } = this.props;

    if (Partner.pageType === "question") {
      if (Partner.questionCurrentPage < Partner.questionPage) {
        const nextPage = Partner.questionCurrentPage + 1;
        Partner.questionCurrentPage = nextPage;

        await Partner.getQuestion(
          Partner.partner_detail_list[0].item.id,
          nextPage
        );
      }
    } else {
      if (Partner.reviewCurrentPage < Partner.review_partner_page) {
        const nextPage = Partner.reviewCurrentPage + 1;
        Partner.reviewCurrentPage = nextPage;

        await Partner.getReviewByPartner(
          Partner.partner_detail_list[0].item.id,
          1,
          nextPage
        );
      }
    }
    this.setState((state) => {
      this.setState({ g: state.g + 1 });
    });
  };

  pagePrev = async () => {
    const { Partner } = this.props;

    if (Partner.pageType === "question") {
      if (Partner.questionCurrentPage > 1) {
        const previousPage = Partner.questionCurrentPage - 1;
        Partner.questionCurrentPage = previousPage;
        await Partner.getQuestion(
          Partner.partner_detail_list[0].item.id,
          previousPage
        );
      }
    } else {
      if (Partner.reviewCurrentPage > 1) {
        const previousPage = Partner.reviewCurrentPage - 1;
        Partner.reviewCurrentPage = previousPage;
        await Partner.getReviewByPartner(
          Partner.partner_detail_list[0].item.id,
          1,
          previousPage
        );
      }
    }
    this.setState((state) => {
      this.setState({ g: state.g + 1 });
    });
  };

  pushToDetail = async (item, idx) => {
    const { Partner } = this.props;
    console.log(item);
    console.log(idx);
    console.log(Partner.modalActive);

    if (!Partner.requestModalActive && !Partner.modalActive) {
      console.log("Detail click");
      if (!item.file) {
        Partner.detailLoadingFlag = false;
        alert("해당 회사의 소개서가 존재하지 않습니다!");
        return;
      }

      Partner.category_name_list = null;
      Partner.partner_detail_list = [];
      await Partner.partner_detail_list.push({ item: item, idx: idx });
      Partner.category_name_list = Partner.category_dic[idx];

      console.log(toJS(Partner.partner_detail_list));

      this.props.Partner.selectedIntroductionFile = item.file;

      const fileType = item.file
        .split(".")
        [item.file.split(".").length - 1].toLowerCase();
      this.props.Partner.selectedIntroductionFileType = fileType;
      // this.props.Partner.viewerLoading

      // this.reload();
      // myStorage = window.localStorage;
      console.log(this.props.Partner.partner_detail_list[0].item.id);

      Partner.partnerReviewList = [];
      Partner.partnerAllReviewList = [];
      Partner.review_partner_page = 0;
      Partner.review_partner_count = 0;

      Partner.city_name = "";
      await Partner.getCityName(Partner.partner_detail_list[0].item.city);

      console.log(Partner.city_name);

      await this.props.Partner.getReviewByPartner(
        this.props.Partner.partner_detail_list[0].item.id,
        1,
        1
      );

      console.log("222222");
      await this.props.Partner.getReviewByPartner(
        this.props.Partner.partner_detail_list[0].item.id
      );

      Partner.business_name = [];
      toJS(Partner.partner_detail_list[0].item.business).map(
        async (item) => await Partner.getBusinessName(item)
      );

      Partner.questionList = [];
      await Partner.getQuestion(Partner.partner_detail_list[0].item.id);

      console.log(item.file);
      console.log(JSON.parse(localStorage.getItem("recent")));

      // Partner.recentPartnerList.push(Partner.partner_detail_list[0].item);

      localStorage.setItem("recent", JSON.stringify(Partner.recentPartnerList));

      await this.countTotalPoint();

      this.setState((state) => {
        return { g: state.g + 1 };
      });

      window.scrollTo(0, 0);
      console.log(this.state.g);
      console.log(toJS(this.props.Partner.recentPartnerList));
    }
  };

  // reload() {
  //   (location || window.location || document.location).reload();
  // }
  render() {
    const { width, Partner, Auth, Common } = this.props;

    // if (!Partner.partner_detail_list[0]) {
    //   console.log("nonono");
    //   // console.log(location.href);
    //   location.href = this.props.Common.makeUrl("search");
    // }

    region = "";
    if (Partner.partner_detail_list[0]) {
      region =
        Partner.partner_detail_list[0].item.region === null ||
        Partner.partner_detail_list[0].item.region === "nan"
          ? Partner.city_name
          : Partner.partner_detail_list[0].item.region;
    }
    console.log(region);

    let clientId;
    let notLoginUser = false;
    if (!Auth.logged_in_client && !Auth.logged_in_partner) {
      notLoginUser = true;
    }

    if (Auth.logged_in_client) {
      clientId = Auth.logged_in_client.id;
    }

    console.log(toJS(Partner.partner_detail_list));
    console.log(Auth);
    console.log(Partner.partner_detail_list);

    const partnerId =
      Partner.partner_detail_list &&
      Partner.partner_detail_list[0] &&
      Partner.partner_detail_list[0].item &&
      Partner.partner_detail_list[0].item.id;

    const loggedInPartnerId =
      Auth.logged_in_partner && Auth.logged_in_partner.id;

    console.log(toJS(Partner.questionList));
    console.log(Partner.review_partner_page);
    console.log(Partner.partnerReviewList.length);

    console.log(toJS(Partner.partner_detail_list[0]));

    if (Partner.partner_detail_list[0]) {
      index = Partner.partner_detail_list[0].idx;
    }

    const length = Partner.partner_list.length;
    console.log(this.props.Partner.subViewerLoading);
    console.log(index);
    console.log(toJS(Partner.partnerReviewList[0]));

    let arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(i);
    }
    const current_set = parseInt((Partner.reviewCurrentPage - 1) / 5) + 1;
    const QuestionCurrentSet =
      parseInt((Partner.reviewCurrentPage - 1) / 5) + 1;

    const docs = [{ uri: this.props.Partner.selectedIntroductionFile }];

    // let arr = [1, 2, 3, 4, 5]
    Partner.shuffleArray(arr);

    let remainderAry = arr.filter((el) => el !== index);
    console.log(remainderAry);

    console.log("rendering");
    console.log(toJS(Partner.partnerReviewList[0]));
    if (Partner.partnerReviewList[0]) {
      console.log(toJS(Partner.partnerReviewList[0].current));
    }
    console.log(toJS(Partner.partnerReviewList[0]));
    console.log(toJS(Partner.partner_detail_list));

    console.log(this.state.portfoliLocation);
    console.log(this.state.introductionLocation);
    console.log(this.state.reviewLocation);
    this.setState((state) => {
      return { loading: state.loading + 1 };
    });

    const SlideSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      draggable: true,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    console.log(toJS(Partner.questionList));

    return (
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Background>
          <Containerv1>
            <div style={{ display: "flex", width: "100%" }}>
              <Card id="card" width={width} partner={loggedInPartnerId}>
                <HeaderBox>
                  <tag>
                    <span>활동 가능</span>
                  </tag>

                  <HeaderItem />
                  <InfoBox>
                    <InfoCard
                      src={medalImg}
                      name="전문분야"
                      content={Partner.business_name}
                    />
                    {Partner.partner_detail_list && (
                      <InfoCard
                        src={drawerImg}
                        name="진행한 제품군"
                        content={
                          Partner.partner_detail_list[0] &&
                          Partner.partner_detail_list[0].item.history
                        }
                        marginLeft="21"
                      />
                    )}

                    <InfoCard
                      src={markImg}
                      name="지역"
                      content={
                        (Partner.partner_detail_list &&
                          Partner.partner_detail_list[0] &&
                          Partner.partner_detail_list[0].item.region ===
                            "null") ||
                        Partner.partner_detail_list[0].item.region === "nan"
                          ? Partner.city_name
                          : Partner.partner_detail_list[0].item.region
                      }
                      marginLeft="21"
                    />
                  </InfoBox>
                  {Partner.partner_detail_list && (
                    <content>
                      <span>
                        {Partner.partner_detail_list[0] &&
                          Partner.partner_detail_list[0].item.info_company}
                      </span>
                    </content>
                  )}
                </HeaderBox>
                <div
                  onCentextMenu={(e) => {
                    // e.preventDefault();
                  }}
                  style={{
                    position: "fixed",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    zIndex: 1,
                  }}
                ></div>
                <InnerBox>
                  {console.log(this.state.portfoliLocation)}
                  <TabBar
                    portfoliLocation={this.state.portfoliLocation}
                    introductionLocation={this.state.introductionLocation}
                    reviewLocation={this.state.reviewLocation}
                    mapLocation={this.state.mapLocation}
                  />
                  <IntroductionBox
                    width={width}
                    style={{ marginBottom: "162px" }}
                  >
                    <Font24 id="portfolio">포토폴리오</Font24>
                    {/* <SliderContainer {...SlideSettings}>
                      {Partner.partner_detail_list &&
                        Partner.partner_detail_list[0].item.portfolio_set
                          .length > 0 &&
                        Partner.partner_detail_list[0].item.portfolio_set.map(
                          (item, idx) => {
                            return (
                              <Item>
                                <img src={item.img_portfolio} />
                              </Item>
                            );
                          }
                        )}
                    </SliderContainer> */}
                    <PortfolioConatiner
                      data={
                        Partner.partner_detail_list[0] &&
                        Partner.partner_detail_list[0].item
                      }
                      width={width}
                    />
                  </IntroductionBox>

                  <IntroductionBox width={width}>
                    <div></div>
                  </IntroductionBox>
                </InnerBox>
                {/* <DetailInfoBox>
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
              {Partner.partner_detail_list && (
                <content>{Partner.partner_detail_list[0].item.deal}</content>
              )}
            </div>
            <div>
              <label>
                <span>진행한 제품군</span>
              </label>
              {Partner.partner_detail_list && (
                <content>{Partner.partner_detail_list[0].item.history}</content>
              )}
            </div>
          </DetailInfoBox> */}

                <ReviewBox id="review">
                  <div>
                    <label>실제 고객후기</label>
                  </div>
                  {notLoginUser && <Block />}
                  {/* <ReviewSummaryContainer width={this.props.width} /> */}
                  <SummaryBox
                    login={notLoginUser}
                    active={
                      !Partner.reviewWritingModalActive &&
                      !Auth.logged_in_partner
                    }
                  >
                    {/* <label>클라이언트 평균 만족도</label> */}
                    <header>
                      <mainscore>
                        <div>
                          <TotalRating>
                            <div>
                              <ReviewStarRating
                                width={
                                  width > 1300
                                    ? "31"
                                    : width > 992
                                    ? "26"
                                    : "22"
                                }
                                margin={4}
                                score={Math.floor(this.state.avg_consult_score)}
                              />
                            </div>
                            <img src={star}></img>
                          </TotalRating>
                        </div>
                        <div>
                          <span>{this.state.avg_consult_score.toFixed(2)}</span>
                          <span>전체 누적 평점</span>
                        </div>
                      </mainscore>

                      <subscore>
                        <div>
                          <span
                            style={{
                              color: "#999999",
                            }}
                          >
                            친절도
                          </span>
                          {width > 768 ? (
                            <div>
                              <ReviewStarRating
                                width={
                                  width > 1300
                                    ? "15"
                                    : width > 992
                                    ? "13"
                                    : "11"
                                }
                                margin={1}
                                score={this.state.avg_kindness_score}
                              />
                            </div>
                          ) : (
                            <>
                              <CustomSlider
                                value={this.state.avg_kindness_score * 20}
                              />
                              <div>
                                {this.state.avg_kindness_score.toFixed(1)}
                              </div>
                            </>
                          )}
                        </div>

                        <div>
                          <span
                            style={{
                              color: "#999999",
                            }}
                          >
                            연락 빈도
                          </span>
                          {width > 768 ? (
                            <div>
                              <ReviewStarRating
                                width={
                                  width > 1300
                                    ? "15"
                                    : width > 992
                                    ? "13"
                                    : "11"
                                }
                                margin={1}
                                score={this.state.avg_communication_score}
                              />
                            </div>
                          ) : (
                            <>
                              <CustomSlider
                                value={this.state.avg_communication_score * 20}
                              />
                              <div>
                                {this.state.avg_communication_score.toFixed(1)}
                              </div>
                            </>
                          )}
                        </div>

                        <div>
                          <span
                            style={{
                              color: "#999999",
                            }}
                          >
                            전문성
                          </span>
                          {width > 768 ? (
                            <div>
                              <ReviewStarRating
                                width={
                                  width > 1300
                                    ? "15"
                                    : width > 992
                                    ? "13"
                                    : "11"
                                }
                                margin={1}
                                score={this.state.avg_profession_score}
                              />
                            </div>
                          ) : (
                            <>
                              <CustomSlider
                                value={this.state.avg_profession_score * 20}
                              />
                              <div>
                                {this.state.avg_profession_score.toFixed(1)}
                              </div>
                            </>
                          )}
                        </div>
                      </subscore>
                    </header>
                  </SummaryBox>

                  <content>
                    <ReviewTop login={notLoginUser}>
                      {Partner.partnerReviewList[0] && (
                        <TotalCount>
                          전체 ({Partner.partnerReviewList[0].count})
                        </TotalCount>
                      )}

                      <DateSorting>
                        <div style={{ marginRight: "5px" }}>최신순</div>
                        <img src={sort}></img>
                      </DateSorting>
                    </ReviewTop>

                    {Partner.partnerReviewList[0] &&
                      console.log(toJS(Partner.partnerReviewList[0].current))}
                    {Partner.partnerReviewList[0] &&
                      Partner.partnerReviewList[0].current.map((item, idx) => {
                        return (
                          <ReviewCard
                            data={item}
                            idx={idx}
                            totalCount={
                              Partner.partnerReviewList[0].current.length
                            }
                          />
                        );
                      })}
                  </content>

                  {!Auth.logged_in_client && !Auth.logged_in_partner && (
                    <BlackBox
                      content="이 제조사의 리뷰를 보고싶다면?"
                      width={width}
                    />
                  )}
                  {Auth.logged_in_client &&
                    (!Partner.reviewWritingModalActive ? (
                      <Layer>
                        <span>
                          <Modal
                            width={width}
                            open={!Partner.reviewWritingModalActive}
                            close={this.closeModal}
                            purpose="FirstReview"
                            headerOne="볼트앤너트에 등록된 5,000 개 제조사 평가를 보고 싶으시다면 ? "
                            headerTwo="첫 평가를 작성해주세요"
                            bodyOne="* 볼트앤너트에 등록된 업체가 아니더라도"
                            bodyTwo="업체 평가 작성이 가능합니다."
                          />
                        </span>
                      </Layer>
                    ) : (
                      Partner.review_partner_page === 0 &&
                      Partner.partnerReviewList.length === 0 && (
                        <Layer>
                          <span>
                            <Modal
                              width={width}
                              open={!Partner.partnerReviewList.length}
                              close={this.closeModal}
                              purpose="NoReview"
                              headerOne="현재 작성 된 리뷰가 없습니다"
                              headerTwo="첫 평가를 작성해주세요"
                              bodyOne="* 볼트앤너트에 등록된 업체가 아니더라도"
                              bodyTwo="업체 평가 작성이 가능합니다."
                            />
                          </span>
                        </Layer>
                      )
                    ))}

                  <PageBar
                    login={
                      notLoginUser ||
                      (Auth.logged_in_partner
                        ? Partner.reviewWritingModalActive
                        : !Partner.reviewWritingModalActive)
                    }
                    active={Partner.reviewWritingModalActive}
                  >
                    <img
                      src={pass1}
                      style={{
                        opacity:
                          current_set == 1 && Partner.reviewCurrentPage <= 1
                            ? 0.4
                            : 1,
                        cursor: "pointer",
                        display:
                          !Partner.partnerReviewList[0] &&
                          Partner.review_partner_page === 1 &&
                          "none",
                      }}
                      onClick={() => {
                        console.log("lll");
                        this.pagePrev();
                      }}
                    />
                    <PageCount
                      onClick={this.movePage}
                      value={5 * (current_set - 1)}
                      active={Partner.reviewCurrentPage % 5 == 1}
                      style={{
                        display:
                          Partner.review_partner_page < 5 * (current_set - 1)
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
                          Partner.review_partner_page <
                          5 * (current_set - 1) + 2
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
                          Partner.review_partner_page <
                          5 * (current_set - 1) + 3
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
                          Partner.review_partner_page <
                          5 * (current_set - 1) + 4
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
                          Partner.review_partner_page <
                          5 * (current_set - 1) + 5
                            ? "none"
                            : "block",
                      }}
                      onClick={this.movePage}
                    >
                      {" "}
                      {5 * (current_set - 1) + 5}{" "}
                    </PageCount>
                    <img
                      src={pass2}
                      style={{
                        opacity:
                          Partner.review_partner_page ==
                          Partner.reviewCurrentPage
                            ? 0.4
                            : 1,
                        cursor: "pointer",
                        display:
                          !Partner.partnerReviewList[0] &&
                          Partner.review_partner_page === 1 &&
                          "none",
                      }}
                      onClick={this.pageNext}
                    />
                  </PageBar>
                </ReviewBox>

                <MapBox>
                  <Font24 id="maps">위치</Font24>
                  <MapContainer city={region} />
                </MapBox>

                {console.log(toJS(Partner.questionList))}
                <QuestionBox>
                  <Font24>업체 Q&A</Font24>
                  {console.log(toJS(Partner.mergeQuestionList))}
                  {Partner.mergeQuestionList &&
                    Partner.mergeQuestionList.map((item, idx) => {
                      return (
                        <QuestionContainer
                          mergeData={Partner.mergeQuestionList}
                          data={item}
                          width={this.props.width}
                          idx={idx}
                          clientId={clientId}
                          partnerId={partnerId}
                          parentType="comment"
                          setQA={this.setQA}
                        />
                      );
                    })}
                  {/* {Partner.questionList &&
              Partner.questionList.map((item, idx) => {
                return (
                  <>
                    {console.log("PARENTPARENTPARENTPARENTPARENTPARENT")}
                    <QuestionContainer
                      data={item}
                      width={this.props.width}
                      idx={idx}
                      clientId={clientId}
                      partnerId={partnerId}
                      parentType="comment"
                      setQA={this.setQA}
                    />
                    {item.reply &&
                      item.reply.map((subItem, subIdx) => (
                        <>
                          {console.log("SUBSUBSUBSUBSUBSUBSUBSUB")}
                          <QuestionContainer
                            subData={subItem}
                            width={this.props.width}
                            idx={subIdx}
                            clientId={clientId}
                            partnerId={partnerId}
                            parentType="recomment"
                            setQA={this.setQA}
                          />
                        </>
                      ))}
                  </>
                );

                {
                  item.reply && console.log(item.reply);
                } */}

                  <PageBar active={true} type="QnA">
                    <img
                      src={pass1}
                      style={{
                        opacity:
                          QuestionCurrentSet == 1 &&
                          Partner.questionCurrentPage <= 1
                            ? 0.4
                            : 1,
                        cursor: "pointer",
                        display: !Partner.questionList[0] && "none",
                      }}
                      onClick={(e) => {
                        console.log("prev");
                        Partner.pageType = "question";
                        this.pagePrev(e);
                      }}
                    />
                    {console.log(Partner.questionPage)}
                    {console.log(QuestionCurrentSet)}
                    {console.log(Partner.questionList.length)}
                    <PageCount
                      onClick={(e) => {
                        Partner.pageType = "question";
                        this.movePage(e);
                      }}
                      value={5 * (QuestionCurrentSet - 1)}
                      active={Partner.questionCurrentPage % 5 == 1}
                      style={{
                        display:
                          Partner.questionPage < 5 * QuestionCurrentSet &&
                          Partner.questionList.length === 0
                            ? "none"
                            : "block",
                      }}
                    >
                      {" "}
                      {5 * (QuestionCurrentSet - 1) + 1}{" "}
                    </PageCount>
                    <PageCount
                      value={5 * (QuestionCurrentSet - 1) + 1}
                      active={Partner.questionCurrentPage % 5 == 2}
                      style={{
                        display:
                          Partner.questionPage <
                          5 * (QuestionCurrentSet - 1) + 2
                            ? "none"
                            : "block",
                      }}
                      onClick={(e) => {
                        Partner.pageType = "question";
                        this.movePage(e);
                      }}
                    >
                      {" "}
                      {5 * (QuestionCurrentSet - 1) + 2}{" "}
                    </PageCount>
                    <PageCount
                      value={5 * (QuestionCurrentSet - 1) + 2}
                      active={Partner.questionCurrentPage % 5 == 3}
                      style={{
                        display:
                          Partner.questionPage <
                          5 * (QuestionCurrentSet - 1) + 3
                            ? "none"
                            : "block",
                      }}
                      onClick={(e) => {
                        Partner.pageType = "question";
                        this.movePage(e);
                      }}
                    >
                      {" "}
                      {5 * (QuestionCurrentSet - 1) + 3}{" "}
                    </PageCount>
                    <PageCount
                      value={5 * (QuestionCurrentSet - 1) + 3}
                      active={Partner.questionCurrentPage % 5 == 4}
                      style={{
                        display:
                          Partner.questionPage <
                          5 * (QuestionCurrentSet - 1) + 4
                            ? "none"
                            : "block",
                      }}
                      onClick={(e) => {
                        Partner.pageType = "question";
                        this.movePage(e);
                      }}
                    >
                      {" "}
                      {5 * (QuestionCurrentSet - 1) + 4}{" "}
                    </PageCount>
                    <PageCount
                      value={5 * (QuestionCurrentSet - 1) + 4}
                      active={Partner.questionCurrentPage % 5 == 0}
                      style={{
                        display:
                          Partner.questionPage <
                          5 * (QuestionCurrentSet - 1) + 5
                            ? "none"
                            : "block",
                      }}
                      onClick={(e) => {
                        Partner.pageType = "question";
                        this.movePage(e);
                      }}
                    >
                      {" "}
                      {5 * (QuestionCurrentSet - 1) + 5}{" "}
                    </PageCount>
                    <img
                      src={pass2}
                      style={{
                        opacity:
                          Partner.questionPage == Partner.questionCurrentPage
                            ? 0.4
                            : 1,
                        cursor: "pointer",
                        display:
                          !Partner.questionList[0] &&
                          Partner.questionPage === 1 &&
                          "none",
                      }}
                      onClick={(e) => {
                        console.log("next");
                        Partner.pageType = "question";
                        this.pageNext(e);
                      }}
                    />
                  </PageBar>
                  {!Auth.logged_in_partner && (
                    <WritingContainer
                      type="comment"
                      clientId={clientId}
                      partnerId={partnerId}
                      setQA={this.setQA}
                    />
                  )}
                </QuestionBox>
              </Card>

              {!Auth.logged_in_partner && (
                <SubCard>
                  <SubBoxContainer
                    partnerId={Partner.partner_detail_list[0].item.id}
                  />
                  {/* <RequestContainer /> */}
                  {/* <RecentPartnerContainer /> */}
                </SubCard>
              )}
            </div>
          </Containerv1>
        </Background>

        <IntroductionBox
          width={width}
          style={{
            backgroundColor: "#f6f6f6",
            height: "609px",
            paddingTop: "38px",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <UpImg
            src={upImg}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          />
          <Background backgroundColor="#f6f6f6">
            <Containerv1>
              <SimilarBox>
                <Font24>비슷한 업체 더보기</Font24>

                <Background
                  backgroundColor="#f6f6f6"
                  style={{ marginBottom: "5px" }}
                >
                  <div
                    style={{ width: "100%", display: "flex", flexWrap: "wrap" }}
                  >
                    {Partner.partner_list &&
                      (length < 4
                        ? remainderAry.map((item, idx) => {
                            return (
                              <div
                                onClick={(e) => {
                                  // e.stopPropagation();
                                  this.props.Partner.viewerLoading = 0;
                                  // this.props.Partner.subViewerLoading = 1;
                                  this.props.Partner.recentPartnerId =
                                    this.props.Partner.partner_detail_list[0].item.id;
                                  console.log(
                                    this.props.Partner.subViewerLoading
                                  );
                                  this.pushToDetail(
                                    Partner.partner_list[item],
                                    item
                                  );
                                  console.log("click");
                                }}
                                style={{ width: "100%", marginRight: "24px" }}
                              >
                                <ProposalCard
                                  data={Partner.partner_list[item]}
                                  width={this.props.width}
                                  categoryData={toJS(
                                    Partner.category_dic[item]
                                  )}
                                  idx={item}
                                  handleIntersection={this.handleIntersection}
                                  customer="partner"
                                />
                              </div>
                            );
                          })
                        : remainderAry.splice(0, 3).map((item, idx) => {
                            return (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  this.props.Partner.viewerLoading = 0;
                                  // this.props.Partner.subViewerLoading = 1;
                                  this.props.Partner.recentPartnerId =
                                    this.props.Partner.partner_detail_list[0].item.id;
                                  console.log(
                                    this.props.Partner.subViewerLoading
                                  );
                                  this.pushToDetail(
                                    Partner.partner_list[item],
                                    item
                                  );
                                }}
                                style={{ width: "100%", marginRight: "24px" }}
                              >
                                <ProposalCard
                                  data={Partner.partner_list[item]}
                                  width={this.props.width}
                                  categoryData={toJS(
                                    Partner.category_dic[item]
                                  )}
                                  idx={item}
                                  handleIntersection={this.handleIntersection}
                                  customer="partner"
                                />
                              </div>
                            );
                          }))}
                  </div>
                </Background>
                {/* {Partner.partner_list &&
                  Partner.partner_list.slice(1,4).map((item, idx) => {
                    return (
                      <Background style={{ marginBottom: "5px" }}>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();                            
                            this.pushToDetail(item, idx)
                          }}
                          style={{ width: "100%" }}
                        >
                          <ProposalCard
                            data={item}
                            width={this.props.width}
                            categoryData={toJS(Partner.category_dic[idx])}
                            idx={idx}
                            handleIntersection={this.handleIntersection}
                            customer="partner"
                            
                          />
                        </div>
                      </Background>
                    );
                  })} */}
              </SimilarBox>
            </Containerv1>
          </Background>
        </IntroductionBox>
      </div>
    );
  }
}

export default MobileDetailCardContainer;

const CustomSlider = withStyles({
  root: {
    color: "#0933b3",
    height: "7px !important",
    width: "60%",
    // cursor: "default",
    // background: "red",
    padding: 0,
    display: "none",
    marginRight: "10px",
  },
  thumb: {
    // top: -10,
    // paddingRight: 20,
    // content: "apapap"
    display: "none",
  },
  track: {
    height: 6,
    borderRadius: 10,
  },
  rail: {
    color: "#e6e6e6",
    opacity: 1,
    height: 6,
    borderRadius: 10,
  },
  "@media (min-width: 0px) and (max-width: 767.98px)": {
    root: {
      display: "block",
    },
  },
})(Slider);

const Font24 = styled(Title.FontSize24)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 16px !important;
    line-height: 40px;
    letter-spacing: -0.4px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;
const IntroductionBox = styled.div`
  width: auto;
  text-align: center;
  position: relative;

  @media (min-width: 0px) and (max-width: 767.98px) {
    canvas {
      width: ${(props) => (props.width ? props.width - 100 : "")}px;
    }
  }
`;
const TopInlineBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Card = styled.div`
  margin-top: 50px;
  width: 100%;
  border-radius: 10px;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;

  justify-content: center;
  padding: 54px 32px;
  box-sizing: border-box;

  > div:nth-of-type(2) {
    > div {
      > img {
        width: 100%;
      }
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 21px 14px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
  > tag {
    width: 68px;
    height: 26px;
    border-radius: 3px;
    background-color: #0933b3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 14px;
    span {
      color: #ffffff;
      font-size: 12px;
      line-height: 30px;
      letter-spacing: -0.12px;
      font-weight: 500;
    }
  }
  > name {
    font-size: 16px;
    line-height: 15px;
    letter-spacinig: -0.4px;
    color: #282c36;
    font-weight: bold;
    margin-bottom: 24px;
  }
  > content {
    border: 1px solid #c6c7cc;
    border-radius: 5px;
    padding: 24px 16px;
    box-sizing: border-box;
    span {
      font-size: 14px;
      line-height: 26px;
      letter-spacing: -0.35px;
      color: #414550;
      font-weight: normal;
      white-space: pre-wrap;
      word-break: keep-all;
    }
  }
`;

// const HeaderItem = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 34px;
// `;

const ReviewBox = styled.div`
  position: relative;
  // height: 500px;
  margin-top: 109px;
  user-select: none;
  label {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: bold;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 20px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 22px;
  }
`;

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  // opacity: 0.1;
  // background-color: rgba(0, 0, 0, 0.5);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const InnerBox = styled.div`
  width: 100%;
  padding: 54px 0 54px 0;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 14px 0;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 29px 0;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 44px 0;
  }
  @media (min-width: 1300px) {
  }
`;

const DetailInfoBox = styled.div`
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
  div:last-child {
    margin-bottom: 0px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 16px 8px;

    div {
      display: block;
      margin-bottom: 40px;
      label {
        width: 100%;
        display: block;
        span {
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.45px;
        }
      }
      content {
        font-size: 12px;
        line-height: 20px;
        letter-spacing: -0.45px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 24px 16px;
    div {
      margin-bottom: 40px;
      label {
        span {
          font-size: 16px;
          line-height: 27px;
          letter-spacing: -0.45px;
        }
      }
      content {
        font-size: 14px;
        line-height: 27px;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 31px 31px;
    div {
      margin-bottom: 40px;
      label {
        span {
          font-size: 17px;
          line-height: 27px;
          letter-spacing: -0.45px;
        }
      }
      content {
        font-size: 16px;
        line-height: 27px;
      }
    }
  }
  @media (min-width: 1300px) {
  }
`;
const FileViewerContainer = styled(FileViewer)``;

const PageBar = styled.div`
  width: 351px;
  margin-top: 109px;
  margin-bottom: ${(props) => (props.type === "QnA" ? "157px" : "")};
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: ${(props) => (props.login ? "none" : "flex")};
  justify-content: space-between;
  filter: ${(props) => (props.acitve ? "blur(9px)" : "none")};

  img {
    align-self: center;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 171px;
    margin-top: 54px;
    margin-bottom: 67px;
    img {
      width: 4px;
      height: 14px;
    }
  }


  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 251px;
    margin-top: 69px;
    margin-bottom: 97px;
    img {
      width: 6px;
      height: 18px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 301px;
    margin-top: 84px;
    margin-bottom: 127px;
    img {
      width: 8px;
      height: 22px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 50px auto 60px auto;
    width: 250px;
    > img {
      height: 15px;
    }
  }
  `;
const SliderContainer = styled(Slider)`
  .slick-list {
    width: 100%;
    .slick-track {
      .slick-slide {
        display: flex;
        justify-content: center;
      }
    }
  }
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

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 15px;
    width: 12px;
    height: 18px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 18px;
    width: 12px;
    height: 26px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 22px;
  }
`;

const NoReviewItem = styled.div``;

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

const MapBox = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 157px;
`;

const QuestionBox = styled.div`
  width: 100%;
  // height: 500px;
`;
const TotalCount = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.86;
  letter-spacing: -0.35px;
  text-align: left;
`;

const ReviewTop = styled.div`
  display: none;
  @media (min-width: 0px) and (max-width: 767.98px) {
    filter: ${(props) => (props.login ? "blur(9px)" : "")};
    display: flex;
    justify-content: space-between;
  }
`;

const DateSorting = styled.div`
  display: flex;
  justify-content: center;
  > div {
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.86;
    letter-spacing: -0.35px;
    text-align: left;
    color: #282c36;
  }
  > img {
    width: 10px;
  }
`;

const SubCard = styled.div`
  width: 300px;
  margin-top: 180px;
  border-left: 1px solid #e1e2e4;
  padding-left: 52px;
`;

/* Summary Box */
const SummaryBox = styled.div`
  margin-top: 50px;
  margin-bottom: 34px;
  filter: ${(props) => (props.login || props.active) && "blur(9px)"};
  > label {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: 500;
    margin-bottom: 24px;
    display: block;
  }
  > header {
    display: flex;
    justify-content: space-between;
    > mainscore {
      display: flex;
      > div:nth-of-type(1) {
        padding-top: 9px;
        box-sizing: border-box;
      }
      > div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        > span:nth-of-type(1) {
          align-self: center;
          font-size: 48px;
          line-height: 40px;
          letter-spacing: -1.2px;
          color: #282c36;
          font-weight: bold;
          margin-bottom: 12px;
        }
        > span:nth-of-type(2) {
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.4px;
          color: #191919;
          font-weight: normal;
        }
      }
    }
    > subscore {
      display: flex;
      flex-direction: column;
      width: 165px;
     
      > div {
        margin-bottom: 9px;
        display: flex;
        justify-content: space-between;

        // 4. (1)        
        >div{
          display: flex;
          align-items: center;
        }
      }
    }
  }  

  @media (min-width: 768px) and (max-width: 991.98px) {
    >label{
      font-size: 20px;
    }
    > header {    
      > mainscore {      
        > div:nth-of-type(1) {
          padding-top: 6px;        
        }
        > div:nth-of-type(2) {        
          > span:nth-of-type(1) {
            font-size: 32px;
            line-height: 24px;
            
            margin-bottom: 6px;
          }
          > span:nth-of-type(2) {
            font-size: 12px;
            line-height: 18px;        
          }
        }
      }
      > subscore {      
        width: 165px;
        > div {
          margin-bottom: 7px;
          >span{
            font-size:12px;
          }
        }
      }
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    >header{
      > subscore {          
        > div {      
        
          align-items: center;
          >span{              
            padding: 2px;
            width: 180px;
            // margin-bottom: 7px;
          }
          > span:nth-of-type(1) {
              
              margin-right: 10px;
              font-size: 12px;
              // width: 55px;
              text-align: right;
          
            }
            > div:nth-of-type(1) {
              
              // display: none;
              font-size: 12px;
            }
            > div:nth-of-type(2) {
              // display: none;
              
        
              display: block;
              font-size: 12px;
                 
            }
          
        }
      }
    }
  }


  @media (min-width: 992px) and (max-width: 1299.98px) {
    >label{
      font-size: 22px;
    }
      > header {    
    > mainscore {      
      > div:nth-of-type(1) {
        padding-top: 8px;        
      }
      > div:nth-of-type(2) {        
        > span:nth-of-type(1) {
          font-size: 40px;
          line-height: 32px;
          
          margin-bottom: 8px;
        }
        > span:nth-of-type(2) {
          font-size: 14px;
          line-height: 24px;        
        }
      }
    }
   > subscore {      
      width: 165px;
      > div {
        margin-bottom: 7px;
        >span{
          font-size:12px;

          // 4. (2)
        align-items: center;
        @media (min-width: 0px) and (max-width: 767.98px) {
          padding: 2px;
          width: 180px;
          margin-bottom: 7px;
        }
        > span:nth-of-type(1) {
          @media (min-width: 0px) and (max-width: 767.98px) {
            margin-right: 10px;
            font-size: 12px;
            width: 55px;
            text-align: right;
          }
        }
        > div:nth-of-type(1) {
          @media (min-width: 0px) and (max-width: 767.98px) {
            display: none;
          }
        }
        > div:nth-of-type(2) {
          display: none;
          @media (min-width: 0px) and (max-width: 767.98px) {
            display: block;
            font-size: 12px;
          }
// 4. (2)        
}
      }
    }
  }
`;

const TotalRating = styled.div`
  > div {
    @media (min-width: 0px) and (max-width: 767.98px) {
      display: none;
    }
  }
  > img {
    display: none;
    @media (min-width: 0px) and (max-width: 767.98px) {
      width: 21.7px;
      height: 21px;
      display: block;
    }
  }
`;
const InfoBox = styled.div`
  display: flex;
  align-items: self-start;
  margin-bottom: 60px;
`;

const ParentRecommentBox = styled.div`
  display: flex;
  > img {
    margin-right: 20px;
  }
`;

const Main = styled.div``;

const SimilarBox = styled.div`
  width: 100%;
`;

const Block = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99;
`;

const UpImg = styled.img`
  position: absolute;
  bottom: 8%;
  right: 0;
  zindex: 1;
  cursor: pointer;

  @media (min-width: 0px) and (max-width: 767.98px) {
    bottom: 0;
    width: 50px;
  }
`;
