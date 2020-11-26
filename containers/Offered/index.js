import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'next/router'

import BannerContainer from 'Banner'
import RequestCard from 'RequestCard'
import AnswerCard from 'AnswerCard'

import Order from 'components/Order'
import RequestListCard from 'components/RequestCard'
import Container from 'components/Container'
import {inject, observer} from "mobx-react";
import * as Text from "../../components/Text";
import ButtonSpinner from "../../components/ButtonSpinner";
import {PRIMARY} from "../../static/style";

const data = [
	{id: 1},
	{id: 2},
	{id: 3},
]
const orderEnum = [
	{id: 0, name: '미팅 대기중'},
	{id: 1, name: '미팅 완료'},
	{id: 2, name: '취소된 의뢰'},
]

@inject('Offered', 'Auth', 'Home')
@observer
class OfferedConatiner extends React.Component {

    componentDidMount() {
    const { Home } = this.props
    const userAgent = window.navigator.userAgent;
    console.log(userAgent)
    if(userAgent.indexOf("MSIE ") !== -1 || userAgent.indexOf(".NET") !== -1
      || userAgent.indexOf("Edge") !== -1)
        {
          this.props.Home.is_ie = true;
        }
    }

	pushToNextTab = (requestId) => {
		const {Offered, router} = this.props
		Offered.setCurrent(requestId)
		router.push(router.pathname + '?tab=2')
	}

	setOrder = async (newOrder) => {
		const {Offered, Auth, router} = this.props
		const {tab} = router.query

		if(tab == 2) {
			await router.push(router.pathname + '?tab=1')
			Offered.setOrder(Auth.logged_in_partner.id, newOrder)
		}

		Offered.setOrder(Auth.logged_in_partner.id, newOrder)
	}

	handleIntersection = (event) => {
		if(event.isIntersecting) {
			console.log('추가 로딩을 시도합니다')
			const {Offered} = this.props
			Offered.loadNextAnswerList()
		}
	}

  render(){
  	const {Auth, Offered, router, Home} = this.props
  	const {tab} = router.query
		const data = Offered.requests.sort((a, b) => {
			return a.id > b.id
		})

    return (
      <>
        <BannerContainer/>

        <Order
        	orderEnum={Offered.orderEnum}
        	order={Offered.order}
        	setOrder={this.setOrder}
      	/>

  			<Container>
	  			{
	  				/* tab 1은 제안한 의뢰 목록 확 */
						tab === '1'
							&& (data.length
								? data.map((request, idx) => {
										return (
											<RequestListCard
												key={idx}
												request={request}
												buttonName="제안확인"
												handleClick={() => this.pushToNextTab(request.id)}
												handleIntersection={this.handleIntersection}
												observer={!this.props.Home.is_ie && idx === data.length - 1}
											/>
										)
								})
								: (
									Offered.order === 0
										? (
											<div style={{margin: '100px 0'}}>
												<Text.FontSize32 color={PRIMARY} fontWegiht={600}>
													현재 미팅 대기중인 제안서가 없습니다
												</Text.FontSize32>
											</div>
										)
										: Offered.order === 1
											? (
												<div style={{margin: '100px 0'}}>
													<Text.FontSize32 color={PRIMARY} fontWegiht={600}>
														현재 미팅 완료된 제안서가 없습니다
													</Text.FontSize32>
												</div>
											)
											: (
												<div style={{margin: '100px 0'}}>
													<Text.FontSize32 color={PRIMARY} fontWegiht={600}>
														현재 미팅 취소된 제안서가 없습니다
													</Text.FontSize32>
												</div>
											)
								)
						)
	  			}
	  			{
	  				/* tab 2는 의뢰서 + 제안서 + 리뷰 정보 확인 */
	  				tab === '2' &&
	  					<Wrapper>
	  						<RequestCard />
	  						<AnswerCard
									orderEnum={Offered.orderEnum}
									order={Offered.order}
								/>
	  					</Wrapper>
	  			}

					{
						(tab === 1 && data && Offered.answers_next)
						&& (
							<SpinnerWrapper>
								<Text.FontSize32 color="#404040" fontWeight={600}>
									로딩중
								</Text.FontSize32>
								<ButtonSpinner primary={true} />
							</SpinnerWrapper>
						)
					}
  			</Container>
      </>
    )
  }
}

export default withRouter(OfferedConatiner)

const Wrapper = styled.div`
	margin: 32px 0;
	display: flex;

  @media (min-width: 0px) and (max-width: 991.98px) {
		flex-direction: column-reverse;
  }
`

const SpinnerWrapper = styled.div`
  padding: 0 30%;
  height: 80px; 
  margin-top: 40px;
  >p {
    text-align: center;
  }
  >div {
    width: 30% !important;
  }
`
