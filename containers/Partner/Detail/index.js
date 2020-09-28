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
        <BannerContainer/>
        {
          Partner.detail && (
            <CustomContainer>
              <ProfileContainer id={id} />
              {/*<CompanyInfoContainer/>*/}
              <CompanyDetailContainer/>

              <PortfolioContainer/>
              {current_partner ? (current_partner.structure_set.length > 0 ? <StructureConatiner/> : "") : ("")}
              {current_partner ? (current_partner.machine_set.length > 0 ? <MachineConatiner/> : "") : ("")}
              {current_partner ? (current_partner.certification_set.length > 0 ? <CertificationConatiner/> : "") : ("")}
              <RequestCardConatiner/>
              {/*<ResumeContainer/>*/}
            </CustomContainer>
          )
        }
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
