import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import * as PartnerAPI from 'axios/Manufacture/Partner'

// components
import Nav from 'components/Nav'
import Footer from 'components/Footer'

import PartnerReviewConatiner from "containers/Partner/Detail/Review";
import PartnerDetailConatiner from 'containers/Partner/Detail'


@inject('Partner', 'Answer')
class PartnerDetail extends React.Component {
  state = {
    data : null
  }
  static getInitialProps({query}) {
    return {query}
  }
  componentDidMount() {
    const {Partner, Answer} = this.props;
    const { id } = this.props.router.query

    Answer.loadCategories();
    PartnerAPI.detail(id)
      .then(res => {
        console.log(res)
        this.props.Partner.detail = res.data

        Partner.getRequestsByAnswers();
      })
      .catch(e => {
        console.log(e)
        console.log(e.reponse)
      })
  }
  render() {
    const { id } = this.props.router.query
    return (
      <div>
        <Head>
        </Head>
        <Nav />
        <PartnerReviewConatiner id={id}/>
        <Footer/>
      </div>
    )
  }
}

export default withRouter(PartnerDetail)

