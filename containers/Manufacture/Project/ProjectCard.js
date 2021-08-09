import React from "react";
import styled from "styled-components";

import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";

class ProjectCardContainer extends React.Component {
  render() {
    return (
      <Background>
        <Container style={{ width: "95%" }}>
          <MainContainer>
            <ContentBox style={{ width: 100, alignItems: "center" }}>
              <Title12 style={{ width: 50 }}>모집중</Title12>
              <img src="/static/images/new.svg" />
            </ContentBox>

            <ContentBox style={{ width: 320, marginTop: 20 }}>
              <Title20>실리콘 반려동물 샤워기</Title20>
              <img src="/static/images/success.svg" />
              <Title14>2021.02.22</Title14>
            </ContentBox>

            <ContentBox style={{ marginTop: 32, width: 400 }}>
              <ImgInnerBox style={{ flexDirection: "column" }}>
                <InnerBox>
                  <img src="static/images/class.svg" />
                  <Title16>업체분류</Title16>
                </InnerBox>
                <div style={{ marginTop: 8 }}>-</div>
              </ImgInnerBox>

              <img src="static/images/contentline.svg" />

              <ImgInnerBox style={{ flexDirection: "column" }}>
                <InnerBox>
                  <img src="static/images/purpose.svg" />
                  <Title16>문의목적</Title16>
                </InnerBox>
                <div style={{ marginTop: 8 }}>업체수배</div>
              </ImgInnerBox>

              <img src="static/images/contentline.svg" />

              <ImgInnerBox style={{ flexDirection: "column" }}>
                <InnerBox>
                  <img src="static/images/price.svg" />
                  <Title16>예상금액</Title16>
                </InnerBox>
                <div style={{ marginTop: 8 }}>20,000,000원</div>
              </ImgInnerBox>
            </ContentBox>

            <DescTitle14>용기 디자인은 동일하게 해서 뚜껑색만 다르게 하고 싶은데요. 뚜껑 색상은 어두운 색상으로 하고 싶어서요~ 뚜껑과 용기 </DescTitle14>
          </MainContainer>

          <AssistantContainer>
            <AssistantInnerBox>
              <img src="static/images/bookmark.svg" />
              <AssistantTitle14>3</AssistantTitle14>
            </AssistantInnerBox>

            <AssistantInnerBox>
              <img src="static/images/eye.svg" />
              <AssistantTitle14>높음</AssistantTitle14>
            </AssistantInnerBox>

            <AssistantInnerBox>
              <img src="static/images/person.svg" />
              <AssistantTitle14>총 3명 지원</AssistantTitle14>
            </AssistantInnerBox>

            <img src="static/images/underline.svg" style={{ marginTop: 9 }} />
          </AssistantContainer>
        </Container>
      </Background>
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

const DescTitle14 = styled(Title.FontSize14)`
  margin-top: 24px;
  font-weight: 400;
  color: #767676;
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  border-radius: 8px;
  border: solid 1px #e1e2e4;
  background-color: #ffffff;
  cursor: pointer;

  :hover {
    border: solid 1px #0933b3;
  }
`;

const Container = styled(Containerv1)`
  justify-content: space-between;
  margin: 30px 0px 30px 0px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const AssistantContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ContentBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
`;

const ImgInnerBox = styled.div`
  display: inline-flex;
  align-items: center;
`;

const InnerBox = styled.div`
  display: inline-flex;
  align-items: center;
`;

const AssistantInnerBox = styled.div`
  display: flex;
  gap: 10px;
  width: 100px;
  margin-top: 12px;
`;

const AssistantTitle14 = styled(Title.FontSize14)`
  font-weight: 400;
  color: #282c36;
`;
