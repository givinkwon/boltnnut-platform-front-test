import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import SelectComponent from "Select";
import ButtonComponent from "components/Buttonv2";

import Background from "components/Background";
import Container from "components/Containerv1";
import Router from "next/router";
import { toJS } from "mobx";
import AddFile from "./AddFile";
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
    searchbaractive: false,

  };

  // 검색함수
  search = async () => {
    const { Partner, ManufactureProcess, Category } = this.props;

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

  closeModal = () => {
    this.setState({
      ...this.state,
      modal_open: false,
    });
  };
  // 이미지 버튼 클릭 시 모달 창 띄우기
  imageModal = () => {
    const { Partner } = this.props;
    Partner.image_modal_state = !Partner.image_modal_state;
  }

  render() {
    const { Partner, Request } = this.props;

    

    return (
      <>
        <Form active={Partner.subButtonActive}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "95%",
              alignItems: "center",
            }}
          >
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
              <img src="/static/icon/Camera.svg" onClick={this.imageModal} />
              {/* 이미지 검색 테스트용 */}
              {Partner.image_modal_state &&
                <span style={{ display: "inline-block" }}>
                <AddFile
                  file={true}
                  isOpen={true}
                  ///onChange={this.handleChange}
                />
                <div></div>
              </span>
              }
              <img src="/static/icon/search_blue.svg" onClick={this.search} />
            </SearchBar>
            
          </div>
        </Form>
      </>
    );
  }
}

export default SearchBarConatiner;

const CustomUl = styled.ul`
  width: 100%;
  height: 150px;
  font-size: 18px;
  margin-right: 1px;
`;

const CustomLiBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 120px;
  overflow: scroll;
  background-color: #ffffff;

  > li {
    cursor: pointer;
    margin: 20px 10px 0px 10px;
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
  border-radius: 60px;
  box-shadow: 4px 5px 12px 0 rgba(146, 146, 146, 0.2);
  border: solid 1px #e1e2e4;
  width: 100%;
  padding-right: 25px;

  input {
    width: 700px;
    height: 59px;
    border: none;
    border-radius: 60px;
    padding: 0 14px;
    margin-left: 10px;
    font-size: 18px;
    margin-top: 2px;
    :focus {
      outline: none;
    }
    ::placeholder {
      margin-top: 2px;
      color: #c6c7cc;
      font-size: 18px;
    }
  }
  img {
    width: 24px;
    height: 24px;

    marginright: 25px;
    cursor: pointer;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    input {
      width: 80%;
      height: 30px;
      // border: none;
      // border-radiusf: 60px;
      padding: 0 7px;
      margin-left: 5px;
      font-size: 12px;

      ::placeholder {
        font-size: 12px;
      }
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    // margin-top: 30px;
    width: 700px;
    // input {
    //   font-size: 16px;
    //   ::placeholder {
    //     font-size: 13px;
    //   }
    // }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 792px;
    // input {
    //   font-size: 17px;
    //   ::placeholder {
    //     font-size: 15px;
    //   }
    // }
  }
  @media (min-width: 1300px) {
    width: 792px;
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
    background-color: #0288d1;
    color: white;
  }
`;

const Form = styled.div`
  display: flex;
  justify-content: center;
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
