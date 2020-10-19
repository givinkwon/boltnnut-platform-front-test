import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import CheckBoxComponent from 'components/CustomCheckBox'

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
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>제조분야</Text.FontSize20>
        </Header>
        <Content>
          {
            check_list && check_list.map((category, idx) => {
              return (
                <W100 key={idx}>
                  <TextBox active={true}>
                    <Text.FontSize24 color={WHITE} fontWeight={700}>{category.maincategory}</Text.FontSize24>
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
  border-radius: 100px;
  background-color: ${PRIMARY}00;
  border: 1px solid #e4e6ed;
  height: 40px;
  
  
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.active && css`
    background-color: ${PRIMARY};
    border: 1px solid ${PRIMARY};
  `}

  @media (min-width: 0px) and (max-width: 767.98px) {
    min-width: 80px;
    margin-left: 0;
    margin-bottom: 12px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    min-width: 100px;
    margin-right: 18px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    min-width: 120px;
    margin-right: 22px;
  }
  @media (min-width: 1300px) { 
    min-width: 130px;
    margin-right: 30px;
  }
`
const CheckList = styled.div`
  width: 100%;

  background-color: ${WHITE};
  padding: 12px 15px;
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
    padding: 20px 10px 20px;
  }
`

const CustomCheckBoxComponent = styled(CheckBoxComponent)`
  margin: 5px 0;
`
