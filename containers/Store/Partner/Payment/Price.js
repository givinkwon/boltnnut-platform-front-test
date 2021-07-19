import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'
import InputComponent from 'components/Input2'
import ButtonComponent from 'components/Button'
import ButtonSpinnerComponent from 'components/ButtonSpinner'
import CheckBoxComponent from 'components/CheckBox'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

const search_ic = 'static/icon/search.png'

@inject('Auth')
@observer
class PriceConatiner extends React.Component {
   render(){
    const { Auth } = this.props
    return (
      <div style={{width: '100%', marginTop: 15}}>
        <Header>
          <Text.FontSize24 color={WHITE} fontWeight={700}>분야별 이용 요금</Text.FontSize24>
        </Header>
        <Content>
          <Item>
            <Text.FontSize20 fontWeight={500} color={DARKGRAY}>디자인,기구 / 회로 / 기계설계</Text.FontSize20>
            <Text.FontSize20 fontWeight={500} color={DARKGRAY}>30 코인</Text.FontSize20>
          </Item>
          <Item>
            <Text.FontSize20 fontWeight={500} color={DARKGRAY}>목업 / 3D 프린터</Text.FontSize20>
            <Text.FontSize20 fontWeight={500} color={DARKGRAY}>10 코인</Text.FontSize20>
          </Item>
          <Item>
            <Text.FontSize20 fontWeight={500} color={DARKGRAY}>진공성형, 가공</Text.FontSize20>
            <Text.FontSize20 fontWeight={500} color={DARKGRAY}>100 코인</Text.FontSize20>
          </Item>
          <Item>
            <Text.FontSize20 fontWeight={500} color={DARKGRAY}>금형, 사출</Text.FontSize20>
            <Text.FontSize20 fontWeight={500} color={DARKGRAY}>300 코인</Text.FontSize20>
          </Item>
        </Content>
      </div>
    )
  }
}

export default PriceConatiner


const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;
  padding: 0 20px;
`
const Content = styled.div`
  background-color: #fff;
  box-shadow: 0px 0px 10px 0px #0005;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > p {
    text-align: center;
    line-height: 1.3;
  }
`
const Item = styled.div`
  width: calc(100% - 40px);
  margin: 0 20px;
  padding: 20px 0px;
  border-bottom: 1px solid #f5f5f5;

  display: flex;
  align-items: center;
  justify-content: space-between;
`