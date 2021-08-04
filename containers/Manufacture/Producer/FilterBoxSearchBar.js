import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import SelectComponent from "Select";
import ButtonComponent from "components/Buttonv2";

import Background from "components/Background";
import Container from "components/Containerv1";
import * as Title from "components/Title";
import Router from "next/router";
import { toJS } from "mobx";

import { PRIMARY2 } from "static/style";
import Category from "../../../stores/Manufacture/Category";

import ImageFile from "./ImageFile";

@inject("Auth", "Project", "Request", "Partner", "ManufactureProcess", "Producer", "Category")
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
    imgsearchhover: false,
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
        setTimeout(() => (ManufactureProcess.loadingSaveSearchText = true), 2000);
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

  // 검색창에 검색을 할 때 text를 observable에 저장
  handleSearcherInputChange(event) {
    const { Partner } = this.props;
    Partner.search_text = event.target.value;
    console.log(event.target.value);
  }

  // 이미지 버큰 호버 시 문구 안내 핸들러 함수
  imageSearchHandler = () => {
    if (!this.state.imgsearchhover) {
      this.setState({ ...this.state, imgsearchhover: true });
    } else {
      this.setState({ ...this.state, imgsearchhover: false });
    }
  };

  imageModal = () => {
    const { Partner } = this.props;
    Partner.image_modal_state = !Partner.image_modal_state;
  };

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
            <SearchBar active={Partner.subButtonActive} style={{ position: "relative" }}>
              <input
                placeholder="원하는 분야의 제조업체나 비슷한 제품을 검색해보세요."
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "원하는 분야의 제조업체나 비슷한 제품을 검색해보세요.")}
                onChange={this.handleSearcherInputChange.bind(this)}
                value={Partner.search_text}
                class="Input"
                onKeyPress={this.handleKeyDown}
              />

              <ImgContainer onMouseEnter={() => this.imageSearchHandler()} onMouseLeave={() => this.imageSearchHandler()}>
                <HoverBox active={this.state.imgsearchhover} className="hoverBox">
                  <Title13>제품 이미지로 검색하기</Title13>
                </HoverBox>

                <ImageFile file={true} isOpen={true} />
              </ImgContainer>

              <ImgContainer>
                <img src="/static/icon/search_blue.svg" onClick={this.search} />
              </ImgContainer>
            </SearchBar>
          </div>
        </Form>
      </>
    );
  }
}

export default SearchBarConatiner;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 45px;
  height: 45px;
  border-radius: 20px;

  :hover {
    background-color: #eeeeee;
  }
`;

const HoverBox = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 190px;
  border-radius: 75px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;

  position: absolute;
  bottom: 90%;
  left: 75%;
`;

const Title13 = styled(Title.FontSize13)`
  font-weight: normal;
  font-stretch: normal;
  line-height: 4;
  letter-spacing: -0.33px;
  color: #0933b3;
`;

const ImgBox = styled.img`
  width: 32px;
  height: 32px;
`;

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
  border: solid 0.5px #c6c7cc;
  width: 100%;
  padding-right: 17px;

  input {
    width: 640px;
    height: 59px;
    border: none;
    border-radius: 60px;
    padding: 0 14px;
    margin-left: 10px;
    font-size: 18px;
    :focus {
      outline: none;
    }
    ::placeholder {
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
