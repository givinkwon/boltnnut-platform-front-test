import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import CheckBoxComponent from 'components/SignupCheckBox'

import * as Text from 'components/Text'

import * as Category from 'axios/Category'

import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

const search_ic = 'static/icon/search.png'

@inject('Auth')
@observer
class CategoryConatiner extends React.Component {
  state = {
    check_list: null,
  }
  componentDidMount() {
    Category.getDevelop()
    .then(res => {
      console.log(res)
      const results = res.data.results
      this.setState({check_list : results})
      console.log(results)
    })
    .catch(e => {
      console.log(e)
      console.log(e.response)
    })
  }
  render(){
    const { check_list } = this.state
    const { Auth } = this.props
    return (
      <div>
        
        <Content style={{marginBottom : 40}}>
          <Header>
            <Text.FontSize24 color={'#0933b3'} fontWeight={700}>제조분야</Text.FontSize24>
          </Header>
          {
            check_list && check_list.map((category, idx) => {
              return (
                <W100 key={idx}>
                  <TextBox active={true}>
                    <Text.FontSize20 color={'#505050'} fontWeight={700}>{category.maincategory}</Text.FontSize20>
                  </TextBox>
                  <CheckList>
                    {
                      category.develop_set.map((item, idx) => {
                        return <CustomCheckBoxComponent key={idx} checked={Auth.category_middle_set.indexOf(item.id) > -1} onClick={() => Auth.setCategoryMiddleSet(item.id)}>{item.category}</CustomCheckBoxComponent>
                      })
                    }
                  </CheckList>
                </W100>
              )
            })
          }
        </Content>
      </div>
    )
  }
}

export default CategoryConatiner

const W100 = styled.div`
  width: 100%;
  display: flex;
  margin: 4px 0px;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
  }
`
const TextBox = styled.div`
  margin: auto;
  margin-bottom : 5px;
  height: 40px;  
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin-right : auto;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    min-width: 80px;
    margin-left: 0;
    margin-bottom: 12px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    min-width: 100px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    min-width: 120px;
  }
  @media (min-width: 1300px) { 
    min-width: 130px;
  }
`
const CheckList = styled.div`
  width: 100%;

  background-color: ${WHITE};
  padding: 0px 19px;
  padding-right: 0px;
  border-radius: 6px;
  border: solid 1px #dddddd;

  display: flex;
  flex-wrap: wrap;
  > div {
    width: calc(100%/3);
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    box-sizing: border-box;
    margin-bottom: 16px;
    
    > div {    
      width: calc(100%/2);
    }
  }
`
const Header = styled.div`
  display: flex;
  align-items: center;
  width : 100%;
  > p {
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
  }
`
const Content = styled.div`
  width : 996px;
  padding: 40px;
  border: solid 1px #c7c7c7;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  > div {
    display : block;
  }
  .MuiFormControlLabel-label {
    font-size : 20px; 
    font-family: 'Noto Sans KR',sans-serif;
    color : #999999;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.7;
    letter-spacing: -0.5px;
  }
  p{
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.7;
    letter-spacing: -0.5px;
  }
  div {
    border-radius: 3px;
  }
  > div > div > p {
    color: #505050;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 10px 20px;
  }
`

const CustomCheckBoxComponent = styled(CheckBoxComponent)`
  margin: 0;
`
