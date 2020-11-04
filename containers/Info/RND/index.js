import React from "react";
import styled, { css } from "styled-components";

import Container from "components/Container";
import * as Text from "components/Text";
import { WHITE, PRIMARY, BLACK } from "static/style";
import Section1Container from "./Section1";
import Section2Container from "./Section2";
import Section3Container from "./Section3";
import Section4Container from "./Section4";

class RNDContainer extends React.Component {
  
  render() {
    return (
      <>
        <Section1Container/>
        {/*<Section2Container/>*/}
        {/*<Section3Container/>*/}
        <Section4Container/>
      </>
    );
  }
}

export default RNDContainer;

