import React from "react";
import styled, { css } from "styled-components";
import Router from "next/router";
import Slider from "react-slick";
import { inject, observer } from "mobx-react";

import * as Title from "components/Title";
import * as Content from "components/Content";

import Container from "components/Containerv1";
import Background from "components/Background";
import ProposalCard from "containers/Manufacture/Producer/Home/PartnerCard";

import ButtonSpinnerComponent from "components/ButtonSpinner";

import { toJS } from "mobx";

import Modal from "../RequestModal";
import MobileWarningModalContainer from "components/MobileWarningModal";

const pass1 = "static/images/pass1.png";
const pass2 = "static/images/pass2.png";
const pass4 = "static/images/pass4.png";

const left = "static/icon/left-arrow.png";
const right = "static/icon/right-arrow.png";
const filter_img = "static/images/manufacturer/filter.png";

@inject("Project", "Auth", "Partner", "Producer", "Home")
@observer
class MobileManufacturerContentContainer extends React.Component {
  state = {
    dropDownActive: false,
    dropDownIdx: -1,
    filter_active: false,
  };

  // filterActiveHandler = () => {
  //   if (this.state.filter_active) {
  //     this.setState({ filter_active: false });
  //     this.props.Partner.check_click_filter = false;
  //   } else {
  //     this.setState({ filter_active: true });
  //     this.props.Partner.check_click_filter = true;
  //   }
  // };

  async componentDidMount() {
    const { Partner } = this.props;

    console.log(typeof processArray);
    Partner.currentPage = 1;

    Partner.resetDevCategory();
    Partner.getPartner();

    if (Partner.filter_category_ary.length === 1) {
      Partner.getCategory();
    }
    if (Partner.filter_city_ary.length === 1) {
      await Partner.getCity();
    }

    console.log(toJS(Partner.filter_city_ary));
  }

  componentWillUnmount() {
    const { Partner } = this.props;

    Partner.requestModalActive = false;
    Partner.requestDoneModalActive = false;

    Partner.resetDevCategory();
    Partner.filter_category_ary = [{ id: 0, category: "전체" }];
  }

  render() {
    const { Project, Partner, width, Producer, Home } = this.props;
    const current_set = parseInt((Partner.currentPage - 1) / 5) + 1;
    const gray = "#f9f9f9";
    const usertype = "partner";

    return (
      <>
        {Home.mobile_warning_modal_state ? <MobileWarningModalContainer /> : "none"}

        <Background id="MyBackground">
          <Container style={{ display: "block" }}>
            <Body active={this.props.Partner.check_click_filter}>
              {Partner.detailLoadingFlag && (
                <>
                  <LoadingComponent scale="30%" primary />
                  <LoadingLayer />
                </>
              )}

              <Main>
                <div>
                  <Header
                    style={{
                      justifyContent: "space-between",
                    }}
                    active={Partner.subButtonActive}
                  >
                    {/* <Font15>
                      <span>{Partner.partner_count}개</span>의 파트너
                    </Font15> */}
                    <div>
                      <button
                        onClick={() => {
                          Router.push("/request");
                        }}
                      >
                        <span>바로 AI 견적 받기</span>
                      </button>

                      {/* <content>
                        <span>도면이 있는 경우 클릭!</span>
                      </content> */}
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          Partner.mobileRequestIndex = 1;
                        }}
                      >
                        <span>업체수배&견적 무료의뢰 </span>
                      </button>
                    </div>
                  </Header>
                  <Description active={Partner.subButtonActive}>
                    <div>
                      <span>도면이 있는 경우 클릭!</span>
                    </div>
                    <div>
                      <span>업체 찾기가 힘든 경우 클릭!</span>
                    </div>
                  </Description>
                </div>
                <Font15>
                  <span>{Partner.partner_count}개</span>의 파트너
                </Font15>
                {Partner.partner_list &&
                  Partner.partner_list.map((item, idx) => {
                    return (
                      <Background style={{ marginBottom: "5px" }}>
                        <div onClick={() => Partner.pushToDetail(item, idx)} style={{ width: "100%" }}>
                          <ProposalCard
                            data={item}
                            width={this.props.width}
                            idx={idx}
                            categoryData={toJS(Partner.category_dic[idx])}
                            dropDown={this.state.dropDownActive}
                            dropDownIdx={this.state.dropDownIdx}
                            handleIntersection={Producer.handleIntersection}
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
const customStyles = {
  dropdownIndicator: () => ({
    backgroundColor: "#fff",
    color: "#999999",
    width: 20,
    height: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    fontSize: 12,
  }),
  control: () => ({
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: 34,
    letterSpacing: "-0.45px",
    color: "#c1bfbf",
    display: "flex",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

const processArray = [
  { label: "상담미진행", value: "상담미진행" },
  { label: "상담진행", value: "상담진행" },
];

const tempArray = [
  { label: "상담미진행", value: "상담미진행" },
  { label: "상담진행", value: "상담진행" },
];

const region_data = [
  {
    id: 0,
    name: "전체",
    checked: "false",
  },
  {
    id: 1,
    name: "인천 남동|시화|반월공단",
    checked: "false",
  },
  {
    id: 2,
    name: "인천 서구",
    checked: "false",
  },
  {
    id: 3,
    name: "경기도 화성",
    checked: "false",
  },
  {
    id: 4,
    name: "경기도 부천",
    checked: "false",
  },
  {
    id: 5,
    name: "경기도 파주|양주|고양",
    checked: "false",
  },
  {
    id: 6,
    name: "서울 문래동",
    checked: "false",
  },
  {
    id: 7,
    name: "서울 성수동",
    checked: "false",
  },
  {
    id: 8,
    name: "서울 을지로",
    checked: "false",
  },
];

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
  //border-top: 1px solid #e1e2e4;
  //border-bottom: 1px solid #e1e2e4;
  // margin-top: ${(props) => (props.active ? "0px" : "40px")};
  margin-top: ${(props) => (props.active ? "285px" : "20px")};
`;
const Main = styled.div`
  width: 100%;
  > div:nth-of-type(1) {
    // margin-bottom: 25px;
  }
`;

const FilterSearch = styled.div`
  height: 134px;
  border: 1px solid red;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  //justify-content: center;
  align-items: center;
  // margin-bottom: 28px;
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
    // margin-bottom:30px;
    >div{
      width: 48%;
      
      >button:nth-of-type(1){
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
        >span{
          color: #0a2165;
          font-weight: 500;
        }
      }
      >div:nth-of-type(2) {
        
        display: ${(props) => (props.active ? "static" : "none")};
          position: absolute;
          bottom: -25px;
          right: 21px;
          >span{
            font-size: 11px;
            line-height: 30px;
            letter-spacing: -0.14px;
            color: #86888c;
            font-weight: normal;
          }
        }
        >content{
          position: absolute;
            bottom: -25px;
            left: 33px;
            >span{
              font-size: 11px;
              line-height: 30px;
              letter-spacing: -0.14px;
              color: #86888c;
              font-weight: normal;
            }
          }
      
      }
    }
    
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    paddingtop: 32px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    paddingtop: 32px;
  }
  @media (min-width: 1300px) {
    paddingtop: 32px;
  }
`;

const Font15 = styled(Title.FontSize15)`
  font-weight: 500 !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 40px !important;
  letter-spacing: -0.5px !important;
  color: #282c36;
  @media (min-width: 0px) and (max-width: 767.98px) {
    // margin-right: 66%;
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

const Filter = styled.div`
  //border: 2px solid red;
  margin-top: 2px;
  > img {
    width: 36px;
    height: 36px;
  }
`;

const FilterContainer = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  flex-wrap: wrap;
  padding: 0 24px;
  box-sizing: border-box;
  margin-top: 14px;
  box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.2);
`;
const FilterContent = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  text-align: center;
  margin-bottom: 14px;
  > div {
    width: 13px;
    height: 13px;
    border: ${(props) => (props.active ? "1px solid #0933b3" : "1px solid #999999")};
    border-radius: 12px;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    > div {
      display: ${(props) => (props.active ? "block" : "none")};
      width: 7px;
      height: 7px;
      //border: 1px solid #0933b3;
      border-radius: 6px;
      background-color: #0933b3;
      // position: absolute;
      // top: 50%;
      // left: 50%;
    }
  }
  > span {
    margin-left: 11px;
    font-size: 14px;
    line-height: 15px;
    letter-spacing: -0.35px;
    color: #999999;
  }
`;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  // opacity: 0.1;
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

export default MobileManufacturerContentContainer;
