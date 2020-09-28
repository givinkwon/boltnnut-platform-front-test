import React, {Component} from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import * as Text from 'components/Text'
import RatioImage from "components/RatioImage"
import CloseModalButton from "components/CloseModalButton"

import {PRIMARY} from "static/style"

import {withRouter} from "next/router";

@inject('Proposal', 'Auth')
class ConfirmProposalModal extends Component {
  // state = {
  //   requestId: -1
  // }

  componentDidMount() {
    // const splitedUrl = window.location.pathname.split('/')
    // let pathname = splitedUrl[splitedUrl.length-2]
    // const requestId = pathname === 'detail' ? splitedUrl[splitedUrl.length-3] : splitedUrl[splitedUrl.length-1]

    // this.setState({
    //   ...this.state,
    //   requestId: requestId,
    // })
  }

  handleClick = async (submit) => {
    console.log('제안 전송하기 / 취소하기')

    const {Auth, Proposal, handleClose, closeProposalModal,router} = this.props
    if(submit) {
        router.push('/profile/')
      {/*await Auth.checkLogin()
      Proposal.postProposal(Auth.logged_in_partner.id)*/}
    }
    await handleClose()
    await closeProposalModal()
  }

  render() {
    const {open, handleClose} = this.props;
    //const {requestId} = this.state
    const request = null
    const product = '하이패스'

    return (
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="call-modal"
        aria-describedby="call-modal"
      >
        <DialogHeader>
          <CloseModalButton handleClose={handleClose} />
          <Text.FontSize24 color="#404040" fontWeight={400}>
            매칭 알고리즘에 따라 파트너들이 입력한 회사정보와 <br/>
            고객이 작성한 의뢰 정보에 따라 자동 매칭됩니다.<br/>
            매칭률을 높이고 싶다면 회사 정보를 자세히 적어주세요.
          </Text.FontSize24>
        </DialogHeader>

        {/* 컴포넌트로 빼기 */}
        <DialogFooter>
          <Text.FontSize32 color="#404040" id="proposal_confirm_yes" fontWeight={700} onClick={() => this.handleClick(true)}>
            이동하기
          </Text.FontSize32>
          <Text.FontSize32 color="#404040" id="proposal_confirm_no" fontWeight={700} onClick={() => this.handleClick(false)}>
            취소
          </Text.FontSize32>
        </DialogFooter>
      </StyledDialog>
    )
  }
}

export default withRouter(ConfirmProposalModal)

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-top-left-radius: 9px !important;
    border-top-right-radius: 9px !important;
  }

	@media (min-width: 0px) and (max-width: 767.98px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    			min-width: 60vw;
    		}
    	}
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	> div {
    	:nth-of-type(3) {
    		> div {
    			width: 720px;
    			max-width: 720px;
    		}
    	}
    }
  }
  @media (min-width: 992px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    			width: 964px;
    			max-width: 964px;
    		}
    	}
    }
  }
`
const DialogHeader = styled(DialogTitle)`
	position: relative;
	background-color: #f9f9f9;
	padding: 60px 50px 50px !important;
	p {
    text-align: center;
		word-break: keep-all;
		line-height: 1.25em;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
    padding: 50px 30px 20px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	padding: 50px 40px 40px !important;
  }
`

const DialogFooter = styled(DialogContent)`
  cursor: pointer;
  background-color: #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  padding: 0 !important;
  > p {
    flex: 1;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.3px solid #a0a0a0;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 50px;
  }
`
