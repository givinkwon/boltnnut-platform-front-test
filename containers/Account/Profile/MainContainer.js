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
  modalHandler = () => {
    if (this.state.modalOn) {
      this.setState({ modalOn: false });
      console.log(this.state.modalOn);
    } else {
      this.setState({ modalOn: true });
      console.log(this.state.modalOn);
    }
  };

  async componentDidMount() {
    const { Category, Profile } = this.props;
    // await Profile.checkLogin();
    console.log(toJS(Profile.info_company));
    console.log(toJS(Profile.portfolio_set));

    //   await Category.init();
    //   console.log(Category.business_list);
    //   var mainCategoryTypeDic = {};
    //   var subCategoryTypeDic = {};
    //   mainCategoryTypeDic["business"] = Category.mainbusiness_list;
    //   mainCategoryTypeDic["category"] = Category.maincategory_list;
    //   mainCategoryTypeDic["city"] = Category.city_list;
    //   mainCategoryTypeDic["material"] = Category.mainmaterial_list;
    //   mainCategoryTypeDic["develop"] = Category.developbig_list;
    //   // 파트너 데이터 가져오기
    //
    //   // console.log(Category.mainbusiness_list);
    //   this.setState({ mainCategoryTypeDic: mainCategoryTypeDic });
    //   console.log(this.state.mainCategoryTypeDic);
    // }
    // state = {
    //   mainSelectIdx: 0,
    //   subSelectIdx: 0,
    //   mainCategoryTypeDic: {},
    //   // 공정 대분류
    //   develop_active: false,
    //   // 소재 대분류
    //   material_active: false,
    // };
    // activeHandler = (type, idx) => {
    //   const { Category } = this.props;
    //   if (type === "main") {
    //     if (idx === this.state.mainSelectIdx) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } else {
    //     if (Category.category_selected.includes(idx)) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   }
  }

  // buttonClick = (type, idx) => {
  //   const { Category } = this.props;

  //   if (Category.categoryActiveHandler(idx, type)) {
  //     console.log("remove selected");
  //     console.log(type, idx);
  //     Category.remove_selected(type, idx);
  //   } else {
  //     console.log("add selected");
  //     console.log(type, idx);
  //     Category.add_selected(type, idx);
  //   }
  // };

  // 모달 종료하기
  // modalclose = () => {
  //   const { Partner } = this.props;

  //   Partner.filter_dropdown = false;
  // };

  render() {
    const { Category, Profile, type, width } = this.props;
    const type1 = "business";
    return (
      <Container>
        <Name>{Profile.company_name}</Name>
        <Description>
          해당 정보를 채울수록 클라이언트에게 '{Profile.company_name}'(가)이
          노출될 확률이 올라가요!
        </Description>
        <div style={{ width: "100%" }}>
          <SelectCard
            name="전문분야"
            id="1"
            type="category"
            image="/static/images/signup/medal.svg"
          />
          <SelectCard
            name="제품분야"
            id="2"
            type="business"
            image="/static/images/signup/product.svg"
          />
          <SelectCard
            name="취급소재"
            id="3"
            type="material"
            image="/static/images/signup/handle.svg"
          />
          <SelectCard
            name="전문공정"
            id="4"
            type="develop"
            image="/static/images/signup/process.svg"
          />
        </div>

        <Authentication></Authentication>
        <Explaination info_company={Profile.info_company}></Explaination>
        <Product histories={Profile.histories}></Product>
        <Introduction file={Profile.file}></Introduction>
        <Portfolio Portfolio_set={Profile.portfolio_set}></Portfolio>
        <Location region={Profile.region} width={width}></Location>
      </Container>
    );
  }
}

export default MainContainer;

const Container = styled.div`
  width: 100%;
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

const MainCategoryBox = styled.div`
  height: 100%;
  width: 26.6%;
  border-right: 1px solid #e1e2e4;
  // overflow-y: scroll;
`;

const MainCategoryButton = styled.div`
  background: ${(props) => (props.active ? "#ededef" : "none")};
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 12px 20px;
  box-sizing: border-box;
  > img {
    display: ${(props) => (props.active ? "block" : "none")};
  }
  > p {
    color: ${(props) => props.active && "#0933b3"};
  }
  cursor: pointer;

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 3px;
    > img {
      width: 12px;
      height: 12px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 6px 6px 6px 9px;
    > img {
      width: 14px;
      height: 14px;
    }
  }
`;

const MainCategoryFont = styled(Content.FontSize15)`
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "normal")};
  font-stretch: normal;
  font-style: normal;
  line-height: 2.27;
  letter-spacing: -0.38px;
  text-align: left;
  color: ${(props) => (props.color ? props.color : "#282c36")};
  word-break: break-word;
}



  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 11px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 13px;
  }
`;
