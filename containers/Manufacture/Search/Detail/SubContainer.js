import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import * as Title from "components/Title";
import Router from "next/router";

const detailviewcount = "/static/images/viewcount.svg";
const detailbookmarkImg = "/static/icon/bookmark_empty.svg";
// const bookmarkBlueImg = "/static/icon/bookmark_blue.svg";

@inject("Partner", "Auth", "Common", "Request")
@observer
class ReviewCardContainer extends React.Component {
  render() {
    const { Partner, Request } = this.props;

    return (
      <SubContainer>
        <div style={{ width: 350 }}>
          <SubContainerInnerBox>
            <ActivePossibleBox>
              <Font14
                style={{
                  fontWeight: 500,
                  color: "#0933b3",
                }}
              >
                활동 가능
              </Font14>
            </ActivePossibleBox>

            <CountBox>
              <CountBoxImg src={detailviewcount} />
              {Partner.partner_detail_list[0] && Partner.partner_detail_list[0].item.view <= 1 ? (
                <Font14 style={{ color: "#999999" }}>낮음</Font14>
              ) : 1 <= Partner.partner_detail_list[0].item.view <= 4 ? (
                <Font14 style={{ color: "#999999" }}>보통</Font14>
              ) : Partner.partner_detail_list[0].item.view >= 5 ? (
                <Font14 style={{ color: "#999999" }}>높음</Font14>
              ) : null}

              <CountBoxImg src={detailbookmarkImg} style={{ marginLeft: 10 }} />
              <Font14 style={{ color: "#999999" }}>7</Font14>
            </CountBox>
          </SubContainerInnerBox>

          <Font26>{Partner.partner_detail_list[0] && Partner.partner_detail_list[0].item.name}</Font26>

          <Font15 style={{ marginTop: 36 }}>설립연도</Font15>
          <Font16>{Partner.partner_detail_list[0] && Partner.partner_detail_list[0].item.year == "0000" ? "-" : Partner.partner_detail_list[0].item.year + "년"}</Font16>

          <Font15>총 매출액</Font15>
          <Font16>{Partner.partner_detail_list[0].item.salses ? Partner.partner_detail_list[0].item.salses : "-"}</Font16>

          <Font15>인증</Font15>
          <Font16>{Partner.partner_detail_list[0].item.Certification ? Partner.partner_detail_list[0].item.Certification : "-"}</Font16>

          <Font15>사업 유형</Font15>
          <Font16>-</Font16>

          <Font15>진행한 제품군</Font15>
          <Font16>
            {Partner.partner_detail_list[0] && Partner.partner_detail_list[0].item.history.length >= 60
              ? Partner.partner_detail_list[0].item.history.slice(0, 60) + "..."
              : Partner.partner_detail_list[0].item.history.length === 0
              ? "-"
              : Partner.partner_detail_list[0].item.history}
          </Font16>

          <SubContainerBtnBox>
            <SubContainerBtn
              style={{
                background: "#0933b3",
                border: "none",
                color: "#fff",
              }}
              onClick={() => {
                let partnerId = Partner.partner_detail_list[0].item.id;
                Request.partner_request(partnerId);
                Router.push("/request");
                // path 설정
                Request.path = 3;
              }}
            >
              견적 요청하기
            </SubContainerBtn>

            <SubContainerBtn
              style={{
                color: "#a4aab4",
                background: "#fff",
                border: "1px solid #a4aab4",
                marginTop: 12,
              }}
            >
              <CountBoxImg src={detailbookmarkImg} style={{ paddingBottom: 3, marginRight: 3 }} />
              관심 업체 등록하기
            </SubContainerBtn>
          </SubContainerBtnBox>
        </div>
      </SubContainer>
    );
  }
}

export default ReviewCardContainer;

// Font && Common
const Font14 = styled(Title.FontSize14)`
  font-family: NotoSansCJKkr;
  font-weight: normal;
  text-align: center;
  margin-top: 2px;
  line-height: 2.14;
  letter-spacing: -0.14px;
`;

const Font15 = styled(Title.FontSize15)`
  font-family: NotoSansCJKkr;
  color: #999999;
  font-weight: normal;
  line-height: 1.47;
  letter-spacing: -0.38px;
  margin-top: 24px;
`;

const Font16 = styled(Title.FontSize16)`
  font-family: NotoSansCJKkr;
  color: #000000;
  font-weight: normal;
  margin-top: 4px;
  line-height: 1.5;
  letter-spacing: -0.4px;
`;

const Font26 = styled(Title.FontSize26)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
  color: #282c36;
  margin-top: 24px;
  line-height: 2;
  letter-spacing: -0.65px;
`;
// --------------------------------------------------------------------------------

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 384px;
  height: 706px;
  border-radius: 5px;
  border: solid 0.5px #e1e2e4;
  position: sticky;
  top: 10%;
`;

const SubContainerInnerBox = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`;

const SubContainerBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 44px;
`;

const SubContainerBtn = styled.button`
  width: 300px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  border-radius: 24px;
  font-size: 16px;
  font-family: NotoSansCJKkr;
  cursor: pointer;
`;

const ActivePossibleBox = styled.div`
  width: 90px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: solid 1px #0933b3;
`;

const CountBox = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 170px;
  height: 20px;
`;

const CountBoxImg = styled.img`
  width: 25px;
  height: 25px;
  object-fit: scale-down;
`;
