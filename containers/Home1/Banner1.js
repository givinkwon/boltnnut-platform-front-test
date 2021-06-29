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
              <Head>볼트앤너트 AI 자동 견적</Head>
              <Main>
                <span>
                  1초만에 나오는 <br />
                  제조사별 AI 자동 견적
                </span>
              </Main>
              <Content>
                제조사별 견적 도출 데이터를 학습한 AI 시스템이 <br />
                제작 가능 전문 업체와 견적을 바로 안내드립니다.
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
  width: 500px;
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
