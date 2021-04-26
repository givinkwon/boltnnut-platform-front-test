import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Buttonv1 from "components/Buttonv1";
import Fade from "react-reveal/Fade";
import Router from "next/router";

const image1 = "/static/images/Home/Banner9/Banner9_img1.png";

class Banner9Container extends React.Component {
  render() {
    return (
      <Background src={image1} style={{ backgroundPosition: "0% 60%" }}>
        <Layer>
          <Containerv1
            style={{
              paddingBottom: 80,
              paddingTop: 60,
              justifyContent: "center",
            }}
          >
            <Fade bottom>
              <div>
                <Font32>
                  메일로 회사소개서 보내기, 박람회 영업하기는 이제 그만
                </Font32>
                <Font24>
                  프로젝트 상담을 통해 기획 단계부터 실무자 분들과 소통해보세요.{" "}
                  <br />
                  전문 상담을 통해 자사의 전문성을 제안하고 신규 거래처를
                  탐색해보세요.
                </Font24>
                <Buttonv1
                  style={{
                    height: 76,
                    width: 308,
                    margin: "0 auto",
                    marginTop: 55,
                  }}
                  onClick={() => Router.push("/login")}
                >
                  <Font24>파트너 가입하기</Font24>
                </Buttonv1>
              </div>
            </Fade>
          </Containerv1>
        </Layer>
      </Background>
    );
  }
}

export default Banner9Container;

const Font24 = styled(Content.FontSize24)`
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67 !important;
  letter-spacing: -0.6px !important;
  text-align: center;
  margin: 0 auto;
`;

const Font32 = styled(Content.FontSize32)`
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67 !important;
  letter-spacing: -0.6px !important;
  text-align: center;
  margin: 0 auto 55px auto;
`;

const Layer = styled.div`
  background-color: rgba(0, 0, 0, 0.67);
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
`;
