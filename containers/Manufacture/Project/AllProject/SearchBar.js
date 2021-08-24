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


    alert("최적화된 서비스 제공을 위해 수정중에 있습니다.")
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
        </Form>
      </>
    );
  }
}

export default SearchBarContainer;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: 60px;
  box-shadow: 4px 5px 12px 0 rgba(146, 146, 146, 0.2);
  border: solid 1px #e1e2e4;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;

  input {
    width: 100%;
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
    transition: 3s;
    width: 792px;
    height: 59px;
    input {
      width: 100%;
      font-size: 18px;
    }
  }
  
`;

const Form = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) and (max-width: 991.98px) {
    // width: 54%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    // width: 67%;
  }
  @media (min-width: 1300px) {
    width: 100%;
  }
`;
