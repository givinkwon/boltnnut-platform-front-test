import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import * as Content from "./Content";

@inject("Common")
@observer
class KSLink extends React.Component {
  componentDidMount() {
    console.log(this.props.content);
  }
  render() {
    return (
      <>
        <a href={this.props.Common.makeUrl(this.props.url)}>
          {this.props.content}
          <Logo src={this.props.logoImg} />
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
