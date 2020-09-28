import React, {Component} from 'react'
import Router from 'next/router';
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import * as Text from 'components/Text'
import RatioImage from "components/RatioImage"
import CloseModalButton from "components/CloseModalButton"
import RequestArea from "components/RequestArea"

import * as FormatUtils from 'utils/format'

import {PRIMARY} from "static/style"


@inject('Proposal', 'Answer', 'Auth')
@observer
class RequestContentModal extends Component {
  handleClick = async () => {
    const {Auth, Proposal, handleClose, openNext} = this.props
    const request = Proposal.current_request

    console.log('제안하기 모달로 이동~')
    await handleClose()
    if(!request.active) {
      alert('모집 기간이 지났습니다');
    }
    else if(Auth.logged_in_partner.coin < request.coin) {
      alert('코인이 부족합니다')
      Router.push('/store?tab=2')
    }
    else {
      openNext()
    }
  }

  render() {
    const {Proposal, Answer, open, handleClose} = this.props;
    const request = Proposal.current_request
    const subclass = request ? Answer.getSubclassById(request.product) : null
    let mainCategory = subclass ? Answer.getDevelopBigCategoryById(request.category[0]) : null
    const {select_saves} = Proposal
    // 제품 대분류 찾기
    if(request) {
      const developObj = Answer.getDevelopCategoryById(request.category[0]);

      if(developObj) {
        mainCategory = Answer.getDevelopBigCategoryById(developObj.maincategory);
        console.log(mainCategory);
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
          <Text.FontSize32 color={PRIMARY} fontWeight={600} style={{marginBottom: 12}}>
            {request && request.name}
          </Text.FontSize32>
          <Text.FontSize18 fontWeight={300} color="#797979">
            의뢰 내용을 확인하세요.
          </Text.FontSize18>
        </DialogHeader>

        <DialogBody>

          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              제품 이름
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {subclass && subclass.subclass}
            </Text.FontSize20>
          </div>

          { request && request.content &&
          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              제품 설명
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300} dangerouslySetInnerHTML={{__html: (request && request.content.replace(/(?:\r\n|\r|\n)/g, '<br />'))}}/>
          </div> }


          { request && request.day &&
          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              희망 기간
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {request && request.day}일
            </Text.FontSize20>
          </div> }


          { request && request.price &&
          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              희망 견적
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {request && FormatUtils.intcomma(request.price)}만원
            </Text.FontSize20>
          </div> }


          {/*
          <div>
            <Text.FontSize20 color="#ed7d31" fontWeight={600}>
              제안에 필요한 코인
            </Text.FontSize20>
            <Text.FontSize20 color="#404040" fontWeight={300}>
              {request && FormatUtils.intcomma(request.coin)}개
            </Text.FontSize20>
          </div>*/}

          { request && request.file &&
          <div>
            <Text.FontSize20 color={PRIMARY} fontWeight={600}>
              첨부 파일
            </Text.FontSize20>

            <DownloadFile target="_blank" href={request && request.file} download>
              <Text.FontSize20 color="#404040" fontWeight={300}>
                {
                  request && request.file ?
                    request.file.split('/').pop()
                    : '첨부 파일이 없습니다'
                }
              </Text.FontSize20>
              <RatioImage src="/static/icon/download_file.svg" />
            </DownloadFile>
          </div>}

          {/* 의뢰 분야 */}
          <RequestArea
            mainCategory={mainCategory}
            selectSaves={select_saves}
          />
        </DialogBody>

        <DialogFooter>
          <Button onClick={this.handleClick}>
            <Text.FontSize28 id="proposal_content_check" color="black" fontWeight={700}>
              확인
            </Text.FontSize28>
          </Button>
        </DialogFooter>
      </StyledDialog>
    )
  }
}

export default RequestContentModal

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
		border-top-left-radius: 9px !important;
 		border-top-right-radius: 9px !important;
 		margin-left: 0;
 		margin-right: 0;
	}

  p {
    line-height: 1.3em;
  }
	@media (min-width: 0px) and (max-width: 767.98px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    			width: calc(100% - 30px);
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
    border-bottom: 1px solid #00000020;
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
          width: 140px;
        }
      }
      :nth-of-type(3), :nth-of-type(4), :nth-of-type(5) {
        > p:nth-of-type(2) {
          margin-left: auto;
          margin-right: 10px;
        }
      } 
      
      /* 제품 설명 */
      :nth-of-type(1), :nth-of-type(2), :nth-of-type(6) {
        flex-direction: column;
        align-items: flex-start;
        > p {
          :nth-of-type(1) {
            width: 100%;
            margin-bottom: 12px;
          }
        }
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
const DialogFooter = styled(DialogContent)`
  background-color: #001a56;
  flex-shrink: 0 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0 !important;

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
`

const DownloadFile = styled.a`
  flex-grow: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f970;
  padding: 14px 15px;
  margin-left: -15px;
  margin-right: 15px;
  text-decoration: none;

  /* DownloadFileIcon */
  > div {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  /* [파일 이름] max-line-num = 1 */
  > p {
    max-height: 20px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 30px);
    margin-left: 0;
  }
`
