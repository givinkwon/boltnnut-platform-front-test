import React, {Component} from 'react'
import Head from 'next/head'
import { inject, observer } from 'mobx-react'

import AnswerDetailContainer from 'containers/Answer/List/Tab1/Detail'

import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'
import * as AccountAPI from "axios/Account";


@inject('Auth', 'Answer', 'Loading')
@observer
class AnswerDetail extends Component {

  async componentDidMount() {
    const { Auth, Answer, Loading, router } = this.props

    // query param이 없다고 가정
    // ex) /answer/1 = ok, /answer/1?... = not ok
    const requestId = window.location.pathname.split('/')[2]
    const answerId = window.location.pathname.split('/')[4]
    console.log('requestId: ' + requestId)
    console.log('answerId: ' + answerId)

    Loading.setOpen(true)
    setTimeout(() => Loading.setOpen(false), 500)

    console.log('제안서 + 파트너사 정보 로딩 시작')

    await Auth.checkLogin()
    // 프로젝트 id와 콜백 함수 전달
    if(Auth.logged_in_client) {
      Answer.loadAnswerDetailPage(Auth.logged_in_client.id, requestId, answerId, () => {
        console.log('제안서 + 파트너사 정보 로딩 끝')
      })
    }
    // page ip 기록
    const formData = new FormData();

    formData.append("url", window.location.href);
    console.log(window.location.href)
    const req = {
      data: formData,
    };
  
    AccountAPI.setUserPageIP(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  }

	render() {
    const {Loading} = this.props

		return (
			<div>
        {Loading.is_open}
        <Head>
        </Head>
        <Nav />
        <AnswerDetailContainer />
        <Footer/>
      </div>
		)
	}
}

export default AnswerDetail
