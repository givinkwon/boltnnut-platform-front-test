import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'

const Qimage = "static/images/request/Step2/Q.png"
class QuestionTitle extends React.Component {
  render(){
    return (
      <TitleContainer>
        <img src={ Qimage }/>
        <TitleQue>{this.props.title}&nbsp;&nbsp;&nbsp;&nbsp;{this.props.index}/5</TitleQue>
      </TitleContainer>
    )
  }
}

export default QuestionTitle;

const TitleContainer = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const TitleQue = styled(Title.FontSize24)`
  font-weight: bold;
  letter-spacing: -0.6px;
  color: #282c36;
  display: inline;
  margin-left: 10px;
`
