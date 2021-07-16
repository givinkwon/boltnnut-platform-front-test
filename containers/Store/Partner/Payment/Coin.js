import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import * as Text from 'components/Text'
import { intcomma } from 'utils/format'
import { PRIMARY, WHITE, DARKGRAY } from 'static/style' 

@inject('Auth', 'Payment')
@observer
class CoinConatiner extends React.Component {
   render(){
    const { Payment } = this.props
    return (
      <div style={{width: '100%', marginTop: 15}}>
        <Header>
          <Text.FontSize24 color={WHITE} fontWeight={700}>코인 충전</Text.FontSize24>
        </Header>
        <Content>
          {
            Payment.products.map((item) => {
              return (
                <Item key={item.id} active={Payment.product.id === item.id} onClick={() => Payment.setProduct(item)}>
                  <Text.FontSize24 fontWeight={500}>{item.coin} 코인</Text.FontSize24>
                  <Text.FontSize24 fontWeight={500}>{intcomma(item.price)} 원</Text.FontSize24>
                </Item>
              )
            })
          }
        </Content>        
      </div>
    )
  }
}

export default CoinConatiner


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
  cursor: pointer;
  background-color: #f5f5f5;
  width: calc(100% - 40px);
  padding: 12px 20px;
  margin: 2px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  > p:nth-of-type(1) {
    color: #767676;
  }
  > p:nth-of-type(2) {
    background-color: ${WHITE};
    border-radius: 5px;
    color: ${DARKGRAY};
    padding: 6px 15px;
  }
  ${props => props.active && css`
    background-color: #7a87a7;
    > p:nth-of-type(1) {
      color: ${WHITE};
    }
    > p:nth-of-type(2) {
      color: ${PRIMARY};
    }
  `}
`