import React, { Component } from "react";
import styled, { css } from "styled-components";

import Container from "components/Container";
import * as Text from "components/Text";

import { PRIMARY, WHITE } from "static/style";

const topArrow = "/static/icon/top_arrow.png";

class ExpertContainer extends Component {
  state = {
    contents: [
      {
        id: 1,
        open: true,
        question: "1. 프로젝트에 지원하려면 어떻게 해야 하나요?",
        answer: "받으신 제품의뢰서에 따라 제품제안서를 보내주시면 됩니다.",
      },
      {
        id: 2,
        open: false,
        question: "2. 클라이언트가 파트너를 선정하는 기준이 무엇인가요?",
        answer: "프로젝트와 유사한 경험, 관련 포트폴리오, 리뷰 등이 있습니다.",
      },
      {
        id: 3,
        open: false,
        question:
          "3. 받은 제품의뢰서에 부족한 항목이나 수정되어야 할 항목이 있는 경우 어떻게 해야하나요?",
        answer:
          "제품의뢰서를 받은 후, 저희 볼트앤너트는 파트너스와 클라이언트를 동시에 컨택해 제품의뢰서를 보완해나갑니다. 이러한 피드백 과정에서 부족한 항목이나 수정되어야할 항목에 대한 의견을 주시면 됩니다.",
      },
      {
        id: 4,
        open: false,
        question: "4. 프로젝트 예상 금액, 기간은 어떻게 산정되는 건가요?",
        answer:
          "프로젝트의 예상 금액과 예상 기간은 클라이언트가 제시한 금액 및 기간입니다. 이러한 제품의뢰서의 항목들은 추후 피드백이 가능합니다.",
      },
      {
        id: 5,
        open: false,
        question:
          "5. 프로젝트에 지원하려면 클라이언트/파트너 중 어떤 유형으로 가입해야 하나요?",
        answer:
          "클라이언트에게 제품의뢰서를 받아 제품제안서를 보내고 싶으시다면, ‘파트너스’로 가입해주시면 됩니다.",
      },
      {
        id: 6,
        open: false,
        question: "6. 제품의뢰서를 보고 지원하고 싶지 않다면 어떻게 하나요?",
        answer: "지원하고 싶지 않으시다면, 별도로 회신해주지 않으시면 됩니다.",
      },
    ],
  };

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
      <Outer>
        <Container>
          {contents.map((content) => {
            return (
              <Card key={content.id}>
                <CardTitle open={content.open}>
                  {content.question}
                  <ArrowIcon
                    open={content.open}
                    src={topArrow}
                    onClick={() => this.toggleOpen(content.id)}
                  />
                </CardTitle>

                <CardBody open={content.open}>
                  <Text.FontSize16 color="#4d4f5c">
                    {content.answer}
                  </Text.FontSize16>
                </CardBody>
              </Card>
            );
          })}
        </Container>
      </Outer>
    );
  }
}

export default ExpertContainer;

const Outer = styled.div`
  background-color: #f5f5f5;
  padding: 50px 0;
`;
const Card = styled.div`
  margin-bottom: 3px;

  :nth-of-type(even) > div:nth-of-type(1) {
    background-color: #7a87a7;
    //background-color: #e4e6ed;
  }
  :nth-of-type(odd) > div:nth-of-type(1) {
    background-color: #7a87a7;
  }
`;
const CardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;
  color: ${WHITE};
  padding: 13px 22px;

  > p {
    line-height: 1.3em;
  }

  ${(props) =>
    props.open &&
    css`
      background-color: ${PRIMARY} !important;
    `}
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

const CardBody = styled.div`
  background-color: white;
  color: #4d4f5c;

  padding: 24px;
  border: 2px solid #e4e6ed;

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
