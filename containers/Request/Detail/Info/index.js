import React from 'react'

import Container from 'components/Container'

import Step1Container from './Step1'
import Step2Container from './Step2'
import Step3Conatiner from './Step3'

class InfoConatiner extends React.Component {
  render(){
    return (
      <Container>
        <Step1Container/>
      </Container>
    )
  }
}

export default InfoConatiner
