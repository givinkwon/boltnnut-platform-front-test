import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import * as Title from "components/Title";
import Router from "next/router";

import ImageFile from "./ImageFile";

@inject("Auth", "Project", "Request", "Partner", "Search", "Category")
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
    const { Partner } = this.props;

    await Router.push("/search");
    // console.log("click");

    Partner.loadingFlag = true;
    setTimeout(() => {
      Partner.loadingFlag = false;
    }, 3000);

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

  // 검색 시 배너 활성화 핸들러 따로 분리
  bannerHandler = () => {
    const { Partner } = this.props;
    if (!Partner.result_banner) {
      Partner.result_banner = true;
    }
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      modal_open: false,
    });
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.search();
      this.bannerHandler();
    }
  };

  scrollEventHandler = () => {
    const { Partner } = this.props;

    if (window.pageYOffset > 150) {
      Partner.scrollActive = true;
    } else {
      Partner.scrollActive = false;
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.scrollEventHandler);

    this.props.Auth.checkLogin();
    this.search();
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
          <FormInnerBox>
            <SearchBar
              active={Partner.subButtonActive}
              scrollActive={Partner.scrollActive}
            >
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

              <ImgContainer
                onMouseEnter={() => this.imageSearchHandler()}
                onMouseLeave={() => this.imageSearchHandler()}
                scrollActive={Partner.scrollActive}
              >
                <HoverBox
                  active={this.state.imgsearchhover}
                  className="hoverBox"
                >
                  <Title13>제품 이미지로 검색하기</Title13>
                </HoverBox>

                <ImgContainer scrollActive={Partner.scrollActive}>
                  <ImageFile file={true} isOpen={true} />
                </ImgContainer>
              </ImgContainer>

              <ImgContainer scrollActive={Partner.scrollActive}>
                <ImgBox
                  scrollActive={Partner.scrollActive}
                  src="/static/icon/search_blue.svg"
                  onClick={() => {
                    this.search();
                    this.bannerHandler();
                  }}
                />
              </ImgContainer>
            </SearchBar>
          </FormInnerBox>
        </Form>
      </>
    );
  }
}

export default SearchBarConatiner;

const ImgBox = styled.img`
  width: ${(props) => (props.scrollActive ? "26px" : "none")};
  height: ${(props) => (props.scrollActive ? "26px" : "none")};
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50px;
  height: ${(props) => (props.scrollActive ? "35px" : "50px")};
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

const SearchBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border-radius: 60px;
  box-shadow: 4px 5px 12px 0 rgba(146, 146, 146, 0.2);
  border: solid 0.5px #e1e2e4;
  padding-right: 20px;

  // 스크롤 이벤트
  transition: all 0.3s ease-out;
  width: ${(props) => (props.scrollActive ? "600px" : "100%")};
  height: ${(props) => (props.scrollActive ? "46px" : "100%")};

  input {
    width: 640px;
    height: ${(props) => (props.scrollActive ? "43px" : "57px")};
    border: none;
    border-radius: 60px;
    padding: 0 14px;
    margin-left: ${(props) => (props.scrollActive ? "none" : "10px")};
    font-size: 18px;

    :focus {
      outline: none;
    }

    ::placeholder {
      color: #c6c7cc;
      font-size: ${(props) => (props.scrollActive ? "15px" : "18px")};
    }
  }

  img {
    width: ${(props) => (props.scrollActive ? "19px" : "24px")};
    height: 24px;
    cursor: pointer;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    input {
      width: 80%;
      height: 30px;
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
`;

const Form = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const FormInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  align-items: center;
`;
