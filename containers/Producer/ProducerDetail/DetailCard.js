import React from "react";
import styled, { css } from "styled-components";
import dynamic from "next/dynamic";
import Router from "next/router";
import Modal from "../Review/ReviewWritingModal";
import ReviewCard from "../Review/ReviewCard";
import ReviewStarRating from "../Review/ReviewStarRating";
import { toJS } from "mobx";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { inject, observer } from "mobx-react";
import * as Title from "components/Title";

const customRenderer = DocViewerRenderers;

const star = "/static/icon/star_blue3.svg";
const bluebar_empty = "/static/icon/bluebar_empty.svg";

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

const waterMarkImg = "/static/images/logo_marine@2x.png";
const pass1 = "/static/images/pass1.png";
const pass2 = "/static/images/pass2.png";
const type = "pdf";
const sort = "/static/icon/sort.svg";

const onError = (e) => {
  console.log(e, "error in file-viewer");
};

@inject("Partner", "Auth")
@observer
class DetailCardContainer extends React.Component {
  state = {
    avg_consult_score: 0,
    avg_kindness_score: 0,
    avg_communication_score: 0,
    avg_profession_score: 0,
    docViewerLoading: false,
  };

  openModal = () => {
    const { Partner } = this.props;
    // console.log("requestmodal open click");
    // this.setState({ modalOpen: true });
    Partner.reviewWritingModalActive = false;
  };
  closeModal = () => {
    const { Partner } = this.props;
    // console.log("requestmodal close click");

    Partner.reviewWritingModalActive = true;
  };
  docRender = () => {
    console.log("AAAAAAAAAA");
    console.log(this.props.Partner.docViewerLoading);
    if (!this.props.Partner.docViewerLoading) {
      setTimeout(() => {
        // this.setState({ g: 3 });
        // this.docRender();
      }, 5000);
    }
    // if (!this.state.docViewerLoading) {
    //   console.log(this.state.docViewerLoading);
    //   // setTimeout(() => {}, 4000);
    // }
  };

  componentDidMount = async () => {
    const { Partner, Auth } = this.props;
    Partner.docViewerLoading = false;

    this.docRender();
    customRenderer.weight = 2;
    customRenderer.fileLoader = ({
      documentURI,
      signal,
      fileLoaderComplete,
    }) => {
      console.log("bbb");
      // customFileLoaderCode
      // customFileLoaderCode().then(() => {
      //   console.log("ccc");
      //   fileLoaderComplete();
      // });
      fileLoaderComplete();
    };

    console.log(customRenderer);
    console.log(toJS(Partner.partner_detail_list));
    console.log("detail page didmount");
    console.log(toJS(Partner.partnerAllReviewList));
    console.log(toJS(Partner.partnerReviewList));
    console.log(toJS(Auth));
    console.log(toJS(Partner.review_partner_page));

    const height = document.getElementById("card").style;
    console.log(height);
    console.log(`HEIGHT : ${height}`);

    if (Auth.logged_in_client) {
      Partner.checkReviewWriting(Auth.logged_in_client.id);
      // Partner.checkReviewWriting(5052);
    }

    Partner.reviewCurrentPage = 1;
    Partner.detailLoadingFlag = false;
    if (Partner.partner_detail_list.length == 0) {
      Router.push("/producer");
    }

    console.log(this.props.Partner.selectedIntroductionFileType);

    // if (this.props.Partner.selectedIntroductionFileType === "pptx") {
    //   var frameHTML =
    //     '<iframe src="https://docs.google.com/gview?url=' +
    //     this.props.Partner.selectedIntroductionFile +
    //     '&embedded=true" class="viewer" frameborder="0"></iframe>';
    //   document.getElementById("viewer-wrap").innerHTML = frameHTML;
    // }

    let total_consult_score = 0;
    let total_kindness_score = 0;
    let total_communication_score = 0;
    let total_profession_score = 0;
    // console.log(Partner.partnerReviewList);

    (await Partner.partnerAllReviewList[0]) &&
      Partner.partnerAllReviewList[0].data.map((item, idx) => {
        total_consult_score += item.consult_score;
        total_kindness_score += item.kindness_score;
        total_communication_score += item.communication_score;
        total_profession_score += item.profession_score;
      });
    Partner.partnerAllReviewList[0] &&
      this.setState({
        avg_consult_score:
          total_consult_score / Partner.partnerAllReviewList[0].data.length,
        avg_kindness_score:
          total_kindness_score / Partner.partnerAllReviewList[0].data.length,
        avg_communication_score:
          total_communication_score /
          Partner.partnerAllReviewList[0].data.length,
        avg_profession_score:
          total_profession_score / Partner.partnerAllReviewList[0].data.length,
      });
    // console.log(total_consult_score);
    // console.log(total_kindness_score);
    // console.log(total_communication_score);
    // console.log(total_profession_score);
    // console.log(Partner.partnerAllReviewList[0].data.length);

    // console.log(5 / 2);
    // console.log(this.state.avg_consult_score);
    // console.log(Math.floor(this.state.avg_consult_score));
  };
  componentWillUnmount = () => {
    const { Partner, Auth } = this.props;
    Partner.review_partner_page = 1;
  };

  error = () => {
    console.log("error");
  };
  movePage = (e) => {
    console.log("movePage");
    const { Partner, Auth } = this.props;
    // e.preventDefault();
    const newPage = e.target.innerText * 1;

    if (newPage != Partner.reviewCurrentPage) {
      Partner.reviewCurrentPage = newPage;
      // Partner.resetDevCategory();
      // Partner.check_loading_develop = false;
      // Partner.ReviewActive = false;
      // Partner.ReviewActiveIndex = -1;
      // this.setState({ dropDownActive: false, dropDownIdx: -1 });
      // Partner.click_count += 1;

      Partner.getReviewByPartner(
        Partner.partner_detail_list[0].item.id,
        1,
        newPage
      );
    }
  };

  pageNext = (e) => {
    console.log("pageNext");
    const { Partner } = this.props;
    // e.preventDefault();
    if (Partner.reviewCurrentPage < Partner.review_partner_page) {
      const nextPage = Partner.reviewCurrentPage + 1;
      Partner.reviewCurrentPage = nextPage;
      // Partner.check_loading_develop = false;
      // Partner.resetDevCategory();
      // Partner.ReviewActive = false;
      // Partner.ReviewActiveIndex = -1;
      // this.setState({ dropDownActive: false, dropDownIdx: -1 });
      // Partner.click_count += 1;
      Partner.getReviewByPartner(
        Partner.partner_detail_list[0].item.id,
        1,
        nextPage
      );
    }
  };

  pagePrev = (e) => {
    console.log("pagePrev");
    const { Partner } = this.props;
    // e.preventDefault();
    if (Partner.reviewCurrentPage > 1) {
      const previousPage = Partner.reviewCurrentPage - 1;
      Partner.reviewCurrentPage = previousPage;
      // Partner.resetDevCategory();
      // Partner.check_loading_develop = false;
      // Partner.ReviewActive = false;
      // Partner.ReviewActiveIndex = -1;
      // this.setState({ dropDownActive: false, dropDownIdx: -1 });
      // Partner.click_count += 1;
      Partner.getReviewByPartner(
        Partner.partner_detail_list[0].item.id,
        1,
        previousPage
      );
    }
  };

  render() {
    const { width, Partner } = this.props;
    const current_set = parseInt((Partner.reviewCurrentPage - 1) / 5) + 1;
    // console.log(toJS(Partner.selectedIntroductionFile));

    const docs = [{ uri: this.props.Partner.selectedIntroductionFile }];

    console.log(docs);
    // const customDocRenderer =

    return (
      <>
        <Card
          id="card"
          width={width}
          onContextMenu={(e) => {
            // e.preventDefault();
          }}
          onClick={() => this.setState({ g: 3 })}
        >
          <HeaderBox>
            <tag>
              <span>활동 가능</span>
            </tag>
            {Partner.partner_detail_list.length != 0 && (
              <name>{Partner.partner_detail_list[0].item.name}</name>
            )}
            {Partner.partner_detail_list.length != 0 && (
              <content>
                <span>{Partner.partner_detail_list[0].item.info_company}</span>
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
          >
            <div style={{ opacity: 0.2 }}>
              <img src={waterMarkImg} />
            </div>
          </div>
          <InnerBox>
            <IntroductionBox width={width}>
              <Font24>회사소개서</Font24>
              {availableFileType1.indexOf(
                this.props.Partner.selectedIntroductionFileType
              ) > -1 && (
                <FileViewerContainer
                  fileType={this.props.Partner.selectedIntroductionFileType}
                  filePath={this.props.Partner.selectedIntroductionFile}
                  onError={onError}
                />
              )}

              {availableFileType3.indexOf(
                this.props.Partner.selectedIntroductionFileType
              ) > -1 && (
                <>
                  <DOCViewer
                    documents={docs}
                    onLoad={() => {
                      console.log("eee");
                      // Partner.docViewerLoading = true;
                      // this.setState({ docViewerLoading: true });
                    }}
                    // pluginRenderers={DocViewerRenderers}
                    pluginRenderers={customRenderer}
                    // pluginRenderers={
                    //   (DocViewerRenderers.fileLoader = ({
                    //     documentURI,
                    //     signal,
                    //     fileLoaderComplete,
                    //   }) => {
                    //     // fileLoaderCode().then(() => {
                    //     console.log("complete");
                    //     //   fileLoaderComplete();
                    //     //   // });
                    //   })
                    // }
                    height={width}
                    window={window}
                    type={this.props.Partner.selectedIntroductionFileType}
                    // onError={this.onError}
                    // errorComponent={CustomErrorComponent}
                    // onError={this.onError}/>
                    // fileLoaderComplete={() => console.log("Complete")}
                  />
                  {console.log(docs)}
                  {console.log(customRenderer.fileLoader)}
                </>
              )}
            </IntroductionBox>
          </InnerBox>
          <DetailInfoBox>
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
              {Partner.partner_detail_list.length != 0 && (
                <content>{Partner.partner_detail_list[0].item.deal}</content>
              )}
            </div>
            <div>
              <label>
                <span>진행한 제품군</span>
              </label>
              {Partner.partner_detail_list.length != 0 && (
                <content>{Partner.partner_detail_list[0].item.history}</content>
              )}
            </div>
          </DetailInfoBox>
          <ReviewBox>
            {/* 1. */}
            {/* <label>평가 후기</label> */}
            <div>
              <label>평가 후기</label>
            </div>
            {/*  */}
            <SummaryBox>
              <label>클라이언트 평균 만족도</label>
              <header>
                <mainscore>
                  <div>
                    {/* 2. */}
                    {/* <ReviewStarRating
                      width={width > 1300 ? "31" : width > 992 ? "26" : "22"}
                      margin={4}
                      score={Math.floor(this.state.avg_consult_score)}
                    /> */}
                    <TotalRating>
                      <div>
                        <ReviewStarRating
                          width={
                            width > 1300 ? "31" : width > 992 ? "26" : "22"
                          }
                          margin={4}
                          score={Math.floor(this.state.avg_consult_score)}
                        />
                      </div>
                      <img src={star}></img>
                    </TotalRating>
                    {/*  */}
                  </div>
                  <div>
                    <span>{this.state.avg_consult_score.toFixed(1)}</span>
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
                            width > 1300 ? "15" : width > 992 ? "13" : "11"
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
                        <div>{this.state.avg_kindness_score.toFixed(1)}</div>
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
                            width > 1300 ? "15" : width > 992 ? "13" : "11"
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
                            width > 1300 ? "15" : width > 992 ? "13" : "11"
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
                        <div>{this.state.avg_profession_score.toFixed(1)}</div>
                      </>
                    )}
                  </div>
                </subscore>
              </header>
            </SummaryBox>
            <content>
              {/* 3. */}
              <ReviewTop>
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
              {/*  */}
              {Partner.partnerReviewList &&
                Partner.partnerReviewList[0] &&
                Partner.partnerReviewList[0].current.map((item, idx) => {
                  return (
                    <ReviewCard
                      data={item}
                      idx={idx}
                      totalCount={Partner.partnerReviewList[0].current.length}
                    />
                  );
                })}
            </content>
            {/* reviewWriting */}
            {!Partner.reviewWritingModalActive ? (
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
              Partner.review_partner_page === 1 &&
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
            )}

            {/* <NoReviewItem>
              <span>현재 작성 된 리뷰가 없습니다</span>
            </NoReviewItem> */}

            <PageBar acitve={!Partner.reviewWritingModalActive}>
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
                    Partner.review_partner_page < 5 * (current_set - 1) + 1
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
                    Partner.review_partner_page < 5 * (current_set - 1) + 2
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
                    Partner.review_partner_page < 5 * (current_set - 1) + 3
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
                    Partner.review_partner_page < 5 * (current_set - 1) + 4
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
                    Partner.review_partner_page < 5 * (current_set - 1) + 5
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
                    Partner.review_partner_page == Partner.reviewCurrentPage
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
        </Card>
      </>
    );
  }
}

export default DetailCardContainer;

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
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
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
  margin-bottom: 174px;
  tag {
    width: 118px;
    height: 40px;
    border-radius: 3px;
    background-color: #0933b3;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 34px;
    span {
      color: #ffffff;
      font-size: 18px;
      line-height: 30px;
      letter-spacing: -0.18px;
      font-weight: 500;
    }
  }
  name {
    font-size: 26px;
    line-height: 52px;
    letter-spacinig: -0.65px;
    color: #282c36;
    font-weight: bold;
    margin-bottom: 34px;
  }
  content {
    span {
      font-size: 18px;
      line-height: 34px;
      letter-spacing: -0.45px;
      color: #414550;
      font-weight: normal;
      white-space: pre-wrap;
      word-break: keep-all;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 32px;
    tag {
      width: 68px;
      height: 26px;
      margin-bottom: 14px;
      span {
        font-size: 12px;
        letter-spacing: -0.12px;
      }
    }
    name {
      font-size: 16px;
      line-height: 15px;
      letter-spacinig: -0.4px;
      margin-bottom: 24px;
    }
    content {
      border: 1px solid #c6c7cc;
      border-radius: 5px;
      padding: 24px 16px;
      box-sizing: border-box;
      span {
        font-size: 14px;
        line-height: 26px;
        letter-spacing: -0.35px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {

    margin-bottom:96px;
    tag {
      width: 88px;
      height: 32px;
      margin-bottom: 20px;
      span {
        font-size: 14px;
        letter-spacing: -0.12px;
      }
    }
    name {
      font-size: 20px;
      line-height: 15px;
      letter-spacinig: -0.4px;
      margin-bottom: 20px;
    }
    content {
      span {
        font-size: 16px;
        line-height: 26px;
        letter-spacing: -0.35px;
      }
    }
  }

  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-bottom: 144px;
    tag {
      width: 104px;
      height: 36px;
      margin-bottom: 28px;
      span {
        font-size: 16px;
        letter-spacing: -0.12px;
      }
    }
    name {
      font-size: 23px;
      line-height: 15px;
      letter-spacinig: -0.4px;
      margin-bottom: 24px;
    }
    content {
      span {
        font-size: 17px;
        line-height: 26px;
        letter-spacing: -0.35px;
      }
    }
  }

`;

const ReviewBox = styled.div`
  position: relative;
  // height: 500px;
  margin-top: 109px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 60px;
  }
  > div {
    > label {
      font-size: 24px;
      line-height: 40px;
      letter-spacing: -0.6px;
      color: #282c36;
      font-weight: bold;
      @media (min-width: 0px) and (max-width: 767.98px) {
        object-fit: contain;
        font-size: 16px;
        line-height: 2.5;
        letter-spacing: -0.4px;
        text-align: left;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 20px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 22px;
  }
`;

const SummaryBox = styled.div`
  margin-top: 50px;
  margin-bottom: 34px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  > label {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: 500;
    margin-bottom: 24px;
    display: block;
    @media (min-width: 0px) and (max-width: 767.98px) {
      display: none;
    }
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
          @media (min-width: 0px) and (max-width: 767.98px) {
            font-size: 32px;
            margin-bottom: 0px;
          }
        }
        > span:nth-of-type(2) {
          font-size: 16px;
          line-height: 24px;
          letter-spacing: -0.4px;
          color: #191919;
          font-weight: normal;
          @media (min-width: 0px) and (max-width: 767.98px) {
            color: #999999;
            font-size: 14px;
          }
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

const ReviewTop = styled.div`
  display: none;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: flex;
    justify-content: space-between;
  }
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

const DOCViewer = styled(DocViewer)`
min-height: 300px;
  > div:nth-of-type(1){
    display: none;
    z-index: 0;    
  }
  > div:nth-of-type(2) {
    border: 3px solid red;

    > div:nth-of-type(1) {
      // height: 1000px;
      height: ${(props) =>
        (props.type === "pptx" || props.type === "ppt") &&
        props.height / 2 - props.height / 5}px;
      height: ${(props) =>
        (props.type === "docx" || props.type === "doc") && 1200}px;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    > div:nth-of-type(2) {
      > div:nth-of-type(1) {
        height: ${(props) =>
          props.type === "pptx" || props.type === "ppt"
            ? props.height
              ? props.height / 3 + props.height / 3
              : 0
            : 300}px;


      }
      }
    }
  }
`;

const PageBar = styled.div`
  width: 351px;
  margin-top: 109px;
  margin-bottom: 157px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
  filter: ${(props) => (props.acitve ? "blur(9px)" : "")};

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
