import React from "react";

import Container from "components/Container";
import Section from "components/Section";

import BannerConatiner from "./Banner";
//import ContentConatiner from './Content'
import ContentConatiner from "./Content2";

//import MobileContentContainer from './MobileMagazine';
import MobileContentContainer from "./MobileMagazine2";

class MagazineConatiner extends React.Component {
  render() {
    return (
      <div style={{ overflow: "hidden" }}>
        {console.log(this.props.width)}
        {this.props.width && this.props.width > 767.99 && <BannerConatiner />}

        {this.props.width &&
          (this.props.width > 767.99 || this.props.width < 1 ? (
            <Section style={{ padding: 0 }}>
              <Container style={{ padding: 0 }}>
                <ContentConatiner style={{ padding: 0 }} />
              </Container>
            </Section>
          ) : (
            <MobileContentContainer length={this.props.length} />
          ))}
      </div>
    );
  }
}

export default MagazineConatiner;
