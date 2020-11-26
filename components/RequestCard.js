import React, {Component} from 'react'
import styled from 'styled-components'
import 'intersection-observer'; // polyfill
import Observer from '@researchgate/react-intersection-observer';
import {inject, observer} from "mobx-react";

import * as Text from 'components/Text'

import * as FormatUtils from 'utils/format'

import {PRIMARY, WHITE, DARKGRAY} from "static/style"


@inject('Answer')
@observer
class RequestCard extends Component {
	static defaultProps = {
    observer: false,
		handleIntersection: function () {
    	console.log('handleIntersection 함수를 전달해주세요')
		}
  }

	render() {

		const {Answer, observer, request, buttonName, handleClick, handleIntersection} = this.props

		const options = {
			onChange: handleIntersection,
		};

		let mainCategory, category, subclass = null
		if(request) {
			subclass = Answer.getSubclassById(request.product)
			category = subclass && Answer.getCategoryById(subclass.category)
			mainCategory = subclass && Answer.getMainCategoryById(subclass.maincategory)
		}

		if(subclass && subclass.subclass === '전자레인지') {
			console.log(subclass.category)
			console.log(mainCategory)
		}

		return (
			<Card>
				<Tag active={request && request.active && request.examine}>
					<Text.FontSize16 color={WHITE} fontWeight={600}>
						{request && request.examine ? (request.active ? '모집중' : '모집완료') : ('검토중') }
					</Text.FontSize16>
				</Tag>

				<CardBody>
					<Title>
						{
							observer
								? (
									<Observer {...options}>
	                  <Text.FontSize32 color={PRIMARY} fontWeight={600}>
											{request && request.name}
										</Text.FontSize32>
	                </Observer>
                )
                : (
                	<Text.FontSize32 color={PRIMARY} fontWeight={600}>
										{request && request.name}
									</Text.FontSize32>
              	)
						}

						<Remaining>
							{
								(request && request.active) ? (
									<>
										<Text.FontSize20 color="#404040" fontWeight={300}>
											{Math.abs(FormatUtils.getRemaining(request.created_at))}시간
										</Text.FontSize20>
										<Text.FontSize20 color="#404040" fontWeight={600}>
										&nbsp;{FormatUtils.getRemaining(request.created_at) <= 0 ? '지남' : '남음'}
										</Text.FontSize20>
									</>
								)
								: (
										<>
											<Text.FontSize20 color="#404040" fontWeight={300}>
												모집마감
											</Text.FontSize20>
										</>
								)
							}
						</Remaining>
					</Title>

					<Content>
						<Text.FontSize24 color="#676769" fontWeight={300}>
							{request && request.content && request.content.replace("<p>","").replace("</p>","")}
						</Text.FontSize24>
					</Content>

					<RequestInfo>
						<div>
							{/* 의뢰분야 */}
							<div>
								<Text.FontSize20 color="#404040" fontWeight={600}>
									의뢰분야
								</Text.FontSize20>
								<div>
									{
										request && request.category.map(item => {
											const category = Answer.getDevelopCategoryById(item)
											return (
												<Text.FontSize20 key={item} color="#404040" fontWeight={300}>
													{category && category.category}
												</Text.FontSize20>
											)
										})
									}
								</div>
							</div>

							{/* 제품분야 */}
							<div>
								<Text.FontSize20 color="#404040" fontWeight={600}>
									제품분야
								</Text.FontSize20>
								<div>
									<Text.FontSize20 color="#404040" fontWeight={300}>
										{mainCategory && mainCategory.maincategory} > {category && category.category} > {subclass && subclass.subclass}
									</Text.FontSize20>
								</div>
							</div>
						</div>

						{/*<div>
							<div>
								<Text.FontSize20 color="#404040" fontWeight={600}>
									희망예산
								</Text.FontSize20>
								<div>
									<PriceInfo>
										<Text.FontSize20 color="#404040" fontWeight={300}>
											{request && FormatUtils.intcomma(request.price)}만원
										</Text.FontSize20>
									</PriceInfo>
								</div>
							</div>

							<div>
								<Text.FontSize20 color="#404040" fontWeight={600}>
									희망기간
								</Text.FontSize20>
								<Text.FontSize20 color="#404040" fontWeight={300}>
									{request && request.day}일
								</Text.FontSize20>
							</div>
						</div>*/}
						{
							/*
							<div>
								<div>
									<Text.FontSize20 color="#404040" fontWeight={600}>
										코인
									</Text.FontSize20>
									<Text.FontSize20 color="#404040" fontWeight={300}>
										{request && request.coin}개
									</Text.FontSize20>
								</div>
							</div>
							*/
						}
					</RequestInfo>
				</CardBody>

				<Button id="answer_button" active={request && request.active && request.examine} onClick={request.examine ? handleClick : ''}>
					<Text.FontSize28 id="answer_button_text" color={request.examine ? PRIMARY : DARKGRAY } fontWeight={600}>
						{request.examine ? buttonName : '제안서 검토중'  }
					</Text.FontSize28>
				</Button>
			</Card>
		)
	}
}

export default RequestCard

const Card = styled.div`
	position: relative;
	border: 1px solid #efefef;
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.09);
	margin: 44px 0;

	@media (min-width: 0px) and (max-width: 767.98px) {
	}
`
const Tag = styled.div`
	background-color: ${props => props.active ? PRIMARY : '#898989'};
	position: absolute;
	top: -5px;
	left: -5px;
	padding: 7px 10px;
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
`
const CardBody = styled.div`
	padding: 30px 40px;
	p {
		line-height: 1.3em;
	}
	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 30px 20px 15px;
	}
`

const Title = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;

	box-sizing: border-box;
	padding: 0 0 15px;
	border-bottom: 1px solid #efefef;

	> p {
		line-height: 1.3em;
		max-height: 1.3em;
		overflow: hidden;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		display: block;
		p {
			word-break: keep-all;
		}
		>div {
			width: fit-content;
			margin-top: 12px;
			margin-left: auto;
		}
	}
	@media (min-width: 768px) and (max-width: 991.98px) {
		>p {
			margin-bottom: 3px;
		}
	}
`
const Remaining = styled.div`
	background-color: #e4e6ed50;
	border-radius: 26px;
	padding: 5px 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 5px 15px;
	}
	>p:nth-of-type(1) {
		padding-top: 1px;
	}
`
const Content = styled.div`
	padding: 15px 5px;
	> p {
		line-height: 1.3em;
		max-height: 2.6em;
		overflow: hidden;
	}
	
	@media (min-width: 0px) and (max-width: 767.98px) {
		> p {
			line-height: 1.3em;
			max-height: 3.9em;
			overflow: hidden;
		}
	}
`
const RequestInfo = styled.div`
	padding: 17px 20px;
	background-color: #dededf60;

	>div, >div>div, >div>div>div {
		display: flex;
		align-items: flex-start;
	}
	>div {
		margin-bottom: 12px;
		:last-child {
			margin-bottom: 0;
		}
	}
	>div>div {
		flex: 1;
	}
	/* 2번째 줄 */
	>div:nth-of-type(2) {
		p {
			padding: 3px 8px;
		}
	}
	>div>div>div {
		flex: 1;
		align-items: center;
		flex-wrap: wrap;

		/* 의뢰분야 항목들 */
		>p {
			padding: 3px 8px;
		}
	}
	/* 우선순위 높은 */
	> div > div > p:nth-of-type(1) {
		flex-grow: 0;
		flex-shrink: 0;
		background-color: white;
		padding: 3px 15px;
		margin-right: 15px;
		border-radius: 2px;
	}
	
	/* 코인 */
	> div:nth-of-type(3) {
		> div {
			align-items: center !important;
			
			> p:nth-of-type(1) {
				margin-right: 23px !important;
			}
		}
	}
	
	> div > div {
		> p:nth-of-type(1) {
			width: 75px;
			text-align: center;
		}
	}

	@media (min-width: 0px) and (max-width: 991.98px) {
		padding: 17px 10px;
		>div {
			flex-direction: column;
		}
		>div>div:nth-of-type(1) {
			margin-bottom: 12px;
		}
		> div:nth-of-type(3) {
			>div {
				margin-bottom: 0;
			}
		}
		
		> div > div {
			> p:nth-of-type(1) {
				width: 60px;
				text-align: center;
			}
		}
	}
`
const PriceInfo = styled.div`
	flex: 1;
	display: flex;
	justify-content: space-between;
	margin-right: 10px;
	> div {
		display: flex;
		align-items: flex-start;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		flex-direction: column;
		> div {
			padding-top: 3px;
			padding-left: 8px;
		}
	}
`
const Negotiation = styled.div`
	width: 20px;
	height: 20px;
	background-color: white;
	border: 1px solid #9597a6;
	border-radius: 3px;
	@media (min-width: 992px) { 
		margin-top: 3px;
	}
`

const Button = styled.button`
	cursor: pointer;
	background-color: #efefef60;
	display: flex;
	justify-content: center;
	align-items: center;
	box-sizing: border-box;
	width: 100%;
	padding: 10px 0;
	border: 1px solid ${PRIMARY}60;
	:focus {
		outline: 0;
	}
`
