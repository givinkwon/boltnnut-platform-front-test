import React from 'react'

import Container from 'components/Container'
import Section from 'components/Section'

import BannerConatiner from './Banner'
import Content_1Conatiner from './Content_1'

class PolicyConatiner extends React.Component {
  render(){
    const { Auth } = this.props
    return (
      <>
      <Section>
        <Container style={{marginTop: 56}}>
          <Content_1Conatiner/>
        </Container>
      </Section>
      </>
    )
  }
}

export default PolicyConatiner
