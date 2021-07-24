import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import NewMobileSearchBar from "../../Manufacture/Producer/NewMobileSearchBar";

const startling = "/static/images/startline.svg";
const mobilebanner0img = "/static/images/mobilebanner0img.svg";

class NewMobileBanner0Container extends React.Component {
  render() {
    return (
      <Container>
        <InnerContainer>
          <img src={mobilebanner0img} style={{ marginBottom: "34px" }} />

          <Title24>대한민국 제조사 정보 여기 다 있다.</Title24>
          <Title16 style={{ marginTop: "20px" }}>당신에게 맞는 제조사 정보를</Title16>
          <Title16>바로 조회해보세요.</Title16>

          <NewMobileSearchBar />
        </InnerContainer>
      </Container>
    );
  }
}

export default NewMobileBanner0Container;

const Container = styled(Containerv1)`
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
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.4px;
  color: #767676;
`;
