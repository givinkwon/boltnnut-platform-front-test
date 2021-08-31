import React from "react";
import { inject, observer } from "mobx-react";

import Button from "containers/Account/PartnerRegister/Button";
import ButtonBox from "components/ButtonBox";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import styled from "styled-components";
import Router from "next/router";
import PartnerRegisterBanner from "components/PartnerRegisterBanner";
import CategoryContainer from "./Category";
import ProcessContainer from "./Process";
import MaterialContainer from "./Material";
import AboutUsContainer from "./AboutUs";
import CompleteContainer from "./Complete";

import Stepper from "react-stepper-enhanced";
import Auth from "stores/Account/Auth";
const perfection = "/static/icon/camera.png";

const pageNameArr = ["Category", "Process", "Material", "Aboutus", "Complete"];
// error 변수
let error = 0;
@inject("Auth", "Category")
@observer
class RegisterDetailContainer extends React.Component {
  // pageState 설정하기
  set_page_state = (pageName) => {
    const { Auth } = this.props;

    if (pageName === "Category") {
      Auth.pageState = 0;
      console.log(pageName);
      console.log(Auth.pageState);
    }

    if (pageName === "Process") {
      Auth.pageState = 1;
      console.log(pageName);
      console.log(Auth.pageState);
    }

    if (pageName === "Material") {
      Auth.pageState = 2;
      console.log(pageName);
      console.log(Auth.pageState);
    }

    if (pageName === "Aboutus") {
      Auth.pageState = 3;
      console.log(pageName);
      console.log(Auth.pageState);
    }
  };

  // 미선택 시 스크롤 올리고 에러 표시
  ScrollTop = () => {
    const { Auth } = this.props;
    Auth.error_register = 1;
    window.scrollTo(0, 0);
  };

  render() {
    const { Auth, Category } = this.props;
    const { pageName, error } = this.props;

    return (
      <>
        {pageName === "Complete" ? (
          <CompleteContainer />
        ) : (
          <Background>
            <Containerv1
              style={{
                width: "792px",
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
                <StepperContainer>
                  <Stepper
                    activeColor={"#C6C7CC"}
                    defaultColor={"#f6f6f6"}
                    completeColor={"#0933b3"}
                    defaultTitleColor={"#C6C7CC"}
                    completeTitleColor={"#0933b3"}
                    activeTitleColor={"#0933b3"}
                    circleFontSize={14}
                    circleFontColor={"#ffffff"}
                    // 테두리 색
                    defaultBorderColor={"#e1e2e4"}
                    defaultBorderStyle={"solid"}
                    activeBorderColor={"#0933b3"}
                    activeBorderStyle={"solid"}
                    completeBorderColor={"#0933b3"}
                    completeBorderStyle={"solid"}
                    // bar 색
                    defaultBarColor={"#e1e2e4"}
                    completeBarColor={"#0933b3"}
                    activeStep={Auth.pageState}
                    // title
                    steps={[
                      { title: "카테고리" },
                      { title: "공정" },
                      { title: "소재" },
                      { title: "회사소개" },
                    ]}
                  />
                </StepperContainer>
                {pageName === "Category" && <CategoryContainer />}
                {pageName === "Process" && <ProcessContainer />}
                {pageName === "Material" && <MaterialContainer />}
                {pageName === "Aboutus" && <AboutUsContainer />}

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ButtonBox
                    width={"400px"}
                    style={{ marginTop: 50, marginBottom: 290 }}
                  >
                    <Button
                      buttonType="prev"
                      onClick={() => {
                        if (Auth.registerPageIdx > 0) {
                          Auth.registerType === "product" &&
                          Auth.registerPageIdx === 2
                            ? (Auth.registerPageIdx -= 2)
                            : (Auth.registerPageIdx -= 1);

                          // stepper 설정을 위한 함수
                          // this.set_page_state(pageName);
                          Auth.pageState = Auth.pageState - 1;
                          Router.push(
                            "/partnerregister/[pagename]",
                            `/partnerregister/${
                              pageNameArr[Auth.registerPageIdx]
                            }`
                          );
                          window.scrollTo(0, 0);
                        } else {
                          Router.push(`/partnerregister`);
                        }
                      }}
                    >
                      이전으로
                    </Button>

                    {Category.nextBtnActive ? (
                      <Button
                        buttonType="next"
                        onClick={async () => {
                          await Auth.checkLogin();
                          console.log(Auth.logged_in_partner);
                          console.log(Auth.registerPageIdx);

                          if (Auth.registerPageIdx <= 3) {
                            Auth.registerType === "product" &&
                            Auth.registerPageIdx === 0
                              ? (Auth.registerPageIdx += 2)
                              : (Auth.registerPageIdx += 1);
                            await Category.save_selected(
                              pageName,
                              Auth.logged_in_partner.id
                            );

                            // 라우팅
                            Router.push(
                              "/partnerregister/[pagename]",
                              `/partnerregister/${
                                pageNameArr[Auth.registerPageIdx]
                              }`
                            );
                            // stepper 설정을 위한 함수
                            this.set_page_state(
                              pageNameArr[Auth.registerPageIdx]
                            );
                          }
                          window.scrollTo(0, 0);
                        }}
                      >
                        다음 단계
                      </Button>
                    ) : (
                      <DisabledButton onClick={() => this.ScrollTop()}>
                        다음 단계
                      </DisabledButton>
                    )}
                  </ButtonBox>
                </div>
              </div>
            </Containerv1>
          </Background>
        )}
      </>
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

const StepperContainer = styled.div`
  width: 420px;
  margin-bottom: 48px;
  font-weight: bold !important;
`;
