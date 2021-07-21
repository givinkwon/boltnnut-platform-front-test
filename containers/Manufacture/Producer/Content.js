import React from "react";
import styled, { css } from "styled-components";
import Router from "next/router";
import Slider from "react-slick";
import { inject, observer } from "mobx-react";

import * as Title from "components/Title";
import * as Content from "components/Content";

import Container from "components/Containerv1";
import Background from "components/Background";
import ProposalCard from "./ProposalCard";

import RadioBox from "./RadioBox";
import { toJS } from "mobx";
import SearchBar from "./SearchBar";
import ButtonSpinnerComponent from "components/ButtonSpinner";
const pass1 = "static/images/pass1.png";
const pass2 = "static/images/pass2.svg";
const pass4 = "static/images/pass4.png";

const left = "static/icon/left-arrow.png";
const right = "static/icon/right-arrow.png";

@inject("Project", "Auth", "Partner", "Producer", "Common")
@observer
class ManufacturerContentContainer extends React.Component {
  state = {
    dropDownActive: false,
  };

  async componentDidMount() {
    const { Partner } = this.props;
    Partner.detailLoadingFlag = false;

    Partner.currentPage = 1;

    await Partner.getPartner(1, Partner.click_count);

    if (Partner.filter_category_ary.length === 1) {
      Partner.getCategory();
    }
    if (Partner.filter_city_ary.length === 1) {
      Partner.getCity();
    }
    await this.props.Auth.checkLogin();
    console.log(this.props.Auth.logged_in_user);
  }

  componentWillUnmount() {
    const { Partner } = this.props;
    console.log("content unmount");
    Partner.requestModalActive = false;
    Partner.requestDoneModalActive = false;
    // Partner.search_text = "";
    Partner.resetDevCategory();
    Partner.filter_category_ary = [{ id: 0, category: "전체" }];
    Partner.filter_city_ary = [{ id: 0, city: "전체" }];
  }

  filedownload = (urls) => {
    const { data } = this.props;

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
      // this.props.Auth.previous_url = "producer";
      Router.push("/login");
    }
  };

  render() {
    const { Project, Partner, Producer, Auth } = this.props;
    const current_set = parseInt((Partner.currentPage - 1) / 10) + 1;
    const gray = "#f9f9f9";
    const usertype = "partner";
    console.log(toJS(Partner.partner_list));

    return (
      <>
        <Background id="MyBackground">
          <Container>
            <Body>
              {Partner.detailLoadingFlag && (
                <>
                  <LoadingComponent scale="30%" primary />
                  <Layer />
                </>
              )}
              <Header>
                <Font20 style={{ marginLeft: "20px" }}>
                  <span style={{ fontWeight: "bold" }}>
                    {Partner.partner_count}개
                  </span>
                  의 제조사가 있습니다.
                </Font20>
                <Amount>
                  <SpecificAmount>
                    <img src="/static/icon/checkbox_off.svg"></img>
                    <div>소량</div>
                  </SpecificAmount>
                  <SpecificAmount>
                    <img src="/static/icon/checkbox_off.svg"></img>
                    <div>대량</div>
                  </SpecificAmount>
                </Amount>
              </Header>
              <Main>
                <MainBody>
                  {Partner.partner_list &&
                    Partner.partner_list.length === 0 &&
                    (Partner.loadingFlag ? (
                      <ButtonSpinnerComponent scale="30%" primary />
                    ) : (
                      <NoResultBox>
                        <Font20>원하는 업체를 찾기 어려우신가요?</Font20>
                        <Font14 style={{ color: "black", fontWeight: "300" }}>
                          볼트앤너트 업체 수배 전문가가 숨어있는 공장까지 대신
                          찾아드립니다.
                        </Font14>
                        <RequestButton
                          onClick={() => {
                            Partner.openModal();
                          }}
                        >
                          <span>업체 수배 & 견적 의뢰</span>
                        </RequestButton>
                      </NoResultBox>
                    ))}

                  {Partner.partner_list &&
                    Partner.partner_list.map((item, idx) => {
                      return (
                        <Background style={{ marginBottom: "5px" }}>
                          <div
                            onClick={() => Partner.pushToDetail(item, idx)}
                            style={{ width: "100%" }}
                          >
                            <ProposalCard
                              data={item}
                              width={this.props.width}
                              categoryData={toJS(Partner.category_dic[idx])}
                              idx={idx}
                              handleIntersection={Producer.handleIntersection}
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
                      <div style={{ marginRight: 10 }}>0</div>
                    </header>
                    <body>최근에 본 제조사가 없습니다.</body>
                  </RecentPartner>
                  <MyInfo>
                    <header>
                      <img src="/static/icon/login_img.svg"></img>

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
                        <Conter>0</Conter>
                      </RequestandRegister>
                    </body>
                  </MyInfo>
                </Aside>
              </Main>
            </Body>
          </Container>
        </Background>
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

const SubButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  border: ${(props) => (props.active ? " 2px solid blue" : " 2px solid black")};
  margin-bottom: 20px;

  :hover {
    background: lightblue;
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
  width: 100%;
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
const Aside = styled.div``;

const RecentPartner = styled.div`
  height: 784px;
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
    width: 180px;
    height: 52px;
    background-color: #e1e2e4;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  body {
    height: 744px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    font-size: 14px;
    display: flex;
    font-size: 14px;
    line-height: 1.71;
    letter-spacing: -0.35px;
    text-align: center;
    color: #999999;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-top: 32px;
  margin-bottom: 5px;
  > span {
    position: absolute;
    left: 88%;
    display: flex;
    align-items: center;
    > img {
      width: 14px;
      height: 7px;
      margin-left: 10px;
    }
  }
`;

const Font20 = styled(Title.FontSize20)`
  font-weight: normal !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 40px !important;
  letter-spacing: -0.5px !important;
  color: #282c36;
`;

const Amount = styled.div`
  width: 135px;
  display: flex;
  justify-content: space-between;
  margin-right: 230px;
`;

const SpecificAmount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    margin-left: 10px;
    font-size: 14px;
    color: #282c36;
    line-height: 2.43;
    letter-spacing: -0.35px;
  }
`;

const Font14 = styled(Content.FontSize14)`
  font-weight: bold !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 30px !important;
  letter-spacing: -0.14px !important;
  color: #0933b3;
`;

const LoadingComponent = styled(ButtonSpinnerComponent)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;
const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
`;

export default ManufacturerContentContainer;
