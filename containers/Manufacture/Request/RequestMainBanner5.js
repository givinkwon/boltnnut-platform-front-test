import React, { Component } from "react";
import styled, { css } from "styled-components";

import Container from "components/Containerv1";
import Background from "components/Background";
import * as Text from "components/Text";

const arrow_bottom = "static/images/request/arrow_bottom.svg";


class RequestMain extends React.Component {
  state = {
    contents: [
      {
        id: 1,
        open: false,
        question:
          "볼트앤너트 의뢰 방식이 두 가지인 이유는 무엇인가요?",
        answer:
          "볼트앤너트의 의뢰 방식은 두 가지로, '프로젝트 등록'과 '제조사에 직접 의뢰하는 경우'가 있습니다.\n" +
          "전자는 제조사에게 의뢰를 받는 경우, 후자는 제조사에게 직접 의뢰를 하는 것이 적합합니다."
      },
      {
        id: 2,
        open: false,
        question: "프로젝트 등록 시 정보가 유출될 우려는 없나요?",
        answer:
          "의뢰 시 정보 공개/비공개 여부를 정할 수 있어 선별된 파트너에게만 정보를 공개할 수 있습니다.\n" +
          "따라서 공개를 원하지 않는 정보가 유출될 위험은 없습니다."
      },
      {
        id: 3,
        open: false,
        question: "프로젝트 등록 이후 수정 및 삭제는 어떻게 하나요?",
        answer:
          "프로젝트의 수정 및 삭제는 [마이페이지]-[내 프로젝트]-[프로젝트 수정/종료] 버튼에서 가능합니다.\n" 
      },
      {
        id: 4,
        open: false,
        question: "볼트앤너트 유선 상담 시에는 어떤 도움을 받을 수 있나요?",
        answer:
          "해당 프로젝트에 배정된 프로젝트 매니저에게 제품에 대해 간단히 설명해주시면, 볼트앤너트의 업체 수배 프로세스를 통해 가장 알맞은 업체와 견적을 선별해드립니다.",
      },
      {
        id: 5,
        open: false,
        question:
          "의뢰 서비스를 이용하려면 별도의 비용이 필요한가요?",
        answer:
          "볼트앤너트 의뢰 서비스는 무료이며, 프로젝트 계약 후 요청 업무 범위에 따라 추가 비용이 발생할 수 있습니다.",
      },
    ],
  };
  
  // 드랍다운
  toggleOpen = (id) => {
    const { contents } = this.state;

    console.log(id);

    this.setState({
      ...this.state,
      contents: contents.map((content) => {
        return content.id === id
          ? { ...content, open: !content.open }
          : content;
      }),
    });
  };

  render() {
    const { contents } = this.state;
    return (
      <Background>
        <Container>
          <Body>
            <Header>자주 묻는 클라이언트 질문</Header>
            {contents.map((content) => {
              return (
                <QnABox key={content.id}>
                <QnATitle open={content.open}>
                  <span style={{color: "#174aee",fontWeight: "bold",marginRight: 14,}}>Q</span>{content.question}
                  <ArrowIcon
                    style={{marginLeft: "auto"}}
                    open={content.open}
                    src={arrow_bottom}
                    onClick={() => this.toggleOpen(content.id)}
                  />
                </QnATitle>

                <QnABody open={content.open}>
                  <Text.FontSize16 color="#4d4f5c">
                    {content.answer}
                  </Text.FontSize16>
                </QnABody>
              </QnABox>
              )}
            )}
          </Body>
        </Container>
      </Background>
    );
  }
}

export default RequestMain;

const Body = styled.div`
  width: 100%;
  height: 893px;
  display: flex;
  margin-bottom: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
`;

const Header = styled.span`
  font-size: 32px;
  line-height: 2.5;
  letter-spacing: -0.8px;
  color: #000;
`;

const QnABox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 80px;
`;

const QnATitle = styled.div`
  display: flex;
  font-size: 19px;
  line-height: 4.21;
  letter-spacing: -0.48px;
  color: #1e2222;
  padding-right: 32px;
  padding-left: 30px;
  cursor: pointer;
  &:hover {
    border-radius: 10px;
    background-color: #edf4fe;
  }
`;

const QnABody = styled.div`
  background-color: white;
  color: #4d4f5c;

  padding: 24px;
  > p {
    line-height: 1.5em;
  }

  transition: 0.5s;
  transition-property: height;
  ${(props) =>
    !props.open &&
    css`
      height: 0;
      padding: 0;
      overflow: hidden;
    `};
`;


const ArrowIcon = styled.img`
  cursor: pointer;
  transition: 0.5s;

  ${(props) =>
    !props.open &&
    css`
      transform: rotate(180deg);
    `}
`;