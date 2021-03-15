
import React, {Component} from "react";
import styled, {css} from 'styled-components';

import Container from "../../components/Container";
import * as Text from 'components/Text';

import {PRIMARY, WHITE} from "../../static/style";

const topArrow = '/static/icon/top_arrow.png';


class ClientContainer extends Component {
  state = {
    contents: [
      {
        id: 1,
        open: true,
        question: '1. 프로젝트를 의뢰하려면 클라이언트/파트너 중 어떤 유형으로 가입해야 하나요?',
        answer: "'클라이언트'와 '파트너' 각 계정을 따로 가입해 활동할 수 있습니다. " +
          "'클라이언트'로 가입하시면 프로젝트를 의뢰하고 파트너를 찾으실 수 있습니다.",
      },
      {
        id: 2,
        open: false,
        question: '2. 서비스 이용 절차를 알려주세요.',
        answer: "▶의뢰서 작성 – 자동 견적 제공 – 전문 컨설턴트와 상세 상담 – 프로젝트 정식 견적서 제공  – 계약 진행 시 프로세스 안내 – 개발/생산 및 납품" +
          "① 클라이언트께서 의뢰서를 작성해주시면 볼트앤너트 AI 알고리즘이 바로 가견적을 안내해드립니다. \n" +
          "② 가견적을 확인 후에 정확한 견적을 알고 싶다면 볼트앤너트 전문 컨설턴트에게 무료 상담을 받아보세요\n" +
          "③ 무료 상담 이후 프로젝트의 기획안에 따라 정확한 견적과 기간을 안내드립니다. 볼트앤너트 PM이 프로젝트를 관리합니다.\n" +
          "④ 볼트앤너트 엔지니어링 팀과 적합한 전문 제조사의 협업을 통해 의뢰하신 프로젝트를 수행합니다.\n" +
          "⑤ 개발/생산이 완료되면 프로세스에 따라 안내드립니다."
      },
      {
        id: 3,
        open: false,
        question: '3. 이용요금은 얼마인가요?',
        answer: "클라이언트와 파트너 모두 이용요금을 별도로 부과하고 있지는 않습니다.\n" +
          "모든 프로젝트는 볼트앤너트가 관리 책임의 의무를 지며, 제시된 프로젝트 견적 이외의 추가 비용을 부과하지 않습니다.\n"
      },
      {
        id: 4,
        open: false,
        question: '4. 프로젝트 의뢰는 어떻게 하나요?',
        answer: "무료로 견적 받기 버튼을 눌러 의뢰서를 작성해주세요. 짧은 질문을 통해 가견적을 안내드립니다. 정확한 가견적을 위한 무료 상담과 생산을 위한 무료 도면 서비스도 이용하실 수 있습니다."
      },
      {
        id: 5,
        open: false,
        question: '5. 프로젝트 내용이 외부로 유출되면 안되는 경우에는 어떻게 하나요?',
        answer: "프로젝트의 내용은 외부로 공개되지 않습니다. NDA 등을 작성을 원하시면 상담 신청을 통해 작성이 가능합니다" 
      },
      {
        id: 6,
        open: false,
        question: "6. 진행 프로젝트의 후기를 쓰려면 어떻게 하나요?",
        answer: "볼트앤너트에서 진행한 프로젝트는 사이트 상단의 [프로젝트목록]에서 확인하실 수 있습니다. 해당 프로젝트에서 리뷰를 작성해보세요. \n"
      },
      {
        id: 7,
        open: false,
        question: '7. 사업자가 아닌 개인도 프로젝트를 의뢰할 수 있나요?',
        answer: "네. 사업자, 개인 모두 상관없이 의뢰하실 수 있습니다."
      },
      {
        id: 8,
        open: false,
        question: '8. 프로젝트의 예상 기간, 지출 가능 예산을 작성하기 어렵습니다.',
        answer: "희망 비용과 기간의 경우 원하시는 기간을 자유롭게 작성하시면 됩니다."
      },
      {
        id: 9,
        open: false,
        question: '9. 방문 또는 전화 상담으로 의뢰가 가능한가요?',
        answer: "모두 가능하나 의뢰서를 작성해주시는 것이 더욱 정확한 상담을 도와드릴 수 있습니다."
      },
      {
        id: 10,
        open: false,
        question: '10. 등록 시 업로드한 자료가 외부에 공개되나요?',
        answer: "아닙니다. 등록해주신 자료들은 프로젝트 관리에만 활용되는 자료일 뿐 따로 외부에 공개되지는 않습니다."
      },
      {
        id: 11,
        open: false,
        question: '11. 일정이 변경돼서 프로젝트를 보류하고 싶어요.',
        answer: "계약 이전이라면 담당 컨설턴트, 계약 이후라면 배정된 담당 PM 분과 협의하여 계약 진행 시기를 조율할 수 있습니다. "
      },
      {
        id: 12,
        open: false,
        question: '12. 미팅 시 금액, 기간이 재산정될 수 있나요?',
        answer: "네. 가견적은 작성해주신 기본 정보를 바탕으로 도출되는 것으로 미팅 시 세부사항에 따라 금액과 기간이 달라질 수 있습니다."
      },
      {
        id: 13,
        open: false,
        question: '13. 미팅 시에는 뭘 준비해야 하나요?',
        answer: "무료 상담 시에는 정확한 견적 도출 및 해당 프로젝트 진행 프로세스에 대해 안내드립니다.\n" +
          "무료 상담 신청 시 카카오톡으로 상담 의뢰서를 보내드리며, 해당 서류를 작성하여 미팅 시에 구비하시면 됩니다.\n" +
          "더불어, 관련 자료를 지참해주시면 더욱 원활하고 효율적인 미팅이 되실 수 있을 것입니다.",
      },
      {
        id: 14,
        open: false,
        question: '14. 오프라인 미팅은 어디서 진행되나요?',
        answer: "오프라인 미팅은 볼트앤너트 사무실에서 진행되게 됩니다.",
      },
      {
        id: 15,
        open: false,
        question: '15. 미팅 시 이용요금이 발생하나요?',
        answer: "발생하지 않습니다. 볼트앤너트를 이용할 시 클라이언트께서 따로 내시는 이용요금은 없습니다."
      },
      {
        id: 16,
        open: false,
        question: '16. 상담 미팅은 어떻게 취소하나요?',
        answer: "온라인 상에서 상담 취소는 어려우며, 볼트앤너트 홈페이지 하단의 전화번호 혹은 이메일로 따로 연락을 주시면 해결해드립니다."
      },
      {
        id: 17,
        open: false,
        question: '17. 계약 시 별도의 이용요금이 발생하나요?',
        answer: "발생하지 않습니다. 볼트앤너트를 이용할 시 클라이언트께서 따로 내시는 이용요금은 없습니다."
      },
      {
        id: 18,
        open: false,
        question: '18. 프로젝트 진행 도중 계약 내용을 변경해야 할 경우 어떻게 해야 하나요?',
        answer: "담당 PM과 협의 하에 내용 변경이 가능합니다."
      },
    ]
  }

  toggleOpen = (id) => {
    const {contents} = this.state

    console.log(id);

    this.setState({
      ...this.state,
      contents: contents.map(
        (content) => {
          return content.id === id
            ? {...content, open: !content.open}
            : content
        }
      )
    })
  }

  render() {
    const {contents} = this.state

    return (
      <Outer>
        <Container>
          {
            contents.map(content => {
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
              )
            })
          }
        </Container>
      </Outer>
    );
  }
}

export default ClientContainer;

const Outer = styled.div`
  background-color: #f5f5f5;
  padding: 50px 0;
`
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

  ${props => props.open && css`
     background-color: ${PRIMARY} !important;
  `}
`;
const ArrowIcon = styled.img`
  cursor: pointer;
  transition: 0.5s;
 
  ${props => !props.open && css`
    transform: rotate(180deg);
  `}
`

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
  ${props => !props.open && css`
    height: 0;
    padding: 0;
    overflow: hidden;
  `};
  
`;
