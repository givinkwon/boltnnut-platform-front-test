import React from "react";
import styled, { css } from "styled-components";
import Router from "next/router";
import { inject, observer } from "mobx-react";
import * as PartnerAPI from "axios/Manufacture/Partner";

import * as Title from "components/Title";
import * as Content from "components/Content";

import Container from "components/Containerv1";
import Background from "components/Background";
import PartnerCard from "./PartnerCard";
import { PRIMARY, WHITE, DARKGRAY } from "static/style";

import { toJS } from "mobx";
import ButtonSpinnerComponent from "components/ButtonSpinner";
import Cookies from "js-cookie";
import SearchBar from "./SearchBar";
import SearchFilterBox from "./SearchFilterBox";
import { flexbox } from "@material-ui/system";
import { CenturyView } from "react-calendar";

const pass1 = "static/images/pass1.svg";
const pass2 = "static/images/pass2.svg";
const pass4 = "static/images/pass4.png";
const nosearch = "static/icon/nosearch.svg";
const rightarrow = "static/icon/right_arrow.svg";
const close = "static/icon/close_btn.svg";

const left = "static/icon/left-arrow.png";
const right = "static/icon/right-arrow.png";
const toparrowblue = "static/icon/top_arrow_blue.svg";

@inject("Project", "Auth", "Partner", "Search", "Common", "Cookie", "Request")
@observer
class ManufacturerContentContainer extends React.Component {
  state = {
    dropDownActive: false,
    recent_partner_dic: [],
    recent_partner: [],
    recent_partner_namearr: [],
    fileArray: [],
    fileName: "",
    file: "",
    checkFileUpload: false,
    result_banner: false,
  };

  scrollEventHandler = () => {
    const { Partner } = this.props;

    if (window.pageYOffset > 150) {
      Partner.scrollActive = true;
    } else {
      Partner.scrollActive = false;
    }
  };

  async componentDidMount() {
    const { Partner, Cookie } = this.props;

    window.addEventListener("scroll", this.scrollEventHandler);

    Partner.detailLoadingFlag = false;
    Partner.currentPage = 1;

    if (Partner.filter_category_ary.length === 1) {
      Partner.getCategory();
    }
    if (Partner.filter_city_ary.length === 1) {
      Partner.getCity();
    }

    Partner.partner_list.map((item, idx) => {
      Partner.getTotalBookmarkByPartner(item.id);
      Partner.getReviewByPartner;
    });

    var recent_partner_dic = [];
    var recent_partner = [];
    var recent_partner_namearr = [];

    await Cookie.partner_view_list.map((item, idx) => {
      PartnerAPI.detail(item)
        .then((res) => {
          this.setState({ recent_partner: res.data });

          recent_partner_dic[res.data.name] =
            res.data.portfolio_set[0].img_portfolio;
          recent_partner.push(res.data);
          recent_partner_namearr.push(res.data.name);

          this.setState({
            recent_partner_dic: recent_partner_dic,
            recent_partner_name: res.data.name,
            recent_partner: recent_partner,
            recent_partner_namearr: recent_partner_namearr,
          });
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
    });
  }

  componentWillUnmount() {
    const { Partner } = this.props;
    Partner.requestModalActive = false;
    Partner.requestDoneModalActive = false;
    Partner.resetDevCategory();
    Partner.filter_category_ary = [{ id: 0, category: "전체" }];
    Partner.filter_city_ary = [{ id: 0, city: "전체" }];
  }

  filedownload = (urls) => {
    if (this.props.Auth && this.props.Auth.logged_in_user) {
      if (!urls) {
        alert("준비중입니다.");
      }
      const url = urls;
      const link = document.createElement("a");
      link.href = url;
      link.click();
    } else {
      alert("로그인이 필요합니다.");
      Router.push("/login");
    }
  };

  TopScroll = () => {
    window.scrollTo(0, 0);
  };

  ToRequest = () => {
    const { Request } = this.props;
    Router.push("/request");
    Request.set_request_type(1);
    Request.requestTabIdx = 1;
  };

  resultBannerHandler = () => {
    const { Partner, Request } = this.props;

    // path 설정
    Request.path = 2;

    if (Partner.result_banner) {
      Partner.result_banner = false;
    }
  };

  render() {
    const { Project, Partner, Search, Auth, Cookie, Request } = this.props;
    const current_set = parseInt((Partner.currentPage - 1) / 10) + 1;

    return (
      <>
        <BackgroundContainer>
          <ScrollActiveBox scrollActive={Partner.scrollActive}>
            <ScrollActiveBoxInnerBox scrollActive={Partner.scrollActive}>
              <SearchBar />
            </ScrollActiveBoxInnerBox>
          </ScrollActiveBox>

          <SearchFilterBox />

          {Partner.result_banner && (
            <RequestMiddle>
              <ResultBannerContainer>
                <ResultBannerInnerBox>
                  <Font22 style={{ color: "#000000" }}>
                    마음에 드는 공장을 찾기 힘드시나요?
                  </Font22>

                  <Font16>
                    볼트앤너트 전문가를 배정하여 유선으로 상담을
                    도와드립니다.
                  </Font16>
                </ResultBannerInnerBox>

                <RequestBtn onClick={() => this.ToRequest()}>
                  무료 전문가 상담
                </RequestBtn>

                <ResultBannerCloseImg
                  src="static/images/close_banner.svg"
                  onClick={() => this.resultBannerHandler()}
                />
              </ResultBannerContainer>
            </RequestMiddle>
          )}

          <div>
            <Body>
              {Partner.detailLoadingFlag && (
                <>
                  <LoadingComponent scale="30%" primary />
                  <Layer />
                </>
              )}

              <Header>
                <Font20>
                  <span style={{ fontWeight: "bold" }}>
                    {Partner.partner_count}개
                  </span>
                  의 제조사가 있습니다.
                </Font20>
              </Header>

              <Main>
                <MainBody>
                  {Partner.partner_list &&
                    Partner.partner_list.length === 0 &&
                    (Partner.loadingFlag ? (
                      <ButtonSpinnerComponent scale="30%" primary />
                    ) : (
                      <NoResultBox>
                        <img src={nosearch} />
                        <NoSearch>
                          <span style={{ fontWeight: "bold" }}>
                            '{Partner.search_text}'
                          </span>
                          에 대한 검색 결과가 없습니다.
                        </NoSearch>
                        <Explain>
                          <Question>
                            유사한 연관 검색어를 찾아보시겠어요?
                          </Question>
                          <ExplainList></ExplainList>
                        </Explain>
                      </NoResultBox>
                    ))}

                  <Border />
                  {Partner.partner_list &&
                    Partner.partner_list.map((item, idx) => {
                      return (
                        <Background>
                          <div
                            onClick={async () => {
                              if (Auth.logged_in_client) {
                                await Project.getProject(
                                  "allproject",
                                  Auth.logged_in_client.id
                                );
                              }
                              Partner.pushToDetail(item, idx);
                            }}
                            style={{ width: "996px" }}
                          >
                            <PartnerCard
                              data={item}
                              width={this.props.width}
                              categoryData={toJS(Partner.category_dic[idx])}
                              idx={idx}
                              handleIntersection={Search.handleIntersection}
                              customer="partner"
                            />
                          </div>
                        </Background>
                      );
                    })}
                </MainBody>

                <Aside>
                  <RecentPartner>
                    <header>
                      <div style={{ marginLeft: 10 }}>최근 본 제조사</div>
                      <div style={{ marginRight: 10 }}>
                        {this.state.recent_partner_dic ? (
                          Object.keys(this.state.recent_partner_dic).length
                        ) : (
                          <></>
                        )}
                      </div>
                    </header>
                    <body>
                      <div style={{ height: "100%" }}>
                        {this.state.recent_partner.length > 0 ? (
                          Object.keys(this.state.recent_partner_dic).map(
                            (name) => (
                              <RecentPartnerContent>
                                <div
                                  style={{
                                    width: 150,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: 10,
                                  }}
                                >
                                  <div>{name}</div>
                                  <img
                                    src={close}
                                    style={{
                                      width: 12,
                                      height: 12,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      if (this.state.recent_partner_dic) {
                                        Cookie.delete_partner_view(
                                          Cookie.partner_view_list[
                                            this.state.recent_partner_namearr.indexOf(
                                              name
                                            )
                                          ]
                                        );
                                      }
                                      const expires = new Date();
                                      expires.setMinutes(
                                        expires.getMinutes() + 2440
                                      );

                                      const a = this.state.recent_partner_dic;
                                      const b = this.state.recent_partner;
                                      delete a[name];
                                      b.splice(
                                        this.state.recent_partner_namearr.indexOf(
                                          name
                                        ),
                                        1
                                      );

                                      this.setState({
                                        recent_partner_dic: a,
                                        recent_partner: b,
                                      });

                                      Cookies.set(
                                        "partner_view",
                                        Cookie.partner_view_list,
                                        {
                                          path: "/",
                                          expires,
                                        }
                                      );
                                    }}
                                  />
                                </div>
                                <img
                                  src={this.state.recent_partner_dic[name]}
                                  onClick={async () => {
                                    if (Auth.logged_in_client) {
                                      await Project.getProject(
                                        "allproject",
                                        Auth.logged_in_client.id
                                      );
                                    }
                                    Partner.pushToDetail(
                                      this.state.recent_partner[
                                        this.state.recent_partner_namearr.indexOf(
                                          name
                                        )
                                      ]
                                    );
                                  }}
                                  style={{ cursor: "pointer" }}
                                />
                                <div
                                  style={{
                                    margin: "5px, 0px, 5px, 0px",
                                    border: "1px solid #e1e2e4",
                                  }}
                                />
                              </RecentPartnerContent>
                            )
                          )
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              height: "100%",
                            }}
                          >
                            최근에 본 제조사가
                            <br />
                            없습니다.
                          </div>
                        )}
                      </div>
                    </body>
                  </RecentPartner>
                  <MyInfo>
                    <header>
                      <img
                        src="/static/icon/login_img.svg"
                        onClick={() => Router.push("/bookmark")}
                        style={{ cursor: "pointer" }}
                      />
                      {Auth.logged_in_user ? (
                        <div>{Auth.logged_in_user.username.split("@")[0]}</div>
                      ) : (
                        <div>로그인 해주세요.</div>
                      )}
                    </header>
                    <body>
                      <RequestandRegister style={{ marginTop: 5 }}>
                        <Text>프로젝트 의뢰</Text>
                        <Conter>0</Conter>
                      </RequestandRegister>
                      <RequestandRegister>
                        <Text>관심 업체 등록</Text>
                        <Conter>{Partner.totalClientBookmark}</Conter>
                      </RequestandRegister>
                    </body>
                  </MyInfo>
                </Aside>
              </Main>
            </Body>

            <AiButton
              onClick={() => {
                Router.push("/autoestimate");
              }}
            >
              <AiFontBox style={{ width: 114, height: 40 }}>
                <Font14>
                  AI 견적으로
                  <br />
                  바로 발주하기
                </Font14>

                <img
                  src="static/images/search/aiicon.svg"
                  style={{ margin: "12px 0px 12px 0px" }}
                />

                <Font13 align="justify">
                  AI견적 시스템으로
                  <br />
                  1초만에 견적 받고
                  <br />
                  바로 납품 받자!
                </Font13>
              </AiFontBox>
            </AiButton>

            <TopButton onClick={this.TopScroll} style={{ cursor: "pointer" }}>
              <img src={toparrowblue}></img>
              <div style={{ marginTop: 5 }}>Top</div>
            </TopButton>
          </div>
        </BackgroundContainer>

        {/* 제조사 상세 페이지 - Q/A 기능 체크 용 함수 (파트너로 로그인해서 기능 확인) */}
        {/* <div onClick={() => Partner.getPartnerTemp()}>진수정밀</div> */}

        <PageBar>
          <img
            src={pass1}
            style={{
              opacity: current_set == 1 && Partner.currentPage <= 1 ? 0.4 : 1,
              cursor: "pointer",
            }}
            onClick={Partner.pagePrev}
          />
          <PageCount
            onClick={Partner.movePage}
            value={10 * (current_set - 1)}
            active={Partner.currentPage % 10 == 1}
            style={{
              display:
                Partner.partner_page < 10 * (current_set - 1) + 1
                  ? "none"
                  : "block",
            }}
          >
            {" "}
            {10 * (current_set - 1) + 1}{" "}
          </PageCount>
          <PageCount
            value={10 * (current_set - 1) + 1}
            active={Partner.currentPage % 10 == 2}
            style={{
              display:
                Partner.partner_page < 10 * (current_set - 1) + 2
                  ? "none"
                  : "block",
            }}
            onClick={Partner.movePage}
          >
            {" "}
            {10 * (current_set - 1) + 2}{" "}
          </PageCount>
          <PageCount
            value={10 * (current_set - 1) + 2}
            active={Partner.currentPage % 10 == 3}
            style={{
              display:
                Partner.partner_page < 10 * (current_set - 1) + 3
                  ? "none"
                  : "block",
            }}
            onClick={Partner.movePage}
          >
            {" "}
            {10 * (current_set - 1) + 3}{" "}
          </PageCount>
          <PageCount
            value={10 * (current_set - 1) + 3}
            active={Partner.currentPage % 10 == 4}
            style={{
              display:
                Partner.partner_page < 10 * (current_set - 1) + 4
                  ? "none"
                  : "block",
            }}
            onClick={Partner.movePage}
          >
            {" "}
            {10 * (current_set - 1) + 4}{" "}
          </PageCount>
          <PageCount
            value={10 * (current_set - 1) + 4}
            active={Partner.currentPage % 10 == 5}
            style={{
              display:
                Partner.partner_page < 10 * (current_set - 1) + 5
                  ? "none"
                  : "block",
            }}
            onClick={Partner.movePage}
          >
            {" "}
            {10 * (current_set - 1) + 5}{" "}
          </PageCount>
          <PageCount
            value={10 * (current_set - 1) + 5}
            active={Partner.currentPage % 10 == 6}
            style={{
              display:
                Partner.partner_page < 10 * (current_set - 1) + 6
                  ? "none"
                  : "block",
            }}
            onClick={Partner.movePage}
          >
            {" "}
            {10 * (current_set - 1) + 6}{" "}
          </PageCount>
          <PageCount
            value={10 * (current_set - 1) + 6}
            active={Partner.currentPage % 10 == 7}
            style={{
              display:
                Partner.partner_page < 10 * (current_set - 1) + 7
                  ? "none"
                  : "block",
            }}
            onClick={Partner.movePage}
          >
            {" "}
            {10 * (current_set - 1) + 7}{" "}
          </PageCount>
          <PageCount
            value={10 * (current_set - 1) + 7}
            active={Partner.currentPage % 10 == 8}
            style={{
              display:
                Partner.partner_page < 10 * (current_set - 1) + 8
                  ? "none"
                  : "block",
            }}
            onClick={Partner.movePage}
          >
            {" "}
            {10 * (current_set - 1) + 8}{" "}
          </PageCount>
          <PageCount
            value={10 * (current_set - 1) + 8}
            active={Partner.currentPage % 10 == 9}
            style={{
              display:
                Partner.partner_page < 10 * (current_set - 1) + 9
                  ? "none"
                  : "block",
            }}
            onClick={Partner.movePage}
          >
            {" "}
            {10 * (current_set - 1) + 9}{" "}
          </PageCount>
          <PageCount
            value={10 * (current_set - 1) + 9}
            active={Partner.currentPage % 10 == 0}
            style={{
              display:
                Partner.partner_page < 10 * (current_set - 1) + 10
                  ? "none"
                  : "block",
            }}
            onClick={Partner.movePage}
          >
            {" "}
            {10 * (current_set - 1) + 10}{" "}
          </PageCount>
          <img
            src={pass2}
            style={{
              opacity: Partner.partner_page == Partner.currentPage ? 0.4 : 1,
              cursor: "pointer",
            }}
            onClick={Partner.pageNext}
          />
        </PageBar>
      </>
    );
  }
}

const RequestButton = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #0933b3;
  border-radius: 5px;
  background-color: #ffffff;
  color: #0933b3;
  width: 200px;
  height: 50px;
  cursor: pointer;
  > span {
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.45px;
  }
`;
const NoResultBox = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NoSearch = styled.div`
  line-height: 1.54;
  letter-spacing: -0.65px;
  text-align: left;
  color: #0933b3;
  font-size: 26px;
  margin-top: 12px;
  margin-bottom: 60px;
`;

const Explain = styled.div`
  font-family: NotoSansCJKkr;
`;

const ExplainList = styled.div`
  margin-top: 26px;
  margin-bottom: 18px;
  font-size: 16px;
  line-height: 2.5;
  letter-spacing: -0.4px;
  color: #1e2222;
`;

const Question = styled.div`
  line-height: 2;
  letter-spacing: -0.5px;
  font-size: 20px;
`;

const PageBar = styled.div`
  width: 500px;
  margin-top: 109px;
  margin-bottom: 157px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    margin-bottom: 5px;
  }
`;

const PageCount = styled.span`
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.5;
  letter-spacing: -0.4px;
  text-align: left;
  color: #999999;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      font-weight: normal;
      color: #0933b3;
    `}
`;
const Body = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const MainBody = styled.div`
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 700px;
  }

  @media (min-width: 992px) and (max-width: 1149.98px) {
    width: 800px;
  }

  @media (min-width: 1150px) and (max-width: 1299.98px) {
    width: 900px;
  }

  @media (min-width: 1300px) {
    width: 1200px;
  }
`;

const Aside = styled.div`
  width: 240px;
`;

const RecentPartner = styled.div`
  height: 770px;
  width: 180px;
  border-radius: 10px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.08);
  border: solid 1px #f6f6f6;
  background-color: #ffffff;
  margin-left: 30px;
  header {
    font-size: 14px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #e1e2e4;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  body {
    height: 730px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 180px;
    font-size: 14px;
    display: flex;
    font-size: 14px;
    line-height: 1.71;
    letter-spacing: -0.35px;
    text-align: center;
    color: #999999;
    position: relative;
  }
`;

const RecentPartnerContent = styled.div`
  width: 156px;
  height: 160px;

  div {
    font-size: 14px;
    color: #1e2222;
  }

  img {
    width: 156px;
    height: 120px;
    border-radius: 10px;
    object-fit: scale-down;
  }
`;

const MyInfo = styled.div`
  width: 180px;
  margin-left: 30px;
  margin-top: 19px;
  header {
    padding-right: 5px;
    padding-left: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999999;
    line-height: 5.5;
    letter-spacing: -0.35px;
    border-bottom: solid 2px #e1e2e4;
    font-size: 14px;
  }
`;

const RequestandRegister = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  font-size: 15px;
`;

const Text = styled.div`
  color: #1e2222;
  font-size: 15px;
`;

const Conter = styled.div`
  color: #0933b3;
  font-size: 15px;
`;

const Header = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
  margin-bottom: 5px;
`;

const Border = styled.div`
  width: 100%;
  margin: auto;
  border: solid 1px #e1e2e4;
`;

const Font20 = styled(Title.FontSize20)`
  font-weight: normal !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 40px !important;
  letter-spacing: -0.5px !important;
  color: #282c36;
`;

const Font22 = styled(Content.FontSize22)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  color: #555963;
`;

const Font16 = styled(Content.FontSize16)`
  color: #000000;
  font-weight: normal;
  margin-top: 15px;
`;

const LoadingComponent = styled(ButtonSpinnerComponent)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
`;

const RequestMiddle = styled.div`
  position: sticky;
  top: 135px;
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 113px;
  margin-top: 30px;
  margin-bottom: 40px;
  background-image: url("static/images/search_result_background.svg");
  background-position: center;

  div {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.4px;
    color: #555963;
  }
`;

const RequestBtn = styled.button`
  width: 160px;
  height: 42px;
  margin-top: 16px;
  padding-top: 1px;
  border-radius: 29px;
  border: solid 2px #0933b3;
  background-color: #0933b3;
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;
  font-family: NotoSansCJKkr;
`;

const TopButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 56px;
  height: 56px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  border-radius: 100%;
  top: 78%;
  left: 94.2%;
  position: fixed;
  /* z-index: 2; */
  div {
    object-fit: contain;
    font-family: NotoSansCJKkr;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.35px;
    color: #0933b3;
  }
`;

const ResultBannerContainer = styled.div`
  position: relative;
  width: 900px;
  display: flex;
  justify-content: center;
  gap: 200px;
`;

const ResultBannerInnerBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultBannerCloseImg = styled.img`
  position: absolute;
  left: 110%;
  bottom: 100%;
  cursor: pointer;
`;

const ScrollActiveBox = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => (props.scrollActive ? "100%" : "none")};
  height: ${(props) => (props.scrollActive ? "70px" : "none")};
  position: ${(props) => (props.scrollActive ? "sticky" : "none")};
  top: 65px;
  z-index: ${(props) => (props.scrollActive ? "100" : "none")};
  background-image: url("static/images/search/wbackground.svg");
  background-position: center;
`;

const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollActiveBoxInnerBox = styled.div`
  position: ${(props) => (props.scrollActive ? "absolute" : "none")};
  left: ${(props) => (props.scrollActive ? "18.5%" : "none")};
`;

const AiButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 134px;
  height: 184px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  border-radius: 3px;
  background-color: #f6f6f6;
  cursor: pointer;

  top: 30%;
  left: 90%;
  position: fixed;
  z-index: 2;
`;

const AiFontBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Font14 = styled.p`
  font-family: NotoSansCJKkr;
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  text-align: center;
`;

const Font13 = styled.p`
  font-family: NotoSansCJKkr;
  font-size: 13px;
  font-weight: normal;
  color: #86888c;
  text-align: center;
`;

export default ManufacturerContentContainer;
