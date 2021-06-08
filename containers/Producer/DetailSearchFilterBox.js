import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import SelectComponent from "Select";

import ButtonComponent from "components/Buttonv2";
import SearchBar from "./SearchBar";
import FilterBox from "./FilterBox";
import FilterBox2 from "./FilterBox2";
import Background from "components/Background";
import Container from "components/Containerv1";
import Modal from "./RequestModal";

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

@inject("Auth", "Project", "Request", "Partner", "ManufactureProcess")
@observer
class DetailSearchFilterConatiner extends React.Component {
  state = {
    search: "",
    modal_open: false,
    list: false,
  };

  openModal = () => {
    const { Partner } = this.props;
    console.log("open click");
    // this.setState({ modalOpen: true });
    Partner.requestModalActive = true;
  };
  closeModal = () => {
    const { Partner } = this.props;
    console.log("close click");

    Partner.requestModalActive = false;
  };

  render() {
    const { Partner, Request, width } = this.props;
    return (
      <ContainerV2>
        <Category>
          <span>분야</span>
          <div style={{ marginRight: "24px" }}>
            <Select
              placeholder="대 카테고리"
              options={bigCategoryArray}
              getOptionLabel={(option) => option.label}
              // value={Partner.input_category}
              onChange={Partner.setBigCategory}
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
            <Select
              placeholder="소 카테고리"
              options={smallCategoryArray}
              getOptionLabel={(option) => option.label}
              // value={Partner.input_category}
              onChange={Partner.setSmallCategory}
            />
          </div>
        </Category>
        <Location>
          <span>위치</span>
          <Select
            placeholder="전체지역"
            options={this.props.Partner.filter_city_ary}
            getOptionLabel={(option) => option.city}
            // value={Partner.input_category}
            // onChange={Partner.setBigCategory}
          />
        </Location>

        <Budget>
          <span>예산</span>
          <FilterBox2 data={viewArray} />
          {/* <FilterBox filter="budget" data={budgetArray} /> */}
          <InputContainer>
            {!Partner.minDirectInput && (
              <Select
                // id="select"
                // width="118px"
                styles={customStyles}
                placeholder="0"
                style={{ overflow: "visible" }}
                options={budgetArray}
                getOptionLabel={(option) => option.label}
                // value={data.quantity}
                onChange={Partner.setMinBudget}
              />
            )}

            {Partner.minDirectInput && (
              <DirectInputBox>
                <input
                  placeholder="직접 입력하세요"
                  onBlur={(e) => {
                    console.log(e.target.value);
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

            {/* <DirectInputBox>
              <input placeholder="직접 입력하세요" />
            </DirectInputBox> */}

            <span>원 ~ </span>
            {!Partner.maxDirectInput && (
              <Select
                // id="select"
                // width="118px"
                styles={customStyles}
                placeholder="0"
                style={{ overflow: "visible" }}
                options={budgetArray}
                getOptionLabel={(option) => option.label}
                // value={data.quantity}
                onChange={Partner.setMaxBudget}
              />
            )}

            {Partner.maxDirectInput && (
              <DirectInputBox>
                <input
                  placeholder="직접 입력하세요"
                  onBlur={(e) => {
                    console.log(e.target.value);
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

            {/* <InputBox>
              <input
                placeholder="0"
                // value={Partner.search_text}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "0")}
                // onChange={this.searchText}
                class="Input"
                // onKeyDown={this.handleKeyDown}
              />
            </InputBox>
            <span>원 ~</span>
            <InputBox>
              <input
                placeholder="0"
                // value={Partner.search_text}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "0")}
                // onChange={this.searchText}
                class="Input"
                // onKeyDown={this.handleKeyDown}
              />
            </InputBox> */}
          </InputContainer>
        </Budget>
        <Filter>
          <span>필터</span>
          <FilterBox filter="filter" data={filterArray} />
        </Filter>

        {Partner.requestModalActive && (
          // <Layer onClick={this.modalHandler}>
          <Layer>
            {/* <Postcode /> */}
            <span>
              <Modal
                width={width}
                open={Partner.requestModalActive}
                close={this.closeModal}
                // header="전화번호"
                // title={data.real_phone}
                // children={this.props.Partner.modalUserPhone}
                //children={data.name}
              >
                {/* <p>
                            {data.user.phone
                              ? data.user.phone
                              : "전화번호 없음"}
                          </p> */}
                {/* <p>{idx}</p> */}
                {/* <p>{data.name}</p> */}
              </Modal>
              {/* <CheckBrowserModal
                          open={this.props.Partner.modalActive}
                          handleClose={this.closeModal}
                        /> */}
            </span>
          </Layer>
        )}
      </ContainerV2>
    );
  }
}

export default DetailSearchFilterConatiner;

const bigCategoryArray = [
  { label: "대 카테고리1", value: "대 카테고리1" },
  { label: "대 카테고리2", value: "대 카테고리2" },
  // { label: "제목", value: "제목" },
  // { label: "내용", value: "내용" },
];

const smallCategoryArray = [
  { label: "소 카테고리1", value: "소 카테고리1" },
  { label: "소 카테고리2", value: "소 카테고리2" },
  // { label: "제목", value: "제목" },
  // { label: "내용", value: "내용" },
];

const filterArray = [
  { id: 1, name: "전체", checked: false },
  { id: 2, name: "샘플제작", checked: false },
  { id: 3, name: "OEM", checked: false },
  { id: 4, name: "ODM", checked: false },
  { id: 5, name: "금형/사출", checked: false },
  { id: 6, name: "대량가공", checked: false },
  { id: 7, name: "기타", checked: false },
];

const budgetArray = [
  // { id: 1, name: "전체", checked: false },
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
  justify-content: center;
  height: 400px;
  width: 1200px;
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
    width: 195px;
    height: 44px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > div:last-child {
    
   
      position: absolute;
      bottom: -25px;
      right: 7px;
      >span{
        font-size: 14px;
        line-height: 30px;
        letter-spacing: -0.14px;
        color: #86888c;
        font-weight: normal;
      }
    }
  }
`;
const Category = styled.div`
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
`;

const Filter = styled.div`
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
`;
const Budget = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 70px;
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

const Select = styled(SelectComponent)`
  width: 220px;
  height: 32px;
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
  height: 32px;
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
`;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.05);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;
