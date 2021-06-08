import React from "react";
import styled from "styled-components";

//Components
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Fade from "react-reveal/Fade";

import { inject, observer } from "mobx-react";

//Image
const image1 = "/static/images/Home/Banner3/image1.png";

@inject("Proposal")
@observer
class TabletBanner3Container extends React.Component {
  render() {
    const ProjectCount = this.props.Proposal.projects_count;
    return (
      <Background>
        <Containerv1
          style={{
            paddingBottom: 150,
            paddingTop: 150,
            justifyContent: "space-between",
          }}
        >
          <Fade bottom>
            <div>
              <Header>제조사 필터링 서비스</Header>
              <Middle style={{ fontSize: "32px" }}>
                원하는 생산품을 만들었던 <br />
                업체 검색이 한 번에
              </Middle>

              <Body>
                {/* {ProjectCount}개 프로젝트 데이터를 학습한 AI 매칭 알고리즘이<br/>
                내 의뢰의 전문가를 큐레이션해드립니다. */}
                제조사별 견적 도출 데이터를 학습한 AI 시스템이 <br />
                제작 가능 전문 업체와 견적을 바로 안내드립니다. <br />
                지역별, 입력별 필터를 통해 원하는 조건의 <br />
                전문업체 검색이 가능합니다.
              </Body>
            </div>
            <div>
              <img
                src={image1}
                style={{
                  width: 347,
                  height: '100%',
                  borderRadius: 7,
                }}
              />
            </div>
          </Fade>
        </Containerv1>
      </Background>
    );
  }
}

export default TabletBanner3Container;

const Header = styled(Title.FontSize17)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: normal;
  margin-bottom: 2px;
`;
const Middle = styled(Content.FontSize24)`
  //color: #f6f6f6;
  color: #282c36;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 62px;
  font-size: 32px; !important;
`;

const Body = styled(Content.FontSize17)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  //color: #cedafe;
  color: #282c36;
`;
