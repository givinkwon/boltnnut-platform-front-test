import React from "react";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import styled from "styled-components";
import Fade from "react-reveal/Fade";
import { inject, observer } from "mobx-react";

// const MobileBanner1Img =
//   "static/images/Home/Mobile/MobileBanner1/MobileBanner1Img.svg";

const MobileBannerImg =
  "static/images/Home/Mobile/MobileBanner1/MobileBannerImg.png";
const backgroundImg = "/static/images/Home/Banner3/Banner3_Bg.png";

@inject("Proposal", "Partner")
@observer
class MobileBanner1Container extends React.Component {
  render() {
    const ProjectCount = this.props.Proposal.projects_count;
    return (
      <Background backgroundColor={"#0a2165"}>
        <ContentContainer>
          <Fade bottom>
            <Head>AI 제조사 매칭 알고리즘</Head>
            <Main>
              {/* <span>
                바로 나오는 <br />{" "}
              </span>{" "} */}
              바로 나오는
              <br />
              AI 자동 견적
            </Main>
            <ImageContainer>
              <img src={MobileBannerImg} />
            </ImageContainer>
            <Content>
              볼트앤너트 AI 자동 견적 알고리즘이
              <br />
              제작품에 대한 견적 범위를 바로 안내해드립니다.
            </Content>
          </Fade>
        </ContentContainer>
      </Background>
    );
  }
}
export default MobileBanner1Container;
const ContentContainer = styled(Containerv1)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 29px 0px 18px 0px;
`;
const Head = styled(Title.FontSize20)`
  height: 19px;
  font-size: 14px;
  color: #ffffff;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  margin: 70px 0px 3px 0px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
  }
`;
const Main = styled(Title.FontSize56)`
  color: #ffffff;
  font-size: 23px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.55px;
  text-align: center;
  > span {
    font-weight: bold;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 23px;
  }
`;
const Content = styled(Title.FontSize24)`
  height: 46px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.47;
  letter-spacing: -0.4px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 100px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 16px;
    height: 44px;
  }
`;
