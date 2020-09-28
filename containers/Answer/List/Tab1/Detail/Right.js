import React, {Component} from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'

import * as Text from 'components/Text'
import RatioImage from 'components/RatioImage'

import CautionModal from "./CuationModal";
import CallModal from 'CallModal'
import CheckCallModal from "CheckCallModal";
import CompleteCallModal from "CompleteCallModal";
import ReviewModal from "ReviewModal";
import CheckReviewModal from "CheckReviewModal"

import * as FormatUtils from 'utils/format'
import RequestCard from "./RequestCard";
import {PRIMARY} from "../../../../../static/style";

@inject('Answer', 'Loading')
@observer
class RightDetailContainer extends Component {
	state = {
		cautionModalOpen: false,
		callModalOpen: false,
		checkCallModalOpen: false,
		completeCallModalOpen: false,

		reviewModalOpen: false,
		checkReviewModalOpen: false,

		rating: {
      loaded: false,
      price_score: 4,
      talk_score: 3,
      expert_score: 5,
      time_score: 1,
      result_score: 3,
      sum: 2,
    },
    // 리뷰
    content_good: "",
		content_bad: "",
	}

	completeLoading = () => {
		this.setState({
			...this.state,
			loadReview: true,
		})
	}

	setRating = (rating) => {
		this.setState({
      ...this.state,
      rating: rating,
    })
	}
	setContentGood = (content) => {
		console.log('goodReview 저장: ' + content)

		const {active_review} = this.props.Answer;
		if(active_review) {
			active_review.content_good = content;
		}
		else {
			this.setState({
				...this.state,
				content_good: content,
			})
		}
	}

	setContentBad = (content) => {
		console.log('badReview 저장: ' + content)

		const {active_review} = this.props.Answer;
		if(active_review) {
			active_review.content_bad = content;
		}
		else {
			this.setState({
				...this.state,
				content_bad: content,
			})
		}
	}

	handleRating = (name, number) => {
    console.log(`clicked RatingIcon(${number}) of ${name}`)

		const {active_review} = this.props.Answer;
		const {rating} = this.state
		const fields = ['price_score', 'talk_score', 'time_score', 'expert_score', 'result_score']

		if(active_review) {
			active_review[name] = number;
			let sum = 0
			for(let i=0; i<fields.length; i++) {
				if(fields[i] === name) {
					sum += number
				}
				else {
					sum += active_review[fields[i]]
				}
			}

			active_review.avg_score = sum / fields.length;
		}
		else {
			let sum = 0
			for(let i=0; i<fields.length; i++) {
				if(fields[i] === name) {
					sum += number
				}
				else {
					sum += rating[fields[i]]
				}
			}

			this.setState({
				...this.state,
				rating: {
					...this.state.rating,
					[name]: number,
					sum: sum / fields.length,
				}
			})
		}
  }

  postReview = () => {
  	const {Answer, router} = this.props
  	const {rating, content_good, content_bad} = this.state
		const activeReview = Answer.active_review

  	let params = {
  		price_score: parseInt(rating.price_score),
			talk_score: parseInt(rating.talk_score),
			expert_score: parseInt(rating.expert_score),
			time_score: parseInt(rating.time_score),
			result_score: parseInt(rating.result_score),

			content_good: content_good,
			content_bad: content_bad,
  	}
  	delete params['sum']
  	delete params['loaded']

  	console.log('pararms')
  	console.log(params)

  	const answerId = router.query.answer_id

		if(activeReview) {
			Answer.patchReview(answerId, params)
		}
		else {
			Answer.postReview(answerId, params)
		}
  }

	openCautionModal = (active) => {
		if(!active) {
			return
		}

		this.setState({
			...this.state,
			cautionModalOpen: true,
		})
	}
	closeCautionModal = () => {
		this.setState({
			...this.state,
			cautionModalOpen: false,
		})
	}

	openCallModal = (active = true) => {
		if(!active) {
			return
		}

		this.setState({
			...this.state,
			callModalOpen: true,
		})
	}
	closeCallModal = () => {
		this.setState({
			...this.state,
			callModalOpen: false,
		})
	}
	openCheckCallModal = () => {
		this.setState({
			...this.state,
			checkCallModalOpen: true
		})
	}
	closeCheckCallModal = () => {
		this.setState({
			...this.state,
			checkCallModalOpen: false
		})
	}
	openCompleteCallModal = () => {
		this.setState({
			...this.state,
			completeCallModalOpen: true,
			isCalled: true,
		})
	}
	closeCompleteCallModal = () => {
		this.setState({
			...this.state,
			completeCallModalOpen: false,
		})
	}

	openReviewModal = () => {
		this.setState({
			...this.state,
			reviewModalOpen: true,
		})
	}
	closeReviewModal = () => {
		this.setState({
			...this.state,
			reviewModalOpen: false,
		})
	}
	openCheckReviewModal = (rating) => {
		this.setState({
			...this.state,
			checkReviewModalOpen: true,
		})
	}
	closeCheckReviewModal = () => {
		this.setState({
			...this.state,
			checkReviewModalOpen: false,
		})
	}

	getRemainTime = (createdAt) => {
		createdAt = new Date(createdAt)
		let dueAt = new Date(createdAt)
		dueAt.setDate(dueAt.getDate() + 1)

		const now = new Date()

		console.log(now)
		console.log(dueAt)
		console.log()

		return Math.round((dueAt.getTime() - now.getTime()) / 3600000)
	}

	render() {
		const {cautionModalOpen, callModalOpen, checkCallModalOpen, completeCallModalOpen, isCalled} = this.state;
		const {reviewModalOpen, checkReviewModalOpen} = this.state;

		const {Answer, router} = this.props
		const activeReview = Answer.active_review
		const requestId = router.query.id
		const answerId = router.query.answer_id

		const request = Answer.getRequestById(requestId)
		const answer = Answer.getAnswerById(answerId)
		let partner = null
		if(answer) {
			partner = Answer.getPartnerById(answer.partner)
		}

		return (
			<Wrapper>
				<Card>
					<CautionModal
						open={cautionModalOpen}
						handleClose={this.closeCautionModal}
						openCallModal={this.openCallModal}
					/>
					<CallModal
						open={callModalOpen}
						handleClose={this.closeCallModal}
						openCheckCallModal={this.openCheckCallModal}
					/>
					<CheckCallModal
						open={checkCallModalOpen}
						handleClose={this.closeCheckCallModal}
						openCompleteCallModal={this.openCompleteCallModal}
					/>
					<CompleteCallModal
						open={completeCallModalOpen}
						handleClose={this.closeCompleteCallModal}
					/>
					<ReviewModal
						open={reviewModalOpen}
						handleClose={this.closeReviewModal}

						rating={this.state.rating}
						setRating={this.setRating}
						handleRating={this.handleRating}

						contentGood={this.state.content_good}
						contentBad={this.state.content_bad}
						setContentGood={this.setContentGood}
						setContentBad={this.setContentBad}

						openCheckReviewModal={this.openCheckReviewModal}
					/>
					<CheckReviewModal
						open={checkReviewModalOpen}
						handleClose={this.closeCheckReviewModal}
						postReview={this.postReview}
						rating={this.state.rating}
						content={this.state.content}
					/>

					<CallButton id = "answer_call_button"
						onClick={() => {
							// 마감되었을 때
							if(request && !request.active) {
								if(answer && answer.state === 0) {
									this.openCautionModal(request && !request.active)
								}
								else {
									this.openCallModal()
								}
							}
						}}
						disabled={request && request.active}
					>
						<PhoneIcon src="/static/icon/phone.png" />
						<Text.FontSize24 color="#4d4f5c" fontWeight={700} style={{wordBreak: 'keep-all'}}>
							{
								(request && request.active)
									? `모집마감 이후에 통화가 가능합니다 (${this.getRemainTime(request.created_at)}시간 남음)`
									: '전화번호 확인하기'
							}
						</Text.FontSize24>
					</CallButton>

					<CardBody>
						<div>
							<Text.FontSize20 color="#4d4f5c" fontWeight={700}>
								개발분야
							</Text.FontSize20>
							<Text.FontSize20 fontWeight={300} color="#404040">
								{answer && answer.category}
							</Text.FontSize20>
						</div>
						<div>
							<Text.FontSize20 color="#4d4f5c"  fontWeight={700}>
								개발투입인원
							</Text.FontSize20>
							<Text.FontSize20 fontWeight={300} color="#404040">
								{answer && answer.people}
							</Text.FontSize20>
						</div>
						<div>
							<Text.FontSize20 color="#4d4f5c" fontWeight={700}>
								예상 개발 기능
							</Text.FontSize20>
							<Text.FontSize20 fontWeight={300} color="#404040">
								{answer && answer.strategy} %
							</Text.FontSize20>
						</div>
						<div>
							<Text.FontSize20  color="#4d4f5c"  fontWeight={700}>
								개발 입률
							</Text.FontSize20>
							<Text.FontSize20 fontWeight={300} color="#404040">
								{answer && answer.price}
							</Text.FontSize20>
						</div>
						<div>
							<Text.FontSize20 color="#4d4f5c" fontWeight={700}>
								예상 개발 기간
							</Text.FontSize20>
							<Text.FontSize20 fontWeight={300} color="#404040">
								{answer && answer.period}
							</Text.FontSize20>
						</div>
						<div>
							<Text.FontSize20 color="#4d4f5c" fontWeight={700}>
								총 개발 기간
							</Text.FontSize20>
							<Text.FontSize20 fontWeight={300} color="#404040">
								{answer && answer.day}
							</Text.FontSize20>
						</div>
						<div>
							<Text.FontSize20 color="#4d4f5c" fontWeight={700}>
								예상 견적
							</Text.FontSize20>
							<Text.FontSize20 fontWeight={300} color="#404040">
								{answer && answer.all_price}
							</Text.FontSize20>
						</div>
						<div>
							<Text.FontSize20 color="#4d4f5c" fontWeight={700}>
								전문성 및 경험
							</Text.FontSize20>
							<Text.FontSize20 fontWeight={300} color="#404040">
								{answer && answer.expert}
							</Text.FontSize20>
						</div>
						<div>
							<Text.FontSize20 color="#4d4f5c" fontWeight={700}>
								첨부 파일
							</Text.FontSize20>

							<DownloadFile target="_blank" href={answer && answer.file} download>
                                <Text.FontSize20 color={PRIMARY} fontWeight={500}>
                                    {
                                        answer && answer.file ?
                                        answer.file.split('/').pop()
                                        : '첨부 파일이 없습니다'
                                    }
                                </Text.FontSize20>
                            </DownloadFile>
						</div>
					</CardBody>

					<ReviewButton
						disabled={
							/* active가 false || 미팅 신청 안 했을 때 */
							(answer && !answer.active) || (answer && answer.state !== 1)
						}
						onClick={this.openReviewModal}
					>
						<Text.FontSize24 color="#4d4f5c" fontWeight={600}>
							{activeReview ? '리뷰 수정하기' : '리뷰 작성하기'}
						</Text.FontSize24>
					</ReviewButton>
				</Card>
			</Wrapper>
		)
	}
}

export default withRouter(RightDetailContainer)

const Wrapper = styled.div`
	width: calc(100% - 290px);
	@media (min-width: 0px) and (max-width: 991.98px) {
  	width: 100%;
  }
`;

const Card = styled.div`
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	height: fit-content;
	margin-bottom: 30px;
`
const PhoneIcon = styled(RatioImage)`
	width: 30px;
	height: 30px;
	margin-left: 15px;
	margin-right: 20px;
	margin-top: -4px;

	flex-shrink: 0;
`
const CallButton = styled.div`
	cursor: ${props => props.disabled ? 'default' : 'pointer'};
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 30px 0;
	background-color: #f5f5f5;
	border: thin solid #ccc;
	opacity: ${props => props.disabled ? 0.3 : 1};

	@media (min-width: 0px) and (max-width: 991.98px) {
  	padding: 15px 0;
  }
`
const ReviewButton = styled.div`
	cursor: pointer;
	width: 100%;
	padding: 30px 0;
	display: ${props => props.disabled ? 'none' : 'flex'};
	justify-content: center;
	align-items: center;
	border: thin solid #ccc;
	background-color: #f5f5f5;

	@media (min-width: 0px) and (max-width: 991.98px) {
  	padding: 15px 0;
  }
`

const CardBody = styled.div`
	padding: 20px 50px 0;
	> div {
		display: flex;
		padding: 30px 0;
		border-bottom: thin solid #00000020;
		> p {
			line-height: 1.2em;
			:nth-of-type(1) {
				flex: 4;
				flex-shrink: 0;
				word-break: keep-all;
				margin-right: 10px;
			}
			:nth-of-type(2) {
				flex: 8;
			}
		}
		> a {
			line-height: 1.2em;
			flex: 8;
		}

		:nth-of-type(4), :nth-of-type(5) :nth-of-type(6){
			> p:nth-of-type(1) {
				/* margin-bottom: 10px; */
			}
			> p:nth-of-type(2) {
				overflow-y: scroll;
				box-sizing: border-box;
				height: fit-content;
				max-height: 300px;
				box-sizing: border-box;
				padding-bottom: 2px;
			}

			> a {
				overflow-y: scroll;
				box-sizing: border-box;
				height: fit-content;
				max-height: 300px;
				box-sizing: border-box;
				padding-bottom: 2px;
			}
		}
	}
	> div:last-of-type {
		border-bottom: 0;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 0 15px;
    > div {
    	:nth-of-type(4),
    	:nth-of-type(5),
    	:nth-of-type(6),
    	{
				flex-direction: column;
				> p:nth-of-type(1) {
					margin-bottom: 10px;
				}
    	}

    	> p {
				line-height: 1.2em;

			}
			> p:nth-of-type(1) {
				flex: 7;
			}
    }
  }
	@media (min-width: 768px) and (max-width: 1299.98px) {
    padding: 0 30px;
  }
`



const DownloadFile = styled.a`
  overflow: hidden;
  background-color: #f9f9f970;
  text-decoration: none;
`
