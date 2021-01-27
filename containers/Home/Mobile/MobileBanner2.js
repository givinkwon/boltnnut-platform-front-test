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
          <Background>
              <ContentContainer>
                  <Fade bottom>
                      <Header>
                          무료 도면 수정 서비스
                      </Header>
                      <Middle>
                          전문 엔지니어의<br/>
                          <span>무료 도면 수정 </span>
                          서비스 제공
                      </Middle>
                      <ImgContainer>
                          <img src={ Img } style={{ width: 347, height: 230,borderRadius:7}}/>
                      </ImgContainer>
                      <Body>
                          볼트앤너트 기술팀이 제작하신 금속가공, 금형/사출<br/>
                          도면의 생산성을 검토하고 수정해드립니다.
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
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  margin: 100px 0px 2px 0px;
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
    font-size: 22px;
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
  letter-spacing: -0.38px;
  text-align: left;
  color: #555963;
  margin-bottom: 100px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 15px;
  }
`

