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
        question: "볼트앤너트 문의 방식이 두 가지인 이유는 무엇인가요?",
        answer:
          "볼트앤너트의 문의 방식은 두 가지로, '제조 문의'과 '제조사에 직접 의뢰하는 경우'가 있습니다.\n" +
          "전자는 모든 제조사에게 제조 문의를 보내고자하는 경우, 후자는 특정 제조사에게 직접 의뢰를 하는 것이 적합합니다.",
      },
      {
        id: 2,
        open: false,
        question: "제조 문의 등록 시 정보가 유출될 우려는 없나요?",
        answer:
          "의뢰 시 정보 공개/비공개 여부를 정할 수 있어 선별된 파트너에게만 정보를 공개할 수 있습니다.\n" +
          "따라서 공개를 원하지 않는 정보가 유출될 위험은 없습니다.",
      },
      {
        id: 3,
        open: false,
        question: "제조 문의 이후 수정 및 삭제는 어떻게 하나요?",
        answer:
          "제조 문의의 수정 및 삭제는 [마이페이지]-[내 제조 문의]-[제조 문의 수정/종료] 버튼에서 가능합니다.\n",
      },
      {
        id: 4,
        open: false,
        question: "볼트앤너트 유선 상담 시에는 어떤 도움을 받을 수 있나요?",
        answer:
          "해당 제조 문의에 배정된 프로젝트 매니저에게 제품에 대해 간단히 설명해주시면, 볼트앤너트의 업체 수배 프로세스를 통해 가장 알맞은 업체와 견적을 선별해드립니다.",
      },
      {
        id: 5,
        open: false,
        question: "제조 문의 서비스를 이용하려면 별도의 비용이 필요한가요?",
        answer:
          "볼트앤너트 제조 문의 서비스는 무료이며, 매칭된 제조사와 계약 후 요청 업무 범위에 따라 추가 비용이 발생할 수 있습니다.",
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
  font-size: 32px;
  line-height: 2.5;
  letter-spacing: -0.8px;
  color: #000;
  margin-top: 140px;
  margin-bottom: 80px;
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
  color: #1e2222;
  padding-right: 32px;
  padding-left: 30px;
  cursor: pointer;
  &:hover {
    border-radius: 10px;
    background-color: #edf4fe;
  }
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
