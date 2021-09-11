import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import * as Title from "components/Title";

@inject("Partner", "Auth", "Common")
@observer
class TabBarCardContainer extends React.Component {
  render() {
    const { Partner } = this.props;

    return (
      <QnASection>
        <Font24 style={{ marginBottom: 34 }}>Q&A</Font24>

        <InnerBox style={{ justifyContent: "space-between" }}>
          <InnerBox style={{ gap: 12, alignItems: "center" }}>
            <img src="/static/images/partnercard/detailcard/Q.svg" />
            <div>비밀댓글 입니다.</div>
          </InnerBox>

          <InnerBox style={{ gap: 16 }}>
            <div>rhk***님</div>
            <div>날짜</div>
          </InnerBox>
        </InnerBox>

        <AnswerImg src="/static/images/partnercard/detailcard/answer.svg" />

        <BoundaryLine style={{ margin: "20px 0px 23px 0px" }} />

        <RequestBox>
          <Font16 style={{ color: "#282c36" }}>
            이 제조사가 마음에 드시나요? <RequestBtn>[견적 요청하기]</RequestBtn> 버튼을 눌러 지금 바로 프로젝트를 시작해보세요!
          </Font16>

          <div style={{ marginLeft: 64 }}>X</div>
        </RequestBox>

        <QnAWriteBoxContainer>
          <QnAWriteBox placeholder="궁금하신 내용이 있으신가요?" />

          <div style={{ display: "flex", justifyContent: "center" }}>
            <InnerBox
              style={{
                width: "95%",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <InnerBox style={{ alignItems: "center" }}>
                <input type="checkbox" />
                <Font12 style={{ margin: "4px 0px 0px 8px" }}>비밀글</Font12>
              </InnerBox>

              <QnAWriteBtn>작성하기</QnAWriteBtn>
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
  display: flex;
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

  :focus {
    outline: none;
  }
`;

const QnAWriteBtn = styled.button`
  width: 90px;
  height: 30px;
  text-align: center;
  border-radius: 19px;
  background-color: #0933b3;
  border: none;
  color: #ffffff;
  cursor: pointer;
`;

const AnswerImg = styled.img`
  width: 58px;
  height: 24px;
  margin: 16px 0px 0px 30px;
  cursor: pointer;
`;
