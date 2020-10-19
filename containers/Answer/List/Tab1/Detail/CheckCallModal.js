import React, {Component} from 'react'
import styled from "styled-components"
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"

import * as Text from "components/Text"
import RatioImage from "components/RatioImage"

import * as FormatUtils from 'utils/format'

@inject('Answer')
@observer
class CheckCallModal extends Component {
  handleClick = async (acceptance) => {
    const {Answer, router, handleClose, openCompleteCallModal} = this.props
    const answerId = router.query.answer_id

    await handleClose()
    if(acceptance) {
      // answer.see_phone = true
      Answer.acceptMeeting(answerId)
      openCompleteCallModal()
    }
    else {
      Answer.rejectMeeting(answerId)
    }
  }

  render() {
    const {Answer, router} = this.props
    const {open, handleClose} = this.props

    const answerId = router.query.answer_id
    const answer = Answer.getAnswerById(answerId)
    let partner = null
    if(answer) {
      partner = Answer.getPartnerById(answer.partner)
    }

    return (
      <StyledDialog
        open={open}
        aria-labelledby="call-modal"
        aria-describedby="call-modal"
      >
        <DialogBody>
          <PhoneInfo>
            <PhoneIcon src="/static/icon/phone-black.png" />
            <Text.FontSize24 fontWeight={500}>
              {partner && FormatUtils.formatPhone(partner.user.phone)}
            </Text.FontSize24>
          </PhoneInfo>
          <Text.FontSize28 color="#404040" fontWeight={500}>
            통화를 통해 미팅 여부를 결정하셨나요?
          </Text.FontSize28>
        </DialogBody>
        <DialogFooter>
          <Text.FontSize28 color="#404040" id="answer_meeting_yes" fontWeight={600} onClick={() => this.handleClick(true)}>
            미팅 신청하기
          </Text.FontSize28>
          <Text.FontSize28 color="#404040" id="answer_meeting_no" fontWeight={600} onClick={() => this.handleClick(false)}>
            미팅 신청하지 않기
          </Text.FontSize28>
        </DialogFooter>
      </StyledDialog>
    )
  }
}

export default withRouter(CheckCallModal)

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
	padding: 30px 210px !important;
	> p {
		word-break: keep-all;
		text-align: center;
		line-height: 1.25em;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
    padding: 30px 30px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	padding: 30px 170px !important;
  }
`
/* ToDo: 중복 */
const PhoneIcon = styled(RatioImage)`
	width: 17px;
	height: 17px;
	margin-top: -4px;
	margin-right: 8px;
`
const PhoneInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 7px;
`

const DialogFooter = styled(DialogContent)`
  display: flex;
  background-color: #e6e6e6;
  padding: 0 !important;
  > p {
    cursor: pointer;
    flex: 1;
    text-align: center;
    padding: 26px 0;
    border: thin solid #c6c6c6;
    word-break: keep-all;
    :nth-of-type(1) {
      border-right: thin solid #a0a0a0;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > p {
      padding: 15px 0 !important;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1.2em;
    }
  }
`
