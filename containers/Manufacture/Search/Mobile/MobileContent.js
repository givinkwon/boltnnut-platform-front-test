import React from "react";
import styled, { css } from "styled-components";
import Router from "next/router";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import * as Title from "components/Title";

import ProposalCard from "./MobilePartnerCard";
import ButtonSpinnerComponent from "components/ButtonSpinner";
import MobileWarningModalContainer from "components/MobileWarningModal";

const pass1 = "static/images/pass1.png";
const pass2 = "static/images/pass2.png";
const cardLine = "static/images/search/mobile/cardline.svg";

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
        <Container>
          <InnerBox>
            <Body active={this.props.Partner.check_click_filter}>
              {Partner.detailLoadingFlag && (
                <>
                  <LoadingComponent scale="30%" primary />
                  <LoadingLayer />
                </>
              )}

              <InnerBox style={{ flexDirection: "column", alignItems: "center" }}>
                <InnerBox style={{ justifyContent: "space-between", width: "90%" }}>
                  <Font15>
                    <span style={{ fontWeight: "bold" }}>{Partner.partner_count}개</span>의 제조사가 있습니다.
                  </Font15>

                  <img src="static/images/search/mobile/viewoneicon.svg" />
                </InnerBox>

                {Partner.partner_list &&
                  Partner.partner_list.map((item, idx) => {
                    return (
                      <div onClick={() => Partner.pushToDetail(item, idx)} style={{ width: "100%" }}>
                        <img src={cardLine} />

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
                    );
                  })}
              </InnerBox>
            </Body>
          </InnerBox>
        </Container>

        {Partner.requestModalActive && (
          <Layer>
            <span>
              <Modal width={width} open={Partner.requestModalActive} close={Partner.closeModal}></Modal>
            </span>
          </Layer>
        )}

        <img src={cardLine} />

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

const Font15 = styled(Title.FontSize15)`
  font-family: NotoSansCJKkr;
  font-weight: normal;
  color: #1e2222;
`;

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0px 0px 10px;
`;

const InnerBox = styled.div`
  display: flex;
  justify-content: center;
`;
