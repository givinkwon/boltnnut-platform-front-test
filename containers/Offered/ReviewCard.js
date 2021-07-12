import React, {Component} from 'react'
import styled from 'styled-components'

import * as Text from 'components/Text'
import RatioImage from 'components/RatioImage'
import Rating from 'components/Rating'

import { PRIMARY, WHITE } from 'static/style'
import {inject, observer} from "mobx-react";


@inject('Offered')
@observer
class ReviewCard extends Component {
	render() {
		const {Offered} = this.props
		const review = Offered.current_review
		const client = Offered.current_client
		let protectedUsername = ''
		if(client) {
			protectedUsername = client.user.username.split('@')[0]
			protectedUsername = protectedUsername.substring(0, protectedUsername.length-3)
		}

		return (
			<Card>
				<CardTitle>
					<div style={{display: 'flex'}}>
						<Text.FontSize28 color={PRIMARY} fontWeight={500}>
							{protectedUsername}***
						</Text.FontSize28>
						<Text.FontSize28 color={PRIMARY} fontWeight={300}>&nbsp;님</Text.FontSize28>
					</div>
					<div>
						<Rating rating={review && Number(review.avg_score).toFixed(0)} />
						<Text.FontSize24 color="#484747"
														 fontWeight={500}
														 style={{fontFamily: 'Montserrat, sans-serif', marginBottom: -4}}>
							{review && Number(review.avg_score).toFixed(1)}
						</Text.FontSize24>
					</div>
				</CardTitle>

				<CardBody>
					<div>
						<div>
							<Text.FontSize16 color="#4d4f5c" fontWeight={700}>
								의사소통
							</Text.FontSize16>

							<Rating rating={review && Number(review.talk_score).toFixed(0)} />
							<Text.FontSize16 color="#484747" fontWeight={500}>
								{review && Number(review.talk_score).toFixed(1)}
							</Text.FontSize16>
						</div>
						<div>
							<Text.FontSize16 color="#4d4f5c" fontWeight={700}>
								전문성
							</Text.FontSize16>

							<Rating rating={review && Number(review.expert_score).toFixed(0)} />
							<Text.FontSize16 color="#484747" fontWeight={500}>
								{review && Number(review.expert_score).toFixed(1)}
							</Text.FontSize16>
						</div>
						<div>
							<Text.FontSize16 color="#4d4f5c" fontWeight={700}>
								일정 만족도
							</Text.FontSize16>

							<Rating rating={review && Number(review.time_score).toFixed(0)} />
							<Text.FontSize16 color="#484747" fontWeight={500}>
								{review && Number(review.time_score).toFixed(1)}
							</Text.FontSize16>
						</div>
						<div>
							<Text.FontSize16 color="#4d4f5c" fontWeight={700}>
								가격 만족도
							</Text.FontSize16>

							<Rating rating={review && Number(review.price_score).toFixed(0)} />
							<Text.FontSize16 color="#484747" fontWeight={500}>
								{review && Number(review.price_score).toFixed(1)}
							</Text.FontSize16>
						</div>
						<div>
							<Text.FontSize16 color="#4d4f5c" fontWeight={700}>
								신뢰성
							</Text.FontSize16>

							<Rating rating={review && Number(review.result_score).toFixed(0)} />
							<Text.FontSize16 color="#484747" fontWeight={500}>
								{review && Number(review.result_score).toFixed(1)}
							</Text.FontSize16>
						</div>
					</div>

					<div>
						<LabelWrapper>
							<Text.FontSize16 color="#676769" fontWeight={500}>
								미팅 후기
							</Text.FontSize16>
						</LabelWrapper>
						<ReviewContent>
							<Text.FontSize16 color="#676769">
								{review.content_good ? review.content_good : '비어있음'}
							</Text.FontSize16>
						</ReviewContent>

						<LabelWrapper>
							<Text.FontSize16 color="#676769" fontWeight={500}>
								계약 후기
							</Text.FontSize16>
						</LabelWrapper>

						<ReviewContent>
							<Text.FontSize16 color="#676769">
								{review.content_bad ? review.content_bad : '비어있음'}
							</Text.FontSize16>
						</ReviewContent>
					</div>
				</CardBody>
			</Card>
		)
	}
}

export default ReviewCard

const Card = styled.div`
	padding: 34px 38px;
  border: 1px solid #dadbe6;
  border-radius: 8px;

	p {
		padding-top: 2px;
	}

  @media (max-width: 1299.98px) { 
  	padding: 15px 15px;
  }
`
const CardTitle = styled.div`
	border-bottom: 1px solid #dadbe6;
	padding-bottom: 20px;
	margin-bottom: 40px;
	display: flex;
	justify-content: space-between !important;
	align-items: flex-end !important;

	>div {
		display: flex;
		align-items: flex-end;
	}
	>div:nth-of-type(2) {
		>p {
			margin-left: 10px;
		}
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
		flex-direction: column;
		align-items: flex-start !important;
		padding-bottom: 10px;

		>div:nth-of-type(2) {
			margin: 16px auto 0;
			
			>p {
				margin-bottom: 0 !important;
			}
		}
	}
	@media (max-width: 1299.98px) { 
		margin-bottom: 20px;
  }
`
const CardBody = styled.div`
	display: flex;
	flex-direction: row-reverse;
	align-items: flex-start !important;

	/* 리뷰 평점 리스트 */
	>div:nth-of-type(1) {
		>div {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #dadbe6;
			padding: 6px 0;
			margin-left: 20px;
			>p:nth-of-type(1) {
				flex-shrink: 0;
				width: 120px;
				margin-right: 8px;
				margin-bottom: 4px;
			}
			>p:nth-of-type(2) {
				margin-left: 8px;
			}
			>p:last-of-type {
				font-family: 'Montserrat, sans-serif';
			}
			:last-child {
				border-bottom: none;
			}
		}
	}

	/* 리뷰 내용 */
	>div:nth-of-type(2) {
		flex-shrink: 0;
		flex: 1;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		display: block !important;
		>div:nth-of-type(1) {
			>div {
				margin-left: 0;
			}
			margin-bottom: 20px;
		}
		>div:nth-of-type(1) >div >p:nth-of-type(1) {
			width: 90px;
			margin-right: auto;
		}
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) { 
  }
`
const Avatar = styled(RatioImage)`	
	width: 66px;
	height: 66px;
	flex-shrink: 0;
	margin-right: 10px;
`


const LabelWrapper = styled.div`
  margin-bottom: 10px;
`;
const ReviewContent = styled.div`
  margin-bottom: 25px;
  
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  max-height: 300px;
  overflow-y: scroll;
  
  :last-of-type {
    margin-bottom: 0;
  }
`;