import React from 'react'
import styled from 'styled-components'

import * as Text from './Text'

const Wrap = styled.div`
  padding: 3px 18px;
  border-radius: 20px;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : "#006cb3"};
`
class Badge extends React.Component {
  render() {
    const {backgroundColor, color} = this.props
    return ( 
      <Wrap backgroundColor={backgroundColor}>
        <Text.FontSize12 color={color ? color : "#ffffff"} fontWeight={700} center>
            {this.props.children}
        </Text.FontSize12>
      </Wrap>
    )
  }
}

export default Badge
