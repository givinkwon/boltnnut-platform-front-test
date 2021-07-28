import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import Button from "components/Button";
import SelectCard from "./SelectCard";
import Authentication from "./Authentication";
import Explaination from "./Explaination";
import Product from "./Product";
import Introduction from "./Introduction";
import Portfolio from "./portfolio";
import Location from "./Location";
import * as Title from "components/Title";
import * as Content from "components/Content";
import * as Text from "components/Text";
import { toJS } from "mobx";

const arrowRightImg = "/static/images/producer/arrow_right.svg";
const checkImg = "/static/images/producer/check.svg";

@inject("Category", "Partner", "Profile")
@observer
class MainContainer extends React.Component {
  async componentDidMount() {
    const { Category, Profile } = this.props;
    await Category.init();
    console.log(Category.business_list);
    var mainCategoryTypeDic = {};
    var subCategoryTypeDic = {};
    mainCategoryTypeDic["business"] = Category.mainbusiness_list;
    mainCategoryTypeDic["category"] = Category.maincategory_list;
    mainCategoryTypeDic["city"] = Category.city_list;
    mainCategoryTypeDic["material"] = Category.mainmaterial_list;
    mainCategoryTypeDic["develop"] = Category.developbig_list;

    // 파트너 데이터 가져오기
    await Profile.checkLogin();
    // console.log(Category.mainbusiness_list);

    this.setState({ mainCategoryTypeDic: mainCategoryTypeDic });
    console.log(this.state.mainCategoryTypeDic);
  }
  state = {
    mainSelectIdx: 0,
    subSelectIdx: 0,
    mainCategoryTypeDic: {},

    // 공정 대분류
    develop_active: false,
    // 소재 대분류
    material_active: false,
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
    console.log(type);
    console.log(idx);

    // 공정 클릭 했을 때
    if (type == "develop") {
      if (Category.categoryActiveHandler(idx, type)) {
        console.log("remove selected");
        Category.remove_selected(type, idx);
      } else {
        console.log("add selected");
        Category.add_selected(type, idx);
      }
    }
    // 소재 클릭 했을 때
    if (type == "material") {
      if (Category.categoryActiveHandler(idx, type)) {
        console.log("remove selected");
        Category.remove_selected(type, idx);
      } else {
        console.log("add selected");
        Category.add_selected(type, idx);
      }
    }

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

  // 소재, 공정 클릭 했을 때
  CategoryClick = (state) => {
    const { Category, type } = this.props;
    if (state == "develop") {
      //this.props.type = "develop"
      this.setState({
        ...this.state,
        develop_active: !this.state.develop_active,
        material_active: false,
      });

      console.log(this.state.develop_active);
    }

    if (state == "material") {
      //this.props.type = "material"
      this.setState({
        ...this.state,
        material_active: !this.state.material_active,
        develop_active: false,
      });
    }
  };

  // 모달 종료하기
  modalclose = () => {
    const { Partner } = this.props;

    Partner.filter_dropdown = false;
  };

  render() {
    const { Category, Profile, type } = this.props;

    return (
      <Container>
        <Name>(주)동성실리콘</Name>
        <Description>
          해당 정보를 채울수록 클라이언트에게 '동성 실리콘'(가)이 노출될 확률이
          올라가요!
        </Description>
        <div style={{ width: "100%" }}>
          <SubCategoryBox>
            전문분야
            <SubInnerBox>
              {console.log(toJS(Category.mainbusiness_list))}
              {/* 카테고리 선택 */}
              {Category.mainbusiness_list &&
                Category.mainbusiness_list.map((data, idx) => {
                  return data.business_set.map((sub_data, idx) => {
                    console.log(toJS(sub_data.category));
                    return (
                      <SubCategoryButton
                        onClick={() => {
                          this.buttonClick("business", sub_data.id);
                        }}
                        active={Category.categoryActiveHandler(
                          sub_data.id,
                          "business"
                        )}
                      >
                        <CheckBox
                          active={Category.categoryActiveHandler(
                            sub_data.id,
                            "business"
                          )}
                        >
                          <img src={checkImg} />
                        </CheckBox>
                        <SubCategoryFont>{sub_data.category}</SubCategoryFont>
                      </SubCategoryButton>
                    );
                  });
                })}
            </SubInnerBox>
          </SubCategoryBox>
        </div>

        <div style={{ width: "100%" }}>
          <SubCategoryBox>
            제품분야
            <SubInnerBox>
              {/* 카테고리 선택 */}
              {Category.maincategory_list &&
                Category.maincategory_list.map((data, idx) => {
                  return data.category_set.map((sub_data, idx) => {
                    // console.log(toJS(sub_data.category))
                    return (
                      <SubCategoryButton
                        onClick={() => {
                          this.buttonClick("sub", sub_data.id);
                        }}
                        active={Category.categoryActiveHandler(
                          sub_data.id,
                          "main"
                        )}
                      >
                        <CheckBox
                          active={Category.categoryActiveHandler(
                            sub_data.id,
                            "main"
                          )}
                        >
                          <img src={checkImg} />
                        </CheckBox>
                        <SubCategoryFont>{sub_data.category}</SubCategoryFont>
                      </SubCategoryButton>
                    );
                  });
                })}
            </SubInnerBox>
          </SubCategoryBox>
        </div>

        <div style={{ width: "100%" }}>
          <SubCategoryBox>
            취급소재
            <SubInnerBox>
              {/* 카테고리 선택 */}
              {Category.mainmaterial_list &&
                Category.mainmaterial_list.map((data, idx) => {
                  return data.material_set.map((sub_data, idx) => {
                    //  console.log(toJS(sub_data.category))
                    return (
                      <SubCategoryButton
                        onClick={() => {
                          this.buttonClick("sub", sub_data.id);
                        }}
                        active={Category.categoryActiveHandler(
                          sub_data.id,
                          "material"
                        )}
                      >
                        <CheckBox
                          active={Category.categoryActiveHandler(
                            sub_data.id,
                            "material"
                          )}
                        >
                          <img src={checkImg} />
                        </CheckBox>
                        <SubCategoryFont>{sub_data.category}</SubCategoryFont>
                      </SubCategoryButton>
                    );
                  });
                })}
            </SubInnerBox>
          </SubCategoryBox>
        </div>

        <div style={{ width: "100%" }}>
          <SubCategoryBox>
            전문공정
            <SubInnerBox>
              {/* 카테고리 선택 */}
              {Category.developbig_list &&
                Category.developbig_list.map((data, idx) => {
                  return data.develop_set.map((sub_data, idx) => {
                    // console.log(toJS(sub_data.category))
                    return (
                      <SubCategoryButton
                        onClick={() => {
                          this.buttonClick("sub", sub_data.id);
                        }}
                        active={Category.categoryActiveHandler(
                          sub_data.id,
                          "develop"
                        )}
                      >
                        <CheckBox
                          active={Category.categoryActiveHandler(
                            sub_data.id,
                            "develop"
                          )}
                        >
                          <img src={checkImg} />
                        </CheckBox>
                        <SubCategoryFont>{sub_data.category}</SubCategoryFont>
                      </SubCategoryButton>
                    );
                  });
                })}
            </SubInnerBox>
          </SubCategoryBox>
        </div>
        <Authentication></Authentication>
        <Explaination info_company={Profile.info_company}></Explaination>
        <Product histories={Profile.histories}></Product>
        <Introduction file={Profile.file}></Introduction>
        <Portfolio Portfolio_set={Profile.Portfolio_set}></Portfolio>
        <Location region={Profile.region}></Location>
      </Container>
    );
  }
}

export default MainContainer;

const Container = styled.div`
  //   border: 3px solid red;
  flex-grow: 5;
  padding-left: 30px;
`;

const Name = styled.div`
  font-size: 26px;
  line-height: 52px;
  letter-spacing: -0.65px;
  color: #282c36;
  font-weight: bold;
  padding-bottom: 24px;
  border-bottom: 1px solid #e1e2e4;
`;

const Description = styled.div`
  font-size: 16px;
  line-height: 34px;
  letter-spacing: -0.4px;
  color: #555963;
  font-weight: normal;
  margin-top: 30px;
  margin-bottom: 20px;
`;

const SubCategoryBox = styled.div`
  height: 80%;
  border-bottom: 1px solid #e1e2e4;
  overflow-y: scroll;

  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 85%;
  }
`;

const SubInnerBox = styled.div`
  padding: 34px 18px;
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 9px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 27px 15px;
  }
`;
const SubCategoryButton = styled.div`
  width: 50%;
  // background: ${(props) => (props.active ? "#ededef" : "none")};
  background: none;
  /* height:30px; */
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 20%;
  padding-right: 20px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 15%;
  }
`;
const SubCategoryFont = styled(Content.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.43;
  letter-spacing: -0.35px;
  text-align: left;
  color: #282c36;
  cursor: pointer;
  word-break: break-word;
}`;

const CheckBox = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid #c6c7cc;
  margin-right: 12px;
  cursor: pointer;
  > img {
    display: ${(props) => (props.active ? "block" : "none")};
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 14px;
    height: 14px;
    min-width: 14px;
    min-height: 14px;
    position: relative;
    > img {
      width: 15px;
      height: 15px;
      position: absolute;
      top: -1px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 16px;
    height: 16px;
    > img {
      width: 17px;
      height: 17px;
    }
  }
`;
