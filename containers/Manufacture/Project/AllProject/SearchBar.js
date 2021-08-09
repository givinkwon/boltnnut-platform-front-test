import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import ButtonComponent from "components/Buttonv2";

import Background from "components/Background";
import Container from "components/Containerv1";
import Router from "next/router";
import { toJS } from "mobx";

import { PRIMARY2 } from "static/style";

@inject("Auth", "Project")
@observer
class SearchBarContainer extends React.Component {
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
    const { Project } = this.props;


    await Project.search();
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  async componentDidMount() {
    await this.props.Auth.checkLogin();
  }

  // 검색창에 검색을 할 때 text를 observable에 저장
  handleSearcherInputChange(event) {
    const { Project } = this.props;
    Project.search_text = event.target.value;
  }

  render() {
    const { Project } = this.props;

    return (
      <>
        <Form>
          <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <SearchBar>
              <input
                placeholder="원하는 분야의 프로젝트를 검색해보세요"
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "원하는 분야의 프로젝트를 검색해보세요")}
                onChange={this.handleSearcherInputChange.bind(this)}
                value={Project.search_text}
                class="Input"
                onKeyPress={this.handleKeyDown}
              />
              <img style={{ width: 24, height: 24, marginRight: 25, cursor: "pointer" }} src="/static/icon/search_blue.svg" onClick={this.search} />
            </SearchBar>

          </div>
        </Form>
      </>
    );
  }
}

export default SearchBarContainer;


const CustomLiBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 588px;
  height: 160px;
  overflow-y: scroll;
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
  box-sizing: border-box;
  border: solid 0.5px #0933b3;
  border-radius: 60px;
  box-shadow: 4px 5px 12px 0 rgba(146, 146, 146, 0.2);

  input {
    width: 100%;
    height: 59px;
    border: none;
    border-radius: 60px;
    padding: 0 14px;
    margin-left: 10px;
    :focus {
      outline: none;
    }
    ::placeholder {
      #c6c7cc
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
    width: ${(props) => (props.active ? "330px" : "100%")};
    input {
      font-size: 16px;
      ::placeholder {
        font-size: 13px;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    // margin-top: 40px;
    width: ${(props) => (props.active ? "410px" : "100%")};
    input {
      font-size: 17px;
      ::placeholder {
        font-size: 15px;
      }
    }
  }
  @media (min-width: 1300px) {
    // width: ${(props) => (props.active ? "501px" : "100%")};
    transition: 3s;
    width: 100%;
    input {
      font-size: 18px;
    }
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
  display: flex;
  justify-content: flex-start;
  width: 588px;
  height: 44px;

  @media (min-width: 768px) and (max-width: 991.98px) {
    // width: 54%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    // width: 67%;
  }
  @media (min-width: 1300px) {
    //margin-top: 0;
    // width: 75%;
  }
`;
