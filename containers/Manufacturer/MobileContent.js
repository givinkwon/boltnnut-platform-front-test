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

import Select from "./MobileSelect";
import RadioBox from "./RadioBox";
import { toJS } from "mobx";
import MobileSearchBar from "./MobileSearchBar";

const pass1 = "static/images/pass1.png";
const pass2 = "static/images/pass2.png";
const pass4 = "static/images/pass4.png";

const left = "static/icon/left-arrow.png";
const right = "static/icon/right-arrow.png";

@inject("Project", "Auth", "Partner")
@observer
class MobileManufacturerContentContainer extends React.Component {
  handleIntersection = (event) => {
    if (event.isIntersecting) {
      console.log("추가 로딩을 시도합니다");
    }
  };

  async componentDidMount() {
    const { Partner } = this.props;

    // Project.search_text = "";
    Partner.currentPage = 1;

    console.log("did mount");

    Partner.getPartner();

    // await Auth.checkLogin();
    // if(Auth.logged_in_partner){
    //   Project.getProjectByPrice()
    // }
  }

  movePage = (e) => {
    const { Partner, Auth } = this.props;
    e.preventDefault();
    // Project.category_reset()
    const newPage = e.target.innerText * 1;
    Partner.currentPage = newPage;
    // Project.getProjectByPrice(Project.search_text, newPage)
    Partner.getPartner(newPage);
  };

  pageNext = (e) => {
    const { Partner } = this.props;
    e.preventDefault();
    console.log(toJS(Partner.currentPage));
    console.log(toJS(Partner.partner_page));
    if (Partner.currentPage < Partner.partner_page) {
      // Project.category_reset()
      const nextPage = Partner.currentPage + 1;
      Partner.currentPage = nextPage;
      // Project.getProjectByPrice(Project.search_text, Project.currentPage)
      console.log(nextPage);
      Partner.getPartner(nextPage);
    }
  };

  pagePrev = (e) => {
    const { Partner } = this.props;
    e.preventDefault();
    if (Partner.currentPage > 1) {
      // Project.category_reset()
      const newPage = Partner.currentPage - 1;
      Partner.currentPage = newPage;
      Partner.getPartner(newPage);
      // Project.getProjectByPrice(Project.search_text, Project.currentPage)
    }
  };

  render() {
    const { Project, Partner, width } = this.props;
    const current_set = parseInt((Partner.currentPage - 1) / 5) + 1;
    const gray = "#f9f9f9";
    const usertype = "partner";

    return (
      <>
        <Background id="MyBackground">
          <Container style={{ display: "block" }}>
            {console.log(width)}
            {/* <MobileSearchBar /> */}
            <Body active={this.props.Partner.check_click_filter}>
              {/* <FilterSearch>dsfsdfds</FilterSearch> */}
              {/* <Filter style={{ paddingTop: "32px" }}>
                <Font20>필터</Font20>
                <RadioBox data={region_data} />
              </Filter> */}

              {/* <Background> */}
              {/* { Project.projectDataList.length > 0 && Project.projectDataList.slice(5*(Project.currentPage), 5*(Project.currentPage +1)).map((item, idx) => {                             */}
              <Main>
                <div>
                  <Header
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <Font15>
                      <span>{Partner.partner_count}개</span>의 제조사
                    </Font15>
                    {/* <span>
              <Font14>모든 제조의뢰</Font14>
              <img src={pass4}/>
            </span> */}
                    <div style={{ width: "100px" }}>
                      <input
                        style={{ display: "none" }}
                        value={
                          Request.select_big
                            ? Request.select_big.maincategory
                            : ""
                        }
                        class="Input"
                      />
                      <Select
                        placeholder="상담미진행"
                        styles={customStyles}
                        options={processArray}
                        getOptionLabel={(option) => option.label}
                        value={Partner.input_process_filter}
                        onChange={Partner.setProcessFilter}
                      />
                    </div>
                  </Header>
                </div>
                {Partner.partner_list &&
                  // Partner.currentPage > 0 &&
                  Partner.partner_list.map((item, idx) => {
                    return (
                      <Background style={{ marginBottom: "5px" }}>
                        {console.log(this.props.width)}
                        <ProposalCard
                          data={item}
                          width={this.props.width}
                          // middleCategory={Project.middle_category_name[idx]}
                          // mainCategory={Project.main_category_name[idx]}
                          // newData={Project.data_dt[idx]}
                          // checkTotal={Project.filter_price}
                          handleIntersection={this.handleIntersection}
                          customer="partner"
                        />
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
          {/* <PageCount> ... </PageCount> */}
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
    // padding: 16,
    fontSize: 14,
  }),
  control: () => ({
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 34,
    letterSpacing: "-0.45px",
    // border: "1px solid #c7c7c7",
    // borderRadius: "3px",
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

// const data = [
//   {
//     consultation: '상담 진행',
//     name: '컴퓨터',
//     date: '2021.03.02' ,
//     period: '120일',
//     estimate: '10,000,000원'
//   },

//   {
//     consultation: '상담 미진행',
//     date: '2021.03.03' ,
//     period: '121일',
//     estimate: '11,000,000원'
//   },

//   {
//     consultation: '완료',
//     name: '키보드',
//     date: '2021.03.04' ,
//     period: '122일',
//     estimate: '12,000,000원'
//   },

//   {
//     consultation: '상담 미진행',
//     name: '마우스',
//     date: '2021.03.05' ,
//     period: '123일',
//     estimate: '13,000,000원'
//   },

//   {
//     consultation: '완료',
//     name: '프린터',
//     date: '2021.03.06' ,
//     period: '124일',
//     estimate: '14,000,000원'
//   },
// ]

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
  margin-top: ${(props) => (props.active ? "120px" : "40px")};
`;
const Main = styled.div`
  width: 100%;
`;

const FilterSearch = styled.div`
  height: 134px;
  border: 1px solid red;
`;

const Filter = styled.div`
  width: 220px;
  border-right: 1px solid #e1e2e4;
  margin-right: 33px;
  padding-right: 9px;
  box-sizing: border-box;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  //justify-content: center;
  align-items: center;
  // margin-bottom: 28px;
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

  @media (min-width: 0px) and (max-width: 767.98px) {
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
`;

const Font14 = styled(Content.FontSize14)`
  font-weight: bold !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 30px !important;
  letter-spacing: -0.14px !important;
  color: #0933b3;
`;

export default MobileManufacturerContentContainer;
