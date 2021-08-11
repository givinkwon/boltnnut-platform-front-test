import React from "react";
import styled, { css } from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";

class TestContainer extends React.Component {
  state = { bChecked: false };
  setChecked = (value) => {
    this.setState({ bChecked: value });
  };

  checkHandler = ({ target }) => {
    this.setChecked(!this.state.bChecked);
    this.props.checkedItemHandler(this.props.issue.id, target.checked);
  };
  render() {
    return (
      <>
        <input
          type="checkbox"
          checked={this.state.bChecked}
          onChange={(e) => this.checkHandler(e)}
        />
      </>
    );
  }
}

export default TestContainer;
