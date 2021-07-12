import React, {Component} from 'react'
import styled from "styled-components"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"

import * as Text from "components/Text"
import CloseModalButton from "components/CloseModalButton"

class CompleteCallModal extends Component {
  render() {
    const {open, handleClose} = this.props

    return (
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="call-modal"
        aria-describedby="call-modal"
      >
        <DialogBody>
          <CloseModalButton handleClose={handleClose} />

          <Text.FontSize32 color="#404040" fontWeight={400}>
            신청이 완료되었습니다<br/>
            다른 전문가의 제안서도 확인해보세요
          </Text.FontSize32>
        </DialogBody>
      </StyledDialog>
    )
  }
}

export default CompleteCallModal

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
  .MuiPaper-root {
		border-top-left-radius: 9px !important;
 		border-top-right-radius: 9px !important;
	}

	position: relative;
	background-color: #f5f5f5;
	padding: 70px 170px !important;
	> p {
		word-break: keep-all;
		text-align: center;
		line-height: 1.25em;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
    padding: 50px 20px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	padding: 70px 150px !important;
  }
`
