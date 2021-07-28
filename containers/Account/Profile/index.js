import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import MainContainer from "./MainContainer";
import SubContainer from "./SubContainer";

import * as Text from "components/Text";

@inject("Auth", "Answer", "Profile")
@observer
class ProfileContainer extends React.Component {
  async componentDidMount() {
    const { Category, Profile } = this.props;
    console.log("componentdidmount");
    await Profile.checkLogin();
  }
  render() {
    const { width } = this.props;
    return (
      <>
        <Background style={{ marginTop: "80px" }}>
          <Containerv1>
            <Container>
              <SubContainer
                width={width}
                style={{ border: "5px solid green" }}
              />
              <MainContainer width={width} />
            </Container>
          </Containerv1>
        </Background>
      </>
    );
  }
}

export default ProfileContainer;

const Container = styled.div`
  display: flex;
  width: 100%;
`;
