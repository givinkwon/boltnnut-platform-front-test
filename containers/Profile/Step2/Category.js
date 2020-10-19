import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import CheckBoxComponent from 'components/CustomCheckBox'

import * as Text from 'components/Text'

import * as Category from 'axios/Category'

import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

const search_ic = 'static/icon/search.png'

@inject('Auth', 'Answer', 'Profile')
@observer
class CategoryConatiner extends React.Component {

  async componentDidMount() {
    const {Auth, Answer} = this.props

    await Auth.checkLogin()
    Answer.loadCategories()
  }
  render(){
    const { Answer, Profile } = this.props
    const {develop_big_categories, develop_categories} = Answer

    return (
      <div>
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>개발분야</Text.FontSize20>
        </Header>
        <Content>
          {
            develop_big_categories && develop_big_categories.map((category, idx) => {
              return (
                <W100 key={idx}>
                  <TextBox active={true}>
                    <Text.FontSize24 color={WHITE} fontWeight={700}>{category.maincategory}</Text.FontSize24>
                  </TextBox>
                  <CheckList>
                    {
                      category.develop_set.map((item, idx) => {
                        return (
                          <CustomCheckBoxComponent
                            key={idx}
                            checked={
                              Profile.category_middle_set.findIndex(partnerCategory => {
                                return partnerCategory === item.id
                              }) !== -1
                            }
                            onClick={() => Profile.setCategoryMiddleSet(item.id)}
                          >
                            {item.category}
                          </CustomCheckBoxComponent>
                        )
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
    min-width: 70px;
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
    margin-bottom: 15px !important;
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
    padding: 20px 15px;
  }
`

const CustomCheckBoxComponent = styled(CheckBoxComponent)`
  margin: 5px 0;
`
