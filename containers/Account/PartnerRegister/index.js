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
                    item.checked = !item.checked;
                    Category.isChecked("main");
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img style={{ marginRight: "32px" }} src={item.img} />
                    <span>{item.content}</span>
                  </div>
                  <input
                    style={{ width: "18px", height: "18px" }}
                    type="checkbox"
                    checked={item.checked}
                  />
                </CategoryItem>
              );
            })}
          </CategoryBox>

          {Category.nextBtnActive ? (
            <ButtonRegister
              buttonType="next"
              onClick={() => {
                Router.push(
                  "/partnerregister/[pagename]",
                  "/partnerregister/Category"
                );
                window.scrollTo(0, 0);
              }}
            >
              다음 단계
            </ButtonRegister>
          ) : (
            <DisabledButton
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              다음 단계
            </DisabledButton>
          )}
        </Containerv1>
      </Background>
    );
  }
}

export default PartnerRegisterContainer;

const ButtonRegister = styled(Button)`
  margin-bottom: 290px;
  padding: 0px;
  margin-top: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 181px;
  height: 48px;
  object-fit: contain;
  border-radius: 24px;
  background-color: #0933b3;
  /* 버튼 폰트 */
  color: #fff;
  object-fit: contain;
  font-family: NotoSansCJKkr !important;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  text-align: center;
`;

// 버튼 비활성화 시
const DisabledButton = styled.div`
  margin-bottom: 290px;
  margin-top: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 181px;
  height: 48px;
  object-fit: contain;
  border-radius: 24px;
  background-color: #e1e2e4;
  /* 버튼 폰트 */
  color: #a4aab4;
  object-fit: contain;
  font-family: NotoSansCJKkr !important;
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
  margin-bottom: 24px;
  align-items: center;
  justify-content: space-between;
  padding: 40px 52px 40px 102px;
  font-weight: 700;
  object-fit: contain;
  border-radius: 10px;
  border: ${(props) =>
    props.active ? "solid 2px #0933b3" : "solid 2px #c6c7cc;"};
  font-size: 18px;
`;
