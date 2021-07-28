import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import * as Content from "./Content";

@inject("Common")
@observer
class KSLink extends React.Component {
  render() {
    return (
      <>
        <a href={this.props.Common.makeUrl(this.props.url)}>
          {this.props.content}
          <Logo src={this.props.logoImg} />
          <Image src={this.props.Image} />
        </a>
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
