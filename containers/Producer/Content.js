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

  handleIntersection = (event) => {
    if (event.isIntersecting) {
      console.log("추가 로딩을 시도합니다");
    }
  };

  async componentDidMount() {
    const { Partner } = this.props;

    // Project.search_text = "";
    Partner.currentPage = 1;

    // console.log("did mount");

    console.log("content mount");
    await Partner.getPartner();
    // console.log(toJS(Partner.category_dic));

    //console.log(toJS(Partner.filter_category_ary.length));
    if (Partner.filter_category_ary.length === 1) {
      Partner.getCategory();
    }
    if (Partner.filter_city_ary.length === 1) {
      Partner.getCity();
    }

    // console.log(typeof Partner.category_dic);

    // console.log(Object.keys(Partner.category_dic).length);
    // if (Object.keys(Partner.category_dic).length === 0) {
    //   this.setState({ g: 3 });
    //   console.log(toJS(Partner.category_dic));
    // }
    // await Auth.checkLogin();
    // if(Auth.logged_in_partner){
    //   Project.getProjectByPrice()
    // }
  }

  componentWillUnmount() {
    const { Partner } = this.props;
    // console.log("WillUnMount");
    console.log("content unmount");
    Partner.requestModalActive = false;
    Partner.requestDoneModalActive = false;
    Partner.resetDevCategory();
    Partner.filter_category_ary = [{ id: 0, category: "전체" }];
    Partner.filter_city_ary = [{ id: 0, city: "전체" }];
  }

  componentDidUpdate() {
    const { Partner } = this.props;

    // if (Object.keys(Partner.category_dic).length != 0) {
    //   this.setState({ g: 3 });
    //   console.log(toJS(Partner.category_dic));
    // }
  }
  movePage = (e) => {
    const { Partner, Auth } = this.props;
    e.preventDefault();
    // Project.category_reset()
    const newPage = e.target.innerText * 1;
    Partner.currentPage = newPage;
    // Project.getProjectByPrice(Project.search_text, newPage)
    // console.log(toJS(this.category_dic));
    Partner.resetDevCategory();
    Partner.check_loading_develop = false;
    Partner.ReviewActive = false;
    Partner.ReviewActiveIndex = -1;
    this.setState({ dropDownActive: false, dropDownIdx: -1 });
    Partner.getPartner(newPage);
  };

  pageNext = (e) => {
    const { Partner } = this.props;
    e.preventDefault();
    // console.log(toJS(Partner.currentPage));
    // console.log(toJS(Partner.partner_page));
    if (Partner.currentPage < Partner.partner_page) {
      // Project.category_reset()
      const nextPage = Partner.currentPage + 1;
      Partner.currentPage = nextPage;
      // Project.getProjectByPrice(Project.search_text, Project.currentPage)
      // console.log(nextPage);
      Partner.check_loading_develop = false;
      // console.log(toJS(this.category_dic));
      // Partner.category_dic = {};
      Partner.resetDevCategory();
      Partner.ReviewActive = false;
      Partner.ReviewActiveIndex = -1;
      this.setState({ dropDownActive: false, dropDownIdx: -1 });
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
      // console.log(toJS(this.category_dic));
      Partner.resetDevCategory();
      Partner.check_loading_develop = false;
      Partner.ReviewActive = false;
      Partner.ReviewActiveIndex = -1;
      this.setState({ dropDownActive: false, dropDownIdx: -1 });
      Partner.getPartner(newPage);
      // Project.getProjectByPrice(Project.search_text, Project.currentPage)
    }
  };

  pushToDetail = async (item, idx) => {
    const { Partner } = this.props;

    if (!Partner.requestModalActive) {
      console.log("Detail click");
      Partner.category_name_list = null;
      // console.log(item.id);
      Partner.partner_detail_list = [];
      //Project.selectedProjectId = id;
      Partner.partner_detail_list.push({ item: item });
      // console.log(toJS(Partner.partner_detail_list));
      // Partner.newIndex = 1;
      Partner.category_name_list = Partner.category_dic[idx];
      // console.log(idx);
      //console.log(toJS(Partner.category_dic[idx]));
      // console.log(toJS(Partner.category_name_list));
      // await Partner.getPartnerDetail(item.id);

      // await Router.push(`/project/${id}`);
      //Project.setProjectDetailData(id);
      // console.log("click");
      if (this.state.dropDownIdx === -1) {
        await Partner.getCityName(Partner.partner_detail_list[0].item.city);
        Partner.portFolioList = [];
        await Partner.getPortfolio(Partner.partner_detail_list[0].item.id);
        // console.log(Partner.partner_detail_list[0].item.city);

        // console.log(Partner.city_name);
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
    // console.log(toJS(Partner.portFolioList));
  };

  render() {
    const { Project, Partner } = this.props;
    const current_set = parseInt((Partner.currentPage - 1) / 5) + 1;
    const gray = "#f9f9f9";
    const usertype = "partner";

    return (
      <>
        {/* {console.log("rendering")} */}
        <Background id="MyBackground">
          <Container>
            {/* <SearchBar /> */}
            <Body>
              {/* <Filter style={{ paddingTop: "32px" }}>
                <Font20>필터</Font20>
                <RadioBox
                  filter="region"
                  data={this.props.Partner.filter_city_ary}
                />
                <RadioBox
                  filter="develop"
                  data={this.props.Partner.filter_category_ary}
                />
              </Filter> */}

              {/* <Background> */}
              {/* { Project.projectDataList.length > 0 && Project.projectDataList.slice(5*(Project.currentPage), 5*(Project.currentPage +1)).map((item, idx) => {                             */}
              <Main>
                <Header style={{ paddingTop: "32px" }}>
                  <Font20 style={{ marginLeft: "-9px" }}>
                    <span style={{ fontWeight: "bold" }}>
                      {Partner.partner_count}개
                    </span>
                    의 파트너가 있습니다.
                  </Font20>
                  {/* <span>
              <Font14>모든 제조의뢰</Font14>
              <img src={pass4}/>
            </span> */}
                </Header>
                {Partner.partner_list &&
                  // Partner.currentPage > 0 &&
                  Partner.partner_list.map((item, idx) => {
                    return (
                      <Background style={{ marginBottom: "5px" }}>
                        {/* {Partner.category_ary[idx] &&
                          console.log(
                            toJS(
                              Partner.category_ary[idx].splice(
                                0,
                                //Partner.category_ary[idx].length
                                Object.keys(Partner.category_ary[idx]).length
                              )
                            )
                          )} */}
                        {/* Partner.check_loading_category &&  */}
                        {/* {console.log(toJS(Partner.category_ary[idx]))} */}
                        {/* {Partner.check_loading_category &&
                          console.log(toJS(Partner.category_ary[idx]))} */}
                        {/* {console.log(toJS(Partner.category_dic[idx]))} */}
                        {/* {console.log(idx)} */}
                        <div
                          onClick={() => this.pushToDetail(item, idx)}
                          // style={{ width: "100%" }}
                          style={{ width: "100%" }}
                        >
                          {/* {console.log(toJS(Partner.category_dic))} */}
                          <ProposalCard
                            data={item}
                            width={this.props.width}
                            //categoryData={Partner.category_ary[idx]}
                            categoryData={toJS(Partner.category_dic[idx])}
                            idx={idx}
                            // middleCategory={Project.middle_category_name[idx]}
                            // mainCategory={Project.main_category_name[idx]}
                            // newData={Project.data_dt[idx]}
                            // checkTotal={Project.filter_price}
                            dropDown={this.state.dropDownActive}
                            dropDownIdx={this.state.dropDownIdx}
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
  justify-content: center;
  border-top: 1px solid #e1e2e4;
  border-bottom: 1px solid #e1e2e4;
  // margin-top: 40px;
`;
const Main = styled.div`
  //width: 984px;

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
const Filter = styled.div`
  width: 220px;
  border-right: 1px solid #e1e2e4;
  margin-right: 33px;
  padding-right: 9px;
  box-sizing: border-box;
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

export default ManufacturerContentContainer;
