import React from 'react'
import Head from 'next/head'

import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import PersonalConatiner from 'containers/Term/Personal'

class Personal extends React.Component {
  render(){
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <PersonalConatiner/>
        <Footer/>
      </div>
    )
  }
}

export default Personal
