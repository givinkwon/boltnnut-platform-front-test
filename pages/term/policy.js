import React from 'react'
import Head from 'next/head'

import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import PolicyConatiner from 'containers/Term/Policy'

class Policy extends React.Component {
  render(){
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <PolicyConatiner/>
        <Footer/>
      </div>
    )
  }
}

export default Policy
