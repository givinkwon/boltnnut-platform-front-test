import React from "react";
import styled from "styled-components";
import Router from "next/router";
import { inject, observer } from "mobx-react";

import * as Title from "components/Title";

import MobileImageFile from "./MobileImageFile";

@inject("Auth", "Project", "Request", "Partner", "Search", "Category")
@observer
class FilterBoxSearchBarContainer extends React.Component {
  state = {
    search: "",
    list: false,
    suggsKeywords: "",
    suggs: [],
    showSuggs: false,
    searchbaractive: false,
  };

  // 검색함수
  search = async () => {
    const { Partner } = this.props;

    Partner.currentPage = 1;
    Partner.click_count += 1;
    Partner.subButtonActive = true;

    await Partner.search();

    // 검색어 로그에 저장하기 위한 함수
    if (Partner.search_text) {
      Partner.isSearched = true;
    } else {
      Partner.isSearched = false;
    }
    if (Partner.search_text != "") {
    }
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  componentDidMount() {
    this.props.Auth.checkLogin();
    this.search();
  }

  // 검색창에 검색을 할 때 text를 observable에 저장
  handleSearcherInputChange(event) {
    const { Partner } = this.props;
    Partner.search_text = event.target.value;
  }

  render() {
    const { Partner } = this.props;

    return (
      <Form active={Partner.subButtonActive}>
        <SearchBar active={Partner.subButtonActive}>
          <input
            placeholder="어떤 제품을 검색하고 싶으신가요?"
            onChange={this.handleSearcherInputChange.bind(this)}
            value={Partner.search_text}
            onKeyPress={this.handleKeyDown}
          />

          <img src="/static/images/search/mobile/searchicon.svg" onClick={() => this.search()} />
        </SearchBar>

        <MobileImageFile file={true} isOpen={true} />
      </Form>
    );
  }
}

export default FilterBoxSearchBarContainer;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 38px;
  border-radius: 60px;
  background-color: #f6f6f6;
  padding-right: 13px;

  input {
    width: 100%;
    border: none;
    border-radius: 60px;
    margin-left: 10px;
    font-size: 14px;
    background-color: #f6f6f6;

    :focus {
      outline: none;
    }

    ::placeholder {
      color: #c6c7cc;
      font-size: 14px;
    }
  }
`;

const Form = styled.div`
  display: flex;
  justify-content: space-between;
  height: 38px;
  margin: 0px 14px 0px 14px;
  /* width: 100%; */
`;
