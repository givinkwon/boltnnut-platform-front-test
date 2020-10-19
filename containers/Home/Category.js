import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'

import Container from 'components/Container'
import RatioImage from 'components/RatioImage'
import * as Text from 'components/Text'
import { PRIMARY, DARKGRAY } from 'static/style'
import {BLACK} from "../../static/style";


@inject('Home')
@observer
class CategoryConatiner extends React.Component {
  state = {
    search: '',
    tab: 0,
  }
  render() {
    const { Home } = this.props
    const { tab } = this.state
    return (
      <Category>
        {
          Home.category_list.length > 0 && Home.category_list.map((item, idx) => {
            if(item.id === 2 || item.id === 8) {
              return null
            }

            return (
              <Item key={idx} onClick={() => Router.push(`/request?big=${item.id}`)}>
                <Image src={item.big_img} active={tab===1} onClick={() => this.setState({tab: 1})}/>
                <Text.FontSize18 color="#404040" fontWeight={700}>{item.maincategory}</Text.FontSize18>
              </Item>
            )
          })
        }
      </Category>
    )
  }
}

export default CategoryConatiner

const Category = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 0px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 40px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    padding: 60px 0px;
    width: 70%;
  }
  @media (min-width: 1300px) { 
    padding: 80px 0px;
    width: 70%;
  }
`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: calc(14% - 40px);
  padding: 20px 0;
  margin: 0 20px;
 
  @media (min-width: 0px) and (max-width: 499.98px) {
    width: calc(50% - 30px);
    margin: 0;
    padding: 15px;
    
    > p {
      font-size: 14px;
    }
  }
  @media (min-width: 500px) and (max-width: 991.98px) {
    margin: 0;
    width: calc(33.33% - 30px);
    padding: 15px;
  }
  @media (min-width: 992px) and (max-width: 1199.98px) {
    margin: 0;
    width: calc(25% - 30px);
    padding: 15px;
  }
`
const Image = styled(RatioImage)`
  cursor: pointer;
  border: 2px solid #ddd;
  border-radius: 200px !important;
  margin-bottom: 20px;
  ${props => props.active && css`
    border: 2px solid ${PRIMARY};
  `}
`