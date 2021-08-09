import React, { Component } from "react";
import InnerBox from "components/InnerBox";
import * as Content from "components/Content";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import TestCheckBox from "./test";
const topCategoryOuterStyles = {
  borderRadius: "5px",
  border: "1px solid #e1e2e4",
  marginBottom: 20,
};

const outerStyles = {
  borderRadius: "5px",
  border: "1px solid #e1e2e4",
  marginBottom: 20,
};

const innerStyles = {
  padding: "40px 78px",
};

const test = [
  {
    maincategory: "메인카테고리1",
    category_set: [
      {
        id: 1,
        category: "서브카테고리1",
      },
      {
        id: 2,
        category: "서브카테고리2",
      },
      {
        id: 3,
        category: "서브카테고리3",
      },
      {
        id: 4,
        category: "서브카테고리4",
      },
      {
        id: 5,
        category: "서브카테고리5",
      },
      {
        id: 6,
        category: "서브카테고리6",
      },
      {
        id: 7,
        category: "서브카테고리7",
      },
    ],
  },
  {
    maincategory: "메인카테고리2",
    category_set: [
      {
        id: 8,
        category: "서브카테고리1",
      },
      {
        id: 9,
        category: "서브카테고리2",
      },
      {
        id: 10,
        category: "서브카테고리3",
      },
    ],
  },
  {
    maincategory: "메인카테고리3",
    category_set: [
      {
        id: 11,
        category: "서브카테고리1",
      },
      {
        id: 12,
        category: "서브카테고리2",
      },
      {
        id: 13,
        category: "서브카테고리3",
      },
    ],
  },
];

const mainType = [
  {
    maincategory: "부품/완제품 판매",
    category_set: [
      {
        id: 1,
        category: "완제품 판매",
      },
      {
        id: 2,
        category: "부품 판매",
      },
    ],
  },
  {
    maincategory: "개발/설계",
    category_set: [
      {
        id: 8,
        category: "서브카테고리1",
      },
      {
        id: 9,
        category: "서브카테고리2",
      },
      {
        id: 10,
        category: "서브카테고리3",
      },
    ],
  },
  {
    maincategory: "제작",
    category_set: [
      {
        id: 11,
        category: "서브카테고리1",
      },
      {
        id: 12,
        category: "서브카테고리2",
      },
      {
        id: 13,
        category: "서브카테고리3",
      },
    ],
  },
];

@inject("Auth", "Category")
@observer
class Category extends Component {
  state = {};
  componentDidMount() {
    console.log("===================================");
    console.log(toJS(this.props.Category.mainbusiness_list));
    console.log(toJS(this.props.Category.maincategory_list));
    console.log(toJS(this.props.Category.category_list));
    console.log("===================================");
  }
  render() {
    const { Auth, Category } = this.props;
    return (
      <>
        {Auth.RegisterTypeArray.map((item, idx) => {
          return (
            <>
              {item.checked && (
                <InnerBox
                  outerStyles={outerStyles}
                  innerStyles={innerStyles}
                  Content={() => {
                    return (
                      <>
                        <CategoryBox>
                          <ContentBox>
                            <HeaderText>
                              <img src={item.img} />
                              <Font18>
                                {
                                  Category.mainbusiness_list[item.id]
                                    .maincategory
                                }
                              </Font18>
                            </HeaderText>

                            <CheckItemBox>
                              <CheckItem>
                                <input type="checkbox" />
                                <Font16>전체</Font16>
                              </CheckItem>
                              <CheckItem></CheckItem>
                              <CheckItem></CheckItem>
                              {Category.mainbusiness_list[
                                item.id
                              ].business_set.map((subItem, idx) => {
                                return (
                                  <CheckItem>
                                    <input type="checkbox" />
                                    <Font16>{subItem.category}</Font16>
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
                {Category.maincategory_list.map((item, idx) => {
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
                          <input
                            type="checkbox"
                            onChange={(e) => {
                              if (e.target.checked) {
                                {
                                  item.category_set.map((subItem, idx) => {
                                    Category.add_selected(
                                      "business",
                                      subItem.id
                                    );
                                  });
                                }
                              } else {
                                item.category_set.map((subItem, idx) => {
                                  Category.remove_selected(
                                    "business",
                                    subItem.id
                                  );
                                });
                              }
                              console.log(Category.business_selected);
                            }}
                          />
                          <Font16>전체</Font16>
                        </CheckItem>
                        <CheckItem></CheckItem>
                        <CheckItem></CheckItem>
                        {item.category_set.map((subItem, idx) => {
                          return (
                            // <CheckItem for={item.id}>
                            //   <input type="checkbox" id={item.id} />
                            //   <Font16>{item.category}</Font16>
                            // </CheckItem>
                            <CheckItem>
                              {Category.business_selected.indexOf(subItem.id) >
                              -1
                                ? "true"
                                : "false"}
                              <TestCheckBox />
                              {/* <input
                                type="checkbox"
                                onChange={(e) => {
                                  // this.setState({ f: 3 });
                                  // this.forceUpdate();
                                  console.log(
                                    Category.business_selected.indexOf(
                                      subItem.id
                                    ) > -1
                                  );
                                  if (e.target.checked) {
                                    Category.add_selected(
                                      "business",
                                      subItem.id
                                    );
                                  } else {
                                    Category.remove_selected(
                                      "business",
                                      subItem.id
                                    );
                                  }
                                  console.log(this);
                                }}
                                checked={
                                  Category.business_selected.indexOf(
                                    subItem.id
                                  ) > -1
                                }
                              /> */}
                              <Font16>{subItem.category}</Font16>
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

export default Category;

const CheckItem = styled.label`
  width: 33%;
  display: flex;
  align-items: center;
  cursor: pointer;
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
  padding-bottom: 17px;
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
