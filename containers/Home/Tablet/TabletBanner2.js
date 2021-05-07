import React from "react";
import styled from "styled-components";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import Fade from "react-reveal/Fade";

const Img = "/static/images/Home/Banner2/image1.png";
const image1 = "/static/images/Home/Banner2/image1.png";

class TabletBanner2Container extends React.Component {
  render() {
    return (
      <Background backgroundColor={"#ffffff"}>
        <Containerv1
          style={{
            paddingBottom: 150,
            paddingTop: 150,
            justifyContent: "space-between",
          }}
        >
          <Fade bottom>
            <div style={{ marginRight: "-50px" }}>
              <img src={image1} style={{ height: "80%", width: "80%" }} />
            </div>
            <div>
              <Header>무료 생산 상담</Header>
              <Middle>
                <p>
                  내가 설계한 부품장비 <br /> 생산에 문제가 없을까?
                </p>
              </Middle>
              {/* <ImgContainer>
              <img
                src={Img}
                style={{ width: 347, height: 230, borderRadius: 7 }}
              />
            </ImgContainer> */}

              <Body>
                생산에 대한 모든 문의사항을 4000여 개
                <br />
                전문 제조사들이 바로 상담해드립니다.
              </Body>
            </div>
          </Fade>
        </Containerv1>
      </Background>
    );
  }
}

export default TabletBanner2Container;
const ContentContainer = styled(Containerv1)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled(Title.FontSize20)`
  color: #0933b3;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: normal;
  //margin: 100px 0px 2px 0px;
  @media (min-width: 767.99px) and (max-width: 1279.98px) {
    font-size: 17px;
  }
`;
const Middle = styled(Title.FontSize56)`
  //text-align: center;
  color: #282c36;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.55px;
  margin-bottom: 55px;
  > p {
    display: inline;
    font-weight: bold;
  }
  @media (min-width: 767.99px) and (max-width: 1279.98px) {
    font-size: 28px;
  }
`;
const ImgContainer = styled.div`
  margin: 30px 0px 22px 0px;
`;
const Body = styled(Title.FontSize24)`
  //text-align: center;
  white-space: nowrap;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.38px;
  color: #555963;
  //margin-bottom: 100px;
  @media (min-width: 767.99px) and (max-width: 1279.98px) {
    font-size: 17px;
  }
`;
