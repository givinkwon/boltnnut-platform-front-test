import React from "react";
import Lottie from "react-lottie";
import styled from "styled-components";

import spinnerDataWhite from "static/button_spinner_white.json";
import spinnerDataPrimary from "static/button_spinner_primary.json";

export default class ButtonSpinner extends React.Component {
  render() {
    const { primary, scale, ...props } = this.props;
    const whiteOptions = {
      loop: true,
      autoplay: true,
      animationData: spinnerDataWhite,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    const primaryOptions = {
      loop: true,
      autoplay: true,
      animationData: spinnerDataPrimary,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    return (
      <Spinner scale={scale} {...props}>
        <Lottie options={primary ? primaryOptions : whiteOptions} />
      </Spinner>
    );
  }
}

const Spinner = styled.div`
  width: ${(props) => (props.scale ? props.scale : `80%`)};
  height: ${(props) => (props.scale ? props.scale : `80%`)};
  margin: auto;
`;
