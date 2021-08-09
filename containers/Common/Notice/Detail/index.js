import React from "react";

import Container from "components/Container";
import Section from "components/Section";

import BannerConatiner from "../Banner";
import ContentConatiner from "./Content";
import { inject, observer } from "mobx-react";
@inject("Auth")
@observer
class NoticeDetailConatiner extends React.Component {
  render() {
    return (
      <>
        <BannerConatiner />
        <Section>
          <Container>
            {this.props.Auth.registerType}
            <ContentConatiner />
          </Container>
        </Section>
      </>
    );
  }
}

export default NoticeDetailConatiner;
