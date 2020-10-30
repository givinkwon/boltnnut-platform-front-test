import React, { useState } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import * as RequestAPI from "axios/Request";

import Container from "components/Container";
import Button from "components/Button";

import CheckClassModal from "CheckClassModal";
import CheckBoxComponent from "components/CheckBox";

import * as Text from "components/Text";
import { intcomma } from "utils/format";
import { WHITE, PRIMARY } from "static/style";
import SelectComponent from 'components/Select';
import InputComponent from 'components/Input2';
//Slider
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

//image
const phone = 'static/images/phone.png'
const file = 'static/images/mask.png'

//test

import * as CategoryAPI from "axios/Category";

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


@inject("Auth", "Partner", "Request")
@observer
class SearchBarContainer2 extends React.Component {
  constructor(props) {
    super(props);
    this.portfolio = React.createRef();
  }

  onChangePortfolio = (e) => {
    if(e.currentTarget.files.length === 0) {
      this.setState({
        ...this.state,
        portfolioValue: '',
      })
      return
    }

    const fileName = e.currentTarget.files[0].name;
    this.setState({
      ...this.state,
      portfolioValue: fileName,
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

  state = {
    search: "",
    modal_open: false,
    value: 0,
    //price_min: 0,
    price_max: [0,0],
    //due_min: 0,
    due_max: [0,0],
    show_detail: "none",
    portfolioValue: ''
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

  const handleChange = (event, newValue) => {
    this.state.setPrice(newValue);
   };

  return (
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
                value = {this.state.price_max[0]}
                onChange = {handleChange}
                type = "value"/>
              <span> 만원 </span>
            </PriceInput>
            <span> ~ </span>
            <PriceInput>
              <input
                value = {this.state.price_max[1]}
                onChange = {handleChange}
                type = "value"
                />
              <span> 만원 </span>
            </PriceInput>
      </PriceBox>
    </>
    );
  }

  RangeSlider2 = () => {
  [this.state.due_max, this.state.setDue] = React.useState([0,0]);
  //console.log(due_max[0], due_max[1])
  const handleChange = (event, newValue) => {
    this.state.setDue(newValue);
   };

  return (
    <>
          <BarWrapper>
            <CustomSlider
              ThumbComponent={this.CustomSliderThumbComponent}
              aria-labelledby="range-slider"
              onChange={handleChange}
              value = {this.state.due_max}
              step={1}
              min={0}
              max={48}
              valueLabelDisplay="auto"
            />
          </BarWrapper>
          <PriceBox>
            <PriceInput>
              <input
                value = {this.state.due_max[0]}
                onChange = {handleChange}
                type = "value"
                />
              <span> 개월 </span>
            </PriceInput>
            <span> ~ </span>
            <PriceInput>
              <input
                value = {this.state.due_max[1]}
                onChange = {handleChange}
                type = "value"
                />
              <span> 개월 </span>
            </PriceInput>
          </PriceBox>
    </>
    );
  }

//  handleChange = (event, newValue) => {
//    if (event.target.value) {
//      this.setState({...this.state, price_max: event.target.value})
//    } else {
//    this.setState({...this.state, price_max: newValue})
//    }
//  };
//  handleChange2 = (event, newValue) => {
//    if (event.target.value) {
//      this.setState({...this.state, due_max: event.target.value})
//    } else {
//    this.setState({...this.state, due_max: newValue})
//    }
//  };
  async componentDidMount() {
    await this.props.Auth.checkLogin();

  }
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

  submit = () => {
    const { Request, router  } = this.props;

    const {file, price_max, due_max} = this.state;

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
    formData.append("client", 18)
    formData.append("category",1) // 일단 대충개발
    formData.append("product", 30) // 의뢰제품
    formData.append("name", Request.input_name);
    formData.append("price", price_max[0] + "/" + price_max[1]);
    formData.append("day", due_max[0] + "/" + due_max[1]);

    formData.append("phone", Request.input_phone + Request.input_phone2 + Request.input_phone3);
    //
    if(file) {
      formData.append("file", file);
    }
    const req = {
      data: formData,
    };
    RequestAPI.create(req)
      .then((res) => {
        console.log("create: ", res);
        Request.created_request = res.data
        Request.loadAppropriatePartners()

        const token = localStorage.getItem("token")
        if(!token) { return }

        //const token = localStorage.getItem("token")
        //if(!token) { return }
        {/*console.log(res.data.category.join(','))
        const new_req = {
            headers: {
                Authorization: `Token ${token}`,
            },
            data: {
                subclass: res.data.product,
                subject: res.data.name,
                category: res.data.category,
            },
        }
        RequestAPI.sendKakao(new_req)
          .then((res) => {
            console.log("sendKakao :", res);
          })
          .catch((e) => {
            console.log(e);
            console.log(e.response);
            console.log(e.response.new_req);
          });
          */}
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      })

  };


  render() {
    const { search, modal_open, price_max, price_min, due_max, due_min, show_detail } = this.state;
    const { Partner, Auth, Request } = this.props;
    {/*console.log(Partner.select_big)
    console.log(Partner.request_middle_list)*/}

    return (
      <CustomContainer>
        <SelectRow>
          <Title>
            제품분야
          </Title>
          <Select
            styles={customStyles} options={Partner.category_list} value={Partner.select_big}
            getOptionLabel={(option) => option.maincategory} placeholder='옵션을 선택해주세요' onChange={Partner.setBigCategory}/>
          <Select
            styles={customStyles} options={Partner.request_middle_list} value={Partner.select_mid}
            getOptionLabel={(option) => option.category} placeholder='옵션을 선택해주세요' onChange={Partner.setMidCategory}/>
          {this.state.show_detail == "none" && <DropButton
            onClick = {this.showDetail}
          >
            <span> 무료 가견적 넣기 </span>
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
            기간
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
            도면
          </Title>
          <FileBox
            onClick = {()=>this.portfolio.current.click()}>
            <input
              onChange = {this.onChangePortfolio}
              type = "file"
              style={{display: 'none'}}
              ref={this.portfolio}
              />
            <span> { this.state.portfolioValue ? this.state.portfolioValue : '도면이나 유사 이미지가 있으시면 첨부해주세요.' }</span>
            <img
              src="/static/images/mask.png"
              />
          </FileBox>
        </SelectRow>

        <ButtonBox>
            <Button
              id={'request'}
              backgroundColor={WHITE + "00"}
              borderColor={WHITE}
              onClick={this.submit}
            >
              <Text.FontSize26 color={WHITE} fontWeight={500} borderRadius={0} style={{display: "flex", alignItems: "center"}}>
                가견적 넣기
              </Text.FontSize26>
            </Button>
          </ButtonBox>
      </DropDown>
      </CustomContainer>
    )
  }
}
export default SearchBarContainer2;

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
`
const SelectRow = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  margin-bottom: 22px;
`
const Title = styled.div`
  width: 100px;
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
`
const Select = styled(SelectComponent)`
  width: 400px;
  height: 100%;
  margin-right: 47px;
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
  }
`
const PhoneInput = styled.input`
  width: 134px;
  height: 50px;
  object-fit: contain;
  border-radius: 3px;
  border: solid 1px #c7c7c7;
  background-color: #ffffff;
  outline: none;
  font-size: 23px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.22;
  letter-spacing: 0.58px;
  text-align: center;
  color: #b7b7b7;
`
const FileBox = styled.div`
  width: 767px;
  height: 50px;
  object-fit: contain;
  border-radius: 3px;
  border: solid 1px #c7c7c7;
  background-color: #ffffff;
  align-items: center;
  display: flex;
  > img {
      width: 23px;
      height: 22px;
      object-fit: contain;
      cursor: pointer;
      padding-right: 26px;
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
    width: 100%;
    height: 30px;
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
    @media (min-width: 768px) and (max-width: 991.98px) {
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
  }
  > span {
    margin-left: 4px;
    margin-right: 10px;
    font-weight: 500;
    width: 40px;
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
`
