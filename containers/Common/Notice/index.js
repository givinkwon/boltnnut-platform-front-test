import React from "react";

import Container from "components/Container";
import Section from "components/Section";

import BannerConatiner from "./Banner";
import ContentConatiner from "./Content";
import * as PartnerAPI from "axios/Partner";
import KSLink from "components/KSLink";
import { inject, observer } from "mobx-react";
import InnerBoxComponent from "./InnerBox";

class NoticeConatiner extends React.Component {
  state = {
    companyName: null,
    // input: "",
  };
  componentDidMount() {
    const req = { params: null };

    PartnerAPI.search(req)
      .then((res) => {
        console.log(res);
        console.log(res.data.results[0].name);
        this.setState({ companyName: res.data.results });
        // res.data.results.forEach((element) => {
        //   console.log(element.name);
        // });

        // for (let i = 0; i < res.data.results.length; i++) {
        //   console.log(res.data.results[i].name);
        // }
        // this.setState({ companyName: res.data.results });
      })
      .catch((e) => console.log(e));
  }

  // inputText = (e) => {
  //   this.setState({
  //     input: e.target.value,
  //   });
  // };

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
                return <>hello</>;
              }}
            />
            {/* {this.state.companyName} */}
          </Container>
        </Section>
      </>
    );
  }
}

export default NoticeConatiner;
