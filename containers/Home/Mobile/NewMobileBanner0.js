import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import NewMobileSearchBar from "../../Manufacture/Producer/NewMobileSearchBar";

const startling = "/static/images/startline.svg";

class NewMobileBanner0Container extends React.Component {
  render() {
    return (
      <Container>
        <InnerContainer>
          <Title24>대한민국 제조사 정보 여기 다 있다.</Title24>
          <Title16>
            당신에게 맞는 제조사 정보를
            <br /> 바로 조회해보세요.
          </Title16>

          <NewMobileSearchBar />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <StartLine />
          </div>
        </InnerContainer>
      </Container>
    );
  }
}

export default NewMobileBanner0Container;

const StartLine = styled.div`
  width: 18px;
  border: solid 1px #999999;
  margin-bottom: 24px;
`;

const Container = styled(Containerv1)`
  display: flex;
  justify-content: center;
  margin-top: 128px;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
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
  margin-top: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.4px;
  color: #767676;
`;
