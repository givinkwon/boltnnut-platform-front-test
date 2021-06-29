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
              <Header>제조사 필터링 서비스</Header>
              <Middle>
                원하는 생산품을 만들었던 <br />
                업체 검색이 한 번에
              </Middle>
              <Body>
                내가 원하는 생산품을 만들었던 제조업체를 <br />
                볼트앤너트를 통해 바로 검색하세요. <br />
                지역별, 입력별 필터를 통해 원하는 조건의 <br />
                전문업체 검색이 가능합니다.
              </Body>
            </div>
            <div>
              <img
                src={image1}
                style={{ width: 588, height: '100%', borderRadius: 10 }}
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
  color: #282c36;
`;
