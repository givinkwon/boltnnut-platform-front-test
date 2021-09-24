import React from "react";
import styled, { css } from "styled-components";
import Router from "next/router";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import * as Title from "components/Title";
import * as Content from "components/Content";

import Container from "components/Containerv1";
import Background from "components/Background";
import ProposalCard from "./MobilePartnerCard";
import ButtonSpinnerComponent from "components/ButtonSpinner";
import MobileWarningModalContainer from "components/MobileWarningModal";

const pass1 = "static/images/pass1.png";
const pass2 = "static/images/pass2.png";

@inject("Project", "Auth", "Partner", "Search", "Home")
@observer
class MobileManufacturerContentContainer extends React.Component {
  state = {
    dropDownActive: false,
    dropDownIdx: -1,
    filter_active: false,
  };

  componentDidMount() {
    const { Partner } = this.props;

    Partner.currentPage = 1;
    Partner.resetDevCategory();
    Partner.getPartner();

    if (Partner.filter_category_ary.length === 1) {
      Partner.getCategory();
    }

    if (Partner.filter_city_ary.length === 1) {
      Partner.getCity();
    }
  }

  componentWillUnmount() {
    const { Partner } = this.props;

    Partner.requestModalActive = false;
    Partner.requestDoneModalActive = false;
    Partner.resetDevCategory();
    Partner.filter_category_ary = [{ id: 0, category: "전체" }];
  }

  render() {
    const { Partner, width, Search, Home } = this.props;
    const current_set = parseInt((Partner.currentPage - 1) / 5) + 1;

    return (
      <>
        {Home.mobile_warning_modal_state && <MobileWarningModalContainer />}
        <div style={{ display: "flex", justifyContent: "center", margin: "20px 0px 0px 10px" }}>
          <Container style={{ width: 375, justifyContent: "center" }}>
            <Body active={this.props.Partner.check_click_filter}>
              {Partner.detailLoadingFlag && (
                <>
                  <LoadingComponent scale="30%" primary />
                  <LoadingLayer />
                </>
              )}

              <Main>
                <div style={{ display: "inline-flex", marginLeft: 10 }}>
                  <Font15>
                    <span style={{ fontWeight: "bold" }}>{Partner.partner_count}개</span>의 제조사가 있습니다.
                  </Font15>

                  <img src="static/images/search/mobile/viewoneicon.svg" />
                </div>

                {Partner.partner_list &&
                  Partner.partner_list.map((item, idx) => {
                    return (
                      <Background style={{ marginBottom: 5, marginTop: 10 }}>
                        <div onClick={() => Partner.pushToDetail(item, idx)} style={{ width: "100%" }}>
                          <ProposalCard
                            data={item}
                            width={this.props.width}
                            idx={idx}
                            categoryData={toJS(Partner.category_dic[idx])}
                            dropDown={this.state.dropDownActive}
                            dropDownIdx={this.state.dropDownIdx}
                            handleIntersection={Search.handleIntersection}
                            customer="partner"
                          />
                        </div>
                      </Background>
                    );
                  })}
              </Main>
            </Body>
          </Container>
        </div>

        {Partner.requestModalActive && (
          <Layer>
            <span>
              <Modal width={width} open={Partner.requestModalActive} close={Partner.closeModal}></Modal>
            </span>
          </Layer>
        )}

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
            value={5 * (current_set - 1)}
            active={Partner.currentPage % 5 == 1}
            style={{
              display: Partner.partner_page < 5 * (current_set - 1) + 1 ? "none" : "block",
            }}
          >
            {" "}
            {5 * (current_set - 1) + 1}{" "}
          </PageCount>
          <PageCount
            value={5 * (current_set - 1) + 1}
            active={Partner.currentPage % 5 == 2}
            style={{
              display: Partner.partner_page < 5 * (current_set - 1) + 2 ? "none" : "block",
            }}
            onClick={Partner.movePage}
          >
            {" "}
            {5 * (current_set - 1) + 2}{" "}
          </PageCount>
          <PageCount
            value={5 * (current_set - 1) + 2}
            active={Partner.currentPage % 5 == 3}
            style={{
              display: Partner.partner_page < 5 * (current_set - 1) + 3 ? "none" : "block",
            }}
            onClick={Partner.movePage}
          >
            {" "}
            {5 * (current_set - 1) + 3}{" "}
          </PageCount>
          <PageCount
            value={5 * (current_set - 1) + 3}
            active={Partner.currentPage % 5 == 4}
            style={{
              display: Partner.partner_page < 5 * (current_set - 1) + 4 ? "none" : "block",
            }}
            onClick={Partner.movePage}
          >
            {" "}
            {5 * (current_set - 1) + 4}{" "}
          </PageCount>
          <PageCount
            value={5 * (current_set - 1) + 4}
            active={Partner.currentPage % 5 == 0}
            style={{
              display: Partner.partner_page < 5 * (current_set - 1) + 5 ? "none" : "block",
            }}
            onClick={Partner.movePage}
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
            onClick={Partner.pageNext}
          />
        </PageBar>
      </>
    );
  }
}

export default MobileManufacturerContentContainer;

const PageBar = styled.div`
  width: 80%;
  margin-top: 109px;
  margin-bottom: 157px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  display: flex;
  justify-content: space-between;

  @media (min-width: 0px) and (max-width: 767.98px) {
    > img {
      width: 10px;
      height: 19px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > img {
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > img {
    }
  }
  @media (min-width: 1300px) {
    > img {
    }
  }
`;

const PageCount = styled.span`
  width: 14px;
  height: 30px;

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
    font-size: 16px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 19px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 22px;
  }
  @media (min-width: 1300px) {
    font-size: 25px;
  }
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => (props.active ? "285px" : "20px")};
`;

const Main = styled.div`
  /* width: 100%; */
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;

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

  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      width: 48%;

      > button:nth-of-type(1) {
        border: none;
        background: none;
        box-shadow: 0 1px 3px 0 rgba(54, 56, 84, 0.3);
        padding: 8px 16px 9px 16px;
        box-sizing: border-box;
        font-size: 12px;
        width: 100%;
        height: 30px;
        // margin-bottom: 5px;
        display: ${(props) => (props.active ? "flex" : "none")};
        justify-content: center;
        align-items: center;
        cursor: pointer;

        > span {
          color: #0a2165;
          font-weight: 500;
        }
      }

      > div:nth-of-type(2) {
        display: ${(props) => (props.active ? "static" : "none")};
        position: absolute;
        bottom: -25px;
        right: 21px;
        > span {
          font-size: 11px;
          line-height: 30px;
          letter-spacing: -0.14px;
          color: #86888c;
          font-weight: normal;
        }
      }

      > content {
        position: absolute;
        bottom: -25px;
        left: 33px;
        > span {
          font-size: 11px;
          line-height: 30px;
          letter-spacing: -0.14px;
          color: #86888c;
          font-weight: normal;
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    padding-top: 32px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding-top: 32px;
  }
  @media (min-width: 1300px) {
    padding-top: 32px;
  }
`;

const Font15 = styled(Title.FontSize15)`
  font-family: NotoSansCJKkr;
  font-weight: normal;
  color: #1e2222;
  margin-right: 140px;
`;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const Description = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  justify-content: space-around;
  margin-bottom: 20px;
  > div {
    // position: absolute;
    // bottom: -25px;
    // left: 33px;
    > span {
      font-size: 11px;
      line-height: 30px;
      letter-spacing: -0.14px;
      color: #86888c;
      font-weight: normal;
    }
  }

  div:nth-of-type(1) {
    // margin-right: 10px;
  }
  div:nth-of-type(2) {
    // margin-left: 10px;
  }
`;

const LoadingComponent = styled(ButtonSpinnerComponent)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const LoadingLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.3);
`;
