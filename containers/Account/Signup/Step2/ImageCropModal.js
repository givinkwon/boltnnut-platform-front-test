import React, {Component} from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import * as Text from 'components/Text'
import RatioImage from "components/RatioImage"
import CloseModalButton from "components/CloseModalButton"

import {PRIMARY} from "static/style"


//image crop
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

@inject('Proposal', 'Auth')
class ImageCropModal extends Component {
   state = {
     crop: {
      unit: "%",
      width: 100,
      aspect: 16 / 9
     },
   }


  handleClick = async (submit) => {
    console.log('제안 전송하기 / 취소하기')

    const {Auth, Proposal, handleClose, closeProposalModal} = this.props
    if(submit) {
      await Auth.checkLogin()
      Proposal.postProposal(Auth.logged_in_partner.id)
    }
    await handleClose()
    await closeProposalModal()
  }

  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const {open, handleClose, src} = this.props;
    const {crop, croppedImageUrl} = this.state;
    const request = null
    const product = '하이패스'

    return (
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="call-modal"
        aria-describedby="call-modal"
      >
        <DialogHeader>
          <CloseModalButton handleClose={handleClose}  />

          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            />
        </DialogHeader>

        {/* 컴포넌트로 빼기 */}
        <DialogFooter>
          <Text.FontSize32 color="#404040" fontWeight={700} onClick={() => this.handleClick(true)}>
            예
          </Text.FontSize32>
          <Text.FontSize32 color="#404040" fontWeight={700} onClick={() => this.handleClick(false)}>
            아니오
          </Text.FontSize32>
        </DialogFooter>
      </StyledDialog>
    )
  }
}

export default ImageCropModal

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    border-top-left-radius: 9px !important;
    border-top-right-radius: 9px !important;
  }

	@media (min-width: 0px) and (max-width: 767.98px) {
    > div {
    	:nth-of-type(3) {
    		> div {
    			min-width: 60vw;
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
	padding: 60px 50px 50px !important;
	p {
    text-align: center;
		word-break: keep-all;
		line-height: 1.25em;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
    padding: 50px 30px 20px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	padding: 50px 40px 40px !important;
  }
`

const DialogFooter = styled(DialogContent)`
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
`