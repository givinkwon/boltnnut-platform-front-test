import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'

import LeftContainer from './Left'
import RequestCard from "./RequestCard";
import ProfileContainer from "./Profile"
@inject('Answer', 'Partner')
@observer
class RequestContentConatiner extends React.Component {
  state = {
    answerId: -1,
  }

  componentDidMount() {
  const answerId = window.location.href.split('/').pop()
      this.setState({
          ...this.state,
          answerId: answerId,
      })
  }

  render(){
    const {router, Answer} = this.props;
    const {answerId} = this.state
    let answer = null
    let partner = null
    if(answerId) {
      console.log(answerId)
      answer = Answer.getAnswerById(answerId)
    }
    if(answer) {
      partner = Answer.getPartnerById(answer.partner)
      if (!Answer.current_partner && partner) {
        setTimeout(() => Answer.current_partner = partner, 1000)
      }
    }
    return (
      <TabWrap>
        {/*<LeftContainer setTab={this.props.setTab} />*/}
        <ProfileContainer id={partner && partner.id}/>

        <RequestCard />
      </TabWrap>
    )
  }
}

export default withRouter(RequestContentConatiner)

const TabWrap = styled(Container)`
  //display: flex;
  @media (min-width: 0px) and (max-width: 991.98px) {
    flex-direction: column-reverse;
    margin-top: 15px;
  }
  @media (min-width: 992px) {
    flex-direction: row;
    margin-top: 25px;
  }
`
