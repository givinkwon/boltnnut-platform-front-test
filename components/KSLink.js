import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import * as Content from "./Content";
import Router from "next/router";
@inject("Common")
@observer
class KSLink extends React.Component {
  render() {
    const { FontContent } = this.props;
    return (
      <>
        {/* <a href={this.props.Common.makeUrl(this.props.url)}> */}
        <div
          onClick={() => {
            Router.push(`/${this.props.url}`);
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          {/* <Tttt></Tttt> */}

          {FontContent && <FontContent />}
          {this.props.content}
          <Logo src={this.props.logoImg} />
          <Image src={this.props.Image} />
        </div>

        {/* </a> */}
      </>
    );
  }
}

export default KSLink;

const Logo = styled.img`
  cursor: pointer;
  width: auto;
  height: auto;
`;

const Image = styled.img``;
