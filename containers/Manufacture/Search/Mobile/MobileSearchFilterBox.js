import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import FilterBoxSearchBar from "./FilterBoxSearchBar";
import FilterModalContainer from "../Home/FilterModal";

@inject("Partner")
@observer
class MobileSearchFilterConatiner extends React.Component {
  state = {
    type: "",
  };

  dropdownHandler = (flag) => {
    const { Partner } = this.props;

    // 카테고리 선택
    if (flag == "business") {
      this.setState({ ...this.state, type: "business" });
    }

    // 업체 분류 선택
    if (flag == "category") {
      this.setState({ ...this.state, type: "category" });
    }

    // 지역 선택
    if (flag == "city") {
      this.setState({ ...this.state, type: "city" });
    }

    // 공정 선택
    if (flag == "develop&material") {
      this.setState({ ...this.state, type: "develop&material" });
    }

    if (Partner.filter_dropdown) {
      Partner.filter_dropdown = false;
    } else {
      Partner.filter_dropdown = true;
    }
  };

  componentDidMount = async () => {
    const { Partner } = this.props;
    Partner.subButtonActive = false;
  };

  componentWillUnmount = () => {
    const { Partner } = this.props;
    Partner.filterArray.map((data, idx) => {
      data.checked = false;
    });
  };

  render() {
    const { Partner } = this.props;

    return (
      <Container>
        <FilterBoxSearchBar />

        <FilterCategory>
          <Category>
            <CategoryName
              onClick={() => {
                this.dropdownHandler("category");
              }}
            >
              카테고리
            </CategoryName>
          </Category>

          <Category>
            <CategoryName
              onClick={() => {
                this.dropdownHandler("business");
              }}
            >
              업체 분류
            </CategoryName>
          </Category>

          <Category>
            <CategoryName
              onClick={() => {
                this.dropdownHandler("city");
              }}
            >
              지역
            </CategoryName>
          </Category>

          <Category>
            <CategoryName
              onClick={() => {
                this.dropdownHandler("develop&material");
              }}
            >
              공정, 소재
            </CategoryName>
          </Category>
        </FilterCategory>
        {Partner.filter_dropdown && <FilterModalContainer type={this.state.type}></FilterModalContainer>}
      </Container>
    );
  }
}

export default MobileSearchFilterConatiner;

const FilterCategory = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-left: 10px;
  background: none;
  border: none;
`;

const Category = styled.div`
  width: 22%;
  background-color: #f6f6f6;
  border-radius: 18px;
  border: none;
  margin-right: 6px;
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const CategoryName = styled.div`
  background: none;
  border: none;
  font-size: 12px;
  line-height: 2.27;
  letter-spacing: -0.38px;
  text-align: left;
  color: #555963;
  align-self: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
