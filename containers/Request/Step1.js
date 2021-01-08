import React from 'react'
import styled, {css} from 'styled-components'
import { inject, observer } from 'mobx-react'
import Router from "next/router";

import RequestCardContainer from './RequestCard';
import * as Title from 'components/Title';
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'
import SelectComponent from 'components/Select';
import InputComponent from 'components/Input2';
import CheckBoxComponent from 'components/CheckBox';


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

@inject('Request', 'Partner')
@observer
class Step1Container extends React.Component {
  state = {
    step: 1,
    activeCount: 0,
    currentCount: 0
  }

  handleChange = () => {
    console.log("aa");
  }

  content1 = () => {
    const {Request, Partner} = this.props;
    const dueArray = [
      {label: '1 개월', value: 1},
      {label: '2 개월', value: 2},
      {label: '3 개월', value: 3},
      {label: '4 개월', value: 4},
      {label: '5 개월', value: 5},
      {label: '6 개월', value: 6},
      {label: '7 개월', value: 7},
      {label: '8 개월', value: 8},
      {label: '9 개월', value: 9},
      {label: '10 개월', value: 10},
      {label: '11 개월', value: 11},
      {label: '12 개월', value: 12},
    ];
    const costArray = [
      {label: '1000 만원 이하', value: '1000 만원 이하'},
      {label: '1000 만원 ~ 3000 만원', value: '1000 만원 ~ 3000 만원'},
      {label: '3000 만원 이상', value: '3000 만원 이상'}
    ];
     return(
     <>
       <Header> 
         관련 분야
       </Header>
       <SelectRow>

        <input value={Request.select_big ? Request.select_big.maincategory : null} class="Input"/>
        <Select
            styles={customStyles} options={Request.big_category_list} value={Request.select_big}
            getOptionLabel={(option) => option.maincategory} placeholder='옵션을 선택해주세요' onChange={Request.setBigCategory}
          />
        <div style={{marginRight: 38}}/>

        <input value={Request.select_mid ? Request.select_mid.category : null} class="Input"/>
        <Select
            styles={customStyles} options={Request.mid_category_list} value={Request.select_mid}
            getOptionLabel={(option) => option.category} placeholder='옵션을 선택해주세요' onChange={Request.setMidCategory}
          />
        </SelectRow>
        <Header style={{marginTop: 30}}> 
            희망 예산
        </Header>
        <SelectRow style={{width: 380}}>

          <input value={Request.input_price ? Request.input_price.value : null} class="Input"/>
          <Select
            styles={customStyles} options={costArray} value={Request.input_price}
            getOptionLabel={(option) => option.label} placeholder='예산을 선택해 주세요.' onChange={Request.setPrice}
          />
        </SelectRow>
          <Header style={{marginTop: 30}}>
            개발 기간
          </Header>
        <SelectRow style={{width: 180}}>

          <input value={Request.input_day ? Request.input_day.value : null} class="Input"/>
          <Select
            styles={customStyles} options={dueArray} value={Request.input_day}
            getOptionLabel={(option) => option.label} placeholder='개월' onChange={Request.setDue}
          />
        </SelectRow>
     </>
    );
  }
  content2 = () => {
    const {Request, Partner} = this.props;

    return(
     <>
       <Header> 
         제품명
       </Header>
       <SelectRow>
         <InputComponent
            placeholder="ex)반려동물을 위한 한 손 실리콘 샤워 패드"
            value={Request.input_name}
            onChange={Request.setInputName}
          />
       </SelectRow>
       <Header style={{marginTop: 30}}> 
            전화번호
       </Header>

       <SelectRow>
         
         <div name="Input"/>
         <InputComponent
            placeholder="전화번호를 입력해주세요."
            value={Request.input_phone}
            onChange={Request.setInputPhone}
          />
       </SelectRow>
       <Header style={{marginTop: 30}}>
        도면
       </Header>

       <SelectRow style={{width: "100%"}}>
         <div name="Input"/>
         <InputComponent
            file={true}
          />
         <CheckBoxComponent onChange = {Request.setCommonFile}/>
       </SelectRow>
     </>
    );
  }
   render() {
    const { Request, Partner } = this.props;
    const content1  = this.content1();
    const content2 = this.content2();

    return (
      <RequestCardContainer title={"기본 정보 입력"} content = {content1}>
      </RequestCardContainer>
    )
  }
}
export default Step1Container;

const Header = styled(Title.FontSize24)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
`
const SelectRow = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
`
const Select = styled(SelectComponent)`
  width: 400px;
`