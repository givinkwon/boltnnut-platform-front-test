import React from "react";
import styled from "styled-components";

import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import InputComponent from "AddFile2";

import Buttonv1 from "components/Buttonv1";

const reqeustlogo = "./static/images/request/request_logo.svg";
const starred = "./static/images/request/star_red.svg";
const down_arrow = "./static/images/request/down_arrow.svg";
const help_face = "./static/images/request/help_face.svg";
const checkbox = "./static/images/request/checkbox.svg";

class ProjectRequest extends React.Component {
  render() {
    return (
      <>
        <Header>
          <img src={reqeustlogo} style={{ widht: 45, height: 45 }}></img>
          <Title>
            <span style={{ color: "#0933b3" }}>프로젝트 정보</span>를
            입력해주세요.
          </Title>
        </Header>
        <Body>
          <Requestontent>
            <RequestContentBox>
              <ContentTitle>
                <span>문의 목적</span>
                <img src={starred} style={{ marginLeft: 4 }}></img>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: "normal",
                    color: "#86888c",
                    marginLeft: 12,
                  }}
                >
                  (중복 선택 가능)
                </span>
              </ContentTitle>
              <PurposeBtn>
                <RequestButton style={{ border: "none", color: "#414550" }}>
                  <span>상담 요청</span>
                </RequestButton>
                <RequestButton>
                  <span>견적 요청</span>
                </RequestButton>
                <RequestButton>
                  <span>업체 수배</span>
                </RequestButton>
              </PurposeBtn>
            </RequestContentBox>
            <RequestContentBox>
              <ContentTitle>
                <div>프로젝트 제목</div>
                <img src={starred} style={{ marginLeft: 4 }}></img>
              </ContentTitle>
              <input
                style={{
                  width: "100%",
                  height: 42,
                  border: "solid 1px #c6c7cc",
                  borderRadius: 3,
                }}
              ></input>
            </RequestContentBox>
            <RequestContentBox>
              <ContentTitle>
                <div>희망 예산</div>
              </ContentTitle>
              <Budget>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    color: "#414550",
                  }}
                >
                  <BudgetBox>
                    <span>0</span>
                    <img src={down_arrow}></img>
                  </BudgetBox>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 16,
                    }}
                  >
                    ~
                  </span>
                  <BudgetBox style={{ marginLeft: 16 }}>
                    <span>0</span>
                    <img src={down_arrow}></img>
                  </BudgetBox>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 16,
                    }}
                  >
                    원
                  </span>
                </div>
                <BudgetCheckbox>
                  <img src={checkbox}></img>
                  <span style={{ marginLeft: 8 }}>
                    프로젝트 예산 조율이 가능합니다.
                  </span>
                </BudgetCheckbox>
                <BudgetHelp>
                  <span>예산 측정이 어려우신가요?</span>
                </BudgetHelp>
              </Budget>
            </RequestContentBox>
            <RequestContentBox>
              <ContentTitle style={{ marginBottom: 4 }}>
                <span>희망 납기일</span>
              </ContentTitle>
              <span
                style={{
                  fontSize: 16,
                  color: "#505050",
                }}
              >
                프로젝트 제품분야에 해당하는 항목들을 선택해주세요.
              </span>
              <input style={{ width: "100%", height: 42 }}></input>
              <DateCheckbox>
                <input type="checkbox"></input>
                <span>납기일 협의가 가dwdw능합니다.</span>
              </DateCheckbox>
            </RequestContentBox>
            <RequestContentBox>
              <ContentTitle>
                <span>프로젝트 내용</span>
                <img src={starred}></img>
              </ContentTitle>
              <span>
                - 프로젝트 내용을 상세히 작성할수록 더 적합한 파트너를 만날 수
                있습니다.
              </span>
              <img src={help_face}></img>
              <input style={{ width: "100%", height: "433px" }}></input>
            </RequestContentBox>
          </Requestontent>
          <FileUpload></FileUpload>
          <RequestContentBox>
            <ContentTitle>
              <span>프로젝트 관련 파일</span>
              <span>이미지 혹은 PDF 자료만 업로드가 가능합니다.</span>
            </ContentTitle>
            <InputComponent file={true} isOpen={true} />
          </RequestContentBox>
        </Body>
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
  font-family: NotoSansCJKkr;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 500;
  color: #1e2222;
  margin-top: 20px;
`;

const Body = styled.div``;

const Content = styled.div``;

const ContentBox = styled.div`
  margin-bottom: 74px;
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  color: #1e2222;
  margin-bottom: 16px;
`;

const PurposeBtn = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 42px;
  border-radius: 30px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  border: solid 1px #0933b3;
  background-color: #ffffff;
  margin-right: 16px;
  font-size: 16px;
  color: #0933b3;
  letter-spacing: -0.4px;
`;

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
  margin-right: 16px;
`;

const BudgetCheckbox = styled.div`
  display: flex;
  justify-contet: flex-start;
  margin-top: 11px;
  font-size: 15px;
  line-height: 2.27;
  letter-spacing: -0.38px;
  color: #505050;
`;

const BudgetHelp = styled.div`
  display: flex;
  justify-content: flex-start;
  algin-items: center;
  font-size: 15px;
  letter-spacing: -0.38px;
  color: #0933b3;
`;

const DateCheckbox = styled.div`
  display: flex;
  justify-contet: flex-start;
`;

const FileUpload = styled.div``;
