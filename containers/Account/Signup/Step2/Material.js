import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import CheckBoxComponent from 'components/SignupCheckBox'

import * as Text from 'components/Text'

import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

const search_ic = 'static/icon/search.png'

@inject('Auth','Category')
@observer
class CategoryConatiner extends React.Component {
  state = {
    check_list: null,
    width : 0, 

  }

  async componentDidMount() {
    const { Category } = this.props;
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    await Category.init()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  checked = (e) => {
    const { Category } = this.props;

    console.log(e.target.checked)
    
    // checked 되어 있는 경우
    if(e.target.checked){
      Category.add_selected("material", e.target.value, "signup")
      console.log(Category.material_selected)
    } else 
    // checked 안되어 있는 경우
    {
      Category.remove_selected("material", e.target.value, "signup")
      console.log(Category.material_selected)
    }
  }

  render(){
    const { Auth, Category } = this.props
    const { width } = this.state;
 
    
    return (
      <div>
        
        <Content style={{marginBottom : 40}}>

          { width > 767.98 ? (
            <>
            {/* 카테고리 */}
            <Header>
              <Text.FontSize24 color={'#0933b3'} fontWeight={700}>소재분류</Text.FontSize24>
            </Header>
            {
              Category.mainmaterial_list && Category.mainmaterial_list.map((item, idx) => {

                return (
                  <W100 key={idx}>
                    <TextBox active={true}>
                      <Text.FontSize20 color={'#505050'} fontWeight={700}>{item.maincategory}</Text.FontSize20>
                    </TextBox>

                    {item && item.material_set.map((sub_item, idx) => {  
                    
                    return (

                      <CheckList>
                        <CustomCheckBoxComponent  onClick={this.checked} key={idx} value={sub_item.id}>{sub_item.category}</CustomCheckBoxComponent>
                      </CheckList>
                    )
                    }
                    )
                    }
                    
                    
                    
                  </W100>
                )
              })
            }


            </>
          ) : (
            <>
            <Header>
              <span class="Header">소재분류</span><br/>
              <span class="SmallHeader">소재분류를 선택해주세요.(복수선택가능)</span>
            </Header>

            {
              Category.mainbusiness_list && Category.mainbusiness_list.map((item, idx) => {

                return (
                  <W100 key={idx}>
                    <TextBox active={true}>
                      <Text.FontSize20 color={'#505050'} fontWeight={700}>{item.maincategory}</Text.FontSize20>
                    </TextBox>

                    {item && item.business_set.map((sub_item, idx) => {  
                    
                    return (

                      <CheckList>
                        <CustomCheckBoxComponent key={idx}>{sub_item.category}</CustomCheckBoxComponent>
                      </CheckList>
                    )
                    }
                    )
                    }
                    
                    
                    
                  </W100>
                )
              })
            }
            </>
          )

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
