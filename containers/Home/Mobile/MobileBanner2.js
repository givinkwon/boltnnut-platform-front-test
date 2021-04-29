import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";

const Img = "/static/images/Home/Banner2/image1.png";

class MobileBanner2Container extends React.Component {
  render() {
    return (
      <Background backgroundColor={"#ffffff"}>
        <ContentContainer>
          <Fade bottom>
            <Header>무료 도면 수정 서비스</Header>
            <Middle>
              내가 설계한 부품장비
              <br />
              {/* <span>무료 도면 수정 </span> */}
              생산에 문제가 없을까?
            </Middle>
            <ImgContainer>
              <img
                src={Img}
                style={{ width: 347, height: 230, borderRadius: 7 }}
              />
            </ImgContainer>
            <Body>
              생산에 대한 모든 문의사항은 4000개
              <br />
              전문 제조사들이 바로 상담해드립니다.
            </Body>
          </Fade>
        </ContentContainer>
      </Background>
    );
  }
}

export default MobileBanner2Container;
const ContentContainer = styled(Containerv1)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled(Title.FontSize20)`
  height: 19px;
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  margin: 100px 0px 3px 0px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
  }
`;
const Middle = styled(Title.FontSize56)`
  text-align: center;
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.55px;
  > span {
    display: inline;
    font-weight: bold;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 23px;
  }
`;
const ImgContainer = styled.div`
  margin: 32px 0px 18px 0px;
`;
const Body = styled(Title.FontSize16)`
  text-align: center;
  white-space: nowrap;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.38px;
  // text-align: left;
  color: #414550;\
  margin-bottom: 100px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 16px;
    height: 44px;
  }
`;
