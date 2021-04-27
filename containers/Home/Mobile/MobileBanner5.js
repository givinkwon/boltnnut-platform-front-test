import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import * as Title from "components/Title";
import StarRatingComponent from "react-star-rating-component";
import ReviewCard from "components/Review";
import ReviewCard2 from "components/Review";
import * as Content from "components/Content";
import Fade from "react-reveal/Fade";

const image1 = "/static/images/Home/Mobile/MobileBanner5/Banner5_img1.png";

class MobileBanner5Container extends React.Component {
  render() {
    return (
      <Background backgroundColor={"#f6f6f6"}>
        <Fade bottom>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: 100,
            }}
          >
            <Header>제조 무료 상담 서비스</Header>
            <Middle>
              원하는 업체만 <br /> 정보 공개 및 소통
              {/* <span class="bold"> 100% 보증</span> */}
            </Middle>
            <img src={image1} style={{ marginTop: 32, marginBottom: 18 }} />
            <Body>
              민감한 연구개발 정보는 내가 소통하고 <br />
              검증한 엄체에게만 공개할 수 있습니다.
            </Body>
          </div>
        </Fade>
      </Background>
    );
  }
}

export default MobileBanner5Container;

const Header = styled(Title.FontSize13)`
  font-weight: bold;
  color: #0933b3;
  height: 19px;
  margin-bottom: 3px;
`;
const Middle = styled(Title.FontSize22)`
  font-size: 23px !important;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.45;
  letter-spacing: -0.55px;
  text-align: center;
  color: #111111;
  .bold {
    font-weight: bold;
  }
`;
const Body = styled(Content.FontSize15)`
  height: 44px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: -0.38px;
  text-align: center;
  color: #555963;
  margin-bottom: 100px;
  font-size: 16px;
`;
