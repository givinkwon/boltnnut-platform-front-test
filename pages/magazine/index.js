import React from "react";
import Head from "next/head";

import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import Footer from "components/Footer";

import MagazineConatiner from "containers/Magazine";
import { inject, observer } from "mobx-react";
const back_ic = "/static/images/components/MobileNav/back_ic.svg";

@inject("Magazine", "Auth")
@observer
class Index extends React.Component {
  state = {
    width: 0,
  };
  componentDidMount() {
    // this.props.Magazine.init()
    //창 크기
    // conflict..?
    this.props.Auth.bgColor = "#f6f6f6";
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const { width } = this.state;
    return (
      <div>
        <Head>
          {/* SEO */}
          <meta
            name="description"
            content="제조업 및 제조 인사이트를 위한 매거진. 볼트앤너트가 다양한 정보를 바탕으로 원하는 제품을 만들 수 있는 꿀팁을 전달해드립니다!"
          />
          <meta
            name="keywords"
            content="제조, 제조업, 제조업체, 제조회사, 제품개발, 외주용역, 제조업체찾기, 제품제작, ODM, 제품제조"
          />
          {/* SEO - open graph*/}
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/static/images/thumbnail.png" />
          <meta property="og:title" content="매거진|믿을 수 있는 제조 전문가" />
          <meta
            property="og:description"
            content="제조업 및 제조 인사이트를 위한 매거진. 볼트앤너트가 다양한 정보를 바탕으로 원하는 제품을 만들 수 있는 꿀팁을 전달해드립니다!"
          />
          <meta property="og:url" content="https://www.boltnnut.com/magazine" />
          {/* Title */}
          <title>볼트앤너트|제조 인사이트</title>
        </Head>
        <>
          {width > 767.98 ? (
            <Nav />
          ) : (
            <MobileNav headText={"제조 인사이트"} width={width} src={back_ic} />
          )}
        </>
        <MagazineConatiner
          width={width}
          length={this.props.Magazine.magazine_length}
        />
        <Footer />
      </div>
    );
  }
}

export default Index;
