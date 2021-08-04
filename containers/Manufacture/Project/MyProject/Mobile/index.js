import React from "react";
import styled, { css } from "styled-components";
import * as Content from "components/Content";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";


@inject("Project", "Auth", "Partner", "Cookie")
@observer
class MobileMyProject extends React.Component {

  

  render() {
    const { Auth, Project } = this.props;

    return (
    <>
    </>
    )
  }
}

export default MobileMyProject;
