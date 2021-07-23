import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import CheckBoxComponent from 'components/SignupCheckBox'

import * as Text from 'components/Text'

import * as Category from 'axios/Account/Category'

import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

const search_ic = 'static/icon/search.png'

@inject('Auth')
@observer
class CategoryConatiner extends React.Component {
  state = {
    check_list: null,
    width : 0, 

  }
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
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
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render(){
    const { check_list } = this.state
    const { Auth } = this.props
    const { width } = this.state;

    return (
      <div>
        
        <Content style={{marginBottom : 40}}>
          { width > 767.98 ? (
            <>
            <Header>
              <Text.FontSize24 color={'#0933b3'} fontWeight={700}>제조분야</Text.FontSize24>
            </Header>
            {/* {
              check_list && check_list.map((category, idx) => {
                return (
                  <W100 key={idx}>
                    <TextBox active={true}>
                      <Text.FontSize20 color={'#505050'} fontWeight={700}>{category.maincategory}</Text.FontSize20>
                    </TextBox>
                    <CheckList>
                        <CustomCheckBoxComponent key={idx} checked={Auth.category_middle_set.indexOf(category.id) > -1} onClick={() => Auth.setCategoryMiddleSet(category.id)}>{category.category}</CustomCheckBoxComponent>
                    </CheckList>
                  </W100>
                )
              })
            } */}
            </>
          ) : (
            <>
            <Header>
              <span class="Header">제조분야</span><br/>
              <span class="SmallHeader">가능하신 제조분야를 선택해주세요.(복수선택가능)</span>
            </Header>
            <>
            </>
            {
              check_list && check_list.map((category, idx) => {
                return (
                  <W100 key={idx}>
                    <TextBox active={true}>
                      <span class="listHeader">{category.maincategory}</span>
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
            </>
          )}
          
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
    display : inline-flex;
    flex-direction: column;

    > span {
      white-space: nowrap;
      margin-top : auto;
      margin-right : 1px; 
      margin-left : 12px; 
    }
    .listHeader {
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.43;
      letter-spacing: -0.35px;
      color: #505050;
    }
    
    
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    
  }
  @media (min-width: 1300px) {
    
  }
`
const TextBox = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin-right : auto;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    min-width: 80px;
    margin-left: 0;
    margin-bottom : 3px;

    span {
      margin-right : auto;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    min-width: 100px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    min-width: 120px;
  }
  @media (min-width: 1300px) { 
    min-width: 130px;
    height: 40px;
    margin-bottom : 5px;
  

  }
`
const CheckList = styled.div`
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
    padding: 0px 0px 0px 13px;
    > div {    
      width: auto;
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
  @media (min-width: 0px) and (max-width: 767.98px) {
    > span {
      font-stretch: normal;
      font-style: normal;
      font-weight: 500;

    }
    .Header {
      font-size: 16px;
      /* line-height: 2.13; */
      letter-spacing: -0.4px;
      color: #0933b3;
      padding-bottom : 4px;
    }
    .SmallHeader {
      font-size: 12px;
      line-height: 1.17;
      letter-spacing: -0.3px;
      text-align: left;
      color: #767676;
    }

  }
  @media (min-width: 768px) and (max-width: 991.98px) {

  }
  @media (min-width: 992px) and (max-width: 1299.98px) {

  }
  @media (min-width: 1300px) {

  }
`
const Content = styled.div`
  border: solid 1px #c7c7c7;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  > div {
    display : block;
  }
  .MuiFormControlLabel-label {
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.43;
    letter-spacing: -0.35px;
    color: #767676;
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
  .BoxText {
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.25px;
    color: #505050; 
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 4.8%;
    .MuiFormControlLabel-label {
      font-size : 14px; 
      white-space: nowrap;
    }
    .MuiIconButton-root {
      padding : 1px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 4.8%;

  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 4.8%;

  }
  @media (min-width: 1300px) {
    width : 996px;
    padding: 40px;

    .MuiFormControlLabel-label {
      font-size : 20px; 
    }
  }
`

const CustomCheckBoxComponent = styled(CheckBoxComponent)`
  margin: 0;
`
