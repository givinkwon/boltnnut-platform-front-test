import React, {Component} from 'react'
import styled from "styled-components"
import { inject, observer } from 'mobx-react'
import Dialog from "@material-ui/core/Dialog"

import DialogContent from "@material-ui/core/DialogContent"

import * as Text from "components/Text"
import CloseModalButton from 'components/CloseModalButton'
import DialogTitle from "@material-ui/core/DialogTitle";
import {PRIMARY} from "../../../static/style";
import RatioImage from "../../../components/RatioImage";
import CustomCheckBoxComponent from "../../../components/CustomCheckBox";


@inject('Profile', 'Auth')
@observer
class UpdateCheckModal extends Component {
  handleClick = async () => {
    const {handleClose} = this.props

    this.resetChecked()
    await handleClose()
  }

  resetChecked = () => {
    const {checkedList} = this.props;
    for(let i=0; i<checkedList.length; i++) {
      checkedList[i] = false;
    }
  }

  render() {
    const {
      Auth, Profile,
      open, handleClose, title, data, checkedList, imgField,
      postData, deleteData, toggleIsMain, updateCheckedIsMain,
    } = this.props

    return (
      <StyledDialog
        open={open}
        aria-labelledby="update-check-modal"
        aria-describedby="update-check-modal"
      >
        <DialogHeader>
          <CloseModalButton handleClose={handleClose} />

          <Text.FontSize32 color={PRIMARY} fontWeight={700}>
            {title}
          </Text.FontSize32>
        </DialogHeader>
        <DialogBody>
          <ToolBox>
            <Text.FontSize32 color="#4d4f5c" fontWeight={500}>
              {data.length}건
            </Text.FontSize32>

            <input
              multiple
              type="file"
              style={{display: 'none'}}
              ref={input => this.file = input}
              onChange={
                (e) => {
                  for(let i=0; i < e.target.files.length; i++) {
                    const fileName = e.target.files[i].name;
                    const idxDot = fileName.lastIndexOf(".") + 1;
                    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
                    if (extFile=="jpg" || extFile=="jpeg" || extFile=="png" || extFile=="gif"){
                      //TO DO
                    }else{
                      alert("이미지 파일만 사용 가능합니다 (jpg, jpeg, png, gif)");
                      return
                    }
                  }

                  postData(Auth.logged_in_partner.id, e.target.files)
                }
              }
            />

            <div>
              <Button onClick={(e) => {this.file.click()}}>
                <Icon src="/static/icon/plus.svg" />
              </Button>
              <Button onClick={deleteData}>
                <Icon src="/static/icon/delete.svg" />
              </Button>
              <Button onClick={updateCheckedIsMain}>
                <Icon src="/static/icon/star.svg" />
              </Button>
            </div>
          </ToolBox>

          <PortfolioList>
            {
              data && data.map((item, idx) => {
                console.log(imgField)
                console.log(item.id)

                return (
                  <PortfolioBox key={item.id}>
                    <CustomCheckBoxComponent
                      checked={checkedList && checkedList[idx]}
                      onClick={ () => { checkedList[idx] = !checkedList[idx] }}
                    />
                    <PortfolioImage src={item[imgField]} />
                    {
                      item.is_main
                        ? (
                          <Icon
                            src="/static/icon/star_blue.svg"
                            clickable={true}
                            onClick={() => toggleIsMain(idx)}
                          />
                        )
                        : (
                          <Icon
                            src="/static/icon/star.svg"
                            clickable={true}
                            onClick={() => toggleIsMain(idx)}
                          />
                        )
                    }
                  </PortfolioBox>
                )
              })
            }
          </PortfolioList>
        </DialogBody>
        <DialogFooter>
          <Text.FontSize32 color="#ffffff" fontWeight={500} onClick={this.handleClick}>
            완료하기
          </Text.FontSize32>
        </DialogFooter>
      </StyledDialog>
    )
  }
}

export default UpdateCheckModal

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    margin: 0 10px !important;
  }

	@media (min-width: 0px) and (max-width: 767.98px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    			width: calc(100% - 12px);
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
  background-color: #f9f9f9;
  position: relative;
  padding: 50px 45px 0 !important;
  p {
    padding-bottom: 8px;
    border-bottom: solid 1px #dedede;
  }
  

  @media (min-width: 0px) and (max-width: 991.98px) {
    padding: 50px 15px 0 !important;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 30px 15px 0 !important;
  }
`
const DialogBody = styled(DialogContent)`
	position: relative;
	background-color: #f9f9f9;
	padding: 0 45px 0 !important;
	> p {
	  /* 글자 수가 최대 넓이를 넘으면 단어 단위로 줄바꿈 */
		word-break: keep-all;
		text-align: center;
		/* 줄간격 */
		line-height: 1.25em;
		margin-top: 15px;
	}
	@media (min-width: 0px) and (max-width: 991.98px) {
	  /* 상하 좌우 */
    padding: 0 15px !important;
  }
`

const DialogFooter = styled(DialogContent)`
  display: flex;
  align-items: center;
  background-color: ${PRIMARY};
  height: 200px;
  
  > p {
    /* 마우스 아이콘을 버튼 위에 올린 것처럼 바꿈 */
    cursor: pointer;
    flex: 1;
    text-align: center;
    word-break: keep-all;
    padding: 20px 0 !important;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    height: 65px;
    > p {
      padding: 10px 0 !important;
    } 
  }
`

const ToolBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;

  > p {
    padding-top: 2px;
  }

  /* icon box */
  > div {
    display: flex;
  }
  /* delete icon */
  >div>div:nth-of-type(2) > div {
    height: 27px;
  }
  @media (min-width: 0px) and (max-width: 991.98px) {
    >div>div:nth-of-type(2) > div {
      height: 17px;
    }
  }
`
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #a0a0a0;
  width: 44px;
  height: 44px;
  margin: 0 10px;
  box-sizing: border-box;
  cursor: pointer;

  /* 별모양 */
  :last-child {
    margin-right: 0;
  }
  > div {
    cursor: pointer;
  }

  @media (min-width: 0px) and (max-width: 991.98px) {
    width: 30px;
    height: 30px;
    margin: 0 5px;
  }
`
const Icon = styled(RatioImage)`
  width: 22px;
  height: auto;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};

  @media (min-width: 0px) and (max-width: 991.98px) {
    width: 14px;
  }
`

const PortfolioList = styled.div`
  box-sizing: border-box;
  width: 100%;

  /* 한 줄에서 첫 번째 박스의 왼쪽 마진을 없앰 */
  >div:nth-of-type(3n+1) {
    margin-left: 0;
  }
  /* 한 줄에서 세 번째 박스의 오른쪽 마진을 없앰 */
  >div:nth-of-type(3n) {
    margin-right: 0;
  }
  
  @media (min-width: 0px) and (max-width: 991.98px) {
    >div:nth-of-type(2n+1) {
      margin-left: 0 !important;
    }
    >div:nth-of-type(2n) {
      margin-right: 0 !important;
    }
  }
`
const PortfolioBox = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  
  box-sizing: border-box;
  width: calc(33% - 11px);
  margin: 10px;

  /* checkbox */
  > div:nth-of-type(1) {
    position: absolute;
    top: 12px;
    left: 12px;

    z-index: 300;
  }

  /* star icon */
  > div:nth-of-type(3) {
    position: absolute;
    top: 13px;
    right: 12px;

    z-index: 300;
  }

  @media (min-width: 0px) and (max-width: 991.98px) {
    width: calc(50% - 5px);
    margin: 5px !important;
    
    /* checkbox */
    > div:nth-of-type(1) {
      position: absolute;
      top: 12px;
      left: 12px;
  
      z-index: 300;
    }
  
    /* star icon */
    > div:nth-of-type(3) {
      top: 13px;
      right: 12px;
      width: 20px !important;
      height: 20px !important;
    }
  }
`
const PortfolioImage = styled(RatioImage)`
  width: 100%;

  /* 우선순위: 체크박스가 더 앞에 보이게 함 */
  z-index: 200;
`
