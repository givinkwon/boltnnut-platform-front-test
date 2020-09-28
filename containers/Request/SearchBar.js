import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Router from "next/router";

import Container from "components/Container";
import ButtonComponent from "components/Button";
import SelectComponent from "components/Select";
import CheckBoxComponent from "components/CheckBox";

import * as Text from "components/Text";
import { WHITE, PRIMARY, BLACK1 } from "static/style";

@inject("Request")
@observer
class SearchBarConatiner extends React.Component {
  state = {
    search: "",
  };
  searchText = (e) => {
    this.setState({ search: e.target.value });
  };
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // TODO 검색 API
      Router.push(`/partner?q=${this.state.search}`);
    }
  };
  render() {
    const { search } = this.state;
    const { Request } = this.props;

    const allContents = [ { id: 0, maincategory: '전체보기', category: '전체보' } ]

    return (
      <Form>
        <Container style={{width: 'calc(100%-30px)'}}>
          <br/><br/><br/>
          <Text.FontSize40 color={BLACK1} fontWeight={700}>STEP1. 만들고자하는 제품 카테고리 고르기</Text.FontSize40>

          {
            /*
          <SearchBar>
            <input
              placeholder="어떤 분야의 전문가를 찾으시나요?"
              value={search}
              onChange={this.searchText}
              onKeyDown={this.handleKeyDown}
            />
            <ButtonComponent
              backgroundColor={PRIMARY}
              borderColor={PRIMARY}
              borderRadius={0}
            >
              <Text.FontSize20 color={WHITE} fontWeight={500}>
                제조사 찾기
              </Text.FontSize20>
            </ButtonComponent>
          </SearchBar>
          */
          }
          <More>

            <div>
              <Text.FontSize20 color={BLACK1} fontWeight={700}>대카테고리</Text.FontSize20>
              <br/><br/>
              <SelectComponent
                options={
                  Request.big_category_list
                }
                placeholder="대 카테고리"
                value={Request.select_big}
                getOptionLabel={(option) => option.maincategory}
                onChange={Request.setBigCategory}
              />
            </div>
            <br/>
            {Request.select_big && <div>
              <Text.FontSize20 color={BLACK1} fontWeight={700}>중카테고리</Text.FontSize20>
              <br/><br/>
              <SelectComponent
                options={Request.mid_category_list}
                placeholder="중 카테고리"
                value={Request.select_mid}
                getOptionLabel={(option) => option.category}
                onChange={Request.setMidCategory}
              />
            </div>}
            <br/>
            {Request.select_mid && <div>
              <Text.FontSize20 color={BLACK1} fontWeight={700}>소카테고리</Text.FontSize20>
              <br/><br/>
              <SelectComponent
                options={Request.small_category_list}
                placeholder="소 카테고리"
                value={Request.select_small}
                getOptionLabel={(option) => option.subclass}
                onChange={Request.setSmallCategory}
              />
            </div>}

          </More>
        </Container>
      </Form>
    );
  }
}

export default SearchBarConatiner;

const SearchBar = styled.div`
  display: flex;
  > input {
    width: 100%;
    padding: 0 15px;
    background-color: #f5f5f5;
    border: 1px solid #dededf;
    border-right: 0px;
    :focus {
      outline: none;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 30px;
    input {
      font-size: 14px;
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
const More = styled.div`
  width: 100%;
  margin-top: 60px;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      /* margin-top: 10px; */
      width: 100%;
    }
  }
  @media (min-width: 768px) {
    display: flex;
    padding: 0 15px;
    /* margin-top: 10px; */
    > div {
      width: calc(100% / 3 - 30px);
      :nth-of-type(2) {
        margin: 0 30px;
      }
    }
  }
`;
const Form = styled.div`
  background-color: #fff;
`;
