import React, { Component } from "react";
import InnerBox from "components/InnerBox";
import * as Content from "components/Content";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import CheckBoxComponent from "./CheckBoxComponent";
const topCategoryOuterStyles = {
  borderRadius: "5px",
  border: "1px solid #e1e2e4",
  marginBottom: 20,
};

const outerStylesFirst = {
  borderRadius: "5px",
  border: "2px solid #e1e2e4",
  marginBottom: 70,
  marginTop: 100,
};

const outerStyles = {
  borderRadius: "5px",
  border: "2px solid #e1e2e4",
  marginBottom: 20,
};

const outerStyles_error = {
  borderRadius: "5px",
  border: "2px solid #e53c38",
  marginBottom: 70,
  marginTop: 100,
};

const innerStyles = {
  padding: "40px 78px",
};
@inject("Category", "Auth")
@observer
class CategoryContainer extends Component {
  componentDidMount() {
    // console.log("===================================");
    // console.log(toJS(this.props.Category.mainbusiness_list));
    // console.log(toJS(this.props.Category.maincategory_list));
    // console.log(toJS(this.props.Category.category_list));
    // console.log("===================================");
    // this.props.Auth.nextBtnActive = false;
    console.log("componentDidMount in CategoryContainer");
    this.props.Category.isChecked("category");
  }
  render() {
    const { Category, Auth } = this.props;
    console.log(Auth.error_register)
    return (
      <>
        {Category.RegisterTypeArray.map((item, idx) => {
          return (
            <>
              {item.checked && (
                <InnerBox
                  outerStyles={Auth && Auth.error_register ? outerStyles_error : outerStylesFirst}
                  innerStyles={innerStyles}
                  Content={() => {
                    return (
                      <>
                        <CategoryBox>
                          <ContentBox>
                            <HeaderText>
                              <img src={item.img} />
                              <Font18>
                                {Category.mainbusiness_list &&
                                  Category.mainbusiness_list[item.id]
                                    .maincategory}
                                     &nbsp;
                                     
                                <b style={{                             
                                    fontWeight: "bold",
                                    color: "#E53C38",
                                }}>(필수)</b>
                              </Font18>
                            </HeaderText>

                            <CheckItemBox>
                              <CheckItem>
                                <CheckBoxComponent
                                  isCheckAll={true}
                                  type={"business"}
                                  selectedList={Category.business_selected}
                                  item={item}
                                  arrIdx={idx}
                                  wholeList={
                                    Category.mainbusiness_list[item.id]
                                      .business_set
                                  }

                                />
                              </CheckItem>
                              <CheckItem></CheckItem>
                              <CheckItem></CheckItem>
                              {Category.mainbusiness_list[
                                item.id
                              ].business_set.map((subItem, idx) => {
                                return (
                                  <CheckItem>
                                    <CheckBoxComponent
                                      isCheckAll={false}
                                      type={"business"}
                                      selectedList={Category.business_selected}
                                      item={subItem}
                                    />
                                  </CheckItem>
                                );
                              })}
                            </CheckItemBox>
                          </ContentBox>
                        </CategoryBox>
                      </>
                    );
                  }}
                ></InnerBox>
              )}
            </>
          );
        })}
        <Font18 style={{ textAlign: "left", width: "100%", marginBottom: 16 }}>
          카테고리
        </Font18>
        <InnerBox
          outerStyles={outerStyles}
          innerStyles={innerStyles}
          Content={() => {
            return (
              <CategoryBox>
                {Category.maincategory_list.map((item, mainIdx) => {
                  return (
                    <ContentBox>
                      <HeaderText>
                        <Font18>{item.maincategory} </Font18>
                        <Font16
                          style={{
                            color: "#86888c",
                            fontWeight: 500,
                          }}
                        >
                          (중복 선택 가능)
                        </Font16>
                      </HeaderText>

                      <CheckItemBox>
                        <CheckItem>
                          <CheckBoxComponent
                            isCheckAll={true}
                            type={"category"}
                            selectedList={Category.category_selected}
                            item={item}
                            arrIdx={mainIdx}
                            wholeList={item.category_set}
                          />
                        </CheckItem>
                        <CheckItem></CheckItem>
                        <CheckItem></CheckItem>
                        {item.category_set.map((subItem, subIdx) => {
                          return (
                            <CheckItem>
                              <CheckBoxComponent
                                isCheckAll={false}
                                type={"category"}
                                selectedList={Category.category_selected}
                                item={subItem}
                              />
                            </CheckItem>
                          );
                        })}
                      </CheckItemBox>
                    </ContentBox>
                  );
                })}
              </CategoryBox>
            );
          }}
        ></InnerBox>
      </>
    );
  }
}

export default CategoryContainer;


const CheckItem = styled.label`
  width: 33%;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 24px;
  > input {
    width: 18px;
    height: 18px;
  }
  @media (min-width: 1200px) {
    width: 186px;
  }

`;
const CheckItemBox = styled.div`
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  /* align-content: space-between; */
  justify-content: space-between;
`;
const CategoryBox = styled.div`
  div:nth-last-child(1) {
    margin-bottom: 0;
  }
`;
const ContentBox = styled.div`
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const HeaderText = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #e1e2e4;
  padding-bottom: 16px;
  margin-bottom: 27px;
`;
const Font18 = styled(Content.FontSize18)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  text-align: left;
  color: #1e2222;
`;

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
