import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import Buttonv1 from "components/Buttonv1";
import Fade from "react-reveal/Fade";
import Router from "next/router";
import * as Content from "components/Content";
import { inject, observer } from "mobx-react";

const passImg = "/static/images/pass7.png";
const image1 = "/static/images/Home/Mobile/MobileBanner9/MobileBanner9_bg.png";

@inject("Auth")
@observer
class TabletBanner9Container extends React.Component {
  render() {
    return (
      <Background
        src={image1}
        style={{
          backgroundPosition: "0% 60%",
          opacity: "0.9",
        }}
      >
        <Layer>
          {/* <Containerv1
            style={{
              paddingBottom: 80,
              paddingTop: 60,
              justifyContent: "center",
            }}
          > */}
          <Fade bottom>
            <div>
              <Font18>
                메일로 회사소개서 보내기, 박람회 영업하기는 이제 그만 <br />
                {/* 제조 발주를 위한 빠른 업체 검색 <br />
                볼트앤너트에서 가능합니다. */}
              </Font18>
              <Font16>
                프로젝트 상담을 통해 기획 단계부터 실무자 분들과 소통해보세요.{" "}
                <br />
                전문 상담을 통해 자사의 전문성을 제안하고 신규 거래처를
                탐색해보세요.
              </Font16>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={() => {
                    this.props.Auth.setType("expert");
                    Router.push("/signup");
                  }}
                >
                  <span>파트너 가입하기</span>
                  {/* <span>
                    <img src={passImg} />
                  </span> */}
                </Button>
              </div>
            </div>
          </Fade>
          {/* </Containerv1> */}
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
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
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

const Font18 = styled(Content.FontSize18)`
  color: #ffffff;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67 !important;
  letter-spacing: -0.6px !important;
  text-align: center;
  margin: 35px auto 18px auto;
`;

const Button = styled.div`
  cursor: pointer;
  margin-top: 18px;
  border: 2px solid #0933b3;
  border-radius: 46px;
  width: 215px;
  height: 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0933b3;
  margin-bottom: 32px;
  > span:nth-of-type(1) {
    font-size: 16px;
    line-height: 52px;
    letter-spacing: -0.65px;
    color: #ffffff;
    font-weight: 500;
  }
`;
