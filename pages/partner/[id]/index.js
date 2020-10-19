import React from 'react'
import Head from 'next/head'
import { withRouter } from 'next/router'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'
import * as PartnerAPI from 'axios/Partner'

// components
import Nav from 'components/Nav'
import Footer from 'components/Footer'

import PartnerDetailConatiner from 'containers/Partner/Detail'


@inject('Partner')
class PartnerDetail extends React.Component {
  state = {
    data : null
  }
  static getInitialProps({query}) {
    return {query}
  }
  componentDidMount() {
    const { id } = this.props.router.query
    PartnerAPI.detail(id)
    .then(res => {
      console.log(res)
      this.props.Partner.detail = res.data
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
          {/* <title>Tirrilee :: {item[0].title}</title>
          <meta property="og:url" content={`https://www.tirrilee.io/news/${item[0].id}`}/>
          <meta property="og:image" content={item[0].thumbnail}/>
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`[${item[0].type}] ${item[0].title}`} />
          <meta property="og:description" content={item[0].content} />
          <meta name="description" content={item[0].content} />
          <link rel="canonical" href={`https://www.tirrilee.io/portfolio/${item[0].id}`} /> */}
        </Head>
        <Nav />
        <PartnerDetailConatiner id={id} />
        <Footer/>
      </div>
    )
  }
}

export default withRouter(PartnerDetail)

