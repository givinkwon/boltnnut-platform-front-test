import React from 'react'

import Container from 'components/Container'
import Section from 'components/Section'

import BannerConatiner from './Banner'
import ContentConatiner from './Content'
import MobileContentContainer from './MobileMagazine';

class MagazineConatiner extends React.Component {
  render () {
    return (
      <div style={{overflow: 'hidden'}}>
      <BannerConatiner/>
      <Section style={{padding: 0}}>
        <Container style={{padding: 0}}>
          {
          this.props.width && this.props.width > 767.99 ? (
          <ContentConatiner style={{padding: 0}}/>
          ) : (
          <MobileContentContainer length = {this.props.length}/>
          )
          }
        </Container>
      </Section>
      </div>
    )
  }
}

export default MagazineConatiner