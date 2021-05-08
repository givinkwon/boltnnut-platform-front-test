import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import * as Title from "components/Title";
import Buttonv1 from "components/Buttonv1";
import Fade from "react-reveal/Fade";
import Router from "next/router";

// const image1 = "/static/images/Home/Banner9/Banner9_img1.png"
const image1 = "/static/images/Home/Mobile/MobileBanner9/MobileBanner9_bg.png";
class MobileBanner9Container extends React.Component {
  render() {
    return (
      <StyledBackground src={image1}>
        <Layer>
          <Fade bottom>
            <div>
              <Header>
                메일로 회사소개서 보내기, <br />
                박함회 영업하기는 이제 그만
              </Header>
              <Body>
                프로젝트 상담을 통해 <br />
                기획 단계부터 실무자 분들과 소통해보세요. <br />
                전문 상담을 통해 <br />
                자사의 전문성을 제안하고 신규 거래처를 탐색해보세요.
              </Body>
              <Buttonv1
                style={{
                  margin: "0 auto",
                  marginTop: 20,
                  marginBottom: 56,
                  fontWeight: 700,
                }}
                onClick={() => Router.push("/request")}
              >
                <p style={{ paddingBottom: 1 }}>파트너 가입하기</p>
              </Buttonv1>
            </div>
          </Fade>
        </Layer>
      </StyledBackground>
    );
  }
}

export default MobileBanner9Container;

const StyledBackground = styled(Background)`
  justify-content: center;
  background-size: 100% 100%;
`;
const Header = styled(Title.FontSize18)`
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: -0.45px;
  text-align: center;
  margin-top: 54px;
  margin-bottom: 18px;
`;

const Body = styled(Title.FontSize16)`
  color: #ffffff;
  font-weight: normal;
  line-height: 26px;
  letter-spacing: -0.4px;
  text-align: center;
  margin-bottom: 36px;
`;

const Layer = styled.div`
  background-color: rgba(0, 0, 0, 0.67);
  width: 100%;
  height: 100%;
  // display: inline-flex;
  // justify-content: center;
`;
