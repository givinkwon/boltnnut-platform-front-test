import React from "react";
import styled from "styled-components";
import Router from "next/router";

import Container from "components/Container";
import ButtonComponent from "components/Button";
import * as Text from "components/Text";
import Section1 from "./Section1";
import Section2 from "./Section2";

import { WHITE, PRIMARY } from "static/style";

class ClientConatiner extends React.Component {
  toPay = () => {
    Router.push("/store?tab=2");
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <CustomContainer>
        <Section1 />
      </CustomContainer>
    );
  }
}

export default ClientConatiner;

const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 40px 0px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 15px 20px !important;
  }
`;
