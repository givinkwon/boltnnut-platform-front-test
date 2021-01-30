import React, {Component} from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import * as Text from 'components/Text'
import CloseModalButton from "components/CloseModalButton"
import {inject, observer} from "mobx-react";

class CheckBrowserModal extends Component {
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
          <Text.FontSize24 color="#404040" fontWeight={600}>
            안녕하세요, 볼트앤너트 고객님.<br/><br/>
            현재 홈페이지 테스트 중으로, <br/><br/>
            일부 기능이 동작하지 않을 수 있습니다.<br/><br/>
            홈페이지 사용 중에 불편한 점이 있으시다면 <br/><br/>
            하단 채널톡을 통해 실시간으로 문의해주세요.<br/><br/>
            빠르게 도와드리겠습니다.<br/><br/>
            볼트앤너트 드림.<br/><br/>
          </Text.FontSize24>
        </DialogBody>
      </StyledDialog>
    )
  }
}

export default CheckBrowserModal

const StyledDialog = styled(Dialog)`
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
    			width: 560px;
    			max-width: 560px;
    		}
    	}
    }
  }
  @media (min-width: 992px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    			width: 704px;
    			max-width: 704px;
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