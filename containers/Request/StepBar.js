import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
import { inject, observer } from 'mobx-react';

const check = "static/images/request/StepBar/check.png"
const two = "static/images/request/StepBar/two.png"
const three = "static/images/request/StepBar/three.png"
const lineBlue = "static/images/request/StepBar/lineBlue.png"
const lineGray = "static/images/request/StepBar/lineGray.png"

@inject('Request')
@observer
class Step extends React.Component {
  render(){
  const { Request } = this.props;

  return (
      <StepbarContainer>
        <InlineDiv>
          <Relative>
            {this.props.Request.step_index==1 ? <><Blue/><White/></>: <Blue><img src={check}/></Blue>}
          </Relative>
        </InlineDiv>
        <InlineDiv>
          <Relative>
            {this.props.Request.step_index>=2 ? <img src={lineBlue}/> : <img src={lineGray}/>}
          </Relative>
        </InlineDiv>
        <InlineDiv>
          <Relative>
            {this.props.Request.step_index==2 && <><Blue/><White/></>}
            {this.props.Request.step_index<2 && <Gray><img src={two}/></Gray>}
            {this.props.Request.step_index>2 && <Blue><img src={check}/></Blue>}
          </Relative>
        </InlineDiv>
        <InlineDiv>
          <Relative>
            {this.props.Request.step_index>=3 ? <img src={lineBlue}/> : <img src={lineGray}/>}
          </Relative>
        </InlineDiv>
        <InlineDiv>
          <Relative>
            {this.props.Request.step_index==3 && <><Blue/><White/></>}
            {this.props.Request.step_index<3 && <Gray><img src={three}/></Gray>}
            {this.props.Request.step_index>3 && <Blue><img src={check}/></Blue>}
          </Relative>
        </InlineDiv>
        <InlineDiv>
          <Relative>
            {this.props.Request.step_index == 4 && <img src={lineBlue}/>}
          </Relative>
        </InlineDiv>
        <InlineDiv>
          <Relative>
            {this.props.Request.step_index==4 && <><Blue/><White/></>}
            {/*{this.props.Request.step_index=4 && <Gray><img src={three}/></Gray>}*/}
            {/*{this.props.Request.step_index>4 && <Blue><img src={check}/></Blue>}*/}
          </Relative>
        </InlineDiv>
        <TextContainer>
          <TextDiv><StepbarText index={1} realindex={Request.step_index}>기본 정보 입력</StepbarText></TextDiv>
          <TextDiv><StepbarText index={2} realindex={Request.step_index}>제품 정보 선택</StepbarText></TextDiv>
          <TextDiv><StepbarText index={3} realindex={Request.step_index}>무료 견적 받기</StepbarText></TextDiv>
          <TextDiv>
            {
              this.props.Request.step_index==4 && <StepbarText index={4} realindex={Request.step_index}>1:1 컨설팅 신청</StepbarText>
            }
          </TextDiv>
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
  width: 106px;
  height:384px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: 30px;
`

const StepbarContainer = styled.div`
  display: inline-flex;
  flex-direction:column;
  width: 30px;
  height:372px;
  // align-items: center;
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
  // color: ${props => props.color ? props.color : '#282c36'};
  color: ${props => props.index == props.realindex ? '#0933b3' : props.index < props.realindex ? '#a4aab4' : '#282c36'};
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
