
import React from 'react';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';
import Footer from '../../components/Footer';
import AccountConatiner from '../../containers/Account';
import Nav from '../../components/Nav';
import MobileNav from '../../components/MobileNav';

@inject('Auth', 'Home', 'Answer', 'Loading') // *_app.js <Provider>에 넘겨준 store명과 일치해야함. *inject: 컴포넌트에서 store에 접근 가능하게 함. 해당 store에 있는 값을 컴포넌트의 props로 주입시켜줌.
@observer
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
  }

  static getInitialProps({ query }) {
    return { query };
  }

  async componentDidMount() {
    // 창 크기
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    const {
      Auth, Home, Answer, Loading,
    } = this.props;

    Home.init();
    Loading.setOpen(true);
    setTimeout(() => Loading.setOpen(false), 500);

    // 중복
    await Auth.checkLogin();

    if (Auth.logged_in_client) {
      Answer.loadCategories();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  }

  render() {
    const { Loading, query } = this.props;
    const { width } = this.state;
    return (
      <div>
        {Loading.is_open}
        {/* {Loading.is_open && <Spinner/>} */}
        <Head>
          <title>볼트앤너트</title>
        </Head>
        <>
          { width > 768
            ? (<Nav />) : (<MobileNav />)}
        </>
        <AccountConatiner query={query} />
        <Footer />
      </div>
    );
  }
}

export default Account;
