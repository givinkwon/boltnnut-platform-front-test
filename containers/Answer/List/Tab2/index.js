import React, {Component} from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import * as Text from 'components/Text'
import CloseModalButton from "components/CloseModalButton"
import DownloadFile from 'components/DownloadFile'
import RequestArea from "components/RequestArea"

import {PRIMARY} from "static/style"

import * as FormatUtils from 'utils/format'


@inject('Answer')
@observer
class Tab2Container extends Component {
  state = {
    requestId: -1
  }

  componentDidMount() {
    const splitedUrl = window.location.pathname.split('/')
    let pathname = splitedUrl[splitedUrl.length-2]
    const requestId = pathname === 'detail' ? splitedUrl[splitedUrl.length-3] : splitedUrl[splitedUrl.length-1]

    this.setState({
      ...this.state,
      requestId: requestId,
    })
  }

  render() {
    const {Answer, open, handleClose} = this.props;
    const {requestId} = this.state
    const {select_saves} = Answer

    const request = Answer.getRequestById(requestId)
    let product = null
    let mainCategory = null

    if (request) {
      console.log(request.product)
      product = Answer.getSubclassById(request.product)
      if (product) {
        mainCategory = Answer.getDevelopBigCategoryById(product.maincategory)
      }
    }

    return (
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="call-modal"
        aria-describedby="call-modal"
      >
        <DialogHeader>
          <CloseModalButton handleClose={handleClose} />
          <Text.FontSize32 color={PRIMARY} fontWeight={600}>
            {/*{request && request.name}*/}
            의뢰 내용 확인하기
          </Text.FontSize32>
          {/*<Text.FontSize18 color="#797979" style={{marginTop: 8}}>
            의뢰 했던 내용을 확인하세요.
          </Text.FontSize18>*/}
        </DialogHeader>

        <DialogBody>

          {/*
          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              제품 이름
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {product && product.subclass}
            </Text.FontSize20>
          </div>


          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              제품 설명
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {request && request.content}
            </Text.FontSize20>
          </div>


          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              희망 기간
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {request && request.day}일
            </Text.FontSize20>
          </div>


          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              희망 견적
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {request && FormatUtils.intcomma(request.price)}원
            </Text.FontSize20>
          </div>


          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              첨부 파일
            </Text.FontSize20>

            <DownloadFile file={request && request.file} />
          </div>*/}

          {/* 의뢰 내용 */}
          <RequestArea
            mainCategory={mainCategory}
            selectSaves={select_saves}
          />
        </DialogBody>
      </StyledDialog>
    )
  }
}

export default Tab2Container

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 9px !important;
  }

	@media (min-width: 0px) and (max-width: 767.98px) {
    .MuiPaper-root {
      margin-left: 15px !important;
      margin-right: 15px !important;
    }
	
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
const DialogHeader = styled(DialogTitle)`
	position: relative;
	background-color: #f9f9f9;
	padding: 40px 50px 25px !important;
	p {
		word-break: keep-all;
		line-height: 1.25em;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
    padding: 30px 15px 20px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	padding: 30px 40px 20px !important;
  }
`
const DialogBody = styled(DialogContent)`
  background-color: #e4e6ed;
  padding: 10px 50px !important;
  /*
    border로 구분되는 영역
    제품이름 / 제품설명 / 희망기간 ...
  */
  > div {
    display: flex;
    align-items: center;
    padding: 36px 0;
    border-bottom: 1px solid #00000010;
    /* 제품 설명 */
    :nth-of-type(2) {
      align-items: flex-start;
    }
    :last-child {
      border-bottom: none;
    }
    /* 라벨 */
    > p {
      line-height: 1.25em;
      :nth-of-type(1) {
        flex-shrink: 0;
        width: 200px;
      }
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 10px 15px !important;

    /*
      border로 구분되는 영역
      제품이름 / 제품설명 / 희망기간 ...
    */
    > div {
      padding: 18px 0;
      > p {
        :nth-of-type(1) {
          width: 100px;
        }
      }
      /* 제품 설명 */
      :nth-of-type(2),
      :nth-of-type(5) {
        flex-direction: column;
        align-items: flex-start;
        > p {
          :nth-of-type(1) {
            margin-bottom: 12px;
          }
        }
      }

      /* 첨부 파일 */
      :nth-of-type(5) {

      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 10px 40px !important;

    /*
      border로 구분되는 영역
      제품이름 / 제품설명 / 희망기간 ...
    */
    > div {
      > p {
        /* 라벨 */
        :nth-of-type(1) {
          width: 150px;
        }
      }
    }
  }
`
