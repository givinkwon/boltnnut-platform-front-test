import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import SelectComponent from "Select";
import MobileSelectComponent from "MobileSelect";

import ButtonComponent from "components/Buttonv2";
import SearchBar from "./SearchBar";
import FilterBox from "./FilterBox";
import FilterBox2 from "./FilterBox2";
import Background from "components/Background";
import Container from "components/Containerv1";
import Modal from "./RequestModal";
import DoneModal from "./RequestDoneModal";

import { toJS } from "mobx";

import { PRIMARY2 } from "static/style";

const customStyles = {
  container: (base, state) => {
    return {
      ...base,
      zIndex: state.isFocused ? "98" : "auto", //Only when current state focused
      width: 185,
    };
  },
  dropdownIndicator: () => ({
    color: "#555555",
    width: 32,
    height: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 16,
    fontSize: 16,
  }),
  control: () => ({
    fontSize: 16,
    border: "1px solid #e6e6e6",
    backgroundColor: "#fff",
    display: "flex",
    borderRadius: 6,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

const tabletCustomStyles = {
  container: (base, state) => {
    return {
      ...base,
      zIndex: state.isFocused ? "98" : "auto", //Only when current state focused
      width: 160,
    };
  },
  dropdownIndicator: () => ({
    color: "#555555",
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 14,
    fontSize: 14,
  }),
  control: () => ({
    fontSize: 14,
    border: "1px solid #e6e6e6",
    backgroundColor: "#fff",
    display: "flex",
    borderRadius: 6,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

const mobileCustomStyles = {
  container: (base, state) => {
    return {
      ...base,
      zIndex: state.isFocused ? "98" : "auto", //Only when current state focused
      width: 130,
    };
  },
  dropdownIndicator: () => ({
    color: "#555555",
    width: 28,
    height: 28,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 12,
    fontSize: 12,
  }),
  control: () => ({
    fontSize: 12,
    border: "1px solid #e6e6e6",
    backgroundColor: "#fff",
    display: "flex",
    borderRadius: 6,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

@inject("Auth", "Project", "Request", "Partner", "ManufactureProcess")
@observer
class SearchFilterConatiner extends React.Component {
  state = {
    search: "",
    modal_open: false,
    list: false,
  };

  openModal = () => {
    const { Partner } = this.props;
    Partner.requestModalActive = true;
  };
  closeModal = () => {
    const { Partner } = this.props;

    Partner.requestModalActive = false;
  };

  componentDidMount = async () => {
    const { Partner } = this.props;
  };

  componentWillUnmount = () => {
    const { Partner } = this.props;
    Partner.filterArray.map((data, idx) => {
      data.checked = false;
    });
  };
  render() {
    const { Partner, Request, width } = this.props;
    return (
      <>
        {width && width > 767.99 ? (
          <ContainerV2>
            <Search>
              <span>검색</span>
              <SearchBar />
              <div
                onClick={() => {
                  this.openModal();
                }}
              >
                <span>업체수배&견적 무료의뢰 </span>
              </div>
              <div>
                <span>업체 찾기가 힘든 경우 클릭!</span>
              </div>
            </Search>

            {Partner.requestModalActive && (
              <Layer>
                <span>
                  <Modal
                    width={width}
                    open={Partner.requestModalActive}
                    close={this.closeModal}
                  ></Modal>
                </span>
              </Layer>
            )}

            {Partner.requestDoneModalActive && (
              <Layer>
                <span>
                  <DoneModal
                    width={width}
                    open={Partner.requestDoneModalActive}
                    close={this.closeModal}
                  />
                </span>
              </Layer>
            )}
          </ContainerV2>
        ) : (
          <ContainerV2>
            <Category>
              <span>분야</span>
              <div>
                <MobileSelect
                  placeholder="대 카테고리"
                  options={this.props.Partner.category_main_list}
                  getOptionLabel={(option) => option.maincategory}
                  styles={mobileCustomStyles}
                  onChange={Partner.setMainCategory}
                  theme={(theme) => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      neutral50: "#1A1A1A", // Placeholder color
                    },
                  })}
                />
              </div>
              <div>
                <MobileSelect
                  placeholder="소 카테고리"
                  options={Partner.category_middle_ary}
                  getOptionLabel={(option) => option.category}
                  value={
                    Partner.category_middle_ary[0] &&
                    Partner.input_small_category
                  }
                  styles={mobileCustomStyles}
                  onChange={Partner.setSmallCategory}
                  defaultValue={
                    Partner.category_middle_ary[0] &&
                    Partner.category_middle_ary[0].cagegory
                  }
                />
              </div>
            </Category>
            <Location>
              <span>위치</span>
              <MobileSelect
                placeholder="전체지역"
                options={this.props.Partner.filter_city_ary}
                getOptionLabel={(option) => option.city}
                onChange={Partner.setCityCategory}
                styles={mobileCustomStyles}
              />
            </Location>

            <Budget>
              <span>예산</span>
              <FilterBox2 data={viewArray} width={width} />
              <InputContainer>
                {!Partner.minDirectInput && (
                  <MobileSelect
                    styles={customStyles}
                    placeholder="0"
                    style={{ overflow: "visible" }}
                    options={budgetArray}
                    getOptionLabel={(option) => option.label}
                    onChange={Partner.setMinBudget}
                    styles={mobileCustomStyles}
                  />
                )}

                {Partner.minDirectInput && (
                  <DirectInputBox>
                    <input
                      placeholder="직접 입력하세요"
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          Partner.minDirectInput = false;
                        }
                      }}
                      onFocus={(e) => {
                        e.target.placeholder = "";
                      }}
                    />
                  </DirectInputBox>
                )}


                <span>원 ~ </span>
                {!Partner.maxDirectInput && (
                  <MobileSelect
                    styles={customStyles}
                    placeholder="0"
                    style={{ overflow: "visible" }}
                    options={budgetArray}
                    getOptionLabel={(option) => option.label}
                    onChange={Partner.setMaxBudget}
                    styles={mobileCustomStyles}
                  />
                )}

                {Partner.maxDirectInput && (
                  <DirectInputBox>
                    <input
                      placeholder="직접 입력하세요"
                      onBlur={(e) => {
                        if (e.target.value === "") {
                          Partner.maxDirectInput = false;
                        }
                      }}
                      onFocus={(e) => {
                        e.target.placeholder = "";
                      }}
                    />
                  </DirectInputBox>
                )}
                <span>원</span>

              </InputContainer>
            </Budget>
            <Filter>
              <span>필터</span>
              <span>(중복선택 가능)</span>
              <FilterBox
                filter="mobileFilter"
                purpose="filter"
                data={Partner.filterArray}
              />
            </Filter>

            <CloseButton>
              <div
                onClick={() => {
                  this.props.Partner.check_click_filter = false;
                }}
              >
                <span>닫기</span>
              </div>
            </CloseButton>

            {Partner.requestModalActive && (

              <Layer>
                <span>
                  <Modal
                    width={width}
                    open={Partner.requestModalActive}
                    close={this.closeModal}
                  ></Modal>
                </span>
              </Layer>
            )}

            {Partner.requestDoneModalActive && (
              <Layer>
                <span>
                  <DoneModal
                    width={width}
                    open={Partner.requestDoneModalActive}
                    close={this.closeModal}
                  />
                </span>
              </Layer>
            )}
          </ContainerV2>
        )}
      </>
    );
  }
}

export default SearchFilterConatiner;

const bigCategoryArray = [
  { label: "대 카테고리1", value: "대 카테고리1" },
  { label: "대 카테고리2", value: "대 카테고리2" },
];

const smallCategoryArray = [
  { label: "소 카테고리1", value: "소 카테고리1" },
  { label: "소 카테고리2", value: "소 카테고리2" },
];

const budgetArray = [
  { id: 1, label: "0", value: 0 },
  { id: 2, label: "1,000,000", value: 1000000 },
  { id: 3, label: "5,000,000", value: 5000000 },
  { id: 4, label: "10,000,000", value: 10000000 },
  { id: 5, label: "30,000,000", value: 30000000 },
  { id: 6, label: "직접 입력", value: "" },
];

const viewArray = [
  { id: 1, name: "공개", checked: false },
  { id: 2, name: "비공개", checked: false },
];
const ContainerV2 = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;

  // height: 400px;
  width: 1200px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 16px;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    justify-content: center;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 115%;
    justify-content: center;
  }
  @media (min-width: 1300px) {
    justify-content: center;
  }
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 70px;
  }
  >div:nth-of-type(2){
    box-shadow: 0 1px 3px 0 rgba(54, 56, 84, 0.3);
    padding: 8px 16px 9px 16px;
    box-sizing: border-box;
    width: 248px;
    height: 42px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    >span{
      color: #0a2165;
      font-size: 18px;
      font-weight: 500;
      line-height: 28px;
      letter-spacing: -0.45px;
    }
  }
  > div:last-child {
    
   
      position: absolute;
      bottom: -25px;
      right: 34px;
      >span{
        font-size: 14px;
        line-height: 30px;
        letter-spacing: -0.14px;
        color: #86888c;
        font-weight: normal;
      }
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 6px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    >span{
      font-size: 16px;
      width:40px;
    }
    >div:nth-of-type(2){
      width: 170px;
      margin-left:30px;

      >span{      
        font-size: 14px;        
        line-height: 28px;
        letter-spacing: -0.45px;
      }
    }
    > div:last-child {             
      right:168px;
      >span{
      
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > span {
      font-size: 18px;
      width:50px;
    }

    > div:last-child {             
      // right: 119px;
      right: 17px;
      >span{
      
      }
    }
    >div:nth-of-type(2){
      margin-left:30px;
      width:190px;

      >span{        
        font-size: 16px;        
        line-height: 28px;
        letter-spacing: -0.45px;
      }
    }
  }
  @media (min-width: 1300px) {
  }


  
`;
const Category = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  > div:nth-of-type(1) {
    margin-right: 24px;
  }
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 70px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
    margin-bottom: 6px;
    > div {
      display: inline-block;
    }
    > div:nth-of-type(1) {
      margin-right: 32px;
    }

    > span {
      font-size: 14px;
      // width: 40px;
      display: block;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > span {
      font-size: 16px;
      width: 40px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > span {
      font-size: 18px;
      width: 50px;
    }
  }
  @media (min-width: 1300px) {
  }
`;
const Location = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 70px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
    margin-bottom: 6px;
    > div {
      display: inline-block;
    }
    > div:nth-of-type(1) {
      margin-right: 32px;
    }

    > span {
      font-size: 14px;
      // width: 40px;
      display: block;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > span {
      font-size: 16px;
      width: 40px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > span {
      font-size: 18px;
      width: 50px;
    }
  }
  @media (min-width: 1300px) {
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  > span:nth-of-type(1) {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 84px;
  }
  > span:nth-of-type(2) {
    font-size: 16px;
    line-height: 40px;
    letter-spacinig: -0.4px;
    color: #999999;
    width: 172px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
    margin-bottom: 6px;
    > div {
      // display: inline-block;
    }
    > div:nth-of-type(1) {
      margin-right: 32px;
    }

    > span:nth-of-type(1) {
      font-size: 14px;
      // width: 40px;
      // display: block;
    }
    > span:nth-of-type(2) {
      font-size: 12px;
      line-height: 40px;
      letter-spacinig: -0.4px;
      color: #282c36;
      // width: 172px;
      width: auto;
      float: right;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > span:nth-of-type(1) {
      font-size: 16px;
      width: 40px;
    }
    > span:nth-of-type(2) {
      font-size: 13px;
      width: 132px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > span:nth-of-type(1) {
      font-size: 18px;
      width: 50px;
    }
    > span:nth-of-type(2) {
      font-size: 15px;
      width: 132px;
    }
  }
  @media (min-width: 1300px) {
  }
`;
const Budget = styled.div`
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 70px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
    margin-bottom: 6px;
    > div {
      display: inline-block;
    }
    > div:nth-of-type(1) {
      // margin-right: 32px;
      display: flex;
    }

    > span {
      font-size: 14px;
      // width: 40px;
      display: block;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    display: flex;
    align-items: center;

    > span {
      font-size: 16px;
      width: 40px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    display: flex;
    align-items: center;

    > span {
      font-size: 18px;
      width: 50px;
    }
  }
  @media (min-width: 1300px) {
    display: flex;
    align-items: center;
  }
`;

const SearchBarddd = styled.div`
  display: flex;
  width: 690px;
  height: 44px;
  box-sizing: border-box;
  margin 0 24px;
  
  input {
    width: 100%;
    padding: 0 14px;

    border: 1px solid #c6c7cc;
    border-radius: 3px;
    :focus {
      outline: none;
    }
    ::placeholder{
      color: #c1bfbf;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    // margin-top: 30px;
    flex-direction: column;
    input {
      font-size: 12px;
      width: 100%;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    // margin-top: 30px;
    input {
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    // margin-top: 40px;
    input {
      font-size: 17px;
      :focus {
        outline: none;
      }
      ::placeholder{
        color: #c1bfbf;
      }
    }
  }
  @media (min-width: 1300px) {
    input {
      font-size: 18px;
      :focus {
        outline: none;
      }
      ::placeholder{
        color: #c1bfbf;
      }
    }
  }
`;
const Form = styled.div`
  margin-top: 90px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  height: 50px;
`;

const SearchButton = styled(ButtonComponent)`
  border-radius: 3px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 70px;
    border: 1px solid #ffffff80;
    img {
      margin-right: 0 !important;
    }
    > p {
      display: none;
    }
  }
`;

const MobileSelect = styled(MobileSelectComponent)`
  width: 220px;
  // height: 32px;
  box-sizing: border-box;

  option {
    color: #c1bfbf;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    // margin: 0;
    // padding: 0;
    // margin-right: 8px;
    // width: 100%;
    // height: 32px;
    // object-fit: contain;
    // border-radius: 2px;
    // border: solid 0.5px #c7c7c7;
    // background-color: #ffffff;
    // position: relative;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 120px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 140px;
  }
  @media (min-width: 1300px) {
  }
`;

const Select = styled(SelectComponent)`
  width: 220px;
  // height: 32px;
  box-sizing: border-box;

  option {
    color: #c1bfbf;
  }

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

  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 120px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 140px;
  }
  @media (min-width: 1300px) {
  }
`;

const Box = styled.div`
  width: 220px;

  ${(props) =>
    props.active &&
    css`
      svg {
        @keyframes select {
          0% {
            transform: skewY(-180deg);
          }
        }

        animation: select 0.4s ease-out;
        transform: rotate(-180deg);
      }
    `}

  ${(props) =>
    !props.active &&
    css`
      svg {
        @keyframes selectOut {
          0% {
            transform: rotate(-180deg);
          }
        }
        animation: selectOut 0.4s;
      }
    `}
`;

const InputContainer = styled.div`
  //width: 25%;
  display: flex;

  > span {
    width: 38px;
    align-self: center;
    margin-left: 8px;
    margin-right: 16px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 16px;
    > span {
      font-size: 12px;
      width: 28px;
    }
    > span:nth-of-type(1) {
      margin-left: 4px;
      margin-right: 8px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;

const InputBox = styled.div`
display: flex;
width: 104px;
height: 32px;
box-sizing: border-box;
margin 0 7px;

input {
  width: 100%;
  //padding: 0 14px;

  border: 1px solid #c6c7cc;
  border-radius: 3px;
  text-align: right;
  font-size: 16px;
  :focus {
    outline: none;
  }
  ::placeholder{
    color: #c1bfbf;
    text-align: right;
  }
}
`;

const DirectInputBox = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  color: #282c36;
  width: 185px;
  height: 30px;
  border: solid 1px #c6c7cc;
  border-radius: 3px;
  padding: 4px;
  box-sizing: border-box;
  > input {
    width: 90%;
    // padding: 4px;
    outline: none;
    border: none;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    ::placeholder {
      font-size: 14px;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    width: 155px;
    > input {
      font-size: 12px;
      line-height: 23px;
      ::placeholder {
        font-size: 10px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 145px;
  }
  @media (min-width: 1300px) {
  }
`;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.5);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 40px;
    background-color: #0933b3;
    border-radius: 5px;
    > span {
      font-size: 16px;
      line-height: 52px;
      letter-spacing: -0.4px;
      color: #ffffff;
      font-weight: 500;
    }
  }
`;
