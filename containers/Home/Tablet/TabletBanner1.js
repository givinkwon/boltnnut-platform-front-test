import React from 'react';
import Background from 'components/Background';
import Containerv1 from 'components/Containerv1';
import * as Title from 'components/Title';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { inject, observer } from "mobx-react";
@inject('Proposal','Partner')
@observer
class TabletBanner1Container extends React.Component {
  render() {
    const ProjectCount = this.props.Proposal.projects_count;
    return (
      <Background>
        <ContentContainer>
          <Fade bottom>
            <Head>자동 견적 알고리즘</Head>
            <Main><span>1초만에</span> 내 제품<br/>가견적 받기</Main>
            <ImageContainer>
              <img src={"/static/images/Home/Mobile/MobileBanner1/MobileBanner1Img.png"}/>
            </ImageContainer>
            <Content>{ProjectCount}건의 데이터에 기반한 자동견적 알고리즘이<br/>평균 2일의 견적 시간을 한 번에 해결해 드립니다.</Content>
          </Fade>
        </ContentContainer>
      </Background>
    );
  }
};
export default TabletBanner1Container;
const ContentContainer = styled(Containerv1)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 30px 0px 20px 0px;
`
const Head = styled(Title.FontSize20)`
  font-size: 14px;
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  margin: 70px 0px 2px 0px;
  @media (min-width: 767.99px) and (max-width: 1279.98px) {
    font-size: 18px;
  }
`
const Main = styled(Title.FontSize56)`
  font-size: 22px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -0.55px;
  text-align: center;
  > span {
    font-weight: 500;
  }
  @media (min-width: 767.99px) and (max-width: 1279.98px) {
    font-size: 24px;
  }
`
const Content = styled(Title.FontSize24)`
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.38px;
  text-align: center;
  color: #555963;
  margin-bottom: 100px;
  @media (min-width: 767.99px) and (max-width: 1279.98px) {
    font-size: 17px;
  }
`

