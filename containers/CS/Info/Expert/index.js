import React from "react";
import styled from "styled-components";
import Router from "next/router";

import Container from "components/Container";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import ButtonComponent from "components/Button";

import * as Text from "components/Text";
import { WHITE, PRIMARY } from "static/style";

class ClientConatiner extends React.Component {
  toPay = () => {
    Router.push("/static/manual/partner_manual.pdf");
    window.scrollTo(0, 0);
  };
  state = {
    width: 0,
    tab: 0,
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    return (
      <CustomContainer>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <ButtonComponent
          style={{ marginTop: 30, width: "20%" }}
          backgroundColor={PRIMARY}
          borderColor={PRIMARY}
          borderRadius={50}
          onClick={this.toPay}
        >
          <Text.FontSize24 color={WHITE} fontWeight={500}>
            {width < 992 ? "메뉴얼 보기" : "파트너 메뉴얼 보기"}
          </Text.FontSize24>
        </ButtonComponent>
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
