import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "components/Background";
import * as Title from "components/Title";
import * as Content from "components/Content";
import Buttonv1 from "components/Buttonv1";
import Fade from "react-reveal/Fade";
import Router from "next/router";

const passImg = "/static/images/pass7.png";
const image1 = "/static/images/Home/Banner9/Banner9_img1.png";

class Banner9Container extends React.Component {
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
          <Containerv1
            style={{
              paddingBottom: 54,
              paddingTop: 60,
              justifyContent: "center",
            }}
          >
            <Fade bottom>
              <div>
                <Font32>
                  제조 발주를 위한 빠른 업체 검색 <br />
                  볼트앤너트에서 가능합니다.
                </Font32>
                {/* <Font24>
                  프로젝트 상담을 통해 기획 단계부터 실무자 분들과 소통해보세요.{" "}
                  <br />
                  전문 상담을 통해 자사의 전문성을 제안하고 신규 거래처를
                  탐색해보세요.
                </Font24> */}

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={() => Router.push("/producer")}>
                    <span>지금 업체 찾기</span>
                    <span>
                      <img src={passImg} />
                    </span>
                  </Button>
                </div>

                {/* <Buttonv1
                  style={{
                    height: 70,
                    width: 316,
                    margin: "0 auto",
                    marginTop: 34,
                  }}
                  onClick={() => Router.push("/producer")}
                >
                  <Font24>지금 업체 찾기</Font24>
                </Buttonv1> */}
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
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67 !important;
  letter-spacing: -0.6px !important;
  text-align: center;
  //margin: 35px auto 55px auto;
`;

const Layer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
`;

const Button = styled.div`
  cursor: pointer;
  margin-top: 34px;
  border: 2px solid #0933b3;
  border-radius: 4px;
  width: 316px;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  > span:nth-of-type(1) {
    margin-right: 15px;
    font-size: 26px;
    line-height: 52px;
    letter-spacing: -0.65px;
    color: #0933b3;
    font-weight: 500;
  }
  > span:nth-of-type(2) {
    padding-top: 6px;
    > img {
      width: 11px;
      height: 21px;
    }
  }
`;
