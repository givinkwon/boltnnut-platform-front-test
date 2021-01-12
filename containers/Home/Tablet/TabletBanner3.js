import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from 'react-reveal/Fade';

const Img = "/static/images/Home/Mobile/MobileBanner3/MobileBanner3Img.png"

class TabletBanner3Container extends React.Component {
  render() {
    return (
      <Background>
        <ContentContainer>
          <Fade bottom>
            <Header>
              제조 무료 상담 서비스
            </Header>
            <Middle>
              40년 경력의 전<br/>
              컨설턴트 <p>무료 상담</p>
            </Middle>
            <ImgContainer>
              <img src={ Img }/>
            </ImgContainer>
            <Body>
              프로젝트마다 해당 제품의 전문가가 배정되어<br/>
              무료상담을 통해 최적의 견적을 알려드립니다.
            </Body>
          </Fade>
        </ContentContainer>
      </Background>
    );
  }
}

export default TabletBanner3Container;
const ContentContainer = styled(Containerv1)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled(Title.FontSize20)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  margin: 70px 0px 2px 0px;
  @media (min-width: 767.99px) and (max-width: 1279.98px) {
    font-size: 17px;
  }
`
const Middle = styled(Title.FontSize56)`
  text-align: center;
  color: #282c36;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -1.4px;
  >p {
    display: inline;
    font-weight:bold;
  }
  @media (min-width: 767.99px) and (max-width: 1279.98px) {
    font-size: 24px;
  }
`
const ImgContainer = styled.div`
  margin: 30px 0px 22px 0px;
`
const Body = styled(Title.FontSize24)`
  text-align: center;
  white-space:nowrap;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #555963;
  margin-bottom: 70px;
  @media (min-width: 767.99px) and (max-width: 1279.98px) {
    font-size: 17px;
  }
`

