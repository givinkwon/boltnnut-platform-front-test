import React, {Component, Fragment} from 'react'
import styled, {css} from 'styled-components'
import Slider from "react-slick";
import {withRouter} from "next/router";
import { inject, observer } from 'mobx-react'

import PortfolioModal from 'PortfolioModal'

import * as Text from 'components/Text'
import RatioImage from 'components/RatioImage'
import Rating from 'components/Rating'

import { WHITE, PRIMARY } from 'static/style'


@inject('Answer', 'Loading')
@observer
class LeftDetailContainer extends Component {
	state = {
		openPortfolioModal: false,
	}

	openPortfolioModal = () => {
		const {Answer, router} = this.props

		const request = Answer.getRequestById(router.query.id)
		const answer = Answer.getAnswerById(router.query.answer_id)
		const partnerId = answer ? answer.partner : -1
		const partner = Answer.getPartnerById(partnerId)

		if(!partner || !partner.portfolio_set.length) {
			return
		}

		this.setState({
			...this.state,
			openPortfolioModal: true,
		})
	}
	closePortfolioModal = () => {
		this.setState({
			...this.state,
			openPortfolioModal: false,
		})
	}

	slider = null
  sliderNext = () => {
    this.slider.slickNext()
  }
  sliderPrev = () => {
    this.slider.slickPrev()
  }
  toDetail = (item) => {
    if(!item.disabled){
      Router.push(`/answer/${item.id}`)
    }
  }

	render() {
		const data = this.props.Answer.requests

    var settings = {
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          }
        },
        {
        	breakpoint: 630,
        	settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        }
      ]
    }

		const {Answer, Loading, router} = this.props

		const request = Answer.getRequestById(router.query.id)
		const answer = Answer.getAnswerById(router.query.answer_id)
		const partnerId = answer ? answer.partner : -1
		const partner = Answer.getPartnerById(partnerId)

		return (
			<Card>
				<CardHead>
					<div onClick={() => {router.back()}}>
						<button>
							<ArrowLeft src="/static/icon/left-arrow-white.png" />
						</button>
						<Text.FontSize18 color={WHITE} fontWeight={"lighter"}>
							제안서 리스트 다시보기
						</Text.FontSize18>
					</div>
                    {/*roomname = reqeust(id)_answer(id)*/}
					<div onClick={() => {router.push('/chat/' + location.pathname.split('/')[2] + '_' + location.pathname.split('/')[4])}}>
						<Text.FontSize18 color={WHITE} fontWeight={600}>
							지원한 전문 제조사
						</Text.FontSize18>

						<Text.FontSize18 color={WHITE} fontWeight={600}>
							{Answer.answers_count} 명
						</Text.FontSize18>
					</div>
				</CardHead>

				<CardBody>
					<div>
						<Avatar src={partner && partner.logo}/>
						<div>
							<Text.FontSize20 color="#404040" fontWeight={700}>
								{partner && partner.name}
							</Text.FontSize20>
							<Text.FontSize11 color="#898989">
								{partner && partner.info_biz}
							</Text.FontSize11>

							<RatingBox>
								<div>
									<Rating rating={partner && partner.avg_score} />
								</div>

								<div>
									<Text.FontSize16 color="#4d4f5c" fontWeight={500}>
	            			{partner && Number(partner.avg_score).toFixed(1)}
	          			</Text.FontSize16>
	          			<Text.FontSize11 color="#4d4f5c" fontWeight={500}>
										({partner && partner.review_set.length}개)
	          			</Text.FontSize11>
		        		</div>
        			</RatingBox>
      			</div>
      		</div>

      		<div>
      			<div>
							<Text.FontSize18 color={PRIMARY} fontWeight={700}>
								회사소개
							</Text.FontSize18>
							<Text.FontSize16 color="#676769">
								{partner && partner.info_company}
							</Text.FontSize16>
						</div>

						<div>
							<Text.FontSize18 color={PRIMARY} fontWeight={700}>
								의뢰분야
							</Text.FontSize18>

							<Category>
								{
									request && request.category.map((categoryId, idx) => {
										const category = Answer.getDevelopCategoryById(categoryId)
										return (
											<Text.FontSize12 key={idx} color="#4d4f5c">
												{category && category.category}
											</Text.FontSize12>
										)
									})
								}

							</Category>
						</div>

						<div>
							<Text.FontSize18 color={PRIMARY} fontWeight={700}>
								주요 거래처
							</Text.FontSize18>

							<Customer>
								<Text.FontSize16 color="#4d4f5c">
									{partner && partner.deal}
								</Text.FontSize16>
							</Customer>
						</div>

						<div>
							<Text.FontSize18 color={PRIMARY} fontWeight={700}>
								추가 정보
							</Text.FontSize18>

							<ExtraInfo>
								<Text.FontSize16 color="#4d4f5c" fontWeight={700}>
									설립연도
								</Text.FontSize16>
								<Text.FontSize16 color="#4d4f5c">
									{partner && partner.career}
								</Text.FontSize16>

								<Text.FontSize16 color="#4d4f5c" fontWeight={700}>
									직원수
								</Text.FontSize16>
								<Text.FontSize16 color="#4d4f5c">
									{partner && partner.employee}명
								</Text.FontSize16>
							</ExtraInfo>
						</div>

                        {/*
						<div>
							<Text.FontSize18 color={PRIMARY} fontWeight={700}>
								가능 제품 분야
							</Text.FontSize18>

							<ExtraInfo>
								{
									partner && partner.product_possible &&
										partner.product_possible.map(
											(item) => (
												<Text.FontSize16 key={item.id} color="#4d4f5c">
													{item.subclass}
												</Text.FontSize16>
											)
										)
								}
							</ExtraInfo>
						</div>
                        */}
						<div>
							<Text.FontSize18 color={PRIMARY} fontWeight={700}>
								진행한 제품
							</Text.FontSize18>

							<ExtraInfo>
								{
									partner && partner.product_history &&
										partner.product_history.map(
											(item, idx) => (
												<Text.FontSize16 key={item.id} color="#4d4f5c">
													{item.subclass}
												</Text.FontSize16>
											)
										)
								}
							</ExtraInfo>
						</div>
		      </div>

		      <div>
		      	<PortfolioLabel active={partner && partner.portfolio_set.length}>
			      	<Text.FontSize18 color={PRIMARY} fontWeight={700}>
								포트폴리오
							</Text.FontSize18>
							{/*<Text.FontSize12 color="#898989" onClick={this.openPortfolioModal}>
								더보기
							</Text.FontSize12>*/}
						</PortfolioLabel>

						<PortfolioBox>
							<Slider {...settings} ref={slider => (this.slider = slider)}>
								{
									partner && partner.portfolio_set &&
										partner.portfolio_set.map((item, idx) => {
											return (
												<PortfolioItem key={idx} src={item.img_portfolio} />
											)
										}
									)
								}
							</Slider>
							{
								partner && partner.portfolio_set.length ?
									<Fragment>
										<Arrow left onClick={this.sliderPrev}/>
	        					<Arrow right onClick={this.sliderNext}/>
	        				</Fragment>
	        				:
	        				<Fragment />
          		}
						</PortfolioBox>

						<PortfolioModal
							portfolio_set={partner && partner.portfolio_set}
							open={this.state.openPortfolioModal}
							handleClose={this.closePortfolioModal}
						/>
		      </div>

		      <Button onClick={() => this.props.setTab(2)}>
						<Text.FontSize18 color={WHITE} fontWeight={700}>
							제조사 정보 자세히 보기
						</Text.FontSize18>
					</Button>
				</CardBody>
			</Card>
		)
	}
}

export default withRouter(LeftDetailContainer)

const Arrow = styled.div`
  position: absolute;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  width: 30px;
  height: 30px;
  display: block;
  top: calc(50% - 15px);
  ${props => props.left && css`
    background-image: url('/static/icon/slick_left.png');
    left: -15px;
  `}
  ${props => props.right && css`
    background-image: url('/static/icon/slick_right.png');
    right: -15px;
  `}

  @media (min-width: 630px) and (max-width: 991.98px) {
		top: calc(50% - 15px);
  }
`
const ArrowLeft = styled(RatioImage)`
	width: 14px;
	margin-right: 4px;
	margin-top: 5px;
`

const Avatar = styled(RatioImage)`
	width: 72px;
	height: 72px;
	border-radius: 50%;
	border: 2px solid ${PRIMARY};
	box-sizing: border-box;
	margin-top: 10px;
	margin-right: 8px;
	flex-shrink: 0;
	@media (min-width: 0px) and (max-width: 991.98px) {
		width: 66px;
		height: 66px;
		margin-right: 12px;
	}
`

const Card = styled.div`
  margin-bottom: 30px;

	@media (min-width: 0px) and (max-width: 991.98px) {
  	width: 100%;
  }
  @media (min-width: 992px) {
    width: 260px;
    margin-right: 30px;
  }
`
const CardHead = styled.div`
	padding: 15px 20px;
	background-color: ${PRIMARY};
	button {
		padding: 0;
    background-color: inherit;
    border: none;
    :focus {
    	outline: 0;
    }
	}
	> div {
		:nth-of-type(1) {
			cursor: pointer;

			display: flex;
			justify-content: center;
			align-items: center;

	    height: 30px;
    	box-sizing: border-box;
			padding-bottom: 8px;
			border-bottom: 1px solid #c0c0c050;
		}
		:nth-of-type(2) {
			display: flex;
			justify-content: center;
			align-items: center;

			padding-top: 8px;
			height: 30px;
    	box-sizing: border-box;
    	> p {
    		:nth-of-type(1) {
    			margin-right: 10px;
    		}
    	}
		}
	}
`
const CardBody = styled.div`
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
	padding: 18px 12px;
	margin-top: 4px;
	p {
		line-height: 1.3em;
	}
	> div {
		:nth-of-type(1) {
			display: flex;
			padding-bottom: 15px;
			border-bottom: thin solid #ccc;
			> div {
				:nth-of-type(2) {
					flex-grow: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
				}
				> p {
					:nth-of-type(1) {
						margin-top: 12px;
					}
					:nth-of-type(2) {
						word-break: keep-all;
						margin-top: 5px;
						margin-bottom: 7px;
					}
				}
			}	
		}

		:nth-of-type(2) {
			> div > p {
				:nth-of-type(1) {
					margin-top: 18px;
					line-height: 27px;
				}
				:nth-of-type(2) {
					margin-left: 2px;
				}
			}
		}
		
		:nth-of-type(2),
		:nth-of-type(3),
		:nth-of-type(4) {
			padding: 0 10px;
		}
	}
`
const RatingBox = styled.div`
	display: flex;
	> div {
		margin-right: 4px;
	}
	/* 평균 평점 */
	> div:nth-of-type(2) > p:nth-of-type(1) {
		padding-top: 4px;
	}
	
	@media (min-width: 0px) and (max-width: 991.98px) {
		margin-left: auto;
	}
`

const Button = styled.div`
	cursor: pointer;
	background-color: ${PRIMARY};
	padding: 10px 15px !important;
	margin-top: 40px;
	border-radius: 23px;
	> p {
		text-align: center;
	}
`

const Category = styled.div`
	padding: 8px;
	padding-bottom: 4px;
	background-color: #f3f3f3;
	> p {
		display: inline-block;
		background-color: ${WHITE};
		padding: 4px;
		margin-right: 4px;
		margin-bottom: 4px;
		border-radius: 4px;
	}
`

const Customer = styled.div`
	padding-bottom: 5px;
	border-bottom: thin solid #ccc;
	margin-left: 2px;
	> p {
		display: inline-block;
		line-height: 24px;
		margin-right: 10px;
	}
`
const ExtraInfo = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding-bottom: 5px;
	border-bottom: thin solid #ccc;
	margin-left: 2px;
	> p {
		display: inline-block;
		line-height: 21px;
		margin-right: 10px;
	}
`
const PortfolioLabel = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 18px;
	height: 27px;
	> p {
		:nth-of-type(2) {
			cursor: ${props => props.active ? 'pointer' : 'default'};
			text-decoration: underline;
		}
	}
`
const PortfolioBox = styled.div`
	position: relative;

	.slick-arrow {
		display: none !important;
	}

	.slick-track {
		display: flex;
		align-items: center;
	}

	.slick-slide > div {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 4px;
	}

	@media (min-width: 0px) and (max-width: 629.98px) {
		.slick-track > div {
		}
  }
`

const PortfolioItem = styled.img`
`
