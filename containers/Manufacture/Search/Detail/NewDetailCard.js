import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import * as Title from "components/Title";
import ContainerV1 from "components/ContainerV1";
import PortfolioConatiner from "./Portfolio";

const detailviewcount = "/static/images/viewcount.svg";
const detailbookmarkImg = "/static/icon/bookmark_empty.svg";
// const bookmarkBlueImg = "/static/icon/bookmark_blue.svg";

@inject("Partner", "Auth", "Common")
@observer
class NewDetailCardContainer extends React.Component {
  render() {
    const { Partner } = this.props;
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Container>
          <MainContainer>
            {Partner.partner_detail_list[0].item.portfolio_set.map((v, idx) => (
              <>
                {console.log(Partner.partner_detail_list[0])}
                <PortfolioImgBox src={v.img_portfolio} />
              </>
            ))}
          </MainContainer>

          <SubContainer>
            <div style={{ width: 350, border: "1px red solid" }}>
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
                  {Partner.partner_detail_list[0] &&
                  Partner.partner_detail_list[0].item.view <= 1 ? (
                    <Font14 style={{ color: "#999999" }}>낮음</Font14>
                  ) : 1 <= Partner.partner_detail_list[0].item.view <= 4 ? (
                    <Font14 style={{ color: "#999999" }}>보통</Font14>
                  ) : Partner.partner_detail_list[0].item.view >= 5 ? (
                    <Font14 style={{ color: "#999999" }}>높음</Font14>
                  ) : null}

                  <CountBoxImg
                    src={detailbookmarkImg}
                    style={{ marginLeft: 20 }}
                  />
                  <Font14 style={{ color: "#999999" }}>7</Font14>
                </CountBox>
              </SubContainerInnerBox>

              <Font26>
                {Partner.partner_detail_list[0] &&
                  Partner.partner_detail_list[0].item.name}
              </Font26>

              <Font15 style={{ marginTop: 36 }}>설립연도</Font15>
              <Font16>
                {Partner.partner_detail_list[0] &&
                  Partner.partner_detail_list[0].item.year}
              </Font16>

              <Font15>총 매출액</Font15>
              <Font16>
                {Partner.partner_detail_list[0].salses
                  ? Partner.partner_detail_list[0].salses
                  : "-"}
              </Font16>

              <Font15>인증</Font15>
              <Font16>
                {Partner.partner_detail_list[0].Certification
                  ? Partner.partner_detail_list[0].Certification
                  : "-"}
              </Font16>

              <Font15>사업 유형</Font15>
              <Font16></Font16>
            </div>
          </SubContainer>
        </Container>
      </div>
    );
  }
}

export default NewDetailCardContainer;

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

const Container = styled(ContainerV1)`
  display: flex;
  justify-content: space-between;
  width: 1200px;
  margin-top: 80px;
`;

const MainContainer = styled.div`
  width: 792px;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 384px;
  height: 706px;
  border-radius: 5px;
  border: solid 0.5px #e1e2e4;
`;

const SubContainerInnerBox = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`;

const PortfolioImgBox = styled.img`
  width: 392px;
  height: 286px;
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
  width: 150px;
  height: 20px;
`;

const CountBoxImg = styled.img`
  width: 20px;
  height: 20px;
  object-fit: scale-down;
`;
