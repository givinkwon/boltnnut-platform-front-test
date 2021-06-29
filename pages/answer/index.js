import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import { inject, observer } from 'mobx-react'

import Nav from 'components/Nav'
import MobileNav from 'components/MobileNav'
import Footer from 'components/Footer'
import Spinner from 'components/Spinner'

import AnswerContainer from 'containers/Answer'
import * as AccountAPI from "axios/Account";

@inject('Project', 'Auth', 'Home', 'Answer', 'Loading') // *_app.js <Provider>에 넘겨준 store명과 일치해야함. *inject: 컴포넌트에서 store에 접근 가능하게 함. 해당 store에 있는 값을 컴포넌트의 props로 주입시켜줌.
@observer
class Answer extends React.Component {
  state={
    width:null,
  }
  async componentDidMount() {
    const { Project, Auth, Home, Answer, Loading } = this.props

    //창 크기
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    
    //Project.init()
    


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

    if(Auth.logged_in_client) {
      console.log('프로젝트 목록 로딩 시작')
      
      Project.init(Auth.logged_in_client.id, () => {
        console.log('프로젝트 목록 로딩 끝')
      })

      // Project.init(904, () => {
      //      console.log('프로젝트 목록 로딩 끝')
      // })
    }
    Project.getNextPage()
    Project.getToken()

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
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render(){
    const { Answer, Loading } = this.props
    const { width } = this.state;
    return (
      <div>
        {Loading.is_open}
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <>
        { width > 767.98 ? (
          <Nav />
          ) : (
          <MobileNav width={width}/>
          )
        }
        </>
        <AnswerContainer length = { this.props.Project.project_length }/>
  
        <Footer/>
      </div>
    )
  }
}

export default Answer
