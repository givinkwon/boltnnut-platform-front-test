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
import Category from "../../../stores/Manufacture/Category";

@inject(
  "Auth",
  "Project",
  "Request",
  "Partner",
  "ManufactureProcess",
  "Producer",
  "Category"
)
@observer
class SearchBarConatiner extends React.Component {
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
    const { Partner, ManufactureProcess, Category } = this.props;

    // 연관검색어 저장
    Partner.suggest_list = this.state.suggs;
    console.log(toJS(Partner.suggest_list));

    await Router.push("/producer");
    // console.log("click");

    Partner.loadingFlag = true;
    setTimeout(() => {
      Partner.loadingFlag = false;
    }, 3000);

    Partner.currentPage = 1;
    Partner.click_count += 1;

    await Partner.search();

    // 전체 파트너 숫자
    ManufactureProcess.PartnerCount = Partner.partner_count;
    console.log(toJS(ManufactureProcess.PartnerCount));

    // 검색어 로그에 저장하기 위한 함수
    if (Partner.search_text) {
      Partner.isSearched = true;
    } else {
      Partner.isSearched = false;
    }
    console.log(Partner.search_text, ManufactureProcess.loadingSaveSearchText);
    if (Partner.search_text != "") {
      if (ManufactureProcess.loadingSaveSearchText) {
        Partner.subButtonActive = true;
        // console.log(Partner.subButtonActive);
        ManufactureProcess.saveSearchText(Partner.search_text);
        ManufactureProcess.loadingSaveSearchText = false;
        setTimeout(
          () => (ManufactureProcess.loadingSaveSearchText = true),
          2000
        );
      }
    }
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      modal_open: false,
    });
  };

  handleKeyDown = (e) => {
    const { Partner, ManufactureProcess } = this.props;
    if (e.key === "Enter") {
      this.search();
    }
  };

  async componentDidMount() {
    await this.props.Auth.checkLogin();
  }

  // 구글 연관검색어
  handleMouseDown(event) {
    let x = $(document).scrollLeft() + event.clientX; // event.offsetX
    let y = $(document).scrollTop() + event.clientY; // event.offsetY

    // did not click on the search input or the suggestion list
    if (
      this.state.showSuggestions &&
      !this.checkXYInElement(x, y, ".searcher-suggs") &&
      !this.checkXYInElement(x, y, ".searcher-input")
    ) {
      this.setState({ showSuggestions: false });
    }
  }

  checkXYInElement(x, y, className) {
    let elem = $(className);
    if (elem.length == 0) {
      return false;
    }

    let rect = {
      x: elem.offset().left,
      y: elem.offset().top,
      w: elem.outerWidth(),
      h: elem.outerHeight(),
    };

    if (
      x < rect.x ||
      y < rect.y ||
      x > rect.x + rect.w ||
      y > rect.y + rect.h
    ) {
      return false;
    }

    return true;
  }

  // check the input keywords (without URL encode) with the suggsKeywords
  // true if the input was the same as the suggsKeywords
  // otherwise, false
  checkSuggsKeywords(keywords) {
    if (
      this.state.suggsKeywords == encodeURIComponent(keywords.toLowerCase())
    ) {
      return true;
    }

    return false;
  }

  // check and send request to google for suggestions
  // the request will not send if the input was the same as the suggsKeywords
  // or length equals to 0
  requestSuggestions(keywords) {
    const { Partner } = this.props;

    // current suggs was request with the input keywords
    // no need to send again
    if (this.checkSuggsKeywords(keywords)) {
      return;
    }

    // empty keywords just reset the suggsKeywords and suggs
    if (keywords.length == 0) {
      this.setState({ suggsKeywords: "", suggs: [] });
      return;
    }

    let urlKeywords = encodeURIComponent(keywords.toLowerCase());
    this.setState({ suggsKeywords: urlKeywords, suggs: [] });
    let url =
      "https://suggestqueries.google.com/complete/search?output=chrome&q=" +
      urlKeywords;
    // use JSONP (issue: http://security.stackexchange.com/questions/23438/security-risks-with-jsonp/23439#23439)
    // just for CORS trick
    $.ajax({
      url: url,
      dataType: "jsonp",
      type: "GET",
      success: function (data, textStatus, jqXHR) {
        // data[0] was the keywords to search
        // data[1] was the array of the google suggestion keywords
        //console.log(data);
        if (this.checkSuggsKeywords(data[0])) {
          this.setState({ suggs: data[1] });
        }
      }.bind(this),
    });
  }

  // 검색창에 검색을 할 때 text를 observable에 저장하고, 구글 연관검색어 검색
  handleSearcherInputChange(event) {
    const { Partner } = this.props;
    Partner.search_text = event.target.value;
    console.log(event.target.value);
    this.setState({ showSuggestions: true });
    this.requestSuggestions(Partner.search_text);
  }

  // 제안된 키워드를 선택했을 때, 그 키워드를 text에 저장하고 적용
  handleClickSuggetionsKeywords(event) {
    const { Partner } = this.props;
    console.log(event.target.textContent);
    Partner.search_text = event.target.textContent;
    this.setState({ showSuggestions: false });
    this.requestSuggestions(Partner.search_text);
    // 검색하기
    this.search();
  }

  // handel the key down event of the search input
  handleSearcherInputKeyDown(event) {
    if (this.state.showSuggestions) {
      // use keyboard to select the suggesions
      this.handleSelectSuggestions(event);
    } else {
      // just show the suggestions list
      this.setState({ showSuggestions: true });
    }
  }

  // use use keyboards to select the suggestions
  handleSelectSuggestions(event) {
    const { Partner } = this.props;
    // 선택되어 있는 추천 검색어 가지고 오기
    let li = $(".searcher-suggs-word.selected");
    // 40 => down, 38 => up >> 내려갈 때 혹은 올라올 때 선택된 키워드 변경
    if (event.keyCode == 40 || event.keyCode == 38) {
      event.preventDefault();
      if (li.length == 0) {
        $(".searcher-suggs-word:first-child").toggleClass("selected");
      } else if (event.keyCode == 40) {
        li.removeClass("selected");
        li.next().toggleClass("selected");
      } else {
        li.removeClass("selected");
        li.prev().toggleClass("selected");
      }
    } else {
      // 13 => enter
      if (event.keyCode == 13) {
        event.preventDefault();

        if (li.length > 0) {
          // 리스트가 있고, 엔터 시에 클릭된 텍스트로 구글 연관 검색
          Partner.search_text = li.text();
          this.setState({ showSuggestions: false });
          this.requestSuggestions(Partner.search_text);
        } else {
          this.setState({ showSuggestions: false });
        }
      }
    }
  }

  // 마우스 호버에 따라서 클래스 적용을 함으로써 Css 적용 변경
  handleHoverSearcherSuggestions(event) {
    $(".searcher-suggs-word.selected").removeClass("selected");
    $(".searcher-suggs-word:hover").addClass("selected");
  }

  render() {
    const { Partner, Request } = this.props;

    let suggestions = null;
    // Partner.searchText가 처음에 null 값이라 에러가 떠서 공백문자를 더해줌
    // 구글 검색 제안 리스트
    if (
      this.state.showSuggestions &&
      this.checkSuggsKeywords(Partner.search_text + "")
    ) {
      suggestions = this.state.suggs.map(
        function (value, index) {
          return (
            <li
              key={index}
              className="searcher-suggs-word"
              onClick={this.handleClickSuggetionsKeywords.bind(this)}
              onMouseOver={this.handleHoverSearcherSuggestions.bind(this)}
            >
              {value}
            </li>
          );
        }.bind(this)
      );
    }

    return (
      <>
        <Form active={Partner.subButtonActive}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SearchBar active={Partner.subButtonActive}>
              <input
                placeholder="원하는 분야의 제조업체나 비슷한 제품을 검색해보세요."
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder =
                    "원하는 분야의 제조업체나 비슷한 제품을 검색해보세요.")
                }
                onChange={this.handleSearcherInputChange.bind(this)}
                value={Partner.search_text}
                class="Input"
                onKeyPress={this.handleKeyDown}
              />
              <img
                style={{ width: 24, height: 24, marginRight: 25 }}
                src="/static/icon/search_blue.svg"
                onClick={this.search}
              />
            </SearchBar>

            <CustomUl>
              <CustomLiBox>{suggestions}</CustomLiBox>
            </CustomUl>
          </div>
        </Form>
      </>
    );
  }
}

export default SearchBarConatiner;
const CustomUl = styled.ul`
  width: 588px;
  height: 150px;
  margin-left: 30px;
  font-size: 18px;
  }
`;

const CustomLiBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 588px;
  height: 160px;
  overflow: scroll;

  > li {
    cursor: pointer;
    margin-top: 20px;
    font-size: 18px;

    :hover {
      background-color: #f2f2f2;
    }
  }
`;

const categoryArray = [
  { label: "전체", value: "전체" },
  // { label: "만든 제품", value: "만든 제품" },
  // { label: "제목", value: "제목" },
  // { label: "내용", value: "내용" },
];

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: solid 0.5px #0933b3;
  border-radius: 60px;
  box-shadow: 4px 5px 12px 0 rgba(146, 146, 146, 0.2);

  input {
    width: 360px;
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
  
  // 구글 검색 관련
  .searcher-suggs {
    // position: absolute;
    // background-color: red;
    // width: 588px;
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
