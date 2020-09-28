import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import AnswerConatiner from 'containers/Answer'

@inject('Auth', 'Home', 'Answer', 'Loading') // *_app.js <Provider>에 넘겨준 store명과 일치해야함. *inject: 컴포넌트에서 store에 접근 가능하게 함. 해당 store에 있는 값을 컴포넌트의 props로 주입시켜줌.
@observer
class Answer extends React.Component {
  async componentDidMount() {
    const { Auth, Home, Answer, Loading } = this.props

    Home.init()
    Loading.setOpen(true)
    setTimeout(() => Loading.setOpen(false), 500)

    // 중복
    await Auth.checkLogin()

    if(Auth.logged_in_client) {
      console.log('클라이언트 의뢰 목록 로딩 시작')
      Answer.loadCategories()
      Answer.loadClientRequestList(Auth.logged_in_client.id, () => {
        console.log('클라이언트 의뢰 목록 로딩 끝')
      })
    }
  }
  render(){
    const { Answer, Loading } = this.props
    return (
      <div>
        {Loading.is_open && <Spinner/>}
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <AnswerConatiner/>
        <Footer/>
      </div>
    )
  }
}

export default Answer
