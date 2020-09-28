import React from 'react'
import styled, {css} from 'styled-components'
import Router from 'next/router';
import { inject, observer } from 'mobx-react'

import ButtonComponent from 'components/Button'
import ButtonSpinnerComponent from 'components/ButtonSpinner'

import * as Text from 'components/Text'
import { GRAY, DARKGRAY, PRIMARY, WHITE } from 'static/style'

import Company from './Step2/Company'
import Category from './Step2/Category'
import ImageBox from './Step2/ImageBox'
import UpdateCheckModal from "./UpdateCheckModal";

@inject('Auth', 'Profile')
@observer
class ContentConatiner extends React.Component {
  state = {
    updateCheckModalOpen: false,
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  openUpdateCheckModal = () => {
    this.setState({
      ...this.state,
      updateCheckModalOpen: true,
    })
  }
  closeUpdateCheckModal = () => {
    this.setState({
      ...this.state,
      updateCheckModalOpen: false,
    })
  }

  Next = () => {
    const { Auth } = this.props
    if(Auth.type){
      Auth.setStep(2)
    }
  }
  cancel = () => {
    Router.back()
  }
  render(){
    const { Auth, Profile } = this.props

    return (
      <>
        <UpdateCheckModal
          open={this.state.updateCheckModalOpen}
          handleClose={this.closeUpdateCheckModal}
        />

        <Company/>
        <Category/>
        <ImageBox
          title="포트폴리오"
          imgField="img_portfolio"
          data={Profile.portfolio_set}
          checkedList={Profile.portfolio_checked}

          postData={Profile.postPortfolio}
          deleteData={Profile.deletePortfolio}
          toggleIsMain={Profile.togglePortfolioIsMain}
          updateCheckedIsMain={Profile.updateCheckedPortfolioIsMain}
        />
        <ImageBox
          title="조직도"
          imgField="img_structure"
          data={Profile.structure_set}
          checkedList={Profile.structure_checked}

          postData={Profile.postStructure}
          deleteData={Profile.deleteStructure}
          toggleIsMain={Profile.toggleStructureIsMain}
          updateCheckedIsMain={Profile.updateCheckedStructureIsMain}
        />
        <ImageBox
          title="보유 장비"
          imgField="img_machine"
          data={Profile.machine_set}
          checkedList={Profile.machine_checked}

          postData={Profile.postMachine}
          deleteData={Profile.deleteMachine}
          toggleIsMain={Profile.toggleMachineIsMain}
          updateCheckedIsMain={Profile.updateCheckedMachineIsMain}
        />
        <ImageBox
          title="보유 인증서"
          imgField="img_certification"
          data={Profile.certification_set}
          checkedList={Profile.certification_checked}

          postData={Profile.postCertification}
          deleteData={Profile.deleteCertification}
          toggleIsMain={Profile.toggleCertificationIsMain}
          updateCheckedIsMain={Profile.updateCheckedCertificationIsMain}
        />
        {/*<ImageBox
          title="이력서"
          imgField="img_resume"
          data={Profile.resume_set}
          checkedList={Profile.resume_checked}

          postData={Profile.postResume}
          deleteData={Profile.deleteResume}
          toggleIsMain={Profile.toggleResumeIsMain}
          updateCheckedIsMain={Profile.updateCheckedResumeIsMain}
        />*/}
        <ImageBox
          title="진행 공정"
          imgField="img_process"
          data={Profile.process_set}
          checkedList={Profile.process_checked}

          postData={Profile.postProcess}
          deleteData={Profile.deleteProcess}
          toggleIsMain={Profile.toggleProcessIsMain}
          updateCheckedIsMain={Profile.updateCheckedProcessIsMain}
        />

        <ButtonBox>
          <ButtonComponent backgroundColor='#e6e6e6' borderColor='#e6e6e6' borderRadius={100} onClick={() => this.cancel()}>
            <Text.FontSize20 color='#a0a0a0' fontWeight={500}>취소</Text.FontSize20>
          </ButtonComponent>
          <ButtonComponent backgroundColor={PRIMARY} borderColor={PRIMARY} borderRadius={100} onClick={this.openUpdateCheckModal}>
            {
              Auth.loading
              ? <ButtonSpinnerComponent/>
              : <Text.FontSize20 color={WHITE} fontWeight={500}>수정완료</Text.FontSize20>
            }
          </ButtonComponent>
        </ButtonBox>
      </>
    )
  }
}

export default ContentConatiner

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin-top: 30px;
`
