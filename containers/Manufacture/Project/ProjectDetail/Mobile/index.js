import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import { inject, observer } from "mobx-react";
import Content1 from "./Content1";

import ContentSub from "./ContentSub";


@inject("Project")
@observer
class ProjectDetail extends React.Component {
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
            </Container13>
            <ContentSub user={user} />
          </Containerv1>
        </Background>
      </>
    );
  }
}

export default ProjectDetail;

const Container13 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;