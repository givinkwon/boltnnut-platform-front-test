import React from "react";
import styled from "styled-components";

//Components
import Background from "components/Background";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Fade from "react-reveal/Fade";

import { inject, observer } from "mobx-react";

//Image
const image1 = "/static/images/Home/Banner3/image1.png";

@inject("Proposal")
@observer
class MobileBanner3Container extends React.Component {
  render() {
    const ProjectCount = this.props.Proposal.projects_count;
    return (
      <Background
        style={{
          paddingBottom: 100,
          paddingTop: 100,
          justifyContent: "center",
        }}
      >
        <Fade bottom>
          <div>
            <Header>무료 비교 견적 서비스</Header>
            <Middle>
              전문 제조사들에게 <br />
              다양한 비교 견적
            </Middle>
            <div>
              <img
                src={image1}
                style={{ width: 347, height: 230, borderRadius: 7 }}
              />
            </div>
            <Body>
              원하는 품질과 납기를 만족하는 제조사들을 선별해
              <br />
              다양한 비교견적을 쉽고 편리하게 받을 수 있습니다.
            </Body>
          </div>
        </Fade>
      </Background>
    );
  }
}

export default MobileBanner3Container;

const Header = styled(Title.FontSize13)`
  height: 19px;
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: normal;
  margin-bottom: 3px;
  text-align: center;
`;
const Middle = styled(Content.FontSize22)`
  font-size: 23px !important;
  height: 62px;
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.64;
  letter-spacing: -0.55px;
  margin-bottom: 32px;
  text-align: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    line-height: 1.45;
  }
  > p {
    font-weight: bold;
    display: inline;
  }
`;

const Body = styled(Content.FontSize15)`
  font-size: 16px !important;
  height: 44px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.38px;
  color: #414550;
  margin-top: 18px;
  text-align: center;
`;
