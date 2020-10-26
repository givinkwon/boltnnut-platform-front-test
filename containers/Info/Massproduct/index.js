import React from "react";
import styled, { css } from "styled-components";
import Slider from "react-slick";

import Container from "components/Container";
import * as Text from "components/Text";
import { WHITE, PRIMARY, BLACK } from "static/style";

class TabConatiner extends React.Component {
  // setTab = (val) => {
  //   this.props.setTab(val);
  //   window.history.pushState("", "", `/info?tab=${val}`);
  // };
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }
  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }
  render() {
    const { tab } = this.props;
    return (
      <Container>
        <Tabs asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}>
          {/* <Tab active={tab === 1} onClick={() => this.setTab(1)}> */}
          <Tab active={tab === 1}>
            <Text.FontSize40 fontWeight={500}>제조사 찾기 서비스</Text.FontSize40>
          </Tab>
          <Tab active={tab === 2}>
            <Text.FontSize40 fontWeight={500}>양산/개발 서비스</Text.FontSize40>
          </Tab>
          <Tab active={tab === 3}>
            <Text.FontSize40 fontWeight={500}>견적/수량 도출 서비스</Text.FontSize40>
          </Tab>
        </Tabs>
        <Tabs asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}>
          <Tab>
            <Text.FontSize40>test1</Text.FontSize40>
          </Tab>
          <Tab>
            <Text.FontSize40>qwtwl;dfk!##!@$</Text.FontSize40>
          </Tab>
          <Tab>
            <Text.FontSize40>test3</Text.FontSize40>
          </Tab>

        </Tabs>
      </Container>
    );
  }
}

export default TabConatiner;

const Tabs = styled(Slider)`
  margin-top: 30px;
  display: flex;

  .slick-list {
   width : 100% ; 
  }
  p {
    text-align : center;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    /* height: 180px; */
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    /* height: 200px; */
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    /* height: 230px; */
  }
  @media (min-width: 1300px) {
    /* height: 250px; */
  }
`;

const Tab = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  > p {
    color: #${BLACK};
  }
  padding: 15px 0px;
  ${(props) =>
    props.active &&
    css`
      /* background-color: ${PRIMARY}; */
      > p {
        /* color: ${WHITE}; */
      }
    `}
`;
