import React, {Component} from "react"
import styled, {css} from "styled-components"

import { PRIMARY, WHITE } from 'static/style'
import * as Text from "components/Text"


class SelectSave extends Component {
  static defaultProps = {
    selects: [
      {
        "id": 1,
        "category": 1,
        "request": 1,
        "question": "1",
        "answer": "2",
      }
    ],
  }

  render() {
    const {selects, small} = this.props

    return (
      <QuestionList small={small}>
        {
          selects.map(select => {
            return (
              <Question key={select.id}>
                <div>
                  <Text.FontSize20 fontWeight={500} color={PRIMARY}>
                    Q.  {select.question}
                  </Text.FontSize20>
                </div>
                <Text.FontSize20 fontWeight={500} color={PRIMARY}>
                  A.  {select.answer}
                </Text.FontSize20>
              </Question>
            )
          })
        }
      </QuestionList>
    )
  }
}

export default SelectSave

/* 중복 */
const BorderCircle = styled.div`
  flex-shrink: 0;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 1px solid #4d4f5c;
  border-radius: 50%;
`
const Circle = styled.div`
  flex-shrink: 0;
  background-color: #777b86;
  width: 20px;
  height: 20px;
  margin-left: -11px;
  margin-right: 28px;
  border-radius: 50%;
`
const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  @media (min-width: 0px) and (max-width: 991.98px) {
    margin-left: -130px;
    margin-top: 30px;
  }
  
  ${props => props.small && css`
    margin-left: -130px;
    margin-top: 30px;
  `}
`
const Question = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  line-height: 200%;
  p {
    word-break: break-all !important;
    line-height: 1.2em;
  }
  > p {
    margin-bottom: 25px;
  }
  > div {
    display: flex;
    align-items: flex-start;
    margin-bottom: 8px;
  }
  /* 질문 텍스트 */
  > div > p {
    margin-top: -1px;
  }
`

