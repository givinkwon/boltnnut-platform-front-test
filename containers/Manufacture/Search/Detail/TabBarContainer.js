import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import * as Title from "components/Title";

@inject("Partner", "Auth", "Common")
@observer
class TabBarCardContainer extends React.Component {
  render() {
    const { Partner } = this.props;
    console.log(Partner.tabIdx);

    return (
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
    );
  }
}

export default TabBarCardContainer;

// Font && Common
const Font16 = styled(Title.FontSize16)`
  font-family: NotoSansCJKkr;
  color: #000000;
  font-weight: normal;
  margin-top: 4px;
  line-height: 1.5;
  letter-spacing: -0.4px;
`;

const Font24 = styled(Title.FontSize24)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
`;

const BoundaryLine = styled.div`
  width: 792px;
  border: 1px solid #eeeeee;
`;

const InnerBox = styled.div`
  display: flex;
`;
// --------------------------------------------------------------------------------

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
