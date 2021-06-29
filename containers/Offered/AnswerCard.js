import React from 'react'
import styled from 'styled-components'
import {inject, observer} from "mobx-react"

import ReviewCard from 'ReviewCard'

import * as Text from 'components/Text'

import * as FormatUtils from 'utils/format'

import { PRIMARY, WHITE } from 'static/style'
import RatioImage from "components/RatioImage"

@inject('Offered')
@observer
class AnswerCard extends React.Component {
	state = {
		mode_update: false,
	}

	setUpdateMode = () => {
		this.setState({
			...this.state,
			mode_update: true,
		})
	}

	updateAnswer = () => {
		const {Offered} = this.props

		Offered.updateAnswer();
		this.setState({
			...this.state,
			mode_update: false,
		})
	}
    setInputCategory = (e) => {
		this.props.Offered.input_category = e.target.value;
	}
	setInputPeople = (e) => {
		this.props.Offered.input_people = e.target.value;
	}
	setInputStrategy = (e) => {
		this.props.Offered.input_strategy = e.target.value;
	}
	setInputPrice = (e) => {
		this.props.Offered.input_price = e.target.value;
	}
	setInputPeriod = (e) => {
		this.props.Offered.input_period = e.target.value;
	}
	setInputDay = (e) => {
		this.props.Offered.input_day = e.target.value;
	}
	setInputAll_price = (e) => {
		this.props.Offered.input_all_price = e.target.value;
	}
	setInputExpert = (e) => {
		this.props.Offered.input_expert = e.target.value;
	}


	render() {
		const {mode_update} = this.state
		const {Offered, orderEnum, order} = this.props
		const answer = Offered.current_answer
		const review = Offered.current_review

		if(answer && !Offered.load_input) {
			Offered.load_input = true
			Offered.input_category = answer.category
			Offered.input_people = answer.people
			Offered.input_strategy = answer.strategy
			Offered.input_period = answer.period
			Offered.input_price = answer.price
			Offered.input_day = answer.day
			Offered.input_all_price = answer.all_price
			Offered.input_expert = answer.expert

		}

		return (
			<Card>
				<CardTitle complete={order === 1} cancel={order === 2}>
					<Text.FontSize28 color={WHITE} fontWeight={700}>
						제안서
					</Text.FontSize28>

					<Text.FontSize18 color={order === 0 ? PRIMARY : order === 1 ? '#fff' : '#404040' } fontWeight={700}>
						{orderEnum[order].name}
					</Text.FontSize18>
				</CardTitle>
				<CardBody>
					<UpdateButton>
					</UpdateButton>
					<div>
						<Text.FontSize20 color={PRIMARY} fontWeight={700}>
							개발분야
						</Text.FontSize20>

						{
							!mode_update ? (
									<ReadOnlyTextField>
										<Text.FontSize20 color="#404040" fontWeight={300}>
											{answer && answer.category}
										</Text.FontSize20>
									</ReadOnlyTextField>
								)
								: (
									<TextArea
										value={Offered.input_category}
										rows={6}
										onChange={this.setInputCategory}
									/>
								)
						}
					</div>

					{/* 개발투입인원 */}
					<div>
						<Text.FontSize20 color={PRIMARY} fontWeight={700}>
							개발투입인원
						</Text.FontSize20>

						{
							!mode_update ? (
									<ReadOnlyTextField>
										<Text.FontSize20 color="#404040" fontWeight={300}>
											{answer && answer.people}
										</Text.FontSize20>
									</ReadOnlyTextField>
								)
								: (
									<TextArea
										value={Offered.input_people}
										rows={6}
										onChange={this.setInputPeople}
									/>
								)
						}
					</div>

                    {/* 예상 개발 기능 */}
					<div>
						<Text.FontSize20 color={PRIMARY} fontWeight={700}>
							예상 개발 기능
						</Text.FontSize20>

						{
							!mode_update ? (
									<ReadOnlyTextField>
										<Text.FontSize20 color="#404040" fontWeight={300}>
											{answer && answer.strategy}
										</Text.FontSize20>
									</ReadOnlyTextField>
								)
								: (
									<TextArea
										value={Offered.input_strategy}
										rows={6}
										onChange={this.setInputStrategy}
									/>
								)
						}
					</div>

                    {/* 예상 개발 기간 */}
					<div>
						<Text.FontSize20 color={PRIMARY} fontWeight={700}>
							예상 개발 기간
						</Text.FontSize20>

						{
							!mode_update ? (
									<ReadOnlyTextField>
										<Text.FontSize20 color="#404040" fontWeight={300}>
											{answer && answer.period}
										</Text.FontSize20>
									</ReadOnlyTextField>
								)
								: (
									<TextArea
										value={Offered.input_period}
										rows={6}
										onChange={this.setInputPeriod}
									/>
								)
						}
					</div>

                    {/* 총 개발 기간 */}
					<div>
						<Text.FontSize20 color={PRIMARY} fontWeight={700}>
							총 개발 기간
						</Text.FontSize20>

						<div>
							<div>
								{
									!mode_update ? (
											<ReadOnlyStringField type="day">
												<Text.FontSize20 color="#404040" fontWeight={300}>
													{answer && FormatUtils.intcomma(answer.day)}
												</Text.FontSize20>
											</ReadOnlyStringField>
										)
										: (
											<Input
												type="number"
												value={Offered.input_day}
												onChange={this.setInputDay}
											/>
										)
								}

								<Text.FontSize20 color="#404040" fontWeight={300}>
									영업일
								</Text.FontSize20>
							</div>
						</div>
					</div>

					{/* 예상 견적 */}
					<div>
						<Text.FontSize20 color={PRIMARY} fontWeight={700}>
							예상 견적
						</Text.FontSize20>

						<div>
							<div>
								{
									!mode_update ? (
											<ReadOnlyStringField type="all_price">
												<Text.FontSize20 color="#404040" fontWeight={300}>
													{answer && FormatUtils.intcomma(answer.all_price)}
												</Text.FontSize20>
											</ReadOnlyStringField>
										)
										: (
											<Input
												type="number"
												value={Offered.input_all_price}
												onChange={this.setInputAll_price}
											/>
										)
								}

								<Text.FontSize20 color="#404040" fontWeight={300}>
									만원
								</Text.FontSize20>
							</div>
						</div>
					</div>

					{/* 관련 경험 및 이력 */}
					<div>
						<Text.FontSize20 color={PRIMARY} fontWeight={700}>
							관련 경험 및 이력
						</Text.FontSize20>

						{
							!mode_update ? (
									<ReadOnlyTextField>
										<Text.FontSize20 color="#404040" fontWeight={300}>
											{answer && answer.expert}
										</Text.FontSize20>
									</ReadOnlyTextField>
								)
								: (
									<TextArea
										value={Offered.input_expert}
										rows={6}
										onChange={this.setInputExpert}
									/>
								)
						}
					</div>

                    {/* 첨부 파일 */}
                    <div>
                        <Text.FontSize20 color={PRIMARY} fontWeight={600}>
                            첨부 파일
                        </Text.FontSize20>

                        <DownloadFile target="_blank" href={answer && answer.file} download>
                            <Text.FontSize20 color="#404040" fontWeight={300}>
                                {
                                    answer && answer.file ?
                                    answer.file.split('/').pop()
                                    : '첨부 파일이 없습니다'
                                }
                            </Text.FontSize20>
                            <RatioImage src="/static/icon/download_file.svg" />
                        </DownloadFile>
                    </div>


					{/* 리뷰 내용 */}
					{
						/* 미팅 완료 */
						(order === orderEnum[1].id && review)
							? (
								<div>
									<Text.FontSize20 color={PRIMARY} fontWeight={700}>
										리뷰 내용
									</Text.FontSize20>

									<ReviewCard />
								</div>
							)
							: null
					}
				</CardBody>

				<CardFooter onClick={() => {
					if(mode_update) {
						this.updateAnswer()
					}
					else {
						this.setUpdateMode()
					}
				}}>
					<Text.FontSize20 color={WHITE} fontWeight={700}>
						{ mode_update ? '수정완료' : '수정하기' }
					</Text.FontSize20>
				</CardFooter>
			</Card>
		)
	}
}

export default AnswerCard

const Card = styled.div`
	display: flex;
	flex-direction: column;
	height: fit-content;
	
	@media (min-width: 0px) and (max-width: 991.98px) {
		margin-bottom: 32px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {

  }

  @media (min-width: 992px) and (max-width: 1299.98px) {

  }

  @media (min-width: 1300px) {

  }

  flex: 7;
  margin-top: -1px;
	position: relative;
	border: 1px solid #efefef;
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.09);
`
const CardTitle = styled.div`
	background-color: ${PRIMARY};
	padding: 24px 50px 26px;

	display: flex;
	justify-content: space-between;
	align-items: center;
	>p:nth-of-type(2) {
		background-color: ${props => props.complete ? '#ed7d31' : props.cancel ? '#f2f2f2' : WHITE};
		padding: 8px 13px 6px;
		border-radius: 17px;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 15px 20px 17px;
  }
`

const CardBody = styled.div`
	background-color: ${WHITE};
	padding: 0 40px;
	p {
		line-height: 1.3em;
	}
	>div {
		border-bottom: 1px solid #dadbe6;
		padding: 30px 15px;
		display: flex;

		/* 라벨 */
		>p:nth-of-type(1) {
			width: 135px;
			flex-shrink: 0;
		}
	}
	>div:last-child {
		border-bottom: none;
	}

	>div {
		:nth-of-type(6),
		:nth-of-type(7) {
			>div {
				display: flex;
				align-items: center;
			}
			>p:nth-of-type(1) {
				display: flex;
				align-items: center;
			}
		}
	}

	>div {
	    :nth-of-type(2),
	    :nth-of-type(3),
		:nth-of-type(4),
		:nth-of-type(5),
		:nth-of-type(8)
		 {
		    overflow-y : hidden !important;
			flex-direction: column;
			>p {
				width: 100% !important;
				margin-bottom: 24px;
			}
		}
	}

	>div>div>div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 0 15px;
		>div {
			padding: 20px 0;
		}

		/* 라벨 */
		>div>p:nth-of-type(1) {
			width: 50px;
		}

		>div {
			:nth-of-type(2),
			:nth-of-type(3) {
				align-items: center;
				>div {
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
				>div>div {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				/* 라벨 */
				>p:nth-of-type(1) {
				}
			}

			:nth-of-type(4),
			:nth-of-type(5) {
				flex-direction: column;
				>p {
					margin-bottom: 12px;
				}
			}
		}
  }
`

const CardFooter = styled.div`
	margin-top: auto;

	width: 100%;
	background-color: ${PRIMARY};
	padding: 15px 0;

	display: flex;
	justify-content: center;

	cursor: pointer;
`

const ReadOnlyTextField = styled.div`
	box-sizing: border-box;
	background-color: ${WHITE};
	border: 1px solid #dadbe6;
	border-radius: 8px;
	padding: 20px 25px;
	margin: 0 -15px;

	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 10px 10px;
		margin: 0;
		
		> p {
			max-height: 200px !important;

		}
	}
	
	> p {
		max-height: 300px;

	}
`
const ReadOnlyStringField = styled.div`
	padding: 5px 12px;
	background-color: ${WHITE};
	border: 1px solid #dadbe6;
	border-radius: 5px;
	margin: 0 15px;
`

const UpdateButton = styled.div`
	border-bottom: none !important;
	padding: 0 !important;

	display: flex;
	justify-content: flex-end;

	> p {
		width: fit-content;
		padding: 4px;
		cursor: pointer;
	}
`

const Input = styled.input`
	color: #404040;
	border-radius: 5px;
	border: 1px solid #dadbe6;
	padding: 5px 12px;
	margin: 0 15px;
	
	box-sizing: border-box;
	max-width: 200px;
	
	@media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
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
const TextArea = styled.textarea`
	padding: 10px;
	color: #404040;
	resize: none;
	
	border-radius: 5px;
	border: 1px solid #dadbe6;

	::placeholder {
		@media (min-width: 0px) and (max-width: 767.98px) {
			font-size: 14px;
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
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
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
