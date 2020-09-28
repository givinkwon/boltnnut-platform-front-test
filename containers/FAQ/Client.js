
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
        answer: "'클라이언트'와 '파트너스' 각 계정을 따로 가입해 활동할 수 있습니다. " +
          "'클라이언트'로 가입하시면 프로젝트를 의뢰하고 파트너스를 찾으실 수 있습니다.",
      },
      {
        id: 2,
        open: false,
        question: '2. 서비스 이용 절차를 알려주세요.',
        answer: "▶제품의뢰서 작성 – 볼트앤너트미팅/제품의뢰서 검토 – 파트너스(제조사)확인/제품의뢰서 검토 – 파트너스 제안서 및 견적서 송부 – 클라이언트 파트너와의 통화 후 미팅 여부 결정 – 클라이언트&파트너스미팅◀\n" +
          "① 클라이언트께서 제품의뢰서를 작성해주시면 이를 바탕으로 볼트앤너트와 미팅을 가지며 함께 제품의뢰서를 검토합니다.\n" +
          "② 이후 파트너스(제조업체)를 제품의뢰서를 보내드리며 추가적으로 필요한 내용에 대해 제품의뢰서를 수정해나갑니다.\n" +
          "③ 이를 바탕으로 파트너스가 작성한 제안서와 견적서를 클라이언트께 송부해드립니다.\n" +
          "④ 제안서를 바탕으로 클라이언트와 파트너스께서 자체적으로 전화 후 미팅 결정을 합니다.\n" +
          "⑤ 미팅을 결정하시면 미팅 완료 후, 계약을 성사할 시 계약서를 제공해드립니다."
      },
      {
        id: 3,
        open: false,
        question: '3. 이용요금은 얼마인가요?',
        answer: "저희는 제품 제작에 대한 수수료를 30% 이상 요구하는 여타 중개 업체들과는 다르게 고객분들에게 수수료를 일체 받지 않습니다.\n" +
          "대신 저희는 고객분들의 가격부담을 최소한으로 하기 위해 제조사측에 고객미팅비용을 부과하고 있습니다.\n" +
          "즉, 클라이언트께선 별도의 수수료를 내지 않으셔도 됩니다."
      },
      {
        id: 4,
        open: false,
        question: '4. 프로젝트 의뢰는 어떻게 하나요?',
        answer: "클라이언트(의뢰자) 계정으로 로그인을 하신 후, 무료로 의뢰하기 버튼을 눌러 제품의뢰서를 작성해주세요. 볼트앤너트가 함께 의뢰서 작성을 도와드리고 추후 맞춤으로 파트너스를 연결해드립니다."
      },
      {
        id: 5,
        open: false,
        question: '5. 프로젝트 내용이 외부로 유출되면 안되는 경우에는 어떻게 하나요?',
        answer: "프로젝트의 내용은 볼트앤너트와의 상담 이후 홈페이지에 공개됩니다. 사이트상에 공개되는 프로젝트 정보는 작업자들이 업무를 이해할 수 있도록 최소한의 내용만 공개됩니다. 자세한 업무 범위는 계약 전 미팅을 통해 논의하실 수 있습니다."
      },
      {
        id: 6,
        open: false,
        question: '6. 이전 프로젝트들의 후기를 보려면 어떻게 하나요?',
        answer: "볼트앤너트의 이전 프로젝트는 사이트 상단의 [프로젝트목록]에서 확인하실 수 있습니다. \n"
          + "프로젝트 목록 바로 가기 : https://www.boltnnut.com/project/"
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
        question: '8. 의뢰서 작성 없이 파트너스에게 연락하거나 프로젝트 의뢰를 할 수 있나요?',
        answer: "직접적으로 파트너와 컨택하거나 프로젝트를 의뢰할 수 있는 기능은 없습니다. 원활한 제품제조를 위해 제품의뢰서를 작성 한 후, 볼트앤너트가 추천해드리는 파트너스와 연락하실 수 있습니다."
      },
      {
        id: 9,
        open: false,
        question: '9. 프로젝트의 예상 기간, 지출 가능 예산을 작성하기 어렵습니다.',
        answer: "아직 정해진 부분이 있으시면 작성하지 않으셔도 괜찮으나, 비용 범위는 반드시 생각을 해주셔야 합니다. 만약 생각해두신 예산이 없으시다면 먼저 볼트앤너트 시제품제작서비스를 추천해드립니다."
      },
      {
        id: 10,
        open: false,
        question: '10. 방문 또는 전화 상담으로 의뢰가 가능한가요?',
        answer: "전화로 가능합니다. 전화로 제품의뢰서를 작성한 후 추후 맞춤 연결을 해드립니다."
      },
      {
        id: 11,
        open: false,
        question: '11. 등록 시 업로드한 자료가 외부에 공개되나요?',
        answer: "아닙니다. 등록해주신 자료들은 파트너스 매칭에 이용되는 자료일 뿐 따로 외부에 공개되지는 않습니다."
      },
      {
        id: 12,
        open: false,
        question: '12. 프로젝트 정보가 외부에 유출되는 것을 원하지 않습니다.',
        answer: "프로젝트의 정보는 볼트앤너트와의 상담 이후 노출 여부가 결정됩니다.\n" +
          "공개를 원하지 않으실 경우 사이트에 게시해드리지 않습니다."
      },
      {
        id: 13,
        open: false,
        question: '13. 제품의뢰서를 작성하면 파트너들에게 알림이 가나요?',
        answer: "네 맞습니다. 제품의뢰서를 작성하시면 맞춤 파트너스에게 알림이 갑니다.\n" +
          "보내주신 제품의뢰서에 따라 파트너스는 제안서를 보내드리게 됩니다."
      },
      {
        id: 14,
        open: false,
        question: '14. 일정이 변경돼서 프로젝트를 보류하고 싶어요.',
        answer: "플랫폼 사이트 상에서 일정 변경은 불가능하나, 추후 파트너스와의 미팅에서 일정 변경이 가능합니다. "
      },
      {
        id: 15,
        open: false,
        question: '15. 일정이 변경돼서 프로젝트를 보류하고 싶어요.',
        answer: "받으신 제안서를 검토한 후, 맘에 드시는 파트너에게 연락해 자체적으로 미팅을 잡아주시면 됩니다."
      },
      {
        id: 16,
        open: false,
        question: '16. 미팅 시 금액, 기간이 재산정될 수 있나요?',
        answer: "네. 파트너스와의 피드백 후 수정된 제품의뢰서대로 진행될 가능성은 크나, 혹여 미팅 후 세부적인 사항이 달라짐에 따라 금액과 기간이 달라질 수 있습니다."
      },
      {
        id: 17,
        open: false,
        question: '17. 미팅은 뭔가요? 뭘 준비해야 하나요?',
        answer: "계약을 하기 전 미팅을 통해 파트너스와 직접 만나보실 수 있습니다.\n" +
          "프로젝트에 적합한 파트너인지 검증하는 것은 물론, 진행하시려는 제품 제조의 상세 범위를 의논해보실 수도 있습니다.\n" +
          "관련 자료를 지참해주시면 더욱 원활하고 효율적인 미팅이 되실 수 있을 것입니다.",
      },
      {
        id: 18,
        open: false,
        question: '18. 오프라인 미팅은 어디서 진행되나요?',
        answer: "미팅을 하기로 한 파트너스와 자제적으로 장소를 잡아 진행해주시면 됩니다.",
      },
      {
        id: 19,
        open: false,
        question: '19. 모집 마감 전에 미팅신청을 해도 되나요?',
        answer: "네, 가능합니다. 파트너스 제안서를 받으신 후, 마음에 드는 파트너가 있으실 경우 해당 파트너와의 전화 후 미팅 신청이 가능합니다.",
      },
      {
        id: 20,
        open: false,
        question: '20. 미팅 시 이용요금이 발생하나요?',
        answer: "발생하지 않습니다. 볼트앤너트를 이용할 시 클라이언트께서 따로 내시는 이용요금은 없습니다."
      },
      {
        id: 21,
        open: false,
        question: '21. 파트너와의 미팅은 어떻게 취소하나요?',
        answer: "자체적으로 파트너와의 미팅 취소는 불가능하며, 볼트앤너트에게 따로 연락을 주시면 해결해드립니다."
      },
      {
        id: 22,
        open: false,
        question: '22. 계약 시 별도의 이용요금이 발생하나요?',
        answer: "발생하지 않습니다. 볼트앤너트를 이용할 시 클라이언트께서 따로 내시는 이용요금은 없습니다."
      },
      {
        id: 23,
        open: false,
        question: '23. 프로젝트 진행 도중 계약 내용을 변경해야 할 경우 어떻게 해야 하나요?',
        answer: "파트너와 협의 하에 내용 변경이 가능합니다."
      },
      {
        id: 24,
        open: false,
        question: '24. 함께 작업한 파트너를 평가하려면 어떻게 해야 하나요?',
        answer: "프로젝트가 완료된 후 [리뷰쓰기]란에서 작성이 가능합니다."
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
