import React from 'react'

import Container from 'components/Container'
import Section from 'components/Section'

import BannerConatiner from './Banner'
import ContentConatiner from './Content'

class MagazineConatiner extends React.Component {
  render () {
    return (
      <div style={{overflow: 'hidden'}}>
      <BannerConatiner/>
      <Section style={{padding: 0}}>
        <Container style={{padding: 0}}>
          <ContentConatiner style={{padding: 0}}/>
        </Container>
      </Section>
      </div>
    )
  }
}

export default MagazineConatiner
