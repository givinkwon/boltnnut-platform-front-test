import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Slider from "react-slick";

import * as Title from "components/Title";
import MapContainer from "../Map";

@inject("Partner", "Auth")
@observer
class NewMobileDetailCardContainer extends React.Component {
  state = {
    // Slider Syncing state
    nav1: null,
    nav2: null,
    currentIdx: null,
  };

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }

  componentWillUnmount() {}

  render() {
    const { Partner } = this.props;

    // partnerlist
    const partnerList = Partner.partner_detail_list[0].item;

    // Slider settings
    const Mainsettings = {
      dots: false,
      infinite: true,
      draggable: true,
      speed: 500,
      asNavFor: this.state.nav2,
    };
    const Subsettings = {
      dots: false,
      infinite: true,
      draggable: true,
      speed: 500,
      asNavFor: this.state.nav1,
      slidesToShow: 5,
      swipeToSlide: true,
      focusOnSelect: true,
    };

    // Map 리전 넣어주기
    let region = "";

    if (Partner.partner_detail_list[0].item) {
      region =
        Partner.partner_detail_list[0].item.region === null || Partner.partner_detail_list[0].item.region === "nan"
          ? Partner.city_name
          : Partner.partner_detail_list[0].item.region;
    }

    console.log("asd", partnerList);
    console.log(Partner.tabIdx);

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container>
          {/* Portfolio */}
          <PortfolioSection>
            <MainSlider {...Mainsettings} ref={(slider) => (this.slider1 = slider)}>
              {partnerList.portfolio_set.map((item) => (
                <MainPortfolioImg key={item.id} src={item.img_portfolio} />
              ))}
            </MainSlider>

            <SubSlider
              {...Subsettings}
              ref={(slider) => (this.slider2 = slider)}
              beforeChange={(slide, newSlide) => this.setState({ ...this.state, currentIdx: newSlide })}
              style={{ marginTop: 8 }}
            >
              {partnerList.portfolio_set.map((item) => (
                <SubPortfolioImg key={item.id} src={item.img_portfolio} />
              ))}
            </SubSlider>

            <CountBox>
              {this.state.currentIdx + 1} / {partnerList.portfolio_set.length}
            </CountBox>
          </PortfolioSection>

          {/* Name */}
          <NameSection>
            <InnerBox style={{ justifyContent: "space-between", alignItems: "center", width: 350 }}>
              <Font18 style={{ paddingTop: 2 }}>{partnerList.name}</Font18>

              <InnerBox>
                <InnerBox style={{ gap: 6, alignItems: "center" }}>
                  <img src="/static/images/search/mobile/detailview.svg" style={{ paddingBottom: 2 }} />

                  {partnerList && partnerList.view <= 1 ? (
                    <Font12>낮음</Font12>
                  ) : 1 <= partnerList.view && partnerList.view <= 4 ? (
                    <Font12>보통</Font12>
                  ) : partnerList.view >= 5 ? (
                    <Font12>높음</Font12>
                  ) : null}
                </InnerBox>

                <InnerBox style={{ gap: 6, marginLeft: 16, alignItems: "center" }}>
                  <img src="/static/images/search/mobile/detailbookmarkoff.svg" style={{ paddingBottom: 2 }} />

                  <Font12>7</Font12>
                </InnerBox>
              </InnerBox>
            </InnerBox>

            <ActivePossibleBox>활동가능</ActivePossibleBox>
          </NameSection>

          {/* TabBoxSection */}
          <TabBoxSection>
            <Tab onClick={() => Partner.tabClick(1)} active={Partner.tabStateHandler(1)}>
              <Font14 active={Partner.tabStateHandler(1)}>회사 소개서</Font14>
            </Tab>
            <Tab onClick={() => Partner.tabClick(2)} active={Partner.tabStateHandler(2)}>
              <Font14 active={Partner.tabStateHandler(2)}>후기</Font14>
            </Tab>
            <Tab onClick={() => Partner.tabClick(3)} active={Partner.tabStateHandler(3)}>
              <Font14 active={Partner.tabStateHandler(3)}>문의</Font14>
            </Tab>
          </TabBoxSection>

          {/* CompanyInfo */}
          <CompanyInfoSection>
            <Font14 style={{ color: "#1e2222", fontWeight: "normal" }}>{partnerList.info_company ? partnerList.info_company : "-"}</Font14>

            <CompanyInfoContainer>
              <CompanyInfoInnerBox>
                <CompanyInfoTitle>대표자</CompanyInfoTitle>
                <CompanyInfoContent>{partnerList.CEO ? partnerList.CEO : "-"}</CompanyInfoContent>
              </CompanyInfoInnerBox>

              <CompanyInfoInnerBox>
                <CompanyInfoTitle>지역</CompanyInfoTitle>
                <CompanyInfoContent>{partnerList.city ? partnerList.city.maincategory : "-"}</CompanyInfoContent>
              </CompanyInfoInnerBox>

              <CompanyInfoInnerBox>
                <CompanyInfoTitle>사업유형</CompanyInfoTitle>
                <CompanyInfoContent>제작/생산</CompanyInfoContent>
              </CompanyInfoInnerBox>

              <CompanyInfoInnerBox>
                <CompanyInfoTitle>직원 수</CompanyInfoTitle>
                <CompanyInfoContent>{partnerList.staff ? partnerList.staff : "-"}</CompanyInfoContent>
              </CompanyInfoInnerBox>

              <CompanyInfoInnerBox>
                <CompanyInfoTitle>총 매출액</CompanyInfoTitle>
                <CompanyInfoContent>{partnerList.sales ? partnerList.sales : "-"}</CompanyInfoContent>
              </CompanyInfoInnerBox>

              <CompanyInfoInnerBox>
                <CompanyInfoTitle>설립연도</CompanyInfoTitle>
                <CompanyInfoContent>{partnerList.year ? partnerList.year : "-"}</CompanyInfoContent>
              </CompanyInfoInnerBox>

              <CompanyInfoInnerBox>
                <CompanyInfoTitle>인증</CompanyInfoTitle>
                <CompanyInfoContent>{partnerList.Certification ? partnerList.Certification : "-"}</CompanyInfoContent>
              </CompanyInfoInnerBox>

              <CompanyInfoInnerBox>
                <CompanyInfoTitle>제품군</CompanyInfoTitle>
                <CompanyInfoContent>{partnerList.history ? partnerList.history : "-"}</CompanyInfoContent>
              </CompanyInfoInnerBox>
            </CompanyInfoContainer>
          </CompanyInfoSection>

          {/* map */}
          <MapSection>
            <Font16 style={{ marginBottom: 12 }}>회사 위치</Font16>
            <MapContainer city={region} />
          </MapSection>
        </Container>
      </div>
    );
  }
}

export default NewMobileDetailCardContainer;

// Font
const Font12 = styled(Title.FontSize12)`
  font-family: NotoSansCJKkr;
  font-weight: normal;
  color: #999;
`;

const Font14 = styled(Title.FontSize14)`
  font-family: NotoSansCJKkr;
  font-weight: 500;
  color: ${(props) => (props.active ? "#0933b3" : "#86888c")};
`;

const Font16 = styled(Title.FontSize16)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
  color: #1e2222;
`;

const Font18 = styled(Title.FontSize18)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
  color: #1e2222;
`;

// Common
const InnerBox = styled.div`
  display: flex;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

// Section
// ============ Portfolio ============
const MainSlider = styled(Slider)`
  .slick-list {
    width: 375px;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;

const SubSlider = styled(Slider)`
  .slick-list {
    width: 350px;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;

const PortfolioSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MainPortfolioImg = styled.img`
  width: 375px;
  height: 375px;
`;

const SubPortfolioImg = styled.img`
  width: 80px;
  height: 80px;
`;

const CountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 20px;
  color: #fff;
  background-color: #000;
  border-radius: 3px;
  font-size: 13px;
  font-family: NotoSansCJKkr;
  padding-top: 3px;

  position: absolute;
  top: 3%;
  right: 2%;
`;

// ============ Name ============
const NameSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 350px;
  margin-top: 32px;
`;

const ActivePossibleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 26px;
  border-radius: 3px;
  background-color: #0933b3;
  margin-top: 12px;

  font-family: NotoSansCJKkr;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
`;

// ============ TabBox ============
const TabBoxSection = styled.section`
  display: flex;
  width: 350px;
  margin-top: 55px;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 36px;

  border: solid 1px #e1e2e4;
  border-bottom: ${(props) => props.active && "none"};
  background-color: ${(props) => (props.active ? "#ffffff" : "#f6f6f6")};
  cursor: pointer;
`;

// ============ CompanyInfo ============
const CompanyInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 350px;
  margin-top: 24px;
`;

const CompanyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const CompanyInfoInnerBox = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 12px;
`;

const CompanyInfoTitle = styled(Title.FontSize12)`
  color: #1e2222;
  font-weight: bold;
  width: 45px;
`;

const CompanyInfoContent = styled(Title.FontSize12)`
  color: #767676;
`;

// ============ Map ============
const MapSection = styled.section`
  width: 350px;
  margin-top: 100px;
`;
