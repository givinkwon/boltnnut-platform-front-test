import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import Router from "next/router";

@inject("Common", "Project", "Auth", "Signup")
@observer
class KSLink extends React.Component {
  render() {
    const { FontContent, step_index, Project, Auth, Signup } = this.props;

    return (
      <>
        <Container
          onClick={() => {
            Project.set_step_index(step_index);
            Router.push(`/${this.props.url}`);
          }}
        >
          {FontContent && <FontContent />}
          {this.props.content}
          <Logo style={{height : 24}} src={this.props.logoImg} />
          <img src={this.props.Image} />
        </Container>
      </>
    );
  }
}

export default KSLink;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Logo = styled.img`
  cursor: pointer;
  width: auto;
  height: auto;
`;
