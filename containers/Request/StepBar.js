import React from 'react'
import styled from 'styled-components'

const check = "static/images/request/StepBar/check.png"
const two = "static/images/request/StepBar/two.png"
const three = "static/images/request/StepBar/three.png"
const lineBlue = "static/images/request/StepBar/lineBlue.png"
const lineGray = "static/images/request/StepBar/lineGray.png"


class Step extends React.Component {
  render(){
    return (
      <StepbarContainer>
        <InlineDiv>
          <Relative>
            <Blue>
              <img src={check}/>
            </Blue>
            {/*<White/>*/}
          </Relative>
        </InlineDiv>
        <InlineDiv>
          <Relative>
            <img src={lineBlue} style={{ height:89, }}/>
            {/*<img src={lineGray}/>*/}
          </Relative>
        </InlineDiv>
        <InlineDiv>
          <Relative>
            <Blue>
              <img src={check}/>
            </Blue>
            <Gray>
              <img src={two}/>
            </Gray>
            {/*<White/>*/}
          </Relative>
        </InlineDiv>
        <InlineDiv>
          <Relative>
            {/*<img src={lineBlue}/>*/}
            <img src={lineGray}/>
          </Relative>
        </InlineDiv>
        <InlineDiv>
          <Relative>
            <Blue>
              <img src={check}/>
            </Blue>
            <Gray>
              <img src={three}/>
            </Gray>
            <White/>
          </Relative>
        </InlineDiv>
      </StepbarContainer>
    )
  }
}

export default Step;
const StepbarContainer = styled.div`
  margin: 50px;
  background-color: #ffffff;
  display: inline-flex;
  flex-direction:column;
  width: 30px;
  height:254px;
  alig-items: center;
  justify-content: space-between;
`
const InlineDiv = styled.div`
  display: inline;
`
const Relative = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  > img {
    position: absolute;
  }
  > div {
    position: absolute;
  }
`
const Gray = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: #a4aab4;
  visibility: ${props => props.visibility ? props.visibility : 'visible'};
  display: flex;
  align-items: center;
  justify-content: center;
`
const Blue = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  background-color: #0933b3;
  visibility: ${props => props.visibility ? props.visibility : 'visible'};
  display: flex;
  align-items: center;
  justify-content: center;
`
const White = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 30px;
  background-color: white;
  visibility: ${props => props.visibility ? props.visibility : 'visible'};
`
