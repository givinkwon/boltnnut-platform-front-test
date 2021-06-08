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
            <Header>제조사 정보 제공 서비스</Header>
            <Middle>
              포트폴리오부터 계약 후기까지!
              <br />
              {/* <span>무료 도면 수정 </span> */}
              5000개의 전국 제조사 정보 제공
            </Middle>
            <ImgContainer>
              <img
                src={Img}
                style={{ width: 347, height: 230, borderRadius: 7 }}
              />
            </ImgContainer>
            <Body>
            남동공단부터 창원까지
                <br />
                선별된 5000여 개 제조사 정보를
                <br />
                지금 바로 확인하세요.
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
