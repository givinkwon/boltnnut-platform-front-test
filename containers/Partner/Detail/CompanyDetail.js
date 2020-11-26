import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import InputComponent from 'components/Input2'
import SelectComponent from 'components/Select'


import * as Text from 'components/Text'
import * as Category from 'axios/Category'
import { DARKGRAY, PRIMARY, WHITE } from 'static/style'

const badge_close = 'static/images/badge_close.png'

const customStyles = {
  dropdownIndicator: () => ({
    color: '#555555',
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000000' : '#555555',
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 16,
    fontSize: 16,
  }),
  control: () => ({
    fontSize: 16,
    marginTop: 12,
    border: '1px solid #e6e6e6',
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 6,
    padding: 4,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  }
}


@inject('Partner')
@observer
class CompanyDetailConatiner extends React.Component {
  render(){
    const { Partner } = this.props
    return (
      <div>
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>회사정보</Text.FontSize20>
        </Header>
        <Content>
          <W30>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>상호명</Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>{Partner.detail.name}</Text.FontSize20>
          </W30>
          <W30 center>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>종업원 수</Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>{Partner.detail.employee}</Text.FontSize20>
          </W30>
          <W30>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>설립연도</Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>{Partner.detail.career}</Text.FontSize20>
          </W30>
          <W30>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>매출액</Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>{Partner.detail.revenue}백만원</Text.FontSize20>
          </W30>
          <W30 center>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>시/도</Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {Partner.getCityNameById(Partner.detail.city)}
            </Text.FontSize20>
          </W30>
          <W30>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>지역</Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {Partner.getRegionNameById(Partner.detail.region)}
            </Text.FontSize20>
          </W30>

          {
            Partner.detail.product_possible && Partner.detail.product_possible.length > 0 && (
              <W100>
                <Text.FontSize20 color={PRIMARY} fontWeight={700}>가능한 제품 분야</Text.FontSize20>
                <BadgeList>
                {
                  Partner.detail.product_possible.map((item, idx) => {
                    return (
                      <Badge key={idx}>
                        <Text.FontSize20 color="#404040" fontWeight={500}>#{item.subclass}</Text.FontSize20>
                      </Badge>
                    )
                  })
                }
                </BadgeList>
              </W100>
            )
          }
          {
            Partner.detail.product_history && Partner.detail.product_history.length > 0 && (
              <W100>
                <Text.FontSize20 color={PRIMARY} fontWeight={700}>진행한 제품들</Text.FontSize20>
                <BadgeList>
                {
                  Partner.detail.product_history.map((item, idx) => {
                    return (
                      <Badge key={idx}>
                        <Text.FontSize20 color="#404040" fontWeight={500}>#{item.subclass}</Text.FontSize20>
                      </Badge>
                    )
                  })
                }
                </BadgeList>
              </W100>
            )
          }
        </Content>
      </div>
    )
  }
}

export default CompanyDetailConatiner

const BadgeList = styled.div`
  margin-top: 15px;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  border: solid 1px #dedede;
  padding: 5px 10px;
  background-color: #fff;
`
const Badge = styled.div`
  margin: 4px;
  display: flex;
  align-items: center;
  padding: 7px;
  background-color: #f8f8f8;
  border-radius: 4px;
  > img {
    width: 30px;
    height: 30px;
    margin-left: 12px;
    cursor: pointer;
  }
  > p {
    flex-shrink: 0;
  }
`
const W100 = styled.div`
  width: 100%;
  margin: 10px 0px;
`
const Header = styled.div`
  height: 55px;
  background-color: ${PRIMARY};

  display: flex;
  align-items: center;

  padding: 0 15px;
`
const Content = styled.div`
  background-color: #f2f2f2;
  padding: 20px;

  display: flex;
  flex-wrap: wrap;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 30px 15px 20px;
  }
`
const W30 = styled.div`
  display: flex;
  margin-bottom: 20px;
  > p:nth-of-type(1) {
    width: 80px;
  }
  
  > p:nth-of-type(2){
    margin-left: 20px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    > p:nth-of-type(2){
      margin-left: auto;
    }
  }
  @media (min-width: 768px) {
    width: calc((100% - 28px)/3);
    ${props => props.center && css`
      margin-right: 14px;
      margin-left: 14px;
    `}
  }
`