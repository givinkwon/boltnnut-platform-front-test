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

    // console.log(Category.mainbusiness_list);

    this.setState({ mainCategoryTypeDic: mainCategoryTypeDic });
    console.log(toJS(mainCategoryTypeDic["business"]));
    // console.log(toJS(mainCategoryTypeDic["business"]).mainbusiness);
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

      // if (idx === this.state.subSelectIdx) {
      //   return true;
      // } else {
      //   return false;
      // }
    }
  };

  buttonClick = (type, idx) => {
    const { Category } = this.props;
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
            {this.state.mainCategoryTypeDic[type] &&
              toJS(this.state.mainCategoryTypeDic[type]).map((data, idx) => {
                return (
                  <MainCategoryButton
                    onClick={() => {
                      this.buttonClick("main", idx);
                    }}
                    active={this.activeHandler("main", idx)}
                  >
                    <MainCategoryFont>
                      {/* 이 부분 수정필요 / 각 카테고리에 대응해야됨. */}
                      {this.state.mainCategoryTypeDic[type][idx].mainbusiness} 
                    </MainCategoryFont>
                  </MainCategoryButton>
                );
              })}
          </>
        </MainCategoryBox>

        <div style={{ width: "73.4%" }}>
          <SubCategoryBox>
            <SubInnerBox>
              {Category.mainbusiness_list[this.state.mainSelectIdx] &&
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
                      <SubCategoryFont>{sub_data.business}</SubCategoryFont>
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
                회원가입
              </MainCategoryFont>
            </ButtonComponent>
            <ButtonComponent
              backgroundColor={"white"}
              borderRadius={3}
              borderWidth={1}
              borderColor={"gray"}
            >
              <MainCategoryFont color={"#505050"} fontWeight={500}>
                회원가입
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
