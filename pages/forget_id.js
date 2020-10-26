import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Nav from 'components/Nav'
import Footer from 'components/Footer'

import ForgetPasswordConatiner from 'containers/ForgetPassword'

class ForgetPassword extends React.Component {
  render(){
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <ForgetPasswordConatiner/>
        <Footer/>
      </div>
    )
  }
}

export default ForgetPassword
