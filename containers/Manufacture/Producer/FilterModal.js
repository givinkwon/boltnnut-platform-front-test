import React from "react";
import styled, { css } from "styled-components";
import Background from "components/Background";
import InnerBoxComponent from "components/InnerBox";
import * as Title from "components/Title";
import * as Content from "components/Content";
import ButtonComponent from "components/Button";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Category from "../../../stores/Manufacture/Category";

const MainArr = ["제품", "기계/설비/장비", "부품", "공구류"];
const SubArr = [
  "제품",
  "기계/설비/장비",
  "부품",
  "공구류",
  "제품",
  "기계/설비/장비",
  "부품",
  "공구류",
];

@inject("Category")
@observer
class FilterModalContainer extends React.Component {
  async componentDidMount() {
    const { Category } = this.props;
    await Category.init();
    console.log("ASNCKLANSCLKNLAKSCNLKANSCLKNASLCK");
    var mainCategoryTypeDic = {};
    var subCategoryTypeDic = {};
    mainCategoryTypeDic["business"] = Category.mainbusiness_list;
    mainCategoryTypeDic["category"] = Category.maincategory_list;
    mainCategoryTypeDic["city"] = Category.city_list;
    mainCategoryTypeDic["material"] = Category.mainmaterial_list;
    mainCategoryTypeDic["develop"] = Category.developbig_list;

    // console.log(Category.mainbusiness_list);

    this.setState({ mainCategoryTypeDic: mainCategoryTypeDic });
    console.log(this.state.mainCategoryTypeDic);
  }
  state = {
    mainSelectIdx: 0,
    subSelectIdx: 0,
    mainCategoryTypeDic: {},
  };
  activeHandler = (type, idx) => {
    const { Category } = this.props;
    if (type === "main") {
      if (idx === this.state.mainSelectIdx) {
        return true;
      } else {
        return false;
      }
    } else {
      if (Category.category_selected.includes(idx)) {
        return true;
      } else {
        return false;
      }
    }
  };

  buttonClick = (type, idx) => {
    const { Category } = this.props;

    // 지역일 때는 다르게
    if (this.props.type == "city") {
      if (Category.categoryActiveHandler(idx, this.props.type)) {
        console.log("remove selected");
        Category.remove_selected(this.props.type, idx);
      } else {
        console.log("add selected");
        Category.add_selected(this.props.type, idx);
      }
    }

    if (type === "main") {
      this.setState({ mainSelectIdx: idx });
    } else {
      if (Category.categoryActiveHandler(idx, this.props.type)) {
        console.log("remove selected");
        Category.remove_selected(this.props.type, idx);
      } else {
        console.log("add selected");
        Category.add_selected(this.props.type, idx);
      }
      // this.setState({ subSelectIdx: idx });
    }
  };
  render() {
    const { Category, type } = this.props;
    console.log(this.props.type);
    console.log(this.state.mainSelectIdx);
    return (
      <ModalBox>
        {/* <InnerBoxComponent
        //   outerStyles={{padding:''}}
          Content={() => {
            return <>asd</>;
          }}
        ></InnerBoxComponent> */}
        <MainCategoryBox>
          <>
            {/* map으로 뿌리기 */}
            {this.props.type != "city" &&
              this.state.mainCategoryTypeDic[type] &&
              toJS(this.state.mainCategoryTypeDic[type]).map((data, idx) => {
                return (
                  <MainCategoryButton
                    onClick={() => {
                      this.buttonClick("main", idx);
                    }}
                    active={this.activeHandler("main", idx)}
                  >
                    <MainCategoryFont>
                      {this.state.mainCategoryTypeDic[type][idx].maincategory}
                    </MainCategoryFont>
                  </MainCategoryButton>
                );
              })}
            {/* city 일 떄 */}
            {this.props.type == "city" &&
              this.state.mainCategoryTypeDic[type] &&
              toJS(this.state.mainCategoryTypeDic[type]).map((data, idx) => {
                return (
                  <MainCategoryButton
                    onClick={() => {
                      this.buttonClick("main", data.id);
                    }}
                    active={Category.categoryActiveHandler(data.id, type)}
                  >
                    <MainCategoryFont>
                      {this.state.mainCategoryTypeDic[type][idx].maincategory}
                    </MainCategoryFont>
                  </MainCategoryButton>
                );
              })}
          </>
        </MainCategoryBox>

        <div style={{ width: "73.4%" }}>
          <SubCategoryBox>
            <SubInnerBox>
              {/* 카테고리 선택 */}
              {type == "business" &&
                Category.mainbusiness_list[this.state.mainSelectIdx] &&
                Category.mainbusiness_list[
                  this.state.mainSelectIdx
                ].business_set.map((sub_data, idx) => {
                  return (
                    <SubCategoryButton
                      onClick={() => {
                        this.buttonClick("sub", sub_data.id);
                      }}
                      active={Category.categoryActiveHandler(sub_data.id, type)}
                    >
                      <SubCategoryFont>{sub_data.category}</SubCategoryFont>
                    </SubCategoryButton>
                  );
                })}

              {/* 업체 분류 선택 */}
              {type == "category" &&
                Category.maincategory_list[this.state.mainSelectIdx] &&
                Category.maincategory_list[
                  this.state.mainSelectIdx
                ].category_set.map((sub_data, idx) => {
                  return (
                    <SubCategoryButton
                      onClick={() => {
                        this.buttonClick("sub", sub_data.id);
                      }}
                      active={Category.categoryActiveHandler(sub_data.id, type)}
                    >
                      <SubCategoryFont>{sub_data.category}</SubCategoryFont>
                    </SubCategoryButton>
                  );
                })}

              {/* 공정 분류 선택 */}
              {type == "develop" &&
                Category.developbig_list[this.state.mainSelectIdx] &&
                Category.developbig_list[
                  this.state.mainSelectIdx
                ].develop_set.map((sub_data, idx) => {
                  return (
                    <SubCategoryButton
                      onClick={() => {
                        this.buttonClick("sub", sub_data.id);
                      }}
                      active={Category.categoryActiveHandler(sub_data.id, type)}
                    >
                      <SubCategoryFont>{sub_data.category}</SubCategoryFont>
                    </SubCategoryButton>
                  );
                })}
            </SubInnerBox>
          </SubCategoryBox>
          <ButtonBox>
            <ButtonComponent
              backgroundColor={"blue"}
              borderRadius={3}
              borderWidth={1}
              borderColor={"gray"}
            >
              <MainCategoryFont color={"#505050"} fontWeight={500}>
                초기화
              </MainCategoryFont>
            </ButtonComponent>
            <ButtonComponent
              backgroundColor={"white"}
              borderRadius={3}
              borderWidth={1}
              borderColor={"gray"}
            >
              <MainCategoryFont color={"#505050"} fontWeight={500}>
                적용
              </MainCategoryFont>
            </ButtonComponent>
          </ButtonBox>
        </div>
      </ModalBox>
    );
  }
}

export default FilterModalContainer;

const ModalBox = styled.div`
  display: flex;
  width: 100%;
  height: 293px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
`;

const MainCategoryBox = styled.div`
  height: 100%;
  width: 26.6%;
  border-right: 1px solid #e1e2e4;
`;

const MainCategoryButton = styled.div`
  background: ${(props) => (props.active ? "#ededef" : "none")};
  > p {
    color: ${(props) => props.active && "#0933b3"};
  }
`;

const SubCategoryBox = styled.div`
  height: 78.8%;
  border-bottom: 1px solid #e1e2e4;
`;

const SubInnerBox = styled.div`
  padding: 34px 18px 34px 18px;
  display: flex;
  flex-wrap: wrap;
`;
const SubCategoryButton = styled.div`
  width: 50%;
  background: ${(props) => (props.active ? "#ededef" : "none")};
  /* height:30px; */
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MainCategoryFont = styled(Content.FontSize15)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.27;
  letter-spacing: -0.38px;
  text-align: left;
  color: #282c36;
`;

const SubCategoryFont = styled(Content.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.43;
  letter-spacing: -0.35px;
  text-align: left;
  color: #282c36;
`;
