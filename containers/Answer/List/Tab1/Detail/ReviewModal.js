import React, {Component} from 'react'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { inject, observer } from 'mobx-react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import * as Text from 'components/Text'
import RatioImage from 'components/RatioImage'
import Rating from "components/Rating"
import CloseModalButton from "components/CloseModalButton"
import {PRIMARY} from "../../../../../static/style";


@inject('Answer')
@observer
class ReviewModal extends Component {
  handleClick = async () => {
    const {handleClose, openCheckReviewModal} = this.props

    await handleClose()
    openCheckReviewModal()
  }

  handleGoodChange = () => {
    const {setContentGood} = this.props
    setContentGood(this.inputGood.value)
  }
  handleBadChange = () => {
    const {setContentBad} = this.props
    setContentBad(this.inputBad.value)
  }

  async componentDidUpdate(prevProps, prevState) {
    const {Answer, router, rating, setRating, setContentGood, setContentBad} = this.props
    const activeReview = Answer.active_review

    const answerId = router.query.answer_id
    const answer = Answer.getAnswerById(answerId)
    let partner = null

    if(answer) {
      partner = Answer.getPartnerById(answer.partner)

      if(!rating.loaded && partner) {
        setRating({
          loaded: true,
          price_score: Math.round(partner.avg_score),
          talk_score: Math.round(partner.avg_score),
          expert_score: Math.round(partner.avg_score),
          time_score: Math.round(partner.avg_score),
          result_score: Math.round(partner.avg_score),
          sum: partner.avg_score,
        })
      }
    }
  }

  render() {
    const {Answer, router, open, handleClose, rating, handleRating, contentGood, contentBad} = this.props

    const activeReview = Answer.active_review
    const answerId = router.query.answer_id
    const answer = Answer.getAnswerById(answerId)
    let partner = null
    if(answer) {
      partner = Answer.getPartnerById(answer.partner)
    }

    return (
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="call-modal"
        aria-describedby="call-modal"
      >
        <DialogBody>
          <CloseModalButton handleClose={handleClose} />

          <Partner>
            <div>
              <Avatar src={partner && partner.logo} />

              <PartnerSummary>
                <Text.FontSize28 color="#404040" fontWeight={600}>
                  {partner && partner.name}
                </Text.FontSize28>
                <div>
                  <RatingSummary>
                    <Rating rating={partner && partner.avg_score} />
                    <Text.FontSize16 color="#4d4f5c">
                      {Number(partner && partner.avg_score).toFixed(1)}
                    </Text.FontSize16>
                    <Text.FontSize16 color="#4d4f5c">
                      ({partner && partner.review_set && partner.review_set.length}개)
                    </Text.FontSize16>
                  </RatingSummary>
                </div>
              </PartnerSummary>
            </div>
            <PartnerDescription>
              <Text.FontSize18 color="#404040">
                {partner && partner.info_company}
              </Text.FontSize18>
            </PartnerDescription>
          </Partner>

          <RatingList>
            <div>
              <RatingInfo>
                <Text.FontSize20 color="#404040" fontWeight={600}>
                  의사소통
                </Text.FontSize20>
                <RatingBox>
                  <Rating
                    name="talk_score"
                    rating={activeReview ? activeReview.talk_score : rating.talk_score}
                    editable={true}
                    handleClick={handleRating}
                  />
                  <Text.FontSize20 color="#4d4f5c">
                    {Number(activeReview ? activeReview.talk_score : rating.talk_score).toFixed(1)}
                  </Text.FontSize20>
                </RatingBox>
              </RatingInfo>

              <RatingInfo>
                <Text.FontSize20 color="#404040" fontWeight={600}>
                  전문성
                </Text.FontSize20>
                <RatingBox>
                  <Rating
                    name="expert_score"
                    rating={activeReview ? activeReview.expert_score : rating.expert_score}
                    editable={true}
                    handleClick={handleRating}
                  />
                  <Text.FontSize20 color="#4d4f5c">
                    {Number(activeReview ? activeReview.expert_score : rating.expert_score).toFixed(1)}
                  </Text.FontSize20>
                </RatingBox>
              </RatingInfo>

              <RatingInfo>
                <Text.FontSize20 color="#404040" fontWeight={600}>
                  일정 만족도
                </Text.FontSize20>
                <RatingBox>
                  <Rating
                    name="time_score"
                    rating={activeReview ? activeReview.time_score : rating.time_score}
                    editable={true}
                    handleClick={handleRating}
                  />
                  <Text.FontSize20 color="#4d4f5c">
                   {Number(activeReview ? activeReview.time_score : rating.time_score).toFixed(1)}
                  </Text.FontSize20>
                </RatingBox>
              </RatingInfo>
            </div>

            <div>
              <RatingInfo>
                <Text.FontSize20 color="#404040" fontWeight={600}>
                  가격 만족도
                </Text.FontSize20>
                <RatingBox>
                  <Rating
                    name="price_score"
                    rating={activeReview ? activeReview.price_score : rating.price_score}
                    editable={true}
                    handleClick={handleRating}
                  />
                  <Text.FontSize20 color="#4d4f5c">
                    {Number(activeReview ? activeReview.price_score : rating.price_score).toFixed(1)}
                  </Text.FontSize20>
                </RatingBox>
              </RatingInfo>

              <RatingInfo>
                <Text.FontSize20 color="#404040" fontWeight={600}>
                  신뢰성
                </Text.FontSize20>
                <RatingBox>
                  <Rating
                    name="result_score"
                    rating={activeReview ? activeReview.result_score : rating.result_score}
                    editable={true}
                    handleClick={handleRating}
                  />
                  <Text.FontSize20 color="#4d4f5c">
                    {Number(activeReview ? activeReview.result_score : rating.result_score).toFixed(1)}
                  </Text.FontSize20>
                </RatingBox>
              </RatingInfo>
              <RatingInfo>
                <Text.FontSize20 color="#404040" fontWeight={600}>
                  총점
                </Text.FontSize20>
                <RatingBox>
                  <Rating
                    name="sum"
                    rating={Math.round(rating.sum)}
                    handleClick={handleRating}
                  />
                  <Text.FontSize20 color="#4d4f5c">
                    {Number(rating.sum).toFixed(1)}
                  </Text.FontSize20>
                </RatingBox>
              </RatingInfo>
            </div>
          </RatingList>

          <LabelWrapper>
            <Text.FontSize20 color="#404040" fontWeight={600}>
              미팅 후기
            </Text.FontSize20>
          </LabelWrapper>
          <InputReview
            onChange={this.handleGoodChange}
            ref={input => this.inputGood = input}
            rows={6}
            placeholder="미팅 후기를 적어주세요"
            value={activeReview ? activeReview.content_good : contentGood}
          />

          <LabelWrapper>
            <Text.FontSize20 color="#404040" fontWeight={600}>
              계약 후기
            </Text.FontSize20>
          </LabelWrapper>
          <InputReview
            onChange={this.handleBadChange}
            ref={input => this.inputBad = input}
            rows={6}
            placeholder="계약 이후 후기를 적어주세요"
            value={activeReview ? activeReview.content_bad : contentBad}
          />
        </DialogBody>

        <DialogFooter onClick={this.handleClick}>
          <Text.FontSize28 color="white">
            { activeReview ? '리뷰 수정하기' : '리뷰 작성 완료' }
          </Text.FontSize28>
        </DialogFooter>
      </StyledDialog>
    )
  }
}

export default withRouter(ReviewModal)

const StyledDialog = styled(Dialog)`
	@media (min-width: 0px) and (max-width: 767.98px) {
	  .MuiPaper-root {
	    margin-left: 10px !important;
	    margin-right: 10px !important;
	  }
    > div {
    	:nth-of-type(3) {
    		> div {
    			max-width: 500px;
    			width: calc(100% - 30px);
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
	padding: 60px 48px !important;
	> p {
		word-break: keep-all;
		text-align: center;
		line-height: 1.25em;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
    padding: 40px 10px !important;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	/*padding: 30px 170px !important;*/
  }
`
const DialogFooter = styled(DialogContent)`
	background-color: #001a56;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80px;
	
	cursor: pointer;
`

const Partner = styled.div`
  display: flex;
  align-items: stretch;
  margin-bottom: 26px;
  > div {
    display: flex;
    align-items: flex-end;
    
    :nth-of-type(1) {
      flex-shrink: 0;
    }
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    > div {
      display: flex;
      align-items: flex-end;
    }
  }
`
const Avatar = styled(RatioImage)`
  flex-shrink: 0;
  width: 90px;
  height: 90px;
  margin-right: 12px;
  border: 2px solid ${PRIMARY};
  border-radius: 50%;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 66px;
    height: 66px;
  }
`
const PartnerSummary = styled.div`
  flex-shrink: 0;
  > p {
      /* 하는일 */
      :nth-of-type(1) {
        margin-bottom: 8px;  
      }
    }
  > div {
    padding-right: 10px;
    padding-bottom: 4px;
    border-right: 1px solid #898989;
    > p {
      /* 하는일 */
      :nth-of-type(1) {
        margin-top: 12px;
        margin-bottom: 8px;
      }
    }
  }
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-grow: 1;
    height: 100%;
    > div {
      padding-right: 10px;
      padding-bottom: 4px;
      border-right: none;
    }
  }
`
const RatingSummary = styled.div`
  display: flex;
  align-items: center;
  > p {
    :nth-of-type(1) {
      margin: 0 5px;
    }
  }
`
const PartnerDescription = styled.div`
  box-sizing: border-box;  
  padding-left: 16px;
  padding-bottom: 4px;
  align-items: center !important;
  > p {
    line-height: 1.3em;
    max-height: 1.3em;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-top: 35px;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 0 10px;
    margin-top: 12px;
    > p {
      padding-top: 0;
    }
  }
`
const RatingList = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 10px 35px;
  margin-bottom: 40px;
  background-color: #ececed;
  > div {
    flex: 1;
    :nth-of-type(1) {
      padding-right: 45px;
      border-right: 0.3px solid #c6c6c6;
    }
    :nth-of-type(2) {
      padding-left: 45px;
    }
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
    padding: 10px 10px;
    > div {
      padding: 0 !important;
      :nth-of-type(1) {
        border-right: none;
        border-bottom: 0.3px solid #c6c6c6;
      }
    }
  }
`
const RatingInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 0.3px solid #c6c6c6;
  :last-child {
    border-bottom: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 15px 0;
  }
`
const RatingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > p {
    :last-child {
      margin-left: 10px;
    }
  }
`

const LabelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 5px;
  margin-bottom: 10px;
`
const InputReview = styled.textarea`
  resize: none;
  background-color: white;
  font-family: inherit;
  font-size: 20px;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 24px;
  border: 1px solid #c6c6c6;
  border-radius: 8px;
  outline: 0;
  margin-bottom: 25px;
  
  ::placeholder {
    font-size: inherit;
    color: #e6e6e6;
  }
  
  /* copied from components/Text.js */
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    padding: 10px 12px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    font-size: 18px;
  }
  @media (min-width: 1300px) { 
    font-size: 20px;
  }
`
