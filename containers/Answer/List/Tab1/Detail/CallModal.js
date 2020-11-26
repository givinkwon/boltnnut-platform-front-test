import React, {Component} from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import * as Text from 'components/Text'
import RatioImage from 'components/RatioImage'
import CloseModalButton from "components/CloseModalButton";

import * as FormatUtils from 'utils/format'

@inject('Answer', 'Auth')
@observer
class CallModal extends Component {
	handleClick = async () => {
		const {Answer, router, handleClose, openCheckCallModal} = this.props
    const answerId = router.query.answer_id
		const answer = Answer.getAnswerById(answerId)

		await handleClose()
		if(answer.state === 0) {
			openCheckCallModal()
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
					<CloseModalButton handleClose={this.handleClick} />
        	<Text.FontSize28 color="#404040" fontWeight={400}>
        		통화를 통해 파트너의 전문성을 확인하고
						미팅 여부를 결정해보세요
        	</Text.FontSize28>
        </DialogBody>

       	<DialogFooter id="answer_call_check">
       		<Button onClick={this.handleClick}>
						<PhoneIcon src="/static/icon/phone-black.png" />
       			<Text.FontSize32 color="black" fontWeight={900} style={{fontFamily: 'Montserrat, sans-serif'}}>
       				{partner && FormatUtils.formatPhone(partner.user.phone)}
       			</Text.FontSize32>
       		</Button>
       	</DialogFooter>
      </StyledDialog>
		)
	}
}

export default withRouter(CallModal)

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
const DialogFooter = styled(DialogContent)`
	background-color: #001a56;
	display: flex;
	justify-content: center;
	align-items: center;
  padding: 25px 0 !important;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 15px 0 !important;
  }
`

const Button = styled.div`
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
	border-radius: 36px;
	padding: 10px 30px;
	
	> p {
  	padding-top: 2px;
  }
`
const PhoneIcon = styled(RatioImage)`
	width: 20px;
	height: 20px;
	margin-right: 9px;
	margin-top: 0;
`
