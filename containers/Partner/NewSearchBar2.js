import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

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
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

//image
const phone = 'static/images/phone.png'
const file = 'static/images/mask.png'

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

@inject("Auth", "Partner")
@observer
class SearchBarContainer2 extends React.Component {
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
    value: 0
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
  async componentDidMount() {
    await this.props.Auth.checkLogin();
  }
  render() {
    const { search, modal_open } = this.state;
    const { Partner, Auth } = this.props;

    return (
      <CustomContainer>
        <SelectRow>
          <Title>
            제품분야
          </Title>
          <Select
            styles={customStyles} options={Auth.city_data} value={Auth.city}
            getOptionLabel={(option) => option.city} placeholder='옵션을 선택해주세요' onChange={Auth.setCity}/>
          <Select
            styles={customStyles} options={Auth.city_data} value={Auth.city}
            getOptionLabel={(option) => option.city} placeholder='옵션을 선택해주세요' onChange={Auth.setCity}/>
        </SelectRow>
        <SelectRow>
          <Title>
            희망예산
          </Title>
          {/* TODO */}
        </SelectRow>
        <SelectRow>
          <Title>
            기간
          </Title>
          {/* TODO */}
        </SelectRow>
        <SelectRow>
          <Title>
            제품이름
          </Title>
          <InputBox>
            <input
                placeholder="ex)반려동물 관리 장난감"
              />
        </InputBox>
        </SelectRow>
        <SelectRow>
          <Title>
            전화번호
          </Title>
          <PhoneBox>
            <PhoneInput/>
              <img src={phone}/>
            <PhoneInput/>
              <img src={phone}/>
            <PhoneInput/>
          </PhoneBox>
        </SelectRow>
        <SelectRow>
          <Title>
            도면
          </Title>
          <FileBox>
            <input
              placeholder = "도면이나 유사 이미지가 있으시면 첨부해주세요."
              />
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
              onClick={() => Router.push("/request")}
            >
              <Text.FontSize26 color={WHITE} fontWeight={500} borderRadius={0} style={{display: "flex", alignItems: "center"}}>
                가견적 넣기
              </Text.FontSize26>
            </Button>
          </ButtonBox>
      </CustomContainer>
    )
  }
}
export default SearchBarContainer2;

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
  }
`

const CustomContainer = styled(Container)`
  padding: 0 0;
  height: 650px;
`
const SelectRow = styled.div`
  width: 100%;
  display: inline-flex;
  align-items: center;
  margin-top : 22px;
`
const Title = styled.div`
  width: 94px;
  height: 38px;
  margin-right: 40px;
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
    height: ;
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
        color: ${WHITE}; !important;
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