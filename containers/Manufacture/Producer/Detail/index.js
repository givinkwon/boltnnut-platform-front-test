import React from "react";

import Container from "components/Container";
import Section from "components/Section";

import BannerConatiner from "../Banner";
import ContentConatiner from "./Content";

class ManufacturerDetailConatiner extends React.Component {
  render() {
    return (
      <>
        {this.props.width &&
          (this.props.width > 767.99 ? (
            <>
              <BannerConatiner />
              <Section>
                <Container>
                  <ContentConatiner width={this.props.width} />
                </Container>
              </Section>
            </>
          ) : (
            <Section>
              <Container>
                <ContentConatiner width={this.props.width} />
              </Container>
            </Section>
          ))}
      </>
    );
  }
}

export default ManufacturerDetailConatiner;
