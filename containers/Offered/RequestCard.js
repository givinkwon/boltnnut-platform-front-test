import React from 'react'
import styled from 'styled-components'

import * as Text from 'components/Text'
import DownloadFile from 'components/DownloadFile'
import RequestArea from 'components/RequestArea'

import * as FormatUtils from 'utils/format'

import { PRIMARY, WHITE } from 'static/style'
import {inject, observer} from "mobx-react";

@inject('Offered', 'Answer')
@observer
class RequestCard extends React.Component {
	render() {
		const {Offered, Answer} = this.props
		const request = Offered.current_request
		const product = request ? Answer.getSubclassById(request.product) : null
		const mainCategory = product ? Answer.getDevelopBigCategoryById(product.maincategory) : null
		const selectSaves = Offered.select_saves

		console.log(Answer.subclasses)

		return (
			<Card>
				<CardTitle>
					<Text.FontSize28 color={WHITE} fontWeight={700}>
						의뢰내용
					</Text.FontSize28>
				</CardTitle>

				<CardBody>
					{/* 제품 이름 */}
					<div>
						<Text.FontSize20 color={PRIMARY} fontWeight={700}>
							제품 이름
						</Text.FontSize20>
						<Text.FontSize20 color="#404040" fontWeight={300}>
							{product && product.subclass}
						</Text.FontSize20>
					</div>

					{/* 제품 설명 */}
					<div>
						<Text.FontSize20 color={PRIMARY} fontWeight={700}>
							제품 설명
						</Text.FontSize20>
						<ReadOnlyTextField>
							<Text.FontSize20 color="#404040" fontWeight={300}>
								{request && request.content}
							</Text.FontSize20>
						</ReadOnlyTextField>
					</div>

					{/* 희망 기간 */}
					<div>
						<Text.FontSize20 color={PRIMARY} fontWeight={700}>
							희망 기간
						</Text.FontSize20>
						<Text.FontSize20 color="#404040" fontWeight={300}>
							{request && request.day}일
						</Text.FontSize20>
					</div>

					{/* 희망 견적 */}
					<div>
						<Text.FontSize20 color={PRIMARY} fontWeight={700}>
							희망 견적
						</Text.FontSize20>
						<Text.FontSize20 color="#404040" fontWeight={300}>
							{request && FormatUtils.intcomma(request.price)}만원
						</Text.FontSize20>
					</div>

					{/* 첨부 파일 */}
					<div>
						<Text.FontSize20 color={PRIMARY} fontWeight={700}>
							첨부 파일
						</Text.FontSize20>

						<DownloadFile file={request && request.file} />
					</div>

					{/* 의뢰 분야 */}
					<RequestArea
						mainCategory={mainCategory}
						selectSaves={selectSaves}
						small
					/>
				</CardBody>
			</Card>
		)
	}
}

export default RequestCard

const Card = styled.div`
	@media (min-width: 0px) and (max-width: 991.98px) {
		width: 100%;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		margin-bottom: 50px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
		margin-bottom: 50px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {

  }

  @media (min-width: 1300px) {

  }

  flex: 4;
  width: 30%;
`
const CardTitle = styled.div`
	background-color: ${PRIMARY};
	box-sizing: border-box;
	padding: 27px 50px;

	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 15px 20px;
  }
	@media (min-width: 992px) and (max-width: 1299.98px) {
		padding: 28px 25px;
  }
`
const CardBody = styled.div`
	background-color: #f2f2f260;
	padding: 0 40px;
	height: calc(100% - 84px);
	p {
		line-height: 1.3em;
		word-break: keep-all;
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

	>div:nth-of-type(2) {
		flex-direction: column;
		>p {
			margin-bottom: 24px;
		}
	}
	/* 첨부파일 */
	>div:nth-of-type(5) {
		display: flex;
		flex-direction: column;
		> p {
			margin-bottom: 12px;
		}
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 0 15px;
		>div {
			padding: 20px 0;
		}

		/* 라벨 */
		>div>p:nth-of-type(1) {
			width: 100px;
		}

		>div:nth-of-type(2) {
			flex-direction: column;
			>p {
				margin-bottom: 12px;
				
				max-height: 300px;
				overflow-y: scroll;
			}
		}
		>div:nth-of-type(5) {
			>a {
				margin-left: 0;
			}
		}
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
		>div:nth-of-type(5) {
			>a {
				margin-left: 0px;
			}
		}
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
		padding: 0 15px;
		>div {
			padding: 20px 15px;
		}

		/* 라벨 */
		>div>p:nth-of-type(1) {
			width: 100px;
		}

		>div {
			:nth-of-type(2),
			:nth-of-type(5) {
				flex-direction: column;
				align-items: flex-start;
				>p {
					margin-bottom: 12px;
				}
			}

		}
  }
`
const ReadOnlyTextField = styled.div`
	width: 100%;
	box-sizing: border-box;
	background-color: white;
	border: 1px solid #dadbe6;
	border-radius: 8px;
	padding: 20px 25px;
	margin: 0;
	>p {
		word-break: break-all;
	}

	@media (min-width: 0px) and (max-width: 767.98px) {
		padding: 10px 10px;
		margin: 0;
	}
	@media (min-width: 768px) and (max-width: 1299.98px) {
		padding: 10px 15px;
  }
`
