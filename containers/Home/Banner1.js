import React from 'react';
import Background from '../../components/Background';
import Containerv1 from 'components/Containerv1';
import * as Title from 'components/Title';
import styled from 'styled-components';

class Banner1Conatiner extends React.Component {
  render() {
    return (
      <Background>
        <ContentContainer>
          <Image>
            <div>
              <img src={ "/static/images/Home/Banner1/타 사이트 48시간.png" }/>
            </div>
            <div>
              <img src={ "/static/images/Home/Banner1/>>>>.png" }/>
            </div>
            <div>
              <img src={ "/static/images/Home/Banner1/1초.png" }/>
            </div>
          </Image>
          <div>
            <Head>컨설턴트 중 해당 제품</Head>
            <Main>1초만에 내 제품<br/>가견적 받기</Main>
            <Content>평균 48시간의 견적 시간을 450건 의뢰 데이터를<br/>기반으로 클릭 한 번으로 해결해 드립니다.</Content>
          </div>
        </ContentContainer>
      </Background>
    );
  }
};
export default Banner1Conatiner;
const ContentContainer = styled(Containerv1)`
  display: flex;
  flex-direction: row;
`
const Image = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 120px;
`
const Head = styled(Title.FontSize20)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  margin: 293px 0px 106px 0px;
`
const Main = styled(Title.FontSize56)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 106px;
`
const Content = styled(Title.FontSize24)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
  margin-bottom: 331px;
`

