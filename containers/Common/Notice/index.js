import React from "react";

import Container from "components/Container";
import Section from "components/Section";

import BannerConatiner from "./Banner";
import ContentConatiner from "./Content";
import * as PartnerAPI from "axios/Manufacture/Partner";
import KSLink from "components/KSLink";
import { inject, observer } from "mobx-react";
import InnerBoxComponent from "components/InnerBox";

@inject("Auth")
@observer
class NoticeConatiner extends React.Component {
  state = {
    companyName: null,
  };

  componentDidMount() {
    const req = { params: null };

    PartnerAPI.search(req)
      .then((res) => {
        this.setState({ companyName: res.data.results });
      })
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <>
        <BannerConatiner />
        <Section>
          <Container>
            <ContentConatiner />

            <InnerBoxComponent
              outerStyles={{
                marginTop: 30,
                border: "1px solid black",
                padding: 20,
              }}
              Content={() => {
                return <>{this.props.Auth.registerType}</>;
              }}
            />
          </Container>
        </Section>
      </>
    );
  }
}

export default NoticeConatiner;
