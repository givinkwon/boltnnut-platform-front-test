import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from 'mobx-react'

import Container from "components/Container";
import * as Text from "components/Text";
import { WHITE, PRIMARY, BLACK } from "static/style";
import Section0Container from "./Section0";

import RNDContainer from "./RND";
import DistributionContainer from "./Distribution";

@inject('Request')
@observer
class ProductContainer extends React.Component {
  setTab = (val) => {
    const {Request } = this.props;
    Request.tab = val
  };
  render() {
    const { Request } = this.props;

    return (
      <>
        <Section0Container setTab={this.setTab} />
        {Request.tab === 1 && <DistributionContainer/>}
        {Request.tab === 2 && <RNDContainer/>}
      </>
    );
  }
}

export default ProductContainer;

