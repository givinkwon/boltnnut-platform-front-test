import React, {Component} from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import * as Text from 'components/Text'
import CloseModalButton from "components/CloseModalButton"
import {inject, observer} from "mobx-react";

class MeetingInformationModal extends Component {
  render() {
    const {open, handleClose} = this.props
    return (
      <span> 모달 </span>
    )
  }
}

export default MeetingInformationModal

