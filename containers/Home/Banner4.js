import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";

const image1 = "/static/images/Home/Banner4/Banner4_img1.png"

class Banner4Container extends React.Component {
  render() {
    return (
        <Background backgroundColor = {"#d4d7e2"}>
            <Containerv1 style={{paddingBottom: 306, paddingTop: 308, justifyContent: 'space-between'}}>
                <div>
                    <Header>
                        컨설턴트 중 해당 제품
                    </Header>
                    <Middle>
                        7가지 계약 관리<br/>
                        서비스로 계약 이행<br/>
                        <p>100% 보증</p>
                    </Middle>
                    <Body>
                        200여개 이상의 프로젝트 데이터를 학습한 AI 매칭<br/>
                        알고리즘이 내 제품의 전문가를 큐레이션해드립니다.
                    </Body>
                </div>
                <div>
                    <img src={image1}/>
                </div>
            </Containerv1>
        </Background>
    );
  }
}

export default Banner4Container;

const Header = styled(Title.FontSize20)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
`
const Middle = styled(Title.FontSize56)`
  color: #282c36;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 47px;
  
  >p {
    font-weight:bold;
  }
`
const Body = styled(Title.FontSize24)`
  // white-space:nowrap;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #555963;
`

