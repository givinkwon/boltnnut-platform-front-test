import React from "react";

import Container from "components/Container";
import Section from "components/Section";

import BannerConatiner from "./Banner";
import ContentConatiner from "./Content";
import InnerBoxComponent from "../CS/Notice/InnerBox";
class NoticeConatiner extends React.Component {
  content1 = () => {
    return <>sdasdknascnkls</>;
  };
  render() {
    return (
      <>
        <BannerConatiner />
        <Section>
          <Container>
            <ContentConatiner />
            <InnerBoxComponent
              entirePadding={24}
              marginTop={30}
              Content={() => {
                return <>hello</>;
              }}
            />
          </Container>
        </Section>
      </>
    );
  }
}

export default NoticeConatiner;
