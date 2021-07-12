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


@inject('Profile', 'Answer')
@observer
class CompanyConatiner extends React.Component {
  state = {
    possible_search: '',
    possible_selected: null,

    history_search: '',
    history_selected: null,
  }
  searchPossible = async (val) => {
    const {Answer} = this.props

    const req = {
      data: {
        search: val
      }
    }
    this.setState({
      possible_search: val,
      possible_selected: null
    })
    if (val) {
      await Answer.searchSubclass('possible', val)
      Answer.possible_list = Answer.possible_subclass_list

      await Answer.searchCategory('possible', val)
      Answer.possible_list = Answer.possible_list.concat(Answer.possible_category_list)

      await Answer.searchMainCategory('possible', val)
      Answer.possible_list = Answer.possible_list.concat(Answer.possible_main_list)
    }
  }
  selectPossible = (sub) => {
    const re = new RegExp(`<span style="color: ${PRIMARY};">|</span>`,"g");
    sub.subclass = sub.subclass.replace(
      re, ''
    )

    this.setState({
      possible_search: sub.subclass,
      possible_selected: sub
    })
  }
  addPossibleSet = () =>{
    const { possible_selected } = this.state
    if(!possible_selected){
      alert('카테고리를 선택해주세요')
    }
    else {
      this.setState({
        possible_search: '',
        possible_selected: null,
      })
      this.props.Profile.addPossibleSet(possible_selected)
    }
  }

  searchHistory = async (val) => {
    const {Answer} = this.props

    const req = {
      data: {
        search: val
      }
    }
    this.setState({
      history_search: val,
      history_selected: null
    })
    if (val) {
      await Answer.searchSubclass('history', val)
      Answer.history_list = Answer.history_subclass_list

      await Answer.searchCategory('history', val)
      Answer.history_list = Answer.history_list.concat(Answer.history_category_list)

      await Answer.searchMainCategory('history', val)
      Answer.history_list = Answer.history_list.concat(Answer.history_main_list)
    }
  }
  selectHistory = (sub) => {
    const re = new RegExp(`<span style="color: ${PRIMARY};">|</span>`,"g");
    sub.subclass = sub.subclass.replace(
      re, ''
    )

    this.setState({
      history_search: sub.subclass,
      history_selected: sub
    })
  }
  addHistorySet = () =>{
    const { history_selected } = this.state
    if(!history_selected){
      alert('카테고리를 선택해주세요')
    }
    else {
      this.setState({
        history_search: '',
        history_selected: null,
      })
      this.props.Profile.addHistorySet(history_selected)
    }
  }
  componentDidMount() {
    this.props.Profile.getCityData()
  }

  render(){
    const {
      possible_search, possible_selected,
      history_search, history_selected
    } = this.state
    const { Profile, Answer } = this.props
    const city = Profile.city
    const region = Profile.region
    const {possible_list, history_list} = Answer

    return (
      <div style={{marginTop: 30}}>
        <Header>
          <Text.FontSize20 color={WHITE} fontWeight={700}>회사정보</Text.FontSize20>
        </Header>
        <Content>
          <W30>
            <InputComponent placeholder='상호명을 입력해주세요' label='상호명' type='text' onChange={Profile.setCompanyName} value={Profile.company_name}/>
          </W30>
          <W30 center select>
            <SelectBox>
              <Text.FontSize20 color={DARKGRAY} fontWeight={500}>시/도</Text.FontSize20>
              <SelectComponent
                styles={customStyles} options={Profile.city_data} value={city ? city : Profile.getCityById(Profile.data.city)}
                getOptionLabel={(option) => option.city} placeholder='옵션을 선택해주세요' onChange={Profile.setCity}/>
            </SelectBox>
          </W30>
          <W100>
            <Text.FontSize20 style={{marginTop: 12}} color={DARKGRAY} fontWeight={500}>주요거래처</Text.FontSize20>
            <TextArea placeholder='주요거래처를 입력해주세요' col={3} onChange={Profile.setDeal} value={Profile.deal}/>
          </W100>
          <W100>
            <Text.FontSize20 style={{marginTop: 12}} color={DARKGRAY} fontWeight={500}>진행한 제품들</Text.FontSize20>
            <TextArea placeholder='진행한 제품들을 입력해주세요' col={3} onChange={Profile.setHistories} value={Profile.histories}/>
          </W100>
          <W100>
            <Text.FontSize20 style={{marginTop: 12}} color={DARKGRAY} fontWeight={500}>회사 소개[100자 이상]</Text.FontSize20>
            <TextArea placeholder='회사소개를 입력해 주세요.' col={3} onChange={Profile.setInfoCompany} value={Profile.info_company}/>
          </W100>
        </Content>
      </div>
    )
  }
}

export default CompanyConatiner

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
`
const SearchResult = styled.div`
  position: absolute;
  background-color: #fff;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  border: solid 1px #dedede;
  border-bottom: 0px;
  
  max-height: 280px;
  overflow-y: scroll;
  
  p {
    cursor: pointer;
    padding: 10px 15px;
    border-bottom: solid 1px #dedede;
    :nth-of-type(2n){
      background-color: #f8f8f8;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    top: 64px;
    p {
      padding: 8px 12px;
      border-bottom: solid 1px #dedede;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    top: 64px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    top: 67px;
  }
  @media (min-width: 1300px) { 
    top: 70px;
  }
`
const Button = styled.div`
  cursor: pointer;
  border-radius: 5px;
  background-color: ${props => props.color};

  width: 100px;
  height: 50px;
  margin-left: 10px;
  padding-top: 2px;

  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 49px;
  }
`
const SearchCategory = styled.div`
  display: flex;
  align-items: center;
  > p {
    margin-top: 12px;
    margin-right: 10px;
    white-space: nowrap;
    color: ${PRIMARY};
    width: 180px;
  }
  > div {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    > div {
      max-width: 420px;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    align-items: flex-start;
    > p {
      margin-bottom: 12px;
    }
    > p:nth-of-type(2) {
      line-height: 15px;
      width: 100%;
      white-space: break-spaces;
      word-break: break-all;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    flex-direction: column;
    align-items: flex-start;
    > p {
      margin-bottom: 12px;
    }
    > p:nth-of-type(2) {
      width: 100%;
    }

  @media (min-width: 768px) and (max-width: 991.98px) {
    flex-direction: column;
    align-items: flex-start;
    > p {
      margin-bottom: 12px;
    }
    > p:nth-of-type(2) {
      width: 50%;
    }
   }
  @media (min-width: 1300px) {
    flex-direction: column;
    align-items: flex-start;
    > p {
      margin-bottom: 12px;
    }
  }

`
const TextArea = styled.textarea`
  resize: none;
  width: calc(100% - 30px);
  margin-top: 12px;

  border-radius: 6px;
  border: solid 1px #dddddd;
  padding: 15px;
  :focus {
    outline: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    height: 42px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
    height: 48px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 18px;
    height: 54px;
  }
  @media (min-width: 1300px) { 
    font-size: 20px;
    height: 60px;
  }
`
const W100 = styled.div`
  width: 100%;
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
const W30 = styled.div`
  > div > div {
    margin-top: 12px;
  }
  ${props => props.select && css`
    > div > div {
      margin-top: 0px;
    }
  `}
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    width: calc((100% - 28px)/3);
    ${props => props.center && css`
      margin-right: 14px;
      margin-left: 14px;
    `}
  }
`
const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > p {
    margin-top: 15px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div > div > div {
      font-size: 14px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div > div > div {
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    > div > div > div {
      font-size: 18px;
    }
  }
  @media (min-width: 1300px) { 
    > div > div > div {
      font-size: 20px;
    }
  }
`
