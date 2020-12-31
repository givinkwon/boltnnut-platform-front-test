import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import 'intersection-observer'; // polyfill
import Observer from "@researchgate/react-intersection-observer";

class RequestCardContainer extends Component {
    render() {
        return()
    }
}

export default withRouter(RequestCardContainer);


const Card = styled.div`
  cursor: pointer;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  width: 100%;
  :hover {
    box-shadow: 0 0 6px 0 ${PRIMARY}55;
  }
  pointer-events: none;
  cursor: default;
`
