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

import { toJS } from "mobx";

import { PRIMARY2 } from "static/style";

@inject("Auth", "Project", "Request", "Partner", "ManufactureProcess")
@observer
class SearchFilterConatiner extends React.Component {
  state = {
    search: "",
    modal_open: false,
    list: false,
  };

  render() {
    const { Partner, Request } = this.props;
    return (
      <ContainerV2>
        <Search>
          <span>검색</span>
          <SearchBar />
          <div>
            <span>제조사 찾기 의뢰하기 </span>
          </div>
        </Search>

        <Category>
          <span>분야</span>
          <div style={{ marginRight: "24px" }}>
            <Select
              placeholder="대 카테고리"
              options={bigCategoryArray}
              getOptionLabel={(option) => option.label}
              onChange={Partner.setBigCategory}
            />
          </div>
          <div>
            <Select
              placeholder="소 카테고리"
              options={smallCategoryArray}
              getOptionLabel={(option) => option.label}
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
          />
        </Location>

        <Filter>
          <span>필터</span>
          <FilterBox filter="filter" data={filterArray} />
        </Filter>
        <Budget>
          <span>예산</span>
          <FilterBox2 data={viewArray} />
          <FilterBox filter="budget" data={budgetArray} />
          <InputContainer>
            <InputBox>
              <input
                placeholder="0"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "0")}
                class="Input"
              />
            </InputBox>
            <span>원 ~</span>
            <InputBox>
              <input
                placeholder="0"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "0")}
                class="Input"
              />
            </InputBox>
            <span>원</span>
          </InputContainer>
        </Budget>
      </ContainerV2>
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
  { id: 1, name: "100만원~500만원", checked: false },
  { id: 2, name: "500만원~1000만원", checked: false },
  { id: 3, name: "1000만원~3000만원", checked: false },
  { id: 4, name: "3000만원 이상", checked: false },
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
  height: 352px;
  width: 1200px;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 7%;
  }
  > div:last-child {
    box-shadow: 0 1px 3px 0 rgba(54, 56, 84, 0.3);
    padding: 8px 16px 9px 16px;
    box-sizing: border-box;
    width: 195px;
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
    width: 6%;
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
    width: 6%;
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
    width: 6%;
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
    width: 11%;
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
    }
  }
  @media (min-width: 1300px) {
    input {
      font-size: 18px;
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
  width: 25%;
  display: flex;
  span {
    width: 30px;
    align-self: center;
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
