import React from 'react'
import Head from 'next/head'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'

import Container from 'components/Container'
import Section from 'components/Section'

import BannerConatiner from './Banner'
import ContentConatiner from './Content'
import ProfileConatiner from './Profile'

@inject('Auth', 'Answer')
@observer
class SignupConatiner extends React.Component {
  componentDidMount() {
    const {Answer} = this.props
    Answer.loadCategories()
  }

  render(){
    return (
      <>
        <BannerConatiner/>
        <Container>
          <CustomSection>
            <ProfileConatiner/>
            <ContentConatiner/>
          </CustomSection>
        </Container>
      </>
    )
  }
}

export default SignupConatiner

const CustomSection = styled(Section)`
  padding-top: 20px !important;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding-top: 0px !important;
  }
`
