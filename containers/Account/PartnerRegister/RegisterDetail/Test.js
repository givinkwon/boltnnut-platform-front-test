import React from "react";
import styled, { css } from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";

class TestContainer extends React.Component {
  state = { bChecked: false };
  setChecked = (value) => {
    this.setState({ bChecked: value });
  };
  checkedItemHandler = (id, isChecked) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
    }
  };
  checkHandler = ({ target }) => {
    setChecked(!bChecked);
    checkedItemHandler(issue.id, target.checked);
  };
  render() {
    return (
      <>
        <input type="checkbox" />
      </>
    );
  }
}

export default TestContainer;
