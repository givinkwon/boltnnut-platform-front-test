import React, {Component} from "react";
import styled from 'styled-components';
import {inject, observer} from "mobx-react";
import Router from 'next/router';

import Container from "../../../components/Container";
import * as Text from 'components/Text';

import PartnerCard from "./PartnerCard";

import {PRIMARY} from "static/style";

@inject('Request')
@observer
class CompleteContainer extends Component {
  componentDidMount() {
    setTimeout(() => {
      Router.push('/answer');
    }, 10000);
  }

  render() {
    const {Request} = this.props;
    const {partners, partners_next} = Request

    return (
      <>
        <MessageBox>
          <Text.FontSize24 color="white" fontWeight={700}>
            { Request.search_mode === 'match' ? '해당 의뢰에 적합한 제조사 리스트 입니다' : '높은 평가를 받고 있는 제조사입니다' }
          </Text.FontSize24>
        </MessageBox>
        <Container>
          {
            partners.map(partner => {
              return (
                <PartnerCard partner={partner} />
              )
            })
          }
        </Container>
      </>
    )
  }
}

export default CompleteContainer;

const MessageBox = styled.div`
  background-color: ${PRIMARY};
  padding: 18px 0;
  > p {
    text-align: center;
  }
`
