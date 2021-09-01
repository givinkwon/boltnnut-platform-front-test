import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";

@inject("Project")
@observer
class ProjectCardContainer extends React.Component {
  state = {
    width: null,
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  render() {
    // data는 프로젝트 데이터
    const { data } = this.props;
    const { width } = this.state;

    // 의뢰명
    let name = "";
    // 의뢰 날짜
    let date = "";
    // 의뢰 기간
    let period = "";
    // 희망 가격
    let price = "";
    // 의뢰 목적
    let status = "";
    // 의뢰 내용
    let content = "";

    // 의뢰 파일 list
    let filelist = "";

    // 의뢰 분류
    let category = "";

    // 희망 지역
    let region = "";

    // 데이터 저장
    if (data.request_set[0]) {
      name = data.request_set[0].name && data.request_set[0].name;

      date =
        data.request_set[0].createdAt &&
        data.request_set[0].createdAt.substr(0, 10).replaceAll("-", ".");

      content = data.request_set[0].contents && data.request_set[0].contents;

      period =
        data.request_set[0].deadline == "2020-11-11T11:11:00+09:00"
          ? "납기일미정"
          : data.request_set[0].deadline.substring(0, 10) +
            "(" +
            data.request_set[0].deadline_state +
            ")";

      price = data.request_set[0].price && data.request_set[0].price;

      status =
        data.request_set[0].request_state && data.request_set[0].request_state;

      filelist =
        data.request_set[0].requestfile_set &&
        data.request_set[0].requestfile_set;

      category = data.request_set[0].category && data.request_set[0].category;

      region = data.request_set[0].region && data.request_set[0].region;
    }

    const { Project } = this.props;

    return (
      <Background style={{ marginTop: 0, width: "996px" }}>
        <Container style={{ width: "95%" }}>
          <MainContainer>
            <ContentBox style={{ width: 110, alignItems: "center" }}>
              <Title12 style={{ width: 50 }}>{data.status}</Title12>
              <img src="/static/images/new.svg" />
            </ContentBox>

            <ContentBox style={{ width: "100%", marginTop: 20 }}>
              <Title20>
                {name && name.length > 35 ? name.slice(0, 35) + "..." : name}
              </Title20>
              <img src="/static/images/success.svg" />
              <Title14>{date}</Title14>
            </ContentBox>

            <ContentBox style={{ marginTop: 32, width: 400, gap: 20 }}>
              <ImgInnerBox>
                <InnerBox>
                  <img src="static/images/class.svg" />
                  <Title16>업체분류</Title16>
                </InnerBox>

                <MiddleTitle>{category && category}</MiddleTitle>
              </ImgInnerBox>

              <img src="static/images/contentline.svg" />

              <ImgInnerBox>
                <InnerBox>
                  <img src="static/images/purpose.svg" />
                  <Title16>문의목적</Title16>
                </InnerBox>

                <MiddleTitle>{status && status}</MiddleTitle>
              </ImgInnerBox>

              <img src="static/images/contentline.svg" />

              <ImgInnerBox>
                <InnerBox>
                  <img src="static/images/price.svg" />
                  <Title16>예상금액</Title16>
                </InnerBox>

                <MiddleTitle>{price != "" ? price : "미정"}</MiddleTitle>
              </ImgInnerBox>
            </ContentBox>

            <DescTitle14>
              {content && content.length > 70
                ? content.substring(0, 70) + "..."
                : content}
            </DescTitle14>
          </MainContainer>

          <AssistantContainer>
            <AssistantInnerBox>
              <img src="static/images/bookmark.svg" />
              <AssistantTitle14>3</AssistantTitle14>
            </AssistantInnerBox>

            <AssistantInnerBox>
              <img src="static/images/eye.svg" />
              <AssistantTitle14>
                {data && data.view <= 1 ? (
                  <div>낮음</div>
                ) : 1 <= data.view && data.view <= 4 ? (
                  <div>보통</div>
                ) : data.view >= 5 ? (
                  <div>높음</div>
                ) : null}
              </AssistantTitle14>
            </AssistantInnerBox>

            <AssistantInnerBox>
              <img src="static/images/person.svg" />
              <AssistantTitle14>
                총 {data && data.answer_set.length} 명 지원
              </AssistantTitle14>
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
  margin-top: 40px;
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
  gap: 10px;
`;

const ImgInnerBox = styled.div`
  display: inline-flex;
  flex-direction: column;
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

const MiddleTitle = styled.div`
  margin-top: 8px;
`;
