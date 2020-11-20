import React from 'react';
import Head from 'next/head';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ForgetIdConatiner from '../containers/ForgetId';

class ForgetId extends React.Component {
  render() {
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <Nav />
        <ForgetIdConatiner />
        <Footer />
      </div>
    );
  }
}

export default ForgetId;
