import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import NewMobileSearchBar from "containers/Manufacture/Search/Mobile/NewMobileSearchBar";
import Router from "next/router";
import Buttonv1 from "components/Buttonv1";
const startling = "/static/images/startline.svg";
const mobilebanner0img = "/static/images/mobilebanner0img.svg";
const arrow = "static/images/request/arrow.svg";

class MobileBanner0Container extends React.Component {
  render() {
    return (
      <Container>
        <InnerContainer>
          <img src={mobilebanner0img} style={{ marginBottom: "34px" }} />

          <Title24>CNC 가공 빠르고, 안전하게</Title24>
          <Title24>AI 견적으로 제조 부품 바로발주</Title24>
          <Title16 style={{ marginTop: "20px" }}>3D 도면만 올리면</Title16>
          <Title16>부품 납기/견적이 바로!</Title16>

          <Button onClick={() => (Router.push('/autoestimate'))}>
              바로 발주 알아보기 
              <img src={arrow} style={{ marginLeft: 10 }} />
            </Button>
        </InnerContainer>
      </Container>
    );
  }
}

export default MobileBanner0Container;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 128px;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 347px;
`;

const Title24 = styled(Title.FontSize24)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.58;
  letter-spacing: -1.2px;
  color: #000000;
`;

const Title16 = styled(Title.FontSize16)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.4px;
  color: #767676;
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