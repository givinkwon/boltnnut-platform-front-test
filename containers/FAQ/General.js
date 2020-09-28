import React, {Component} from "react";
import styled, {css} from 'styled-components';

import Container from "../../components/Container";
import * as Text from 'components/Text';

import {PRIMARY, WHITE} from "../../static/style";

const topArrow = '/static/icon/top_arrow.png';


class GeneralContainer extends Component {
  state = {
    contents: [
      {
        id: 1,
        open: true,
        question: '1. \'클라이언트\'와 \'파트너스\'가 무엇인가요?',
        answer: '프로젝트를 의뢰하고 제품제조에 대한 용역이 필요한 주체를 \'클라이언트\', 프로젝트에 지원하고 작업하는 주체(개발자 또는 디자이너)를 \'파트너스\'라고 칭합니다.'
      },
      {
        id: 2,
        open: false,
        question: '2. 파트너스 이용요금은 얼마인가요?',
        answer: "볼트앤너트는 ‘미팅권’이라는 개념으로 진행되고 있습니다. (미팅권 내용)",
      },
      {
        id: 3,
        open: false,
        question: '3. 클라이언트, 파트너 계정 아이디를 동일하게 사용할 수는 없나요?',
        answer: "네, 그렇습니다. 클라이언트와 파트너를 동시에 이용하고 싶으신 경우 둘 다 가입해주셔야 합니다.",
      },
      {
        id: 4,
        open: false,
        question: '4. 계정 정보(휴대폰 번호, 주소지, 프로필 이미지 등)을 변경하고 싶어요.',
        answer: "계정 정보는 [마이페이지]에서 변경하실 수 있습니다.",
      },
      {
        id: 5,
        open: false,
        question: '5. 비밀번호를 변경하고 싶어요.',
        answer: "비밀번호는 [마이페이지]에서 변경하실 수 있습니다.",
      },
      {
        id: 6,
        open: false,
        question: '6. 탈퇴하려면 어떻게 해야 하나요?',
        answer: "회원 탈퇴는 [마이페이지]에서 신청하실 수 있습니다.",
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
                    <Text.FontSize18 color="white" fontWeight={700}>
                      {content.question}
                    </Text.FontSize18>
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

export default GeneralContainer;

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
