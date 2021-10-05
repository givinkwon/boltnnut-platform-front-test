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
        question: "AI 견적 알고리즘은 어떻게 작동하나요?",
        answer:
          "AI 견적 알고리즘은 도면 파일의 형상학적 특징을 인식하고 가공 시간과 견적을 도출합니다.\n" +
          "3000 개 이상의 Training set을 학습하여 온라인 발주 서비스를 제공할 수 있습니다.",
      },
      {
        id: 2,
        open: false,
        question: "발주 전에 문의하고 싶은 사항이 있는데, 어떻게 해야하나요?",
        answer:
          "하단에 기재된 볼트앤너트 고객센터로 문의주세요. 볼트앤너트 프로젝트 매니저가 상담 후 발주를 도와드립니다.",
      },
      {
        id: 3,
        open: false,
        question: "발주 후 모니터링은 어떻게 하나요?",
        answer:
          "발주 요청부터 납품까지 생산 과정을 빠짐 없이 보고드립니다.",
      },
      {
        id: 4,
        open: false,
        question: "볼트앤너트 유선 상담 시에는 어떤 도움을 받을 수 있나요?",
        answer:
          "해당 발주에 배정된 프로젝트 매니저에게 이슈 사항에 대해 간단히 설명해주시면, 그에 알맞은 제조 상담을 해드립니다.",
      },
      {
        id: 5,
        open: false,
        question: "제조 문의 서비스를 이용하려면 별도의 비용이 필요한가요?",
        answer:
          "볼트앤너트 자동 견적 서비스는 무료이며, 결제한 발주 견적 이외의 비용은 부과되지 않습니다.",
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
          : {...content, open: false};
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
                <QnABox key={content.id} onClick={() => this.toggleOpen(content.id)}>
                  <QnATitle open={content.open}>
                    <span
                      style={{
                        color: "#174aee",
                        fontWeight: "bold",
                        marginRight: 14,
                      }}
                    >
                      Q
                    </span>
                    {content.question}
                    <ArrowIcon
                      style={{ marginLeft: "auto" }}
                      open={content.open}
                      src={arrow_bottom}
                    />
                  </QnATitle>

                  <QnABody open={content.open}>
                    <Text.FontSize16 color="#4d4f5c">
                      {content.answer}
                    </Text.FontSize16>
                  </QnABody>
                </QnABox>
              );
            })}
          </Body>
        </Container>
      </Background>
    );
  }
}

export default RequestMain;

const Body = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 100px;
  }
`;

const Header = styled.span`
  font-size: 20px;
  line-height: 2.5;
  color: #000;
  font-weight: 700;
  margin-top: 140px;
  margin-bottom: 42px;
`;

const QnABox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
`;

const QnATitle = styled.div`
  display: flex;
  font-size: 19px;
  line-height: 4.21;
  letter-spacing: -0.48px;
  margin-left : 14px;
  margin-right : 14px;
  color: #1e2222;
  cursor: pointer;
  &:hover {
    border-radius: 10px;
    background-color: #edf4fe;
  }
  @media (min-width: 0px) and (max-width: 449.98px) {
    font-size: 12px;

  }
  @media (min-width: 450px) and (max-width: 767.98px) {
    font-size : 14px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
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
      visibility: hidden;
    `};
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
    margin-left: 5%;
    margin-right: 5%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`;

const ArrowIcon = styled.img`
  cursor: pointer;
  transition: 0.5s;

  ${(props) =>
    props.open &&
    css`
      transform: rotate(180deg);
    `}
`;
