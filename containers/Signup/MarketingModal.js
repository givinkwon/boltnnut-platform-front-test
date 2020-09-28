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

@inject('Proposal', 'Auth')
class MarketingModal extends Component {

  state = {
    open_marketing: false,
    accept_marketing: true,

    }

  handleClick = async (submit) => {
    const {handleClose} = this.props
    this.setState({
      ...this.state,
      open_marketing: false,
    })

    if(submit) {
       this.setState({
      ...this.state,
      accept_marketing: true,
    })
    }

    this.setState({
      ...this.state,
      accept_marketing: false,
    })
    await handleClose()
  }

  render() {
    const {open, handleClose, } = this.props;
    const {accept_marketing, open_marketing} = this.state;
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
            이용목적 : 볼트앤너트 제품 제조 관련 콘텐츠 발송 및 할인 이벤트 안내<br/>
            보유기간 : 별도 동의 철회 시 혹은 회원 탈퇴 후 1주일까지
          </Text.FontSize20>
        </DialogHeader>

        {/* 컴포넌트로 빼기 */}
        <DialogFooter>
          <Text.FontSize32 color="#404040" fontWeight={700} onClick={() => this.handleClick(true)}>
            확인
          </Text.FontSize32>
        </DialogFooter>
      </StyledDialog>
    )
  }
}

export default MarketingModal

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
