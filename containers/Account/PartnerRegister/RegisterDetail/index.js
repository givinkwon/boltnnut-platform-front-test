import React from "react";
import { inject, observer } from "mobx-react";
import Buttonv1 from "components/Buttonv1";
import Button from "containers/Account/PartnerRegister/Button";
import ButtonBox from "components/ButtonBox";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import styled from "styled-components";
import Router from "next/router";
import PartnerRegisterBanner from "components/PartnerRegisterBanner";
import Category from "./Category";
const pageNameArr = ["Category", "Process", "Material", "Aboutus"];
@inject("Auth")
@observer
class RegisterDetailContainer extends React.Component {
  render() {
    const { Auth } = this.props;
    const { pageName } = this.props;
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
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <PartnerRegisterBanner />
            {Auth.RegisterTypeArray.map((item, idx) => {
              return <>/{item.checked && item.type}</>;
            })}
            <div>고정1</div>
            <div>고정2</div>
            <div>카테고리 {true && <>- 공정</>} - 소재 - 회사소개</div>
            {pageName === "Category" && <Category />}
            {pageName === "Process" && <>Page 2 - Process</>}
            {pageName === "Material" && <>Page 3 - Material</>}
            {pageName === "Aboutus" && <>Page 4 - Aboutus</>}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ButtonBox width={"400px"} style={{ marginTop: 70 }}>
                <Button
                  buttonType="prev"
                  onClick={() => {
                    if (Auth.registerPageIdx > 0) {
                      Auth.registerType === "product" &&
                      Auth.registerPageIdx === 2
                        ? (Auth.registerPageIdx -= 2)
                        : (Auth.registerPageIdx -= 1);

                      Router.push(
                        "/partnerregister/[pagename]",
                        `/partnerregister/${pageNameArr[Auth.registerPageIdx]}`
                      );
                    } else {
                      Router.push(`/partnerregister`);
                    }
                  }}
                >
                  이전으로
                </Button>
                {Auth.nextBtnActivate ? (
                  <Button
                    buttonType="next"
                    onClick={() => {
                      if (Auth.registerPageIdx < 3) {
                        Auth.registerType === "product" &&
                        Auth.registerPageIdx === 0
                          ? (Auth.registerPageIdx += 2)
                          : (Auth.registerPageIdx += 1);

                        Router.push(
                          "/partnerregister/[pagename]",
                          `/partnerregister/${
                            pageNameArr[Auth.registerPageIdx]
                          }`
                        );
                      }
                    }}
                  >
                    다음 단계
                  </Button>
                ) : (
                  <DisabledButton>다음 단계</DisabledButton>
                )}
              </ButtonBox>
            </div>
          </div>
        </Containerv1>
      </Background>
    );
  }
}

export default RegisterDetailContainer;

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
