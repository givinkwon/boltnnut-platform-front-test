import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Router from "next/router";
import * as PartnerAPI from "axios/Manufacture/Partner";
import * as Title from "components/Title";

@inject("Partner", "Auth", "Common", "Request")
@observer
class TabBarCardContainer extends React.Component {
  state = {
    RequestBoxState: true,
    AnswerBoxState: false,
    RequestBoxText: "",
    RequestSecret: 0,
    RequestSecretChecked: false,
  };

  // 문의내용 핸들러 함수
  onChangeRequestBoxText = (e) => {
    this.setState({ ...this.state, RequestBoxText: e.target.value });
  };

  // 비밀글 버튼 핸들러 함수
  onClickSecretBoxHandler() {
    if (!this.state.RequestSecretChecked) {
      this.setState({ ...this.state, RequestSecretChecked: true, RequestSecret: 1 });
    }

    if (this.state.RequestSecretChecked) {
      this.setState({ ...this.state, RequestSecretChecked: false, RequestSecret: 0 });
    }
  }

  // 작성하기 버튼 submit 함수
  onSubmitRequest() {
    const { Partner, Auth } = this.props;

    if (Auth.logged_in_client) {
      const client = Auth.logged_in_client.id;
      const secret = this.state.RequestSecret;
      const content = this.state.RequestBoxText;

      Partner.setQuestion(client, null, null, null, secret, content);

      this.setState({ RequestBoxText: "" });
      this.setState({ RequestSecret: 0 });
      this.setState({ RequestSecretChecked: false });
    }

    if (Auth.logged_in_partner) {
      const partner = Auth.logged_in_partner.id;
      const secret = this.state.RequestSecret;
      const content = this.state.RequestBoxText;

      Partner.setQuestion(null, partner, null, null, secret, content);

      this.setState({ RequestBoxText: "" });
      this.setState({ RequestSecret: 0 });
      this.setState({ RequestSecretChecked: false });
    }
  }

  // 답글내용 버튼 핸들러 함수
  onClickAnswerBtn() {
    if (this.state.AnswerBoxState) {
      this.setState({ ...this.state, AnswerBoxState: false });
    } else {
      this.setState({ ...this.state, AnswerBoxState: true });
    }
  }

  // 견적 요청하기 버튼 핸들러 함수
  onClickRequestBtn() {
    const { Request } = this.props;

    Request.requestTabIdx = 1;
    Router.push("/request");
  }

  // 견적요청 박스 핸들러 함수
  RequestBoxCloseHandler() {
    if (this.state.RequestBoxState) {
      this.setState({ RequestBoxState: false });
    }
  }

  // 페이지 이동 시 상태 초기화
  componentWillUnmount() {
    this.setState({ RequestBoxState: true });
    this.setState({ AnswerBoxState: false });
    this.setState({ RequestBoxText: "" });
    this.setState({ RequestSecret: 0 });
    this.setState({ RequestSecretChecked: false });
  }

  render() {
    return (
      <QnASection>
        <Font24 style={{ marginBottom: 34 }}>Q&A</Font24>

        {/* QnA없을 경우 */}
        {/* <NoneQnABox>
          <Font16 style={{ color: "#282c36" }}>아직 작성된 Q&A가 없습니다.</Font16>
        </NoneQnABox> */}

        <InnerBox style={{ justifyContent: "space-between" }}>
          <InnerBox style={{ gap: 12, alignItems: "center" }}>
            <img src="/static/images/partnercard/detailcard/Q.svg" />
            <Font16 style={{ color: "#1e2222" }}>비밀댓글 입니다.</Font16>
          </InnerBox>

          <InnerBox style={{ gap: 16 }}>
            <Font16 style={{ color: "#555963" }}>rhk***님</Font16>
            <Font16 style={{ color: "#555963" }}>2021.05.30</Font16>
          </InnerBox>
        </InnerBox>

        <AnswerImg src="/static/images/partnercard/detailcard/answer.svg" onClick={() => this.onClickAnswerBtn()} />

        <InnerBox style={{ gap: 12, alignItems: "center", justifyContent: "space-between", marginTop: 17 }}>
          <InnerBox style={{ gap: 12 }}>
            <img src="/static/images/partnercard/detailcard/A.svg" />
            <Font16 style={{ color: "#1e2222" }}>답변내용</Font16>
          </InnerBox>

          <InnerBox style={{ gap: 16 }}>
            <Font16 style={{ color: "#0933b3", fontWeight: 500 }}>제조사이름</Font16>
            <Font16 style={{ color: "#555963" }}>2021.05.30</Font16>
          </InnerBox>
        </InnerBox>

        <BoundaryLine style={{ margin: "20px 0px 16px 0px" }} />

        {/* 답글달기 박스 */}
        <AnswerInnerBox active={this.state.AnswerBoxState}>
          <AnswerLineImg src="/static/images/partnercard/detailcard/L.png" />

          <AnswerBoxContainer style={{ marginTop: 0, width: 715 }}>
            <AnswerBox placeholder="rhk***님에게 답글 달기" />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <InnerBox
                style={{
                  width: "95%",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <InnerBox style={{ alignItems: "center" }}>
                  <input type="checkbox" style={{ width: 18, height: 18 }} />
                  <Font12 style={{ margin: "4px 0px 0px 8px" }}>비밀글</Font12>
                </InnerBox>

                <AnswerBtn>작성하기</AnswerBtn>
              </InnerBox>
            </div>
          </AnswerBoxContainer>
        </AnswerInnerBox>

        <RequestBox active={this.state.RequestBoxState}>
          <Font16 style={{ color: "#282c36" }}>
            이 제조사가 마음에 드시나요? <RequestBtn onClick={() => this.onClickRequestBtn()}>[견적 요청하기]</RequestBtn> 버튼을 눌러 지금 바로 프로젝트를
            시작해보세요!
          </Font16>

          <CloseImg src="/static/images/partnercard/detailcard/X.svg" onClick={() => this.RequestBoxCloseHandler()} />
        </RequestBox>

        <QnAWriteBoxContainer>
          <QnAWriteBox placeholder="궁금하신 내용이 있으신가요?" value={this.state.RequestBoxText} onChange={this.onChangeRequestBoxText} />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <InnerBox
              style={{
                width: "95%",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <InnerBox style={{ alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={this.state.RequestSecretChecked}
                  style={{ width: 18, height: 18 }}
                  onClick={() => {
                    this.onClickSecretBoxHandler();
                  }}
                />
                <Font12 style={{ margin: "4px 0px 0px 8px" }}>비밀글</Font12>
              </InnerBox>

              <QnAWriteBtn onClick={() => this.onSubmitRequest()}>작성하기</QnAWriteBtn>
            </InnerBox>
          </div>
        </QnAWriteBoxContainer>
      </QnASection>
    );
  }
}

export default TabBarCardContainer;

// Font && Common
const Font12 = styled(Title.FontSize12)`
  font-family: NotoSansCJKkr;
  font-weight: normal;
  text-align: center;
  color: #282c36;
`;

const Font16 = styled(Title.FontSize16)`
  font-family: NotoSansCJKkr;
  color: #000000;
  font-weight: normal;
  margin-top: 4px;
  line-height: 1.5;
  letter-spacing: -0.4px;
`;

const Font24 = styled(Title.FontSize24)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
`;

const InnerBox = styled.div`
  display: flex;
`;

const BoundaryLine = styled.div`
  width: 792px;
  border: 1px solid #eeeeee;
`;
// --------------------------------------------------------------------------------

const RequestBox = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 792px;
  height: 62px;
  border-radius: 5px;
  border: solid 1px #c6c7cc;
  background-color: #f6f6f6;
`;

const RequestBtn = styled.span`
  font-weight: bold;
  color: #0933b3;
  cursor: pointer;
`;

const QnASection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 140px;
`;

const QnAWriteBoxContainer = styled.div`
  height: 250px;
  margin-top: 24px;
  margin-bottom: 24px;
  border-radius: 2px;
  border: solid 1px #c6c7cc;
`;

const QnAWriteBox = styled.textarea`
  width: 770px;
  height: 176px;
  border: none;
  resize: none;
  padding: 20px 0px 0px 20px;
  border-top: 0px;
  border-bottom: 1px solid #c6c7cc;
  border-right: 0px;
  border-left: 0px;

  ::placeholder {
    font-family: NotoSansCJKkr;
    font-size: 16px;
    color: #c6c7cc;
  }

  :focus {
    outline: none;
  }
`;

const QnAWriteBtn = styled.button`
  width: 98px;
  height: 38px;
  text-align: center;
  border-radius: 19px;
  background-color: #0933b3;
  border: none;
  color: #ffffff;
  cursor: pointer;
  line-height: 1.5;
  letter-spacing: -0.4px;
  font-size: 16px;
`;

const AnswerImg = styled.img`
  width: 58px;
  height: 24px;
  cursor: pointer;
  margin: 16px 0px 0px 30px;
`;

const CloseImg = styled.img`
  margin-top: 4px;
  margin-left: 64px;
  cursor: pointer;
`;

const NoneQnABox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 792px;
  height: 72px;
  margin-bottom: 12px;
  background-color: #f6f6f6;
`;

const AnswerLineImg = styled.img`
  width: 26px;
  height: 26px;
  margin-left: 31px;
  margin-right: 20px;
  border: none;
`;

const AnswerBoxContainer = styled.div`
  height: 250px;
  margin-top: 24px;
  margin-bottom: 24px;
  border-radius: 2px;
  border: solid 1px #c6c7cc;
`;

const AnswerBox = styled.textarea`
  width: 695px;
  height: 176px;
  border: none;
  resize: none;
  padding: 20px 0px 0px 20px;
  border-top: 0px;
  border-bottom: 1px solid #c6c7cc;
  border-right: 0px;
  border-left: 0px;

  ::placeholder {
    font-family: NotoSansCJKkr;
    font-size: 16px;
    color: #c6c7cc;
  }

  :focus {
    outline: none;
  }
`;

const AnswerInnerBox = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
`;

const AnswerBtn = styled.button`
  width: 98px;
  height: 38px;
  text-align: center;
  border-radius: 19px;
  background-color: #0933b3;
  border: none;
  color: #ffffff;
  cursor: pointer;
  line-height: 1.5;
  letter-spacing: -0.4px;
  font-size: 16px;
`;
