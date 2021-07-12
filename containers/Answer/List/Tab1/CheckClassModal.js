import React, { Component } from "react";
import styled from "styled-components";
import Router from "next/router";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import * as Text from "components/Text";
import CloseModalButton from "components/CloseModalButton";
import { inject, observer } from "mobx-react";

@inject("Request", "Answer")
@observer
class CheckUpdateModal extends Component {
  handleClick = async (acceptance) => {
    const { Request, Answer, handleClose } = this.props;
    handleClose();

    if (acceptance) {
      // 상태 관리
      const currentAnswer = Answer.getRequestById(Answer.current_request_id);

      await Router.push(`/request/${currentAnswer.product}`);
      Request.id = currentAnswer.id;
      Request.tab = 3;
    }
  };

  render() {
    const { open, handleClose } = this.props;

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
            프라임 회원이 되시면 큐레이션된 제조사 정보를 확인하실 수 있습니다.
          </Text.FontSize32>
        </DialogBody>

        <DialogFooter>
          <Text.FontSize32
            color="black"
            fontWeight={700}
            onClick={() => Router.push("/store?tab=2")}
          >
            결제하기
          </Text.FontSize32>
          <Text.FontSize32
            color="black"
            fontWeight={700}
            onClick={() => this.handleClick(false)}
          >
            취소하기
          </Text.FontSize32>
        </DialogFooter>
      </StyledDialog>
    );
  }
}

export default CheckUpdateModal;

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
`;
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
`;
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
`;
