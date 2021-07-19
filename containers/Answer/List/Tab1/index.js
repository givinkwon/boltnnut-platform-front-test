import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

import Container from 'components/Container'

import LeftContainer from './Left'
import RightContainer from './Right'
import LeftDetailContainer from 'Detail/Left'
import RightDetailContainer from 'Detail/Right'

@inject('Answer')
@observer
class Tab1Conatiner extends React.Component {
  render(){
    const {router, Answer} = this.props;

    return (
      <TabWrap reverse={router.pathname !== '/answer/[id]'}>
        {
          router.pathname === '/answer/[id]' ?
            <>
              <LeftContainer count={Answer.answers_count} />
              <RightContainer Answer={Answer}/>
            </>
            :
            <>
              <LeftDetailContainer setTab={this.props.setTab} />
              <RightDetailContainer />
            </>
        }
      </TabWrap>
    )
  }
}

export default withRouter(Tab1Conatiner)

const TabWrap = styled(Container)`
  display: flex;
  @media (min-width: 0px) and (max-width: 991.98px) {
    flex-direction: ${props => props.reverse ? 'column-reverse' : 'column'};
    margin-top: 15px;
  }
  @media (min-width: 992px) {
    flex-direction: row;
    margin-top: 25px;
  }
`
