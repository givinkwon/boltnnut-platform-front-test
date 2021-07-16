import React, { useCallback } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'

import Container from 'components/Container'

import BannerContainer from '../Banner'
import ProfileContainer from '../Profile'
import CompanyInfoContainer from '../CompanyInfo'
import CompanyDetailContainer from '../CompanyDetail'
import PortfolioContainer from '../Portfolio'
import StructureConatiner from "../Structure"
import MachineConatiner from "../Machine"
import CertificationConatiner from "../Certification"
import ProcessConatiner from "../Process"
import ReviewListContainer from "./ReviewListContainer";


@inject('Partner')
@observer
class PartnerReviewConatiner extends React.Component {
  componentDidMount() {
    this.props.Partner.init()
  }
  render(){
    const { Partner, id } = this.props
    return (
      <>
        <BannerContainer/>
        {
          Partner.detail && (
            <CustomContainer>
              <ProfileContainer id={id} />
              <ReviewListContainer />
            </CustomContainer>
          )
        }
      </>
    )
  }
}

export default PartnerReviewConatiner

const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px !important;
`