import React from "react";
import styled from "styled-components";
import * as Text from "components/Text";
import Containerv1 from "./Containerv1";
import testimg from "../static/images/testimg.png";
import location from "../static/images/location.svg";

class CategoryCardComponent extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
        <Containerv1>
          <img src={testimg} alt="대표이미지" />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <Header>(주)동성실리콘</Header>
            <Middle>실리콘 고무 생산업체 / 실리콘 스펀지 / 가스켓 / 룰러 / 바이톤 팩킹 등</Middle>
            <img src={location} alt="위치" />
          </div>
        </Containerv1>
      </div>
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
