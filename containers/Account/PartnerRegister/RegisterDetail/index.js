import React from "react";
import { inject, observer } from "mobx-react";

import First from "./First";
@inject("Auth")
@observer
class RegisterDetailContainer extends React.Component {
  render() {
    const { Auth } = this.props;
    const { pageName } = this.props;
    return (
      <>
        {Auth.registerType}
        <div>고정1</div>
        <div>고정2</div>
        <div>
          카테고리 {Auth.registerType === "product" && <>- 공정</>} - 소재 -
          회사소개
        </div>
        {pageName === "Category" && <>Category</>}
        {pageName === "Process" && <>Process</>}
        {pageName === "Material" && <>Material</>}
        {pageName === "Aboutus" && <>Aboutus</>}
      </>
    );
  }
}

export default RegisterDetailContainer;
