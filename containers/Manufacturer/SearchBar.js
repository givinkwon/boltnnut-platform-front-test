import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import SelectComponent from "Select";
import ButtonComponent from "components/Buttonv2";

import Background from "components/Background";
import Container from "components/Containerv1";

import { toJS } from "mobx";

import { PRIMARY2 } from "static/style";

@inject("Auth", "Project", "Request", "Partner", "ManufactureProcess")
@observer
class SearchBarConatiner extends React.Component {
  state = {
    search: "",
    modal_open: false,
    list: false,
  };

  selectClick = () => {
    const { list } = this.state;
    this.setState({ list: true });
  };

  selectOut = () => {
    const { list } = this.state;
    this.setState({ list: false });
  };

  searchText = async (e) => {
    const { Partner } = this.props;
    this.setState({ search: e.target.value });
    await (Partner.search_text = e.target.value);
  };
  search = async () => {
    const { Partner, ManufactureProcess } = this.props;
    if (Partner.search_text != "") {
      if (ManufactureProcess.loadingSaveSearchText) {
        ManufactureProcess.saveSearchText(Partner.search_text);
        ManufactureProcess.loadingSaveSearchText = false;
        setTimeout(
          () => (ManufactureProcess.loadingSaveSearchText = true),
          2000
        );
      }
    }
    Partner.currentPage = 1;
    await Partner.resetDevCategory();
    console.log(toJS(Partner.category_dic));
    await Partner.getPartner();
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
      if (Partner.search_text != "") {
        console.log("Enter2");
        if (ManufactureProcess.loadingSaveSearchText) {
          console.log("Enter3");
          ManufactureProcess.saveSearchText(Partner.search_text);
          ManufactureProcess.loadingSaveSearchText = false;
          setTimeout(
            () => (ManufactureProcess.loadingSaveSearchText = true),
            2000
          );
        }
      }
      Partner.currentPage = 1;
      Partner.resetDevCategory();
      Partner.getPartner();
    }
  };
  async componentDidMount() {
    await this.props.Auth.checkLogin();
  }
  render() {
    const { Partner, Request } = this.props;
    return (
      <Form>
        <Box
          active={this.state.list === true}
          onClick={() =>
            this.state.list ? this.selectOut() : this.selectClick()
          }
          onBlur={() => this.selectOut()}
        >
          <Select
            placeholder="전체"
            options={categoryArray}
            getOptionLabel={(option) => option.label}
            value={Partner.input_category}
            onChange={Partner.setCategory}
          />
        </Box>
        <SearchBar>
          <input
            placeholder="원하는 분야의 제조업체를 검색하세요"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder = "원하는 분야의 제조업체를 검색하세요")
            }
            onChange={this.searchText}
            class="Input"
            onKeyDown={this.handleKeyDown}
          />
        </SearchBar>
        <SearchButton
          width={80}
          borderColor={PRIMARY2}
          borderRadius={0}
          onClick={this.search}
        >
          <img
            style={{ width: 18, height: 18 }}
            src="/static/images/search_cobalt-blue.png"
          />
        </SearchButton>
      </Form>
    );
  }
}

export default SearchBarConatiner;

const categoryArray = [
  { label: "전체", value: "전체" },
  { label: "만든 제품", value: "만든 제품" },
];

const SearchBar = styled.div`
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
  @media (min-width: 1300px) {
    //margin-top: 0;
    width: 90%;
  }
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
  @media (min-width: 1300px) {
    //width: 110px;
  }
`;

const Box = styled.div`
  width: 220px;

  @media (min-width: 1300px) {
    //width: 110px;
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
