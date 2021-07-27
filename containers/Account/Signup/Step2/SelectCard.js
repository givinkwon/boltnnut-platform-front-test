import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import * as Text from "components/Text";
import SelectComponent from "components/Select";

const medalImg = "/static/images/signup/medal.svg";
@inject("Auth", "Answer")
@observer
class SelectCard extends React.Component {
  render() {
    const { Auth, name } = this.props;
    return (
      <Container>
        <Header>
          <img src={medalImg} />
          <span>{name}</span>
        </Header>
        <Select
          placeholder=""
          styles={customStyles}
          value={Auth.business3}
          options={categoryArray}
          getOptionLabel={(option) => option.label}
          onChange={Auth.setBusiness3}
        />
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
  height: 116px;
  padding: 14px 20px 20px 20px;
  box-sizing: border-box;
  margin-bottom: 24px;
`;

const Header = styled.div`
  display: flex;
  > span {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.4px;
    color: #282c36;
    font-weight: normal;
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
