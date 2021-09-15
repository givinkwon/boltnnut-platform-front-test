import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import * as Title from "components/Title";

@inject("Partner", "Auth", "Common")
@observer
class ReviewCardContainer extends React.Component {
  render() {
    return (
      <ReviewSection>
        <div style={{ display: "inline-flex", justifyContent: "space-between" }}>
          <InnerBox style={{ gap: 15, alignItems: "center" }}>
            <Font24 style={{ marginBottom: 8 }}>
              실제 고객후기 <strong style={{ color: "#b3b3b3" }}>(2)</strong>
            </Font24>

            <InnerBox style={{ gap: 8 }}>
              <img src="/static/images/partnercard/detailcard/bluestar26.svg" style={{ height: 26 }} />

              <InnerBox style={{ height: 36, alignItems: "center" }}>
                <Font24 style={{ color: "#0933b3" }}>4.8</Font24>
                <Font14 style={{ color: "#b3b3b3", marginLeft: 2 }}>/ 5.0</Font14>
              </InnerBox>
            </InnerBox>
          </InnerBox>

          <InnerBox style={{ gap: 30 }}>
            <InnerBox style={{ alignItems: "center" }}>
              <Font14 style={{ color: "#767676", marginRight: 6 }}>친절도</Font14>
              <img src="/static/images/partnercard/detailcard/bluestar16.svg" style={{ marginBottom: 4 }} />
              <Font14 style={{ color: "#767676", marginLeft: 3 }}>4.3</Font14>
            </InnerBox>

            <InnerBox style={{ alignItems: "center" }}>
              <Font14 style={{ color: "#767676", marginRight: 6 }}>연락 빈도</Font14>
              <img src="/static/images/partnercard/detailcard/bluestar16.svg" style={{ marginBottom: 4 }} />
              <Font14 style={{ color: "#767676", marginLeft: 3 }}>5.0</Font14>
            </InnerBox>

            <InnerBox style={{ alignItems: "center" }}>
              <Font14 style={{ color: "#767676", marginRight: 6 }}>전문성</Font14>
              <img src="/static/images/partnercard/detailcard/bluestar16.svg" style={{ marginBottom: 4 }} />
              <Font14 style={{ color: "#767676", marginLeft: 3 }}>4.3</Font14>
            </InnerBox>
          </InnerBox>
        </div>

        <BoundaryLine style={{ margin: "15px 0px 36px 0px" }} />

        {/* 후기 없을 경우 */}
        {/* <ReviewWriteBox>
          <Font16 style={{ color: "#282c36" }}>아직 작성된 리뷰가 없습니다.</Font16>
          <Font16 style={{ color: "#282c36", marginTop: 8 }}>첫 번째 리뷰를 작성해볼까요?</Font16>

          <ReviewWriteBtn>후기 작성하기</ReviewWriteBtn>
        </ReviewWriteBox> */}

        <InnerBox style={{ alignItems: "center", height: 24 }}>
          <Font16 style={{ color: "#191919", fontWeight: "bold", marginRight: 8 }}>rhk***님</Font16>
          <img src="/static/images/partnercard/detailcard/bluestar18.svg" style={{ marginBottom: 7 }} />
          <Font16 style={{ color: "#0933b3", fontWeight: "bold", marginLeft: 4 }}>4.0</Font16>
          <Font14 style={{ color: "#b3b3b3", marginLeft: 26 }}>2021.05.28</Font14>
        </InnerBox>

        <Font15 style={{ marginTop: 23, color: "#a4aab4" }}>프로젝트 제목</Font15>

        <Font16 style={{ marginTop: 12, color: "#282c36" }}>
          공장에 대한 지식이 없는 저희에게 처음에는 막막. 제품이 원료나 가공 방법에 따라 원가가 공장에 대한 지식이 없는 저희 에게 처음에는 막막.제품이 원료나
          가공 방법에 따라합니다.
        </Font16>

        <BoundaryLine style={{ margin: "36px 0px 24px 0px" }} />

        <ReviewWriteBox>
          <Font16 style={{ color: "#282c36", textAlign: "center" }}>이 제조사와 직접 소통이나 거래를</Font16>
          <Font16 style={{ color: "#282c36", textAlign: "center", marginTop: 8 }}>진행해본 경험이 있으신가요?</Font16>

          <ReviewWriteBtn>후기 작성하기</ReviewWriteBtn>
        </ReviewWriteBox>
      </ReviewSection>
    );
  }
}

export default ReviewCardContainer;

// Font && Common
const Font14 = styled(Title.FontSize14)`
  font-family: NotoSansCJKkr;
  font-weight: normal;
`;

const Font15 = styled(Title.FontSize15)`
  font-family: NotoSansCJKkr;
  color: #999999;
  font-weight: normal;
`;

const Font16 = styled(Title.FontSize16)`
  font-family: NotoSansCJKkr;
  color: #000000;
  font-weight: normal;
`;

const Font24 = styled(Title.FontSize24)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
`;

const InnerBox = styled.div`
  display: flex;
`;

const BoundaryLine = styled.div`
  width: 792px;
  border: 1px solid #eeeeee;
`;
// --------------------------------------------------------------------------------

const ReviewSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const ReviewWriteBox = styled.div`
  width: 792px;
  height: 196px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
`;

const ReviewWriteBtn = styled.button`
  width: 150px;
  height: 42px;
  border-radius: 21px;
  background-color: #0933b3;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  border: none;
  color: #fff;
  margin-top: 24px;
  cursor: pointer;
`;
