import React, {Component} from 'react'
import styled from "styled-components"
import { inject, observer } from 'mobx-react'
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"

import * as Text from "components/Text"
import CloseModalButton from 'components/CloseModalButton'


@inject('Profile', 'Auth')
@observer
class UpdateCheckModal extends Component {
  handleClick = async (acceptance) => {
    const {Auth, Profile, handleClose} = this.props

    await handleClose()
    if(acceptance) {
      Profile.updatePartner(Auth.logged_in_partner.id)
    }
  }

  render() {
    const {open, handleClose} = this.props

    return (
      <StyledDialog
        open={open}
        aria-labelledby="update-check-modal"
        aria-describedby="update-check-modal"
      >
        <DialogBody>
          <CloseModalButton handleClose={handleClose} />

          <Text.FontSize28 color="#404040" fontWeight={600}>
            프로필 정보를 수정하시겠습니까?
          </Text.FontSize28>
        </DialogBody>
        <DialogFooter>
          <Text.FontSize32 color="#404040" fontWeight={600} onClick={() => this.handleClick(true)}>
            수정하기
          </Text.FontSize32>
          <Text.FontSize32 color="#404040" fontWeight={600} onClick={() => this.handleClick(false)}>
            수정하지 않기
          </Text.FontSize32>
        </DialogFooter>
      </StyledDialog>
    )
  }
}

export default UpdateCheckModal

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
	position: relative;
	background-color: #f5f5f5;
	padding: 30px 210px !important;
	> p {
		word-break: keep-all;
		text-align: center;
		line-height: 1.25em;
		margin-top: 15px;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
    padding: 30px 30px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	padding: 30px 170px !important;
  }
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
    }
  }
`
