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
// import the progress bar
import StepProgressBar from "react-step-progress";
// import the stylesheet
import "react-step-progress/dist/index.css";
import Stepper from "react-stepper-enhanced";
const perfection = "/static/icon/camera.png";
const pageNameArr = ["Category", "Process", "Material", "Aboutus"];
@inject("Auth", "Category")
@observer
class RegisterDetailContainer extends React.Component {
  render() {
    const { Auth, Category } = this.props;

    const { pageName } = this.props;
    const step1Content = <h1>Step 1 Content</h1>;
    const step2Content = <h1>Step 2 Content</h1>;
    const step3Content = <h1>Step 3 Content</h1>;
    function step2Validator() {
      // return a boolean
    }

    function step3Validator() {
      // return a boolean
    }
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
            <div>카테고리 {true && <>- 공정</>} - 소재 - 회사소개</div>
            <Stepper
              // activeBorderColor={"solid 10px blue"}
              // activeColor={"red"}
              steps={[
                { title: "Step One", icon: perfection },
                { title: "Step Two" },
                { title: "Step Three" },
                { title: "Step Four" },
              ]}
              // activeStep={1}

              // barStyle={"dashed"}
            />
            {/* <StepProgressBar
              startingStep={0}
              steps={[
                {
                  label: "Step 1",
                  name: "step 1",
                  content: step1Content,
                },
                {
                  label: "Step 2",
                  name: "step 2",
                  content: step2Content,
                  validator: step2Validator,
                },
                {
                  label: "Step 3",
                  name: "step 3",
                  content: step3Content,
                  validator: step3Validator,
                },
              ]}
            /> */}
            {pageName === "Category" && <CategoryContainer />}
            {pageName === "Process" && <ProcessContainer />}
            {pageName === "Material" && <MaterialContainer />}
            {pageName === "Aboutus" && <AboutUsContainer />}
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
                {Category.nextBtnActive ? (
                  <Button
                    buttonType="next"
                    onClick={async () => {
                      await Auth.checkLogin();
                      console.log(Auth.logged_in_partner);
                      if (Auth.registerPageIdx < 3) {
                        Auth.registerType === "product" &&
                        Auth.registerPageIdx === 0
                          ? (Auth.registerPageIdx += 2)
                          : (Auth.registerPageIdx += 1);
                        Category.save_selected(
                          pageName,
                          Auth.logged_in_partner.id
                        );
                        // switch (pageName) {
                        //   case "Category":
                        //     break;
                        // }
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
