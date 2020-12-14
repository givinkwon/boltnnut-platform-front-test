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

          {/* SEO */}
          <meta name="description" content="제품군별 제조 전문가 큐레이션 플랫폼 볼트앤너트. 믿음직한 제품 개발업체를 만나는 가장 쉬운 방법! 시제품부터 생활용품까지 모두 OK!" />
          <meta name="keywords" content="제조, 제조업, 제조업체, 제조회사, 제품개발, 외주용역, 제조업체찾기, 제품제작, ODM, 제품제조"/>
          {/* SEO - open graph*/}
          <meta property="og:type" content="website"/>
          <meta property="og:image" content="/static/images/thumbnail.png"/>
          <meta property="og:title" content="볼트앤너트|믿을 수 있는 제조 전문가" />
          <meta property="og:description" content="제품군별 제조 전문가 큐레이션 플랫폼 볼트앤너트. 믿음직한 제품 개발업체를 만나는 가장 쉬운 방법! 시제품부터 생활용품까지 모두 OK!"/>
          <meta property="og:url" content="https://www.boltnnut.com/term/policy"/>           
          {/* Title */}
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
