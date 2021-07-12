import React from 'react'
import styled from 'styled-components'

import * as Text from 'components/Text'

import { WHITE, PRIMARY } from 'static/style'

class LeftConatiner extends React.Component {
  render(){
    const {count} = this.props
    return (
      <Left>
        <Header>
          <Text.FontSize18 color={WHITE} fontWeight={500}>
            큐레이션된 제조사 {count}개
          </Text.FontSize18>
        </Header>
        <CardList>
          <Card>
            <Number>1</Number>
            <Text.FontSize14 color={'#4d4f5c'} fontWeight={500}>
              맞춤형 평가를 통해 큐레이팅 된
              최적의 개발사를 확인해보세요
            </Text.FontSize14>
          </Card>
          <Card>
            <Number>2</Number>
            <Text.FontSize14 color={'#4d4f5c'} fontWeight={500}>
              높은 매칭 점수의 개발사부터
              차례로 상세 정보를 확인하실 수 있어요
            </Text.FontSize14>
          </Card>
          <Card>
            <Number>3</Number>
            <Text.FontSize14 color={'#4d4f5c'} fontWeight={500}>
              매칭된 개발사의 정보를 확인하고
              통화로 전문성을 확인하실 수 있어요
            </Text.FontSize14>
          </Card>
        </CardList>
      </Left>
    )
  }
}

export default LeftConatiner

const Left = styled.div`
  background-color: #e4e6ed;
  margin-bottom: 15px;
  @media (min-width: 0px) and (max-width: 991.98px) {
    width: 100%;
  }
  @media (min-width: 992px) {
    width: 250px;
    margin-right: 15px;
  }
`
const Header = styled.div`
  width: 100%;
  padding: 15px 0;

  background-color: ${PRIMARY};
  display: flex;
  justify-content: center;
  align-items: center;

  >p {
    word-break: keep-all;
  }
`
const CardList = styled.div`

`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    text-align: center;
    width: 70%;
  }
  :nth-of-type(2n-1){
    background-color: #fff8;
  }
  @media (min-width: 0px) and (max-width: 991.98px) {
    height: 50px;
    flex-direction: row;
    padding: 0 10px;
    > p {
      width: 100%;
    }
  }
  @media (min-width: 992px) {
    height: 150px;
  }
`
const Number = styled.p`
  flex-shrink: 0;
  font-size: 12px;
  color: ${WHITE};
  background-color: ${PRIMARY};
  width: 22px !important;
  height: 22px;

  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 15px;
  @media (min-width: 0px) and (max-width: 991.98px) {
    margin-bottom: 0px;
    margin-right: 8px;
  }
`
