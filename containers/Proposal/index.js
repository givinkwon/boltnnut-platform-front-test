import React from 'react'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import BannerContainer from 'Banner'
import RequestContentModal from 'RequestContentModal'
import ProposalModal from 'ProposalModal'
import ConfirmProposalModal from 'ConfirmProposalModal'
import NoticeModal from 'NoticeModal'

import * as Text from "components/Text"
import ButtonSpinner from 'components/ButtonSpinner'
import Order from 'components/Order'
import RequestCard from 'components/RequestCard'
import Container from 'components/Container'


@inject('Proposal', 'Home')
@observer
class ProposalConatiner extends React.Component {
	state = {
		openRequestContentModal: false,
		openProposalModal: false,
		openConfirmProposalModal: false,
		openNoticeModal: true,
	}
    componentDidMount() {
    const { Home } = this.props
    const userAgent = window.navigator.userAgent;
    console.log(userAgent)
    this.body = document.getElementsByTagName('body')[0];
    if(userAgent.indexOf("MSIE ") !== -1 || userAgent.indexOf(".NET") !== -1
      || userAgent.indexOf("Edge") !== -1)
        {
          this.props.Home.is_ie = true;
        }
    }

	openRequestContentModal = (requestId) => {
		const {Proposal} = this.props

		Proposal.setCurrentRequest(requestId)

		{/*if(Proposal.isAlreadyOffered()) {
			alert('이미 제안서를 작성했습니다')
			return
		}
        */}
		this.setState({
			...this.state,
            openRequestContentModal: true,
		})
	}
	closeRequestContentModal = () => {
		this.setState({
			...this.state,
			openRequestContentModal: false,
		})
		if(this.body) {
			this.body.style.overflow = 'scroll';
		}
	}
	openProposalModal = () => {
		this.setState({
			...this.state,
			//openProposalModal: true,
			openConfirmProposalModal: true,
		})
	}
	closeProposalModal = () => {
		this.setState({
			...this.state,
			openProposalModal: false,
		})
		if(this.body) {
			this.body.style.overflow = 'scroll';
		}
	}
	openConfirmProposalModal = () => {
		this.setState({
			...this.state,
			openConfirmProposalModal: true,
		})
	}
	closeConfirmProposalModal = () => {
		this.setState({
			...this.state,
			openConfirmProposalModal: false,
		})
		if(this.body) {
			this.body.style.overflow = 'scroll';
		}
	}

    openNoticeModal = () => {
		this.setState({
			...this.state,
			openNoticeModal: true,
		})
	}
	closeNoticeModal = () => {
		this.setState({
			...this.state,
			openNoticeModal: false,
		})
		if(this.body) {
			this.body.style.overflow = 'scroll';
		}
	}

	handleIntersecion = (event) => {
		// 마지막에서 3번째 노드일 경우 this.props.observer를 true로 주고
		// 추가 로딩을 한다
		if(event.isIntersecting) {
			console.log('요청서 추가 로딩을 시도합니다')
			const {Proposal} = this.props
			Proposal.loadNextRequests()
		}
	}

  render(){
  	const {Proposal, Home} = this.props
		const requests_active = Proposal.requests.filter(request => request.active)
		const requests_non_active = Proposal.requests.filter(request => !request.active)
  	const data = requests_active.concat(requests_non_active)
		console.log(data)

  	const {openNoticeModal, openRequestContentModal, openProposalModal, openConfirmProposalModal} = this.state

    return (
      <>
        <BannerContainer/>
        <NoticeModal
        	open={openNoticeModal}
        	handleClose={this.closeNoticeModal}
        	openNext={this.openNoticeModal}
        />
        <RequestContentModal
        	open={openRequestContentModal}
        	handleClose={this.closeRequestContentModal}
        	openNext={this.openProposalModal}
        />
        {/*<ProposalModal
        	open={openProposalModal}
        	handleClose={this.closeProposalModal}
        	openNext={this.openConfirmProposalModal}
        />*/}
        <ConfirmProposalModal
        	open={openConfirmProposalModal}
        	handleClose={this.closeConfirmProposalModal}
        	closeProposalModal={this.closeProposalModal}
        />

        {/*<Order
     			orderEnum={Proposal.order_enum}
        	order={Proposal.order}
        	setOrder={Proposal.setOrder}
      	/>*/}

  			<Container>
	  			{
	  				data && data.map((request, idx) => {
	  					return (
	  						<RequestCard
	  							key={request.id}
	  							buttonName="의뢰내용 보기"
	  							observer={!this.props.Home.is_ie && idx === data.length - 3}
	  							request={request}
	  							handleClick={() => this.openRequestContentModal(request.id)}
									handleIntersection={this.handleIntersecion}
								/>
	  					)
	  				})
	  			}

	  			{
	          data
	          	&& Proposal.requests_next && (
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

export default ProposalConatiner

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
