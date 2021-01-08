import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
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
            <img src={lineBlue}/>
            {/*<img src={lineGray}/>*/}
          </Relative>
        </InlineDiv>
        <InlineDiv>
          <Relative>
            <Blue>
              <img src={check}/>
            </Blue>
            {/*<Gray>*/}
            {/*  <img src={two}/>*/}
            {/*</Gray>*/}
            <White/>
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
            {/*<Blue>*/}
            {/*  <img src={check}/>*/}
            {/*</Blue>*/}
            <Gray>
              <img src={three}/>
            </Gray>
            {/*<White/>*/}
          </Relative>
        </InlineDiv>
        <TextContainer>
          <TextDiv><StepbarText>기본 정보 입력</StepbarText></TextDiv>
          <TextDiv><StepbarText color={"#0933b3"}>제품 정보 선택</StepbarText></TextDiv>
          <TextDiv><StepbarText>무료 견적 받기</StepbarText></TextDiv>
        </TextContainer>
      </StepbarContainer>
    )
  }
}

export default Step;

const TextDiv = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
`
const TextContainer = styled.div`
  width: 100px;
  height:266px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-left: 74px;
`
const StepbarContainer = styled.div`
  display: inline-flex;
  flex-direction:column;
  width: 30px;
  height:254px;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
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
    height: 89px;
    visibility: ${props => props.visibility ? props.visibility : 'visible'};
  }
  > div {
    position: absolute;
  }
`
const StepbarText = styled(Title.FontSize16)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.16px;
  color: ${props => props.color ? props.color : '#282c36'};
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
