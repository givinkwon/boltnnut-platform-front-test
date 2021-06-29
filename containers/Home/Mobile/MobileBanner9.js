import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import * as Title from "components/Title";
import Buttonv1 from "components/Buttonv1";
import Fade from "react-reveal/Fade";
import Router from "next/router";

const passImg = "/static/images/pass7.png";
const image1 = "/static/images/Home/Mobile/MobileBanner9/MobileBanner9_bg.png";
class MobileBanner9Container extends React.Component {
  render() {
    return (
      <StyledBackground src={image1}>
        <Layer>
          <Fade bottom>
            <div>
              <Body>
                제조 발주를 위한 빠른 업체 검색 <br />
                볼트앤너트에서 가능합니다.
              </Body>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={() => Router.push("/producer")}>
                  <span>지금 업체 찾기</span>
                  <span>
                    <img src={passImg} />
                  </span>
                </Button>
              </div>
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
  // color: #ffffff;
  // font-weight: normal;
  // line-height: 26px;
  // letter-spacing: -0.4px;
  // text-align: center;
  // margin-bottom: 36px;

  margin-top: 10px;
  font-size: 12px !important;
  color: #282c36;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67 !important;
  letter-spacing: -0.6px !important;
  text-align: center;
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
  margin-top: 14px;
  border: 2px solid #0933b3;
  border-radius: 4px;
  width: 160px;
  height: 30px;
  margin-bottom: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  > span:nth-of-type(1) {
    margin-right: 15px;
    font-size: 11px;
    line-height: 32px;
    letter-spacing: -0.65px;
    color: #0933b3;
    font-weight: 500;
  }
  > span:nth-of-type(2) {
    > img {
      width: 6px;
    }
  }
`;
