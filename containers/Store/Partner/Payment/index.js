import React from 'react'
import styled from 'styled-components'

import Container from 'components/Container'

import MyCoinConatiner from './MyCoin'
import PriceConatiner from './Price'
import CoinConatiner from './Coin'
import PaymentConatiner from './Payment'
import PrepareConatiner from './Prepare'

class PartnerPaymentConatiner extends React.Component {
  render() {
    return (
      <CustomContainer>
        <MyCoinConatiner/>
        <PriceConatiner/>
        <CoinConatiner/>
        <PaymentConatiner/>
      </CustomContainer>
    )
  }
}

export default PartnerPaymentConatiner

const CustomContainer = styled(Container)`
  padding: 40px 0px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 15px 20px !important;
  }
`