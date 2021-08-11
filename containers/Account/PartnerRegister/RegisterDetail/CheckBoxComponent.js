import React from "react";
import styled, { css } from "styled-components";
import * as Content from "components/Content";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
@inject("Category")
@observer
class CheckBoxComponent extends React.Component {
  render() {
    const {
      isCheckAll,
      type,
      item,
      selectedList,
      Category,
      arrIdx = 0,
      wholeList = null,
    } = this.props;
    return (
      <>
        {isCheckAll ? (
          <>
            <input
              type="checkbox"
              checked={Category.checkAllState[type][arrIdx]}
              onChange={(e) => {
                Category.isChecked("category");
                if (e.target.checked) {
                  {
                    wholeList.map((subItem, idx) => {
                      Category.add_selected(type, subItem.id, "register");
                    });
                  }
                } else {
                  wholeList.map((subItem, idx) => {
                    Category.remove_selected(type, subItem.id, "register");
                  });
                }

                Category.checkAllState[type][arrIdx] =
                  !Category.checkAllState[type][arrIdx];

                this.setState({}); //re-render
                console.log(toJS(selectedList));
                if (type === "business") {
                  if (selectedList.length > 0) {
                    Category.nextBtnActive = true;
                  } else {
                    Category.nextBtnActive = false;
                  }
                }
              }}
            />
            <Font16>전체</Font16>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              onChange={(e) => {
                Category.isChecked("category");
                this.setState({}); //re-render
                if (e.target.checked) {
                  Category.add_selected(type, item.id, "register");
                } else {
                  //type
                  Category.remove_selected(type, item.id, "register");
                }
                console.log(toJS(selectedList));

                if (type === "business") {
                  if (selectedList.length > 0) {
                    Category.nextBtnActive = true;
                  } else {
                    Category.nextBtnActive = false;
                  }
                }
              }}
              //selectedList
              checked={selectedList.indexOf(item.id) > -1}
            />
            <Font16>{item.category}</Font16>
          </>
        )}
      </>
    );
  }
}

export default CheckBoxComponent;

const Font16 = styled(Content.FontSize16)`
  white-space: nowrap;
  margin-left: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.13;
  letter-spacing: -0.4px;
  text-align: left;
  color: #1e2222;

  overflow-x: auto;
`;
