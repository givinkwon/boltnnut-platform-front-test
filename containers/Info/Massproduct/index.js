import React from "react";
import styled, { css } from "styled-components";

import Container from "components/Container";
import * as Text from "components/Text";
import { WHITE, PRIMARY, BLACK } from "static/style";
import Section1Container from "./Section1";
import Section2Container from "./Section2";
import Section3Container from "./Section3";

class MassproductContainer extends React.Component {
  
  render() {
    return (
      <>
        <Section1Container/>
        <Section2Container/>
        <Section3Container/>
      </>
    );
  }
}

export default MassproductContainer;

