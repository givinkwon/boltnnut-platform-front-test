import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox } from "@material-ui/core";

import * as Content from "components/Content";
import Partner from "stores/Partner";

const pass3 = "static/images/pass3.png";

@inject("Partner")
@observer
class FilterBox2Container extends React.Component {
  state = {
    index: 1,
    checked: false,
  };

  componentDidMount() {
    const { data } = this.props;
  }
  componentWillUnmount() {
    const { data } = this.props;

    Partner.filterbox_view_checked_idx = 0;
  }

  onClickFilterHandler = (item, idx, filter) => {
    const { Partner } = this.props;

    if (Partner.filterbox_view_checked_idx !== idx) {
      this.setState({ index: idx });
      Partner.filterbox_view_checked_idx = idx;

      Partner.filter_view = item.id;
      Partner.partner_next = null;
      Partner.partner_count = null;
      Partner.currentPage = 1;
      Partner.resetDevCategory();
      if (!Partner.requestModalActive) {
        Partner.getPartner();
      }
    }
  };

  activeHandler = (idx, filter) => {
    if (idx === Partner.filterbox_view_checked_idx) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { checked, data, filter } = this.props;
    const { placeholder, label, disabled, ...props } = this.props;
    let filterWidth = 0;
    if (this.props.width > 767.98) {
      filterWidth = 155;
    } else {
      filterWidth = 125;
    }

    return (
      <FormControl
        component="fieldset"
        style={{
          flexDirection: "row",
          width: filterWidth + "px",
          marginRight: "19px",
          border: "1px solid #c6c7cc",
          borderRadius: "3px",
        }}
      >
        {data.map((item) => {
          return (
            <Item
              onClick={() => {
                this.onClickFilterHandler(item, item.id, filter);
              }}
              active={this.activeHandler(item.id, filter)}
            >
              <div active={this.activeHandler(item.id, filter)}>
                <div active={this.activeHandler(item.id, filter)} />
              </div>
              <span>{item.name}</span>
            </Item>
          );
        })}
      </FormControl>
    );
  }
}

export default FilterBox2Container;

const Item = styled.div`
  //width: 100%;
  display: flex;
  //margin-bottom: 20px;
  padding-left: 4px;
  align-items: center;
  margin-right: 6px;
  > div {
    width: 14px;
    height: 14px;
    // background-color: ${(props) => (props.active ? "#0933b3" : "#e1e2e4")};
    //background-color: #ffffff;
    border: ${(props) =>
      props.active ? "1px solid #0933b3" : "1px solid #86888c"};
    margin-right: 10px;
    position: relative;
    border-radius: 16px;
    cursor: pointer;
    > div {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      display: ${(props) => (props.active ? "" : "none")};
      background-color: #0933b3;
    }
    > img {
      display: ${(props) => (props.active ? "static" : "none")};
      position: absolute;
      top: 17%;
      left: 15%;
    }
  }
  > span {
    font-size: 16px;
    text-align: left;
    line-height: 30px;
    letter-spacing: -0.16px;
    font-weight: 500;
    cursor: pointer;
    color: ${(props) => (props.active ? "#0933b3" : "#999999")};
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > span {
      font-size: 12px;
    }
    > div {
      width: 9px;
      height: 9px;
      border-radius: 9px;
      > div {
        width: 5px;
        height: 5px;
        border-radius: 3px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`;

const Font16 = styled(Content.FontSize16)`
  font-weight: 500 !important;
  font-stretch: normal !important;
  font-style: normal !important;
  line-height: 1.25 !important;
  letter-spacing: -0.4px !important;
  color: #282c36;
  margin-top: 28px;
  margin-bottom: 29px;
`;

const FormItemControl = styled(FormControl)``;
