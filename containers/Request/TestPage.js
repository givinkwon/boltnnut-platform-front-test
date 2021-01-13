import axios from 'axios';

const Page = ({ stars }) => {
  
  return <div>Next stars: {stars}</div>;
};

Page.getInitialProps = async ctx => {
  const { data } = await axios.get('...url');

  return { stars: data };
}

export default Page;