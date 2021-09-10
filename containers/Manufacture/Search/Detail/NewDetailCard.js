import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import * as Title from "components/Title";
import ContainerV1 from "components/ContainerV1";
import ProposalCard from "./ProposalCard";
import MapContainer from "./Map";
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

const detailviewcount = "/static/images/viewcount.svg";
const detailbookmarkImg = "/static/icon/bookmark_empty.svg";
// const bookmarkBlueImg = "/static/icon/bookmark_blue.svg";

@inject("Partner", "Auth", "Common")
@observer
class NewDetailCardContainer extends React.Component {
  state = {
    portfolioToShow: 20,
    portfolioSetMoreState: false,
  };

  pushToDetail = async (item, idx) => {
    const { Partner } = this.props;

    if (!Partner.requestModalActive && !Partner.modalActive) {
      Partner.category_name_list = null;
      Partner.partner_detail_list = [];
      await Partner.partner_detail_list.push({ item: item, idx: idx });
      Partner.category_name_list = Partner.category_dic[idx];

      Partner.selectedIntroductionFile = item.file;

      const fileType = item.file.split(".")[item.file.split(".").length - 1].toLowerCase();
      Partner.selectedIntroductionFileType = fileType;

      Partner.partnerReviewList = [];
      Partner.partnerAllReviewList = [];
      Partner.review_partner_page = 0;
      Partner.review_partner_count = 0;

      Partner.city_name = "";
      await Partner.getCityName(Partner.partner_detail_list[0].item.city);

      Partner.business_name = [];
      toJS(Partner.partner_detail_list[0].item.business).map(async (item) => await Partner.getBusinessName(item));

      Partner.questionList = [];
      await Partner.getQuestion(Partner.partner_detail_list[0].item.id);

      localStorage.setItem("recent", JSON.stringify(Partner.recentPartnerList));

      this.setState((state) => {
        return { g: state.g + 1 };
      });
      window.scrollTo(0, 0);
    }
  };

  componentDidMount() {
    const { Partner } = this.props;

    // 포트폴리오 갯수가 20개 이상일때 더보기 버튼 활성화
    if (Partner.partner_detail_list[0].item.portfolio_set.length >= 20) {
      this.setState({ portfolioSetMoreState: true });
    }
  }

  componentDidUpdate() {
    const { Partner } = this.props;

    // 더 보여줄 포트폴리오가 없는 경우 더보기 버튼 삭제
    if (this.state.portfolioSetMoreState === true) {
      if (Partner.partner_detail_list[0].item.portfolio_set.length < this.state.portfolioToShow) {
        this.setState({ ...this.state, portfolioSetMoreState: false });
      }
      // 최대 100개 까지만 보여준다.
      if (this.state.portfolioToShow > 100) {
        this.setState({ ...this.state, portfolioSetMoreState: false });
      }
    }
  }

  componentWillUnmount() {
    const { Partner } = this.props;

    // 포트폴리오 더보기 갯수 초기화
    this.setState({ portfolioToShow: 20 });

    // 탭바 인덱스 초기화
    Partner.tabIdx = 1;
  }

  // 포트폴리오 보여주기 갯수 핸들러
  portfolioToShowHandler() {
    if (this.state.portfolioSetMoreState && this.state.portfolioToShow === 20) {
      this.setState({ portfolioToShow: 40 });
    }

    if (this.state.portfolioSetMoreState && this.state.portfolioToShow === 40) {
      this.setState({ portfolioToShow: 60 });
    }

    if (this.state.portfolioSetMoreState && this.state.portfolioToShow === 60) {
      this.setState({ portfolioToShow: 80 });
    }

    if (this.state.portfolioSetMoreState && this.state.portfolioToShow === 80) {
      this.setState({ portfolioToShow: 100 });
    }

    if (this.state.portfolioSetMoreState && this.state.portfolioToShow === 100) {
      this.setState({ portfolioToShow: 120 });
    }
  }

  render() {
    const { Partner } = this.props;
    console.log(Partner.tabIdx);

    // 비슷한 업체 더보기
    let index = 0;
    if (Partner.partner_detail_list[0]) {
      index = Partner.partner_detail_list[0].idx;
    }

    const length = Partner.partner_list.length;
    let arr = [];

    for (let i = 0; i < length; i++) {
      arr.push(i);
    }

    Partner.shuffleArray(arr);
    let remainderAry = arr.filter((el) => el !== index);

    // Map 리전 넣어주기
    let region = "";

    if (Partner.partner_detail_list[0].item) {
      region =
        Partner.partner_detail_list[0].item.region === null || Partner.partner_detail_list[0].item.region === "nan"
          ? Partner.city_name
          : Partner.partner_detail_list[0].item.region;
    }

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container>
          {/* MainContainer */}
          <div style={{ width: 792, display: "flex", flexDirection: "column" }}>
            {/* 포트폴리오 */}
            <PortfolioSection>
              <MainContainer>
                {Partner.partner_detail_list[0].item.portfolio_set.slice(0, this.state.portfolioToShow).map((v, idx) => (
                  <>
                    {console.log(Partner.partner_detail_list[0])}
                    <PortfolioImgBox key={idx} src={v.img_portfolio} />
                  </>
                ))}
              </MainContainer>

              <MoreBtn active={this.state.portfolioSetMoreState} onClick={() => this.portfolioToShowHandler()}>
                포트폴리오 더보기
                <img src="/static/images/partner/moredata.svg" style={{ marginLeft: 12, paddingBottom: 2 }} />
              </MoreBtn>
            </PortfolioSection>

            {/* 비슷한 업체 더 보기 */}
            <MoreCompanySection>
              <InnerBox
                style={{
                  width: 792,
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <img src="/static/images/partner/blueline.svg" style={{ width: 28, height: 4 }} />

                  <InnerBox>
                    <Font18>비슷한 업체 더보기</Font18>
                  </InnerBox>
                </div>

                <div
                  style={{
                    width: 100,
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <Font16 style={{ marginRight: 24 }}>1/2</Font16>
                  <img src="/static/images/partner/prev.svg" style={{ cursor: "pointer" }} />
                  <img src="/static/images/partner/next.svg" style={{ cursor: "pointer" }} />
                </div>
              </InnerBox>

              <InnerBox
                style={{
                  width: 792,
                  marginTop: 24,
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  {Partner.partner_list &&
                    (length < 4
                      ? remainderAry.map((item, idx) => {
                          return (
                            <div
                              onClick={(e) => {
                                Partner.viewerLoading = 0;
                                Partner.recentPartnerId = Partner.partner_detail_list[0].item.id;

                                this.pushToDetail(Partner.partner_list[item], item);
                              }}
                              style={{
                                width: 225,
                                height: 309,
                                cursor: "pointer",
                              }}
                            >
                              <ProposalCard
                                data={Partner.partner_list[item]}
                                width={this.props.width}
                                height={309}
                                categoryData={toJS(Partner.category_dic[item])}
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
                                Partner.viewerLoading = 0;
                                Partner.recentPartnerId = Partner.partner_detail_list[0].item.id;
                                this.pushToDetail(Partner.partner_list[item], item);
                              }}
                              style={{
                                width: 225,
                                height: 309,
                                cursor: "pointer",
                              }}
                            >
                              <ProposalCard
                                data={Partner.partner_list[item]}
                                width={this.props.width}
                                height={309}
                                categoryData={toJS(Partner.category_dic[item])}
                                idx={item}
                                handleIntersection={this.handleIntersection}
                                customer="partner"
                              />
                            </div>
                          );
                        }))}
                </div>
              </InnerBox>
            </MoreCompanySection>

            {/* 탭바 */}
            <TabBarSection>
              <InnerBox>
                <Tab onClick={() => Partner.tabClick(1)} active={Partner.tabStateHandler(1)}>
                  기본 정보
                </Tab>
                <Tab onClick={() => Partner.tabClick(2)} active={Partner.tabStateHandler(2)}>
                  후기
                </Tab>
                <Tab onClick={() => Partner.tabClick(3)} active={Partner.tabStateHandler(3)}>
                  문의
                </Tab>
              </InnerBox>

              <Font24 style={{ marginTop: 40 }}>기본 정보</Font24>
              <Font16 style={{ marginTop: 24 }}>{Partner.partner_detail_list[0].item.info_company}</Font16>

              <BoundaryLine style={{ margin: "20px 0px 20px 0px" }} />

              <CompanyInfoContainer>
                <CompanyInfoBox>
                  <Font16 style={{ color: "#282c36", width: 60, fontWeight: "bold" }}>대표자</Font16>
                  <Font16 style={{ color: "#414550" }}>{Partner.partner_detail_list[0].item.CEO ? Partner.partner_detail_list[0].item.CEO : "-"}</Font16>
                </CompanyInfoBox>

                <CompanyInfoBox>
                  <Font16 style={{ color: "#282c36", width: 60, fontWeight: "bold" }}>지역</Font16>
                  <Font16 style={{ color: "#414550" }}>
                    {Partner.partner_detail_list[0].item.city ? Partner.partner_detail_list[0].item.city.maincategory : "-"}
                  </Font16>
                </CompanyInfoBox>
              </CompanyInfoContainer>

              <CompanyInfoContainer>
                <CompanyInfoBox>
                  <Font16 style={{ color: "#282c36", width: 60, fontWeight: "bold" }}>사업 유형</Font16>
                  <Font16 style={{ color: "#414550" }}>제작/생산(api요청)</Font16>
                </CompanyInfoBox>

                <CompanyInfoBox>
                  <Font16 style={{ color: "#282c36", width: 60, fontWeight: "bold" }}>직원 수</Font16>
                  <Font16 style={{ color: "#414550" }}>{Partner.partner_detail_list[0].item.staff ? Partner.partner_detail_list[0].item.staff : "-"}</Font16>
                </CompanyInfoBox>
              </CompanyInfoContainer>

              <CompanyInfoContainer>
                <CompanyInfoBox>
                  <Font16 style={{ color: "#282c36", width: 60, fontWeight: "bold" }}>총 매출액</Font16>
                  <Font16 style={{ color: "#414550" }}>50~100억(api요청)</Font16>
                </CompanyInfoBox>

                <CompanyInfoBox>
                  <Font16 style={{ color: "#282c36", width: 60, fontWeight: "bold" }}>설립연도</Font16>
                  <Font16 style={{ color: "#414550" }}>{Partner.partner_detail_list[0].item.year ? Partner.partner_detail_list[0].item.year : "-"}년</Font16>
                </CompanyInfoBox>
              </CompanyInfoContainer>

              <CompanyInfoContainer>
                <CompanyInfoBox>
                  <Font16 style={{ color: "#282c36", width: 60, fontWeight: "bold" }}>인증(2)</Font16>
                  <Font16 style={{ color: "#414550" }}>
                    {Partner.partner_detail_list[0].item.Certification ? Partner.partner_detail_list[0].item.Certification : "-"}
                  </Font16>
                </CompanyInfoBox>
              </CompanyInfoContainer>

              <DocViewerContainer>pptx, pdf viewer</DocViewerContainer>
            </TabBarSection>

            {/* 지도 */}
            <MapSection>
              <Font24 style={{ marginBottom: 24 }}>위치</Font24>
              <MapContainer city={region} />
            </MapSection>

            {/* 리뷰 */}
            <ReviewSection>
              <div
                style={{
                  display: "inline-flex",
                  justifyContent: "space-between",
                }}
              >
                <InnerBox style={{ gap: 15 }}>
                  <Font24>실제 고객후기(2)</Font24>
                  <div>점수</div>
                </InnerBox>

                <InnerBox style={{ gap: 30 }}>
                  <div>친절도</div>
                  <div>연락 빈도</div>
                  <div>전문성</div>
                </InnerBox>
              </div>

              <BoundaryLine style={{ margin: "24px 0px 36px 0px" }} />

              <div style={{ display: "inline-flex" }}>
                <div>rhk***님</div>
                <div>별</div>
                <div>점수</div>
                <div>날짜</div>
              </div>

              <div style={{ marginTop: 23 }}>프로젝트 제목</div>

              <div style={{ marginTop: 8 }}>후기내용</div>

              <BoundaryLine style={{ margin: "36px 0px 24px 0px" }} />

              <ReviewWriteBox>
                <Font16 style={{ color: "#282c36", textAlign: "center" }}>
                  이 제조사와 직접 소통이나 거래를
                  <br />
                  진행해본 경험이 있으신가요?
                </Font16>

                <ReviewWriteBtn>후기 작성하기</ReviewWriteBtn>
              </ReviewWriteBox>
            </ReviewSection>

            {/* QnA */}
            <QnASection>
              <Font24 style={{ marginBottom: 34 }}>QnA</Font24>

              <InnerBox style={{ justifyContent: "space-between" }}>
                <InnerBox style={{ gap: 12 }}>
                  <div>Q</div>
                  <div>비밀댓글 입니다.</div>
                </InnerBox>

                <InnerBox style={{ gap: 16 }}>
                  <div>rhk***님</div>
                  <div>날짜</div>
                </InnerBox>
              </InnerBox>

              <div style={{ margin: "16px 0px 0px 24px" }}>답글달기</div>

              <BoundaryLine style={{ margin: "20px 0px 23px 0px" }} />

              <RequestBox>
                <Font16 style={{ color: "#282c36" }}>
                  이 제조사가 마음에 드시나요? <RequestBtn>[견적 요청하기]</RequestBtn> 버튼을 눌러 지금 바로 프로젝트를 시작해보세요!
                </Font16>

                <div style={{ marginLeft: 64 }}>X</div>
              </RequestBox>

              <QnAWriteBoxContainer>
                <QnAWriteBox placeholder="궁금하신 내용이 있으신가요?" />

                <InnerBox
                  style={{
                    justifyContent: "space-between",
                    marginTop: 8,
                  }}
                >
                  <InnerBox style={{ alignItems: "center" }}>
                    <input type="checkbox" />
                    <Font12>비밀글</Font12>
                  </InnerBox>

                  <QnAWriteBtn>작성하기</QnAWriteBtn>
                </InnerBox>
              </QnAWriteBoxContainer>
            </QnASection>
          </div>

          {/* SubContainer */}
          <SubContainer>
            <div style={{ width: 350 }}>
              <SubContainerInnerBox>
                <ActivePossibleBox>
                  <Font14
                    style={{
                      fontWeight: 500,
                      color: "#0933b3",
                    }}
                  >
                    활동 가능
                  </Font14>
                </ActivePossibleBox>

                <CountBox>
                  <CountBoxImg src={detailviewcount} />
                  {Partner.partner_detail_list[0] && Partner.partner_detail_list[0].item.view <= 1 ? (
                    <Font14 style={{ color: "#999999" }}>낮음</Font14>
                  ) : 1 <= Partner.partner_detail_list[0].item.view <= 4 ? (
                    <Font14 style={{ color: "#999999" }}>보통</Font14>
                  ) : Partner.partner_detail_list[0].item.view >= 5 ? (
                    <Font14 style={{ color: "#999999" }}>높음</Font14>
                  ) : null}

                  <CountBoxImg src={detailbookmarkImg} style={{ marginLeft: 10 }} />
                  <Font14 style={{ color: "#999999" }}>7(api요청)</Font14>
                </CountBox>
              </SubContainerInnerBox>

              <Font26>{Partner.partner_detail_list[0] && Partner.partner_detail_list[0].item.name}</Font26>

              <Font15 style={{ marginTop: 36 }}>설립연도</Font15>
              <Font16>{Partner.partner_detail_list[0] && Partner.partner_detail_list[0].item.year}년</Font16>

              <Font15>총 매출액</Font15>
              <Font16>{Partner.partner_detail_list[0].item.salses ? Partner.partner_detail_list[0].item.salses : "-"}</Font16>

              <Font15>인증</Font15>
              <Font16>{Partner.partner_detail_list[0].item.Certification ? Partner.partner_detail_list[0].item.Certification : "-"}</Font16>

              <Font15>사업 유형</Font15>
              <Font16>개발/설계(api요청)</Font16>

              <Font15>진행한 제품군</Font15>
              <Font16>
                {Partner.partner_detail_list[0] && Partner.partner_detail_list[0].item.history.length >= 60
                  ? Partner.partner_detail_list[0].item.history.slice(0, 60) + "..."
                  : Partner.partner_detail_list[0].item.history.length === 0
                  ? "-"
                  : Partner.partner_detail_list[0].item.history}
              </Font16>

              <SubContainerBtnBox>
                <SubContainerBtn
                  style={{
                    background: "#0933b3",
                    border: "none",
                    color: "#fff",
                  }}
                >
                  견적 요청하기
                </SubContainerBtn>

                <SubContainerBtn
                  style={{
                    color: "#a4aab4",
                    background: "#fff",
                    border: "1px solid #a4aab4",
                    marginTop: 12,
                  }}
                >
                  <CountBoxImg src={detailbookmarkImg} style={{ paddingBottom: 3, marginRight: 3 }} />
                  관심 업체 등록하기
                </SubContainerBtn>
              </SubContainerBtnBox>
            </div>
          </SubContainer>
        </Container>
      </div>
    );
  }
}

export default NewDetailCardContainer;

// Font
const Font12 = styled(Title.FontSize12)`
  font-family: NotoSansCJKkr;
  font-weight: normal;
  text-align: center;
`;

const Font14 = styled(Title.FontSize14)`
  font-family: NotoSansCJKkr;
  font-weight: normal;
  text-align: center;
  margin-top: 2px;
  line-height: 2.14;
  letter-spacing: -0.14px;
`;

const Font15 = styled(Title.FontSize15)`
  font-family: NotoSansCJKkr;
  color: #999999;
  font-weight: normal;
  line-height: 1.47;
  letter-spacing: -0.38px;
  margin-top: 24px;
`;

const Font16 = styled(Title.FontSize16)`
  font-family: NotoSansCJKkr;
  color: #000000;
  font-weight: normal;
  margin-top: 4px;
  line-height: 1.5;
  letter-spacing: -0.4px;
`;

const Font18 = styled(Title.FontSize18)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
  line-height: 2;
  letter-spacing: -0.45px;
`;

const Font24 = styled(Title.FontSize24)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
`;

const Font26 = styled(Title.FontSize26)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
  color: #282c36;
  margin-top: 24px;
  line-height: 2;
  letter-spacing: -0.65px;
`;

const BoundaryLine = styled.div`
  width: 792px;
  border: 1px solid #eeeeee;
`;

// MainContainer
const InnerBox = styled.div`
  display: flex;
`;

const PortfolioSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const MoreCompanySection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 140px;
`;

const Container = styled(ContainerV1)`
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin-top: 80px;
`;

const MainContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  width: 792px;
`;

const MoreBtn = styled.button`
  display: ${(props) => (props.active ? "inline-display" : "none")};
  width: 792px;
  height: 67px;
  margin-top: 16px;
  object-fit: contain;
  border-radius: 3px;
  border: solid 1px #0933b3;
  background-color: #fff;
  color: #0933b3;
  font-size: 18px;
  font-weight: bold;
  font-family: NotoSansCJKkr;
  cursor: pointer;
`;

const TabBarSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 140px;
`;

const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 265px;
  height: 56px;
  border: 1px solid #e1e2e4;
  border-bottom: ${(props) => props.active && "none"};
  background-color: ${(props) => (props.active ? "#ffffff" : "#f6f6f6")};
  cursor: pointer;
`;

const CompanyInfoContainer = styled.div`
  display: flex;
  margin-top: 24px;
`;

const CompanyInfoBox = styled.div`
  display: flex;
  gap: 78px;
  width: 100%;
`;

const DocViewerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 526px;
  border: 1px solid #282c36;
  margin-top: 40px;
`;

const MapSection = styled.section`
  width: 100%;
  height: 500px;
  margin-bottom: 140px;
  margin-top: 140px;
`;

const ReviewSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const ReviewWriteBox = styled.div`
  width: 792px;
  height: 196px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
`;

const ReviewWriteBtn = styled.button`
  width: 150px;
  height: 42px;
  border-radius: 21px;
  background-color: #0933b3;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  border: none;
  color: #fff;
  margin-top: 24px;
`;

const RequestBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 792px;
  height: 62px;
  border-radius: 5px;
  border: solid 1px #c6c7cc;
  background-color: #f6f6f6;
`;

const RequestBtn = styled.span`
  font-weight: bold;
  color: #0933b3;
  cursor: pointer;
`;

const QnASection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 140px;
`;

const QnAWriteBoxContainer = styled.div`
  height: 250px;
  margin-top: 24px;
  margin-bottom: 24px;
  border-radius: 2px;
  border: solid 1px #c6c7cc;
`;

const QnAWriteBox = styled.textarea`
  width: 770px;
  height: 176px;
  border: none;
  resize: none;
  padding: 20px 0px 0px 20px;
  border-top: 0px;
  border-bottom: 1px solid #c6c7cc;
  border-right: 0px;
  border-left: 0px;

  :focus {
    outline: none;
  }
`;

const QnAWriteBtn = styled.button`
  width: 90px;
  height: 30px;
  text-align: center;
  border-radius: 19px;
  background-color: #0933b3;
  border: none;
  color: #ffffff;
  cursor: pointer;
`;

// SucContainer
const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 384px;
  height: 706px;
  border-radius: 5px;
  border: solid 0.5px #e1e2e4;
`;

const SubContainerInnerBox = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`;

const SubContainerBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 44px;
`;

const SubContainerBtn = styled.button`
  width: 300px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  border-radius: 24px;
  font-size: 16px;
  font-family: NotoSansCJKkr;
  cursor: pointer;
`;

const PortfolioImgBox = styled.img`
  width: 392px;
  height: 286px;
`;

const ActivePossibleBox = styled.div`
  width: 90px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: solid 1px #0933b3;
`;

const CountBox = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 170px;
  height: 20px;
`;

const CountBoxImg = styled.img`
  width: 25px;
  height: 25px;
  object-fit: scale-down;
`;
