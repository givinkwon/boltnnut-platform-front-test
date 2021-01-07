import React, { useState } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import * as RequestAPI from "axios/Request";
import Router, { withRouter, useRouter } from 'next/router'

import Container from "components/Container";
import Button from "components/Button";

import CheckClassModal from "CheckClassModal";
import CheckBoxComponent from "components/CheckBox";

import * as Text from "components/Text";
import { intcomma } from "utils/format";
import { WHITE, PRIMARY } from "static/style";
import SelectComponent from 'components/Select';
import InputComponent from 'components/Input2';
import PhoneInputComponent from 'components/PhoneInput';
//Slider
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import MobileSlider from "react-slick";

//image
const phone = 'static/images/phone.png'
const file = 'static/images/Mask.png'
const ddarrow = 'static/images/partner/Arrow.png'

//test
import * as CategoryAPI from "axios/Category";
import CounterContainer from 'containers/Request/Counter';

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

const MobilecustomStyles = {
  dropdownIndicator: () => ({
    color: '#555555',
    width: 40,
    height: 29,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000000' : '#555555',
    backgroundColor: '#fff',
    borderRadius: 0,
    fontSize: 14,
  }),
  control: () => ({
    fontSize: 14,
    border: '1px solid #e6e6e6',
    backgroundColor: '#fff',
    display: 'flex',
    padding: 0,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  }
}


@inject("Auth", "Partner", "Request", "Loading")
@observer
class SearchBarContainer2 extends React.Component {
  constructor(props) {
    super(props);
    this.file = React.createRef();
  }

  state = {
    search: "",
    modal_open: false,
    value: 0,
    //price_min: 0,
    price_max: [0,0],
    //due_min: 0,
    due_max: [0,0],
    show_detail: "none",
    fileName: '',
    file:'',
    width: 0,
    temp_min: 0,
    temp_max: 0,
    temp_due_min: 0,
    temp_due_max: 0,
  };

  Next = () => {
    const { Request } = this.props
    if(Request.type == 0 || Request.type == 1 || Request.type == 2){
      Request.setStep(2)
    }
    console.log(Request.type)
  }

  onChangeFile = (e) => {
    if(e.currentTarget.files.length === 0) {
      this.setState({
        ...this.state,
        fileName: '',
      })
      return
    }

    const fileName = e.currentTarget.files[0].name;
    this.setState({
      ...this.state,
      file: e.currentTarget.files[0],
      fileName: fileName,
    })


    this.props.Auth.setFile(e.currentTarget.files[0])
  }

  onSliderChange = value => {
    this.setState(
      {
        value
      },
      () => {
        console.log(this.state.value);
      }
    );
  };
  searchText = (e) => {
    this.props.Partner.search_text = e.target.value;
  };
  search = () => {
  //  if (this.props.Auth.logged_in_partner) {
  //    this.setState({ modal_open: true });
  //  } else if (this.props.Auth.logged_in_client.client_class) {
      this.props.Partner.search();
  // } else {
  //    this.setState({ modal_open: true });
  //  }
  };
  closeModal = () => {
    this.setState({
      ...this.state,
      modal_open: false,
    });
  };
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // TODO 검색 API
        this.props.Partner.search();
    }
  };
  RangeSlider = () => {
  [this.state.price_max, this.state.setPrice] = React.useState([0,0]);
  const { width } = this.state;

  const handleChange = (event, newValue) => {
      this.state.setPrice(newValue);
   };
  const handleChangeMin = (event) => {
      var temp_min = 0;
      temp_min = event.target.value;
      this.setState({...this.state, temp_min: temp_min});
      console.log(temp_min);
      this.state.price_max[0] = temp_min;
  }
  const handleChangeMax = (event) => {
    var temp_max = 0;
    temp_max = event.target.value;
    this.setState({...this.state, temp_max: temp_max});
    this.state.price_max[1] = temp_max;
  }

  return (
  <>
  { width > 767.98 ? (
    <>
      <BarWrapper>
            <CustomSlider
              ThumbComponent={this.CustomSliderThumbComponent}
              aria-labelledby="range-slider"
              onChange={handleChange}
              value = {this.state.price_max}
              step={100}
              min={0}
              max={10000}
              valueLabelDisplay="auto"
            />
      </BarWrapper>
      <PriceBox>
            <PriceInput>
              <input
                value = {this.state.price_max && this.state.price_max[0]}
                onChange = {handleChangeMin}
                type = "number"/>
              <span> 만원 </span>
            </PriceInput>
            <span> ~ </span>
            <PriceInput>
              <input
                value = {this.state.price_max && this.state.price_max[1]}
                onChange = {handleChangeMax}
                type = "number"
                />
              <span> 만원 </span>
            </PriceInput>
      </PriceBox>
    </>
    ) : (
      <>
      <PriceBox>
            <PriceInput>
              <input
                value = {this.state.price_max && this.state.price_max[0]}
                onChange = {handleChangeMin}
                type = "value"/>
              <span> 만원 </span>
            </PriceInput>
            <span> ~ </span>
            <PriceInput>
              <input
                value = {this.state.price_max && this.state.price_max[1]}
                onChange = {handleChangeMax}
                type = "value"
                />
              <span> 만원 </span>
            </PriceInput>
      </PriceBox>
    </>
    )}
  </>
    );
  }

  RangeSlider2 = () => {
  [this.state.due_max, this.state.setDue] = React.useState([0,0]);
  const { width } = this.state;
  const handleChange = (event, newValue) => {
    this.state.setDue(newValue);
    console.log(newValue)
   };
  const handleChangeDueMin = (event) => {
      var temp_due_min = 0;
      temp_due_min = event.target.value;
      this.setState({...this.state, temp_due_min: temp_due_min});
      this.state.due_max[0] = temp_due_min;
  }
  const handleChangeDueMax = (event) => {
    var temp_due_max = 0;
    temp_due_max = event.target.value;
    this.setState({...this.state, temp_due_max: temp_due_max});
    this.state.due_max[1] = temp_due_max;
  }
  return (
    <>
    { width > 767.98 ? (
        <>
          <BarWrapper>
            <CustomSlider
              ThumbComponent={this.CustomSliderThumbComponent}
              aria-labelledby="range-slider"
              onChange={handleChange}
              value = {this.state.due_max}
              step={1}
              min={0}
              max={12}
              valueLabelDisplay="auto"
            />
          </BarWrapper>
          <PriceBox>
            <PriceInput>
              <input
                value = {this.state.due_max[0]}
                onChange = {handleChangeDueMin}
                type = "value"
                />
              <span> 개월 </span>
            </PriceInput>
            <span> ~ </span>
            <PriceInput>
              <input
                value = {this.state.due_max[1]}
                onChange = {handleChangeDueMax}
                type = "value"
                />
              <span> 개월 </span>
            </PriceInput>
          </PriceBox>
        </>
        ) : (
        <>
          <PriceBox>
            <PriceInput>
              <input
                value = {this.state.due_max[0]}
                onChange = {handleChangeDueMin}
                type = "value"
                />
              <span> 개월 </span>
            </PriceInput>
            <span> ~ </span>
            <PriceInput>
              <input
                value = {this.state.due_max[1]}
                onChange = {handleChangeDueMax}
                type = "value"
                />
              <span> 개월 </span>
            </PriceInput>
          </PriceBox>
        </>
        )}
    </>
    );
  }

  async componentDidMount() {
    await this.props.Auth.checkLogin();
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
    if (this.props.is_request == true) {
      this.setState({...this.state, show_detail: true})
    };
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  CustomSliderThumbComponent (props) {
  return (
    <div {...props}>
      <ThumbCircle>
      </ThumbCircle>
    </div>
    );
  }

  showDetail = () => {
    if (this.props.Partner.select_big == null){
       alert("제품분야를 선택해주세요")
       return
    }
    if (this.props.Partner.select_mid == null){
       alert("제품분야를 선택해주세요")
       return
    }
    if (this.state.price_max[1] == 0){
       alert("희망 예산을 선택해주세요")
       return
    }
    if (this.state.due_max[1] == 0){
       alert("희망 개발 기간을 선택해주세요")
       return
    }
    //console.log(this.state.price_max[1], this.state.price_max)
    //console.log(this.state.due_max[1], this.state.due_max)
    if (this.state.show_detail == "none") {
    this.setState({...this.state, show_detail: true})
    } else {
    this.setState({...this.state, show_detail: "none"})
    }
    console.log(this.state.show_detail)
  }
  showSkeleton = () => {
    if (this.state.show_detail == "none") {
    this.setState({...this.state, show_detail: true})
    } else {
    this.setState({...this.state, show_detail: "none"})
    }
    console.log(this.state.show_detail)
  }

  submit = () => {
    const { Request } = this.props;
    const {fileName, file, price_max, due_max} = this.state;

    if (!Request.input_name) {
      alert("제품 의뢰명을 입력해주세요.");
      return;
    }
    if (!Request.input_phone) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    if (!Request.input_phone2) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    if (!Request.input_phone3) {
      alert("전화번호를 입력해주세요.");
      return;
    }

    var formData = new FormData();
    formData.append("content", "<상담 후에 수정하길 바랍니다>")
    formData.append("client", 19) // 원래 19
    formData.append("category",1) // 일단 대충개발
    formData.append("product", 30) // 의뢰제품
    formData.append("name", Request.input_name + ":" + Request.input_phone + Request.input_phone2 + Request.input_phone3);
    formData.append("price", price_max[0] + "/" + price_max[1]);
    formData.append("day", due_max[0] + "/" + due_max[1]);

    formData.append("phone", Request.input_phone + Request.input_phone2 + Request.input_phone3);
    //
    if(this.state.file) {
      formData.append("file", this.state.file);
    }
    const req = {
      data: formData,
    };
    RequestAPI.create(req)
      .then((res) => {
        console.log("create: ", res);
        Request.created_request = res.data

        const token = localStorage.getItem("token")
        if(!token) { return }
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      })

      Router.push({
        pathname: `/complete`,
        query: {},
        });
  };
  render() {
    const { search, modal_open, price_max, price_min, due_max, due_min, show_detail, width } = this.state;
    const { Partner, Auth, Request, Loading } = this.props;
    return (
      <CustomContainer>
      <>
      { width > 767.98 ? (
        <>
        <SelectRow>
          <Title>
            제품분야
          </Title>
          <Select
            styles={customStyles} options={Partner.category_list} value={Partner.select_big}
            getOptionLabel={(option) => option.maincategory} placeholder='옵션을 선택해주세요' onChange={Partner.setBigCategory}
          />
          <Select
            styles={customStyles} options={Partner.request_middle_list} value={Partner.select_mid}
            getOptionLabel={(option) => option.category} placeholder='옵션을 선택해주세요' onChange={Partner.setMidCategory}/>
          {this.state.show_detail == "none" && <DropButton
            onClick = {this.showDetail}
          >
            <span> 무료 가견적 받기 </span>
          </DropButton>}
        </SelectRow>

        <SelectRow>
          <Title>
            희망예산
          </Title>
          <this.RangeSlider/>
        </SelectRow>

        <SelectRow>
          <Title>
            개발기간
          </Title>
          <this.RangeSlider2/>
        </SelectRow>

        <DropDown
          style={{display: show_detail}}
        >

        <SelectRow>
          <Title>
            제품이름
          </Title>
            <InputComponent
                placeholder="ex)반려동물 관리 장난감"
                value={Request.input_name}
                onChange={Request.setInputName}
            />
        </SelectRow>

        <SelectRow>
          <Title>
            전화번호
          </Title>
          <PhoneBox>
            <InputComponent
                value={Request.input_phone}
                onChange={Request.setInputPhone}
            />
              <img src={phone}/>
            <InputComponent
                value={Request.input_phone2}
                onChange={Request.setInputPhone2}
            />
              <img src={phone}/>
            <InputComponent
                value={Request.input_phone3}
                onChange={Request.setInputPhone3}
            />
          </PhoneBox>
        </SelectRow>

        <SelectRow>
          <Title>
            첨부파일
          </Title>
          <FileBox
            onClick = {()=>this.file.current.click()}>
            <input
              onChange = {this.onChangeFile}
              type = "file"
              style={{display: 'none'}}
              ref={this.file}
              />
            <span> { this.state.fileName ? this.state.fileName : '도면, 유사 이미지, 기획서 등이 있으시면 첨부해주세요.' }</span>
            <img
              src="/static/images/Mask.png"
              />
          </FileBox>
        </SelectRow>

        {this.props.is_request &&
            <CounterContainer/>
        }

        <ButtonBox>
            <Button
              id={'request_submit_button'}
              backgroundColor={WHITE + "00"}
              borderColor={WHITE}
              onClick={this.submit}
            >
              <Text.FontSize26 color={WHITE} fontWeight={500} borderRadius={0} style={{display: "flex", alignItems: "center"}}>
                가견적 받기
              </Text.FontSize26>
            </Button>
          </ButtonBox>
      </DropDown>
      </>
      )
       : (
       // 모바일
       <>
         <SelectRow>
           <Title> 제품분야 </Title>
           <MobileSelectBox>
           <Select
              styles={MobilecustomStyles} options={Partner.category_list} value={Partner.select_big}
              getOptionLabel={(option) => option.maincategory} placeholder='대 카테고리' onChange={Partner.setBigCategory}/>
           <Select
              style={{marginRight: 0}}
              styles={MobilecustomStyles} options={Partner.request_middle_list} value={Partner.select_mid}
              getOptionLabel={(option) => option.category} placeholder='중 카테고리' onChange={Partner.setMidCategory}/>
           </MobileSelectBox>
         </SelectRow>
         <SelectRow>
             <Title> 희망예산 </Title>
             {/*<PriceBox>
               <PriceInput>
               </PriceInput>
               <span> ~ </span>
               <PriceInput>
               </PriceInput>
             </PriceBox>*/}
             <this.RangeSlider/>
           </SelectRow>
         <SelectRow>
           <Title> 개발기간 </Title>
           <this.RangeSlider2/>
         </SelectRow>
       { show_detail != "none" ? (
       <>
         <SelectRow>
           <Title>
             제품이름
           </Title>
            <InputComponent
                placeholder="ex)반려동물 관리 장난감"
                value={Request.input_name}
                onChange={Request.setInputName}
            />
         </SelectRow>
         <SelectRow>
           <Title>
            전화번호
           </Title>
           <PhoneBox>
            <PhoneInputComponent
                value={Request.input_phone}
                onChange={Request.setInputPhone}
            />
              <img src={phone}/>
            <PhoneInputComponent
                value={Request.input_phone2}
                onChange={Request.setInputPhone2}
            />
              <img src={phone}/>
            <PhoneInputComponent
                value={Request.input_phone3}
                onChange={Request.setInputPhone3}
            />
           </PhoneBox>
         </SelectRow>
         <SelectRow>
           <Title>
             첨부파일
           </Title>
           <FileBox
            onClick = {()=>this.file.current.click()}>
            <input
              onChange = {this.onChangeFile}
              type = "file"
              style={{display: 'none'}}
              ref={this.file}
              />
            <span> { this.state.fileName ? this.state.fileName : '도면, 유사 이미지, 기획서 등이 있으시면 첨부해주세요.' }</span>
            <img
              src="/static/images/Mask.png"
              />
           </FileBox>
         </SelectRow>
         <SelectRow style={{marginTop: 24, display: "block", justifyContent: "center"}}>
             <div>
               <MobileButton2
                id={'request_submit_button'}              
                 onClick = {this.submit}
                 style={{margin: 'auto'}}
               >
                 <span>가견적 받기</span>
               </MobileButton2>
               { !this.props.is_request &&
               <img src={ddarrow} style={{float: 'right', paddingRight: '10%'}}
                onClick = {this.showDetail}
                />
                }
             </div>
         </SelectRow>
       </>
         ) : (
         <>
           <SelectRow style={{justifyContent: 'center'}}>
               <MobileButton2
                id={'request_submit_button'}              
                onClick = {this.showDetail}>
                 <span>가견적 받기</span>
               </MobileButton2>
           </SelectRow>
         </>
         )}
         </>
       )
    }
        </>
      </CustomContainer>
    )
  }
}
export default withRouter(SearchBarContainer2);

const DropDown = styled.div`
  width: 100%;
  transition: display 2s;
`

const InputBox = styled.div`
  width: 501px;
  height: 50px;
  object-fit: contain;
  border-radius: 3px;
  border: solid 1px #dcdcdc;
  background-color: #ffffff;
  align-items: center;
  display: flex;
  > img {
      width: 26px;
      height: 26px;
      object-fit: contain;
      cursor: pointer;
  }
  > input {
  width: 207px;
  height: 30px;
  border: none;
  object-fit: contain;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.95;
  letter-spacing: normal;
  text-align: left;
  color: #b7b7b7;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  outline: none;
  }
`

const CustomContainer = styled(Container)`
  padding: 0 0;
  width: 100%;
  @media (min-width: 0px) and (max-width: 767.98px) {
        padding-left: calc(4.4%);
        padding-right: calc(4.4%);
        width: 100%;
        padding-bottom: 35px;
    }
    @media (min-width: 767.99px) and (max-width: 991.98px) {
    }
`
const SelectRow = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  margin-bottom: 22px;
  position: relative;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 16px;
    margin-bottom: 0px;
    > img {
      align-self: flex-end;
      float: right;
    }

    }
  @media (min-width: 767.99px) and (max-width: 991.98px) {
    }
`
const Title = styled.div`
  white-space: nowrap;
  height: 38px;
  margin-right: 34px;
  object-fit: contain;
  font-size: 26px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.31;
  letter-spacing: -0.65px;
  text-align: left;
  color: #191919;
  @media (min-width: 0px) and (max-width: 767.98px) {
      width: 46px !important;
      white-space: nowrap;
      height: 18px;
      object-fit: contain;
      font-size: 12px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 0.67;
      letter-spacing: -0.3px;
      text-align: left;
      color: #191919;
      margin-right: 0px;
      display: flex;
      align-items: center;
    }
  @media (min-width: 767.99px) and (max-width: 1299.98px) {
    font-size: 16px;
    white-space: nowrap;
  }
`
const Select = styled(SelectComponent)`
  width: 400px;
  height: 100%;
  margin-right: 47px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 0;
    padding: 0;
    margin-right: 8px;
    width: 100%;
    height: 32px;
    object-fit: contain;
    border-radius: 2px;
    border: solid 0.5px #c7c7c7;
    background-color: #ffffff;
    position: relative;
  }
`
const Wrapper = styled.div`
  width: 400px;
  margin: 50px;
`
const PhoneBox = styled.div`
  width: 447px;
  height: 100%;
  display: inline-flex;
  text-align: left;
  > img {
    width: 16px;
    object-fit: contain;
    margin-left: 14.5px;
    margin-right: 14.5px;
    @media (min-width: 0px) and (max-width: 767.98px) {
        width : 5px;
        margin-left: 6.9px;
        margin-right: 7.1px;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-left: 12px;
  }
`
const FileBox = styled.div`
  width: 767px;
  height: 50px;
  object-fit: contain;
  border-radius: 3px;
  border: solid 1px #c7c7c7;
  background-color: #ffffff;
  align-items: center;
  > img {
      width: 23px;
      height: 100%;
      object-fit: contain;
      cursor: pointer;
      padding-right: calc(5%);
      float: right;
      @media (min-width: 0px) and (max-width: 767.98px) {
      }
  }
  > input {
    border: none;
    float: left;
    width: 698px;
    height: 25px;
    object-fit: contain;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 0.95;
    letter-spacing: normal;
    text-align: left;
    color: #b7b7b7;
    padding-left: 20px;
    padding-top: 11px;
    padding-bottom: 11px;
    outline: none;
  }
  > span {
    width: 80%;
    height: 100%;
    position: absolute;
    white-space: nowrap;
    object-fit: contain;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.95;
    letter-spacing: normal;
    text-align: left;
    color: #b7b7b7;
    display: flex;
    align-items: center;
    padding-left: 20px;
    @media (min-width: 0px) and (max-width: 767.98px) {
      width: 240px;
      height: 100%;
      object-fit: contain;
      padding-left: calc(4%);
      font-size: 11px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 0.36;
      letter-spacing: normal;
      text-align: left;
      color: #b7b7b7;
      position: absolute;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 75.6%;
    height: 32px;
    margin-left: 10px;
  }
`
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  div:nth-of-type(1) {
    width: 166px;
    height: 58px;
    object-fit: contain;
    background-color: #0a2165;
    border: none;
    border-radius: 10px;
    margin-top: 70px;
    margin-bottom: 70px;
    :hover {
      background-color: #0933b3;//${WHITE};
      > p {
        color: ${WHITE} !important;
      }

    }
    @media (min-width: 0px) and (max-width: 767.98px) {
        width : 40%
    }
    @media (min-width: 767px) and (max-width: 991.98px) {
  	    width : 30%
    }
  }
`
const BarWrapper = styled.div`
  width: 619px;
  height: 24px;
  display: flex;
  align-items: center;
`
const CustomSlider = withStyles({
  root: {
    color: '#0933b3',
    height: 4
    },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#0933b3',
    marginTop: -11,
    marginLeft: -13,
  },
  track: {
    height: 4,
  },
  rail: {
    color: '#767676',
    opacity: 1,
    height: 4,
  },
})(Slider);

const ThumbCircle = styled.circle`
  width: 12px;
  height: 12px;
  background-color: #ffffff;
  border-radius: 50%;
`
const PriceInput = styled.div`
  width: 180px;
  height: 43px;
  object-fit: contain;
  border-radius: 3px;
  border: solid 1px #c7c7c7;
  background-color: #ffffff;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.5px;
  text-align: left;
  color: #999999;
  display: flex;
  align-items: center;
  > input {
  width: 120px;
  height: 37px;
  object-fit: contain;
  font-family: 'Roboto', sans-serif;
  font-size: 21px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.19;
  letter-spacing: 0.42px;
  text-align: right;
  color: #191919;
  border: none;
  display: flex;
  align-items: center;
  outline: none;
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 100%;
    width: 100%;
    padding: 0 3px;
    font-size: 14px;
    font-family: "Roboto";
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.36;
    letter-spacing: 0.28px;
    color: #767676;
    }
  }
  > span {
    margin-left: 4px;
    margin-right: 10px;
    font-weight: 500;
    width: 40px;
    @media (min-width: 0px) and (max-width: 767.98px) {
      font-size: 12px;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    height: 32px;
    object-fit: contain;
    border-radius: 2px;
    border: solid 0.5px #c7c7c7;
    background-color: #ffffff;
  }
`
const PriceBox = styled.div`
  width: 399px;
  height: 100%;
  margin-left: 48px;
  display: inline-flex;
  align-items: center;
  > span {
      width: 11px;
      height: 29px;
      object-fit: contain;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 2.8;
      letter-spacing: normal;
      text-align: left;
      color: #999999;
      margin-right: 14px; margin-left: 14px;
      display: flex;
      align-items: center;
      @media (min-width: 0px) and (max-width: 767.98px) {
        margin: 0;
        margin-left: 12px;
        margin-right: 13px;
      }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 0;
    width: 100%;
    margin-left: 12px;
    padding-right: calc(8%);
    justify-content: center;
  }
`
const DropButton = styled.div`
  width: 180px;
  height: 51px;
  object-fit: contain;
  background-color: #0a2165;
  border: solid 1px #0a2165;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  > span {
    display: flex;
    align-items: center;
    height: 31px;
    font-size: 21px;
    font-weight: 500;
    font-family: 'Noto Sans KR',sans-serif;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: normal;
    text-align: left;
    color: #fffdf8;
  }
  @media (min-width: 767.99px) and (max-width: 1299.98px) {
    height: 41px;
    > span {
      font-size: 14px;
    }
  }
`
const MobileSelectBox = styled.div`
  display: inline-flex;
  width: 100%;
  margin-left: 12px;
  padding-right: calc(8%);
  justify-content: center;
  > div {
    :nth-of-type(2) {
      margin-right: 0px;
    }
  }
`
const MobileButton1 = styled.div`
  width: 94px;
  height: 28px;
  border-radius: 2px;
  border: solid 1px #093976;
  display: flex;
  align-items: center;
  justify-content: center;
  > span {
    height: 18px;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.42;
    letter-spacing: normal;
    text-align: left;
    color: #093976;
    display: flex;
    align-items: center;
  }
`
const MobileButton2 = styled.div`
  width: 99px;
  height: 28px;
  border-radius: 2px;
  background-color: #093976;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  cursor: pointer;
  > span {
    height: 18px;
    font-size: 12px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.42;
    letter-spacing: normal;
    text-align: left;
    color: #fffdf8;
    display: flex;
    align-items: center;
  }
`
const CategoryBox = styled.div`
  width: 64px;
  height: 22px;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  > span {
    width: 32px;
    height: 18px;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.67;
    letter-spacing: -0.3px;
    text-align: center;
  }
  .active {
    width: 64px;
    height: 22px;
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
    background-color: #0933b3;
      > span {
        color: white;
        font-size: 12px;
      }
    }
`
const List = styled(SelectRow)`
  display: block;
  padding-top: 33px;
  padding-bottom: 12px;
  .slick-list {
    height: 24px;
    > div > div {
      width: 64px !important;
      margin-right: 12px;
    }
    > div > div > div {
        width: 64px;
    }
  }
`
