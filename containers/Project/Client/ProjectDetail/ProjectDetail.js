import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import { inject, observer } from "mobx-react";
import Content1 from "./Content1";
import Content2 from "./Content2";
import ContentSub from "./ContentSub";
import Content3 from "./Content3";
import Content4 from "./Content4";
//import BannerContainer from './Banner';

@inject("Project")
@observer
class ProjectDetailContainer extends React.Component {
  componentWillUnmount() {
    console.log("bbbbbbbbbbbbbb");
    const { Project } = this.props;
    // Project.newIndex = 0;
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
            marginTop: 50,
          }}
        >
          <Containerv1>
            <Container13>
              <Content1 user={user} />
              {/* <Content2 /> */}
              {/* <Content4 /> */}
            </Container13>
            <ContentSub user={user} />
          </Containerv1>
        </Background>

        {/* <Content3 /> */}
      </>
    );
  }
}

export default ProjectDetailContainer;

const Container13 = styled.div`
  width: 996px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
