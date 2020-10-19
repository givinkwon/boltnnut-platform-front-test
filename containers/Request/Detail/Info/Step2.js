import React from 'react'
import styled, {css} from 'styled-components'

import * as Text from 'components/Text'
import { PRIMARY, WHITE } from 'static/style'

class Step2Conatiner extends React.Component {
   render(){
    return (
      <>
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>왜 볼트앤너트를 이용해야 할까요?</Text.FontSize20>
        </Header>
        <Content>
          <TextBox>
            <div>
              <Num>1</Num>
              <Text.FontSize20 color={PRIMARY} fontWeight={500}>
                최적의 전문 제조사를 매칭해드립니다.
              </Text.FontSize20>
            </div>
            <Text.FontSize20 color="#4d4f5c" fontWeight={300}>
              제품군별로 맞춤화된 전문 의뢰서에 따라 응답해주세요. 자세하게 응답할수록 최적의 제조사가 매칭될 가능성이 높아집니다.
            </Text.FontSize20>
          </TextBox>
          <TextBox>
            <div>
              <Num>2</Num>
              <Text.FontSize20 color={PRIMARY} fontWeight={500}>
                온라인에서 제조사의 정보를 확인하고 비교해보세요.
              </Text.FontSize20>
            </div>
            <Text.FontSize20 color="#4d4f5c" fontWeight={300}>
              볼트앤너트는 등록된 모든 업체들의 실사 작업을 진행합니다. 정밀한 업체 정보를 통해 온라인상에서 수많은 제조사를 쉽고 빠르게 비교해보세요.
            </Text.FontSize20>
          </TextBox>
          <TextBox>
            <div>
              <Num>3</Num>
              <Text.FontSize20 color={PRIMARY} fontWeight={500}>
                의뢰서 작성만으로 빠르고 다양하게 개발 제안서를 받아보세요.
              </Text.FontSize20>
            </div>
            <Text.FontSize20 color="#4d4f5c" fontWeight={300}>
              의뢰서를 작성하고 볼트앤너트 담당자가 1영업일 내에 의뢰서 검토 후 유선상으로 전화드립니다.
              의뢰서 검토 후 24시간안에 다수의 제조사들이 매칭되어 제품 개발 제안서를 확인해보실 수 있습니다.
            </Text.FontSize20>
          </TextBox>
        </Content>
      </>
    )
  }
}

export default Step2Conatiner

const Num = styled.div`
  min-width: 22px;
  min-height: 22px;
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  background-color: ${PRIMARY};
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 30px;
  border-bottom: 1px solid #f2f2f2;
  > div {
    display: flex;
    align-items: center;
  }
  > p {
    line-height: 1.25em;
    margin-top: 12px;
  }
  > div:nth-of-type(1) {
    margin-bottom: 8px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      min-width: 80px;
    }
    > p {
      margin-left: 30px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div {
      min-width: 100px;
    }
    > p {
      margin-left: 30px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    > div {
      min-width: 120px;
    }
    > p {
      margin-left: 30px;
    }
  }
  @media (min-width: 1300px) { 
    > div {
      min-width: 140px;
    }
    > p {
      margin-left: 30px;
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
