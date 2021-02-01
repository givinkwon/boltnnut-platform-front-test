import React from 'react';
import styled from 'styled-components'
import * as Title from 'components/Title'
import { inject, observer } from 'mobx-react';

const openStep = "static/images/request/RequestCard/openStep.png"
const closeStep = "static/images/request/RequestCard/closeStep.png"


@inject('Request')
@observer
class MobileStepContainer extends React.Component {
  state = {
    isOpen: false,
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
          <img onClick={ this.menuClick } src={ openStep }/>
        </StepContainer>
        { isOpen === true &&
        (
          <StepModal>
            <ModalContent>

            </ModalContent>
            <ModalSide>
            </ModalSide>
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
  height: 100vh;
  z-index: 890;
`
const ModalContent = styled.div`
  position: absolute;
`
const ModalSide = styled.div`
  position: absolute;
`
