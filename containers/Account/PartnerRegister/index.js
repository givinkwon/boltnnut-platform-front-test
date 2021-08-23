import React from "react";
import { inject, observer } from "mobx-react";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import Router from "next/router";
import styled, { css } from "styled-components";
import PartnerRegisterBanner from "components/PartnerRegisterBanner";
import Button from "containers/Account/PartnerRegister/Button";

@inject("Auth", "Category")
@observer
class PartnerRegisterContainer extends React.Component {
  componentDidMount() {
    const { Category } = this.props;
    Category.reset();
    Category.init();
    Category.isChecked("main");
  }
  render() {
    const { Auth, Category } = this.props;
    return (
      <Background>
        <Containerv1
          style={{
            flexDirection: "column",
            width: "792px",
            marginTop: 10,
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <CategoryBox>
            <PartnerRegisterBanner />
            {Category.RegisterTypeArray.map((item, idx) => {
              return (
                <CategoryItem
                  active={item.checked}
                  onClick={() => {
                    // Router.push(
                    //   "/partnerregister/[pagename]",
                    //   "/partnerregister/Category"
                    // );
                    // Auth.registerType = item.type;
                    item.checked = !item.checked;
                    Category.isChecked("main");
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={item.img} />
                    {item.content}
                  </div>
                  <input type="checkbox" checked={item.checked} />
                </CategoryItem>
              );
            })}
          </CategoryBox>

          {Category.nextBtnActive ? (
            <Button
              buttonType="next"
              onClick={() => {
                Router.push(
                  "/partnerregister/[pagename]",
                  "/partnerregister/Category"
                );
              }}
            >
              다음 단계
            </Button>
          ) : (
            <DisabledButton

            >
              다음 단계</DisabledButton>
          )}
        </Containerv1>
      </Background>
    );
  }
}

export default PartnerRegisterContainer;

// 버튼 비활성화 시
const DisabledButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 181px;
  object-fit: contain;
  border-radius: 24px;
  background-color: #e1e2e4;
  /* 버튼 폰트 */
  color: #a4aab4;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  padding-top: 11px;
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  text-align: center;
`;

const CategoryBox = styled.div`
  width: 100%;
`;

const CategoryItem = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  justify-content: space-between;
  padding: 40px 52px 40px 102px;
  object-fit: contain;
  border-radius: 10px;
  border: ${(props) =>
    props.active ? "solid 2px #0933b3" : "solid 2px #c6c7cc;"};
`;
