import React from 'react'
import styled, {css} from 'styled-components'
import Router from 'next/router'
import Slider from "react-slick";
import { inject, observer } from 'mobx-react'

import Container from 'components/Containerv1';
import Background from 'components/Background';
import ProposalCard from 'components/ProposalCard';

class AnswerContentContainer extends React.Component {
  render() {
    return(
      <>
        <Background>
          <Container>
            <ProposalCard />
          </Container>
        </Background>
      </>
    )
  }
}

export default AnswerContentContainer