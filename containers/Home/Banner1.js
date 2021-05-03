import React from "react";
import Background from "../../components/Background";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { inject, observer } from "mobx-react";

const BannerImg = "static/images/Home/Banner1/Banner1.png";
const backgroundImg = "/static/images/Home/Banner3/Banner3_Bg.png";

@inject("Proposal", "Partner")
@observer
class Banner1Container extends React.Component {
  render() {
    const ProjectCount = this.props.Proposal.projects_count;
    return (
      <Background src={backgroundImg}>
        <ContentContainer>
          <Fade bottom>
            <Image>
              <ImageContainer>
                <div>
                  <img src={BannerImg} />
                </div>
              </ImageContainer>
            </Image>
            <div>
              <Head>무료 생산 상담</Head>
              <Main>
                <span>
                  바로 나오는 <br />
                  AI 자동 견적
                </span>
              </Main>
              <Content>
                {/* {ProjectCount}건의 데이터에 기반한 자동견적 알고리즘이
                <br />
                평균 2일의 견적 시간을 한 번에 해결해 드립니다. */}
                볼트앤너트 AI 자동 견적 알고리즘이 <br />
                제작품에 대한 견적 범위를 바로 안내해드립니다.
              </Content>
            </div>
          </Fade>
        </ContentContainer>
      </Background>
    );
  }
}
export default Banner1Container;
const ContentContainer = styled(Containerv1)`
  display: flex;
  flex-direction: row;
`;
const Image = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 120px;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 246px;
  margin-top: 385px;
`;
const Head = styled(Title.FontSize20)`
  //color: #0933b3;
  color: #ffffff;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  margin: 293px 0px 32px 0px;
`;
const Main = styled(Title.FontSize56)`
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.36;
  letter-spacing: -1.4px;
  margin-bottom: 128px;
  > span {
    font-weight: bold;
  }
`;
const Content = styled(Title.FontSize24)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  // color: #282c36;
  color: #ffffff;
  margin-bottom: 331px;
`;
