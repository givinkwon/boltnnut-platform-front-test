import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

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

const arrowRightImg = "/static/images/search/arrow_right.svg";
const checkImg = "/static/images/search/check.svg";
const bluearrow = "static/images/request/bluearrow.svg";

@inject("Auth", "Category", "Partner", "Profile")
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

  render() {
    const { Auth, Category, Profile, type, width } = this.props;

    return (
      <Container>
        <Name>{Profile.company_name}</Name>
        <div style={{display : "flex"}}>
        <Description>
          해당 정보를 채울수록 클라이언트에게 '{Profile.company_name}'(가)이
          노출될 확률이 올라가요!
        </Description>
        <Button>
          저장하기
        </Button>
        </div>
        <SelectedCategoryContainer style={{marginBottom : 10}}>
          {Category.category_selected_tagbox.length > 0 &&
            Category.category_selected_tagbox.map((v, idx) => (
              <SelectedCategoryBox>
                <div style={{ marginLeft: "10px" }}>{v.data}</div>
                <CloseImgBox
                  src="/static/images/xbox.svg"
                  onClick={() =>
                    Category.remove_selected(
                      v.type,
                      idx,
                      "search",
                      v.data
                    )
                  }
                />
              </SelectedCategoryBox>
            ))}
        </SelectedCategoryContainer>
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
        <SubContainerBtn
              style={{
                border: "none",
                color: "#fff",
              }}
              onClick= {() => Profile.save_profile()}
            >
              모든 변경사항 수정하기
        </SubContainerBtn>
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


const SelectedCategoryContainer = styled.div`
  display: inline-flex;
  gap: 15px;
  width: 760px;
  flex-wrap: wrap;
  margin-top: 12px;
  top: 50%;
`;

const SelectedCategoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
  border-radius: 20px;
  width: auto;
  height: 30px;
`;

const CloseImgBox = styled.img`
  width: 12px;
  height: 12px;
  cursor: pointer;
  margin: 0px 10px 0px 10px;
`;


const Button = styled.div`
  margin-left : auto;
  width: 70px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 27px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.45px;
  color: #0933b3;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
    border-radius: 3px;
  }
`;

const SubContainerBtn = styled.button`
  width: 300px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
  border-radius: 24px;
  font-size: 16px;
  font-family: NotoSansCJKkr;
  cursor: pointer;
  background: #0933b3;
  margin-left : auto;
  margin-right : auto;
  :hover {
    background-color: #174aee;
  }
`;