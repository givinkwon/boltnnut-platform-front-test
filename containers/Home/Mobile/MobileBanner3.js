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
            <Header>제조사 필터링 서비스</Header>
            <Middle>
              <span>원하는 생산품을 만들었던</span>
              <span>업체 검색이 한 번에</span>
            </Middle>
            <div>
              <img
                src={image1}
                style={{ width: 347, height: 230, borderRadius: 7 }}
              />
            </div>
            <Body>
              <span>내가 원하는 생산품을 만들었던 제조업체를</span>
              <span>볼트앤너트를 통해 바로 검색하세요.</span>
              <span>지역별, 입력별 필터를 통해 원하는 조건의</span>
              <span>전문업체 검색이 가능합니다.</span>
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
  > span {
    font-weight: bold;
    display: block;
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
  > span {
    display: block;
  }
`;
