import React from "react";
import styled from "styled-components";

//Components
import Background from "components/Background";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Fade from 'react-reveal/Fade';

import { inject, observer } from "mobx-react";

//Image
const image1 = "/static/images/Home/Banner3/image1.png"

@inject('Proposal')
@observer
class MobileBanner3Container extends React.Component {
  render() {
    const ProjectCount = this.props.Proposal.projects_count;
    return (
      <Background backgroundColor={'#0a2165'} style={{ paddingBottom: 100, paddingTop: 100, justifyContent: 'center'}}>
        <Fade bottom>
          <div>
            <Header>
              AI 제조사 매칭 알고리즘
            </Header>
            <Middle>
              5000여개의 제조사 중<br/>
              딱 맞는 <p>전문가</p>를 매칭
            </Middle>
            <div>
              <img src={image1} style={{ width: 347, height: 230,borderRadius:7}} />
            </div>
            <Body>
              {ProjectCount * 3 + 997}개 프로젝트 데이터를 학습한 AI 매칭<br />
              알고리즘이 내 제품의 전문가를 큐레이션해드립니다.
            </Body>
          </div>

        </Fade>
      </Background>
    );
  }
}

export default MobileBanner3Container;

const Header = styled(Title.FontSize13)`
  height:20px;
  color: #e8eeff;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: normal;
  margin-bottom:2px;
  text-align:center;
`
const Middle = styled(Content.FontSize22)`
  height:72px;
  color: #f6f6f6;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.64;
  letter-spacing: -0.55px;
  margin-bottom: 30px;
  text-align:center;
  @media (min-width: 0px) and (max-width: 767.98px) {
      line-height: 1.45;
  }
  > p {
    font-weight: bold;
    display:inline;
  }
`

const Body = styled(Content.FontSize15)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.38px;
  color: #cedafe;
  margin-top:22px;
  text-align:center;
`

