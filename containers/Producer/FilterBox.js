import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox } from "@material-ui/core";

import { toJS } from "mobx";

import * as Content from "components/Content";
import Partner from "../../stores/Partner";

const pass3 = "static/images/pass3.png";

@inject("Partner")
@observer
class FilterBoxContainer extends React.Component {
  state = {
    index: 1,
    checked: false,
  };

  componentDidMount() {
    console.log("didmount");
  }

  componentWillUnmount() {
    console.log("unmount");
  }

  onClickFilterHandler = async (item, idx, filter) => {
    let partFilterAry = [];
    let temp = [];

    if (filter === "filter" || filter === "mobileFilter") {
      const { Partner } = this.props;
      await Partner.resetDevCategory();
      if (Partner.filter_category_idx !== idx) {
        Partner.index = idx;
        Partner.filter_category_idx = idx;
        Partner.filter_category = item.id;
        console.log(toJS(Partner.filter_category));
      } else {
        Partner.filter_category_idx = -1;
        Partner.filter_category = 0;
        console.log(toJS(Partner.filter_category));
      }
      Partner.partner_next = null;
      Partner.partner_count = null;
      Partner.currentPage = 1;
      Partner.click_count += 1;
      await Partner.getPartner(Partner.currentPage, Partner.click_count);
    }
  };

  activeHandler = (idx, filter) => {
    if (this.props.Partner.filterArray[idx]) {
      if (filter === "filter" || filter === "mobileFilter") {
        if (idx === this.props.Partner.filter_category_idx) {
          return true;
        } else {
          return false;
        }
      } else {
        if (idx === Partner.filterbox_budget_checked_idx) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  render() {
    const { checked, data, filter, Partner } = this.props;
    const { placeholder, label, disabled, ...props } = this.props;

    return (
      <FormControl
        component="fieldset"
        style={{ flexDirection: "row", width: "100%", flexWrap: "wrap" }}
        filter={filter}
      >
        {filter === "filter" &&
          data.map((item) => {
            return (
              <Item
                onClick={() => {
                  // if (this.props.Partner.filterLoading) {
                  this.onClickFilterHandler(item, item.id - 1, filter);
                  // }
                  console.log(item);
                }}
                active={this.activeHandler(item.id - 1, filter)}
                filter={filter}
              >
                <div>
                  <div active={this.activeHandler(item.id - 1, filter)}>
                    <img
                      src={pass3}
                      active={this.activeHandler(item.id - 1, filter)}
                    />
                  </div>
                  <span>{item.name}</span>
                </div>
              </Item>
            );
          })}

        {filter === "mobileFilter" &&
          data.map((item) => {
            return (
              <Item
                onClick={() => {
                  this.onClickFilterHandler(item, item.id - 1, filter);
                }}
                active={this.activeHandler(item.id - 1, filter)}
                filter={filter}
              >
                <div>
                  <span style={{ textAlign: "center" }}>{item.name}</span>
                </div>
              </Item>
            );
          })}
      </FormControl>
    );
  }
}

export default FilterBoxContainer;

const FormControl = styled.div`
  display: flex;
  //justify-content: space-between;
  justify-content: ${(props) =>
    props.filter === "mobileFilter" ? "space-between" : ""};
`;

const Item = styled.div`
  //width: 100%;
  display: flex;
  //margin-bottom: 20px;
  padding-left: 4px;
  align-items: center;
  // width: 32%;

  div {
    display: flex;
    align-items: center;
    //margin-right: ${(props) => (props.filter === "filter" ? "70px" : "10px")};

    > div {
      width: 16px;
      height: 16px;

      margin-right: 10px;
      position: relative;
      border-radius: 2px;
      cursor: pointer;
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
      font-weight: normal;
      cursor: pointer;
      width: 100px;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    border: 1px solid #c6c7cc;
    width: 40%;
    margin-right: 10px;
    margin-bottom: 16px;
    border-radius: 3px;
    justify-content: center;
    // color: #ffffff;
    background-color: ${(props) => (props.active ? "#0933b3" : "#ffffff")};

    div {
      margin-right: ${(props) => (props.filter === "filter" ? "10px" : "10px")};

      > div {
        width: 12px;
        height: 12px;

        > img {
          top: 17%;
          left: 15%;
          width: 9px;
          height: 7px;
        }
      }

      > span {
        font-size: 12px;
        color: ${(props) => (props.active ? "#ffffff" : "#c1bfbf")};
        // color: #c1bfbf;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    div {
      margin-right: ${(props) => (props.filter === "filter" ? "10px" : "10px")};
      > div {
        background-color: ${(props) => (props.active ? "#0933b3" : "#e1e2e4")};
      }
      > span {
        color: ${(props) => (props.active ? "#0933b3" : "#999999")};
        font-size: 11px;
        width: 91px;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > div {
      margin-right: ${(props) => (props.filter === "filter" ? "15px" : "10px")};
      > div {
        background-color: ${(props) => (props.active ? "#0933b3" : "#e1e2e4")};
      }
      > span {
        color: ${(props) => (props.active ? "#0933b3" : "#999999")};
        font-size: 13px;
      }
    }
  }
  @media (min-width: 1300px) {
    > div {
      > div {
        background-color: ${(props) => (props.active ? "#0933b3" : "#e1e2e4")};
      }
      > span {
        color: ${(props) => (props.active ? "#0933b3" : "#999999")};
      }
    }
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
