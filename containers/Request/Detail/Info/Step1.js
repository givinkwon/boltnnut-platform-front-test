import React from 'react'
import styled, {css} from 'styled-components'

import Container from 'components/Container'
import * as Text from 'components/Text'
import { PRIMARY, WHITE } from 'static/style'

class Step1Conatiner extends React.Component {
   render(){
    return (
      <>
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>프로세스</Text.FontSize20>
        </Header>
        <Content>
          <TextBox>
            <div>
              <Text.FontSize20 color={PRIMARY} fontWeight={500}>
                1&nbsp;&nbsp;&nbsp;의뢰하기
              </Text.FontSize20>
            </div>
            <Text.FontSize20 color="#4d4f5c" fontWeight={300}>
              개발하고자 하는 제품의 의뢰서를 작성해주세요.
              <br/><br/>
              의뢰서 작성 시간은 최대 3분 입니다.
            </Text.FontSize20>
          </TextBox>
          <TextBox>
            <div>
              <Text.FontSize20 color={PRIMARY} fontWeight={500}>
                2&nbsp;&nbsp;&nbsp;업체 추천
              </Text.FontSize20>
            </div>
            <Text.FontSize20 color="#4d4f5c" fontWeight={300}>
                볼트앤너트 개발 전문 컨설턴트와의 1:1 추가 상담 후
                <br/><br/>
                최대 30분 내로 최적의 개발업체 리스트를 보내드립니다.

            </Text.FontSize20>
          </TextBox>

          <TextBox>
            <div>
              <Text.FontSize20 color={PRIMARY} fontWeight={500}>
                3&nbsp;&nbsp;&nbsp;업체 정보 확인
              </Text.FontSize20>
            </div>
            <Text.FontSize20 color="#4d4f5c" fontWeight={300}>
                포토폴리오부터 제조사 스토리까지 추천받은 업체의
                <br/><br/>
                상세정보를 확인한 후 업체와 맞춤형 1:1 상담을 진행하세요.

            </Text.FontSize20>
          </TextBox>
        </Content>
      </>
    )
  }
}

export default Step1Conatiner

const TextBox = styled.div`
  display: flex;
  padding: 25px 30px;
  border-bottom: 1px solid #f2f2f2;
  
  > p {
    line-height: 1.25em;
  }
  
  > div:nth-of-type(1) > p {
    margin-top: 2px;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      min-width: 150px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div {
      min-width: 170px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    > div {
      min-width: 180px;
    }
  }
  @media (min-width: 1300px) { 
    > div {
      min-width: 210px;
    }
  }
`
const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;

  padding: 0 30px;
  box-shadow: 0px 0px 10px 0px #0001;
  margin-top: 20px;
`
const Content = styled.div`
  background-color: #fff;

  display: flex;
  flex-wrap: wrap;
  > p {
    line-height: 1.3;
  }
  box-shadow: 0px 0px 10px 0px #0001;
`
