import React from 'react';
import Background from 'components/Background';
import Containerv1 from 'components/Containerv1';
import * as Title from 'components/Title';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import { inject, observer } from "mobx-react";

const BannerImg = "static/images/Home/Banner1/Banner1_img.png";

@inject('Proposal','Partner')
@observer
class Banner1Container extends React.Component {
  render() {
    const ProjectCount = this.props.Proposal.projects_count;
    return (
      <Background>
        <ContentContainer>
          <Fade bottom>
            <Image>
              <ImageContainer>
                <div>
                  <img src={BannerImg} />
                </div>
              </ImageContainer>
            </Image>
            <div>
              <Head>컨설턴트 중 해당 제품</Head>
              <Main><span>1초만에</span> 내 제품<br/>가견적 받기</Main>
              <Content>평균 48시간의 견적 시간을{ProjectCount}건 의뢰 데이터를<br/>기반으로 클릭 한 번으로 해결해 드립니다.</Content>
            </div>
          </Fade>
        </ContentContainer>
      </Background>
    );
  }
};
export default Banner1Container;
const ContentContainer = styled(Containerv1)`
  display: flex;
  flex-direction: row;
`
const Image = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 120px;
`
const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 246px;
  margin-top: 385px;
`
const Head = styled(Title.FontSize20)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  margin: 293px 0px 32px 0px;
`
const Main = styled(Title.FontSize56)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 106px;
  > span {
    font-weight: bold;
  }
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

