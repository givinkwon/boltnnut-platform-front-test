import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import FAQConatiner from 'containers/FAQ'

@inject('Counter', 'Post', 'Loading') // *_app.js <Provider>에 넘겨준 store명과 일치해야함. *inject: 컴포넌트에서 store에 접근 가능하게 함. 해당 store에 있는 값을 컴포넌트의 props로 주입시켜줌.
@observer
class FAQ extends React.Component {
  static getInitialProps({query}) {
    return {query}
  }
  render(){
    const { Post, Counter, Loading, query } = this.props
    return (
      <div>
        {Loading.is_open && <Spinner/>}
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <FAQConatiner query={query}/>
        <Footer/>
      </div>
    )
  }
}

export default FAQ
