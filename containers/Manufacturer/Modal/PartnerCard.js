import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { isElementAccessExpression } from "typescript";

const star = "/static/icon/star.svg";

@inject("Partner", "Auth")
@observer
class PartnerCard extends React.Component {
  // constructor (props) {
  //     super(props);
  //     this.hideLoader = this.hideLoader.bind(this);
  // }
  state = {
    width: null,
  };

  componentDidMount = async () => {};
  componentWillUnmount = () => {};

  render() {
    const { data, width, Partner, categoryData, idx } = this.props;

    return (
      <>
        <Card>
          <Number>
            <span>1</span>
          </Number>
          <Logo>
            <div></div>
          </Logo>
          <Content>
            <name>(주) 동성실리콘</name>
            <product>실리콘 고무 생산업체</product>
          </Content>
        </Card>
      </>
    );
  }
}

export default PartnerCard;

const Card = styled.div`
  display: flex;
  height: 113px;
  width: 100%;
  border-bottom: 1px solid #e1e2e4;
  align-items: center;
`;
const Number = styled.div`
  flex-grow: 1;
`;
const Logo = styled.div`
  flex-grow: 1;
  > div {
    width: 65px;
    height: 69px;
    background-color: #c9c9c9;
    border-radius: 3px;
  }
`;
const Content = styled.div`
  flex-grow: 22;
  display: flex;
  flex-direction: column;
  > name {
    font-size: 20px;
    line-height: 34px;
    letter-spacing: -0.5px;
    color: #191919;
    font-weight: bold;
  }
  > product {
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.45px;
    color: #191919;
    font-weight: normal;
  }
`;
