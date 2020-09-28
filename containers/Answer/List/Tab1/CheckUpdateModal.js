import React, {Component} from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import * as Text from 'components/Text'
import CloseModalButton from "components/CloseModalButton"
import {inject, observer} from "mobx-react";

@inject('Request', 'Answer')
@observer
class CheckUpdateModal extends Component {
  handleClick = async (acceptance) => {
    const {Request, Answer, handleClose} = this.props;
    handleClose();

    if(acceptance) {
      await Router.push(`/request`)
    }
  }

  render() {
    const {open, handleClose} = this.props

    return (
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="check-update-modal"
        aria-describedby="check-update-modal"
      >
        <DialogBody>
          <CloseModalButton handleClose={handleClose} />
          <Text.FontSize32 color="#404040" fontWeight={600}>
            해당 프로젝트에 추가로 제안한 파트너가 없습니다. 의뢰서의 내용을 개선하여 재 의뢰를 해보세요
          </Text.FontSize32>
        </DialogBody>

        <DialogFooter>
          <Text.FontSize32 color="black" fontWeight={700} onClick={() => this.handleClick(true)}>
            예
          </Text.FontSize32>
          <Text.FontSize32 color="black" fontWeight={700} onClick={() => this.handleClick(false)}>
            아니오
          </Text.FontSize32>
        </DialogFooter>
      </StyledDialog>
    )
  }
}

export default CheckUpdateModal

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
		border-top-left-radius: 9px !important;
 		border-top-right-radius: 9px !important;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    			max-width: 500px;
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
const DialogBody = styled(DialogContent)`
	position: relative;
	background-color: #f5f5f5;
	padding: 60px 50px 40px !important;
	display: flex;
	justify-content: center;
	> p {
	  max-width: 530px;
		word-break: keep-all;
		text-align: center;
		line-height: 1.25em;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
    padding: 60px 30px 40px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	padding: 60px 30px 40px !important;
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
