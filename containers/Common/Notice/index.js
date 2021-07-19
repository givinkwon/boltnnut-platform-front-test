import React from "react";

import Container from "components/Container";
import Section from "components/Section";

import BannerConatiner from "./Banner";
import ContentConatiner from "./Content";
import * as PartnerAPI from "axios/Partner";
import KSLink from "components/KSLink";
import { inject, observer } from "mobx-react";

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
    const { Grstore, Common } = this.props;
    return (
      <>
        <BannerConatiner />
        <Section>
          <Container>
            <ContentConatiner />
            {/* {this.state.companyName} */}
            <KSLink title={"오규asdasdasd석"} />
            {this.state.companyName != null &&
              this.state.companyName.map((item) => {
                return <>{/* <div>{item.name}</div> */}</>;
              })}
          </Container>
        </Section>
      </>
    );
  }
}

export default NoticeConatiner;
