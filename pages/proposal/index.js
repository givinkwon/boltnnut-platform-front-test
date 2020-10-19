import React from 'react'
import Head from 'next/head'
import { inject, observer } from 'mobx-react'

import ProposalConatiner from 'containers/Proposal'

import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

@inject('Proposal', 'Answer', 'Loading', 'Auth')
@observer
class Proposal extends React.Component {
  async componentDidMount() {
    const { Proposal, Answer, Loading, Auth } = this.props

    Loading.setOpen(true)
    setTimeout(() => Loading.setOpen(false), 500)



    await Auth.checkLogin()
    if(Auth.logged_in_partner) {
      console.log('클라이언트 의뢰 목록 로딩 시작')
      Proposal.loadOrderedRequests(() => {
        console.log('클라이언트 의뢰 목록 로딩 끝')
      })
      Proposal.loadPartnerAnswers(Auth.logged_in_partner.id)

      Answer.loadCategories()
    }
  }
  render(){
    const { Answer, Loading } = this.props
    return (
      <div>
        {Loading.is_open}
        {/* {Loading.is_open && <Spinner/>} */}
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <ProposalConatiner/>
        <Footer/>
      </div>
    )
  }
}

export default Proposal
