import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import SelectComponent from "Select";
import ButtonComponent from "components/Buttonv2";

import Background from "components/Background";
import Container from "components/Containerv1";

import { toJS } from "mobx";

import { PRIMARY2 } from "static/style";

@inject(
  "Auth",
  "Project",
  "Request",
  "Partner",
  "ManufactureProcess",
  "Producer"
)
@observer
class SearchBarConatiner extends React.Component {
  state = {
    search: "",
    modal_open: false,
    list: false,
  };

  search = async () => {
    const { Partner, ManufactureProcess } = this.props;
    // console.log("click");
    // alert("EXECUTE");
    Partner.loadingFlag = true;
    setTimeout(() => {
      Partner.loadingFlag = false;
    }, 3000);

    Partner.currentPage = 1;
    Partner.click_count += 1;
    await Partner.getPartner(Partner.currentPage, Partner.click_count);
    ManufactureProcess.PartnerCount = Partner.partner_count;
    console.log(toJS(ManufactureProcess.PartnerCount));
    if (Partner.search_text) {
      Partner.isSearched = true;
    } else {
      Partner.isSearched = false;
    }

    if (Partner.search_text != "") {
      // console.log("click2");
      if (ManufactureProcess.loadingSaveSearchText) {
        // console.log("click3");
        Partner.subButtonActive = true;
        console.log(Partner.subButtonActive);
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
      // console.log("Enter1");
      // console.log(e);
      // alert("enter");
      this.search();
      // console.log(toJS(Partner.search_text));
      // if (Partner.search_text != "") {
      //   console.log("Enter2");
      //   if (ManufactureProcess.loadingSaveSearchText) {
      //     console.log("Enter3");
      //     Partner.subButtonActive = true;
      //     ManufactureProcess.saveSearchText(Partner.search_text);
      //     ManufactureProcess.loadingSaveSearchText = false;
      //     setTimeout(
      //       () => (ManufactureProcess.loadingSaveSearchText = true),
      //       2000
      //     );
      //   }
      // }

      // Partner.currentPage = 1;
      // // Partner.resetDevCategory();
      // Partner.getPartner();
      // if (Partner.search_text) {
      //   Partner.isSearched = true;
      // } else {
      //   Partner.isSearched = false;
      // }
    }
  };

  async componentDidMount() {
    await this.props.Auth.checkLogin();
  }

  render() {
    const { Partner, Request } = this.props;
    return (
      <>
        <Form active={Partner.subButtonActive}>
          <SearchBar active={Partner.subButtonActive}>
            <input
              placeholder="원하는 분야의 제조업체나 비슷한 제품을 검색해보세요."
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) =>
                (e.target.placeholder =
                  "원하는 분야의 제조업체나 비슷한 제품을 검색해보세요.")
              }
              onChange={Partner.searchText}
              class="Input"
              onKeyPress={this.handleKeyDown}
            />
            <img
              style={{ width: 24, height: 24, marginRight: 25 }}
              src="/static/icon/search_blue.svg"
              onClick={this.search}
            />
          </SearchBar>
        </Form>
      </>
    );
  }
}

export default SearchBarConatiner;

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
  // width: 601px;
  width: 100%;
  height: 60px; 
  box-sizing: border-box;
  border: solid 0.5px #c6c7cc;
  border-radius: 60px;
  box-shadow: 4px 5px 12px 0 rgba(146, 146, 146, 0.2);
  // margin 0 24px;

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
    // width: ${(props) => (props.active ? "501px" : "100%")};
    transition: 3s;
    width: 66%;
    input {
      font-size: 18px;
    }
  }
`;
// const SearchIcon = styled.div`
//   background: none;
//   border: none;
// `;
const Form = styled.div`
  //margin-top: 90px;
  // width: 100%;
  display: flex;
  justify-content: center;
  height: 44px;

  width: ${(props) => (!props.active ? "100%" : "47%")};

  @media (min-width: 768px) and (max-width: 991.98px) {
    // width: 54%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    // width: 67%;

    ${(props) =>
      props.active &&
      css`
        @keyframes reduce_tablet {
          0% {
            width: 58%;
          }

          100% {
            width: 47%;
          }
        }
        animation: reduce_tablet 3s ease-in-out;
      `}
    width: ${(props) => (!props.active ? "100%" : "47%")};
  }
  @media (min-width: 1300px) {
    //margin-top: 0;
    // width: 75%;
  }
`;

const SearchButton = styled(ButtonComponent)`
  // border-radius: 3px;
  background-color: #0933b3;
  margin-left: -5px;
  box-sizing: border-box;

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
  @media (min-width: 768px) and (max-width: 991.98px) {
    height: 44px;
  }
`;

const Select = styled(SelectComponent)`
  width: 220px;
  height: 44px;
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
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 120px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 140px;
    > input {
      ::placeholder {
        font-size: 15px;
      }
    }
  }
  @media (min-width: 1300px) {
    width: 125px;
  }
`;

const Box = styled.div`
  width: 220px;
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 120px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 140px;
  }
  @media (min-width: 1300px) {
    width: 125px;
  }
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

const Button = styled.button``;
