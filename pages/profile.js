import React from 'react'
import Head from 'next/head'
import { inject, observer } from 'mobx-react'

import Nav from 'components/Nav'
import Footer from 'components/Footer'

import ProfileConatiner from 'containers/Profile'

@inject('Profile')
@observer
class Profile extends React.Component {
  componentDidMount() {
    // TODO Profile init
    this.props.Profile.checkLogin()
    this.props.Profile.getCityData()
    this.props.Profile.getRegionData()
  }
  render(){
    const { Profile } = this.props
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        { Profile.data && <ProfileConatiner/> }
        <Footer/>
      </div>
    )
  }
}

export default Profile
