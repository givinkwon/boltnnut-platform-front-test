import styled, {css} from 'styled-components'

import { PRIMARY, WHITE } from 'static/style'
import React, {Component} from "react";
import * as Text from "./Text";
import SelectSave from "./SelectSave";
import {inject, observer} from "mobx-react";


@inject('Answer', 'Proposal', 'Offered')
@observer
class RequestArea extends Component {
  static defaultProps = {
    mainCategory: {
      id: 1,
      maincategory: "설계",
      develop_set: [],
    },
    select_saves: [
      {
        category: "기구설계",
        selects: [
          {
            "id": 1,
            "category": 1,
            "request": 1,
            "question": "1",
            "answer": "2",
          }
        ]
      }
    ]
  }

  render() {
    const {Answer, mainCategory, selectSaves, small} = this.props

    // 주의: 삭제 x, 넣어줘야 mobX 업데이트 됨
    for(let i=0; i < selectSaves.length; i++) {
      console.log(selectSaves[i].selects.length)
    }

    return (
      <Wrapper>
        <Text.FontSize20 color={PRIMARY} fontWeight={600}>
          의뢰 분야
        </Text.FontSize20>

        <div>
          <DoubleCircle big={true} />
          <Text.FontSize20 color="#4d4f5c">
            {mainCategory && mainCategory.maincategory}
          </Text.FontSize20>
        </div>

        {
          selectSaves && selectSaves.map((selectList, idx) => {
            const developCategory = Answer.getDevelopCategoryById(selectList.category)
            if(developCategory) {
              return (
                <div key={idx}>
                  <Circle/>
                  <Text.FontSize20 color={PRIMARY} fontWeight={700}>
                    {developCategory.category}
                  </Text.FontSize20>

                  <SelectSave selects={selectList.selects} small={small} />
                </div>
              )
            }
          })
        }
      </Wrapper>
    )
  }
}

export default RequestArea

const Circle = styled.div`
  flex-shrink: 0;
  background-color: #777b86;
  width: 20px;
  height: 20px;
  margin-left: -9px;
  margin-right: 28px;
  border-radius: 50%;
`
const DoubleCircle = styled.div`
  flex-shrink: 0;
  position: relative;
  width: ${props => props.big ? '34px' : '20px'};
  height: ${props => props.big ? '34px' : '20px'};
  margin-top: ${props => props.big ? '-10px' : '0'};
  margin-right: ${props => props.big ? '20px' : '10px'};
  margin-left: ${props => props.big ? '-17px' : '0'};
  border-radius: 50%;
  background-color: ${PRIMARY};
  :before {
    content: '';
    position: absolute;
    top: 25%;
    left: 25%;
    background-color: white;
    width: ${props => props.big ? '17px' : '10px'};
    height: ${props => props.big ? '17px' : '10px'};
    border-radius: 50%;
  }
`
const BorderCircle = styled.div`
  flex-shrink: 0;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 1px solid #4d4f5c;
  border-radius: 50%;
`

const Wrapper = styled.div`
  display: block !important;
  > div {
    display: flex;
    box-sizing: border-box;
    min-height: 85px;
    margin-left: 15px;
    z-index: 900;
    border-left: 2px solid #c6c6c6;
    :last-child {
      border-left: none;
    }
    /* 대분류 (설계/기구설계/디자인/회로설계) */
    > p {
      flex-shrink: 0;
      width: 130px;
      padding-top: 2px;
    }
  }
  /* 라벨[의뢰분야] */
  > p {
    margin-bottom: 40px;
  }
`
