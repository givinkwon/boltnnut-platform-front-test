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
const pass2 = "static/images/pass2.png";
const pass4 = "static/images/pass4.png";

const left = "static/icon/left-arrow.png";
const right = "static/icon/right-arrow.png";

@inject("Project", "Auth", "Partner")
@observer
class ManufacturerContentContainer extends React.Component {
  state = {
    dropDownActive: false,
    dropDownIdx: -1,
  };

  openModal = () => {
    const { Partner } = this.props;
    Partner.requestModalActive = true;
  };

  handleIntersection = (event) => {
    if (event.isIntersecting) {
      console.log("추가 로딩을 시도합니다");
    }
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

  movePage = (e) => {
    const { Partner, Auth } = this.props;
    e.preventDefault();
    const newPage = e.target.innerText * 1;
    Partner.currentPage = newPage;
    Partner.resetDevCategory();
    Partner.check_loading_develop = false;
    Partner.ReviewActive = false;
    Partner.ReviewActiveIndex = -1;
    this.setState({ dropDownActive: false, dropDownIdx: -1 });
    Partner.click_count += 1;
    Partner.subButtonActive
      ? Partner.getOtherPartner(newPage)
      : Partner.getPartner(newPage, Partner.click_count);
  };

  pageNext = (e) => {
    const { Partner } = this.props;
    e.preventDefault();
    if (Partner.currentPage < Partner.partner_page) {
      const nextPage = Partner.currentPage + 1;
      Partner.currentPage = nextPage;
      Partner.check_loading_develop = false;
      Partner.resetDevCategory();
      Partner.ReviewActive = false;
      Partner.ReviewActiveIndex = -1;
      this.setState({ dropDownActive: false, dropDownIdx: -1 });
      Partner.click_count += 1;
      Partner.subButtonActive
        ? Partner.getOtherPartner(Partner.currentPage)
        : Partner.getPartner(Partner.currentPage, Partner.click_count);
    }
  };

  pagePrev = (e) => {
    const { Partner } = this.props;
    e.preventDefault();
    if (Partner.currentPage > 1) {
      const newPage = Partner.currentPage - 1;
      Partner.currentPage = newPage;
      Partner.resetDevCategory();
      Partner.check_loading_develop = false;
      Partner.ReviewActive = false;
      Partner.ReviewActiveIndex = -1;
      this.setState({ dropDownActive: false, dropDownIdx: -1 });
      Partner.click_count += 1;
      Partner.subButtonActive
        ? Partner.getOtherPartner(Partner.currentPage)
        : Partner.getPartner(Partner.currentPage, Partner.click_count);
    }
  };

  pushToDetail = async (item, idx) => {
    const { Partner } = this.props;
    console.log(Partner.modalActive);

    if (!Partner.requestModalActive && !Partner.modalActive) {
      console.log("Detail click");
      Partner.category_name_list = null;
      Partner.partner_detail_list = [];
      Partner.partner_detail_list.push({ item: item });
      Partner.category_name_list = Partner.category_dic[idx];

      if (this.state.dropDownIdx === -1) {
        await Partner.getCityName(Partner.partner_detail_list[0].item.city);
        Partner.portFolioList = [];
        await Partner.getPortfolio(Partner.partner_detail_list[0].item.id);
        this.setState({ dropDownActive: true, dropDownIdx: idx });
      } else {
        if (this.state.dropDownIdx === idx) {
          this.setState({ dropDownActive: false, dropDownIdx: -1 });
        } else {
          await Partner.getCityName(Partner.partner_detail_list[0].item.city);
          Partner.portFolioList = [];
          await Partner.getPortfolio(Partner.partner_detail_list[0].item.id);
          this.setState({ dropDownActive: true, dropDownIdx: idx });
        }
      }
    }
  };
  render() {
    const { Project, Partner } = this.props;
    const current_set = parseInt((Partner.currentPage - 1) / 5) + 1;
    const gray = "#f9f9f9";
    const usertype = "partner";

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

              {/* {Partner.partner_list.length > 0 && Partner.isSearched && (
                <SubButtonBox>
                  <SubButton
                    onClick={() => {
                      Partner.getOtherPartner();

                      Partner.subButtonActive = !Partner.subButtonActive;
                    }}
                    active={Partner.subButtonActive}
                  >
                    <Font20 style={{ textAlign: "center" }}>
                      기성품이 없는 신제품의 개발이 필요하신가요?
                      <br />
                      예, 신제품 개발 전문 업체로 추천해주세요
                    </Font20>
                  </SubButton>
                  <SubButton
                    onClick={() => {
                      Router.push("/request");
                    }}
                  >
                    <Font20 style={{ textAlign: "center" }}>
                      도면이 있으신가요?
                      <br />
                      예, 최저가 가공 및 금형가로 즉시 견적 안내 드립니다.
                    </Font20>
                  </SubButton>
                </SubButtonBox>
              )} */}

              <Main>
                <Header style={{ paddingTop: "32px" }}>
                  <Font20 style={{ marginLeft: "-9px" }}>
                    <span style={{ fontWeight: "bold" }}>
                      {Partner.partner_count}개
                    </span>
                    의 파트너가 있습니다.
                  </Font20>
                </Header>
                {/* {Partner.partner_list.length === 0 && (
                  <NoResultBox>
                    <Font20>원하는 업체를 찾기 어려우신가요?</Font20>
                    <Font14 style={{ color: "black", fontWeight: "300" }}>
                      볼트앤너트 업체 수배 전문가가 숨어있는 공장까지 대신
                      찾아드립니다.
                    </Font14>
                    <RequestButton
                      onClick={() => {
                        this.openModal();
                      }}
                    >
                      <span>업체 수배 & 견적 의뢰</span>
                    </RequestButton>
                  </NoResultBox>
                )} */}
                {Partner.partner_list.length === 0 &&
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
                          this.openModal();
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
                          onClick={() => this.pushToDetail(item, idx)}
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
                  })}
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
            onClick={this.pagePrev}
          />
          <PageCount
            onClick={this.movePage}
            value={5 * (current_set - 1)}
            active={Partner.currentPage % 5 == 1}
            style={{
              display:
                Partner.partner_page < 5 * (current_set - 1) + 1
                  ? "none"
                  : "block",
            }}
          >
            {" "}
            {5 * (current_set - 1) + 1}{" "}
          </PageCount>
          <PageCount
            value={5 * (current_set - 1) + 1}
            active={Partner.currentPage % 5 == 2}
            style={{
              display:
                Partner.partner_page < 5 * (current_set - 1) + 2
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
            active={Partner.currentPage % 5 == 3}
            style={{
              display:
                Partner.partner_page < 5 * (current_set - 1) + 3
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
            active={Partner.currentPage % 5 == 4}
            style={{
              display:
                Partner.partner_page < 5 * (current_set - 1) + 4
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
            active={Partner.currentPage % 5 == 0}
            style={{
              display:
                Partner.partner_page < 5 * (current_set - 1) + 5
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
              opacity: Partner.partner_page == Partner.currentPage ? 0.4 : 1,
              cursor: "pointer",
            }}
            onClick={this.pageNext}
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
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e1e2e4;
  border-bottom: 1px solid #e1e2e4;  
`;
const Main = styled.div`  
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

const Header = styled.div`
  width: 993px;
  display: flex;
  align-items: center;
  margin-bottom: 28px;
  position: relative;
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
  font-weight: 500 !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 40px !important;
  letter-spacing: -0.5px !important;
  color: #282c36;
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
