import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import CheckBox from "components/CheckBox";
import CustomCheckBox from "components/CustomCheckBox";
import * as Text from "components/Text";

import CheckClassModal from "CheckClassModal";

import { WHITE, PRIMARY } from "static/style";

const drop_down = "/static/images/drop-down.png";
const drop_up = "/static/images/drop-up.png";

@inject("Auth", "Partner")
@observer
class MenuItemConatiner extends React.Component {
  state = {
    is_open: true,
    main_checked: this.props.main_checked,
    modal_open: false,
  };
  parentClick = () => {
    const { data, type } = this.props;
    if (type === "category") {
    }
    if (type === "develop") {
    } else if (type === "city") {
    }
  };
  checkDisabled = () => {
    const { Partner, data, type } = this.props;
    let allClean = true;

    if (type === "category") {
      data.category_set.forEach((category) => {
        const idx = Partner.search_category.findIndex(
          (categoryId) => categoryId === category.id
        );

        if (idx > -1) {
          allClean = false;
          return;
        }
      });

      if (allClean) {
        this.setState({
          ...this.state,
          main_checked: false,
        });
      } else {
        this.setState({
          ...this.state,
          main_checked: true,
        });
      }
    }
    if (type === "develop") {
      console.log(data.develop_set)
      data.develop_set.forEach((develop) => {
        const idx = Partner.search_develop.findIndex(
          (developId) => developId === develop.id
        );

        if (idx > -1) {
          allClean = false;
          return;
        }
      });

      if (allClean) {
        this.setState({
          ...this.state,
          main_checked: false,
        });
      } else {
        this.setState({
          ...this.state,
          main_checked: true,
        });
      }

    }
  };

  setCategory = (state) => {
      this.setState({
        ...this.state,
        main_checked: state,
      });
      this.props.Partner.setParentList(state, this.props.data, "category");
  };
  closeModal = () => {
    this.setState({
      ...this.state,
      modal_open: false,
    });
  };
  openDrop = () => {
    if (this.props.Auth.logged_in_client) {
      this.setState({ is_open: !this.state.is_open });
    } else {
      this.setState({
        modal_open: true,
      });
    }
  };
  async componentDidMount() {
    await this.props.Auth.checkLogin();

  }
  render() {
    const { data, type, Partner } = this.props;
    const { is_open, main_checked, modal_open} = this.state;

    if (type === "develop") {
      return (
        <div>
              {data.develop_set.length > 0 &&
                data.develop_set.map((item, idx) => {
                  return (
                    <SmallCheck key={idx}>
                      <CustomCheckBox
                        checked={Partner.search_develop.indexOf(item.id) > -1}
                        onClick={() => {
                          Partner.setList(item.id, "develop");
                          this.checkDisabled();
                        }}
                      >
                        {item.category}
                      </CustomCheckBox>
                    </SmallCheck>
                  );
                })}
        </div>
      );
    }
    return null;
  }
}

export default MenuItemConatiner;

const Dropdown = styled.div`
  display: flex;
  align-items: center;
  > div {
    cursor: pointer;
    display: flex;
    align-items: center;

    width: 100%;
  }
  > label {
    margin: 0px;
  }
`;

const SmallCheck = styled.div`
  height: 36px;
  font-size: 24px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.42;
  letter-spacing: -0.6px;
  text-align: left;
  color: #191919;
`;
