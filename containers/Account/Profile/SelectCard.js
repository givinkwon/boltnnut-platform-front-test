import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import * as Text from "components/Text";
import SelectComponent from "components/Select";
import FilterModalContainer from "./FilterModalContainer";

const down_arrow = "/static/icon/down_arrow.svg";
const up_arrow = "/static/icon/up_arrow.svg";

@inject("Auth", "Answer", "Partner", "Category")
@observer
class SelectCard extends React.Component {
  state = {
    search: "",
    modal_open: false,
    list: false,
    filter_city_active: false,
    filter_category_active: false,
    type: "",
    category_arrow: false,
    classify_arrow: false,
    location_arrow: false,
  };

  activeHandler = (flag) => {
    if (flag == "city") {
      if (this.state.filter_city_active) {
        this.setState({ filter_city_active: false });
      } else {
        this.setState({ filter_city_active: true });
      }
    }
    if (flag == "category") {
      if (this.state.filter_category_active) {
        this.setState({ filter_category_active: false });
      } else {
        this.setState({ filter_category_active: true });
      }
    }
    if (flag == "category_arrow") {
      if (this.state.category_arrow) {
        this.setState({ category_arrow: false });
      } else {
        this.setState({ category_arrow: true });
      }
    }
    if (flag == "classify_arrow") {
      if (this.state.classify_arrow) {
        this.setState({ classify_arrow: false });
      } else {
        this.setState({ classify_arrow: true });
      }
    }
    if (flag == "location_arrow") {
      if (this.state.location_arrow) {
        this.setState({ location_arrow: false });
      } else {
        this.setState({ location_arrow: true });
      }
    }
  };

  dropdownHandler = (flag) => {
    const { Partner } = this.props;
    console.log(flag);
    Partner.filter_dropdown_type = flag;

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

    if (flag == "develop") {
      this.setState({ ...this.state, type: "develop" });
    }

    if (flag == "material") {
      this.setState({ ...this.state, type: "material" });
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

  render() {
    const { Auth, name, Partner, id, type, Category, image } = this.props;
    console.log(this.state.type);
    console.log("==================");
    console.log(this.props.type);
    console.log(Category.business_selected_name);
    return (
      <Container>
        <Header>
          <img src={image} />
          <span>{name}</span>
        </Header>
        <Field             
            onClick={() => {
              this.dropdownHandler(this.props.type);
              this.activeHandler("category_arrow");
            }}>
          <div>클릭하세요.</div>
          <img
            src={this.state.category_arrow ? up_arrow : down_arrow}
          ></img>
        </Field>

        {Partner.filter_dropdown &&
          Partner.filter_dropdown_type === this.props.type && (
            <FilterModalContainer type={this.state.type}></FilterModalContainer>
          )}

        {Partner.filter_dropdown_type === "business" &&
          Category.business_selected_name &&
          Category.business_selected_name.map((item, idx) => {
            return <div>{item}</div>;
          })}

        {/* <Select
          placeholder=""
          styles={customStyles}
          value={Auth.business3}
          options={categoryArray}
          getOptionLabel={(option) => option.label}
          onChange={Auth.setBusiness3}
        /> */}
      </Container>
    );
  }
}

export default SelectCard;

const categoryArray = [
  { label: "전체", value: "전체" },
  { label: "제목", value: "제목" },
  { label: "내용", value: "내용" },
];

const customStyles = {
  dropdownIndicator: () => ({
    color: "#555555",
    width: 32,
    height: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 16,
    fontSize: 16,
  }),
  control: () => ({
    marginTop: 10,
    border: "1px solid #c7c7c7",
    backgroundColor: "#fff",
    display: "flex",
    borderRadius: 3,
    padding: 5,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

const Container = styled.div`
  border: 1px solid #c6c7cc;
  border-radius: 5px;
  width: 100%;
  // height: 116px;
  padding: 14px 20px 20px 20px;
  box-sizing: border-box;
  margin-bottom: 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  > span {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.4px;
    color: #282c36;
    font-weight: normal;
    margin-left: 4px;
  }
`;

const Select = styled(SelectComponent)`
  width: 100%;
  height: 44px;
  box-sizing: border-box;

  option {
    color: #c1bfbf;
  }
`;

const Field = styled.div`
  cursor: pointer;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border-radius: 3px;
  border: solid 1px #c6c7cc;
  div {
    margin-left: 16px;
    line-height: 2.27;
    letter-spacing: -0.38px;
    text-align: left;
    color: #b3b3b3;
  }
  img {
    margin-right: 12px;
    cursor: pointer;
  }
`;
