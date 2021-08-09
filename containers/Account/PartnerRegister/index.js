import React from "react";
import { inject, observer } from "mobx-react";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import Router from "next/router";
import styled, { css } from "styled-components";
import PartnerRegisterBanner from "components/PartnerRegisterBanner";
import Button from "containers/Account/PartnerRegister/Button";

const signupBoxImg = "/static/images/SignupBox.png";
const registerMain1 = "/static/icon/registerMain1.svg";
const registerMain2 = "/static/icon/registerMain2.svg";
const registerMain3 = "/static/icon/registerMain3.svg";

@inject("Auth", "Category")
@observer
class PartnerRegisterContainer extends React.Component {
  componentDidMount() {
    this.props.Category.init();
  }
  render() {
    const { Auth } = this.props;
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
          <Category>
            <PartnerRegisterBanner />
            {Auth.RegisterTypeArray.map((item, idx) => {
              return (
                <CategoryItem
                  onClick={() => {
                    // Router.push(
                    //   "/partnerregister/[pagename]",
                    //   "/partnerregister/Category"
                    // );
                    // Auth.registerType = item.type;
                    item.checked = !item.checked;
                    Auth.isChecked();
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
          </Category>

          {Auth.nextBtnActive ? (
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
            <DisabledButton>다음 단계</DisabledButton>
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

const Category = styled.div`
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
  border: solid 1px #c6c7cc;
`;
