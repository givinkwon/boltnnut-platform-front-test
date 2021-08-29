import React from "react";
import styled from "styled-components";


import Background from "components/Background";

import { inject, observer } from "mobx-react";
import * as ChatAPI from "axios/Manufacture/Chat"; 

@inject("Auth", "Project")
@observer
class ChattingContent extends React.Component {
    
  render() {
    const { Auth, Project } = this.props;

    return (
      <Background
      
        backgroundColor={"#ffffff"}
        style={{height: 1016, width: 840, marginRight: "auto"}}
      >
        <ContentTitle>
        </ContentTitle>

        <ContentBody>
        </ContentBody>

      
      </Background>
    );
  }
}

export default ChattingContent;

const ContentTitle = styled.div`
  width : 100%;
  height: 63px;
  border: solid 1px #e1e2e4;

`;

const ContentBody = styled.div`

`;