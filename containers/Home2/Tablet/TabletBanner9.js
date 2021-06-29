import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import Buttonv1 from "components/Buttonv1";
import Fade from "react-reveal/Fade";
import Router from "next/router";
import * as Content from "components/Content";

const image1 = "/static/images/Home/Mobile/MobileBanner9/MobileBanner9_bg.png";

class TabletBanner9Container extends React.Component {
  render() {
    return (
      <Background
        src={image1}
        style={{ justifyContent: "center", backgroundSize: "100% 100%" }}
      >
        <Layer>
          <Fade bottom>
            <div>
              <Font24>
                메일로 회사소개서 보내기, 박람회 영업하기는 이제 그만
              </Font24>
              <Font16>
                프로젝트 상담을 통해 기획 단계부터 실무자 분들과 소통해보세요.{" "}
                <br />
                전문 상담을 통해 자사의 전문성을 제안하고 신규 거래처를
                탐색해보세요.
              </Font16>
              <Buttonv1
                style={{
                  margin: "0 auto",
                  marginTop: 20,
                  marginBottom: 56,
                  fontWeight: "bold",
                }}
                onClick={() => Router.push("/request")}
              >
                파트너 가입하기
              </Buttonv1>
            </div>
          </Fade>
        </Layer>
      </Background>
    );
  }
}

export default TabletBanner9Container;

const Header = styled(Title.FontSize22)`
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: -0.45px;
  text-align: center;
  margin-top: 56px;
`;

const Layer = styled.div`
  background-color: rgba(0, 0, 0, 0.67);
  width: 100%;
  height: 100%;
  // display: inline-flex;
  // justify-content: center;
`;

const Font16 = styled(Content.FontSize16)`
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67 !important;
  letter-spacing: -0.6px !important;
  text-align: center;
  margin: 0 auto;
`;

const Font24 = styled(Content.FontSize24)`
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67 !important;
  letter-spacing: -0.6px !important;
  text-align: center;
  margin: 35px auto 55px auto;
`;
