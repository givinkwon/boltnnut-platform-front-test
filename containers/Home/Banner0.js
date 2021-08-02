import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import * as Title from "components/Title";
import * as Text from "components/Text";
import SearchBar from "../Manufacture/Producer/SearchBar";

const banner0img = "/static/images/banner0img.svg";

class Banner0Container extends React.Component {

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "200px", marginBottom: "188px" }}>
        <Containerv1 style={{ justifyContent: "space-between" }}>
          <LeftBox>
            <Header>
              대한민국 제조사 정보
              <br />
              여기 다 있다.
            </Header>

            <Middle>당신에게 맞는 제조사 정보를 바로 조회해보세요.</Middle>

            <SearchBar />
          </LeftBox>

          <img src={banner0img} style={{ height: "420px" }} />
        </Containerv1>
      </div>
    );
  }
}

export default Banner0Container;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 588px;
`;

const Header = styled(Title.FontSize48)`
  width: 420px;
  height: 151px;
  object-fit: contain;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -1.2px;
  color: #1e2222;
`;

const Middle = styled(Text.FontSize20)`
  width: 100%;
  height: 29px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.8;
  letter-spacing: -0.5px;
  text-align: left;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 80px;
`;