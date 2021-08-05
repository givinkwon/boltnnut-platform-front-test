import React from "react";
import { inject, observer } from "mobx-react";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import Router from "next/router";
import styled, { css } from "styled-components";
const signupBoxImg = "/static/images/SignupBox.png";

const RegisterType = [
  {
    img: signupBoxImg,
    content: "부품/완제품 판매",
    type: "product",
  },
  {
    img: signupBoxImg,
    content: "개발/설계",
    type: "development",
  },
  {
    img: signupBoxImg,
    content: "제작",
    type: "manufacture",
  },
];
@inject("Auth")
@observer
class PartnerRegisterContainer extends React.Component {
  render() {
    const { Auth } = this.props;
    return (
      <Background>
        <Containerv1
          style={{
            width: "792px",
            marginTop: 10,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Category>
            {RegisterType.map((item, idx) => {
              return (
                <CategoryItem
                  onClick={() => {
                    Router.push(
                      "/partnerregister/[pagename]",
                      "/partnerregister/Category"
                    );
                    Auth.registerType = item.type;
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={item.img} />
                    {item.content}
                  </div>
                  <input type="checkbox" />
                </CategoryItem>
              );
            })}
          </Category>
        </Containerv1>
      </Background>
    );
  }
}

export default PartnerRegisterContainer;

const Category = styled.div`
  width: 100%;
`;

const CategoryItem = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
`;
