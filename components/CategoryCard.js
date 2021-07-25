import React from "react";
import styled from "styled-components";
import * as Text from "components/Text";
import Containerv1 from "./Containerv1";
import { style } from "@material-ui/system";

const testimg = "/static/images/testimg.png";
const location = "/static/images/location.svg";

class CategoryCardComponent extends React.Component {
  render() {
    return (
      <>
        <CategoryCardDiv>
          <div style={{ display: "inline-flex", marginLeft: "24px" }}>
            <img src={testimg} alt="대표이미지" />

            <div style={{ marginLeft: "24px" }}>
              <Header>(주)동성실리콘</Header>
              <Middle>실리콘 고무 생산업체 / 실리콘 스펀지 / 가스켓 / 룰러 / 바이톤 팩킹 등</Middle>
              <img src={location} alt="위치" />

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "11px" }}>
                <HashTagDiv>#해시태그</HashTagDiv>
                <HashTagDiv>#해시태그</HashTagDiv>
                <HashTagDiv>#해시태그</HashTagDiv>
                <HashTagDiv>#해시태그</HashTagDiv>
              </div>
            </div>
          </div>
        </CategoryCardDiv>

        <CategoryCardDiv>
          <div style={{ display: "inline-flex", marginLeft: "24px" }}>
            <img src={testimg} alt="대표이미지" />

            <div style={{ marginLeft: "24px" }}>
              <Header>(주)동성실리콘</Header>
              <Middle>실리콘 고무 생산업체 / 실리콘 스펀지 / 가스켓 / 룰러 / 바이톤 팩킹 등</Middle>
              <img src={location} alt="위치" />

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "11px" }}>
                <HashTagDiv>#해시태그</HashTagDiv>
                <HashTagDiv>#해시태그</HashTagDiv>
                <HashTagDiv>#해시태그</HashTagDiv>
                <HashTagDiv>#해시태그</HashTagDiv>
              </div>
            </div>
          </div>
        </CategoryCardDiv>

        <CategoryCardDiv>
          <div style={{ display: "inline-flex", marginLeft: "24px" }}>
            <img src={testimg} alt="대표이미지" />

            <div style={{ marginLeft: "24px" }}>
              <Header>(주)동성실리콘</Header>
              <Middle>실리콘 고무 생산업체 / 실리콘 스펀지 / 가스켓 / 룰러 / 바이톤 팩킹 등</Middle>
              <img src={location} alt="위치" />

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "11px" }}>
                <HashTagDiv>#해시태그</HashTagDiv>
                <HashTagDiv>#해시태그</HashTagDiv>
                <HashTagDiv>#해시태그</HashTagDiv>
                <HashTagDiv>#해시태그</HashTagDiv>
              </div>
            </div>
          </div>
        </CategoryCardDiv>
      </>
    );
  }
}

export default CategoryCardComponent;

const Header = styled(Text.FontSize20)`
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: -0.5px;
  text-align: left;
  color: #1e2222;
`;

const Middle = styled(Text.FontSize16)`
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.5;
  letter-spacing: -0.4px;
  text-align: left;
  color: #86888c;
`;

const CategoryCardDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 48px;
  height: 226px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
`;

const HashTagDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 82px;
  height: 34px;
  border-radius: 5px;
  background-color: #f6f6f6;
`;
