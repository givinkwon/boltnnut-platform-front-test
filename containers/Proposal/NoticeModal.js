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
class NoticeModal extends Component {
  componentDidMount() {
  }

  handleClick = async (submit) => {
    console.log('제안 전송하기 / 취소하기')

    const {Auth, Proposal, handleClose, closeProposalModal,router} = this.props
    if(submit) {
    }
    await handleClose()
    await closeProposalModal()
  }

  render() {
    const {open, handleClose} = this.props;
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
          <Text.FontSize20 color="#404040" fontWeight={400}>

            📣필독 [서비스 리뉴얼 안내]<br/><br/>
            안녕하세요, 볼트앤너트 파트너 여러분.<br/><br/>
            지난 6월 초 볼트앤너트 웹페이지를 정식으로 오픈한 후 정말 감사하게도<br/><br/>
            파트너 여러분들로부터 많은 피드백을 받았습니다.<br/><br/>
            그 중 가장 많은 분들께서 주신 의견은<br/><br/>
            '제안서 작성이 쉽지 않다', '고객과 더 직접적으로 의사소통을 할 수 있었으면 좋겠다' 였습니다.<br/><br/>
            이에 따라 저희 볼트앤너트는 기존의 의뢰서-제안서 작성 시스템을<br/><br/>
            클라이언트가 의뢰서를 제출하면 곧바로 의뢰서에 가장 적합한<br/><br/>
            파트너들의 정보가 자동 추천되는 형태로 변경하였습니다.<br/><br/><br/><br/>
            변경된 시스템은 아래와 같습니다.<br/><br/>
            ✅클라이언트가 의뢰서를 제출합니다.<br/><br/>
            ✅제출 후 10초 내에 의뢰서에 가장 적합한<br/><br/>
            파트너의 정보(프로필과 인터뷰 내용)가 곧바로 보여집니다.<br/><br/>
            ✅클라이언트가 파트너 정보 페이지에 있는 파트너 전화번호를 확인한 후 전화를 겁니다.<br/><br/>
            ✅클라이언트와 유선으로 문의 및 미팅 관련 사항을 자유롭게 이야기합니다.<br/><br/><br/><br/>
            이번 리뉴얼을 통해 파트너 여러분들께서 클라이언트와 보다 직접적으로<br/><br/>
            의사소통을 하실 수 있을 것이라 생각합니다.<br/><br/>
            마지막으로 계약성사시 계약금의 5%를 수수료로 부과하는 서비스 이용정책은<br/><br/>
            변경된 사항이 없으니 이점 유의하시기 바랍니다.<br/><br/>
            설명드린 내용 중 이해가 잘 되지 않는 부분이 있으시다면 언제든<br/><br/>
            카카오톡 혹은 유선으로 문의해주세요. 감사합니다.<br/><br/>
            -볼트앤너트 드림-

          </Text.FontSize20>
        </DialogHeader>

        {/* 컴포넌트로 빼기 */}
        <DialogFooter>
          <Text.FontSize32 color="#404040" id="proposal_confirm_yes" fontWeight={700} onClick={() => this.handleClick(true)}>
            이동하기
          </Text.FontSize32>
        </DialogFooter>
      </StyledDialog>
    )
  }
}

export default NoticeModal

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
    text-align: left;
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
