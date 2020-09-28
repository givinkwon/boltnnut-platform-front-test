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

@inject("Auth", "Partner")
@observer
class SearchBarConatiner extends React.Component {
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
        <Container>
          <SearchBar>
            <ButtonComponent
              backgroundColor={PRIMARY}
              borderColor={PRIMARY}
              borderRadius={0}
            >
              <Text.FontSize18 color={WHITE} fontWeight={500}>
                {Partner.partner_count ? intcomma(Partner.partner_count) : "0"}
                명의 전문제조사
              </Text.FontSize18>
            </ButtonComponent>
            <div>
              <input
                placeholder="원하시는 분야의 전문가를 검색해보세요"
                value={Partner.search_text}
                onChange={this.searchText}
                onKeyDown={this.handleKeyDown}
              />
              <SearchButton
                backgroundColor={PRIMARY}
                borderColor={PRIMARY}
                borderRadius={0}
                onClick={this.search}
              >
                <img
                  style={{ width: 20, height: 20, marginRight: 5 }}
                  src="/static/images/search_white.png"
                />
                <Text.FontSize20 color={WHITE} fontWeight={500}>
                  찾아보기
                </Text.FontSize20>
              </SearchButton>
            </div>
          </SearchBar>
        </Container>
      </Form>
    );
  }
}

export default SearchBarConatiner;

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
`;

const SearchButton = styled(ButtonComponent)`
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
`
