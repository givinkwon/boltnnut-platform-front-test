import React from 'react';
import styled from 'styled-components'
import * as Title from 'components/Title'
import { inject, observer } from 'mobx-react';

const openStep = "static/images/request/RequestCard/openStep.svg"
const closeStep = "static/images/request/RequestCard/closeStep.svg"
const checkStep = "static/images/request/RequestCard/checkStep.png"
const dot = "static/images/request/RequestCard/dot.png"




@inject('Request')
@observer
class MobileStepContainer extends React.Component {
  state = {
    isOpen: false,
    color: "#282c36",
    weight: "bold",
  }
  menuClick = () => {
    const { isOpen } = this.state;
    if (isOpen === true) {
      this.setState({...this.state, isOpen : false});
    } else {
      this.setState({...this.state, isOpen: true});
    }
    console.log(isOpen);
  }
  render(){
    const { isOpen } = this.state;
    const { Request } = this.props;
    return (
      <>
        <StepContainer>
          {isOpen === true && (<img onClick={ this.menuClick } src={ closeStep }/>)}
          {isOpen === false && (<img onClick={ this.menuClick } src={ openStep }/>)}
        </StepContainer>
        { isOpen === true &&
        (
          <StepModal>
            <ModalContent>
              <StepText>
                { Request.step_index < 1 && (
                  <Text>
                    <span>기본 정보 입력</span>
                  </Text>
                )}
                { Request.step_index == 1 && (
                  <Text color= {this.state.color} weight={ this.state.weight }>
                    <span>기본 정보 입력</span>
                  </Text>
                )}
                { Request.step_index > 1 && (
                  <Text>
                    <span>기본 정보 입력</span>
                    <CheckImage src={ checkStep }/>
                  </Text>
                )}
                <img src={ dot } />
                { Request.step_index < 2 && (
                  <Text>
                    <span>제품 정보 선택</span>
                  </Text>
                )}
                { Request.step_index == 2 && (
                  <Text color= {this.state.color} weight={ this.state.weight }>
                    <span>제품 정보 선택</span>
                  </Text>
                )}
                { Request.step_index > 2 && (
                  <Text>
                    <span>제품 정보 선택</span>
                    <CheckImage src={ checkStep }/>
                  </Text>
                )}
                <img src={ dot } />
                { Request.step_index < 3 && (
                  <Text>
                    <span>무료 견적 받기</span>
                  </Text>
                )}
                { Request.step_index == 3 && (
                  <Text color= {this.state.color} weight={ this.state.weight }>
                    <span>무료 견적 받기</span>
                  </Text>
                )}
                { Request.step_index > 3 && (
                  <Text>
                    <span>무료 견적 받기</span>
                    <CheckImage src={ checkStep }/>
                  </Text>
                )}
                {
                  Request.step_index == 4 && (
                    <>
                      <img src={ dot } />
                      <Text color= {this.state.color} weight={ this.state.weight }>
                        <span>1:1 컨설팅 신청</span>
                      </Text>
                    </>
                  )
                }
                {
                  Request.step_index > 4 && (
                    <>
                      <img src={ dot } />
                      <Text>
                        <span>1:1 컨설팅 신청</span>
                        <CheckImage src={ checkStep }/>
                      </Text>
                    </>
                  )
                }
              </StepText>
            </ModalContent>
            <ModalSide onClick={ this.menuClick } />
          </StepModal>
        )
        }
      </>
    )
  }
}

export default MobileStepContainer;

const StepContainer = styled.div`
  position: absolute;
  height: 24px;
  display: inline-flex;
  align-items: center;
  left: 130px;
  z-index: 990;
`
const StepModal = styled.div`
  position: absolute;
  background-color: rgba(0,0,0,0.5);
  top: 45px;
  width: 100vw;
  height: 200vh;
  z-index: 890;
`
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  border-top: solid 0.5px #c6c7cc;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`
const StepText = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 25px;
`
const Text = styled.span`
  margin: 9px 0px;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    color: ${props => props.color ? props.color : '#999999'};
    font-family: NotoSansCJKkr;
    font-size: 13px;
    font-weight: ${props => props.weight ? props.weight : 'normal'};
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.33px;
  }
`
const ModalSide = styled.div`
  width: 100%;
  height: 100%;
`
const CheckImage = styled.img`
  position: absolute; 
  left: 91px;
`
