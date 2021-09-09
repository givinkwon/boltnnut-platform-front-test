import React from "react";
import Head from "next/head";
import { inject, observer } from "mobx-react";
import Footer from "components/Footer";
import AutoEstimate from "containers/Manufacture/Autoestimate"
import Nav from "components/Nav";
import MobileNav from "components/MobileNav";
import * as AccountAPI from "axios/Account/Account";

@inject("Auth", "Home", "Answer") // *_app.js <Provider>에 넘겨준 store명과 일치해야함. *inject: 컴포넌트에서 store에 접근 가능하게 함. 해당 store에 있는 값을 컴포넌트의 props로 주입시켜줌.
@observer
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
  }

  async componentDidMount() {
    // 창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

        // page ip 기록
        const formData = new FormData();

        formData.append("url", window.location.href);
        // console.log(window.location.href);
        const req = {
          data: formData,
        };
    
        AccountAPI.setUserPageIP(req)
          .then((res) => {
            // console.log(res);
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
    const { width } = this.state;
    return (
      <div>
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <>{width > 767.98 ? <Nav /> : <MobileNav width={width} />}</>
        <AutoEstimate/>
        <Footer />
      </div>
    );
  }
}

export default Account;
