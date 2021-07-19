import React from 'react'
import styled, {css} from 'styled-components'

import * as Text from 'components/Text'
import { PRIMARY, WHITE } from 'static/style'

class Step3Conatiner extends React.Component {
   render(){
    return (
      <>
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>볼트앤너트는 개발사 매칭 시 프로젝트 수수료를 받지 않습니다</Text.FontSize20>
        </Header>
        <Content>
          <TextBox>
            <Text.FontSize20 color="#4d4f5c" fontWeight={300}>
              볼트앤너트는 수수료를 부과하지 않음으로써 전문 제조사들이 클라이언트들에게 양질의 제조 서비스를 제공할 수 있도록 합니다.
            </Text.FontSize20>
          </TextBox>
        </Content>
      </>
    )
  }
}

export default Step3Conatiner

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px 30px;
  border-bottom: 1px solid #f2f2f2;
  > p {
    line-height: 1.25em;
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
  margin-bottom: 30px;
  background-color: #fff;

  display: flex;
  flex-wrap: wrap;
  > p {
    line-height: 1.3;
  }
  box-shadow: 0px 0px 10px 0px #0001;
`
