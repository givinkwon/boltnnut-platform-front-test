import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from 'react-reveal/Fade';

const Img = "/static/images/Home/Banner2/image1.png";

class MobileBanner2Container extends React.Component {
    render() {
        return (
          <Background backgroundColor={'#f6f6f6'}>
              <ContentContainer>
                  <Fade bottom>
                      <Header>
                          제조 무료 상담 서비스
                      </Header>
                      <Middle>
                          40년 경력의 전문<br/>
                          컨설턴트<span>무료 상담 </span>
                         
                      </Middle>
                      <ImgContainer>
                          <img src={ Img } style={{ width: 347, height: 230,borderRadius:7}}/>
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

export default MobileBanner2Container;
const ContentContainer = styled(Containerv1)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled(Title.FontSize20)`
    height: 19px;
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  margin: 100px 0px 3px 0px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
  }
`
const Middle = styled(Title.FontSize56)`
  text-align: center;
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.55px;
  > span {
    display: inline;
    font-weight:bold;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 23px;
  }
`
const ImgContainer = styled.div`
  margin: 32px 0px 18px 0px;
`
const Body = styled(Title.FontSize24)`
  text-align: center;
  white-space:nowrap;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.38px;
  text-align: left;
  color: #555963;
  margin-bottom: 100px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 16px;
      height: 44px;
  }
`

