import React from "react";
import styled from "styled-components";

import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import InputComponent from "AddFile2";

const reqeustlogo = "./static/images/request/request_logo.svg";
const starred = "./static/images/request/star_red.svg";
const down_arrow = "./static/images/request/down_arrow.svg";
const help_face = "./static/images/request/help_face.svg";

class ProjectRequest extends React.Component {
  render() {
    return (
      <>
        <Background>
          <Containerv1 style={{ width: 792 }}>
            <Header>
              <img src={reqeustlogo} style={{ widht: 45, height: 45 }}></img>
              <Title>
                <span style={{ color: "#0933b3" }}>프로젝트 정보</span>를
                입력해주세요.
              </Title>
            </Header>
          </Containerv1>
          <Containerv1 style={{ width: 792 }}>
            <Body>
              <Content>
                <ContentBox>
                  <ContentTitle>
                    <div>문의 목적</div>
                    <img src={starred}></img>
                    <div>(중복 선택 가능)</div>
                  </ContentTitle>
                  <PurposeBtn>
                    <button>상담 요청</button>
                    <button>견적 요청</button>
                    <button>업체 수배</button>
                  </PurposeBtn>
                </ContentBox>
                <ContentBox>
                  <ContentTitle>
                    <div>프로젝트 제목</div>
                    <img src={starred}></img>
                  </ContentTitle>
                  <input style={{ width: "100%", height: 42 }}></input>
                </ContentBox>
                <ContentBox>
                  <ContentTitle>
                    <div>희망 예산</div>
                  </ContentTitle>
                  <Budget>
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <BudgetBox>
                        <div>0</div>
                        <img src={down_arrow}></img>
                      </BudgetBox>
                      <div>~</div>
                      <BudgetBox>
                        <div>0</div>
                        <img src={down_arrow}></img>
                      </BudgetBox>
                      <div>원</div>
                    </div>
                    <BudgetCheckbox>
                      <input type="checkbox"></input>
                      <div>프로젝트 예산 조율이 가능합니다.</div>
                    </BudgetCheckbox>
                    <BudgetHelp>
                      <div>예산 측정이 어려우신가요?</div>
                    </BudgetHelp>
                  </Budget>
                </ContentBox>
                <ContentBox>
                  <ContentTitle>
                    <div>희망 납기일</div>
                  </ContentTitle>
                  <div>프로젝트 제품분야에 해당하는 항목들을 선택해주세요.</div>
                  <input style={{ width: "100%", height: 42 }}></input>
                  <DateCheckbox>
                    <input type="checkbox"></input>
                    <div>납기일 협의가 가능합니다.</div>
                  </DateCheckbox>
                </ContentBox>
                <ContentBox>
                  <ContentTitle>
                    <div>프로젝트 내용</div>
                    <img src={starred}></img>
                  </ContentTitle>
                  <div>
                    - 프로젝트 내용을 상세히 작성할수록 더 적합한 파트너를 만날
                    수 있습니다.
                  </div>
                  <img src={help_face}></img>
                  <input style={{ width: "100%", height: "433px" }}></input>
                </ContentBox>
              </Content>
              <FileUpload></FileUpload>
              <ContentBox>
                <ContentTitle>
                  <div>프로젝트 관련 파일</div>
                  <div>이미지 혹은 PDF 자료만 업로드가 가능합니다.</div>
                </ContentTitle>
                <InputComponent file={true} isOpen={true} />
              </ContentBox>
            </Body>
          </Containerv1>
        </Background>
      </>
    );
  }
}

export default ProjectRequest;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
  margin-bottom: 70px;
  text-align: center;
`;

const Title = styled.div`
  font-family: NotoSansCJKkr;
  font-size: 32px;
  font-weight: 500;
  color: #1e2222;
  margin-top: 20px;
`;

const Body = styled.div`
  width: 100%;
`;

const Content = styled.div``;

const ContentBox = styled.div`
  margin-bottom: 74px;
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PurposeBtn = styled.div``;

const Budget = styled.div`
  display: flex;
  flex-direction: column;
`;

const BudgetBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 204px;
  height: 42px;
  border-radius: 3px;
  border: solid 1px #c6c7cc;
`;

const BudgetCheckbox = styled.div`
  display: flex;
  justify-contet: flex-start;
`;

const BudgetHelp = styled.div``;

const DateCheckbox = styled.div`
  display: flex;
  justify-contet: flex-start;
`;

const FileUpload = styled.div``;
