import React from "react";
import { inject, observer } from "mobx-react";
import Buttonv1 from "components/Buttonv1";
import Button from "components/Button";
import ButtonBox from "components/ButtonBox";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";

import Router from "next/router";

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
            {Auth.registerType}
            <div>고정1</div>
            <div>고정2</div>
            <div>
              카테고리 {Auth.registerType != "product" && <>- 공정</>} - 소재 -
              회사소개
            </div>
            {pageName === "Category" && <Category />}
            {pageName === "Process" && <>Page 2 - Process</>}
            {pageName === "Material" && <>Page 3 - Material</>}
            {pageName === "Aboutus" && <>Page 4 - Aboutus</>}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ButtonBox width={"500px"}>
                <Button
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
                <Button
                  onClick={() => {
                    if (Auth.registerPageIdx < 3) {
                      Auth.registerType === "product" &&
                      Auth.registerPageIdx === 0
                        ? (Auth.registerPageIdx += 2)
                        : (Auth.registerPageIdx += 1);

                      Router.push(
                        "/partnerregister/[pagename]",
                        `/partnerregister/${pageNameArr[Auth.registerPageIdx]}`
                      );
                    }
                  }}
                >
                  다음단계
                </Button>
              </ButtonBox>
            </div>
          </div>
        </Containerv1>
      </Background>
    );
  }
}

export default RegisterDetailContainer;
