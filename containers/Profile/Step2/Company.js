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
        {/*<W30 center> //0928수정
            <InputComponent placeholder='종업원 수를 입력해주세요' label='종업원 수' type='number' onChange={Profile.setEmployee} value={Profile.employee}/>
          </W30>
          <W30>
            <InputComponent placeholder='설립연도를 입력해주세요' label='설립연도' type='number' onChange={Profile.setCareer} value={Profile.career}/>
          </W30>
          <W30>
            <InputComponent placeholder='매출액을 입력해주세요' label='매출액' type='number' onChange={Profile.setRevenue} value={Profile.revenue}/>
          </W30>*/}
          <W30 center select>
            <SelectBox>
              <Text.FontSize20 color={DARKGRAY} fontWeight={500}>시/도</Text.FontSize20>
              <SelectComponent
                styles={customStyles} options={Profile.city_data} value={city ? city : Profile.getCityById(Profile.data.city)}
                getOptionLabel={(option) => option.city} placeholder='옵션을 선택해주세요' onChange={Profile.setCity}/>
            </SelectBox>
          </W30>
          {/*<W30 select>
            <SelectBox>
                <Text.FontSize20 color={DARKGRAY} fontWeight={500}>지역</Text.FontSize20>
                <SelectComponent
                  styles={customStyles} options={Profile.region_data} value={region}
                  getOptionLabel={(option) => option.region} placeholder='옵션을 선택해주세요' onChange={Profile.setRegion}/>
              </SelectBox>
          </W30>*/}
          {/*<W100>
            <Text.FontSize20 style={{marginTop: 15}} color={DARKGRAY} fontWeight={500}>주요사업</Text.FontSize20>
            <TextArea placeholder='주요사업을 입력해주세요' col={3} onChange={Profile.setInfoBiz} value={Profile.info_biz}/>
          </W100>*/}
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
          {/*
          <W100>
           <SearchCategory>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>가능한 제품 분야</Text.FontSize20>
            <Text.FontSize14 color="#767676!important;" fontWeight={500}>자동차용품, 의료용품, 산업장비 및 부품, 주방용품, 생활용품, 유아용품, 가전/디지털, 스포츠용품을 검색해보세요</Text.FontSize14>
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
                        return main.category_set.map((sub, idx) => {
                          return sub.subclass_set.length > 0 && sub.subclass_set.map((_sub, index) => {
                            return (
                              <Text.FontSize14
                                key={index}
                                onClick={() => this.selectPossible(_sub)}
                                color={DARKGRAY}
                                fontWeight={500}
                                dangerouslySetInnerHTML={{__html: `${main.maincategory} > ${sub.category} > ${_sub.subclass}`}}
                              />
                            );
                          })
                        })
                      })}
                    </SearchResult>
                  )
                }
                <Button color={possible_selected ? PRIMARY : '#dedede'} onClick={this.addPossibleSet}>
                  <Text.FontSize20 color={possible_selected ? WHITE : "#404040"} fontWeight={500}>추가하기</Text.FontSize20>
                </Button>
              </div>
            </SearchCategory>
          </W100>
          {
            Profile.possible_set && Profile.possible_set.length > 0 && (
              <W100>
                <BadgeList>
                {
                  Profile.possible_set.map((item, idx) => {
                    return (
                      <Badge key={item.id}>
                        <Text.FontSize20 color={DARKGRAY} fontWeight={500}>#{item.subclass}</Text.FontSize20>
                        <img src={badge_close} onClick={() => Profile.removePossibleSet(idx)}/>
                      </Badge>
                    )
                  })
                }
                </BadgeList>
              </W100>
            )
          }
          */}
          {/*<W100>
           <SearchCategory>
            <Text.FontSize20 color={PRIMARY} fontWeight={700}>진행한 제품 분야</Text.FontSize20>
            <Text.FontSize14 color="#767676!important;"  fontWeight={500}>자동차용품, 의료용품, 산업장비 및 부품, 주방용품, 생활용품, 유아용품, 가전/디지털, 스포츠용품을 검색해보세요</Text.FontSize14>
           </SearchCategory>
          </W100>
          <W100>
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
                  <Text.FontSize20 color={history_selected ? WHITE : '#404040'} fontWeight={500}>추가하기</Text.FontSize20>
                </Button>
              </div>
            </SearchCategory>
          </W100>
          {
            Profile.history_set && Profile.history_set.length > 0 && (
              <W100>
                <BadgeList>
                {
                  Profile.history_set.map((item, idx) => {
                    return (
                      <Badge key={idx}>
                        <Text.FontSize20 color={DARKGRAY} fontWeight={500}>#{item.subclass}</Text.FontSize20>
                        <img src={badge_close} onClick={() => Profile.removeHistorySet(idx)}/>
                      </Badge>
                    )
                  })
                }
                </BadgeList>
              </W100>
            )
          }*/}
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
