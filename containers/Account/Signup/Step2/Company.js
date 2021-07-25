import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import InputComponent from 'components/Input3'
import SelectComponent from 'components/Select'


import * as Text from 'components/Text'
import * as Category from 'axios/Account/Category'
import { PRIMARY, DARKGRAY, WHITE, BLACK } from 'static/style'

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
    marginTop: 10,
    border: '1px solid #c7c7c7',
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 3,
    padding: 5,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  }
}


@inject('Auth', 'Answer')
@observer
class CompanyConatiner extends React.Component {
  state = {
    width : 0, 

    possible_search: '',
    possible_selected: null,

    history_search: '',
    history_selected: null,
  }
  searchPossible = async (val) => {
    const { Answer } = this.props

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
    const { Answer, Auth } = this.props

    const re = new RegExp(`<span style="color: ${PRIMARY};">|</span>`,"g");
    sub.subclass = sub.subclass.replace(
      re, ''
    )

    const idx = Auth.possible_set.findIndex(_sub => _sub.id === sub.id);
    if(idx !== -1) {
      return;
    }

    this.setState({
      ...this.state,
      possible_search: sub.subclass,
      possible_selected: sub
    })

    Answer.possible_list = [];
  }
  addPossibleSet = () => {
    const { possible_selected } = this.state
    if(!possible_selected){
      alert('카테고리를 선택해주세요')
    }
    else {
      this.setState({
        possible_search: '',
        possible_selected: null,
      })
      this.props.Auth.addPossibleSet(possible_selected)
    }
  }

  searchHistory = async (val) => {
    const { Answer } = this.props

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
    const { Answer, Auth } = this.props

    const re = new RegExp(`<span style="color: ${PRIMARY};">|</span>`,"g");
    sub.subclass = sub.subclass.replace(
      re, ''
    )

    const idx = Auth.history_set.findIndex(_sub => _sub.id === sub.id);
    if(idx !== -1) {
      return;
    }

    this.setState({
      history_search: sub.subclass,
      history_selected: sub
    })

    Answer.history_list = [];
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
      this.props.Auth.addHistorySet(history_selected)
    }
  }
  componentDidMount() {
    this.props.Auth.getCityData()

    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render(){
    const {
      possible_search, possible_selected,
      history_search, history_selected
    } = this.state
    const { Auth, Answer } = this.props
    const { width } = this.state;

    const { possible_list, history_list } = Answer

    return (
      <div style={{marginBottom : 40}}>
        <Content>
        { width > 767.98 ? (
        <>
          <Header>
            <Text.FontSize24 color={'#0933b3'} fontWeight={700}>회사정보</Text.FontSize24>
          </Header>
          <W50 left>
            <InputComponent placeholder='회사명을 입력해주세요' label='회사명' type='text' onChange={Auth.setCompanyName} value={Auth.company_name}/>
          </W50>
          <W50 right select>
            <SelectBox>
              <Text.FontSize20 color={DARKGRAY} fontWeight={500}>시/도</Text.FontSize20>
              <SelectComponent
                styles={customStyles} options={Auth.city_data} value={Auth.city}
                getOptionLabel={(option) => option.maincategory} placeholder='옵션을 선택해주세요' onChange={Auth.setCity}/>
            </SelectBox>
          </W50>
          <W100>
            <Text.FontSize20 style={{marginTop: 12}} color={DARKGRAY} fontWeight={500}>주요거래처[대표 거래처 3곳 이상]</Text.FontSize20>
            <TextArea placeholder='주요거래처를 입력해주세요' col={3} onChange={Auth.setDeal} value={Auth.deal}/>
          </W100>
          <W100>
            <Text.FontSize20 style={{marginTop: 12}} color={DARKGRAY} fontWeight={500}>회사소개[100자 이상]</Text.FontSize20>
            <TextArea placeholder='회사소개를 입력해주세요' col={3} onChange={Auth.setInfoCompany} value={Auth.info_company}/>
          </W100>
          <W100>
            <Text.FontSize20 style={{marginTop: 12}} color={DARKGRAY} fontWeight={500}>진행한 제품[10개 이상]</Text.FontSize20>
            <TextArea placeholder='진행하셨던 제품을 써주세요. ex) 공기청정기' col={3} onChange={Auth.setHistories} value={Auth.histories}/>
          </W100>
          {/* {
            Auth.history_set && Auth.history_set.length > 0 && (
              <W100>
                <BadgeList>
                {
                  Auth.history_set.map((item, idx) => {
                    return (
                      <Badge key={idx}>
                        <Text.FontSize20 color={DARKGRAY} fontWeight={500}>#{item.subclass}</Text.FontSize20>
                        <img src={badge_close} onClick={() => Auth.removeHistorySet(idx)}/>
                      </Badge>
                    )
                  })
                }
                </BadgeList>
              </W100>
            )
          } */}
        </>
        ) : (
        <>
          <Header>
            <span class="Header">회사정보</span><br/>
            <span class="SmallHeader">가능하신 제조분야를 선택해주세요.(복수선택가능)</span>
          </Header>
          <W100>
            <InputComponent placeholder='회사명을 입력해주세요' label='회사명' type='text' onChange={Auth.setCompanyName} value={Auth.company_name}/>
          </W100>
          <W100 select>
            <SelectBox>
              <span class="selectHeader">시/도</span>
              <SelectComponent
                styles={customStyles} options={Auth.city_data} value={Auth.city}
                getOptionLabel={(option) => option.city} placeholder='옵션을 선택해주세요' onChange={Auth.setCity}/>
            </SelectBox>
          </W100>
          <W100>
            <TextBox>
              <span class="textareaHeader">주요거래처[대표 거래처 3곳 이상]</span>
              <TextArea style={{height : 85}} class="textareaBody1" placeholder='* 해당정보는 제조사 찾기에 노출이 되므로 우려되는 부분이 있으시다면 이니셜 위주로 써주시길 바랍니다. ex) s사, 삼성전자' col={3} onChange={Auth.setDeal} value={Auth.deal}/>
            </TextBox>
          </W100>
          <W100>
            <TextBox>
              <span class="textareaHeader">회사소개[100자 이상]</span>
              <TextArea style={{height : 112}} class="textareaBody2" placeholder='회사를 소개하는 글을 써주세요.' col={3} onChange={Auth.setInfoCompany} value={Auth.info_company}/>
            </TextBox>
          </W100>
          <W100>
            <TextBox>
             <span class="textareaHeader">진행한 제품[10개 이상]</span>
             <TextArea style={{height : 70}} class="textareaBody3" placeholder='진행하셨던 제품을 써주세요. ex) 공기청정기' col={3} onChange={Auth.setHistories} value={Auth.histories}/>
            </TextBox>
          </W100>
          {
            Auth.history_set && Auth.history_set.length > 0 && (
              <W100>
                <BadgeList>
                {
                  Auth.history_set.map((item, idx) => {
                    return (
                      <Badge key={idx}>
                        <Text.FontSize20 color={DARKGRAY} fontWeight={500}>#{item.subclass}</Text.FontSize20>
                        <img src={badge_close} onClick={() => Auth.removeHistorySet(idx)}/>
                      </Badge>
                    )
                  })
                }
                </BadgeList>
              </W100>
            )
          }
        </>
)}
          
        </Content>
      </div>
    )
  }
}

export default CompanyConatiner

const TextBox = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    > .textareaBody1 {
    }
    > .textareaBody2 {
    }
    > .textareaBody3 {
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
    
`
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
  max-height: 300px;
  overflow-y: scroll;
  p {
    cursor: pointer;
    padding: 10px 15px;
    border-bottom: solid 1px #dedede;
    :nth-of-type(2n){
      background-color: #f8f8f8;
    }
  }
  p:last-of-type {
    border-bottom: none;
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
  margin-top: 12px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 49px;
    margin-top: 0;
  }
`

const TextArea = styled.textarea`
  resize: none;
  width: calc(100% - 18px);
  margin-top: 12px;
  border-radius: 2px;
  border: solid 1px #c7c7c7;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: -0.35px;
  color: #c7c7c7;

  :focus {
    outline: none;
  }
  ::-webkit-input-placeholder {
    color : #c7c7c7 !important;
    font-weight: normal !important;
    font-stretch: normal !important;
    font-style: normal !important;
    line-height: 1.7 !important;
    letter-spacing: -0.5px !important;
    
  }
  /* ::placeholder {
    color : #c7c7c7 !important;
    font-weight: normal !important;
    font-stretch: normal !important;
    font-style: normal !important;
    line-height: 1.7 !important;
    letter-spacing: -0.5px !important;

    @media (min-width: 0px) and (max-width: 767.98px) {
      font-size: 14px;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
      font-size: 16px;
    }
    @media (min-width: 992px) and (max-width: 1299.98px) {
      font-size: 18px;
    }
    @media (min-width: 1300px) {
      font-size: 20px;
    }
  } */
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    padding: 8px;

  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
    height: 48px;
    padding: 10px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 18px;
    height: 54px;
    padding: 13px;
  }
  @media (min-width: 1300px) {
    font-size: 20px;
    height: 60px;
    padding: 15px;


  }
`
const W100 = styled.div`
  width: 100%;
  @media (min-width: 0px) and (max-width: 767.98px) {
    display : inline-flex;
    > span {
      white-space: nowrap;
      margin-top : auto;
      margin-right : 1px; 
      margin-left : 12px; 
    }
    .selectHeader {
      font-size: 14px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.43;
      letter-spacing: -0.35px;
      color: #505050;
    }
    .textareaHeader {
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
    .BoxText {
      font-size: 10px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 4.8%;

    .BoxText {
      font-size: 18px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 4.8%;

  }
  @media (min-width: 1300px) {
    width : 996px;
    padding: 40px;


  }
`
const W50 = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
  }
  @media (min-width: 768px) {
    width: calc(50% - 14px);
    ${props => props.left && css`
      margin-right: 14px;
    `}
    ${props => props.right && css`
      margin-left: 14px;
    `}
  }
`
const W30 = styled.div`
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
  div {
    color : #c7c7c7;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.7;
    letter-spacing: -0.5px;
  }
  /* > p {
    margin-top: 30px;
  } */
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div > div > div {
      font-size: 14px;
    }
    p {
      margin-top: 8px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > div > div > div {
      font-size: 16px;
    }
    > p {
      margin-top: 30px;
      /* 4% */
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div > div > div {
      font-size: 18px;
    }
    > p {
      margin-top: 30px;
      /* 4% */
    }
  }
  @media (min-width: 1300px) {
    > div > div > div {
      font-size: 20px;
    }
    > p {
      margin-top: 30px;
      /* 4% */
    }
  }
`
