import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import { inject, observer } from "mobx-react";
import MobileContent1 from "./MobileContent1";
import MoileContent2 from "./MobileContent2";

//import BannerContainer from './Banner';

@inject("Project")
@observer
class MobileProjectDetailContainer extends React.Component {
  componentWillUnmount() {
    console.log("bbbbbbbbbbbbbb");
    const { Project } = this.props;
    Project.newIndex = 0;
  }
  render() {
    const { user } = this.props;

    return (
      <>
        <Background
          style={{
            display: "inline-flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "start",
            marginTop: 15,
          }}
        >
          <Containerv1 style = {{justifyContent: "center"}}>
              <MobileContent1 user={user} />
          </Containerv1>
        </Background>

        {/* <Content3 /> */}
      </>
    );
  }
}

export default MobileProjectDetailContainer;

const Container13 = styled.div`
  width: 996px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
