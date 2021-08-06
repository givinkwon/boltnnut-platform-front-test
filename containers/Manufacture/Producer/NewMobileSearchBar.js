import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import SelectComponent from "Select";
import ButtonComponent from "components/Buttonv2";

import Background from "components/Background";
import Container from "components/Containerv1";
import Router from "next/router";
import { toJS } from "mobx";

import { PRIMARY2 } from "static/style";

const searchIcon = "/static/images/mobilesearchicon.svg";

@inject("Auth", "Project", "Request", "Partner", "Producer")
@observer
class NewMobileSearchBarConatiner extends React.Component {
  state = {
    search: "",
    modal_open: false,
    list: false,
    suggsKeywords: "",
    suggs: [],
    showSuggs: false,
  };

  // 검색함수
  search = async () => {
    const { Partner } = this.props;

    await Router.push("/producer");
    // console.log("click");
    // alert("EXECUTE");
    Partner.loadingFlag = true;
    setTimeout(() => {
      Partner.loadingFlag = false;
    }, 3000);

    Partner.currentPage = 1;
    Partner.click_count += 1;
    await Partner.getPartner(Partner.currentPage, Partner.click_count);
   
    if (Partner.search_text) {
      Partner.isSearched = true;
    } else {
      Partner.isSearched = false;
    }

    if (Partner.search_text != "") {
  
        Partner.subButtonActive = true;

      
    }
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      modal_open: false,
    });
  };

  handleKeyDown = (e) => {
    const { Partner } = this.props;
    if (e.key === "Enter") {
      this.search();
    }
  };

  async componentDidMount() {
    await this.props.Auth.checkLogin();
  }

  // 검색창에 검색을 할 때 text를 observable에 저장
  handleSearcherInputChange(event) {
    const { Partner } = this.props;
    Partner.search_text = event.target.value;
    console.log(event.target.value);
  }
  

  render() {
    const { Partner, Request } = this.props;

    return (
      <>
        <Form active={Partner.subButtonActive}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <SearchBar active={Partner.subButtonActive}>
              <input
                placeholder="원하는 분야나 비슷한 제품을 검색해보세요."
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "원하는 분야나 비슷한 제품을 검색해보세요.")}
                onChange={this.handleSearcherInputChange.bind(this)}
                value={Partner.searchText}
                class="Input"
                onKeyPress={this.handleKeyDown}
              />

              <img
                src={searchIcon}
                onClick={this.search}
                style={{
                  width: 24,
                  height: 24,
                  marginRight: 20,
                  cursor: "pointer",
                }}
              />
              {/* <img style={{ width: 24, height: 24, marginRight: 25 }} src="/static/icon/search_blue.svg" onClick={this.search} /> */}
            </SearchBar>
          </div>
        </Form>
      </>
    );
  }
}

export default NewMobileSearchBarConatiner;
const CustomUl = styled.ul`
  width: 329px;
  height: 150px;
  margin-left: 30px;
  font-size: 18px;
  }
`;

const CustomLiBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 160px;
  overflow: scroll;
  background-color: #ffffff;

  > li {
    cursor: pointer;
    margin-top: 20px;
    font-size: 18px;

    :hover {
      background-color: #f2f2f2;
    }
  }
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 329px;
  border-radius: 30px;
  box-shadow: 4px 5px 12px 0 rgba(146, 146, 146, 0.28);
  border: solid 1.5px #0933b3;

  > input {
    width: 100%;
    border-radius: 30px;
    height: 56px;
    border: none;
    padding-left: 20px;

    :focus {
      outline: none;
    }
    ::placeholder {
      #c6c7cc;
    }
  }
  
  // 구글 검색 관련
  .searcher-suggs {
    // position: absolute;
    // background-color: red;
    // width: 329px;
  }

  .searcher-suggs-word {
    height: 40px;
    line-height: 40px;
    list-style: none;
    border-bottom: 1px dashed #ccc;
    margin: 0px 3px 0px 3px;
    font-size: 1.2em;
    color: #212121;
    font-size: 1.5em;
    margin-left: 0;
    margin-right: -1em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    background-color: white;
    overflow: hidden;

    @include transition(background-color 0.2s, color 0.2s);
  }

  .searcher-suggs-word.selected {
    background-color: #0288D1;
    color: white;
  }
`;

const Form = styled.div`
  width: 347px;
  height: 56px;
  margin-top: 36px;
  margin-bottom: 150px;
`;
