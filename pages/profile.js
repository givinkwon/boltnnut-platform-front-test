import React from 'react';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';
import Nav from 'components/Nav';
import MobileNav from 'components/MobileNav';
import Footer from 'components/Footer';
import ProfileConatiner from 'containers/Profile';

@inject('Profile')
@observer
class Profile extends React.Component {
  state = {
    width: null,
  }

  componentDidMount() {
    // TODO Profile init
    this.props.Profile.checkLogin();
    this.props.Profile.getCityData();
    this.props.Profile.getRegionData();
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render(){
    const { Profile } = this.props;
    const { width } = this.state;
    return (
      <div>
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
        { Profile.data && <ProfileConatiner/> }
        <Footer/>
      </div>
    )
  }
}

export default Profile
