import React from "react";
import styled from "styled-components";
import Background from "../../components/Background";
import Containerv1 from "../../components/Containerv1";
import * as Title from "../../components/Title";
import Fade from "react-reveal/Fade";

const image1 = "/static/images/Home/Banner3/image1.png";
const backgroundImg = "/static/images/Home/Banner3/Banner3_Bg.png";
import { inject, observer } from "mobx-react";

@inject("Proposal", "Partner")
@observer
class Banner3Container extends React.Component {
  render() {
    const ProjectCount = this.props.Proposal.projects_count;

    return (
      <Background>
        <Containerv1
          style={{
            paddingBottom: 308,
            paddingTop: 306,
            justifyContent: "space-between",
          }}
        >
          <Fade bottom>
            <div>
              <Header>컨설턴트 중 해당 제품</Header>
              <Middle>
                전문 제조사들에게 <br />
                다양한 비교 견적
              </Middle>
              <Body>
                {/* {ProjectCount}개 프로젝트 데이터를 학습한 AI 매칭 알고리즘이<br/>
                내 의뢰의 전문가를 큐레이션해드립니다. */}
                원하는 품질과 납기를 만족하는 제조사들을 선별해 <br />
                다양한 비교견적을 쉽고 편리하게 받을 수 있습니다.
              </Body>
            </div>
            <div>
              <img
                src={image1}
                style={{ width: 588, height: 392, borderRadius: 10 }}
              />
            </div>
          </Fade>
        </Containerv1>
      </Background>
    );
  }
}

export default Banner3Container;

const Header = styled(Title.FontSize20)`
  //color: #e8eeff;
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  margin-bottom: 16px;
`;
const Middle = styled(Title.FontSize56)`
  //color: #f6f6f6;
  color: #282c36;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 105px;
`;

const Body = styled(Title.FontSize24)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  //color: #cedafe;
  color: #555963;
`;
