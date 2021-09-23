import React from "react";
import Head from "next/head";
import { inject, observer } from "mobx-react";

import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import Footer from "components/Footer";
import * as AccountAPI from "axios/Account/Account";
import LoginConatiner from "containers/Account/Login";

const logo_ic = "/static/images/components/MobileNav/MobileLogo.svg";

@inject("Loading") // *_app.js <Provider>에 넘겨준 store명과 일치해야함. *inject: 컴포넌트에서 store에 접근 가능하게 함. 해당 store에 있는 값을 컴포넌트의 props로 주입시켜줌.
@observer
class Home extends React.Component {
  state = {
    width: null,
  };

  componentDidMount() {
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
    // page ip 기록
    const formData = new FormData();

    formData.append("url", window.location.href);
    console.log(window.location.href);
    const req = {
      data: formData,
    };

    // 전체 이동 기록
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
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  render() {
    const { Post, Counter, Loading } = this.props;
    const { width } = this.state;
    return (
      <div>
        {Loading.is_open}
        <Head>
          {/* SEO */}
          <meta
            name="description"
            content="제품군별 제조 전문가 큐레이션 플랫폼 볼트앤너트. 믿음직한 제품 개발업체를 만나는 가장 쉬운 방법! 시제품부터 생활용품까지 모두 OK!"
          />
          <meta name="keywords" content="제조, 제조업, 제조업체, 제조회사, 제품개발, 외주용역, 제조업체찾기, 제품제작, ODM, 제품제조" />
          {/* SEO - open graph*/}
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/static/images/thumbnail.png" />
          <meta property="og:title" content="볼트앤너트|믿을 수 있는 제조 전문가" />
          <meta
            property="og:description"
            content="제품군별 제조 전문가 큐레이션 플랫폼 볼트앤너트. 믿음직한 제품 개발업체를 만나는 가장 쉬운 방법! 시제품부터 생활용품까지 모두 OK!"
          />
          <meta property="og:url" content="https://www.boltnnut.com/login" />
          {/* Title */}
          <title>볼트앤너트|로그인</title>
        </Head>

        <>{width > 767.98 ? <Nav /> : <MobileNav src={logo_ic} width={width} />}</>

        <LoginConatiner width={width} />
        <Footer />
      </div>
    );
  }
}

export default Home;
