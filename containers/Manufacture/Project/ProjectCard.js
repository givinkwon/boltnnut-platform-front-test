import React from "react";
import styled from "styled-components";

import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";

class ProjectCardContainer extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", border: "1px solid blue", marginTop: 30 }}>
        <Container style={{ width: "95%" }}>
          <MainContainer>
            <ContentBox style={{ width: 100, alignItems: "center" }}>
              <Title12 style={{ width: 50 }}>모집중</Title12>
              <img src="/static/images/new.svg" />
            </ContentBox>

            <ContentBox style={{ width: 320, marginTop: 13 }}>
              <Title20>실리콘 반려동물 샤워기</Title20>
              <img src="/static/images/success.svg" />
              <Title14>2021.02.22</Title14>
            </ContentBox>

            <ContentBox style={{ marginTop: 32 }}>
              <ImgInnerBox style={{ flexDirection: "column" }}>
                <div style={{ display: "inline-flex" }}>
                  <img src="static/images/class.svg" />
                  <Title16>업체분류</Title16>
                </div>
                <div style={{ marginTop: 8 }}>asdad</div>
              </ImgInnerBox>

              <img src="static/images/contentline.svg" />

              <ImgInnerBox style={{ flexDirection: "column" }}>
                <div style={{ display: "inline-flex" }}>
                  <img src="static/images/purpose.svg" />
                  <Title16>문의목적</Title16>
                </div>
                <div style={{ marginTop: 8 }}>asdad</div>
              </ImgInnerBox>

              <img src="static/images/contentline.svg" />

              <ImgInnerBox style={{ flexDirection: "column" }}>
                <div style={{ display: "inline-flex" }}>
                  <img src="static/images/price.svg" />
                  <Title16>예상금액</Title16>
                </div>
                <div style={{ marginTop: 8 }}>asdad</div>
              </ImgInnerBox>
            </ContentBox>
          </MainContainer>
          <AssistantContainer>asdasd</AssistantContainer>
        </Container>
      </div>
    );
  }
}

export default ProjectCardContainer;

const Title12 = styled(Title.FontSize12)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  color: #0933b3;
`;

const Title14 = styled(Title.FontSize14)`
  font-weight: normal;
  color: #b3b3b3;
  margin: 5px 0px 0px 15px;
`;

const Title16 = styled(Title.FontSize16)`
  font-weight: normal;
  color: #767676;
  margin-left: 4px;
`;

const Title20 = styled(Title.FontSize20)`
  font-weight: bold;
  color: #000000;
`;

const Container = styled(Containerv1)`
  justify-content: space-between;
  border: 1px solid red;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const AssistantContainer = styled.div`
  display: flex;
`;

const ContentBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
`;

const ImgInnerBox = styled.div`
  display: inline-flex;
  align-items: center;
`;
