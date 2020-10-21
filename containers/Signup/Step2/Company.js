import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'

import InputComponent from 'components/Input3'
import SelectComponent from 'components/Select'


import * as Text from 'components/Text'
import * as Category from 'axios/Category'
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
  }
  render(){
    const {
      possible_search, possible_selected,
      history_search, history_selected
    } = this.state
    const { Auth, Answer } = this.props
    const { possible_list, history_list } = Answer

    return (
      <div style={{marginBottom : 40}}>
        <Content>
          <Header>
            <Text.FontSize24 color={'#0933b3'} fontWeight={700}>회사정보</Text.FontSize24>
          </Header>
          <W50 left>
            <InputComponent placeholder='상호명을 입력해주세요' label='상호명' type='text' onChange={Auth.setCompanyName} value={Auth.company_name}/>
          </W50>
          <W50 right select>
            <SelectBox>
              <Text.FontSize20 color={DARKGRAY} fontWeight={500}>시/도</Text.FontSize20>
              <SelectComponent
                styles={customStyles} options={Auth.city_data} value={Auth.city}
                getOptionLabel={(option) => option.city} placeholder='옵션을 선택해주세요' onChange={Auth.setCity}/>
            </SelectBox>
          </W50>
          {/*<W30 center>
            <InputComponent placeholder='종업원 수를 입력해주세요' label='종업원 수' type='number' onChange={Auth.setEmployee} value={Auth.employee}/>
          </W30>
          <W30>
            <InputComponent placeholder='설립연도를 입력해주세요' label='설립연도' type='number' onChange={Auth.setCareer} value={Auth.career}/>
          </W30>
          <W30>
            <InputComponent placeholder='매출액을 입력해주세요' label='매출액' type='number' onChange={Auth.setRevenue} value={Auth.revenue}/>
          </W30>*/}
          {/*<W30 select>
            <SelectBox>
              <Text.FontSize20 color={DARKGRAY} fontWeight={500}>지역</Text.FontSize20>
              <SelectComponent
                styles={customStyles} options={Auth.region_data} value={Auth.region}
                getOptionLabel={(option) => option.region} placeholder='옵션을 선택해주세요' onChange={Auth.setRegion}/>
            </SelectBox>
          </W30>*/}
          {/*<W100>
            <Text.FontSize20 style={{marginTop: 15}} color={DARKGRAY} fontWeight={500}>주요사업</Text.FontSize20>
            <TextArea placeholder='주요사업을 입력해주세요' col={3} onChange={Auth.setInfoBiz} value={Auth.info_biz}/>
          </W100>*/}
          <W100>
            <Text.FontSize20 style={{marginTop: 12}} color={DARKGRAY} fontWeight={500}>주요거래처[대표 거래처 3곳 이상]</Text.FontSize20>
            <TextArea placeholder='주요거래처를 입력해주세요' col={3} onChange={Auth.setDeal} value={Auth.deal}/>
          </W100>
          <W100>
            <Text.FontSize20 style={{marginTop: 12}} color={DARKGRAY} fontWeight={500}>회사소개[100자 이상]</Text.FontSize20>
            <TextArea placeholder='회사소개를 입력해주세요' col={3} onChange={Auth.setInfoCompany} value={Auth.info_company}/>
          </W100>
          {/*
          <W100>
           <SearchCategory>
            <Text.FontSize20 color="#001A56!important;" fontWeight={700}>가능한 제품 분야</Text.FontSize20>
            <Text.FontSize14 color={DARKGRAY} fontWeight={500}>자동차용품, 의료용품, 산업장비 및 부품, 주방용품, 생활용품, 유아용품, 가전/디지털, 스포츠용품을 검색해보세요</Text.FontSize14>
           </SearchCategory>
          </W100>

          <W100>
            <SearchCategory>

              <div>
                <InputComponent placeholder='검색어를 입력해주세요' type='text' onChange={this.searchPossible} value={possible_search}/>
                {
                  possible_list.length > 0 && possible_search && (
                    <SearchResult>
                      {possible_list.map((main) => {
                        console.log('구분선')
                        return main.category_set.map((sub, idx) => {
                          console.log(sub.category)
                          console.log(sub.subclass_set.length)
                          return sub.subclass_set.length > 0 && sub.subclass_set.map((_sub, index) => {
                            return (
                              <Text.FontSize14
                                key={index}
                                onClick={() => this.selectPossible(_sub)}
                                color={DARKGRAY}
                                fontWeight={500}
                                dangerouslySetInnerHTML={{__html: `${main.maincategory} > ${sub.category} > ${_sub.subclass}`}}
                              />
                            )
                          })
                        })
                      })}
                    </SearchResult>
                  )
                }
                <Button color={possible_selected ? PRIMARY : '#dedede'} onClick={this.addPossibleSet}>
                  <Text.FontSize20 color={possible_selected ? WHITE : DARKGRAY} fontWeight={500}>추가하기</Text.FontSize20>
                </Button>
              </div>
            </SearchCategory>
          </W100>
          {
            Auth.possible_set && Auth.possible_set.length > 0 && (
              <W100>
                <BadgeList>
                {
                  Auth.possible_set.map((item, idx) => {
                    return (
                      <Badge key={idx}>
                        <Text.FontSize20 color={DARKGRAY} fontWeight={500}>#{item.subclass}</Text.FontSize20>
                        <img src={badge_close} onClick={() => Auth.removePossibleSet(idx)}/>
                      </Badge>
                    )
                  })
                }
                </BadgeList>
              </W100>
            )
          }
          */}
          <W100>
            {/*<SearchCategory>
              <Text.FontSize20 color="#001A56!important;" fontWeight={700}>진행한 제품들</Text.FontSize20>
              <Text.FontSize14 color={BLACK1} fontWeight={500}>자동차용품, 의료용품, 산업장비 및 부품, 주방용품, 생활용품, 유아용품, 가전/디지털, 스포츠용품을 검색해보세요</Text.FontSize14>
           </SearchCategory>*/}
           <Text.FontSize20 style={{marginTop: 12}} color={DARKGRAY} fontWeight={500}>진행한 제품[10개 이상]</Text.FontSize20>
           <TextArea placeholder='진행한 제품들을 입력해주세요' col={3} onChange={Auth.setHistories} value={Auth.histories}/>

          </W100>
          {/*<W100>
            <SearchCategory>
              <div>
                <InputComponent placeholder='검색어를 입력해주세요' type='text' onChange={this.searchHistory} value={history_search}/>
                {
                  history_list.length > 0 && history_search && (
                    <SearchResult>
                      {history_list.map((main) => {
                        return main.category_set.map((sub, idx) => {
                          return sub.subclass_set.length > 0 && sub.subclass_set.map((_sub, index) => {
                            return (
                              <Text.FontSize14
                                key={index}
                                onClick={() => this.selectHistory(_sub)}
                                color={DARKGRAY}
                                fontWeight={500}
                                dangerouslySetInnerHTML={{__html: `${main.maincategory} > ${sub.category} > ${_sub.subclass}`}}
                              />
                            )
                          })
                        })
                      })}
                    </SearchResult>
                  )
                }
                <Button color={history_selected ? PRIMARY : '#dedede'} onClick={this.addHistorySet}>
                  <Text.FontSize20 color={history_selected ? WHITE : DARKGRAY} fontWeight={500}>추가하기</Text.FontSize20>
                </Button>
              </div>
            </SearchCategory>
          </W100>*/}
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
  ::-webkit-input-placeholder {
    color : #c7c7c7 !important;
    font-weight: normal !important;
    font-stretch: normal !important;
    font-style: normal !important;
    line-height: 1.7 !important;
    letter-spacing: -0.5px !important;
    
  }
  ::placeholder {
    color : #c7c7c7 !important;
    font-weight: normal !important;
    font-stretch: normal !important;
    font-style: normal !important;
    line-height: 1.7 !important;
    letter-spacing: -0.5px !important;
    /* 왜안먹노 ..  */

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
    padding: 0px 10px;
  }
`
const Content = styled.div`
  width : 996px;
  padding: 40px;
  border: solid 1px #c7c7c7;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
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
  /* > div > p {
    color: #4b4b4b;
  } */

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 10px 20px;
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
    font-size : 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.7;
    letter-spacing: -0.5px;
  }
  > p {
    margin-top: 30px;
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
