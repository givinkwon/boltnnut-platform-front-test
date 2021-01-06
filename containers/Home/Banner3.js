import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from 'react-reveal/Fade';

const image1 = "/static/images/Home/Banner3/Banner3_img1.png"
const backgroundImg = "/static/images/Home/Banner3/Banner3_Bg.png"

class Banner3Container extends React.Component {
  render() {
    return (
        <Background src={backgroundImg}>
            <Containerv1 style={{paddingBottom: 358, paddingTop: 257, justifyContent: 'space-between'}}>
              <Fade bottom>
                <div>
                  <img src={image1}/>
                </div>
                <div>
                  <Header>
                    제조 무료 상담 서비스
                  </Header>
                  <Middle>
                    최대 40년 경력의<br/>
                    컨설턴트 <p>무료 상담</p>
                  </Middle>
                  <Body>
                    프로젝트마다 해당 제품의 전문가가 배정되어<br/>
                    무료상담을 통해 최적의 견적을 알려드립니다.
                  </Body>
                </div>
              </Fade>
            </Containerv1>
        </Background>
    );
  }
}

export default Banner3Container;

const Header = styled(Title.FontSize20)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  margin-bottom:16px;
`
const Middle = styled(Title.FontSize56)`
  color: #282c36;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 107px;
  
  >p {
    display: inline;
    font-weight:bold;
  }
`
const Body = styled(Title.FontSize24)`
  white-space:nowrap;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #555963;
`
