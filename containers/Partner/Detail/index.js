import React, { useCallback } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'

import Container from 'components/Container'

import BannerContainer from './Banner'
import ProfileContainer from './Profile'
import CompanyInfoContainer from './CompanyInfo'
import CompanyDetailContainer from './CompanyDetail'
import PortfolioContainer from './Portfolio'
import StructureConatiner from "./Structure"
import MachineConatiner from "./Machine"
import CertificationConatiner from "./Certification"
import ProcessConatiner from "./Process"
import RequestCardConatiner from "./RequestCard";
import ResumeContainer from "./Resume"

@inject('Partner','Answer')
@observer
class PartnerConatiner extends React.Component {
  componentDidMount() {
    this.props.Partner.init()
  }
  render(){
    const { Partner, id, Answer } = this.props
    const { current_partner } = Answer
    console.log(current_partner)
    return (
      <>
      </>
    )
  }
}

export default PartnerConatiner

const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px !important;
`
