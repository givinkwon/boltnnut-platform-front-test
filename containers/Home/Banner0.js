import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import * as Title from "components/Title";
import * as Text from "components/Text";
import SearchBar from "./SearchBar";
import Router from "next/router";
import Buttonv1 from "components/Buttonv1";


const banner0img = "/static/images/banner0img.svg";
const arrow = "static/images/request/arrow.svg";

class Banner0Container extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "90px",
          marginBottom: "110px",
        }}
      >
        <Containerv1 style={{ gap: 130, alignItems: "center" }}>
          <LeftBox>
            <Header>
              CNC 가공 빠르고, 안전하게
              <br />
              AI 견적으로 제조 부품 바로발주
            </Header>

            <Middle>3D 도면만 올리면 부품 납기/견적이 바로!</Middle>

            <Button onClick={() => (Router.push('/autoestimate'))}>
              바로 발주 알아보기 
              <img src={arrow} style={{ marginLeft: 10 }} />
            </Button>
          </LeftBox>

          <img src={banner0img} style={{ marginTop: 40 }} />
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

const Header = styled(Title.FontSize32)`
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

const Middle = styled(Text.FontSize24)`
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
const Button = styled(Buttonv1)`
  width: 263px !important;
  height: 58px !important;
  font-size: 20px;
  font-family: NotoSansCJKkr !important;
  line-height: 2.1;
  letter-spacing: -0.5px;
  margin-top: 100px;
  z-index: 2;
  :hover {
    background-color: #174aee;
  }
`;