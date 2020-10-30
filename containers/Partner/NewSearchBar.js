import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Container";
import ButtonComponent from "components/Button";

import CheckClassModal from "CheckClassModal";
import CheckBoxComponent from "components/CheckBox";

import * as Text from "components/Text";
import { intcomma } from "utils/format";
import { WHITE, PRIMARY } from "static/style";

const search = "/static/images/search.png";

@inject("Auth", "Partner")
@observer
class SearchBarContainer extends React.Component {
  state = {
    search: "",
    modal_open: false,
  };
  searchText = (e) => {
    this.props.Partner.search_text = e.target.value;
  };
  search = () => {
  //  if (this.props.Auth.logged_in_partner) {
  //    this.setState({ modal_open: true });
  //  } else if (this.props.Auth.logged_in_client.client_class) {
      this.props.Partner.search();
  // } else {
  //    this.setState({ modal_open: true });
  //  }
  };
  closeModal = () => {
    this.setState({
      ...this.state,
      modal_open: false,
    });
  };
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // TODO 검색 API
        this.props.Partner.search();
    }
  };
  async componentDidMount() {
    await this.props.Auth.checkLogin();
  }
  render() {
    const { search, modal_open } = this.state;
    const { Partner } = this.props;
    return (
      <Form>
        {/*<CheckClassModal open={modal_open} handleClose={this.closeModal} />*/}
        <SearchBox>
            <input
                placeholder="원하시는 분야의 전문가를 검색해보세요"
                value={Partner.search_text}
                onChange={this.searchText}
                onKeyDown={this.handleKeyDown}
                id = "search"
              />
                <img
                  src="/static/images/search.png"
                  onClick = {this.search}
                  id = "searchbutton"
                />
        </SearchBox>
      </Form>
    );
  }
}

export default SearchBarContainer;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  input {
    width: 100%;
    padding: 0 15px;
    background-color: #f5f5f5;
    border: 1px solid #dededf;
    border-right: 0px;
    :focus {
      outline: none;
    }
  }
  > div {
    display: flex;
    :nth-of-type(1) {
      width: 300px;
      padding: 0 10px;
    }
    :nth-of-type(2) {
      width: 100%;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 30px;
    flex-direction: column;
    input {
      font-size: 12px;
      width: 100%;
    }
    > div {
      :nth-of-type(1) {
        width: calc(100% - 20px);
      }
      border: 0;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 30px;
    input {
      font-size: 16px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 40px;
    input {
      font-size: 18px;
    }
  }
  @media (min-width: 1300px) {
    margin-top: 60px;
    input {
      font-size: 20px;
    }
  }
`;
const Form = styled.div`
  background-color: #fff;
  width: 100%;
  justify-content: center;
  display:inline-flex;
  margin-top: 80px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin: 0;
    width: 100%;
    margin-top: 24px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;
const CustomContainer = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 720px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 930px;
  }

  @media (min-width: 1300px) {
    width: 1200px;
  }
`
const SearchBox = styled.div`
  width: 964px;
  height: 58px;
  object-fit: contain;
  border-radius: 3px;
  border: solid 1px #dcdcdc;
  background-color: #ffffff;
  align-items: center;
  display: flex;
  margin-left: 32px;
  margin-bottom: 30px;
  @media (min-width: 0px) and (max-width: 767.98px) {
      margin: 0;
      width: calc(91.8%);
      height: 36px;
      object-fit: contain;
      border-radius: 2px;
      border: solid 0.5px #001a56;
      padding-right: calc(4%);
      padding-left: calc(4%);
      margin-right: calc(4%);
      margin-left: calc(4%);
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
  > img {
      width: 26px;
      height: 26px;
      object-fit: contain;
      cursor: pointer;
  }
  > input {
    border: none;
    float: left;
    width: 878px;
    height: 36px;
    object-fit: contain;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: -0.6px;
    text-align: left;
    color: #c1bfbf;
    padding-left: 20px;
    padding-top: 11px;
    padding-bottom: 11px;
    outline: none;
    @media (min-width: 0px) and (max-width: 767.98px) {
      margin: 0;
      width: 100%;
      height: 100%;
      padding: 0;
      padding-top :0;
      padding-bottom: 0;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 0.93;
      letter-spacing: -0.35px;
      text-align: left;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
    }
    @media (min-width: 992px) and (max-width: 1299.98px) {
    }
    @media (min-width: 1300px) {
    }
  }
`
const Input = styled.input`
  width: 964px;
  height: 58px;
  object-fit: contain;
  border-radius: 3px;
  border: none;
  background-color: #ffffff;
  margin-top: 80px;
  font-weight: 400;
  position: absolute;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-weight: 400;
  }
  :::image {
    float: right;
    position: relative;
    z-index: 1;
  }
`
